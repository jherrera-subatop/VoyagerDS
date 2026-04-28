"use client";

// Glass overlay allowed per DESIGN.md §2.5 — elements overlaying photographic images
import { useState } from "react";
import type { CSSProperties, JSX } from "react";

interface GalleryMainProps {
  images: string[];
  onExpand?: (index: number) => void;
}

const GLASS: CSSProperties = {
  background: "color-mix(in oklch, var(--voyager-color-vault, #22005C) 45%, transparent)",
  backdropFilter: "blur(8px)",
};

function ChevronLeft(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildNavStyle(side: "left" | "right"): CSSProperties {
  const base: CSSProperties = {
    ...GLASS,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--voyager-text-on-dark, #FFFFFF)",
    padding: 0,
  };

  if (side === "left") {
    return { ...base, left: 12 };
  }

  return { ...base, right: 12 };
}

export default function GalleryMain({ images, onExpand }: GalleryMainProps): JSX.Element {
  const [index, setIndex] = useState(0);

  function handlePrev(): void {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function handleNext(): void {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handleExpand(): void {
    if (onExpand) {
      onExpand(index);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        background: "var(--voyager-surface-section, #F2F4F3)",
      }}
    >
      <img
        loading="lazy"
        src={images[index]}
        alt=""
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />

      {/* Nav — prev */}
      <button type="button" style={buildNavStyle("left")} onClick={handlePrev}>
        <ChevronLeft />
      </button>

      {/* Nav — next */}
      <button type="button" style={buildNavStyle("right")} onClick={handleNext}>
        <ChevronRight />
      </button>

      {/* Expand — top right */}
      <button
        type="button"
        onClick={handleExpand}
        style={{
          ...GLASS,
          position: "absolute",
          top: 12,
          right: 12,
          width: 36,
          height: 36,
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--voyager-text-on-dark, #FFFFFF)",
          padding: 0,
        }}
      >
        <ExpandIcon />
      </button>

      {/* Counter — bottom right · Roboto Mono tabular-nums */}
      <div
        style={{
          ...GLASS,
          position: "absolute",
          bottom: 12,
          right: 12,
          padding: "4px 10px",
          borderRadius: "9999px",
          fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
          fontSize: 12,
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
          color: "var(--voyager-text-on-dark, #FFFFFF)",
          lineHeight: "16px",
        }}
      >
        {index + 1}/{images.length}
      </div>
    </div>
  );
}
