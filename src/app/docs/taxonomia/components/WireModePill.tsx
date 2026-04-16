"use client";

/**
 * WireModePill — pill flotante fixed bottom-right.
 * Presente en todas las páginas de la sección taxonomía (Frame + Inventario).
 * Lee y escribe WireModeContext.
 */

import type { JSX } from "react";
import { useWireMode } from "./WireModeContext";
import type { WireMode } from "./WireModeContext";

const PILL_MODES: { value: WireMode; label: string }[] = [
  { value: "normal",  label: "Normal"  },
  { value: "upgrade", label: "Upgrade" },
  { value: "done",    label: "Done"    },
];

function resolveActiveBg(value: WireMode, isActive: boolean): string {
  if (!isActive) return "oklch(0.18 0.06 285)";
  if (value === "done") return "oklch(0.38 0.12 145)";
  return "oklch(0.22 0.18 285)";
}

export function WireModePill(): JSX.Element {
  const { mode, setMode } = useWireMode();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 50,
        display: "flex",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.12)",
        fontFamily: "monospace",
      }}
    >
      {PILL_MODES.map(function renderPillButton({ value, label }) {
        const isActive = mode === value;

        function handleClick() { setMode(value); }

        return (
          <button
            key={value}
            onClick={handleClick}
            style={{
              padding: "8px 18px",
              fontSize: "11px",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              background: resolveActiveBg(value, isActive),
              color: isActive ? "oklch(1 0 0)" : "oklch(1 0 0 / 45%)",
              transition: "background 140ms, color 140ms, font-weight 140ms",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
