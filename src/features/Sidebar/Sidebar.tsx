/**
 * Sidebar — panel de navegación principal VMC Subastas
 * Fuente: Stitch pipeline v3 · score 87/100 · 2026-04-17
 * Spec: 256px × full-height · fondo vault #22005C · Plus Jakarta Sans
 *
 * NORMAL en /docs/componentes = este archivo (output Stitch → tokens DS)
 * DONE   = versión post-Figma MCP (pendiente)
 */

import type { CSSProperties, JSX } from 'react';
import { clsx } from 'clsx';
import { SIDEBAR_BRAND_SUB, SIDEBAR_NAV_ITEMS } from './constants';
import type { SidebarNavItem, SidebarProps } from './types';

const SIDEBAR_PSEUDO_STYLES = `
  .sidebar-nav-item {
    transition: background-color 150ms var(--ease-standard, cubic-bezier(0.3,0,0,1));
  }
  .sidebar-nav-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  .sidebar-nav-item:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus, rgba(255,255,255,0.6));
    outline-offset: -2px;
  }
`;

interface NavItemRowProps {
  item: SidebarNavItem;
}

const ROW_STYLE_DEFAULT: CSSProperties = {
  height: 48,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  gap: 12,
  justifyContent: 'space-between',
  backgroundColor: 'transparent',
  cursor: 'default',
};

const ROW_STYLE_ACTIVE: CSSProperties = {
  height: 48,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  gap: 12,
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255,255,255,0.10)',
  cursor: 'default',
};

const LABEL_STYLE_DEFAULT: CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: 'var(--vmc-color-text-on-dark-muted)',
  fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
  lineHeight: '20px',
};

const LABEL_STYLE_ACTIVE: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--vmc-color-text-inverse)',
  fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
  lineHeight: '20px',
};

function NavItemRow({ item }: NavItemRowProps): JSX.Element {
  let rowStyle = ROW_STYLE_DEFAULT;
  let labelStyle = LABEL_STYLE_DEFAULT;
  if (item.active) {
    rowStyle = ROW_STYLE_ACTIVE;
    labelStyle = LABEL_STYLE_ACTIVE;
  }

  return (
    <div
      className="sidebar-nav-item"
      role="listitem"
      style={rowStyle}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Ícono circular · 22px · borde 1.5px blanco · spec Stitch v3 */}
        <div
          aria-hidden="true"
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.60)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--vmc-color-icon-inverse)' }}
          >
            <path d={item.iconPath} />
          </svg>
        </div>

        <span style={labelStyle}>
          {item.label}
        </span>
      </div>

      <svg
        aria-hidden="true"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'color-mix(in oklch, var(--vmc-color-icon-inverse) 25%, transparent)' }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

export default function Sidebar({ className }: SidebarProps): JSX.Element {
  return (
    <>
      <style>{SIDEBAR_PSEUDO_STYLES}</style>
      <aside
        className={clsx(className)}
        aria-label="Navegación principal"
        style={{
          width: 256,
          backgroundColor: 'var(--vmc-color-background-brand)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Brand area · 64px · spec DS */}
        <div
          style={{
            height: 64,
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--vmc-color-text-inverse, #fff)',
              fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
              letterSpacing: -0.3,
              lineHeight: '20px',
            }}
          >
            <span style={{ opacity: 0.65 }}>›</span>vmc
            <span style={{ opacity: 0.65 }}>‹</span>{' '}
            <span style={{ fontWeight: 400 }}>Subastas</span>
          </span>
          <span
            style={{
              fontSize: 8,
              color: 'var(--vmc-color-text-on-dark-subtle, rgba(255,255,255,0.40))',
              fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
              letterSpacing: 0.3,
              lineHeight: '12px',
            }}
          >
            {SIDEBAR_BRAND_SUB}
          </span>
        </div>

        {/* Nav items */}
        <nav aria-label="Menú principal" style={{ paddingTop: 8, paddingBottom: 8 }}>
          <div role="list">
            {SIDEBAR_NAV_ITEMS.map(function renderNavItem(item) {
              return <NavItemRow key={item.label} item={item} />;
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
