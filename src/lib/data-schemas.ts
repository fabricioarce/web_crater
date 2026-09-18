import { z } from "zod";

const texto = z.string().trim().min(1, "No puede estar vacío");
const id = texto.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones");
const imagen = texto.regex(/^\/[a-zA-Z0-9][a-zA-Z0-9/_.-]*$/, "Usa una ruta local, por ejemplo /images/cohete.svg")
  .refine((value) => !value.split("/").includes(".."), "La ruta no puede salir de public");
const enlace = z.url().refine((value) => value.startsWith("https://"), "El enlace debe empezar por https://");
const encabezado = z.object({ etiqueta: texto, titulo: texto, descripcion: texto });
const rutas = z.enum(["/", "/trayectoria", "/equipo", "/proyectos", "/patrocinadores", "/merch"]);

function unicos<T extends { id: string }>(items: T[], ctx: z.RefinementCtx, campo: string) {
  const ids = new Set<string>();
  items.forEach((item, index) => {
    if (ids.has(item.id)) ctx.addIssue({ code: "custom", message: `El id '${item.id}' está repetido`, path: [campo, index, "id"] });
    ids.add(item.id);
  });
}

export const sitioSchema = z.object({
  nombre: texto,
  nombreCompleto: texto,
  descripcion: texto,
  ubicacion: texto,
  logo: imagen,
  modoDemo: z.boolean(),
  avisoDemo: texto,
  email: z.union([z.literal(""), z.email()]),
  redes: z.array(z.object({ nombre: texto, url: enlace })),
  navegacion: z.array(z.object({ nombre: texto, ruta: rutas })).min(1),
  hero: z.object({ etiqueta: texto, titulo: texto, tituloAcento: texto, descripcion: texto, accionPrincipal: texto, accionSecundaria: texto, nota: texto, ilustracion: imagen }),
  inicio: z.object({
    etiqueta: texto, titulo: texto, descripcion: texto,
    pilares: z.array(z.object({ numero: texto, titulo: texto, descripcion: texto })),
    proyectosEtiqueta: texto, proyectosTitulo: texto, proyectosDescripcion: texto,
    alianzaEtiqueta: texto, alianzaTitulo: texto, alianzaDescripcion: texto, alianzaAccion: texto,
  }),
  pie: z.object({ lema: texto, nota: texto }),
});

export const proyectoSchema = z.object({
  id, nombre: texto, tipo: texto, estado: texto, descripcion: texto, imagen, imagenAlt: texto,
  anio: texto.regex(/^\d{4}$/, "Usa un año de cuatro cifras"), destacado: z.boolean(),
  especificaciones: z.array(z.object({ etiqueta: texto, valor: texto })),
});

export const proyectosSchema = z.object({ encabezado, estados: z.array(texto).min(1), items: z.array(proyectoSchema) })
  .superRefine((data, ctx) => {
    unicos(data.items, ctx, "items");
    data.items.forEach((item, index) => {
      if (!data.estados.includes(item.estado)) ctx.addIssue({ code: "custom", message: "El estado debe existir en estados", path: ["items", index, "estado"] });
    });
  });

export const productoSchema = z.object({
  id, nombre: texto, categoria: texto, precio: z.number().finite().nonnegative("El precio no puede ser negativo"),
  descripcion: texto, tallas: z.array(texto).min(1), imagen, imagenAlt: texto, disponibilidad: texto,
});

export const productosSchema = z.object({
  encabezado, moneda: texto.regex(/^[A-Z]{3}$/, "Usa un código como CRC o USD"),
  locale: texto.refine((value) => {
    try { return Intl.NumberFormat.supportedLocalesOf([value]).length > 0; } catch { return false; }
  }, "Usa una región válida como es-CR"),
  nota: texto, categorias: z.array(texto).min(1), items: z.array(productoSchema),
}).superRefine((data, ctx) => {
  unicos(data.items, ctx, "items");
  data.items.forEach((item, index) => {
    if (!data.categorias.includes(item.categoria)) ctx.addIssue({ code: "custom", message: "La categoría debe existir en categorias", path: ["items", index, "categoria"] });
  });
});

export const equipoSchema = z.object({
  encabezado,
  estadisticas: z.array(z.object({ valor: texto, etiqueta: texto, detalle: texto })),
  liderazgoTitulo: texto, liderazgoDescripcion: texto,
  miembros: z.array(z.object({ id, nombre: texto, rol: texto, area: texto, bio: texto, foto: z.union([z.literal(""), imagen]), grupo: texto })),
  areasTitulo: texto,
  areas: z.array(z.object({ nombre: texto, descripcion: texto })),
}).superRefine((data, ctx) => unicos(data.miembros, ctx, "miembros"));

export const trayectoriaSchema = z.object({
  encabezado,
  hitos: z.array(z.object({ id, fecha: z.iso.date("Usa una fecha real en formato AAAA-MM-DD"), categoria: texto, titulo: texto, descripcion: texto, lugar: texto })),
  cierreTitulo: texto, cierreDescripcion: texto,
}).superRefine((data, ctx) => unicos(data.hitos, ctx, "hitos"));

export const patrocinadoresSchema = z.object({
  encabezado, vacioTitulo: texto, vacioDescripcion: texto, categoriasTitulo: texto, notaCategorias: texto,
  categorias: z.array(z.object({ id, nombre: texto, nivel: texto, descripcion: texto, aporte: texto, beneficios: z.array(texto) })).min(1),
  items: z.array(z.object({ id, nombre: texto, categoria: texto, logo: imagen, url: z.union([z.literal(""), enlace]), descripcion: texto })),
  contactoTitulo: texto, contactoDescripcion: texto, contactoPendiente: texto,
}).superRefine((data, ctx) => {
  unicos(data.categorias, ctx, "categorias");
  unicos(data.items, ctx, "items");
  data.items.forEach((item, index) => {
    if (!data.categorias.some((category) => category.id === item.categoria)) ctx.addIssue({ code: "custom", message: "La categoría debe coincidir con el id de una categoría", path: ["items", index, "categoria"] });
  });
});
