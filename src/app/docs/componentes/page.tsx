import { ComponentesPreviewSection } from "../sections/ComponentesPreviewSection";

export const metadata = {
  title: "Voyager DS — Componentes",
  description: "Átomos ib-componentes (Button y siguientes)",
};

export default function DocsComponentesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-12">
      <ComponentesPreviewSection />
    </div>
  );
}
