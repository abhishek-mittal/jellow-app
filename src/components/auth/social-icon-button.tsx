"use client";

import React from "react";
import { Button } from "@heroui/button";
import { cn } from "@/lib/utils";

export interface SocialIconButtonProps {
  /** The icon element to display inside the button */
  icon: React.ReactNode;
  /** Accessible label describing the social platform (e.g. "Sign in with Instagram") */
  label: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Square icon-only button for social login options.
 * Bordered, rounded, and fully accessible via `label`.
 */
export function SocialIconButton({
  icon,
  label,
  className,
  onClick,
}: SocialIconButtonProps) {
  return (
    <Button
      isIconOnly
      variant="bordered"
      aria-label={label}
      className={cn(
        "w-[60px] h-[60px] rounded-[20px] border-slate-200 hover:bg-slate-50 bg-white",
        className
      )}
      onPress={onClick}
    >
      {icon}
    </Button>
  );
}
