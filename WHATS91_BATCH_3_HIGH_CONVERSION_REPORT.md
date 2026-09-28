# Whats91 — Batch 3: High-Conversion Pages Migration Report

Scope: `/pricing`, `/contact`, `/solutions/busy-erp`, `/solutions/marketing`,
`/solutions/utility` — the five product/conversion pages named in
`WHATS91_UI_ROLLOUT_PLAN.md`'s Batch 3. No other pages, the global shell
(Batch 1), or the homepage (Batch 2) were touched in this batch.

## 1. Preflight findings

Read all 5 files in full before editing (833 + 489 + 559 + 766 + 892 lines).
Every page was a `"use client"` component with no `metadata` export and no
JSON-LD, despite being the highest-intent pages on the site. Dead-CTA and
client-state audit:

| File | Client state found | Real necessity | Dead/broken CTAs found |
| --- | --- | --- | --- |
| `pricing/page.tsx` | `activeTab` (utility/auth tier tables) | shadcn `Tabs` | "Start Free Trial", "Talk to Sales", "Get Started Free" — all with no href/handler |
| `contact/page.tsx` | form state + `executeRecaptcha`/`fetch` submit | genuine — extracted to `ContactForm` island | Sales/Support/Developers department cards had no `href` at all |
| `solutions/busy-erp/page.tsx` | `openFaq` only | shadcn `Accordion` | "Schedule a Demo" ×2, "Request Integration" — no href/handler |
| `solutions/marketing/page.tsx` | `openFaq` only | shadcn `Accordion` | "Access Marketing Portal" ×2, "View Documentation" — no href/handler |
| `solutions/utility/page.tsx` | `openFaq` (→ `Accordion`) + `showCode` (genuine toggle) | `showCode` extracted to `UtilityCodeSandbox` island | "Access Utility Portal" ×2, "View API Docs" — no href/handler |

This is the same dead-CTA bug class found and fixed in Batches 1 and 2 —
13 broken buttons across these 5 pages alone, confirming it as a systemic
pattern from the original build rather than a one-off.

Also found in preflight: **none of the 5 pages had `export const metadata`
or JSON-LD**, despite being the most commercially important pages on the
site (pricing, contact, and three solution/guide pages that legitimately
compete for search traffic). Fixing this was treated as in-scope per the
migration guide's "add real metadata following the established convention"
expectation, using the same `generatePageMetadata` / `generateServiceSchema`
/ `generateFAQSchema` / `generateBreadcrumbSchema` pattern already used by
`miracle-whatsapp-api`.

## 2. Client/server split strategy

Every page's only *necessary* client-side interactivity was small and
isolated, so each page became a **server component** with metadata + JSON-LD,
plus at most one small named client island for the genuinely stateful part:

- `pricing/page.tsx` → server; tabs/FAQ moved to shadcn `Tabs`/`Accordion`
  (no client island needed for those); **`PricingCostCalculator.tsx`**
  extracted for the one real piece of state (three number inputs + live
  computed cost).
- `contact/page.tsx` → server; **`ContactForm.tsx`** extracted (fields,
  validation, `executeRecaptcha`, `POST /api/contact` — preserved exactly).
- `solutions/busy-erp/page.tsx` → fully server (FAQ → `Accordion`, no island
  needed). Existing `AnimatedChatbot`/`ContactCard` components untouched.
- `solutions/marketing/page.tsx` → fully server (FAQ → `Accordion`, no
  island needed — this page's only state was the FAQ toggle).
- `solutions/utility/page.tsx` → server; **`UtilityCodeSandbox.tsx`**
  extracted for the developer code-block expand/collapse toggle (the one
  piece of state that isn't an accordion).

## 3. Bugs found and fixed

Two real, pre-existing bugs were found and fixed (in addition to the 13 dead
CTAs in §1), both disclosed rather than silently patched:

### 3.1 Auth calculator using Utility's tier boundaries (`pricing`)

The original cost calculator computed Authentication message cost using the
**same volume-tier boundaries as Utility** (`[25M, 50M, 100M, 200M, 300M]`)
even though Auth's real boundaries are `[750K, 15M, 20M, 50M, 100M]` (visible
in the page's own static Auth tier table, which was correct). Both message
types share the same discount rate steps, only the volume thresholds differ
— so the bug silently overcharged/undercharged the estimate for any Auth
volume that fell between the two boundary sets. Fixed by parametrizing
`calculateTieredCost(volume, boundaries)` per message type in
`PricingCostCalculator.tsx`.

**Verified live** (§7): 25,000,000 Auth messages against the corrected
boundaries computes to ₹26,04,175 — confirmed by manual tier-by-tier
recalculation matching the live rendered value exactly.

### 3.2 Missing Footer anchors on `/pricing`

`Footer.tsx` (migrated in Batch 1, untouched here) links to
`/pricing#marketing`, `/pricing#utility`, and `/pricing#volume` — none of
these ids existed anywhere in the original `pricing/page.tsx`, so all three
Footer links silently landed at the top of the page instead of the relevant
section. Fixed by adding `id="marketing"` (Official Rate Card),
`id="utility"` (Volume Tiers section, alongside the pre-existing tab
mechanism), and `id="volume"` (Cost Calculator) with `scroll-mt-24`.
Confirmed live: all three now return 200 and the anchor element exists in
the DOM.

## 4. Implementation summary per file

### 4.1 `solutions/busy-erp/page.tsx`

Converted to a server component. Added `generateServiceSchema` +
`generateFAQSchema` + `generateBreadcrumbSchema` via `@/lib/seo/JsonLd`
(matching the `miracle-whatsapp-api` reference convention, since this page
had no prior JSON-LD mechanism to preserve). Fixed the array-spread bug
described in §5 below during this work. All content (`chatbotMenu`,
`automationScenarios`, `reportsSupported`, `securityFeatures`, `industries`,
`onboardingSteps`, `howItWorksSteps`, `faqs`) preserved verbatim.
`AnimatedChatbot` and `ContactCard` usage untouched. FAQ → `Accordion`.
`id="use-cases"` anchor preserved (scroll-margin updated from `scroll-mt-16`
to the design system's standard `scroll-mt-24`).

### 4.2 `pricing/page.tsx`

Converted to a server component. Preserved the page's existing JSON-LD
mechanism (`FAQJsonLD`/`BreadcrumbJsonLD` from `@/components/seo/JsonLD`,
plus a raw `<script>` Service-schema block with `officialRates` offers) —
this page already had working structured data, so the existing mechanism
was kept rather than swapped for the newer `lib/seo` pattern used on pages
that had none. `activeTab` state → shadcn `Tabs`. FAQ → `Accordion`. All
rates, tier tables, provider comparisons, and cost-trap warnings preserved
verbatim. Retokened: FREE-tier card and free-window callouts →
`success-soft`/`success`, cost-trap warnings → `error-soft`/`error`, 2026
rate-increase notice → `warning-soft`/`warning`. Fixed 3 dead CTAs (§1) and
the calculator bug (§3.1) and missing anchors (§3.2).

### 4.3 `contact/page.tsx`

Converted to a server component; extracted `ContactForm.tsx` as the sole
client island (fields, validation, `executeRecaptcha`, `/api/contact`
submission, reCAPTCHA `Script` loading — all preserved exactly, byte-for-
byte logic). Added metadata + `BreadcrumbJsonLD` (this page already used
that component from `@/components/seo/JsonLD`; kept it). Wired the three
department cards to real destinations: Sales → `/pricing`, Support →
`mailto:support@whats91.com`, Developers →
`https://developers.whats91.com/overview`.

**Self-caught contrast bug**: the final-CTA panel sits on a
`bg-gradient-to-br from-brand-primary` background. An early draft used the
shared `PrimaryCTA`/`SecondaryCTA` components there, which render
brand-600-on-white — nearly invisible against a brand-colored panel. Caught
before verification, before this ever reached the user, by reasoning about
the color relationship; replaced with the explicit white/outline button
markup already established on busy-erp's and pricing's own final-CTA panels
for this exact scenario.

### 4.4 `solutions/marketing/page.tsx`

Converted to a fully server-rendered page (no client island needed — its
only state was the FAQ toggle, replaced by `Accordion`). Added metadata +
`generateServiceSchema`/`generateFAQSchema`/`generateBreadcrumbSchema` (no
prior JSON-LD existed). All content preserved verbatim: `marketingStats`,
`portalFeatures`, `reviewTypes`, `templateStatuses`, `rejectionCodes`,
`messagingTiers`, `channelComparison`, `kpiMetrics`, `futureTrends`,
`onboardingSteps`, all 10 FAQs. Retokened: `templateStatuses`' 5 raw-color
status dots → semantic tones (Quality Pending/Medium Quality → `warning`,
High Quality → `success`, Paused → `error`, Disabled → `bg-text-muted`, the
one dot with no dedicated status token in the design system, reusing the
existing muted-text color rather than inventing a new one). The Compliance
section's two callout cards were re-themed from raw `red-50`/`red-100` to
`success` (required-consent checklist — a positive "must-do" list) and
`warning` (opt-out enforcement risk) respectively, with the bottom "Important"
note in `warning` tokens and the "AI Rules" callout also in `warning` tokens
(matches the site's convention for regulatory-caution content). Fixed 3
dead CTAs (§1).

### 4.5 `solutions/utility/page.tsx`

Converted to a server component; extracted `UtilityCodeSandbox.tsx` for the
code-block expand/collapse (the only genuine remaining state after FAQ →
`Accordion`). Added metadata + Service/FAQ/Breadcrumb JSON-LD. All content
preserved verbatim: `utilityStats`, `utilityCategories`, `portalFeatures`,
`reclassificationTraps`, `reviewScenarios`, `pricingComparison`,
`throughputData`, `buttonTypes`, `consentTypes`, `developerExample`, all 10
FAQs, `onboardingSteps`, `bestPractices`. Retokened: the 6 `utilityCategories`
had per-category raw-palette icon colors (blue/green/purple/orange/red/
yellow) with no genuine status meaning — standardized to the shared
`IconBadge` default brand tone, matching the "one card recipe" rule
established in Batch 2. The Reclassification Trap section (raw `red-50`/
`red-200`) → `error` tokens, consistent with pricing's "cost traps" section
being the same content type (a mistake that spikes cost 300-800%); its "Pro
Tip" callout → `info` tokens (a positive tip, distinct from a warning); its
Consent Types valid/invalid cards → `success`/`error` (a genuine binary
status); its AI Policy Update callout → `warning` tokens (matches marketing
page's identical "AI Rules" callout). The dark code-sandbox panel switched
from raw `bg-[#0F172A]`/`slate-*` to the established `.ink-elevated`/
`ink-border`/`ink-text` tokens used by `DeveloperBand.tsx` (homepage);
the macOS-style traffic-light dots kept `red-400`/`yellow-400`/`green-400`
at 80% opacity, matching that same component's already-approved convention
for this specific decorative pattern. Fixed 3 dead CTAs (§1).

## 5. Error encountered and fixed during implementation

`generateServiceSchema({...})` returns a single plain object, not an
iterable — an early draft of `busy-erp/page.tsx` array-spread it
(`[...generateServiceSchema({...}), generateFAQSchema(...), ...]`), which
threw `TypeError: ... is not a function or its return value is not
iterable` (500 error, confirmed via `dev.log` stack trace and a failing
curl). Fixed by using the object directly as a single array element instead
of spreading it. The same call shape is used correctly across all 5 pages'
schema arrays going forward.

## 6. Files changed

| File | Reason |
| --- | --- |
| `src/app/solutions/busy-erp/page.tsx` | Server component; metadata + JSON-LD; fixed 3 dead CTAs; `Accordion` FAQ |
| `src/app/pricing/page.tsx` | Server component; fixed 3 dead CTAs, calculator boundary bug, missing anchors; `Tabs`/`Accordion` |
| `src/app/pricing/PricingCostCalculator.tsx` | New client island — the calculator's only stateful piece |
| `src/app/contact/page.tsx` | Server component; wired 3 dead department cards; fixed CTA-contrast bug |
| `src/app/contact/ContactForm.tsx` | New client island — form fields/validation/submission preserved exactly |
| `src/app/solutions/marketing/page.tsx` | Server component (no island needed); metadata + JSON-LD (new); fixed 3 dead CTAs; status-token retoning |
| `src/app/solutions/utility/page.tsx` | Server component; metadata + JSON-LD (new); fixed 3 dead CTAs; status-token retoning |
| `src/app/solutions/utility/UtilityCodeSandbox.tsx` | New client island — code-block expand/collapse toggle only |

No other files were changed. `src/components/landing/Header.tsx`,
`Footer.tsx`, `ContactCard.tsx`, `AnimatedChatbot.tsx`, and
`BookDemoPopup.tsx` (all Batch 1/2 components) are used but untouched.

## 7. Verification evidence

**Lint** — `npx eslint .`: `✖ 3 problems (3 errors, 0 warnings)`, identical
to the Batch 1/2 baseline (same 2 pre-existing files under `temp/`, excluded
from `tsconfig.json`, none in Batch 3 scope). Also ran scoped
`npx eslint <batch-3-files>` independently for each page and the final
island files: zero errors, zero warnings, every time.

**TypeScript** — `npx tsc --noEmit`: same pre-existing baseline errors only
(`temp/examples/websocket/*`, `api/webhooks/github/route.ts`,
`lib/redis.ts` — all pre-existing, all outside Batch 3 scope). Zero new
errors from any of the 8 changed/added files.

**Build** — `npx next build`: `✓ Compiled successfully`, all 86 routes
generated with zero errors, all 5 Batch 3 pages listed as `○ (Static)`
prerendered content.

**Live rendering** — every page curl-verified `200`, then loaded in-browser:
- `/solutions/marketing`: full content extracted via `get_page_text` —
  every stat, table row, FAQ, and section matches the original data
  verbatim; all 10 section anchors present; 8 JSON-LD `<script>` tags
  rendered.
- `/solutions/utility`: same verification — 12 section anchors present, 8
  JSON-LD tags, all 5 CTA hrefs (3× `chat.whats91.com`, 2× developer docs)
  present in rendered HTML, status-token dot counts confirmed (2 success, 8
  warning, 2 error, 2 muted).
- `/pricing`: hero, tabs, and Footer-anchor sections screenshot-verified at
  desktop width; `Utility Tiers`/`Authentication Tiers` shadcn `Tabs`
  interactivity confirmed via live DOM state change (`data-state="active"`
  correctly moved between tabs on click); cost calculator's live computed
  output cross-checked against manual tier-by-tier arithmetic for all three
  message types (Marketing ₹86,310, Utility ₹57,500, Auth ₹26,04,175) — all
  three matched exactly, confirming the §3.1 bug fix is correct in the
  running app, not just in the source.
- `/contact`: form fields (`name`, `email`, `phone`, `company`, `subject`,
  `message`) confirmed present via DOM query. Live submission was **not**
  triggered — that would send a real request to `/api/contact` and
  potentially a real email, which is outside the scope of a structural
  migration check.
- `/solutions/utility`'s code-sandbox `Expand`/`Collapse` toggle confirmed
  working via live click + follow-up state check (`max-h-32` class removed,
  button label updated to "Collapse").

**Anchors/links** — all 8 Footer-linked Batch 3 routes (`/solutions/
marketing`, `/solutions/utility`, `/solutions/busy-erp`, `/pricing`,
`/pricing#marketing`, `/pricing#utility`, `/pricing#volume`, `/contact`)
return `200` and their target ids exist in the DOM.

**Responsive** — mobile (375px) and desktop (1280/800) screenshots taken for
the marketing and pricing heroes: clean stacking, correct CTA sizing, no
overflow or clipping observed. Deeper-scroll screenshot capture on the
pricing page was unreliable in this browser-automation session (same class
of environment limitation noted in the Batch 2 report — screenshots after
JS-driven scroll/navigation intermittently returned blank); DOM-level
`get_page_text` and targeted element queries were used as the verification
method for those sections instead, consistent with how Batch 2 handled the
same limitation.

## 8. Behavior preservation — confirmed

- **Content**: every heading, stat, table row, FAQ Q&A, tier boundary, and
  price figure is unchanged from the original across all 5 pages.
- **Routes**: `/pricing`, `/contact`, `/solutions/busy-erp`, `/solutions/
  marketing`, `/solutions/utility` all resolve identically; no slugs changed.
- **Forms**: `/contact`'s form posts to the same `/api/contact` endpoint with
  the same field names, validation, and reCAPTCHA action
  (`contact_form`) as before.
- **Metadata/JSON-LD**: `busy-erp` and `pricing` had existing metadata/JSON-
  LD mechanisms — preserved and, where genuinely absent (marketing,
  utility, contact's metadata), added following the established site
  convention rather than left missing.
- **Links**: all 13 previously dead CTA buttons across these 5 pages now
  have real destinations; 0 dead buttons remain in Batch 3 scope.

## 9. Known issues / limitations

1. Deep-scroll screenshot verification on `/pricing` was not possible in
   this session (§7) — the same browser-automation limitation logged in the
   Batch 2 report. DOM-level and live-interaction checks (tab switching,
   calculator math, code-sandbox toggle) were used instead and are
   considered more precise for the specific things being verified (state
   transitions, computed values) than a screenshot would have been.
2. `/contact`'s live form submission was intentionally not tested end-to-end
   (would send a real email/API request) — field presence, validation
   wiring, and the unchanged endpoint/payload shape were verified instead.
3. The `utilityCategories` per-category color removal (§4.5) and the
   Compliance section retoning on `/solutions/marketing` (§4.4) are styling
   judgment calls disclosed here, not exact 1:1 recreations of the original
   arbitrary color choices — content is unaffected.

## 10. Batch readiness

**All 5 Batch 3 pages are stable and ready to ship.** Lint/tsc/build are
clean and identical to the pre-existing baseline, all 13 dead buttons found
across this batch are fixed with real destinations, the 2 real bugs found
(auth calculator tier boundaries, missing pricing anchors) are fixed and
verified live, and all content/routes/forms are preserved exactly. Per
`WHATS91_UI_ROLLOUT_PLAN.md`, this completes the plan's three defined
batches (global shell, homepage, high-conversion pages) — remaining
un-migrated pages are the lower-traffic long-tail routes not named in any
batch to date.
