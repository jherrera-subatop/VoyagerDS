"use client";

import { ComponentModeProvider } from "../components/ComponentModeContext";
import { ComponentModePill } from "../components/ComponentModePill";
import { ComponentesPreviewSection } from "../sections/ComponentesPreviewSection";

export default function DocsComponentesPage() {
  return (
    <ComponentModeProvider>
      <div className="px-8 pb-24 pt-10">
        <ComponentesPreviewSection />
      </div>
      <ComponentModePill />
    </ComponentModeProvider>
  );
}
