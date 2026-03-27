# Copilot Instructions — jellow-app

> Auto-generated from RNA schema v1.0.0. Edit `.rna/rna-schema.json` and re-run the adapter to update.

## Project Context

| Field | Value |
|-------|-------|
| Project | jellow-app |
| Description | Jellow — a playful food & product health scanner PWA. Scan barcodes, get health verdicts, track nutrition, earn rewards. |
| Domain | health-tech-pwa |
| Stack | TypeScript · Next.js 15 (App Router) · Tailwind v4 · HeroUI · Hono · Zod v4 · Serwist |
| Design | Sandow UI Kit — Bulky, expansive UI, 100% Corner Smoothing. Font: Work Sans (Alt: Archivo). Colors: Bold Orange, Tech Blue, Dynamic Dark Gray, Black |
| Testing | Vitest · Playwright · Testing Library |
| Deployment | local |

All agents should use this project context when making decisions about code style, tooling, and architecture.

## Development Standards

Write simple, readable code. Use early returns. Minimal diffs — change only what the task requires. DRY principle. Prefix event handlers with 'handle'. Document public functions with JSDoc. TypeScript strict mode — no `any`, no `@ts-ignore` without explanation.

## Context Router

Before responding, check if the request matches an existing rule, skill, or agent. Suggest the match to the user. Never mention the router when no match is found.

## Agent Collective

| Agent | Role | Invoke |
|-------|------|--------|
| Developer | Full-Stack Developer | `/dev <task>` |
| Designer | UI/UX & Design System | `@designer <task>` |
| Architect | System Architect | `@architect <task>` |
| Reviewer | Code Reviewer / Security Analyst | `@reviewer <task>` |
| Director | Orchestrator | `@director <task>` |
| Researcher | Explorer / Researcher | `@researcher <task>` |
| Ops | Operator / Automation | `@ops <task>` |

## Available Skills

| Skill | Owner Agent | Trigger Keywords |
|-------|-------------|------------------|
| Smart Dev Agent | developer | implement, build, fix, debug, optimize, refactor |
| Design Quality | developer | audit UI, normalize, polish, critique, distill, harden, design quality |

## Slash Commands

| Command | Agent | Description |
|---------|-------|-------------|
| `/dev` | developer | Invoke Developer agent |

## Session Protocol

**At the start of every session, the active agent must:**
1. Read `_memory/rna-method/timeline.json` — note the current phase, last decisions, open questions.
2. Read `_memory/rna-method/receptors.json` — identify active signal routes for this agent.
3. Announce: "I am [Agent Name]. I see [N] active signals. [Summary or 'queue is clear.']"

**At the end of every session:**
1. Archive key decisions to `_memory/agents/<id>/YYYY-MM-DD_<task-slug>_session.md`.
2. Update `knownDecisions[]` and `openQuestions[]` in `timeline.json`.
3. Record the exact stopping point if work is incomplete.
