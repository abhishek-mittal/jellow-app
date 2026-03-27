# Component Patterns — Detailed Reference

## Pattern 1: cva (Class Variance Authority)

Used by shadcn/ui (85k★), HeroUI, and modern Tailwind component libraries.

### When to Use

- Components with multiple visual variants (intent, size, state)
- Tailwind-based projects
- You want type-safe variant props

### Full Example — Chip/Badge Component

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chip = cva(
  "inline-flex items-center gap-1 font-medium transition-colors",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "bg-transparent border",
        soft: "",
      },
      color: {
        default: "",
        good: "",
        caution: "",
        avoid: "",
      },
      size: {
        sm: "h-5 px-2 text-[11px] rounded-full",
        md: "h-6 px-2.5 text-xs rounded-full",
        lg: "h-8 px-3 text-sm rounded-full",
      },
    },
    compoundVariants: [
      // Filled + color combos
      { variant: "filled", color: "default", className: "bg-stone-200 text-navy-900" },
      { variant: "filled", color: "good", className: "bg-teal-500 text-white" },
      { variant: "filled", color: "caution", className: "bg-amber-400 text-navy-900" },
      { variant: "filled", color: "avoid", className: "bg-red-500 text-white" },
      // Soft + color combos
      { variant: "soft", color: "default", className: "bg-stone-100 text-navy-900" },
      { variant: "soft", color: "good", className: "bg-teal-50 text-teal-700" },
      { variant: "soft", color: "caution", className: "bg-amber-50 text-amber-700" },
      { variant: "soft", color: "avoid", className: "bg-red-50 text-red-700" },
      // Outlined + color combos
      { variant: "outlined", color: "default", className: "border-stone-300 text-navy-900" },
      { variant: "outlined", color: "good", className: "border-teal-300 text-teal-700" },
      { variant: "outlined", color: "caution", className: "border-amber-300 text-amber-700" },
      { variant: "outlined", color: "avoid", className: "border-red-300 text-red-700" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "default",
      size: "md",
    },
  }
);

type ChipProps = React.ComponentProps<"span"> & VariantProps<typeof chip>;

export function Chip({ variant, color, size, className, ...props }: ChipProps) {
  return <span className={cn(chip({ variant, color, size }), className)} {...props} />;
}
```

### Compound Variants

Map combinations of multiple variant dimensions:

```tsx
compoundVariants: [
  // Size + intent override
  { intent: "primary", size: "lg", className: "font-bold" },
  // Disabled state (combines with any variant)
  { disabled: true, className: "opacity-50 pointer-events-none" },
],
```

## Pattern 2: Compound Components

Used by Radix (17k★), React Aria (13k★), Chakra.

### When to Use

- Complex components with multiple sub-parts (Card, Dialog, Dropdown)
- Users need to compose parts freely
- Parts share context but render independently

### Full Example — Accordion

```tsx
const AccordionContext = createContext<{
  openItems: Set<string>;
  toggle: (id: string) => void;
}>({ openItems: new Set(), toggle: () => {} });

function Accordion({ children, defaultOpen = [] }: { children: ReactNode; defaultOpen?: string[] }) {
  const [openItems, setOpenItems] = useState(new Set(defaultOpen));

  const toggle = useCallback((id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="divide-y divide-stone-200">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }: { id: string; children: ReactNode }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(id);

  return (
    <div data-state={isOpen ? "open" : "closed"}>
      {children}
    </div>
  );
}

function AccordionTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.has(id);

  return (
    <button
      onClick={() => toggle(id)}
      aria-expanded={isOpen}
      aria-controls={`content-${id}`}
      className="flex w-full items-center justify-between py-3 text-left font-semibold"
    >
      {children}
      <ChevronIcon className={cn("transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

function AccordionContent({ id, children }: { id: string; children: ReactNode }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={`content-${id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pb-3">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// Usage
<Accordion defaultOpen={["ingredients"]}>
  <Accordion.Item id="ingredients">
    <Accordion.Trigger id="ingredients">Ingredients</Accordion.Trigger>
    <Accordion.Content id="ingredients">
      <IngredientList items={ingredients} />
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

## Pattern 3: Slot-Based (React Aria / HeroUI)

### When to Use

- Components with customizable sub-regions
- Need to inject custom content in specific positions
- HeroUI / React Aria ecosystem

### Named Slots

```tsx
interface CardProps {
  header?: ReactNode;   // Slot
  footer?: ReactNode;   // Slot
  children: ReactNode;  // Default slot
  headerAction?: ReactNode; // Slot
}

function Card({ header, footer, children, headerAction }: CardProps) {
  return (
    <div className="bg-white rounded-soft shadow-rest overflow-hidden">
      {header && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div>{header}</div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="px-4 py-3">{children}</div>
      {footer && (
        <div className="px-4 pb-4 pt-2 border-t border-stone-100">
          {footer}
        </div>
      )}
    </div>
  );
}
```

### Render Props (Advanced Slots)

```tsx
interface ListItemProps {
  renderStart?: (item: Item) => ReactNode;
  renderEnd?: (item: Item) => ReactNode;
  renderContent: (item: Item) => ReactNode;
}
```

## Pattern 4: Polymorphic Components

### Using `as` Prop

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

function Box<E extends React.ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || "div";
  return <Component {...props} />;
}

// Usage
<Box as="section" className="p-4">...</Box>
<Box as="a" href="/scan">...</Box>
<Box as={motion.div} animate={{ opacity: 1 }}>...</Box>
```

## Component API Checklist

When designing a new component's API:

- [ ] **Props are minimal** — only expose what varies
- [ ] **Variants over boolean props** — `variant="ghost"` not `isGhost`
- [ ] **Forward ref** — all components accept refs
- [ ] **Spread rest props** — `...props` to underlying element
- [ ] **className merge** — accept and merge `className` prop
- [ ] **Accessible by default** — proper roles, aria attributes
- [ ] **Composable** — works with other components, accepts children
- [ ] **TypeScript first** — exported types for all props
- [ ] **Server-component safe** — no `"use client"` unless needed

## File Organization

```
src/components/ui/
├── button.tsx          # Base components: cva + forwardRef
├── card.tsx
├── chip.tsx
├── input.tsx
├── modal.tsx
├── index.ts            # Re-exports
└── types.ts            # Shared types (Size, Variant, etc.)

src/components/
├── layout/
│   └── bottom-nav.tsx  # App-specific compositions
├── verdict/
│   ├── ingredient-tag.tsx
│   └── nutrition-panel.tsx
└── scanner/
    └── scan-guide.tsx
```

**Convention:**
- `src/components/ui/` — generic, reusable (design system layer)
- `src/components/<feature>/` — feature-specific compositions
- One component per file, named export, matching filename
