import type { ReactNode } from "react";
import { TaxonomiaSubNav } from "./components/TaxonomiaSubNav";
import { WireModeProvider } from "./components/WireModeContext";
import { WireModePill } from "./components/WireModePill";

export default function TaxonomiaLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <WireModeProvider>
      <TaxonomiaSubNav />
      {children}
      <WireModePill />
    </WireModeProvider>
  );
}
