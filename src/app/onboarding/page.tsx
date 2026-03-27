"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { Leaf, Check, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { spring, MotionPress } from "@/components/motion";

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<OnboardingState>({
    dietaryPreference: null,
    allergies: new Set(),
    goals: new Set(),
  });

  const navigateToStep = useCallback(
    (newStep: number) => {
      setDirection(newStep > currentStep ? 1 : -1);
      setCurrentStep(newStep);
    },
    [currentStep],
  );

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
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-s-gray">
      {/* Top bar — shown for preference steps */}
      {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-6 pt-12"
        >
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 text-sm font-medium text-s-dark-gray"
          >
            <ArrowLeft size={16} /> Back
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
            className="text-sm font-medium text-s-orange"
          >
            Skip
          </button>
        </motion.div>
      )}

      {/* Step content with AnimatePresence slide transition */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring.snappy}
          className="flex flex-1 flex-col"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function WelcomeStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      {/* Decorative gradient background element */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-s-orange/20/40 to-transparent" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={spring.bouncy}
        className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-s-orange to-s-orange shadow-orange"
        aria-hidden
      >
        <Leaf size={44} className="text-white" />
        <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 shadow-md">
          <Sparkles size={16} className="text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...spring.gentle }}
        className="mb-2 font-[var(--font-heading)] text-4xl font-bold text-s-dark-gray"
      >
        Jellow
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...spring.gentle }}
        className="mb-3 text-lg font-semibold text-s-orange"
      >
        Know your food
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12 max-w-xs text-sm leading-relaxed text-s-dark-gray"
      >
        Scan products, discover what&apos;s inside, and make smarter choices with your
        health companion.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ...spring.gentle }}
        className="w-full max-w-xs space-y-3"
      >
        <MotionPress>
          <Button size="lg" className="w-full" onClick={onNext}>
            Get Started
          </Button>
        </MotionPress>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-2 text-sm font-medium text-s-dark-gray"
        >
          Skip onboarding
        </button>
      </motion.div>
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
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-s-dark-gray">
        What&apos;s your diet?
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-s-dark-gray">
        We&apos;ll personalize your food scores based on your preferences.
      </p>

      <div className="space-y-3">
        {DIETARY_OPTIONS.map((opt, i) => {
          const isActive = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, ...spring.gentle }}
              type="button"
              onClick={() => onSelect(opt.value)}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center gap-4 rounded-[var(--r-xl)] border-2 p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-s-orange bg-s-orange/20/40 shadow-orange-sm"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="font-semibold text-s-dark-gray">
                {opt.label}
              </span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={spring.bouncy}
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-s-orange"
                >
                  <Check size={14} className="text-white" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Button size="lg" className="w-full" onClick={onNext} isDisabled={!selected}>
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
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-s-dark-gray">
        Any allergies?
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-s-dark-gray">
        Select all that apply — we&apos;ll always flag allergens in your scans.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {ALLERGY_OPTIONS.map((opt, i) => {
          const isActive = selected.has(opt.value);
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, ...spring.gentle }}
              type="button"
              onClick={() => onToggle(opt.value)}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 rounded-[var(--r-xl)] border-2 p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-s-orange bg-s-orange/20/40 shadow-orange-sm"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-sm font-semibold text-s-dark-gray">
                {opt.label}
              </span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={spring.bouncy}
                  className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-s-orange"
                >
                  <Check size={12} className="text-white" />
                </motion.span>
              )}
            </motion.button>
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
      <h2 className="mb-2 font-[var(--font-heading)] text-2xl font-semibold text-s-dark-gray">
        Your health goals
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-s-dark-gray">
        Choose what matters most to you right now.
      </p>

      <div className="space-y-3">
        {GOAL_OPTIONS.map((opt, i) => {
          const isActive = selected.has(opt.value);
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, ...spring.gentle }}
              type="button"
              onClick={() => onToggle(opt.value)}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center gap-4 rounded-[var(--r-xl)] border-2 p-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-s-orange bg-s-orange/20/40 shadow-orange-sm"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="font-semibold text-s-dark-gray">
                {opt.label}
              </span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={spring.bouncy}
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-s-orange"
                >
                  <Check size={14} className="text-white" />
                </motion.span>
              )}
            </motion.button>
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={spring.bouncy}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-s-orange to-s-orange shadow-orange"
        aria-hidden
      >
        <CheckCircle2 size={48} className="text-white" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...spring.gentle }}
        className="mb-3 font-[var(--font-heading)] text-3xl font-bold text-s-dark-gray"
      >
        You&apos;re all set!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 max-w-xs text-sm leading-relaxed text-s-dark-gray"
      >
        Jellow is ready to help you make smarter food choices. Time to start scanning!
      </motion.p>

      {/* Preferences summary */}
      {hasPreferences && (
        <div className="mb-8 w-full max-w-xs rounded-[var(--r-lg)] border border-gray-200 bg-white p-5 text-left">
          {state.dietaryPreference && (
            <p className="mb-2 text-sm">
              <span className="text-s-dark-gray">Diet: </span>
              <span className="font-semibold capitalize text-s-dark-gray">
                {state.dietaryPreference}
              </span>
            </p>
          )}
          {state.allergies.size > 0 && (
            <p className="mb-2 text-sm">
              <span className="text-s-dark-gray">Allergies: </span>
              <span className="font-semibold capitalize text-s-dark-gray">
                {Array.from(state.allergies).join(", ")}
              </span>
            </p>
          )}
          {state.goals.size > 0 && (
            <p className="text-sm">
              <span className="text-s-dark-gray">Goals: </span>
              <span className="font-semibold text-s-dark-gray">
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
