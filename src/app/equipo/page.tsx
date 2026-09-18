import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/shared";
import { equipo } from "@/lib/data";

export const metadata: Metadata = { title: "Equipo" };

export default function EquipoPage() {
  const grupos = [...new Set(equipo.miembros.map((miembro) => miembro.grupo))];
  return <><PageHeader {...equipo.encabezado} /><section className="team-stats"><div className="container-shell stats-grid">{equipo.estadisticas.map((stat) => <div key={stat.etiqueta}><strong>{stat.valor}</strong><h2>{stat.etiqueta}</h2><p>{stat.detalle}</p></div>)}</div></section>
    <section className="section-space light-section"><div className="container-shell"><div className="section-heading"><div><p className="eyebrow">El equipo detrás de las ideas</p><h2>{equipo.liderazgoTitulo}</h2><p className="section-description">{equipo.liderazgoDescripcion}</p></div></div>
      {grupos.length ? grupos.map((grupo) => <section key={grupo} className="member-group"><h3 className="group-title">{grupo}<span>{String(equipo.miembros.filter((miembro) => miembro.grupo === grupo).length).padStart(2, "0")}</span></h3><div className="member-grid">{equipo.miembros.filter((miembro) => miembro.grupo === grupo).map((miembro) => <article key={miembro.id} className="member-card"><div className="member-portrait">{miembro.foto ? <Image src={miembro.foto} alt={`Retrato de ${miembro.nombre}`} width={240} height={240} /> : <span aria-hidden="true">{miembro.nombre.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}<ArrowUpRight size={19} aria-hidden="true" /></div><div><p className="eyebrow">{miembro.rol}</p><h4>{miembro.nombre}</h4><p className="member-area">{miembro.area}</p><p>{miembro.bio}</p></div></article>)}</div></section>) : <EmptyState titulo="Pronto conocerás a nuestro equipo." />}
    </div></section><section className="section-space areas-section"><div className="container-shell"><p className="eyebrow">Cómo nos organizamos</p><h2>{equipo.areasTitulo}</h2><div className="areas-grid">{equipo.areas.map((area) => <article key={area.nombre}><Layers3 size={25} aria-hidden="true" /><h3>{area.nombre}</h3><p>{area.descripcion}</p></article>)}</div></div></section>
  </>;
}
