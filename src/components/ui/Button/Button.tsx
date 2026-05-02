"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/style";
import type { ButtonSize, ButtonVariant } from "./types";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  loading?: boolean;
  href?: string;
  anchorProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "style">;
}

function labelTypographyStyle(): CSSProperties {
  return {
    fontFamily:    "var(--vmc-text-label-sm-font-family)",
    fontSize:      "var(--vmc-text-label-sm-font-size)",
    fontWeight:    "var(--vmc-text-label-sm-font-weight)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };
}

function sizeStyle(size: ButtonSize): CSSProperties {
  if (size === "sm") {
    return { minHeight: "36px", paddingLeft: "var(--vmc-space-150)", paddingRight: "var(--vmc-space-150)" };
  }
  return { minHeight: "44px", paddingLeft: "var(--vmc-space-200)", paddingRight: "var(--vmc-space-200)" };
}

function buildVariantStyle(variant: ButtonVariant, size: ButtonSize): CSSProperties {
  const base: CSSProperties = {
    borderRadius: "var(--vmc-radius-sm)",
    ...sizeStyle(size),
    ...labelTypographyStyle(),
  };

  if (variant === "primary") {
    const s: CSSProperties = { ...base };
    s.background = "linear-gradient(135deg, var(--vmc-color-vault-900) 0%, var(--vmc-color-vault-700) 100%)";
    s.color = "var(--vmc-color-base-white)";
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
    s.color = "var(--vmc-color-base-white)";
    s.borderWidth = "0";
    return s;
  }

  if (variant === "cta") {
    return {
      ...base,
      background:     "var(--vmc-color-orange-600)",
      color:          "var(--vmc-color-base-white)",
      borderWidth:    "0",
      borderRadius:   "var(--vmc-radius-full)",
      paddingLeft:    size === "sm" ? "var(--vmc-space-050)" : "var(--vmc-space-100)",
      paddingRight:   size === "sm" ? "var(--vmc-space-200)" : "var(--vmc-space-300)",
      paddingTop:     size === "sm" ? "var(--vmc-space-050)" : "var(--vmc-space-100)",
      paddingBottom:  size === "sm" ? "var(--vmc-space-050)" : "var(--vmc-space-100)",
      minHeight:      "unset",
      gap:            size === "sm" ? "var(--vmc-space-100)" : "var(--vmc-space-150)",
      textTransform:  "none",
      letterSpacing:  "0",
    };
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
  size = "md",
  className,
  children,
  loading = false,
  disabled,
  type = "button",
  href,
  anchorProps,
  ...rest
}: Readonly<ButtonProps>) {
  const isDisabled = Boolean(disabled) || loading;
  const variantStyle = buildVariantStyle(variant, size);
  const mergedClassName = cn(buildClassName(loading, disabled), className);

  let dataLoading: string | undefined;
  if (loading) dataLoading = "true";

  if (href) {
    return (
      <a
        href={href}
        className={mergedClassName}
        style={variantStyle}
        aria-disabled={isDisabled}
        data-loading={dataLoading}
        {...anchorProps}
      >
        {children}
      </a>
    );
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
