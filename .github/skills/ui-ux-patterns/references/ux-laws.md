# UX Laws — Detailed Reference

## Fitts's Law

**Formula:** `T = a + b × log₂(1 + D/W)` where D = distance, W = target width

**Design rules:**
- Primary CTAs: large (≥ 48dp), positioned in thumb zone (bottom 40% of screen)
- Destructive actions: small, far from primary path
- FAB: corner-anchored, easy to reach
- Edge targets: infinite depth on screen edges (navigation rails, tab bars)
- Group related actions to reduce travel distance

**Jellow application:**
- Scan button: largest target on home screen, center-bottom
- Tab bar items: full-width touch zones, not just the icon
- Verdict CTA: full-width button at bottom

## Hick's Law

**Formula:** `T = b × log₂(n + 1)` where n = number of choices

**Design rules:**
- Limit primary navigation to 3–5 items
- Progressive disclosure: show summary → detail on demand
- Smart defaults: pre-select the most common option
- Category grouping: instead of 20 flat items → 4 groups of 5
- Search for large sets: filter > browse for > 10 items

**Jellow application:**
- Home: 3 primary actions (Scan, History, Profile)
- Verdict: summarize with score + badge before full detail
- Ingredient list: categorize (additives, preservatives, nutrients)

## Miller's Law

**Magic number:** 7 ± 2 items in working memory

**Design rules:**
- Chunk content into groups of 3–5
- Use visual separators (whitespace, dividers, cards)
- Step indicators for multi-step flows (max 5 steps)
- Phone numbers: 3-3-4 grouping
- Navigation items: 3–5 per level

**Jellow application:**
- Tab bar: 5 items maximum
- Onboarding: 3–4 steps
- Nutritional display: group by macros, micros, additives
- Ingredient tags: show top 5, "Show all" for rest

## Jakob's Law

Users spend most time on *other* sites/apps. They expect yours to work the same.

**Design rules:**
- Tab bar at bottom (iOS standard)
- Pull-to-refresh for lists
- Swipe-back for navigation
- Search bar at top of lists
- Settings gear icon in profile
- Star/heart for favorites
- X for close, < for back

**Jellow violations to avoid:**
- Non-standard navigation gestures
- Unusual icon meanings
- Tab bar at top on mobile
- Custom scroll behaviors

## Aesthetic-Usability Effect

Beautiful designs are perceived as easier to use and more trustworthy.

**Design rules:**
- Consistent spacing and alignment (8px grid)
- Harmonious color palette (Jellow's warm Japandi tones)
- Smooth animations (not janky)
- High-quality illustrations/icons
- Careful typography (proper hierarchy, weights)

## Doherty Threshold

Productivity soars when system response < 400ms.

**Design rules:**
- Show interface response within 100ms (button press feedback)
- Complete perceptible action within 400ms
- For longer operations: show progress within 1000ms
- Optimistic UI: show success before server confirms
- Skeleton screens: immediate visual structure

**Implementation:**

| Response Time | User Perception | Strategy |
|---------------|----------------|----------|
| 0–100ms | Instant | No feedback needed (except micro-interaction) |
| 100–400ms | Slight delay | Show activity indicator |
| 400–1000ms | Noticeable | Skeleton screen / spinner |
| 1000ms+ | Slow | Progress bar with estimate |

## Von Restorff Effect (Isolation Effect)

Items that stand out from their surroundings are more memorable.

**Design rules:**
- One primary CTA per screen (contrasting color, larger size)
- Important alerts: different color from standard content
- Badge notifications: bright accent dot
- Feature spotlight: use size/color/motion to isolate

**Jellow application:**
- Health score ring: the dominant visual on verdict screen
- Verdict badge: bold color + scale animation
- Scan button: teal accent on cream/white background

## Zeigarnik Effect

People remember incomplete tasks better than completed ones.

**Design rules:**
- Progress bars for multi-step flows (3/5 badges collected)
- Streak counters (3-day scan streak)
- Empty badge slots: visual reminder of what's uncollected
- "Almost there" messaging for near-completion

## Peak-End Rule

Experiences are judged primarily by their peak intensity + ending.

**Design rules:**
- **Peak**: The scan result reveal — invest in animation, sound, haptic
- **End**: The save/share moment — satisfying confirmation
- Avoid ending on an error or frustration
- Make sign-up/payment (pain points) mid-flow, not at end

## Law of Proximity

Objects near each other are perceived as related.

**Design rules:**
- Group related controls (e.g., quantity + unit)
- Separate unrelated content with whitespace (≥ 16px between groups)
- Card containers for related info chunks
- Consistent internal vs. external spacing ratio (internal < external)

## Law of Similarity

Similar-looking elements are perceived as related.

**Design rules:**
- Same style for same-function elements (all cards look alike)
- Different style for different functions (buttons vs. links)
- Color coding for categories (verdict colors: teal/amber/red)
- Consistent icon style (all outlined or all filled, not mixed)

## Serial Position Effect

People remember first and last items in a list best.

**Design rules:**
- Put most important items at start/end of lists
- Navigation: Home first, Profile last (most tapped positions)
- Onboarding: strongest benefit first, CTA last
- Search results: best matches at top
