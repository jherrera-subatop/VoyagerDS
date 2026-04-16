"use client";

import { useMemo, useState } from "react";
import {
  TAXONOMY_DOMAIN_ORDER,
  TAXONOMY_DOMAIN_LABEL,
  DOMAIN_COLORS,
  DECISION_META,
  groupTaxonomyByDomain,
  type TaxonomyComponent,
} from "../_data/taxonomy-components";
import { TaxonomyComponentCard } from "./TaxonomyComponentCard";

interface TaxonomyAccordionProps {
  /** Subconjunto de componentes a mostrar. Si no se pasa, se usan todos los grupos disponibles. */
  components: TaxonomyComponent[];
  /** Dominio abierto por defecto (ID de dominio). Por defecto: primero del orden. */
  defaultOpen?: string;
  /** Map of componentId → validatedAt ISO string for upgrade validation state. */
  validatedIds?: Record<string, string>;
}

function resolveInitialOpen(presentDomains: string[], defaultOpen: string | undefined): string {
  if (presentDomains.length === 0) {
    return "";
  }
  if (defaultOpen && presentDomains.includes(defaultOpen)) {
    return defaultOpen;
  }
  return presentDomains[0] ?? "";
}

function presentDomainsFor(components: TaxonomyComponent[]): string[] {
  const grouped = groupTaxonomyByDomain(components);
  return TAXONOMY_DOMAIN_ORDER.filter((d) => grouped.has(d));
}

export function TaxonomyAccordion({ components, defaultOpen, validatedIds }: TaxonomyAccordionProps) {
  const grouped = useMemo(() => groupTaxonomyByDomain(components), [components]);

  // Dominios presentes en este subconjunto, respetando el orden canónico
  const presentDomains = useMemo(
    () => TAXONOMY_DOMAIN_ORDER.filter((d) => grouped.has(d)),
    [grouped],
  );

  const [openDomain, setOpenDomain] = useState<string>(() =>
    resolveInitialOpen(presentDomainsFor(components), defaultOpen),
  );

  function toggle(domain: string) {
    setOpenDomain((prev) => (prev === domain ? "" : domain));
  }

  if (presentDomains.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        Sin componentes para mostrar.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {presentDomains.map((domain) => {
        const items = grouped.get(domain) ?? [];
        const isOpen = openDomain === domain;
        const domainColor = DOMAIN_COLORS[domain] ?? "var(--vmc-color-neutral-500)";

        return (
          <div
            key={domain}
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: "var(--vmc-color-border-default)" }}
          >
            {/* Cabecera del acordeón */}
            <button
              type="button"
              onClick={() => toggle(domain)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors"
              style={{
                background: isOpen
                  ? "var(--vmc-color-background-tertiary)"
                  : "var(--vmc-color-background-secondary)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Dot de color de dominio */}
                <span
                  className="shrink-0 rounded-full"
                  style={{ width: 10, height: 10, background: domainColor }}
                  aria-hidden="true"
                />
                <span
                  className="font-semibold text-sm"
                  style={{ color: "var(--vmc-color-text-primary)" }}
                >
                  {TAXONOMY_DOMAIN_LABEL[domain] ?? domain}
                </span>
                {/* Contadores de decisiones */}
                <DecisionSummary items={items} />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--vmc-color-text-tertiary)" }}
                >
                  {items.length} {items.length === 1 ? "componente" : "componentes"}
                </span>
                <ChevronIcon open={isOpen} />
              </div>
            </button>

            {/* Panel desplegable */}
            {isOpen && (
              <div
                className="border-t p-4"
                style={{ borderColor: "var(--vmc-color-border-subtle)" }}
              >
                <div className="grid grid-cols-1 gap-4">
                  {items.map((c) => (
                    <TaxonomyComponentCard key={c.id} component={c} validatedAt={validatedIds?.[c.id]} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Sub-componentes internos ────────────────────────────────────────────────

function DecisionSummary({ items }: { items: TaxonomyComponent[] }) {
  const counts: Record<string, number> = {};
  for (const item of items) {
    counts[item.decision] = (counts[item.decision] ?? 0) + 1;
  }

  return (
    <span className="flex gap-1">
      {Object.entries(counts).map(([decision, count]) => {
        const meta = DECISION_META[decision as keyof typeof DECISION_META];
        if (!meta) return null;
        return (
          <span
            key={decision}
            className="text-xs px-1.5 py-0 rounded font-mono"
            style={{ background: meta.bg, color: meta.color }}
            title={meta.label}
          >
            {count}
          </span>
        );
      })}
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 200ms ease",
        color: "var(--vmc-color-text-tertiary)",
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
