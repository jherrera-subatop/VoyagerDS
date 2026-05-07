"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "../components/SectionTitle";
import { FooterImageProvider } from "../components/FooterImageContext";
import { FooterDoneShowcaseSection } from "../components/FooterDoneShowcaseSection";
import { SidebarStitchShowcaseSection } from "../components/SidebarStitchShowcaseSection";
import { ParticipaStitchShowcaseSection } from "../components/ParticipaStitchShowcaseSection";
import { RelatedCardStitchShowcaseSection } from "../components/RelatedCardStitchShowcaseSection";
import { OfferCardStitchShowcaseSection } from "../components/OfferCardStitchShowcaseSection";
import { VisitasStitchShowcaseSection } from "../components/VisitasStitchShowcaseSection";
import { QuickFiltersStitchShowcaseSection } from "../components/QuickFiltersStitchShowcaseSection";
import { EmpresaProfileStitchShowcaseSection } from "../components/EmpresaProfileStitchShowcaseSection";
import { BracketTitleStitchShowcaseSection } from "../components/BracketTitleStitchShowcaseSection";
import { HeaderStitchShowcaseSection } from "../components/HeaderStitchShowcaseSection";
import { DetalleOfertaBarStitchShowcaseSection } from "../components/DetalleOfertaBarStitchShowcaseSection";
import { GalleryMainStitchShowcaseSection } from "../components/GalleryMainStitchShowcaseSection";
import { AuctionConditionsStitchShowcaseSection } from "../components/AuctionConditionsStitchShowcaseSection";
import { InfoGeneralStitchShowcaseSection } from "../components/InfoGeneralStitchShowcaseSection";
import { useComponentMode } from "../components/ComponentModeContext";

const HR = (
  <hr style={{ border: "none", borderTop: "1px solid var(--vmc-color-border-subtle)", margin: "32px 0 0" }} />
);

const HR0 = (
  <hr style={{ border: "none", borderTop: "1px solid var(--vmc-color-border-subtle)", margin: "0" }} />
);

export function ComponentesPreviewSection() {
  const { mode } = useComponentMode();
  const isDone = mode === "done";

  return (
    <section>
      <SectionTitle
        id="preview-ui"
        title="Átomos UI"
        subtitle="ib-componentes — construcción sobre tokens; sin portar código de referencias externas"
        badge="btn"
      />

      {/* ── Button — status: done ──────────────────────────────────────── */}
      <div
        className="rounded-lg border p-6 space-y-4"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
          Button (`btn` en TAXONOMY.md)
        </p>
        <p className="text-sm" style={{ color: "var(--vmc-color-text-secondary)" }}>
          `src/components/ui/Button` — primario (gradiente Vault), secundario/ghost (borde marca), destructivo. Estados
          loading/disabled según DESIGN.md §9. Sin HEX; solo `var(--vmc-*)`.
        </p>
        <div className="flex flex-wrap gap-3 items-center pt-2">
          <Button variant="primary" type="button">
            Primario
          </Button>
          <Button variant="secondary" type="button">
            Secundario
          </Button>
          <Button variant="ghost" type="button">
            Ghost
          </Button>
          <Button variant="destructive" type="button">
            Destructivo
          </Button>
          <Button variant="primary" loading type="button">
            Cargando
          </Button>
          <Button variant="primary" disabled type="button">
            Deshabilitado
          </Button>
        </div>
        <p className="text-xs font-mono pt-2" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          {"import { Button } from \"@/components/ui/Button\";"}
        </p>
      </div>

      {/* ── Stitch / pending — solo en modo normal ───────────────────── */}
      {!isDone && (
        <>
          {HR}
          <HeaderStitchShowcaseSection />

          {HR}
          <ParticipaStitchShowcaseSection />

          {HR}
          <RelatedCardStitchShowcaseSection />

          {HR}
          <OfferCardStitchShowcaseSection />

          {HR}
          <VisitasStitchShowcaseSection />

          {HR}
          <QuickFiltersStitchShowcaseSection />

          {HR}
          <EmpresaProfileStitchShowcaseSection />

          {HR}
          <BracketTitleStitchShowcaseSection />
        </>
      )}

      {/* ── Footer + Sidebar — status: done — siempre visibles ───────── */}
      <FooterImageProvider>
        {HR0}
        <FooterDoneShowcaseSection />

        {HR0}
        <SidebarStitchShowcaseSection />
      </FooterImageProvider>

      {/* ── Stitch (detalle) — solo en modo normal ────────────────────── */}
      {!isDone && (
        <>
          {HR0}
          <DetalleOfertaBarStitchShowcaseSection />

          {HR0}
          <GalleryMainStitchShowcaseSection />

          {HR0}
          <AuctionConditionsStitchShowcaseSection />

          {HR0}
          <InfoGeneralStitchShowcaseSection />

          {/* ── Cola ────────────────────────────────────────────────── */}
          <div className="mt-8 p-6 rounded-lg border" style={{ borderColor: "var(--vmc-color-border-subtle)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--vmc-color-text-primary)" }}>
              Siguiente en cola
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm" style={{ color: "var(--vmc-color-text-secondary)" }}>
              <li>
                Revisar{" "}
                <Link href="/docs/taxonomia" className="underline underline-offset-2" style={{ color: "var(--vmc-color-text-brand)" }}>
                  taxonomía
                </Link>{" "}
                si cambia el detalle legacy (Challenge D).
              </li>
              <li>Header — pipeline UX → Stitch → Frontend</li>
              <li>
                Fundamentos técnicos en{" "}
                <Link href="/docs/fundamentos" className="underline underline-offset-2" style={{ color: "var(--vmc-color-text-brand)" }}>
                  /docs/fundamentos
                </Link>
                .
              </li>
            </ol>
          </div>
        </>
      )}
    </section>
  );
}
