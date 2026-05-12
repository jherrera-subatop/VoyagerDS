"use client";
import type { CSSProperties, JSX } from "react";

const fd = "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)";

export type ChipStyle = "vault" | "live" | "outlined" | "orange";

const GHOST_BG    = "color-mix(in oklch, var(--color-vault, #22005C) 6%, white)";
const GHOST_COLOR = "color-mix(in oklch, var(--color-vault, #22005C) 40%, white)";
const GHOST_BORDER= "1px solid color-mix(in oklch, var(--color-vault, #22005C) 12%, white)";

function resolveActiveStyle(chipStyle: ChipStyle): CSSProperties {
  if (chipStyle === "vault") {
    return {
      background: "linear-gradient(135deg, oklch(0.48 0.22 280) 0%, oklch(0.28 0.20 285) 100%)",
      color: "#FFFFFF",
      boxShadow: "0 0 0 1px oklch(0.22 0.18 285 / 18%), 0 4px 14px oklch(0.22 0.18 285 / 38%)",
    };
  }
  if (chipStyle === "orange") {
    return {
      background: "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.62 0.18 46) 100%)",
      color: "#FFFFFF",
      boxShadow: "0 0 0 1px oklch(0.62 0.18 46 / 20%), 0 4px 14px oklch(0.62 0.18 46 / 35%)",
    };
  }
  if (chipStyle === "live") {
    return {
      background: "linear-gradient(135deg, color-mix(in oklch, var(--color-vault-mid, #3B1782) 22%, white) 0%, color-mix(in oklch, var(--color-vault, #22005C) 18%, white) 100%)",
      color: "var(--color-vault, #22005C)",
      border: "1.5px solid color-mix(in oklch, var(--color-vault, #22005C) 38%, transparent)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.70), 0 2px 10px oklch(0.22 0.18 285 / 16%)",
    };
  }
  return {
    background: "var(--color-surface-card, #FFFFFF)",
    color: "var(--color-vault, #22005C)",
    border: "2px solid var(--color-vault, #22005C)",
    boxShadow: "0 2px 8px oklch(0.22 0.18 285 / 12%)",
  };
}

interface ConditionChipProps {
  label: string;
  active: boolean;
  chipStyle: ChipStyle;
}

function ConditionChip({ label, active, chipStyle }: ConditionChipProps): JSX.Element {
  const activeStyle = resolveActiveStyle(chipStyle);
  const inactiveStyle: CSSProperties = {
    background: GHOST_BG,
    color: GHOST_COLOR,
    border: GHOST_BORDER,
  };

  return (
    <div
      style={{
        width: "calc(50% - 4px)",
        height: 44,
        fontFamily: fd,
        fontSize: 12,
        fontWeight: active ? 600 : 400,
        lineHeight: "16px",
        textAlign: "center",
        padding: "0 8px",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        flexShrink: 0,
        ...(active ? activeStyle : inactiveStyle),
      }}
    >
      {label}
    </div>
  );
}

interface AuctionConditionsProps {
  chipStyle?: ChipStyle;
  bg?: string;
}

export default function AuctionConditions({ chipStyle = "live", bg = "var(--color-surface-card, #FFFFFF)" }: AuctionConditionsProps): JSX.Element {
  return (
    <div
      style={{
        width: 311,
        backgroundColor: bg,
        borderRadius: 8,
        boxShadow: "var(--shadow-card, 0 8px 16px oklch(0.22 0.18 285 / 6%))",
        padding: "16px 16px 20px",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
      }}
    >
      <ConditionChip label="Con Precio Reserva"               active         chipStyle={chipStyle} />
      <ConditionChip label="Sin Opción a Visitas"             active={false} chipStyle={chipStyle} />
      <ConditionChip label="Con Comisión"                     active         chipStyle={chipStyle} />
      <ConditionChip label="Cuota mínima de participantes: 2" active         chipStyle={chipStyle} />
      <ConditionChip label="Sin Opción a Financiamiento"      active={false} chipStyle={chipStyle} />
    </div>
  );
}
