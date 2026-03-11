export interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  variant?: "dots" | "numbered";
  showConnector?: boolean;
  onStepClick?: (step: number) => void;
}

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
              ? "h-2 w-2"
              : "h-2 w-2"
            : "h-8 w-8 text-xs font-bold";

        const colorClasses =
          variant === "dots"
            ? isActive
              ? "bg-j-teal"
              : isCompleted
                ? "bg-j-teal/60"
                : "bg-j-stone"
            : isActive
              ? "bg-j-teal text-white"
              : isCompleted
                ? "bg-j-teal/60 text-white"
                : "border-2 border-j-stone bg-transparent text-j-navy-soft";

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
                  isCompleted ? "bg-j-teal" : "bg-j-stone",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
