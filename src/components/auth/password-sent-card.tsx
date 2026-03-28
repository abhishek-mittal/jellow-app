import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordSentCardProps {
  /** The masked email address to display (e.g. "j***@example.com"). */
  maskedEmail: string;
  /**
   * Optional action slot rendered below the email address.
   * Intended for follow-up actions such as a "Resend email" button.
   */
  action?: ReactNode;
  className?: string;
}

/**
 * PasswordSentCard — success state card displayed after a password reset
 * email has been dispatched. Shows a success icon, a confirmation
 * message, the masked destination email address, and an optional action slot.
 */
export function PasswordSentCard({
  maskedEmail,
  action,
  className,
}: PasswordSentCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-[var(--r-xl)] bg-white p-6 text-center shadow-md",
        className
      )}
    >
      {/* Success icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        aria-hidden="true"
      >
        <CheckCircle2 size={32} className="text-green-600" strokeWidth={2} />
      </div>

      {/* Heading */}
      <p className="mt-4 font-[var(--font-heading)] text-xl font-bold text-s-dark-gray">
        Check your inbox
      </p>

      {/* Body */}
      <p className="mt-2 text-sm leading-relaxed text-s-dark-gray/60">
        We&apos;ve sent a password reset link to
      </p>

      {/* Masked email */}
      <p className="mt-1 font-semibold text-s-dark-gray">{maskedEmail}</p>

      {/* Action slot */}
      {action && <div className="mt-5 w-full">{action}</div>}
    </div>
  );
}
