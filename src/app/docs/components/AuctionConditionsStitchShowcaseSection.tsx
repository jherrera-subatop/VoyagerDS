"use client";
import type { JSX } from "react";
import AuctionConditions from "@/features/AuctionConditions/AuctionConditions";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "conditions-pending";

export function AuctionConditionsStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="conditions"
      title="AuctionConditions"
      description="317x190px"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import AuctionConditions from "@/features/AuctionConditions/AuctionConditions";'
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--color-surface-section, #F2F4F3)" }}>
        <AuctionConditions />
      </div>
    </ComponentShowcase>
  );
}
