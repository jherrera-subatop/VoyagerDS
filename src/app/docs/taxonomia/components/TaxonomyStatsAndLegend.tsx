import type { TaxonomyDecision } from "../_data/taxonomy-components";
import { DECISION_META, TAXONOMY_COMPONENTS } from "../_data/taxonomy-components";
import { taxonomyDecisionLegendText, TaxonomyComponentCard } from "./TaxonomyComponentCard";

export function TaxonomyStatsAndLegend() {
  const refSubasCars = TAXONOMY_COMPONENTS.filter((c) => c.decision === "referencia-subascars");
  const soloVmc = TAXONOMY_COMPONENTS.filter((c) => c.decision === "solo-vmc");

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total componentes", value: TAXONOMY_COMPONENTS.length, color: "var(--vmc-color-vault-900)" },
          { label: "Referencia SubasCars", value: refSubasCars.length, color: "var(--vmc-color-orange-600)" },
          { label: "Solo VMC", value: soloVmc.length, color: "var(--vmc-color-neutral-700)" },
          { label: "Iconos en SubasCars", value: 66, color: "var(--vmc-color-green-700)" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-lg border p-4"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-default)",
            }}
          >
            <p
              className="text-3xl font-bold font-mono"
              style={{ color, fontFamily: "var(--font-mono, 'Roboto Mono', monospace)" }}
            >
              {value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-secondary)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        className="rounded-lg border p-4 mb-6 flex gap-6 flex-wrap"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-subtle)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          Decisiones de construcción:
        </p>
        {(Object.keys(DECISION_META) as TaxonomyDecision[]).map((key) => {
          const meta = DECISION_META[key];
          const legend = taxonomyDecisionLegendText(key);
          return (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: meta.dot }} />
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: meta.bg, color: meta.color }}
              >
                {meta.label}
              </span>
              <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
                {legend}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function TaxonomyFlatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {TAXONOMY_COMPONENTS.map((c) => (
        <TaxonomyComponentCard key={c.id} component={c} />
      ))}
    </div>
  );
}
