# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio based on the Tailwind Plus "Spotlight" template, migrated from Next.js to **Astro 7** (static output) + React 19 islands + Tailwind CSS v4, written in TypeScript. Content is Hernán Arica's real portfolio, in Spanish (`lang="es"`), sourced from his CV and GitHub profile. Routes live in `src/pages/`: `/`, `/about`, `/projects`, `/services` (freelance services, process, quote builder that opens WhatsApp/email, and an inline Cal.com booking embed at `#agendar` via `src/components/BookCall.tsx` — content in `src/components/Services.tsx`; the Cal link lives in `site.links` in `src/lib/site.ts`), `/stack`, `/cv` (ATS-friendly one-column CV outside the site shell, data in `src/lib/resume.ts`, which also feeds the home "Experiencia" card), `/404`. There are no articles/RSS (removed in the migration; re-add with content collections + `@astrojs/rss` when needed).

Pages are thin `.astro` files that reuse React components (`src/components/*.tsx`). A React component rendered without a `client:*` directive is static HTML with zero JS. Only these hydrate: `Header` (`client:load`, from `src/layouts/SiteLayout.astro`, receives `pathname` and the processed avatar `src` as props), `Services` and `StackShowcase` (`client:load`). `/about` and `/projects` are written directly in `.astro` to use `<Image>` from `astro:assets` (WebP + srcset); `Home` stays in `src/components/Home.tsx`.

Layouts: `src/layouts/BaseLayout.astro` (head: meta, canonical, OG/Twitter, robots, theme-color, Person JSON-LD, inline theme script; `head` named slot) and `src/layouts/SiteLayout.astro` (site shell: page background, Safari edge strips, Header, Footer, Lenis, reveal script; title becomes `"<title> - Hernán"`).

SEO: `siteUrl` in `src/lib/site.ts` is `import.meta.env.SITE`, set in `astro.config.mjs` from `PUBLIC_SITE_URL`, else Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, else the production domain — OG images need an absolute public URL. Pages pass `title`/`description`/`path` to the layout. The share card is rendered at build time by `src/pages/opengraph-image.png.ts` → `src/libs/og-image.tsx` (satori + resvg, a replica of the dark-mode home hero using Inter TTFs from `assets/fonts/`, since satori can't read WOFF2). `sitemap.xml` and `robots.txt` are endpoints in `src/pages/` (keep the URLs: the sitemap is registered in Search Console). Icons live in `public/`.

Theme: no theme library. An inline blocking script in `BaseLayout` applies the `dark` class on `<html>` before first paint, stores the theme in `localStorage` only when it differs from the OS (otherwise it follows the system), and copies `--edge` (`src/styles/tailwind.css`) into the `theme-color` metas. Islands read/change the theme via `src/libs/theme.ts` (`useResolvedTheme`, `setTheme`); the `<html>` class is the source of truth.

Animation: `motion`. Static pages use `Reveal`/`Stagger`/`StaggerItem` from `src/components/Reveal.tsx` (they only add data attributes) animated by `src/libs/reveal.ts` (vanilla `inView` + `animate`); initial hidden state is in `tailwind.css` under `prefers-reduced-motion: no-preference`. Islands keep using the React versions in `src/components/Motion.tsx` (`Stagger`, `StaggerItem`, `SpotlightCard`) and wrap themselves in `MotionConfig reducedMotion="user"`. The scroll progress bar and the home avatar shrink are CSS scroll-driven animations. Smooth scrolling uses vanilla Lenis in `SiteLayout` (off with reduced motion); in-page anchors are handled by Lenis and honor `scroll-mt-*`, so don't add an extra offset.

Icons: `lucide-react` for all static icons; brand logos via `simple-icons` in `src/components/SocialIcons.tsx` (LinkedIn path is inline — simple-icons dropped it). The theme toggle in `Header.tsx` uses `MorphIcon` from `morphicons/react` fed with icon _data_ from the vanilla `lucide` package (keep `lucide` and `lucide-react` versions aligned).

## Commands

Dependencies are installed with **pnpm** (`pnpm-workspace.yaml`, which also holds the Vite+ `overrides` that alias `vite` to `@voidzero-dev/vite-plus-core` for the whole tree, Astro included); a stale `package-lock.json` from the template also exists — don't mix managers.

```bash
pnpm install
pnpm vp run dev       # astro dev at http://localhost:4321
pnpm vp run build     # astro build to dist/ (cached by Vite+; env PUBLIC_SITE_URL/VERCEL_PROJECT_PRODUCTION_URL are part of the cache key)
pnpm vp run preview   # serve the production build (astro preview)
pnpm vp run cv [url]  # export /cv to public/hernan-arica-cv.pdf (needs the site running; default http://localhost:4321/cv)
pnpm vp check         # format check (Oxfmt) + lint (Oxlint) + type-check (tsgolint) — run before committing
pnpm vp check --fix   # same, fixing formatting and fixable lint issues
pnpm vp lint          # Oxlint only
pnpm vp fmt           # Oxfmt only (single quotes, no semicolons, width 80, .astro + Tailwind class sorting)
```

`pnpm vp …` runs the local Vite+ CLI; with the global CLI installed it's just `vp …`. There are no `package.json` scripts: tasks live in `run.tasks` in `vite.config.ts` (a task can't share a name with a script).

There is no test suite.

`.env.local` may set `PUBLIC_SITE_URL` (see `.env.example`) to override the site URL locally.

## Architecture

- **Config**: `astro.config.mjs` — `site`, `@astrojs/react`, Tailwind via `@tailwindcss/vite`, and the Fonts API (Inter from Google, only used by `/cv` through `<Font slot="head" />`).
- **Styling**: Tailwind v4 configured in CSS (`src/styles/tailwind.css`: `@theme` font-size scale, `dark` custom variant on `.dark`, `--edge`, scroll-driven animations). Shared UI primitives are in `src/components/` (`Container`, `Card`, `SimpleLayout`, `Button`, etc.); links are plain `<a>`.
- Path alias `@/*` → `src/*`.
- **Tooling**: Vite+ (`vite-plus`), configured in `vite.config.ts` — `lint` (Oxlint with `eslint`, `typescript`, `unicorn`, `oxc`, `react` plugins; type-aware + type-check), `fmt` (Oxfmt; `.astro` needs `@astrojs/compiler-rs`), `run.tasks` and `staged` (`vp check --fix` on staged files). Astro does not read `vite.config.ts`. Oxlint only lints `<script>` blocks of `.astro` files and type-check doesn't cover `.astro` templates. `react/purity` is off because components render once at build time.

## Notes

- Files ending in `:Zone.Identifier` are Windows/WSL download metadata artifacts, not project files; ignore them.
