"use client";

/**
 * SidebarPreview
 * Representación fiel del diseño generado por Stitch (v3, score 87/100).
 * Usa tokens DS reales — NO la paleta wireframe W.
 * Referencia: component-learnings.json → components.sidebar.key_specs
 */

import type { JSX } from "react";

interface NavItem {
  label: string;
  active: boolean;
  iconPath: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Próximas",
    active: true,
    iconPath: "M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  },
  {
    label: "Tipo de oferta",
    active: false,
    iconPath: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  },
  {
    label: "Categorías",
    active: false,
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    label: "Empresas",
    active: false,
    iconPath: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  },
  {
    label: "Centro de ayuda",
    active: false,
    iconPath: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  },
];

function NavItemRow({ item }: { item: NavItem }): JSX.Element {
  return (
    <div
      style={{
        height: 48,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        justifyContent: "space-between",
        background: item.active ? "rgba(255,255,255,0.10)" : "transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Ícono circular — borde 1.5px blanco */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.60)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.80)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={item.iconPath} />
          </svg>
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: item.active ? 600 : 400,
            color: item.active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.60)",
            fontFamily: "var(--font-plus-jakarta-sans, sans-serif)",
            letterSpacing: 0,
          }}
        >
          {item.label}
        </span>
      </div>
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

export function SidebarPreview(): JSX.Element {
  return (
    <div
      style={{
        width: 256,
        minHeight: 400,
        background: "var(--vmc-color-background-inverse, #22005C)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Brand area — 64px */}
      <div
        style={{
          height: 64,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(255,255,255,1)",
            fontFamily: "var(--font-plus-jakarta-sans, sans-serif)",
            letterSpacing: -0.3,
          }}
        >
          <span style={{ opacity: 0.7 }}>›</span>vmc
          <span style={{ opacity: 0.7 }}>‹</span>{" "}
          <span style={{ fontWeight: 400 }}>Subastas</span>
        </span>
        <span
          style={{
            fontSize: 8,
            color: "rgba(255,255,255,0.40)",
            fontFamily: "var(--font-plus-jakarta-sans, sans-serif)",
            letterSpacing: 0.2,
          }}
        >
          powered by SUBASTOP.Co
        </span>
      </div>

      {/* Nav items */}
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        {NAV_ITEMS.map(function renderNavItem(item) {
          return <NavItemRow key={item.label} item={item} />;
        })}
      </div>
    </div>
  );
}
