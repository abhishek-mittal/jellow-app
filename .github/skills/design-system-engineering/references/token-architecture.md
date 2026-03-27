# Token Architecture — Detailed Reference

## The Three-Layer Token Model

### Layer 1: Primitive Tokens (Raw Values)

Never referenced directly in components. They are the single source of truth for raw values.

```css
:root {
  /* Color primitives */
  --teal-50: #E8F6F5;
  --teal-100: #C5EBE8;
  --teal-200: #9EDDD8;
  --teal-300: #7DCFC9;
  --teal-400: #5BBAB3;  /* Brand teal */
  --teal-500: #4AA69F;
  --teal-600: #3B8D87;
  --teal-700: #2C736E;
  --teal-800: #1D5A56;
  --teal-900: #0E413D;

  --navy-50: #E8EBF0;
  --navy-100: #B8C0D1;
  --navy-200: #8895B2;
  --navy-300: #586A93;
  --navy-400: #364B72;
  --navy-500: #1B2A4A;  /* Brand navy */
  --navy-600: #162240;
  --navy-700: #111A36;
  --navy-800: #0C122C;
  --navy-900: #070A22;

  --cream-50: #F5F2EC;   /* Brand cream */
  --cream-100: #EDE9E0;
  --cream-200: #E8E4DE;  /* Stone */

  --warm-white: #FAFAF7;

  --amber-300: #F0C86A;
  --amber-400: #E8B44D;  /* Caution */
  --amber-500: #D4A03F;

  --red-300: #D47878;
  --red-400: #C65D5D;    /* Avoid */
  --red-500: #B34D4D;

  /* Space primitives (4px base) */
  --space-0: 0px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-2-5: 10px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius primitives */
  --radius-0: 0px;
  --radius-2: 2px;
  --radius-4: 4px;
  --radius-8: 8px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-28: 28px;
  --radius-full: 9999px;

  /* Typography primitives */
  --font-family-primary: "Nunito", sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  --font-size-11: 0.6875rem;   /* 11px - caption2 */
  --font-size-12: 0.75rem;     /* 12px - caption1 */
  --font-size-13: 0.8125rem;   /* 13px - footnote */
  --font-size-14: 0.875rem;    /* 14px */
  --font-size-15: 0.9375rem;   /* 15px - subhead */
  --font-size-16: 1rem;        /* 16px - callout */
  --font-size-17: 1.0625rem;   /* 17px - body/headline */
  --font-size-20: 1.25rem;     /* 20px - title3 */
  --font-size-22: 1.375rem;    /* 22px - title2 */
  --font-size-28: 1.75rem;     /* 28px - title1 */
  --font-size-34: 2.125rem;    /* 34px - largeTitle */

  /* Shadow primitives */
  --shadow-1: 0 1px 2px rgba(0,0,0,0.03);
  --shadow-2: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-3: 0 2px 6px rgba(0,0,0,0.05);
  --shadow-4: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-5: 0 8px 24px rgba(0,0,0,0.08);

  /* Duration primitives */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-slowest: 1000ms;

  /* Easing primitives */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Z-index primitives */
  --z-base: 0;
  --z-raised: 10;
  --z-nav: 100;
  --z-sheet: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-tooltip: 500;
}
```

### Layer 2: Semantic Tokens (Purpose-Driven)

Reference primitives. Switch in dark mode/themes.

```css
:root {
  /* Semantic colors */
  --color-primary: var(--teal-400);
  --color-primary-hover: var(--teal-500);
  --color-primary-active: var(--teal-600);
  --color-on-primary: var(--warm-white);

  --color-secondary: var(--navy-500);
  --color-on-secondary: var(--cream-50);

  --color-surface: var(--cream-50);
  --color-surface-elevated: var(--warm-white);
  --color-surface-sunken: var(--cream-200);
  --color-on-surface: var(--navy-500);
  --color-on-surface-muted: var(--navy-300);

  --color-border: var(--cream-200);
  --color-border-strong: var(--navy-200);

  --color-success: var(--teal-400);
  --color-warning: var(--amber-400);
  --color-error: var(--red-400);

  --color-verdict-good: var(--teal-400);
  --color-verdict-caution: var(--amber-400);
  --color-verdict-avoid: var(--red-400);

  /* Semantic spacing */
  --space-xs: var(--space-1);    /* 4px */
  --space-sm: var(--space-2);    /* 8px */
  --space-md: var(--space-4);    /* 16px */
  --space-lg: var(--space-6);    /* 24px */
  --space-xl: var(--space-8);    /* 32px */
  --space-2xl: var(--space-12);  /* 48px */

  --space-page-x: var(--space-4);    /* 16px page horizontal padding */
  --space-page-y: var(--space-6);    /* 24px page vertical padding */
  --space-card-x: var(--space-4);    /* 16px card internal padding */
  --space-card-y: var(--space-3);    /* 12px card internal padding */
  --space-stack: var(--space-4);     /* 16px between stacked items */
  --space-inline: var(--space-2);    /* 8px between inline items */

  /* Semantic radius */
  --radius-smooth: var(--radius-32);   /* Sandow: 100% smoothing */
  --radius-soft: var(--radius-12);   /* Japandi: cards, modals */
  --radius-pill: var(--radius-full); /* Pills, badges, avatars */

  /* Semantic shadows */
  --shadow-rest: var(--shadow-2);
  --shadow-lift: var(--shadow-4);
  --shadow-overlay: var(--shadow-5);

  /* Semantic typography */
  --text-large-title: var(--font-weight-bold) var(--font-size-34)/1.2 var(--font-family-primary);
  --text-title1: var(--font-weight-bold) var(--font-size-28)/1.2 var(--font-family-primary);
  --text-title2: var(--font-weight-bold) var(--font-size-22)/1.3 var(--font-family-primary);
  --text-title3: var(--font-weight-semibold) var(--font-size-20)/1.3 var(--font-family-primary);
  --text-headline: var(--font-weight-bold) var(--font-size-17)/1.3 var(--font-family-primary);
  --text-body: var(--font-weight-regular) var(--font-size-17)/1.5 var(--font-family-primary);
  --text-callout: var(--font-weight-regular) var(--font-size-16)/1.4 var(--font-family-primary);
  --text-subheadline: var(--font-weight-regular) var(--font-size-15)/1.4 var(--font-family-primary);
  --text-footnote: var(--font-weight-regular) var(--font-size-13)/1.4 var(--font-family-primary);
  --text-caption1: var(--font-weight-regular) var(--font-size-12)/1.3 var(--font-family-primary);
  --text-caption2: var(--font-weight-regular) var(--font-size-11)/1.2 var(--font-family-primary);

  /* Semantic motion */
  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-normal: var(--duration-normal) var(--ease-out);
  --transition-slow: var(--duration-slow) var(--ease-in-out);
}
```

### Layer 3: Component Tokens (Scoped)

Optional, only when a component needs to override semantic defaults.

```css
:root {
  /* Navigation */
  --nav-height: 49px;
  --nav-bg: var(--color-surface);
  --nav-border: var(--color-border);
  --nav-icon-active: var(--color-primary);
  --nav-icon-inactive: var(--color-on-surface-muted);

  /* Score Ring */
  --score-ring-size: 120px;
  --score-ring-stroke-width: 8px;
  --score-ring-bg-stroke: var(--color-border);

  /* Card */
  --card-bg: var(--color-surface-elevated);
  --card-radius: var(--radius-soft);
  --card-shadow: var(--shadow-rest);
  --card-padding: var(--space-card-y) var(--space-card-x);

  /* Badge */
  --badge-height: 24px;
  --badge-radius: var(--radius-pill);
  --badge-font: var(--text-caption1);
}
```

## Dark Mode Token Switching

```css
[data-theme="dark"] {
  /* Override semantic tokens only */
  --color-primary: var(--teal-300);       /* Lighter teal for dark surfaces */
  --color-primary-hover: var(--teal-200);
  --color-on-primary: var(--navy-900);

  --color-surface: var(--navy-800);
  --color-surface-elevated: var(--navy-700);
  --color-surface-sunken: var(--navy-900);
  --color-on-surface: var(--cream-50);
  --color-on-surface-muted: var(--cream-200);

  --color-border: var(--navy-600);

  --shadow-rest: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-lift: 0 4px 12px rgba(0,0,0,0.3);
}
```

## Naming Conventions

### Rules

1. **Lowercase kebab-case**: `--color-primary`, not `--colorPrimary`
2. **Category prefix**: `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`
3. **Semantic names**: `--color-primary`, not `--color-teal`
4. **State suffixes**: `-hover`, `-active`, `-disabled`, `-focus`
5. **Context prefix for components**: `--card-*`, `--nav-*`, `--badge-*`
6. **Scale numbers for primitives**: `--teal-400`, `--space-4`

### Anti-Patterns

```css
/* ❌ Bad — values in names */
--color-5BBAB3: #5BBAB3;
--padding-16: 16px;

/* ❌ Bad — mixed conventions */
--colorPrimary: #5BBAB3;
--Color_Primary: #5BBAB3;

/* ❌ Bad — skipping semantic layer */
.button { background: var(--teal-400); }

/* ✅ Good — semantic reference */
.button { background: var(--color-primary); }
```

## Token Governance

### When to Create a New Token

- Value is used ≥ 3 times
- Value has semantic meaning (not just a number)
- Value should change across themes
- Value relates to a design decision (not implementation detail)

### When NOT to Create a Token

- One-off value (e.g., specific icon offset)
- Computed value (use `calc()` inline)
- Tailwind utility already covers it (e.g., `gap-4`)
- Magic number for a layout hack (fix the layout instead)

### Token Review Checklist

- [ ] Named semantically (purpose, not value)
- [ ] Placed in correct layer (primitive/semantic/component)
- [ ] Works in light and dark mode
- [ ] Documented with usage example
- [ ] Not duplicating an existing token
- [ ] Follows naming convention
