import { NavFundamentos } from "../components/NavFundamentos";
import { ColorSection } from "../sections/ColorSection";
import { FundamentosGateSection } from "../sections/FundamentosGateSection";
import { GovernanceSection } from "../sections/GovernanceSection";
import { SpacingSection } from "../sections/SpacingSection";
import { TypographySection } from "../sections/TypographySection";

export const metadata = {
  title: "Voyager DS — Fundamentos",
  description: "Tokens, tipografía, spacing y gobernanza ib-fundamentos",
};

export default function DocsFundamentosPage() {
  return (
    <>
      <NavFundamentos />
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24 pt-8">
        <FundamentosGateSection />
        <ColorSection />
        <TypographySection />
        <SpacingSection />
        <GovernanceSection />
      </div>
    </>
  );
}
