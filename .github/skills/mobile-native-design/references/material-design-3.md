# Material Design 3 — Quick Reference

Source: Material Design 3 (m3.material.io), android/compose-samples (23k★), android/nowinandroid (20k★)

## Design Tokens — Three-Layer Architecture

```
Ref tokens (primitives)    →  md.ref.palette.primary40: #6750A4
  ↓
Sys tokens (semantic)      →  md.sys.color.primary: md.ref.palette.primary40
  ↓
Comp tokens (component)    →  md.comp.fab.primary.container.color: md.sys.color.primary-container
```

### Color Scheme

M3 uses **tonal palettes** generated from a source color via HCT (Hue-Chroma-Tone).

| Role | Light | Dark |
|------|-------|------|
| Primary | tone 40 | tone 80 |
| On Primary | tone 100 | tone 20 |
| Primary Container | tone 90 | tone 30 |
| On Primary Container | tone 10 | tone 90 |
| Secondary | tone 40 | tone 80 |
| Tertiary | tone 40 | tone 80 |
| Error | tone 40 | tone 80 |
| Surface | tone 99 | tone 10 |
| On Surface | tone 10 | tone 90 |
| Surface Container Low | tone 96 | tone 10 |
| Surface Container | tone 94 | tone 12 |
| Surface Container High | tone 92 | tone 17 |
| Outline | tone 50 | tone 60 |
| Outline Variant | tone 80 | tone 30 |

### Dynamic Color

Material You generates palette from user's wallpaper:
- Extract source color via `DynamicColors`
- Generate tonal palette (13 tones per hue)
- Fallback: baseline purple (#6750A4) or brand color

### Mapping Jellow Brand to M3

| Jellow Token | M3 Role | Value |
|-------------|---------|-------|
| `--brand-teal` #5BBAB3 | Primary | Source → tonal palette |
| `--brand-navy` #1B2A4A | On Surface / Headlines | Custom role |
| `--brand-cream` #F5F2EC | Surface | Custom surface tone |
| `--brand-stone` #E8E4DE | Surface Container | Custom container |
| `--brand-warm-white` #FAFAF7 | Background | Custom background |
| `--verdict-good` #5BBAB3 | Tertiary or Custom | Extended color |
| `--verdict-caution` #E8B44D | Custom | Extended color |
| `--verdict-avoid` #C65D5D | Error / Custom | Extended color |

## Typography

M3 uses a 5-role × 3-size matrix:

| Role | Large | Medium | Small |
|------|-------|--------|-------|
| Display | 57/64 | 45/52 | 36/44 |
| Headline | 32/40 | 28/36 | 24/32 |
| Title | 22/28 | 16/24 Medium | 14/20 Medium |
| Body | 16/24 | 14/20 | 12/16 |
| Label | 14/20 Medium | 12/16 Medium | 11/16 Medium |

Format: size/line-height, weight is Regular unless noted.

## Shapes

M3 defines shape scale:

| Scale | Radius | Usage |
|-------|--------|-------|
| None | 0 dp | — |
| Extra Small | 4 dp | Chips, small buttons |
| Small | 8 dp | Cards, text fields |
| Medium | 12 dp | Dialogs, FAB |
| Large | 16 dp | Navigation drawer, bottom sheet |
| Extra Large | 28 dp | Large FAB, search bar |
| Full | 50% (circle) | Toggle buttons, badges |

### Shape Mapping for Jellow

| Jellow Token | M3 Shape | Radius |
|-------------|----------|--------|
| `--radius-sharp` (4px) | Extra Small | 4 dp |
| `--radius-soft` (12px) | Medium | 12 dp |

## Elevation

M3 uses **tonal elevation** (surface tint) instead of shadows:

| Level | Elevation | Tint Opacity |
|-------|-----------|-------------|
| 0 | 0 dp | 0% |
| 1 | 1 dp | 5% |
| 2 | 3 dp | 8% |
| 3 | 6 dp | 11% |
| 4 | 8 dp | 12% |
| 5 | 12 dp | 14% |

For Jellow, blend teal tint into surfaces at these opacities.

## Components — Key Specs

### Navigation Bar (Bottom)

- Height: 80 dp
- Icon: 24 dp, centered
- Label: below icon, always visible
- Active indicator: 64×32 dp pill, tertiary-container color
- Items: 3–5
- Active: filled icon + label
- Inactive: outlined icon + label at muted opacity

### Top App Bar

| Variant | Height | Title |
|---------|--------|-------|
| Center-aligned | 64 dp | Centered |
| Small | 64 dp | Left-aligned |
| Medium | 112 dp | Left, two-line area |
| Large | 152 dp | Left, large text |

Scroll behavior: elevates on scroll (Level 2), or color transition.

### FAB (Floating Action Button)

| Variant | Size | Radius | Icon |
|---------|------|--------|------|
| FAB | 56 dp | 16 dp | 24 dp |
| Small FAB | 40 dp | 12 dp | 24 dp |
| Large FAB | 96 dp | 28 dp | 36 dp |

### Bottom Sheet

- **Standard**: non-modal, coexists with content
- **Modal**: scrim at 32% opacity
- Drag handle: 32×4 dp, centered, 22 dp from top
- Corner radius: 28 dp (top corners)
- Snap points: custom — typically peek (56 dp visible), half, full
- Content padding: 16 dp horizontal

### Cards

| Variant | Elevation | Border | Fill |
|---------|-----------|--------|------|
| Elevated | Level 1 | none | surface-container-low |
| Filled | Level 0 | none | surface-container-highest |
| Outlined | Level 0 | 1dp outline | surface |

### Dialogs

- Min-width: 280 dp, max-width: 560 dp
- Corner radius: 28 dp
- Padding: 24 dp
- Title: Headline Small
- Body: Body Medium
- Actions: right-aligned text buttons, 8 dp gap
- Scrim: 32% opacity black

### Chips

| Variant | Height | Radius | Usage |
|---------|--------|--------|-------|
| Assist | 32 dp | 8 dp | Smart actions |
| Filter | 32 dp | 8 dp | Selection, tags |
| Input | 32 dp | 8 dp | User input, email |
| Suggestion | 32 dp | 8 dp | Contextual |

### Text Fields

- Height: 56 dp
- Label: animated from placeholder to floating
- Outlined: 1 dp border, 4 dp radius
- Filled: bottom-only indicator, surface-container fill
- Error state: error color border + supporting text
- Character counter: trailing below

## Motion

M3 defines three motion types:

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Emphasized | 500ms | emphasized (spring) | Entrances, large transitions |
| Emphasized Decelerate | 400ms | decelerate | Entering elements |
| Emphasized Accelerate | 200ms | accelerate | Exiting elements |
| Standard | 300ms | standard | Small transitions |
| Standard Decelerate | 250ms | decelerate | Appearing |
| Standard Accelerate | 200ms | accelerate | Disappearing |

### Shared Element Transitions

- Container transform: morphs container between two states
- Shared axis: forward/backward/up/down between screens
- Fade through: switching content within same container
- Duration: 300–500ms

## Accessibility

- Touch target: 48×48 dp minimum
- Color contrast: 4.5:1 (text), 3:1 (UI elements)
- Focus indicators: visible ring on keyboard/switch navigation
- Content descriptions: for all non-decorative elements
- Screen reader: heading hierarchy, action descriptions
- Color-independent: never use color alone to convey meaning
- Reduce motion: respect `prefers-reduced-motion`
