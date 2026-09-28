# Whats91.com — SEO Changelog (2026-07-19)

> Every change made in the SEO implementation pass. The repository is **not a
> git repository**, so this file is the authoritative change record; each entry
> includes exact rollback guidance. No commits, pushes, or deploys were made.
> Validation summary at the bottom.

Legend — Risk: **Low** = metadata/schema only, no runtime behaviour change ·
**Med** = touches rendered DOM or HTTP headers.

---

## 1. `src/app/layout.tsx` — remove inherited homepage canonical; add OG image
- **Previous**: `alternates.canonical: "https://whats91.com"` in root-layout metadata → inherited by every page without own metadata (dozens of pages canonicalized to the homepage). `openGraph`/`twitter` had no images.
- **New**: canonical removed from the root layout (comment explains why); `openGraph.images` + `twitter.images` → `/og-image.png` (1200×630).
- **Reason**: audit finding T1 (P0) — mass canonical-to-homepage; M1 — no share image.
- **SEO impact**: unblocks indexing of every non-homepage page; social shares get a preview image.
- **Risk**: Low. | **Validation**: 49/49 route crawl — every route now emits exactly one self-referencing canonical; homepage `og:image`/`twitter:image` present.
- **Rollback**: re-add `alternates: { canonical: "https://whats91.com" }` and remove the two `images` entries.

## 2. `src/app/page.tsx` — homepage owns its canonical; schema dedupe; FAQ single markup
- **Previous**: no metadata export (inherited root). Page JSON-LD included a second `Product` (price "0", InStock), a second `Service`, a single-item `BreadcrumbList`, a standalone root-level `SpeakableSpecification`, and a `Product`-typed mention; the visible FAQ carried microdata (`itemScope/itemProp`) duplicating the JSON-LD `FAQPage`.
- **New**: `export const metadata` with `canonical: "https://whats91.com"`. Removed: homepage Product, homepage Service, single-item breadcrumb, standalone SpeakableSpecification (the `speakable` *property* inside WebPage remains), FAQ microdata attributes (JSON-LD FAQPage kept). Mention retyped `Product`→`Thing`.
- **Reason**: S1/S4/S5/S8/S6 (P1) — duplicate/invalid/misleading structured data.
- **SEO impact**: homepage schema census now: 1 Organization, 1 WebSite, 1 SoftwareApplication (+2 mention refs), 1 WebPage, 1 FAQPage, 1 Service, 0 Product, 0 SearchAction; FAQ marked up once.
- **Risk**: Med (DOM attrs removed from FAQ cards). | **Validation**: visual + DOM check — 6 FAQ cards render identically, 0 microdata attrs; census verified.
- **Rollback**: restore the removed schema objects and `itemScope/itemProp/itemType` attributes from this entry's Previous description (full shapes in git-less backup: see audit §8 for structure) — or re-run the batch reports' pre-change file if archived.

## 3. `src/lib/seo/config.ts` — remove placeholder verification + broken SearchAction
- **Previous**: every `generatePageMetadata()` page emitted `<meta name="google-site-verification" content="google-site-verification-code">` (literal placeholder). `generateWebSiteSchema()` emitted a SearchAction to `/search?q=` — a route that 404s.
- **New**: `verification` block deleted; SearchAction removed (comment documents why).
- **Reason**: M3, S3 (P1).
- **SEO impact**: removes junk meta sitewide; no invalid SearchAction target.
- **Risk**: Low. | **Validation**: grep across rendered pages → 0 occurrences.
- **Rollback**: re-add the `verification` object and the `potentialAction` block.

## 4. `src/components/seo/JsonLD.tsx` — sitewide graph cleanup
- **Previous**: sitewide `@graph` (rendered on every page) contained a `Product` entity (price "0", InStock), `award: "Official Meta Business Solution Provider"`, and a `SearchAction` → `/blog?search=` (blog ignores the param). Unused exports `SoftwareApplicationJsonLD` (offers price "0", "Free trial available") and `WebSiteJsonLD` (SearchAction → `/search?q=`).
- **New**: Product entity removed; `award` removed; both SearchActions removed; SoftwareApplication `offers` (price "0") removed from graph + helper.
- **Reason**: S1/S2/S3 (P1); claim policy — BSP status is unverified and `award` is the wrong property for it regardless. **Visible page copy was not changed**; this is a machine-readable-assertion removal, documented per the claim rules.
- **SEO impact**: eliminates misleading Product/price markup on all ~50 pages; removes unverifiable partnership assertion from structured data; removes non-functional SearchAction.
- **Risk**: Low. | **Validation**: homepage census — 0 Product, 0 SearchAction, 0 award.
- **Rollback**: restore the removed blocks (shapes documented in audit §8/§10).

## 5. `src/lib/seo/seo2.ts` — align dormant entity definitions
- **Previous**: unused (zero imports) but exported `entityDefinitions` carried `award` BSP claim, `numberOfEmployees` 10–50 (unverifiable), SearchAction → `/blog?q=`, `foundingDate: "2023"` (conflicts with 2024 in JsonLD.tsx).
- **New**: award/numberOfEmployees/SearchAction removed; foundingDate aligned to "2024" (owner to confirm — flagged in plan §11).
- **Reason**: dead code with invalid assertions could be re-imported later; S7.
- **Risk**: Low (module is unused). | **Validation**: `tsc` + build pass.
- **Rollback**: restore removed fields.

## 6. `src/app/sitemap.ts` — canonical-HTML-only sitemap
- **Previous**: included 21 `/api/md/*` + `/api/mcp*` entries (`/api/mcp` twice), `/llms.txt`, `/feed.xml`, per-post markdown twins; `/refund` missing; every static page stamped `lastModified = build time`.
- **New**: only canonical, indexable HTML pages (52 URLs); `/refund` added; duplicates gone; static pages carry no `lastModified` (blog posts/authors keep real content dates). Header comment documents the policy.
- **Reason**: T3 (P0), T4 (P1), T7.
- **SEO impact**: sitemap no longer contradicts robots.txt; no non-HTML URLs presented for indexing; lastmod signals become trustworthy.
- **Risk**: Low. | **Validation**: rendered sitemap.xml → 0 api/llms/feed entries, refund present, 52 locs, 0 duplicate locs.
- **Rollback**: restore previous entry blocks (the removed sections are reproducible from this description; markdown twins remain discoverable via `/llms.txt`).

## 7. `src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx` — fix broken links
- **Previous**: two `<Link href="/solutions/busy-whatsapp-integration">` → 404.
- **New**: both point to `/solutions/busy-erp` (200).
- **Reason**: internal-link audit (P0-adjacent).
- **Risk**: Low. | **Validation**: rendered page contains 0 old hrefs; target returns 200.
- **Rollback**: sed the href back (not recommended — old target 404s).

## 8. `src/app/api/md/[slug]/route.ts` — canonical header for markdown twins
- **Previous**: `X-Robots-Tag: index, follow` on `text/markdown` responses with no canonical → indexable duplicates of their HTML pages.
- **New**: `Link: <html-page-url>; rel="canonical"` header (uses the twin's own `page.url`); X-Robots-Tag removed. Content unchanged; AI agents unaffected.
- **Reason**: T5 (P1).
- **Risk**: Med (HTTP header change). | **Validation**: `curl -I /api/md/busy-erp` → `link: <https://whats91.com/solutions/busy-erp>; rel="canonical"`; body unchanged.
- **Rollback**: swap the `Link` header back to `"X-Robots-Tag": "index, follow"`.

## 9. `src/app/api/mcp/route.ts` + `src/app/api/mcp/pages/[slug]/route.ts` — noindex JSON endpoints
- **Previous**: no robots directive on MCP JSON responses.
- **New**: `X-Robots-Tag: noindex` on both GET responses (still fetchable by agents; CORS unchanged).
- **Reason**: T6 (P1) — machine capability docs are not search results.
- **Risk**: Low. | **Validation**: `curl -I /api/mcp` → `x-robots-tag: noindex`.
- **Rollback**: remove the header lines.

## 10. `public/robots.txt` — open agent endpoints explicitly
- **Previous**: `Disallow: /api/` in the GPTBot and `*` groups blocked `/api/md/*` and `/api/mcp` — the endpoints built for AI agents (GPTBot explicitly blocked from its own target content).
- **New**: `Allow: /api/md/` + `Allow: /api/mcp` added to both groups before the `/api/` disallow (longest-match wins). Comments document intent. Everything else (admin/dashboard/_next disallows, sitemap declarations) unchanged.
- **Reason**: T8 — robots must match the site's own GEO strategy; safe now that twins carry canonical headers and MCP is noindexed.
- **Risk**: Low. | **Validation**: served robots.txt shows the new lines in both groups.
- **Rollback**: delete the four added `Allow:` lines + comments.

## 11. `public/og-image.png` — NEW file (1200×630, ~58 KB)
- **Previous**: referenced sitewide (`config.ts`, schema, now root layout) but **did not exist** — 404 on production.
- **New**: brand-consistent PNG (dark navy `#0F172A`, brand green `#448C74`, logo mark, "WhatsApp Cloud API Platform for Indian Business", domain). Generated with the project's own `sharp` (generator script kept out of the repo; regeneration recipe = SVG→sharp→png documented in plan §3 "Per-page OG images").
- **Reason**: M1 (P0).
- **Risk**: Low (new static asset). | **Validation**: `GET /og-image.png` → 200 `image/png` 1200×630; renders correctly (visually reviewed).
- **Rollback**: delete the file (and the layout references from entry 1).

## 12. `src/lib/blog/metadata.ts` — NEW helper
- **New**: `generateBlogPostMetadata(slug)` builds title/description/keywords/author/canonical/`og:type=article` (+published/modified times, tags) from the existing blog registry. Throws on unknown slug (fail-loud in dev/build).
- **Reason**: T2 (P0) support; single source of truth — registry SEO data was previously unused by post routes.
- **Risk**: Low. | **Rollback**: delete file with the 9 layouts below.

## 13. Blog post `layout.tsx` — 9 NEW files (one per client-component post)
`busy-accounting-whatsapp-integration-benefits`, `busy-erp-google-sheets-integration-complete-guide`, `whatsapp-cloud-api-complete-guide-2026`, `whatsapp-cloud-api-restrictions-coexistence-framework-2026`, `whatsapp-graph-api-v24-to-v25-transition-guide`, `whatsapp-plus-launch-2026-premium-subscription-guide`, `whatsapp-username-system-2026-complete-guide`, `whatsapp-web-6-hour-logout-rule-india-2026`, `whatsapp-web-6-hour-logout-unofficial-api-migration-guide`
- **Previous**: posts are `"use client"` pages exporting no metadata → all inherited the blog-index title/description and `canonical → /blog` from `blog/layout.tsx`.
- **New**: each directory has a thin server layout: `export const metadata = generateBlogPostMetadata("<slug>")`; renders `children` untouched.
- **Reason**: T2 (P0) — 9 content pages were un-indexable as themselves.
- **SEO impact**: each post now has unique title/description, self-canonical, article OG with real dates, author attribution.
- **Risk**: Low (layouts render children unchanged). | **Validation**: crawled all 9 → unique titles + self-canonicals; `og:type=article` + `article:published_time` verified.
- **Rollback**: delete the 9 `layout.tsx` files (+ entry 12's helper).

## 14. Legal-page `layout.tsx` — 4 NEW files (`terms`, `privacy`, `refund`, `cookies`)
- **Previous**: client-component pages with no metadata → homepage title/description/canonical.
- **New**: thin server layouts with `generatePageMetadata` (accurate titles/descriptions; terms/privacy text reuses the descriptions already defined in `pageSeoConfigs`).
- **Reason**: M2 (P0).
- **Risk**: Low. | **Validation**: all 4 emit own title + self-canonical.
- **Rollback**: delete the 4 files.

## 15. Documentation — NEW: `WHATS91_SEO_AUDIT.md`, `WHATS91_SEO_IMPLEMENTATION_PLAN.md`, `WHATS91_SEO_CHANGELOG.md` (this file)

## 16. Deployment-verification fix (2026-07-19, second pass): og:image cascade on 11 pages
- **Found by**: production-mode re-validation (`scripts/seo-validation/crawl-sitemap.sh`) — the stricter per-route check surfaced that `/blog`, all 9 client blog posts, and `/authors` emitted **no `og:image`/`twitter:image`**. Cause: in Next.js, a child metadata `openGraph`/`twitter` object **replaces** the parent's wholesale, so any page defining its own OG block dropped the root layout's image. The blog-post case was a defect in entry 12/13's helper (this pass's own change); `/blog` and `/authors` never had one (pre-existing, exposed by the new per-route criterion).
- **Files**: `src/lib/blog/metadata.ts` (+`images` on openGraph & twitter), `src/app/blog/layout.tsx` (+`images`), `src/app/authors/page.tsx` (+`images`).
- **Risk**: Low (metadata only). | **Validation**: clean rebuild + full re-crawl → 52/52 pass incl. og:image; browser check confirms absolute `https://whats91.com/og-image.png` in meta.
- **Rollback**: remove the three added `images` entries.
- **Documentation correction**: the first-pass validation table row "Metadata verification — Pass" was accurate for what it measured (titles/descriptions/canonicals) but did not include a per-route og:image assertion; the reusable scripts below now enforce it.

## 17. NEW: `scripts/seo-validation/` — reusable deployment-gate checks
`crawl-sitemap.sh` (routes/canonicals/metadata/og/twitter/H1/title-uniqueness), `check-links.sh` (internal links), `check-schema.mjs` (JSON-LD parse + homepage entity policy + FAQ sync), `check-endpoints.sh` (robots policy, sitemap purity, md-twin canonical headers across all routing branches, MCP noindex/CORS, OG asset), `README.md` (usage). POSIX sh + Node built-ins only — no new dependencies. Each exits non-zero on failure so they can gate deploys.

---

## Validation summary (all executed on 2026-07-19)

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | **Pass w/ pre-existing**: same 3 errors as baseline (ecosystem.config.cjs, temp/examples) — 0 new |
| Type-check | `npx tsc --noEmit` | **Pass w/ pre-existing**: same pre-existing errors as baseline (webhooks/github, lib/redis, examples) — 0 new after build regenerated route types |
| Production build | `npx next build` | **Pass** (exit 0), all routes prerendered |
| Full build script | `npm run build` | **Not executed** end-to-end: its `cp .env` step cannot succeed on this machine (`.env` absent — pre-existing) |
| Unit/integration tests | — | **Not available** (no test suite exists) |
| Route validation | crawl of 49 routes | **Pass**: 49/49 status 200 |
| Canonical verification | crawl | **Pass**: exactly 1 self-referencing canonical per route |
| Metadata verification | crawl | **Pass**: unique titles sitewide (0 duplicates), unique descriptions on fixed pages |
| Sitemap validation | rendered `/sitemap.xml` | **Pass**: 52 URLs, 0 `/api|llms|feed` entries, 0 duplicates, `/refund` present |
| robots.txt | rendered `/robots.txt` | **Pass**: new Allow lines served in `*` and GPTBot groups |
| Structured data | homepage JSON-LD census | **Pass**: 0 Product, 0 SearchAction, 0 award, 1 top-level Organization/WebSite/SoftwareApplication/FAQPage |
| md twin headers | `curl -I /api/md/busy-erp` | **Pass**: canonical `Link` header present |
| MCP headers | `curl -I /api/mcp` | **Pass**: `x-robots-tag: noindex` |
| OG image | `GET /og-image.png` + homepage meta | **Pass**: 200 `image/png` 1200×630; `og:image`+`twitter:image` emitted |
| Mobile render | 375×812 browser | **Pass**: no overflow, no console errors |
| Desktop render | 1280×800 browser | **Pass**: FAQ section visually unchanged after microdata removal |
| Live-site re-audit | — | **Requires deploy** — production still serves the old build; local build fully re-audited instead |
| Internal links | 54-target re-check | **Pass**: 0 broken |

**Not changed anywhere**: visible business claims, pricing/commercial terms, auth/app links, analytics, routes, UI behaviour (beyond removing invisible microdata attributes), dependencies (none added).
