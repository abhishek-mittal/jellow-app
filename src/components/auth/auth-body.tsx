import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuthBodyProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Scrollable content area that sits below the optional AuthHero.
 * Centres children horizontally and provides standard auth-screen padding.
 */
export function AuthBody({ children, className }: AuthBodyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center px-6 pt-4 pb-8",
        className
      )}
    >
      {children}
    </div>
  );
}
