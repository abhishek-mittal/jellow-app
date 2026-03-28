"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Instagram, Facebook, Linkedin, Plus } from "lucide-react";
import { EmailInput, PasswordInput } from "@/components/ui/auth-input";
import {
  AuthShell,
  AuthHero,
  AuthBody,
  AuthTitle,
  AuthSubtitle,
  AuthCtaButton,
  SocialIconButton,
  AuthLink,
} from "@/components/auth";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop";

const LogoMark = (
  <div className="w-16 h-16 bg-[#ff6b00] rounded-[18px] flex items-center justify-center shadow-md">
    <Plus size={36} className="text-white" strokeWidth={3.5} />
  </div>
);

/**
 * Sign-in screen molecule.
 * Composes AuthShell + AuthHero, email/password inputs with validation,
 * a primary CTA, social login buttons, and footer navigation links.
 */
export function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /** Validates inputs and returns true when both fields pass. */
  function validate(): boolean {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }

  /** Calls the sign-in API and navigates to /home on success. */
  async function handleSignIn() {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/home");
      } else {
        const data = (await res.json()) as { error?: string };
        setEmailError(data.error ?? "Sign in failed");
      }
    } catch {
      setEmailError("Network error — please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell withHero>
      <AuthHero
        imageSrc={HERO_IMAGE}
        imageAlt="Gym equipment background"
        logoMark={LogoMark}
      />

      <AuthBody>
        <AuthTitle className="mb-1">Sign In To Jellow</AuthTitle>
        <AuthSubtitle className="mb-10">
          Let&apos;s personalize your health with AI
        </AuthSubtitle>

        <div className="w-full max-w-sm space-y-5">
          <EmailInput
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••••"
            value={password}
            onChange={setPassword}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />

          <AuthCtaButton
            className="mt-6"
            type="button"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleSignIn}
          >
            Sign In
          </AuthCtaButton>

          {/* Social login row */}
          <div className="flex justify-center gap-4 pt-4">
            <SocialIconButton
              icon={<Instagram size={24} className="text-slate-700" />}
              label="Sign in with Instagram"
            />
            <SocialIconButton
              icon={<Facebook size={24} className="text-slate-700" />}
              label="Sign in with Facebook"
            />
            <SocialIconButton
              icon={<Linkedin size={24} className="text-slate-700" />}
              label="Sign in with LinkedIn"
            />
          </div>

          {/* Footer links */}
          <div className="flex flex-col items-center gap-4 pt-6 pb-2">
            <p className="text-[15px] font-medium text-slate-500">
              Don&apos;t have an account?{" "}
              <AuthLink href="/auth/sign-up">Sign Up.</AuthLink>
            </p>
            <AuthLink href="/auth/reset-password">Forgot Password</AuthLink>
          </div>
        </div>
      </AuthBody>
    </AuthShell>
  );
}
