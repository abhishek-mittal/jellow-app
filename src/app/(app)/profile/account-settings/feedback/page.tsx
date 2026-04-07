"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";
import { ChevronLeft } from "lucide-react";

export default function FeedbackPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "performance", label: "Performance", color: "bg-blue-500" },
    { id: "support", label: "Support", color: "bg-gray-400" },
    { id: "bug", label: "Bug", color: "bg-purple-500" },
    { id: "ui", label: "UI", color: "bg-gray-300" },
    { id: "ux", label: "UX", color: "bg-gray-300" },
    { id: "crashes", label: "Crashes", color: "bg-green-400" },
    { id: "loading", label: "Loading", color: "bg-gray-300" },
    { id: "navigation", label: "Navigation", color: "bg-s-orange" },
    { id: "leadership", label: "Leadership", color: "bg-gray-300" },
    { id: "pricing", label: "Pricing", color: "bg-gray-400" },
  ];

  const handleSubmit = () => {
    if (selectedCategory) {
      // TODO: Submit feedback to backend
      router.back();
    }
  };

  return (
    <MotionPage className="min-h-screen bg-s-dark-gray pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="relative bg-s-dark-gray px-5 pb-6 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[28px] font-extrabold leading-tight text-white">
            Submit Feedback
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-8 px-4 pt-12">
        {/* Emoji Icon */}
        <MotionItem>
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-s-black">
              <span className="text-4xl">😊</span>
            </div>
          </div>
        </MotionItem>

        {/* Question */}
        <MotionItem>
          <div className="text-center">
            <h2 className="text-[24px] font-black text-white">
              Which of the area needs improvement?
            </h2>
          </div>
        </MotionItem>

        {/* Category Grid */}
        <MotionItem>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-6 py-2 font-bold text-white transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} ring-2 ring-white`
                    : `${category.color} opacity-60 hover:opacity-100`
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </MotionItem>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Button */}
        <MotionItem>
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedCategory}
            whileHover={selectedCategory ? { scale: 1.02 } : {}}
            whileTap={selectedCategory ? { scale: 0.98 } : {}}
            className={`w-full rounded-full py-4 font-bold transition-all ${
              selectedCategory
                ? "bg-s-black text-white active:bg-s-black/90"
                : "bg-s-gray text-s-gray-dark cursor-not-allowed"
            }`}
          >
            Submit Feedback →
          </motion.button>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
