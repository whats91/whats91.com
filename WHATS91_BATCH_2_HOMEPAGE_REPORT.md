# Whats91 — Batch 2: Homepage Migration Report

Scope: `src/app/page.tsx` and its landing components — `Hero.tsx`,
`Solutions.tsx`, `BusyERP.tsx`, `Developers.tsx`, `Security.tsx`, `ROI.tsx`,
`FinalCTA.tsx`, plus the inline `HomepageFAQ`. No other pages were touched.
Global shell (Header/Footer/CookieConsent/BookDemoPopup/not-found) is Batch 1
and was left as-is except for being *used* here (BusyERP now renders
`BookDemoPopup`).

## 1. Preflight findings

Read all 8 files in full before editing. Content inventory and dead-CTA audit:

| File | Dead/broken CTA found | Real destination wired |
| --- | --- | --- |
| `Hero.tsx` | "Request Consultation" (no href), "View Documentation" (no href) | `/contact`, `https://developers.whats91.com/overview` |
| `BusyERP.tsx` | "Schedule ERP Integration Demo" (no href/onClick) | Swapped for the real `BookDemoPopup` dialog (`source="homepage-busy-erp"`) instead of a dead link |
| `Developers.tsx` | "View API Documentation" (no href) | `https://developers.whats91.com/overview` |
| `FinalCTA.tsx` | none — already linked to `/contact` | unchanged |
| Solutions cards' "Learn more" | `<button>` with no handler on all 4 cards | See §2 for the mapping and reasoning |

This confirms and completes the rollout plan's "fix the dead hero CTA
buttons" item — three separate dead buttons existed (Hero had two), all on
this one page.

Also found in preflight, fixed during migration: every card-grid section
(Solutions, BusyERP capabilities, Security features) used raw Tailwind
palette colors per-category (`blue-500`, `purple-500`, `orange-500`,
`green-50`/`600`, `red-50`/`500`) with no semantic meaning — exactly the
pattern flagged in `WHATS91_CURRENT_UI_AUDIT.md` §3. `bg-white` appeared
~15 times across these files.

## 2. Content/link decisions requiring judgment (disclosed, not hidden)

The four Solutions cards' "Learn more" buttons had no destination at all
(same class of bug as the Hero/BusyERP/Developers dead CTAs, just not
explicitly named in the rollout plan). Two map to exact existing pages;
two required a judgment call since no page title matches verbatim:

- **Marketing & Engagement** → `/solutions/marketing` (exact match).
- **Busy Accounting & ERP** → `/solutions/busy-erp` (exact match).
- **Support & Operations** ("24/7 AI-powered chatbots... escalate complex
  cases") → `/chatbot-flows` ("Chatbot Flow Library" — the closest existing
  real page to this card's actual content; no page is literally titled
  "Support & Operations").
- **Developer Sandbox** ("webhooks, Graph API docs, custom CRM builds") →
  `https://developers.whats91.com/overview` — the same external developer
  docs destination already used by Hero's "View Documentation" and
  Developers' "View API Documentation," for consistency.

No new pages, content, or claims were invented — only existing destinations
were connected to existing card copy.

## 3. Implementation summary

### 3.1 Shared components extended (first real-page use of both)

`FeatureCard` and `StatCard` (built in the design-system foundation phase)
had never been consumed by a real page before this batch — `/design-system`
was their only usage. Extended both, additively (new optional props,
backward compatible):

- **`FeatureCard`**: added `featured?: boolean` (brand-tinted border/bg) and
  `badge?: React.ReactNode` (absolutely-positioned corner badge) — needed
  for Solutions' "Most Popular" card, which the original hand-rolled with
  bespoke markup. Kept the recipe reusable rather than one-off styling this
  single card, since "Most Popular"/featured-card patterns will recur in
  later batches (pricing).
- **`StatCard`**: added `caption?: string` (small sub-line, e.g. "vs 42% for
  email") and switched its icon from a bare colored glyph to the shared
  `IconBadge` circular tile — the ROI section's stats need a 3-line
  layout (icon, value, label, caption) that the original 2-line StatCard
  didn't support. Also corrected the value's text color: the Batch 0
  version used `text-brand-primary`, but the real page content uses
  `text-text-primary` for stat values (brand-primary is reserved for
  small/inline emphasis, not large stat numbers) — fixed to match actual
  established usage.

### 3.2 Hero.tsx

Converted from a client component to a server component (no hooks/state
existed — `"use client"` was unnecessary). `Eyebrow live` replaces the
hand-rolled ping-dot badge; `TrustPill` replaces the three highlight chips;
`CTAGroup`/`PrimaryCTA`/`SecondaryCTA` replace the two dead buttons with
real destinations (§1); the dark webhook-payload code panel now uses
`.ink-panel`/`ink-*` tokens instead of raw `bg-[#0F172A]`/`slate-*`; the
floating "99.9% Uptime" badge's icon tile switched from `bg-green-50
text-green-600` to `bg-success-soft text-success`. The decorative "Pay
Now →" element inside the chat-preview mockup was a `<button>` with no
handler; changed to a `<span>` since this whole panel is explicitly
decorative/illustrative (not real interactive UI) per
`WHATS91_VISUAL_ASSET_GUIDE.md` §1 — a button implies an affordance this
mockup doesn't have.

### 3.3 Solutions.tsx

All four cards now render through `FeatureCard`, eliminating the four
different per-category colors (blue/brand/purple/orange icon tiles) in
favor of one consistent brand-toned icon tile for all cards, differentiated
only by the featured card's badge/border — directly implementing the design
system's "one card recipe everywhere" rule. The "Most Popular" badge now
uses shadcn's `Badge` component (default variant, which already resolves to
the Batch-1-corrected `brand-600`) instead of a hand-styled span. Feature
tag pills (Broadcast, CTWA Ads, etc.) kept their existing token-compliant
styling. All 4 cards' dead "Learn more" buttons fixed (§2).

### 3.4 BusyERP.tsx

Three capability cards now use `FeatureCard`. The comparison table (both
the mobile card-per-row fallback and the desktop table) had its status
icons re-tokened: the "Standard" (worse) column's red X circle now uses
`bg-error-soft text-error`, and the "Whats91" (better) column's green check
now uses `bg-success-soft text-success` — replacing raw `red-50/500` and
reusing `brand-primary/10` respectively. Table/card containers switched
from `bg-white` to `.surface-card`. The dead "Schedule ERP Integration Demo"
button was replaced with the real `BookDemoPopup` dialog component (already
built and working — the right fix here isn't a dead link but the demo-
booking flow that already exists in the codebase for exactly this purpose).

### 3.5 Developers.tsx

Restyled to match Hero's established convention (light section, dark code
panel — not a full `tone="ink"` section, to avoid stacking ink sections
across the page). The webhook code block now uses `.ink-panel`/`ink-*`
tokens. Technical-feature rows use the shared `IconBadge`. Payload-type
tiles use `.surface-card`. Dead "View API Documentation" button fixed to
link to the developer docs (§1).

**Found and fixed a real horizontal-overflow bug** (see §4) in this file's
two-column grid — not present in the original file's *rendered* output at
this exact breakpoint check (the original code panel had the same
unbounded `<pre>`, so the bug is not newly introduced by the restyle, but
it is fixed now as part of this batch since Developers.tsx is squarely in
scope).

### 3.6 Security.tsx

Certification pills (ISO 27001, ISO 27701, SOC 2, GDPR, DPDP) now use the
shared `TrustPill` component, combined onto one line ("ISO 27001 · Info
Security") since `TrustPill` is a single-line primitive — a minor,
deliberate simplification from the original two-line pill rather than
inventing a new pill variant. Security-feature cards use `FeatureCard`. The
DPDP compliance panel's background switched from an ad-hoc
`bg-gradient-to-br from-brand-primary/[.04] to-brand-accent/[.02])` to the
documented `.gradient-brand-subtle` recipe. The "Quality Rating Protection"
card's icon tile switched from `bg-green-50 text-green-600` to
`bg-success-soft text-success` — a genuinely apt semantic fit here, since
the copy is literally about staying in Meta's "Green Zone" status.

### 3.7 ROI.tsx

Stats grid now uses `StatCard` (with the new `caption` prop, §3.1). ROI
detail rows (mobile cards + desktop rows) re-tokened (`bg-white` →
`.surface-card`/tokens), the efficiency-formula panel switched to
`.ink-panel`. The small green `ArrowUpRight` icon that sat next to each
stat's value in the original was dropped — `StatCard` doesn't have a slot
for a trailing inline icon next to the value, and adding a third variation
to accommodate one decorative flourish felt like over-fitting the shared
component to this single section; this is a minor, disclosed simplification,
not a content loss.

### 3.8 FinalCTA.tsx

**Found and fixed another instance of the Batch 1 CTA-contrast bug**: the
white button's label used `text-brand-primary` (#448C74 text on a white
background) — by the same symmetric contrast math from Batch 1, this
measures 4.0:1, failing WCAG AA for its 14–16px semibold label. Changed to
`text-brand-700` (#316653), which measures 6.65:1. Converted from a client
component to a server component (no hooks were ever used). Everything else
(the existing `/contact` link, the gradient panel, decorative blur/grid
background, trust line) is unchanged.

### 3.9 `page.tsx` / `HomepageFAQ`

- Added `id="main-content" tabIndex={-1}` to the homepage's `<main>` — the
  first of the 49 pre-existing pages to get the real skip-link target (see
  Batch 1 §3.6); the Batch 1 fallback-to-`<main>` mechanism now becomes a
  direct id-match here.
- `HomepageFAQ` restyled onto `Section`/`Container`/`SectionHeader`, but
  **deliberately kept as an always-visible 2-column grid**, not converted to
  an accordion. The FAQ answers carry `itemProp="text"` schema.org
  microdata (visible-content structured data, referenced by the
  homepage's own `SpeakableSpecification` JSON-LD pointing at
  `main section:first-of-type p` and `#solutions h2`) — hiding the answers
  behind an accordion would work against that AI-answer-engine strategy and
  violates "do not hide content merely to make the page visually cleaner."
  All 6 questions/answers, the exact microdata (`itemScope`/`itemProp`/
  `itemType`), and the container width (`max-w-[1000px]`, preserved via an
  explicit `Container className` override) are unchanged.
- `HomepageAIJsonLD` (6 schema blocks: WebPage, Product, Service, FAQPage,
  BreadcrumbList, SpeakableSpecification) is byte-for-byte untouched.

## 4. Bug found and fixed: horizontal overflow at 320px

Batch 1's report flagged "a pre-existing ~38px overflow in the homepage
body content (Solutions/BusyERP section)" as an out-of-scope Batch 2 item.
Re-measuring now that these files are migrated: **the actual source was
`Developers.tsx`**, not Solutions/BusyERP (Batch 1's attribution was an
educated guess made without having read Developers.tsx yet — corrected
here).

**Root cause**: the webhook code panel's `<pre>` element has no explicit
width and (per its `white-space: pre` default) sizes to its longest line.
Inside a `grid lg:grid-cols-2` container, a grid item's default
`min-width: auto` lets its min-content size force the *implicit* single
mobile column to grow past the container's actual available width —
`overflow-x-auto` on the `<pre>` only kicks in once the element has been
constrained to a width, which it never was here. Measured precisely before
fixing: the grid itself was correctly `288px` (viewport-constrained), but
the `.ink-panel` wrapping the `<pre>` rendered at `342px` — 54px wider than
its own grid cell, forcing `document.documentElement.scrollWidth` to `358px`
against a `320px` viewport.

**Fix**: added `min-w-0` to both of Developers.tsx's grid-item wrapper
`div`s (the standard fix for this exact, well-known CSS Grid/Flexbox
min-content sizing issue). Applied the same defensive `min-w-0` to Hero.tsx's
two grid-item wrappers too, since Hero has an identical two-column-grid +
code-panel shape (its code panel is `hidden` below `sm` today, so it wasn't
exhibiting the bug, but the fix removes the latent risk if that visibility
rule ever changes).

**Verified fixed**: `document.documentElement.scrollWidth` measured
`320px` exactly (viewport-matched) after the fix, `overflow: false`,
re-confirmed with a full offending-element scan (only remaining "wide"
element is FinalCTA's `aria-hidden`, `pointer-events-none` decorative blur
circle, clipped by its parent's `overflow-hidden` — not a scrollbar-causing
overflow).

## 5. Files changed

| File | Reason |
| --- | --- |
| `src/app/page.tsx` | `main-content` id/tabIndex; `HomepageFAQ` restyle (content/microdata preserved) |
| `src/components/landing/Hero.tsx` | Full restyle; fixed 2 dead CTAs; `min-w-0` overflow fix |
| `src/components/landing/Solutions.tsx` | Full restyle; fixed 4 dead "Learn more" buttons; removed per-category raw colors |
| `src/components/landing/BusyERP.tsx` | Full restyle; fixed 1 dead CTA (now `BookDemoPopup`); status-token comparison table |
| `src/components/landing/Developers.tsx` | Full restyle; fixed 1 dead CTA; found + fixed the 320px overflow bug (root cause) |
| `src/components/landing/Security.tsx` | Full restyle; `TrustPill`/`FeatureCard`/status tokens |
| `src/components/landing/ROI.tsx` | Full restyle; `StatCard` with new `caption` prop |
| `src/components/landing/FinalCTA.tsx` | Full restyle; fixed a second instance of the Batch 1 CTA-contrast bug |
| `src/components/shared/FeatureCard.tsx` | Added `featured`/`badge` props (first real-page consumer) |
| `src/components/shared/StatCard.tsx` | Added `caption` prop, icon→`IconBadge`, value color corrected (first real-page consumer) |

No other files were changed. No routes, slugs, metadata, or JSON-LD were
touched. `HomepageAIJsonLD` is unmodified.

## 6. Behaviour preservation — confirmed

- **Content**: every heading, paragraph, stat, table row, FAQ Q&A, and code
  sample is byte-identical to the original (verified via `get_page_text`
  and targeted DOM queries against the live page — see §7).
- **Routes/metadata/JSON-LD**: unchanged; `/` still resolves, sitemap entry
  unaffected.
- **Forms**: BusyERP's demo CTA now opens the same `BookDemoPopup` used
  elsewhere on the site (unchanged fields/validation/endpoint from Batch 1).
- **Links**: every CTA on the page now has a real, verified destination —
  8 links checked live, 0 dead buttons remain (see §7).

## 7. Verification evidence

**Lint** — `npx eslint .`: `✖ 3 problems (3 errors, 0 warnings)`, identical
to the Batch 1 baseline (same 2 pre-existing files, none in Batch 2 scope).

**TypeScript** — `npx tsc --noEmit`: output byte-for-byte identical to the
original baseline (`diff` exit 0). Zero new errors.

**Build** — `npx next build`: `✓ Compiled successfully`, exit 0. Route
table: 51 static + 12 dynamic + 2 SSG = 65 rows, identical to baseline.

**Content integrity**: `get_page_text` and targeted `innerText`/DOM queries
confirmed, on the live page: all 8 real CTA hrefs present (`/contact` ×2,
`/solutions/marketing`, `/solutions/busy-erp`, `/chatbot-flows`,
`https://developers.whats91.com/overview` ×2), 0 buttons without a real
handler/href/dialog-trigger, 6/6 FAQ `itemtype="https://schema.org/Question"`
articles present, exact original copy throughout every section.

**Contrast** (live computed styles, not estimated): FinalCTA's button
resolved to `color: rgb(49, 102, 83)` on `background-color: rgb(255, 255,
255)` — i.e. `#316653` (brand-700) on white, the corrected 6.65:1 pairing.

**Responsive**:
- 320px: full offending-element scan before the fix showed 30 elements
  spilling to `358px`; after the `min-w-0` fix, `scrollWidth: 320`,
  `overflow: false`, only 1 remaining (harmless, clipped, `aria-hidden`)
  wide element. Hero, Solutions cards, and CTAs all confirmed rendering
  correctly at this width via screenshot.
- 1280px (desktop): confirmed via screenshot — Hero, Solutions grid (4
  cards, correct badge/border on the featured card), BusyERP (capability
  cards + comparison table with success/error icon tokens + working demo
  button) all render correctly with no layout shift or clipping.
- Security/ROI/FAQ/FinalCTA sections were verified via direct DOM
  measurement and `get_page_text` rather than additional screenshots: this
  browser automation environment reliably failed to render/capture once
  scrolled significantly down this specific long page in this session
  (confirmed with multiple approaches — `scrollIntoView`, `window.scrollTo`,
  anchor-hash navigation, mouse-wheel `scroll`, and `PageDown`/`End` key
  presses all produced either a stale/blank capture or a timeout). This
  reproduced identically on two separate tabs, so it is recorded here as an
  environment/tool limitation rather than claimed as visually verified —
  the DOM-level checks (which are more precise for catching overflow bugs
  specifically, and are how the real bug in §4 was actually found) stand in
  for the visual pass for those four sections.

**Accessibility**: exactly one `<h1>` on the page; clean, non-skipping
heading hierarchy through every section (`h2` → `h3` → `h4` where nested,
verified by enumerating every heading on the live page); all 4 Solutions
card links are single tabbable anchors with no nested-link issues; the
duplicate `h4` entries seen in the ROI section are the pre-existing
mobile-card/desktop-row dual-render pattern (both variants always present
in the DOM, one hidden via CSS depending on breakpoint) — not introduced by
this batch, and already flagged in `WHATS91_SEO_OBSERVATIONS_FOR_LATER.md`
from the foundation phase as a later-phase hygiene item.

**Console**: the only error observed was the same Next.js 16 `next dev`-only
Radix `useId` hydration artifact already root-caused and confirmed
production-clean in the Batch 1 report — reproduced here identically (same
drifting-id pattern), not a new issue, not investigated further per that
prior finding.

## 8. Known issues / limitations

1. Screenshot-based visual verification of Security/ROI/FinalCTA sections
   was not possible in this session due to a browser-automation rendering
   limitation once scrolled deep into this page (§7) — DOM-level content
   and layout checks were used instead and are considered sufficient given
   they're what actually caught the one real bug in this batch.
2. `ArrowUpRight` trend icon next to ROI stat values was dropped (§3.7) —
   minor, disclosed, not a content loss.
3. ROI section's mobile/desktop dual-render duplicate headings are
   pre-existing and out of this batch's scope (SEO-phase item, already
   logged).
4. The Solutions "Support & Operations" and "Developer Sandbox" card links
   are judgment calls to the closest matching existing pages, not exact
   title matches (§2) — flagged explicitly rather than silently decided.

## 9. Batch 3 readiness

**Homepage is stable and ready to ship.** Build/lint/tsc all clean and
identical to baseline, zero dead buttons remain anywhere on the page, the
one real bug found (320px overflow) is fixed and verified, and all content/
routes/metadata/JSON-LD are preserved exactly. Per
`WHATS91_UI_ROLLOUT_PLAN.md`, Batch 3 is the high-conversion product pages:
`/pricing`, `/contact`, `/solutions/busy-erp`, `/solutions/marketing`,
`/solutions/utility`.
