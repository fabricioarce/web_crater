import { z } from "zod";
import sitioJson from "../data/sitio.json";
import proyectosJson from "../data/proyectos.json";
import productosJson from "../data/productos.json";
import equipoJson from "../data/equipo.json";
import trayectoriaJson from "../data/trayectoria.json";
import patrocinadoresJson from "../data/patrocinadores.json";
import { sitioSchema, proyectosSchema, productosSchema, equipoSchema, trayectoriaSchema, patrocinadoresSchema } from "./data-schemas";

function cargar<T extends z.ZodType>(archivo: string, schema: T, contenido: unknown): z.output<T> {
  const resultado = schema.safeParse(contenido);
  if (!resultado.success) {
    throw new Error(`Revisa src/data/${archivo}:\n${resultado.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n")}`);
  }
  return resultado.data;
}

export const sitio = cargar("sitio.json", sitioSchema, sitioJson);
export const proyectos = cargar("proyectos.json", proyectosSchema, proyectosJson);
export const productos = cargar("productos.json", productosSchema, productosJson);
export const equipo = cargar("equipo.json", equipoSchema, equipoJson);
export const trayectoria = cargar("trayectoria.json", trayectoriaSchema, trayectoriaJson);
export const patrocinadores = cargar("patrocinadores.json", patrocinadoresSchema, patrocinadoresJson);
export type Proyecto = (typeof proyectos.items)[number];
export type Producto = (typeof productos.items)[number];
