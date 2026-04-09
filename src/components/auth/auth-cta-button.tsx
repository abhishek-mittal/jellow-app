"use client";

import React from "react";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthCtaButtonProps {
  /** Button label text */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

/**
 * Primary CTA button used across all auth screens.
 * Full-width, dark background, white text, with a trailing arrow icon.
 */
export function AuthCtaButton({
  children,
  className,
  onClick,
  type = "button",
  isLoading,
  isDisabled,
}: AuthCtaButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "w-full h-[60px] bg-s-black hover:bg-black text-white rounded-[var(--r-lg)] font-semibold text-[17px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]",
        className
      )}
      endContent={<ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />}
      onPress={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
