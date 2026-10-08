# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio built on the Tailwind Plus "Spotlight" template: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + MDX, written in TypeScript. Content is Hernán Arica's real portfolio, in Spanish (`lang="es"`), sourced from his CV and GitHub profile. Site pages live in the `src/app/(site)/` route group (its layout renders Header/Footer). Routes: `/`, `/about`, `/projects`, `/services` (freelance services, process, quote builder that opens WhatsApp/email, and an inline Cal.com booking embed at `#agendar` via `src/components/BookCall.tsx` — content in `src/components/Services.tsx`; the Cal link lives in `site.links` in `src/lib/site.ts`), `/stack`, `/cv` (ATS-friendly one-column CV outside the site shell, data in `src/lib/resume.ts`, which also feeds the home "Experiencia" card); `/articles` + RSS still exist but are hidden from nav with no articles yet.

SEO: site constants and `siteUrl` live in `src/lib/site.ts`; pages export `metadata = pageMetadata({ title, description, path })`, which sets canonical + OG/Twitter and must reference `/opengraph-image` explicitly (a page-level `openGraph` drops the file-based image). Root layout adds `metadataBase`, robots and a Person JSON-LD. `src/app/opengraph-image.tsx` renders the share card as a replica of the dark-mode home hero (avatar, freelance badge, headline), using Inter TTFs from `assets/fonts/` (ImageResponse can't read WOFF2); `icon.png`, `apple-icon.png`, `favicon.ico`, `sitemap.ts`, `robots.ts` live in `src/app/`. `siteUrl` uses `NEXT_PUBLIC_SITE_URL`, else Vercel's `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`, else localhost — OG images need an absolute public URL or link previews show no image.

Animation: `motion` (motion.dev, import from `motion/react`). Reusable client primitives in `src/components/Motion.tsx` (`Reveal`, `Stagger`/`StaggerItem`, `SpotlightCard`, `ScrollProgress`); they can be used inside server components. `Providers` wraps the app in `MotionConfig reducedMotion="user"`. The Stack page content lives in the client component `src/components/StackShowcase.tsx` (data + bento grid + logo marquee).

Icons: `lucide-react` for all static icons; brand logos via `simple-icons` in `src/components/SocialIcons.tsx` (LinkedIn path is inline — simple-icons dropped it). The theme toggle in `Header.tsx` uses `MorphIcon` from `morphicons/react` fed with icon *data* from the vanilla `lucide` package (keep `lucide` and `lucide-react` versions aligned).

## Commands

Dependencies are installed with **pnpm** (`node_modules/.pnpm`, `pnpm-workspace.yaml`); a stale `package-lock.json` from the template also exists — don't mix managers.

```bash
pnpm install
pnpm dev      # dev server at http://localhost:3000
pnpm build    # production build (also type-checks)
pnpm start    # serve the production build
pnpm cv [url] # export /cv to public/hernan-arica-cv.pdf (needs the site running; default http://localhost:3000/cv)
pnpm lint     # eslint (eslint-config-next core-web-vitals)
pnpm exec prettier --write .   # format (single quotes, no semicolons, tailwind class sorting)
```

There is no test suite.

`.env.local` may set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to override the site URL locally.

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
