# Accessibility Patterns — WCAG 2.2 AA Reference

## Color & Contrast

### Minimum Ratios (WCAG 2.2 AA)

| Element | Minimum Ratio | Standard |
|---------|--------------|----------|
| Normal text (< 18pt) | 4.5:1 | 1.4.3 |
| Large text (≥ 18pt or ≥ 14pt bold) | 3:1 | 1.4.3 |
| Non-text UI components | 3:1 | 1.4.11 |
| Focus indicators | 3:1 against adjacent | 2.4.11 |
| Graphical objects | 3:1 | 1.4.11 |

### AAA Enhanced (Recommended for Jellow)

| Element | Minimum Ratio |
|---------|--------------|
| Normal text | 7:1 |
| Large text | 4.5:1 |

### Color-Independent Communication

Never use color alone to convey information:
- Add icons alongside color (✓ green check, ⚠ amber warning, ✕ red X)
- Use patterns, borders, or text labels
- Verdict badges: include text label ("Good", "Caution", "Avoid") not just color

## Focus Management

### Focus Ring Styles

```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid #5BBAB3;
  outline-offset: 2px;
  border-radius: inherit;
}

/* Remove default + add custom */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Modal Focus Trap

```tsx
// 1. On open: save previously focused element
// 2. Move focus to first focusable child (or close button)
// 3. Trap Tab/Shift+Tab within modal
// 4. On close: restore focus to saved element
// 5. Close on Escape key

function useFocusTrap(ref: RefObject<HTMLElement>, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const el = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { /* close modal */ }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    el.addEventListener("keydown", handleKeyDown);
    return () => {
      el.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);
}
```

### Skip Navigation

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-navy text-white px-4 py-2 rounded">
  Skip to main content
</a>
```

## ARIA Patterns

### Landmarks

```tsx
<header role="banner">...</header>
<nav role="navigation" aria-label="Main navigation">...</nav>
<main role="main" id="main-content">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

### Live Regions

```tsx
// Polite announcement (waits for pause)
<div aria-live="polite" aria-atomic="true">
  {message}
</div>

// Assertive (interrupts current speech)
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>

// Status (polite + role=status)
<div role="status" aria-live="polite">
  Scanned 3 of 5 items
</div>
```

### Common Widget Patterns

**Tabs:**
```tsx
<div role="tablist" aria-label="Product details">
  <button role="tab" aria-selected={active === 0} aria-controls="panel-0" id="tab-0">
    Ingredients
  </button>
  <button role="tab" aria-selected={active === 1} aria-controls="panel-1" id="tab-1">
    Nutrition
  </button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0" tabIndex={0}>
  {/* content */}
</div>
```

**Accordion:**
```tsx
<h3>
  <button
    aria-expanded={isOpen}
    aria-controls="section-1"
    id="header-1"
  >
    Additives & Preservatives
  </button>
</h3>
<div
  id="section-1"
  role="region"
  aria-labelledby="header-1"
  hidden={!isOpen}
>
  {/* content */}
</div>
```

**Badge/Notification:**
```tsx
<button aria-label="Rewards, 3 new badges">
  <RewardsIcon />
  <span aria-hidden="true" className="badge">3</span>
</button>
```

**Progress (Score Ring):**
```tsx
<div
  role="progressbar"
  aria-valuenow={score}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Health score: ${score} out of 100`}
>
  <HealthScoreRing score={score} />
</div>
```

## Touch & Pointer

### Target Sizes

| Standard | Minimum | Recommended |
|----------|---------|-------------|
| WCAG 2.5.8 (AA) | 24×24 CSS px | 44×44 CSS px |
| WCAG 2.5.5 (AAA) | 44×44 CSS px | 48×48 CSS px |
| Apple HIG | 44×44 pt | — |
| Material 3 | 48×48 dp | — |

### Spacing Between Targets

- Minimum 8px between adjacent interactive elements
- Inline targets (text links): ensure adequate padding
- List items: full-row tappable, not just text

## Screen Reader Testing Checklist

| Check | Tool |
|-------|------|
| Heading hierarchy (h1→h6) | VoiceOver rotor / TalkBack headings |
| All images have alt text | axe-core audit |
| Form labels associated | Label `htmlFor` matches input `id` |
| Error messages announced | aria-live region test |
| Modal focus trapping | Tab through with keyboard |
| Dynamic content updates | aria-live region |
| Skip link works | Tab from page load |
| Color not sole indicator | Grayscale test |

## Automated Testing

### axe-core Integration

```tsx
// vitest + @axe-core/react
import { axe } from 'jest-axe';

test('component has no a11y violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Lighthouse CI

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// React hook
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Framer Motion
import { useReducedMotion } from "framer-motion";
const shouldReduceMotion = useReducedMotion();
```
