import assert from "node:assert/strict";
import { test } from "node:test";
import { equipo, patrocinadores, productos, proyectos, sitio, trayectoria } from "../src/lib/data";
import { equipoSchema, productosSchema, proyectosSchema, sitioSchema, trayectoriaSchema, patrocinadoresSchema } from "../src/lib/data-schemas";

const producto = { id: "ejemplo", nombre: "Ejemplo", categoria: "Prueba", precio: 1500.5, descripcion: "Producto de prueba", tallas: ["Única"], imagen: "/images/ejemplo.svg", imagenAlt: "Ejemplo", disponibilidad: "Próximamente" };
const catalogo = { ...productos, categorias: ["Prueba"], items: [producto] };
const proyecto = { id: "ejemplo", nombre: "Ejemplo", tipo: "Cohete", estado: "Prueba", descripcion: "Proyecto de prueba", imagen: "/images/ejemplo.svg", imagenAlt: "Ejemplo", anio: "2026", destacado: false, especificaciones: [] };

test("los seis archivos de contenido son válidos", () => {
  assert.ok(sitioSchema.safeParse(sitio).success);
  assert.ok(proyectosSchema.safeParse(proyectos).success);
  assert.ok(productosSchema.safeParse(productos).success);
  assert.ok(equipoSchema.safeParse(equipo).success);
  assert.ok(trayectoriaSchema.safeParse(trayectoria).success);
  assert.ok(patrocinadoresSchema.safeParse(patrocinadores).success);
});

test("el catálogo admite cero productos y rechaza precios negativos", () => {
  assert.ok(productosSchema.safeParse({ ...catalogo, items: [] }).success);
  assert.equal(productosSchema.safeParse({ ...catalogo, items: [{ ...producto, precio: -1 }] }).success, false);
});

test("los identificadores y las categorías se comprueban", () => {
  assert.equal(productosSchema.safeParse({ ...catalogo, items: [producto, producto] }).success, false);
  assert.equal(productosSchema.safeParse({ ...catalogo, items: [{ ...producto, categoria: "Inexistente" }] }).success, false);
});

test("los estados de proyecto deben estar configurados", () => {
  assert.ok(proyectosSchema.safeParse({ ...proyectos, estados: ["Prueba"], items: [proyecto] }).success);
  assert.equal(proyectosSchema.safeParse({ ...proyectos, estados: ["Prueba"], items: [{ ...proyecto, estado: "Desconocido" }] }).success, false);
});

test("las imágenes deben ser rutas locales seguras", () => {
  for (const imagen of ["https://example.com/a.svg", "//example.com/a.svg", "/../secret", "/images/../../secret"]) {
    assert.equal(productosSchema.safeParse({ ...catalogo, items: [{ ...producto, imagen }] }).success, false);
  }
});

test("no se permiten enlaces con protocolos inseguros", () => {
  assert.equal(sitioSchema.safeParse({ ...sitio, redes: [{ nombre: "Red", url: "javascript:alert(1)" }] }).success, false);
  assert.ok(sitioSchema.safeParse({ ...sitio, redes: [{ nombre: "Red", url: "https://example.com" }] }).success);
});

test("la navegación apunta a páginas implementadas", () => {
  assert.equal(sitioSchema.safeParse({ ...sitio, navegacion: [{ nombre: "Rota", ruta: "/no-existe" }] }).success, false);
});

test("la línea de tiempo rechaza fechas imposibles", () => {
  const hito = { id: "ejemplo", fecha: "2026-02-30", categoria: "Prueba", titulo: "Ejemplo", descripcion: "Ejemplo", lugar: "Ejemplo" };
  assert.equal(trayectoriaSchema.safeParse({ ...trayectoria, hitos: [hito] }).success, false);
});

test("un patrocinador tiene que pertenecer a una categoría existente", () => {
  const item = { id: "aliado", nombre: "Aliado", categoria: "inexistente", logo: "/logo.jpeg", url: "", descripcion: "Ejemplo" };
  assert.equal(patrocinadoresSchema.safeParse({ ...patrocinadores, categorias: [{ id: "prueba", nombre: "Prueba", nivel: "01", descripcion: "Ejemplo", aporte: "Ejemplo", beneficios: [] }], items: [item] }).success, false);
});
