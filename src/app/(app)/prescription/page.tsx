"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadZone, type UploadStatus } from "@/components/prescription/upload-zone";
import { cn } from "@/lib/utils";
import { Search, AlertTriangle, ShieldAlert, Lightbulb } from "lucide-react";

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

  const uploadStatus: UploadStatus = status as UploadStatus;

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 border-b border-black/[0.04] bg-white/95 px-5 py-3 backdrop-blur-sm">
        <h1 className="font-[var(--font-heading)] text-xl font-semibold text-s-dark-gray">Prescription Upload</h1>
        <p className="text-sm text-s-dark-gray">
          Upload a photo to get personalised dietary advice
        </p>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 pt-4 pb-28">
        {/* ── Upload zone ── */}
        <UploadZone
          onFileSelect={handleFileSelect}
          onSizeError={handleSizeError}
          accept="image/*"
          maxSizeMB={10}
          preview={preview}
          status={uploadStatus}
          onRemove={handleRemove}
        />

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
              <AlertTriangle size={16} /> Could not process the image. Please try again with a clearer photo.
            </p>
          </div>
        )}

        {/* ── Results ── */}
        {status === "done" && medications.length > 0 && (
          <>
            {/* Extracted medications */}
            <section>
              <h2 className="mb-3 font-[var(--font-heading)] text-base font-semibold text-s-dark-gray">
                Extracted Medications
              </h2>
              <ul className="space-y-2">
                {medications.map((med) => (
                  <li
                    key={med.name}
                    className="rounded-[var(--r-lg)] bg-white p-3 shadow-md"
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
              <h2 className="mb-3 font-[var(--font-heading)] text-base font-semibold text-s-dark-gray">
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
            <p className="rounded-[var(--r-lg)] bg-gray-200/40 px-3 py-2.5 text-center text-xs text-s-dark-gray">
              Your prescription data is handled securely and never sold or
              shared with third parties. Review our privacy policy for details.
            </p>
          </>
        )}

        {/* ── Empty-state hint ── */}
        {status === "idle" && (
          <p className="text-center text-sm text-s-dark-gray">
            Tap the zone above to photograph or choose an image of your
            prescription
          </p>
        )}
      </div>
    </div>
  );
}
