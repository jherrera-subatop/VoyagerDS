import Link from "next/link";
import { TAXONOMY_COMPONENTS } from "./_data/taxonomy-components";
import { TaxonomyAccordion } from "./components/TaxonomyAccordion";

export const metadata = {
  title: "Voyager DS — Taxonomía",
  description: "ib-taxonomia — inventario completo de componentes VMC por categoría",
};

export default function DocsTaxonomiaPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-24 pt-8 space-y-8">
      {/* Context IB */}
      <div
        className="rounded-lg border p-5 text-sm space-y-2"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
          color: "var(--vmc-color-text-secondary)",
        }}
      >
        <p className="leading-relaxed">
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>ib-taxonomia</strong> precede a{" "}
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>ib-fundamentos</strong>: primero se acuerda
          qué componentes existen por marco, después se cierran tokens y pipeline.{" "}
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>Ruta B:</strong> la taxonomía crece por page-type;
          criterios de cierre por marco vs. documento global — ver{" "}
          <code className="font-mono text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            VOYAGER_CLAUDE_CODE.md
          </code>{" "}
          en la raíz del repo.
        </p>
        <div className="flex flex-wrap gap-4 pt-1 text-xs">
          <Link
            href="/docs/taxonomia/inventario"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            Inventario completo →
          </Link>
          <Link
            href="/docs/taxonomia/marco-detalle-vmc"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            Marco: Detalle VMC →
          </Link>
          <Link
            href="/docs/fundamentos"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-tertiary)" }}
          >
            Fundamentos →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 flex-wrap text-sm">
        {[
          { label: "Total componentes", value: TAXONOMY_COMPONENTS.length },
          {
            label: "referencia SubasCars",
            value: TAXONOMY_COMPONENTS.filter((c) => c.decision === "referencia-subascars").length,
          },
          {
            label: "solo VMC",
            value: TAXONOMY_COMPONENTS.filter((c) => c.decision === "solo-vmc").length,
          },
          {
            label: "en frame Detalle",
            value: TAXONOMY_COMPONENTS.filter((c) => c.frames?.includes("detalle")).length,
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

      {/* Acordeón principal */}
      <TaxonomyAccordion components={TAXONOMY_COMPONENTS} defaultOpen="primitivos-tokens" />
    </div>
  );
}
