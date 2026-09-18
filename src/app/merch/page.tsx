import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { ProductCatalog } from "@/components/product-catalog";
import { productos } from "@/lib/data";

export const metadata: Metadata = { title: "Merch · Catálogo" };

export default function MerchPage() {
  return <><PageHeader {...productos.encabezado} /><section className="section-space light-section"><div className="container-shell"><div className="info-banner"><Info size={18} aria-hidden="true" /><p>{productos.nota}</p></div><ProductCatalog items={productos.items} categorias={productos.categorias} moneda={productos.moneda} locale={productos.locale} nota={productos.nota} /></div></section></>;
}
