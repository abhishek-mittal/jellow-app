import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuthShellProps = {
  children?: ReactNode;
  /**
   * When true, the first child is expected to be an AuthHero that bleeds
   * to the very top edge of the screen (behind the status bar).
   * When false, the shell adds safe-area-inset-top padding so content
   * clears the status bar.
   */
  withHero?: boolean;
  className?: string;
};

/**
 * Full-screen layout shell for auth screens.
 * Applies safe-area insets so content is never obscured by the
 * device status bar or home indicator.
 */
export function AuthShell({ children, withHero = false, className }: AuthShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-white font-sans",
        !withHero && "pt-[env(safe-area-inset-top,0px)]",
        className
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {children}
    </div>
  );
}
