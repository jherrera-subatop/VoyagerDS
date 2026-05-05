"use client";
import type { JSX } from "react";
import BracketTitle from "@/features/BracketTitle";
import { ComponentShowcase } from "./ComponentShowcase";

export function BracketTitleStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="bracket-title"
      title="bracket-title"
      description="Header de empresa con corchetes de marca · ancho hug-content · CornerBR anclado al padding inferior-derecho"
      stitchProjectId="pending"
      stitchScreenId="pending"
      importPath='import BracketTitle from "@/features/BracketTitle";'
    >
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            48,
        flexWrap:       "wrap",
        padding:        "32px 24px",
        background:     "var(--voyager-surface-section, #F2F4F3)",
      }}>
        <BracketTitle name="Santander Consumer" count={9}  />
        <BracketTitle name="Maquisistema"        count={12} />
        <BracketTitle name="BCP"                 count={47} />
      </div>
    </ComponentShowcase>
  );
}
