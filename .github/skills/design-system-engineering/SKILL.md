---
name: design-system-engineering
description: "Design system engineering, token architecture, component API design, theming, and cross-platform systems. Use when: building design tokens (primitive, semantic, component layers), creating component APIs with variants and slots, theming with CSS custom properties, Tailwind v4 @theme, designing component libraries, working with shadcn/ui patterns, Tamagui, gluestack, NativeWind, Style Dictionary, compound components, slot-based architecture, cva class-variance-authority, responsive design systems, or scaling design tokens across platforms."
---

# Design System Engineering (Sandow UI Kit Edition)

**System Constants**: 
- **Typeface**: `Work Sans` primary, `Archivo` secondary 
- **Palette**: Bold Orange (`#EE7F46`), Tech Blue (`#3B82F6`), Dark Gray (`#2D2D2D`), Black (`#111111`)
- **Radii**: 100% Corner Smoothing. Extremely rounded corners: minimum 24px-36px for containers, pill shapes for buttons.



Expert knowledge for building scalable, maintainable design systems — from token architecture to component APIs to cross-platform delivery.

## When to Use

- Structuring design tokens (primitives → semantic → component)
- Designing component APIs with variants, sizes, slots
- Building theme systems (light/dark mode, brand theming)
- Extending Tailwind v4 with `@theme` blocks
- Creating compound components (headless + styled patterns)
- Using `cva` (class-variance-authority) for variant management
- Evaluating cross-platform component approaches (Tamagui, gluestack, NativeWind)
- Scaling or refactoring an existing design system

## Source Repositories (GitHub ★)

| Repo | Stars | Architecture Pattern |
|------|-------|---------------------|
| shadcn-ui/ui | 85k+ | Copy-paste composable components, Radix + Tailwind |
| tailwindlabs/tailwindcss | 87k+ | Utility-first CSS framework |
| ant-design/ant-design | 95k+ | Enterprise tokens + theme provider |
| chakra-ui/chakra-ui | 38k+ | Theme-aware component props |
| radix-ui/primitives | 17k+ | Headless accessible primitives |
| adobe/react-spectrum | 13k+ | React Aria + Spectrum tokens |
| tamagui/tamagui | 12k+ | Optimizing compiler, cross-platform tokens |
| gluestack/gluestack-ui | 4k+ | NativeWind v4, unstyled + themed |
| joe-bell/cva | 6k+ | Class variance authority |
| amzn/style-dictionary | 4k+ | Token transformation pipeline |
| salesforce/theo | 2k+ | Design token transformer |
| tokens-studio/figma-plugin | 2k+ | Figma ↔ token sync |
| nextui-org/heroui | 25k+ | React Aria + Tailwind (Jellow's base) |

## Token Architecture

For detailed reference, see [Token Architecture Reference](./references/token-architecture.md).

### Three-Layer Model

```
┌─────────────────────────────────────────────┐
│  Layer 3: Component Tokens                  │
│  --button-bg, --card-radius, --nav-height   │
│  Scoped to specific component usage         │
├─────────────────────────────────────────────┤
│  Layer 2: Semantic Tokens                   │
│  --color-primary, --space-md, --radius-soft │
│  Purpose-driven, theme-aware                │
├─────────────────────────────────────────────┤
│  Layer 1: Primitive Tokens                  │
│  --teal-500, --space-4, --radius-12         │
│  Raw values, never used directly in UI      │
└─────────────────────────────────────────────┘
```

### Token Categories

| Category | Examples | Format |
|----------|----------|--------|
| **Color** | `--color-brand-teal: #5BBAB3` | Hex, HSL, or oklch |
| **Space** | `--space-1: 4px` through `--space-12: 48px` | px or rem |
| **Size** | `--size-icon-sm: 16px`, `--size-avatar: 40px` | px |
| **Radius** | `--radius-sharp: 4px`, `--radius-soft: 12px` | px |
| **Shadow** | `--shadow-rest: 0 1px 3px rgba(0,0,0,0.04)` | CSS shadow |
| **Typography** | `--font-body: 17px/1.5 Nunito` | Composite |
| **Motion** | `--duration-fast: 100ms`, `--ease-out: cubic-bezier(...)` | ms + easing |
| **Z-index** | `--z-nav: 100`, `--z-modal: 200` | Integer |

### Jellow Token Structure

```css
:root {
  /* Primitives (Layer 1) */
  --teal-500: #5BBAB3;
  --navy-900: #1B2A4A;
  --cream-50: #F5F2EC;
  --stone-100: #E8E4DE;
  --warm-white: #FAFAF7;
  --amber-500: #E8B44D;
  --red-500: #C65D5D;

  /* Semantic (Layer 2) */
  --color-primary: var(--teal-500);
  --color-on-primary: var(--warm-white);
  --color-surface: var(--cream-50);
  --color-on-surface: var(--navy-900);
  --color-verdict-good: var(--teal-500);
  --color-verdict-caution: var(--amber-500);
  --color-verdict-avoid: var(--red-500);

  /* Component (Layer 3) — optional */
  --score-ring-stroke: var(--color-primary);
  --nav-bg: var(--color-surface);
  --card-bg: var(--warm-white);
}
```

### Tailwind v4 @theme Integration

```css
@theme {
  /* Map tokens to Tailwind */
  --color-brand-teal: var(--teal-500);
  --color-brand-navy: var(--navy-900);
  --color-brand-cream: var(--cream-50);

  --radius-sharp: 4px;
  --radius-soft: 12px;

  --shadow-rest: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-lift: 0 4px 12px rgba(0,0,0,0.06);
}

/* Usage: bg-brand-teal, rounded-soft, shadow-rest */
```

## Component API Design

For detailed patterns, see [Component Patterns Reference](./references/component-patterns.md).

### Variant-Based API (cva pattern)

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      intent: {
        primary: "bg-brand-teal text-white hover:bg-teal-600",
        secondary: "bg-stone-100 text-navy-900 hover:bg-stone-200",
        ghost: "bg-transparent text-navy-900 hover:bg-stone-50",
        danger: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-sharp",
        md: "h-10 px-4 text-base rounded-soft",
        lg: "h-12 px-6 text-lg rounded-soft",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof button>;

function Button({ intent, size, fullWidth, className, ...props }: ButtonProps) {
  return (
    <button className={button({ intent, size, fullWidth, className })} {...props} />
  );
}
```

### Compound Component Pattern

```tsx
// Compound component for complex UI (e.g., Card)
const CardContext = createContext<{ variant: string }>({ variant: "elevated" });

function Card({ variant = "elevated", children, ...props }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={card({ variant })} {...props}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ children }) {
  return <div className="px-4 pt-4">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="px-4 py-3">{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div className="px-4 pb-4 pt-2 border-t border-stone-100">{children}</div>;
};

// Usage
<Card variant="elevated">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Slot-Based Architecture (React Aria / HeroUI pattern)

```tsx
// Slots provide named insertion points
interface InputProps {
  label: string;
  description?: string;
  errorMessage?: string;
  startContent?: ReactNode;  // Slot: icon before input
  endContent?: ReactNode;    // Slot: button/icon after input
}

function Input({ label, description, errorMessage, startContent, endContent, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-navy-900">{label}</label>
      <div className="flex items-center gap-2 px-3 h-10 rounded-soft border border-stone-200 focus-within:border-brand-teal">
        {startContent}
        <input className="flex-1 bg-transparent outline-none" {...props} />
        {endContent}
      </div>
      {description && <p className="text-xs text-stone-500">{description}</p>}
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
```

### Size Scale Convention

| Size | Height | Padding X | Font | Icon | Use |
|------|--------|-----------|------|------|-----|
| `xs` | 24px | 8px | 11px | 14px | Dense UI, tags |
| `sm` | 32px | 12px | 13px | 16px | Secondary actions, chips |
| `md` | 40px | 16px | 15px | 20px | Default |
| `lg` | 48px | 20px | 17px | 24px | Primary CTAs, mobile |
| `xl` | 56px | 24px | 19px | 28px | Hero actions |

## Theming Architecture

### CSS Custom Properties (Runtime)

```css
/* Light theme (default) */
:root {
  --bg-primary: #F5F2EC;
  --text-primary: #1B2A4A;
  --accent: #5BBAB3;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #1B2A4A;
  --text-primary: #F5F2EC;
  --accent: #7DCFC9;
}
```

### Theme Provider Pattern

```tsx
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### HeroUI Theme Customization (Jellow)

```tsx
// tailwind.config — HeroUI theme extension
heroui({
  themes: {
    jellow: {
      colors: {
        primary: { DEFAULT: "#5BBAB3", foreground: "#FAFAF7" },
        secondary: { DEFAULT: "#1B2A4A", foreground: "#F5F2EC" },
        success: { DEFAULT: "#5BBAB3" },
        warning: { DEFAULT: "#E8B44D" },
        danger: { DEFAULT: "#C65D5D" },
        background: "#F5F2EC",
        foreground: "#1B2A4A",
      },
    },
  },
})
```

## Cross-Platform Approaches

### Comparison Matrix

| Library | Platform | Styling | Compiler | Size | Stars |
|---------|----------|---------|----------|------|-------|
| **shadcn/ui** | Web | Tailwind | None | 0kb (copy-paste) | 85k |
| **HeroUI** | Web | Tailwind + React Aria | None | Tree-shaken | 25k |
| **Tamagui** | Web + Native | Custom + CSS | Optimizing | ~15kb | 12k |
| **gluestack** | Web + Native | NativeWind v4 | Tailwind | ~8kb | 4k |
| **React Native Paper** | Native | JS StyleSheet | None | ~30kb | 13k |
| **NativeWind** | Native | Tailwind → RN | Tailwind | ~10kb | 5k |

### Tamagui Pattern (Optimizing Compiler)

```tsx
// Tamagui extracts styles at build time → atomic CSS
import { styled, Stack, Text } from "tamagui";

const Card = styled(Stack, {
  backgroundColor: "$surface",
  borderRadius: "$soft",
  padding: "$md",
  shadowColor: "$shadow",
  shadowRadius: 3,

  variants: {
    elevated: {
      true: { shadowRadius: 12, shadowOpacity: 0.06 },
    },
  },
});
```

### gluestack-ui v3 Pattern (NativeWind)

```tsx
// Uses NativeWind (Tailwind for RN) + unstyled primitives
import { Button, ButtonText } from "@gluestack-ui/themed";

<Button className="bg-brand-teal rounded-soft h-12 px-6">
  <ButtonText className="text-white font-semibold">Scan</ButtonText>
</Button>
```

### shadcn/ui Pattern (Copy-Paste + Customize)

```bash
# Install component: copies source to your project
npx shadcn@latest add button

# Result: src/components/ui/button.tsx — fully yours to modify
# Uses: Radix primitives + Tailwind + cva
```

Key principle: own the code, not the dependency.

## Token Transformation (Style Dictionary)

For multi-platform token delivery:

```json
// tokens/color.json
{
  "color": {
    "brand": {
      "teal": { "value": "#5BBAB3", "type": "color" }
    },
    "verdict": {
      "good": { "value": "{color.brand.teal}", "type": "color" },
      "caution": { "value": "#E8B44D", "type": "color" },
      "avoid": { "value": "#C65D5D", "type": "color" }
    }
  }
}
```

```js
// style-dictionary.config.js
module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
    ios: {
      transformGroup: "ios-swift",
      buildPath: "ios/",
      files: [{ destination: "Tokens.swift", format: "ios-swift/class.swift" }],
    },
    android: {
      transformGroup: "android",
      buildPath: "android/",
      files: [{ destination: "tokens.xml", format: "android/resources" }],
    },
  },
};
```

## Procedure

1. **Audit existing tokens** — Map current CSS variables to the 3-layer model
2. **Identify gaps** — Missing semantic tokens, inconsistent naming
3. **Define component API** — Choose between cva, compound, or slot-based
4. **Implement variants** — size, intent/variant, state (disabled, loading)
5. **Add theming** — CSS custom properties with data-theme switching
6. **Document** — Props table, usage examples, do/don't
7. **Test** — Visual regression, a11y audit, responsive breakpoints
