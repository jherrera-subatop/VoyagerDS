"use client";
import type { JSX } from "react";
import QuickFilters from "@/features/QuickFilters/QuickFilters";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "quick-filters-pending";

export function QuickFiltersStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="quick-filters"
      title="quick-filters"
      description="766×152px · Tipo de oferta + Categorías · corner brackets · vault-mid bg"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import QuickFilters from "@/features/QuickFilters/QuickFilters";'
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--voyager-surface-section)",
        }}
      >
        <QuickFilters />
      </div>
    </ComponentShowcase>
  );
}
