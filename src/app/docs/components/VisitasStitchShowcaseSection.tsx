"use client";
import type { JSX } from "react";
import Visitas from "@/features/Visitas/Visitas";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "visitas-pending";

export function VisitasStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="visitas"
      title="visitas"
      description="317×429px · accordion card · corner brackets · skeleton placeholders · CTA"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Visitas from "@/features/Visitas/Visitas";'
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--voyager-surface-section)",
        }}
      >
        <Visitas />
      </div>
    </ComponentShowcase>
  );
}
