import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Crosshair, Globe2, Plus } from "lucide-react";
import { ProjectCard, TextLink } from "@/components/shared";
import { equipo, proyectos, sitio } from "@/lib/data";

export default function Home() {
  const { hero, inicio } = sitio;
  const destacados = proyectos.items.filter((item) => item.destacado).slice(0, 2);
  return <>
    <section className="hero">
      <div className="hero-stars" aria-hidden="true" />
      <div className="container-shell hero-layout">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />{hero.etiqueta}</p>
          <h1>{hero.titulo}<br /><span>{hero.tituloAcento}</span></h1>
          <p className="hero-description">{hero.descripcion}</p>
          <div className="hero-actions"><Link className="button button-primary" href="/proyectos">{hero.accionPrincipal}<ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="button button-ghost" href="/equipo">{hero.accionSecundaria}<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className="hero-note"><span className="note-line" />{hero.nota}</div>
        </div>
        <div className="hero-visual" aria-hidden="true"><div className="orbital-ring ring-one" /><div className="orbital-ring ring-two" /><div className="orbital-ring ring-three" /><div className="orbit-center" /><div className="flight-line" />
          <span className="visual-coordinate coordinate-top"><Plus size={15} /> DISEÑO / CONCEPTO</span><span className="visual-coordinate coordinate-bottom">CRATER · EXPLORACIÓN <Plus size={15} /></span>
          <Image src={hero.ilustracion} alt="" width={640} height={760} priority className="hero-rocket" />
          <div className="technical-label"><span className="status-dot" /><div><span>EL CIELO ES EL COMIENZO</span><strong>Ingeniería sin fronteras.</strong></div><Crosshair size={24} /></div>
          <div className="orbit-mark"><Globe2 size={20} /><span>DISEÑADO PARA<br />MIRAR MÁS ALTO</span></div>
        </div>
      </div>
      <div className="container-shell hero-bottom"><a href="#esencia"><ArrowDown size={16} aria-hidden="true" />Descubre nuestra misión</a><span>CIENCIA. EQUIPO. EXPLORACIÓN.</span><span className="country-marker"><i /><i /><i />{sitio.ubicacion}</span></div>
    </section>
    <section className="stats-band" aria-label="El equipo en cifras"><div className="container-shell stats-grid">{equipo.estadisticas.map((stat) => <div key={stat.etiqueta}><strong>{stat.valor}<span> /</span></strong><p>{stat.etiqueta}</p>{sitio.modoDemo && <small>Dato de ejemplo</small>}</div>)}</div></section>
    <section id="esencia" className="section-space light-section"><div className="container-shell"><div className="intro-grid"><p className="eyebrow">{inicio.etiqueta}</p><div><h2>{inicio.titulo}</h2><p className="section-description">{inicio.descripcion}</p><TextLink href="/equipo">Las personas detrás de la misión</TextLink></div></div><div className="pillars-grid">{inicio.pilares.map((pilar) => <article key={pilar.numero}><span className="pillar-number">{pilar.numero}<Plus size={16} aria-hidden="true" /></span><h3>{pilar.titulo}</h3><p>{pilar.descripcion}</p></article>)}</div></div></section>
    {destacados.length > 0 && <section className="section-space projects-section"><div className="container-shell"><div className="section-heading"><div><p className="eyebrow">{inicio.proyectosEtiqueta}</p><h2>{inicio.proyectosTitulo}</h2><p className="section-description">{inicio.proyectosDescripcion}</p></div><TextLink href="/proyectos">Todos los proyectos</TextLink></div><div className="project-grid">{destacados.map((proyecto) => <ProjectCard key={proyecto.id} proyecto={proyecto} />)}</div></div></section>}
    <section className="alliance-section"><div className="container-shell alliance-inner"><div><p className="eyebrow">{inicio.alianzaEtiqueta}</p><h2>{inicio.alianzaTitulo}</h2><p>{inicio.alianzaDescripcion}</p><Link className="button button-primary" href="/patrocinadores">{inicio.alianzaAccion}<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="alliance-symbol" aria-hidden="true"><ArrowUpRight strokeWidth={.7} /></div></div></section>
  </>;
}
