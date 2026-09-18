import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { sitio } from "@/lib/data";

export function Footer() {
  return <footer className="site-footer"><div className="container-shell">
    <div className="footer-top"><div><Link href="/" className="footer-wordmark">{sitio.nombre}<span aria-hidden="true">↗</span></Link><p>{sitio.nombreCompleto}</p><p className="footer-tagline">{sitio.pie.lema}</p></div>
      <nav aria-label="Navegación de pie de página">{sitio.navegacion.map((item) => <Link href={item.ruta} key={item.ruta}>{item.nombre}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</nav>
      <div className="footer-contact"><span className="eyebrow">Conecta con nosotros</span><p><MapPin size={15} aria-hidden="true" />{sitio.ubicacion}</p>{sitio.email && <a href={`mailto:${sitio.email}`}>{sitio.email}</a>}{sitio.redes.map((red) => <a href={red.url} key={red.url} target="_blank" rel="noopener noreferrer">{red.nombre}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (abre en otra pestaña)</span></a>)}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {sitio.nombre}</span><span>{sitio.pie.nota}</span><Link href="#contenido">Volver arriba ↑</Link></div>
  </div></footer>;
}
