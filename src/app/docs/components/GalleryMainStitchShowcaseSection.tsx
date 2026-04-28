"use client";
import type { JSX } from "react";
import GalleryMain from "@/features/GalleryMain/GalleryMain";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "gallery-main-pending";

const DEMO_IMAGES = [
  "/demo/bronco.jpg",
  "https://cdn.vmcsubastas.com/images/auction/61494/69efe8723f0fa.jpeg",
];

export function GalleryMainStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="gallery-main"
      title="gallery-main"
      description="449x362px · navegación + expand + contador"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import GalleryMain from "@/features/GalleryMain/GalleryMain";'
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--voyager-surface-section)" }}>
        <div style={{ width: 449, height: 362, borderRadius: 4, overflow: "hidden" }}>
          <GalleryMain images={DEMO_IMAGES} />
        </div>
      </div>
    </ComponentShowcase>
  );
}
