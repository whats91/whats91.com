# Whats91 — Current UI Audit

> Snapshot taken 2026-07-18, before the UI-foundation work. Read together with
> `design.md` (the pre-existing structural reference) and
> `WHATS91_DESIGN_SYSTEM.md` (the new master guideline).

## 1. Technology and CSS architecture

| Area | Finding |
| --- | --- |
| Framework | Next.js 16 App Router, TypeScript 5, React 19 |
| Styling | Tailwind CSS **v4** (CSS-first `@theme inline` in `src/app/globals.css`) + shadcn/ui (new-york, `src/components/ui`) |
| Fonts | Inter via `next/font` (`--font-inter`); `--font-geist-mono` referenced but **no Geist Mono font is loaded** — mono text falls back to system mono |
| Icons | lucide-react everywhere (consistent — keep) |
| Animation | tw-animate-css import + a few custom keyframes; framer-motion installed but only used in isolated animated demo components |
| Dark mode | `.dark` tokens exist, `next-themes` installed, but no ThemeProvider is mounted — site is light-only in practice |
| Routes | 49 `page.tsx` routes; sitemap is an explicit list in `src/app/sitemap.ts` |

### Structural debt

- **`tailwind.config.ts` is dead configuration.** Tailwind v4 via `@tailwindcss/postcss`
  only loads a JS config when `@config` is present in CSS — it is not. The file
  maps colors to `hsl(var(--…))` while the real tokens are hex, so it is both
  unused and misleading. Recommendation: delete in a later cleanup batch (kept
  for now to avoid touching build inputs during the foundation phase).
- `temp/` contains a full copy of the repo (including `.git`) and `deploy.log`
  (450 KB) sits in the root. Not UI issues, but they slow tooling scans.

## 2. Broken token wiring (fixed in this phase)

The most consequential finding: several custom color utilities used across the
site were **never registered** in the Tailwind v4 `@theme` block, so the
classes generated no CSS at all:

| Class | Usages | Effect before fix |
| --- | --- | --- |
| `text-text-muted` | **402** | Rendered at full-contrast `#0F172A` (inherited), not the intended `#64748B` — captions and metadata looked identical to body text |
| `bg-brand-primary-light` | 9 | Transparent background (badges relied on border only) |
| `bg-surface-subtle`, `border-border-subtle`, `bg-brand-primary-hover` | few | No effect |

**Fix applied:** all base tokens are now registered in `@theme inline`
(see `globals.css`). This visibly (and intentionally) lightens muted text
site-wide to its designed value.

## 3. Design inconsistencies

- **687 `bg-white`** instances instead of `bg-card`/`bg-background`. Blocks any
  future dark theme and bypasses tokens.
- **~700 raw Tailwind palette colors** (`text-green-600`, `bg-blue-50`,
  `text-purple-600`, `text-amber-700`, …). Category/status colors are ad hoc
  per page — the same "success" concept appears as green-500/600/700/800.
  The new status tokens (`success`/`warning`/`error`/`info`) replace this.
- **213 inline `max-w-[1200px]`** container compositions, plus stray
  `max-w-[900px]`, `max-w-[1000px]`, `max-w-[1100px]` variants. The
  `.container-landing` class existed but had **zero usages**.
- **~150 arbitrary tiny text sizes** (`text-[8px]`–`text-[11px]`), mostly in
  mock-UI visuals but some in real UI copy. 8–10 px text fails accessibility;
  12 px (`text-caption`) is the floor for real content.
- **Radius drift**: cards use `rounded-md`, `lg`, `xl`, `2xl`, `3xl`
  interchangeably with no rule.
- **Dead utility classes** in `globals.css` with zero usages:
  `.container-landing`, `.card-modern`, `.card-elevated`, `.glass-subtle`,
  `.btn-modern`, `.focus-modern`, `.badge-modern`. Candidates for removal in
  the final cleanup batch (left in place for now — removal is a no-risk
  follow-up once confirmed unused again after migration).
- Heading scale is re-composed by hand on every page
  (`text-3xl sm:text-4xl md:text-5xl` etc.) with slight variations.

## 4. Responsiveness

Overall responsive behavior is competent (mobile menus, stacking, mobile card
alternatives to tables). Issues found:

- Tablet (768–1023 px) is mostly "stretched mobile": two-column heroes only
  activate at `lg`, leaving wide single columns with very long line lengths.
- The cookie-consent banner covers roughly half the phone viewport on first
  visit and pushes the primary CTA out of view.
- Mock-UI visuals with fixed tiny text don't scale down gracefully below
  ~360 px.

## 5. Accessibility

- No global `prefers-reduced-motion` handling; `animate-ping`/`animate-pulse`
  run unconditionally. **Fixed in foundation** (global reduced-motion rule).
- No consistent global `:focus-visible` treatment (shadcn components had
  rings; plain links/anchors did not). **Fixed in foundation.**
- 8–10 px text in visuals (see above).
- Homepage hero CTAs ("Request Consultation", "View Documentation") are
  `<Button>` elements **with no href or onClick — they do nothing**. This is
  both a conversion and accessibility bug. Fix during homepage migration with
  `PrimaryCTA`/`SecondaryCTA`.
- Icon-only elements largely lack `aria-hidden`/labels; decorative icons
  should be `aria-hidden="true"` (the new shared components do this).
- Heading hierarchy is generally sound (`h1` → `h2` → `h3`), keep it.

## 6. Performance

- Inter loads correctly via `next/font` (self-hosted, no FOUT issue).
- `Footer` fetches `/api/version` client-side on every page → extra request +
  re-render; makes the footer a client component. Recommendation: read
  `version.txt` server-side or inline at build.
- React hydration mismatch warnings from Radix `id` generation
  (`aria-controls` differs server/client) appear in dev on every page. Mostly
  benign, but worth resolving during header migration (Radix + React 19 id
  issue; upgrading Radix or rendering the menu after mount fixes it).
- 39 of 49 pages are `"use client"`, so nearly every page ships its full
  component tree as JS. Migrating pages to server components with small client
  islands (FAQ accordion, tabs) is a per-page migration goal.
- No image-heavy pages today (most visuals are DOM mockups) — keep budgets in
  mind when the Visual Asset Guide's imagery is added.

## 7. What to retain vs. refactor vs. replace

**Retain (already good):**
- shadcn/ui components in `src/components/ui` (do not modify — house rule)
- Header/Footer information architecture and mobile Sheet menu
- Brand green `#448C74` identity, Inter, lucide icons
- Section alternation rhythm (white ↔ `bg-surface/50`)
- JSON-LD/SEO helper system (`src/lib/seo`), blog registry system
- Animated solution demos (`AnimatedChatbot`, `GoogleSheetAnimation`, …)

**Refactor gradually (per-page migration):**
- Replace inline container/heading/CTA compositions with shared primitives
  (`Container`, `Section`, `SectionHeader`, `CTAGroup`, …)
- Replace raw palette colors with semantic status tokens
- Replace `bg-white` with `bg-card`
- Convert client pages to server components with client islands

**Replace (during relevant batch):**
- Dead utility classes in globals.css (final cleanup batch)
- `tailwind.config.ts` (delete in final cleanup batch)
- Footer version fetch (server-side read)

## 8. High-risk global styles

- `* { @apply border-border … }` — global border color reset; safe today but
  any change to `--border` affects every element.
- `html { scroll-behavior: smooth }` — now correctly disabled under reduced
  motion.
- The `@theme inline` registrations added in this phase change `text-text-muted`
  rendering on ~400 spots (intended, verified visually).

## 9. Screens needing special attention during migration

- **Homepage hero** — dead CTA buttons (see §5).
- **Pricing** — dense tables need the wide container + `overflow-x-auto`
  pattern; mobile card fallbacks already exist, keep them.
- **Blog index** — heavy client page with search/filter state; keep as client
  island but move hero/static shell to server.
- **Solution pages with animated demos** — keep demos; wrap in the new
  Section/Container primitives without touching animation internals.
- **Free tools** (QR generator, calculators) — real functionality; migrate
  visuals only, never touch the tool logic.
