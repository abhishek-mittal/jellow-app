import type { ReactNode } from "react";

/**
 * Shared layout wrapper for all `/auth/*` routes.
 *
 * Intentionally minimal — no bottom navigation bar (that belongs to the
 * `(app)` layout only).  Each auth screen component (`AuthShell`) handles
 * its own safe-area insets and edge-to-edge background so this wrapper
 * simply passes children through inside a full-viewport container that
 * prevents any inherited padding from the root body.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white">
      {children}
    </div>
  );
}
