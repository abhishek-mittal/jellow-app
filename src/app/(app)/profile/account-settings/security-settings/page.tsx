"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem, spring } from "@/components/motion";
import { ChevronLeft, Shield } from "lucide-react";

export default function SecuritySettingsPage() {
  const router = useRouter();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [googleAuthenticator, setGoogleAuthenticator] = useState(true);
  const [faceID, setFaceID] = useState(false);
  const [biometricUnlock, setBiometricUnlock] = useState(true);

  return (
    <MotionPage className="min-h-screen bg-s-cream pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="flex items-center gap-3 px-5 pb-4 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-s-gray/20 text-s-black active:bg-s-gray/30"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[22px] font-extrabold text-s-black">
            Security Settings
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-5 px-4 pt-6">
        {/* Shield Icon */}
        <MotionItem>
          <div className="flex justify-center py-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-s-gray/20">
              <Shield size={64} className="text-s-black" />
            </div>
          </div>
        </MotionItem>

        {/* General Section */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <h2 className="mb-4 text-[16px] font-bold text-s-black">General</h2>
            <div className="flex flex-col gap-3">
              {/* 2FA Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">
                    2 Factor Authenticator
                  </span>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      twoFactorAuth ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle 2FA"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: twoFactorAuth ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  2FA is an identity and access management security method.
                </p>
              </div>

              {/* Google Authenticator Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">
                    Google Authenticator
                  </span>
                  <button
                    onClick={() => setGoogleAuthenticator(!googleAuthenticator)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      googleAuthenticator ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle Google Authenticator"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: googleAuthenticator ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  Google Authenticator adds an extra layer of security.
                </p>
              </div>

              {/* Face ID Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">Face ID</span>
                  <button
                    onClick={() => setFaceID(!faceID)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      faceID ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle Face ID"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: faceID ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  Face ID lets you securely unlock your iPhone or iPad.
                </p>
              </div>

              {/* Biometric Unlock Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">
                    Biometric Unlock
                  </span>
                  <button
                    onClick={() => setBiometricUnlock(!biometricUnlock)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      biometricUnlock ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle Biometric Unlock"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: biometricUnlock ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  The biometric unlock feature can be achieved through visiting our website directly.
                </p>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* Save Button */}
        <MotionItem>
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-s-black py-4 font-bold text-white transition-colors active:bg-s-black/90"
          >
            Save Settings ✓
          </motion.button>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
