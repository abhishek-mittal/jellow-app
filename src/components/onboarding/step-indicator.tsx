export interface StepIndicatorProps {
  /** Total number of steps */
  totalSteps: number;
  /** Zero-based index of the current active step */
  currentStep: number;
  /** Visual style: dot circles or numbered circles */
  variant?: "dots" | "numbered";
  /** Whether to render a connecting line between steps */
  showConnector?: boolean;
  /** Optional click handler — when provided, steps become clickable */
  onStepClick?: (step: number) => void;
}

/**
 * StepIndicator — pure progress-indicator atom.
 * Props in, JSX out, no side effects.
 */
export function StepIndicator({
  totalSteps,
  currentStep,
  variant = "dots",
  showConnector = false,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        const dotClasses =
          variant === "dots"
            ? isActive
              ? "h-3 w-3"
              : "h-2 w-2"
            : "h-8 w-8 text-xs font-bold";

        const colorClasses =
          variant === "dots"
            ? isActive
              ? "bg-[var(--jellow-yellow)]"
              : isCompleted
                ? "bg-[var(--jellow-yellow)] opacity-50"
                : "bg-[var(--gray-200)]"
            : isActive
              ? "bg-[var(--jellow-yellow)] text-[var(--gray-900)]"
              : isCompleted
                ? "bg-[var(--candy-mint)] text-white"
                : "border-2 border-[var(--gray-200)] bg-white text-[var(--gray-500)]";

        return (
          <div key={i} className="flex items-center">
            <button
              type="button"
              aria-label={`Step ${i + 1}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onStepClick?.(i)}
              disabled={!onStepClick}
              className={[
                "relative flex items-center justify-center rounded-full transition-all duration-300",
                dotClasses,
                colorClasses,
                onStepClick ? "cursor-pointer" : "pointer-events-none cursor-default",
              ].join(" ")}
            >
              {variant === "numbered" && <span>{i + 1}</span>}
            </button>

            {showConnector && i < totalSteps - 1 && (
              <div
                className={[
                  "h-0.5 w-8 transition-all duration-300",
                  isCompleted ? "bg-[var(--jellow-yellow)]" : "bg-[var(--gray-200)]",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
