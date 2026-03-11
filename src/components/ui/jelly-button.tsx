"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type JellyButtonVariant = "primary" | "secondary" | "danger";
export type JellyButtonSize = "sm" | "md" | "lg";

export interface JellyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: JellyButtonVariant;
  size?: JellyButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<JellyButtonVariant, string> = {
  primary:
    "bg-[var(--candy-mint)] text-white shadow-[var(--shadow-soft)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--candy-mint)]",
  secondary:
    "bg-[var(--gray-100)] text-[var(--gray-900)] shadow-[var(--shadow-soft)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--gray-200)]",
  danger:
    "bg-[var(--verdict-avoid)] text-white shadow-[var(--shadow-soft)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--verdict-avoid)]",
};

const sizeStyles: Record<JellyButtonSize, string> = {
  sm: "h-8 px-4 text-sm",
  md: "h-10 px-6 text-base",
  lg: "h-12 px-8 text-lg",
};

export function JellyButton({
  className,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  children,
  ...props
}: JellyButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-full)] font-semibold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
