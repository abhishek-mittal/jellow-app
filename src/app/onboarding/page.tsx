"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { Leaf, Check, CheckCircle2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DietaryPreference = "omnivore" | "vegetarian" | "vegan" | "pescatarian";
type Allergy = "nuts" | "dairy" | "gluten" | "eggs" | "soy" | "shellfish";
type HealthGoal =
  | "weight_loss"
  | "muscle_gain"
  | "heart_health"
  | "diabetes_care"
  | "general_wellness";

interface OnboardingState {
  dietaryPreference: DietaryPreference | null;
  allergies: Set<Allergy>;
  goals: Set<HealthGoal>;
}

// ─── Option lists ─────────────────────────────────────────────────────────────

const DIETARY_OPTIONS: { value: DietaryPreference; label: string }[] = [
  { value: "omnivore", label: "Omnivore" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescatarian" },
];

const ALLERGY_OPTIONS: { value: Allergy; label: string }[] = [
  { value: "nuts", label: "Nuts" },
  { value: "dairy", label: "Dairy" },
  { value: "gluten", label: "Gluten" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "shellfish", label: "Shellfish" },
];

const GOAL_OPTIONS: { value: HealthGoal; label: string }[] = [
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "heart_health", label: "Heart Health" },
  { value: "diabetes_care", label: "Diabetes Care" },
  { value: "general_wellness", label: "General Wellness" },
];

// Steps: 0=Welcome, 1=Dietary, 2=Allergies, 3=Goals, 4=GetStarted
const TOTAL_STEPS = 5;
// The inner preference steps shown in the StepIndicator (steps 1–3)
const PREFERENCE_STEPS = TOTAL_STEPS - 2; // 3

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    dietaryPreference: null,
    allergies: new Set(),
    goals: new Set(),
  });

  const navigateToStep = useCallback((newStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsTransitioning(false);
    }, 200);
  }, []);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) navigateToStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) navigateToStep(currentStep - 1);
  };

  const handleSkip = () => navigateToStep(TOTAL_STEPS - 1);

  const handleComplete = () => {
    localStorage.setItem(
      "jellow_preferences",
      JSON.stringify({
        dietaryPreference: state.dietaryPreference,
        allergies: Array.from(state.allergies),
        goals: Array.from(state.goals),
        onboardingComplete: true,
      }),
    );
    router.push("/home");
  };

  const toggleAllergy = (allergy: Allergy) => {
    setState((prev) => {
      const next = new Set(prev.allergies);
      if (next.has(allergy)) next.delete(allergy);
      else next.add(allergy);
      return { ...prev, allergies: next };
    });
  };

  const toggleGoal = (goal: HealthGoal) => {
    setState((prev) => {
      const next = new Set(prev.goals);
      if (next.has(goal)) next.delete(goal);
      else next.add(goal);
      return { ...prev, goals: next };
    });
  };

  // Preference steps are 1, 2, 3 → indicator index 0, 1, 2
  const indicatorStep = currentStep > 0 && currentStep < TOTAL_STEPS - 1 ? currentStep - 1 : null;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} onSkip={handleSkip} />;
      case 1:
        return (
          <DietaryStep
            selected={state.dietaryPreference}
            onSelect={(v) => setState((p) => ({ ...p, dietaryPreference: v }))}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <AllergiesStep
            selected={state.allergies}
            onToggle={toggleAllergy}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <GoalsStep selected={state.goals} onToggle={toggleGoal} onNext={handleNext} />
        );
      case 4:
        return <GetStartedStep onComplete={handleComplete} state={state} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-j-cream">
      {/* Top bar — shown for preference steps */}
      {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && (
        <div className="flex items-center justify-between px-6 pt-12">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium text-j-navy-soft"
          >
            ← Back
          </button>

          <StepIndicator
            totalSteps={PREFERENCE_STEPS}
            currentStep={indicatorStep ?? 0}
            variant="dots"
            showConnector
          />

          <button
            type="button"
            onClick={handleSkip}
            className="text-sm font-medium text-j-navy-soft"
          >
            Skip
          </button>
        </div>
      )}

      {/* Step content with fade transition */}
      <div
        className="flex flex-1 flex-col transition-opacity duration-200"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {renderStep()}
      </div>
    </div>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function WelcomeStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-j-teal-soft" aria-hidden>
        <Leaf size={40} className="text-j-teal" />
      </div>

      <h1 className="mb-2 font-[var(--font-heading)] text-4xl font-bold text-j-navy">
        Jellow
      </h1>
      <p className="mb-3 text-lg font-semibold text-j-teal">
        Know your food
      </p>
      <p className="mb-12 max-w-xs text-sm leading-relaxed text-j-navy-soft">
        Scan products, discover what&apos;s inside, and make smarter choices with your
        health companion.
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Button size="lg" className="w-full" onClick={onNext}>
          Get Started
        </Button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-2 text-sm font-medium text-j-navy-soft"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}

function DietaryStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: DietaryPreference | null;
  onSelect: (v: DietaryPreference) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col p-6 pt-8">
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-j-navy">
        What&apos;s your diet?
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-j-navy-soft">
        We&apos;ll personalize your food scores based on your preferences.
      </p>

      <div className="space-y-3">
        {DIETARY_OPTIONS.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`flex w-full items-center gap-4 rounded-[var(--r-lg)] border p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-j-teal bg-j-teal-soft/30"
                  : "border-j-stone bg-j-warm-white"
              }`}
            >
              <span className="font-semibold text-j-navy">
                {opt.label}
              </span>
              {isActive && (
                <Check size={18} className="ml-auto text-j-teal" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Button size="lg" className="w-full" onClick={onNext} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}

function AllergiesStep({
  selected,
  onToggle,
  onNext,
}: {
  selected: Set<Allergy>;
  onToggle: (a: Allergy) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col p-6 pt-8">
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-j-navy">
        Any allergies?
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-j-navy-soft">
        Select all that apply — we&apos;ll always flag allergens in your scans.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {ALLERGY_OPTIONS.map((opt) => {
          const isActive = selected.has(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`flex items-center gap-3 rounded-[var(--r-lg)] border p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-j-teal bg-j-teal-soft/30"
                  : "border-j-stone bg-j-warm-white"
              }`}
            >
              <span className="text-sm font-semibold text-j-navy">
                {opt.label}
              </span>
              {isActive && (
                <Check size={16} className="ml-auto text-j-teal" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Button size="lg" className="w-full" onClick={onNext}>
          {selected.size === 0 ? "No allergies" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function GoalsStep({
  selected,
  onToggle,
  onNext,
}: {
  selected: Set<HealthGoal>;
  onToggle: (g: HealthGoal) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col p-6 pt-8">
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-j-navy">
        Your health goals
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-j-navy-soft">
        Choose what matters most to you right now.
      </p>

      <div className="space-y-3">
        {GOAL_OPTIONS.map((opt) => {
          const isActive = selected.has(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`flex w-full items-center gap-4 rounded-[var(--r-lg)] border p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-j-teal bg-j-teal-soft/30"
                  : "border-j-stone bg-j-warm-white"
              }`}
            >
              <span className="font-semibold text-j-navy">
                {opt.label}
              </span>
              {isActive && (
                <Check size={18} className="ml-auto text-j-teal" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Button size="lg" className="w-full" onClick={onNext}>
          {selected.size === 0 ? "Skip for now" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function GetStartedStep({
  onComplete,
  state,
}: {
  onComplete: () => void;
  state: OnboardingState;
}) {
  const hasPreferences =
    state.dietaryPreference !== null ||
    state.allergies.size > 0 ||
    state.goals.size > 0;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-j-teal-soft" aria-hidden>
        <CheckCircle2 size={40} className="text-j-teal" />
      </div>
      <h2 className="mb-3 font-[var(--font-heading)] text-3xl font-bold text-j-navy">
        You&apos;re all set!
      </h2>
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-j-navy-soft">
        Jellow is ready to help you make smarter food choices. Time to start scanning!
      </p>

      {/* Preferences summary */}
      {hasPreferences && (
        <div className="mb-8 w-full max-w-xs rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-5 text-left">
          {state.dietaryPreference && (
            <p className="mb-2 text-sm">
              <span className="text-j-navy-soft">Diet: </span>
              <span className="font-semibold capitalize text-j-navy">
                {state.dietaryPreference}
              </span>
            </p>
          )}
          {state.allergies.size > 0 && (
            <p className="mb-2 text-sm">
              <span className="text-j-navy-soft">Allergies: </span>
              <span className="font-semibold capitalize text-j-navy">
                {Array.from(state.allergies).join(", ")}
              </span>
            </p>
          )}
          {state.goals.size > 0 && (
            <p className="text-sm">
              <span className="text-j-navy-soft">Goals: </span>
              <span className="font-semibold text-j-navy">
                {Array.from(state.goals)
                  .map((g) => g.replace(/_/g, " "))
                  .join(", ")}
              </span>
            </p>
          )}
        </div>
      )}

      <Button size="lg" className="w-full max-w-xs" onClick={onComplete}>
        Start Scanning
      </Button>
    </div>
  );
}
