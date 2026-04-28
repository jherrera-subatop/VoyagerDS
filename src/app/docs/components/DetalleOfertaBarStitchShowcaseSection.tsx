"use client";
import type { JSX } from "react";
import DetalleOfertaBar from "@/features/DetalleOfertaBar/DetalleOfertaBar";
import { ComponentShowcase } from "./ComponentShowcase";
const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "detalle-oferta-bar-pending";
export function DetalleOfertaBarStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="detalle-oferta-bar"
      title="DetalleOfertaBar"
      description="325x65px"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import DetalleOfertaBar from "@/features/DetalleOfertaBar/DetalleOfertaBar";'
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--voyager-surface-section)" }}>
        <DetalleOfertaBar />
      </div>
    </ComponentShowcase>
  );
}
