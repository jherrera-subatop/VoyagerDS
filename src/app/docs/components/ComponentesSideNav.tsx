"use client";

/**
 * ComponentesSideNav
 * Sidebar de navegación estilo Polaris para /docs/componentes.
 * Lista cada componente con su estado (done / stitch / pending).
 * Sticky en scroll · anchor links directos a cada showcase.
 */

import type { CSSProperties, JSX } from "react";
import { useEffect, useState } from "react";

export interface ComponentNavItem {
  id: string;
  label: string;
  status: "done" | "qa" | "pending";
  group?: string;
}

export const COMPONENT_ITEMS: ComponentNavItem[] = [
  /* ── Navigation ──────────────────────────────── */
  { id: "header",           label: "Header",         status: "qa",      group: "Navigation" },
  { id: "sidebar",          label: "menu-sidebar",   status: "done",    group: "Navigation" },
  { id: "footer-primary",   label: "Footer",         status: "done",    group: "Navigation" },
  { id: "session-header",   label: "Session Header", status: "pending", group: "Navigation" },
  /* ── Banners ─────────────────────────────────── */
  { id: "hero-banner",      label: "hero-banner",      status: "pending", group: "Banners" },
  { id: "subaspass-banner", label: "subaspass-banner", status: "pending", group: "Banners" },
  { id: "subascoins",       label: "subascoins",       status: "pending", group: "Banners" },
  { id: "ayuda",            label: "ayuda",            status: "pending", group: "Banners" },
  { id: "category-banner",  label: "category-banner",  status: "pending", group: "Banners" },
  /* ── Cards ───────────────────────────────────── */
  { id: "related-card",     label: "related-card",  status: "qa",  group: "Cards" },
  { id: "offer-card",       label: "offer-card",    status: "qa",  group: "Cards" },
  /* ── Publication ─────────────────────────────── */
  { id: "detail-card",        label: "detail-card",    status: "qa",  group: "Publication" },
  { id: "tags",               label: "tags",           status: "pending", group: "Publication" },
  { id: "detalle-oferta-bar", label: "download-row",   status: "qa",  group: "Publication" },
  { id: "gallery-main",       label: "gallery-main",   status: "qa",  group: "Publication" },
  { id: "gallery-thumbs",     label: "gallery-thumbs", status: "pending", group: "Publication" },
  { id: "info-general",       label: "info-general",   status: "qa",  group: "Publication" },
  { id: "docs-req",           label: "docs-req",       status: "pending", group: "Publication" },
  { id: "conditions",         label: "conditions",     status: "qa",  group: "Publication" },
  { id: "visitas",             label: "visitas",         status: "qa",  group: "Publication" },
  { id: "related",            label: "related",        status: "pending", group: "Publication" },
  { id: "group-header",       label: "group-header",   status: "pending", group: "Publication" },
  /* ── Discovery ───────────────────────────────── */
  { id: "quick-filters",    label: "quick-filters", status: "qa",  group: "Discovery" },
  { id: "listing-area",     label: "listing-area",  status: "qa",  group: "Discovery" },
  /* ── Overlays ────────────────────────────────── */
  { id: "fraud-modal",      label: "fraud-modal",   status: "pending", group: "Overlays" },
  /* ── Storefront ──────────────────────────────── */
  { id: "empresa-profile",  label: "empresa-profile", status: "pending", group: "Storefront" },
];

const STATUS_META: Record<ComponentNavItem["status"], { label: string; color: string }> = {
  done:    { label: "done",      color: "var(--vmc-color-status-success, #22c55e)" },
  qa:      { label: "qa",        color: "var(--vmc-color-live,            #ED8936)" },
  pending: { label: "pendiente", color: "var(--vmc-color-text-tertiary,   #99A1AF)" },
};

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function SideNavItem({ item, active }: { item: ComponentNavItem; active: boolean }): JSX.Element {
  const meta = STATUS_META[item.status];

  function handleClick(): void {
    scrollToId(item.id);
  }

  const style: CSSProperties = {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    width:          "100%",
    paddingTop:     6,
    paddingBottom:  6,
    paddingLeft:    12,   /* space.150 */
    paddingRight:   12,
    borderRadius:   4,    /* radius.sm */
    cursor:         "pointer",
    border:         "none",
    textAlign:      "left",
    background:     active
      ? "color-mix(in oklch, var(--vmc-color-background-brand, #22005C) 8%, transparent)"
      : "transparent",
    borderLeft:     active
      ? "2px solid var(--vmc-color-background-brand, #22005C)"
      : "2px solid transparent",
    transition:     "background 120ms ease",
  };

  const labelStyle: CSSProperties = {
    fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
    fontSize:   13,
    fontWeight: active ? 600 : 400,
    lineHeight: "20px",
    color:      active
      ? "var(--vmc-color-text-primary)"
      : "var(--vmc-color-text-secondary)",
  };

  const badgeStyle: CSSProperties = {
    fontSize:      9,
    fontWeight:    600,
    fontFamily:    "monospace",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color:         meta.color,
    flexShrink:    0,
  };

  return (
    <button type="button" style={style} onClick={handleClick}>
      <span style={labelStyle}>{item.label}</span>
      <span style={badgeStyle}>{meta.label}</span>
    </button>
  );
}

function GroupLabel({ label }: { label: string }): JSX.Element {
  return (
    <p
      style={{
        fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        fontSize:      10,
        fontWeight:    600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:         "var(--vmc-color-text-tertiary)",
        margin:        0,
        paddingTop:    16,    /* space.200 */
        paddingBottom: 4,
        paddingLeft:   12,
      }}
    >
      {label}
    </p>
  );
}

export function ComponentesSideNav(): JSX.Element {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(function setupObserver() {
    const ids = COMPONENT_ITEMS.map(function getId(item) { return item.id; });
    const observers: IntersectionObserver[] = [];

    ids.forEach(function observeId(id) {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        function onIntersect(entries) {
          entries.forEach(function handleEntry(entry) {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return function cleanup() {
      observers.forEach(function disconnectObs(obs) { obs.disconnect(); });
    };
  }, []);

  /* Group items */
  const groups = COMPONENT_ITEMS.reduce<Record<string, ComponentNavItem[]>>(
    function groupReducer(acc, item) {
      const key = item.group ?? "General";
      if (!acc[key]) { acc[key] = []; }
      acc[key].push(item);
      return acc;
    },
    {}
  );

  return (
    <aside
      style={{
        width:       220,
        flexShrink:  0,
        position:    "sticky",
        top:         96,           /* header (56px) + area-nav (40px) */
        maxHeight:   "calc(100vh - 96px)",
        overflowY:   "auto",
        paddingTop:  8,
        paddingBottom: 24,
        borderRight: "1px solid var(--vmc-color-border-subtle)",
        background:  "var(--vmc-color-background-primary)",
      }}
    >
      {/* Section header */}
      <p
        style={{
          fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          fontSize:      11,
          fontWeight:    700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "var(--vmc-color-text-tertiary)",
          margin:        0,
          paddingLeft:   12,
          paddingBottom: 8,
        }}
      >
        Componentes
      </p>

      {/* Grouped items */}
      {Object.entries(groups).map(function renderGroup([groupName, items]) {
        return (
          <div key={groupName}>
            <GroupLabel label={groupName} />
            {items.map(function renderItem(item) {
              return (
                <SideNavItem
                  key={item.id}
                  item={item}
                  active={activeId === item.id}
                />
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}
