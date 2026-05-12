"use client";

/**
 * ListingAreaDone — zona DONE del DS Voyager
 * Muestra el bloque completo + panel de estados interactivos del ProfileButton.
 * Sin HEX — todo via var(--voyager-*) / var(--vmc-*).
 * Figma node: 368-3722 · file: 7bjDwC20BX1AFrv9Q8BOIb
 */

import type { JSX } from "react";
import ListingArea from "./ListingArea";

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fontMono    = "var(--font-mono, monospace)";
const vaultMid    = "var(--voyager-color-vault-mid, #3B1782)";

/* ── Chevron right (copiado del original para el panel de estados) */
function ChevronRight(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ width: 12, height: 12, marginLeft: 8, fill: "currentColor" }}
    >
      <path d="M6.4369 2.89369C5.27624 4.05435 5.27624 5.93616 6.4369 7.09682L11.3405 12.0004L6.43691 16.9039C5.27625 18.0646 5.27625 19.9464 6.43691 21.107C7.59758 22.2677 9.47938 22.2677 10.64 21.107L17.5052 14.2422C18.0891 13.6582 18.3977 12.903 18.4307 12.1382C18.4678 11.2815 18.1593 10.4127 17.5052 9.75858L10.64 2.89369C9.47937 1.73303 7.59757 1.73303 6.4369 2.89369Z" />
    </svg>
  );
}

interface ProfileButtonStateProps {
  label:     string;
  sublabel:  string;
  bg:        string;
  transform?: string;
  chevronOffset?: string;
  outline?:  string;
}

function ProfileButtonState({ label, sublabel, bg, transform, chevronOffset, outline }: ProfileButtonStateProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {/* Button simulation */}
      <div
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          fontFamily:     fontDisplay,
          fontSize:       16,
          fontWeight:     700,
          color:          vaultMid,
          textDecoration: "none",
          borderRadius:   4,
          padding:        "6px 10px",
          background:     bg,
          transform:      transform ?? "none",
          outline:        outline,
          outlineOffset:  outline ? "2px" : undefined,
          transition:     "none",
          userSelect:     "none",
          cursor:         "default",
        }}
        role="img"
        aria-label={`ProfileButton estado ${sublabel}`}
      >
        Ir al perfil
        <span
          style={{
            display:   "inline-flex",
            transform: chevronOffset ?? "none",
            color:     vaultMid,
          }}
          aria-hidden="true"
        >
          <ChevronRight />
        </span>
      </div>

      {/* Labels */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily:    fontMono,
          fontSize:      11,
          fontWeight:    700,
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
          color:         "var(--vmc-color-text-primary)",
          margin:        0,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: fontDisplay,
          fontSize:   11,
          fontWeight: 400,
          color:      "var(--vmc-color-text-tertiary)",
          margin:     "2px 0 0",
        }}>
          {sublabel}
        </p>
      </div>
    </div>
  );
}

export default function ListingAreaDone(): JSX.Element {
  return (
    <div>
      {/* ── Componente completo ───────────────────────────────── */}
      <div style={{
        padding:    "40px 24px",
        background: "var(--vmc-color-background-secondary, #F2F4F3)",
        display:    "flex",
        justifyContent: "center",
      }}>
        <ListingArea />
      </div>

      {/* ── Panel de estados interactivos ─────────────────────── */}
      <div style={{
        padding:     "24px 32px",
        borderTop:   "1px solid var(--vmc-color-border-subtle)",
        background:  "var(--vmc-color-background-primary)",
      }}>
        {/* Header del panel */}
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontFamily:    fontMono,
            fontSize:      10,
            fontWeight:    700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            color:         "var(--vmc-color-text-tertiary)",
            margin:        0,
          }}>
            ProfileButton — estados interactivos · Figma node 368-3722
          </p>
          <p style={{
            fontFamily: fontDisplay,
            fontSize:   12,
            color:      "var(--vmc-color-text-secondary)",
            margin:     "4px 0 0",
          }}>
            Transición 150ms · ease <code style={{ fontFamily: fontMono, fontSize: 11 }}>cubic-bezier(0.3,0,0,1)</code>
          </p>
        </div>

        {/* Estados */}
        <div style={{
          display:  "flex",
          gap:      48,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}>
          <ProfileButtonState
            label="Default"
            sublabel="reposo — sin fondo"
            bg="transparent"
          />
          <ProfileButtonState
            label="Hover"
            sublabel="bg shift sutil · chevron +3px"
            bg="var(--vmc-color-background-secondary, #E4E6E5)"
            chevronOffset="translateX(3px)"
          />
          <ProfileButtonState
            label="Pressed"
            sublabel="vault tint 22% · scale 0.97"
            bg="color-mix(in srgb, var(--voyager-color-vault-mid, #3B1782) 22%, white)"
            transform="scale(0.97)"
          />
          <ProfileButtonState
            label="Focus"
            sublabel="outline 2px vault-mid · WCAG 2.2"
            bg="transparent"
            outline={`2px solid ${vaultMid}`}
          />
        </div>

        {/* Token ref */}
        <div style={{
          marginTop:  20,
          padding:    "10px 14px",
          background: "var(--vmc-color-background-secondary)",
          borderRadius: 4,
          display:    "flex",
          gap:        16,
          flexWrap:   "wrap",
        }}>
          <code style={{ fontFamily: fontMono, fontSize: 10, color: "var(--vmc-color-text-secondary)" }}>
            hover bg → <span style={{ color: "var(--vmc-color-text-brand)" }}>--vmc-color-background-secondary</span>
          </code>
          <code style={{ fontFamily: fontMono, fontSize: 10, color: "var(--vmc-color-text-secondary)" }}>
            pressed bg → <span style={{ color: "var(--vmc-color-text-brand)" }}>color-mix(in srgb, --voyager-color-vault-mid 22%, white)</span>
          </code>
          <code style={{ fontFamily: fontMono, fontSize: 10, color: "var(--vmc-color-text-secondary)" }}>
            focus → <span style={{ color: "var(--vmc-color-text-brand)" }}>outline: 2px solid --voyager-color-vault-mid</span>
          </code>
        </div>
      </div>
    </div>
  );
}
