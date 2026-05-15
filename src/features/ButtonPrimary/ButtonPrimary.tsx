/**
 * ButtonPrimary — Voyager DS
 * Estados: Default · Hover · Focus · Active · Disabled
 */

import type { JSX } from "react";

const STYLES = `
  .vmc-btn-primary {
    display: flex; align-items: center; justify-content: center;
    height: 56px; border-radius: 8px; border: none; cursor: pointer;
    padding: 0 24px; width: 100%;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 16px; font-weight: 700; line-height: 1;
    color: var(--vmc-color-text-inverse);
    background: linear-gradient(132deg,
      var(--vmc-color-orange-500) 0%,
      var(--vmc-color-orange-600) 50%,
      var(--vmc-color-orange-700) 100%);
    box-shadow: 0 4px 14px color-mix(in oklch, var(--vmc-color-orange-600) 45%, transparent);
    transition: filter 150ms cubic-bezier(0.3,0,0,1),
                transform 120ms cubic-bezier(0.3,0,0,1),
                box-shadow 150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-btn-primary:hover:not(:disabled) {
    filter: brightness(0.88);
  }
  .vmc-btn-primary:focus-visible {
    outline: 2px solid var(--vmc-color-orange-600);
    outline-offset: 3px;
    filter: brightness(0.82);
  }
  .vmc-btn-primary:active:not(:disabled) {
    transform: scale(0.97);
    filter: brightness(0.78);
    box-shadow: 0 2px 6px color-mix(in oklch, var(--vmc-color-orange-600) 30%, transparent);
  }
  .vmc-btn-primary:disabled {
    cursor: not-allowed;
    background: var(--vmc-color-background-secondary);
    color: var(--vmc-color-text-tertiary);
    box-shadow: none;
    filter: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .vmc-btn-primary { transition: none; }
  }
`;

export interface ButtonPrimaryProps {
  label:     string;
  disabled?: boolean;
  type?:     "button" | "submit" | "reset";
  onClick?:  () => void;
}

export default function ButtonPrimary({
  label,
  disabled = false,
  type     = "button",
  onClick,
}: ButtonPrimaryProps): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <button
        type={type}
        className="vmc-btn-primary"
        disabled={disabled}
        onClick={onClick}
        aria-disabled={disabled}>
        {label}
      </button>
    </>
  );
}
