"use client";

import { useState } from "react";
import { EmptyState, ProjectCard } from "@/components/shared";
import type { Proyecto } from "@/lib/data";

export function ProjectCatalog({ items, estados }: { items: Proyecto[]; estados: string[] }) {
  const [estado, setEstado] = useState<string | null>(null);
  const visibles = items.filter((item) => estado === null || item.estado === estado);
  return <><div className="catalog-toolbar"><div className="filter-list" aria-label="Filtrar por estado"><button className="filter-button" aria-pressed={estado === null} onClick={() => setEstado(null)}>Todos</button>{estados.map((item) => <button key={item} className="filter-button" aria-pressed={estado === item} onClick={() => setEstado(item)}>{item}</button>)}</div><p className="result-count" role="status">{visibles.length} {visibles.length === 1 ? "proyecto" : "proyectos"}</p></div>
    {visibles.length ? <div className="project-grid">{visibles.map((item) => <ProjectCard key={item.id} proyecto={item} />)}</div> : <EmptyState titulo="Todavía no hay proyectos en esta etapa." descripcion="Prueba con otro estado para explorar nuestros proyectos." />}
  </>;
}
