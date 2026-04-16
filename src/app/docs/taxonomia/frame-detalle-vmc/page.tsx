import Link from "next/link";
import { filterByFrame } from "../_data/taxonomy-components";
import { TaxonomyAccordion } from "../components/TaxonomyAccordion";
import { FrameTabView } from "./FrameTabView";

export const metadata = {
  title: "Voyager DS — Frame: Detalle VMC",
  description: "Frame Detalle — composición wireframe 1024px + componentes auditados por categoría",
};

const detalleComponents = filterByFrame("detalle");

export default function TaxonomiaMarcoDetallePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-24 pt-8 space-y-10">
      {/* Breadcrumb / contexto */}
      <div
        className="rounded-lg border p-5 text-sm space-y-2"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
          color: "var(--vmc-color-text-secondary)",
        }}
      >
        <p className="leading-relaxed">
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>Frame: Detalle</strong> — la URL de oferta
          individual de VMC Subastas (e.g. <code className="font-mono text-xs">/oferta/61172</code>).
          Composición fiel al audit del 13-abr-2026. Max-width: 1024px.
        </p>
        <div className="flex gap-4 text-xs flex-wrap pt-1">
          <Link
            href="/docs/taxonomia"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            ← Taxonomía (todos los frames)
          </Link>
          <Link
            href="/docs/taxonomia/inventario"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            Inventario completo →
          </Link>
        </div>
      </div>

      {/* Stats del marco */}
      <div className="flex gap-6 flex-wrap text-sm">
        {[
          { label: "Componentes en Detalle", value: detalleComponents.length },
          {
            label: "referencia SubasCars",
            value: detalleComponents.filter((c) => c.decision === "referencia-subascars").length,
          },
          {
            label: "solo VMC",
            value: detalleComponents.filter((c) => c.decision === "solo-vmc").length,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border px-4 py-2"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-subtle)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
              {stat.label}
            </p>
            <p className="text-xl font-semibold font-mono" style={{ color: "var(--vmc-color-text-primary)" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Frame: wireframe + referencia VMC (tabs) */}
      <section className="space-y-3">
        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--vmc-color-text-primary)" }}
          >
            Composición del frame
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            Wireframe a 1024px con zonas y medidas · Referencia: página real de VMC Subastas.
          </p>
        </div>
        <FrameTabView />
      </section>

      {/* Acordeón: solo componentes de Detalle */}
      <section className="space-y-4">
        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--vmc-color-text-primary)" }}
          >
            Componentes de este frame
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            {detalleComponents.length} piezas — expandí cada categoría para ver wireframe y medidas.
          </p>
        </div>
        <TaxonomyAccordion components={detalleComponents} defaultOpen="layout" />
      </section>
    </div>
  );
}
