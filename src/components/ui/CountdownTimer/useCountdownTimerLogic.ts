"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TimerState, TimerStatus } from "./types";

// ─── Constants ─────────────────────────────────────────────────────────────
const URGENT_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
const TICK_INTERVAL_MS    = 1000;

// ─── Pure helpers ──────────────────────────────────────────────────────────
function computeRemainingMs(targetDate: Date): number {
  return Math.max(0, targetDate.getTime() - Date.now());
}

function resolveStatus(remainingMs: number): TimerStatus {
  if (remainingMs === 0) {
    return "expired";
  }
  if (remainingMs <= URGENT_THRESHOLD_MS) {
    return "urgent";
  }
  return "default";
}

function buildTimerState(targetDate: Date): TimerState {
  const remainingMs  = computeRemainingMs(targetDate);
  const status       = resolveStatus(remainingMs);

  if (status === "expired") {
    return { hours: 0, minutes: 0, seconds: 0, status: "expired", remainingMs: 0 };
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours        = Math.floor(totalSeconds / 3600);
  const minutes      = Math.floor((totalSeconds % 3600) / 60);
  const seconds      = totalSeconds % 60;

  return { hours, minutes, seconds, status, remainingMs };
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export interface UseCountdownTimerLogicReturn {
  timerState: TimerState;
}

export function useCountdownTimerLogic(
  targetDate: Date,
  onExpire?: () => void,
): UseCountdownTimerLogicReturn {
  const [timerState, setTimerState] = useState<TimerState>(
    function initTimerState(): TimerState {
      return buildTimerState(targetDate);
    },
  );

  // Stable ref so tick closure never captures a stale callback
  const onExpireRef = useRef<(() => void) | undefined>(onExpire);
  useEffect(
    function syncOnExpireRef(): void {
      onExpireRef.current = onExpire;
    },
    [onExpire],
  );

  const tick = useCallback(
    function handleTick(): void {
      const next = buildTimerState(targetDate);
      setTimerState(next);
      if (next.status === "expired" && onExpireRef.current !== undefined) {
        onExpireRef.current();
      }
    },
    [targetDate],
  );

  useEffect(
    function setupInterval(): () => void {
      // Already expired — no interval needed
      if (timerState.status === "expired") {
        return function noopCleanup(): void {};
      }

      tick(); // Sync immediately on mount / targetDate change
      const id = setInterval(tick, TICK_INTERVAL_MS);

      return function clearTick(): void {
        clearInterval(id);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick], // timerState.status intentionally omitted — interval self-terminates via tick
  );

  return { timerState };
}
