import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuthHeroProps = {
  /** URL of the background image to display inside the hero */
  imageSrc?: string;
  /** Accessible description of the background image */
  imageAlt?: string;
  /**
   * Node rendered at the bottom-center of the hero (e.g. a logo mark).
   * Positioned so it overlaps into the content area below.
   */
  logoMark?: ReactNode;
  /** Override hero height. Defaults to "300px". */
  height?: string;
  className?: string;
};

/**
 * Full-bleed hero banner for auth screens.
 * The hero extends behind the device status bar by applying
 * env(safe-area-inset-top) padding internally, which is why
 * AuthShell must be used with `withHero={true}` when this component
 * is the first child.
 */
export function AuthHero({
  imageSrc,
  imageAlt,
  logoMark,
  height = "300px",
  className,
}: AuthHeroProps) {
  return (
    <div
      className={cn(
        "relative w-full flex-shrink-0 overflow-visible bg-gradient-to-b from-gray-200 to-white",
        className
      )}
      style={{
        height,
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      {/* Background image */}
      {imageSrc && (
        <div
          className="absolute inset-0 bg-cover bg-top opacity-50 mix-blend-multiply"
          style={{ backgroundImage: `url(${imageSrc})` }}
          role="img"
          aria-label={imageAlt}
        />
      )}

      {/* Fade-to-white gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white"
        aria-hidden="true"
      />

      {/* Logo mark — centered, sits at the bottom edge */}
      {logoMark && (
        <div
          className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          {logoMark}
        </div>
      )}
    </div>
  );
}
