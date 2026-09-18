"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type Props = {
  nombre: string;
  logo: string;
  enlaces: { nombre: string; ruta: string }[];
};

export function Navbar({ nombre, logo, enlaces }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onOutside(event: PointerEvent) {
      if (container.current && !container.current.contains(event.target as Node)) setOpen(false);
    }
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={container}>
      <div className="container-shell flex h-22 items-center justify-between gap-5">
        <Link href="/" className="brand" aria-label={`${nombre}, ir al inicio`} onClick={() => setOpen(false)}>
          <span className="logo-crop"><Image src={logo} alt={`Logotipo de ${nombre}`} width={160} height={90} priority /></span>
          <span className="brand-name">{nombre}<span>BEYOND THE EXPECTED</span></span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {enlaces.map((enlace) => <Link key={enlace.ruta} href={enlace.ruta} aria-current={pathname === enlace.ruta ? "page" : undefined} className={`nav-link ${pathname === enlace.ruta ? "active" : ""}`}>{enlace.nombre}{enlace.ruta === "/merch" && <ArrowUpRight size={13} aria-hidden="true" />}</Link>)}
        </nav>
        <button ref={toggle} className="menu-toggle lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Navegación móvil" className="mobile-nav lg:hidden" hidden={!open}>
        {enlaces.map((enlace) => <Link key={enlace.ruta} href={enlace.ruta} aria-current={pathname === enlace.ruta ? "page" : undefined} onClick={() => setOpen(false)}>{enlace.nombre}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
      </nav>
    </header>
  );
}
