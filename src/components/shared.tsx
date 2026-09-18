import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import type { Proyecto } from "@/lib/data";

export function PageHeader({ etiqueta, titulo, descripcion }: { etiqueta: string; titulo: string; descripcion: string }) {
  return <section className="page-header"><div className="container-shell relative"><p className="eyebrow"><span className="status-dot" />{etiqueta}</p><h1>{titulo}</h1><p className="page-description">{descripcion}</p><span className="header-orbit" aria-hidden="true" /></div></section>;
}

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link href={href} className={`text-link ${light ? "text-link-light" : ""}`}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}

export function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <article className="project-card" id={proyecto.id}>
      <div className="project-art blueprint-grid">
        <div className="flex items-start justify-between gap-3"><span className="tiny-label">{proyecto.id.toUpperCase()} / {proyecto.anio}</span><span className="project-status"><span />{proyecto.estado}</span></div>
        <Image src={proyecto.imagen} alt={proyecto.imagenAlt} width={640} height={760} className="project-image" />
        <div className="art-footer"><span>CRATER ENGINEERING</span><MoveUpRight size={20} aria-hidden="true" /></div>
      </div>
      <div className="project-info"><p className="eyebrow">{proyecto.tipo}</p><h3>{proyecto.nombre}</h3><p>{proyecto.descripcion}</p>
        <details className="project-details"><summary>Ficha del proyecto <ArrowRight size={16} aria-hidden="true" /></summary><dl>{proyecto.especificaciones.map((spec) => <div key={spec.etiqueta}><dt>{spec.etiqueta}</dt><dd>{spec.valor}</dd></div>)}</dl></details>
      </div>
    </article>
  );
}

export function EmptyState({ titulo = "Aún no hay contenido para mostrar.", descripcion = "Pronto compartiremos novedades en esta sección." }: { titulo?: string; descripcion?: string }) {
  return <div className="empty-state"><span className="empty-orbit" aria-hidden="true"><MoveUpRight size={28} /></span><h3>{titulo}</h3><p>{descripcion}</p></div>;
}
