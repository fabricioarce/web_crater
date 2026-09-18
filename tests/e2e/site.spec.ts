import { test, expect } from "@playwright/test";
import { productos, proyectos, sitio } from "../../src/lib/data";

const rutas = ["/", "/trayectoria", "/equipo", "/proyectos", "/patrocinadores", "/merch"];

for (const ruta of rutas) {
  test(`${ruta} carga sin errores, imágenes rotas ni desbordamiento`, async ({ page }, testInfo) => {
    const errores: string[] = [];
    page.on("pageerror", (error) => errores.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errores.push(message.text()); });
    const response = await page.goto(ruta);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      const images = [...document.images];
      images.forEach((image) => { image.loading = "eager"; });
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
      await document.fonts.ready;
    });
    expect(await page.locator("img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errores).toEqual([]);
    if (sitio.modoDemo) await expect(page.getByText(sitio.avisoDemo, { exact: true })).toBeVisible();
    if (["/", "/merch", "/equipo"].includes(ruta)) await page.screenshot({ path: testInfo.outputPath(`${ruta === "/" ? "inicio" : ruta.slice(1)}.png`), fullPage: true, animations: "disabled" });
  });
}

test("la navegación funciona en escritorio y móvil", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    const toggle = page.getByRole("button", { name: /^(Abrir|Cerrar) menú$/ });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.getByRole("navigation", { name: "Navegación móvil", exact: true }).getByRole("link", { name: "Proyectos", exact: true }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  } else {
    await page.getByRole("navigation", { name: "Navegación principal", exact: true }).getByRole("link", { name: "Proyectos", exact: true }).click();
  }
  await expect(page).toHaveURL("/proyectos");
  const nav = isMobile ? page.locator("#mobile-navigation") : page.getByRole("navigation", { name: "Navegación principal", exact: true });
  await expect(nav.getByRole("link", { name: "Proyectos", exact: true, includeHidden: true })).toHaveAttribute("aria-current", "page");
});

test("los proyectos filtran por estado y muestran su ficha", async ({ page }) => {
  await page.goto("/proyectos");
  for (const estado of proyectos.estados) {
    await page.getByRole("button", { name: estado, exact: true }).click();
    const visibles = proyectos.items.filter((item) => item.estado === estado);
    await expect(page.locator(".project-card")).toHaveCount(visibles.length);
  }
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  if (proyectos.items.length) {
    await page.locator(".project-details summary").first().click();
    await expect(page.locator(".project-details").first()).toHaveAttribute("open", "");
  }
});

test("el catálogo filtra, busca y muestra un diálogo accesible", async ({ page }) => {
  await page.goto("/merch");
  if (!productos.items.length) {
    await expect(page.locator(".product-card")).toHaveCount(0);
    return;
  }
  const producto = productos.items[0];
  await page.getByRole("button", { name: producto.categoria, exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(productos.items.filter((item) => item.categoria === producto.categoria).length);
  await page.getByRole("searchbox", { name: "Buscar productos" }).fill("sin-coincidencias-987654321");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await expect(page.locator(".product-card")).toHaveCount(productos.items.length);
  await page.getByRole("searchbox", { name: "Buscar productos" }).fill(producto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  const trigger = page.getByRole("button", { name: `Ver detalles de ${producto.nombre}`, exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: producto.nombre })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar detalles" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Cerrar detalles" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("el logotipo tiene una ruta compatible y las rutas desconocidas devuelven 404", async ({ page, request }) => {
  const logo = await request.get("/logo.jpeg");
  expect(logo.status()).toBe(200);
  expect(logo.headers()["content-type"]).toContain("image/jpeg");
  const response = await page.goto("/ruta-no-existente");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Volver al inicio" }).click();
  await expect(page).toHaveURL("/");
});
