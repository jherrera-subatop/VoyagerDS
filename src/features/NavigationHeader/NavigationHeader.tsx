/**
 * NavigationHeader — Voyager DS
 * Figma node: 371-8168 · file: 7bjDwC20BX1AFrv9Q8BOIb
 */

import type { JSX } from "react";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const BRAND = "var(--vmc-color-text-brand)";

function CornerTL(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0 }}>
      <path d="M0 0H3.3V3.3H3.3V6.7H0V3.3H0V0ZM3.3 0H6.7 6.7 10V3.3H6.7 6.7 3.3V0ZM3.3 6.7H0V10H3.3V6.7Z"
        fill={BRAND} />
    </svg>
  );
}

function CornerBR(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", bottom: 0, right: 0 }}>
      <path d="M10 10L6.7 10 6.7 6.7 6.7 3.3 10 3.3 10 6.7 10 10ZM6.7 10L3.3 10 0 10 0 6.7 3.3 6.7 6.7 6.7 6.7 10ZM6.7 3.3L10 3.3 10 0 6.7 0 6.7 3.3Z"
        fill={BRAND} />
    </svg>
  );
}

interface NavigationHeaderProps {
  date?:       string;
  offerCount?: string;
  startTime?:  string;
}

export default function NavigationHeader({
  date       = "MAR. 05 MAY.",
  offerCount = "10 Ofertas",
  startTime  = "Inicia 04:00 pm",
}: NavigationHeaderProps): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%" }}>

      {/* Left — title + brackets */}
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column",
        alignItems: "flex-start", padding: "8px 12px" }}>
        <CornerTL />
        <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, lineHeight: "20px",
          color: BRAND, margin: 0, whiteSpace: "nowrap" }}>
          {date}
        </p>
        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 400, lineHeight: "20px",
          color: "var(--vmc-color-text-primary)", margin: 0 }}>
          {offerCount}
        </p>
        <CornerBR />
      </div>

      {/* Right — start time */}
      <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, lineHeight: "20px",
        color: BRAND, margin: 0, whiteSpace: "nowrap", flexShrink: 0,
        paddingLeft: 10 }}>
        {startTime}
      </p>
    </div>
  );
}
