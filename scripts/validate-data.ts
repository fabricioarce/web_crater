import { access } from "node:fs/promises";
import path from "node:path";
import { sitio, proyectos, productos, equipo, trayectoria, patrocinadores } from "../src/lib/data";

const imagenes = new Set([
  sitio.logo, sitio.hero.ilustracion,
  ...proyectos.items.map((item) => item.imagen),
  ...productos.items.map((item) => item.imagen),
  ...equipo.miembros.map((item) => item.foto).filter(Boolean),
  ...patrocinadores.items.map((item) => item.logo),
]);

async function validar() {
  const errores: string[] = [];
  for (const imagen of imagenes) {
    const archivo = imagen === "/logo.jpeg" ? "/Logo.jpeg" : imagen;
    try { await access(path.join(process.cwd(), "public", archivo)); }
    catch { errores.push(`No existe public${archivo} (referencia: ${imagen})`); }
  }
  if (errores.length) throw new Error(errores.join("\n"));
  console.log(`Contenido válido: 6 archivos JSON, ${imagenes.size} imágenes, ${proyectos.items.length} proyectos, ${productos.items.length} productos y ${trayectoria.hitos.length} hitos.`);
}

validar().catch((error: Error) => {
  console.error(error.message);
  process.exitCode = 1;
});
