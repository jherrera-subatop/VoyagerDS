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

function buildVariantStyle(variant: ButtonVariant): CSSProperties {
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

  if (variant === "destructive") {
    const s: CSSProperties = { ...base };
    s.background = "var(--vmc-color-red-900)";
    s.color = "var(--vmc-color-text-inverse)";
    s.borderWidth = "0";
    return s;
  }

  return base;
}

function buildClassName(loading: boolean, disabled: boolean | undefined): string {
  let c =
    "inline-flex items-center justify-center transition-[transform,filter,opacity] duration-fast ease-standard hover:brightness-110 active:scale-[0.97]";
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
  const variantStyle = buildVariantStyle(variant);
  const mergedClassName = cn(buildClassName(loading, disabled), className);

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
