"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

const LINKS = [
  { href: "/docs/taxonomia", label: "Resumen", match: (p: string) => p === "/docs/taxonomia" || p === "/docs/taxonomia/" },
  { href: "/docs/taxonomia/inventario", label: "Inventario", match: (p: string) => p.startsWith("/docs/taxonomia/inventario") },
  {
    href: "/docs/taxonomia/marco-detalle-vmc",
    label: "Marco: Detalle",
    match: (p: string) => p.startsWith("/docs/taxonomia/marco-detalle-vmc"),
  },
] as const;

export function TaxonomiaSubNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b sticky top-24 z-30"
      style={{
        background: "var(--vmc-color-background-primary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex gap-1 min-h-9 items-center flex-wrap py-1">
        {LINKS.map((item) => {
          const active = item.match(pathname);
          const baseStyle: CSSProperties = {
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 500,
            fontSize: "0.75rem",
          };
          let linkStyle: CSSProperties = baseStyle;
          if (active) {
            linkStyle = {
              ...baseStyle,
              color: "var(--vmc-color-text-primary)",
              background: "var(--vmc-color-background-tertiary)",
            };
          }
          if (!active) {
            linkStyle = {
              ...baseStyle,
              color: "var(--vmc-color-text-secondary)",
            };
          }
          return (
            <Link key={item.href} href={item.href} className="px-3 py-1 rounded transition-colors" style={linkStyle}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
