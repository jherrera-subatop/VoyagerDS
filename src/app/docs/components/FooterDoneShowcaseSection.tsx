"use client";

/**
 * FooterDoneShowcaseSection
 * Client wrapper para el showcase del footer en /docs/componentes.
 * Lee imágenes subidas del FooterImageContext y las pasa a FooterDone.
 */

import type { JSX } from "react";
import Footer from "@/features/Footer/Footer";
import FooterDone from "@/features/Footer/FooterDone";
import { ComponentShowcase } from "./ComponentShowcase";
import { FooterDoneHandoffPanel } from "./FooterDoneHandoffPanel";
import { useFooterImages } from "./FooterImageContext";

const STITCH_PROJECT_ID = "14182036405227000116";
const STITCH_SCREEN_ID  = "721499f3bb8045628248df64e7bbcb2d";

export function FooterDoneShowcaseSection(): JSX.Element {
  const { logoSrc, reclamacionesSrc } = useFooterImages();

  return (
    <>
      <ComponentShowcase
        id="footer-primary"
        title="Footer"
        description="Pie de página global · tokens Voyager DS · vault purple · No-Line Rule · hover/focus WCAG 2.2 · Libro de Reclamaciones (req. legal Perú)"
        stitchProjectId={STITCH_PROJECT_ID}
        stitchScreenId={STITCH_SCREEN_ID}
        importPath='import FooterDone from "@/features/Footer/FooterDone";'
        fullWidth
        doneChildren={
          <FooterDone
            logoSrc={logoSrc}
            reclamacionesSrc={reclamacionesSrc}
          />
        }
      >
        <Footer />
      </ComponentShowcase>
      <FooterDoneHandoffPanel />
    </>
  );
}
