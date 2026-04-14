import type { TaxonomyComponent, TaxonomyDecision } from "../_data/taxonomy-components";
import { DECISION_META, DOMAIN_COLORS } from "../_data/taxonomy-components";
import { SUBASCARS_STORYBOOK_BY_COMPONENT_ID } from "../_data/wireframe-references";
import { ComponentWireframe } from "./ComponentWireframe";

interface TaxonomyComponentCardProps {
  component: TaxonomyComponent;
}

export function TaxonomyComponentCard({ component: c }: TaxonomyComponentCardProps) {
  const decision = DECISION_META[c.decision];
  const domainColor = DOMAIN_COLORS[c.domain] ?? "var(--vmc-color-neutral-500)";
  const storybookUrl = SUBASCARS_STORYBOOK_BY_COMPONENT_ID[c.id];

  return (
    <div
      className="rounded-lg border flex flex-col overflow-hidden"
      style={{
        background: "var(--vmc-color-background-secondary)",
        borderColor: "var(--vmc-color-border-default)",
      }}
    >
      {/* Boceto wireframe del componente */}
      <div
        className="p-3 border-b"
        style={{ borderColor: "var(--vmc-color-border-subtle)", background: "var(--vmc-color-background-primary)" }}
      >
        <ComponentWireframe componentId={c.id} />
      </div>

      {/* Metadatos */}
      <div className="p-4 flex flex-col gap-3">
        {/* Cabecera: nombre + badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className="font-semibold text-sm"
              style={{
                color: "var(--vmc-color-text-primary)",
                fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              {c.name}
            </p>
            <code className="text-xs font-mono" style={{ color: "var(--vmc-color-text-brand)" }}>
              {c.id}
            </code>
          </div>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
            style={{ background: decision.bg, color: decision.color }}
          >
            {decision.label}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-xs leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
          {c.description}
        </p>

        {/* Medidas */}
        {c.measurements && (
          <div
            className="rounded p-2 text-xs font-mono space-y-1"
            style={{
              background: "var(--vmc-color-background-tertiary)",
              border: "1px solid var(--vmc-color-border-subtle)",
            }}
          >
            <p className="font-semibold text-xs mb-1" style={{ color: "var(--vmc-color-text-tertiary)", fontFamily: "inherit" }}>
              medidas
            </p>
            {c.measurements.height && (
              <p style={{ color: "var(--vmc-color-text-secondary)" }}>
                <span style={{ color: "var(--vmc-color-text-tertiary)" }}>h: </span>
                {c.measurements.height}
              </p>
            )}
            {c.measurements.width && (
              <p style={{ color: "var(--vmc-color-text-secondary)" }}>
                <span style={{ color: "var(--vmc-color-text-tertiary)" }}>w: </span>
                {c.measurements.width}
              </p>
            )}
            {c.measurements.padding && (
              <p style={{ color: "var(--vmc-color-text-secondary)" }}>
                <span style={{ color: "var(--vmc-color-text-tertiary)" }}>pad: </span>
                {c.measurements.padding}
              </p>
            )}
            {c.measurements.extra &&
              Object.entries(c.measurements.extra).map(([k, v]) => (
                <p key={k} style={{ color: "var(--vmc-color-text-secondary)" }}>
                  <span style={{ color: "var(--vmc-color-text-tertiary)" }}>{k}: </span>
                  {v}
                </p>
              ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: "var(--vmc-color-background-tertiary)",
                color: domainColor,
                border: "1px solid var(--vmc-color-border-subtle)",
              }}
            >
              {c.domain}
            </span>
            <div className="flex items-center gap-3">
              {c.instances !== undefined && (
                <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
                  {c.instances} inst. VMC
                </span>
              )}
              {c.variants !== undefined && (
                <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
                  {c.variants} var. SB
                </span>
              )}
            </div>
          </div>

          {/* Frames donde aparece */}
          {c.frames && c.frames.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {c.frames.map((f) => (
                <span
                  key={f}
                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: "var(--vmc-color-vault-100)",
                    color: "var(--vmc-color-vault-900)",
                    border: "1px solid var(--vmc-color-vault-200)",
                  }}
                >
                  frame:{f}
                </span>
              ))}
            </div>
          )}

          {/* Enlace SubasCars si existe */}
          {storybookUrl && (
            <a
              href={storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline underline-offset-2"
              style={{ color: "var(--vmc-color-text-brand)" }}
            >
              Ver anatomía en SubasCars →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function taxonomyDecisionLegendText(key: TaxonomyDecision): string {
  if (key === "referencia-subascars") {
    return "— anatomía de SubasCars, UX de VMC, componente nuevo";
  }
  if (key === "solo-vmc") {
    return "— construir desde DOM + screenshot VMC";
  }
  return "— requiere audit adicional";
}
