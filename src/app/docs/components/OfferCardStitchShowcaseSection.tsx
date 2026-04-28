"use client";
import type { JSX } from "react";
import { useState } from "react";
import OfferCard from "@/features/OfferCard/OfferCard";
import type { OfferCardVariant } from "@/features/OfferCard/OfferCard";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "offer-card-pending";

const VARIANTS: OfferCardVariant[] = ["en-vivo", "negociable"];

interface VariantPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function VariantPill({ label, active, onClick }: VariantPillProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:      "4px 12px",
        borderRadius: 9999,
        border:       active
          ? "1.5px solid var(--vmc-color-text-brand)"
          : "1.5px solid var(--vmc-color-border-default)",
        background:   active ? "var(--vmc-color-background-brand-subtle)" : "transparent",
        color:        active ? "var(--vmc-color-text-brand)" : "var(--vmc-color-text-secondary)",
        fontSize:     12,
        fontWeight:   active ? 600 : 400,
        cursor:       "pointer",
        fontFamily:   "monospace",
      }}
    >
      {label}
    </button>
  );
}

export function OfferCardStitchShowcaseSection(): JSX.Element {
  const [active, setActive] = useState<OfferCardVariant>("en-vivo");

  function handleEnVivo(): void { setActive("en-vivo"); }
  function handleNegociable(): void { setActive("negociable"); }

  return (
    <ComponentShowcase
      id="offer-card"
      title="offer-card"
      description="176×232px · variante EN VIVO (border-b live) y NEGOCIABLE (border-b negotiable)"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import OfferCard from "@/features/OfferCard/OfferCard";'
    >
      {/* Variant switcher */}
      <div style={{ display: "flex", gap: 8, padding: "12px 24px 0" }}>
        <VariantPill label="en-vivo" active={active === "en-vivo"} onClick={handleEnVivo} />
        <VariantPill label="negociable" active={active === "negociable"} onClick={handleNegociable} />
      </div>

      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--voyager-surface-section)",
        }}
      >
        <OfferCard key={active} variant={active} />
      </div>
    </ComponentShowcase>
  );
}
