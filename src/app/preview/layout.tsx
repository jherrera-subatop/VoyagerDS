import type { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
