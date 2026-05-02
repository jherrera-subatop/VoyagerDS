/**
 * @figma-spec
 * @component    AuctionConditions | 317x190 | Page:Stitch
 *
 * @tokens
 *   vault    : --color-vault         : #22005C
 *   skeleton : --color-skeleton      : #C8CACC
 *   onDark   : --color-text-on-dark  : #FFFFFF
 *   surface  : --color-surface-card  : #FFFFFF
 *
 * @typography
 *   chip-label : Plus Jakarta Sans | Medium | 12px | lh:tight | "Con Precio Reserva" etc.
 *
 * @layers
 *   root         : COMPONENT : 317x190 : x:0,  y:0  : fill:surface, radius:0 0 16 16, shadow:0 8px 16px oklch(0.22 0.18 285/6%), padding:8
 *   chip-active  : Frame     : 145x42  : x:8,  y:var: fill:vault, radius:4px
 *   chip-inactive: Frame     : 145x42  : x:var,y:var: fill:skeleton, radius:4px
 *   chip-txt     : Text      : autoXauto:x:8,y:14  : style:chip-label, fill:onDark
 *
 * @subcomponents
 *   ConditionChip : inline
 *     @tokens   bg:vault (active) | bg:skeleton (inactive) | txt:onDark
 *     @layers   chip:Frame:145x42:x:0,y:0:fill:var
 *
 * @variants
 *   prop: variant (per ConditionChip)
 *     [x] active   : fondo vault, texto blanco
 *     [x] inactive : fondo skeleton gris, texto blanco
 *
 * @states
 *   [x] default  : 5 chips distribuidos en 2 columnas: 3 activos (vault), 2 inactivos (skeleton)
 *   [ ] hover    : (futuro)
 *   [ ] focus    : (futuro)
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

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
