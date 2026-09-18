import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { EmptyState, PageHeader, TextLink } from "@/components/shared";
import { trayectoria } from "@/lib/data";

export const metadata: Metadata = { title: "Trayectoria" };

export default function TrayectoriaPage() {
  const hitos = [...trayectoria.hitos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  return <><PageHeader {...trayectoria.encabezado} /><section className="section-space light-section"><div className="container-shell timeline-container">{hitos.length ? <ol className="timeline">{hitos.map((hito, index) => <li key={hito.id}><div className="timeline-year"><span>{hito.fecha.slice(0, 4)}</span><span className="timeline-dot" /></div><article className="timeline-card"><div className="flex items-center justify-between gap-4"><span className="timeline-category">{hito.categoria}</span><span className="tiny-label">{String(index + 1).padStart(2, "0")} / BITÁCORA</span></div><time dateTime={hito.fecha}>{new Intl.DateTimeFormat("es-CR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${hito.fecha}T12:00:00Z`))}</time><h2>{hito.titulo}</h2><p>{hito.descripcion}</p><span className="timeline-location"><MapPin size={14} aria-hidden="true" />{hito.lugar}</span></article></li>)}</ol> : <EmptyState titulo="Nuestra bitácora está por comenzar." />}<div className="timeline-end"><p className="eyebrow">El próximo capítulo</p><h2>{trayectoria.cierreTitulo}</h2><p>{trayectoria.cierreDescripcion}</p><TextLink href="/proyectos">Explora nuestros proyectos</TextLink></div></div></section></>;
}
