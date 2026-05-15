import type { JSX } from "react";
import Button from "@/components/ui/Button/Button";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

interface StateRowProps {
  label:    string;
  note?:    string;
  children: React.ReactNode;
}

function StateRow({ label, note, children }: StateRowProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.08em",
          color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
          {label}
        </p>
        {note && (
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 400,
            color: "var(--vmc-color-text-tertiary)", margin: 0, opacity: 0.7 }}>
            {note}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

const HOVER_STYLE: React.CSSProperties = {
  filter: "brightness(1.10)",
  width: "100%",
};

const ACTIVE_STYLE: React.CSSProperties = {
  transform: "scale(0.97)",
  filter: "brightness(1.10)",
  width: "100%",
};

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

          <StateRow label="Hover" note="simulado">
            <Button variant="primary" style={{ ...HOVER_STYLE }}>Participa</Button>
          </StateRow>

          <StateRow label="Focus" note="outline visible en teclado">
            <Button variant="primary" style={{ width: "100%",
              outline: "2px solid var(--vmc-color-vault-mid)",
              outlineOffset: "2px" }}>
              Participa
            </Button>
          </StateRow>

          <StateRow label="Active / Pressed" note="simulado">
            <Button variant="primary" style={{ ...ACTIVE_STYLE }}>Participa</Button>
          </StateRow>

          <StateRow label="Loading">
            <Button variant="primary" loading style={{ width: "100%" }}>Participa</Button>
          </StateRow>

          <StateRow label="Disabled" note="opacity 72% + grayscale">
            <Button variant="primary" disabled style={{ width: "100%" }}>Participa</Button>
          </StateRow>

        </div>
      </div>
    </main>
  );
}
