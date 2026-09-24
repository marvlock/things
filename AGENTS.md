# Things contributor guide

## Project

Things is a Next.js App Router documentation site and shadcn-compatible component registry. The site is published at `https://things.marvlock.com`; its public registry is served from `public/registry`.

## Commands

Run commands from this directory:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

`npm run check` is required after changes to shared UI primitives, Tailwind configuration, metadata routes, or the registry.

## Architecture

- `app/components/ui/`: reusable primitives. Maintain public APIs, semantic HTML, keyboard support, focus behavior, and ARIA relationships.
- `app/docs/`: component documentation and examples. Keep examples aligned with exported APIs.
- `public/registry/ui/`: shadcn registry payloads. Update the matching payload when changing a distributable component.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, and `public/llms.txt`: machine-readable site discovery. Keep canonical URLs on `https://things.marvlock.com`.

## Conventions

- TypeScript first; avoid `any` and preserve controlled/uncontrolled component behavior.
- Use the shared `cn` helper for composed Tailwind classes and the shared `Button` primitive for button styling where appropriate.
- Use semantic native elements before ARIA. For composite widgets, follow the relevant WAI-ARIA Authoring Practices keyboard and relationship requirements.
- Keep client boundaries deliberate: add `"use client"` only for components that use browser APIs, state, effects, or event handlers.
- Do not hand-edit build output (`.next`) or dependencies (`node_modules`).
- Do not add secrets, tracking identifiers, or external network calls without explicit approval.
