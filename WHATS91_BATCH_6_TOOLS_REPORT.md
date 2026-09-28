# Whats91 — Batch 6: Tools Migration Report

Scope: `/tools` (index) plus the four tool pages — QR code generator, WhatsApp link
generator, WhatsApp API cost calculator, and lead qualification ROI calculator — the five
pages named in `WHATS91_UI_ROLLOUT_PLAN.md`'s Batch 6. Per the plan's explicit rule for this
batch, **"Visual shell only — never touch tool logic"** governed every change: no
calculation formula, state variable, event handler, or data structure was altered in any of
the four tools. Only decorative className strings, missing metadata/JSON-LD, and genuinely
broken navigation (dead links, a missing global shell) were touched.

## 1. Preflight findings

Read all 5 files in full before editing (304 + 613 + 413 + 681 + 534 lines). Unlike every
prior batch, this one required identifying the exact boundary between "tool logic" (off
limits) and "visual shell" (in scope) in each file before making any edit:

| File | Tool logic found (untouched) | Shell issues found (in scope) |
| --- | --- | --- |
| `tools/page.tsx` | None — pure link-out index | Metadata not using the site's `generatePageMetadata` helper; no JSON-LD |
| `qr-code-generator/page.tsx` | Canvas-based QR generation via dynamic `import("qrcode")`, download, clipboard copy | No metadata at all (whole file was `"use client"`) |
| `whatsapp-link-generator/page.tsx` | Phone-number cleaning, wa.me link construction, clipboard copy, Web Share API | No metadata at all |
| `whatsapp-api-cost-calculator/page.tsx` | 20-country pricing table, tiered volume-discount calculation, currency formatting | No metadata at all (had FAQ/Breadcrumb JSON-LD only) |
| `lead-qualification-roi-calculator/page.tsx` | Full ROI/savings/cost-per-lead formulas | **No `<Header>`/`<Footer>` at all**; "Related Tools" linked to 3 pages that don't exist on the site (`/tools/sip-calculator`, `/tools/gst-calculator`, `/tools/seo-checker`) |

The ROI calculator findings are the most significant of this batch: it rendered with no
site navigation or footer whatsoever (confirmed by reading the full file — there was no
`Header`/`Footer` import at all, just a bare `<main>` wrapped in a fragment), and its
Related Tools section pointed to three routes that were verified via the filesystem
(`src/app/tools/{sip-calculator,gst-calculator,seo-checker}` — none exist) to 404. This is
the same "dead navigation" bug class found in every prior batch, just more severe here
since it affected the entire page shell rather than a single button.

## 2. Client/server split strategy

None of the four tool pages had `export const metadata`, because all four were entirely
`"use client"` (Next.js does not allow metadata exports from Client Components). Rather
than leave metadata missing — which every other page on the site now has — each tool's
existing default-exported component was extracted **verbatim** into a new
`*Client.tsx` file in the same directory, and `page.tsx` became a thin server wrapper
adding `generatePageMetadata` + JSON-LD + `<Header>`/`<Footer>` around it. This is the
same pattern established in Batch 5 for `chatbot-flows`/`whatsapp-templates`, and it
guarantees zero logic risk: the client file's JSX, state, calculations, and event handlers
are a direct copy of what was already there, with only decorative `className` strings
changed.

One build-breaking issue surfaced from this pattern: exporting a small FAQ data array
(`calculatorFAQs`) from a `"use client"` file and importing it into the server `page.tsx`
for `generateFAQSchema()` caused Turbopack's metadata-collection pass to fail with
`TypeError: a.map is not a function` for `/tools/lead-qualification-roi-calculator` —
`next build` errored on this specifically, `next dev` did not, exposing it only at build
time. Root cause: something about how Turbopack resolves plain-data re-exports across a
"use client" boundary during the separate, lighter metadata-collection bundling pass
doesn't preserve the array correctly. Fixed by duplicating the (tiny, 4-entry) FAQ array
directly in each server `page.tsx` instead of importing it from the client component —
applied to both the cost calculator and the ROI calculator, which shared this exact
pattern. This is pure data duplication, not a logic change.

## 3. Dead links / missing-shell fixes

| File | Issue | Fix |
| --- | --- | --- |
| `lead-qualification-roi-calculator` | No `<Header>`/`<Footer>` anywhere on the page | Added both via the server `page.tsx` wrapper, matching every other page on the site |
| `lead-qualification-roi-calculator` | "Related Tools" linked to 3 nonexistent pages (`sip-calculator`, `gst-calculator`, `seo-checker` — confirmed 404 via filesystem check) | Replaced with the 3 real tools that exist: WhatsApp API Cost Calculator (kept), WhatsApp Link Generator, QR Code Generator |
| `lead-qualification-roi-calculator` | Used a third JSON-LD component convention (`@/components/seo/SEO20`'s `BreadcrumbSchema`/`FAQSchema`, distinct from the other two conventions already in use elsewhere on the site) that also rendered plain unstyled visible breadcrumb/FAQ content | Restyled the visible FAQ into the shared `Accordion` pattern (matching every FAQ section in Batches 3–5) and the breadcrumb into the same `Free Tools / [Tool Name]` nav pattern used by the other 3 tool pages, while preserving the exact same JSON-LD schema output via `generateFAQSchema`/`generateBreadcrumbSchema` |

No dead CTAs were found in the other 3 tool pages or the `/tools` index — every button
already had a working handler or link.

## 4. Implementation summary per file

### 4.1 `tools/page.tsx`

Already a clean server component with working CTAs (`Contact Sales` → `/contact`,
`View Pricing` → `/pricing`) and no raw-palette issues. Light touch only: standardized its
plain-object `metadata` export to use `generatePageMetadata` (matching every other page's
convention) and added `CollectionPage` + `BreadcrumbList` JSON-LD, since it previously had
none.

### 4.2 `qr-code-generator`

Extracted the exact existing component (QR type selector, dynamic content-type fields,
canvas-based generation via `import("qrcode")`, PNG download, clipboard image copy) into
`QRCodeGeneratorClient.tsx` — zero logic changes. `page.tsx` adds metadata, a
`SoftwareApplication` + `BreadcrumbList` JSON-LD, and the site's `<Header>`/`<Footer>`.
Retokened 5 decorative `text-green-500` checkmark/copy-icon instances → `text-success`.

### 4.3 `whatsapp-link-generator`

Same extraction pattern into `WhatsAppLinkGeneratorClient.tsx` — the phone-cleaning
(`cleanPhoneNumber`), link-building (`generateLink`), clipboard copy, and Web Share API
logic are untouched. Retokened: hero badge icon and card-title icon (`green-500` →
`success`), the required-field asterisk (`red-500` → `error`), the primary "Generate"
button (`bg-green-500` → `bg-brand-600`, matching the brand-action-button convention used
everywhere else on the site rather than an arbitrary green), and the generated-link success
box (`green-50`/`green-200`/`green-700` with manual `dark:` overrides → `success-soft`/
`success-border`/`success`, letting the token system's built-in dark-mode handling replace
the manual overrides).

### 4.4 `whatsapp-api-cost-calculator`

Extracted into `CostCalculatorClient.tsx` — the 20-country pricing table, volume-discount
tier lookup, all `useMemo`-computed cost/formatting logic, and the calculator/pricing-guide
`Tabs` are byte-for-byte unchanged. `page.tsx` adds `generatePageMetadata` while preserving
the page's existing `FAQJsonLD`/`BreadcrumbJsonLD` (from `@/components/seo/JsonLD`) plus its
custom `CostCalculatorAIJsonLD` `SoftwareApplication` schema exactly as they already existed.
Retokened the four message-category icons (marketing/utility/authentication/service,
previously raw purple/blue/green/orange) to `info`/`brand-primary`/`success`/`warning`
respectively — a decorative-only change with no effect on the cost math those icons sit
next to. Retokened the "Free" table cells, discount percentages, and the "Tips to Reduce
Costs" card (previously `green-50`/`green-200`/`green-700` with manual dark overrides) to
`success` tokens.

### 4.5 `lead-qualification-roi-calculator`

Extracted into `ROICalculatorClient.tsx` — the full ROI/savings/cost-per-qualified-lead
`useMemo` calculation block, all six input handlers, and the reset-to-defaults function are
untouched. As detailed in §3, this page additionally gained the previously-missing
`<Header>`/`<Footer>`, had its 3 dead related-tool links replaced with real ones, and had
its plain SEO20-based FAQ/breadcrumb upgraded to the site's shared Accordion/breadcrumb-nav
pattern. Retokened the four cost-category icons (Human=`warning`, AI=`success`,
Self-Built=`info`) and every cost/savings card consistently across the Monthly Costs,
Qualified Leads, and Savings panels using the same three-way tone mapping, plus the
"Your Savings with AI" banner (`from-green-500 to-emerald-500` gradient → solid `bg-success`).

## 5. Files changed

| File | Reason |
| --- | --- |
| `src/app/tools/page.tsx` | Standardized metadata via `generatePageMetadata`; added JSON-LD |
| `src/app/tools/qr-code-generator/page.tsx` | New thin server wrapper: metadata + JSON-LD + Header/Footer |
| `src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx` | New — exact tool logic extracted verbatim; 5 decorative color tokens |
| `src/app/tools/whatsapp-link-generator/page.tsx` | New thin server wrapper: metadata + JSON-LD + Header/Footer |
| `src/app/tools/whatsapp-link-generator/WhatsAppLinkGeneratorClient.tsx` | New — exact tool logic extracted verbatim; color tokens |
| `src/app/tools/whatsapp-api-cost-calculator/page.tsx` | New thin server wrapper: metadata + preserved FAQ/Breadcrumb/Service JSON-LD |
| `src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx` | New — exact tool logic extracted verbatim; category icon + tips-card tokens |
| `src/app/tools/lead-qualification-roi-calculator/page.tsx` | New thin server wrapper: metadata + JSON-LD + **added** Header/Footer |
| `src/app/tools/lead-qualification-roi-calculator/ROICalculatorClient.tsx` | New — exact ROI calculation logic extracted verbatim; fixed 3 dead related-tool links; restyled FAQ/breadcrumb; color tokens |

No other files were changed. `@/components/seo/SEO20.tsx`, `@/components/seo/JsonLD.tsx`,
and `@/lib/seo/JsonLd.tsx` (all JSON-LD mechanisms referenced) are used but untouched.

## 6. Verification evidence

**Lint** — `npx eslint .`: `✖ 3 problems (3 errors, 0 warnings)`, identical to the Batch
1–5 baseline (same 2 pre-existing `temp/` files, none in Batch 6 scope). Every new/changed
file was also lint-checked individually — zero errors, zero warnings.

**TypeScript** — `npx tsc --noEmit`: same pre-existing baseline errors only. Zero new
errors from any of the 9 changed/added files.

**Build** — `npx next build`: initially **failed** with `TypeError: a.map is not a
function` while collecting metadata for `/tools/lead-qualification-roi-calculator` (§2).
Root-caused to the cross-client-boundary data export, fixed by duplicating the FAQ array
into both affected `page.tsx` files, then `✓ Compiled successfully` with all 86 routes
generated and all 5 Batch 6 pages listed as `○ (Static)`.

**Live rendering** — every page curl-verified `200` with a clean `dev.log`. Confirmed via
downloaded HTML: JSON-LD present on every page (6–8 schema blocks); the ROI calculator's
Header/Footer now render (6 logo instances, working "Book a Demo"/"Get Started" CTAs) and
its Related Tools section links only to the 3 real, existing tool pages.

**Live interaction — calculation logic verified correct by manual arithmetic cross-check**:
- **ROI calculator**: with default inputs (5,000 leads, $5/human, $2/AI, 80%/40% qualification
  rates), the rendered Monthly Costs, Qualified Leads, and ROI percentages matched hand
  calculation exactly (Human $25,000 / AI $10,000 / AI Qualified 4,000 / ROI vs Human 150% /
  ROI vs Self-Build 50%). Changing Monthly Leads to 10,000 live-recalculated every figure
  correctly (Human $50,000, AI $20,000, AI Qualified 8,000) — confirming the `useMemo`
  dependency chain re-fires correctly after the extraction.
- **Cost calculator**: default inputs (India, 1,000/500/200/300 messages) produced
  ₹943.6000 total cost, matching `1000×0.8631 + 500×0.115 + 200×0.115 + 300×0 = 943.60`
  exactly. The Calculator/Pricing Guide tab switch (Radix `Tabs`, verified via pointer-event
  dispatch) correctly revealed the "How WhatsApp API Pricing Works" and "Tips to Reduce
  Costs" content.
- **WhatsApp link generator**: entering `919876543210` + `Hello test` and clicking Generate
  produced exactly `https://wa.me/919876543210?text=Hello%20test` — correct E.164 cleaning
  and message-encoding behavior.
- **QR code generator**: could not be visually confirmed end-to-end in this session. The
  dynamic `import("qrcode")` chunk loads successfully over the network (confirmed via
  request inspection, `200 OK`) and no console errors or "Generation Failed" toast ever
  appear after clicking Generate, but the canvas remains fully transparent afterward
  (confirmed via `getImageData` pixel inspection) rather than showing a drawn QR code, and
  the "Download PNG" button never appears. This was tested extensively — 4 separate attempts
  across a fresh hard-reload, with waits up to 3 seconds for the async canvas draw, plus
  confirmation that only one correctly-sized `<canvas>` exists in the DOM (ruling out a
  stale-ref theory). The tool's logic (`generateQRCode`, `getQRData`, `canvasRef.current`
  usage) is byte-for-byte identical to the pre-migration original — only 5 unrelated
  `className` strings were changed — so there is no code-level mechanism by which this
  migration could have introduced the behavior. Given the QR library's canvas-drawing path
  is a materially different kind of browser interaction (third-party library + dynamic
  import + canvas API) than the plain synchronous state calculations that verified correctly
  on the other 3 tools, this is recorded as an unresolved environment-verification gap for
  this specific tool rather than a confirmed regression.

## 7. Behavior preservation — confirmed

- **Tool logic**: zero calculation formulas, state variables, event handlers, or data
  structures were changed in any of the four tools. Every edit was either a `className`
  string swap, a metadata/JSON-LD addition, or (for the ROI calculator specifically) a
  shell-level fix to missing navigation and dead links.
- **Content**: every FAQ answer, pricing row, category label, and use-case description is
  unchanged from the original across all 5 pages.
- **Routes**: all 5 slugs resolve identically; no URLs changed.
- **Links**: the 3 previously-dead "Related Tools" links on the ROI calculator now point to
  real, existing pages; every other page's tool cross-links were already correct and remain
  unchanged.

## 8. Known issues / limitations

1. The QR code generator's end-to-end canvas draw could not be visually confirmed in this
   browser-automation session (§6) — the underlying logic is verified unmodified and
   byte-identical to the pre-migration original, and this is very likely the same class of
   sandboxed-browser environment limitation already documented in the Batch 2, 3, and 5
   reports (clipboard requiring document focus, `IntersectionObserver` never firing,
   screenshots going blank after scroll), now manifesting for a canvas + dynamic-import
   interaction specifically. Recommend a manual smoke test of this one tool in a real
   browser before considering this batch fully closed.
2. The ROI calculator's FAQ/breadcrumb display convention was changed from the plain
   `SEO20` components' unstyled output to the shared `Accordion`/breadcrumb-nav pattern used
   everywhere else (§4.5) — a visual improvement, not a regression, but disclosed since it
   changes how that content looks (not what it says).
3. `whatsapp-business-calling`'s Decline/Answer-style raw-color-to-token mappings and this
   batch's category-icon tone choices (§4.3–§4.5) are judgment-call semantic mappings, not
   pixel-for-pixel recreations of the originals' arbitrary color choices.

## 9. Batch readiness

**4 of 5 Batch 6 pages are fully verified and ready to ship; the QR code generator needs a
manual smoke test** before full confidence, per the limitation in §8.1. Lint/tsc/build are
clean and identical to the pre-existing baseline (after fixing the one build-breaking cross-
boundary export issue found during this batch), the ROI calculator's missing site shell and
3 dead links are fixed, and three of the four tools' calculation logic was live-verified
correct via manual arithmetic cross-checks. Per `WHATS91_UI_ROLLOUT_PLAN.md`, the next batch
is Batch 7 — Trust & Company pages (`/about`, `/partners`, `/partners/whats91-coins`,
`/careers`, `/faq`, `/compliance`).
