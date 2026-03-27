---
name: mobile-native-design
description: "Mobile-native UI/UX design patterns for iOS, Android, and PWA. Use when: designing mobile screens, implementing iOS HIG or Material Design 3 patterns, adding gestures, safe areas, bottom sheets, navigation patterns, haptic feedback, touch targets, adaptive layouts, pull-to-refresh, swipe actions, mobile typography scales, dark mode, or building mobile-first PWA interfaces."
---

# Mobile-Native Design Patterns

Expert knowledge for designing mobile-first, platform-authentic interfaces — synthesized from Apple HIG, Material Design 3, and high-star open-source mobile UI libraries.

## When to Use

- Designing or reviewing mobile screen layouts
- Implementing iOS or Android platform conventions
- Building PWA interfaces that feel native
- Adding gestures, haptics, or mobile navigation
- Reviewing touch target sizes, safe areas, spacing
- Building bottom sheets, modals, or action sheets
- Implementing pull-to-refresh, swipe-to-delete
- Adapting layouts for foldables, tablets, or landscape

## Source Libraries (GitHub ★)

| Library | Stars | Focus | Key Patterns |
|---------|-------|-------|-------------|
| flutter/flutter | 175k+ | Cross-platform framework | Material 3, Cupertino, adaptive layouts |
| facebook/react-native | 125k+ | Native bridge framework | Platform-specific components, Fabric |
| expo/expo | 48k+ | Universal RN toolchain | Expo Router, NativeWind, universal APIs |
| tamagui/tamagui | 12k+ | Universal UI + compiler | Optimizing compiler, cross-platform tokens |
| gluestack/gluestack-ui | 4k+ | Universal component lib | NativeWind v4, unstyled + accessible |
| callstack/react-native-paper | 13k+ | Material Design for RN | Full MD3 implementation |
| akveo/react-native-ui-kitten | 10k+ | Eva Design System for RN | Theming, 20+ components |
| wix/react-native-ui-lib | 6k+ | Production components | Drawer, Scanner, 20+ components |
| software-mansion/react-native-gesture-handler | 6k+ | Gesture system | Pan, pinch, rotation, fling gestures |
| software-mansion/react-native-reanimated | 9k+ | Animation engine | Shared transitions, layout animations |
| gorhom/react-native-bottom-sheet | 7k+ | Bottom sheet | Snap points, gestures, keyboard |
| android/compose-samples | 23k+ | Jetpack Compose examples | Modern Android UI patterns |
| android/nowinandroid | 20k+ | Full Compose app | Production architecture reference |

## Platform Design Guidelines

### iOS Human Interface Guidelines (HIG)

For details, see [iOS HIG Reference](./references/ios-hig.md).

**Core principles:** Clarity, Deference, Depth.

| Spec | Value |
|------|-------|
| Minimum touch target | 44×44 pt |
| Status bar height | 54 pt (Dynamic Island), 47 pt (notch), 20 pt (legacy) |
| Navigation bar | 44 pt standard, 96 pt large title |
| Tab bar height | 49 pt (compact: 32 pt) |
| Home indicator inset | 34 pt bottom |
| Safe area bottom | 34 pt (devices with home indicator) |
| Corner radius (system) | 39 pt (continuous/squircle) |
| Standard margins | 16 pt (compact), 20 pt (regular) |

**Typography scale (SF Pro / system):**

| Style | Size | Weight | Leading |
|-------|------|--------|---------|
| Large Title | 34 pt | Regular | 41 pt |
| Title 1 | 28 pt | Regular | 34 pt |
| Title 2 | 22 pt | Regular | 28 pt |
| Title 3 | 20 pt | Regular | 25 pt |
| Headline | 17 pt | Semi-Bold | 22 pt |
| Body | 17 pt | Regular | 22 pt |
| Callout | 16 pt | Regular | 21 pt |
| Subheadline | 15 pt | Regular | 20 pt |
| Footnote | 13 pt | Regular | 18 pt |
| Caption 1 | 12 pt | Regular | 16 pt |
| Caption 2 | 11 pt | Regular | 13 pt |

### Material Design 3 (M3)

For details, see [Material Design 3 Reference](./references/material-design-3.md).

**Core principles:** Adaptive, Personal, Expressive.

| Spec | Value |
|------|-------|
| Minimum touch target | 48×48 dp |
| Top app bar | 64 dp standard, 152 dp large |
| Navigation bar height | 80 dp |
| FAB size | 56 dp standard, 96 dp large, 40 dp small |
| Corner shapes | None 0, Extra-small 4dp, Small 8dp, Medium 12dp, Large 16dp, Extra-large 28dp, Full 50% |
| Standard margin | 16 dp |
| Icon size (nav) | 24 dp |

**Typography scale (Roboto / system):**

| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| Display Large | 57 sp | Regular | -0.25 |
| Display Medium | 45 sp | Regular | 0 |
| Display Small | 36 sp | Regular | 0 |
| Headline Large | 32 sp | Regular | 0 |
| Headline Medium | 28 sp | Regular | 0 |
| Headline Small | 24 sp | Regular | 0 |
| Title Large | 22 sp | Regular | 0 |
| Title Medium | 16 sp | Medium | 0.15 |
| Title Small | 14 sp | Medium | 0.1 |
| Body Large | 16 sp | Regular | 0.5 |
| Body Medium | 14 sp | Regular | 0.25 |
| Body Small | 12 sp | Regular | 0.4 |
| Label Large | 14 sp | Medium | 0.1 |
| Label Medium | 12 sp | Medium | 0.5 |
| Label Small | 11 sp | Medium | 0.5 |

## Mobile Navigation Patterns

### Tab Bar (iOS) / Navigation Bar (M3)

- 3–5 tabs maximum
- Always show labels (not icons-only)
- Active state: filled icon + teal, inactive: outlined icon + muted
- Badge indicators for notifications
- Tab bar persists across all main screens

### Stack Navigation

- Push/pop with horizontal slide (iOS) or shared-element transitions (M3)
- Back button always visible; swipe-from-edge to go back (iOS)
- Large title collapses to inline on scroll (iOS)

### Bottom Sheet

- Snap points: collapsed (peek), half, full
- Drag handle: 32×4 dp, centered, 8 dp from top
- Background dimming at 32% opacity scrim
- Velocity-based dismiss (flick down)
- Keyboard avoidance: sheet rises above keyboard

### Modal / Dialog

- iOS: Sheet presentation (pageSheet), detents at medium/large
- M3: Center dialog with scrim, max-width 560 dp
- Always provide dismiss affordance (X button or swipe-down)

## Gesture Patterns

| Gesture | Use Case | Implementation |
|---------|----------|----------------|
| Tap | Primary action | 44 pt min target (iOS), 48 dp (M3) |
| Long press | Context menu | 500ms delay, haptic feedback |
| Swipe horizontal | Delete/archive actions, page navigation | Destructive = red, archive = blue/green |
| Swipe down | Dismiss modal/sheet, pull-to-refresh | Rubber-band physics at boundary |
| Pinch | Zoom content | Min/max scale bounds, double-tap to reset |
| Pan | Drag-to-reorder, move items | Haptic on pickup, ghost/shadow preview |
| Edge swipe | Navigate back (iOS) | Right-to-left: 20 pt hitbox from left edge |

## Mobile Animation Principles

Based on patterns from react-native-reanimated (9k★) and Framer Motion:

| Pattern | Duration | Easing | Use |
|---------|----------|--------|-----|
| Micro-feedback | 100–200ms | ease-out | Button press, toggle, check |
| Page transition | 250–350ms | ease-in-out | Screen navigation |
| Bottom sheet | 300–400ms | spring (damping 15) | Open/close sheet |
| Pull-to-refresh | 200–300ms | ease-out | Refresh indicator |
| Shared element | 300–500ms | spring (damping 20) | Hero transitions |
| Skeleton shimmer | 1500ms | linear (loop) | Loading placeholders |
| Entrance stagger | 50ms per item | ease-out | List item appearance |

**Spring physics defaults:**
- `damping: 15, stiffness: 150` — snappy (buttons, toggles)
- `damping: 20, stiffness: 120` — smooth (sheets, modals)
- `damping: 25, stiffness: 90` — gentle (page transitions)

## PWA Mobile-Native Patterns

For Jellow and similar PWAs targeting mobile:

### Viewport & Safe Areas

```css
/* Full-screen PWA with safe area support */
:root {
  --sat: env(safe-area-inset-top);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
  --sar: env(safe-area-inset-right);
}

/* Apply to fixed elements */
.bottom-nav {
  padding-bottom: calc(8px + var(--sab));
}

.top-bar {
  padding-top: calc(12px + var(--sat));
}
```

### manifest.json for PWA

```json
{
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#5BBAB3",
  "background_color": "#F5F2EC"
}
```

### Touch Feedback

```css
/* Native-feel tap feedback */
.tappable {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}

.tappable:active {
  transform: scale(0.97);
  opacity: 0.8;
  transition: transform 100ms ease-out, opacity 100ms ease-out;
}
```

### Pull-to-Refresh (CSS + JS pattern)

```tsx
// Overscroll indicator
const [pulling, setPulling] = useState(false);
const [pullDistance, setPullDistance] = useState(0);

// Track touchmove when at scroll top
// Threshold: 80px pull triggers refresh
// Visual: spinner rotates proportional to pull distance
```

## Adaptive Layout Breakpoints

For responsive mobile-first design:

| Breakpoint | Target | Layout Strategy |
|-----------|--------|-----------------|
| < 375px | Small phones (SE) | Single column, compact spacing |
| 375–428px | Standard phones | Default mobile layout |
| 428–768px | Large phones / small tablets | Wider margins, optional 2-col |
| 768–1024px | Tablets (portrait) | 2-column master-detail |
| > 1024px | Tablets (landscape) / desktop | Sidebar + content area |

## Procedure

1. **Identify platform context** — Is this iOS-first, Android-first, or PWA?
2. **Apply platform specs** — Use the correct touch targets, typography scale, spacing
3. **Choose navigation pattern** — Tab bar, stack, modal, or bottom sheet
4. **Design for gestures** — Swipe actions, pull-to-refresh, edge-back
5. **Add safe area handling** — `env(safe-area-inset-*)` for fixed elements
6. **Implement animations** — Use the duration/easing table above
7. **Test adaptive layout** — Check breakpoints from 320px to 1024px
8. **Verify accessibility** — Touch targets ≥ 44pt, contrast ≥ 4.5:1, VoiceOver/TalkBack labels
