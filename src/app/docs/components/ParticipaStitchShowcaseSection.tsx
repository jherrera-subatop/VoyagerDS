"use client";

/**
 * ParticipaStitchShowcaseSection
 * Showcase del widget Participa en /docs/componentes.
 * NORMAL : token upgrade aplicado sobre outerHTML legacy (317×422px)
 * DONE   : pendiente (pipeline Figma MCP)
 */

import type { JSX } from "react";
import Participa from "@/features/Participa/Participa";
import { ComponentShowcase } from "./ComponentShowcase";

/* Stitch IDs — placeholder hasta que se suba el screen */
const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "participa-pending-00000000";

const CENTERED: React.CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  alignItems:     "flex-start",
  padding:        "32px 24px",
  background:     "var(--vmc-color-background-secondary, #F2F4F3)",
};

export function ParticipaStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="detail-card"
      title="detail-card"
      description="Widget de participación en subasta · 317×422px · columna derecha · header vault gradient · precio Roboto Mono tabular-nums · VOYAGER v2.1.0"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Participa from "@/features/Participa/Participa";'
    >
      <div style={CENTERED}>
        <Participa />
      </div>
    </ComponentShowcase>
  );
}
