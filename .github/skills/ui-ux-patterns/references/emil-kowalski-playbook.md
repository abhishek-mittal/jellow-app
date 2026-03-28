# Emil Kowalski Playbook — Practical Notes

A distilled reference from Emil Kowalski's public writing and components (`Sonner`, `Vaul`, motion essays). Use this as a tactical checklist while implementing product motion.

## Core Principles

1. Purpose first: animation should explain, confirm, or orient users.
2. Frequency-aware motion: repeated interactions need less animation.
3. Fast by default: most UI motion should finish in under `300ms`.
4. Detail compounds: small, almost invisible refinements improve perceived quality.

## Decision Framework

### 1) Should this animate?

- Yes, if it improves comprehension (state changes, origin continuity, feedback).
- Maybe, if it is occasional and can create a memorable moment.
- No, if it is high-frequency (keyboard navigation, repetitive power workflows).

### 2) How fast should it be?

- Press feedback: `80ms`-`120ms`
- Standard UI transition: `120ms`-`220ms`
- Complex container transition: `180ms`-`280ms`
- Avoid exceeding `300ms` in core product interactions.

### 3) What motion style?

- Entering elements: strong `ease-out`
- In-place movement: `ease-in-out` or spring
- Direct manipulation (drag/swipe): spring or raw transform with momentum

## Implementation Patterns

### Press States

- Use subtle scaling (`0.97`) on press.
- Avoid aggressive shrink values that make controls feel unstable.

### Scale Entrances

- Never start from `scale(0)` for standard UI elements.
- Start around `0.93`-`0.97` for more natural appearance.

### Origin-Aware Popovers

- Animate from trigger origin, not element center.
- Use transform-origin variables from primitives (Radix/HeroUI patterns).

### Interruptible Motion

- Prefer transitions/springs for dynamic lists and stack UIs.
- Avoid keyframes for retargeted motion when item positions change mid-animation.

### Clip-Path as a High-Leverage Tool

- Use `clip-path` for reveal/mask transitions without layout shifts.
- Useful for tab text/color synchronization and before-after overlays.

### Gesture Fidelity

- Keep pointer capture while dragging past bounds.
- Dismiss gestures with distance-or-velocity logic.
- Add friction when dragging against expected direction.

### Timer Correctness

- Pause transient timers when document is hidden.
- Resume on visibility return to prevent missed feedback.

## Anti-Patterns

- Decorative animation in high-frequency controls.
- Long easing tails that feel delayed from user input.
- Hover-heavy choreography on mobile-first surfaces.
- Multiple simultaneous motions competing for attention.

## Jellow Mapping

- Keep scan/result and reward-unlock moments animated and expressive.
- Keep dashboard navigation, repeated filters, and keyboard flows snappy or static.
- Use clip-path and layout transitions only where they improve clarity, not for visual novelty alone.
- Respect `prefers-reduced-motion` with meaningful non-motion fallbacks.
