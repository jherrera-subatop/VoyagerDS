"use client";

/**
 * SidebarStitchShowcaseSection
 * Showcase del Sidebar en /docs/componentes.
 * NORMAL : Stitch v3 (score 87/100)
 * DONE   : post-Figma · node 1:964 · 2026-04-17
 */

import type { JSX } from "react";
import SidebarDone from "@/features/Sidebar/SidebarDone";
import { ComponentShowcase } from "./ComponentShowcase";
import { SidebarDoneHandoffPanel } from "./SidebarDoneHandoffPanel";
import { useComponentMode } from "./ComponentModeContext";
import { useFooterImages } from "./FooterImageContext";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "efadbf18a1f24cd99d1b54926af24dd2";

const SIDEBAR_FIGMA_SPEC = `@figma-spec
@component    Sidebar | 256xFull | Page:Stitch

@tokens
  vault         : --vmc-color-background-brand       : #22005C
  textInverse   : --vmc-color-text-inverse           : #FFFFFF
  textMuted     : --vmc-color-text-on-dark-muted     : rgba(255,255,255,0.60)
  textSubtle    : --vmc-color-text-on-dark-subtle    : rgba(255,255,255,0.40)
  iconInverse   : --vmc-color-icon-inverse           : #FFFFFF
  borderFocus   : --vmc-color-border-focus           : rgba(255,255,255,0.60)

@typography
  brand-name : Plus Jakarta Sans | Bold     | 14px | lh:20px | "›vmc‹ Subastas"
  brand-sub  : Plus Jakarta Sans | Regular  | 8px  | lh:12px | SIDEBAR_BRAND_SUB (uppercase, tracking 0.3)
  nav-default: Plus Jakarta Sans | Regular  | 13px | lh:20px | nav item label (muted)
  nav-active : Plus Jakarta Sans | SemiBold | 13px | lh:20px | nav item label (white)

@layers
  root       : COMPONENT : 256xFull : x:0,  y:0  : fill:vault, flex:col
  brand-area : Frame     : 256x64   : x:0,  y:0  : fill:vault, borderBottom:1px rgba(255,255,255,0.08), paddingX:16
  brand-txt  : Text      : autoXauto: x:16, y:22 : style:brand-name, fill:textInverse
  brand-sub  : Text      : autoXauto: x:16, y:44 : style:brand-sub, fill:textSubtle
  nav        : Frame     : 256xAuto : x:0,  y:64 : fill:vault, paddingY:8
  nav-row    : Frame     : 256x48   : x:0,  y:var: fill:transparent (default) | rgba(255,255,255,0.10) (active)
  nav-icon-c : Frame     : 22x22    : x:16, y:13 : fill:none, border:1.5px rgba(255,255,255,0.60), radius:50%
  nav-icon   : SVG       : 12x12    : x:5,  y:5  : stroke:iconInverse
  nav-label  : Text      : autoXauto: x:52, y:14 : style:nav-default|nav-active, fill:textMuted|textInverse
  nav-chevron: SVG       : 14x14    : x:230,y:17 : stroke:iconInverse@25%

@subcomponents
  NavItemRow : inline
    @tokens   bg:transparent|rgba(255,255,255,0.10) | label:textMuted|textInverse
    @layers   row:Frame:256x48:x:0,y:0:fill:var

@variants
  (ninguna — variante determinada por props de cada NavItemRow.active)

@states
  [x] default  : items nav, uno activo (bg rgba(255,255,255,0.10) + label blanco), resto muted
  [x] hover    : sidebar-nav-item:hover → bg rgba(255,255,255,0.05)
  [ ] focus    : focus-visible → outline 2px rgba(255,255,255,0.60), offset -2px
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

const CENTERED: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "32px 24px",
};

export function SidebarStitchShowcaseSection(): JSX.Element {
  const { mode } = useComponentMode();
  const { logoSrc } = useFooterImages();

  return (
    <>
      <ComponentShowcase
        id="sidebar"
        title="Sidebar"
        description="Panel lateral de navegación · 256px · fondo vault #22005C · brand area 64px · 5 nav items · Plus Jakarta Sans · Stitch v3 score 87/100"
        stitchProjectId={STITCH_PROJECT_ID}
        stitchScreenId={STITCH_SCREEN_ID}
        importPath='import SidebarDone from "@/features/Sidebar/SidebarDone";'
        figmaSpec={SIDEBAR_FIGMA_SPEC}
        doneChildren={
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', padding: '32px 24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: 'var(--vmc-color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Extendido · 256px</span>
              <SidebarDone logoSrc={logoSrc} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: 'var(--vmc-color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Colapsado · 64px</span>
              <SidebarDone logoSrc={logoSrc} collapsed />
            </div>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', padding: '32px 24px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: 'var(--vmc-color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Extendido · 256px</span>
            <SidebarDone logoSrc={logoSrc} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: 'var(--vmc-color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Colapsado · 64px</span>
            <SidebarDone logoSrc={logoSrc} collapsed />
          </div>
        </div>
      </ComponentShowcase>
      {mode === "done" && <SidebarDoneHandoffPanel />}
    </>
  );
}
