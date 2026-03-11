# Jellow App

A health-focused mobile web app that helps users understand the healthiness of foods through an intuitive jelly-inspired UI.

## Features

- **Food Scanner** — Scan barcodes to get instant health verdicts
- **Verdict System** — 🟢 Good / 🟡 Moderate / 🔴 Bad health indicators
- **Rewards** — Gamification for healthy choices
- **Prescription Upload** — OCR-based dietary guidance
- **PWA** — Installable, offline-capable mobile experience

## Tech Stack

- **Framework**: Next.js 15 App Router (React 19)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + Playwright
- **PWA**: Serwist (service worker)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # React components
├── lib/          # Utilities and helpers
└── config/       # App configuration

docs/
└── designs/      # Penpot design exports

tests/
└── lib/          # Vitest unit tests
```

## Design System

Design tokens and component specs are exported from Penpot and stored in `docs/designs/`.

See `docs/design-tokens.json` for the complete token reference.

## License

MIT
