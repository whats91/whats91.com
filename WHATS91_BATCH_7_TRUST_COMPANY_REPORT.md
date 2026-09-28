# Batch 7 — Trust & Company Pages Migration Report

Scope: `/about`, `/partners`, `/partners/whats91-coins`, `/careers`, `/faq`, `/compliance`

## 1. Preflight findings

| Page | Starting state | Client state found | Metadata/JSON-LD before |
|---|---|---|---|
| `/about` | `"use client"`, fully token-clean already | None (no `useState`/`useEffect`) | None |
| `/partners` | Already on the current design system (`generatePageMetadata`, `JsonLd`, semantic tokens) | Server component, no state | Present (breadcrumb + FAQ + custom schema) |
| `/partners/whats91-coins` | Same as `/partners` — already current-system | Server component; embeds separate `<CoinsCalculator />` client island | Present |
| `/careers` | `"use client"`, old pattern | Genuine: `selectedDepartment` filter + per-card `expanded` toggle | None |
| `/faq` | `"use client"`, old pattern | Genuine: `activeCategory`, `openFaq`, `searchQuery` + `useMemo` filter | `FAQJsonLD`/`BreadcrumbJsonLD` present, no `metadata` export |
| `/compliance` | `"use client"`, fully token-clean already | None (no `useState`/`useEffect`) | None |

`/partners` and `/partners/whats91-coins` were unexpectedly already built against the current design-token system (unlike every prior batch's old-pattern pages) — they just had leftover raw `bg-white` and one raw `amber-*` callout that hadn't been converted.

## 2. Per-file implementation summary

**`/about`** — Dropped the unnecessary `"use client"` (no hooks used). Added `generatePageMetadata` + `generateBreadcrumbSchema`/`generateOrganizationSchema`/custom `AboutPage` JSON-LD via the shared `JsonLd` component. No color retoning needed (already clean). Fixed the final-CTA WCAG contrast bug (`text-brand-primary` → `text-brand-700` on the white "Get Started Today" button).

**`/partners`** — Retoned 10 `bg-white` instances → `bg-card` (table wrappers, hero badge/card, buttons, FAQ accordion). Converted the raw `border-amber-200 bg-amber-50 text-amber-900` Meta-cost callout to `border-warning-border bg-warning-soft text-warning`. Fixed two `text-brand-primary`-on-white button contrast issues → `text-brand-700` (the "View Whats91 Coins" button and the final CTA "Register as Partner" button). Left the special CTA-band button's `bg-white` as-is (intentional, matches the site-wide fixed-white-on-brand-band convention).

**`/partners/whats91-coins`** — Same retoning pattern: 7 `bg-white` → `bg-card`, final CTA contrast fix (`text-brand-700`). Also retoned the embedded `CoinsCalculator.tsx` client component (not itself one of the 6 named target pages, but it is the page's primary content) — 7 more `bg-white` → `bg-card` instances across the card container, toggle buttons, and result panels. Verified the calculator's math is untouched (see §5).

**`/careers`** — Extracted the interactive Open Positions section (department filter + `JobCard` with expand toggle) into a new client island, `OpenPositionsClient.tsx`, keeping Hero/Stats/Benefits/Culture/CTA static in a rewritten server `page.tsx`. Added `generatePageMetadata` + breadcrumb/WebPage JSON-LD. Fixed the dead "Apply Now" button (previously no `href`/`onClick` at all) — it now links to `mailto:careers@whats91.com?subject=Application for {job title}`, matching the mailto convention already used by the page's own "Send Your Resume" CTA. Fixed the final-CTA contrast bug (`text-brand-700`).

**`/faq`** — Extracted the search/category/accordion browser into `FAQBrowser.tsx`, and moved the FAQ question/answer data and category list into a neutral (non-`"use client"`) `faqData.ts` module so both the client browser and the server `page.tsx` (for JSON-LD) can import the same data without re-exporting an array across the client/server boundary (see the Batch 6 Turbopack pitfall in §4). Added `generatePageMetadata`; kept the existing `FAQJsonLD`/`BreadcrumbJsonLD` pattern. Retoned `bg-white` → `bg-card` (search bar, category buttons, FAQ cards, two of the three contact-method cards). Retoned the Phone contact card's raw `purple-500/10`/`text-purple-600` to `bg-info-soft`/`text-info` (kept the WhatsApp card's decorative brand-green, matching the established exception). Fixed the dead "Start Free Trial" button (previously rendered with no `href`/`onClick`) — now links to `https://chat.whats91.com`, the same destination used site-wide for that CTA, and fixed its contrast (`text-brand-700`).

**`/compliance`** — Dropped the unnecessary `"use client"` (no hooks used). Added `generatePageMetadata` + breadcrumb/WebPage JSON-LD. Retoned 6 `bg-white` instances (quick-nav pills, "Contact DPO" button) → `bg-card`.

## 3. Bugs found and fixed

| Bug | Page | Fix |
|---|---|---|
| Final-CTA WCAG contrast failure (`text-brand-primary` on white ≈ 4.0:1, fails AA) | `/about`, `/partners`, `/partners/whats91-coins`, `/careers`, `/faq` | → `text-brand-700` (≈6.65:1, passes AA), matching every prior batch's fix |
| Raw Tailwind palette colors (`bg-white`, `amber-*`, `purple-*`) instead of semantic tokens | `/partners`, `/partners/whats91-coins`, `/careers`(none found), `/faq`, `/compliance` | → `bg-card`, `warning-*` tokens, `info-*` tokens |
| Dead "Apply Now" button — no `href`/`onClick` at all | `/careers` | → `mailto:careers@whats91.com?subject=Application for {title}` |
| Dead "Start Free Trial" button — no `href`/`onClick` at all | `/faq` | → `https://chat.whats91.com` (site-wide convention) |
| Missing metadata/JSON-LD entirely | `/about`, `/careers`, `/faq` (metadata only — JSON-LD already present), `/compliance` | Added `generatePageMetadata` + breadcrumb/page schema |

## 4. Bugs found and NOT fixed (disclosed, not altered)

- **`/about` — 8 dead team-member social links.** All four Leadership Team members' LinkedIn and Twitter icons link to literal `href="#"`. Unlike every other "dead CTA" fixed in this project, there is no discoverable real destination to substitute — fabricating a LinkedIn/Twitter URL for named individuals would be guessing, not fixing. Left as-is; flagging for the user to supply real profile URLs or decide whether to remove the icons.
- **`/about` — content inconsistency in the Office section.** The HQ card is labeled "Headquarters" / "Mumbai, Maharashtra" but the address text underneath reads "131, C21 Mall, Ujjain, Madhya Pradesh, 456010" (Ujjain, not Mumbai). This is pre-existing business copy, not a styling or technical bug, so it was preserved verbatim per the content-preservation rule rather than silently corrected. Flagging for the user to confirm which is correct.

## 5. Files changed

| File | Type |
|---|---|
| `src/app/about/page.tsx` | Modified (dropped `"use client"`, added metadata/JSON-LD, contrast fix) |
| `src/app/partners/page.tsx` | Modified (retoken, contrast fixes) |
| `src/app/partners/whats91-coins/page.tsx` | Modified (retoken, contrast fix) |
| `src/app/partners/whats91-coins/CoinsCalculator.tsx` | Modified (retoken only — zero logic changes) |
| `src/app/careers/page.tsx` | Rewritten as server component (metadata/JSON-LD added) |
| `src/app/careers/OpenPositionsClient.tsx` | New (client island: department filter + job cards, dead CTA fixed) |
| `src/app/faq/page.tsx` | Rewritten as server component (metadata added) |
| `src/app/faq/FAQBrowser.tsx` | New (client island: search/category/accordion) |
| `src/app/faq/faqData.ts` | New (shared data module, no `"use client"`, imported by both client and server files) |
| `src/app/compliance/page.tsx` | Modified (dropped `"use client"`, added metadata/JSON-LD, retoken) |
| `.claude/launch.json` | New (dev-server launch config for browser verification — not app code) |

No `src/components/ui/*` (shadcn) files were touched. No routes, slugs, or anchors changed. All visible copy, pricing figures, FAQ content, and job listings preserved verbatim except the two disclosed items in §4.

## 6. Behavior preservation confirmation

- **Careers filter/expand**: confirmed live — clicking "Engineering" narrows the list to the 2 engineering roles; expanding a card shows requirements + the (now working) Apply Now link with the correct per-job mailto subject.
- **FAQ search/category/accordion**: confirmed live — searching "DPDP" returns exactly 1 matching question across all categories; clicking the question expands the correct answer text.
- **Whats91 Coins calculator**: confirmed live — entering "2" into the Standard/Extender 1 Year field updates "Coins used" to 10,000 and "Coins remaining" to 0 (2 × 5,000 Partner-tier coins), matching the pre-existing calculation logic exactly. Only `className` strings were touched in `CoinsCalculator.tsx`.
- **Partners pricing tables, add-on tables, FAQ accordions**: content and structure unchanged, only color tokens updated.

## 7. Verification evidence

**Lint** (`npx eslint` on all 10 changed/new files): clean, zero warnings or errors.

**TypeScript** (`npx tsc --noEmit`): zero errors in any Batch 7 file. Pre-existing, unrelated errors remain in `examples/websocket/*`, `src/app/api/webhooks/github/route.ts`, and `src/lib/redis.ts` — confirmed unrelated to this batch.

**Production build** (`npm run build`):
```
✓ Compiled successfully in 4.1s
✓ Generating static pages using 11 workers (86/86) in 433.6ms
```
All 86 routes generated, including `○ /about`, `○ /careers`, `○ /compliance`, `○ /faq`, `○ /partners`, `○ /partners/whats91-coins` — all statically prerendered with no build errors.

**Live browser verification** (dev server, all 6 pages):
- Page titles match new metadata on all 6 pages.
- Zero console errors on any page.
- `/partners`: only 1 genuine `bg-white` remains (intentional CTA-band button) + 2 decorative `bg-white/10` glows; zero `amber-*` remaining.
- `/careers`, `/faq`: interactivity confirmed via live DOM manipulation (see §6).
- `/compliance`: all 5 anchor targets (`#rights`, `#security`, `#consent`, `#grievance`, `#contact`) confirmed present in the DOM.

## 8. Known issues / follow-ups for the user

1. `/about`'s 8 team-member social icons (`href="#"`) need real URLs or removal — cannot be fixed without real data.
2. `/about`'s Office section has a Mumbai/Ujjain naming inconsistency in existing business copy — needs a decision on which is correct.
3. A dev server was already running on port 3000 from a prior session; a `.claude/launch.json` was created for the browser-preview tool but was not needed to start a new server.

## 9. Batch 7 status: complete

All 6 target pages migrated, verified, and reported. Batches 1–7 of the `WHATS91_UI_ROLLOUT_PLAN.md` are now done.
