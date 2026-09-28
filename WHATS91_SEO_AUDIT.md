# Whats91.com — SEO Audit (2026-07-19)

> Evidence-based audit of the live production site (https://whats91.com) and the
> current source code in this repository. Produced with the `claude-seo` v2.2.0
> plugin methodology (seo-audit / seo-technical / seo-page / seo-schema /
> seo-sitemap / seo-content / seo-geo / seo-images / seo-sxo skills) executed
> against both environments. Companion documents:
> `WHATS91_SEO_IMPLEMENTATION_PLAN.md` and `WHATS91_SEO_CHANGELOG.md`.

---

## 1. Executive summary

**Overall condition: structurally strong content and clean architecture, undermined
by one severe canonical-tag defect and a contradictory sitemap.**

The most serious finding: on the **live production site**, `/pricing`, `/contact`,
`/about`, `/faq`, `/solutions/busy-erp`, `/solutions/busy-api`, `/terms`,
`/privacy` and `/refund` all emit `<link rel="canonical" href="https://whats91.com">`
(the homepage) plus the homepage title, and all blog posts except one emit
`canonical → /blog`. This instructs Google to treat nearly the whole site as
duplicates of 3 URLs. The root cause is `alternates.canonical` hard-coded in the
root layout ([layout.tsx:23](src/app/layout.tsx)) being inherited by every page
that does not export its own metadata.

The current (undeployed) codebase already fixes most solution/tool/feature pages
via per-page `generateMetadata`, but **4 legal pages and 9 of 10 blog posts are
still affected in current code** — and the root-layout fallback trap remains for
any future page.

Second severe issue: the XML sitemap lists ~24 `/api/md/*` and `/api/mcp*` URLs,
`/llms.txt` and `/feed.xml` — non-HTML utility endpoints, most of which
robots.txt simultaneously disallows (`Disallow: /api/`) for the `*` user-agent
group. `/api/mcp` is listed twice. `/refund` is missing.

**Strongest existing elements**
- Clean host-level hygiene: single-hop `301` http→https and www→non-www,
  `308` trailing-slash normalization, real `404`s for missing pages.
- Excellent baseline performance on production: TTFB ≈ 61 ms, full load < 1 s,
  CLS = 0, LCP element is the H1 text (no image dependency), fonts via
  `next/font` (self-hosted Inter), only third-party is Google reCAPTCHA.
- Every page renders exactly one `H1`; no `<img>` without `alt` found in the
  rendered DOM of any of the 49 crawled routes.
- Content depth is genuinely strong (solution pages, pricing transparency,
  blog guides, free tools, llms.txt, markdown twins, MCP discovery endpoint).
- Redesigned homepage (current code) answers what/who/why clearly with specific
  CTAs ("Book a free demo", "See transparent pricing").

**Biggest growth opportunities**
- Ship the canonical/metadata fixes (this work) and redeploy — production is
  running an older build that still has all defects live.
- Consolidate the triple-source Organization schema into one consistent entity.
- Add a real OG image (currently `og-image.png` 404s — every social share and
  most schema `image` fields are broken).
- Per-post metadata unlocks 9 blog posts that currently cannot rank at all.

---

## 2. Current architecture

| Aspect | Value |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Rendering | Static prerender for all marketing routes (verified in build output); `feed.xml` dynamic |
| Output | `standalone` (PM2 + Caddy in production) |
| Metadata | Root layout defaults + `generatePageMetadata()` helper ([src/lib/seo/config.ts](src/lib/seo/config.ts)) |
| Structured data | 3 parallel systems: sitewide `@graph` in [src/components/seo/JsonLD.tsx](src/components/seo/JsonLD.tsx) (root layout), per-page `JsonLd` component ([src/lib/seo/JsonLd.tsx](src/lib/seo/JsonLd.tsx)), unused `entityDefinitions` in [src/lib/seo/seo2.ts](src/lib/seo/seo2.ts) |
| Sitemap | [src/app/sitemap.ts](src/app/sitemap.ts) (MetadataRoute) |
| robots.txt | Static file [public/robots.txt](public/robots.txt) |
| Git | **Not a git repository** — no version control. Every change is documented with rollback guidance in the changelog instead. |
| Deployment state | Production runs an **older build** than this codebase (e.g. `/design-system` exists in code, 404s live; old hero H1 live vs. redesigned hero in code) |

## 3. Methodology

1. Installed `claude-seo` v2.2.0 (`claude plugin marketplace add AgriciDaniel/claude-seo`, `claude plugin install claude-seo@agricidaniel-claude-seo`) — user scope, **not** a production dependency. Skill methodologies executed inline (plugin was installed mid-session, so its slash commands load in the next session; the audit followed the same skill process files directly).
2. Live crawl of whats91.com over HTTP (Googlebot UA): status codes, redirect behaviour, canonical/title/robots extraction on 14 representative URLs; asset checks; robots.txt + sitemap.xml + llms.txt + feed.xml + markdown-twin + MCP endpoint inspection.
3. Full crawl of all 49 first-party routes on the local dev server (current code): title, canonical, H1 count, meta description, images without alt.
4. Internal-link extraction from all rendered pages (54 unique internal targets) with per-link status validation.
5. Browser rendering audit (desktop 1280×800 + mobile 375×812): screenshots, LCP element/timing, CLS via PerformanceObserver, console errors, third-party inventory.
6. Source audit: metadata coverage per route, schema generation paths, sitemap/robots generation, claim inventory grep.
7. Baseline commands: `npm run lint`, `npx tsc --noEmit`, `npx next build`.

## 4. URLs audited

- Live: `/`, `/terms`, `/privacy`, `/refund`, `/blog`, `/blog/whatsapp-cloud-api-complete-guide-2026`, `/solutions/busy-api`, `/solutions/miracle-whatsapp-api`, `/solutions/busy-erp`, `/pricing`, `/contact`, `/tools`, `/faq`, `/about`, plus `robots.txt`, `sitemap.xml`, `llms.txt`, `feed.xml`, `/api/md/busy-erp`, `/api/mcp`, `og-image.png`, `logo.svg`, redirect variants (http/www/trailing slash), `/search?q=test`, `/blog?search=test`, a 404 probe, `/design-system`.
- Local (current code): all 49 page routes (list in §6 table source: `scratchpad/local-crawl.psv`).

## 5. Baseline results (recorded before any change)

| Check | Result |
|---|---|
| `npm run lint` | **Fails** — 3 pre-existing errors, all outside `src/` scope of this work: `ecosystem.config.cjs` (2× `no-require-imports`), `temp/examples/websocket/frontend.tsx` (1× `set-state-in-effect`) |
| `npx tsc --noEmit` | **Fails (pre-existing)** — errors in `examples/websocket/*` (missing socket.io types), `src/app/api/webhooks/github/route.ts`, `src/lib/redis.ts`. This is why `ignoreBuildErrors: true` is set in next.config.ts |
| `npx next build` | **Passes** (exit 0), all marketing routes static |
| Full `npm run build` script | **Cannot complete on this machine** — final step `cp .env .next/standalone/` fails because `.env` does not exist locally (pre-existing; not modified) |
| Unit/integration tests | **Not available** — no test runner or test scripts exist in the project |

---

## 6. Technical findings

### 6.1 Indexing and crawlability

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| T1 | **P0** | Root layout hard-codes `alternates.canonical: "https://whats91.com"`; inherited by every page without own metadata → mass canonicalization to homepage | Live: `/pricing`, `/contact`, `/about`, `/faq`, `/solutions/busy-erp`, `/solutions/busy-api`, `/terms`, `/privacy`, `/refund` all emit homepage canonical + homepage title. Current code: `/terms`, `/privacy`, `/refund`, `/cookies` still affected |
| T2 | **P0** | 9 of 10 blog posts inherit `canonical → /blog` + blog-index title from [blog/layout.tsx](src/app/blog/layout.tsx) (posts are `"use client"` and export no metadata) | Local crawl: every post except `whatsapp-cloud-api-pricing-india-2026` shows title "Blog - WhatsApp API Insights…" + canonical `/blog` |
| T3 | **P0** | Sitemap lists non-canonical, non-HTML URLs: 21× `/api/md/*` + `/api/mcp*` (incl. `/api/mcp` **duplicated**), `/llms.txt`, `/feed.xml`, plus per-post markdown twins — while robots.txt `Disallow: /api/` blocks them for the `*` UA group | [sitemap.ts:284-437](src/app/sitemap.ts); [public/robots.txt](public/robots.txt) |
| T4 | P1 | `/refund` page exists (indexable) but is absent from the sitemap | Route exists at [src/app/refund/page.tsx](src/app/refund/page.tsx); no sitemap entry |
| T5 | P1 | Markdown twins served with `X-Robots-Tag: index, follow` and **no canonical** → indexable duplicate content of their HTML pages | `curl -I https://whats91.com/api/md/busy-erp` → `x-robots-tag: index, follow`, `content-type: text/markdown` |
| T6 | P1 | `/api/mcp` (JSON capability doc) has no robots directive → indexable JSON | [src/app/api/mcp/route.ts:184-192](src/app/api/mcp/route.ts) |
| T7 | P2 | `sitemap lastModified: currentDate` for all static pages — regenerated every build, so the value is noise Google learns to distrust | [sitemap.ts:8](src/app/sitemap.ts) |
| T8 | P2 | robots.txt `Disallow: /api/` (in `*` and GPTBot groups) contradicts the site's own SEO-2.0 strategy of serving markdown twins/MCP to AI agents (GPTBot is *explicitly* blocked from the endpoints built for it) | [public/robots.txt](public/robots.txt) GPTBot group |
| T9 | P3 | robots.txt contains non-standard `Host:` and `Crawl-delay:` directives and disallows routes that no longer exist (`/services/`, `/projects/`) | Cosmetic; ignored by Google |
| — | ✅ | http→https, www→non-www single-hop 301; trailing-slash 308; missing pages return real 404; `/design-system` correctly noindex + excluded from sitemap (in code) | Verified live + code |

### 6.2 Metadata

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| M1 | **P0** | `og-image.png` referenced as OG/Twitter/schema image sitewide **does not exist** (HTTP 404). No fallback. Homepage has *no* `og:image` at all (root layout defines none) | `curl -I https://whats91.com/og-image.png` → 404; [config.ts:8](src/lib/seo/config.ts); no `og:image` in rendered homepage head |
| M2 | **P0** | `/terms`, `/privacy`, `/refund`, `/cookies` (client components) have no metadata → homepage title/description/canonical (current code) | Local crawl table |
| M3 | P1 | Placeholder `verification.google: "google-site-verification-code"` emitted on every page using `generatePageMetadata` | [config.ts:176-178](src/lib/seo/config.ts) |
| M4 | P2 | Root layout has no `title.template`; per-page titles hand-append "| Whats91" inconsistently ("Whats91 Cloud API", "Whats91", none) | Crawl table titles |
| M5 | P2 | `icons` only `logo.svg`; no apple-touch-icon / PNG favicon sizes | [layout.tsx:19-21](src/app/layout.tsx) |
| M6 | P3 | `keywords` meta emitted everywhere (ignored by Google; harmless) | config.ts |

### 6.3 Headings, semantics, duplicate rendering (§5 of assignment)

- **Exactly one H1 on every crawled route** ✅ (49/49). Logical H2–H6 observed on sampled pages; semantic `<main>/<section aria-labelledby>` used in redesigned pages.
- **Homepage FAQ is double-marked-up**: visible FAQ uses microdata (`itemScope/itemProp` Question/Answer) *and* a JSON-LD `FAQPage` for the same 6 Q&As → duplicate structured data (P1, F5 below).
- Responsive desktop-table + mobile-card duplication exists in [FAQBrowser.tsx](src/app/faq/FAQBrowser.tsx), [payment-reminders/page.tsx](src/app/solutions/payment-reminders/page.tsx), [blog/page.tsx](src/app/blog/page.tsx), [HowItWorks.tsx](src/components/landing/home/HowItWorks.tsx), [PlatformPillars.tsx](src/components/landing/home/PlatformPillars.tsx) — **intentional responsive variants**, correctly hidden visually; text is duplicated in the DOM. Assessed as acceptable (P3: consolidate opportunistically during future component work; do not break responsive design for it).
- No accidental double-mount of sections found: hero, comparison, ROI, CTA blocks each render once per breakpoint variant.

### 6.4 Internal linking

- 54 unique internal link targets extracted from all rendered pages; **1 broken**: `/solutions/busy-whatsapp-integration` (404), linked twice from [busy-erp-google-sheets blog post](src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx) (lines 867, 965). Correct target: `/solutions/busy-erp` (P0-adjacent, trivial fix).
- Anchor quality is generally good (descriptive anchors like "Busy ERP WhatsApp integration"); no "Learn more" epidemic found in current code.
- Blog tag links point to `/blog?tag=…` but the blog index ignores query params (client `useState` only) — links function but don't filter (P2: implement param handling or retarget links).
- Solution pages cross-link well; legal pages linked from footer. `/authors` linked from blog. No orphan routes detected among the 49 (all reachable from nav/footer/contextual links).

## 7. On-page / content findings

- Redesigned homepage (current code) answers: what (WhatsApp Cloud API platform), who (Indian business), problems (campaigns, chatbots, reminders, Busy ERP), differentiation (zero-markup, Busy depth), next step (demo/pricing CTAs) ✅.
- Solution pages have distinct intents (Busy ERP, Busy API, reports, Google Sheets, e-commerce, AI agent, payment reminders, marketing, utility, Miracle) — **no cannibalization detected**; each targets a distinct query family. Pricing targets "WhatsApp API pricing India"; blog post targets the informational variant — complementary, monitor in GSC.
- Titles/descriptions on migrated pages are specific and within sane SERP lengths; no keyword stuffing found.
- E-E-A-T: real authors with pages (4), org identity consistent (Whats91 / Wilford Technology), contact info real (+91 96698 23388, support@whats91.com, Ujjain MP address in schema). Claim verification below (§10) is the main E-E-A-T gap.

## 8. Structured data findings

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| S1 | P1 | `Product` schema with `price: "0"` + `availability: InStock` emitted on **every page** (sitewide graph) **and again** on the homepage (`#homepage-product`) — the platform is not a ₹0 product; Product markup on non-product pages risks spam classification | [JsonLD.tsx:196-243](src/components/seo/JsonLD.tsx); [page.tsx Product block](src/app/page.tsx) |
| S2 | P1 | `award: "Official Meta Business Solution Provider"` — BSP status asserted as an *award* (semantically wrong property, unverified claim) | [JsonLD.tsx:137](src/components/seo/JsonLD.tsx), [seo2.ts:73](src/lib/seo/seo2.ts) |
| S3 | P1 | Three conflicting `SearchAction` templates (`/search?q=` → **404**, `/blog?search=` → renders but does not filter, `/blog?q=`); Google retired the sitelinks-searchbox feature and the targets are non-functional | [config.ts:220-228](src/lib/seo/config.ts), [JsonLD.tsx:153-160](src/components/seo/JsonLD.tsx), [seo2.ts:92-99](src/lib/seo/seo2.ts); live `/search?q=test` = 404 |
| S4 | P1 | Duplicate entities on homepage: 3× Product, 3× SoftwareApplication, 2× Organization, 2× Service across layout graph + page schemas | JSON-LD type census of rendered homepage |
| S5 | P1 | Standalone root-level `SpeakableSpecification` object (only valid as a *property* of WebPage/Article; already present inside the WebPage entity) | [page.tsx](src/app/page.tsx) `#homepage-speakable` |
| S6 | P1 | Homepage FAQ marked up twice (JSON-LD + microdata) | §6.3 |
| S7 | P2 | Conflicting org facts across the 3 schema sources: foundingDate 2024 vs 2023; `numberOfEmployees 10-50` (unverifiable); logo SVG (Google prefers raster ≥112×112) | JsonLD.tsx vs seo2.ts |
| S8 | P2 | Single-item `BreadcrumbList` (Home only) on homepage — ignored by Google, noise | page.tsx |
| S9 | P3 | `DataFeed`/`DefinedTermSet`/`ItemList` "AI priority pages" entities sitewide — harmless but unrecognized by search engines; keep (owner's GEO strategy) or trim later | JsonLD.tsx |
| — | ✅ | FAQ/Breadcrumb/Article schema on migrated pages matches visible content; JSON-LD everywhere (no schema in body HTML errors) | Sampled pages |

## 9. Performance / Core Web Vitals

Production (live, desktop): TTFB 61 ms · DOMContentLoaded 375 ms · full load 913 ms · transfer 24 KB doc + 725 KB JS + 29 KB CSS · 63 requests · CLS 0 · LCP = H1 text ≈ hero paint. Mobile viewport renders without horizontal scroll; no console errors. Third parties: `www.google.com` + `www.gstatic.com` (reCAPTCHA) only.

| ID | Sev | Finding |
|---|---|---|
| P1a | P2 | 725 KB JS on homepage — acceptable for Next app but trimmable; largest wins would come from auditing `"use client"` pages that could be server components (39→fewer over time, per migration plan) |
| P1b | P2 | Cookie banner mounts client-side over hero on mobile (measured CLS 0 because it's `position:fixed`, but it obscures content; UX not SEO) |
| P1c | P3 | `reactStrictMode: false` and `ignoreBuildErrors: true` — engineering hygiene, indirect SEO risk only |
| — | ✅ | Fonts self-hosted via `next/font` (no external font origin, no FOIT); no render-blocking third-party in head; images have explicit dimensions; CLS 0 |

No safe automated CWV optimization is required at this time; the LCP element is text. (INP not measurable synthetically here; requires field data / CrUX — see "Requires Search Console" in the plan.)

## 10. Claim-verification matrix

Evidence sources checked: page content, repo docs, schema files. No external registry confirmations were available to this audit (no Meta partner-directory lookup performed by owner; no certificates in repo).

| Claim | Current location | Evidence found | Status | Recommended action |
|---|---|---|---|---|
| "Meta Verified" (platform badge/title) | Root layout title, hero badge, header "Meta Partner" chip | None in repo; Meta Business "verified" status is plausible (business verification) but distinct from partnership | **Unverified** | Owner: confirm exact Meta status (Business Verification vs. Solution Partner vs. Tech Provider) and align wording site-wide. Keep visible copy pending confirmation; do not add to schema |
| "Official Meta Business Solution Provider" / BSP | about, JsonLD `award`, seo2.ts, llms.txt, config descriptions | None (BSP directory listing not evidenced) | **Unverified** | Remove from schema `award` field (done — semantically wrong property regardless); owner to provide partner-directory URL before re-asserting in copy/schema |
| "500+ msgs/sec" | llms.txt, config.ts home description | No benchmark/docs | **Unverified** | Qualify or remove pending owner evidence (left in place; flagged) |
| "99.9% uptime (SLA)" | Hero chip, llms.txt, busy-ai-agent page | No SLA document/status page | **Unverified** | Owner: publish SLA/status page or qualify ("target uptime"); left in place; flagged |
| "256-bit encryption" | config.ts home description | Generic TLS plausible; no specifics | **Unverified** | Reword to "encrypted in transit (TLS)" when touched; flagged |
| "Zero-markup Meta rates" | Pricing page, hero chip, llms.txt | Consistent with pricing-page tables (internal consistency only) | **Plausible / internally consistent** | Keep; owner should be able to defend commercially |
| "DPDP-ready / DPDP-aware" | Trust band, compliance page (18 mentions) | Dedicated compliance page exists with substance | **Plausible** | Keep; ensure compliance page stays current |
| "98% open rate" | PlatformPillars, Header | Industry-folklore number; no first-party data | **Unverified** | Qualify as industry estimate or add source; flagged |
| "Reduce support calls by 50%" | busy-erp description (config) | No case study | **Unverified** | Qualify or attach case data; flagged |
| GDPR mention | llms.txt | No GDPR program evidence | **Unverified** | Owner decision; flagged |
| ISO 27001 / SOC 2 | **Not claimed anywhere** ✅ | — | — | Do not add |
| Customer counts / testimonials | None found with named fake customers ✅ | — | — | — |
| foundingDate 2024 vs 2023 | JsonLD.tsx vs seo2.ts | Conflict | **Inconsistent** | Owner to confirm; conflicting unused copy removed from active schema only |

**No claim was deleted from visible copy in this work.** Schema-only assertions that were semantically invalid (`award`) were removed and are documented in the changelog. All "Unverified" rows need owner evidence before being re-asserted anywhere machine-readable.

## 11. GEO / AI-search findings

- llms.txt exists, well-structured, links all resolve to real routes ✅ (operational reason documented: markdown twins + MCP endpoint exist; note llms.txt is **not** a guaranteed ranking/citation factor).
- Markdown twins + MCP discovery endpoint are a genuine differentiator; their indexing posture was wrong (T5/T6) — fixed via canonical Link header (twins) and noindex (MCP JSON).
- robots.txt allows all major AI crawlers, but blocked GPTBot from `/api/` — the very endpoints built for agents (T8).
- Entity definition is strong (DefinedTermSet, knowsAbout); main gap was conflicting org facts (S7) and unverified authority claims (§10).
- Homepage FAQ answers are self-contained, quotable passages ✅.

## 12. Image / media findings

- Zero `<img>` missing `alt` across all rendered routes ✅ (site is predominantly SVG/CSS illustration).
- `og-image.png` 404 (M1) — the single biggest media defect; also referenced by schema `image` fields.
- Logo is inline SVG with accessible name in header ✅; favicon is `logo.svg` only (M5, P2).
- No oversized raster images found; no broken media URLs beyond og-image.png.

## 13. Accessibility smoke findings

- Mobile 375px: no horizontal overflow, tap targets ≥ ~44px on CTAs, visible focus styles present, cookie banner buttons reachable.
- Landmarks: `<main>`, labelled sections on redesigned pages ✅.
- Known pre-existing: cookie banner covers content until dismissed (UX; tracked in UI plan, not SEO-blocking).

---

## 14. Prioritized issue register

**P0 — fix now (implemented in this work)**
1. T1 root-layout canonical inheritance (+ homepage metadata ownership)
2. T2 blog posts canonical/title (9 posts)
3. M2 legal pages metadata (4 pages)
4. T3 sitemap: remove `/api/*`, `llms.txt`, `feed.xml`, duplicate `/api/mcp`; add `/refund` (T4)
5. M1 create real `og-image.png` (1200×630) + wire into root metadata
6. Broken internal link ×2 → `/solutions/busy-erp`

**P1 — fix now (implemented in this work)**
7. M3 remove placeholder Google verification meta
8. S1/S4 remove Product schema (both sources); dedupe homepage entities
9. S2 remove `award` BSP assertion from schema (visible copy untouched)
10. S3 remove all three non-functional SearchActions
11. S5 remove standalone SpeakableSpecification; S8 remove single-item breadcrumb
12. S6 remove FAQ microdata (keep JSON-LD)
13. T5 markdown twins: canonical `Link` header → HTML page; T6 `/api/mcp`: noindex
14. T8 robots.txt: explicitly `Allow: /api/md/` + `Allow: /api/mcp` for agent access (aligns robots with sitemap/GEO strategy)
15. T7 fake sitemap `lastModified` removed from static entries (real dates kept for posts/authors) — pulled forward from P2 because the sitemap file was already being rewritten

**P2 — planned, not implemented (see implementation plan)**
- M4 `title.template` — deliberately **not** applied: ~35 existing page titles already end in "| Whats91"-style branding, and a root template would double-brand them all; standardize during a dedicated title pass instead
- M5 favicon set · S7 org-fact reconciliation (needs owner) · blog `?tag`/`?search` param handling · per-page OG images · JS-weight reduction via server-component migration (Batches 8–10)

**P3 — backlog**
- T9 robots cosmetic cleanup · S9 GEO-entity trimming · responsive DOM-duplication consolidation · `reactStrictMode`/`ignoreBuildErrors` hygiene

## 15. Acceptance criteria (per fix)

- Every indexable route emits exactly one canonical pointing to itself (absolute, https, non-www, no trailing slash).
- Every indexable route emits a unique title + description; blog posts emit `og:type=article` with real dates.
- `sitemap.xml` contains only 200-status, indexable, canonical HTML URLs (49 routes minus design-system = sitemap set incl. `/refund`).
- `https://whats91.com/og-image.png` returns 200 `image/png` at 1200×630 and appears in `og:image` + `twitter:image` on the homepage.
- Homepage JSON-LD census: 1 Organization, 1 WebSite, 1 SoftwareApplication, 1 WebPage, 1 FAQPage, 0 Product, 0 standalone SpeakableSpecification, 0 SearchAction.
- `curl -I /api/md/busy-erp` returns `Link: <https://whats91.com/solutions/busy-erp>; rel="canonical"`.
- `npx next build` passes; local crawl shows 0 broken internal links.

> **Post-audit correction (deployment verification, 2026-07-19):** a stricter
> production-mode re-validation found 11 pages (blog index, 9 client blog
> posts, authors index) emitting no `og:image` because child `openGraph`
> objects replace the root layout's wholesale in Next.js. Fixed (changelog
> entry 16) and now enforced per-route by `scripts/seo-validation/`.
