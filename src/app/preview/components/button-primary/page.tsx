"use client";

import { useState } from "react";
import type { JSX } from "react";

const BUTTON_CSS = `
  @property --vbtn-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 135deg;
  }
  @property --vbtn-stop-a {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.72 0.16 55);
  }
  @property --vbtn-stop-b {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.55 0.22 285);
  }

  /* ── MD Primary ── */
  .pvbtn {
    --vbtn-stop-a: var(--vmc-color-orange-600);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 56px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400)  75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px rgb(92.94% 53.73% 21.18% / 0.30);
    transition:
      --vbtn-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pvbtn:hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40);
  }
  .pvbtn:hover::after { opacity: 0.45; filter: blur(18px); }
  .pvbtn:active {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12);
  }
  .pvbtn:active::after { opacity: 0; }
  .pvbtn:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
  }
  .pvbtn:focus-visible::after { opacity: 0.2; }
  .pvbtn:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }
  .pvbtn:disabled::after { display: none; }

  /* Frozen states */
  .pvbtn--hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40) !important;
  }
  .pvbtn--pressed {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12) !important;
  }
  .pvbtn--pressed::after { opacity: 0 !important; }

  /* ── SM variant — 40px, icon slot ── */
  .pvbtn-sm {
    --vbtn-stop-a: var(--vmc-color-orange-600);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 2px rgb(0% 0% 0% / 0.20);
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.25),
      0 2px 6px rgb(92.94% 53.73% 21.18% / 0.25);
    transition:
      --vbtn-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-sm::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.15) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-sm:hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 6px 18px rgb(51.76% 37.65% 89.8% / 0.30),
      0 3px 8px rgb(92.94% 53.73% 21.18% / 0.35);
  }
  .pvbtn-sm:active {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 4px rgb(0% 0% 0% / 0.22), 0 1px 2px rgb(0% 0% 0% / 0.10);
  }
  .pvbtn-sm:focus-visible {
    outline: none;
    transform: scale(0.98);
    box-shadow: 0 0 0 2px var(--vmc-color-base-white), 0 0 0 4px var(--vmc-color-vault-500);
  }

  .pvbtn-sm--hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-1px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 6px 18px rgb(51.76% 37.65% 89.8% / 0.30),
      0 3px 8px rgb(92.94% 53.73% 21.18% / 0.35) !important;
  }
  .pvbtn-sm--pressed {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow: inset 0 2px 4px rgb(0% 0% 0% / 0.22), 0 1px 2px rgb(0% 0% 0% / 0.10) !important;
    color: oklch(1 0 0 / 0.72);
  }
  .pvbtn-sm--pressed .pvbtn-icon {
    opacity: 0.72;
  }




  .pvbtn-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(100% 100% 100% / 0.20);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }

  /* ── Secondary Agenda — 160×40px · icono calendario · psec base ── */
  .psec-agenda {
    --vsec-stop-a: var(--vmc-color-vault-500);
    --vsec-stop-b: var(--vmc-color-vault-700);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 160px;
    height: 40px;
    padding: 4px 12px 4px 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 2px rgb(0% 0% 0% / 0.28);
    background-image:
      linear-gradient(135deg, var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-vault-300) 0%,
        var(--vmc-color-base-white) 35%,
        var(--vmc-color-vault-400) 65%,
        var(--vmc-color-vault-300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.28);
    transition:
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  .psec-agenda::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.14) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .psec-agenda:hover {
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.18),
      0 6px 18px rgb(51.76% 37.65% 89.8% / 0.35);
  }
  .psec-agenda:active {
    --vsec-stop-a: var(--vmc-color-vault-700);
    --vsec-stop-b: var(--vmc-color-vault-800);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 4px rgb(0% 0% 0% / 0.22);
  }
  .psec-agenda:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
  /* Círculo icono — mismo sistema pvbtn-icon */
  .psec-agenda-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(100% 100% 100% / 0.20);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--vmc-color-base-white);
    position: relative;
    z-index: 2;
  }
  .psec-agenda-label {
    position: relative;
    z-index: 2;
    white-space: nowrap;
    line-height: 1.2;
  }

  /* ── MD Negociar — cyan→vault, mismo patrón que Primary ── */
  .pvbtn-neg {
    --vbtn-stop-a: oklch(0.65 0.18 195);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 56px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        oklch(1 0 0)         0%,
        oklch(0.82 0.12 195) 25%,
        oklch(0.52 0.22 285) 75%,
        oklch(1 0 0)         100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px oklch(0.65 0.18 195 / 0.35);
    transition:
      --vbtn-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-neg::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-neg::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, oklch(0.65 0.18 195), var(--vmc-color-vault-500));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pvbtn-neg:hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: oklch(0.76 0.14 195);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px oklch(0.52 0.22 285 / 0.35),
      0 4px 10px oklch(0.65 0.18 195 / 0.40);
  }
  .pvbtn-neg:hover::after { opacity: 0.45; filter: blur(18px); }
  .pvbtn-neg:active {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: oklch(0.55 0.20 195);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12);
  }
  .pvbtn-neg:active::after { opacity: 0; }
  .pvbtn-neg:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px oklch(0.65 0.18 195),
      0 8px 16px -4px oklch(0.65 0.18 195 / 0.30);
  }
  .pvbtn-neg:focus-visible::after { opacity: 0.2; }
  .pvbtn-neg:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }
  .pvbtn-neg:disabled::after { display: none; }

  /* Frozen states */
  .pvbtn-neg--hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: oklch(0.76 0.14 195);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px oklch(0.52 0.22 285 / 0.35),
      0 4px 10px oklch(0.65 0.18 195 / 0.40) !important;
  }
  .pvbtn-neg--pressed {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: oklch(0.55 0.20 195);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12) !important;
  }

  /* ── SM Auth / Logged-in — cinematic dark variant ── */
  .pvbtn-auth {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 500;
    color: var(--vmc-color-base-white);
    /* Fill: vault gradient con profundidad · Ring: naranja dominante → vault claro */
    background-image:
      linear-gradient(135deg, var(--vmc-color-vault-700) 0%, var(--vmc-color-vault-900) 100%),
      linear-gradient(135deg,
        var(--vmc-color-orange-600) 0%,
        var(--vmc-color-orange-400) 45%,
        var(--vmc-color-vault-400) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.15),
      0 0 16px rgb(92.94% 53.73% 21.18% / 0.25);
    transition:
      transform     0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  /* Inset shine — mismo tratamiento que pvbtn */
  .pvbtn-auth::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.12) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  /* Split-chroma glow detrás */
  .pvbtn-auth::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(12px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .pvbtn-auth:hover {
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.18),
      0 0 24px rgb(92.94% 53.73% 21.18% / 0.40),
      0 4px 16px rgb(13.33% 0% 36.08% / 0.50);
  }
  .pvbtn-auth:hover::after { opacity: 0.35; }
  .pvbtn-auth:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.35), 0 1px 2px rgb(0% 0% 0% / 0.15);
  }
  .pvbtn-auth:active::after { opacity: 0; }
  .pvbtn-auth:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--vmc-color-vault-900),
      0 0 0 4px var(--vmc-color-orange-500),
      0 0 12px rgb(92.94% 53.73% 21.18% / 0.30);
  }

  .pvbtn-auth-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(92.94% 53.73% 21.18% / 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-username {
    color: var(--vmc-color-orange-400);
    font-weight: 700;
    text-shadow: 0 0 8px rgb(92.94% 53.73% 21.18% / 0.55);
  }

  /* ── Auth B — Glass: fill casi transparente, ring naranja define forma ── */
  .pvbtn-auth-b {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 500;
    color: var(--vmc-color-base-white);
    background-image:
      linear-gradient(135deg, rgb(13.33% 0% 36.08% / 0.35), rgb(13.33% 0% 36.08% / 0.55)),
      linear-gradient(135deg,
        var(--vmc-color-orange-500) 0%,
        var(--vmc-color-orange-400) 40%,
        var(--vmc-color-vault-400) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: inset 0 1px 0 rgb(100% 100% 100% / 0.10);
    transition: transform 0.2s ease, box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-auth-b::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.08) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-auth-b:hover {
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.14),
      0 0 20px rgb(92.94% 53.73% 21.18% / 0.30);
  }
  .pvbtn-auth-b:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 4px rgb(0% 0% 0% / 0.25);
  }
  .pvbtn-auth-b-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(100% 100% 100% / 0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-b-username {
    color: var(--vmc-color-orange-400);
    font-weight: 700;
  }

  /* ── Auth C — Warm Dark: fill con tinte naranja, ring dorado-cálido ── */
  .pvbtn-auth-c {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 500;
    color: var(--vmc-color-base-white);
    /* Fill: vault oscuro con undertone naranja en top-left */
    background-image:
      linear-gradient(135deg,
        color-mix(in oklch, var(--vmc-color-vault-800) 80%, var(--vmc-color-orange-900)) 0%,
        var(--vmc-color-vault-900) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-orange-400) 0%,
        var(--vmc-color-orange-600) 35%,
        var(--vmc-color-vault-500) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.12),
      inset 0 0 32px rgb(92.94% 53.73% 21.18% / 0.08);
    transition: transform 0.2s ease, box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-auth-c::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.10) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-auth-c::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(12px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .pvbtn-auth-c:hover {
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.16),
      inset 0 0 32px rgb(92.94% 53.73% 21.18% / 0.12),
      0 0 22px rgb(92.94% 53.73% 21.18% / 0.35),
      0 4px 14px rgb(13.33% 0% 36.08% / 0.45);
  }
  .pvbtn-auth-c:hover::after { opacity: 0.30; }
  .pvbtn-auth-c:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.30);
  }
  .pvbtn-auth-c-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: color-mix(in oklch, var(--vmc-color-orange-900) 60%, rgb(100% 100% 100% / 0.05));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-c-username {
    color: var(--vmc-color-orange-300);
    font-weight: 700;
    text-shadow: 0 0 10px rgb(92.94% 53.73% 21.18% / 0.45);
  }

  /* ── Auth D — Primary Clone: mismo fill naranja→vault que "Participa" ── */
  .pvbtn-auth-d {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 2px rgb(0% 0% 0% / 0.22);
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px rgb(92.94% 53.73% 21.18% / 0.30);
    transition:
      --vbtn-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-auth-d::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-auth-d::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(12px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .pvbtn-auth-d:hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40);
  }
  .pvbtn-auth-d:hover::after { opacity: 0.45; filter: blur(18px); }
  .pvbtn-auth-d:active {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12);
  }
  .pvbtn-auth-d:active::after { opacity: 0; }
  .pvbtn-auth-d:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
  }
  .pvbtn-auth-d:focus-visible::after { opacity: 0.2; }
  /* Frozen states */
  .pvbtn-auth-d--hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40) !important;
  }
  .pvbtn-auth-d--hover::after { opacity: 0.45 !important; filter: blur(18px) !important; }
  .pvbtn-auth-d--pressed {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12) !important;
  }
  .pvbtn-auth-d--pressed::after { opacity: 0 !important; }
  .pvbtn-auth-d--focus {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98) !important;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30) !important;
  }
  .pvbtn-auth-d--focus::after { opacity: 0.2 !important; }

  .pvbtn-auth-d-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(0% 0% 0% / 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-d-username {
    font-weight: 700;
    opacity: 0.92;
  }

  /* ── Auth E — Vault→Orange invertido: vault izq, naranja der, username blanco ── */
  .pvbtn-auth-e {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 2px rgb(0% 0% 0% / 0.25);
    background-image:
      linear-gradient(135deg,
        var(--vmc-color-vault-600) 0%,
        var(--vmc-color-vault-500) 45%,
        var(--vmc-color-orange-500) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-vault-400) 0%,
        var(--vmc-color-base-white) 40%,
        var(--vmc-color-orange-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.35);
    transition:
      transform     0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-auth-e::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.15) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-auth-e::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-vault-500), var(--vmc-color-orange-500));
    filter: blur(12px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .pvbtn-auth-e:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 22px rgb(51.76% 37.65% 89.8% / 0.40),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.35);
  }
  .pvbtn-auth-e:hover::after { opacity: 0.38; }
  .pvbtn-auth-e:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.25), 0 1px 2px rgb(0% 0% 0% / 0.10);
  }
  .pvbtn-auth-e-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(100% 100% 100% / 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-e-username {
    font-weight: 700;
    color: var(--vmc-color-orange-200);
  }

  /* ── Auth F — Split: mitad izq vault-oscuro, mitad der naranja quemado ── */
  .pvbtn-auth-f {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px 0 4px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.30);
    background-image:
      linear-gradient(100deg,
        var(--vmc-color-vault-800) 0%,
        var(--vmc-color-vault-700) 38%,
        var(--vmc-color-orange-600) 62%,
        var(--vmc-color-orange-500) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-vault-500) 0%,
        var(--vmc-color-orange-400) 50%,
        var(--vmc-color-orange-300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 2px 8px rgb(92.94% 53.73% 21.18% / 0.35),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.20);
    transition:
      transform     0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .pvbtn-auth-f::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.14) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  .pvbtn-auth-f::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(100deg, var(--vmc-color-vault-600), var(--vmc-color-orange-500));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .pvbtn-auth-f:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.18),
      0 8px 22px rgb(92.94% 53.73% 21.18% / 0.45),
      0 4px 12px rgb(51.76% 37.65% 89.8% / 0.30);
  }
  .pvbtn-auth-f:hover::after { opacity: 0.45; filter: blur(18px); }
  .pvbtn-auth-f:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.28), 0 1px 2px rgb(0% 0% 0% / 0.12);
  }
  .pvbtn-auth-f-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgb(0% 0% 0% / 0.20);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .pvbtn-auth-f-username {
    font-weight: 700;
    color: var(--vmc-color-orange-200);
    text-shadow: 0 0 8px rgb(92.94% 53.73% 21.18% / 0.50);
  }

  /* ── MD Secondary — vault-dominant, mismo sistema cinematic ── */
  @property --vsec-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 160deg;
  }
  @property --vsec-stop-a {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.38 0.20 285);
  }
  @property --vsec-stop-b {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.28 0.18 285);
  }

  .psec {
    --vsec-stop-a: var(--vmc-color-vault-500);
    --vsec-stop-b: var(--vmc-color-vault-700);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 56px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.30);
    background-image:
      linear-gradient(var(--vsec-angle), var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-vault-300) 0%,
        var(--vmc-color-base-white) 35%,
        var(--vmc-color-vault-400) 65%,
        var(--vmc-color-vault-300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.30);
    transition:
      --vsec-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vsec-stop-a 0.35s ease,
      --vsec-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  .psec::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.16) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .psec::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-vault-400), var(--vmc-color-vault-600));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .psec:hover {
    --vsec-angle:  220deg;
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.40),
      0 4px 10px rgb(51.76% 37.65% 89.8% / 0.25);
  }
  .psec:hover::after { opacity: 0.45; filter: blur(18px); }
  .psec:active {
    --vsec-angle:  160deg;
    --vsec-stop-a: var(--vmc-color-vault-700);
    --vsec-stop-b: var(--vmc-color-vault-900);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.28),
      0 1px 3px rgb(0% 0% 0% / 0.14);
  }
  .psec:active::after { opacity: 0; }
  .psec:focus-visible {
    outline: none;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-400),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.35);
  }
  .psec:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }
  .psec:disabled::after { display: none; }

  .psec--hover {
    --vsec-angle:  220deg;
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.40),
      0 4px 10px rgb(51.76% 37.65% 89.8% / 0.25) !important;
  }
  .psec--pressed {
    --vsec-angle:  160deg;
    --vsec-stop-a: var(--vmc-color-vault-700);
    --vsec-stop-b: var(--vmc-color-vault-900);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.28),
      0 1px 3px rgb(0% 0% 0% / 0.14) !important;
  }
  .psec--pressed::after { opacity: 0 !important; }

  /* ── MD Ghost — sobre fondo naranja/live ── */
  .pghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 28px;
    border-radius: var(--vmc-radius-full);
    border: 2px solid rgb(100% 100% 100% / 0.75);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    background: transparent;
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.18);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 0 0 1px rgb(100% 100% 100% / 0.15);
    transition:
      background    0.25s ease,
      border-color  0.25s ease,
      color         0.25s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
    transform: translateZ(0);
  }
  /* Inset shine */
  .pghost::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.10) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  /* White glow */
  .pghost::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: rgb(100% 100% 100% / 0.60);
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pghost:hover {
    background: linear-gradient(135deg, rgb(100% 100% 100% / 1) 0%, oklch(0.97 0.03 55) 100%);
    border-color: rgb(100% 100% 100% / 1);
    color: var(--vmc-color-orange-600);
    text-shadow: none;
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.50),
      0 6px 20px rgb(0% 0% 0% / 0.20);
  }
  .pghost:hover::after { opacity: 0.40; filter: blur(18px); }
  .pghost:active {
    background: linear-gradient(135deg, var(--vmc-color-orange-700) 0%, oklch(0.52 0.18 45) 100%);
    border-color: var(--vmc-color-orange-700);
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22);
  }
  .pghost:active::after { opacity: 0; }
  .pghost:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--vmc-color-orange-600),
      0 0 0 4px rgb(100% 100% 100% / 0.80);
  }
  .pghost:disabled {
    background: transparent;
    border-color: rgb(100% 100% 100% / 0.30);
    color: rgb(100% 100% 100% / 0.35);
    text-shadow: none;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .pghost:disabled::after { display: none; }

  .pghost--hover {
    background: linear-gradient(135deg, rgb(100% 100% 100% / 1) 0%, oklch(0.97 0.03 55) 100%) !important;
    border-color: rgb(100% 100% 100% / 1) !important;
    color: var(--vmc-color-orange-600) !important;
    text-shadow: none !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.50),
      0 6px 20px rgb(0% 0% 0% / 0.20) !important;
  }
  .pghost--pressed {
    background: linear-gradient(135deg, var(--vmc-color-orange-700) 0%, oklch(0.52 0.18 45) 100%) !important;
    border-color: var(--vmc-color-orange-700) !important;
    color: var(--vmc-color-base-white) !important;
    transform: scale(0.97) translateY(1px) !important;
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22) !important;
  }

  /* ══════════════════════════════════════════════════
     .pbtn — UNIFIED BUTTON SYSTEM
     Primary · Secondary · Ghost × SM / MD / LG
  ══════════════════════════════════════════════════ */

  /* ── Base ── */
  .pbtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--vmc-radius-full);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    line-height: 1;
    white-space: nowrap;
    transform: translateZ(0);
    transition:
      transform    0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow   0.25s ease;
  }

  /* ── Sizes ── */
  .pbtn--sm {
    height: 36px;
    font-size: 13px;
    font-weight: 500;
    padding: 0 14px;
    min-width: 64px;
  }
  .pbtn--md {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 20px;
    min-width: 80px;
  }
  .pbtn--lg {
    height: 56px;
    font-size: 18px;
    font-weight: 500;
    padding: 0 24px;
    min-width: 96px;
  }

  /* ── With icon — padding + gap override ── */
  .pbtn--has-icon.pbtn--sm { padding: 0 12px; gap: 6px; }
  .pbtn--has-icon.pbtn--md { padding: 0 16px; gap: 8px; }
  .pbtn--has-icon.pbtn--lg { padding: 0 20px; gap: 10px; }

  /* ── Icon frame wrapper ── */
  .pbtn--sm .pbtn-icon { width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pbtn--md .pbtn-icon { width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pbtn--lg .pbtn-icon { width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* ── Icon only ── */
  .pbtn--icon-only.pbtn--sm { width: 36px; padding: 0; min-width: unset; }
  .pbtn--icon-only.pbtn--md { width: 48px; padding: 0; min-width: unset; }
  .pbtn--icon-only.pbtn--lg { width: 56px; padding: 0; min-width: unset; }

  /* ── Full width ── */
  .pbtn--full { width: 100%; }

  /* ══ PRIMARY variant ══ */
  .pbtn--primary {
    --vbtn-stop-a: var(--vmc-color-orange-600);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    border: 2.5px solid transparent;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400)  75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px rgb(92.94% 53.73% 21.18% / 0.30);
    transition:
      --vbtn-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
  }
  .pbtn--primary::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pbtn--primary::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pbtn--primary:hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40);
  }
  .pbtn--primary:hover::after { opacity: 0.45; filter: blur(18px); }
  .pbtn--primary:active {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12);
  }
  .pbtn--primary:active::after { opacity: 0; }
  .pbtn--primary:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
  }
  .pbtn--primary:focus-visible::after { opacity: 0.2; }
  .pbtn--primary:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }
  .pbtn--primary:disabled::after { display: none; }

  /* Primary frozen states */
  .pbtn--primary.pbtn--hover {
    --vbtn-angle:  220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40) !important;
  }
  .pbtn--primary.pbtn--pressed {
    --vbtn-angle:  135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12) !important;
  }
  .pbtn--primary.pbtn--pressed::after { opacity: 0 !important; }
  .pbtn--primary.pbtn--focus {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98) !important;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30) !important;
  }
  .pbtn--primary.pbtn--disabled {
    background-image: none !important;
    background-color: var(--vmc-color-background-disabled) !important;
    color: var(--vmc-color-neutral-700) !important;
    text-shadow: none !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    transform: none !important;
    border-color: transparent !important;
  }

  /* ══ SECONDARY variant ══ */
  .pbtn--secondary {
    --vsec-stop-a: var(--vmc-color-vault-500);
    --vsec-stop-b: var(--vmc-color-vault-700);
    border: 2.5px solid transparent;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.30);
    background-image:
      linear-gradient(var(--vsec-angle), var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-vault-300) 0%,
        var(--vmc-color-base-white) 35%,
        var(--vmc-color-vault-400) 65%,
        var(--vmc-color-vault-300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.30);
    transition:
      --vsec-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --vsec-stop-a 0.35s ease,
      --vsec-stop-b 0.35s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
  }
  .pbtn--secondary::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.16) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pbtn--secondary::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-vault-400), var(--vmc-color-vault-600));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pbtn--secondary:hover {
    --vsec-angle:  220deg;
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.40),
      0 4px 10px rgb(51.76% 37.65% 89.8% / 0.25);
  }
  .pbtn--secondary:hover::after { opacity: 0.45; filter: blur(18px); }
  .pbtn--secondary:active {
    --vsec-angle:  160deg;
    --vsec-stop-a: var(--vmc-color-vault-700);
    --vsec-stop-b: var(--vmc-color-vault-900);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.28),
      0 1px 3px rgb(0% 0% 0% / 0.14);
  }
  .pbtn--secondary:active::after { opacity: 0; }
  .pbtn--secondary:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-400),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.35);
  }
  .pbtn--secondary:focus-visible::after { opacity: 0.2; }
  .pbtn--secondary:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }
  .pbtn--secondary:disabled::after { display: none; }

  /* Secondary frozen states */
  .pbtn--secondary.pbtn--hover {
    --vsec-angle:  220deg;
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.40),
      0 4px 10px rgb(51.76% 37.65% 89.8% / 0.25) !important;
  }
  .pbtn--secondary.pbtn--pressed {
    --vsec-angle:  160deg;
    --vsec-stop-a: var(--vmc-color-vault-700);
    --vsec-stop-b: var(--vmc-color-vault-900);
    transform: scale(0.97) translateY(1px) !important;
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.28),
      0 1px 3px rgb(0% 0% 0% / 0.14) !important;
  }
  .pbtn--secondary.pbtn--pressed::after { opacity: 0 !important; }
  .pbtn--secondary.pbtn--focus {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98) !important;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-400),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.35) !important;
  }
  .pbtn--secondary.pbtn--disabled {
    background-image: none !important;
    background-color: var(--vmc-color-background-disabled) !important;
    color: var(--vmc-color-neutral-700) !important;
    text-shadow: none !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    transform: none !important;
    border-color: transparent !important;
  }

  /* ══ GHOST variant ══ */
  .pbtn--ghost {
    border: 2px solid rgb(100% 100% 100% / 0.75);
    color: var(--vmc-color-base-white);
    background: transparent;
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.18);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 0 0 1px rgb(100% 100% 100% / 0.15);
    transition:
      background    0.25s ease,
      border-color  0.25s ease,
      color         0.25s ease,
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease;
  }
  .pbtn--ghost::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.10) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .pbtn--ghost::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: rgb(100% 100% 100% / 0.60);
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .pbtn--ghost:hover {
    background: linear-gradient(135deg, rgb(100% 100% 100% / 1) 0%, oklch(0.97 0.03 55) 100%);
    border-color: rgb(100% 100% 100% / 1);
    color: var(--vmc-color-orange-600);
    text-shadow: none;
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.50),
      0 6px 20px rgb(0% 0% 0% / 0.20);
  }
  .pbtn--ghost:hover::after { opacity: 0.40; filter: blur(18px); }
  .pbtn--ghost:active {
    background: linear-gradient(135deg, var(--vmc-color-orange-700) 0%, oklch(0.52 0.18 45) 100%);
    border-color: var(--vmc-color-orange-700);
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22);
  }
  .pbtn--ghost:active::after { opacity: 0; }
  .pbtn--ghost:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--vmc-color-orange-600),
      0 0 0 4px rgb(100% 100% 100% / 0.80);
  }
  .pbtn--ghost:disabled {
    background: transparent;
    border-color: rgb(100% 100% 100% / 0.30);
    color: rgb(100% 100% 100% / 0.35);
    text-shadow: none;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .pbtn--ghost:disabled::after { display: none; }

  /* Ghost frozen states */
  .pbtn--ghost.pbtn--hover {
    background: linear-gradient(135deg, rgb(100% 100% 100% / 1) 0%, oklch(0.97 0.03 55) 100%) !important;
    border-color: rgb(100% 100% 100% / 1) !important;
    color: var(--vmc-color-orange-600) !important;
    text-shadow: none !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.50),
      0 6px 20px rgb(0% 0% 0% / 0.20) !important;
  }
  .pbtn--ghost.pbtn--pressed {
    background: linear-gradient(135deg, var(--vmc-color-orange-700) 0%, oklch(0.52 0.18 45) 100%) !important;
    border-color: var(--vmc-color-orange-700) !important;
    color: var(--vmc-color-base-white) !important;
    transform: scale(0.97) translateY(1px) !important;
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22) !important;
  }
  .pbtn--ghost.pbtn--focus {
    outline: none !important;
    box-shadow:
      0 0 0 2px var(--vmc-color-orange-600),
      0 0 0 4px rgb(100% 100% 100% / 0.80) !important;
  }
  .pbtn--ghost.pbtn--disabled {
    background: transparent !important;
    border-color: rgb(100% 100% 100% / 0.30) !important;
    color: rgb(100% 100% 100% / 0.35) !important;
    text-shadow: none !important;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
  }

  /* ══ LOADING state ══ */
  @keyframes pbtn-spin { to { transform: rotate(360deg); } }
  .pbtn--loading { cursor: wait; }
  .pbtn--loading > * { opacity: 0; }
  .pbtn--loading::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 16px;
    height: 16px;
    border: 2px solid rgb(100% 100% 100% / 0.30);
    border-top-color: rgb(100% 100% 100% / 0.90);
    border-radius: 50%;
    animation: pbtn-spin 0.7s linear infinite;
    z-index: 3;
  }

  /* ── LikeButton · Cinematic upgrade ── */
  .plike {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* Gradient ring: white fill + vault shimmer border */
    background-image:
      linear-gradient(180deg, rgb(100% 100% 100%) 0%, rgb(100% 100% 100%) 100%),
      linear-gradient(135deg,
        var(--vmc-color-vault-200, oklch(0.87 0.09 285)) 0%,
        rgb(100% 100% 100%) 40%,
        var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 75%,
        var(--vmc-color-vault-200, oklch(0.87 0.09 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 2px 8px rgb(51.76% 37.65% 89.8% / 0.14);
    transition:
      transform     0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow    0.25s ease,
      background-image 0.25s ease;
    transform: translateZ(0);
  }
  /* Inset shine */
  .plike::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.55) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  /* Vault glow */
  .plike::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--vmc-color-vault-400) 0%, transparent 70%);
    filter: blur(10px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .plike:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow:
      0 10px 18px oklch(0.22 0.18 285 / 0.22),
      0  3px  6px oklch(0.22 0.18 285 / 0.12);
  }
  .plike:active { transform: scale(0.92); }
  /* Frozen hover state */
  .plike--hover {
    transform: scale(1.08) translateY(-2px) !important;
    box-shadow:
      0 10px 18px oklch(0.22 0.18 285 / 0.22),
      0  3px  6px oklch(0.22 0.18 285 / 0.12) !important;
  }

  /* Sizes */
  .plike--sm { width: 32px; height: 32px; }
  .plike--md { width: 44px; height: 44px; }
  .plike--lg { width: 60px; height: 60px; }

  /* Active/liked — vault gradient fill + orange→vault ring */
  .plike--active {
    background-image:
      linear-gradient(135deg,
        var(--vmc-color-vault-500, oklch(0.45 0.20 285)) 0%,
        var(--vmc-color-vault-700, oklch(0.30 0.20 285)) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-orange-400) 0%,
        rgb(100% 100% 100%) 40%,
        var(--vmc-color-vault-400, oklch(0.55 0.20 285)) 75%,
        var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 3px 14px rgb(51.76% 37.65% 89.8% / 0.35),
      inset 0 1px 0 rgb(100% 100% 100% / 0.22);
  }
  .plike--active::before {
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.18) 0%, transparent 50%);
  }
  .plike--active::after { opacity: 0.35; }
  .plike--active:hover::after { opacity: 0.60; }

  /* Heart pop — played when active class applied */
  @keyframes plike-heart-pop {
    0%   { transform: scale(1); }
    35%  { transform: scale(1.40); }
    65%  { transform: scale(0.85); }
    85%  { transform: scale(1.10); }
    100% { transform: scale(1); }
  }
  .plike--active svg {
    animation: plike-heart-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Disabled */
  .plike--disabled {
    cursor: not-allowed;
    box-shadow: none;
    background: oklch(0.88 0.004 220);
    opacity: 0.70;
    pointer-events: none;
  }
  .plike--disabled::after { display: none; }
  .plike--disabled svg { stroke: oklch(0.72 0.02 220); }

  /* Skeleton */
  .plike--skeleton {
    background-image: none;
    background-color: var(--vmc-color-background-disabled, oklch(0.88 0.01 220));
    border-color: transparent;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    animation: plike-pulse 1.6s ease-in-out infinite;
  }
  .plike--skeleton::before { display: none; }
  .plike--skeleton::after  { display: none; }

  @keyframes plike-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.40; }
  }

  /* ── PriceIcon · Cinematic upgrade ── */
  .pprice-wrap {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .pprice {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* VYgradientdef-negotiable fill + shimmer ring */
    background-image:
      var(--vmc-gradient-negotiable),
      linear-gradient(135deg,
        oklch(0.88 0.08 195) 0%,
        rgb(100% 100% 100%) 40%,
        oklch(0.72 0.14 195) 75%,
        oklch(0.88 0.08 195) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 2px 8px var(--vmc-color-cyan-600, oklch(0.78 0.14 195) / 0.25);
    transition:
      transform   0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow  0.25s ease;
    transform: translateZ(0);
  }
  /* Inset shine */
  .pprice::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.45) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  /* Teal glow */
  .pprice::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--vmc-color-negotiable, oklch(0.78 0.14 195)) 0%, transparent 70%);
    filter: blur(10px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  /* Sizes */
  .pprice--sm { width: 32px; height: 32px; }
  .pprice--md { width: 44px; height: 44px; }
  .pprice--lg { width: 60px; height: 60px; }

  /* ── Shimmer Lavanda — teal→lavanda→vault · Figma 1287-4615 ── */
  .pprice--shimmer {
    /* Gradiente shimmer lavanda aprobado (G-A3) — NO modificar */
    background-image:
      linear-gradient(145deg,
        oklch(0.65 0.16 195)  0%,
        oklch(0.72 0.10 265) 40%,
        oklch(0.42 0.22 285) 75%,
        oklch(0.30 0.20 285) 100%
      ),
      linear-gradient(145deg,
        oklch(0.80 0.12 195)  0%,
        oklch(0.95 0.04 270 / 0.50) 32%,
        oklch(0.60 0.14 265) 55%,
        oklch(0.36 0.20 285) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    /* Drop shadow sutil + glow vault */
    box-shadow:
      0 2px 4px oklch(0 0 0 / 0.04),
      0 1px 8px oklch(0.38 0.20 270 / 0.22),
      inset 0 1px 0 oklch(1 0 0 / 0.52),
      inset 0 -1px 0 oklch(0 0 0 / 0.10);
  }
  /* Glass overlay — igual que Figma (from-white/45 → transparent en 50%) */
  .pprice--shimmer::before {
    background: linear-gradient(180deg, oklch(1 0 0 / 0.45) 0%, transparent 50%);
  }
  /* Glow vault para hover */
  .pprice--shimmer::after {
    background: radial-gradient(circle, oklch(0.52 0.20 270) 0%, transparent 70%);
  }
  .pprice--shimmer:hover {
    box-shadow:
      0 3px 8px oklch(0 0 0 / 0.07),
      0 2px 12px oklch(0.38 0.20 270 / 0.32),
      inset 0 1px 0 oklch(1 0 0 / 0.48),
      inset 0 -1px 0 oklch(0 0 0 / 0.12);
    transform: translateY(-1px) scale(1.06);
  }
  .pprice--shimmer:hover::after { opacity: 0.55; }

  /* Pedestal shimmer — reflejo del coin en lavanda/vault */
  .pprice-base--shimmer {
    background-image:
      linear-gradient(160deg,
        oklch(0.50 0.18 260) 0%,
        oklch(0.36 0.20 280) 100%
      ),
      linear-gradient(160deg,
        oklch(0.68 0.12 250) 0%,
        oklch(0.42 0.18 280) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      0 3px 10px oklch(0.30 0.18 280 / 0.35),
      0 1px  4px oklch(0.30 0.18 280 / 0.20);
  }

  /* ── Diamond base — map-pin shape · coin z:2, diamond z:1 ── */
  .pprice { position: relative; z-index: 2; }

  .pprice-diamond {
    transform: rotate(45deg);
    background-image:
      linear-gradient(145deg,
        oklch(0.58 0.16 220) 0%,
        oklch(0.48 0.20 260) 45%,
        oklch(0.34 0.22 280) 100%
      );
    border: 1.5px solid oklch(0.65 0.12 235 / 0.45);
    box-shadow:
      0 4px 12px oklch(0.30 0.18 270 / 0.40),
      inset 0 1px 0 oklch(1 0 0 / 0.25);
    border-radius: 4px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }
  .pprice-wrap--sm .pprice-diamond { width: 16px; height: 16px; margin-top: -10px; border-radius: 3px; }
  .pprice-wrap--md .pprice-diamond { width: 22px; height: 22px; margin-top: -14px; border-radius: 4px; }
  .pprice-wrap--lg .pprice-diamond { width: 30px; height: 30px; margin-top: -19px; border-radius: 5px; }

  /* Disabled */
  .pprice-wrap--disabled .pprice {
    background-image:
      linear-gradient(135deg, oklch(0.82 0.02 220) 0%, oklch(0.76 0.02 220) 100%),
      linear-gradient(135deg, oklch(0.88 0.01 220) 0%, oklch(0.88 0.01 220) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    opacity: 0.55;
  }
  .pprice-wrap--disabled .pprice::before { display: none; }
  .pprice-wrap--disabled .pprice::after  { display: none; }

  /* Skeleton */
  .pprice-wrap--skeleton .pprice {
    background-image: none;
    background-color: var(--vmc-color-background-disabled, oklch(0.88 0.01 220));
    border-color: transparent;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    animation: plike-pulse 1.6s ease-in-out infinite;
  }
  .pprice-wrap--skeleton .pprice::before { display: none; }
  .pprice-wrap--skeleton .pprice::after  { display: none; }
  .pprice-wrap--skeleton .pprice-base    { background: oklch(0.82 0.02 220); box-shadow: none; }

  /* ── PriceIcon base — ellipse pedestal, same cinematic material as coin ── */
  .pprice-base {
    border-radius: 50%;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(160deg, oklch(0.58 0.15 195) 0%, oklch(0.44 0.13 195) 100%),
      linear-gradient(90deg,
        oklch(0.80 0.12 195 / 0.75) 0%,
        oklch(1 0 0 / 0.55)         40%,
        oklch(0.72 0.14 195 / 0.45) 75%,
        oklch(0.80 0.12 195 / 0.75) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      0 3px 10px oklch(0.78 0.14 195 / 0.30),
      0 1px  4px oklch(0.78 0.14 195 / 0.18);
    margin-top: -3px;
    flex-shrink: 0;
    position: relative;
  }
  /* Top-face shine — matches coin ::before */
  .pprice-base::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.32) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Wider than coin → pedestal effect */
  .pprice-wrap--sm .pprice-base { width: 40px;  height: 9px;  }
  .pprice-wrap--md .pprice-base { width: 54px;  height: 12px; }
  .pprice-wrap--lg .pprice-base { width: 74px;  height: 17px; }

  .pprice-wrap--disabled .pprice-base {
    background-image:
      linear-gradient(160deg, oklch(0.72 0.02 220) 0%, oklch(0.65 0.02 220) 100%),
      linear-gradient(90deg, oklch(0.78 0.01 220 / 0.60) 0%, oklch(0.78 0.01 220 / 0.60) 100%);
    box-shadow: none;
  }

  /* ── OfferType · cinematic card ── */
  .poftype {
    width: 110px;
    border-radius: var(--vmc-radius-md, 8px);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    box-shadow:
      0 4px 16px oklch(0 0 0 / 0.12),
      0 1px 4px  oklch(0 0 0 / 0.06);
    transition:
      transform  0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.25s ease;
    transform: translateZ(0);
    outline: none;
  }

  /* Top colored section */
  .poftype-top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: background 0.22s ease;
  }
  /* Inset shine — muy sutil, colores vivos no aguantan brillo fuerte */
  .poftype-top::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      oklch(1 0 0 / 0.07) 0%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 1;
  }
  /* Bottom edge separator */
  .poftype-top::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 0.08) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .poftype-label {
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

  /* Bottom white section */
  .poftype-bottom {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: oklch(1 0 0);
  }
  .poftype-cta {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    transition: color 0.22s ease;
  }

  /* ── Variant: NEGOCIABLE ── */
  .poftype--negotiable {
    box-shadow:
      0 0 0 1.5px oklch(0.78 0.14 195 / 0.40),
      0 4px 14px oklch(0 0 0 / 0.10),
      0 1px 4px  oklch(0 0 0 / 0.06);
  }
  .poftype--negotiable .poftype-top {
    background: linear-gradient(180deg,
      oklch(0.84 0.13 195) 0%,
      var(--vmc-color-negotiable, oklch(0.78 0.14 195)) 100%
    );
  }
  .poftype--negotiable .poftype-bottom {
    background: color-mix(in oklch,
      oklch(1 0 0) 95%,
      var(--vmc-color-negotiable, oklch(0.78 0.14 195))
    );
  }
  .poftype--negotiable .poftype-cta {
    color: oklch(0.58 0.17 195);
  }

  /* Hover */
  .poftype--negotiable:hover,
  .poftype--negotiable.poftype--hover {
    box-shadow:
      0 0 0 1.5px oklch(0.78 0.14 195 / 0.55),
      0 10px 18px oklch(0.22 0.18 285 / 0.11),
      0  3px  7px oklch(0.22 0.18 285 / 0.08),
      0  1px  2px oklch(0.22 0.18 285 / 0.05);
  }
  /* Focus / pressed */
  .poftype--negotiable.poftype--focus .poftype-top {
    background: linear-gradient(180deg,
      oklch(0.65 0.17 195) 0%,
      oklch(0.55 0.16 195) 100%
    );
  }

  /* ── Variant: EN VIVO ── */
  .poftype--live {
    box-shadow:
      0 0 0 1.5px oklch(0.72 0.16 55 / 0.40),
      0 4px 14px oklch(0 0 0 / 0.10),
      0 1px 4px  oklch(0 0 0 / 0.06);
  }
  .poftype--live .poftype-top {
    background: linear-gradient(180deg,
      oklch(0.78 0.17 55) 0%,
      var(--vmc-color-live, oklch(0.72 0.16 55)) 100%
    );
  }
  .poftype--live .poftype-bottom {
    background: color-mix(in oklch,
      oklch(1 0 0) 95%,
      var(--vmc-color-live, oklch(0.72 0.16 55))
    );
  }
  .poftype--live .poftype-cta {
    color: oklch(0.54 0.18 45);
  }

  /* Hover */
  .poftype--live:hover,
  .poftype--live.poftype--hover {
    box-shadow:
      0 0 0 1.5px oklch(0.72 0.16 55 / 0.55),
      0 10px 18px oklch(0.22 0.18 285 / 0.11),
      0  3px  7px oklch(0.22 0.18 285 / 0.08),
      0  1px  2px oklch(0.22 0.18 285 / 0.05);
  }
  /* Focus / pressed */
  .poftype--live.poftype--focus .poftype-top {
    background: linear-gradient(180deg,
      oklch(0.58 0.19 48) 0%,
      oklch(0.50 0.17 44) 100%
    );
  }

  /* ── Shared hover — lift + micro-scale, sensación premium ── */
  .poftype:hover,
  .poftype--hover {
    transform: translateY(-4px) scale(1.015);
  }

  /* Shine amplificado en hover (ambas variantes) */
  .poftype:hover .poftype-top::before,
  .poftype--hover .poftype-top::before {
    background: linear-gradient(180deg, oklch(1 0 0 / 0.26) 0%, transparent 50%);
  }

  /* ── Focus / pressed — opacity total igual que pcatcard ── */
  .poftype--focus {
    transform: scale(0.97) !important;
    opacity: 0.58;
    box-shadow:
      0 2px 8px oklch(0 0 0 / 0.10),
      inset 0 2px 6px oklch(0 0 0 / 0.12) !important;
  }

  /* ── QuickFilter ── */
  .pqf {
    width: 100%;
    height: 180px;
    background: oklch(1 0 0);
    border-radius: var(--vmc-radius-md, 8px);
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
    box-shadow: 0 2px 10px oklch(0.22 0.18 285 / 0.06);
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }
  .pqf-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    padding: 0 24px;
  }
  .pqf-section--offer {
    flex: 0 0 auto;
    border-right: 1px solid oklch(0.22 0.18 285 / 0.07);
  }
  .pqf-section--cats {
    flex: 1;
  }
  .pqf-heading {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    position: relative;
    padding: 4px 4px;
  }

  /* brackets injected as SVG children — see BktTL / BktBR components */

  /* standalone demo wrapper */
  .pqf-hd-demo {
    display: flex;
    gap: 40px;
    align-items: center;
    padding: 20px 24px;
    background: oklch(1 0 0);
    border-radius: 8px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
    box-shadow: 0 2px 10px oklch(0.22 0.18 285 / 0.06);
  }
  .pqf-hd-demo-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }
  .pqf-hd-demo-tag {
    font-family: var(--vmc-font-display);
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.10em; text-transform: uppercase;
    color: oklch(0.72 0.16 55);
    margin: 0;
  }
  .pqf-heading-text {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: oklch(0.22 0.18 285 / 0.70);
  }
  .pqf-items {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }


  /* ── CategoryCard · cinematic upgrade ── */
  .pcatcard {
    width: 93px;
    height: 92px;
    border-radius: var(--vmc-radius-md, 8px);
    border: 1.5px solid transparent;
    /* Gradient ring — mismo patrón pvbtn/plike/pprice */
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
    padding: 0 8px;
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
    outline: none;
  }
  /* Inset shine */
  .pcatcard::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(160deg, oklch(1 0 0 / 0.55) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  /* Vault glow */
  .pcatcard::after {
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
  /* Icon wrap — sin background, icono directo sobre la card */
  .pcatcard-icon-wrap {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--vmc-color-vault, oklch(0.22 0.18 285));
    position: relative;
    z-index: 2;
  }
  .pcatcard-label {
    font-family: var(--vmc-font-display);
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--vmc-color-vault, oklch(0.22 0.18 285));
    text-align: center;
    line-height: 1.35;
    position: relative;
    z-index: 2;
  }
  /*
    HOVER v1 — ARCHIVADO (restaurar si se desea volver)
    .pcatcard:hover { transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 20px vault/0.16, 0 2px 6px vault/0.08; }
    .pcatcard:hover::after { opacity: 1; }  ← radial blob glow vault
    plike:hover { transform: scale(1.10) translateY(-1px);
      box-shadow: 0 5px 18px vault-rgb/0.26; }
    .plike:hover::after { opacity: 0.55; }  ← radial blob glow vault
  */

  /* Hover v2 — lift + ring intensificado + glow suave */
  .pcatcard:hover,
  .pcatcard--hover {
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
  .pcatcard:hover::after,
  .pcatcard--hover::after {
    opacity: 0.30;
  }
  /* icon-wrap sin cambio en hover — sin background que cambiar */
  /* Focus / pressed */
  .pcatcard--focus {
    transform: scale(0.96) !important;
    opacity: 0.58;
    background-image:
      linear-gradient(160deg, oklch(0.94 0.012 285) 0%, oklch(0.90 0.018 285) 100%),
      linear-gradient(135deg,
        oklch(0.72 0.14 285) 0%,
        oklch(1 0 0 / 0.65) 38%,
        oklch(0.58 0.18 285) 70%,
        oklch(0.72 0.14 285) 100%
      ) !important;
    box-shadow:
      0 1px 5px oklch(0.22 0.18 285 / 0.12),
      inset 0 1px 3px oklch(0.22 0.18 285 / 0.08) !important;
  }

  /* ── PriceTag · cinematic vault pill ── */
  .ptag {
    display: inline-flex;
    align-items: center;
    border-radius: var(--vmc-radius-full, 9999px);
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(135deg,
        oklch(0.48 0.24 285) 0%,
        oklch(0.48 0.24 285) 30%,
        oklch(0.20 0.17 285) 100%
      ),
      linear-gradient(135deg,
        oklch(0.65 0.20 285) 0%,
        oklch(1 0 0 / 0.40) 38%,
        oklch(0.45 0.22 285) 68%,
        oklch(0.65 0.20 285) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 3px 16px oklch(0.22 0.18 285 / 0.55),
      inset 0 1px 0 oklch(1 0 0 / 0.10);
    position: relative;
    overflow: visible;
  }
  /* Inset shine */
  .ptag::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.07) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Sizes */
  .ptag--sm { height: 26px; padding: 0 10px 0 3px; gap: 5px; }
  .ptag--md { height: 32px; padding: 0 14px 0 4px; gap: 7px; }
  .ptag--lg { height: 40px; padding: 0 18px 0 5px; gap: 9px; }

  /* Teal $ icon inside tag */
  .ptag-icon {
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(135deg,
        var(--vmc-color-negotiable, oklch(0.78 0.14 195)) 0%,
        oklch(0.65 0.16 195) 100%
      ),
      linear-gradient(135deg,
        oklch(0.88 0.08 195) 0%,
        oklch(1 0 0) 40%,
        oklch(0.72 0.14 195) 75%,
        oklch(0.88 0.08 195) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 1px 8px oklch(0.78 0.14 195 / 0.45),
      inset 0 1px 0 oklch(1 0 0 / 0.30);
    position: relative;
    overflow: hidden;
  }
  /* Icon inset shine */
  .ptag-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.40) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .ptag--sm .ptag-icon { width: 20px; height: 20px; }
  .ptag--md .ptag-icon { width: 24px; height: 24px; }
  .ptag--lg .ptag-icon { width: 30px; height: 30px; }

  /* Price text group */
  .ptag-text {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
    position: relative;
    z-index: 1;
  }
  .ptag-currency {
    font-family: var(--vmc-font-display);
    font-weight: 700;
    color: oklch(0.86 0.10 195);
    line-height: 1;
  }
  .ptag-amount {
    font-family: var(--vmc-font-display);
    font-weight: 800;
    color: oklch(1 0 0);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .ptag--sm .ptag-currency,
  .ptag--sm .ptag-amount { font-size: 11px; }
  .ptag--md .ptag-currency,
  .ptag--md .ptag-amount { font-size: 13px; }
  .ptag--lg .ptag-currency,
  .ptag--lg .ptag-amount { font-size: 16px; }

  /* Disabled */
  .ptag--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
    background-image:
      linear-gradient(135deg, oklch(0.52 0.03 220) 0%, oklch(0.44 0.02 220) 100%),
      linear-gradient(135deg, oklch(0.60 0.02 220) 0%, oklch(0.60 0.02 220) 100%);
    box-shadow: none;
  }
  .ptag--disabled .ptag-icon {
    background-image:
      linear-gradient(135deg, oklch(0.72 0.01 220) 0%, oklch(0.62 0.01 220) 100%),
      linear-gradient(135deg, oklch(0.80 0.01 220) 0%, oklch(0.80 0.01 220) 100%);
    box-shadow: none;
  }

  /* Skeleton */
  @keyframes ptag-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
  .ptag--skeleton {
    background-image: none;
    background-color: oklch(0.82 0.02 220);
    border-color: transparent;
    box-shadow: none;
    animation: ptag-pulse 1.6s ease-in-out infinite;
    min-width: 96px;
  }
  .ptag--skeleton .ptag-icon,
  .ptag--skeleton .ptag-text { visibility: hidden; }

  /* ── OfferCard (pcard) — 170×232px · medium size ── */
  .pcard {
    width: 170px;
    background: oklch(1 0 0);
    border-radius: 8px;
    box-shadow: 0 8px 16px oklch(0.22 0.18 285 / 0.10);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  /* image area */
  .pcard__img {
    width: 100%;
    height: 112px;
    background: oklch(0.93 0.006 220);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pcard__img-placeholder { opacity: 0.20; }
  /* badge top-right of image (live dot, clock icon) */
  .pcard__img-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
  }
  /* ptag overlay bottom-left of image */
  .pcard__img-ptag {
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 2;
  }
  /* body */
  .pcard__body {
    display: flex;
    flex-direction: column;
    padding: 12px;
    flex: 1;
  }
  .pcard__meta { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .pcard__name {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 16px; font-weight: 700; line-height: 20px;
    color: oklch(0.15 0.008 200);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin: 0;
  }
  .pcard__year {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 11px; font-weight: 500; line-height: 16px;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: oklch(0.30 0.20 285);
    margin: 0;
  }
  /* price row */
  .pcard__price-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px; flex-shrink: 0;
  }
  .pcard__price-left { display: flex; align-items: center; gap: 6px; }
  .pcard__price-text {
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 13px; font-weight: 700; line-height: 20px;
    font-variant-numeric: tabular-nums;
    color: oklch(0.42 0.22 285); white-space: nowrap;
  }
  /* right-only like row (no price) */
  .pcard__like-row {
    display: flex; align-items: center; justify-content: flex-end;
    margin-top: 10px; flex-shrink: 0;
  }
  /* status borders */
  .pcard--live       { border-bottom: none; position: relative; }
  .pcard--live::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg,
      oklch(0.78 0.17 55)  0%,
      oklch(0.72 0.16 55) 50%,
      oklch(0.54 0.18 44) 100%
    );
    border-radius: 0 0 var(--vmc-radius-sm, 4px) var(--vmc-radius-sm, 4px);
  }
  .pcard--negotiable { border-bottom: none; position: relative; }
  .pcard--negotiable::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg,
      oklch(0.85 0.16 195)  0%,
      oklch(0.78 0.14 195) 50%,
      oklch(0.58 0.16 195) 100%
    );
    border-radius: 0 0 var(--vmc-radius-sm, 4px) var(--vmc-radius-sm, 4px);
  }
  .pcard--proxima    { border-bottom: 6px solid oklch(0.42 0.22 285); }
  .pcard--expired    { border-bottom: 6px solid oklch(0.72 0.02 220); }
  /* expired muted */
  .pcard--expired .pcard__name { color: oklch(0.55 0.02 220); }
  .pcard--expired .pcard__year { color: oklch(0.65 0.01 220); }
  .pcard--expired .pcard__img  { filter: grayscale(0.6) brightness(0.95); }
  /* skeleton — border siempre gris, sin color de estado */
  .pcard--skeleton {
    border-bottom-color: oklch(0.85 0.008 220) !important;
  }
  .pcard--skeleton .pcard__img {
    background: oklch(0.87 0.006 220);
    animation: ptag-pulse 1.6s ease-in-out infinite;
  }
  .pcard--skeleton .pcard__name,
  .pcard--skeleton .pcard__year { color: transparent; position: relative; }
  .pcard--skeleton .pcard__name::after {
    content: ""; position: absolute; top: 3px; left: 0;
    height: 13px; width: 80%;
    background: oklch(0.82 0.02 220); border-radius: 4px;
    animation: ptag-pulse 1.6s ease-in-out infinite;
  }
  .pcard--skeleton .pcard__year::after {
    content: ""; position: absolute; top: 2px; left: 0;
    height: 9px; width: 44px;
    background: oklch(0.82 0.02 220); border-radius: 4px;
    animation: ptag-pulse 1.6s ease-in-out infinite;
  }
  .pcard--skeleton .pcard__price-text { color: transparent; }
  .pcard--skeleton .pprice {
    background-image: none;
    background-color: oklch(0.85 0.008 220);
    box-shadow: none;
    animation: ptag-pulse 1.6s ease-in-out infinite;
  }
  .pcard--skeleton .pprice::before,
  .pcard--skeleton .pprice::after { display: none; }
  .pcard--skeleton .plike {
    background: oklch(0.88 0.004 220);
    box-shadow: none;
    animation: ptag-pulse 1.6s ease-in-out infinite;
  }
  .pcard--skeleton .plike svg {
    stroke: oklch(0.72 0.02 220);
  }
  /* live pulse dot — small status indicator */
  .pcard-live-dot {
    position: relative;
    width: 10px; height: 10px; border-radius: 9999px;
    background: oklch(0.72 0.16 55);
  }
  .pcard-live-dot::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 9999px;
    background: oklch(0.72 0.16 55 / 0.35);
    animation: pcard-live-ring 1.4s ease-out infinite;
  }
  .pcard-live-dot::after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 9999px;
    background: oklch(0.72 0.16 55 / 0.15);
    animation: pcard-live-ring 1.4s ease-out 0.3s infinite;
  }
  @keyframes pcard-live-ring {
    0%   { opacity: 1; transform: scale(0.8); }
    100% { opacity: 0; transform: scale(1.9); }
  }
  /* proxima base (opción C — dot igual al live) */
  .pcard-clock-badge {
    position: relative;
    width: 10px; height: 10px; border-radius: 9999px;
    background: oklch(0.72 0.16 55);
  }
  .pcard-clock-badge::before {
    content: "";
    position: absolute;
    inset: -3px; border-radius: 9999px;
    background: oklch(0.72 0.16 55 / 0.35);
    animation: pcard-live-ring 1.4s ease-out infinite;
  }
  .pcard-clock-badge::after {
    content: "";
    position: absolute;
    inset: -6px; border-radius: 9999px;
    background: oklch(0.72 0.16 55 / 0.15);
    animation: pcard-live-ring 1.4s ease-out 0.3s infinite;
  }
  /* opción A — 20px + clock icon */
  .pcard-clock-badge--a {
    width: 20px; height: 20px;
    background: oklch(0.72 0.16 55);
    border-radius: 9999px;
    display: flex; align-items: center; justify-content: center;
    animation: pcard-live-ring-a 1.4s ease-out infinite;
    box-shadow: 0 0 0 0 oklch(0.72 0.16 55 / 0.45);
  }
  .pcard-clock-badge--a::before,
  .pcard-clock-badge--a::after { display: none; }
  @keyframes pcard-live-ring-a {
    0%   { box-shadow: 0 0 0 0   oklch(0.72 0.16 55 / 0.45); }
    70%  { box-shadow: 0 0 0 7px oklch(0.72 0.16 55 / 0); }
    100% { box-shadow: 0 0 0 0   oklch(0.72 0.16 55 / 0); }
  }
  /* opción B — dot + label */
  .pcard-clock-badge--b {
    display: flex; align-items: center; gap: 4px;
    background: none;
    width: auto; height: auto;
    border-radius: 0;
    animation: none;
  }
  .pcard-clock-badge--b::before,
  .pcard-clock-badge--b::after { display: none; }
  /* card hover lift */
  .pcard {
    transition: transform 150ms cubic-bezier(0.3,0,0,1),
                box-shadow 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
  }
  .pcard:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px oklch(0.22 0.18 285 / 0.12);
  }
  @media (prefers-reduced-motion: reduce) {
    .pcard { transition: none; }
    .pcard-clock-badge { animation: none; }
  }

  /* ── Opción A — pill badge sobre imagen ── */
  .pcard-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 8px 3px 6px;
    border-radius: 9999px;
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 9px; font-weight: 700; letter-spacing: 0.07em;
    text-transform: uppercase; white-space: nowrap;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  /* EN VIVO pill — orange gradient (mismo patrón pvbtn/ptag) */
  .pcard-pill--live {
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
    background-clip: padding-box, border-box;
    box-shadow: 0 2px 10px oklch(0.72 0.16 55 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.14);
    color: oklch(1 0 0);
  }
  /* PRÓXIMA pill — vault gradient (mismo patrón ptag) */
  .pcard-pill--proxima {
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(135deg,
        oklch(0.48 0.24 285) 0%,
        oklch(0.48 0.24 285) 30%,
        oklch(0.20 0.17 285) 100%
      ),
      linear-gradient(135deg,
        oklch(0.65 0.20 285) 0%,
        oklch(1 0 0 / 0.40) 38%,
        oklch(0.45 0.22 285) 68%,
        oklch(0.65 0.20 285) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 2px 10px oklch(0.22 0.18 285 / 0.50), inset 0 1px 0 oklch(1 0 0 / 0.10);
    color: oklch(1 0 0);
  }
  .pcard-pill-dot {
    width: 6px; height: 6px; border-radius: 9999px;
    background: oklch(1 0 0 / 0.92);
    flex-shrink: 0;
    animation: pcard-live-ring 1.4s ease-out infinite;
    position: relative;
  }
  .pcard-pill-clock {
    flex-shrink: 0;
    animation: pcard-clock-blink 1.4s ease-in-out infinite;
  }
  @keyframes pcard-clock-blink {
    0%, 100% { opacity: 1;   transform: scale(1); }
    50%       { opacity: 0.35; transform: scale(0.85); }
  }

  /* ── Opción B — image tint for proxima ── */
  .pcard__img-tint {
    position: absolute; inset: 0;
    background: oklch(0.22 0.18 285 / 0.28);
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }

  /* ── Opción C — context line ── */
  .pcard__context {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 10px; font-weight: 500; line-height: 14px;
    margin: 2px 0 0; display: flex; align-items: center; gap: 4px;
  }
  .pcard__context--live  { color: oklch(0.72 0.16 55); }
  .pcard__context--proxima { color: oklch(0.55 0.04 220); }
  .pcard__context-dot {
    width: 5px; height: 5px; border-radius: 9999px;
    background: oklch(0.72 0.16 55); flex-shrink: 0;
    animation: pcard-live-ring 1.4s ease-out infinite;
    position: relative;
  }

  /* ── ListingArea ── */
  .plisting {
    background: oklch(1 0 0);
    border-radius: 12px;
    border: 1px solid oklch(0.22 0.18 285 / 0.07);
    padding: 20px 20px 24px;
    box-shadow: 0 2px 12px oklch(0.22 0.18 285 / 0.06);
    position: relative;
  }
  /* brackets injected as SVG children — BktTL size=20 / BktBR size=20 */
  .plisting__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 16px;
  }
  .plisting__header-left { display: flex; flex-direction: column; gap: 2px; }
  .plisting__name {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 16px; font-weight: 700; line-height: 22px;
    letter-spacing: 0.04em; text-transform: uppercase;
    color: oklch(0.15 0.008 200);
    margin: 0;
  }
  .plisting__count {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 12px; font-weight: 400; line-height: 16px;
    color: oklch(0.38 0.04 280 / 0.65);
    margin: 0;
  }
  .plisting__link {
    font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 14px; font-weight: 600;
    color: oklch(0.22 0.18 285);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
    height: 36px;
    padding: 0 4px 0 8px;
    cursor: pointer;
    outline: none;
    transition: color 0.14s ease;
  }
  /* icon — 24×24, sin border (no layout shift) */
  .plisting__link-icon {
    position: relative;
    width: 24px; height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: transparent;
    color: oklch(0.72 0.16 55);
    transition: background 0.14s ease, color 0.14s ease;
  }
  /* gradient ring via ::before — absolute, cero impacto en layout */
  .plisting__link-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg,
      oklch(0.82 0.26 55) 0%,
      oklch(0.62 0.22 45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
    mask-composite: exclude;
    transition: opacity 0.14s ease;
  }
  /* hover — solid orange, ring desaparece */
  .plisting__link:hover .plisting__link-icon {
    background: oklch(0.72 0.16 55);
    color: oklch(1 0 0);
  }
  .plisting__link:hover .plisting__link-icon::before { opacity: 0; }
  /* pressed — dark amber, text muted gray */
  .plisting__link:active {
    color: oklch(0.65 0.025 260);
  }
  .plisting__link:active .plisting__link-icon {
    background: color-mix(in oklch, oklch(0.72 0.16 55) 62%, oklch(0 0 0));
    color: oklch(1 0 0);
  }
  .plisting__link:active .plisting__link-icon::before { opacity: 0; }
  /* focus-visible */
  .plisting__link:focus-visible {
    outline: 2px solid oklch(0.22 0.18 285 / 0.60);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .plisting__cards {
    display: flex;
    gap: 12px;
  }

`;

const F = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";

/* ── Bracket SVG components — stroke-based, rounded corners + caps ── */
type BktGrad = 'g1' | 'g2' | 'g3';
interface BktProps { size?: number; sw?: number; grad?: BktGrad; }
const BKT_STOPS: Record<BktGrad, [string, string]> = {
  g1: ['#FF8B00', '#3E1F9A'],
  g2: ['#FFA500', '#E05000'],
  g3: ['#FFD000', '#E88000'],
};

function BktTL({ size = 8, sw = 1.5, grad = 'g1' }: BktProps): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  const [ca, cb] = BKT_STOPS[grad];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
         style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
         aria-hidden="true">
      <defs>
        <linearGradient id={`btl${grad}`} x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor={ca}/>
          <stop offset="100%" stopColor={cb}/>
        </linearGradient>
      </defs>
      <path
        d={`M${size - h} ${h} L${r + h} ${h} Q${h} ${h} ${h} ${r + h} L${h} ${size - h}`}
        stroke={`url(#btl${grad})`} strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function BktBR({ size = 8, sw = 1.5, grad = 'g1' }: BktProps): JSX.Element {
  const h = sw / 2;
  const r = sw * 2;
  const [ca, cb] = BKT_STOPS[grad];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
         style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none' }}
         aria-hidden="true">
      <defs>
        <linearGradient id={`bbr${grad}`} x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor={ca}/>
          <stop offset="100%" stopColor={cb}/>
        </linearGradient>
      </defs>
      <path
        d={`M${h} ${size - h} L${size - r - h} ${size - h} Q${size - h} ${size - h} ${size - h} ${size - r - h} L${size - h} ${h}`}
        stroke={`url(#bbr${grad})`} strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartOutline({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="var(--vmc-color-vault-600, oklch(0.38 0.20 285))"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function HeartFilled({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="var(--vmc-color-vault-700, oklch(0.30 0.20 285))" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function HeartFilledWhite({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="rgb(100% 100% 100% / 0.92)" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

interface LikeDemoProps { cls: string; icon: number; }

function DollarIcon({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="rgb(100% 100% 100% / 0.92)" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

interface PriceDemoProps { sizeCls: string; wrapCls: string; icon: number; }

function PriceDemo({ sizeCls, wrapCls, icon }: PriceDemoProps): JSX.Element {
  const [active, setActive] = useState(false);
  function handleToggle(): void { setActive(!active); }
  const stateCls = active ? "pprice-wrap--active" : "";
  return (
    <div className={`pprice-wrap ${wrapCls} ${stateCls}`} onClick={handleToggle}
      style={{ cursor: "pointer" }}>
      <button className={`pprice ${sizeCls}`} type="button" aria-label="Ver precio">
        <DollarIcon size={icon} />
      </button>
      <div className="pprice-base" />
    </div>
  );
}

function LikeDemo({ cls, icon }: LikeDemoProps): JSX.Element {
  const [liked, setLiked] = useState(false);
  function handleToggle(): void { setLiked(!liked); }
  return (
    <button
      className={`plike ${cls}${liked ? " plike--active" : ""}`}
      type="button"
      aria-label={liked ? "Quitar like" : "Me gusta"}
      onClick={handleToggle}
    >
      {liked ? <HeartFilledWhite size={icon} /> : <HeartOutline size={icon} />}
    </button>
  );
}

const USER_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const STAR_ICON_SM = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const STAR_ICON_MD = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const STAR_ICON_LG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ARROW_ICON_SM = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const ARROW_ICON_MD = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const ARROW_ICON_LG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface SectionLabelProps { title: string; subtitle?: string; dark?: boolean; }

function SectionLabel({ title, subtitle, dark }: SectionLabelProps): JSX.Element {
  return (
    <div style={{ padding: "14px 24px", borderBottom: `1px solid ${dark ? "rgb(100% 100% 100% / 0.08)" : "var(--vmc-color-vault-utility-ghost)"}` }}>
      <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.10em",
        color: dark ? "var(--vmc-color-base-inverse-muted)" : "var(--vmc-color-text-primary)", margin: 0 }}>
        {title}
      </p>
      {subtitle && (
        <p style={{ fontFamily: F, fontSize: 11,
          color: dark ? "var(--vmc-color-base-inverse-subtle)" : "var(--vmc-color-text-tertiary)", margin: "2px 0 0" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface StateColProps { label: string; children: React.ReactNode; dark?: boolean; }

function StateCol({ label, children, dark }: StateColProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.08em",
        color: dark ? "var(--vmc-color-base-inverse-subtle)" : "var(--vmc-color-text-tertiary)", margin: 0 }}>
        {label}
      </p>
      {children}
    </div>
  );
}




/* Shared vault gradient palette */
const VGRAD_STOPS = (
  <>
    <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
    <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
    <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
  </>
);

function IconVehicular({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-vehicular" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-vehicular)">
        {/* Volante — 3 radios + anillo exterior + hub central */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
        <line x1="12" y1="3" x2="12" y2="9.5" />
        <line x1="20.2" y1="16.5" x2="14.6" y2="13.2" />
        <line x1="3.8" y1="16.5" x2="9.4" y2="13.2" />
      </g>
    </svg>
  );
}
function IconMaquinaria({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-maquinaria" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-maquinaria)">
        {/* Llave inglesa — path clásico, limpio */}
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </g>
    </svg>
  );
}
function IconEquipos({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-equipos" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-equipos)">
        <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" />
      </g>
    </svg>
  );
}

/* ── Equipos Diversos — candidatos de ícono ── */
function IconEquiposA({ size }: { size: number }): JSX.Element {
  // Excavadora — brazo + cuchara
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-equipos-a" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-equipos-a)">
        {/* Cuerpo / cabina */}
        <rect x="2" y="13" width="7" height="5" rx="0.5" />
        {/* Brazo principal (boom) */}
        <line x1="9" y1="14" x2="18" y2="7" />
        {/* Stick */}
        <line x1="18" y1="7" x2="17" y2="3" />
        {/* Cuchara (bucket) */}
        <path d="M17 3 L14 5 L16 8 L19 6 Z" />
        {/* Oruga inferior */}
        <line x1="1" y1="19" x2="10" y2="19" />
        <circle cx="2.5" cy="19" r="1" fill="none" />
        <circle cx="8.5" cy="19" r="1" fill="none" />
      </g>
    </svg>
  );
}

function IconEquiposB({ size }: { size: number }): JSX.Element {
  // Montacargas / Forklift
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-equipos-b" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-equipos-b)">
        {/* Cuerpo */}
        <rect x="4" y="9" width="10" height="9" rx="0.5" />
        {/* Cabina */}
        <rect x="4" y="5" width="6" height="4" rx="0.5" />
        {/* Mástil vertical */}
        <line x1="14" y1="18" x2="14" y2="4" />
        {/* Horquillas (forks) */}
        <line x1="14" y1="8"  x2="21" y2="8"  />
        <line x1="14" y1="11" x2="21" y2="11" />
        {/* Ruedas */}
        <circle cx="7"  cy="18" r="1.8" fill="none" />
        <circle cx="12" cy="18" r="1.8" fill="none" />
      </g>
    </svg>
  );
}

function IconEquiposC({ size }: { size: number }): JSX.Element {
  // Grúa torre
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-equipos-c" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-equipos-c)">
        {/* Torre vertical */}
        <line x1="9" y1="22" x2="9" y2="4" />
        {/* Pluma principal */}
        <line x1="9" y1="5" x2="22" y2="5" />
        {/* Contra-pluma */}
        <line x1="9" y1="5" x2="4"  y2="5" />
        {/* Tirante pluma */}
        <line x1="22" y1="5" x2="9" y2="10" />
        {/* Línea de carga */}
        <line x1="17" y1="5" x2="17" y2="15" />
        {/* Gancho */}
        <path d="M15 15 Q17 18 19 15" />
        {/* Base */}
        <line x1="6" y1="22" x2="12" y2="22" />
      </g>
    </svg>
  );
}

function IconEquiposD({ size }: { size: number }): JSX.Element {
  // Bulldozer / Topadora
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-equipos-d" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-equipos-d)">
        {/* Cuerpo */}
        <rect x="5" y="8" width="14" height="8" rx="0.5" />
        {/* Cabina */}
        <rect x="12" y="5" width="6" height="3" rx="0.5" />
        {/* Hoja delantera (blade) */}
        <path d="M5 7 L2 8 L2 17 L5 17" />
        {/* Oruga inferior */}
        <rect x="4" y="16" width="16" height="3" rx="1.5" />
        {/* Ruedas de oruga */}
        <circle cx="7"  cy="17.5" r="1" fill="none" />
        <circle cx="12" cy="17.5" r="1" fill="none" />
        <circle cx="17" cy="17.5" r="1" fill="none" />
      </g>
    </svg>
  );
}
function IconArticulos({ size }: { size: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="vg-articulos" x1="0%" y1="0%" x2="100%" y2="100%">
          {VGRAD_STOPS}
        </linearGradient>
      </defs>
      <g stroke="url(#vg-articulos)">
        {/* Etiqueta de precio — perfecta para artículos en subasta */}
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <circle cx="7" cy="7" r="1.5" fill="url(#vg-articulos)" stroke="none" />
      </g>
    </svg>
  );
}

interface CategoryCardDemoProps { icon: React.ReactNode; label: string; }

function CategoryCardDemo({ icon, label }: CategoryCardDemoProps): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const focusCls = pressed ? "pcatcard--focus" : "";
  return (
    <div
      className={`pcatcard ${focusCls}`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <div className="pcatcard-icon-wrap">{icon}</div>
      <span className="pcatcard-label">{label}</span>
    </div>
  );
}

interface OfferTypeDemoCardProps {
  variant: "negotiable" | "live";
  label: string;
}

function OfferTypeDemoCard({ variant, label }: OfferTypeDemoCardProps): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const focusCls = pressed ? "poftype--focus" : "";
  return (
    <div
      className={`poftype poftype--${variant} ${focusCls}`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <div className="poftype-top">
        <span className="poftype-label">{label}</span>
      </div>
      <div className="poftype-bottom">
        <span className="poftype-cta">VER TODAS</span>
      </div>
    </div>
  );
}

/* ── Calendar icon — 16×16 ── */
function CalendarIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <line x1="2" y1="7" x2="14" y2="7" />
      <line x1="5" y1="1.5" x2="5" y2="4.5" />
      <line x1="11" y1="1.5" x2="11" y2="4.5" />
    </svg>
  );
}

function AgendaVisitaBtn(): JSX.Element {
  return (
    <button className="psec-agenda" type="button">
      <span className="psec-agenda-icon"><CalendarIcon /></span>
      <span className="psec-agenda-label">Agenda tu visita</span>
    </button>
  );
}

/* ── AuctionStatusBanner — negotiable ── */
const BACK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10,3 5,8 10,13" />
  </svg>
);

function AuctionStatusNegotiable(): JSX.Element {
  return (
    <div className="pastatus" role="banner" aria-label="Estado de subasta: Negociable">
      <button className="pastatus-back" type="button" aria-label="Volver">
        {BACK_ICON}
      </button>
      <div className="pastatus-text">
        <span className="pastatus-title">Aire acondicionado Uniflair</span>
        <span className="pastatus-sub">Vendedor: Institución Financiera</span>
      </div>
    </div>
  );
}

function MdNegociarDemo(): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const cls = pressed ? "pvbtn-neg pvbtn-neg--pressed" : "pvbtn-neg";
  return (
    <button
      className={cls}
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      Negociar
    </button>
  );
}

function MdPrimaryDemo(): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const cls = pressed ? "pvbtn pvbtn--pressed" : "pvbtn";
  return (
    <button
      className={cls}
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      Participa
    </button>
  );
}

function MdSecondaryDemo(): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const cls = pressed ? "psec psec--pressed" : "psec";
  return (
    <button
      className={cls}
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      Ingresa
    </button>
  );
}

function MdGhostDemo(): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const cls = pressed ? "pghost pghost--pressed" : "pghost";
  return (
    <button
      className={cls}
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      Ver ofertas relacionadas
    </button>
  );
}

function SmIngresaDemo(): JSX.Element {
  const [pressed, setPressed] = useState(false);
  function handlePress(): void { setPressed(true); }
  function handleRelease(): void { setPressed(false); }
  const cls = pressed ? "pvbtn-sm pvbtn-sm--pressed" : "pvbtn-sm";
  return (
    <button
      className={cls}
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      <span className="pvbtn-icon">{USER_ICON}</span>
      Ingresa
    </button>
  );
}

const CATEGORY_ITEMS = [
  { key: "vehicular",  label: "VEHICULAR",          icon: (s: number) => <IconVehicular size={s} /> },
  { key: "maquinaria", label: "MAQUINARIA",         icon: (s: number) => <IconMaquinaria size={s} /> },
  { key: "equipos",    label: "EQUIPOS DIVERSOS",   icon: (s: number) => <IconEquipos size={s} /> },
  { key: "articulos",  label: "ARTÍCULOS DIVERSOS", icon: (s: number) => <IconArticulos size={s} /> },
] as const;

/* ─── DataQualityBadge ─── */

const PDQB_CSS = `
  /* ── Glow pulse — "respira" con stagger por dot ── */
  @keyframes pdq-breathe {
    0%, 100% { opacity: 1; filter: brightness(1); }
    50%       { opacity: 0.75; filter: brightness(1.25); }
  }
  /* ── Color wave — stroke animado DIRECTAMENTE en el path (no filter)
     Filter rasteriza bitmap estático → color se congela.
     stroke CSS en el path = GPU interpola en OKLCH polar L constante.
     Verde H=145 → Naranja H=55 → regresa. L=70% C=0.20 fijos.
  ── */
  @keyframes pdq-wave-direct {
    0%, 100% { stroke: oklch(70% 0.20 145); }
    50%       { stroke: oklch(70% 0.20 55);  }
  }
  .pdq-wave-path {
    fill: none;
    stroke-width: 2.8px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: oklch(70% 0.20 145);
    will-change: stroke;
    animation: pdq-wave-direct 2.4s ease-in-out infinite;
  }
  .pdq-wave-path-ghost {
    fill: none;
    stroke-width: 2.8px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: oklch(0.85 0.01 220);
  }
  /* Stagger ola + anula breathe para cycle */
  .pdq-cycle .pdq-iso.on { animation: none; }
  .pdq-cycle .pdq-iso:nth-child(1) .pdq-wave-path { animation-delay: 0s;    }
  .pdq-cycle .pdq-iso:nth-child(2) .pdq-wave-path { animation-delay: 0.30s; }
  .pdq-cycle .pdq-iso:nth-child(3) .pdq-wave-path { animation-delay: 0.60s; }
  @media (prefers-reduced-motion: reduce) {
    .pdq-wave-path { animation-duration: 8s; }
  }

  /* ── Verde ── */
  .pdq-green .pdq-unit.on {
    background: var(--vmc-color-status-success, oklch(0.70 0.20 145));
    box-shadow: 0 0 8px var(--vmc-color-status-success, oklch(0.70 0.20 145) / 0.65);
    animation: pdq-breathe 2.0s ease-in-out infinite;
  }
  .pdq-green.pdq-e .pdq-unit.on { border-color: transparent; }
  .pdq-green.pdq-f { color: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }

  /* ── Morado (vault) ── */
  .pdq-purple .pdq-unit.on {
    background: var(--vmc-color-vault-500, oklch(0.45 0.22 285));
    box-shadow: 0 0 8px var(--vmc-color-vault-500, oklch(0.45 0.22 285) / 0.60);
    animation: pdq-breathe 2.0s ease-in-out infinite;
  }
  .pdq-purple.pdq-f { color: var(--vmc-color-vault-500, oklch(0.45 0.22 285)); }
  /* Stagger — cada dot desfasado 200ms */
  .pdq-unit:nth-child(1).on { animation-delay: 0s;    }
  .pdq-unit:nth-child(2).on { animation-delay: 0.2s;  }
  .pdq-unit:nth-child(3).on { animation-delay: 0.4s;  }

  /* ══ ARC GAUGE — todo verde · indicador + oscilación motor ══ */
  /* baja / media — avanza y regresa sin llegar al tope */
  @keyframes needle-rev {
    0%   { transform: rotate(-7deg); }
    35%  { transform: rotate(8deg);  }
    65%  { transform: rotate(-3deg); }
    100% { transform: rotate(-7deg); }
  }
  /* alta — arranca en tope (0°), pisa, retrocede, regresa al tope */
  @keyframes needle-rev-alta {
    0%   { transform: rotate(0deg);   }
    30%  { transform: rotate(-12deg); }
    60%  { transform: rotate(-4deg);  }
    100% { transform: rotate(0deg);   }
  }
  .dq-needle-alta {
    transform-box: view-box;
    transform-origin: 15px 17px;
    animation: needle-rev-alta 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes arc-glow {
    0%, 100% { filter: drop-shadow(0 0 2px oklch(70% 0.20 145 / 0.45)); }
    50%       { filter: drop-shadow(0 0 5px oklch(70% 0.20 145 / 0.85)); }
  }
  .dq-gauge-fill-green  { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); animation: arc-glow 2.0s ease-in-out infinite; }
  .dq-gauge-needle-green { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }
  .dq-gauge-pivot-green  { fill: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }
  .dq-needle-group {
    transform-box: view-box;
    transform-origin: 15px 17px;
    animation: needle-rev 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  /* Aliases orange → green (same component, only green now) */
  .dq-gauge-fill-orange  { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); animation: arc-glow 2.0s ease-in-out infinite; }
  .dq-gauge-needle-orange { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }
  .dq-gauge-pivot-orange  { fill: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }

  /* ══ SLANTED SLABS — Patrón recomendado por Gemini DS Research ══
     3 paralelogramos oblicuos 30° · evoca telemetría premium
     Baja: slab 1 naranja · Moderada: slabs 1+2 naranja · Excelente: 3 verde
     Animación: glow-breathe en último slab activo
  ═══════════════════════════════════════════════════════════════ */
  @keyframes slab-breathe {
    0%, 100% { filter: drop-shadow(0 0 2px var(--vmc-color-status-success, oklch(70% 0.20 145) / 0.55)); }
    50%       { filter: drop-shadow(0 0 5px var(--vmc-color-status-success, oklch(70% 0.20 145) / 0.90)); }
  }
  @keyframes slab-breathe-orange {
    0%, 100% { filter: drop-shadow(0 0 2px var(--vmc-color-orange-500, oklch(72% 0.16 55) / 0.45)); }
    50%       { filter: drop-shadow(0 0 4px var(--vmc-color-orange-500, oklch(72% 0.16 55) / 0.80)); }
  }
  .pdq-slab-inactive {
    fill: var(--vmc-color-vault, oklch(0.22 0.18 285));
    opacity: 0.28;
    transition: fill 0.25s ease, opacity 0.25s ease;
  }
  .pdq-slab-orange {
    fill: var(--vmc-color-orange-500, oklch(0.72 0.16 55));
    opacity: 1;
  }
  .pdq-slab-orange.last {
    animation: slab-breathe-orange 2.6s ease-in-out infinite;
  }
  .pdq-slab-green {
    fill: var(--vmc-color-status-success, oklch(0.70 0.20 145));
    opacity: 1;
  }
  .pdq-slab-green.last {
    animation: slab-breathe 2.6s ease-in-out infinite;
  }

  /* ── Variante C: RINGS — 3 círculos concéntricos ── */
  .pdq-rings {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; flex-shrink: 0;
  }
  @keyframes pdq-ring-pulse {
    0%, 100% { stroke: oklch(70% 0.20 145); opacity: 1; }
    50%       { stroke: oklch(70% 0.20 55);  opacity: 0.85; }
  }
  .pdq-ring {
    fill: none;
    stroke: oklch(0.86 0.01 220);
    stroke-width: 1.5;
    transition: stroke 0.2s ease;
  }
  .pdq-ring.on {
    stroke: oklch(70% 0.20 145);
    stroke-width: 2;
    will-change: stroke;
    animation: pdq-ring-pulse 2.4s ease-in-out infinite;
  }
  .pdq-ring-1.on { animation-delay: 0s;    }
  .pdq-ring-2.on { animation-delay: 0.30s; }
  .pdq-ring-3.on { animation-delay: 0.60s; }

  /* ── Variante G: ISOTIPO — 3 isotipos VMC, inactivo = ghost ── */
  .pdq-g { display: inline-flex; align-items: center; gap: 5px; }
  .pdq-g .pdq-iso {
    width: 14px; height: 14px; flex-shrink: 0;
    opacity: 0.15;
    transition: opacity 0.25s ease, filter 0.25s ease;
  }
  .pdq-g .pdq-iso.on {
    opacity: 1;
    animation: pdq-breathe 2.0s ease-in-out infinite;
  }
  .pdq-g .pdq-iso:nth-child(1).on { animation-delay: 0s;   }
  .pdq-g .pdq-iso:nth-child(2).on { animation-delay: 0.22s; }
  .pdq-g .pdq-iso:nth-child(3).on { animation-delay: 0.44s; }
`;

const PDQB_CSS_OLD = `  /* UNUSED */
  ._placeholder {
    box-sizing: border-box;
    position: relative; overflow: hidden;
    user-select: none; cursor: default;
  }
  .pdqb::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.16) 0%, transparent 55%);
    pointer-events: none; z-index: 0;
  }

  /* ── MALO: orange · ! advertencia · datos básicos ── */
  .pdqb--malo {
    background-image:
      linear-gradient(var(--vmc-color-orange-500, oklch(0.72 0.16 55) / 0.07),
                      var(--vmc-color-orange-500, oklch(0.72 0.16 55) / 0.07)),
      linear-gradient(135deg,
        var(--vmc-color-orange-300, oklch(0.82 0.12 55)) 0%,
        oklch(1 0 0) 40%,
        var(--vmc-color-orange-500, oklch(0.72 0.16 55)) 70%,
        var(--vmc-color-orange-300, oklch(0.82 0.12 55)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow: 0 1px 6px var(--vmc-color-orange-500, oklch(0.72 0.16 55) / 0.22);
  }
  .pdqb--malo .pdqb-icon  { color: var(--vmc-color-orange-600, oklch(0.65 0.18 55)); position: relative; z-index: 1; }
  .pdqb--malo .pdqb-label { color: var(--vmc-color-orange-700, oklch(0.55 0.18 52)); }

  /* ── MEDIO: vault/purple · ½ circle · datos parciales ── */
  .pdqb--medio {
    background-image:
      linear-gradient(var(--vmc-color-vault-500, oklch(0.45 0.22 285) / 0.07),
                      var(--vmc-color-vault-500, oklch(0.45 0.22 285) / 0.07)),
      linear-gradient(135deg,
        var(--vmc-color-vault-300, oklch(0.62 0.18 285)) 0%,
        oklch(1 0 0) 40%,
        var(--vmc-color-vault-500, oklch(0.45 0.22 285)) 70%,
        var(--vmc-color-vault-300, oklch(0.62 0.18 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow: 0 1px 8px var(--vmc-color-vault-500, oklch(0.45 0.22 285) / 0.22);
  }
  .pdqb--medio .pdqb-icon  { color: var(--vmc-color-vault-500, oklch(0.45 0.22 285)); position: relative; z-index: 1; }
  .pdqb--medio .pdqb-label { color: var(--vmc-color-vault-600, oklch(0.38 0.22 285)); }

  /* ── EXCELENTE: green → vault · escudo ✔ · datos verificados ── */
  .pdqb--excelente {
    background-image:
      linear-gradient(var(--vmc-color-status-success, oklch(0.70 0.20 145) / 0.08),
                      var(--vmc-color-status-success, oklch(0.70 0.20 145) / 0.08)),
      linear-gradient(135deg,
        var(--vmc-color-status-success, oklch(0.70 0.20 145)) 0%,
        oklch(1 0 0) 38%,
        var(--vmc-color-status-success, oklch(0.70 0.20 145)) 62%,
        var(--vmc-color-vault-400, oklch(0.52 0.22 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 oklch(1 0 0 / 0.20),
      0 2px 10px var(--vmc-color-status-success, oklch(0.70 0.20 145) / 0.28);
  }
  .pdqb--excelente .pdqb-icon {
    color: var(--vmc-color-status-success, oklch(0.70 0.20 145));
    filter: drop-shadow(0 0 3px var(--vmc-color-status-success, oklch(0.70 0.20 145) / 0.50));
    position: relative; z-index: 1;
  }
  .pdqb--excelente .pdqb-label {
    color: oklch(0.38 0.20 145);
  }

  /* ── Icon 13px ── */
  .pdqb-icon { width: 13px; height: 13px; flex-shrink: 0; }

  /* ── Label: 10px/600/UPPERCASE/0.05em — research spec ── */
  .pdqb-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em;
    line-height: 1; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
    position: relative; z-index: 1;
  }
`;

type DataQualityLevel = "baja" | "media" | "alta";

const DQ_FILLED: Record<DataQualityLevel, number> = { baja: 1, media: 2, alta: 3 };
const DQ_LABEL:  Record<DataQualityLevel, string>  = { baja: "Calidad baja", media: "Calidad media", alta: "Calidad alta" };

interface DqProps { level: DataQualityLevel; }

type DqColor = "green" | "purple";
interface DqProps2 { level: DataQualityLevel; color: DqColor; }

function DqUnits({ level, variant, color }: { level: DataQualityLevel; variant: string; color: DqColor }): JSX.Element {
  const filled = DQ_FILLED[level];
  return (
    <div className={`pdq-${variant} pdq-${color}`} role="status" aria-label={DQ_LABEL[level]}>
      <div className={filled >= 1 ? "pdq-unit on" : "pdq-unit"} />
      <div className={filled >= 2 ? "pdq-unit on" : "pdq-unit"} />
      <div className={filled >= 3 ? "pdq-unit on" : "pdq-unit"} />
    </div>
  );
}

/* SVG isotipo con path CSS class — anima stroke directamente */
function IsotipoWaveSvg({ active }: { active: boolean }): JSX.Element {
  const pathClass = active ? "pdq-wave-path" : "pdq-wave-path-ghost";
  return (
    <svg width="14" height="20" viewBox="0 0 10 14" fill="none">
      <path className={pathClass} d="M2 2 L8 7 L2 12" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DqCycle({ level }: DqProps): JSX.Element {
  const filled = DQ_FILLED[level];
  return (
    <div className="pdq-g pdq-cycle" role="status" aria-label={DQ_LABEL[level]}>
      <span className={filled >= 1 ? "pdq-iso on" : "pdq-iso"}><IsotipoWaveSvg active={filled >= 1} /></span>
      <span className={filled >= 2 ? "pdq-iso on" : "pdq-iso"}><IsotipoWaveSvg active={filled >= 2} /></span>
      <span className={filled >= 3 ? "pdq-iso on" : "pdq-iso"}><IsotipoWaveSvg active={filled >= 3} /></span>
    </div>
  );
}

function DqDiamonds({ level, color }: DqProps2): JSX.Element {
  return <DqUnits level={level} variant="d" color={color} />;
}
function DqHalos({ level, color }: DqProps2): JSX.Element {
  return <DqUnits level={level} variant="e" color={color} />;
}
function DqChevrons({ level, color }: DqProps2): JSX.Element {
  return <DqUnits level={level} variant="f" color={color} />;
}

/* ══ ARC GAUGE v2 — solo verde · indicador + needle que oscila ══
   Centro (15,17) radio 12
   Baja  25%→135°: arcEnd(6.5,8.5)  needleTip(7.3,9.3)
   Media 55%→81°:  arcEnd(16.9,5.1) needleTip(16.7,6.2)
   Alta  88%→22°:  arcEnd(26.1,12)  needleTip(25.2,12.5)
══ */
type ArcGaugeCfg = { arcD: string; tipX: number; tipY: number; altaMode: boolean; }
const ARC_GAUGE_CFG: Record<DataQualityLevel, ArcGaugeCfg> = {
  baja:  { arcD: "M 3 17 A 12 12 0 0 1 6.5 8.5",  tipX: 7.2,  tipY: 9.4,  altaMode: false },
  media: { arcD: "M 3 17 A 12 12 0 0 1 16.9 5.1",  tipX: 16.7, tipY: 6.2,  altaMode: false },
  alta:  { arcD: "M 3 17 A 12 12 0 0 1 27 17",     tipX: 27.0, tipY: 17.0, altaMode: true  },
};

interface DqArcProps { level: DataQualityLevel; size?: "sm" | "md" | "lg"; }

function DqArc({ level, size = "md" }: DqArcProps): JSX.Element {
  const cfg = ARC_GAUGE_CFG[level];
  const needleGroupCls = cfg.altaMode ? "dq-needle-alta" : "dq-needle-group";
  const dims: Record<"sm" | "md" | "lg", { w: number; h: number }> = {
    sm: { w: 28, h: 18 },
    md: { w: 38, h: 26 },
    lg: { w: 48, h: 32 },
  };
  const d = dims[size];
  return (
    <svg width={d.w} height={d.h} viewBox="-4 -5 38 28" fill="none" overflow="visible" role="status" aria-label={DQ_LABEL[level]}>
      <path d="M 3 17 A 12 12 0 0 1 27 17" stroke="var(--vmc-color-vault, oklch(0.22 0.18 285))" strokeOpacity="0.14" strokeWidth="3" strokeLinecap="round" />
      <path className="dq-gauge-fill-green" d={cfg.arcD} strokeWidth="3" strokeLinecap="round" />
      <g className={needleGroupCls}>
        <line className="dq-gauge-needle-green" x1="15" y1="17" x2={cfg.tipX} y2={cfg.tipY} strokeWidth="1.8" strokeLinecap="round" />
        <circle className="dq-gauge-pivot-green" cx={cfg.tipX} cy={cfg.tipY} r="2" />
      </g>
      <circle fill="var(--vmc-color-vault, oklch(0.22 0.18 285))" fillOpacity="0.35" cx="15" cy="17" r="2" />
    </svg>
  );
}

/* ══ SLANTED SLABS — 3 paralelogramos 30° oblicuos
   ViewBox 0 0 30 16 · cada slab 6px ancho, 16px alto, slant 4px
   Posiciones: slab1 x=0, slab2 x=9, slab3 x=18
══ */
function SlabClass(filled: number, index: number): string {
  if (filled >= index) {
    if (filled === 3) { return index === 3 ? "pdq-slab-green last" : "pdq-slab-green"; }
    return index === filled ? "pdq-slab-orange last" : "pdq-slab-orange";
  }
  return "pdq-slab-inactive";
}

function DqSlabs({ level }: DqProps): JSX.Element {
  const filled = DQ_FILLED[level];
  return (
    <svg width="32" height="18" viewBox="0 0 30 16" fill="none" role="status" aria-label={DQ_LABEL[level]}>
      {/* Slab 1 */}
      <polygon className={SlabClass(filled, 1)} points="4,0 10,0 6,16 0,16" />
      {/* Slab 2 */}
      <polygon className={SlabClass(filled, 2)} points="13,0 19,0 15,16 9,16" />
      {/* Slab 3 */}
      <polygon className={SlabClass(filled, 3)} points="22,0 28,0 24,16 18,16" />
    </svg>
  );
}

/* ── Variante C: Rings — 3 círculos concéntricos ── */
function DqRings({ level }: DqProps): JSX.Element {
  const filled = DQ_FILLED[level];
  return (
    <svg className="pdq-rings" viewBox="0 0 28 28" fill="none" role="status" aria-label={DQ_LABEL[level]}>
      {/* Anillo exterior */}
      <circle className={filled >= 3 ? "pdq-ring pdq-ring-3 on" : "pdq-ring pdq-ring-3"} cx="14" cy="14" r="12" />
      {/* Anillo medio */}
      <circle className={filled >= 2 ? "pdq-ring pdq-ring-2 on" : "pdq-ring pdq-ring-2"} cx="14" cy="14" r="8" />
      {/* Anillo interior */}
      <circle className={filled >= 1 ? "pdq-ring pdq-ring-1 on" : "pdq-ring pdq-ring-1"} cx="14" cy="14" r="4" />
    </svg>
  );
}

/* ── SVG isotipo VMC — dos chevrons angulares superpuestos ── */
function IsotipoSvg({ fill }: { fill: string }): JSX.Element {
  return (
    <svg viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chevron único → derecha, stroke grueso redondeado */}
      <path d="M2 2 L8 7 L2 12" stroke={fill} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface DqIsoProps { level: DataQualityLevel; color: DqColor; }

function DqIsotipo({ level }: DqIsoProps): JSX.Element {
  const filled = DQ_FILLED[level];
  const activeColor = "var(--vmc-color-orange-500, oklch(0.72 0.16 55))";
  const ghostColor = "oklch(0.82 0.01 220)";
  return (
    <div className="pdq-g" role="status" aria-label={DQ_LABEL[level]}>
      <span className={filled >= 1 ? "pdq-iso on" : "pdq-iso"}>
        <IsotipoSvg fill={filled >= 1 ? activeColor : ghostColor} />
      </span>
      <span className={filled >= 2 ? "pdq-iso on" : "pdq-iso"}>
        <IsotipoSvg fill={filled >= 2 ? activeColor : ghostColor} />
      </span>
      <span className={filled >= 3 ? "pdq-iso on" : "pdq-iso"}>
        <IsotipoSvg fill={filled >= 3 ? activeColor : ghostColor} />
      </span>
    </div>
  );
}

/* Keep old for backward compat in JSX */
function DqDots({ level }: DqProps): JSX.Element {
  return <DqUnits level={level} variant="d" color="green" />;
}
function DqSegments({ level }: DqProps): JSX.Element {
  return <DqUnits level={level} variant="e" color="green" />;
}
function DqBars({ level }: DqProps): JSX.Element {
  return <DqUnits level={level} variant="f" color="green" />;
}

/* ─── ConditionPill ─── */

/* ─── AuctionStatusBanner CSS ─── */
const PASTATUS_CSS = `
  /* ── AuctionStatusBanner — negotiable variant ─────────────────────────
     Spec DESIGN.md: bg var(--color-negotiable) · text var(--color-vault)
     Fix legibilidad: gradiente cyan → teal-vault profundo (no plana)
  ──────────────────────────────────────────────────────────────────────── */
  .pastatus {
    display: flex;
    align-items: center;
    width: 443px;
    height: 60px;
    padding: 0 16px;
    gap: 12px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    /* Gradiente: cyan base → teal profundo → teal-vault
       El extremo derecho mezcla vault para anclar en la paleta de marca
       y bajar la luminancia total → texto vault legible en toda la banda */
    /* cyan-600 → cyan-800 — misma rama DS, match con botón Negociar */
    background: linear-gradient(
      to right,
      var(--vmc-color-cyan-600) 0%,
      var(--vmc-color-cyan-800) 100%
    );
  }
  /* Shine top — capa de luz sutil, no blanquea el fondo */
  .pastatus::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.10) 0%, transparent 50%);
    pointer-events: none;
  }
  /* Back button */
  .pastatus-back {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: none;
    background: oklch(1 0 0 / 0.15);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: oklch(1 0 0);
    cursor: pointer;
    position: relative; z-index: 1;
    transition: background 0.15s ease;
  }
  .pastatus-back:hover { background: oklch(1 0 0 / 0.25); }
  /* Text block */
  .pastatus-text {
    display: flex; flex-direction: column; gap: 2px;
    position: relative; z-index: 1;
    min-width: 0;
  }
  .pastatus-title {
    font-family: var(--vmc-font-display);
    font-size: 15px; font-weight: 700; line-height: 1.2;
    color: oklch(1 0 0);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    text-shadow: 0 1px 4px oklch(0 0 0 / 0.35), 0 0 16px oklch(0 0 0 / 0.20);
  }
  .pastatus-sub {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 500; line-height: 1.2;
    color: oklch(1 0 0 / 0.85);
    text-shadow: 0 1px 3px oklch(0 0 0 / 0.30);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
`;

const PCOND_CSS = `
  /* ── Variante ACTUAL (vault gradient, border-radius 4px) ── */
  .pcond {
    position: relative;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    text-align: center; padding: 8px; min-height: 46px;
    border-radius: 4px; border: 2px solid transparent;
    font-family: var(--vmc-font-display); font-size: 12px; font-weight: 600; line-height: 1.35;
    user-select: none; overflow: hidden;
    transition: box-shadow 0.25s ease, transform 0.2s ease, opacity 0.2s ease;
  }
  .pcond--active {
    background-image:
      linear-gradient(135deg, oklch(0.45 0.20 285) 0%, oklch(0.30 0.20 285) 100%),
      linear-gradient(135deg, oklch(0.78 0.16 55) 0%, rgb(100% 100% 100%) 40%, oklch(0.55 0.20 285) 75%, oklch(0.80 0.12 285) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 3px 14px oklch(0.52 0.38 285 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.22);
    color: oklch(1 0 0); text-shadow: 0 1px 2px oklch(0 0 0 / 0.25);
  }
  .pcond--active::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.14) 0%, transparent 55%);
    pointer-events: none;
  }
  .pcond--inactive {
    background: oklch(0.88 0.004 220); color: oklch(0.50 0.02 220); opacity: 0.65; cursor: default;
  }
  .pcond-icon { flex-shrink: 0; color: oklch(1 0 0); position: relative; z-index: 1; }

  /* ── FIGMA pixel-perfect — node 614-4342 ──────────────────────────────
     Outer:  w-135 h-46 p-8 · drop-shadow(0 4px 3px #99A1AF4D)
     Inner:  border-2 #cfbaff · pt-13.91 pb-15.09 px-10 · overflow-clip
     Fill:   absolute inset-0 rgba(73,69,80,0.4)
     Shine:  absolute inset:[0_0.5px_0_0] grad white/14 → transparent 55%
     Shadow: inset 0 1px 0 0 rgba(255,255,255,0.15)
     Text:   Plus Jakarta Sans 600 12px lh-16 white text-shadow 0 1 3 #00000040
     Badge:  pvbtn-icon technique — circle oklch(1 0 0 / 0.20) 26px
  ─────────────────────────────────────────────────────────────────────── */
  .pcond-fig {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    /* pill + text-only: exact Figma inner padding */
    padding: 13.91px 10px 15.09px;
    width: 135px; min-height: 46px; height: auto;
    box-sizing: border-box;
    border-radius: 9999px;
    border: 2px solid transparent;
    /* VYStrokes3 gradient border — dual-layer technique:
       fill = rgba(73,69,80,0.40) · border = CFBAFF→FFFFFF→AE8EFF→CFBAFF */
    background-image:
      linear-gradient(oklch(0.33 0.02 290 / 0.40), oklch(0.33 0.02 290 / 0.40)),
      linear-gradient(135deg,
        oklch(0.78 0.13 300) 0%,
        oklch(0.85 0.10 300) 38%,
        oklch(0.70 0.17 295) 68%,
        oklch(0.78 0.13 300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    overflow: hidden;
    filter: drop-shadow(0px 4px 3px oklch(0.65 0.013 237 / 0.30));
    box-shadow: inset 0px 1px 0px 0px oklch(1 0 0 / 0.15);
    user-select: none;
  }
  /* shine overlay — inset: top:0 right:0.5px bottom:0 left:0 */
  .pcond-fig::before {
    content: ''; position: absolute;
    top: 0; right: 0.5px; bottom: 0; left: 0;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.14) 0%, transparent 55%);
    pointer-events: none;
  }
  /* text label */
  .pcond-fig-label {
    flex: 1 0 0; min-width: 1px;
    font-family: var(--vmc-font-display); font-size: 12px;
    font-weight: 600; line-height: 16px;
    color: oklch(1 0 0); text-align: center;
    text-shadow: 0px 1px 3px oklch(0 0 0 / 0.25);
    word-break: break-word;
    position: relative; z-index: 1;
  }
  /* badge variant — flex row, pill expande ancho para no apretar el texto */
  .pcond-fig--badge {
    padding: 8px 12px 8px 8px;
    gap: 6px;
    justify-content: center;
    width: auto; min-width: 135px;
    min-height: 46px; height: auto;
  }
  /* check icon dentro del badge — ~16px */
  .pcond-fig-badge > svg,
  .pcond-fig-badge--v2 > svg { width: 14px; height: 11px; }
  /* badge circle v1 — pvbtn-icon: 32×32 r16, bg white/20, color white */
  .pcond-fig-badge {
    width: 32px; height: 32px;
    border-radius: 16px;
    background: oklch(1 0 0 / 0.20);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: oklch(1 0 0);
    position: relative; z-index: 2;
  }
  /* badge circle v2 — gradiente VYStrokes3 (135deg, opaco) · check vault oscuro */
  .pcond-fig-badge--v2 {
    width: 32px; height: 32px;
    border-radius: 16px;
    background: linear-gradient(135deg,
      oklch(0.80 0.12 300) 0%,
      oklch(0.88 0.09 300) 35%,
      oklch(0.72 0.16 295) 65%,
      oklch(0.80 0.12 300) 100%
    );
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: oklch(0.30 0.20 285);
    position: relative; z-index: 2;
    box-shadow: 0 1px 4px oklch(0.73 0.15 295 / 0.40);
  }
  .pcond-fig--inactive { opacity: 0.38; }
`;

const CONDITION_ITEMS_BP = [
  { label: "Con Precio Reserva",               initialActive: true  },
  { label: "Con Opción a Visitas",             initialActive: true  },
  { label: "Con Comisión",                     initialActive: true  },
  { label: "Cuota mínima de participantes: 2", initialActive: true  },
  { label: "Sin Opción a Financiamiento",      initialActive: false },
] as const;

function CheckIconBP(): JSX.Element {
  return (
    <svg width={10} height={10} viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 6 5 9 10 3" />
    </svg>
  );
}

/* ════════════════════════════════════════════════
   CHECK ICONS — 5 opciones modernas
════════════════════════════════════════════════ */

/** A — Thin classic: trazo 1.5px, ángulo 45° */
function CheckA(): JSX.Element {
  return (
    <svg width="10" height="8" viewBox="0 0 12 9" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4.5 4.5,8 11,1" />
    </svg>
  );
}

/** B — Bold rounded: trazo 2.5px, compacto */
function CheckB(): JSX.Element {
  return (
    <svg width="10" height="8" viewBox="0 0 11 9" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5,4.5 4,7.5 9.5,1.5" />
    </svg>
  );
}

/** C — Circle outline: check dentro de aro */
function CheckC(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <polyline points="5,8 7,10.5 11,5.5" />
    </svg>
  );
}

/** D — Circle filled: disco semi-transparente + check */
function CheckD(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.22" />
      <polyline points="5,8 7,10.5 11,5.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** E — Long minimal: span ancho, trazo fino — estilo luxury */
function CheckE(): JSX.Element {
  return (
    <svg width="12" height="8" viewBox="0 0 14 9" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4.5 5,8 13,1" />
    </svg>
  );
}

type CheckType = "A" | "B" | "C" | "D" | "E" | "none";

const CHECK_ICONS: Record<Exclude<CheckType, "none">, () => JSX.Element> = {
  A: CheckA,
  B: CheckB,
  C: CheckC,
  D: CheckD,
  E: CheckE,
};

const CHECK_LABELS: Record<Exclude<CheckType, "none">, string> = {
  A: "A — thin 1.8px",
  B: "B — bold 2.5px",
  C: "C — circle ring",
  D: "D — circle fill",
  E: "E — long minimal",
};

/* ── Variante ACTUAL (vault gradient) ── */
interface CPillProps { label: string; isActive: boolean; showCheck: boolean; spanFull?: boolean; }

function CPill({ label, isActive, showCheck, spanFull }: CPillProps): JSX.Element {
  const style: React.CSSProperties = {};
  if (spanFull) { style.gridColumn = "1 / -1"; }
  const cls = isActive ? "pcond pcond--active" : "pcond pcond--inactive";
  return (
    <div className={cls} style={style}>
      {showCheck && isActive && (
        <span className="pcond-icon"><CheckA /></span>
      )}
      {label}
    </div>
  );
}

interface CPillGridProps { showCheck: boolean; }

function CPillGrid({ showCheck }: CPillGridProps): JSX.Element {
  const isOdd = CONDITION_ITEMS_BP.length % 2 !== 0;
  return (
    <div style={{
      background: "var(--vmc-color-background-card, oklch(1 0 0))",
      borderRadius: 8, border: "1px solid oklch(0.22 0.18 285 / 0.07)",
      boxShadow: "0 2px 10px oklch(0.22 0.18 285 / 0.06)",
      padding: "4px 6px", width: 311,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {CONDITION_ITEMS_BP.map(function renderCPill(item, i) {
          const isLastOdd = isOdd && (i === CONDITION_ITEMS_BP.length - 1);
          return (
            <CPill
              key={item.label}
              label={item.label}
              isActive={item.initialActive}
              showCheck={showCheck}
              spanFull={isLastOdd}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Variante FIGMA pixel-perfect — acepta tipo de check + variante de badge ── */
interface FigPillProps {
  label: string;
  isActive: boolean;
  checkType: CheckType;
  badgeVariant?: "v1" | "v2";
}

function FigPill({ label, isActive, checkType, badgeVariant = "v1" }: FigPillProps): JSX.Element {
  const hasBadge = checkType !== "none" && isActive;
  const IconKey = hasBadge ? checkType as Exclude<CheckType, "none"> : null;
  const IconComponent = IconKey ? CHECK_ICONS[IconKey] : null;

  let cls = "pcond-fig";
  if (hasBadge) { cls = "pcond-fig pcond-fig--badge"; }
  if (!isActive) { cls = `${cls} pcond-fig--inactive`; }

  const badgeCls = badgeVariant === "v2" ? "pcond-fig-badge--v2" : "pcond-fig-badge";

  return (
    <div className={cls}>
      {IconComponent && (
        <span className={badgeCls}><IconComponent /></span>
      )}
      <span className="pcond-fig-label">{label}</span>
    </div>
  );
}

interface FigPillGridProps { checkType: CheckType; badgeVariant?: "v1" | "v2"; }

function FigPillGrid({ checkType, badgeVariant = "v1" }: FigPillGridProps): JSX.Element {
  const activeItems = CONDITION_ITEMS_BP.filter(function isActive(item) {
    return item.initialActive;
  });
  return (
    <div style={{
      background: "var(--vmc-color-background-card, oklch(1 0 0))",
      borderRadius: 8, border: "1px solid oklch(0.22 0.18 285 / 0.07)",
      boxShadow: "0 2px 10px oklch(0.22 0.18 285 / 0.06)",
      padding: "12px 10px",
      display: "flex", flexDirection: "column" as const, gap: 8, alignItems: "center",
    }}>
      {activeItems.map(function renderFigPill(item) {
        return (
          <FigPill
            key={item.label}
            label={item.label}
            isActive={true}
            checkType={checkType}
            badgeVariant={badgeVariant}
          />
        );
      })}
    </div>
  );
}

export default function ButtonPrimaryPreviewPage(): JSX.Element {
  return (
    <main style={{
      background: "var(--vmc-color-background-secondary)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      padding: "40px 0",
    }}>
      <style dangerouslySetInnerHTML={{ __html: BUTTON_CSS }} />

      <div style={{
        width: 820,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        outline: "1px solid rgb(0% 0% 0% / 0.10)",
        boxShadow: "0 8px 32px rgb(0% 0% 0% / 0.10)",
      }}>

        {/* ── Page nav ── */}
        <div style={{ background: "oklch(0.22 0.18 285)", padding: "0 24px",
          display: "flex", alignItems: "center", gap: 0 }}>
          <a href="/preview/components/button-primary"
            style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.09em",
              color: "oklch(1 0 0)", textDecoration: "none",
              padding: "10px 16px 10px 0",
              borderBottom: "2px solid oklch(1 0 0)",
              opacity: 1 }}>
            BORRADOR
          </a>
          <span style={{ color: "oklch(1 0 0 / 0.25)", padding: "0 8px", fontSize: 11 }}>·</span>
          <a href="/preview/components/pase1"
            style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.09em",
              color: "oklch(1 0 0 / 0.55)", textDecoration: "none",
              padding: "10px 0",
              borderBottom: "2px solid transparent" }}>
            PASE 1 →
          </a>
        </div>

        {/* ── Page header ── */}
        <div style={{ background: "var(--vmc-color-background-card)", padding: "16px 24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.10em",
            color: "var(--vmc-color-text-primary)", margin: "0 0 2px" }}>
            BORRADOR — Componentes Voyager DS
          </p>
          <p style={{ fontFamily: F, fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
            Mix Cinematic + Tactile · v2.0 · trabajo en progreso
          </p>
        </div>

        {/* ─────────────────────────────────────────────
            0. BUTTON — Unified system (pbtn)
        ───────────────────────────────────────────── */}
        <SectionLabel title="Button" subtitle="Primary · Secondary · Ghost · SM / MD / LG · Default / Hover / Focus / Pressed / Disabled / Loading · Icon Left · Right · Only · Full Width" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)",
          display: "flex", flexDirection: "column", gap: 0 }}>

          {/* ── Shared row-label style ── */}

          {/* ── PRIMARY — SM / MD / LG × all states ── */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "oklch(0.22 0.18 285)",
              textTransform: "uppercase" as const, letterSpacing: "0.10em", margin: "0 0 16px" }}>
              Primary
            </p>

            {(["sm","md","lg"] as const).map(function renderPrimarySize(sz) {
              const w = sz === "sm" ? 128 : sz === "md" ? 186 : 218;
              const label = sz === "sm" ? "SM — 36px" : sz === "md" ? "MD — 186×48" : "LG — 56px";
              return (
                <div key={sz} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "oklch(0.38 0.04 280 / 0.45)", margin: "0 0 8px" }}>{label}</p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const }}>
                    <button className={`pbtn pbtn--primary pbtn--${sz}`} type="button" style={{ minWidth: w }}>Default</button>
                    <button className={`pbtn pbtn--primary pbtn--${sz} pbtn--hover`} type="button" style={{ minWidth: w }}>Hover</button>
                    <button className={`pbtn pbtn--primary pbtn--${sz} pbtn--focus`} type="button" style={{ minWidth: w }}>Focus</button>
                    <button className={`pbtn pbtn--primary pbtn--${sz} pbtn--pressed`} type="button" style={{ minWidth: w }}>Pressed</button>
                    <button className={`pbtn pbtn--primary pbtn--${sz} pbtn--disabled`} type="button" aria-disabled="true" style={{ minWidth: w }}>Disabled</button>
                    <button className={`pbtn pbtn--primary pbtn--${sz} pbtn--loading`} type="button" aria-label="Cargando" style={{ minWidth: w }}></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── SECONDARY — SM / MD / LG × all states ── */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "oklch(0.22 0.18 285)",
              textTransform: "uppercase" as const, letterSpacing: "0.10em", margin: "0 0 16px" }}>
              Secondary
            </p>

            {(["sm","md","lg"] as const).map(function renderSecondarySize(sz) {
              const w = sz === "sm" ? 128 : sz === "md" ? 186 : 218;
              const label = sz === "sm" ? "SM — 36px" : sz === "md" ? "MD — 186×48" : "LG — 56px";
              return (
                <div key={sz} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "oklch(0.38 0.04 280 / 0.45)", margin: "0 0 8px" }}>{label}</p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const }}>
                    <button className={`pbtn pbtn--secondary pbtn--${sz}`} type="button" style={{ minWidth: w }}>Default</button>
                    <button className={`pbtn pbtn--secondary pbtn--${sz} pbtn--hover`} type="button" style={{ minWidth: w }}>Hover</button>
                    <button className={`pbtn pbtn--secondary pbtn--${sz} pbtn--focus`} type="button" style={{ minWidth: w }}>Focus</button>
                    <button className={`pbtn pbtn--secondary pbtn--${sz} pbtn--pressed`} type="button" style={{ minWidth: w }}>Pressed</button>
                    <button className={`pbtn pbtn--secondary pbtn--${sz} pbtn--disabled`} type="button" aria-disabled="true" style={{ minWidth: w }}>Disabled</button>
                    <button className={`pbtn pbtn--secondary pbtn--${sz} pbtn--loading`} type="button" aria-label="Cargando" style={{ minWidth: w }}></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── GHOST — SM / MD / LG × all states — on live bg ── */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "oklch(0.22 0.18 285)",
              textTransform: "uppercase" as const, letterSpacing: "0.10em", margin: "0 0 16px" }}>
              Ghost <span style={{ fontWeight: 400, fontSize: 9, opacity: 0.6 }}>· sobre fondo live</span>
            </p>

            {(["sm","md","lg"] as const).map(function renderGhostSize(sz) {
              const w = sz === "sm" ? 128 : sz === "md" ? 186 : 218;
              const label = sz === "sm" ? "SM — 36px" : sz === "md" ? "MD — 186×48" : "LG — 56px";
              return (
                <div key={sz} style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "oklch(0.38 0.04 280 / 0.45)", margin: "0 0 8px" }}>{label}</p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const,
                    background: "oklch(0.72 0.16 55)", padding: "12px 16px", borderRadius: 8 }}>
                    <button className={`pbtn pbtn--ghost pbtn--${sz}`} type="button" style={{ minWidth: w }}>Default</button>
                    <button className={`pbtn pbtn--ghost pbtn--${sz} pbtn--hover`} type="button" style={{ minWidth: w }}>Hover</button>
                    <button className={`pbtn pbtn--ghost pbtn--${sz} pbtn--focus`} type="button" style={{ minWidth: w }}>Focus</button>
                    <button className={`pbtn pbtn--ghost pbtn--${sz} pbtn--pressed`} type="button" style={{ minWidth: w }}>Pressed</button>
                    <button className={`pbtn pbtn--ghost pbtn--${sz} pbtn--disabled`} type="button" aria-disabled="true" style={{ minWidth: w }}>Disabled</button>
                    <button className={`pbtn pbtn--ghost pbtn--${sz} pbtn--loading`} type="button" aria-label="Cargando" style={{ minWidth: w }}></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row: ICON LEFT — all 3 sizes (Primary) */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.08em",
              color: "oklch(0.38 0.04 280 / 0.5)", marginBottom: 8, marginTop: 0 }}>
              Icon Left — Primary
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="pbtn pbtn--primary pbtn--sm pbtn--has-icon" type="button">
                <span className="pbtn-icon">{STAR_ICON_SM}</span>
                Label
              </button>
              <button className="pbtn pbtn--primary pbtn--md pbtn--has-icon" type="button">
                <span className="pbtn-icon">{STAR_ICON_MD}</span>
                Label
              </button>
              <button className="pbtn pbtn--primary pbtn--lg pbtn--has-icon" type="button">
                <span className="pbtn-icon">{STAR_ICON_LG}</span>
                Label
              </button>
            </div>
          </div>

          {/* Row: ICON RIGHT — all 3 sizes (Primary) */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.08em",
              color: "oklch(0.38 0.04 280 / 0.5)", marginBottom: 8, marginTop: 0 }}>
              Icon Right — Primary
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="pbtn pbtn--primary pbtn--sm pbtn--has-icon" type="button">
                Label
                <span className="pbtn-icon">{ARROW_ICON_SM}</span>
              </button>
              <button className="pbtn pbtn--primary pbtn--md pbtn--has-icon" type="button">
                Label
                <span className="pbtn-icon">{ARROW_ICON_MD}</span>
              </button>
              <button className="pbtn pbtn--primary pbtn--lg pbtn--has-icon" type="button">
                Label
                <span className="pbtn-icon">{ARROW_ICON_LG}</span>
              </button>
            </div>
          </div>

          {/* Row: ICON ONLY — all 3 sizes (Primary) */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.08em",
              color: "oklch(0.38 0.04 280 / 0.5)", marginBottom: 8, marginTop: 0 }}>
              Icon Only — Primary
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="pbtn pbtn--primary pbtn--sm pbtn--icon-only" type="button" aria-label="Acción">
                {STAR_ICON_SM}
              </button>
              <button className="pbtn pbtn--primary pbtn--md pbtn--icon-only" type="button" aria-label="Acción">
                {STAR_ICON_MD}
              </button>
              <button className="pbtn pbtn--primary pbtn--lg pbtn--icon-only" type="button" aria-label="Acción">
                {STAR_ICON_LG}
              </button>
            </div>
          </div>

          {/* Row: FULL WIDTH */}
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.08em",
              color: "oklch(0.38 0.04 280 / 0.5)", marginBottom: 8, marginTop: 0 }}>
              Full Width
            </p>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <button className="pbtn pbtn--primary pbtn--md pbtn--full" type="button">Full Width</button>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────
            1. MD — Primary + Secondary
        ───────────────────────────────────────────── */}
        <SectionLabel title="MD · Primary & Secondary" subtitle="48px · Participa / Ingresa" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-orange-500)", margin: 0 }}>
              Primary
            </p>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-vault-400)", margin: 0 }}>
              Secondary
            </p>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-orange-600)", margin: 0 }}>
              Ghost <span style={{ fontWeight: 400, opacity: 0.6 }}>· sobre live</span>
            </p>
          </div>

          {/* State rows */}
          {(["Default", "Hover", "Pressed", "Disabled"] as const).map(function renderRow(state) {
            const isHover    = state === "Hover";
            const isPressed  = state === "Pressed";
            const isDisabled = state === "Disabled";
            return (
              <div key={state} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12, marginBottom: 12, alignItems: "flex-end" }}>
                <StateCol label={state}>
                  <button
                    className={`pvbtn${isHover ? " pvbtn--hover" : ""}${isPressed ? " pvbtn--pressed" : ""}`}
                    type="button"
                    disabled={isDisabled}
                  >
                    Participa
                  </button>
                </StateCol>
                <StateCol label={state}>
                  <button
                    className={`psec${isHover ? " psec--hover" : ""}${isPressed ? " psec--pressed" : ""}`}
                    type="button"
                    disabled={isDisabled}
                  >
                    Ingresa
                  </button>
                </StateCol>
                <StateCol label={state}>
                  <div style={{ background: "var(--vmc-color-orange-500)",
                    borderRadius: 8, padding: "12px 16px", display: "inline-block" }}>
                    <button
                      className={`pghost${isHover ? " pghost--hover" : ""}${isPressed ? " pghost--pressed" : ""}`}
                      type="button"
                      disabled={isDisabled}
                    >
                      Ver ofertas
                    </button>
                  </div>
                </StateCol>
              </div>
            );
          })}
        </div>

        {/* Live demo MD */}
        <div style={{ background: "var(--vmc-color-background-card)", padding: "24px",
          display: "flex", flexDirection: "column", gap: 10,
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
            Demo interactivo
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "16px 0" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MdPrimaryDemo />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MdSecondaryDemo />
            </div>
            <div style={{ display: "flex", justifyContent: "center",
              background: "var(--vmc-color-orange-500)", borderRadius: 8, padding: "12px" }}>
              <MdGhostDemo />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            1b. MD — Negociar (cyan→vault)
        ───────────────────────────────────────────── */}
        <SectionLabel title="MD · Negociar" subtitle="48px · cyan→vault · mismo patrón que Primary" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {(["Default", "Hover", "Pressed", "Disabled"] as const).map(function renderNegRow(state) {
              const isHover    = state === "Hover";
              const isPressed  = state === "Pressed";
              const isDisabled = state === "Disabled";
              return (
                <StateCol key={state} label={state}>
                  <button
                    className={`pvbtn-neg${isHover ? " pvbtn-neg--hover" : ""}${isPressed ? " pvbtn-neg--pressed" : ""}`}
                    type="button"
                    disabled={isDisabled}
                  >
                    Negociar
                  </button>
                </StateCol>
              );
            })}
          </div>
        </div>

        {/* Live demo Negociar */}
        <div style={{ background: "var(--vmc-color-background-card)", padding: "24px",
          display: "flex", flexDirection: "column", gap: 10,
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
            Demo interactivo
          </p>
          <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
            <MdNegociarDemo />
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            1c. Secondary — Agenda tu visita
        ───────────────────────────────────────────── */}
        <SectionLabel title="Secondary · Agenda tu visita" subtitle="160×40px · vault · ícono calendario · círculo white/20" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          display: "flex", gap: 24, flexWrap: "wrap" as const, alignItems: "flex-end",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <StateCol label="Default"><AgendaVisitaBtn /></StateCol>
          <StateCol label="Hover">
            <button className="psec-agenda psec-agenda--hover" type="button" style={{ transform: "translateY(-1px) scale(1.02)" }}>
              <span className="psec-agenda-icon"><CalendarIcon /></span>
              <span className="psec-agenda-label">Agenda tu visita</span>
            </button>
          </StateCol>
          <StateCol label="Disabled">
            <button className="psec-agenda" type="button" disabled>
              <span className="psec-agenda-icon"><CalendarIcon /></span>
              <span className="psec-agenda-label">Agenda tu visita</span>
            </button>
          </StateCol>
        </div>

        {/* ─────────────────────────────────────────────
            2. SM — "Ingresa" (Guest)
        ───────────────────────────────────────────── */}
        <SectionLabel title="SM · Ingresa — Guest" subtitle="40px · icono usuario · header nav" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          display: "flex", gap: 20, flexWrap: "wrap",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <StateCol label="Default">
            <button className="pvbtn-sm" type="button">
              <span className="pvbtn-icon">{USER_ICON}</span>
              Ingresa
            </button>
          </StateCol>
          <StateCol label="Hover">
            <button className="pvbtn-sm pvbtn-sm--hover" type="button">
              <span className="pvbtn-icon">{USER_ICON}</span>
              Ingresa
            </button>
          </StateCol>
          <StateCol label="Pressed">
            <button className="pvbtn-sm pvbtn-sm--pressed" type="button">
              <span className="pvbtn-icon">{USER_ICON}</span>
              Ingresa
            </button>
          </StateCol>
        </div>

        {/* Live demo SM */}
        <div style={{ background: "var(--vmc-color-background-card)", padding: "24px",
          display: "flex", flexDirection: "column", gap: 10,
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
            Demo interactivo
          </p>
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
            <SmIngresaDemo />
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            3. SM — Logged In (sobre vault)
        ───────────────────────────────────────────── */}
        <SectionLabel title="SM · Logged In — sobre header vault" subtitle="40px · Primary Clone · Default / Hover / Pressed / Focus" dark />

        <div style={{ background: "var(--vmc-color-vault-900)", padding: "20px 24px",
          borderBottom: "1px solid rgb(100% 100% 100% / 0.08)" }}>

          {/* State grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
            marginBottom: 24 }}>
            {(["Default", "Hover", "Pressed", "Focus"] as const).map(function colHeader(s) {
              return (
                <p key={s} style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "rgb(100% 100% 100% / 0.35)", margin: 0, textAlign: "center" }}>
                  {s}
                </p>
              );
            })}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="pvbtn-auth-d" type="button">
                <span className="pvbtn-auth-d-icon">{USER_ICON}</span>
                Bienvenido,{" "}
                <span className="pvbtn-auth-d-username">ZAEX5G</span>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="pvbtn-auth-d pvbtn-auth-d--hover" type="button">
                <span className="pvbtn-auth-d-icon">{USER_ICON}</span>
                Bienvenido,{" "}
                <span className="pvbtn-auth-d-username">ZAEX5G</span>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="pvbtn-auth-d pvbtn-auth-d--pressed" type="button">
                <span className="pvbtn-auth-d-icon">{USER_ICON}</span>
                Bienvenido,{" "}
                <span className="pvbtn-auth-d-username">ZAEX5G</span>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="pvbtn-auth-d pvbtn-auth-d--focus" type="button">
                <span className="pvbtn-auth-d-icon">{USER_ICON}</span>
                Bienvenido,{" "}
                <span className="pvbtn-auth-d-username">ZAEX5G</span>
              </button>
            </div>
          </div>

          {/* Demo interactivo */}
          <div style={{ borderTop: "1px solid rgb(100% 100% 100% / 0.08)", paddingTop: 16 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "rgb(100% 100% 100% / 0.30)", margin: "0 0 14px" }}>
              Demo interactivo
            </p>
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px" }}>
              <button className="pvbtn-auth-d" type="button">
                <span className="pvbtn-auth-d-icon">{USER_ICON}</span>
                Bienvenido,{" "}
                <span className="pvbtn-auth-d-username">ZAEX5G</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            4. LikeButton
        ───────────────────────────────────────────── */}
        <SectionLabel title="LikeButton" subtitle="3 tamaños · Default / Hover / Active / Disabled / Skeleton" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 1fr 1fr 1fr 1fr",
            marginBottom: 16, alignItems: "center" }}>
            <span />
            {(["Default", "Hover", "Active", "Disabled", "Skeleton"] as const).map(function col(s) {
              return (
                <p key={s} style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "var(--vmc-color-text-tertiary)", margin: 0, textAlign: "center" }}>
                  {s}
                </p>
              );
            })}
          </div>

          {/* Size rows */}
          {([
            { label: "Small",  cls: "plike--sm", icon: 13 },
            { label: "Medium", cls: "plike--md", icon: 19 },
            { label: "Large",  cls: "plike--lg", icon: 27 },
          ] as const).map(function sizeRow({ label, cls, icon }) {
            return (
              <div key={label} style={{ display: "grid",
                gridTemplateColumns: "72px 1fr 1fr 1fr 1fr 1fr",
                marginBottom: 20, alignItems: "center" }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600,
                  color: "var(--vmc-color-text-secondary)", margin: 0 }}>
                  {label}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={`plike ${cls}`} type="button" aria-label="Me gusta">
                    <HeartOutline size={icon} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={`plike ${cls} plike--hover`} type="button" aria-label="Me gusta">
                    <HeartOutline size={icon} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={`plike ${cls} plike--active`} type="button" aria-label="Me gusta">
                    <HeartFilledWhite size={icon} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={`plike ${cls} plike--disabled`} type="button" aria-label="Me gusta" disabled>
                    <HeartOutline size={icon} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={`plike ${cls} plike--skeleton`} type="button" aria-label="Me gusta" />
                </div>
              </div>
            );
          })}

          {/* Demo interactivo — click para toggle */}
          <div style={{ borderTop: "1px solid var(--vmc-color-vault-utility-ghost)",
            paddingTop: 16, marginTop: 4 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-text-tertiary)", margin: "0 0 14px" }}>
              Demo interactivo — click para toggle + heart pop
            </p>
            <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center",
              padding: "16px 0" }}>
              <LikeDemo cls="plike--sm" icon={13} />
              <LikeDemo cls="plike--md" icon={19} />
              <LikeDemo cls="plike--lg" icon={27} />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            5. PriceIcon
        ───────────────────────────────────────────── */}
        <SectionLabel title="PriceIcon" subtitle="Contact shadow · Default / Disabled / Skeleton" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 1fr 1fr",
            gap: 0, alignItems: "center", marginBottom: 4 }}>
            <span />
            {(["Default", "Disabled", "Skeleton"] as const).map(function h(s) {
              return (
                <p key={s} style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.07em",
                  color: "var(--vmc-color-text-tertiary)", margin: "0 0 10px",
                  textAlign: "center" }}>
                  {s}
                </p>
              );
            })}
          </div>

          {([
            { label: "Small",  sizeCls: "pprice--sm", wrapCls: "pprice-wrap--sm", icon: 13 },
            { label: "Medium", sizeCls: "pprice--md", wrapCls: "pprice-wrap--md", icon: 19 },
            { label: "Large",  sizeCls: "pprice--lg", wrapCls: "pprice-wrap--lg", icon: 27 },
          ] as const).map(function sizeRow({ label, sizeCls, wrapCls, icon }) {
            return (
              <div key={label} style={{ display: "grid",
                gridTemplateColumns: "72px 1fr 1fr 1fr",
                marginBottom: 20, alignItems: "center" }}>
                <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600,
                  color: "var(--vmc-color-text-secondary)", margin: 0 }}>
                  {label}
                </p>
                {/* Default */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`pprice-wrap ${wrapCls}`}>
                    <button className={`pprice ${sizeCls}`} type="button">
                      <DollarIcon size={icon} />
                    </button>
                    <div className="pprice-base" />
                  </div>
                </div>
                {/* Disabled — shelf invisible, mantiene posición en Y */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`pprice-wrap ${wrapCls} pprice-wrap--disabled`}>
                    <button className={`pprice ${sizeCls}`} type="button" disabled>
                      <DollarIcon size={icon} />
                    </button>
                    <div className="pprice-base" />
                  </div>
                </div>
                {/* Skeleton — bola gris simple, sin shelf */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`pprice-wrap ${wrapCls} pprice-wrap--skeleton`}>
                    <button className={`pprice ${sizeCls}`} type="button" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────
            6. OfferType
        ───────────────────────────────────────────── */}
        <SectionLabel title="OfferType" subtitle="NEGOCIABLE · EN VIVO — Default / Hover / Focus" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
            marginBottom: 20 }}>
            {(["Default", "Hover", "Focus"] as const).map(function stateHeader(s) {
              return (
                <p key={s} style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "var(--vmc-color-text-tertiary)", margin: 0,
                  textAlign: "center" }}>
                  {s}
                </p>
              );
            })}
          </div>

          {/* NEGOCIABLE row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
            justifyItems: "center", marginBottom: 24 }}>
            {/* Default */}
            <div className="poftype poftype--negotiable">
              <div className="poftype-top">
                <span className="poftype-label">NEGOCIABLE</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
            {/* Hover */}
            <div className="poftype poftype--negotiable poftype--hover">
              <div className="poftype-top">
                <span className="poftype-label">NEGOCIABLE</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
            {/* Focus */}
            <div className="poftype poftype--negotiable poftype--focus">
              <div className="poftype-top">
                <span className="poftype-label">NEGOCIABLE</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
          </div>

          {/* EN VIVO row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
            justifyItems: "center" }}>
            {/* Default */}
            <div className="poftype poftype--live">
              <div className="poftype-top">
                <span className="poftype-label">EN VIVO</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
            {/* Hover */}
            <div className="poftype poftype--live poftype--hover">
              <div className="poftype-top">
                <span className="poftype-label">EN VIVO</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
            {/* Focus */}
            <div className="poftype poftype--live poftype--focus">
              <div className="poftype-top">
                <span className="poftype-label">EN VIVO</span>
              </div>
              <div className="poftype-bottom">
                <span className="poftype-cta">VER TODAS</span>
              </div>
            </div>
          </div>

          {/* Live demo */}
          <div style={{ marginTop: 24, padding: "16px 0 4px",
            borderTop: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-text-tertiary)", margin: "0 0 16px" }}>
              Live — hover + click
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <OfferTypeDemoCard variant="negotiable" label="NEGOCIABLE" />
              <OfferTypeDemoCard variant="live" label="EN VIVO" />
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────
            7. CategoryCard
        ───────────────────────────────────────────── */}
        <SectionLabel title="CategoryCard" subtitle="93×92px · icon-wrap vault · Default / Hover / Focus" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {(() => {
            const CATS = CATEGORY_ITEMS.map(function mapCat(c) {
              return { key: c.key, label: c.label, icon: c.icon(22) };
            });

            const STATES = [
              { label: "Default", mod: ""                },
              { label: "Hover",   mod: "pcatcard--hover" },
              { label: "Focus",   mod: "pcatcard--focus" },
            ] as const;

            return (
              <>
                {STATES.map(function stateRow({ label: stateLabel, mod }) {
                  return (
                    <div key={stateLabel} style={{ marginBottom: 16 }}>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: "var(--vmc-color-text-tertiary)", margin: "0 0 10px" }}>
                        {stateLabel}
                      </p>
                      <div style={{ display: "flex", gap: 12 }}>
                        {CATS.map(function catCard({ key, label, icon }) {
                          return (
                            <div key={key} className={`pcatcard ${mod}`}>
                              <div className="pcatcard-icon-wrap">{icon}</div>
                              <span className="pcatcard-label">{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Live demo */}
                <div style={{ marginTop: 8, paddingTop: 16,
                  borderTop: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "var(--vmc-color-text-tertiary)", margin: "0 0 12px" }}>
                    Live — hover + click
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {CATS.map(function liveCard({ key, label, icon }) {
                      return (
                        <CategoryCardDemo key={key} label={label} icon={icon} />
                      );
                    })}
                  </div>
                </div>
                {/* ── Equipos Diversos — candidatos de ícono ── */}
                <div style={{ marginTop: 8, paddingTop: 16,
                  borderTop: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "var(--vmc-color-text-tertiary)", margin: "0 0 14px" }}>
                    Equipos Diversos — candidatos de ícono
                  </p>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
                    {([
                      { key: "a", label: "A · Excavadora",  icon: <IconEquiposA size={22} /> },
                      { key: "b", label: "B · Montacargas", icon: <IconEquiposB size={22} /> },
                      { key: "c", label: "C · Grúa Torre",  icon: <IconEquiposC size={22} /> },
                      { key: "d", label: "D · Bulldozer",   icon: <IconEquiposD size={22} /> },
                    ] as const).map(function equipoOpt({ key, label, icon }) {
                      return (
                        <div key={key} style={{ display: "flex", flexDirection: "column",
                          alignItems: "center", gap: 8 }}>
                          <CategoryCardDemo label="EQUIPOS DIVERSOS" icon={icon} />
                          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600,
                            color: "var(--vmc-color-text-secondary)", margin: 0,
                            textAlign: "center" }}>
                            {label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}

        </div>

        {/* ─────────────────────────────────────────────
            PriceIcon 2 — Shimmer Lavanda
        ───────────────────────────────────────────── */}
        <SectionLabel title="PriceIcon 2" subtitle="Shimmer Lavanda · teal→lavanda→vault · SM / MD / LG" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "28px 32px" }}>
          {(function priceIcon2() {

            const SHIMMER = "linear-gradient(145deg, oklch(0.65 0.16 195) 0%, oklch(0.72 0.10 265) 40%, oklch(0.42 0.22 285) 75%, oklch(0.30 0.20 285) 100%)";

            /* ── Base diamante plano — SVG · proporción Figma · stroke = borde moneda ── */
            function DiamondBase({ coinPx }: { coinPx: number }): JSX.Element {
              const w  = Math.round(coinPx * 1.10);  /* más ancho que la moneda */
              const h  = Math.round(coinPx * 0.55);  /* altura ~55% del coin */
              const overlap = Math.round(h * 0.32);
              const sw = 2;   /* igual grosor que el borde del coin */
              const p  = sw / 2;
              const hw = w / 2;
              const hh = h / 2;
              const id = `dg${coinPx}`;
              return (
                <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
                  style={{ marginTop: -overlap, display: "block", overflow: "visible" }}>
                  <defs>
                    {/* Fill — mismo gradiente shimmer lavanda que la moneda */}
                    <linearGradient id={`${id}f`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="oklch(0.65 0.16 195)" />
                      <stop offset="40%"  stopColor="oklch(0.72 0.10 265)" />
                      <stop offset="75%"  stopColor="oklch(0.42 0.22 285)" />
                      <stop offset="100%" stopColor="oklch(0.30 0.20 285)" />
                    </linearGradient>
                    {/* Stroke — highlight ring idéntico al borde del coin */}
                    <linearGradient id={`${id}s`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="oklch(0.96 0.06 195)" />
                      <stop offset="25%"  stopColor="oklch(1.00 0.00 0)"   stopOpacity="0.90" />
                      <stop offset="50%"  stopColor="oklch(0.72 0.12 265)" />
                      <stop offset="75%"  stopColor="oklch(0.50 0.18 280)" />
                      <stop offset="100%" stopColor="oklch(0.96 0.06 195)" stopOpacity="0.60" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`${hw},${p} ${w-p},${hh} ${hw},${h-p} ${p},${hh}`}
                    fill={`url(#${id}f)`}
                    stroke={`url(#${id}s)`}
                    strokeWidth={sw}
                    strokeLinejoin="round"
                  />
                </svg>
              );
            }

            /* SM=16px → 24×24 · MD=26px → 36×36 · LG=40px → ~56×56 */
            const sizes: { label: string; coinPx: number; icon: number; frame: string }[] = [
              { label: "Small",  coinPx: 24, icon: 10, frame: "28×28px" },
              { label: "Medium", coinPx: 32, icon: 14, frame: "36×36px" },
              { label: "Large",  coinPx: 52, icon: 22, frame: "~56×56px" },
            ];

            return (
              <div style={{ display: "flex", gap: 56, alignItems: "flex-end" }}>
                {sizes.map(function renderSize({ label, coinPx, icon, frame }) {
                  return (
                    <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                          textTransform: "uppercase" as const, letterSpacing: "0.08em",
                          color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
                          {label}
                        </p>
                        <p style={{ fontFamily: F, fontSize: 9,
                          color: "oklch(0.65 0.02 220)", margin: 0 }}>
                          {frame}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                        filter: "drop-shadow(0px 1px 2px oklch(0 0 0 / 0.02))" }}>
                        <button className="pprice pprice--shimmer" type="button" aria-label="precio"
                          style={{ width: coinPx, height: coinPx, position: "relative", zIndex: 2 }}>
                          <DollarIcon size={icon} />
                        </button>
                        <DiamondBase coinPx={coinPx} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* ─────────────────────────────────────────────
            8. PriceTag
        ───────────────────────────────────────────── */}
        <SectionLabel title="PriceTag" subtitle="vault pill · icono teal + precio · SM / MD / LG" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 1fr 1fr",
            gap: 0, alignItems: "center", marginBottom: 4 }}>
            <span />
            {(["Default", "Disabled", "Skeleton"] as const).map(function h(s) {
              return (
                <p key={s} style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.07em",
                  color: "var(--vmc-color-text-tertiary)", margin: "0 0 10px",
                  textAlign: "center" }}>
                  {s}
                </p>
              );
            })}
          </div>

          {([
            { label: "Small",  sizeCls: "ptag--sm", icon: 7  },
            { label: "Medium", sizeCls: "ptag--md", icon: 9  },
            { label: "Large",  sizeCls: "ptag--lg", icon: 11 },
          ] as const).map(function sizeRow({ label, sizeCls, icon }) {
            return (
              <div key={label} style={{ display: "grid",
                gridTemplateColumns: "72px 1fr 1fr 1fr",
                marginBottom: 20, alignItems: "center" }}>
                <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600,
                  color: "var(--vmc-color-text-secondary)", margin: 0 }}>
                  {label}
                </p>
                {/* Default */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`ptag ${sizeCls}`}>
                    <div className="ptag-icon">
                      <DollarIcon size={icon} />
                    </div>
                    <div className="ptag-text">
                      <span className="ptag-currency">US$</span>
                      <span className="ptag-amount">14,999</span>
                    </div>
                  </div>
                </div>
                {/* Disabled */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`ptag ${sizeCls} ptag--disabled`}>
                    <div className="ptag-icon">
                      <DollarIcon size={icon} />
                    </div>
                    <div className="ptag-text">
                      <span className="ptag-currency">US$</span>
                      <span className="ptag-amount">14,999</span>
                    </div>
                  </div>
                </div>
                {/* Skeleton */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`ptag ${sizeCls} ptag--skeleton`}>
                    <div className="ptag-icon">
                      <DollarIcon size={icon} />
                    </div>
                    <div className="ptag-text">
                      <span className="ptag-currency">US$</span>
                      <span className="ptag-amount">14,999</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* ─────────────────────────────────────────────
            9. QuickFilter heading bracket — gradient options
        ───────────────────────────────────────────── */}
        <SectionLabel
          title="Section Heading — Bracket Gradient Options"
          subtitle="G1 vault→orange · G2 pure orange · G3 warm gold"
        />
        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>
          <div className="pqf-hd-demo">
            <div className="pqf-hd-demo-col">
              <p className="pqf-hd-demo-tag">G1 — vault → orange</p>
              <div className="pqf-heading"><BktTL /><BktBR />
                <span className="pqf-heading-text">Tipo de Oferta</span>
              </div>
            </div>
            <div className="pqf-hd-demo-col">
              <p className="pqf-hd-demo-tag">G2 — pure orange</p>
              <div className="pqf-heading pqf-heading--g2"><BktTL grad="g2" /><BktBR grad="g2" />
                <span className="pqf-heading-text">Tipo de Oferta</span>
              </div>
            </div>
            <div className="pqf-hd-demo-col">
              <p className="pqf-hd-demo-tag">G3 — warm gold</p>
              <div className="pqf-heading pqf-heading--g3"><BktTL grad="g3" /><BktBR grad="g3" />
                <span className="pqf-heading-text">Tipo de Oferta</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            9. QuickFilter
        ───────────────────────────────────────────── */}
        <SectionLabel
          title="QuickFilter"
          subtitle="766×180px · OfferType + CategoryCard · composición real"
        />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px" }}>

          {/* Static — default state */}
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--vmc-color-text-tertiary)", margin: "0 0 12px" }}>
            Default
          </p>
          <div className="pqf">
            <div className="pqf-section pqf-section--offer">
              <div className="pqf-heading"><BktTL /><BktBR />
                <span className="pqf-heading-text">Tipo de Oferta</span>
              </div>
              <div className="pqf-items">
                <div className="poftype poftype--live">
                  <div className="poftype-top">
                    <span className="poftype-label">EN VIVO</span>
                  </div>
                  <div className="poftype-bottom">
                    <span className="poftype-cta">VER TODAS</span>
                  </div>
                </div>
                <div className="poftype poftype--negotiable">
                  <div className="poftype-top">
                    <span className="poftype-label">NEGOCIABLE</span>
                  </div>
                  <div className="poftype-bottom">
                    <span className="poftype-cta">VER TODAS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pqf-section pqf-section--cats">
              <div className="pqf-heading"><BktTL /><BktBR />
                <span className="pqf-heading-text">Categorías</span>
              </div>
              <div className="pqf-items">
                {CATEGORY_ITEMS.map(function qfCatCard(c) {
                  return (
                    <div key={c.key} className="pcatcard">
                      <div className="pcatcard-icon-wrap">{c.icon(20)}</div>
                      <span className="pcatcard-label">{c.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live — interactive */}
          <div style={{ marginTop: 24, paddingTop: 20,
            borderTop: "1px solid var(--vmc-color-vault-utility-ghost)" }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--vmc-color-text-tertiary)", margin: "0 0 12px" }}>
              Live — hover + click en cada componente
            </p>
            <div className="pqf">
              <div className="pqf-section pqf-section--offer">
                <div className="pqf-heading"><BktTL /><BktBR />
                  <span className="pqf-heading-text">Tipo de Oferta</span>
                </div>
                <div className="pqf-items">
                  <OfferTypeDemoCard variant="live" label="EN VIVO" />
                  <OfferTypeDemoCard variant="negotiable" label="NEGOCIABLE" />
                </div>
              </div>

              <div className="pqf-section pqf-section--cats">
                <div className="pqf-heading"><BktTL /><BktBR />
                  <span className="pqf-heading-text">Categorías</span>
                </div>
                <div className="pqf-items">
                  {CATEGORY_ITEMS.map(function qfCatLive(c) {
                    return (
                      <CategoryCardDemo key={c.key} label={c.label} icon={c.icon(20)} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* ─────────────────────────────────────────────
            10. OfferCard
        ───────────────────────────────────────────── */}
        <SectionLabel title="OfferCard" subtitle="170×232px · medium · Col 1: En Vivo (5 estados) · Col 2: Negociable (3 estados)" />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "28px 32px" }}>
          {(function offerCards() {

            /* ── PriceIcon 2 SM — coin 24px + diamond base SVG ── */
            function OfferPriceIcon(): JSX.Element {
              const coin = 24;
              const w = Math.round(coin * 1.10);
              const h = Math.round(coin * 0.55);
              const overlap = Math.round(h * 0.32);
              const sw = 2;
              const p = sw / 2;
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                  filter: "drop-shadow(0px 1px 1px oklch(0 0 0 / 0.02))" }}>
                  <button className="pprice pprice--shimmer" type="button" aria-label="precio"
                    style={{ width: coin, height: coin, position: "relative", zIndex: 2 }}>
                    <DollarIcon size={10} />
                  </button>
                  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
                    style={{ marginTop: -overlap, display: "block", overflow: "visible" }}>
                    <defs>
                      <linearGradient id="opi-f" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="oklch(0.65 0.16 195)" />
                        <stop offset="40%"  stopColor="oklch(0.72 0.10 265)" />
                        <stop offset="75%"  stopColor="oklch(0.42 0.22 285)" />
                        <stop offset="100%" stopColor="oklch(0.30 0.20 285)" />
                      </linearGradient>
                      <linearGradient id="opi-s" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="oklch(0.84 0.10 195)" />
                        <stop offset="25%"  stopColor="oklch(1.00 0.00 0)"   stopOpacity="0.90" />
                        <stop offset="55%"  stopColor="oklch(0.62 0.14 265)" />
                        <stop offset="100%" stopColor="oklch(0.40 0.18 285)" stopOpacity="0.60" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points={`${w/2},${p} ${w-p},${h/2} ${w/2},${h-p} ${p},${h/2}`}
                      fill="url(#opi-f)" stroke="url(#opi-s)"
                      strokeWidth={sw} strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            }

            /* ── Pill badges ── */
            const PILL_LIVE = (
              <div className="pcard-pill pcard-pill--live">
                <div className="pcard-pill-dot" />
                EN VIVO
              </div>
            );
            const PILL_PROXIMA = (
              <div className="pcard-pill pcard-pill--proxima">
                <svg className="pcard-pill-clock" width="9" height="9" viewBox="0 0 24 24" fill="none"
                  stroke="oklch(1 0 0 / 0.90)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 15.5 14"/>
                </svg>
                PRÓXIMA
              </div>
            );

            /* ── Card with photo ── */
            function Card({ statusMod, pill, showPrice, disabled }: {
              statusMod: string; pill?: JSX.Element;
              showPrice: boolean; disabled?: boolean;
            }): JSX.Element {
              return (
                <div className={`pcard ${statusMod}${disabled ? " pcard--disabled" : ""}`}>
                  <div className="pcard__img">
                    <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    {pill && <div className="pcard__img-badge">{pill}</div>}
                  </div>
                  <div className="pcard__body">
                    <div className="pcard__meta">
                      <p className="pcard__name">Ford Bronco Sport</p>
                      <p className="pcard__year">2024</p>
                    </div>
                    {showPrice
                      ? (
                        <div className="pcard__price-row">
                          <div className="pcard__price-left">
                            <OfferPriceIcon />
                            <span className="pcard__price-text">US$ 9,999</span>
                          </div>
                          <LikeDemo cls="plike--sm" icon={14} />
                        </div>
                      ) : (
                        <div className="pcard__like-row">
                          <LikeDemo cls="plike--sm" icon={14} />
                        </div>
                      )
                    }
                  </div>
                </div>
              );
            }

            /* ── Skeleton card ── */
            function CardSkeleton({ statusMod }: { statusMod: string }): JSX.Element {
              return (
                <div className={`pcard ${statusMod} pcard--skeleton`}>
                  <div className="pcard__img" />
                  <div className="pcard__body">
                    <div className="pcard__meta">
                      <p className="pcard__name">&nbsp;</p>
                      <p className="pcard__year">&nbsp;</p>
                    </div>
                    <div className="pcard__price-row">
                      <div className="pcard__price-left">
                        <OfferPriceIcon />
                        <span className="pcard__price-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </div>
                      <button className="plike plike--sm" type="button" disabled aria-label="cargando"><HeartOutline size={14} /></button>
                    </div>
                  </div>
                </div>
              );
            }

            /* ── Label chip ── */
            function Chip({ text }: { text: string }): JSX.Element {
              return (
                <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "var(--vmc-color-text-tertiary)", margin: "0 0 10px" }}>
                  {text}
                </p>
              );
            }

            return (
              <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

                {/* ── Columna 1: EN VIVO ── */}
                <div>
                  <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.10em",
                    color: "oklch(0.72 0.16 55)", margin: "0 0 20px",
                    borderBottom: "2px solid oklch(0.72 0.16 55 / 0.20)", paddingBottom: 8 }}>
                    EN VIVO
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div><Chip text="Publicada" /><Card statusMod="pcard--live" showPrice /></div>
                    <div><Chip text="Live" /><Card statusMod="pcard--live" pill={PILL_LIVE} showPrice /></div>
                    <div><Chip text="Próxima" /><Card statusMod="pcard--live" pill={PILL_PROXIMA} showPrice /></div>
                    <div><Chip text="Disabled" /><Card statusMod="pcard--live" showPrice disabled /></div>
                    <div><Chip text="Skeleton" /><CardSkeleton statusMod="pcard--live" /></div>
                  </div>
                </div>

                {/* ── Columna 2: NEGOCIABLE ── */}
                <div>
                  <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.10em",
                    color: "oklch(0.78 0.14 195)", margin: "0 0 20px",
                    borderBottom: "2px solid oklch(0.78 0.14 195 / 0.30)", paddingBottom: 8 }}>
                    NEGOCIABLE
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div><Chip text="Publicada" /><Card statusMod="pcard--negotiable" showPrice={false} /></div>
                    <div><Chip text="Disabled" /><Card statusMod="pcard--negotiable" showPrice={false} disabled /></div>
                    <div><Chip text="Skeleton" /><CardSkeleton statusMod="pcard--negotiable" /></div>
                  </div>
                </div>

              </div>
            );
          })()}

        </div>

        {/* ─────────────────────────────────────────────
            PROPUESTAS OFFERCARD
        ───────────────────────────────────────────── */}
        <SectionLabel
          title="Propuestas OfferCard"
          subtitle="En Vivo · Publicada — upgrades aplicados · comparativa A/B"
        />

        <div style={{ background: "var(--vmc-color-background-card)", padding: "28px 32px" }}>
          {(function propuestasOfferCard() {

            const PILL_LIVE = (
              <div className="pcard-pill pcard-pill--live">
                <div className="pcard-pill-dot" />
                EN VIVO
              </div>
            );

            return (
              <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

                {/* ── A: Original ── */}
                <div>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "var(--vmc-color-text-tertiary)", margin: "0 0 12px" }}>
                    A · Original
                  </p>
                  <div className="pcard pcard--live" style={{ height: 232 }}>
                    <div className="pcard__img">
                      <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <div className="pcard__img-badge">{PILL_LIVE}</div>
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name">Ford Bronco Sport</p>
                        <p className="pcard__year">2024</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          <button className="pprice pprice--sm" type="button" aria-label="precio">
                            <DollarIcon size={14} />
                          </button>
                          <span className="pcard__price-text">US$ 9,999</span>
                        </div>
                        <LikeDemo cls="plike--sm" icon={14} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── B: Propuesta — scrim + brackets + uppercase + hover ── */}
                <div>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "oklch(0.72 0.16 55)", margin: "0 0 12px" }}>
                    B · Propuesta
                  </p>
                  <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232 }}>
                    <div className="pcard__img">
                      <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                        borderRadius: "8px 8px 0 0", pointerEvents: "none",
                      }} />
                      <div className="pcard__img-badge">{PILL_LIVE}</div>
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name">Ford Bronco Sport</p>
                        <p className="pcard__year">2024</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          <button className="pprice pprice--sm" type="button" aria-label="precio">
                            <DollarIcon size={14} />
                          </button>
                          <span className="pcard__price-text" style={{ color: "oklch(0.78 0.14 195)" }}>US$ 9,999</span>
                        </div>
                        <LikeDemo cls="plike--sm" icon={14} />
                      </div>
                    </div>
                    {/* gradiente vault→naranja como firma */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                      background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                      borderRadius: "0 0 8px 8px",
                    }} />
                  </div>
                </div>

                {/* ── C: Propuesta — todo + badge reposicionado bottom-left ── */}
                <div>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "oklch(0.72 0.16 55)", margin: "0 0 12px" }}>
                    C · Badge bottom-left
                  </p>
                  <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232 }}>
                    <div className="pcard__img">
                      <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                        borderRadius: "8px 8px 0 0", pointerEvents: "none",
                      }} />
                      <div style={{ position: "absolute", bottom: 8, left: 8, zIndex: 2 }}>
                        {PILL_LIVE}
                      </div>
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name">Ford Bronco Sport</p>
                        <p className="pcard__year">2024</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          <button className="pprice pprice--sm" type="button" aria-label="precio">
                            <DollarIcon size={14} />
                          </button>
                          <span className="pcard__price-text" style={{ color: "oklch(0.78 0.14 195)" }}>US$ 9,999</span>
                        </div>
                        <LikeDemo cls="plike--sm" icon={14} />
                      </div>
                    </div>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                      background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                      borderRadius: "0 0 8px 8px",
                    }} />
                  </div>
                </div>

              </div>
            );
          })()}

          <style dangerouslySetInnerHTML={{ __html: `
            .pprop-card {
              transition: transform 0.18s ease, box-shadow 0.18s ease;
              cursor: pointer;
            }
            .pprop-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 14px 28px oklch(0.22 0.18 285 / 0.18);
            }
            .pprop-card:focus-visible {
              outline: 2px solid oklch(0.30 0.20 285);
              outline-offset: 2px;
            }
            .pprice-ora {
              width: 26px; height: 26px; border-radius: 9999px;
              border: none; cursor: pointer; flex-shrink: 0;
              display: flex; align-items: center; justify-content: center;
              border: 1.5px solid transparent;
              background-image:
                linear-gradient(135deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 40%, oklch(0.54 0.18 44) 100%),
                linear-gradient(135deg, oklch(0.86 0.12 55) 0%, oklch(1 0 0 / 0.45) 40%, oklch(0.65 0.16 50) 75%, oklch(0.86 0.12 55) 100%);
              background-origin: padding-box, border-box;
              background-clip: padding-box, border-box;
              box-shadow: 0 2px 8px oklch(0.72 0.16 55 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.18);
            }
            .pprice-vault {
              width: 26px; height: 26px; border-radius: 9999px;
              border: none; cursor: pointer; flex-shrink: 0;
              display: flex; align-items: center; justify-content: center;
              border: 1.5px solid transparent;
              background-image:
                linear-gradient(135deg, oklch(0.36 0.22 285) 0%, oklch(0.22 0.18 285) 50%, oklch(0.14 0.14 285) 100%),
                linear-gradient(135deg, oklch(0.50 0.22 285) 0%, oklch(1 0 0 / 0.30) 40%, oklch(0.28 0.18 285) 75%, oklch(0.50 0.22 285) 100%);
              background-origin: padding-box, border-box;
              background-clip: padding-box, border-box;
              box-shadow: 0 2px 8px oklch(0.22 0.18 285 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.14);
            }
            .pprice-ghost {
              width: 26px; height: 26px; border-radius: 9999px;
              border: 1.5px solid oklch(0.78 0.14 195); cursor: pointer; flex-shrink: 0;
              display: flex; align-items: center; justify-content: center;
              background: transparent;
            }
          `}} />

          {/* ── Propuestas teal family — PriceIcon mismo color que US$... ── */}
          <div style={{ marginTop: 32, borderTop: "1px solid var(--vmc-color-vault-utility-ghost)", paddingTop: 24 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.10em",
              color: "var(--vmc-color-text-primary)", margin: "0 0 4px" }}>
              PriceIcon — familia teal · mismo color que US$ ···
            </p>
            <p style={{ fontFamily: F, fontSize: 9, color: "var(--vmc-color-text-tertiary)", margin: "0 0 20px" }}>
              bg del botón = teal más opaco · $ inside = teal · texto = teal · 3 niveles de intensidad
            </p>

            {(function priceProps() {
              const SCRIM = (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                  borderRadius: "8px 8px 0 0", pointerEvents: "none",
                }} />
              );
              const GRAD_BORDER = (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                  background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                  borderRadius: "0 0 8px 8px",
                }} />
              );
              const BADGE = (
                <div className="pcard__img-badge">
                  <div className="pcard-pill pcard-pill--live"><div className="pcard-pill-dot" />EN VIVO</div>
                </div>
              );
              const IMG = (
                <div className="pcard__img">
                  <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  {SCRIM}{BADGE}
                </div>
              );
              const META = (
                <div className="pcard__meta">
                  <p className="pcard__name">Ford Bronco Sport</p>
                  <p className="pcard__year">2024</p>
                </div>
              );

              /* ── Dollar icon helpers ── */
              function DollarDarkTeal({ size }: { size: number }): JSX.Element {
                return (
                  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
                    stroke="oklch(0.45 0.16 195)" strokeWidth="2.6"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                );
              }
              function DollarMidTeal({ size }: { size: number }): JSX.Element {
                return (
                  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
                    stroke="oklch(0.55 0.17 195)" strokeWidth="2.6"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                );
              }
              function DollarWhite({ size }: { size: number }): JSX.Element {
                return (
                  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
                    stroke="oklch(0.96 0.02 195)" strokeWidth="2.6"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0px 1px 2px oklch(0 0 0 / 0.35))" }}>
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                );
              }

              interface PropCardProps {
                label: string;
                note: string;
                priceIcon: JSX.Element;
                priceText: JSX.Element;
                likeBtn: JSX.Element;
              }
              function PropCard({ label, note, priceIcon, priceText, likeBtn }: PropCardProps): JSX.Element {
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                        textTransform: "uppercase" as const, letterSpacing: "0.08em",
                        color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: F, fontSize: 8.5, color: "oklch(0.65 0.02 220)", margin: 0, lineHeight: 1.3 }}>
                        {note}
                      </p>
                    </div>
                    <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232 }}>
                      {IMG}
                      <div className="pcard__body">
                        {META}
                        <div className="pcard__price-row">
                          <div className="pcard__price-left">
                            {priceIcon}
                            {priceText}
                          </div>
                          {likeBtn}
                        </div>
                      </div>
                      {GRAD_BORDER}
                    </div>
                  </div>
                );
              }

              /* ── T-A: gradiente teal claro→medio — contraste amplio ── */
              const iconA = (
                <button type="button" aria-label="precio" style={{
                  width: 26, height: 26, borderRadius: 9999,
                  border: "1.5px solid transparent",
                  backgroundImage: [
                    "linear-gradient(145deg, oklch(0.82 0.10 195) 0%, oklch(0.60 0.13 195) 60%, oklch(0.48 0.14 195) 100%)",
                    "linear-gradient(145deg, oklch(0.88 0.08 195) 0%, oklch(1 0 0 / 0.40) 35%, oklch(0.52 0.13 195) 100%)",
                  ].join(", "),
                  backgroundOrigin: "padding-box, border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 2px 8px oklch(0.52 0.13 195 / 0.32), inset 0 1px 0 oklch(1 0 0 / 0.40)",
                  cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <DollarWhite size={13} />
                </button>
              );

              /* ── T-B: gradiente teal medio→profundo — más presencia ── */
              const iconB = (
                <button type="button" aria-label="precio" style={{
                  width: 26, height: 26, borderRadius: 9999,
                  border: "1.5px solid transparent",
                  backgroundImage: [
                    "linear-gradient(145deg, oklch(0.70 0.12 195) 0%, oklch(0.50 0.15 195) 55%, oklch(0.36 0.14 195) 100%)",
                    "linear-gradient(145deg, oklch(0.78 0.10 195) 0%, oklch(1 0 0 / 0.28) 38%, oklch(0.40 0.14 195) 100%)",
                  ].join(", "),
                  backgroundOrigin: "padding-box, border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 2px 10px oklch(0.42 0.14 195 / 0.40), inset 0 1px 0 oklch(1 0 0 / 0.24)",
                  cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <DollarWhite size={13} />
                </button>
              );

              /* ── T-C: gradiente teal intenso — máximo rango L ── */
              const iconC = (
                <button type="button" aria-label="precio" style={{
                  width: 26, height: 26, borderRadius: 9999,
                  border: "1.5px solid transparent",
                  backgroundImage: [
                    "linear-gradient(145deg, oklch(0.62 0.15 195) 0%, oklch(0.44 0.16 195) 50%, oklch(0.28 0.14 195) 100%)",
                    "linear-gradient(145deg, oklch(0.72 0.13 195) 0%, oklch(1 0 0 / 0.20) 38%, oklch(0.32 0.14 195) 100%)",
                  ].join(", "),
                  backgroundOrigin: "padding-box, border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 2px 12px oklch(0.34 0.14 195 / 0.50), inset 0 1px 0 oklch(1 0 0 / 0.16)",
                  cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <DollarWhite size={13} />
                </button>
              );

              const proposals: PropCardProps[] = [
                {
                  label: "TX-1 · Texto teal",
                  note: "icono T-A · precio teal — familia unificada",
                  priceIcon: iconA,
                  priceText: <span className="pcard__price-text" style={{ color: "oklch(0.62 0.14 195)" }}>US$ 9,999</span>,
                  likeBtn: <LikeDemo cls="plike--sm" icon={14} />,
                },
                {
                  label: "TX-2 · Texto vault dark",
                  note: "icono T-B · precio vault — contraste máximo",
                  priceIcon: iconB,
                  priceText: <span className="pcard__price-text" style={{ color: "oklch(0.22 0.18 285)" }}>US$ 9,999</span>,
                  likeBtn: <LikeDemo cls="plike--sm" icon={14} />,
                },
                {
                  label: "TX-3 · Texto negro neutro",
                  note: "icono T-C · precio near-black — limpio, legible",
                  priceIcon: iconC,
                  priceText: <span className="pcard__price-text" style={{ color: "oklch(0.20 0.02 270)" }}>US$ 9,999</span>,
                  likeBtn: <LikeDemo cls="plike--sm" icon={14} />,
                },
              ];

              return (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 170px)", gap: 24 }}>
                  {proposals.map(function renderProp(p) {
                    return <PropCard key={p.label} {...p} />;
                  })}
                </div>
              );
            })()}
          </div>

        </div>

        {/* ─────────────────────────────────────────────
            APLICACIÓN TEAL ICON — grid 4 cards
        ───────────────────────────────────────────── */}
        <SectionLabel title="Teal Icon — Aplicación" subtitle="Icono gradiente teal · 4 estados de card · cómo se ve en grid real" />

        <div style={{ padding: "32px 28px", background: "oklch(0.96 0.004 270)" }}>
          {(function tealIconGrid() {

            /* ── Teal icon reutilizable ── */
            function TealIcon(): JSX.Element {
              return (
                <button className="pprice pprice--sm" type="button" aria-label="precio">
                  <DollarIcon size={14} />
                </button>
              );
            }

            function GradBorder(): JSX.Element {
              return (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                  background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                  borderRadius: "0 0 8px 8px",
                }} />
              );
            }

            function Scrim(): JSX.Element {
              return (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                  borderRadius: "8px 8px 0 0", pointerEvents: "none",
                }} />
              );
            }

            interface GridCardProps {
              badge: JSX.Element | null;
              gradBorder: boolean;
              priceColor: string;
              label: string;
              name: string;
              year: string;
              likeBtn: JSX.Element;
            }

            function GridCard({ badge, gradBorder, priceColor, label, name, year, likeBtn }: GridCardProps): JSX.Element {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
                    {label}
                  </p>
                  <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232, width: 170 }}>
                    <div className="pcard__img">
                      <img src="/demo/bronco.jpg" alt={name} width={170} height={112}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <Scrim />
                      {badge && <div className="pcard__img-badge">{badge}</div>}
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name">{name}</p>
                        <p className="pcard__year">{year}</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          <TealIcon />
                          <span className="pcard__price-text" style={{ color: priceColor }}>US$ 9,999</span>
                        </div>
                        {likeBtn}
                      </div>
                    </div>
                    {gradBorder && <GradBorder />}
                  </div>
                </div>
              );
            }

            return (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 170px)", gap: 24 }}>
                <GridCard
                  label="EN VIVO · Publicada"
                  badge={<div className="pcard-pill pcard-pill--live"><div className="pcard-pill-dot" />EN VIVO</div>}
                  gradBorder={true}
                  priceColor="oklch(0.62 0.14 195)"
                  name="Ford Bronco Sport"
                  year="2024"
                  likeBtn={<LikeDemo cls="plike--sm" icon={14} />}
                />
                <GridCard
                  label="PRÓXIMA · Publicada"
                  badge={<div className="pcard-pill pcard-pill--proxima"><span className="pcard-pill-clock"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>PRÓXIMA</div>}
                  gradBorder={false}
                  priceColor="oklch(0.62 0.14 195)"
                  name="Land Rover Def."
                  year="2023"
                  likeBtn={<LikeDemo cls="plike--sm" icon={14} />}
                />
                <GridCard
                  label="NEGOCIABLE"
                  badge={null}
                  gradBorder={false}
                  priceColor="oklch(0.62 0.14 195)"
                  name="Toyota Hilux"
                  year="2022"
                  likeBtn={<LikeDemo cls="plike--sm" icon={14} />}
                />
                <GridCard
                  label="PUBLICADA · sin badge"
                  badge={null}
                  gradBorder={false}
                  priceColor="oklch(0.62 0.14 195)"
                  name="Audi Q3"
                  year="2021"
                  likeBtn={<LikeDemo cls="plike--sm" icon={14} />}
                />
              </div>
            );
          })()}
        </div>

        {/* ─────────────────────────────────────────────
            APLICACIÓN TEAL ICON 2 — precio negro
        ───────────────────────────────────────────── */}
        <SectionLabel title="Teal Icon — Aplicación 2" subtitle="Icono gradiente teal · precio negro · 4 estados de card" />

        <div style={{ padding: "32px 28px", background: "oklch(0.96 0.004 270)" }}>
          {(function tealIconGrid2() {

            function TealIcon2(): JSX.Element {
              return (
                <button className="pprice pprice--sm" type="button" aria-label="precio">
                  <DollarIcon size={14} />
                </button>
              );
            }

            function GradBorder2(): JSX.Element {
              return (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                  background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                  borderRadius: "0 0 8px 8px",
                }} />
              );
            }

            function Scrim2(): JSX.Element {
              return (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                  borderRadius: "8px 8px 0 0", pointerEvents: "none",
                }} />
              );
            }

            interface GridCard2Props {
              badge: JSX.Element | null;
              gradBorder: boolean;
              label: string;
              name: string;
              year: string;
            }

            function GridCard2({ badge, gradBorder, label, name, year }: GridCard2Props): JSX.Element {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.08em",
                    color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
                    {label}
                  </p>
                  <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232, width: 170 }}>
                    <div className="pcard__img">
                      <img src="/demo/bronco.jpg" alt={name} width={170} height={112}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <Scrim2 />
                      {badge && <div className="pcard__img-badge">{badge}</div>}
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name" style={{ color: "oklch(0.35 0.20 285)" }}>{name}</p>
                        <p className="pcard__year">{year}</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          <TealIcon2 />
                          <span className="pcard__price-text" style={{ color: "oklch(0.20 0.02 270)" }}>US$ 9,999</span>
                        </div>
                        <LikeDemo cls="plike--sm" icon={14} />
                      </div>
                    </div>
                    {gradBorder && <GradBorder2 />}
                  </div>
                </div>
              );
            }

            return (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 170px)", gap: 24 }}>
                <GridCard2
                  label="EN VIVO · Publicada"
                  badge={<div className="pcard-pill pcard-pill--live"><div className="pcard-pill-dot" />EN VIVO</div>}
                  gradBorder={true}
                  name="Ford Bronco Sport"
                  year="2024"
                />
                <GridCard2
                  label="PRÓXIMA · Publicada"
                  badge={<div className="pcard-pill pcard-pill--proxima"><span className="pcard-pill-clock"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>PRÓXIMA</div>}
                  gradBorder={true}
                  name="Land Rover Def."
                  year="2023"
                />
                <GridCard2
                  label="NEGOCIABLE"
                  badge={null}
                  gradBorder={true}
                  name="Toyota Hilux"
                  year="2022"
                />
                <GridCard2
                  label="PUBLICADA · sin badge"
                  badge={null}
                  gradBorder={true}
                  name="Audi Q3"
                  year="2021"
                />
              </div>
            );
          })()}
        </div>

        {/* ─────────────────────────────────────────────
            APLICACIÓN TEAL ICON 3 — glass vault
        ───────────────────────────────────────────── */}
        <SectionLabel title="Teal Icon — Aplicación 3" subtitle="PriceIcon glass · tirando a morado vault · 3 variantes de intensidad" />

        <div style={{ padding: "32px 28px", background: "oklch(0.96 0.004 270)" }}>
          {(function tealIconGrid3() {

            const GRAD_BORDER = (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
                background: "linear-gradient(90deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 50%, oklch(0.54 0.18 44) 100%)",
                borderRadius: "0 0 8px 8px",
              }} />
            );
            const SCRIM = (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, oklch(0 0 0 / 0.50) 0%, transparent 55%)",
                borderRadius: "8px 8px 0 0", pointerEvents: "none",
              }} />
            );
            const BADGE = (
              <div className="pcard__img-badge">
                <div className="pcard-pill pcard-pill--live"><div className="pcard-pill-dot" />EN VIVO</div>
              </div>
            );
            const IMG = (
              <div className="pcard__img">
                <img src="/demo/bronco.jpg" alt="Ford Bronco Sport" width={170} height={112}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                {SCRIM}{BADGE}
              </div>
            );

            function DollarGlass({ size }: { size: number }): JSX.Element {
              return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
                  stroke="oklch(0.96 0.04 285)" strokeWidth="2.6"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0px 1px 2px oklch(0 0 0 / 0.40))" }}>
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              );
            }

            /* ── G-A1: teal→índigo→vault — 3 stops, recorrido completo ── */
            const iconGA = (
              <button type="button" aria-label="precio" style={{
                width: 26, height: 26, borderRadius: 9999,
                border: "1.5px solid transparent",
                backgroundImage: [
                  "linear-gradient(145deg, oklch(0.68 0.16 195) 0%, oklch(0.54 0.19 250) 45%, oklch(0.38 0.22 285) 100%)",
                  "linear-gradient(145deg, oklch(0.82 0.10 195) 0%, oklch(1 0 0 / 0.35) 30%, oklch(0.55 0.16 255) 60%, oklch(0.42 0.20 285) 100%)",
                ].join(", "),
                backgroundOrigin: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 12px oklch(0.40 0.18 265 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.45), inset 0 -1px 0 oklch(0 0 0 / 0.14)",
                cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <DollarGlass size={13} />
              </button>
            );

            /* ── G-A2: teal brillante→vault profundo — contraste máximo ── */
            const iconGB = (
              <button type="button" aria-label="precio" style={{
                width: 26, height: 26, borderRadius: 9999,
                border: "1.5px solid transparent",
                backgroundImage: [
                  "linear-gradient(145deg, oklch(0.72 0.17 195) 0%, oklch(0.44 0.21 275) 55%, oklch(0.28 0.20 285) 100%)",
                  "linear-gradient(145deg, oklch(0.86 0.12 195) 0%, oklch(1 0 0 / 0.30) 28%, oklch(0.38 0.18 280) 65%, oklch(0.30 0.20 285) 100%)",
                ].join(", "),
                backgroundOrigin: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 14px oklch(0.32 0.19 280 / 0.50), inset 0 1px 0 oklch(1 0 0 / 0.40), inset 0 -1px 0 oklch(0 0 0 / 0.18)",
                cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <DollarGlass size={13} />
              </button>
            );

            /* ── G-A3: shimmer — teal→lavanda→vault, destello en el medio ── */
            const iconGC = (
              <button type="button" aria-label="precio" style={{
                width: 26, height: 26, borderRadius: 9999,
                border: "1.5px solid transparent",
                backgroundImage: [
                  "linear-gradient(145deg, oklch(0.65 0.16 195) 0%, oklch(0.72 0.10 265) 40%, oklch(0.42 0.22 285) 75%, oklch(0.30 0.20 285) 100%)",
                  "linear-gradient(145deg, oklch(0.80 0.12 195) 0%, oklch(0.95 0.04 270 / 0.50) 32%, oklch(0.60 0.14 265) 55%, oklch(0.36 0.20 285) 100%)",
                ].join(", "),
                backgroundOrigin: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 14px oklch(0.38 0.18 270 / 0.48), inset 0 1px 0 oklch(1 0 0 / 0.50), inset 0 -1px 0 oklch(0 0 0 / 0.12)",
                cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <DollarGlass size={13} />
              </button>
            );

            interface Glass3CardProps {
              label: string;
              note: string;
              icon: JSX.Element;
            }

            function Glass3Card({ label, note, icon }: Glass3CardProps): JSX.Element {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                      textTransform: "uppercase" as const, letterSpacing: "0.08em",
                      color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: F, fontSize: 8.5, color: "oklch(0.65 0.02 220)", margin: 0, lineHeight: 1.3 }}>
                      {note}
                    </p>
                  </div>
                  <div className="pcard pprop-card" style={{ borderBottom: "none", height: 232, width: 170 }}>
                    {IMG}
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <p className="pcard__name" style={{ color: "oklch(0.35 0.20 285)" }}>Ford Bronco Sport</p>
                        <p className="pcard__year">2024</p>
                      </div>
                      <div className="pcard__price-row">
                        <div className="pcard__price-left">
                          {icon}
                          <span className="pcard__price-text" style={{ color: "oklch(0.20 0.02 270)" }}>US$ 9,999</span>
                        </div>
                        <LikeDemo cls="plike--sm" icon={14} />
                      </div>
                    </div>
                    {GRAD_BORDER}
                  </div>
                </div>
              );
            }

            return (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 170px)", gap: 24 }}>
                <Glass3Card
                  label="G-A1 · Teal→índigo→vault"
                  note="3 stops · recorrido espectro completo"
                  icon={iconGA}
                />
                <Glass3Card
                  label="G-A2 · Teal→vault · contraste"
                  note="teal brillante a vault profundo · directo"
                  icon={iconGB}
                />
                <Glass3Card
                  label="G-A3 · Shimmer lavanda"
                  note="destello blanco-lila en el medio · más vivo"
                  icon={iconGC}
                />
              </div>
            );
          })()}
        </div>

        {/* ─────────────────────────────────────────────
            11. ListingArea
        ───────────────────────────────────────────── */}
        <SectionLabel title="ListingArea" subtitle="Homepage · strip del subastador · 4 cards · live + negociable" />

        <div style={{ background: "oklch(0.92 0.006 270)", padding: "32px 28px" }}>
          <div className="plisting">
            <BktTL size={20} sw={2} />
            <BktBR size={20} sw={2} />

            {/* Header */}
            <div className="plisting__header">
              <div className="plisting__header-left">
                <p className="plisting__name">Santander Consumer</p>
                <p className="plisting__count">10 Ofertas</p>
              </div>
              <span className="plisting__link" role="button" tabIndex={0}>
                Ir al perfil
                <span className="plisting__link-icon" aria-hidden="true">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </span>
              </span>
            </div>

            {/* Cards row */}
            <div className="plisting__cards">

              {/* Card 1 — Live publicada (sin badge) */}
              <div className="pcard pcard--live">
                <div className="pcard__img">
                  <img src="/demo/bronco.jpg" alt="Audi Q3" width={170} height={112}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <p className="pcard__name">Audi Q3</p>
                    <p className="pcard__year">2026</p>
                  </div>
                  <div className="pcard__price-row">
                    <div className="pcard__price-left">
                      <button className="pprice pprice--sm" type="button" aria-label="precio"><DollarIcon size={14} /></button>
                      <span className="pcard__price-text">US$ 9,999</span>
                    </div>
                    <LikeDemo cls="plike--sm" icon={14} />
                  </div>
                </div>
              </div>

              {/* Card 2 — Live activa (badge EN VIVO) */}
              <div className="pcard pcard--live">
                <div className="pcard__img">
                  <img src="/demo/bronco.jpg" alt="Audi Q3" width={170} height={112}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  <div className="pcard__img-badge">
                    <div className="pcard-pill pcard-pill--live">
                      <div className="pcard-pill-dot" />
                      EN VIVO
                    </div>
                  </div>
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <p className="pcard__name">Audi Q3</p>
                    <p className="pcard__year">2026</p>
                  </div>
                  <div className="pcard__price-row">
                    <div className="pcard__price-left">
                      <button className="pprice pprice--sm" type="button" aria-label="precio"><DollarIcon size={14} /></button>
                      <span className="pcard__price-text">US$ 9,999</span>
                    </div>
                    <LikeDemo cls="plike--sm" icon={14} />
                  </div>
                </div>
              </div>

              {/* Card 3 — Negociable (sin precio, solo like) */}
              <div className="pcard pcard--negotiable">
                <div className="pcard__img">
                  <img src="/demo/bronco.jpg" alt="Audi Q3" width={170} height={112}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <p className="pcard__name">Audi Q3</p>
                    <p className="pcard__year">2026</p>
                  </div>
                  <div className="pcard__like-row">
                    <LikeDemo cls="plike--sm" icon={14} />
                  </div>
                </div>
              </div>

              {/* Card 4 — Live próxima (badge clock animado) */}
              <div className="pcard pcard--live">
                <div className="pcard__img">
                  <img src="/demo/bronco.jpg" alt="Audi Q3" width={170} height={112}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  <div className="pcard__img-badge">
                    <div className="pcard-clock-badge--a">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="oklch(1 0 0 / 0.92)" strokeWidth="2.4"
                        strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 15.5 14"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <p className="pcard__name">Audi Q3</p>
                    <p className="pcard__year">2026</p>
                  </div>
                  <div className="pcard__price-row">
                    <div className="pcard__price-left">
                      <button className="pprice pprice--sm" type="button" aria-label="precio"><DollarIcon size={14} /></button>
                      <span className="pcard__price-text">US$ 9,999</span>
                    </div>
                    <LikeDemo cls="plike--sm" icon={14} />
                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>

        {/* ─────────────────────────────────────────────
            BadgeStatus — EN VIVO · PRÓXIMA
            Frames para Smart Animate en Figma
        ───────────────────────────────────────────── */}
        <SectionLabel
          title="BadgeStatus"
          subtitle="EN VIVO · PRÓXIMA — 2 frames cada una para Smart Animate"
        />

        {/* ── NOTA FIGMA ──────────────────────────────────────────
            Componente: BadgeStatus
            Property:  variant → "en-vivo" | "proxima"

            Cada variante tiene 2 frames estáticos para Smart Animate:
              en-vivo  → Frame A: dot scale 1 · op 1
                         Frame B: dot scale 0.65 · op 0.28
              proxima  → Frame A: clock scale 1 · op 1
                         Frame B: clock scale 0.75 · op 0.28

            En ambos: el PILL no cambia — solo el ícono interno decae.
            Smart Animate: A → B → A · 1400ms · ease-in-out · loop
            Total frames en Figma: 4 (2 por variante)
        ─────────────────────────────────────────────────────────── */}

        <div style={{ background: "var(--vmc-color-background-card)", padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── EN VIVO ── */}
          <div>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.10em",
              color: "var(--vmc-color-text-primary)", margin: "0 0 4px" }}>
              EN VIVO
            </p>
            <p style={{ fontFamily: F, fontSize: 10, color: "var(--vmc-color-text-tertiary)",
              margin: "0 0 16px" }}>
              Dot pulsa: escala 1→0.65 · opacidad 1→0.28 · duración 1.4s ease-in-out
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              {/* Frame A */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                padding: "16px", background: "oklch(0.14 0.12 285)", borderRadius: 8 }}>
                <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase" as const, letterSpacing: "0.08em",
                  color: "oklch(1 0 0 / 0.45)", margin: 0 }}>
                  Frame A · dot ON
                </p>
                <div className="pcard-pill pcard-pill--live">
                  <span style={{
                    width: 6, height: 6, borderRadius: 9999,
                    background: "oklch(1 0 0 / 0.92)", flexShrink: 0,
                    display: "inline-block",
                    opacity: 1, transform: "scale(1)",
                  }} />
                  EN VIVO
                </div>
                <p style={{ fontFamily: F, fontSize: 9, color: "oklch(1 0 0 / 0.35)", margin: 0 }}>
                  dot: scale 1.0 · opacity 1
                </p>
              </div>

              {/* Frame B */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                padding: "16px", background: "oklch(0.14 0.12 285)", borderRadius: 8 }}>
                <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase" as const, letterSpacing: "0.08em",
                  color: "oklch(1 0 0 / 0.45)", margin: 0 }}>
                  Frame B · dot OFF
                </p>
                <div className="pcard-pill pcard-pill--live">
                  <span style={{
                    width: 6, height: 6, borderRadius: 9999,
                    background: "oklch(1 0 0 / 0.92)", flexShrink: 0,
                    display: "inline-block",
                    opacity: 0.28, transform: "scale(0.65)",
                  }} />
                  EN VIVO
                </div>
                <p style={{ fontFamily: F, fontSize: 9, color: "oklch(1 0 0 / 0.35)", margin: 0 }}>
                  dot: scale 0.65 · opacity 0.28
                </p>
              </div>

            </div>
          </div>

          {/* divider */}
          <div style={{ height: 1, background: "var(--vmc-color-vault-utility-ghost)" }} />

          {/* ── PRÓXIMA ── */}
          <div>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.10em",
              color: "var(--vmc-color-text-primary)", margin: "0 0 4px" }}>
              PRÓXIMA
            </p>
            <p style={{ fontFamily: F, fontSize: 10, color: "var(--vmc-color-text-tertiary)",
              margin: "0 0 16px" }}>
              Badge completo parpadea: opacidad 1→0.35 · duración 1.4s ease-in-out
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              {/* Frame A */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                padding: "16px", background: "oklch(0.14 0.12 285)", borderRadius: 8 }}>
                <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase" as const, letterSpacing: "0.08em",
                  color: "oklch(1 0 0 / 0.45)", margin: 0 }}>
                  Frame A · clock ON
                </p>
                <div className="pcard-pill pcard-pill--proxima">
                  <span style={{ display: "inline-flex", opacity: 1, transform: "scale(1)" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                      stroke="oklch(1 0 0 / 0.90)" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 15.5 14"/>
                    </svg>
                  </span>
                  PRÓXIMA
                </div>
                <p style={{ fontFamily: F, fontSize: 9, color: "oklch(1 0 0 / 0.35)", margin: 0 }}>
                  clock: scale 1 · opacity 1
                </p>
              </div>

              {/* Frame B */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                padding: "16px", background: "oklch(0.14 0.12 285)", borderRadius: 8 }}>
                <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase" as const, letterSpacing: "0.08em",
                  color: "oklch(1 0 0 / 0.45)", margin: 0 }}>
                  Frame B · clock OFF
                </p>
                <div className="pcard-pill pcard-pill--proxima">
                  <span style={{ opacity: 0.28, transform: "scale(0.75)", display: "inline-flex" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                      stroke="oklch(1 0 0 / 0.90)" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 15.5 14"/>
                    </svg>
                  </span>
                  PRÓXIMA
                </div>
                <p style={{ fontFamily: F, fontSize: 9, color: "oklch(1 0 0 / 0.35)", margin: 0 }}>
                  clock: scale 0.75 · opacity 0.28
                </p>
              </div>

            </div>
          </div>

          {/* ── Nota Figma ── */}
          <div style={{
            background: "oklch(0.97 0.006 285)",
            border: "1px solid oklch(0.22 0.18 285 / 0.10)",
            borderRadius: 8, padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.10em",
              color: "oklch(0.22 0.18 285)", margin: 0 }}>
              Spec Figma
            </p>

            {/* Fila: nombre componente */}
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.08em",
                color: "oklch(0.22 0.18 285 / 0.45)", margin: 0, minWidth: 100 }}>
                Componente
              </p>
              <p style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700,
                color: "oklch(0.22 0.18 285)", margin: 0 }}>
                Badge Status
              </p>
            </div>

            {/* Fila: properties */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.08em",
                color: "oklch(0.22 0.18 285 / 0.45)", margin: 0, minWidth: 100 }}>
                Properties
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p style={{ fontFamily: "monospace", fontSize: 10,
                  color: "oklch(0.22 0.18 285)", margin: 0 }}>
                  Type → <strong>En Vivo</strong> | <strong>Próxima</strong>
                </p>
                <p style={{ fontFamily: "monospace", fontSize: 10,
                  color: "oklch(0.22 0.18 285)", margin: 0 }}>
                  State → <strong>On</strong> | <strong>Off</strong>
                </p>
              </div>
            </div>

            {/* Fila: 4 variantes */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.08em",
                color: "oklch(0.22 0.18 285 / 0.45)", margin: 0, minWidth: 100 }}>
                4 Variantes
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  "Type=En Vivo · State=On   → dot scale 1 · op 1",
                  "Type=En Vivo · State=Off  → dot scale 0.65 · op 0.28",
                  "Type=Próxima · State=On   → clock scale 1 · op 1",
                  "Type=Próxima · State=Off  → clock scale 0.75 · op 0.28",
                ].map(function renderVariant(v) {
                  return (
                    <p key={v} style={{ fontFamily: "monospace", fontSize: 10,
                      color: "oklch(0.22 0.18 285 / 0.75)", margin: 0 }}>
                      {v}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Fila: Smart Animate */}
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.08em",
                color: "oklch(0.22 0.18 285 / 0.45)", margin: 0, minWidth: 100 }}>
                Prototype
              </p>
              <p style={{ fontFamily: "monospace", fontSize: 10,
                color: "oklch(0.22 0.18 285 / 0.75)", margin: 0 }}>
                Smart Animate · On ↔ Off · 1400ms · ease-in-out · loop
              </p>
            </div>

          </div>

          {/* divider */}
          <div style={{ height: 1, background: "var(--vmc-color-vault-utility-ghost)" }} />

          {/* ── Contexto sobre imagen ── */}
          <div>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.10em",
              color: "var(--vmc-color-text-primary)", margin: "0 0 12px" }}>
              Contexto — sobre imagen de tarjeta
            </p>
            <div style={{
              width: "100%", height: 80, borderRadius: 8,
              background: "linear-gradient(135deg, oklch(0.22 0.18 285) 0%, oklch(0.30 0.14 240) 50%, oklch(0.18 0.10 210) 100%)",
              display: "flex", alignItems: "flex-start", padding: "10px 12px", gap: 8,
            }}>
              <div className="pcard-pill pcard-pill--live">
                <span style={{
                  width: 6, height: 6, borderRadius: 9999,
                  background: "oklch(1 0 0 / 0.92)", flexShrink: 0, display: "inline-block",
                }} />
                EN VIVO
              </div>
              <div className="pcard-pill pcard-pill--proxima">
                <span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke="oklch(1 0 0 / 0.90)" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 15.5 14"/>
                  </svg>
                </span>
                PRÓXIMA
              </div>
            </div>
          </div>

        </div>

        {/* ── AuctionStatusBanner · Negotiable ──────────────────────────── */}
        <style>{PASTATUS_CSS}</style>
        <SectionLabel
          title="AuctionStatusBanner · Negotiable"
          subtitle="60px · cyan→teal-vault · text var(--color-vault) · back button"
        />
        <div style={{
          background: "var(--vmc-color-background-card, oklch(1 0 0))",
          padding: "24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)",
        }}>
          <AuctionStatusNegotiable />
        </div>

        {/* ── ConditionPill · Checkmark experiments ─────────────────────── */}
        <SectionLabel
          title="ConditionPill"
          subtitle="Mantener actual + ✓ · Figma pixel-perfect · 5 opciones de check"
        />

        <style>{PCOND_CSS}</style>

        {/* ── Fila 1: Variante ACTUAL ── */}
        <div style={{
          background: "var(--vmc-color-background-card, #fff)",
          padding: "16px 24px 20px",
          borderRadius: 8,
          marginBottom: 2,
        }}>
          <p style={{
            fontFamily: F, fontSize: 9, fontWeight: 700,
            textTransform: "uppercase" as const, letterSpacing: "0.12em",
            color: "oklch(0.22 0.18 285 / 0.35)", margin: "0 0 14px",
          }}>
            Variante actual (vault gradient · border-radius 4px)
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" as const, alignItems: "flex-start" }}>
            <div>
              <p style={{
                fontFamily: F, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: "oklch(0.22 0.18 285 / 0.45)", margin: "0 0 8px",
              }}>Sin check</p>
              <CPillGrid showCheck={false} />
            </div>
            <div>
              <p style={{
                fontFamily: F, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: "oklch(0.22 0.18 285 / 0.55)", margin: "0 0 8px",
              }}>Con ✓ blanco</p>
              <CPillGrid showCheck={true} />
            </div>
          </div>
        </div>

        {/* ── Fila 2: Figma pixel-perfect — 5 opciones de check ── */}
        <div style={{
          background: "var(--vmc-color-background-card, #fff)",
          padding: "16px 24px 20px",
          borderRadius: 8,
        }}>
          <p style={{
            fontFamily: F, fontSize: 9, fontWeight: 700,
            textTransform: "uppercase" as const, letterSpacing: "0.12em",
            color: "oklch(0.22 0.18 285 / 0.35)", margin: "0 0 14px",
          }}>
            Figma pixel-perfect · 135×46 · border-radius 9999px · VYStrokes3 · neutral-utility-label @40% · solo activas
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" as const, alignItems: "flex-start" }}>

            <div>
              <p style={{
                fontFamily: F, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: "oklch(0.22 0.18 285 / 0.35)", margin: "0 0 8px",
              }}>Base · sin check</p>
              <FigPillGrid checkType="none" />
            </div>

            <div>
              <p style={{
                fontFamily: F, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: "oklch(0.22 0.18 285 / 0.55)", margin: "0 0 8px",
              }}>Con check · bold 2.5px</p>
              <FigPillGrid checkType="B" badgeVariant="v1" />
            </div>

            <div>
              <p style={{
                fontFamily: F, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: "oklch(0.73 0.15 295 / 0.80)", margin: "0 0 8px",
              }}>Con check v2 · VYStrokes3</p>
              <FigPillGrid checkType="B" badgeVariant="v2" />
            </div>

          </div>
        </div>

        {/* ── DataQualityBadge ───────────────────────────────────────── */}
        <style>{PDQB_CSS}</style>
        <SectionLabel
          title="DataQualityBadge"
          subtitle="3 variantes visuales · elige la que mejor comunica · sin texto"
        />
        <div style={{
          background: "var(--vmc-color-background-card, oklch(1 0 0))",
          padding: "24px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)",
          display: "flex", flexDirection: "column" as const, gap: 24,
        }}>

          {/* Grid: 3 formas × 2 colores */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: "12px 24px", alignItems: "center" }}>

            {/* Headers */}
            <div />
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.10em", color: "oklch(0.70 0.20 145)", margin: 0 }}>Verde</p>
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.10em", color: "oklch(0.45 0.22 285)", margin: 0 }}>Morado</p>

            {/* ARC GAUGE — 3 tamaños */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(0.45 0.22 285)", margin: 0 }}>ARC ◜ Gauge</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontFamily: F, fontSize: 8, color: "oklch(0.55 0.03 220)", width: 20 }}>SM</span>
                <DqArc level="baja" size="sm" /><DqArc level="media" size="sm" /><DqArc level="alta" size="sm" />
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontFamily: F, fontSize: 8, color: "oklch(0.55 0.03 220)", width: 20 }}>MD</span>
                <DqArc level="baja" size="md" /><DqArc level="media" size="md" /><DqArc level="alta" size="md" />
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontFamily: F, fontSize: 8, color: "oklch(0.55 0.03 220)", width: 20 }}>LG</span>
                <DqArc level="baja" size="lg" /><DqArc level="media" size="lg" /><DqArc level="alta" size="lg" />
              </div>
            </div>
            <div />

            {/* SLABS ★★ Recomendado */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(0.72 0.16 55)", margin: 0 }}>SLABS /// ★ Gem</p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}><DqSlabs level="baja" /><DqSlabs level="media" /><DqSlabs level="alta" /></div>
            <div />

            {/* C — Rings */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(0.70 0.20 145)", margin: 0 }}>C — Rings ◎</p>
            <div style={{ display: "flex", gap: 20 }}><DqRings level="baja" /><DqRings level="media" /><DqRings level="alta" /></div>
            <div />

            {/* D — Diamonds */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: "oklch(0.50 0.03 220)", margin: 0 }}>D — Diamantes</p>
            <div style={{ display: "flex", gap: 16 }}><DqDiamonds level="baja" color="green" /><DqDiamonds level="media" color="green" /><DqDiamonds level="alta" color="green" /></div>
            <div style={{ display: "flex", gap: 16 }}><DqDiamonds level="baja" color="purple" /><DqDiamonds level="media" color="purple" /><DqDiamonds level="alta" color="purple" /></div>

            {/* E — Halos */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: "oklch(0.50 0.03 220)", margin: 0 }}>E — Halos</p>
            <div style={{ display: "flex", gap: 16 }}><DqHalos level="baja" color="green" /><DqHalos level="media" color="green" /><DqHalos level="alta" color="green" /></div>
            <div style={{ display: "flex", gap: 16 }}><DqHalos level="baja" color="purple" /><DqHalos level="media" color="purple" /><DqHalos level="alta" color="purple" /></div>

            {/* F — Chevrons */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: "oklch(0.50 0.03 220)", margin: 0 }}>F — Chevrons ›</p>
            <div style={{ display: "flex", gap: 16 }}><DqChevrons level="baja" color="green" /><DqChevrons level="media" color="green" /><DqChevrons level="alta" color="green" /></div>
            <div style={{ display: "flex", gap: 16 }}><DqChevrons level="baja" color="purple" /><DqChevrons level="media" color="purple" /><DqChevrons level="alta" color="purple" /></div>

            {/* G — Isotipo VMC ★ */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(0.72 0.16 55)", margin: 0 }}>G — Isotipo VMC ★</p>
            <div style={{ display: "flex", gap: 16 }}><DqIsotipo level="baja" color="green" /><DqIsotipo level="media" color="green" /><DqIsotipo level="alta" color="green" /></div>
            <div />

            {/* H — Color Cycle verde→naranja→verde */}
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(0.55 0.18 110)", margin: 0 }}>H — Verde ↔ Naranja</p>
            <div style={{ display: "flex", gap: 16 }}><DqCycle level="baja" /><DqCycle level="media" /><DqCycle level="alta" /></div>
            <div />

          </div>

          {/* En contexto */}
          <div style={{ borderTop: "1px solid oklch(0.22 0.18 285 / 0.06)", paddingTop: 20 }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: "oklch(0.22 0.18 285 / 0.35)", margin: "0 0 12px" }}>
              En contexto — acordeón
            </p>
            <div style={{
              background: "oklch(1 0 0)", border: "1px solid oklch(0.22 0.18 285 / 0.08)",
              borderRadius: 8, padding: "12px 16px",
              display: "flex", gap: 32, flexWrap: "wrap" as const,
            }}>
              {(["baja", "media", "alta"] as DataQualityLevel[]).map(function renderCtx(lvl) {
                return (
                  <div key={lvl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 240 }}>
                    <div>
                      <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.10em", color: "oklch(0.50 0.03 220)", margin: "0 0 3px" }}>Calidad de información</p>
                      <p style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: "oklch(0.45 0.03 220)", margin: 0 }}>Código: 61483</p>
                    </div>
                    <DqSegments level={lvl} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── DataQualityBadge · Figma Handoff ────────────────────────── */}
        <SectionLabel
          title="DataQualityBadge · Figma Handoff"
          subtitle="24×24 · variantes de animación + 3 estados de calidad"
        />
        <div style={{
          background: "oklch(1 0 0)",
          padding: "40px 48px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)",
          display: "flex", gap: 56, alignItems: "flex-end", flexWrap: "wrap" as const,
        }}>

          {/* ── Variantes del ícono solo (frames animación) ── */}
          {[
            { label: "Ghost", opacity: 0.15, brightness: 1,    color: "oklch(0.55 0.03 220)" },
            { label: "Activo",  opacity: 1,    brightness: 1,    color: "var(--vmc-color-orange-500, oklch(0.72 0.16 55))" },
            { label: "Pulse",   opacity: 0.75, brightness: 1.25, color: "var(--vmc-color-orange-500, oklch(0.72 0.16 55))" },
          ].map(function renderIconVariant(v) {
            return (
              <div key={v.label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10 }}>
                <svg
                  width="24" height="34" viewBox="0 0 10 14" fill="none"
                  style={{ opacity: v.opacity, filter: `brightness(${v.brightness})` }}
                >
                  <path d="M2 2 L8 7 L2 12" stroke={v.color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "oklch(0.55 0.03 220)" }}>{v.label}</span>
              </div>
            );
          })}

          <div style={{ width: 1, height: 60, background: "oklch(0.22 0.18 285 / 0.08)", alignSelf: "center" }} />

          {/* ── 3 estados del badge ── */}
          {(["baja", "media", "alta"] as DataQualityLevel[]).map(function renderBadgeState(lvl) {
            const filled = DQ_FILLED[lvl];
            const labels: Record<DataQualityLevel, string> = { baja: "Baja", media: "Media", alta: "Alta" };
            const orange = "var(--vmc-color-orange-500, oklch(0.72 0.16 55))";
            const ghost = "oklch(0.85 0.01 220)";
            return (
              <div key={lvl} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none" style={{ opacity: filled >= 1 ? 1 : 0.15 }}>
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 1 ? orange : ghost} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none" style={{ opacity: filled >= 2 ? 1 : 0.15 }}>
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 2 ? orange : ghost} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none" style={{ opacity: filled >= 3 ? 1 : 0.15 }}>
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 3 ? orange : ghost} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "oklch(0.55 0.03 220)" }}>{labels[lvl]}</span>
              </div>
            );
          })}

        </div>

        {/* ── DataQualityBadge · Sin animación con gradiente ─────────── */}
        <SectionLabel
          title="DataQualityBadge · Gradiente (sin animación)"
          subtitle="24×24 · stroke gradiente naranja · 3 estados"
        />
        <div style={{
          background: "oklch(1 0 0)",
          padding: "40px 48px",
          borderBottom: "1px solid var(--vmc-color-vault-utility-ghost)",
          display: "flex", gap: 56, alignItems: "flex-end", flexWrap: "wrap" as const,
        }}>
          {/* Definición SVG del gradiente — reutilizable por todos */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="chevron-orange-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="oklch(0.80 0.22 145)" />
                <stop offset="100%" stopColor="oklch(0.55 0.22 145)" />
              </linearGradient>
              <linearGradient id="chevron-orange-grad-ghost" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="oklch(0.88 0.01 220)" />
                <stop offset="100%" stopColor="oklch(0.82 0.01 220)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Ícono solo con gradiente */}
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10 }}>
            <svg width="24" height="34" viewBox="0 0 10 14" fill="none">
              <path d="M2 2 L8 7 L2 12" stroke="url(#chevron-orange-grad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "oklch(0.55 0.03 220)" }}>Ícono</span>
          </div>

          <div style={{ width: 1, height: 60, background: "oklch(0.22 0.18 285 / 0.08)", alignSelf: "center" }} />

          {/* 3 estados con gradiente */}
          {(["baja", "media", "alta"] as DataQualityLevel[]).map(function renderGradState(lvl) {
            const filled = DQ_FILLED[lvl];
            const labels: Record<DataQualityLevel, string> = { baja: "Baja", media: "Media", alta: "Alta" };
            return (
              <div key={lvl} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none">
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 1 ? "url(#chevron-orange-grad)" : "url(#chevron-orange-grad-ghost)"} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none">
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 2 ? "url(#chevron-orange-grad)" : "url(#chevron-orange-grad-ghost)"} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="24" height="34" viewBox="0 0 10 14" fill="none">
                    <path d="M2 2 L8 7 L2 12" stroke={filled >= 3 ? "url(#chevron-orange-grad)" : "url(#chevron-orange-grad-ghost)"} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "oklch(0.55 0.03 220)" }}>{labels[lvl]}</span>
              </div>
            );
          })}

        </div>

      </div>
    </main>
  );
}
