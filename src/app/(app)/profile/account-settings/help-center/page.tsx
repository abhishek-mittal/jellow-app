"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";
import { ChevronLeft, Settings, Search, ChevronDown, MessageSquare } from "lucide-react";

export default function HelpCenterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"faq" | "chat">("faq");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: 0,
      question: "What is sandow.ai?",
      answer:
        "Sandow AI is an advanced fitness app that utilizes artificial intelligence to provide personalized training.",
    },
    {
      id: 1,
      question: "How does Sandow AI work?",
      answer:
        "Our AI analyzes your fitness level and goals to create personalized workout plans tailored just for you.",
    },
    {
      id: 2,
      question: "Is Sandow AI a replacement for fitness coach?",
      answer:
        "While powerful, Sandow AI works best as a complement to professional coaching for optimal results.",
    },
    {
      id: 3,
      question: "Is Sandow AI free to use?",
      answer:
        "We offer both free and premium plans with different features to suit your needs.",
    },
    {
      id: 4,
      question: "Is my data secure?",
      answer:
        "Yes, your data is encrypted and secured with industry-standard security protocols.",
    },
    {
      id: 5,
      question: "How does Sandow AI work?",
      answer:
        "Our AI analyzes your fitness level and goals to create personalized workout plans.",
    },
  ];

  return (
    <MotionPage className="min-h-screen bg-s-black pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="relative bg-s-black px-5 pb-6 pt-12">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-[24px] font-extrabold text-white">Help Center</h1>
            <button
              aria-label="Settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-3 rounded-full bg-s-black/50 p-1.5">
            <motion.button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 rounded-full py-2 font-semibold transition-colors ${
                activeTab === "faq"
                  ? "bg-s-gray/50 text-white"
                  : "text-s-gray hover:text-white"
              }`}
            >
              FAQ
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 rounded-full py-2 font-semibold transition-colors ${
                activeTab === "chat"
                  ? "bg-s-gray/50 text-white"
                  : "text-s-gray hover:text-white"
              }`}
            >
              Live Chat
            </motion.button>
          </div>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="px-4 pt-6">
        {activeTab === "faq" ? (
          <MotionItem>
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-s-orange" size={20} />
                <input
                  type="text"
                  placeholder="Search our FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-s-orange bg-s-cream py-3 pl-12 pr-4 text-s-black placeholder-s-gray focus:outline-none"
                />
              </div>

              {/* FAQ Items */}
              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={faq.id}
                    className={`rounded-2xl transition-colors ${
                      expandedFaq === idx
                        ? "bg-s-black p-4"
                        : "bg-s-gray/30 p-4 hover:bg-s-gray/40"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === idx ? null : idx)
                      }
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`text-sm font-bold ${
                            expandedFaq === idx
                              ? "text-white"
                              : "text-s-black"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{
                            rotate: expandedFaq === idx ? 180 : 0,
                          }}
                        >
                          <ChevronDown
                            size={20}
                            className={
                              expandedFaq === idx
                                ? "text-s-orange"
                                : "text-s-gray"
                            }
                          />
                        </motion.div>
                      </div>
                    </button>
                    {expandedFaq === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-xs text-white/70"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </MotionItem>
        ) : (
          <MotionItem>
            <div className="flex flex-col items-center gap-8 py-16">
              {/* Chat Icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-s-orange">
                <MessageSquare size={32} className="text-white" />
              </div>

              {/* Message */}
              <div className="text-center">
                <h2 className="mb-2 text-[20px] font-bold text-white">
                  We are here to help you with your fitness needs!
                </h2>
                <p className="text-sm text-s-gray">
                  We aim to reply within a few minutes! 😍
                </p>
              </div>

              {/* Start Chat Button */}
              <motion.button
                onClick={() => router.push("/profile/account-settings/live-chat")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-s-black px-8 py-3 font-bold text-white"
              >
                Start Live Chat →
              </motion.button>
            </div>
          </MotionItem>
        )}
      </main>
    </MotionPage>
  );
}
