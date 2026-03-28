"use client";

import type { ReactNode } from "react";
import { Mail, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Supported icon variants for the reset method selector card. */
export type ResetMethodVariant = "email" | "2fa" | "google";

export interface ResetMethodCardProps {
  /** Visual icon variant; determines the icon shown on the left side. */
  variant: ResetMethodVariant;
  /** Card title text. */
  title: string;
  /** Descriptive body text shown below the title. */
  body: string;
  /** Whether this card is currently selected. */
  selected?: boolean;
  /** Callback fired when the card is pressed. */
  onClick?: () => void;
  className?: string;
}

/** Minimal Google "G" SVG icon used for the Google auth variant. */
function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const VARIANT_ICONS: Record<ResetMethodVariant, ReactNode> = {
  email: <Mail size={20} strokeWidth={2} />,
  "2fa": <ShieldCheck size={20} strokeWidth={2} />,
  google: <GoogleIcon size={20} />,
};

const VARIANT_ICON_BG: Record<ResetMethodVariant, string> = {
  email: "bg-blue-100 text-blue-600",
  "2fa": "bg-orange-100 text-orange-600",
  google: "bg-gray-100",
};

/**
 * ResetMethodCard — selectable list-item card for choosing a password
 * reset method (email, 2FA, or Google auth). Renders an icon on the
 * left, title + body text in the centre, and a chevron on the right.
 */
export function ResetMethodCard({
  variant,
  title,
  body,
  selected = false,
  onClick,
  className,
}: ResetMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-4 rounded-[var(--r-xl)] bg-white p-4 shadow-md",
        "transition-all duration-150 hover:shadow-lg active:scale-[0.98]",
        selected ? "ring-2 ring-[#EE7F46]" : "ring-1 ring-transparent",
        className
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--r-lg)]",
          VARIANT_ICON_BG[variant]
        )}
        aria-hidden="true"
      >
        {VARIANT_ICONS[variant]}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 text-left">
        <p className="font-[var(--font-heading)] text-[15px] font-bold leading-tight text-s-dark-gray">
          {title}
        </p>
        <p className="mt-0.5 text-sm leading-snug text-s-dark-gray/60">{body}</p>
      </div>

      {/* Chevron */}
      <ChevronRight
        size={18}
        className="shrink-0 text-s-dark-gray/40"
        aria-hidden="true"
      />
    </button>
  );
}
