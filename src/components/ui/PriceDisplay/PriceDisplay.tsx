import type { CSSProperties, JSX } from "react";
import type { PriceContext, PriceDisplayProps } from "./types";

// ─── Context-driven type scale ─────────────────────────────────────────────
type ContextScale = { labelSize: string; amountSize: string; amountWeight: number };

const CONTEXT_SCALE: Record<PriceContext, ContextScale> = {
  hero:    { labelSize: "12px", amountSize: "30px", amountWeight: 800 },
  card:    { labelSize: "10px", amountSize: "16px", amountWeight: 700 },
  compact: { labelSize: "10px", amountSize: "12px", amountWeight: 700 },
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US");
}

function buildLabelStyle(scale: ContextScale): CSSProperties {
  return {
    display:       "block",
    fontFamily:    "var(--vmc-font-display)",
    fontSize:      scale.labelSize,
    fontWeight:    600,
    letterSpacing: "0.9px",
    textTransform: "uppercase",
    lineHeight:    1,
    color:         "var(--vmc-color-text-price-label)",
  };
}

function buildCurrencyStyle(scale: ContextScale): CSSProperties {
  return {
    fontFamily: "var(--vmc-font-display)",
    fontSize:   scale.amountSize,
    fontWeight: scale.amountWeight,
    color:      "var(--vmc-color-text-brand)",
    lineHeight: 1,
  };
}

function buildAmountStyle(scale: ContextScale): CSSProperties {
  return {
    fontFamily:         "var(--vmc-font-display)",
    fontSize:           scale.amountSize,
    fontWeight:         scale.amountWeight,
    color:              "var(--vmc-color-text-primary)",
    fontVariantNumeric: "tabular-nums",
    lineHeight:         1,
  };
}

const AMOUNT_ROW_STYLE: CSSProperties = {
  display:    "flex",
  alignItems: "baseline",
  gap:        "var(--vmc-space-025)",
};

const WRAPPER_STYLE: CSSProperties = {
  display:       "inline-flex",
  flexDirection: "column",
  gap:           "var(--vmc-space-025)",
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function PriceDisplay({
  amount,
  context  = "card",
  label    = "PRECIO BASE",
  currency = "US$",
  className,
}: Readonly<PriceDisplayProps>): JSX.Element {
  const scale         = CONTEXT_SCALE[context];
  const labelStyle    = buildLabelStyle(scale);
  const currencyStyle = buildCurrencyStyle(scale);
  const amountStyle   = buildAmountStyle(scale);

  return (
    <div style={WRAPPER_STYLE} className={className}>
      <span style={labelStyle}>{label}</span>
      <div style={AMOUNT_ROW_STYLE}>
        <span style={currencyStyle}>{currency}</span>
        <span style={amountStyle}>{formatAmount(amount)}</span>
      </div>
    </div>
  );
}
