"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { AuthShell } from "./auth-shell";
import { AuthBody } from "./auth-body";
import { AuthTitle } from "./auth-title";
import { AuthSubtitle } from "./auth-subtitle";
import { AuthCtaButton } from "./auth-cta-button";
import { ResetMethodCard } from "./reset-method-card";
import type { ResetMethodVariant } from "./reset-method-card";

type ResetMethod = {
  variant: ResetMethodVariant;
  title: string;
  body: string;
};

const RESET_METHODS: ResetMethod[] = [
  {
    variant: "email",
    title: "Send via Email",
    body: "We'll send a reset link to your email inbox.",
  },
  {
    variant: "2fa",
    title: "Send via 2FA",
    body: "Use your two-factor authentication app.",
  },
  {
    variant: "google",
    title: "Send via Google Auth",
    body: "Reset using your linked Google account.",
  },
];

/**
 * ResetPasswordScreen — method selector screen for password recovery.
 * Renders three selectable ResetMethodCard atoms; the CTA is disabled
 * until the user picks a method. Navigates to /auth/password-sent on submit.
 */
export function ResetPasswordScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<ResetMethodVariant | null>(null);

  /** Select the given reset method card. */
  function handleSelectMethod(variant: ResetMethodVariant) {
    setSelectedMethod(variant);
  }

  /**
   * Stub: navigates to /auth/password-sent.
   * Real dispatch logic will be wired at organism/integration level.
   */
  function handleResetPassword() {
    if (!selectedMethod) return;
    router.push("/auth/password-sent");
  }

  return (
    <AuthShell>
      {/* Back button — navigates to sign-in */}
      <div className="px-6 pt-6">
        <button
          type="button"
          onClick={() => router.push("/auth/sign-in")}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-s-dark-gray transition-colors hover:bg-gray-200 active:scale-[0.96]"
        >
          <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>

      <AuthBody className="pt-6">
        {/* Heading */}
        <AuthTitle className="mb-2">Reset Password</AuthTitle>
        <AuthSubtitle className="mb-8">
          Select what method you&apos;d like to reset.
        </AuthSubtitle>

        {/* Method selection list */}
        <div className="w-full space-y-4">
          {RESET_METHODS.map(({ variant, title, body }) => (
            <ResetMethodCard
              key={variant}
              variant={variant}
              title={title}
              body={body}
              selected={selectedMethod === variant}
              onClick={() => handleSelectMethod(variant)}
            />
          ))}
        </div>

        {/* CTA — disabled until a method is chosen */}
        <div className="mt-auto w-full pt-8">
          <AuthCtaButton
            isDisabled={selectedMethod === null}
            onClick={handleResetPassword}
          >
            Reset Password
          </AuthCtaButton>
        </div>
      </AuthBody>
    </AuthShell>
  );
}
