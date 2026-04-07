"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Settings,
  User,
} from "lucide-react";
import { MotionItem, MotionPage, MotionPress, spring } from "@/components/motion";
import { cn } from "@/lib/utils";

/* ─── Seed data (matches profile page) ─── */
const seedPersonalInfo = {
  fullName: "Makise Kurisu",
  email: "elementary221b@gmail.com",
  password: "secretpassword",
  weight: 3,
  gender: "Trans Female",
  location: "Tokyo, Japan",
  accountType: "coach" as const,
};

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

/** Black header with back button, title, and settings icon */
function PersonalInfoHeader({
  onBack,
  onOpenSettings,
}: {
  onBack: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="relative overflow-hidden bg-s-black px-5 pb-8 pt-14">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors active:bg-white/25"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="font-heading text-lg font-bold text-white">Personal Information</h1>

        <button
          onClick={onOpenSettings}
          aria-label="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors active:bg-white/25"
        >
          <Settings size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/** Profile avatar with orange edit overlay */
function ProfileAvatar() {
  return (
    <div className="relative -mt-14 mb-2 flex justify-center">
      <div className="relative">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={spring.gentle}
          className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg"
        >
          <img
            src="https://i.pravatar.cc/220?img=47"
            alt="Profile photo"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Orange camera button */}
        <button
          aria-label="Change profile photo"
          className="absolute -bottom-1 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl bg-s-orange text-white shadow-md transition-transform active:scale-90"
        >
          <Pencil size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/** Info field — read-only with icon and optional edit button */
function InfoField({
  label,
  value,
  leadingIcon,
  trailingIcon,
  isFocused,
  onFocus,
  onBlur,
  className,
  children,
}: {
  label: string;
  value?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="ml-1 text-[15px] font-bold text-s-dark-gray">{label}</label>
      {children ?? (
        <div
          tabIndex={0}
          role="textbox"
          aria-label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cn(
            "flex h-14 items-center gap-3 rounded-[20px] px-4 transition-all",
            isFocused
              ? "border-2 border-s-orange bg-white shadow-[0_0_0_3px_rgba(255,107,0,0.12)]"
              : "border-2 border-transparent bg-[#F0F0F2]"
          )}
        >
          {leadingIcon && (
            <span className="shrink-0 text-[#9CA3AF]">{leadingIcon}</span>
          )}
          <span className="flex-1 truncate text-[16px] font-medium text-s-dark-gray">
            {value}
          </span>
          {trailingIcon && (
            <span className="shrink-0 text-[#C4C5C9]">{trailingIcon}</span>
          )}
        </div>
      )}
    </div>
  );
}

/** Password field with visibility toggle */
function PasswordField({
  value,
  isFocused,
  onFocus,
  onBlur,
}: {
  value: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InfoField label="Password" isFocused={isFocused} onFocus={onFocus} onBlur={onBlur}>
      <div
        tabIndex={0}
        role="textbox"
        aria-label="Password"
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "flex h-14 items-center gap-3 rounded-[20px] px-4 transition-all",
          isFocused
            ? "border-2 border-s-orange bg-white shadow-[0_0_0_3px_rgba(255,107,0,0.12)]"
            : "border-2 border-transparent bg-[#F0F0F2]"
        )}
      >
        <span className="shrink-0 text-[#9CA3AF]">
          <Lock size={20} strokeWidth={2} />
        </span>
        <span className="flex-1 truncate text-[16px] font-medium tracking-widest text-s-dark-gray">
          {isVisible ? value : "•".repeat(value.length)}
        </span>
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="shrink-0 text-[#9CA3AF] transition-colors active:text-s-dark-gray"
        >
          {isVisible ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
        </button>
      </div>
    </InfoField>
  );
}

/** Weight slider with orange track */
function WeightSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const min = 1;
  const max = 5;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-[15px] font-bold text-s-dark-gray">Weight</label>
        <span className="text-[13px] font-semibold text-[#9CA3AF]">kilograms</span>
      </div>

      <div className="relative px-1 py-3">
        {/* Track background */}
        <div className="relative h-2 w-full rounded-full bg-[#E5E5EA]">
          {/* Active track */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-s-orange"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-s-orange bg-s-orange shadow-md"
          style={{ left: `${pct}%` }}
        />

        {/* Native range input (invisible, for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Weight in kilograms"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {/* Scale labels */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[13px] font-semibold text-[#9CA3AF]">{min}</span>
        <span className="text-[15px] font-bold text-s-dark-gray">{value}</span>
        <span className="text-[13px] font-semibold text-[#9CA3AF]">{max}</span>
      </div>
    </div>
  );
}

/** Gender select dropdown */
function GenderSelect({ value }: { value: string }) {
  return (
    <div className="space-y-2">
      <label className="ml-1 text-[15px] font-bold text-s-dark-gray">Gender</label>
      <div className="flex h-14 items-center gap-3 rounded-[20px] border-2 border-transparent bg-[#F0F0F2] px-4">
        <span className="shrink-0 text-[#9CA3AF]">
          {/* Gender icon (simplified) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M12 13v8" />
            <path d="M9 18h6" />
            <path d="M7 21l3-3M17 21l-3-3" />
          </svg>
        </span>
        <span className="flex-1 text-[16px] font-medium text-s-dark-gray">{value}</span>
        <span className="shrink-0 text-[#C4C5C9]">
          <ChevronDown size={20} strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}

/** Account type chip selector */
function AccountTypeSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (v: string) => void;
}) {
  const options = [
    { label: "Regular", value: "regular" },
    { label: "Coach", value: "coach" },
    { label: "Nutritionist", value: "nutritionist" },
  ];

  return (
    <div className="space-y-2">
      <label className="ml-1 text-[15px] font-bold text-s-dark-gray">Account Type</label>
      <div className="flex items-center gap-2">
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <MotionPress key={opt.value}>
              <button
                onClick={() => onChange(opt.value)}
                aria-pressed={isActive}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold transition-all",
                  isActive
                    ? "bg-s-blue text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
                    : "bg-[#F0F0F2] text-s-dark-gray"
                )}
              >
                {opt.label}
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                    isActive ? "border-white bg-white" : "border-[#C4C5C9] bg-transparent"
                  )}
                >
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={spring.bouncy}
                    >
                      <span className="block h-2.5 w-2.5 rounded-full bg-s-blue" />
                    </motion.span>
                  )}
                </span>
              </button>
            </MotionPress>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

export default function PersonalInformationPage() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [weight, setWeight] = useState(seedPersonalInfo.weight);
  const [accountType, setAccountType] = useState<string>(seedPersonalInfo.accountType);

  return (
    <MotionPage className="min-h-screen bg-s-gray">
      {/* Header */}
      <MotionItem>
        <PersonalInfoHeader
          onBack={() => router.back()}
          onOpenSettings={() => router.push("/profile/account-settings")}
        />
      </MotionItem>

      {/* Avatar */}
      <MotionItem>
        <ProfileAvatar />
      </MotionItem>

      {/* Form fields */}
      <div className="space-y-5 px-5 pb-8 pt-2">
        {/* Full Name */}
        <MotionItem>
          <InfoField
            label="Full Name"
            value={seedPersonalInfo.fullName}
            leadingIcon={<User size={20} strokeWidth={2} />}
            trailingIcon={<Pencil size={18} strokeWidth={2} />}
            isFocused={focusedField === "name"}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
          />
        </MotionItem>

        {/* Email Address */}
        <MotionItem>
          <InfoField
            label="Email Address"
            value={seedPersonalInfo.email}
            leadingIcon={<Mail size={20} strokeWidth={2} />}
            trailingIcon={<Pencil size={18} strokeWidth={2} />}
            isFocused={focusedField === "email"}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
        </MotionItem>

        {/* Password */}
        <MotionItem>
          <PasswordField
            value={seedPersonalInfo.password}
            isFocused={focusedField === "password"}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
        </MotionItem>

        {/* Weight Slider */}
        <MotionItem>
          <WeightSlider value={weight} onChange={setWeight} />
        </MotionItem>

        {/* Gender */}
        <MotionItem>
          <GenderSelect value={seedPersonalInfo.gender} />
        </MotionItem>

        {/* Location */}
        <MotionItem>
          <InfoField
            label="Location"
            value={seedPersonalInfo.location}
            leadingIcon={<MapPin size={20} strokeWidth={2} />}
            trailingIcon={<Pencil size={18} strokeWidth={2} />}
            isFocused={focusedField === "location"}
            onFocus={() => setFocusedField("location")}
            onBlur={() => setFocusedField(null)}
          />
        </MotionItem>

        {/* Account Type */}
        <MotionItem>
          <AccountTypeSelector selected={accountType} onChange={setAccountType} />
        </MotionItem>

        {/* Save button */}
        <MotionItem>
          <div className="pt-4">
            <MotionPress>
              <button className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[20px] bg-s-black text-[16px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-colors active:bg-s-dark-gray">
                Save Settings
                <Check size={18} strokeWidth={3} />
              </button>
            </MotionPress>
          </div>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
