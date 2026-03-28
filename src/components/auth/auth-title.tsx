import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuthTitleProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Style-locked page title for auth screens.
 * Typography is fixed per the Sandow UI Kit; only layout overrides
 * (margins, alignment) should be passed via `className`.
 */
export function AuthTitle({ children, className }: AuthTitleProps) {
  return (
    <h1
      className={cn(
        "mt-2 text-center text-[32px] font-extrabold leading-tight tracking-tight text-s-black",
        className
      )}
    >
      {children}
    </h1>
  );
}
