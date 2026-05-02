"use client";
import type { JSX } from "react";
import GalleryFilmstrip from "@/features/GalleryFilmstrip/GalleryFilmstrip";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "gallery-filmstrip-pending";

const GALLERY_FILMSTRIP_FIGMA_SPEC = `@figma-spec
@component    GalleryFilmstrip | 449x79 | Page:Stitch

@tokens
  vault : --voyager-color-vault : #22005C

@typography
  (ninguna — componente solo imágenes)

@layers
  root       : COMPONENT : 449x79  : x:0,  y:0  : fill:none, paddingRight:12, marginTop:12
  scroll-ctr : Frame     : 449x79  : x:0,  y:0  : fill:none, overflowX:auto, scrollbarWidth:none
  slide-wrap : Frame     : 537x79  : x:0,  y:0  : fill:none, flex:row
  slide      : Frame     : 105x79  : x:var,y:0  : fill:none, radius:4px, overflow:hidden, marginRight:5
  thumb-img  : Image     : 105x79  : x:0,  y:0  : fill:cover, objectPosition:center, radius:4px
  active-ring: Frame     : 105x79  : x:0,  y:0  : fill:none, boxShadow:inset 0 0 0 2px vault

@subcomponents
  (ninguno — componente autónomo)

@variants
  (ninguna — un único estado)

@states
  [x] default   : 5 thumbs horizontales, thumb 0 activo con ring vault 2px
  [ ] hover     : (futuro) thumb opacity 1
  [ ] focus     : (futuro)
  [x] active    : ring inset 0 0 0 2px vault, opacity 1
  [ ] disabled  : n/a
  [ ] loading   : n/a
  [ ] error     : n/a`;

export function GalleryFilmstripStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="gallery-filmstrip"
      title="gallery-filmstrip"
      description="449×79px · filmstrip de miniaturas · thumb activo con ring vault · 5 slides"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import GalleryFilmstrip from "@/features/GalleryFilmstrip/GalleryFilmstrip";'
      figmaSpec={GALLERY_FILMSTRIP_FIGMA_SPEC}
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--voyager-surface-section)",
        }}
      >
        <div style={{ width: 449 }}>
          <GalleryFilmstrip />
        </div>
      </div>
    </ComponentShowcase>
  );
}
