"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { EmptyState } from "@/components/shared";
import type { Producto } from "@/lib/data";

function normalizar(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function ProductCatalog({ items, categorias, moneda, locale, nota }: { items: Producto[]; categorias: string[]; moneda: string; locale: string; nota: string }) {
  const [categoria, setCategoria] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const precio = new Intl.NumberFormat(locale, { style: "currency", currency: moneda, maximumFractionDigits: 2, minimumFractionDigits: 0 });
  const visibles = items.filter((item) => (categoria === null || item.categoria === categoria) && normalizar(`${item.nombre} ${item.descripcion}`).includes(normalizar(busqueda)));

  useEffect(() => {
    if (!seleccionado || !dialog.current) return;
    dialog.current.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [seleccionado]);

  return <>
    <div className="catalog-toolbar"><div className="filter-list" aria-label="Filtrar por categoría"><button className="filter-button" aria-pressed={categoria === null} onClick={() => setCategoria(null)}>Todo el catálogo</button>{categorias.map((item) => <button className="filter-button" key={item} aria-pressed={categoria === item} onClick={() => setCategoria(item)}>{item}</button>)}</div><label className="search-field"><Search size={17} aria-hidden="true" /><span className="sr-only">Buscar productos</span><input type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar un producto…" /></label></div>
    <p className="result-count mb-6" role="status">{visibles.length} {visibles.length === 1 ? "producto" : "productos"}</p>
    {visibles.length ? <div className="product-grid">{visibles.map((item) => <article key={item.id} className="product-card"><div className="product-art"><span className="product-badge">{item.disponibilidad}</span><Image src={item.imagen} alt={item.imagenAlt} width={600} height={600} /></div><div className="product-info"><p className="eyebrow">{item.categoria}</p><div className="product-title-row"><h2>{item.nombre}</h2><span>{precio.format(item.precio)}</span></div><p className="product-sizes">Tallas: {item.tallas.join(" · ")}</p><button onClick={() => setSeleccionado(item)} className="product-action" aria-label={`Ver detalles de ${item.nombre}`}>Ver detalles<ArrowUpRight size={19} aria-hidden="true" /></button></div></article>)}</div> : <><EmptyState titulo="No encontramos productos con esos filtros." descripcion="Prueba otra categoría o cambia tu búsqueda." /><button className="button button-dark mx-auto mt-6" onClick={() => { setCategoria(null); setBusqueda(""); }}>Limpiar filtros</button></>}
    <dialog ref={dialog} className="product-dialog" aria-labelledby="product-dialog-title" onClose={() => setSeleccionado(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {seleccionado && <div className="dialog-inner"><button autoFocus className="dialog-close" aria-label="Cerrar detalles" onClick={() => dialog.current?.close()}><X size={21} /></button><div className="dialog-art"><Image src={seleccionado.imagen} alt={seleccionado.imagenAlt} width={600} height={600} /></div><div className="dialog-copy"><p className="eyebrow">{seleccionado.categoria}</p><h2 id="product-dialog-title">{seleccionado.nombre}</h2><p className="dialog-price">{precio.format(seleccionado.precio)}</p><p>{seleccionado.descripcion}</p><h3>Tallas disponibles</h3><ul className="size-list">{seleccionado.tallas.map((talla) => <li key={talla}>{talla}</li>)}</ul><p className="availability">{seleccionado.disponibilidad}</p><p className="catalog-note">{nota}</p></div></div>}
    </dialog>
  </>;
}
