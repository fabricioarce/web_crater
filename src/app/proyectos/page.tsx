import type { Metadata } from "next";
import { PageHeader } from "@/components/shared";
import { ProjectCatalog } from "@/components/project-catalog";
import { proyectos } from "@/lib/data";

export const metadata: Metadata = { title: "Proyectos" };

export default function ProyectosPage() {
  return <><PageHeader {...proyectos.encabezado} /><section className="section-space light-section"><div className="container-shell"><ProjectCatalog items={proyectos.items} estados={proyectos.estados} /></div></section></>;
}
