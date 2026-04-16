export type TimerStatus = "default" | "urgent" | "expired";

export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  status: TimerStatus;
  remainingMs: number;
}

export interface CountdownTimerProps {
  targetDate: Date;
  onExpire?: () => void;
  className?: string;
}
