# iOS Human Interface Guidelines — Quick Reference

Source: Apple HIG (developer.apple.com/design/human-interface-guidelines)

## Layout & Spacing

### Safe Areas

| Region | Inset | Notes |
|--------|-------|-------|
| Top (Dynamic Island) | 54 pt | iPhone 15 Pro / 16 |
| Top (Notch) | 47 pt | iPhone X–14 |
| Top (legacy) | 20 pt | iPhone SE, iPad |
| Bottom (home indicator) | 34 pt | All Face ID devices |
| Left/Right (landscape) | 44 pt | Sensor housing avoidance |

### Standard Margins

- **Compact width** (phones portrait): 16 pt
- **Regular width** (phones landscape, tablets): 20 pt
- Content inset from screen edge: avoid < 8 pt

### System Component Heights

| Component | Height |
|-----------|--------|
| Status bar | 54 / 47 / 20 pt (varies by device) |
| Navigation bar (standard) | 44 pt |
| Navigation bar (large title) | 96 pt |
| Tab bar | 49 pt (compact: 32 pt) |
| Search bar | 36 pt |
| Toolbar | 44 pt |
| Home indicator region | 34 pt |

## Touch Targets

- **Minimum**: 44×44 pt (Apple standard)
- Buttons with text: pad to at least 44 pt height
- Icon buttons: icon can be smaller, tappable area must be 44×44 pt
- Spacing between targets: ≥ 8 pt to avoid mis-taps
- Thumb zone (one-handed use): bottom 40% of screen is primary action zone

## Typography — Dynamic Type

Uses **SF Pro** (San Francisco) system font.

| Style | Default Size | Weight | Leading | Min | Max |
|-------|-------------|--------|---------|-----|-----|
| Large Title | 34 pt | Regular | 41 pt | 34 | 40 |
| Title 1 | 28 pt | Regular | 34 pt | 28 | 38 |
| Title 2 | 22 pt | Regular | 28 pt | 22 | 34 |
| Title 3 | 20 pt | Regular | 25 pt | 20 | 31 |
| Headline | 17 pt | Semi-Bold | 22 pt | 17 | 28 |
| Body | 17 pt | Regular | 22 pt | 17 | 28 |
| Callout | 16 pt | Regular | 21 pt | 16 | 26 |
| Subheadline | 15 pt | Regular | 20 pt | 15 | 25 |
| Footnote | 13 pt | Regular | 18 pt | 13 | 23 |
| Caption 1 | 12 pt | Regular | 16 pt | 12 | 22 |
| Caption 2 | 11 pt | Regular | 13 pt | 11 | 21 |

### Dynamic Type Mapping for Jellow (Nunito)

| Jellow Token | iOS Style | Nunito Size | Weight |
|-------------|-----------|-------------|--------|
| `--text-lg-title` | Large Title | 34px | 700 |
| `--text-title1` | Title 1 | 28px | 700 |
| `--text-title2` | Title 2 | 22px | 700 |
| `--text-title3` | Title 3 | 20px | 600 |
| `--text-headline` | Headline | 17px | 700 |
| `--text-body` | Body | 17px | 400 |
| `--text-callout` | Callout | 16px | 400 |
| `--text-subhead` | Subheadline | 15px | 400 |
| `--text-footnote` | Footnote | 13px | 400 |
| `--text-caption1` | Caption 1 | 12px | 400 |
| `--text-caption2` | Caption 2 | 11px | 400 |

## Navigation Patterns

### Tab Bar

- Position: bottom, always visible on main screens
- Items: 3–5
- Icon: SF Symbol or custom, 24×24 pt
- Label: always show (accessibility)
- Active: filled icon, tint color
- Inactive: outlined icon, gray
- Don't nest tab bars

### Navigation Bar (Push/Pop)

- Title: center-aligned (standard) or left-aligned (large title)
- Large title: scrolls to collapse into standard
- Back button: leading edge, chevron + previous title (truncated)
- Trailing actions: max 2–3 bar button items
- Swipe from left edge to go back (interruptible)

### Sheets & Modals

- **Presentation**: `.pageSheet` (default) — card appearance, top corners rounded
- **Detents**: `.medium` (half screen), `.large` (full), custom heights
- **Dismiss**: swipe down, tap outside (if not critical), X button top-left or top-right
- **Grab indicator**: centered pill, 36×5 pt, 6 pt from top

### Action Sheets

- Appear from bottom
- Group related actions
- Destructive actions in red
- Always include Cancel

## Colors

### System Colors (iOS 18)

| Name | Light | Dark |
|------|-------|------|
| systemBlue | #007AFF | #0A84FF |
| systemGreen | #34C759 | #30D158 |
| systemRed | #FF3B30 | #FF453A |
| systemOrange | #FF9500 | #FF9F0A |
| systemYellow | #FFCC00 | #FFD60A |

### Semantic Colors

| Name | Usage |
|------|-------|
| label | Primary text |
| secondaryLabel | Secondary text |
| tertiaryLabel | Tertiary text |
| separator | Hairline dividers |
| systemGroupedBackground | Table/list background |
| secondarySystemGroupedBackground | Card/cell background |

## Dark Mode

- Use semantic colors (system-provided adapt automatically)
- Elevated surfaces: slightly lighter, not darker
- Shadows: reduce or remove in dark mode
- Vibrancy: use for overlaid text on blurred backgrounds
- Contrast ratio: maintain 4.5:1 (AA) minimum in both modes

## Motion

| Animation | Duration | Curve |
|-----------|----------|-------|
| Push transition | 350ms | ease-in-out (system spring) |
| Modal present | 350ms | spring (damping ~0.9) |
| Dismiss | 250ms | ease-out |
| Button press | 100ms | ease-out |
| Tab switch | instant | cross-dissolve |
| Pull-to-refresh | 200ms | ease-out (bounce) |

## Haptics

| Pattern | When |
|---------|------|
| Impact (light) | Button tap, toggle |
| Impact (medium) | Significant action confirm |
| Notification (success) | Scan complete, save done |
| Notification (warning) | Edge case alert |
| Notification (error) | Failure state |
| Selection | Picker scroll, slider snap |

## Accessibility

- VoiceOver: every element needs `accessibilityLabel`
- Group related elements with `accessibilityElement` containers
- Support Dynamic Type (all text styles must scale)
- Minimum contrast: 4.5:1 (text), 3:1 (UI elements)
- Reduce Motion: respect `prefers-reduced-motion`, disable parallax/spring
- Bold Text: support increased font weights
- Button shapes: optionally underline/border all tappable text
