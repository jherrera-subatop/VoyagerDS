import type { JSX } from "react";
import Button from "@/components/ui/Button/Button";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

interface StateRowProps {
  label:    string;
  children: React.ReactNode;
}

function StateRow({ label, children }: StateRowProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.08em",
        color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ButtonPrimaryPreviewPage(): JSX.Element {
  return (
    <main style={{ background: "var(--vmc-color-background-secondary)",
      minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 0" }}>

      <div style={{ width: 420, display: "flex", flexDirection: "column",
        borderRadius: 4, overflow: "hidden",
        outline: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>

        <div style={{ background: "#FFFFFF", display: "flex", flexDirection: "column",
          gap: 24, padding: 24 }}>

          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.10em",
            color: "var(--vmc-color-text-primary)", margin: 0,
            borderBottom: "1px solid var(--vmc-color-border-subtle)", paddingBottom: 12 }}>
            Button Primary — Estados
          </p>

          <StateRow label="Default">
            <Button variant="primary" style={{ width: "100%" }}>Participa</Button>
          </StateRow>

          <StateRow label="Loading">
            <Button variant="primary" loading style={{ width: "100%" }}>Participa</Button>
          </StateRow>

          <StateRow label="Disabled">
            <Button variant="primary" disabled style={{ width: "100%" }}>Participa</Button>
          </StateRow>

        </div>
      </div>
    </main>
  );
}
