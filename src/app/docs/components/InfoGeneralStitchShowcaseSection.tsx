"use client";
import { useState } from "react";
import type { JSX } from "react";
import InfoGeneral, { type InfoGeneralVariant } from "@/features/InfoGeneral/InfoGeneral";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "info-general-pending";

const VARIANTS: { id: InfoGeneralVariant; label: string }[] = [
  { id: "info-general", label: "Información general" },
  { id: "condiciones",  label: "Condiciones del ofrecimiento" },
];

function VariantPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)",
        fontSize: "12px",
        fontWeight: active ? 600 : 400,
        padding: "4px 12px",
        borderRadius: "9999px",
        border: "1px solid var(--color-vault, #22005C)",
        background: active ? "var(--color-vault, #22005C)" : "transparent",
        color: active ? "var(--color-text-on-dark, #FFFFFF)" : "var(--color-vault, #22005C)",
        cursor: "pointer",
        transition: "background 150ms ease, color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function InfoGeneralStitchShowcaseSection(): JSX.Element {
  const [active, setActive] = useState<InfoGeneralVariant>("info-general");

  function handleSelect(v: InfoGeneralVariant): void {
    setActive(v);
  }

  return (
    <ComponentShowcase
      id="info-general"
      title="InfoGeneral"
      description="437x2197px · 2 variantes"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import InfoGeneral from "@/features/InfoGeneral/InfoGeneral";'
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "32px 24px", background: "var(--color-surface-section, #F2F4F3)" }}>
        {/* Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {VARIANTS.map(function renderPill(v) {
            return (
              <VariantPill
                key={v.id}
                label={v.label}
                active={active === v.id}
                onClick={function handleClick() { handleSelect(v.id); }}
              />
            );
          })}
        </div>

        {/* Preview */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "437px" }}>
            <InfoGeneral key={active} variant={active} />
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
