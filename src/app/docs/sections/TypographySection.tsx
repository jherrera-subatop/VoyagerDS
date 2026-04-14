import { SectionTitle } from "../components/SectionTitle";

interface TextStyleRowProps {
  token: string;
  label: string;
  sample: string;
  size: string;
  lineHeight: string;
  weight: string;
  font: string;
  fontVar: string;
  extra?: string;
  isNumeric?: boolean;
}

function TextStyleRow({
  token, label, sample, size, lineHeight, weight, font, fontVar, extra, isNumeric,
}: TextStyleRowProps) {
  return (
    <div
      className="flex items-baseline gap-6 py-4 border-b"
      style={{ borderColor: "var(--vmc-color-border-subtle)" }}
    >
      {/* Sample */}
      <div className="w-80 shrink-0 overflow-hidden">
        <p
          style={{
            fontFamily: `var(${fontVar}, ${font})`,
            fontSize: size,
            lineHeight,
            fontWeight: weight,
            color: "var(--vmc-color-text-primary)",
            fontVariantNumeric: isNumeric ? "tabular-nums" : undefined,
            textTransform: extra === "uppercase" ? "uppercase" : undefined,
            letterSpacing: extra === "uppercase" ? "0.08em" : undefined,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {sample}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-6 flex-1">
        <code
          className="text-xs font-mono"
          style={{ color: "var(--vmc-color-text-brand)", minWidth: "12rem" }}
        >
          text-{token}
        </code>
        <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary) ", minWidth: "5rem" }}>
          {size}
        </span>
        <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)", minWidth: "5rem" }}>
          lh {lineHeight}
        </span>
        <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)", minWidth: "4rem" }}>
          w{weight}
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--vmc-color-text-secondary)" }}>
          {label}
        </span>
        {extra && (
          <span
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{
              background: "var(--vmc-color-background-tertiary)",
              color: "var(--vmc-color-text-tertiary)",
            }}
          >
            {extra}
          </span>
        )}
        {isNumeric && (
          <span
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{
              background: "var(--vmc-color-vault-100)",
              color: "var(--vmc-color-vault-900)",
            }}
          >
            tabular-nums
          </span>
        )}
      </div>
    </div>
  );
}

export function TypographySection() {
  return (
    <section>
      <SectionTitle
        id="tipografia"
        title="Sistema Tipográfico"
        subtitle="20 text styles bloqueados · Plus Jakarta Sans + Roboto + Roboto Mono · ningún componente crea nuevos estilos"
        badge="20 estilos"
      />

      <div
        className="rounded-lg border overflow-hidden"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        {/* Legend */}
        <div
          className="flex items-center gap-6 px-6 py-3 border-b text-xs"
          style={{
            borderColor: "var(--vmc-color-border-subtle)",
            color: "var(--vmc-color-text-tertiary)",
            background: "var(--vmc-color-background-tertiary)",
          }}
        >
          <span className="w-80 shrink-0">Muestra</span>
          <span className="min-w-[12rem]">Token</span>
          <span className="min-w-[5rem]">Size</span>
          <span className="min-w-[5rem]">Line-h</span>
          <span className="min-w-[4rem]">Weight</span>
          <span>Familia</span>
        </div>

        <div className="px-6">
          {/* Display */}
          <p className="text-xs font-mono pt-4 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            DISPLAY — Plus Jakarta Sans
          </p>
          <TextStyleRow token="display-xl" label="Plus Jakarta Sans" sample="Subasta en Vivo" size="48px" lineHeight="1.167" weight="700" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="display-lg" label="Plus Jakarta Sans" sample="Subasta en Vivo" size="40px" lineHeight="1.2" weight="700" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="display-md" label="Plus Jakarta Sans" sample="Lote #4521 · Toyota Hilux" size="32px" lineHeight="1.25" weight="600" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />

          {/* Heading */}
          <p className="text-xs font-mono pt-6 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            HEADING — Plus Jakarta Sans
          </p>
          <TextStyleRow token="heading-xl" label="Plus Jakarta Sans" sample="Detalles del vehículo" size="28px" lineHeight="1.286" weight="600" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="heading-lg" label="Plus Jakarta Sans" sample="Historial de pujas" size="24px" lineHeight="1.333" weight="600" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="heading-md" label="Plus Jakarta Sans" sample="Especificaciones técnicas" size="20px" lineHeight="1.4" weight="600" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="heading-sm" label="Plus Jakarta Sans" sample="Estado de la subasta" size="18px" lineHeight="1.333" weight="500" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />

          {/* Body */}
          <p className="text-xs font-mono pt-6 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            BODY — Roboto
          </p>
          <TextStyleRow token="body-lg" label="Roboto" sample="Vehículo en excelente estado, con mantenimiento al día" size="18px" lineHeight="1.556" weight="400" font="Roboto, sans-serif" fontVar="--font-body" />
          <TextStyleRow token="body-md" label="Roboto" sample="Motor 2.4L gasolina, transmisión automática de 6 velocidades" size="16px" lineHeight="1.5" weight="400" font="Roboto, sans-serif" fontVar="--font-body" />
          <TextStyleRow token="body-sm" label="Roboto" sample="Kilometraje verificado por VMC en inspección del 12/03/2026" size="14px" lineHeight="1.429" weight="400" font="Roboto, sans-serif" fontVar="--font-body" />

          {/* Label */}
          <p className="text-xs font-mono pt-6 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            LABEL — Plus Jakarta Sans
          </p>
          <TextStyleRow token="label-lg" label="Plus Jakarta Sans" sample="Confirmar puja" size="16px" lineHeight="1.5" weight="500" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="label-md" label="Plus Jakarta Sans" sample="Precio base" size="14px" lineHeight="1.429" weight="500" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />
          <TextStyleRow token="label-sm" label="Plus Jakarta Sans" sample="Activo" size="12px" lineHeight="1.333" weight="500" font="Plus Jakarta Sans, sans-serif" fontVar="--font-display" />

          {/* Caption */}
          <p className="text-xs font-mono pt-6 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            CAPTION — Roboto
          </p>
          <TextStyleRow token="caption" label="Roboto" sample="Subasta cerrada el 12 de abril de 2026 a las 15:32 hrs" size="12px" lineHeight="1.333" weight="400" font="Roboto, sans-serif" fontVar="--font-body" />
          <TextStyleRow token="overline" label="Roboto" sample="Categoría vehículo" size="10px" lineHeight="1.4" weight="500" font="Roboto, sans-serif" fontVar="--font-body" extra="uppercase" />

          {/* Numeric */}
          <p className="text-xs font-mono pt-6 pb-2 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}>
            NUMERIC — Roboto Mono · tabular-nums nativo
          </p>
          <TextStyleRow token="numeric-xl" label="Roboto Mono" sample="S/ 48,500.00" size="40px" lineHeight="1.2" weight="700" font="Roboto Mono, monospace" fontVar="--font-mono" isNumeric />
          <TextStyleRow token="numeric-lg" label="Roboto Mono" sample="S/ 32,750.00" size="32px" lineHeight="1.25" weight="600" font="Roboto Mono, monospace" fontVar="--font-mono" isNumeric />
          <TextStyleRow token="numeric-md" label="Roboto Mono" sample="S/ 24,000.00" size="24px" lineHeight="1.333" weight="500" font="Roboto Mono, monospace" fontVar="--font-mono" isNumeric />
          <TextStyleRow token="numeric-sm" label="Roboto Mono" sample="S/ 16,250.00" size="16px" lineHeight="1.5" weight="400" font="Roboto Mono, monospace" fontVar="--font-mono" isNumeric />
          <TextStyleRow token="numeric-xs" label="Roboto Mono" sample="#LOT-12345" size="12px" lineHeight="1.333" weight="400" font="Roboto Mono, monospace" fontVar="--font-mono" isNumeric />
        </div>
      </div>
    </section>
  );
}
