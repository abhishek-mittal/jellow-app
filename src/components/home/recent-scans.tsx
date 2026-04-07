"use client";

import Link from "next/link";
import { MotionItem } from "@/components/motion";
import { seedHistory } from "@/lib/seed-data";

const verdictColor: Record<string, string> = {
  excellent: "bg-emerald-50 text-emerald-600",
  good: "bg-emerald-50 text-emerald-600",
  caution: "bg-amber-50 text-amber-600",
  poor: "bg-red-50 text-red-600",
  avoid: "bg-red-50 text-red-600",
};

const verdictLabel: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  caution: "Caution",
  poor: "Poor",
  avoid: "Avoid",
};

/** Recent scan history list on the home dashboard. */
export function RecentScans() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-gray-800">
          Recent Scans
        </h2>
        <Link
          href={"/home" as never}
          className="text-[13px] font-medium text-blue-500"
        >
          See all →
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {seedHistory.map((item) => (
          <MotionItem key={item.id}>
            <Link
              href={`/verdict/${item.product.id}` as never}
              className="flex items-center gap-3 rounded-[16px] bg-white p-3.5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-s-orange text-[18px] font-black text-white">
                {item.product.score}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900 truncate">
                  {item.product.name}
                </p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  {item.product.brand} · {new Date(item.scannedAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${verdictColor[item.product.level] ?? ""}`}
              >
                {verdictLabel[item.product.level] ?? item.product.level}
              </span>
            </Link>
          </MotionItem>
        ))}
      </div>
    </section>
  );
}
