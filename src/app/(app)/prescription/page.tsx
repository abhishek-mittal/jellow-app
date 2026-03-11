"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadZone, type UploadStatus } from "@/components/prescription/upload-zone";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-screen flex-col bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-gray-900">Prescription Upload</h1>
        <p className="text-sm text-gray-500">
          Upload a photo to get personalised dietary advice
        </p>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 pb-28">
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
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center">
            <p className="text-sm font-medium text-orange-600">⚠️ {sizeError}</p>
          </div>
        )}

        {/* ── Processing banner ── */}
        {status === "processing" && (
          <div className="rounded-2xl bg-purple-50 p-4 text-center">
            <p className="text-sm font-medium text-[var(--candy-purple)]">
              🔍 Analyzing your prescription…
            </p>
          </div>
        )}

        {/* ── Error banner ── */}
        {status === "error" && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
            <p className="text-sm font-medium text-[var(--candy-pink)]">
              ⚠️ Could not process the image. Please try again with a clearer photo.
            </p>
          </div>
        )}

        {/* ── Results ── */}
        {status === "done" && medications.length > 0 && (
          <>
            {/* Extracted medications */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                📋 Extracted Medications
              </h2>
              <ul className="space-y-2">
                {medications.map((med) => (
                  <li
                    key={med.name}
                    className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {med.name} {med.dosage}
                      </span>
                      <span className="text-xs text-gray-400">
                        {med.frequency}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{med.purpose}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dietary recommendations */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                🥗 Dietary Recommendations
              </h2>
              <ul className="space-y-2">
                {DIETARY_RECOMMENDATIONS.map((rec, idx) => (
                  <li
                    key={idx}
                    className={cn("rounded-xl border p-3", {
                      "border-red-100 bg-red-50": rec.type === "warning",
                      "border-yellow-100 bg-yellow-50": rec.type === "caution",
                      "border-green-100 bg-green-50": rec.type === "tip",
                    })}
                  >
                    <div className="flex items-start gap-2">
                      <span aria-hidden="true">
                        {rec.type === "warning"
                          ? "⚠️"
                          : rec.type === "caution"
                            ? "🟡"
                            : "💡"}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          {rec.medication}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {rec.text}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-600">
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
              disabled={saved}
              aria-label={saved ? "Saved to profile" : "Save to profile"}
            >
              {saved ? "✓ Saved to Profile" : "Save to Profile"}
            </Button>

            {/* Privacy notice */}
            <p className="rounded-xl bg-gray-50 px-3 py-2.5 text-center text-xs text-gray-400">
              🔒 Your prescription data is handled securely and never sold or
              shared with third parties. Review our privacy policy for details.
            </p>
          </>
        )}

        {/* ── Empty-state hint ── */}
        {status === "idle" && (
          <p className="text-center text-sm text-gray-400">
            Tap the zone above to photograph or choose an image of your
            prescription
          </p>
        )}
      </div>
    </div>
  );
}
