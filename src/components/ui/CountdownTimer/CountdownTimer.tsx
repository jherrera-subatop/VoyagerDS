"use client";

import type { CSSProperties, JSX } from "react";
import type { TimerStatus, CountdownTimerProps } from "./types";
import { useCountdownTimerLogic } from "./useCountdownTimerLogic";

// ─── Helpers ───────────────────────────────────────────────────────────────
function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

function buildTimerStyle(status: TimerStatus): CSSProperties {
  const base: CSSProperties = {
    fontFamily:         "var(--vmc-font-mono)",
    fontSize:           "30px",
    fontWeight:         800,
    lineHeight:         1,
    letterSpacing:      "-1.5px",
    fontVariantNumeric: "tabular-nums",
  };

  if (status === "urgent") {
    return { ...base, color: "var(--vmc-color-timer-imminent)" };
  }

  if (status === "expired") {
    return {
      fontFamily:    "var(--vmc-font-display)",
      fontSize:      "14px",
      fontWeight:    700,
      lineHeight:    1,
      letterSpacing: "0.9px",
      textTransform: "uppercase",
      color:         "var(--vmc-color-text-price-label)",
    };
  }

  return { ...base, color: "var(--vmc-color-text-primary)" };
}

function buildDisplay(
  status: TimerStatus,
  hours: number,
  minutes: number,
  seconds: number,
): string {
  if (status === "expired") {
    return "CERRADO";
  }
  return `${padTwo(hours)}:${padTwo(minutes)}:${padTwo(seconds)}`;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function CountdownTimer({
  targetDate,
  onExpire,
  className,
}: Readonly<CountdownTimerProps>): JSX.Element {
  const { timerState } = useCountdownTimerLogic(targetDate, onExpire);
  const timerStyle     = buildTimerStyle(timerState.status);
  const display        = buildDisplay(
    timerState.status,
    timerState.hours,
    timerState.minutes,
    timerState.seconds,
  );

  return (
    <time
      dateTime={targetDate.toISOString()}
      aria-live="polite"
      aria-atomic="true"
      data-status={timerState.status}
      style={timerStyle}
      className={className}
      suppressHydrationWarning
    >
      {display}
    </time>
  );
}
