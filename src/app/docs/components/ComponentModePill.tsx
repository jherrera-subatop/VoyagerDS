"use client";

/**
 * ComponentModePill — pill flotante fixed bottom-right.
 * Presente en /docs/componentes.
 * Lee y escribe ComponentModeContext.
 *
 * NORMAL = output Stitch pipeline
 * DONE   = versión Figma-refinada + tokens DS
 */

import type { JSX } from "react";
import { useComponentMode } from "./ComponentModeContext";
import type { ComponentMode } from "./ComponentModeContext";

const PILL_MODES: { value: ComponentMode; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "done",   label: "Done"   },
];

export function ComponentModePill(): JSX.Element {
  const { mode, setMode } = useComponentMode();

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
        const isDoneActive = value === "done" && isActive;

        function handleClick(): void {
          setMode(value);
        }

        return (
          <button
            key={value}
            type="button"
            onClick={handleClick}
            style={{
              padding: "8px 18px",
              fontSize: "11px",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              background: isDoneActive
                ? "oklch(0.55 0.18 145)"
                : isActive
                  ? "oklch(0.22 0.18 285)"
                  : "oklch(0.18 0.06 285)",
              color: isActive
                ? "oklch(1 0 0)"
                : "oklch(1 0 0 / 45%)",
              transition: "background 140ms, color 140ms",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
