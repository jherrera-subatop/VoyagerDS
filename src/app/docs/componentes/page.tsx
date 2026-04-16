"use client";

import { ComponentModeProvider } from "../components/ComponentModeContext";
import { ComponentModePill } from "../components/ComponentModePill";
import { ComponentesPreviewSection } from "../sections/ComponentesPreviewSection";

export default function DocsComponentesPage() {
  return (
    <ComponentModeProvider>
      <div className="max-w-7xl mx-auto px-6 pb-24 pt-12">
        <ComponentesPreviewSection />
      </div>
      <ComponentModePill />
    </ComponentModeProvider>
  );
}
