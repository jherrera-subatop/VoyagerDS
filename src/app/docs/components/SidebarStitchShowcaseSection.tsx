"use client";

/**
 * SidebarStitchShowcaseSection
 * Showcase del Sidebar en /docs/componentes.
 * NORMAL : Stitch v3 (score 87/100)
 * DONE   : post-Figma · node 1:964 · 2026-04-17
 */

import type { JSX } from "react";
import Sidebar from "@/features/Sidebar/Sidebar";
import SidebarDone from "@/features/Sidebar/SidebarDone";
import { ComponentShowcase } from "./ComponentShowcase";
import { SidebarDoneHandoffPanel } from "./SidebarDoneHandoffPanel";
import { useComponentMode } from "./ComponentModeContext";
import { useFooterImages } from "./FooterImageContext";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "efadbf18a1f24cd99d1b54926af24dd2";

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
        doneChildren={
          <div style={CENTERED}>
            <SidebarDone logoSrc={logoSrc} />
          </div>
        }
      >
        <div style={CENTERED}>
          <Sidebar />
        </div>
      </ComponentShowcase>
      {mode === "done" && <SidebarDoneHandoffPanel />}
    </>
  );
}
