import type { ReactNode } from "react";
import { ComponentModeProvider } from "../components/ComponentModeContext";
import { ComponentModePill } from "../components/ComponentModePill";
import { ComponentesSideNav } from "../components/ComponentesSideNav";

export default function ComponentesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ComponentModeProvider>
      <div
        style={{
          display:   "flex",
          maxWidth:  1280,
          margin:    "0 auto",
          minHeight: "calc(100vh - 96px)",
        }}
      >
        {/* ── Left sidebar ──────────────────────────────────── */}
        <ComponentesSideNav />

        {/* ── Main content ──────────────────────────────────── */}
        <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      {/* Mode pill floats above everything */}
      <ComponentModePill />
    </ComponentModeProvider>
  );
}
