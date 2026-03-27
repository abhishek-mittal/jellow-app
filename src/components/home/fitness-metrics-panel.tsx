"use client";

import { Activity, HeartPulse, Droplet } from "lucide-react";
import { FitnessMetricCard } from "./fitness-metric-card";
import { SectionHeader } from "../ui/section-header";

interface FitnessMetricsPanelProps {}

export function FitnessMetricsPanel({}: FitnessMetricsPanelProps) {
  // Mock data for the charts
  const weightData = [
    { day: "M", value: 69.5 },
    { day: "T", value: 69.8 },
    { day: "W", value: 70.0, highlighted: true },
    { day: "T", value: 70.2, highlighted: true },
    { day: "F", value: 69.9 },
    { day: "S", value: 69.7 },
    { day: "S", value: 70.0 },
  ];

  const bpData = [
    { day: "M", value: 120 },
    { day: "T", value: 118 },
    { day: "W", value: 122 },
    { day: "T", value: 128, highlighted: true },
    { day: "F", value: 125 },
    { day: "S", value: 124 },
    { day: "S", value: 121 },
  ];

  // For line chart, data is represented via the SVG directly in FitnessMetricCard but we map labels
  const hrData = [
    { day: "M", value: 0 },
    { day: "T", value: 0 },
    { day: "W", value: 0 },
    { day: "T", value: 0 },
    { day: "F", value: 0 },
    { day: "S", value: 0 },
    { day: "S", value: 0 },
  ];

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Fitness Metrics" actionText="See All" actionHref="/fitness" />
      
      <div className="flex flex-col gap-3">
        <FitnessMetricCard
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="3" width="18" height="14" rx="4" fill="#EE7F46" />
              <path d="M6 7H14C14.5523 7 15 7.44772 15 8V8.5H5V8C5 7.44772 5.44772 7 6 7Z" fill="white" />
              <ellipse cx="10" cy="11.5" rx="1.5" ry="1.5" fill="white" />
              <line x1="7" y1="14" x2="13" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
          title="Weight"
          value="70.00"
          unit="kg"
          subtitle="Stable weight"
          chartType="bar"
          chartData={weightData}
          chartColor="#EE7F46"
        />

        <FitnessMetricCard
          icon={
            <Droplet className="w-5 h-5 text-[#9F54FF] fill-[#9F54FF]" color="#9F54FF" strokeWidth={0} />
          }
          title="Blood Pressure"
          value="128/80"
          unit="mmHg"
          subtitle="Stable Range"
          chartType="bar"
          chartData={bpData}
          chartColor="#9F54FF"
        />

        <FitnessMetricCard
          icon={
            <HeartPulse className="w-5 h-5 text-[#E95A6E]" strokeWidth={2.5} />
          }
          title="Heart Rate"
          value="72"
          unit="bpm"
          subtitle="Resting Rate"
          chartType="line"
          chartData={hrData}
          chartColor="#E95A6E"
        />
      </div>
    </section>
  );
}