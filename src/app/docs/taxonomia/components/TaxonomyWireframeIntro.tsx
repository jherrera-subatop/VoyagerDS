import type { ReactNode } from "react";
import Link from "next/link";
import { SUBASCARS_STORYBOOK_BY_COMPONENT_ID, VMC_AUDIT_DETALLE_LABEL } from "../_data/wireframe-references";

const FRAME_STYLE = {
  borderWidth: "2px",
  borderStyle: "solid" as const,
  borderColor: "var(--vmc-color-vault-700)",
  background: "var(--vmc-color-background-tertiary)",
};

/**
 * Wireframe legible: contraste fuerte + referencias reales (SubasCars Storybook vs audit VMC).
 */
export function TaxonomyWireframeIntro() {
  const storybookEntries = Object.entries(SUBASCARS_STORYBOOK_BY_COMPONENT_ID);

  return (
    <section className="rounded-lg p-1 space-y-4" style={FRAME_STYLE}>
      <div className="rounded-md p-5 space-y-3" style={{ background: "var(--vmc-color-background-secondary)" }}>
        <h2
          className="text-base font-semibold"
          style={{
            color: "var(--vmc-color-text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          Wireframe con referencia (SubasCars + VMC)
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
          En ib-taxonomía el wireframe no es “vacío”: una columna apunta al{" "}
          <strong style={{ color: "var(--vmc-color-text-primary)" }}>Storybook SubasCars</strong> cuando hay anatomía
          documentada, y la otra al <strong style={{ color: "var(--vmc-color-text-primary)" }}>audit en VMC</strong>{" "}
          (DOM + capturas de producción). Voyager no incrusta esas UIs: son referencia para ib-componentes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-2 pb-2">
        <ReferenceLane
          title="Referencia SubasCars"
          accentBorder="var(--vmc-color-vault-500)"
          subtitle="Abre en otra pestaña el story concreto citado en TAXONOMY.md (anatomía, no portar código)."
        >
          <ul className="space-y-3 list-none p-0 m-0">
            {storybookEntries.map(([componentId, href]) => {
              return (
                <li key={componentId}>
                  <p className="text-xs font-mono font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
                    {componentId}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-2 break-all"
                    style={{ color: "var(--vmc-color-text-brand)" }}
                  >
                    Ver en Storybook SubasCars
                  </a>
                </li>
              );
            })}
          </ul>
        </ReferenceLane>

        <ReferenceLane
          title="Referencia VMC"
          accentBorder="var(--vmc-color-orange-600)"
          subtitle="Piezas que se construyen desde la experiencia real en VMC (comportamiento y layout mandan)."
        >
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--vmc-color-text-secondary)" }}>
            {VMC_AUDIT_DETALLE_LABEL}
          </p>
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--vmc-color-text-primary)" }}>
            Implementación de referencia en código Voyager
          </p>
          <Link
            href="/docs/componentes"
            className="text-sm font-medium underline underline-offset-2"
            style={{ color: "var(--vmc-color-text-brand)" }}
          >
            /docs/componentes — átomos ya mapeados a tokens
          </Link>
        </ReferenceLane>
      </div>

      <div
        className="mx-2 mb-2 rounded-md border px-4 py-3"
        style={{
          borderColor: "var(--vmc-color-border-default)",
          background: "var(--vmc-color-background-primary)",
        }}
      >
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--vmc-color-text-primary)" }}>
          Niveles de ensamblaje (solo bloques guía)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <WireBlock label="Átomo" body="Icon, control base" />
          <WireBlock label="Molécula" body="Input + label, fila de precio" />
          <WireBlock label="Organismo" body="Panel de puja, bloque de specs" />
        </div>
      </div>
    </section>
  );
}

function ReferenceLane({
  title,
  subtitle,
  accentBorder,
  children,
}: Readonly<{
  title: string;
  subtitle: string;
  accentBorder: string;
  children: ReactNode;
}>) {
  return (
    <div
      className="rounded-md border-l-4 p-4 min-h-[200px]"
      style={{
        borderLeftColor: accentBorder,
        borderTopColor: "var(--vmc-color-border-default)",
        borderRightColor: "var(--vmc-color-border-default)",
        borderBottomColor: "var(--vmc-color-border-default)",
        borderTopWidth: "1px",
        borderRightWidth: "1px",
        borderBottomWidth: "1px",
        borderStyle: "solid",
        background: "var(--vmc-color-background-primary)",
      }}
    >
      <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
        {title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        {subtitle}
      </p>
      {children}
    </div>
  );
}

function WireBlock({ label, body }: Readonly<{ label: string; body: string }>) {
  return (
    <div
      className="rounded-md p-3 border border-dashed min-h-[72px] flex flex-col justify-center"
      style={{
        borderColor: "var(--vmc-color-vault-600)",
        background: "var(--vmc-color-background-secondary)",
      }}
    >
      <span className="text-xs font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
        {label}
      </span>
      <span className="text-xs mt-1" style={{ color: "var(--vmc-color-text-secondary)" }}>
        {body}
      </span>
    </div>
  );
}
