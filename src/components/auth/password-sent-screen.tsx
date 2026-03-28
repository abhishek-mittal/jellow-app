"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { AuthShell } from "./auth-shell";
import { AuthHero } from "./auth-hero";
import { PasswordSentCard } from "./password-sent-card";
import { AuthCtaButton } from "./auth-cta-button";
import { cn } from "@/lib/utils";

export interface PasswordSentScreenProps {
  /** Masked email address derived from the reset flow (e.g. "**221b@gmail.com"). */
  maskedEmail?: string;
  /** Called when the user presses "Re-Send Password". Defaults to a no-op. */
  onResend?: () => Promise<void> | void;
  /** URL of the hero background image. */
  heroImageSrc?: string;
  /** Optional extra className on the root shell. */
  className?: string;
}

/** Duration (ms) to show the loading spinner before resetting. */
const RESEND_RESET_DELAY = 2000;

/**
 * PasswordSentScreen — molecule screen that confirms a password-reset email
 * has been dispatched.
 *
 * Renders `AuthShell` as the full-bleed background, `AuthHero` as the dimmed
 * hero image layer, and `PasswordSentCard` as a centered floating modal panel.
 * A dismiss "×" button below the card navigates back to `/auth/sign-in`.
 */
export function PasswordSentScreen({
  maskedEmail = "**@example.com",
  onResend,
  heroImageSrc,
  className,
}: PasswordSentScreenProps) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  /** Triggers the resend handler and briefly shows a loading state. */
  async function handleResend() {
    if (isResending) return;
    setIsResending(true);
    try {
      await onResend?.();
    } finally {
      setTimeout(() => setIsResending(false), RESEND_RESET_DELAY);
    }
  }

  /** Navigates back to the sign-in screen. */
  function handleDismiss() {
    router.push("/auth/sign-in");
  }

  return (
    <AuthShell
      withHero
      className={cn("relative", className)}
    >
      {/* Full-bleed blurred/dimmed hero background */}
      <AuthHero
        imageSrc={heroImageSrc}
        imageAlt="Background"
        className="absolute inset-0 h-full w-full"
        height="100%"
      />

      {/* Dark overlay to ensure contrast */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
      />

      {/* Centered card + dismiss button */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        {/* Card — fade-in from bottom */}
        <div
          className="w-full max-w-[360px] animate-[fadeInUp_300ms_ease-out_both]"
          style={
            {
              "--tw-translate-y": "24px",
            } as React.CSSProperties
          }
        >
          <PasswordSentCard
            maskedEmail={maskedEmail}
            action={
              <AuthCtaButton
                onClick={handleResend}
                isLoading={isResending}
                isDisabled={isResending}
              >
                Re-Send Password
              </AuthCtaButton>
            }
          />
        </div>

        {/* Dismiss button — centered below card, outside card boundary */}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          className={cn(
            "mt-6 flex h-12 w-12 items-center justify-center rounded-full",
            "bg-white text-s-dark-gray shadow-md",
            "transition-transform active:scale-95 hover:bg-white/90"
          )}
        >
          <X size={22} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </AuthShell>
  );
}
