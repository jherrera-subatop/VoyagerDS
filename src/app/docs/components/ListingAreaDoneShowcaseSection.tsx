"use client";

/**
 * ListingAreaDoneShowcaseSection
 * Showcase del ListingArea en /docs/componentes.
 * DONE: componente completo + panel de estados interactivos del ProfileButton
 * Figma node: 368:3722 · file: 7bjDwC20BX1AFrv9Q8BOIb
 */

import type { CSSProperties, JSX } from "react";
import ListingArea from "@/features/ListingArea/ListingArea";
import ListingAreaDone from "@/features/ListingArea/ListingAreaDone";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "7bjDwC20BX1AFrv9Q8BOIb";
const STITCH_SCREEN_ID  = "368-3722";

const PREVIEW_WRAP: CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  padding:        "40px 24px",
  background:     "var(--vmc-color-background-secondary, #F2F4F3)",
};

export function ListingAreaDoneShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="listing-area"
      title="ListingArea"
      description="Bloque de catálogo por empresa · header bracket + 4 cards · ProfileButton con hover (bg shift), pressed (vault tint + scale 0.97) y focus WCAG 2.2 · tokens DS"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import ListingArea from "@/features/ListingArea/ListingArea";'
      doneChildren={<ListingAreaDone />}
    >
      <div style={PREVIEW_WRAP}>
        <ListingArea />
      </div>
    </ComponentShowcase>
  );
}
