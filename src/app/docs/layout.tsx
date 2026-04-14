import type { ReactNode } from "react";
import { DocsAreaNav } from "./components/DocsAreaNav";
import { DocsHeader } from "./components/DocsHeader";

export default function DocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen" style={{ background: "var(--vmc-color-background-primary)" }}>
      <DocsHeader />
      <DocsAreaNav />
      {children}
    </div>
  );
}
