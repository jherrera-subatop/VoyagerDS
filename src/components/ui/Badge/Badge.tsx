import type { CSSProperties, JSX } from "react";
import type { BadgeVariant, BadgeProps } from "./types";

// ─── Label defaults ───────────────────────────────────────────────────────────
const BADGE_LABELS: Record<BadgeVariant, string> = {
  live:        "EN VIVO",
  negotiable:  "NEGOCIABLE",
  upcoming:    "PRÓXIMAMENTE",
  closed:      "CERRADO",
  featured:    "DESTACADO",
  new:         "NUEVO",
};

// ─── Base style ───────────────────────────────────────────────────────────────
const BASE_BADGE_STYLE: CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  gap:            "var(--vmc-space-050)",
  paddingTop:     "2px",
  paddingBottom:  "2px",
  paddingLeft:    "var(--vmc-space-100)",
  paddingRight:   "var(--vmc-space-100)",
  borderRadius:   "var(--vmc-radius-full)",
  fontFamily:     "var(--vmc-font-display)",
  fontSize:       "10px",
  fontWeight:     700,
  letterSpacing:  "1px",
  textTransform:  "uppercase",
  lineHeight:     "16px",
  whiteSpace:     "nowrap",
  userSelect:     "none",
};

// ─── Variant overrides ────────────────────────────────────────────────────────
const VARIANT_STYLES: Record<BadgeVariant, CSSProperties> = {
  live: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-live-bg)",
    color:      "var(--vmc-color-badge-live-text)",
  },
  negotiable: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-negotiable-bg)",
    color:      "var(--vmc-color-badge-negotiable-text)",
  },
  upcoming: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-upcoming-bg)",
    color:      "var(--vmc-color-badge-upcoming-text)",
  },
  closed: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-closed-bg)",
    color:      "var(--vmc-color-badge-closed-text)",
  },
  featured: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-featured-bg)",
    color:      "var(--vmc-color-badge-featured-text)",
  },
  new: {
    ...BASE_BADGE_STYLE,
    background: "var(--vmc-color-badge-new-bg)",
    color:      "var(--vmc-color-badge-new-text)",
  },
};

// ─── Animated live dot ────────────────────────────────────────────────────────
function LiveDot(): JSX.Element {
  return (
    <span
      aria-hidden="true"
      style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px", flexShrink: 0 }}
    >
      {/* Ping ring — CSS animation, no JS */}
      <span
        className="motion-safe:animate-ping"
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "var(--vmc-radius-full)",
          background:   "var(--vmc-color-status-live)",
          opacity:      0.75,
        }}
      />
      {/* Solid inner dot */}
      <span
        style={{
          position:     "relative",
          display:      "inline-flex",
          width:        "8px",
          height:       "8px",
          borderRadius: "var(--vmc-radius-full)",
          background:   "var(--vmc-color-status-live)",
        }}
      />
    </span>
  );
}

// ─── Label resolver ───────────────────────────────────────────────────────────
function resolveLabel(variant: BadgeVariant, override: string | undefined): string {
  if (override !== undefined) {
    return override;
  }
  return BADGE_LABELS[variant];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Badge({ variant, label, className }: Readonly<BadgeProps>): JSX.Element {
  const displayLabel = resolveLabel(variant, label);
  const style        = VARIANT_STYLES[variant];

  return (
    <span
      style={style}
      className={className}
      role="status"
      data-variant={variant}
    >
      {variant === "live" && <LiveDot />}
      {displayLabel}
    </span>
  );
}
