# Whats91.com — SEO Implementation Plan (2026-07-19)

> Companion to `WHATS91_SEO_AUDIT.md` (findings/evidence) and
> `WHATS91_SEO_CHANGELOG.md` (what was changed in this pass and how to roll it
> back). This plan covers what remains after the P0/P1 implementation.

---

## 1. Immediate (done in this pass — deploy is the remaining step)

All P0/P1 fixes are implemented and validated locally (see changelog):
canonicals, blog-post metadata, legal-page metadata, sitemap cleanup, OG image,
schema dedupe/claim removal, markdown-twin canonical headers, MCP noindex,
robots.txt agent allowances, broken-link fix.

**The production site still serves the old build.** The single highest-impact
action available is: **deploy this codebase** (owner action; nothing was
deployed by this work). After deploy:

1. Verify live: `curl -s https://whats91.com/pricing | grep canonical` →
   must show `/pricing`, not the homepage.
2. Verify `https://whats91.com/og-image.png` → 200 `image/png`.
3. Resubmit `sitemap.xml` in Google Search Console; use URL Inspection on
   `/solutions/busy-erp`, `/pricing`, and 2–3 blog posts; request reindexing.
4. Watch GSC "Duplicate, Google chose different canonical" count fall over
   2–6 weeks.

## 2. 30-day plan

| Item | Detail | Owner input needed |
|---|---|---|
| Google Search Console verification | The placeholder verification meta was removed. Add real ownership via DNS or add the real token via `verification.google` in the root layout only | GSC access |
| Claim evidence pass | Resolve the Unverified rows of the audit's claim matrix (§10): Meta status wording, 500+ msgs/sec, 99.9% uptime, 256-bit encryption, 98% open rate, 50% support reduction, GDPR mention | Business evidence |
| Org entity finalization | Confirm foundingDate (2023 vs 2024), legal name (Wilford Technology), social profiles (`sameAs`: LinkedIn/Twitter URLs live?), then align `JsonLD.tsx` + `seo2.ts` + `config.ts` into ONE source | Owner confirmation |
| Favicon set | Add PNG favicons (32/180/512) + apple-touch-icon alongside logo.svg | Design asset |
| Blog `?tag=` / `?search=` params | Blog index ignores query params but tag links emit them. Either read `useSearchParams()` in the blog list or change tag links to plain `/blog`. Prevents soft-duplicate parameter URLs | Dev decision |
| Baseline metrics | Record GSC impressions/clicks per page-group + CrUX (INP needs field data) as the before-state for measuring this work | GSC/analytics access |

## 3. 60-day plan

| Item | Detail |
|---|---|
| Per-page OG images | Generate branded 1200×630 variants for the top 10 pages (busy-erp, pricing, coexistence, templates, calculator, top blog posts) using the same sharp pipeline that produced `public/og-image.png` |
| Title standardization pass | Normalize suffix branding ("… | Whats91") across all pages, then move to root `title.template` (deliberately not done now to avoid double-branding ~35 existing titles) |
| Server-component migration (Batches 8–10) | Continue the existing migration plan; each page converted from `"use client"` can then own `generateMetadata` directly and sheds client JS (725 KB homepage JS today) |
| Blog cadence | 2 posts/month against the intent map (§5); each with self-canonical, article schema, author entity, contextual links to one solution + one tool |
| Internal-link deepening | Add "related solutions" blocks to blog posts (pattern already exists on the Google Sheets guide) and cross-link solution pages ↔ matching calculator tools |

## 4. 90-day plan

| Item | Detail |
|---|---|
| Content-gap build-out | Create the pages from the map below marked *Create*, one at a time, only where product capability truly exists |
| GEO measurement | Track AI-assistant citations (manual spot checks: ChatGPT/Perplexity/Gemini queries for "Busy accounting WhatsApp integration", "WhatsApp API pricing India") before/after markdown-twin canonicalization |
| CWV field validation | Compare CrUX after deploy; investigate INP if > 200 ms on mobile |
| Review cadence | Quarterly re-run of the audit checklist (crawl script preserved in audit §3 methodology) |

## 5. Page-to-intent map (current inventory — no cannibalization detected)

| Page | Search intent | Funnel | Action |
|---|---|---|---|
| `/` | Brand + "WhatsApp Cloud API platform India" (commercial) | MOFU | Keep; deployed redesign already aligned |
| `/solutions/busy-erp` | "Busy accounting WhatsApp integration" (commercial) | BOFU | Keep; strongest differentiator — build links to it |
| `/solutions/busy-api` | "Busy accounting REST API" (developer) | MOFU | Keep |
| `/solutions/busy-reports`, `/busy-google-sheet`, `/busy-ecommerce`, `/busy-ai-agent` | Busy-adjacent commercial variants | BOFU | Keep; distinct intents |
| `/solutions/miracle-whatsapp-api` | "Miracle software WhatsApp" (commercial) | BOFU | Keep |
| `/solutions/marketing`, `/utility`, `/payment-reminders` | Use-case commercial | MOFU | Keep |
| `/pricing` | "WhatsApp API pricing India" (transactional) | BOFU | Keep; blog pricing guide covers informational variant — complementary pair, monitor in GSC |
| `/tools/*` (4 tools) | Free-tool informational/transactional | TOFU | Keep; strong link magnets |
| `/whatsapp-templates`, `/whatsapp-coexistence`, `/whatsapp-business-calling`, `/chatbot-flows`, `/google-sheets-integration`, `/flow-builder`, `/features/*` | Feature/informational | TOFU/MOFU | Keep |
| `/blog/*` (10) | Informational | TOFU | Keep; now individually indexable |
| Proposed: `/solutions/tally-whatsapp-integration` | "Tally WhatsApp integration" (commercial) | BOFU | **Create only if the product actually supports Tally** (owner decision; do not build a doorway) |
| Proposed: `/blog/whatsapp-business-api-vs-business-app` | Comparison informational | TOFU | Create (supports coexistence page) |
| Proposed: `/blog/whatsapp-flows-guide` | "WhatsApp Flows" informational | TOFU | Create (supports flow-builder) |

Anti-goals: no city-doorway pages, no thin programmatic pages, no pages for
capabilities the product does not have.

## 6. Content-cluster plan

- **Busy cluster** (pillar: `/solutions/busy-erp`): busy-api, busy-reports,
  busy-google-sheet, busy-ecommerce, busy-ai-agent, payment-reminders, 2 blog
  guides. All exist — add consistent cross-links + "part of" breadcrumbs.
- **Pricing cluster** (pillar: `/pricing`): cost calculator, ROI calculator,
  pricing blog guide, partner pricing. Exists — keep pillar links bidirectional.
- **Platform-changes cluster** (pillar: blog): v24→v25, username system,
  WhatsApp Plus, 6-hour logout ×2, coexistence framework. Timely content —
  refresh dates when Meta ships changes.

## 7. Internal-linking plan

1. Every blog post links to ≥1 solution page + ≥1 tool with descriptive anchors (mostly done; keep as editorial rule).
2. Solution pages link sideways within their cluster (busy-* pages already do).
3. Footer keeps flat access to all clusters (already server-rendered).
4. Add breadcrumb UI + BreadcrumbList on solution/feature pages during Batches 8–10 (schema helper already exists).

## 8. Measurement plan

- GSC: impressions/clicks by page group (weekly), canonical-status report (the "Duplicate, Google chose different canonical" bucket must trend → 0 after deploy).
- CrUX/PageSpeed: LCP/INP/CLS monthly on `/`, `/solutions/busy-erp`, `/pricing`.
- Social: share previews render with the new OG image (validate in WhatsApp/LinkedIn/X debuggers after deploy).
- AI search: monthly manual citation checks for 5 target prompts.

## 9. Dependencies

- Deploy of this codebase (everything hinges on it).
- GSC + analytics access for measurement and reindex requests.
- Owner sign-off on claim-matrix rows before re-asserting claims anywhere.

## 10. Risks

| Risk | Mitigation |
|---|---|
| No git history — changes not revertible via VCS | Changelog documents exact previous behaviour per file; **strongly recommend `git init` + initial commit before further work** |
| Canonical flip may cause temporary ranking churn while Google re-processes | Expected and healthy; the previous state was mass-deduplication to the homepage — strictly worse |
| `.env` missing locally — full `npm run build` script's copy step fails on this machine | Pre-existing; production deploy pipeline presumably has `.env`; core `next build` verified passing |
| Claim wording ("Meta Verified", uptime, throughput) unverified | Left visible copy untouched; flagged for owner with exact locations in audit §10 |

## 11. Owner decisions required

1. Exact Meta relationship wording (Verified Business vs. Solution Partner vs. Tech Provider) — affects hero badge, titles, llms.txt, about page.
2. foundingDate (2023 or 2024) and `sameAs` social URLs.
3. Evidence or rewording for: 500+ msgs/sec, 99.9% uptime SLA, 256-bit encryption, 98% open rate, 50% support-call reduction, GDPR.
4. Whether Tally (or other ERP) pages are warranted by real capability.
5. Real Google Search Console verification token (placeholder was removed).
6. Initialize git for this repository.
