"use client";
import type { JSX } from "react";
import ListingArea from "@/features/ListingArea/ListingArea";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "listing-area-pending";

export function EmpresaProfileStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="listing-area"
      title="listing-area"
      description="718×302px · header empresa + grid 4 cards · corner brackets · clock badge · Discovery"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import ListingArea from "@/features/ListingArea/ListingArea";'
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--voyager-surface-section)",
        }}
      >
        <ListingArea />
      </div>
    </ComponentShowcase>
  );
}
