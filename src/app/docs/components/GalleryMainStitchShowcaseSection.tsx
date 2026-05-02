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

const GALLERY_MAIN_FIGMA_SPEC = `@figma-spec
@component    GalleryMain | 449x362 | Page:Stitch

@tokens
  vault     : --voyager-color-vault    : #22005C
  onDark    : --voyager-text-on-dark   : #FFFFFF
  surfSect  : --voyager-surface-section: #F2F4F3
  glass     : color-mix(in oklch, var(--voyager-color-vault,#22005C) 45%, transparent) + blur:8px

@typography
  counter : Roboto Mono | Medium | 12px | lh:16px | "1/2" (tabular-nums)

@layers
  root       : COMPONENT : 449x362 : x:0,  y:0   : fill:surfSect, radius:4px, overflow:hidden
  main-img   : Image     : 449x362 : x:0,  y:0   : fill:cover, objectPosition:center
  nav-left   : Frame     : 36x36   : x:12, y:163  : fill:glass, radius:9999
  nav-right  : Frame     : 36x36   : x:401,y:163  : fill:glass, radius:9999
  expand-btn : Frame     : 36x36   : x:401,y:12   : fill:glass, radius:9999
  chevron-L  : SVG       : 16x16   : x:10, y:10   : stroke:onDark
  chevron-R  : SVG       : 16x16   : x:10, y:10   : stroke:onDark
  expand-ico : SVG       : 16x16   : x:10, y:10   : stroke:onDark
  counter    : Frame     : autoXauto:x:365,y:338  : fill:glass, radius:9999, padding:4 10
  counter-txt: Text      : autoXauto:x:10,y:4     : style:counter, fill:onDark

@subcomponents
  (ninguno — componente autónomo)

@variants
  (ninguna — un único estado)

@states
  [x] default  : imagen activa, contador "1/N", botones nav laterales + expand
  [ ] hover    : (futuro) botones nav con opacity 0.9
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a — sin imágenes oculta navs
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function GalleryMainStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="gallery-main"
      title="gallery-main"
      description="449x362px · navegación + expand + contador"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import GalleryMain from "@/features/GalleryMain/GalleryMain";'
      figmaSpec={GALLERY_MAIN_FIGMA_SPEC}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--vmc-color-background-secondary)" }}>
        <div style={{ width: 449, height: 362, borderRadius: 4, overflow: "hidden" }}>
          <GalleryMain images={DEMO_IMAGES} />
        </div>
      </div>
    </ComponentShowcase>
  );
}
