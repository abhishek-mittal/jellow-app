"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanGuide } from "@/components/scanner/scan-guide";
import { Button } from "@/components/ui/button";
import { Camera, ShieldOff, AlertCircle, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { spring, MotionPage, MotionItem, MotionPress } from "@/components/motion";

type PermissionStatus = "prompt" | "granted" | "denied" | "unsupported";

/** Mock scan delay in milliseconds (simulates barcode detection). */
const MOCK_SCAN_DELAY_MS = 2500;

/**
 * Demo verdict path used until real barcode lookup is implemented.
 * Replace with `/verdict/${detectedBarcode}` once the scanner is wired up.
 */
const DEMO_VERDICT_PATH = "/verdict/p1";

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [permission, setPermission] = useState<PermissionStatus>("prompt");
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  /** Attach a stream to the video element once both exist. */
  const attachStream = useCallback((stream: MediaStream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, []);

  /** Request camera permission and start the live preview. */
  const requestCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      attachStream(stream);
      setPermission("granted");
    } catch (err) {
      if (err instanceof Error && err.name === "NotAllowedError") {
        setPermission("denied");
      } else {
        setProcessingError("Could not access the camera. Please try again.");
      }
    }
  }, [attachStream]);

  /** Start mock barcode scan and navigate to verdict on success. */
  const startScan = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    setProcessingError(null);

    // Mock detection — replace with real BarcodeDetector / library integration.
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
      router.push(DEMO_VERDICT_PATH);
    }, MOCK_SCAN_DELAY_MS);
  }, [isScanning, router]);

  /** Toggle torch/flash via MediaStreamTrack capabilities when available. */
  const handleFlashToggle = useCallback(() => {
    setFlashEnabled((prev) => {
      const next = !prev;
      const track = streamRef.current?.getVideoTracks()[0];
      if (track && "applyConstraints" in track) {
        // Best-effort torch toggle. The `torch` constraint is non-standard
        // (Chrome/Android only) so we cast and swallow any rejection.
        track
          .applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] })
          .catch(() => undefined);
      }
      return next;
    });
  }, []);

  const handleManualEntry = useCallback(() => {
    router.push(DEMO_VERDICT_PATH);
  }, [router]);

  /** Stop camera tracks when unmounting. */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  // ── Permission: prompt ────────────────────────────────────────────────────
  if (permission === "prompt") {
    return (
      <MotionPage className="flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6 text-center">
        <MotionItem>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={spring.bouncy}
            className="flex h-28 w-28 items-center justify-center rounded-[var(--r-2xl)] bg-gradient-to-br from-s-orange to-s-orange shadow-orange"
          >
            <Camera size={48} className="text-white" />
          </motion.div>
        </MotionItem>
        <MotionItem>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-s-dark-gray">Scan a Product</h1>
            <p className="mt-2 text-sm leading-relaxed text-s-dark-gray">
              Allow camera access to scan barcodes and check nutrition scores instantly.
            </p>
          </div>
        </MotionItem>

        {processingError && (
          <p role="alert" className="text-sm text-v-avoid">
            {processingError}
          </p>
        )}

        <MotionItem>
          <div className="flex w-full max-w-xs flex-col gap-3">
            <MotionPress>
              <Button size="lg" className="w-full" onClick={requestCamera}>
                Allow Camera Access
              </Button>
            </MotionPress>
            <MotionPress>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={handleManualEntry}
              >
                <Keyboard size={18} className="mr-2" />
                Enter Barcode Manually
              </Button>
            </MotionPress>
          </div>
        </MotionItem>
      </MotionPage>
    );
  }

  // ── Permission: denied ────────────────────────────────────────────────────
  if (permission === "denied") {
    return (
      <MotionPage className="flex min-h-[80vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <MotionItem>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-v-avoid/10">
            <ShieldOff size={40} className="text-v-avoid" />
          </div>
        </MotionItem>
        <MotionItem>
          <h1 className="font-[var(--font-heading)] text-xl font-bold text-s-dark-gray">Camera Access Denied</h1>
          <p className="mt-2 text-sm text-s-dark-gray">
            Please enable camera permission in your browser settings and reload the page.
          </p>
        </MotionItem>
        <MotionItem>
          <MotionPress>
            <Button variant="secondary" size="md" onClick={() => setPermission("prompt")}>
              Try Again
            </Button>
          </MotionPress>
        </MotionItem>
      </MotionPage>
    );
  }

  // ── Permission: unsupported ───────────────────────────────────────────────
  if (permission === "unsupported") {
    return (
      <MotionPage className="flex min-h-[80vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <MotionItem>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-v-caution/10">
            <AlertCircle size={40} className="text-v-caution" />
          </div>
        </MotionItem>
        <MotionItem>
          <h1 className="font-[var(--font-heading)] text-xl font-bold text-s-dark-gray">Camera Not Supported</h1>
          <p className="mt-2 text-sm text-s-dark-gray">
            Your browser does not support camera access. Try entering the barcode manually.
          </p>
        </MotionItem>
        <MotionItem>
          <MotionPress>
            <Button size="md" onClick={handleManualEntry}>
              Enter Manually
            </Button>
          </MotionPress>
        </MotionItem>
      </MotionPage>
    );
  }

  // ── Camera granted: live viewfinder ──────────────────────────────────────
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-black">
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover"
        aria-label="Camera viewfinder"
      />

      {/* ScanGuide overlay */}
      <ScanGuide
        isScanning={isScanning}
        flashEnabled={flashEnabled}
        onFlashToggle={handleFlashToggle}
        onManualEntry={handleManualEntry}
      />

      {/* Scan / loading button */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center gap-3 px-6">
        {processingError && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-[var(--r-lg)] bg-v-avoid/90 px-4 py-2 text-center text-sm text-white backdrop-blur-sm"
          >
            {processingError}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!isScanning ? (
            <motion.div
              key="scan-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={spring.gentle}
              className="w-full max-w-xs"
            >
              <MotionPress>
                <Button size="lg" onClick={startScan} className="w-full shadow-orange">
                  Scan Barcode
                </Button>
              </MotionPress>
            </motion.div>
          ) : (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={spring.gentle}
              className="flex items-center gap-2.5 rounded-full bg-black/60 px-6 py-3 text-sm font-medium text-white backdrop-blur-md"
            >
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Processing…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
