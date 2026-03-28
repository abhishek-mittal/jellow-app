# Animation Patterns — Framer Motion Reference

## Emil-Inspired Motion Heuristics

### Purpose + Frequency Matrix

| Interaction | Frequency | Animate? | Guidance |
|-------------|-----------|----------|----------|
| Keyboard command navigation | Very high | Usually no | Keep highlight/state changes instant |
| List item hover in dense views | High | Minimal | Prefer subtle color change over movement |
| Primary button press | High | Yes, tiny | `scale(0.97)` on press, <= `120ms` |
| Drawer/modal open | Medium | Yes | Fast transition, clear spatial origin |
| Scan result reveal | Low/meaningful | Yes | Heavier choreography acceptable |

### Timing Budget

- Default product UI: `120ms`–`240ms`
- Hard upper bound for most interactions: `< 300ms`
- Prefer strong `ease-out` for enter motion
- Do not start scale animations at `0`; use `0.93`–`0.97`

### Origin-Aware Rule

Use trigger-aware transform origins for popovers/tooltips so movement originates from where the user clicked.

```css
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
```

## Layout Animations

### List Item Enter/Exit (Stagger)

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item} layout />
  ))}
</motion.ul>
```

### AnimatePresence for Route Transitions

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Layout Animation (Shared Layout)

```tsx
// Tab indicator that slides between tabs
<motion.div
  layoutId="tab-indicator"
  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal"
  transition={{ type: "spring", damping: 20, stiffness: 200 }}
/>
```

## Component Animations

### Button Press

```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
/>
```

### Card Hover/Tap (Mobile)

```tsx
<motion.div
  whileTap={{ scale: 0.97, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
  transition={{ duration: 0.15 }}
/>
```

### Toggle/Switch

```tsx
<motion.div
  animate={{ backgroundColor: isOn ? "#5BBAB3" : "#E8E4DE" }}
  transition={{ duration: 0.2 }}
>
  <motion.div
    animate={{ x: isOn ? 20 : 0 }}
    transition={{ type: "spring", damping: 15, stiffness: 300 }}
  />
</motion.div>
```

### Checkbox Check

```tsx
<motion.svg viewBox="0 0 24 24">
  <motion.path
    d="M5 12l5 5L19 7"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: checked ? 1 : 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    stroke="#5BBAB3"
    strokeWidth={3}
    fill="none"
  />
</motion.svg>
```

## Score & Data Visualization

### Health Score Ring Reveal

```tsx
<motion.circle
  cx="50" cy="50" r="40"
  fill="none"
  stroke={verdictColor}
  strokeWidth="8"
  strokeLinecap="round"
  initial={{ pathLength: 0, rotate: -90 }}
  animate={{ pathLength: score / 100 }}
  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
  style={{ transformOrigin: "center" }}
/>

// Score number counting up
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  {/* Use useMotionValue + useTransform for counting */}
</motion.span>
```

### Verdict Badge Pop-In

```tsx
<motion.div
  initial={{ scale: 0, rotate: -15, opacity: 0 }}
  animate={{ scale: 1, rotate: 0, opacity: 1 }}
  transition={{
    type: "spring",
    damping: 10,
    stiffness: 200,
    delay: 0.8,
  }}
/>
```

### Stats Number Tick-Up

```tsx
function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}
```

## Modal & Sheet Animations

### Bottom Sheet

```tsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
  drag="y"
  dragConstraints={{ top: 0 }}
  dragElastic={0.1}
  onDragEnd={(_, info) => {
    if (info.velocity.y > 500 || info.offset.y > 200) {
      onClose();
    }
  }}
/>
```

### Modal Overlay

```tsx
// Backdrop
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.32 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className="fixed inset-0 bg-black"
/>

// Modal content
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
/>
```

### Toast Notification

```tsx
<motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{ type: "spring", damping: 20, stiffness: 300 }}
/>
```

### Interruptible Toast Stack (Transition-First)

```tsx
// Transition-based transforms retarget smoothly as list order changes.
// This avoids keyframe jumps during rapid enqueue/dequeue.
<li
  style={{
    transform: `translateY(${offsetY}px) scale(${1 - index * 0.05})`,
    transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
  }}
/>
```

### Swipe Dismiss (Distance or Velocity)

```tsx
const shouldDismiss = Math.abs(offsetY) >= SWIPE_THRESHOLD || Math.abs(velocityY) > 0.11;
if (shouldDismiss) dismiss();
```

### Pause Timers On Hidden Tabs

```tsx
useEffect(() => {
  const onVisibility = () => setIsHidden(document.hidden);
  document.addEventListener("visibilitychange", onVisibility);
  return () => document.removeEventListener("visibilitychange", onVisibility);
}, []);

useEffect(() => {
  if (isHidden) pauseToastTimers();
  else resumeToastTimers();
}, [isHidden]);
```

## Clip-Path Techniques

### Reveal Without Layout Shift

```css
.image-reveal {
  clip-path: inset(0 0 100% 0);
  animation: reveal 1s forwards cubic-bezier(0.77, 0, 0.175, 1);
}

@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

### Tab Color + Indicator Sync

```tsx
// Duplicate layer technique:
// 1) Base layer = inactive tabs
// 2) Active-styled duplicate layer clipped to active tab rect
// 3) Animate clip-path instead of text color transition
const clip = `inset(0 ${100 - rightPct}% 0 ${leftPct}% round 17px)`;
activeLayer.style.clipPath = clip;
```

## Celebration & Delight

### Confetti Burst

```tsx
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 200 - 100,
  y: -(Math.random() * 300 + 100),
  rotate: Math.random() * 720 - 360,
  color: ["#5BBAB3", "#E8B44D", "#1B2A4A", "#C65D5D"][i % 4],
}));

{particles.map((p) => (
  <motion.div
    key={p.id}
    initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
    animate={{
      x: p.x,
      y: p.y,
      rotate: p.rotate,
      opacity: 0,
      scale: 0,
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: p.color }}
  />
))}
```

### Badge Unlock

```tsx
<>
  {/* Glow ring */}
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1.5, opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="absolute inset-0 rounded-full border-2 border-teal"
  />
  {/* Badge */}
  <motion.div
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: "spring",
      damping: 8,
      stiffness: 150,
      delay: 0.2,
    }}
  />
</>
```

## Reduced Motion Variants

```tsx
const reducedMotion = useReducedMotion();

const variants = reducedMotion
  ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    }
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.25 },
    };
```

## Timing Cheat Sheet

| Pattern | Duration | Type | Config |
|---------|----------|------|--------|
| Button press | 100ms | tween | ease-out |
| Toggle | 200ms | spring | damping: 15, stiffness: 300 |
| Card tap | 150ms | tween | ease-out |
| List stagger | 50ms/item | tween | ease-out |
| Page slide | 250ms | tween | ease-in-out |
| Modal appear | 250ms | tween | ease-out |
| Sheet slide | 300ms | spring | damping: 25, stiffness: 200 |
| Score ring | 1200ms | tween | ease-out |
| Verdict reveal | 300ms | spring | damping: 10, stiffness: 200 |
| Confetti | 1500ms | tween | ease-out |
| Skeleton shimmer | 1500ms | tween | linear (loop) |
| Tab indicator | 200ms | spring | damping: 20, stiffness: 200 |
