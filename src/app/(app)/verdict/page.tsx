"use client";

import Link from "next/link";
import { FoodCard } from "@/components/ui/food-card";
import type { ScanHistoryEntry } from "@/lib/types";
import { verdictLevelToVerdict, formatRelativeTime } from "@/lib/verdict";
import { Clock, ScanBarcode } from "lucide-react";
import { motion } from "framer-motion";
import {
  MotionPage,
  MotionItem,
  MotionPress,
  spring,
  staggerContainer,
  fadeInUp,
} from "@/components/motion";

/** Demo scan history — replace with real API data when available. */
const scanHistory: ScanHistoryEntry[] = [
  {
    id: "s1",
    product: { id: "p1", name: "Greek Yogurt", brand: "Organic Valley", score: 92, level: "excellent" },
    scannedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "s2",
    product: { id: "p2", name: "Energy Bar", brand: "Clif Bar", score: 58, level: "caution" },
    scannedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "s3",
    product: { id: "p3", name: "Almond Milk", brand: "Califia", score: 85, level: "excellent" },
    scannedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

export default function VerdictPage() {
  return (
    <MotionPage className="min-h-screen">
      {/* ── Gradient Header ── */}
      <MotionItem>
        <div className="gradient-header rounded-b-[var(--r-2xl)] px-5 pb-5 pt-12">
          <h1 className="font-heading text-2xl font-bold text-white">
            Scan History
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Your recently scanned products
          </p>
        </div>
      </MotionItem>

      <div className="px-5 pt-5 pb-6">
        {/* History list */}
        {scanHistory.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {scanHistory.map((entry) => (
              <motion.div
                key={entry.id}
                variants={fadeInUp}
                transition={spring.gentle}
              >
                <Link href={`/verdict/${entry.product.id}`}>
                  <MotionPress>
                    <FoodCard
                      food={{
                        id: entry.product.id,
                        name: entry.product.name,
                        brand: `${entry.product.brand} · ${formatRelativeTime(entry.scannedAt)}`,
                        verdict: verdictLevelToVerdict(entry.product.level),
                      }}
                    />
                  </MotionPress>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <MotionItem>
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring.bouncy}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200/30"
              >
                <Clock size={32} className="text-s-dark-gray" />
              </motion.div>
              <p className="font-heading text-base font-bold text-s-dark-gray">
                No scans yet
              </p>
              <p className="mt-1 mb-6 text-sm text-s-dark-gray">
                Scan a product barcode to see your history here
              </p>
              <Link href="/scan">
                <MotionPress>
                  <div className="inline-flex items-center gap-2 rounded-full bg-s-orange px-5 py-2.5 text-sm font-semibold text-white shadow-orange-sm">
                    <ScanBarcode size={16} /> Scan Now
                  </div>
                </MotionPress>
              </Link>
            </div>
          </MotionItem>
        )}
      </div>
    </MotionPage>
  );
}
