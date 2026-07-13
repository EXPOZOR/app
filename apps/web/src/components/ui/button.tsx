import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-accent text-text-inverse hover:bg-accent-hover disabled:hover:bg-accent",
  secondary:
    "border border-border bg-transparent text-text-secondary hover:border-border-strong hover:bg-bg-elev-2 hover:text-text-primary",
  ghost:
    "border border-transparent bg-transparent text-text-secondary hover:bg-bg-elev-2 hover:text-text-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-13 px-6 text-base",
  icon: "size-11 p-0",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string | undefined;
} = {}) {
  return cn(
    "control-transition tap-shrink inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded font-semibold no-underline duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-40",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );
}

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  buttonSize?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  buttonSize = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size: buttonSize, fullWidth, className })}
      {...props}
    />
  );
}

export interface IconButtonProps extends Omit<ButtonProps, "buttonSize" | "children"> {
  "aria-label": string;
  children: React.ReactNode;
}

export function IconButton({ className, variant = "ghost", ...props }: IconButtonProps) {
  return (
    <Button
      variant={variant}
      buttonSize="icon"
      className={cn("rounded-full", className)}
      {...props}
    />
  );
}
