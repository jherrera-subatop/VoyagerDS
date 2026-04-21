import type { ReactNode } from "react";
import { ComponentesSubNav } from "../components/ComponentesSubNav";

export default function ComponentesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <ComponentesSubNav />
      {children}
    </>
  );
}
