"use client";

/**
 * ComponentesSubNav
 * Barra sticky secundaria bajo el DocsAreaNav cuando se está en /docs/componentes.
 * Links de anchor → scroll directo al showcase de cada componente.
 */

import type { CSSProperties } from "react";

interface AnchorItem {
  href: string;
  label: string;
  status: "done" | "stitch" | "pending";
}

const ITEMS: AnchorItem[] = [
  { href: "#footer-primary", label: "Footer",  status: "done"   },
  { href: "#sidebar",        label: "Sidebar", status: "done"   },
];

const STATUS_LABEL: Record<AnchorItem["status"], string> = {
  done:    "done",
  stitch:  "stitch",
  pending: "pendiente",
};

const STATUS_COLOR: Record<AnchorItem["status"], string> = {
  done:    "var(--vmc-color-status-success, #22c55e)",
  stitch:  "var(--vmc-color-live, #ED8936)",
  pending: "var(--vmc-color-text-tertiary)",
};

export function ComponentesSubNav() {
  const baseStyle: CSSProperties = {
    fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
    fontWeight: 500,
    fontSize: "0.75rem",
    color: "var(--vmc-color-text-secondary)",
  };

  return (
    <nav
      className="border-b sticky top-24 z-30"
      style={{
        background: "var(--vmc-color-background-primary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex gap-1 min-h-9 items-center flex-wrap py-1">
        {ITEMS.map(function renderItem(item) {
          return (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1 rounded transition-colors flex items-center gap-1.5"
              style={baseStyle}
            >
              {item.label}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  fontFamily: "monospace",
                  color: STATUS_COLOR[item.status],
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {STATUS_LABEL[item.status]}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
