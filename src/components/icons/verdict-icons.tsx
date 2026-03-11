/**
 * Geometric verdict icons — Bauhaus-inspired shapes.
 * Good = circle + check, Caution = triangle + dot, Avoid = diamond + ×
 */

interface VerdictIconProps {
  size?: number;
  className?: string;
}

export function VerdictGoodIcon({ size = 20, className }: VerdictIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M6.5 10.5L8.5 12.5L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function VerdictCautionIcon({ size = 20, className }: VerdictIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2L18.66 17H1.34L10 2Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M10 2L18.66 17H1.34L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
        fill="none"
      />
      <circle cx="10" cy="13" r="1.2" fill="currentColor" />
      <line x1="10" y1="7" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function VerdictAvoidIcon({ size = 20, className }: VerdictIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="10"
        y="1.5"
        width="12"
        height="12"
        rx="0"
        transform="rotate(45 10 1.5)"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="10"
        y="1.5"
        width="12"
        height="12"
        rx="0"
        transform="rotate(45 10 1.5)"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
