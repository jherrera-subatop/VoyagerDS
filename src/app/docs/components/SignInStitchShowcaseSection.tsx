"use client";

/**
 * SignInStitchShowcaseSection
 * Showcase del formulario SignIn en /docs/componentes.
 * NORMAL : token upgrade aplicado sobre outerHTML legacy (790×581px)
 * DONE   : pendiente (pipeline Figma MCP)
 */

import type { JSX } from "react";
import SignIn from "@/features/SignIn/SignIn";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "sign-in-pending";

const CENTERED: React.CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  padding:        "32px 24px",
  background:     "var(--vmc-color-background-secondary, #F2F4F3)",
};

export function SignInStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="sign-in"
      title="SignIn"
      description="Formulario de inicio de sesión · 790×581px · fondo surface-page · inputs Roboto · Plus Jakarta Sans · VOYAGER v2.1.0"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import SignIn from "@/features/SignIn/SignIn";'
    >
      <div style={CENTERED}>
        <SignIn />
      </div>
    </ComponentShowcase>
  );
}
