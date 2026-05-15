import type { JSX } from "react";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

interface BannerPlaceholderProps {
  height: number;
  label:  string;
}

export default function BannerPlaceholder({ height, label }: BannerPlaceholderProps): JSX.Element {
  return (
    <div style={{ width: "100%", height, borderRadius: 8, flexShrink: 0,
      background: "var(--vmc-color-background-secondary)",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700,
        color: "var(--vmc-color-text-tertiary)", margin: 0, letterSpacing: "0.08em",
        textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}
