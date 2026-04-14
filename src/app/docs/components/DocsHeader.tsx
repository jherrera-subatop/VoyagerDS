"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function areaLabel(pathname: string): string {
  if (pathname === "/docs" || pathname === "/docs/") {
    return "Índice";
  }
  if (pathname.startsWith("/docs/taxonomia")) {
    return "Taxonomía";
  }
  if (pathname.startsWith("/docs/fundamentos")) {
    return "Fundamentos";
  }
  if (pathname.startsWith("/docs/componentes")) {
    return "Componentes";
  }
  if (pathname.startsWith("/docs/design-spec")) {
    return "DESIGN.md";
  }
  return "Docs";
}

export function DocsHeader() {
  const pathname = usePathname();
  const label = areaLabel(pathname);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--vmc-color-background-secondary)",
        borderColor: "var(--vmc-color-border-default)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/docs"
            className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
            style={{
              background: "var(--vmc-color-vault-900)",
              color: "var(--vmc-color-neutral-100)",
            }}
          >
            v0.1.0
          </Link>
          <span
            className="font-semibold text-sm truncate"
            style={{ color: "var(--vmc-color-text-primary)" }}
          >
            Voyager DS
          </span>
          <span className="shrink-0" style={{ color: "var(--vmc-color-border-default)" }}>
            /
          </span>
          <span className="text-sm truncate" style={{ color: "var(--vmc-color-text-secondary)" }}>
            {label}
          </span>
        </div>
        <div className="text-xs font-mono shrink-0 hidden sm:block" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          215 tokens · 12 componentes
        </div>
      </div>
    </header>
  );
}
