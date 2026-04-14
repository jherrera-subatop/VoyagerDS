import type { ReactNode } from "react";
import { TaxonomiaSubNav } from "./components/TaxonomiaSubNav";

export default function TaxonomiaLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <TaxonomiaSubNav />
      {children}
    </>
  );
}
