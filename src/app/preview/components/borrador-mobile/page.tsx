"use client";

import { useState } from "react";
import type { JSX } from "react";

/* ─────────────────────────────────────────────
   BORRADOR MOBILE — VMC Subastas · Voyager DS
   Ancho canvas: 420px · Padding H: 16px · Contenido útil: 388px
   Agente 2 — Mobile Designer
───────────────────────────────────────────── */
const CSS = `
  /* ── Canvas mobile — simula viewport 420px ── */
  .mob-canvas {
    width: 420px;
    background: oklch(1 0 0);
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
  }

  /* ── Wrapper con padding lateral ── */
  .mob-wrap {
    padding-left: 16px;
    padding-right: 16px;
  }

  /* ── Page label — debug aid ── */
  .mob-ruler {
    width: 100%;
    height: 1px;
    background: oklch(0.72 0.16 55 / 0.25);
    position: relative;
  }
  .mob-ruler::before {
    content: '← 388px útiles →';
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: oklch(0.72 0.16 55 / 0.60);
    white-space: nowrap;
    background: oklch(1 0 0);
    padding: 0 6px;
  }
`;

const F = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";

/* ─────────────────────────────────────────────
   COMPONENTE 1 — QUICK FILTER MOBILE
───────────────────────────────────────────── */

const QF_CSS = `
  /* Container */
  .qfm-root {
    background: oklch(1 0 0);
    border-radius: 8px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
    box-shadow: 0 2px 10px oklch(0.22 0.18 285 / 0.06);
    overflow: hidden;
  }
  /* Sections */
  .qfm-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  .qfm-section--offer {
    border-bottom: 1px solid oklch(0.22 0.18 285 / 0.07);
  }
  /* Section heading */
  .qfm-heading {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    position: relative;
    padding: 4px 4px;
  }
  .qfm-heading-text {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: oklch(0.22 0.18 285 / 0.70);
  }
  /* Offers row */
  .qfm-offers {
    display: flex;
    gap: 16px;
  }
  /* OfferType card */
  .qfm-oftype {
    flex: 1;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
                box-shadow 0.25s ease;
    transform: translateZ(0);
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }
  .qfm-oftype-top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: background 0.22s ease;
  }
  .qfm-oftype-top::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.07) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }
  .qfm-oftype-top::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 0.08) 100%);
    pointer-events: none;
    z-index: 1;
  }
  .qfm-oftype-label {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: oklch(1 0 0);
    text-shadow: 0 1px 3px oklch(0 0 0 / 0.25);
    position: relative;
    z-index: 2;
  }
  .qfm-oftype-bottom {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qfm-oftype-cta {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    transition: color 0.22s ease;
  }
  /* EN VIVO */
  .qfm-oftype--live {
    box-shadow:
      0 0 0 1.5px oklch(0.72 0.16 55 / 0.40),
      0 4px 14px oklch(0 0 0 / 0.10),
      0 1px 4px  oklch(0 0 0 / 0.06);
  }
  .qfm-oftype--live .qfm-oftype-top {
    background: linear-gradient(180deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 100%);
  }
  .qfm-oftype--live .qfm-oftype-bottom {
    background: color-mix(in oklch, oklch(1 0 0) 95%, oklch(0.72 0.16 55));
  }
  .qfm-oftype--live .qfm-oftype-cta { color: oklch(0.54 0.18 45); }
  .qfm-oftype--live:hover {
    box-shadow:
      0 0 0 1.5px oklch(0.72 0.16 55 / 0.55),
      0 10px 18px oklch(0.22 0.18 285 / 0.11),
      0  3px  7px oklch(0.22 0.18 285 / 0.08),
      0  1px  2px oklch(0.22 0.18 285 / 0.05);
  }
  /* NEGOCIABLE */
  .qfm-oftype--neg {
    box-shadow:
      0 0 0 1.5px oklch(0.78 0.14 195 / 0.40),
      0 4px 14px oklch(0 0 0 / 0.10),
      0 1px 4px  oklch(0 0 0 / 0.06);
  }
  .qfm-oftype--neg .qfm-oftype-top {
    background: linear-gradient(180deg, oklch(0.84 0.13 195) 0%, oklch(0.78 0.14 195) 100%);
  }
  .qfm-oftype--neg .qfm-oftype-bottom {
    background: color-mix(in oklch, oklch(1 0 0) 95%, oklch(0.78 0.14 195));
  }
  .qfm-oftype--neg .qfm-oftype-cta { color: oklch(0.58 0.17 195); }
  .qfm-oftype--neg:hover {
    box-shadow:
      0 0 0 1.5px oklch(0.78 0.14 195 / 0.55),
      0 10px 18px oklch(0.22 0.18 285 / 0.11),
      0  3px  7px oklch(0.22 0.18 285 / 0.08),
      0  1px  2px oklch(0.22 0.18 285 / 0.05);
  }
  /* Shared hover */
  .qfm-oftype:hover { transform: translateY(-4px) scale(1.015); }
  .qfm-oftype:hover .qfm-oftype-top::before {
    background: linear-gradient(180deg, oklch(1 0 0 / 0.26) 0%, transparent 50%);
  }
  .qfm-oftype:active { transform: scale(0.97); }
  .qfm-oftype:focus-visible {
    outline: 2px solid oklch(0.22 0.18 285 / 0.60);
    outline-offset: 2px;
  }
  /* Category cards row */
  .qfm-cats {
    display: flex;
    gap: 8px;
  }
  /* Category card — gradient ring border, inset shine, vault glow */
  .qfm-catcard {
    flex: 1;
    min-width: 0;
    border-radius: 8px;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(160deg, oklch(1 0 0) 0%, oklch(0.97 0.006 285) 100%),
      linear-gradient(135deg,
        oklch(0.72 0.14 285) 0%,
        oklch(1 0 0 / 0.65) 38%,
        oklch(0.58 0.18 285) 70%,
        oklch(0.72 0.14 285) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 4px;
    gap: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 2px 10px oklch(0.22 0.18 285 / 0.08),
      0 1px 3px  oklch(0.22 0.18 285 / 0.05);
    transition:
      transform  0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.22s ease;
    transform: translateZ(0);
    text-decoration: none;
    box-sizing: border-box;
  }
  .qfm-catcard::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(160deg, oklch(1 0 0 / 0.55) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  .qfm-catcard::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    background: radial-gradient(ellipse at 50% 60%,
      oklch(0.40 0.20 285 / 0.22) 0%, transparent 70%
    );
    filter: blur(8px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.28s ease;
  }
  .qfm-catcard:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 20px oklch(0.22 0.18 285 / 0.14),
      0  4px  8px oklch(0.22 0.18 285 / 0.10),
      0  1px  2px oklch(0.22 0.18 285 / 0.06);
    background-image:
      linear-gradient(160deg, oklch(0.97 0.010 285) 0%, oklch(0.99 0.004 285) 100%),
      linear-gradient(135deg,
        oklch(0.52 0.22 285) 0%,
        oklch(1 0 0 / 0.80) 38%,
        oklch(0.40 0.24 285) 72%,
        oklch(0.52 0.22 285) 100%
      );
  }
  .qfm-catcard:hover::after { opacity: 0.30; }
  .qfm-catcard:active { transform: scale(0.96); opacity: 0.58; }
  .qfm-catcard:focus-visible {
    outline: 2px solid oklch(0.22 0.18 285 / 0.60);
    outline-offset: 2px;
  }
  .qfm-catcard-icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    position: relative; z-index: 2;
  }
  .qfm-catcard-label {
    font-family: var(--vmc-font-display);
    font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: oklch(0.22 0.18 285);
    text-align: center; line-height: 1.35;
    position: relative; z-index: 2;
  }
  @media (prefers-reduced-motion: reduce) {
    .qfm-oftype, .qfm-oftype-top,
    .qfm-catcard, .qfm-catcard::after { transition: none; }
  }
  /* DEAD CLASSES — kept only because old refactoring didn't delete */
  .qfm-cards-row, .qfm-cats-row,
  .qfm-offer-card, .qfm-offer-tab, .qfm-offer-bottom,
  .qfm-cat-card { display: none !important; }
`;

/* ── Bracket SVGs — stroke gradient, misma lógica que BktTL/BktBR desktop ── */
function QFMBktTL({ size = 8, sw = 1.5 }: { size?: number; sw?: number }): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      aria-hidden="true">
      <defs>
        <linearGradient id="qfm-btlg1" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="oklch(0.75 0.17 55)" />
          <stop offset="100%" stopColor="oklch(0.30 0.22 285)" />
        </linearGradient>
      </defs>
      <path
        d={`M${size - h} ${h} L${r + h} ${h} Q${h} ${h} ${h} ${r + h} L${h} ${size - h}`}
        stroke="url(#qfm-btlg1)" strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function QFMBktBR({ size = 8, sw = 1.5 }: { size?: number; sw?: number }): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: "absolute", bottom: 0, right: 0, pointerEvents: "none" }}
      aria-hidden="true">
      <defs>
        <linearGradient id="qfm-bbrg1" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="oklch(0.75 0.17 55)" />
          <stop offset="100%" stopColor="oklch(0.30 0.22 285)" />
        </linearGradient>
      </defs>
      <path
        d={`M${h} ${size - h} L${size - r - h} ${size - h} Q${size - h} ${size - h} ${size - h} ${size - r - h} L${size - h} ${h}`}
        stroke="url(#qfm-bbrg1)" strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Section heading ── */
function QFMHeading({ title }: { title: string }): JSX.Element {
  return (
    <div className="qfm-heading">
      <QFMBktTL />
      <span className="qfm-heading-text">{title}</span>
      <QFMBktBR />
    </div>
  );
}

/* ── Vault gradient para iconos de categoría ── */
const QFM_GRAD_ID = "qfm-cat-vault";

function QFMVaultGradDef(): JSX.Element {
  return (
    <defs>
      <linearGradient id={QFM_GRAD_ID} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
        <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
        <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
      </linearGradient>
    </defs>
  );
}

const QFM_VG = `url(#${QFM_GRAD_ID})`;

/* ── Iconos de categoría ── */
function QFMVehicleIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <QFMVaultGradDef />
      <path d="M5.5 12.9c-.5 0-.9.2-1.4.4-.4.3-.7.7-.9 1.1-.2.5-.2 1-.1 1.5s.3.9.7 1.2c.3.4.8.6 1.2.7.5.1 1 .1 1.5-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.3-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.3.3.5.5.1.1.2.4.2.6 0 .3-.2.6-.4.8-.2.2-.5.3-.8.3ZM19.2 12.9c-.5 0-.9.2-1.3.4-.4.3-.8.7-.9 1.1-.2.5-.3 1-.2 1.5.1.5.3.9.7 1.2.3.4.8.6 1.3.7.4.1.9.1 1.4-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.2-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6.1-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.4.3.5.5.1.1.2.4.2.6 0 .3-.1.6-.4.8-.2.2-.5.3-.8.3Z" fill={QFM_VG} />
      <path d="m22.5 10.9-4.4-.8-3.8-3.2c-.4-.3-.8-.5-1.3-.5H7.4c-.3 0-.6.1-.9.2-.3.2-.5.4-.7.6l-2.5 2.9H1.7c-.4 0-.9.1-1.2.5-.3.3-.5.7-.5 1.2v2.1c0 .5.2 1.1.6 1.5.4.3.9.6 1.5.6h.4c-.1-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h7.7c0-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h.1c.4 0 .9-.2 1.2-.5.3-.4.5-.8.5-1.2v-1.7c0-.4-.1-.8-.4-1.2-.3-.3-.7-.5-1.1-.5ZM8.4 9.5c0 .1-.1.3-.2.4-.1.1-.2.2-.4.2H5.3c-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1v-.2s0-.1.1-.1l1.6-2c.1 0 .2-.1.2-.1.1 0 .2-.1.3-.1h.6c.2 0 .3.1.4.2.1.1.2.3.2.4v1.5Zm2.8 2.7h-.7c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4 0-.2.1-.3.2-.4.1-.1.2-.2.4-.2h.7c.2 0 .3.1.4.2.1.1.2.2.2.4 0 .1-.1.3-.2.4-.1.1-.2.2-.4.2Zm4.5-2.1h-5.4c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4V8c0-.1.1-.3.2-.4.1-.1.2-.2.4-.2H13c.2 0 .3.1.4.2l2.5 2c.1 0 .1.1.1.1v.2s0 .1-.1.1c0 .1-.1.1-.2.1Z" fill={QFM_VG} />
    </svg>
  );
}

function QFMMachineryIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="qfm-mac-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="oklch(0.52 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.20 0.18 285)" />
        </linearGradient>
      </defs>
      {/* Oruga con ruedas recortadas (evenodd) */}
      <path
        fillRule="evenodd"
        fill="url(#qfm-mac-g)"
        d="M 3 14.5 L 15 14.5 Q 17.5 14.5 17.5 17 L 17.5 21 Q 17.5 23.5 15 23.5 L 3 23.5 Q 0.5 23.5 0.5 21 L 0.5 17 Q 0.5 14.5 3 14.5 Z M 4.5 17 A 2 2 0 1 0 4.5 21 A 2 2 0 1 0 4.5 17 Z M 13.5 17 A 2 2 0 1 0 13.5 21 A 2 2 0 1 0 13.5 17 Z"
      />
      {/* Cabina */}
      <rect x="1" y="8.5" width="10" height="6" rx="0.5" fill="url(#qfm-mac-g)" />
      {/* Pluma (paralelogramo diagonal) */}
      <path d="M 10 9.5 L 22 1 L 23.5 4 L 11.5 12.5 Z" fill="url(#qfm-mac-g)" />
      {/* Cuchara */}
      <path d="M 20 2 L 24 0 L 24 7 L 20 9 Z" fill="url(#qfm-mac-g)" />
    </svg>
  );
}

function QFMBoxIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="qfm-eq-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="oklch(0.52 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.20 0.18 285)" />
        </linearGradient>
      </defs>
      {/* Disco con hub (evenodd) */}
      <path
        fillRule="evenodd"
        fill="url(#qfm-eq-g)"
        d="M 15 6 A 9 9 0 1 0 15 24 A 9 9 0 1 0 15 6 Z M 15 12 A 3 3 0 1 0 15 18 A 3 3 0 1 0 15 12 Z"
      />
      {/* Cuerpo del motor */}
      <rect x="1" y="9" width="9" height="8" rx="2" fill="url(#qfm-eq-g)" />
      {/* Protector / guard arc */}
      <path
        fill="url(#qfm-eq-g)"
        d="M 8.5 9 Q 8.5 3 15 3 Q 22 3 23 9 Q 22 6 15 6 Q 8.5 6 8.5 9 Z"
      />
      {/* Mango / handle */}
      <rect x="2" y="17" width="4" height="6" rx="1.5" fill="url(#qfm-eq-g)" />
    </svg>
  );
}

function QFMArticulosIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="qfm-art-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="oklch(0.52 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.20 0.18 285)" />
        </linearGradient>
      </defs>
      {/* Pantalla con bisel (evenodd) */}
      <path
        fillRule="evenodd"
        fill="url(#qfm-art-g)"
        d="M 3 1 L 21 1 Q 23 1 23 3 L 23 15 L 1 15 L 1 3 Q 1 1 3 1 Z M 3.5 3.5 L 20.5 3.5 Q 21.5 3.5 21.5 4.5 L 21.5 13.5 L 2.5 13.5 L 2.5 4.5 Q 2.5 3.5 3.5 3.5 Z"
      />
      {/* Base con touchpad (evenodd) */}
      <path
        fillRule="evenodd"
        fill="url(#qfm-art-g)"
        d="M 1 17 L 23 17 Q 24 17 24 18 L 24 22 Q 24 23 23 23 L 1 23 Q 0 23 0 22 L 0 18 Q 0 17 1 17 Z M 8.5 18.5 L 15.5 18.5 Q 16.5 18.5 16.5 19.5 L 16.5 21 Q 16.5 21.5 15.5 21.5 L 8.5 21.5 Q 7.5 21.5 7.5 21 L 7.5 19.5 Q 7.5 18.5 8.5 18.5 Z"
      />
    </svg>
  );
}

/* ── OfferType card — variant via lookup, sin template literals ── */
const QFM_OFTYPE_CLASS: Record<"live" | "neg", string> = {
  live: "qfm-oftype qfm-oftype--live",
  neg:  "qfm-oftype qfm-oftype--neg",
};

interface QFMOfferCardProps {
  href: string;
  label: string;
  variant: "live" | "neg";
}

function QFMOfferCard({ href, label, variant }: QFMOfferCardProps): JSX.Element {
  return (
    <a href={href} className={QFM_OFTYPE_CLASS[variant]}>
      <div className="qfm-oftype-top">
        <span className="qfm-oftype-label">{label}</span>
      </div>
      <div className="qfm-oftype-bottom">
        <span className="qfm-oftype-cta">VER TODAS</span>
      </div>
    </a>
  );
}

/* ── Category card ── */
interface QFMCategoryCardProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

function QFMCategoryCard({ href, icon, label }: QFMCategoryCardProps): JSX.Element {
  return (
    <a href={href} className="qfm-catcard">
      <div className="qfm-catcard-icon">{icon}</div>
      <span className="qfm-catcard-label">{label}</span>
    </a>
  );
}

/* ── Quick Filter Mobile ── */
function QuickFilterMobile(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: QF_CSS }} />
      <div className="qfm-root">
        <div className="qfm-section qfm-section--offer">
          <QFMHeading title="Tipo de Oferta" />
          <div className="qfm-offers">
            <QFMOfferCard href="/en-vivo"    label="EN VIVO"    variant="live" />
            <QFMOfferCard href="/negociable" label="NEGOCIABLE" variant="neg"  />
          </div>
        </div>
        <div className="qfm-section">
          <QFMHeading title="Categorías" />
          <div className="qfm-cats">
            <QFMCategoryCard href="/subastas/vehicular"         icon={<QFMVehicleIcon />}   label="VEHICULAR" />
            <QFMCategoryCard href="/subastas/maquinaria"        icon={<QFMMachineryIcon />} label="MAQUINARIA" />
            <QFMCategoryCard href="/subastas/equiposdiversos"   icon={<QFMBoxIcon />}       label="EQUIPOS DIVERSOS" />
            <QFMCategoryCard href="/subastas/articulosdiversos" icon={<QFMArticulosIcon />} label="ARTÍCULOS DIVERSOS" />
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE 2 — LISTING AREA MOBILE
───────────────────────────────────────────── */

const LAM_CSS = `
  /* ── ListingArea Mobile container ── */
  .lam-root {
    background: oklch(1 0 0);
    border-radius: 12px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
    padding: 16px 16px 20px;
    box-shadow: 0 2px 12px oklch(0.22 0.18 285 / 0.06);
    position: relative;
  }
  .lam-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 16px;
  }
  .lam-header-left { display: flex; flex-direction: column; gap: 2px; }
  .lam-name {
    font-family: var(--vmc-font-display);
    font-size: 14px; font-weight: 700; line-height: 20px;
    letter-spacing: 0.04em; text-transform: uppercase;
    color: oklch(0.15 0.008 200);
    margin: 0;
  }
  .lam-count {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 400; line-height: 16px;
    color: oklch(0.38 0.04 280 / 0.65);
    margin: 0;
  }
  /* "Ir al perfil" link — gradient ring icon, same cinematic as desktop */
  .lam-link {
    font-family: var(--vmc-font-display);
    font-size: 12px; font-weight: 600;
    color: oklch(0.22 0.18 285);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 5px;
    height: 32px;
    padding: 0 4px 0 6px;
    cursor: pointer;
    outline: none;
    transition: color 0.14s ease;
    flex-shrink: 0;
  }
  .lam-link-icon {
    position: relative;
    width: 20px; height: 20px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: transparent;
    color: oklch(0.72 0.16 55);
    transition: background 0.14s ease, color 0.14s ease;
  }
  .lam-link-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 1.5px;
    background: linear-gradient(135deg,
      oklch(0.82 0.26 55) 0%,
      oklch(0.62 0.22 45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    transition: opacity 0.14s ease;
  }
  .lam-link:hover .lam-link-icon { background: oklch(0.72 0.16 55); color: oklch(1 0 0); }
  .lam-link:hover .lam-link-icon::before { opacity: 0; }
  .lam-link:active { color: oklch(0.65 0.025 260); }
  .lam-link:active .lam-link-icon {
    background: color-mix(in oklch, oklch(0.72 0.16 55) 62%, oklch(0 0 0));
    color: oklch(1 0 0);
  }
  .lam-link:active .lam-link-icon::before { opacity: 0; }
  .lam-link:focus-visible {
    outline: 2px solid oklch(0.22 0.18 285 / 0.60);
    outline-offset: 2px;
    border-radius: 4px;
  }
  /* ── Cards grid — 2×2 at 388px useful width ── */
  .lam-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  /* ── Card ── */
  .lam-card {
    background: oklch(1 0 0);
    border-radius: 8px;
    box-shadow: 0 8px 16px oklch(0.22 0.18 285 / 0.10);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: transform 150ms cubic-bezier(0.3,0,0,1),
                box-shadow 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
  }
  .lam-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px oklch(0.22 0.18 285 / 0.12);
  }
  .lam-card-img {
    width: 100%;
    height: 104px;
    background: oklch(0.93 0.006 220);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .lam-card-badge {
    position: absolute;
    top: 8px; right: 8px;
    z-index: 2;
  }
  .lam-card-body {
    display: flex;
    flex-direction: column;
    padding: 12px;
    flex: 1;
  }
  .lam-card-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .lam-card-name {
    font-family: var(--vmc-font-display);
    font-size: 14px; font-weight: 700; line-height: 18px;
    color: oklch(0.15 0.008 200);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin: 0;
  }
  .lam-card-year {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 500; line-height: 14px;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: oklch(0.30 0.20 285);
    margin: 0;
  }
  .lam-card-price-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px; flex-shrink: 0;
  }
  .lam-card-price-left { display: flex; align-items: center; gap: 6px; }
  .lam-card-price-text {
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 12px; font-weight: 700; line-height: 18px;
    font-variant-numeric: tabular-nums;
    color: oklch(0.42 0.22 285); white-space: nowrap;
  }
  .lam-card-like-row {
    display: flex; align-items: center; justify-content: flex-end;
    margin-top: 10px; flex-shrink: 0;
  }
  /* Status borders — signature mark, same 5px */
  .lam-card--live       { border-bottom: 5px solid oklch(0.72 0.16 55);  }
  .lam-card--negotiable { border-bottom: 5px solid oklch(0.78 0.14 195); }
  .lam-card--proxima    { border-bottom: 5px solid oklch(0.42 0.22 285); }
  .lam-card--expired    { border-bottom: 5px solid oklch(0.72 0.02 220); }
  .lam-card--expired .lam-card-name { color: oklch(0.55 0.02 220); }
  .lam-card--expired .lam-card-year { color: oklch(0.65 0.01 220); }
  .lam-card--expired .lam-card-img  { filter: grayscale(0.6) brightness(0.95); }
  /* ── Price button — solid teal border, single grad, black drop-shadow ── */
  /* Figma node 1287:4615: border #97e9e8, grad teal 46%→darker, drop-shadow 0 8px 8px black/10% */
  .lam-price-btn {
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 2px solid oklch(0.87 0.09 196);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    position: relative;
    /* overflow: visible — glow ::after needs to escape the bounds */
    background: linear-gradient(135deg,
      oklch(0.80 0.14 195) 46%,
      oklch(0.68 0.12 195) 100%
    );
    box-shadow:
      0 8px 16px oklch(0 0 0 / 0.12),
      0 3px 10px oklch(0.78 0.14 195 / 0.35),
      0 1px 3px  oklch(0 0 0 / 0.08);
    transition: transform 0.2s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  /* inset shine — top→center white gradient */
  .lam-price-btn::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 50%;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.45) 0%, transparent 50%);
    pointer-events: none; z-index: 1;
  }
  /* teal radial glow — opacity 0 at rest, reveals on hover */
  .lam-price-btn::after {
    content: '';
    position: absolute; inset: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, oklch(0.80 0.14 195) 0%, transparent 70%);
    filter: blur(5px);
    opacity: 0; z-index: -1;
    transition: opacity 0.3s ease;
  }
  .lam-price-btn:hover {
    transform: scale(1.06);
    box-shadow:
      0 12px 20px oklch(0 0 0 / 0.14),
      0 5px 14px oklch(0.78 0.14 195 / 0.45),
      0 1px 3px  oklch(0 0 0 / 0.08);
  }
  .lam-price-btn:hover::after { opacity: 0.40; }
  .lam-price-btn:active { transform: scale(0.90); }
  .lam-price-btn:focus-visible {
    outline: 2px solid oklch(0.78 0.14 195 / 0.60);
    outline-offset: 2px;
  }
  /* ── Like button — white ring default, vault active ── */
  .lam-like-btn {
    width: 26px; height: 26px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    background: oklch(1 0 0);
    box-shadow:
      inset 0 0 0 1.5px oklch(0.22 0.18 285 / 0.14),
      0 1px 4px oklch(0.22 0.18 285 / 0.08);
    transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.15s ease;
  }
  .lam-like-btn:hover {
    background: oklch(0.97 0.006 285);
    transform: scale(1.08);
  }
  .lam-like-btn:active { transform: scale(0.88); }
  .lam-like-btn--active {
    background: oklch(0.22 0.18 285);
    box-shadow: 0 2px 8px oklch(0.22 0.18 285 / 0.30);
  }
  .lam-like-btn:focus-visible {
    outline: 2px solid oklch(0.22 0.18 285 / 0.60);
    outline-offset: 2px;
  }
  /* ── EN VIVO pill badge ── */
  .lam-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 6px 3px 5px;
    border-radius: 9999px;
    font-family: var(--vmc-font-display);
    font-size: 8px; font-weight: 700; letter-spacing: 0.07em;
    text-transform: uppercase; white-space: nowrap;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .lam-pill--live {
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(135deg,
        oklch(0.78 0.17 55) 0%,
        oklch(0.72 0.16 55) 40%,
        oklch(0.54 0.18 44) 100%
      ),
      linear-gradient(135deg,
        oklch(0.86 0.12 55) 0%,
        oklch(1 0 0 / 0.45) 40%,
        oklch(0.65 0.16 50) 75%,
        oklch(0.86 0.12 55) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow: 0 2px 8px oklch(0.72 0.16 55 / 0.40), inset 0 1px 0 oklch(1 0 0 / 0.14);
    color: oklch(1 0 0);
  }
  .lam-pill-dot {
    width: 5px; height: 5px; border-radius: 9999px;
    background: oklch(1 0 0 / 0.92);
    flex-shrink: 0;
    animation: lam-live-ring 1.4s ease-out infinite;
  }
  @keyframes lam-live-ring {
    0%   { opacity: 1; transform: scale(0.8); }
    100% { opacity: 0; transform: scale(1.9); }
  }
  /* ── Clock badge (próxima) ── */
  .lam-clock-badge {
    width: 18px; height: 18px;
    background: oklch(0.72 0.16 55);
    border-radius: 9999px;
    display: flex; align-items: center; justify-content: center;
    animation: lam-clock-pulse 1.4s ease-out infinite;
    box-shadow: 0 0 0 0 oklch(0.72 0.16 55 / 0.45);
  }
  @keyframes lam-clock-pulse {
    0%   { box-shadow: 0 0 0 0   oklch(0.72 0.16 55 / 0.45); }
    70%  { box-shadow: 0 0 0 6px oklch(0.72 0.16 55 / 0); }
    100% { box-shadow: 0 0 0 0   oklch(0.72 0.16 55 / 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .lam-card        { transition: none; }
    .lam-clock-badge { animation: none; }
    .lam-pill-dot    { animation: none; }
  }
`;

/* ── Bracket SVGs for ListingArea Mobile ── */
function LamBktTL({ size = 14, sw = 2 }: { size?: number; sw?: number }): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      aria-hidden="true">
      <defs>
        <linearGradient id="lam-btlg1" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="oklch(0.75 0.17 55)" />
          <stop offset="100%" stopColor="oklch(0.30 0.22 285)" />
        </linearGradient>
      </defs>
      <path
        d={`M${size - h} ${h} L${r + h} ${h} Q${h} ${h} ${h} ${r + h} L${h} ${size - h}`}
        stroke="url(#lam-btlg1)" strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function LamBktBR({ size = 14, sw = 2 }: { size?: number; sw?: number }): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: "absolute", bottom: 0, right: 0, pointerEvents: "none" }}
      aria-hidden="true">
      <defs>
        <linearGradient id="lam-bbrg1" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="oklch(0.75 0.17 55)" />
          <stop offset="100%" stopColor="oklch(0.30 0.22 285)" />
        </linearGradient>
      </defs>
      <path
        d={`M${h} ${size - h} L${size - r - h} ${size - h} Q${size - h} ${size - h} ${size - h} ${size - r - h} L${size - h} ${h}`}
        stroke="url(#lam-bbrg1)" strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Dollar icon — full white, drop-shadow for legibility on teal ── */
function LamDollarIcon({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="oklch(1 0 0)" strokeWidth="2.6"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ filter: "drop-shadow(0px 1px 2px oklch(0 0 0 / 0.55))", position: "relative", zIndex: 2 }}>
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

/* ── Heart icons ── */
function LamHeartOutline({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="oklch(0.38 0.20 285)" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function LamHeartFilled({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="oklch(1 0 0 / 0.92)" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

/* ── Like button state helpers ── */
const LAM_LIKE_STATE: Record<"liked" | "notLiked", { cls: string; label: string }> = {
  liked:    { cls: "lam-like-btn lam-like-btn--active", label: "Quitar like" },
  notLiked: { cls: "lam-like-btn",                     label: "Me gusta"    },
};

function lamLikeKey(isLiked: boolean): "liked" | "notLiked" {
  if (isLiked) { return "liked"; }
  return "notLiked";
}

/* ── Price button (teal) ── */
function LamPriceButton(): JSX.Element {
  return (
    <button className="lam-price-btn" type="button" aria-label="Ver precio">
      <LamDollarIcon size={12} />
    </button>
  );
}

/* ── Like button — self-contained state ── */
function LamLikeButton(): JSX.Element {
  const [liked, setLiked] = useState(false);
  function handleToggle(): void { setLiked(!liked); }
  const state = LAM_LIKE_STATE[lamLikeKey(liked)];
  return (
    <button
      className={state.cls}
      type="button"
      aria-label={state.label}
      onClick={handleToggle}
    >
      {liked && <LamHeartFilled size={12} />}
      {!liked && <LamHeartOutline size={12} />}
    </button>
  );
}

/* ── Card variant class lookup ── */
const LAM_CARD_CLS: Record<"live" | "negotiable" | "proxima" | "expired", string> = {
  live:       "lam-card lam-card--live",
  negotiable: "lam-card lam-card--negotiable",
  proxima:    "lam-card lam-card--proxima",
  expired:    "lam-card lam-card--expired",
};

interface LamCardProps {
  variant: "live" | "negotiable" | "proxima" | "expired";
  name: string;
  year: string;
  price?: string;
  badge?: "live" | "clock";
}

function LamAuctionCard({ variant, name, year, price, badge }: LamCardProps): JSX.Element {
  return (
    <div className={LAM_CARD_CLS[variant]}>
      <div className="lam-card-img">
        <img src="/demo/bronco.jpg" alt={name} width={186} height={104}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {badge === "live" && (
          <div className="lam-card-badge">
            <div className="lam-pill lam-pill--live">
              <div className="lam-pill-dot" />
              EN VIVO
            </div>
          </div>
        )}
        {badge === "clock" && (
          <div className="lam-card-badge">
            <div className="lam-clock-badge">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                stroke="oklch(1 0 0 / 0.92)" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 15.5 14"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="lam-card-body">
        <div className="lam-card-meta">
          <p className="lam-card-name">{name}</p>
          <p className="lam-card-year">{year}</p>
        </div>
        {price && (
          <div className="lam-card-price-row">
            <div className="lam-card-price-left">
              <LamPriceButton />
              <span className="lam-card-price-text">{price}</span>
            </div>
            <LamLikeButton />
          </div>
        )}
        {!price && (
          <div className="lam-card-like-row">
            <LamLikeButton />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Listing Area Mobile root ── */
function ListingAreaMobile(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAM_CSS }} />
      <div className="lam-root">
        <LamBktTL size={16} sw={2} />
        <LamBktBR size={16} sw={2} />

        <div className="lam-header">
          <div className="lam-header-left">
            <p className="lam-name">Santander Consumer</p>
            <p className="lam-count">10 Ofertas</p>
          </div>
          <span className="lam-link" role="button" tabIndex={0}>
            Ir al perfil
            <span className="lam-link-icon" aria-hidden="true">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
          </span>
        </div>

        <div className="lam-cards">
          <LamAuctionCard variant="live"       name="Audi Q3"        year="2026" price="US$ 9,999"  />
          <LamAuctionCard variant="live"       name="BMW X5"         year="2025" price="US$ 24,500" badge="live" />
          <LamAuctionCard variant="negotiable" name="Honda CR-V"     year="2024" />
          <LamAuctionCard variant="live"       name="Toyota 4Runner" year="2023" price="US$ 18,900" badge="clock" />
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE 3 — ICONOGRAFÍA DE CATEGORÍAS
   Fuente: Material Design Icons (github.com/Templarian/MaterialDesign · Apache 2.0)
   Fill: vault gradient · fillRule="evenodd"
───────────────────────────────────────────── */

const ICONS_CSS = `
  .icn-wrap { padding: 24px 16px; background: oklch(1 0 0); }
  .icn-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .icn-tile {
    display: flex; flex-direction: column;
    align-items: center; gap: 10px;
    padding: 16px 8px;
    background: oklch(0.97 0.006 285);
    border-radius: 10px;
    border: 1px solid oklch(0.22 0.18 285 / 0.08);
    cursor: pointer;
    transition: background 0.16s ease, transform 0.16s ease;
  }
  .icn-tile:hover { background: oklch(0.94 0.010 285); transform: translateY(-2px); }
  .icn-tile:active { transform: scale(0.96); }
  .icn-tile:focus-visible { outline: 2px solid oklch(0.22 0.18 285 / 0.60); outline-offset: 2px; }
  .icn-tile-label {
    font-family: var(--vmc-font-display);
    font-size: 8px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: oklch(0.22 0.18 285);
    text-align: center; line-height: 1.3; margin: 0;
  }
  .icn-variants-block { margin-bottom: 12px; }
  .icn-variants-title {
    font-family: var(--vmc-font-display);
    font-size: 7px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.10em;
    color: oklch(0.38 0.12 285 / 0.55);
    margin: 0 0 6px 2px;
  }
  .icn-variants-row {
    display: flex; flex-wrap: wrap; gap: 12px;
    padding: 12px;
    background: oklch(0.97 0.006 285);
    border-radius: 10px;
    border: 1px solid oklch(0.22 0.18 285 / 0.08);
  }
  .icn-variant-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .icn-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 7px; font-weight: 500;
    color: oklch(0.38 0.12 285 / 0.50);
    letter-spacing: 0.03em; margin: 0; text-align: center;
  }
  .icn-scale-row {
    display: flex; align-items: flex-end; gap: 16px;
    padding: 16px;
    background: oklch(0.97 0.006 285);
    border-radius: 10px;
    border: 1px solid oklch(0.22 0.18 285 / 0.08);
  }
  .icn-scale-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .icn-scale-label {
    font-family: var(--vmc-font-display);
    font-size: 8px; font-weight: 500;
    color: oklch(0.38 0.12 285 / 0.60);
    letter-spacing: 0.04em; margin: 0; text-align: center;
  }
`;

interface IcnGradProps { id: string; }
function IcnGrad({ id }: IcnGradProps): JSX.Element {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="oklch(0.52 0.24 285)" />
        <stop offset="55%"  stopColor="oklch(0.30 0.22 285)" />
        <stop offset="100%" stopColor="oklch(0.16 0.18 285)" />
      </linearGradient>
    </defs>
  );
}

interface IcnProps { size?: number; gradId: string; }

/* ── Vehicular — body filled, cabin window + wheel arches cut via evenodd ── */
function IcnVehicular({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path
        fillRule="evenodd"
        fill={`url(#${gradId})`}
        d={
          "M2.5 15.5 L2.5 13 L5 8 Q5.5 6.5 7.5 6.5 L16.5 6.5 " +
          "Q18.5 6.5 19 8 L21.5 13 L21.5 15.5 Q21.5 17 20 17 " +
          "L4 17 Q2.5 17 2.5 15.5 Z " +
          "M8 13 L9 8.5 L15 8.5 L16 13 Z " +
          "M4.5 17 Q4.5 14.5 7 14.5 Q9.5 14.5 9.5 17 Z " +
          "M14.5 17 Q14.5 14.5 17 14.5 Q19.5 14.5 19.5 17 Z"
        }
      />
    </svg>
  );
}

/* ── MDI paths — Material Design Icons (Apache 2.0)
   github.com/Templarian/MaterialDesign
── */

/* Maquinaria */
const MDI_EXCAVATOR =
  "M18.5 18.5C19.04 18.5 19.5 18.96 19.5 19.5S19.04 20.5 18.5 20.5" +
  "H6.5C5.96 20.5 5.5 20.04 5.5 19.5S5.96 18.5 6.5 18.5H18.5" +
  "M18.5 17H6.5C5.13 17 4 18.13 4 19.5S5.13 22 6.5 22H18.5" +
  "C19.88 22 21 20.88 21 19.5S19.88 17 18.5 17" +
  "M21 11H18V7H13L10 11V16H22L21 11" +
  "M11.54 11L13.5 8.5H16V11H11.54" +
  "M9.76 3.41L4.76 2L2 11.83C1.66 13.11 2.41 14.44 3.7 14.8" +
  "L4.86 15.12L8.15 12.29L4.27 11.21L6.15 4.46L8.94 5.24" +
  "C9.5 5.53 10.71 6.34 11.47 7.37L12.5 6H12.94" +
  "C11.68 4.41 9.85 3.46 9.76 3.41Z";

const MDI_BULLDOZER =
  "M4,4A1,1 0 0,0 3,5V10C2.54,10 2.14,10.31 2.03,10.76V13.97" +
  "H2.29C2.65,13.37 3.3,13 4,13H13C13.7,13 14.35,13.37 14.71,13.97" +
  "H16.03L16,11V11A1,1 0 0,0 15,10H13V8A1,1 0 0,0 12,7" +
  "A1,1 0 0,0 11,8V10H9V5A1,1 0 0,0 8,4H4" +
  "M5,6H7V10L7,11H5V6" +
  "M17,11V19H22V18L19,17L18,11H17" +
  "M4,15A2,2 0 0,0 2,17A2,2 0 0,0 4,19H13A2,2 0 0,0 15,17" +
  "A2,2 0 0,0 13,15H4Z";

const MDI_FORKLIFT =
  "M6,4V11H4C2.89,11 2,11.89 2,13V17A3,3 0 0,0 5,20" +
  "A3,3 0 0,0 8,17H10A3,3 0 0,0 13,20A3,3 0 0,0 16,17" +
  "V13L12,4H6M17,5V19H22V17.5H18.5V5H17" +
  "M7.5,5.5H11.2L14.5,13H7.5V5.5" +
  "M5,15.5A1.5,1.5 0 0,1 6.5,17A1.5,1.5 0 0,1 5,18.5" +
  "A1.5,1.5 0 0,1 3.5,17A1.5,1.5 0 0,1 5,15.5" +
  "M13,15.5A1.5,1.5 0 0,1 14.5,17A1.5,1.5 0 0,1 13,18.5" +
  "A1.5,1.5 0 0,1 11.5,17A1.5,1.5 0 0,1 13,15.5Z";

const MDI_CRANE =
  "M20,6V5A1,1 0 0,0 19,4H9V3H6V4H5V6H6V15H5V13H3V15H2" +
  "V17H3V21H5V17H10V21H12V19.92L12,17H13V15H12V13H10V15H9" +
  "V6H17V10.62C16.53,10.79 16.19,11.23 16.19,11.76" +
  "C16.19,12.2 16.43,12.6 16.8,12.82V14H17.42" +
  "C17.76,14 18.03,14.28 18.03,14.62C18.03,14.96 17.76,15.24 17.42,15.24" +
  "C17.2,15.24 17,15.12 16.89,14.93C16.71,14.64 16.34,14.54 16.05,14.71" +
  "C15.75,14.87 15.65,15.25 15.82,15.55C16.15,16.11 16.76,16.47 17.42,16.47" +
  "C18.43,16.47 19.26,15.64 19.26,14.62C19.26,13.84 18.76,13.14 18.03,12.88" +
  "V12.82C18.41,12.6 18.65,12.2 18.65,11.76" +
  "C18.65,11.3 18.38,10.91 18,10.7V6H20" +
  "M8,13.66L7,14.66V13.24L8,12.24V13.66" +
  "M8,10.71L7,11.71V10.29L8,9.29V10.71" +
  "M7,8.71V7.29L8,6.29V7.71L7,8.71Z";

/* Equipos Diversos */
const MDI_SAW_BLADE =
  "M20,15C20,15 18.6,16.3 21.1,17L18.3,19.8H15.5" +
  "C15.5,19.8 13.6,19.7 15,22H11L9,20" +
  "C9,20 7.7,18.6 7,21.1L4.2,18.3V15.5" +
  "C4.2,15.5 4.3,13.6 2,15V11L4,9" +
  "C4,9 5.4,7.7 2.8,7.1L5.6,4.2H8.5" +
  "C8.5,4.2 10.4,4.3 9,2H13L15,4" +
  "C15,4 16.3,5.4 17,2.8L19.8,5.6V8.5" +
  "C19.8,8.5 19.7,10.4 22,9V13L20,15" +
  "M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z";

const MDI_CIRCULAR_SAW =
  "M13,11A1,1 0 0,1 14,12A1,1 0 0,1 13,13A1,1 0 0,1 12,12A1,1 0 0,1 13,11" +
  "M7.86,6.25C9.14,4.87 10.97,4 13,4C16.5,4 19.44,6.61 19.93,10H22V12" +
  "H16A3,3 0 0,0 13,9A3,3 0 0,0 10,12H2V10H2.05" +
  "C2.25,7.73 3.14,5.66 4.5,4L7.86,6.25" +
  "M6.73,7.89L5.06,6.77C4.53,7.75 4.18,8.84 4.06,10H6.07" +
  "C6.18,9.25 6.4,8.54 6.73,7.89" +
  "M7.4,15.4L6,14H11.79C12.03,14.42 12.5,14.7 13,14.7" +
  "C13.5,14.7 13.97,14.42 14.21,14H20V15.4" +
  "C18.39,14.42 18.46,15.75 18.46,15.75V17.71L16.5,19.67" +
  "C16,17.92 15.1,18.9 15.1,18.9L13.7,20.3H10.9" +
  "C11.88,18.69 10.55,18.76 10.55,18.76H8.59L6.63,16.8" +
  "C8.38,16.31 7.4,15.4 7.4,15.4Z";

const MDI_WRENCH =
  "M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3" +
  "C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7" +
  "C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6" +
  "L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4" +
  "C23.1,20 23.1,19.3 22.7,19Z";

/* Artículos Diversos */
const MDI_LAPTOP =
  "M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4" +
  "C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z";

const MDI_CELLPHONE =
  "M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21" +
  "A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z";

const MDI_DESKTOP_TOWER =
  "M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8" +
  "A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2" +
  "M8,4V6H16V4H8M16,8H8V10H16V8M16,18H14V20H16V18Z";

const MDI_MONITOR =
  "M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16" +
  "A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21" +
  "A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z";

const MDI_TABLET =
  "M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18" +
  "A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z";

/* ── Hand-crafted paths — geometric, evenodd-safe ── */

/* Grúa silueta — mast + jib + counter-jib + counterweight + rope + hook
   No sub-path overlaps → all sub-paths fill solid (1 crossing each) */
const CRANE_TOWER_PATH =
  "M11,0 L13,0 L13,23 L11,23 Z" +           // mast
  "M13,1 L24,1 L24,3 L13,3 Z" +              // main jib (right)
  "M4,1 L11,1 L11,3 L4,3 Z" +               // counter-jib (left)
  "M3,3 L7,3 L7,6.5 L3,6.5 Z" +             // counterweight block
  "M19.5,3 L20.5,3 L20.5,13 L19.5,13 Z" +   // hanging rope
  "M18,13 L22,13 L22,15 L18,15 Z";           // hook bar

/* Sierra circular como herramienta de poder (ángulo-grinder lateral)
   Motor body x=2-12 · handle x=5-10 (over body) · blade disc r=6 center (18,14) x=12-24
   Body right edge (x=12) = blade leftmost (18-6=12) → edge-adjacent, NO area overlap
   Base plate y=20-22 · Hub punch r=2 inside disc (evenodd level 2 = hole) */
const SAW_HANDLE_PATH =
  "M2,9 L12,9 L12,16 L2,16 Z" +                                   // motor body
  "M5,4 L10,4 L10,9 L5,9 Z" +                                     // grip handle
  "M18,8 A6,6,0,1,0,18,20 A6,6,0,1,0,18,8 Z" +                  // blade disc outer
  "M18,12 A2,2,0,1,0,18,16 A2,2,0,1,0,18,12 Z" +                 // hub punch (evenodd)
  "M1,20 L23,20 L23,22 L1,22 Z";                                  // base plate

/* Laptop Gemini v10 — tela separada + base trapezoid + 4 níveis evenodd completos
   Level 1: screen rect + base trapezoid + bottom edge (3 sub-paths)
   Level 2: screen bezel outer + camera + keyboard well + trackpad (holes)
   Level 3: screen interior re-fill + 3 key bars + spacebar
   Level 4: 3 reflection bands + key separators fila 1/2/3 (holes finais)
   ⚠ camera usa arc 0.001 (Gemini bug menor) — sub-pixel, não visível */
const LAPTOP_KEYBOARD_PATH =
  "M4,2.5 h16 a1.5,1.5 0 0,1 1.5,1.5 v9.8 a1,1 0 0,1 -1,1 H3.5 a1,1 0 0,1 -1,-1 v-9.8 a1.5,1.5 0 0,1 1.5,-1.5 Z " +
  "M3.5,14.4 H20.5 L23.5,21.5 H0.5 Z " +
  "M0.5,21.8 H23.5 V22.2 H0.5 Z " +
  "M3.5,3.5 h17 v9.3 h-17 Z " +
  "M12,3.1 a0.4,0.4 0 1,0 0.001,0 Z " +
  "M4.2,14.9 H19.8 L21.5,19.2 H2.5 Z " +
  "M9.5,19.7 H14.5 L14.7,20.7 H9.3 Z " +
  "M4.0,4.0 h16 v8.3 h-16 Z " +
  "M4.5,15.2 H19.5 L19.8,15.9 H4.2 Z " +
  "M4.0,16.3 H20.0 L20.4,17.0 H3.6 Z " +
  "M3.4,17.4 H20.6 L21.0,18.1 H3.0 Z " +
  "M8.5,18.4 H15.5 L15.7,19.1 H8.3 Z " +
  "M5.0,5.0 L10,11.5 h0.6 L5.6,5.0 Z " +
  "M6.5,5.0 L9.0,8.2 h0.6 L7.1,5.0 Z " +
  "M16.5,8.0 L19.2,11.5 h0.6 L17.1,8.0 Z " +
  "M6.9,15.1 H7.1 V16.0 H6.9 Z M9.4,15.1 H9.6 V16.0 H9.4 Z M11.9,15.1 H12.1 V16.0 H11.9 Z M14.4,15.1 H14.6 V16.0 H14.4 Z M16.9,15.1 H17.1 V16.0 H16.9 Z " +
  "M6.7,16.2 H6.9 V17.1 H6.7 Z M9.3,16.2 H9.5 V17.1 H9.3 Z M11.9,16.2 H12.1 V17.1 H11.9 Z M14.5,16.2 H14.7 V17.1 H14.5 Z M17.1,16.2 H17.3 V17.1 H17.1 Z " +
  "M6.4,17.3 H6.6 V18.2 H6.4 Z M9.1,17.3 H9.3 V18.2 H9.1 Z M11.9,17.3 H12.1 V18.2 H11.9 Z M14.7,17.3 H14.9 V18.2 H14.7 Z M17.4,17.3 H17.6 V18.2 H17.4 Z";

/* ── Icon components ── */

function IcnMaquinariaA({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_EXCAVATOR} />
    </svg>
  );
}

function IcnMaquinariaB({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_BULLDOZER} />
    </svg>
  );
}

function IcnMaquinariaC({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_FORKLIFT} />
    </svg>
  );
}

function IcnMaquinariaD({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_CRANE} />
    </svg>
  );
}

function IcnEquiposA({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_SAW_BLADE} />
    </svg>
  );
}

function IcnEquiposB({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_CIRCULAR_SAW} />
    </svg>
  );
}

function IcnEquiposC({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_WRENCH} />
    </svg>
  );
}

function IcnArticulosA({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_LAPTOP} />
    </svg>
  );
}

function IcnArticulosB({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_CELLPHONE} />
    </svg>
  );
}

function IcnArticulosC({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_DESKTOP_TOWER} />
    </svg>
  );
}

function IcnArticulosD({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_MONITOR} />
    </svg>
  );
}

function IcnArticulosE({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={MDI_TABLET} />
    </svg>
  );
}

/* ── Variantes hand-crafted ── */

function IcnMaquinariaE({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={CRANE_TOWER_PATH} />
    </svg>
  );
}

function IcnEquiposD({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={SAW_HANDLE_PATH} />
    </svg>
  );
}

function IcnArticulosF({ size = 32, gradId }: IcnProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <IcnGrad id={gradId} />
      <path fillRule="evenodd" fill={`url(#${gradId})`} d={LAPTOP_KEYBOARD_PATH} />
    </svg>
  );
}

/* ── UI Icons — Participants & View ── */
interface UiIcnProps { size?: number; color?: string; }

function IcnParticipants({ size = 24, color = "white" }: UiIcnProps): JSX.Element {
  /* 3 personas en fila — igual tamaño, sin jerarquía
     evenodd crea gap automático en solapado de cuerpos
     cx: 4.5 · 12 · 19.5  r=2.8                                      */
  const PATH =
    "M7.3,7.5 a2.8,2.8 0 1,0 -5.6,0 a2.8,2.8 0 1,0 5.6,0 " +
    "M0.5,22 C0.5,15 2.5,10.5 4.5,10.5 C6.5,10.5 8.5,15 8.5,22 Z " +
    "M14.8,7.5 a2.8,2.8 0 1,0 -5.6,0 a2.8,2.8 0 1,0 5.6,0 " +
    "M8,22 C8,15 10,10.5 12,10.5 C14,10.5 16,15 16,22 Z " +
    "M22.3,7.5 a2.8,2.8 0 1,0 -5.6,0 a2.8,2.8 0 1,0 5.6,0 " +
    "M15.5,22 C15.5,15 17.5,10.5 19.5,10.5 C21.5,10.5 23.5,15 23.5,22 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d={PATH} />
    </svg>
  );
}

function IcnView({ size = 24, color = "white" }: UiIcnProps): JSX.Element {
  /* Eye icon moderno — evenodd: outer lens → iris hole → pupil refill
     Outer: almond C6,6–18,6 · Iris r=4 · Pupil r=1.8                     */
  const PATH =
    "M2,12 C6,6 18,6 22,12 C18,18 6,18 2,12 Z " +
    "M16,12 a4,4 0 1,0 -8,0 a4,4 0 1,0 8,0 " +
    "M13.8,12 a1.8,1.8 0 1,0 -3.6,0 a1.8,1.8 0 1,0 3.6,0";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillRule="evenodd" aria-hidden="true">
      <path fillRule="evenodd" d={PATH} />
    </svg>
  );
}

function IcnCalendarA({ size = 24, color = "white" }: UiIcnProps): JSX.Element {
  /* Classic calendar — body + 2 binding tabs + header sep + 3×2 grid holes
     fillRule evenodd: every rect inside body subtracts (transparent punch)        */
  const PATH =
    "M2,7 L22,7 L22,22 L2,22 Z " +
    "M5.5,2 L9.5,2 L9.5,7 L5.5,7 Z " +
    "M14.5,2 L18.5,2 L18.5,7 L14.5,7 Z " +
    "M2,10 L22,10 L22,10.5 L2,10.5 Z " +
    "M3.5,11.5 L7,11.5 L7,13.5 L3.5,13.5 Z " +
    "M10,11.5 L14,11.5 L14,13.5 L10,13.5 Z " +
    "M17,11.5 L20.5,11.5 L20.5,13.5 L17,13.5 Z " +
    "M3.5,15.5 L7,15.5 L7,17.5 L3.5,17.5 Z " +
    "M10,15.5 L14,15.5 L14,17.5 L10,17.5 Z " +
    "M17,15.5 L20.5,15.5 L20.5,17.5 L17,17.5 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d={PATH} />
    </svg>
  );
}

function IcnCalendarB({ size = 24, color = "white" }: UiIcnProps): JSX.Element {
  /* Minimal calendar — body + binding tabs + single "today" center dot
     No grid, no separator — modern date-focused silhouette                        */
  const PATH =
    "M2,7 L22,7 L22,22 L2,22 Z " +
    "M5.5,2 L9.5,2 L9.5,7 L5.5,7 Z " +
    "M14.5,2 L18.5,2 L18.5,7 L14.5,7 Z " +
    "M14.5,14.5 a2.5,2.5 0 1,0 -5,0 a2.5,2.5 0 1,0 5,0";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d={PATH} />
    </svg>
  );
}

function IcnCalendarC({ size = 24, color = "white" }: UiIcnProps): JSX.Element {
  /* Calendar + checkmark — body + binding tabs + header sep + thick check hole
     Communicates "confirmed appointment" / "checked date"                         */
  const PATH =
    "M2,7 L22,7 L22,22 L2,22 Z " +
    "M5.5,2 L9.5,2 L9.5,7 L5.5,7 Z " +
    "M14.5,2 L18.5,2 L18.5,7 L14.5,7 Z " +
    "M2,10 L22,10 L22,10.5 L2,10.5 Z " +
    "M5,16 L10.5,21.5 L21,13 L19,11 L10.5,18 L7,13.5 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d={PATH} />
    </svg>
  );
}

/* ── UI Icons preview section ── */
function UIIconsSection(): JSX.Element {
  const SIZES: number[] = [16, 20, 24];
  const BG = "oklch(0.22 0.18 285)";
  const calVariants: Array<{ label: string; Icn: typeof IcnCalendarA }> = [
    { label: "A · Clásico + grid", Icn: IcnCalendarA },
    { label: "B · Minimal + dot",  Icn: IcnCalendarB },
    { label: "C · Check",          Icn: IcnCalendarC },
  ];
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Participants */}
      <div>
        <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "oklch(0.22 0.18 285 / 0.45)", margin: "0 0 8px" }}>
          ParticipantsIcon — 3 tamaños
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
          {SIZES.map(function renderParticipant(s) {
            return (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ background: BG, borderRadius: 6, padding: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IcnParticipants size={s} />
                </div>
                <span style={{ fontFamily: F, fontSize: 9, color: "oklch(0.22 0.18 285 / 0.40)" }}>
                  {s}px
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* View */}
      <div>
        <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "oklch(0.22 0.18 285 / 0.45)", margin: "0 0 8px" }}>
          ViewIcon — 3 tamaños
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
          {SIZES.map(function renderView(s) {
            return (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ background: BG, borderRadius: 6, padding: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IcnView size={s} />
                </div>
                <span style={{ fontFamily: F, fontSize: 9, color: "oklch(0.22 0.18 285 / 0.40)" }}>
                  {s}px
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Icons — 3 variants */}
      <div>
        <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "oklch(0.22 0.18 285 / 0.45)", margin: "0 0 8px" }}>
          CalendarIcon — 3 variantes
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {calVariants.map(function renderCalRow({ label, Icn }) {
            return (
              <div key={label}>
                <p style={{ fontFamily: F, fontSize: 8, color: "oklch(0.22 0.18 285 / 0.35)",
                  margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </p>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
                  {SIZES.map(function renderCalCell(s) {
                    return (
                      <div key={s} style={{ display: "flex", flexDirection: "column",
                        alignItems: "center", gap: "6px" }}>
                        <div style={{ background: BG, borderRadius: 6, padding: "10px",
                          display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icn size={s} />
                        </div>
                        <span style={{ fontFamily: F, fontSize: 9,
                          color: "oklch(0.22 0.18 285 / 0.40)" }}>
                          {s}px
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ── Category Icons section ── */
function CategoryIconsSection(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ICONS_CSS }} />
      <div className="icn-wrap">

        {/* Maquinaria — MDI aprobado + variante silueta */}
        <div className="icn-variants-block">
          <p className="icn-variants-title">Maquinaria</p>
          <div className="icn-variants-row">
            <div className="icn-variant-item">
              <IcnMaquinariaD size={40} gradId="icn-maq-d" />
              <span className="icn-variant-label">Grúa MDI ✓ 40px</span>
            </div>
            <div className="icn-variant-item">
              <IcnMaquinariaD size={27} gradId="icn-maq-d-sm" />
              <span className="icn-variant-label">Grúa MDI SM 27px</span>
            </div>
            <div className="icn-variant-item">
              <IcnMaquinariaE size={40} gradId="icn-maq-e" />
              <span className="icn-variant-label">Grúa Silueta</span>
            </div>
          </div>
        </div>

        {/* Equipos Diversos — MDI aprobado + variante herramienta */}
        <div className="icn-variants-block">
          <p className="icn-variants-title">Equipos Diversos</p>
          <div className="icn-variants-row">
            <div className="icn-variant-item">
              <IcnEquiposB size={40} gradId="icn-eq-b" />
              <span className="icn-variant-label">Sierra Circ. ✓ 40px</span>
            </div>
            <div className="icn-variant-item">
              <IcnEquiposB size={27} gradId="icn-eq-b-sm" />
              <span className="icn-variant-label">Sierra Circ. SM 27px</span>
            </div>
            <div className="icn-variant-item">
              <IcnEquiposD size={40} gradId="icn-eq-d" />
              <span className="icn-variant-label">Sierra Herramienta</span>
            </div>
          </div>
        </div>

        {/* Artículos Diversos — MDI aprobado + variante teclado */}
        <div className="icn-variants-block">
          <p className="icn-variants-title">Artículos Diversos</p>
          <div className="icn-variants-row">
            <div className="icn-variant-item">
              <IcnArticulosA size={40} gradId="icn-art-a" />
              <span className="icn-variant-label">Laptop MDI ✓</span>
            </div>
            <div className="icn-variant-item">
              <IcnArticulosF size={40} gradId="icn-art-f" />
              <span className="icn-variant-label">Laptop+Teclado 40px</span>
            </div>
            <div className="icn-variant-item">
              <IcnArticulosF size={27} gradId="icn-art-f-sm" />
              <span className="icn-variant-label">Laptop+Teclado SM 27px</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

/* ── Badge Status ── */
const BADGE_CSS = `
  /* ── base pill ── */
  .bs-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 9999px;
    border: 1.5px solid transparent;
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    white-space: nowrap;
    line-height: 1.4;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
  }
  /* EN VIVO — naranja */
  .bs-live {
    color: oklch(1 0 0);
    background-image:
      linear-gradient(135deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 40%, oklch(0.54 0.18 44) 100%),
      linear-gradient(135deg, oklch(0.86 0.12 55) 0%, oklch(1 0 0 / 0.45) 40%, oklch(0.65 0.16 50) 75%, oklch(0.86 0.12 55) 100%);
    box-shadow: 0 2px 8px oklch(0.72 0.16 55 / 0.40), inset 0 1px 0 oklch(1 0 0 / 0.14);
  }
  /* NEGOCIABLE — cian */
  .bs-negotiable {
    color: oklch(0.18 0.14 285);
    background-image:
      linear-gradient(135deg, oklch(0.82 0.14 195) 0%, oklch(0.75 0.16 195) 40%, oklch(0.62 0.16 200) 100%),
      linear-gradient(135deg, oklch(0.88 0.10 195) 0%, oklch(1 0 0 / 0.45) 40%, oklch(0.72 0.14 195) 75%, oklch(0.88 0.10 195) 100%);
    box-shadow: 0 2px 8px oklch(0.75 0.16 195 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.18);
  }
  /* PRÓXIMA — vault púrpura */
  .bs-proxima {
    color: oklch(1 0 0);
    background-image:
      linear-gradient(135deg, oklch(0.30 0.20 285) 0%, oklch(0.22 0.18 285) 40%, oklch(0.14 0.14 285) 100%),
      linear-gradient(135deg, oklch(0.40 0.22 285) 0%, oklch(1 0 0 / 0.25) 40%, oklch(0.24 0.18 285) 75%, oklch(0.40 0.22 285) 100%);
    box-shadow: 0 2px 8px oklch(0.22 0.18 285 / 0.50), inset 0 1px 0 oklch(1 0 0 / 0.12);
  }
  /* CERRADO — gris azulado */
  .bs-closed {
    color: oklch(1 0 0);
    background-image:
      linear-gradient(135deg, oklch(0.70 0.02 220) 0%, oklch(0.62 0.02 220) 40%, oklch(0.52 0.02 220) 100%),
      linear-gradient(135deg, oklch(0.78 0.02 220) 0%, oklch(1 0 0 / 0.30) 40%, oklch(0.60 0.02 220) 75%, oklch(0.78 0.02 220) 100%);
    box-shadow: 0 2px 6px oklch(0.60 0.02 220 / 0.30), inset 0 1px 0 oklch(1 0 0 / 0.12);
  }
  /* DESTACADO — vault muy oscuro */
  .bs-featured {
    color: oklch(1 0 0);
    background-image:
      linear-gradient(135deg, oklch(0.18 0.08 285) 0%, oklch(0.10 0.06 285) 40%, oklch(0.06 0.04 285) 100%),
      linear-gradient(135deg, oklch(0.28 0.12 285) 0%, oklch(1 0 0 / 0.20) 40%, oklch(0.12 0.06 285) 75%, oklch(0.28 0.12 285) 100%);
    box-shadow: 0 2px 8px oklch(0.10 0.06 285 / 0.60), inset 0 1px 0 oklch(1 0 0 / 0.10);
  }
  /* NUEVO — vault mid */
  .bs-nuevo {
    color: oklch(1 0 0);
    background-image:
      linear-gradient(135deg, oklch(0.36 0.22 285) 0%, oklch(0.28 0.20 285) 40%, oklch(0.20 0.16 285) 100%),
      linear-gradient(135deg, oklch(0.46 0.22 285) 0%, oklch(1 0 0 / 0.28) 40%, oklch(0.30 0.20 285) 75%, oklch(0.46 0.22 285) 100%);
    box-shadow: 0 2px 8px oklch(0.28 0.20 285 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.14);
  }
  /* live dot */
  .bs-dot {
    width: 7px; height: 7px;
    border-radius: 9999px;
    background: oklch(0.55 0.22 25);
    flex-shrink: 0;
  }
  .bs-dot--pulse { animation: bs-dot-pulse 1.4s ease-in-out infinite; }
  @keyframes bs-dot-pulse {
    0%, 100% { opacity: 1;    transform: scale(1.0); }
    50%      { opacity: 0.30; transform: scale(0.65); }
  }
  .bs-badge--blink { animation: bs-badge-blink 1.4s ease-in-out infinite; }
  @keyframes bs-badge-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.35; }
  }

  /* ── Layout del spec sheet ── */
  .bs-sheet {
    padding: 16px;
    background: oklch(0.97 0.004 270);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  /* bloque con título */
  .bs-block-title {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 8px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: oklch(0.38 0.12 285 / 0.55);
    margin: 0 0 10px;
  }
  /* grid 3×2 para las 6 variantes */
  .bs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  /* card individual de variante */
  .bs-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 8px;
    background: oklch(1 0 0);
    border-radius: 8px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
  }
  .bs-card-name {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 8px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: oklch(0.22 0.18 285);
    margin: 0; text-align: center;
  }
  .bs-card-meta {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 7px; font-weight: 400;
    color: oklch(0.38 0.12 285 / 0.45);
    margin: 0; text-align: center; line-height: 1.5;
  }
  /* animación: fila de 2 frames */
  .bs-anim-row {
    display: flex;
    gap: 8px;
  }
  .bs-anim-frame {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 8px;
    background: oklch(1 0 0);
    border-radius: 8px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
  }
  .bs-anim-label {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 8px; font-weight: 600;
    color: oklch(0.38 0.12 285 / 0.50);
    margin: 0; text-align: center; letter-spacing: 0.04em;
  }
  /* contexto sobre imagen de tarjeta */
  .bs-ctx-img {
    width: 100%;
    height: 72px;
    border-radius: 6px;
    background: linear-gradient(135deg,
      oklch(0.22 0.18 285) 0%,
      oklch(0.30 0.14 240) 50%,
      oklch(0.18 0.10 210) 100%
    );
    display: flex;
    align-items: flex-start;
    padding: 8px;
    gap: 6px;
    flex-wrap: wrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .bs-dot--pulse   { animation: none; }
    .bs-badge--blink { animation: none; }
  }
`;

function BadgeStatusSection(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BADGE_CSS }} />
      <div className="bs-sheet">

        {/* ── BLOQUE 1: Todas las variantes ── */}
        <div>
          <p className="bs-block-title">6 Variantes · Figma component property: status</p>
          <div className="bs-grid">

            <div className="bs-card">
              <span className="bs-pill bs-live">
                <span className="bs-dot bs-dot--pulse" />
                EN VIVO
              </span>
              <p className="bs-card-name">En Vivo</p>
              <p className="bs-card-meta">naranja · animado{"\n"}2 frames</p>
            </div>

            <div className="bs-card">
              <span className="bs-pill bs-negotiable">NEGOCIABLE</span>
              <p className="bs-card-name">Negociable</p>
              <p className="bs-card-meta">teal · estático{"\n"}1 frame</p>
            </div>

            <div className="bs-card">
              <span className="bs-pill bs-proxima bs-badge--blink">PRÓXIMA</span>
              <p className="bs-card-name">Próxima</p>
              <p className="bs-card-meta">vault · animado{"\n"}2 frames</p>
            </div>

            <div className="bs-card">
              <span className="bs-pill bs-closed">CERRADO</span>
              <p className="bs-card-name">Cerrado</p>
              <p className="bs-card-meta">gris · estático{"\n"}1 frame</p>
            </div>

            <div className="bs-card">
              <span className="bs-pill bs-featured">DESTACADO</span>
              <p className="bs-card-name">Destacado</p>
              <p className="bs-card-meta">negro · estático{"\n"}1 frame</p>
            </div>

            <div className="bs-card">
              <span className="bs-pill bs-nuevo">NUEVO</span>
              <p className="bs-card-name">Nuevo</p>
              <p className="bs-card-meta">vault-mid · estático{"\n"}1 frame</p>
            </div>

          </div>
        </div>

        {/* ── BLOQUE 2: Frames animación EN VIVO ── */}
        <div>
          <p className="bs-block-title">EN VIVO — Smart Animate loop (2 frames)</p>
          <div className="bs-anim-row">
            <div className="bs-anim-frame">
              <span className="bs-pill bs-live">
                <span className="bs-dot" style={{ opacity: 1, transform: "scale(1.0)" }} />
                EN VIVO
              </span>
              <p className="bs-anim-label">Frame A{"\n"}dot visible · scale 1</p>
            </div>
            <div className="bs-anim-frame">
              <span className="bs-pill bs-live">
                <span className="bs-dot" style={{ opacity: 0.28, transform: "scale(0.65)" }} />
                EN VIVO
              </span>
              <p className="bs-anim-label">Frame B{"\n"}dot apagado · scale 0.65</p>
            </div>
          </div>
        </div>

        {/* ── BLOQUE 3: Frames animación PRÓXIMA ── */}
        <div>
          <p className="bs-block-title">PRÓXIMA — Smart Animate loop (2 frames)</p>
          <div className="bs-anim-row">
            <div className="bs-anim-frame">
              <span className="bs-pill bs-proxima" style={{ opacity: 1 }}>PRÓXIMA</span>
              <p className="bs-anim-label">Frame A{"\n"}opacity 1</p>
            </div>
            <div className="bs-anim-frame">
              <span className="bs-pill bs-proxima" style={{ opacity: 0.35 }}>PRÓXIMA</span>
              <p className="bs-anim-label">Frame B{"\n"}opacity 0.35</p>
            </div>
          </div>
        </div>

        {/* ── BLOQUE 4: En contexto (sobre imagen tarjeta) ── */}
        <div>
          <p className="bs-block-title">Contexto — sobre imagen de tarjeta</p>
          <div className="bs-ctx-img">
            <span className="bs-pill bs-live">
              <span className="bs-dot bs-dot--pulse" />
              EN VIVO
            </span>
            <span className="bs-pill bs-negotiable">NEGOCIABLE</span>
            <span className="bs-pill bs-proxima">PRÓXIMA</span>
            <span className="bs-pill bs-closed">CERRADO</span>
            <span className="bs-pill bs-featured">DESTACADO</span>
            <span className="bs-pill bs-nuevo">NUEVO</span>
          </div>
        </div>

      </div>
    </>
  );
}

/* ── Section label ── */
interface SectionLabelProps { title: string; subtitle?: string; }
function SectionLabel({ title, subtitle }: SectionLabelProps): JSX.Element {
  return (
    <div style={{
      background: "oklch(0.22 0.18 285)",
      padding: "10px 16px",
      borderTop: "1px solid oklch(1 0 0 / 0.08)",
    }}>
      <p style={{
        fontFamily: F, fontSize: 10, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.10em",
        color: "oklch(1 0 0 / 0.90)", margin: 0,
      }}>
        {title}
      </p>
      {subtitle && (
        <p style={{
          fontFamily: F, fontSize: 9, fontWeight: 400,
          color: "oklch(1 0 0 / 0.50)", margin: "2px 0 0", letterSpacing: "0.04em",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Placeholder section ── */
function PlaceholderSection({ label }: { label: string }): JSX.Element {
  return (
    <div style={{
      padding: "24px 16px",
      background: "oklch(0.98 0.003 270)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <p style={{
        fontFamily: F, fontSize: 11, fontWeight: 600,
        color: "oklch(0.22 0.18 285 / 0.35)",
        textTransform: "uppercase", letterSpacing: "0.08em", margin: 0,
      }}>
        {label} — pendiente
      </p>
    </div>
  );
}

export default function BorradorMobilePage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── Page shell ── */}
      <div style={{ background: "oklch(0.94 0.006 270)", minHeight: "100vh", padding: "32px 0" }}>

        {/* ── Header ── */}
        <div style={{
          width: 420, margin: "0 auto 24px",
          background: "oklch(0.22 0.18 285)",
          padding: "16px",
          borderRadius: 8,
        }}>
          <p style={{
            fontFamily: F, fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "oklch(1 0 0 / 0.50)", margin: "0 0 2px",
          }}>
            Voyager DS · Agente 2
          </p>
          <p style={{
            fontFamily: F, fontSize: 18, fontWeight: 700,
            color: "oklch(1 0 0)", margin: 0,
          }}>
            Borrador Mobile
          </p>
          <p style={{
            fontFamily: F, fontSize: 11, fontWeight: 400,
            color: "oklch(1 0 0 / 0.50)", margin: "4px 0 0",
          }}>
            420px · 16px padding · 388px contenido útil
          </p>
        </div>

        {/* ── Canvas ── */}
        <div className="mob-canvas">

          {/* Ruler */}
          <div style={{ padding: "16px 16px 8px" }}>
            <div className="mob-ruler" />
          </div>

          {/* ── Secciones de componentes ── */}

          <SectionLabel
            title="1. Quick Filter"
            subtitle="Tipo de oferta + Categorías · 388px útiles"
          />
          <div style={{ padding: "16px", background: "oklch(1 0 0)" }}>
            <QuickFilterMobile />
          </div>

          <SectionLabel
            title="2. Listing Area"
            subtitle="Strip del subastador · 4 cards · grid 2×2 · live + negociable"
          />
          <div style={{ padding: "16px", background: "oklch(0.96 0.004 270)" }}>
            <ListingAreaMobile />
          </div>

          <SectionLabel
            title="3. UI Icons — Participants & View"
            subtitle="fill white · 16 / 20 / 24px · solo variante default"
          />
          <div style={{ background: "oklch(1 0 0)" }}>
            <UIIconsSection />
          </div>

          <SectionLabel
            title="4. Iconografía de Categorías"
            subtitle="fill-rule evenodd — in between fill/stroke · vault gradient"
          />
          <div style={{ background: "oklch(1 0 0)" }}>
            <CategoryIconsSection />
          </div>

          <SectionLabel
            title="4. Badge Status"
            subtitle="6 variantes · EN VIVO y PRÓXIMA con animación pulse · 8 frames Figma"
          />
          <div style={{ background: "oklch(1 0 0)" }}>
            <BadgeStatusSection />
          </div>

          <SectionLabel
            title="Instrucciones para el agente"
            subtitle="Leer antes de construir"
          />
          <div style={{ padding: "16px", background: "oklch(1 0 0)" }}>
            <ul style={{
              fontFamily: F, fontSize: 11, lineHeight: "20px",
              color: "oklch(0.22 0.18 285 / 0.75)", margin: 0,
              paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4,
            }}>
              {[
                "Canvas = 420px · padding-left/right = 16px · contenido útil = 388px",
                "CSS va en template literal CSS = `...` + <style dangerouslySetInnerHTML>",
                "NUNCA HEX — siempre var(--token) u oklch()",
                "NUNCA any · NUNCA ternarios · funciones siempre nominales",
                "Spacing: múltiplos de 8px (micro: 4px, 12px permitidos en gaps internos)",
                "Estados obligatorios: hover · focus · active · disabled",
                "pnpm type-check antes de cerrar cualquier componente",
              ].map(function renderItem(item) {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
