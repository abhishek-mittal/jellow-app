# Jellow App

A health-focused mobile web app that helps users understand the healthiness of foods through an intuitive jelly-inspired UI.

## Project Management

- **Dev Board**: [jellow-app — Dev Board](https://github.com/users/abhishek-mittal/projects/5)
- **Issues**: [shuhari/issues?label=jellow-app](https://github.com/abhishek-mittal/shuhari/labels/jellow-app)

## Features

- **Food Scanner** — Scan barcodes to get instant health verdicts
- **Verdict System** — 🟢 Good / 🟡 Moderate / 🔴 Bad health indicators
- **Rewards** — Gamification for healthy choices
- **Prescription Upload** — OCR-based dietary guidance
- **PWA** — Installable, offline-capable mobile experience

## Tech Stack

- **Framework**: Next.js 15 App Router (React 19)
- **API**: Hono 4 (catch-all route handler)
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
├── config/       # App configuration & design tokens
├── lib/          # Utilities and helpers
└── server/       # Hono API routes

docs/
└── designs/      # Penpot design exports

tests/
└── lib/          # Vitest unit tests
```

## Design System

Design tokens and component specs are exported from Penpot and stored in `docs/designs/`.

See [`src/config/design-tokens.json`](src/config/design-tokens.json) for the complete token reference.

## License

MIT
