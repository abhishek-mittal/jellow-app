"use client";

import { useRouter } from "next/navigation";
import { Camera, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { spring, MotionPress } from "@/components/motion";

const features = [
  {
    icon: <Camera size={20} className="text-white" />,
    bg: "bg-s-dark-gray",
    title: "Scan Anything",
    desc: "Instantly analyze food & medicine labels",
  },
  {
    icon: <Target size={20} className="text-white" />,
    bg: "bg-accent-red",
    title: "Get Verdicts",
    desc: "Clear health scores you can trust",
  },
  {
    icon: <Heart size={20} className="text-white" />,
    bg: "bg-s-orange",
    title: "Earn Rewards",
    desc: "Complete challenges, unlock badges",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    localStorage.setItem(
      "jellow_preferences",
      JSON.stringify({ onboardingComplete: true }),
    );
    router.push("/home");
  };

  const handleSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center bg-s-gray p-8 pt-16 text-center">
      {/* Warm gradient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-s-orange/20 to-transparent" />

      {/* Honey jar icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={spring.bouncy}
        className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-s-orange/60 to-s-orange"
        aria-hidden
      >
        <span className="text-4xl">🍯</span>
      </motion.div>

      {/* Title + tagline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...spring.gentle }}
        className="mb-1 font-heading text-4xl font-bold text-s-dark-gray"
      >
        Jellow
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...spring.gentle }}
        className="mb-3 text-base text-nav-inactive"
      >
        Your playful health companion
      </motion.p>

      {/* Step dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-8 flex gap-2"
      >
        <div className="h-2 w-6 rounded-full bg-s-blue" />
        <div className="h-2 w-2 rounded-full bg-surface-divider" />
      </motion.div>

      {/* Feature cards */}
      <div className="w-full max-w-sm space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, ...spring.gentle }}
            className="flex items-center gap-4 rounded-[var(--r-xl)] bg-surface-card p-4 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${f.bg}`}
            >
              {f.icon}
            </div>
            <div className="text-left">
              <p className="font-semibold text-s-dark-gray">{f.title}</p>
              <p className="text-sm text-nav-inactive">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, ...spring.gentle }}
        className="mt-auto w-full max-w-sm space-y-3 pt-8"
      >
        <MotionPress>
          <button
            type="button"
            onClick={handleGetStarted}
            className="w-full rounded-full bg-gradient-to-r from-s-orange to-accent-red py-4 text-lg font-bold text-white shadow-lg"
          >
            Get Started 🚀
          </button>
        </MotionPress>
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full py-2 text-sm text-nav-inactive"
        >
          Already have an account?{" "}
          <span className="font-medium text-s-orange">Sign in</span>
        </button>
      </motion.div>
    </div>
  );
}
