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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="white"
      />
    </svg>
  );
}

const VARIANT_ICONS: Record<ResetMethodVariant, ReactNode> = {
  email: <Mail size={20} strokeWidth={2} className="text-white" />,
  "2fa": <ShieldCheck size={20} strokeWidth={2} className="text-white" />,
  google: <GoogleIcon size={20} />,
};

const VARIANT_ICON_BG: Record<ResetMethodVariant, string> = {
  email: "bg-[#FF6B00] text-white",
  "2fa": "bg-[#3B82F6] text-white",
  google: "bg-[#9333EA] text-white",
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
        "flex w-full items-center gap-4 rounded-[var(--r-xl)] bg-[#F5F5F5] p-4",
        "transition-all duration-150 hover:bg-[#EBEBEB] active:scale-[0.98]",
        selected ? "ring-2 ring-s-orange" : "ring-1 ring-transparent",
        className
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]",
          VARIANT_ICON_BG[variant]
        )}
        aria-hidden="true"
      >
        {VARIANT_ICONS[variant]}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 text-left">
        <p className="font-heading text-[15px] font-bold leading-tight text-s-dark-gray">
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
