"use client";

import { cn } from "@/lib/utils";

export interface ScanGuideProps {
  isScanning: boolean;
  onFlashToggle: () => void;
  onManualEntry: () => void;
  flashEnabled: boolean;
}

/** Width/height of the transparent scan-window (14rem = 224px). */
const SCAN_SIZE = "14rem";

export function ScanGuide({
  isScanning,
  onFlashToggle,
  onManualEntry,
  flashEnabled,
}: ScanGuideProps) {
  return (
    <div className="absolute inset-0 z-10">
      {/* ── Dark overlay composed of four panels around the transparent window ── */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top panel */}
        <div className="w-full flex-1 bg-black/65" />

        {/* Middle row */}
        <div className="flex" style={{ height: SCAN_SIZE }}>
          <div className="flex-1 bg-black/65" />
          {/* transparent scan window */}
          <div style={{ width: SCAN_SIZE }} />
          <div className="flex-1 bg-black/65" />
        </div>

        {/* Bottom panel */}
        <div className="w-full flex-1 bg-black/65" />
      </div>

      {/* ── Flash toggle button (top-right) ── */}
      <button
        onClick={onFlashToggle}
        aria-label={flashEnabled ? "Turn off flash" : "Turn on flash"}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        {flashEnabled ? "⚡" : "🔦"}
      </button>

      {/* ── Content centred over the scan window ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Instruction text above scan area */}
        <p
          aria-live="polite"
          className="mb-3 text-sm font-semibold text-white drop-shadow-md"
        >
          {isScanning ? "Scanning…" : "Point camera at barcode"}
        </p>

        {/* Scan window with animated corner brackets */}
        <div
          className="relative"
          style={{ width: SCAN_SIZE, height: SCAN_SIZE }}
        >
          {/* Top-left bracket */}
          <div
            className={cn(
              "absolute left-0 top-0 h-8 w-8 rounded-tl-sm border-l-4 border-t-4",
              "border-[var(--jellow-yellow)]",
              isScanning && "animate-pulse"
            )}
          />
          {/* Top-right bracket */}
          <div
            className={cn(
              "absolute right-0 top-0 h-8 w-8 rounded-tr-sm border-r-4 border-t-4",
              "border-[var(--jellow-yellow)]",
              isScanning && "animate-pulse"
            )}
          />
          {/* Bottom-left bracket */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-8 w-8 rounded-bl-sm border-b-4 border-l-4",
              "border-[var(--jellow-yellow)]",
              isScanning && "animate-pulse"
            )}
          />
          {/* Bottom-right bracket */}
          <div
            className={cn(
              "absolute bottom-0 right-0 h-8 w-8 rounded-br-sm border-b-4 border-r-4",
              "border-[var(--jellow-yellow)]",
              isScanning && "animate-pulse"
            )}
          />
        </div>

        {/* Manual entry link below scan area */}
        <button
          onClick={onManualEntry}
          className="mt-4 text-sm text-white/80 underline underline-offset-2 transition-colors hover:text-white"
        >
          Can&#39;t scan? Enter manually
        </button>
      </div>
    </div>
  );
}
