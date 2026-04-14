import Link from "next/link";
import { SectionTitle } from "../components/SectionTitle";

const FUNDAMENTOS_CIERRE = [
  "Pipeline: `tokens.json` → Terrazzo → `tokens-*.css` → `globals.css` @theme",
  "`pnpm tokens:audit` (gatekeeper + Terrazzo + TypeScript + ESLint)",
  "`postinstall` regenera CSS de tokens tras `pnpm install`",
  "Capa de estado: `makeStore` + `StoreProvider` + `ModalStoreProvider` + `middleware.ts`",
  "Gobernanza: color alineado a DESIGN.md; tipografía/motion siguen IB salvo decisión explícita",
];

export function FundamentosGateSection() {
  return (
    <section>
      <SectionTitle
        id="ib-orden"
        title="Gate ib-fundamentos"
        subtitle="Criterios de salida antes de escalar ib-componentes (Task C del IB Macro)"
        badge="IB"
      />

      <div
        className="rounded-lg border p-6 space-y-4"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
          Checklist de cierre
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm" style={{ color: "var(--vmc-color-text-secondary)" }}>
          {FUNDAMENTOS_CIERRE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          En el orden IB, <strong style={{ color: "var(--vmc-color-text-primary)" }}>ib-taxonomia</strong> es previa a
          este gate: inventario y decisiones en{" "}
          <Link href="/docs/taxonomia" className="underline underline-offset-2" style={{ color: "var(--vmc-color-text-brand)" }}>
            /docs/taxonomia
          </Link>{" "}
          e{" "}
          <Link
            href="/docs/taxonomia/inventario"
            className="underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            /docs/taxonomia/inventario
          </Link>{" "}
          (`TAXONOMY.md`, Ruta B).
        </p>
      </div>
    </section>
  );
}
