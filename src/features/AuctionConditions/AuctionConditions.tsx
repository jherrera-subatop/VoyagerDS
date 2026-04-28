"use client";
import type { CSSProperties, JSX } from "react";

interface ConditionChipProps {
  label: string;
  variant: "active" | "inactive";
}

function resolveChipBg(variant: "active" | "inactive"): CSSProperties {
  if (variant === "active") {
    return { backgroundColor: "var(--color-vault, #22005C)" };
  }
  return { backgroundColor: "var(--color-skeleton, #C8CACC)" };
}

function ConditionChip({ label, variant }: ConditionChipProps): JSX.Element {
  return (
    <div
      className="px-2 py-2 mx-1 my-2 w-[calc(50%-.5rem)] text-xs leading-tight text-center h-[42px] flex items-center justify-center"
      style={{
        fontFamily: "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)",
        fontWeight: 500,
        color: "var(--color-text-on-dark, #FFFFFF)",
        borderRadius: "var(--radius-sm, 4px)",
        ...resolveChipBg(variant),
      }}
    >
      {label}
    </div>
  );
}

export default function AuctionConditions(): JSX.Element {
  return (
    <div
      className="flex flex-wrap justify-center p-2"
      style={{
        width: "317px",
        backgroundColor: "var(--color-surface-card, #FFFFFF)",
        borderRadius: "0 0 var(--radius-lg, 16px) var(--radius-lg, 16px)",
        boxShadow: "var(--shadow-card, 0 8px 16px oklch(0.22 0.18 285 / 6%))",
      }}
    >
      <ConditionChip label="Con Precio Reserva" variant="active" />
      <ConditionChip label="Sin Opción a Visitas" variant="inactive" />
      <ConditionChip label="Con Comisión" variant="active" />
      <ConditionChip label="Cuota mínima de participantes: 2" variant="active" />
      <ConditionChip label="Sin Opción a Financiamiento" variant="inactive" />
    </div>
  );
}
