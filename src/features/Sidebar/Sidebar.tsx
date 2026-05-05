'use client';

/**
 * Sidebar — panel de navegación principal VMC Subastas
 * 256px × full-height · vault bg · acordeones anidados
 */

import { useState } from 'react';
import type { CSSProperties, JSX } from 'react';
import { clsx } from 'clsx';
import { SIDEBAR_BRAND_SUB, SIDEBAR_NAV_ITEMS } from './constants';
import type { SidebarNavItem, SidebarSubItem, SidebarProps } from './types';

const COLLAPSED_STYLES = `
  .sb-icon-btn {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           48px;
    height:          48px;
    border-radius:   8px;
    cursor:          pointer;
    user-select:     none;
    transition:      background-color 150ms cubic-bezier(0.3,0,0,1);
  }
  .sb-icon-btn:hover { background-color: rgba(255,255,255,0.08); }
  .sb-icon-btn--active {
    background-color:  rgba(255,255,255,0.08);
    border-left: 3px solid var(--voyager-color-negotiable, #00CACE);
  }
  .sb-icon-btn:focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: -2px;
  }
`;

const STYLES = `
  .sb-row {
    transition: background-color 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
    user-select: none;
  }
  .sb-row:hover { background-color: rgba(255,255,255,0.06); }
  .sb-row:focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: -2px;
  }
  .sb-chevron {
    transition: transform 150ms cubic-bezier(0.3,0,0,1);
  }
  .sb-chevron--open { transform: rotate(90deg); }
  .sb-top-item {
    border-left: 4px solid transparent;
    transition: border-color 150ms cubic-bezier(0.3,0,0,1),
                background-color 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
    user-select: none;
  }
  .sb-top-item:hover {
    background-color: rgba(255,255,255,0.06);
  }
  .sb-top-item--active {
    border-left-color: var(--voyager-color-negotiable, #00CACE) !important;
    background-color: rgba(255,255,255,0.08);
  }
  .sb-top-item:focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: -2px;
  }
`;

/* ── Icons ───────────────────────────────────────────────────── */
function HamburgerIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ color: 'rgba(255,255,255,0.80)', flexShrink: 0 }}>
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

interface ChevronProps { open: boolean }
function ChevronIcon({ open }: ChevronProps): JSX.Element {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round"
      className={open ? 'sb-chevron sb-chevron--open' : 'sb-chevron'}
      style={{ color: 'rgba(255,255,255,0.40)', flexShrink: 0 }}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/* ── Section divider ─────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }): JSX.Element {
  return (
    <div style={{
      padding:       '20px 20px 8px',
      fontSize:      11,
      fontWeight:    600,
      color:         'rgba(255,255,255,0.35)',
      fontFamily:    'var(--font-display, "Plus Jakarta Sans", sans-serif)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    }}>
      {label}
    </div>
  );
}

/* ── Sub-item (level 1 and 2) ────────────────────────────────── */
interface SubItemProps {
  item:      SidebarSubItem;
  depth:     number;
  expanded:  Set<string>;
  onToggle:  (label: string) => void;
}

function SubItem({ item, depth, expanded, onToggle }: SubItemProps): JSX.Element {
  const isOpen     = expanded.has(item.label);
  const hasChildren = item.children !== undefined && item.children.length > 0;
  const indent      = depth === 1 ? 20 : depth === 2 ? 40 : 56;

  const rowStyle: CSSProperties = {
    display:    'flex',
    alignItems: 'center',
    height:     44,
    paddingLeft:  indent,
    paddingRight: 16,
    gap:          8,
    backgroundColor: isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
  };

  const labelStyle: CSSProperties = {
    flex:       1,
    fontSize:   13,
    fontWeight: 400,
    color:      'rgba(255,255,255,0.85)',
    fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
    overflow:   'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const countStyle: CSSProperties = {
    fontSize:   12,
    color:      'rgba(255,255,255,0.40)',
    fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
    flexShrink: 0,
  };

  return (
    <div>
      <div
        className="sb-row"
        role="button"
        tabIndex={0}
        data-label={item.label}
        style={rowStyle}
        onClick={hasChildren ? onToggle.bind(null, item.label) : undefined}
      >
        {depth >= 2 && (
          <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 14, flexShrink: 0 }}>•</span>
        )}
        <span style={labelStyle}>{item.label}</span>
        {item.count !== undefined && (
          <span style={countStyle}>({item.count})</span>
        )}
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && hasChildren && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}>
          {item.children!.map(function renderChild(child) {
            return (
              <SubItem
                key={child.label}
                item={child}
                depth={depth + 1}
                expanded={expanded}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Top-level nav item ──────────────────────────────────────── */
interface NavItemRowProps {
  item:       SidebarNavItem;
  expanded:   Set<string>;
  activeItem: string | null;
  onToggle:   (label: string) => void;
  onActivate: (label: string) => void;
}

function NavItemRow({ item, expanded, activeItem, onToggle, onActivate }: NavItemRowProps): JSX.Element {
  const isOpen      = expanded.has(item.label);
  const isActive    = activeItem === item.label;
  const hasChildren = item.children !== undefined && item.children.length > 0;

  const rowStyle: CSSProperties = {
    height:        64,
    display:       'flex',
    alignItems:    'center',
    paddingLeft:   16,
    paddingRight:  16,
    gap:           14,
    justifyContent:'space-between',
    boxSizing:     'border-box',
  };

  const labelStyle: CSSProperties = {
    flex:       1,
    fontSize:   15,
    fontWeight: isActive ? 600 : 400,
    color:      isActive ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
    fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
    lineHeight: '22px',
  };

  return (
    <div>
      <div
        className={isActive ? 'sb-top-item sb-top-item--active' : 'sb-top-item'}
        role="button"
        tabIndex={0}
        data-label={item.label}
        style={rowStyle}
        onClick={function handleClick() { onActivate(item.label); onToggle(item.label); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.75"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)', flexShrink: 0 }}>
            <path d={item.iconPath} />
          </svg>
          <span style={labelStyle}>{item.label}</span>
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && hasChildren && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
          {item.children!.map(function renderSub(sub) {
            return (
              <SubItem
                key={sub.label}
                item={sub}
                depth={1}
                expanded={expanded}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function collectAllLabels(items: SidebarSubItem[]): string[] {
  const labels: string[] = [];
  for (const item of items) {
    labels.push(item.label);
    if (item.children !== undefined && item.children.length > 0) {
      labels.push(...collectAllLabels(item.children));
    }
  }
  return labels;
}

function findSubItem(items: SidebarSubItem[], label: string): SidebarSubItem | undefined {
  for (const item of items) {
    if (item.label === label) { return item; }
    if (item.children !== undefined) {
      const found = findSubItem(item.children, label);
      if (found !== undefined) { return found; }
    }
  }
  return undefined;
}

/* ── Root ────────────────────────────────────────────────────── */
export default function Sidebar({ className, defaultActive = null, defaultExpanded = [], defaultCollapsed = false }: SidebarProps): JSX.Element {
  const [expanded,   setExpanded]   = useState<Set<string>>(new Set(defaultExpanded));
  const [activeItem, setActiveItem] = useState<string | null>(defaultActive);
  const [collapsed,  setCollapsed]  = useState<boolean>(defaultCollapsed);

  function handleCollapseToggle(): void {
    setCollapsed(!collapsed);
  }

  function handleActivate(label: string): void {
    setActiveItem(label);
  }

  function handleToggle(label: string): void {
    const next = new Set(expanded);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
      const navItem = SIDEBAR_NAV_ITEMS.find(function findNav(i) { return i.label === label; });
      if (navItem?.children !== undefined) {
        for (const l of collectAllLabels(navItem.children)) { next.add(l); }
      } else {
        for (const navI of SIDEBAR_NAV_ITEMS) {
          if (navI.children !== undefined) {
            const sub = findSubItem(navI.children, label);
            if (sub?.children !== undefined) {
              for (const l of collectAllLabels(sub.children)) { next.add(l); }
            }
          }
        }
      }
    }
    setExpanded(next);
  }

  /* ── Collapsed (icon-only) ───────────────────────────────────── */
  if (collapsed) {
    return (
      <>
        <style>{COLLAPSED_STYLES}</style>
        <aside
          className={clsx(className)}
          aria-label="Navegación principal"
          style={{
            width:           64,
            backgroundColor: 'var(--voyager-color-vault, #22005C)',
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            flexShrink:      0,
            minHeight:       '100vh',
            paddingTop:      16,
            paddingBottom:   16,
            gap:             8,
          }}
        >
          {/* Hamburger — toggle back */}
          <div
            className="sb-icon-btn"
            role="button"
            tabIndex={0}
            aria-label="Expandir menú"
            onClick={handleCollapseToggle}
          >
            <HamburgerIcon />
          </div>

          {/* Divider */}
          <div style={{ width: 32, height: 1, backgroundColor: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />

          {/* Nav icons */}
          <nav aria-label="Menú principal" style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', alignItems: 'center' }}>
            {SIDEBAR_NAV_ITEMS.map(function renderIcon(item) {
              const isActive = activeItem === item.label;
              return (
                <div
                  key={item.label}
                  className={isActive ? 'sb-icon-btn sb-icon-btn--active' : 'sb-icon-btn'}
                  role="button"
                  tabIndex={0}
                  aria-label={item.label}
                  onClick={function handleIconClick() {
                    handleActivate(item.label);
                    setCollapsed(false);
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)' }}>
                    <path d={item.iconPath} />
                  </svg>
                </div>
              );
            })}
          </nav>
        </aside>
      </>
    );
  }

  /* ── Expanded (full) ──────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>
      <aside
        className={clsx(className)}
        aria-label="Navegación principal"
        style={{
          width:           256,
          backgroundColor: 'var(--voyager-color-vault, #22005C)',
          display:         'flex',
          flexDirection:   'column',
          flexShrink:      0,
          minHeight:       '100vh',
        }}
      >
        {/* Brand */}
        <div style={{
          height:       80,
          padding:      '0 16px',
          display:      'flex',
          alignItems:   'center',
          gap:          12,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink:   0,
          cursor:       'pointer',
        }}
          onClick={handleCollapseToggle}
          role="button"
          tabIndex={0}
          aria-label="Colapsar menú"
        >
          <img
            src="/images/vmc-logo-white.png"
            alt="VMC Subastas"
            style={{ height: 32, width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Nav */}
        <nav aria-label="Menú principal" style={{ paddingTop: 8, flex: 1 }}>
          <div role="list">
            {SIDEBAR_NAV_ITEMS.map(function renderItem(item) {
              return (
                <div key={item.label}>
                  {item.sectionBefore !== undefined && (
                    <SectionDivider label={item.sectionBefore} />
                  )}
                  <NavItemRow
                    item={item}
                    expanded={expanded}
                    activeItem={activeItem}
                    onToggle={handleToggle}
                    onActivate={handleActivate}
                  />
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
