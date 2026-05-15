"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/style";

export interface ButtonGhostProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string;
  children: ReactNode;
  loading?: boolean;
}

const structuralStyle: CSSProperties = {
  width: "300px",
  height: "47px",
  borderRadius: "var(--vmc-radius-sm)",
  fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize: "16px",
  fontWeight: 500,
  borderWidth: "1.5px",
  borderStyle: "solid",
};

function buildClassName(loading: boolean, disabled: boolean | undefined): string {
  const base = cn(
    "inline-flex items-center justify-center cursor-pointer",
    "bg-transparent text-white border-white",
    "hover:bg-white hover:text-orange-600 hover:border-white",
    "active:bg-orange-700 active:text-white active:border-orange-700",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "transition-[background-color,color,border-color] duration-fast ease-standard",
  );

  if (loading) {
    return cn(base, "animate-pulse opacity-[0.72] pointer-events-none");
  }

  if (disabled) {
    return cn(base, "opacity-[0.72] grayscale pointer-events-none");
  }

  return base;
}

export default function ButtonGhost({
  className,
  children,
  loading = false,
  disabled,
  type = "button",
  ...rest
}: Readonly<ButtonGhostProps>) {
  const isDisabled = Boolean(disabled) || loading;
  const mergedClassName = cn(buildClassName(loading, disabled), className);

  return (
    <button
      type={type}
      className={mergedClassName}
      style={structuralStyle}
      disabled={isDisabled}
      aria-busy={loading}
      data-loading={loading ? "true" : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
