# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (Turbo mode)
npm run dev

# Build
npm run build

# Lint
npm run lint

# Clean dev (wipes .next before starting)
npm run dev:clean
```

Do NOT run the dev server or build — the user runs these separately.

## Architecture

**Next.js 14 App Router** portfolio site with React 19, TypeScript 5, Tailwind CSS v4, GSAP, and Three.js.

### Data flow

All project data lives in `lib/projects.ts` — the `Project` interface and `projects` array are the single source of truth for the home page list and all detail pages. When adding a new project, add it here first.

### Pages

- `app/page.tsx` — Home: renders `ProjectCard` list, `FilmFlash` hover effect, and `GridBackground` (Three.js, loaded dynamically with SSR disabled).
- `app/qxenith/page.tsx` — Project detail for QXENITH (hardcoded, not a dynamic route).
- `app/koenigsegg-cc850/page.tsx` — Project detail for Koenigsegg CC850 (hardcoded).

Project detail pages are **not** using `[slug]` dynamic routing — each project has its own file under `app/`.

### Key components

- `GridBackground` — Three.js + postprocessing WebGL canvas with ripple/liquid/diamond grid shader. Always loaded with `dynamic(..., { ssr: false })` because it requires `window`.
- `FilmFlash` — Fixed-position overlay that fans out project screenshots when a `ProjectCard` is hovered. Uses `animKey` to force CSS animation replay on repeated hovers.
- `ProjectCard` — Link with a `useDecryptEffect` hook that scrambles and reveals the project name on hover.
- `components/ui/` — shadcn/ui components (Radix UI primitives + Tailwind). Do not hand-edit these; use the shadcn CLI to add/update.

### Styling

- Dark-only (`<html class="dark">`). Background base color: `#0f0c0a`.
- Each project has its own `accent` and `accentDim` hex color used throughout its detail page for borders, badges, and highlights.
- Tailwind CSS v4 (PostCSS plugin). Config is in `postcss.config.mjs`, not a separate `tailwind.config`.

### TypeScript

`ignoreBuildErrors: true` is set in `next.config.mjs` — type errors won't block builds but should still be fixed.

### Images

Project screenshots go in `public/<slug>/`. The `images` field on `Project` is used for home-page hover previews (`FilmFlash`); `promos` is used for the detail page gallery.
