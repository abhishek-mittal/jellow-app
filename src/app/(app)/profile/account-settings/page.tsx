"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem, spring } from "@/components/motion";
import {
  SettingsSection,
  SettingsItem,
  SettingsBadge,
} from "@/components/profile/settings-item";
import {
  Bell,
  ChevronLeft,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  Link2,
  LogOut,
  MessageCircle,
  Moon,
  Phone,
  Shield,
  Sparkles,
  Trash2,
  TriangleAlert,
  User,
} from "lucide-react";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <MotionPage className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="relative bg-s-black px-5 pb-6 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[28px] font-extrabold leading-tight text-white">
            Account Settings
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-6 px-4 pt-5">
        {/* General */}
        <MotionItem>
          <SettingsSection title="General">
            <SettingsItem
              icon={Bell}
              label="Notifications"
              onPress={() => router.push("/profile/account-settings/notification-settings")}
            />
            <SettingsItem
              icon={User}
              label="Personal Information"
              onPress={() => router.push("/profile/personal-information")}
            />
            <SettingsItem
              icon={Phone}
              label="Coach Contact"
              value="15+"
            />
            <SettingsItem
              icon={Globe}
              label="Language"
              value="English (EN)"
            />
            <SettingsItem
              icon={Moon}
              label="Dark Mode"
              type="toggle"
              checked={darkMode}
              onToggle={setDarkMode}
            />
            <SettingsItem
              icon={Link2}
              label="Linked Devices"
              value="Apple Watch"
              onPress={() => router.push("/profile/account-settings/linked-devices")}
            />
          </SettingsSection>
        </MotionItem>

        {/* Security & Privacy */}
        <MotionItem>
          <SettingsSection
            title="Security & Privacy"
            badge={<SettingsBadge>Beta</SettingsBadge>}
          >
            <SettingsItem
              icon={Shield}
              label="Main Security"
              onPress={() => router.push("/profile/account-settings/security-settings")}
            />
            <SettingsItem
              icon={Eye}
              label="Enable Biometric"
              type="toggle"
              checked={biometric}
              onToggle={setBiometric}
            />
            <SettingsItem icon={FileText} label="Privacy Policy" value="3+" />
          </SettingsSection>
        </MotionItem>

        {/* Help & Support */}
        <MotionItem>
          <SettingsSection title="Help & Support">
            <SettingsItem
              icon={Sparkles}
              label="About Us"
              onPress={() => router.push("/profile/account-settings/about-us")}
            />
            <SettingsItem
              icon={HelpCircle}
              label="Help Center"
              onPress={() => router.push("/profile/account-settings/help-center")}
            />
            <SettingsItem
              icon={MessageCircle}
              label="Submit Feedback"
              onPress={() => router.push("/profile/account-settings/feedback")}
            />
          </SettingsSection>
        </MotionItem>

        {/* Danger Zone */}
        <MotionItem>
          <SettingsSection
            title="Danger Zone"
            badge={
              <SettingsBadge variant="warning">Warning</SettingsBadge>
            }
          >
            <SettingsItem icon={Trash2} label="Close Account" type="danger" />
          </SettingsSection>
        </MotionItem>

        {/* Log Out */}
        <MotionItem>
          <SettingsSection title="Log Out">
            <SettingsItem icon={LogOut} label="Sign Out" />
          </SettingsSection>
        </MotionItem>

        {/* ─── Footer ─── */}
        <MotionItem>
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, ...spring.gentle }}
            className="mt-2 flex flex-col items-center gap-1 rounded-3xl bg-s-black px-6 py-6"
          >
            <Sparkles size={20} className="text-white" />
            <p className="text-sm font-semibold text-white">jellow v1.0.0</p>
            <p className="text-[11px] text-white/50">
              ©All Rights Reserved, 2025
            </p>
          </motion.footer>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
