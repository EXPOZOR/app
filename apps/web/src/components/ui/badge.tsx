import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

export type BadgeTone = "accent" | "positive" | "neutral";
export type BadgeSize = "xs" | "sm";

const toneClasses: Record<BadgeTone, string> = {
  accent: "border-border-accent bg-accent-subtle text-accent",
  positive:
    "border-[color-mix(in_oklch,var(--positive)_35%,transparent)] bg-[var(--positive-subtle)] text-positive",
  neutral: "border-border bg-bg-elevated text-text-secondary",
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: "px-2 py-1 text-[10px]",
  sm: "px-3 py-1.5 text-xs",
};

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  tone?: BadgeTone;
  badgeSize?: BadgeSize;
  status?: boolean;
}

export function Badge({
  tone = "neutral",
  badgeSize = "sm",
  status = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider",
        toneClasses[tone],
        sizeClasses[badgeSize],
        className,
      )}
      {...props}
    >
      {status && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
