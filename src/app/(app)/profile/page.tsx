"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Droplet,
  MapPin,
  Pencil,
  Settings,
  Sparkles,
  User,
  Weight,
} from "lucide-react";
import { MotionItem, MotionPage, spring } from "@/components/motion";

type WeeklyScore = {
  day: string;
  value: number;
};

const weeklyScores: WeeklyScore[] = [
  { day: "Mon", value: 75 },
  { day: "Tue", value: 95 },
  { day: "Wed", value: 82 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 81 },
  { day: "Sun", value: 94 },
];

function ScoreChart() {
  const min = 60;
  const max = 100;

  return (
    <div className="rounded-3xl bg-[#ECECEE] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-s-orange">
            <Sparkles size={18} fill="currentColor" strokeWidth={1.8} />
          </span>
          <p className="font-heading text-xl font-bold text-s-dark-gray">Jellow Score</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-s-dark-gray">
          <Calendar size={14} />
          Weekly
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="relative h-60 rounded-3xl bg-[#ECECEE] px-4 pb-4 pt-2">
        {[60, 70, 80, 90, 100].map((line) => (
          <div
            key={line}
            className="pointer-events-none absolute left-0 right-0 border-t border-[#D4D5D9]"
            style={{ top: `${100 - ((line - min) / (max - min)) * 85}%` }}
          >
            <span className="absolute -left-1 -translate-x-full -translate-y-1/2 text-[11px] font-semibold text-[#B3B5BD]">
              {line}
            </span>
          </div>
        ))}

        <div className="absolute bottom-4 left-3 right-3 flex items-end justify-between gap-2">
          {weeklyScores.map((item, index) => {
            const isSelected = index === 1;
            const barHeight = `${Math.max(((item.value - min) / (max - min)) * 170, 34)}px`;

            return (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full items-end justify-center" style={{ height: 176 }}>
                  {isSelected ? (
                    <>
                      <div className="absolute -top-1 rounded-2xl bg-black px-3 py-1 text-xs font-bold text-white">
                        {item.value}
                        <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-black" />
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: barHeight }}
                        transition={{ delay: 0.1, ...spring.gentle }}
                        className="w-5.5 rounded-full bg-black"
                      />
                    </>
                  ) : (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: barHeight }}
                      transition={{ delay: 0.1 + index * 0.03, ...spring.gentle }}
                      className="w-5.5 rounded-full bg-[#D5D6DA]"
                    />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-[#BABCC3]">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OtherInformationCard({
  icon,
  value,
  unit,
  label,
  iconColor,
}: {
  icon: ReactNode;
  value: number;
  unit: string;
  label: string;
  iconColor: string;
}) {
  return (
    <div className="flex-1 rounded-3xl bg-[#ECECEE] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <span className="mb-3 inline-flex" style={{ color: iconColor }}>
        {icon}
      </span>
      <p className="font-heading text-[42px] leading-[0.95] text-s-dark-gray">
        <span className="font-extrabold">{value}</span>
        <span className="ml-1 text-[22px] font-semibold text-s-dark-gray/75">{unit}</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-s-dark-gray/75">{label}</p>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  return (
    <MotionPage className="min-h-screen">
      <MotionItem>
        <section className="overflow-hidden rounded-b-[40px] bg-s-gray pb-5">
          <div className="relative h-57.5 overflow-hidden rounded-b-[40px]">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80"
              alt="Gym equipment cover"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <button
              aria-label="Edit profile"
              onClick={() => router.push("/profile/personal-information")}
              className="absolute left-4 top-1/2 flex h-15 w-15 -translate-y-1/2 items-center justify-center rounded-[22px] bg-white/35 text-white backdrop-blur-sm"
            >
              <Pencil size={24} />
            </button>

            <button
              aria-label="Open profile settings"
              onClick={() => router.push("/profile/account-settings")}
              className="absolute right-4 top-1/2 flex h-15 w-15 -translate-y-1/2 items-center justify-center rounded-[22px] bg-white/35 text-white backdrop-blur-sm"
            >
              <Settings size={24} />
            </button>
          </div>

          <div className="relative -mt-13.5 flex flex-col items-center px-5 text-center">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={spring.gentle}
              className="h-27 w-27 overflow-hidden rounded-full border-[6px] border-s-gray bg-white shadow-md"
            >
              <img
                src="https://i.pravatar.cc/220?img=47"
                alt="Makise Kurisu"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <h1 className="mt-4 font-heading text-[46px] font-bold leading-none text-s-black">
              Makise Kurisu
            </h1>

            <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-s-dark-gray/70">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={18} />
                Tokyo, Japan
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-s-dark-gray/35" />
              <span className="inline-flex items-center gap-1.5">
                <User size={18} />
                Basic Member
              </span>
            </div>
          </div>
        </section>
      </MotionItem>

      <div className="space-y-5 px-5 pb-6 pt-4">
        <MotionItem>
          <ScoreChart />
        </MotionItem>

        <MotionItem>
          <section>
            <h2 className="mb-3 px-1 font-heading text-xl font-bold text-s-dark-gray">
              Other Information
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <OtherInformationCard
                icon={<Sparkles size={20} fill="currentColor" strokeWidth={1.8} />}
                value={17}
                unit="yr"
                label="Current Age"
                iconColor="#EF4444"
              />
              <OtherInformationCard
                icon={<Weight size={20} />}
                value={68}
                unit="kg"
                label="Weight"
                iconColor="#84CC16"
              />
              <OtherInformationCard
                icon={<Droplet size={20} fill="currentColor" strokeWidth={1.8} />}
                value={978}
                unit="kcal"
                label="Daily Intake"
                iconColor="#2563EB"
              />
            </div>
          </section>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
