"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/style";
import type { ButtonVariant } from "./types";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  loading?: boolean;
}

function labelTypographyStyle(): CSSProperties {
  return {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
  };
}

function buildVariantStyle(variant: ButtonVariant, disabled: boolean): CSSProperties {
  const base: CSSProperties = {
    minHeight: "44px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "var(--vmc-radius-sm)",
    fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
    ...labelTypographyStyle(),
  };

  if (variant === "primary") {
    const s: CSSProperties = { ...base };
    s.background = "linear-gradient(135deg, var(--vmc-color-vault-900) 0%, var(--vmc-color-vault-700) 100%)";
    s.color = "var(--vmc-color-text-inverse)";
    s.borderWidth = "0";
    if (disabled) {
      s.cursor = "not-allowed";
    }
    return s;
  }

  if (variant === "secondary" || variant === "ghost") {
    const s: CSSProperties = { ...base };
    s.background = "transparent";
    s.color = "var(--vmc-color-text-brand)";
    s.borderStyle = "solid";
    s.borderWidth = "1px";
    s.borderColor = "var(--vmc-color-border-brand)";
    return s;
  }

  if (variant === "secondary-live") {
    const s: CSSProperties = { ...base };
    s.minHeight = "47px";
    // Gradient border via background-clip trick.
    // Layer 1 (padding-box): solid white fill — background state managed in .vmc-btn-sl CSS class.
    // Layer 2 (border-box): orange gradient visible through the transparent border.
    // DO NOT set s.background here — .vmc-btn-sl CSS class owns it so hover/active can override.
    s.border = "2px solid transparent";
    s.color = "var(--vmc-color-orange-500)";
    return s;
  }

  if (variant === "destructive") {
    const s: CSSProperties = { ...base };
    s.background = "var(--vmc-color-red-900)";
    s.color = "var(--vmc-color-text-inverse)";
    s.borderWidth = "0";
    return s;
  }

  return base;
}

function buildClassName(loading: boolean, disabled: boolean | undefined, variant: ButtonVariant): string {
  const isSecondaryLive = variant === "secondary-live";
  let c = cn(
    "inline-flex items-center justify-center transition-[transform,filter,opacity] duration-fast ease-standard active:scale-[0.97]",
    isSecondaryLive ? "vmc-btn-sl" : "hover:brightness-110"
  );
  if (loading) {
    c = cn(c, "animate-pulse opacity-[0.72]");
  }
  if (disabled) {
    c = cn(c, "opacity-[0.72] grayscale");
  }
  return c;
}

export default function Button({
  variant = "primary",
  className,
  children,
  loading = false,
  disabled,
  type = "button",
  ...rest
}: Readonly<ButtonProps>) {
  const isDisabled = Boolean(disabled) || loading;
  const variantStyle = buildVariantStyle(variant, Boolean(disabled));
  const mergedClassName = cn(buildClassName(loading, disabled, variant), className);

  let dataLoading: string | undefined;
  if (loading) {
    dataLoading = "true";
  }

  return (
    <button
      type={type}
      className={mergedClassName}
      style={variantStyle}
      disabled={isDisabled}
      aria-busy={loading}
      data-loading={dataLoading}
      {...rest}
    >
      {children}
    </button>
  );
}
