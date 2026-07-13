import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

export type InputControlSize = "sm" | "md" | "lg";

const sizeClasses: Record<InputControlSize, string> = {
  sm: "min-h-11 px-3",
  md: "min-h-12 px-4",
  lg: "min-h-13 px-4",
};

export interface InputProps extends ComponentPropsWithRef<"input"> {
  controlSize?: InputControlSize;
  invalid?: boolean;
}

export function Input({
  controlSize = "md",
  invalid = false,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      className={cn(
        "w-full rounded border border-border bg-bg-elevated text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-150 ease-out focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[controlSize],
        invalid && "border-danger focus:border-danger",
        className,
      )}
      {...props}
    />
  );
}
