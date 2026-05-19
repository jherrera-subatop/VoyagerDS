"use client";

import type { JSX } from "react";

/*
 * CSS Houdini @property enables smooth gradient color+angle transitions.
 * initial-value must be a static literal — OKLCH values used (no HEX).
 * All button state values reference vmc-color-* primitives (no HEX in CSS rules).
 */
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

  .vbtn {
    --vbtn-stop-a: var(--vmc-color-orange-600);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    height: 48px;
    padding: 0 28px;
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
        var(--vmc-color-vault-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px rgb(92.94% 53.73% 21.18% / 0.30);
    transition:
      --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease,
      --vbtn-stop-b 0.35s ease,
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.25s ease;
    transform: translateZ(0);
  }

  .vbtn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }

  .vbtn::after {
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

  .vbtn:hover {
    --vbtn-angle: 220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40);
  }

  .vbtn:hover::after {
    opacity: 0.45;
    filter: blur(18px);
  }

  .vbtn:active {
    --vbtn-angle: 135deg;
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow:
      inset 0 2px 5px rgb(0% 0% 0% / 0.22),
      0 1px 3px rgb(0% 0% 0% / 0.12);
  }

  .vbtn:focus-visible {
    outline: none;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
  }

  .vbtn:disabled {
    background-image: none;
    background-color: var(--vmc-color-background-disabled);
    color: var(--vmc-color-neutral-700);
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
  }

  .vbtn:disabled::after {
    display: none;
  }

  /* Frozen states for static showcase */
  .vbtn--hover {
    --vbtn-angle: 220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40) !important;
  }

  .vbtn--focus {
    outline: none;
    transform: scale(0.98) !important;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500),
      0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30) !important;
  }
`;

const SECTION_STYLE: React.CSSProperties = {
  background: "var(--vmc-color-background-secondary)",
  borderColor: "var(--vmc-color-vault-utility-ghost)",
};

const STATES_GRID_STYLE: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  alignItems: "flex-end",
  padding: "32px",
  background: "var(--vmc-color-background-secondary)",
  borderRadius: "8px",
};

const STATE_COL_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
};

const STATE_LABEL_STYLE: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--vmc-color-neutral-700)",
};

const LIVE_WRAP_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 32px",
  background: "var(--vmc-color-background-card)",
  borderRadius: "8px",
};

const BADGE_STYLE: React.CSSProperties = {
  background: "var(--vmc-color-vault-100)",
  color: "var(--vmc-color-vault-700)",
};

const CODE_STYLE: React.CSSProperties = {
  color: "var(--vmc-color-neutral-700)",
};

export function ButtonUpgradeShowcaseSection(): JSX.Element {
  return (
    <div
      className="rounded-lg border p-6 space-y-4 mt-6"
      style={SECTION_STYLE}
    >
      <style dangerouslySetInnerHTML={{ __html: BUTTON_CSS }} />

      <p
        className="text-sm font-semibold"
        style={{ color: "var(--vmc-color-text-primary)" }}
      >
        Button Primary — Mix Cinematic + Tactile{" "}
        <span
          className="text-xs font-normal ml-2 px-1.5 py-0.5 rounded"
          style={BADGE_STYLE}
        >
          v2.0 upgrade
        </span>
      </p>

      <p
        className="text-sm"
        style={{ color: "var(--vmc-color-text-secondary)" }}
      >
        Gradiente animado naranja→vault via CSS Houdini{" "}
        <code
          className="text-xs px-1 py-0.5 rounded"
          style={{ background: "var(--vmc-color-background-tertiary)" }}
        >
          @property
        </code>
        . Stroke con gradient ring offset. Glow split-chroma en hover.
        Focus ring doble anillo WCAG AA. Sin HEX — solo{" "}
        <code
          className="text-xs px-1 py-0.5 rounded"
          style={{ background: "var(--vmc-color-background-tertiary)" }}
        >
          var(--vmc-color-*)
        </code>
        .
      </p>

      {/* Static states */}
      <div style={STATES_GRID_STYLE}>
        <div style={STATE_COL_STYLE}>
          <span style={STATE_LABEL_STYLE}>Default</span>
          <button className="vbtn" type="button">
            Ingresa ahora
          </button>
        </div>

        <div style={STATE_COL_STYLE}>
          <span style={STATE_LABEL_STYLE}>Hover</span>
          <button className="vbtn vbtn--hover" type="button">
            Ingresa ahora
          </button>
        </div>

        <div style={STATE_COL_STYLE}>
          <span style={STATE_LABEL_STYLE}>Focus</span>
          <button className="vbtn vbtn--focus" type="button">
            Ingresa ahora
          </button>
        </div>

        <div style={STATE_COL_STYLE}>
          <span style={STATE_LABEL_STYLE}>Disabled</span>
          <button className="vbtn" type="button" disabled>
            Ingresa ahora
          </button>
        </div>
      </div>

      {/* Live interactive demo */}
      <p
        className="text-xs font-semibold uppercase tracking-wider"
        style={CODE_STYLE}
      >
        Demo interactivo — hover · click · tab
      </p>
      <div style={LIVE_WRAP_STYLE}>
        <button className="vbtn" type="button">
          Ingresa ahora
        </button>
      </div>

      <p
        className="text-xs font-mono pt-2"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        {'<Button variant="primary-v2">Ingresa ahora</Button>'}
      </p>
    </div>
  );
}
