import type { Metadata } from "next";
import { PasswordSentScreen } from "@/components/auth/password-sent-screen";

export const metadata: Metadata = {
  title: "Password Sent | Jellow",
};

/** Masks the local-part of an email address, keeping the domain visible.
 * @example maskEmail("elementary221b@gmail.com") → "**221b@gmail.com"
 * @example maskEmail("") → "**@example.com"
 */
function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return "**@example.com";

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  const visible = local.length > 4 ? local.slice(-4) : local.slice(-1);
  return `**${visible}${domain}`;
}

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

/**
 * `/auth/password-sent` — confirmation screen shown after a password-reset
 * email has been dispatched.  Accepts an optional `?email=` search param that
 * is masked before display.
 */
export default async function PasswordSentPage({ searchParams }: PageProps) {
  const { email } = await searchParams;
  const maskedEmail = maskEmail(email ?? "");

  return <PasswordSentScreen maskedEmail={maskedEmail} />;
}
