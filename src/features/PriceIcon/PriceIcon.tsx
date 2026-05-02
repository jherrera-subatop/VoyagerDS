/**
 * @figma-spec
 * @component    PriceIcon | 24x24 | Page:Stitch
 * @description  Ícono de moneda/precio. Usado en OfferCard y cualquier componente con precio.
 *
 * @tokens
 *   price-color : --vmc-color-cyan-800              : #008688
 *   text-muted  : --vmc-color-text-price-label      : #99A1AF
 *   skeleton-bg : --vmc-color-background-disabled   : #E1E3E2
 *
 * @layers
 *   root : COMPONENT : 24x24 : x:0, y:0 : SVG coin o círculo skeleton
 *
 * @states
 *   [x] default  : SVG coin 24x24 · fill:price-color (#008688)
 *   [x] expirado : SVG coin 24x24 · fill:text-muted  (#99A1AF)
 *   [x] skeleton : círculo sólido 24x24 · fill:skeleton-bg (#E1E3E2) · radius:9999
 */

import type { JSX } from "react";

export type PriceIconState = "default" | "expirado" | "skeleton";

interface PriceIconProps {
  state?: PriceIconState;
  size?:  number;
}

const V = {
  priceColor: "var(--vmc-color-cyan-800)",
  textMuted:  "var(--vmc-color-text-price-label)",
  skeletonBg: "var(--vmc-color-background-disabled)",
} as const;

export default function PriceIcon({ state = "default", size = 24 }: PriceIconProps): JSX.Element {
  if (state === "skeleton") {
    return (
      <div style={{
        width:        size,
        height:       size,
        borderRadius: 9999,
        background:   V.skeletonBg,
        flexShrink:   0,
      }} />
    );
  }

  const color = state === "expirado" ? V.textMuted : V.priceColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, width: size, height: size }}
    >
      <path
        d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z"
        fill={color} fillOpacity={0.55}
      />
      <path
        d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23ZM12 12.4C11.8 12.4 11.7 12.5 11.6 12.5L2.8 16.2C2.3 16.4 2.1 16.8 2.1 17.2 2.1 17.6 2.3 18 2.8 18.2L11.6 21.9C11.8 22 12.2 22 12.4 21.9L21.2 18.2C21.7 18 21.9 17.6 21.9 17.2 21.9 16.8 21.7 16.4 21.2 16.2L12.4 12.5C12.3 12.5 12.2 12.4 12 12.4Z"
        fill={color}
      />
      <path
        d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z"
        fill={color}
      />
      <path
        d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.1C11.3 7.9 11 7.2ZM12.4 11.7V10C12.9 10.2 13.2 10.4 13.2 10.8 13.2 11.2 12.9 11.5 12.4 11.7Z"
        fill="white"
      />
    </svg>
  );
}
