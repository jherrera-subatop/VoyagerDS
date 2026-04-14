import Link from "next/link";
import { SectionTitle } from "../components/SectionTitle";

const CORE_RULES = [
  {
    title: "No-Line Rule",
    body: "No usar bordes sólidos de 1px para separar áreas de contenido. La separación viene de cambios de fondo (p. ej. card #FFFFFF sobre sección #F2F4F3). Si el borde es funcional o de accesibilidad, usar Ghost Border: The Vault al 10% — token `border.default`.",
  },
  {
    title: "Signature Finish Rule",
    body: "Cada auction card lleva borde inferior de 4px según estado del lote. Tokens: `color.card.border.live`, `negotiable`, `upcoming`, `closed`, `featured` (variables `--vmc-color-card-border-*`).",
  },
  {
    title: "No Black Rule",
    body: "Nunca texto en #000000. Superficie clara: `text.primary` (#191C1C).",
  },
  {
    title: "No HEX in Code Rule",
    body: "En componentes React solo `var(--vmc-*)` o utilidades mapeadas desde `@theme`. Los valores HEX viven en DESIGN.md y en `tokens.json`, no en JSX.",
  },
  {
    title: "7 States Rule",
    body: "Todo componente interactivo define: Default, Hover, Focus, Active, Disabled, Loading, Error. Focus visible: 2px `border.focus` (#3B1782), offset 2px (DESIGN.md §11).",
  },
];

const DATA_STATUS_ROWS = [
  {
    component: "AuctionCard",
    attr: 'data-status="live|negotiable|upcoming|closed|featured"',
    note: "Raíz del componente — DESIGN.md §12",
  },
  {
    component: "AuctionStatusBanner",
    attr: 'data-status="live|upcoming|negotiable|closed"',
    note: "DESIGN.md §9.10",
  },
  {
    component: "CountdownTimer",
    attr: 'data-status="default|urgent|expired"',
    note: "Urgent = naranja (#ED8936), no rojo — DESIGN.md §9.8",
  },
];

const IB_ENFORCEMENT = [
  "Pipeline Terrazzo + `tokens.json` (DTCG). Salida: primitivos + semánticos light/dark.",
  "Scripts `predev` / `prebuild` ejecutan `token-gatekeeper.mjs` antes del build: naming, $description, escalas, referencias.",
  "Estado: `makeStore()` por árbol (App Router), auth en `middleware.ts`, Zustand vía factory + provider (sin store global cliente/servidor mezclado).",
  "Tipografía en tokens: Plus Jakarta (display/UI) + Roboto (cuerpo/datos) + Roboto Mono (numéricos/tabular) — 20 text styles bloqueados (IB Fundamentos).",
];

const DESIGN_VS_TOKENS = [
  {
    topic: "Alcance de DESIGN.md (Stitch) vs tokens Voyager",
    resolution:
      "Colores y roles cromáticos: DESIGN.md como referencia creativa alineada a `tokens.json`. Tipografía, motion, spacing y el resto de fundamentos siguen lo avanzado en el proyecto (IB + reglas del repo), no la tabla §3–§10 de Stitch salvo decisión explícita de convergencia.",
  },
  {
    topic: "Tipografía (DESIGN.md §3 vs IB)",
    resolution:
      "Stitch especifica solo Plus Jakarta Sans + Mono para códigos. El IB de fundamentos fija tres roles tipográficos y escala de 20 estilos; los tokens compilados siguen el IB hasta una decisión explícita de converger el spec de Stitch.",
  },
  {
    topic: "Motion (DESIGN.md §10 vs tokens)",
    resolution:
      "Stitch propone 150ms / 300ms. Los tokens actuales usan 100ms / 220ms / 350ms (IB + gatekeeper). Ajustar valores en `tokens.json` si se unifica criterio.",
  },
  {
    topic: "Canvas de página (DESIGN.md §7 vs superficies)",
    resolution:
      "El prototipo de layout menciona fondos distintos por zona; en tokens, Level 0 = `background.primary` (#F8FAF9), Level 1 = `background.secondary` (#F2F4F3), Level 2 = `background.card` (#FFFFFF). Las páginas de fundamentos en `/docs/fundamentos` usan ese stack.",
  },
];

const DOS = [
  "Separar bloques con cambios de fondo, no con rejillas de 1px.",
  "Usar gradiente Vault en hero y CTAs primarios cuando el componente lo requiera (linear-gradient 135deg #22005C → #3B1782).",
  "Mantener nombres de vehículo en mayúsculas donde el legacy lo exija.",
  "Precios y timers con `tabular-nums` y tokens numéricos/mono.",
];

const DONTS = [
  "No usar #000000 para texto.",
  "No usar sombras fuera de `shadow.sm` y `shadow.md`.",
  "No usar rojo para urgencia de countdown — rojo = error o punto LIVE (#EF4444) según contexto (ver tokens `timer.*` y `status.live`).",
  "No inventar espaciados fuera de la grilla 4px / tokens `space.*`.",
];

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        background: "var(--vmc-color-background-secondary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <h3
        className="text-sm font-semibold mb-2"
        style={{
          color: "var(--vmc-color-text-primary)",
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
        {body}
      </p>
    </div>
  );
}

function BadgeSwatch({ label, bgVar, textVar }: { label: string; bgVar: string; textVar: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-10 rounded-full px-3 flex items-center justify-center text-[10px] font-semibold uppercase tracking-wide"
        style={{
          background: `var(${bgVar})`,
          color: `var(${textVar})`,
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        }}
      >
        {label}
      </div>
      <p className="text-xs font-mono leading-tight" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        {bgVar}
      </p>
    </div>
  );
}

export function GovernanceSection() {
  return (
    <section>
      <SectionTitle
        id="gobernanza"
        title="Gobernanza del design system"
        subtitle="IB Fase 2 (Fundamentos) + DESIGN.md v1.1.0 · reglas ejecutables y contratos para agentes"
        badge="Normativo"
      />

      <div
        className="rounded-lg border p-6 mb-8"
        style={{
          background: "var(--vmc-color-background-card)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--vmc-color-text-secondary)" }}>
          Orden de precedencia para implementación:{" "}
          <span className="font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
            tokens compilados
          </span>{" "}
          (fuente técnica) alineados a{" "}
          <span className="font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
            DESIGN.md
          </span>{" "}
          (spec creativo Stitch) y a las reglas del{" "}
          <span className="font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
            IB Fundamentos
          </span>{" "}
          (pipeline, estado, gatekeeper). Si hay tensión entre Stitch e IB, esta sección documenta la resolución vigente.
        </p>
        <Link
          href="/docs/design-spec"
          className="inline-flex text-sm font-medium underline underline-offset-4"
          style={{ color: "var(--vmc-color-text-brand-hover)" }}
        >
          Abrir DESIGN.md completo (spec v1.1.0) →
        </Link>
      </div>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Jerarquía de tokens (IB + DESIGN.md §12)
      </h3>
      <div
        className="rounded-lg border p-5 mb-8 font-mono text-xs leading-relaxed"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-subtle)",
          color: "var(--vmc-color-text-secondary)",
        }}
      >
        <p>Primitives → Semantic (intent) → Component decisions</p>
        <p className="mt-2 opacity-90">
          Ejemplo: vault-900 → color.text.brand / color.background.brand → AuctionCard signature + badges.
        </p>
      </div>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Reglas núcleo (DESIGN.md §8)
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {CORE_RULES.map((rule) => (
          <RuleCard key={rule.title} title={rule.title} body={rule.body} />
        ))}
      </div>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Cumplimiento IB (infraestructura)
      </h3>
      <ul
        className="rounded-lg border p-5 mb-10 space-y-2 text-sm list-disc pl-5"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-subtle)",
          color: "var(--vmc-color-text-secondary)",
        }}
      >
        {IB_ENFORCEMENT.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Atributo data-status (contrato)
      </h3>
      <div
        className="rounded-lg border overflow-x-auto mb-10"
        style={{ borderColor: "var(--vmc-color-border-default)" }}
      >
        <table className="w-full text-left text-xs">
          <thead>
            <tr style={{ background: "var(--vmc-color-background-tertiary)" }}>
              <th className="p-3 font-mono" style={{ color: "var(--vmc-color-text-secondary)" }}>
                Componente
              </th>
              <th className="p-3 font-mono" style={{ color: "var(--vmc-color-text-secondary)" }}>
                Atributo
              </th>
              <th className="p-3 font-mono" style={{ color: "var(--vmc-color-text-secondary)" }}>
                Nota
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA_STATUS_ROWS.map((row) => (
              <tr key={row.component} style={{ borderTop: "1px solid var(--vmc-color-border-subtle)" }}>
                <td className="p-3 font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
                  {row.component}
                </td>
                <td className="p-3 font-mono" style={{ color: "var(--vmc-color-text-brand)" }}>
                  {row.attr}
                </td>
                <td className="p-3" style={{ color: "var(--vmc-color-text-tertiary)" }}>
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Variantes de badge (tokens = DESIGN.md §9.4)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
        <BadgeSwatch label="EN VIVO" bgVar="--vmc-color-badge-live-bg" textVar="--vmc-color-badge-live-text" />
        <BadgeSwatch label="NEGOCIABLE" bgVar="--vmc-color-badge-negotiable-bg" textVar="--vmc-color-badge-negotiable-text" />
        <BadgeSwatch label="PRÓX." bgVar="--vmc-color-badge-upcoming-bg" textVar="--vmc-color-badge-upcoming-text" />
        <BadgeSwatch label="CERRADO" bgVar="--vmc-color-badge-closed-bg" textVar="--vmc-color-badge-closed-text" />
        <BadgeSwatch label="DESTACADO" bgVar="--vmc-color-badge-featured-bg" textVar="--vmc-color-badge-featured-text" />
        <BadgeSwatch label="NUEVO" bgVar="--vmc-color-badge-new-bg" textVar="--vmc-color-badge-new-text" />
      </div>

      <h3
        className="text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        Alineación Stitch ↔ tokens (decisiones vigentes)
      </h3>
      <div className="space-y-4 mb-10">
        {DESIGN_VS_TOKENS.map((row) => (
          <div
            key={row.topic}
            className="rounded-lg border p-4"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-subtle)",
            }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
              {row.topic}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
              {row.resolution}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="rounded-lg border p-5"
          style={{
            background: "var(--vmc-color-background-secondary)",
            borderColor: "var(--vmc-color-border-subtle)",
          }}
        >
          <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--vmc-color-status-success)" }}>
            Do (DESIGN.md §13)
          </p>
          <ul className="text-sm space-y-2 list-disc pl-4" style={{ color: "var(--vmc-color-text-secondary)" }}>
            {DOS.map((d, index) => (
              <li key={index}>{d}</li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-lg border p-5"
          style={{
            background: "var(--vmc-color-background-secondary)",
            borderColor: "var(--vmc-color-border-subtle)",
          }}
        >
          <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--vmc-color-status-error)" }}>
            Don&apos;t (DESIGN.md §13)
          </p>
          <ul className="text-sm space-y-2 list-disc pl-4" style={{ color: "var(--vmc-color-text-secondary)" }}>
            {DONTS.map((d, index) => (
              <li key={index}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
