export type BadgeVariant = "live" | "negotiable" | "upcoming" | "closed" | "featured" | "new";

export interface BadgeProps {
  variant: BadgeVariant;
  /** Override the default label text */
  label?: string;
  className?: string;
}
