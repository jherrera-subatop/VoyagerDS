/**
 * @figma-spec
 * @component    Sidebar | 256xFull | Page:Stitch
 *
 * @tokens
 *   vault         : --vmc-color-background-brand       : #22005C
 *   textInverse   : --vmc-color-text-inverse           : #FFFFFF
 *   textMuted     : --vmc-color-text-on-dark-muted     : (rgba(255,255,255,0.60))
 *   textSubtle    : --vmc-color-text-on-dark-subtle     : (rgba(255,255,255,0.40))
 *   iconInverse   : --vmc-color-icon-inverse           : #FFFFFF
 *   borderFocus   : --vmc-color-border-focus           : rgba(255,255,255,0.60)
 *
 * @typography
 *   brand-name : Plus Jakarta Sans | Bold    | 14px | lh:20px | "›vmc‹ Subastas"
 *   brand-sub  : Plus Jakarta Sans | Regular | 8px  | lh:12px | SIDEBAR_BRAND_SUB (uppercase, tracking 0.3)
 *   nav-default: Plus Jakarta Sans | Regular | 13px | lh:20px | nav item label (muted)
 *   nav-active : Plus Jakarta Sans | SemiBold| 13px | lh:20px | nav item label (white)
 *
 * @layers
 *   root       : COMPONENT : 256xFull : x:0,  y:0  : fill:vault, flex:col
 *   brand-area : Frame     : 256x64   : x:0,  y:0  : fill:vault, borderBottom:1px rgba(255,255,255,0.08), paddingX:16
 *   brand-txt  : Text      : autoXauto: x:16, y:22 : style:brand-name, fill:textInverse
 *   brand-sub  : Text      : autoXauto: x:16, y:44 : style:brand-sub, fill:textSubtle
 *   nav        : Frame     : 256xAuto : x:0,  y:64 : fill:vault, paddingY:8
 *   nav-row    : Frame     : 256x48   : x:0,  y:var: fill:transparent (default) | rgba(255,255,255,0.10) (active)
 *   nav-icon-c : Frame     : 22x22    : x:16, y:13 : fill:none, border:1.5px rgba(255,255,255,0.60), radius:50%
 *   nav-icon   : SVG       : 12x12    : x:5,  y:5  : stroke:iconInverse
 *   nav-label  : Text      : autoXauto: x:52, y:14 : style:nav-default|nav-active, fill:textMuted|textInverse
 *   nav-chevron: SVG       : 14x14    : x:230,y:17 : stroke:iconInverse@25%
 *
 * @subcomponents
 *   NavItemRow : inline
 *     @tokens   bg:transparent|rgba(255,255,255,0.10) | label:textMuted|textInverse
 *     @layers   row:Frame:256x48:x:0,y:0:fill:var
 *
 * @variants
 *   (ninguna — variante determinada por props de cada NavItemRow.active)
 *
 * @states
 *   [x] default  : items nav, uno activo (bg rgba(255,255,255,0.10) + label blanco), resto muted
 *   [x] hover    : sidebar-nav-item:hover → bg rgba(255,255,255,0.05)
 *   [ ] focus    : focus-visible → outline 2px rgba(255,255,255,0.60), offset -2px
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

/**
 * Sidebar — panel de navegación principal VMC Subastas
 * Fuente: Stitch pipeline v3 · score 87/100 · 2026-04-17
 * Spec: 256px × full-height · fondo vault #22005C · Plus Jakarta Sans
 *
 * NORMAL en /docs/componentes = este archivo (output Stitch → tokens DS)
 * DONE   = versión post-Figma MCP (pendiente)
 */

import type { CSSProperties, JSX } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { SIDEBAR_NAV_ITEMS } from './constants';
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

export default function Sidebar({ className, logoSrc }: SidebarProps): JSX.Element {
  const resolvedLogoSrc = logoSrc ?? '/images/vmc-logo-white.png';
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
        {/* Brand area · 64px · hamburger + logo */}
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
          <Image
            src={resolvedLogoSrc}
            alt="VMC Subastas"
            width={120}
            height={27}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            unoptimized={resolvedLogoSrc.startsWith('data:')}
          />
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
