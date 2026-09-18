import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { sitio } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: `${sitio.nombre} | Ingeniería que mira más alto`, template: `%s | ${sitio.nombre}` },
  description: sitio.descripcion,
  icons: { icon: sitio.logo, apple: sitio.logo },
  robots: sitio.modoDemo ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Navbar nombre={sitio.nombre} logo={sitio.logo} enlaces={sitio.navegacion} />
    <main id="contenido" tabIndex={-1}>{children}</main>
    {sitio.modoDemo && <aside className="demo-notice"><div className="container-shell"><span className="demo-tag">DEMO</span><p>{sitio.avisoDemo}</p></div></aside>}
    <Footer />
  </body></html>;
}
