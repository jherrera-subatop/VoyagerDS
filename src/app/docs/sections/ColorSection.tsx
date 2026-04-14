import { SectionTitle } from "../components/SectionTitle";

interface SwatchProps {
  name: string;
  varName: string;
  description?: string;
  isAnchor?: boolean;
}

function Swatch({ name, varName, description, isAnchor }: SwatchProps) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div
        className="h-10 rounded-sm border transition-transform group-hover:scale-105"
        style={{
          background: `var(${varName})`,
          borderColor: "var(--vmc-color-border-subtle)",
          outline: isAnchor ? "2px solid var(--vmc-color-vault-700)" : "none",
          outlineOffset: "2px",
        }}
      />
      <div>
        <p
          className="text-xs font-mono leading-tight"
          style={{ color: "var(--vmc-color-text-primary)" }}
        >
          {name}
        </p>
        {description && (
          <p
            className="text-xs leading-tight mt-0.5"
            style={{ color: "var(--vmc-color-text-tertiary)" }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface PaletteRowProps {
  label: string;
  prefix: string;
  steps: number[];
  anchorStep?: number;
}

function PaletteRow({ label, prefix, steps, anchorStep }: PaletteRowProps) {
  return (
    <div>
      <p
        className="text-xs font-mono mb-3"
        style={{ color: "var(--vmc-color-text-secondary)" }}
      >
        {label}
      </p>
      <div className="grid grid-cols-12 gap-2">
        {steps.map((step) => (
          <Swatch
            key={step}
            name={`${step}`}
            varName={`--vmc-color-${prefix}-${step}`}
            isAnchor={step === anchorStep}
          />
        ))}
      </div>
    </div>
  );
}

interface SemanticRowProps {
  label: string;
  tokens: { name: string; varName: string; description: string }[];
}

function SemanticRow({ label, tokens }: SemanticRowProps) {
  return (
    <div>
      <p
        className="text-xs font-mono mb-3 uppercase tracking-wider"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {tokens.map((t) => (
          <div key={t.name} className="flex flex-col gap-1.5 w-28">
            <div
              className="h-8 rounded-sm border"
              style={{
                background: `var(${t.varName})`,
                borderColor: "var(--vmc-color-border-subtle)",
              }}
            />
            <p
              className="text-xs font-mono leading-tight"
              style={{ color: "var(--vmc-color-text-primary)" }}
            >
              {t.name}
            </p>
            <p
              className="text-xs leading-tight"
              style={{ color: "var(--vmc-color-text-tertiary)" }}
            >
              {t.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

export function ColorSection() {
  return (
    <section>
      <SectionTitle
        id="colores"
        title="Sistema de Color"
        subtitle="The Vault + En Vivo + Negociable · 12 pasos por familia · semánticos Dot Notation · tokens transaccionales Voyager"
        badge="Vault"
      />

      {/* Primitivos */}
      <div
        className="rounded-lg border p-6 mb-6 space-y-8"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "var(--vmc-color-background-tertiary)",
              color: "var(--vmc-color-text-secondary)",
            }}
          >
            CAPA 1 — PRIMITIVOS
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--vmc-color-text-tertiary)" }}
          >
            Valores absolutos · agnósticos de uso · escala numérica 100→1200
          </span>
        </div>

        <PaletteRow label="color.vault-*  →  The Vault (#22005C) = vault-900" prefix="vault" steps={STEPS} anchorStep={900} />
        <PaletteRow label="color.orange-*  →  En Vivo (#ED8936) = orange-600" prefix="orange" steps={STEPS} anchorStep={600} />
        <PaletteRow label="color.cyan-*  →  Negociable (#00CACE) = cyan-600" prefix="cyan" steps={STEPS} anchorStep={600} />
        <PaletteRow label="color.neutral-*  →  superficies claras + texto (#F8FAF9 → #191C1C)" prefix="neutral" steps={STEPS} anchorStep={1200} />
        <PaletteRow label="color.green-*  →  éxito / bullish = green-600" prefix="green" steps={STEPS} anchorStep={600} />
        <PaletteRow label="color.red-*  →  LIVE = red-600 · error = red-900" prefix="red" steps={STEPS} anchorStep={600} />
        <PaletteRow label="color.amber-*  →  advertencia / countdown = amber-600" prefix="amber" steps={STEPS} anchorStep={600} />

        <p className="text-xs max-w-3xl" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          La escala alfa paralela tipo blue-a* no forma parte de la v1.1 de marca; usar tokens semánticos o elevaciones
          (shadow.sm con tinte Vault) para transparencias sobre superficies claras.
        </p>
      </div>

      {/* Semánticos */}
      <div
        className="rounded-lg border p-6 mb-6 space-y-8"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "var(--vmc-color-background-tertiary)",
              color: "var(--vmc-color-text-secondary)",
            }}
          >
            CAPA 2 — SEMÁNTICOS
          </span>
          <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            Dot Notation · 4 namespaces · light default (design.md)
          </span>
        </div>

        <p className="text-xs max-w-3xl mb-6" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          Los semánticos referencian primitivos con <code className="font-mono">{`{color.*}`}</code>. En el CSS compilado verás cadenas tipo{" "}
          <code className="font-mono">var(--vmc-color-neutral-100)</code>. Opacidades y scrims usan primitivos{" "}
          <code className="font-mono">utility</code> / <code className="font-mono">base-*</code> (p. ej.{" "}
          <code className="font-mono">neutral-utility-muted</code>, <code className="font-mono">vault-utility-ghost</code>) para no duplicar HEX fuera de la capa primitiva.
        </p>

        <SemanticRow
          label="color.background.*"
          tokens={[
            { name: "primary", varName: "--vmc-color-background-primary", description: "Canvas" },
            { name: "secondary", varName: "--vmc-color-background-secondary", description: "Panel" },
            { name: "tertiary", varName: "--vmc-color-background-tertiary", description: "Anidado" },
            { name: "card", varName: "--vmc-color-background-card", description: "Card #FFF" },
            { name: "brand", varName: "--vmc-color-background-brand", description: "The Vault" },
            { name: "interactive", varName: "--vmc-color-background-interactive", description: "Rest" },
            { name: "interactive-hover", varName: "--vmc-color-background-interactive-hover", description: "Hover" },
            { name: "interactive-active", varName: "--vmc-color-background-interactive-active", description: "Active" },
            { name: "disabled", varName: "--vmc-color-background-disabled", description: "Disabled" },
            { name: "inverse", varName: "--vmc-color-background-inverse", description: "Tooltip" },
          ]}
        />

        <SemanticRow
          label="color.text.*"
          tokens={[
            { name: "primary", varName: "--vmc-color-text-primary", description: "Cuerpo" },
            { name: "secondary", varName: "--vmc-color-text-secondary", description: "Apoyo" },
            { name: "tertiary", varName: "--vmc-color-text-tertiary", description: "Meta" },
            { name: "brand", varName: "--vmc-color-text-brand", description: "Link" },
            { name: "inverse", varName: "--vmc-color-text-inverse", description: "On dark" },
            { name: "disabled", varName: "--vmc-color-text-disabled", description: "Off" },
            { name: "placeholder", varName: "--vmc-color-text-placeholder", description: "Input" },
          ]}
        />

        <SemanticRow
          label="color.border.*"
          tokens={[
            { name: "subtle", varName: "--vmc-color-border-subtle", description: "Divisor" },
            { name: "default", varName: "--vmc-color-border-default", description: "Card" },
            { name: "strong", varName: "--vmc-color-border-strong", description: "Active" },
            { name: "brand", varName: "--vmc-color-border-brand", description: "Selected" },
            { name: "focus", varName: "--vmc-color-border-focus", description: "Focus ring" },
            { name: "error", varName: "--vmc-color-border-error", description: "Error" },
            { name: "verified", varName: "--vmc-color-border-verified", description: "Cleared" },
          ]}
        />

        <SemanticRow
          label="color.icon.*"
          tokens={[
            { name: "primary", varName: "--vmc-color-icon-primary", description: "Nav" },
            { name: "secondary", varName: "--vmc-color-icon-secondary", description: "Apoyo" },
            { name: "brand", varName: "--vmc-color-icon-brand", description: "CTA" },
            { name: "disabled", varName: "--vmc-color-icon-disabled", description: "Off" },
            { name: "error", varName: "--vmc-color-icon-error", description: "Alerta" },
            { name: "success", varName: "--vmc-color-icon-success", description: "OK" },
          ]}
        />

        <SemanticRow
          label="En Vivo (naranja #ED8936) — intención semántica, no namespace color.orange en CAPA 2"
          tokens={[
            {
              name: "timer.imminent",
              varName: "--vmc-color-timer-imminent",
              description: "Texto countdown urgente → primitivo orange-600",
            },
            {
              name: "status.urgent",
              varName: "--vmc-color-status-urgent",
              description: "Estado urgente / inminente → orange-600",
            },
            {
              name: "bg.urgency.high",
              varName: "--vmc-color-background-urgency-high",
              description: "Superficie countdown tensa → orange-100 (tinte)",
            },
            {
              name: "badge.live.bg",
              varName: "--vmc-color-badge-live-bg",
              description: "Fondo badge EN VIVO → orange-600",
            },
            {
              name: "card.border.live",
              varName: "--vmc-color-card-border-live",
              description: "Borde inferior signature lote live → orange-600",
            },
          ]}
        />
      </div>

      {/* Transaccionales Voyager */}
      <div
        className="rounded-lg border p-6"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-brand)",
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "var(--vmc-color-vault-900)",
              color: "var(--vmc-color-neutral-100)",
            }}
          >
            VOYAGER EXCLUSIVOS
          </span>
          <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            No existen en ningún design system consumer · market dynamics, timers, bidding, clearing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <SemanticRow
            label="Market Dynamics"
            tokens={[
              { name: "text.market.bullish", varName: "--vmc-color-text-market-bullish", description: "Precio ↑" },
              { name: "text.market.bearish", varName: "--vmc-color-text-market-bearish", description: "Precio ↓" },
            ]}
          />
          <SemanticRow
            label="Urgency Countdown"
            tokens={[
              { name: "bg.urgency.low", varName: "--vmc-color-background-urgency-low", description: "60–30s" },
              { name: "bg.urgency.high", varName: "--vmc-color-background-urgency-high", description: "30–10s" },
              { name: "bg.urgency.critical", varName: "--vmc-color-background-urgency-critical", description: "<10s" },
            ]}
          />
          <SemanticRow
            label="Timer"
            tokens={[
              { name: "timer.standard", varName: "--vmc-color-timer-standard", description: ">30s" },
              { name: "timer.imminent", varName: "--vmc-color-timer-imminent", description: "<10s" },
            ]}
          />
          <SemanticRow
            label="Bidding Actions"
            tokens={[
              { name: "action.bid", varName: "--vmc-color-action-execute-bid", description: "Pujar" },
              { name: "action.withdraw", varName: "--vmc-color-action-execute-withdraw", description: "Retirar" },
              { name: "surface.processing", varName: "--vmc-color-surface-processing", description: "Clearing" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
