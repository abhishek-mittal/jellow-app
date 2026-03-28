"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Props for the generic AuthInput atom. */
export type AuthInputProps = {
  /** Visible label rendered above the input. */
  label: string;
  /** Input placeholder text. */
  placeholder?: string;
  /** Current controlled value. */
  value?: string;
  /** Called when the value changes. */
  onChange?: (value: string) => void;
  /** Icon rendered on the leading (left) side of the input. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered on the trailing (right) side of the input. Ignored when `showVisibilityToggle` is `true`. */
  trailingIcon?: React.ReactNode;
  /** When `true`, renders an eye/eye-off toggle button for password visibility. Overrides `trailingIcon`. */
  showVisibilityToggle?: boolean;
  /** When `true`, the input is in the error state (red border). */
  isInvalid?: boolean;
  /** Error message shown below the input when `isInvalid` is `true`. */
  errorMessage?: string;
  /** Disables the input. */
  disabled?: boolean;
  /** Additional class names for the outer wrapper div. */
  className?: string;
  /** Additional class names applied to the inner `<input>` element. */
  inputClassName?: string;
  /** Accessible label override (defaults to `label`). */
  "aria-label"?: string;
  /** Called when the input loses focus. */
  onBlur?: () => void;
};

/**
 * Base auth input atom with leading/trailing icon slots, password visibility
 * toggle, and default / focus / error visual states.
 */
export function AuthInput({
  label,
  placeholder,
  value,
  onChange,
  leadingIcon,
  trailingIcon,
  showVisibilityToggle = false,
  isInvalid = false,
  errorMessage,
  disabled,
  className,
  inputClassName,
  "aria-label": ariaLabel,
  onBlur,
}: AuthInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => setIsVisible((prev) => !prev);

  const inputType = showVisibilityToggle
    ? isVisible
      ? "text"
      : "password"
    : "text";

  const endContent = showVisibilityToggle ? (
    <button
      className="focus:outline-none"
      type="button"
      onClick={handleToggleVisibility}
      aria-label={isVisible ? "hide password" : "show password"}
    >
      {isVisible ? (
        <EyeOff className="text-slate-400" strokeWidth={2.5} size={22} />
      ) : (
        <Eye className="text-slate-400" strokeWidth={2.5} size={22} />
      )}
    </button>
  ) : (
    trailingIcon
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-[15px] font-bold text-slate-900 ml-1">{label}</label>
      <Input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        startContent={leadingIcon}
        endContent={endContent}
        isInvalid={isInvalid}
        isDisabled={disabled}
        onBlur={onBlur}
        aria-label={ariaLabel ?? label}
        classNames={{
          inputWrapper: cn(
            "bg-[#F3F4F6] border-transparent hover:bg-slate-200 focus-within:!bg-white border-2 shadow-none rounded-[22px] h-[60px] px-4 transition-colors",
            isInvalid
              ? "!border-red-500 !bg-white hover:!bg-white"
              : "focus-within:!border-[#ff6b00]"
          ),
          input: cn(
            "text-slate-900 placeholder:text-slate-500 text-[16px] font-medium ml-2",
            showVisibilityToggle && "[&:not(:placeholder-shown)]:tracking-widest",
            inputClassName
          ),
          errorMessage: "text-red-500 text-[13px] font-medium ml-1 mt-1",
        }}
        errorMessage={errorMessage}
      />
    </div>
  );
}

/**
 * Pre-configured email input with a mail icon in the leading slot.
 */
export function EmailInput(
  props: Omit<AuthInputProps, "leadingIcon" | "showVisibilityToggle">
) {
  return (
    <AuthInput
      {...props}
      leadingIcon={
        <Mail className="text-slate-800 flex-shrink-0" strokeWidth={2.5} size={20} />
      }
    />
  );
}

/**
 * Pre-configured password input with a lock icon and a visibility toggle.
 */
export function PasswordInput(
  props: Omit<AuthInputProps, "leadingIcon" | "showVisibilityToggle">
) {
  return (
    <AuthInput
      {...props}
      leadingIcon={
        <Lock className="text-slate-800 flex-shrink-0" strokeWidth={2.5} size={20} />
      }
      showVisibilityToggle
    />
  );
}

/**
 * Pre-configured confirm-password input — same as `PasswordInput`.
 */
export const ConfirmPasswordInput = PasswordInput;
