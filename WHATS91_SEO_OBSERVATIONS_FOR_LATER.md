# Whats91 — SEO Observations for a Later Phase

> Recorded during the UI-foundation audit (2026-07-18). **Do not act on these
> during the UI phase** except where a UI migration would otherwise cause a
> regression. No URL, metadata, canonical, redirect or schema changes were
> made in the UI phase.

## High impact

1. **39 of 49 pages are `"use client"`**, so most solution/feature pages
   cannot export `metadata` — they inherit the root layout's generic
   title/description. The pricing/solution pages that *do* rank rely on
   content alone. The page-migration process (server component + client
   islands) fixes this structurally; the actual per-page titles/descriptions
   should be written in the SEO phase using `generatePageMetadata`.
2. **Homepage hero CTAs are dead buttons** (no links) — crawlers and users
   get no path from the hero. Fixed as part of the Batch 2 UI migration
   (also a conversion issue, so it is allowed in the UI phase).
3. **Muted-text utility was broken** (`text-text-muted` inert). Now fixed;
   re-check contrast-related soft-404/quality signals after rollout.

## Medium impact

4. `metadataBase`/canonical is set globally to `https://whats91.com` with
   per-page canonicals only where `generatePageMetadata` is used — audit
   canonical coverage per route in the SEO phase.
5. Blog tag links point to `/blog?tag=…` but the blog index ignores query
   params — links work but don't filter. Decide: implement param handling or
   change link targets.
6. Markdown twins (`/api/md/*`) are listed in the sitemap; verify this is
   intentional (they serve `text/markdown` — some engines may flag
   duplicate content without canonical headers).
7. Footer renders link groups client-side; ensure server rendering after
   Batch 1 so all internal links are in initial HTML (they currently are via
   SSR, but the version fetch forces hydration churn).
8. Several long pages hide desktop tables behind `hidden md:block` +
   duplicate mobile cards — duplicated text content in the DOM. Harmless,
   but consolidate where possible during migration.

## Low impact / hygiene

9. `--font-geist-mono` referenced but not loaded (falls back silently) —
   cosmetic; resolved by policy "system mono stack" in the design system.
10. Some images/OG assets are generic (`/logo.svg` used as favicon and OG
    fallback); per-page OG images are specced in the Visual Asset Guide.
11. Heading hierarchy is generally correct; keep verifying per page during
    migration (migration guide includes the check).
12. Layout shift: cookie banner and footer version fetch cause minor CLS on
    slow connections; both addressed in Batch 1.
13. `robots`: `/design-system` (new, internal) is `noindex` and excluded
    from the sitemap — keep it that way.
14. Structured data (Organization, FAQ, Breadcrumb, Article) is solid —
    no changes needed; just preserve it during migrations.
