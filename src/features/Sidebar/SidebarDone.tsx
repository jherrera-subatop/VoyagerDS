/**
 * SidebarDone — versión post-Figma · node 1:964
 * Fuente: VMC 2026 Design System · Figma MCP · 2026-04-17
 *
 * Cambios vs Stitch v3:
 * - Hamburger icon en brand area
 * - Label "Hoy" (activo) con border-left 3px cyan negociable
 * - Items 40px height (era 48px)
 * - Sección "Soporte" con label separador
 * - Iconos directos sin contenedor circular
 * - Font 12px SemiBold (era 13px 400/600)
 */

import type { CSSProperties, JSX } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import type { SidebarProps } from './types';

interface DoneNavItem {
  label: string;
  iconPath: string;
  active?: boolean;
}

const MAIN_NAV_ITEMS: DoneNavItem[] = [
  {
    label: 'Hoy',
    active: true,
    iconPath: 'M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  {
    label: 'Tipo de oferta',
    iconPath: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2',
  },
  {
    label: 'Categorías',
    iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  {
    label: 'Empresas',
    iconPath: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  },
];

const SUPPORT_ITEM: DoneNavItem = {
  label: 'Centro de ayuda',
  iconPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01',
};

const DONE_PSEUDO_STYLES = `
  .sidebar-done-link {
    transition: background-color 150ms var(--ease-standard, cubic-bezier(0.3,0,0,1));
  }
  .sidebar-done-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  .sidebar-done-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus, rgba(255,255,255,0.6));
    outline-offset: 2px;
  }
`;

interface NavItemRowProps {
  item: DoneNavItem;
}

const ITEM_STYLE_DEFAULT: CSSProperties = {
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 4,
  backgroundColor: 'transparent',
  cursor: 'default',
  flexShrink: 0,
};

const ITEM_STYLE_ACTIVE: CSSProperties = {
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 17,
  paddingRight: 20,
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.10)',
  borderLeft: '3px solid var(--vmc-color-status-negotiable, #00cace)',
  cursor: 'default',
  flexShrink: 0,
};

/* Icon color tokens — no RGB hardcodeados en atributo SVG */
const ICON_STYLE: CSSProperties = {
  flexShrink: 0,
  color: 'var(--vmc-color-icon-inverse)',
};

const ICON_MUTED_STYLE: CSSProperties = {
  flexShrink: 0,
  /* 25% opacity via color-mix sobre base-white */
  color: 'color-mix(in oklch, var(--vmc-color-icon-inverse) 25%, transparent)',
};

function DoneNavItemRow({ item }: NavItemRowProps): JSX.Element {
  let rowStyle = ITEM_STYLE_DEFAULT;
  if (item.active) {
    rowStyle = ITEM_STYLE_ACTIVE;
  }

  return (
    <div
      className="sidebar-done-link"
      role="listitem"
      tabIndex={0}
      style={rowStyle}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg
          aria-hidden="true"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={ICON_STYLE}
        >
          <path d={item.iconPath} />
        </svg>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--vmc-color-text-inverse)',
            fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
            lineHeight: '20px',
          }}
        >
          {item.label}
        </span>
      </div>

      <svg
        aria-hidden="true"
        width={7}
        height={12}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={ICON_MUTED_STYLE}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

export default function SidebarDone({ className, logoSrc }: SidebarProps): JSX.Element {
  const resolvedLogoSrc = logoSrc ?? '/images/vmc-logo-white.png';
  return (
    <>
      <style>{DONE_PSEUDO_STYLES}</style>
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
        {/* Brand area · 64px · hamburger + wordmark */}
        <div
          style={{
            height: 64,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          {/* Hamburger — stroke vía currentColor + token */}
          <svg
            aria-label="Menú"
            width={18}
            height={12}
            viewBox="0 0 18 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ flexShrink: 0, color: 'var(--vmc-color-icon-inverse)' }}
          >
            <line x1="0" y1="1" x2="18" y2="1" />
            <line x1="0" y1="6" x2="18" y2="6" />
            <line x1="0" y1="11" x2="18" y2="11" />
          </svg>

          {/* Brand: logo VMC */}
          <Image
            src={resolvedLogoSrc}
            alt="VMC Subastas"
            width={120}
            height={27}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            unoptimized={resolvedLogoSrc.startsWith('data:')}
          />
        </div>

        {/* Nav */}
        <nav
          aria-label="Menú principal"
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          {/* Main group */}
          <div
            role="list"
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            {MAIN_NAV_ITEMS.map(function renderMainItem(item) {
              return <DoneNavItemRow key={item.label} item={item} />;
            })}
          </div>

          {/* Soporte section */}
          <div style={{ marginTop: 20 }}>
            <span
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--vmc-color-text-on-dark-subtle)',
                fontFamily: 'var(--font-plus-jakarta-sans, var(--font-display, sans-serif))',
                lineHeight: '16px',
                paddingLeft: 8,
                marginBottom: 4,
              }}
            >
              Soporte
            </span>
            <div role="list">
              <DoneNavItemRow item={SUPPORT_ITEM} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
