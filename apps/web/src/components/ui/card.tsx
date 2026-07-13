import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

export type CardSurface = "surface" | "elevated" | "glass";

const surfaceClasses: Record<CardSurface, string> = {
  surface: "bg-bg-surface",
  elevated: "bg-bg-elev-1",
  glass: "glass",
};

export function cardClassName({
  surface = "surface",
  interactive = false,
  className,
}: {
  surface?: CardSurface;
  interactive?: boolean;
  className?: string | undefined;
} = {}) {
  return cn(
    "rounded-lg border border-border",
    surfaceClasses[surface],
    interactive && "transition-colors duration-150 hover:border-border-strong",
    className,
  );
}

export interface CardProps extends ComponentPropsWithRef<"div"> {
  surface?: CardSurface;
  interactive?: boolean;
}

export function Card({ surface = "surface", interactive = false, className, ...props }: CardProps) {
  return <div className={cardClassName({ surface, interactive, className })} {...props} />;
}
