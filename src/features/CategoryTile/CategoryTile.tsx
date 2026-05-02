/**
 * @figma-spec
 * @component    CategoryTile | auto×80 | Page:Stitch
 * @description  Tile de categoría para QuickFilters.
 *               Fondo vault-900 (= footer brand surface) · ícono + label blancos.
 *               Texto completo sin truncar · 4 variantes.
 *
 * @tokens
 *   surface        : --vmc-color-background-card  : #FFFFFF
 *   border         : --vmc-color-vault-200         : rgb(90.98% 87.06% 100%)
 *   icon-color     : --vmc-color-background-brand  : #22005C
 *   label-color    : --vmc-color-background-brand  : #22005C
 *   shadow         : 0 2px 10px rgba(34,0,92,0.10)
 *   pressed-surface: --vmc-color-background-brand  : #22005C
 *   pressed-content: --vmc-color-text-inverse      : #FFFFFF
 *
 * @typography
 *   label : Plus Jakarta Sans | Bold | 9px | lh:11px | ls:0.05em | uppercase · wrap · center
 *
 * @layers
 *   root      : COMPONENT : 1fr×auto : fill:surface, radius:10, border, shadow, padding:12 8 10
 *   icon-wrap : Frame     : 24x24    : flex:center, color:icon-color
 *   icon      : SVG       : 24x24    : fill:currentColor
 *   label-txt : Text      : 100%×auto: style:label, fill:label-color, wrap:2-line
 *
 * @variants
 *   [x] vehicular          : ícono vehículo   · label:"Vehicular"
 *   [x] maquinaria         : ícono maquinaria · label:"Maquinaria"
 *   [x] equipos-diversos   : ícono caja       · label:"Equipos diversos"
 *   [x] articulos-diversos : ícono estrella   · label:"Artículos diversos"
 *
 * @states
 *   [x] default  : blanco · icono+label vault-900 · borde vault-200
 *   [ ] hover    : (futuro) bg vault-100
 *   [ ] pressed  : bg vault-900 · icono+label blanco (= background-brand, como el footer)
 *   [ ] active   : (futuro) scale 0.96
 */

/**
 * CategoryTile — UI Upgrade · VOYAGER v5.0.0
 * vault-900 surface · white icon + label · no truncation
 */

import type { JSX } from "react";

export type CategoryTileVariant =
  | "vehicular"
  | "maquinaria"
  | "equipos-diversos"
  | "articulos-diversos";

export type CategoryTileState = "default" | "pressed";

interface CategoryTileProps {
  href:    string;
  variant: CategoryTileVariant;
  state?:  CategoryTileState;
  label?:  string;
}

const DEFAULT_LABELS: Record<CategoryTileVariant, string> = {
  "vehicular":           "Vehicular",
  "maquinaria":          "Maquinaria",
  "equipos-diversos":    "Equipos diversos",
  "articulos-diversos":  "Artículos diversos",
};

function VehicleIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ width: 24, height: 24, flexShrink: 0 }}>
      <path d="M5.5 12.9c-.5 0-.9.2-1.4.4-.4.3-.7.7-.9 1.1-.2.5-.2 1-.1 1.5s.3.9.7 1.2c.3.4.8.6 1.2.7.5.1 1 .1 1.5-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.3-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.3.3.5.5.1.1.2.4.2.6 0 .3-.2.6-.4.8-.2.2-.5.3-.8.3ZM19.2 12.9c-.5 0-.9.2-1.3.4-.4.3-.8.7-.9 1.1-.2.5-.3 1-.2 1.5.1.5.3.9.7 1.2.3.4.8.6 1.3.7.4.1.9.1 1.4-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.2-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6.1-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.4.3.5.5.1.1.2.4.2.6 0 .3-.1.6-.4.8-.2.2-.5.3-.8.3Z"
        fill="currentColor" />
      <path d="m22.5 10.9-4.4-.8-3.8-3.2c-.4-.3-.8-.5-1.3-.5H7.4c-.3 0-.6.1-.9.2-.3.2-.5.4-.7.6l-2.5 2.9H1.7c-.4 0-.9.1-1.2.5-.3.3-.5.7-.5 1.2v2.1c0 .5.2 1.1.6 1.5.4.3.9.6 1.5.6h.4c-.1-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h7.7c0-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h.1c.4 0 .9-.2 1.2-.5.3-.4.5-.8.5-1.2v-1.7c0-.4-.1-.8-.4-1.2-.3-.3-.7-.5-1.1-.5ZM8.4 9.5c0 .1-.1.3-.2.4-.1.1-.2.2-.4.2H5.3c-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1v-.2s0-.1.1-.1l1.6-2c.1 0 .2-.1.2-.1.1 0 .2-.1.3-.1h.6c.2 0 .3.1.4.2.1.1.2.3.2.4v1.5Zm2.8 2.7h-.7c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4 0-.2.1-.3.2-.4.1-.1.2-.2.4-.2h.7c.2 0 .3.1.4.2.1.1.2.2.2.4 0 .1-.1.3-.2.4-.1.1-.2.2-.4.2Zm4.5-2.1h-5.4c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4V8c0-.1.1-.3.2-.4.1-.1.2-.2.4-.2H13c.2 0 .3.1.4.2l2.5 2c.1 0 .1.1.1.1v.2s0 .1-.1.1c0 .1-.1.1-.2.1Z"
        fill="currentColor" />
    </svg>
  );
}

function MachineryIcon(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 24, height: 24, flexShrink: 0 }}>
      <path d="M20 7.3C19.9 7.1 19.6 7 19.4 7H16.3C16 7 15.7 7.2 15.6 7.5L13.5 12.6H11.7L10.9 5.3C10.8 4.9 10.5 4.6 10.1 4.6H1.8C1.4 4.6 1 5 1 5.4 1 5.9 1.4 6.2 1.8 6.2H2.1V12.7C2 12.6 1.9 12.6 1.8 12.6 1.4 12.6 1 13 1 13.4V15.1C1 15.5 1.2 15.7 1.5 15.8 1.9 15.4 2.6 15.1 3.3 15.1H11.9L11.8 14.2H14.1C14.4 14.2 14.7 14 14.8 13.7L16.9 8.6H19L19.5 9.3H21.4L20 7.3ZM4.7 11H3.7V6.2H4.7V11ZM6.2 11V6.2H9.4L9.9 11H6.2V11Z"
        fill="currentColor" />
      <path d="M19.6 10.1V10.1 12.1C21.1 12.8 22.3 13.9 23 15.3V10.1H19.6Z"
        fill="currentColor" />
      <path d="M16.7 15.9H3.3C2.2 15.9 1.4 16.8 1.4 17.8 1.4 18.8 2.2 19.7 3.3 19.7H16.7C17.8 19.7 18.6 18.8 18.6 17.8 18.6 16.8 17.8 15.9 16.7 15.9ZM3.5 18.6C3 18.6 2.7 18.2 2.7 17.8 2.7 17.4 3 17 3.5 17 3.9 17 4.2 17.4 4.2 17.8 4.2 18.2 3.9 18.6 3.5 18.6ZM16.6 18.6C16.2 18.6 15.9 18.2 15.9 17.8 15.9 17.4 16.2 17 16.6 17 17.1 17 17.4 17.4 17.4 17.8 17.4 18.2 17.1 18.6 16.6 18.6Z"
        fill="currentColor" />
    </svg>
  );
}

function BoxIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ width: 24, height: 24, flexShrink: 0 }}>
      <path d="M21 8.5V5.8C21 5.5 20.8 5.3 20.5 5.3H3.6C3.3 5.3 3.1 5.5 3.1 5.8V8.5H21Z"
        fill="currentColor" />
      <path d="M11 12.7H13.1C13.4 12.7 13.6 12.5 13.6 12.2 13.6 11.9 13.4 11.6 13.1 11.6H11C10.7 11.6 10.4 11.9 10.4 12.2 10.4 12.5 10.7 12.7 11 12.7Z"
        fill="currentColor" />
      <path d="M4.1 9.5V18.5C4.1 18.8 4.3 19 4.6 19H19.4C19.7 19 19.9 18.8 19.9 18.5V9.5H4.1ZM11 10.6H13.1C14 10.6 14.7 11.3 14.7 12.2 14.7 13 14 13.8 13.1 13.8H11C10.1 13.8 9.4 13 9.4 12.2 9.4 11.3 10.1 10.6 11 10.6Z"
        fill="currentColor" />
    </svg>
  );
}

function StarIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ width: 24, height: 24, flexShrink: 0 }}>
      <path d="M12 2C6.5 2 2 6.5 2 12 2 17.5 6.5 22 12 22 17.5 22 22 17.5 22 12 22 6.5 17.5 2 12 2ZM16.2 18L12 15.5 7.8 18 8.9 13.2 5.2 10 10.1 9.5 12 5 13.9 9.5 18.8 10 15.1 13.2 16.2 18Z"
        fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<CategoryTileVariant, JSX.Element> = {
  "vehicular":           <VehicleIcon />,
  "maquinaria":          <MachineryIcon />,
  "equipos-diversos":    <BoxIcon />,
  "articulos-diversos":  <StarIcon />,
};

export default function CategoryTile({ href, variant, state = "default", label }: CategoryTileProps): JSX.Element {
  const resolvedLabel = label ?? DEFAULT_LABELS[variant];
  const icon = ICONS[variant];
  const isPressed = state === "pressed";

  return (
    <a
      href={href}
      style={{
        boxSizing:      "border-box",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        width:          "100%",
        minHeight:      80,
        paddingTop:     12,
        paddingBottom:  10,
        paddingLeft:    8,
        paddingRight:   8,
        background:     isPressed
          ? "var(--vmc-color-background-brand)"
          : "var(--vmc-color-background-card)",
        border: isPressed
          ? "1px solid transparent"
          : "1px solid var(--vmc-color-vault-200)",
        borderRadius:   10,
        boxShadow:      isPressed
          ? "0 4px 20px rgba(34, 0, 92, 0.30)"
          : "0 2px 10px rgba(34, 0, 92, 0.10)",
        textDecoration: "none",
        outline:        "none",
        gap:            6,
        color:          isPressed
          ? "var(--vmc-color-text-inverse)"
          : "var(--vmc-color-background-brand)",
      }}
    >
      {/* Icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>

      {/* Label — full text, wraps naturally */}
      <div style={{
        width:         "100%",
        fontFamily:    "var(--vmc-font-display)",
        fontSize:      9,
        fontWeight:    700,
        lineHeight:    "11px",
        textAlign:     "center",
        color:         isPressed
          ? "rgba(255, 255, 255, 0.90)"
          : "var(--vmc-color-background-brand)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        overflowWrap:  "break-word",
        wordBreak:     "break-word",
      }}>
        {resolvedLabel}
      </div>
    </a>
  );
}
