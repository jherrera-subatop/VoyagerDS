"use client";
import type { JSX } from "react";
import RelatedCard from "@/features/RelatedCard/RelatedCard";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "related-card-pending";

export function RelatedCardStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="related-card"
      title="related-card"
      description="317×464px · Ofertas Relacionadas · grid 2 cols · border-b-8 live accent"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import RelatedCard from "@/features/RelatedCard/RelatedCard";'
    >
      <div
        style={{
          display:         "flex",
          justifyContent:  "center",
          padding:         "32px 24px",
          background:      "var(--voyager-surface-section)",
        }}
      >
        <RelatedCard />
      </div>
    </ComponentShowcase>
  );
}
