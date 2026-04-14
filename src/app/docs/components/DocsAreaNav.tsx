"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AREAS = [
  { href: "/docs", label: "Índice", prefix: "/docs" },
  { href: "/docs/taxonomia", label: "Taxonomía", prefix: "/docs/taxonomia" },
  { href: "/docs/fundamentos", label: "Fundamentos", prefix: "/docs/fundamentos" },
  { href: "/docs/componentes", label: "Componentes", prefix: "/docs/componentes" },
  { href: "/docs/design-spec", label: "DESIGN.md", prefix: "/docs/design-spec" },
] as const;

function isActive(pathname: string, prefix: string): boolean {
  if (prefix === "/docs") {
    if (pathname === "/docs" || pathname === "/docs/") {
      return true;
    }
    return false;
  }
  return pathname.startsWith(prefix);
}

export function DocsAreaNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b sticky top-14 z-40"
      style={{
        background: "var(--vmc-color-background-secondary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex gap-1 min-h-10 items-center flex-wrap py-1">
        {AREAS.map((area) => {
          const active = isActive(pathname, area.prefix);
          const linkClass = "px-3 py-1.5 text-xs rounded transition-colors";
          const baseStyle: CSSProperties = {
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 500,
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
            <Link
              key={area.href}
              href={area.href}
              className={linkClass}
              style={linkStyle}
            >
              {area.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
