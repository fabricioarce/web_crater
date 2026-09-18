import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return <section className="not-found container-shell"><p className="eyebrow">404 / Fuera de órbita</p><h1>Esta ruta aún no ha sido explorada.</h1><p>La página que buscas no existe o cambió de dirección.</p><Link href="/" className="button button-primary">Volver al inicio<ArrowRight size={17} aria-hidden="true" /></Link></section>;
}
