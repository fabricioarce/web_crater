import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/shared";
import { patrocinadores, sitio } from "@/lib/data";

export const metadata: Metadata = { title: "Patrocinadores" };

export default function PatrocinadoresPage() {
  return <><PageHeader {...patrocinadores.encabezado} /><section className="section-space light-section"><div className="container-shell">
    {patrocinadores.items.length ? <div className="sponsor-groups">{patrocinadores.categorias.map((categoria) => {
      const aliados = patrocinadores.items.filter((item) => item.categoria === categoria.id);
      return aliados.length > 0 && <section key={categoria.id}><h2>{categoria.nombre}</h2><div className="sponsor-grid">{aliados.map((aliado) => <article className="sponsor-card" key={aliado.id}><Image src={aliado.logo} alt={`Logotipo de ${aliado.nombre}`} width={200} height={110} /><h3>{aliado.nombre}</h3><p>{aliado.descripcion}</p>{aliado.url && <a href={aliado.url} target="_blank" rel="noopener noreferrer" className="text-link">Visitar sitio<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre en otra pestaña)</span></a>}</article>)}</div></section>;
    })}</div> : <EmptyState titulo={patrocinadores.vacioTitulo} descripcion={patrocinadores.vacioDescripcion} />}
    <div className="sponsor-heading"><p className="eyebrow">Un impulso a nuestra misión</p><h2>{patrocinadores.categoriasTitulo}</h2><p className="section-description">{patrocinadores.notaCategorias}</p></div>
    <div className="tier-grid">{patrocinadores.categorias.map((categoria) => <article className="tier-card" key={categoria.id}><div className="tier-number">{categoria.nivel}<ArrowUpRight size={25} aria-hidden="true" /></div><h3>{categoria.nombre}</h3><p>{categoria.descripcion}</p><div className="tier-contribution">{categoria.aporte}</div><ul>{categoria.beneficios.map((beneficio) => <li key={beneficio}><Check size={16} aria-hidden="true" />{beneficio}</li>)}</ul><a href="#contacto" className="text-link">Conversemos<ArrowUpRight size={16} aria-hidden="true" /></a></article>)}</div>
    <section id="contacto" className="contact-panel"><Mail size={30} aria-hidden="true" /><div><h2>{patrocinadores.contactoTitulo}</h2><p>{patrocinadores.contactoDescripcion}</p>{sitio.email ? <a className="button button-dark" href={`mailto:${sitio.email}`}>Escríbenos<ArrowUpRight size={17} aria-hidden="true" /></a> : <p className="contact-pending">{patrocinadores.contactoPendiente}</p>}</div></section>
  </div></section></>;
}
