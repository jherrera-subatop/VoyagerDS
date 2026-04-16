import Link from "next/link";
import { TAXONOMY_COMPONENTS } from "../_data/taxonomy-components";
import { TaxonomyAccordion } from "../components/TaxonomyAccordion";
import { getUpgradeValidations } from "../actions/validateUpgrade";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Voyager DS — Taxonomía · Inventario",
  description: "Inventario completo por dominio — todos los componentes VMC auditados",
};

export default async function TaxonomiaInventarioPage() {
  const validations = await getUpgradeValidations();
  const validatedIds: Record<string, string> = {};
  for (const [id, entry] of Object.entries(validations)) {
    validatedIds[id] = entry.validatedAt;
  }
  return (
    <div className="max-w-5xl mx-auto px-6 pb-24 pt-8 space-y-8">
      {/* Header */}
      <div
        className="rounded-lg border p-5 text-sm space-y-2"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
          color: "var(--vmc-color-text-secondary)",
        }}
      >
        <p className="leading-relaxed">
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>Inventario completo</strong>: todos los
          componentes auditados en esta iteración, agrupados por dominio. Fuente canónica:{" "}
          <code
            className="font-mono text-xs px-1 rounded"
            style={{ background: "var(--vmc-color-background-tertiary)" }}
          >
            TAXONOMY.md
          </code>
          .
        </p>
        <div className="flex gap-4 text-xs flex-wrap pt-1">
          <Link
            href="/docs/taxonomia"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            ← Taxonomía
          </Link>
          <Link
            href="/docs/taxonomia/frame-detalle-vmc"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            Frame: Detalle VMC →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 flex-wrap text-sm">
        {[
          { label: "Total", value: TAXONOMY_COMPONENTS.length },
          {
            label: "referencia SubasCars",
            value: TAXONOMY_COMPONENTS.filter((c) => c.decision === "referencia-subascars").length,
          },
          {
            label: "solo VMC",
            value: TAXONOMY_COMPONENTS.filter((c) => c.decision === "solo-vmc").length,
          },
          {
            label: "pendiente audit",
            value: TAXONOMY_COMPONENTS.filter((c) => c.decision === "pendiente-audit").length,
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

      {/* Leyenda de decisiones */}
      <div className="flex gap-3 flex-wrap text-xs">
        {[
          {
            key: "referencia-subascars",
            label: "referencia SubasCars",
            bg: "var(--vmc-color-vault-100)",
            color: "var(--vmc-color-vault-900)",
          },
          {
            key: "solo-vmc",
            label: "solo VMC",
            bg: "var(--vmc-color-background-tertiary)",
            color: "var(--vmc-color-text-secondary)",
          },
          {
            key: "pendiente-audit",
            label: "pendiente audit",
            bg: "var(--vmc-color-background-urgency-low)",
            color: "var(--vmc-color-amber-900)",
          },
        ].map((d) => (
          <span
            key={d.key}
            className="px-2 py-0.5 rounded font-mono"
            style={{ background: d.bg, color: d.color }}
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Acordeón */}
      <TaxonomyAccordion components={TAXONOMY_COMPONENTS} defaultOpen="primitivos-tokens" validatedIds={validatedIds} />

      <p className="text-xs text-center" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        Marcos pendientes (Ruta B, TAXONOMY.md): Homepage, Listing, Panel usuario, Flujo puja.
      </p>
    </div>
  );
}
