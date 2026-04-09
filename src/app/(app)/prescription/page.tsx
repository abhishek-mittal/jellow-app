"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldAlert, Lightbulb, Search, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mock data                                                           */
/* ------------------------------------------------------------------ */

const MOCK_MEDICATIONS = [
  {
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    purpose: "Cholesterol management",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    purpose: "Blood sugar control",
  },
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    purpose: "Blood pressure management",
  },
] as const;

type Medication = (typeof MOCK_MEDICATIONS)[number];

const DIETARY_RECOMMENDATIONS = [
  {
    medication: "Atorvastatin",
    text: "Avoid grapefruit and grapefruit juice",
    detail:
      "Grapefruit can increase the amount of this medication in your bloodstream, raising the risk of side effects.",
    type: "warning" as const,
  },
  {
    medication: "Metformin",
    text: "Limit alcohol consumption",
    detail:
      "Alcohol combined with Metformin increases the risk of lactic acidosis.",
    type: "warning" as const,
  },
  {
    medication: "Metformin",
    text: "Take with meals",
    detail: "Taking Metformin with food reduces stomach upset.",
    type: "tip" as const,
  },
  {
    medication: "Lisinopril",
    text: "Limit high-potassium foods",
    detail:
      "Potassium-rich foods (bananas, oranges, spinach) may raise potassium levels when combined with Lisinopril.",
    type: "caution" as const,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Mock OCR simulation                                                 */
/* ------------------------------------------------------------------ */

async function mockProcessPrescription(): Promise<readonly Medication[]> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return MOCK_MEDICATIONS;
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

type PageStatus = "idle" | "uploading" | "processing" | "done" | "error";

export default function PrescriptionPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<PageStatus>("idle");
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [medications, setMedications] = useState<readonly Medication[]>([]);
  const [saved, setSaved] = useState(false);
  const [sizeError, setSizeError] = useState<string | undefined>(undefined);

  const handleFileSelect = async (file: File) => {
    setSizeError(undefined);
    // Revoke any previous object URL to avoid memory leaks
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return undefined;
    });

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setSaved(false);
    setMedications([]);
    setStatus("uploading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("processing");
      const results = await mockProcessPrescription();
      setMedications(results);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(undefined);
    setStatus("idle");
    setMedications([]);
    setSaved(false);
    setSizeError(undefined);
  };

  const handleSizeError = (fileSizeMB: number, maxSizeMB: number) => {
    setSizeError(
      `File is too large (${fileSizeMB} MB). Maximum allowed size is ${maxSizeMB} MB.`
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      e.target.value = "";
      handleSizeError(
        Math.round((file.size / (1024 * 1024)) * 10) / 10,
        maxSizeMB
      );
      return;
    }
    handleFileSelect(file);
    e.target.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col bg-s-gray">
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 bg-s-gray px-5 pt-[calc(env(safe-area-inset-top,24px)+12px)] pb-4">
        <h1 className="font-heading text-[28px] font-extrabold text-s-dark-gray">
          Upload Prescription
        </h1>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 pt-2 pb-28">
        {/* ── Idle: card-based upload ── */}
        {status === "idle" && (
          <>
            {/* Hero illustration */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-[var(--r-md)] bg-s-orange/10 text-[32px]">
                💊
              </div>
              <p className="text-center text-sm text-nav-inactive max-w-[260px] leading-relaxed">
                Take a photo of your prescription and we&apos;ll track your medications
              </p>
            </div>

            {/* Take Photo card */}
            <button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.setAttribute("capture", "environment");
                  inputRef.current.click();
                }
              }}
              className="flex w-full items-center gap-4 rounded-[var(--r-xl)] bg-surface-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--r-md)] bg-accent-blue/10 text-[22px]">
                📸
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-semibold text-s-dark-gray">Take Photo</p>
                <p className="text-[12px] text-nav-inactive mt-0.5">Use camera to capture prescription</p>
              </div>
              <ChevronRight size={18} className="text-nav-inactive" />
            </button>

            {/* From Gallery card */}
            <button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.removeAttribute("capture");
                  inputRef.current.click();
                }
              }}
              className="flex w-full items-center gap-4 rounded-[var(--r-xl)] bg-surface-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--r-md)] bg-s-orange/10 text-[22px]">
                🖼️
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-semibold text-s-dark-gray">From Gallery</p>
                <p className="text-[12px] text-nav-inactive mt-0.5">Select from your photo library</p>
              </div>
              <ChevronRight size={18} className="text-nav-inactive" />
            </button>

            {/* Hidden file input */}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleInputChange}
              aria-hidden="true"
              tabIndex={-1}
            />

            {/* Tips section */}
            <section className="rounded-[var(--r-xl)] bg-surface-card p-4 shadow-sm">
              <h3 className="text-[14px] font-semibold text-s-dark-gray mb-2 flex items-center gap-1.5">
                🪄 Tips for a clear scan
              </h3>
              <ul className="space-y-1.5 text-[13px] text-nav-inactive">
                <li>• Make sure prescription is flat and well-lit</li>
                <li>• Include all medication names visible</li>
                <li>• Avoid shadows and glare</li>
              </ul>
            </section>

            {/* Encryption badge */}
            <div className="flex items-center justify-center gap-2 rounded-[var(--r-xl)] bg-surface-card py-3 px-4 shadow-sm">
              <span className="text-[16px]">🔒</span>
              <p className="text-[13px] font-medium text-nav-inactive">
                Your data is encrypted and secure
              </p>
            </div>
          </>
        )}

        {/* ── Results ── */}
        {status === "done" && medications.length > 0 && (
          <>
            {/* Extracted medications */}
            <section>
              <h2 className="mb-3 font-heading text-base font-semibold text-s-dark-gray">
                Extracted Medications
              </h2>
              <ul className="space-y-2">
                {medications.map((med) => (
                  <li
                    key={med.name}
                    className="rounded-[var(--r-xl)] bg-surface-card p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-s-dark-gray">
                        {med.name} {med.dosage}
                      </span>
                      <span className="text-xs text-s-dark-gray">
                        {med.frequency}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-s-dark-gray">{med.purpose}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dietary recommendations */}
            <section>
              <h2 className="mb-3 font-heading text-base font-semibold text-s-dark-gray">
                Dietary Recommendations
              </h2>
              <ul className="space-y-2">
                {DIETARY_RECOMMENDATIONS.map((rec, idx) => (
                  <li
                    key={idx}
                    className={cn("rounded-[var(--r-lg)] border p-3", {
                      "border-v-avoid bg-v-avoid-bg": rec.type === "warning",
                      "border-v-caution bg-v-caution-bg": rec.type === "caution",
                      "border-v-good bg-v-good-bg": rec.type === "tip",
                    })}
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5" aria-hidden="true">
                        {rec.type === "warning"
                          ? <ShieldAlert size={16} className="text-v-avoid" />
                          : rec.type === "caution"
                            ? <AlertTriangle size={16} className="text-v-caution" />
                            : <Lightbulb size={16} className="text-v-good" />}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-s-dark-gray">
                          {rec.medication}
                        </p>
                        <p className="text-sm font-semibold text-s-dark-gray">
                          {rec.text}
                        </p>
                        <p className="mt-0.5 text-xs text-s-dark-gray">
                          {rec.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Save to profile */}
            <Button
              className="w-full"
              size="lg"
              variant={saved ? "secondary" : "primary"}
              onClick={() => setSaved(true)}
              isDisabled={saved}
              aria-label={saved ? "Saved to profile" : "Save to profile"}
            >
              {saved ? "✓ Saved to Profile" : "Save to Profile"}
            </Button>

            {/* Privacy notice */}
            <p className="rounded-[var(--r-lg)] bg-surface-divider px-3 py-2.5 text-center text-xs text-s-dark-gray">
              Your prescription data is handled securely and never sold or
              shared with third parties. Review our privacy policy for details.
            </p>
          </>
        )}

        {/* ── Size error banner ── */}
        {sizeError && (
          <div className="rounded-[var(--r-lg)] border border-v-caution bg-v-caution-bg p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-v-caution">
              <AlertTriangle size={16} /> {sizeError}
            </p>
          </div>
        )}

        {/* ── Processing banner ── */}
        {status === "processing" && (
          <div className="rounded-[var(--r-lg)] bg-s-orange/20 p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-s-orange">
              <Search size={16} className="animate-pulse" /> Analyzing your prescription…
            </p>
          </div>
        )}

        {/* ── Error banner ── */}
        {status === "error" && (
          <div className="rounded-[var(--r-lg)] border border-v-avoid bg-v-avoid-bg p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-v-avoid">
              <AlertTriangle size={16} /> Could not process. Try a clearer photo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
