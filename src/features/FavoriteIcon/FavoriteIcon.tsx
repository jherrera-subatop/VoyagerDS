/**
 * @figma-spec
 * @component    FavoriteIcon | 32x32 | Page:Stitch
 * @description  Botón de favorito. Un solo componente con 4 estados.
 *
 * @tokens
 *   vault      : --vmc-color-background-brand   : #22005C
 *   surface    : --vmc-color-background-card    : #FFFFFF
 *   text-muted : --vmc-color-text-price-label   : #99A1AF
 *   skeleton   : --vmc-color-background-disabled: #E1E3E2
 *   shadow-md  : --vmc-shadow-md                : 0 8px 16px 0 rgba(0,0,0,0.10)
 *
 * @typography
 *   (ninguna — componente solo ícono)
 *
 * @layers
 *   root  : COMPONENT : 32x32 : x:0, y:0 : fill según estado
 *   heart : SVG       : 20x20 : x:6, y:6 : fill según estado
 *
 * @states
 *   [x] default  : fill:surface + shadow:shadow-md · HeartOutline · color:vault
 *   [x] pressed  : fill:rgba(34,0,92,0.10) + sin sombra · HeartFilled · color:vault
 *   [x] expirado : fill:surface + shadow:shadow-md · HeartOutline · color:text-muted (#99A1AF)
 *   [x] skeleton : fill:skeleton-bg (#E1E3E2) + sin sombra · sin ícono · radius:9999
 *   [ ] hover    : (futuro) color-mix(vault 92%, white) bg
 *   [ ] focus    : (futuro) outline 2px vault-mid, offset 2px
 *   [ ] active   : (futuro)
 */

/**
 * FavoriteIcon — UI Upgrade · VOYAGER v2.3.0
 * 32×32px · ícono de favorito
 * Estados: default | pressed | expirado | skeleton
 */

import type { JSX } from "react";

export type FavoriteIconState = "default" | "pressed" | "expirado" | "skeleton";

interface FavoriteIconProps {
  state?: FavoriteIconState;
}

const V = {
  vault:      "var(--vmc-color-background-brand)",
  surface:    "var(--vmc-color-background-card)",
  textMuted:  "var(--vmc-color-text-price-label)",
  skeletonBg: "var(--vmc-color-background-disabled)",
  shadowMd:   "var(--vmc-shadow-md)",
} as const;

function HeartOutline({ color }: { color: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none"
      style={{ width: 20, height: 20, flexShrink: 0 }}>
      <path
        d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z"
        fill={color}
      />
    </svg>
  );
}

function HeartFilled({ color }: { color: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none"
      style={{ width: 20, height: 20, flexShrink: 0 }}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  );
}

export default function FavoriteIcon({ state = "default" }: FavoriteIconProps): JSX.Element {
  if (state === "skeleton") {
    return (
      <div style={{
        width:        32,
        height:       32,
        borderRadius: 9999,
        background:   V.skeletonBg,
        flexShrink:   0,
      }} />
    );
  }

  const isPressed  = state === "pressed";
  const isExpirado = state === "expirado";
  const iconColor  = isExpirado ? V.textMuted : V.vault;
  const bg         = isPressed ? "rgba(34,0,92,0.10)" : V.surface;
  const shadow     = isPressed ? "none" : V.shadowMd;

  return (
    <button
      aria-label="me interesa"
      type="button"
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          32,
        height:         32,
        borderRadius:   9999,
        background:     bg,
        boxShadow:      shadow,
        border:         "none",
        cursor:         "pointer",
        outline:        "none",
        padding:        0,
        transition:     "background 150ms ease, box-shadow 150ms ease",
      }}
    >
      {isPressed
        ? <HeartFilled color={iconColor} />
        : <HeartOutline color={iconColor} />
      }
    </button>
  );
}
