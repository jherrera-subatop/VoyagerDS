/**
 * @figma-spec
 * @component    DetalleOfertaBar | 325x64 | Page:Stitch
 *
 * @tokens
 *   vault  : --voyager-color-vault    : #22005C
 *   onDark : --voyager-text-on-dark   : #FFFFFF
 *
 * @typography
 *   label    : Plus Jakarta Sans | Regular | 12px | lh:1.25 | "Detalle de la oferta"
 *   descarga : Plus Jakarta Sans | Regular | 12px | lh:1.25 | "Descarga"
 *
 * @layers
 *   root       : COMPONENT : 325x64  : x:0,  y:0  : fill:transparent, border:1px solid vault, borderRight:8px solid vault, radius:16px, minH:64
 *   left-col   : Frame     : 233xAuto: x:12, y:12 : fill:none, flex:row, gap:8
 *   file-icon  : SVG       : 24x24   : x:12, y:20 : fill:currentColor (vault)
 *   label-txt  : Text      : autoXauto:x:44,y:20 : style:label, fill:vault
 *   divider    : Frame     : 1xAuto  : x:245,y:12 : fill:vault (1px borderLeft)
 *   right-col  : Frame     : 80xAuto : x:245,y:12 : fill:none, flex:col, gap:4
 *   dl-icon    : SVG       : 20x20   : x:30, y:12 : fill:currentColor (vault)
 *   dl-txt     : Text      : autoXauto:x:20,y:36: style:descarga, fill:vault
 *
 * @subcomponents
 *   (ninguno — componente autónomo)
 *
 * @variants
 *   (ninguna — un único estado; el label es prop)
 *
 * @states
 *   [x] default  : borde vault, texto vault, fondo transparente
 *   [x] hover    : fondo vault, texto blanco, divider blanco
 *   [ ] focus    : (futuro) outline 2px vault-mid
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

"use client";

// Token map: purple-500 → --voyager-color-vault | hover:text-white → --voyager-text-on-dark
import { useState } from "react";
import type { CSSProperties, JSX } from "react";

interface DetalleOfertaBarProps {
  label?: string;
  onClick?: () => void;
}

function buildRootStyle(hovered: boolean): CSSProperties {
  const base: CSSProperties = {
    fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
    padding: "12px",
    border: "1px solid var(--vmc-color-border-brand)",
    borderRightWidth: "8px",
    borderRadius: "16px",
    minHeight: "64px",
    display: "grid",
    gridTemplateColumns: "1fr 80px",
    columnGap: "12px",
    cursor: "pointer",
    transition: "background 150ms ease, color 150ms ease",
  };

  if (hovered) {
    return {
      ...base,
      background: "var(--vmc-color-background-brand)",
      color: "var(--vmc-color-text-inverse)",
    };
  }

  return {
    ...base,
    background: "transparent",
    color: "var(--vmc-color-text-brand)",
  };
}

function buildDividerStyle(hovered: boolean): CSSProperties {
  const base: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  };

  if (hovered) {
    return { ...base, borderLeft: "1px solid var(--vmc-color-text-inverse)" };
  }

  return { ...base, borderLeft: "1px solid var(--vmc-color-border-brand)" };
}

export default function DetalleOfertaBar({ label = "Detalle de la oferta", onClick }: DetalleOfertaBarProps): JSX.Element {
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter(): void {
    setHovered(true);
  }

  function handleMouseLeave(): void {
    setHovered(false);
  }

  return (
    <div
      role="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buildRootStyle(hovered)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0, width: "24px", height: "24px" }}
        >
          <path
            d="M16 2H5.3C4.3 2 3.5 2.8 3.5 3.8V16.5H5.3V3.8H16V2ZM15.1 5.6L20.5 11.1V20.2C20.5 21.2 19.7 22 18.7 22H8.9C7.9 22 7.1 21.2 7.1 20.2L7.1 7.5C7.1 6.5 7.9 5.6 8.9 5.6H15.1ZM14.2 12H19.2L14.2 7V12Z"
            fill="currentColor"
          />
        </svg>
        <span style={{ fontSize: "12px", lineHeight: "1.25" }}>{label}</span>
      </div>

      <div style={buildDividerStyle(hovered)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0, width: "20px", height: "20px" }}
        >
          <path
            d="M19.7427 21.9943C20.2963 21.9943 20.745 21.5455 20.745 20.9919V20.498C20.745 19.9445 20.2963 19.4957 19.7427 19.4957L4.25739 19.4957C3.70382 19.4957 3.25506 19.9445 3.25506 20.498L3.25506 20.9919C3.25506 21.5455 3.70382 21.9943 4.25739 21.9943H19.7427ZM20.2172 10.7932C20.9657 10.2051 20.5498 9.0027 19.5979 9.0027L16.0026 9.0027C15.449 9.0027 15.0003 8.55394 15.0003 8.00038V3.00806C15.0003 2.45449 14.5515 2.00574 13.998 2.00574L10.006 2.00574C9.45247 2.00574 9.00372 2.45449 9.00372 3.00806L9.00372 8.00037C9.00372 8.55394 8.55496 9.0027 8.00139 9.0027L4.40605 9.0027C3.45416 9.0027 3.03831 10.2051 3.78679 10.7932L11.3827 16.7614C11.7462 17.047 12.2578 17.047 12.6212 16.7614L20.2172 10.7932Z"
            fill="currentColor"
          />
        </svg>
        <span style={{ fontSize: "12px", lineHeight: "1.25", textAlign: "center" }}>Descarga</span>
      </div>
    </div>
  );
}
