import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AuthLinkProps {
  /** Route to navigate to */
  href: string;
  /** Link label text */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Tertiary text link styled for auth screens.
 * Renders in the brand orange colour with an underline on hover.
 */
export function AuthLink({ href, children, className }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[15px] font-semibold text-[#ff6b00] hover:underline",
        className
      )}
    >
      {children}
    </Link>
  );
}
