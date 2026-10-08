# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio built on the Tailwind Plus "Spotlight" template: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + MDX, written in TypeScript. Much of the content (name "Spencer Sharp", Planetaria, sample articles, logos, photos) is still template placeholder text meant to be replaced with the owner's own.

## Commands

Dependencies are installed with **pnpm** (`node_modules/.pnpm`, `pnpm-workspace.yaml`); a stale `package-lock.json` from the template also exists — don't mix managers.

```bash
pnpm install
pnpm dev      # dev server at http://localhost:3000
pnpm build    # production build (also type-checks)
pnpm start    # serve the production build
pnpm lint     # eslint (eslint-config-next core-web-vitals)
pnpm exec prettier --write .   # format (single quotes, no semicolons, tailwind class sorting)
```

There is no test suite.

Requires `.env.local` with `NEXT_PUBLIC_SITE_URL` (see `.env.example`); the RSS feed route throws without it and the root layout uses it for the feed `<link>`.

## Architecture

- **Routing**: `src/app/` App Router. `next.config.mjs` adds `mdx` to `pageExtensions`, so `page.mdx` files are routes. MDX is processed with `remark-gfm` and `@mapbox/rehype-prism` (styles in `src/styles/prism.css`). `mdx-components.tsx` exposes `next/image` as `<Image>` inside MDX.
- **Articles**: each article is `src/app/articles/<slug>/page.mdx` and must `export const article = { author, date, title, description }`, export `metadata`, and default-export a wrapper rendering `<ArticleLayout article={article} {...props} />`. Co-located images are imported directly in the MDX.
  - `src/lib/articles.ts` (`getAllArticles`) discovers articles by globbing `*/page.mdx` and dynamically importing each to read the `article` export; it powers the home page and `/articles` list (sorted newest first).
  - `src/app/feed.xml/route.ts` builds the RSS feed differently: it enumerates articles via webpack `require.context`, then **fetches each rendered article page over HTTP** and scrapes it with cheerio (`<article>` → `h1`, `time[datetime]`, `[data-mdx-content]`). Changing `ArticleLayout`/`Prose` markup can break the feed. Feed author info is hardcoded there.
- **Layout shell**: `src/app/layout.tsx` sets site-wide metadata (title template) and wraps everything in `Providers` → `Layout` (Header + main + Footer). `Providers` holds `next-themes` (class-based dark mode, with a watcher that resets to `system` when the chosen theme matches the OS) and an `AppContext` exposing `previousPathname`, which `ArticleLayout` uses for its "back" button.
- **Styling**: Tailwind v4 configured in CSS (`src/styles/tailwind.css`: `@theme` font-size scale, `dark` custom variant on `.dark`). Prose/typography customization lives in the root `typography.ts`, loaded via `@config`. Shared UI primitives are in `src/components/` (`Container`, `Card`, `SimpleLayout`, `Section`, `Prose`, etc.).
- Path alias `@/*` → `src/*`.

## Notes

- Files ending in `:Zone.Identifier` are Windows/WSL download metadata artifacts, not project files; ignore them.
