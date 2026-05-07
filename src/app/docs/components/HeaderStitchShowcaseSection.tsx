"use client";
import type { JSX } from "react";
import Header from "@/features/Header";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "pending";

const WRAP: React.CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           8,
  padding:       "24px",
  background:    "#F2F4F3",
};

export function HeaderStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="header"
      title="Header"
      description="Barra de navegación superior · 1024×64px · fondo vault · pill Ingresa (guest) · pill Bienvenido (logged-in) · hover/pressed naranja"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Header from "@/features/Header";'
    >
      <div style={WRAP}>
        <Header />
        <Header user="ZAEX5G" />
      </div>
    </ComponentShowcase>
  );
}
