---
name: ui-ux-patterns
description: "UI/UX design patterns, interaction design, UX laws, micro-interactions, accessibility, and animation patterns for mobile and web. Use when: applying UX laws (Fitts, Hick, Miller, Jakob), designing loading states, skeleton screens, empty states, error states, progressive disclosure, optimistic UI, pull-to-refresh, swipe actions, micro-interactions, Framer Motion animations, accessibility audits, WCAG compliance, color contrast, focus management, screen reader support, or designing user flows."
---

# UI/UX Design Patterns (Sandow UI Kit Edition)

**Core Sandow Design Philosophy**:
- Growth and persistence
- 100% Corner Smoothing (squircular radiuses on buttons, cards)
- Bulky, expansive UI elements prioritizing legibility and accessibility
- Typography: Work Sans (Alt: Archivo, Epilogue)
- Dynamic and energetic tone.

A comprehensive reference for interaction design, UX psychology, animation patterns, and accessibility — synthesized from leading open-source design systems and research.

## When to Use

- Choosing interaction patterns for a new feature
- Adding loading, empty, or error states
- Designing micro-interactions and motion
- Reviewing accessibility compliance (WCAG 2.2)
- Applying UX psychology principles
- Building skeleton screens, toasts, or transitions
- Designing for thumb-zone ergonomics

## Source Repositories (GitHub ★)

| Repo | Stars | Key Patterns |
|------|-------|-------------|
| shadcn-ui/ui | 85k+ | Composable components, accessibility-first |
| ant-design/ant-design | 95k+ | Enterprise UX patterns, 60+ components |
| chakra-ui/chakra-ui | 38k+ | Accessible component primitives |
| radix-ui/primitives | 17k+ | Headless accessible UI primitives |
| adobe/react-spectrum | 13k+ | React Aria — accessibility engine |
| framer/motion | 27k+ | Production animation library |
| motiondivision/motion | 10k+ | Lightweight animation (successor to Framer Motion) |
| formkit/auto-animate | 13k+ | Zero-config layout animations |
| gvergnaud/ts-pattern | 13k+ | Pattern matching for state design |
| adobe/leonardo | 2k+ | Adaptive color / contrast tool |
| dequelabs/axe-core | 6k+ | Accessibility testing engine |

## UX Laws & Principles

For detailed reference, see [UX Laws Reference](./references/ux-laws.md).

### Core Laws

| Law | Summary | Design Implication |
|-----|---------|-------------------|
| **Fitts's Law** | Time to target = f(distance, size) | Make primary CTAs large and within thumb reach |
| **Hick's Law** | Decision time increases with choices | Limit options; progressive disclosure |
| **Miller's Law** | Working memory ≈ 7 ± 2 items | Chunk content into groups of 3–5 |
| **Jakob's Law** | Users expect your site to work like others | Follow platform conventions |
| **Aesthetic-Usability** | Beautiful design is perceived as more usable | Polish visual details |
| **Doherty Threshold** | Productivity rises when response < 400ms | Optimistic UI, skeleton screens |
| **Von Restorff** | Distinctive items are remembered | Use contrast for CTAs |
| **Zeigarnik Effect** | Incomplete tasks are remembered better | Progress indicators, streaks |
| **Peak-End Rule** | Experiences judged by peak + end moments | Nail the scan result + reward moments |

### Applied to Jellow

- **Scan result** = peak moment → invest in animation, sound, haptic
- **Verdict screen** = end moment → clear, satisfying, shareable
- **Health score ring** = Von Restorff → distinctive visual anchor
- **Badge rewards** = Zeigarnik → incomplete collections drive return visits
- **Tab bar** = Jakob's Law → standard 5-tab mobile pattern
- **Ingredient list** = Miller's Law → chunk into categories, progressive disclosure

## Interaction Patterns

### Loading States

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| **Skeleton screen** | Initial data fetch | Gray shapes mimicking layout, shimmer animation |
| **Spinner** | Short action (< 2s) | Centered, with optional label |
| **Progress bar** | Known duration | Determinate with % or step indicator |
| **Optimistic UI** | User-initiated mutation | Show success immediately, revert on error |
| **Pull-to-refresh** | List/feed refresh | Custom indicator (Jellow: teal ring spinning) |
| **Stale-while-revalidate** | Cached data exists | Show cached, update silently |

#### Skeleton Screen Rules

```
1. Match the exact layout of real content
2. Use neutral gray (stone #E8E4DE for Jellow)
3. Animate: left-to-right shimmer, 1.5s loop, linear
4. Never show for < 200ms (flash prevention)
5. Stagger appearance: 50ms between items
```

### Empty States

| Scenario | Elements | Tone |
|----------|----------|------|
| First use | Illustration + headline + sub + CTA | Welcoming, instructional |
| No results | Icon + message + suggestion | Helpful, not blaming |
| Error | Icon + error message + retry button | Apologetic, actionable |
| Cleared list | Illustration + congratulation | Celebratory |

### Error States

| Type | Pattern | Feedback Duration |
|------|---------|------------------|
| Form validation | Inline error below field, red border | Persistent until fixed |
| Network error | Toast + retry button | 5s auto-dismiss + retry |
| Server error | Full-screen with retry | Persistent |
| Scan failure | Inline with re-scan CTA | Until next action |
| Permission denied | Explanation + settings link | Persistent |

### Toast / Snackbar

- Position: bottom center, above tab bar (16 dp above nav)
- Width: max-width 420px, min-width 280px
- Duration: 3–5s (auto-dismiss), actions extend to 10s
- Max: 1 toast visible at a time (queue others)
- Animation: slide-up 200ms ease-out, slide-down 150ms ease-in

### Swipe Actions

| Direction | Action | Color | Icon |
|-----------|--------|-------|------|
| Left | Delete/Remove | Red #C65D5D | Trash |
| Right | Archive/Favorite | Teal #5BBAB3 | Heart/Star |
| Full swipe | Confirm action | Solid fill | Checkmark |

- Threshold: 30% of row width triggers action
- Snap-back: spring animation if below threshold
- Haptic: light impact at threshold

### Progressive Disclosure

- Show essential info first, details on demand
- Patterns: expand/collapse, "Show more" link, drill-down navigation
- Accordion for related groups (max 7 items visible)
- Tooltip for inline explanations

## Micro-Interactions & Animation

For detailed Framer Motion patterns, see [Animation Reference](./references/animation-patterns.md).

### Categories

| Category | Examples | Duration |
|----------|----------|----------|
| **Feedback** | Button press, toggle, checkbox | 100–200ms |
| **State change** | Card flip, tab switch | 200–300ms |
| **Navigation** | Page transition, modal open | 250–400ms |
| **Attention** | Badge pulse, notification dot | 300–600ms (loop) |
| **Delight** | Confetti, celebration, score reveal | 500–1500ms |
| **System** | Loading spinner, progress | 1000–2000ms (loop) |

### Framer Motion Patterns for Jellow

```tsx
// Button press feedback
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.1 }}

// Card entrance (stagger children)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
/>

// Page transition
<AnimatePresence mode="wait">
  <motion.div
    key={page}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  />
</AnimatePresence>

// Health score ring reveal
<motion.circle
  initial={{ pathLength: 0 }}
  animate={{ pathLength: score / 100 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
/>

// Verdict badge entrance
<motion.div
  initial={{ scale: 0, rotate: -10 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: "spring", damping: 12, stiffness: 200 }}
/>

// Confetti (scan reward)
<motion.div
  initial={{ y: 0, opacity: 1 }}
  animate={{ y: -200, opacity: 0 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
/>
```

### Animation Timing Reference

| Easing | CSS | Use |
|--------|-----|-----|
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Elements moving |
| spring | `damping: 15, stiffness: 150` | Bouncy/playful |
| linear | `linear` | Continuous (shimmer, spin) |

### `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// Framer Motion
const prefersReducedMotion = useReducedMotion();
const animation = prefersReducedMotion
  ? { opacity: 1 }
  : { opacity: 1, y: 0 };
```

## Accessibility (WCAG 2.2 AA)

For detailed checklist, see [Accessibility Reference](./references/accessibility.md).

### Quick Checklist

| Category | Requirement | Standard |
|----------|-------------|----------|
| Color contrast | Text ≥ 4.5:1, large text ≥ 3:1 | WCAG 1.4.3 |
| UI contrast | Non-text UI ≥ 3:1 against adjacent | WCAG 1.4.11 |
| Touch target | ≥ 24×24 CSS px (AA), ≥ 44×44 recommended | WCAG 2.5.8 |
| Focus visible | Visible focus ring on all interactive elements | WCAG 2.4.7 |
| Focus order | Logical tab order matches visual order | WCAG 2.4.3 |
| Alt text | All informational images have alt text | WCAG 1.1.1 |
| Aria labels | Interactive elements have accessible names | WCAG 4.1.2 |
| Motion | Respect `prefers-reduced-motion` | WCAG 2.3.3 |
| Zoom | Content usable at 200% zoom | WCAG 1.4.4 |
| Dark mode | Maintain contrast ratios in dark mode | WCAG 1.4.3 |

### Jellow Contrast Check

| Combo | Ratio | Pass? |
|-------|-------|-------|
| Navy #1B2A4A on Cream #F5F2EC | 8.2:1 | ✅ AAA |
| Navy #1B2A4A on White #FAFAF7 | 9.1:1 | ✅ AAA |
| Teal #5BBAB3 on Navy #1B2A4A | 3.8:1 | ⚠️ AA Large only |
| Teal #5BBAB3 on White #FAFAF7 | 2.6:1 | ❌ Fail (decorative only) |
| Caution #E8B44D on Navy #1B2A4A | 4.6:1 | ✅ AA |
| Avoid #C65D5D on White #FAFAF7 | 3.2:1 | ⚠️ AA Large only |

**Actions:** Use teal only for large text (≥ 18pt) or with navy background. Add text labels alongside teal icons. Use darker teal variant for small text on light backgrounds.

### Keyboard Navigation

- All interactive elements focusable via Tab
- Custom components: use `role`, `aria-*` attributes
- Modals: trap focus, restore on close
- Skip-to-content link for screen readers
- Roving tabindex for composite widgets (tabs, toolbar)

### Screen Reader Patterns

```tsx
// Score announcement
<div role="img" aria-label={`Health score: ${score} out of 100. Verdict: ${verdict}`}>
  <HealthScoreRing score={score} />
</div>

// Live region for scan results
<div aria-live="polite" aria-atomic="true">
  {scanResult && `Product scanned: ${scanResult.name}. Health score: ${scanResult.score}.`}
</div>

// Navigation landmark
<nav aria-label="Main navigation">
  <BottomNav />
</nav>
```

## User Flow Patterns

### Onboarding

1. **Progressive**: 3–5 steps max, skip option always visible
2. **Contextual**: Show tips at point of use, not upfront
3. **Permission priming**: Explain why before requesting (camera, notifications)
4. **Quick win**: Get user to first value moment in < 60 seconds

### Scan Flow (Jellow-specific)

```
Camera → [Scanning animation] → Result card (swipe up for detail)
                                    ↓
                            Verdict screen → Save/Share
```

- Camera viewfinder: center guide, edge highlight on detect
- Scanning: pulse animation, "Analyzing..." text
- Result: slide-up card with score ring + verdict badge
- Verdict: full detail with ingredient list, nutrition panel

### Gamification (Rewards)

- **Streak counter**: Daily scan tracking, visible on home
- **Badges**: Locked → unlocked transition with celebration
- **Progress bar**: Toward next badge/level
- **Social proof**: "Join 10K users scanning healthier"

## Procedure

1. **Identify the user task** — What is the user trying to accomplish?
2. **Apply relevant UX laws** — Fitts's, Hick's, Miller's as appropriate
3. **Choose interaction pattern** — Loading, empty, error states
4. **Design the motion** — Use the timing/easing tables above
5. **Check accessibility** — Run through the WCAG checklist
6. **Validate contrast** — Use the Jellow contrast table
7. **Add screen reader support** — aria-labels, live regions, landmarks
8. **Test reduced motion** — Verify `prefers-reduced-motion` fallbacks
