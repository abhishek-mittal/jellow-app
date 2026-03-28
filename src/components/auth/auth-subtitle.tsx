import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuthSubtitleProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Style-locked subtitle / descriptor for auth screens.
 * Sits directly below AuthTitle. Typography is fixed per the Sandow UI Kit.
 */
export function AuthSubtitle({ children, className }: AuthSubtitleProps) {
  return (
    <p
      className={cn(
        "px-4 text-center text-base font-medium text-s-dark-gray/60",
        className
      )}
    >
      {children}
    </p>
  );
}
