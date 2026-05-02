/**
 * @figma-spec
 * @component    OfferTypeTile | 1fr×80 | Page:Stitch
 * @description  Tile de tipo de oferta para QuickFilters.
 *               Ancho flexible (grid 1fr) · minHeight 80px (= CategoryTile).
 *               2 variantes × 2 estados = 4 combinaciones.
 *               Fila superior: color variante siempre · Fila inferior: blanco/pressed.
 *
 * @tokens
 *   negotiable-color : --vmc-color-badge-negotiable-bg : #00CACE
 *   live-color       : --vmc-color-badge-live-bg       : #ED8936
 *   surface          : --vmc-color-background-card     : #FFFFFF
 *   text-inverse     : --vmc-color-text-inverse        : #FFFFFF
 *   border           : --vmc-color-vault-200
 *   shadow-default   : 0 2px 10px rgba(34,0,92,0.10)
 *   shadow-neg-press : 0 4px 20px rgba(0,202,206,0.35)
 *   shadow-live-press: 0 4px 20px rgba(237,137,54,0.35)
 *
 * @typography
 *   variant-label : Plus Jakarta Sans | Bold | 11px | lh:16px | uppercase
 *   ver-todas     : Plus Jakarta Sans | Bold | 9px  | lh:12px | uppercase · ls:0.05em
 *
 * @layers
 *   root      : COMPONENT : 1fr×80  : radius:10, overflow:hidden, border, shadow
 *   top-row   : Frame     : 100%×1fr: fill:variant-color, flex:center
 *   top-label : Text      : auto    : style:variant-label, fill:text-inverse
 *   bot-row   : Frame     : 100%×1fr: fill:surface|variant-color(pressed), flex:center
 *   bot-label : Text      : auto    : style:ver-todas, fill:variant-color|text-inverse(pressed)
 *
 * @variants
 *   [x] negociable · [x] default · [x] pressed
 *   [x] en-vivo    · [x] default · [x] pressed
 *
 * @states
 *   [x] default : top=variant-color · bot=blanco · bot-label=variant-color
 *   [x] pressed : top=variant-color · bot=variant-color · bot-label=blanco
 */

/**
 * OfferTypeTile — UI Upgrade · VOYAGER v1.0.0
 * 1fr×80px · negociable | en-vivo · default | pressed
 */

import type { JSX } from "react";

export type OfferTypeTileVariant = "negociable" | "en-vivo";
export type OfferTypeTileState   = "default" | "pressed";

interface OfferTypeTileProps {
  href:     string;
  variant:  OfferTypeTileVariant;
  state?:   OfferTypeTileState;
}

const VARIANT_CONFIG: Record<OfferTypeTileVariant, {
  label:       string;
  color:       string;
  shadowPress: string;
}> = {
  "negociable": {
    label:       "Negociable",
    color:       "var(--vmc-color-badge-negotiable-bg)",
    shadowPress: "0 4px 20px rgba(0, 202, 206, 0.35)",
  },
  "en-vivo": {
    label:       "En Vivo",
    color:       "var(--vmc-color-badge-live-bg)",
    shadowPress: "0 4px 20px rgba(237, 137, 54, 0.35)",
  },
};

export default function OfferTypeTile({ href, variant, state = "default" }: OfferTypeTileProps): JSX.Element {
  const cfg       = VARIANT_CONFIG[variant];
  const isPressed = state === "pressed";

  return (
    <a
      href={href}
      style={{
        boxSizing:      "border-box",
        display:        "grid",
        gridTemplateRows: "1fr 1fr",
        width:          "100%",
        minHeight:      80,
        borderRadius:   10,
        overflow:       "hidden",
        border:         isPressed ? "1px solid transparent" : "1px solid var(--vmc-color-vault-200)",
        boxShadow:      isPressed ? cfg.shadowPress : "0 2px 10px rgba(34, 0, 92, 0.10)",
        textDecoration: "none",
        outline:        "none",
      }}
    >
      {/* Top row — variant color always */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     cfg.color,
      }}>
        <span style={{
          fontFamily:    "var(--vmc-font-display)",
          fontSize:      11,
          fontWeight:    700,
          lineHeight:    "16px",
          color:         "#FFFFFF",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Bottom row — white default, variant-color pressed */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     isPressed ? cfg.color : "var(--vmc-color-background-card)",
      }}>
        <span style={{
          fontFamily:    "var(--vmc-font-display)",
          fontSize:      9,
          fontWeight:    700,
          lineHeight:    "12px",
          color:         isPressed ? "#FFFFFF" : cfg.color,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          Ver Todas
        </span>
      </div>
    </a>
  );
}
