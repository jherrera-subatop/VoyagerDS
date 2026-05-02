/**
 * @figma-spec
 * @component    GalleryFilmstrip | 449x79 | Page:Stitch
 *
 * @tokens
 *   vault : --voyager-color-vault : #22005C
 *
 * @typography
 *   (ninguna — componente solo imágenes)
 *
 * @layers
 *   root       : COMPONENT : 449x79  : x:0,  y:0  : fill:none, paddingRight:12, marginTop:12
 *   scroll-ctr : Frame     : 449x79  : x:0,  y:0  : fill:none, overflowX:auto, scrollbarWidth:none
 *   slide-wrap : Frame     : 537x79  : x:0,  y:0  : fill:none, flex:row
 *   slide      : Frame     : 105x79  : x:var,y:0  : fill:none, radius:4px, overflow:hidden, marginRight:5
 *   thumb-img  : Image     : 105x79  : x:0,  y:0  : fill:cover, objectPosition:center, radius:4px
 *   active-ring: Frame     : 105x79  : x:0,  y:0  : fill:none, boxShadow:inset 0 0 0 2px vault
 *
 * @subcomponents
 *   (ninguno — componente autónomo)
 *
 * @variants
 *   (ninguna — un único estado)
 *
 * @states
 *   [x] default   : 5 thumbs horizontales, thumb 0 activo con ring vault 2px
 *   [ ] hover     : (futuro) thumb opacity 1
 *   [ ] focus     : (futuro)
 *   [ ] active    : ring inset 0 0 0 2px vault, opacity 1
 *   [ ] disabled  : n/a
 *   [ ] loading   : n/a
 *   [ ] error     : n/a
 */

/**
 * GalleryFilmstrip — UI Upgrade
 * 449×79px · 5-thumb interactive horizontal filmstrip · VOYAGER v2.1.0
 *
 * Behavior:
 *   Click thumb → becomes active (vault ring) + container scrolls to it smoothly
 *   Scrollbar hidden (CSS) — gesture/drag scroll still works
 *
 * Token map:
 *   rounded cursor-pointer    → borderRadius 4 / cursor pointer
 *   swiper-thumb-active       → inset box-shadow 2px vault
 *   w-full pr-3 mt-3          → width 100% / paddingRight 12 / marginTop 12
 */

"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

const V = {
  vault: "var(--vmc-color-vault-900)",
} as const;

const SLIDE_WIDTH   = 105.5;
const SLIDE_GAP     = 5;
const SLIDE_STEP    = SLIDE_WIDTH + SLIDE_GAP;   /* 110.5px per slide */
const FILM_HEIGHT   = 79;

const SRCS = [
  "/demo/bronco.jpg",
  "/demo/bronco.jpg",
  "/demo/bronco.jpg",
  "/demo/bronco.jpg",
  "/demo/bronco.jpg",
];

/* ── Component ───────────────────────────────────────────────── */
export default function GalleryFilmstrip(): JSX.Element {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function scrollToSlide(idx: number): void {
    const el = containerRef.current;
    if (!el) return;
    /* center the clicked slide inside the visible strip */
    const targetLeft = idx * SLIDE_STEP - (el.offsetWidth / 2) + (SLIDE_STEP / 2);
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }

  function makeClickHandler(idx: number): () => void {
    return function handleClick(): void {
      setActiveIdx(idx);
      scrollToSlide(idx);
    };
  }

  return (
    <div
      style={{
        width:        "100%",
        paddingRight: 12,   /* pr-3 */
        marginTop:    12,   /* mt-3 */
      }}
    >
      <div
        id="product-slider-thumbs"
        className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-thumbs"
        ref={containerRef}
        style={{
          overflowX:       "auto",
          position:        "relative",
          scrollBehavior:  "smooth",
          /* hide scrollbar — gesture drag still works */
          scrollbarWidth:  "none",
        }}
      >
        <div
          className="swiper-wrapper"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {SRCS.map(function renderSlide(src, i) {
            const isActive = i === activeIdx;

            /* build swiper class string to match outerHTML contract */
            let slideClass = "swiper-slide";
            if (isActive)     { slideClass += " swiper-slide-active swiper-slide-thumb-active"; }
            if (i === activeIdx + 1) { slideClass += " swiper-slide-next"; }

            return (
              <div
                key={i}
                className={slideClass}
                style={{
                  width:        SLIDE_WIDTH,
                  marginRight:  SLIDE_GAP,
                  flexShrink:   0,
                  borderRadius: 4,          /* rounded */
                  overflow:     "hidden",
                  boxShadow:    isActive
                    ? `inset 0 0 0 2px ${V.vault}`
                    : "none",
                  transition:   "box-shadow 150ms ease",
                }}
                onClick={makeClickHandler(i)}
              >
                <img
                  loading="lazy"
                  src={src}
                  width={106}
                  height={98}
                  alt=""
                  style={{
                    objectFit:      "cover",    /* object-cover */
                    objectPosition: "center",   /* object-center */
                    width:          "100%",
                    height:         FILM_HEIGHT,
                    display:        "block",
                    borderRadius:   4,          /* rounded */
                    cursor:         "pointer",  /* cursor-pointer */
                    transition:     "opacity 150ms ease",
                    opacity:        isActive ? 1 : 0.82,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* hide webkit scrollbar */}
      <style>{`
        #product-slider-thumbs::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
