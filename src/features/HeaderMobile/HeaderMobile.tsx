/**
 * HeaderMobile — Voyager DS
 * Figma node: 404-5240 · mobile
 */

import type { JSX } from "react";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

const V = {
  bg:         "var(--vmc-color-background-brand)",
  gradBtn:    "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.72 0.16 55) 40%, oklch(0.42 0.22 285) 100%)",
  glowBtn:    "0 4px 16px oklch(0.72 0.16 55 / 0.45)",
  iconOverlay:"oklch(1 0 0 / 0.18)",
  textInv:    "var(--vmc-color-text-inverse)",
} as const;

/* ── User icon (inline SVG — no asset expiry) ── */
function UserIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 12C14.7 12 17 9.8 17 7S14.7 2 12 2 7 4.2 7 7s2.3 5 5 5Zm0 2C8.7 14 2 15.7 2 19v1h20v-1c0-3.3-6.7-5-10-5Z"/>
    </svg>
  );
}

/* ── Login button ── */
function LoginButton(): JSX.Element {
  return (
    <button type="button"
      style={{ display: "flex", alignItems: "center", gap: 8,
        height: 38, borderRadius: 9999, border: "none", cursor: "pointer",
        background: V.gradBtn, padding: "0 14px 0 4px",
        boxShadow: V.glowBtn,
        flexShrink: 0 }}>

      {/* Icon circle */}
      <div style={{ width: 30, height: 30, borderRadius: 9999, flexShrink: 0,
        background: V.iconOverlay, border: "1px solid oklch(1 0 0 / 0.20)",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <UserIcon />
      </div>

      {/* Label */}
      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, lineHeight: "20px",
        color: V.textInv, whiteSpace: "nowrap",
        textShadow: "0 1px 1.5px rgba(0,0,0,0.25)" }}>
        Ingresa
      </span>
    </button>
  );
}

export default function HeaderMobile(): JSX.Element {
  return (
    <header style={{ width: "100%", height: 56, background: V.bg, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "flex-end",
      padding: "0 11px 0 20px" }}>
      <LoginButton />
    </header>
  );
}
