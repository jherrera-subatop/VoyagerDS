export type PriceContext = "hero" | "card" | "compact";

export interface PriceDisplayProps {
  amount: number;
  context?: PriceContext;
  /** Defaults to "PRECIO BASE" */
  label?: string;
  /** Defaults to "US$" */
  currency?: string;
  className?: string;
}
