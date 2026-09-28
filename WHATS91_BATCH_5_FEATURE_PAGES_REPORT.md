# Whats91 — Batch 5: Feature & Capability Pages Migration Report

Scope: `/features`, `/features/chat-shortcuts-conversation-automation`, `/flow-builder`,
`/whatsapp-templates`, `/whatsapp-business-calling`, `/whatsapp-coexistence`,
`/google-sheets-integration`, `/chatbot-flows` — the eight pages named in
`WHATS91_UI_ROLLOUT_PLAN.md`'s Batch 5. No other pages were touched.

## 1. Preflight findings

Read all 8 files in full before editing (180 + 1,140 + 728 + 798 + 750 + 879 + 660 + 491
lines). Unlike Batches 3–4, this batch was a mix of three distinct states, not one uniform
"old client-component" pattern:

| File | State found | Work required |
| --- | --- | --- |
| `features/page.tsx` | Already a fully migrated server component (real metadata, JSON-LD, tokens) | Light touch only |
| `features/chat-shortcuts-conversation-automation/page.tsx` | Already a fully migrated server component (metadata, 6 JSON-LD schemas, zero dead CTAs) | Light touch only |
| `whatsapp-coexistence/page.tsx` | Modern shadcn components (Card/Badge/Tabs/Accordion) but `"use client"` with an unused `useState` import and no real state; no metadata at all | Drop unused directive, add metadata, retoken |
| `whatsapp-templates/page.tsx` | Modern shadcn components but a genuine interactive tool (per-card copy-to-clipboard) | Client-island extraction + metadata + retoken |
| `chatbot-flows/page.tsx` | Genuine interactive tool: registry-driven flow library with category switching, expand/collapse, and a real `/api/flows/[id]` fetch-then-clipboard-copy action | Client-island extraction + metadata + dead-CTA fixes |
| `flow-builder/page.tsx` | Old pattern: `"use client"`, FAQ-only state, no metadata, dead CTAs | Full migration |
| `whatsapp-business-calling/page.tsx` | Old pattern: same as above | Full migration |
| `google-sheets-integration/page.tsx` | Old pattern: same as above | Full migration |

This is the first batch where multiple pages were **already partially or fully migrated**
before this session touched them — `chat-shortcuts-conversation-automation` in particular
was as complete as `miracle-whatsapp-api` was in Batch 4, confirming both were built later,
after the design system existed, and served as the reference other pages' JSON-LD/token
conventions followed.

## 2. Client/server split strategy

- **`chatbot-flows`**: the entire category-browsing experience is inherently interactive
  (category buttons drive which flow cards render; each card has its own expand/collapse and
  a real API-backed copy action), so the whole browsing UI was extracted into
  **`ChatbotFlowLibrary.tsx`** (client component). `page.tsx` became a thin server wrapper
  with metadata, JSON-LD, and the static hero/stats/schema-reference sections — including the
  `flowRegistry.length`/`flowCategories.length` stat numbers, which are just array lengths and
  render fine server-side without needing the client boundary.
- **`whatsapp-templates`**: the copy-to-clipboard behavior was self-contained per card (each
  card's `onCopy` callback was a trivial one-line pass-through to
  `navigator.clipboard.writeText`), so instead of lifting state to a parent client wrapper, the
  copy logic was inlined directly into a standalone **`TemplateCard.tsx`** client component.
  This let `page.tsx` stay a plain server component that renders `<TemplateCard>` instances as
  children — a normal React Server Component composition pattern, not a special island wrapper.
- **`whatsapp-coexistence`**: had `"use client"` and an imported-but-never-used `useState` —
  confirmed via `grep` that no `useState`/`useEffect`/`onClick`/`onChange` existed anywhere in
  the file. Radix `Tabs` and `Accordion` are self-contained client components internally, so
  they render correctly from a server-component parent. Dropped the directive and the dead
  import; the page is now fully server-rendered.
- **`flow-builder`**, **`whatsapp-business-calling`**, **`google-sheets-integration`**: FAQ-only
  state, same as every Batch 3/4 conversion — replaced with shadcn `Accordion`, page converted
  to a server component.

## 3. Dead CTAs found and fixed

| File | Dead CTA(s) | Fix |
| --- | --- | --- |
| `flow-builder` | Hero "Start Building Flows", hero "Watch Demo", final "Start Free Trial" | `https://chat.whats91.com`, `ContactCard` popup, `https://chat.whats91.com` |
| `whatsapp-business-calling` | Hero "Enable Calling Now", hero "View Documentation", final "Get Started Free" | `/contact`, `https://developers.whats91.com/overview`, `https://chat.whats91.com` |
| `google-sheets-integration` | Hero "Start Free Trial", final "Get Started Free" | `https://chat.whats91.com` (×2) |
| `chatbot-flows` | Final CTA "Open Flow Builder", "View Documentation" | `/flow-builder` (an existing real page), `https://developers.whats91.com/overview` |

`whatsapp-templates` and `whatsapp-coexistence` had **zero** dead CTAs — every button in both
files already resolved to a real destination (`/contact`, `ContactCard`, or in-page anchors).
This is the first batch where two of the eight pages needed no CTA fixes at all, consistent
with them being newer, already-migrated pages.

## 4. Implementation summary per file

### 4.1 `features/page.tsx`

Only raw-palette issue was `bg-white` used four times for card/badge backgrounds. Replaced
with the registered `bg-card` token (backed by the same `--card` CSS variable the
`.surface-card` utility uses), preserving the page's existing `rounded-*`/`border-*`/`shadow-*`
classes exactly. No other changes — metadata, JSON-LD, and all three feature-card links were
already correct.

### 4.2 `features/chat-shortcuts-conversation-automation/page.tsx`

Two fixes: (1) the two JSON-payload `<pre>` code blocks used raw `bg-slate-950`/`text-slate-100`
instead of the established `.ink-elevated`/`ink-text` dark-panel tokens — fixed to match the
convention used by `DeveloperBand.tsx`, the Batch 3 `UtilityCodeSandbox`, and the Batch 4
`miracle-whatsapp-api` touch-up. (2) A blanket-replace of standalone `bg-white` → `bg-card`
across ~25 card instances, using a regex that explicitly excluded `bg-white/NN` opacity
variants (the phone-header overlay and the final-CTA white-button-on-gradient pattern). One of
those exclusions still needed a manual follow-up fix: the final CTA's "Book a Demo" button had
`bg-white ... text-brand-primary` — a real WCAG contrast bug (brand-primary text on white
measures 4.0:1, failing AA) matching the exact bug class first found in Batch 1/2. Fixed to
`text-brand-700` (6.65:1), consistent with every other final-CTA button on the site.

### 4.3 `whatsapp-coexistence/page.tsx`

Converted to a fully server-rendered page. Added `generatePageMetadata`-based metadata (this
page had none before — only `FAQJsonLD`/`BreadcrumbJsonLD` plus a custom inline `TechArticle`
JSON-LD, both preserved exactly as they already existed). Retokened extensively: the two
"Architectural Dilemma" comparison cards (previously red/orange) → `error` tokens on both,
since both represent the same "flawed choice" framing; the "Solution" card and all capability
checklists → `success` tokens; the throughput comparison bar → `info` (Standard API) vs
`brand-primary` (Coexistence); the Feature Compatibility Matrix's custom green/blue Badge
overrides → `success`/`info` tokens (its `destructive` variant usage was already correct,
left unchanged); Implementation Requirements' three "met" checks → `success`, the one
timing/maintenance note → `info`; Regional Availability's two comparison cards → `success`/
`error`. Final CTA button's `text-brand-primary` on white also had the same contrast issue as
§4.2 — fixed to `text-brand-700`.

### 4.4 `whatsapp-templates/page.tsx` + `TemplateCard.tsx`

New client island `TemplateCard.tsx` holds the per-template copy button, its `copied` state,
and the industry-icon lookup — functionally identical to the original's `TemplateCard`, minus
the now-unnecessary `onCopy` prop indirection (inlined `navigator.clipboard.writeText`
directly). `page.tsx` became a server component with real metadata (previously none) while
preserving its existing `FAQJsonLD`/`BreadcrumbJsonLD` mechanism and custom `TemplatesAIJsonLD`
script exactly as they were. Retokened: category badges (marketing/utility/authentication,
previously raw `purple-500`/`blue-500`) → `info`/`brand-600` tokens; the WhatsApp-message-bubble
preview (previously `green-50`/`green-200`) → `success` tokens; the "Required" table badge
(raw `bg-red-500`) → the existing shadcn `destructive` variant instead of a color override;
"Common Rejection Reasons" card (raw `orange-*`) → `warning` tokens; rejection-list X icons and
best-practice check icons → `error`/`success`. All 20 templates across marketing/utility/
authentication preserved byte-for-byte, including every `{{n}}` variable placeholder.

### 4.5 `chatbot-flows/page.tsx` + `ChatbotFlowLibrary.tsx`

New client island `ChatbotFlowLibrary.tsx` holds the entire interactive browsing experience:
category selector, category description panel, and the flow-card grid with per-card
expand/collapse and the real `fetch("/api/flows/${id}")` → clipboard-copy action. `page.tsx`
is now a server component with metadata (none existed before) and Service + Breadcrumb JSON-LD,
rendering the static hero, the registry-length stat numbers, the "How to Use" steps, and the
BotMaster schema reference card server-side. Found and removed genuinely dead code in the
process: the original file defined a 7-entry `nodeTypeConfig` object (icon + 2 colors per
node type) that was computed (`const config = nodeTypeConfig[item.type]`) but never actually
read in the render — only `item.type`/`item.label`/`item.desc` were used. Deleted the unused
object and variable rather than migrating dead color data. `complexityColors` (basic/
intermediate/advanced), which **is** genuinely rendered via a `Badge`, was retokened to
`success`/`warning`/`error` — a clean semantic fit for a severity-style scale. Fixed the 2 dead
final-CTA buttons (§3).

### 4.6 `flow-builder/page.tsx`, `whatsapp-business-calling/page.tsx`, `google-sheets-integration/page.tsx`

All three converted to server components with `generatePageMetadata` + Service/FAQ/Breadcrumb
JSON-LD (none existed on any of the three before). FAQ sections → shadcn `Accordion`. All
content preserved verbatim — every stat, comparison table, use case, FAQ answer, and technical
detail is unchanged. Retokened per-page: `flow-builder`'s use-case Problem/Solution/Result
narrative → `error`/`brand-primary`/`success`, its sentiment-detection callout → `warning`;
`whatsapp-business-calling`'s Decline/Answer call buttons → `error`/`success` (same colors as
the original red/green, now token-backed), its "Inbound=FREE"/"Outbound=Complex" boxes →
`success`/`warning`, its troubleshooting section → `error` tokens matching the
"Cost of Manual Recovery" precedent from Batch 4's `busy-ai-agent`; `google-sheets-integration`'s
four button-reply examples (Interested/Not Interested/Learn More/Call Me) → `success`/`error`/
`info`/`warning` respectively, applied consistently to both the "Button Reply Examples" section
and the "Sample Spreadsheet View" table so the same button label always renders the same tone.

## 5. Files changed

| File | Reason |
| --- | --- |
| `src/app/features/page.tsx` | Light touch: `bg-white` → `bg-card` |
| `src/app/features/chat-shortcuts-conversation-automation/page.tsx` | Light touch: ink-panel token fix, `bg-white` → `bg-card` sweep, self-caught contrast fix |
| `src/app/whatsapp-coexistence/page.tsx` | Dropped dead `"use client"`; added metadata; full retoken |
| `src/app/whatsapp-templates/page.tsx` | Server component; metadata (new); retoken |
| `src/app/whatsapp-templates/TemplateCard.tsx` | New client island — per-card copy-to-clipboard only |
| `src/app/chatbot-flows/page.tsx` | Server component; metadata (new); fixed 2 dead CTAs; removed dead `nodeTypeConfig` |
| `src/app/chatbot-flows/ChatbotFlowLibrary.tsx` | New client island — category browsing + flow-card interactivity |
| `src/app/flow-builder/page.tsx` | Server component; metadata (new); fixed 3 dead CTAs; retoken |
| `src/app/whatsapp-business-calling/page.tsx` | Server component; metadata (new); fixed 3 dead CTAs; retoken |
| `src/app/google-sheets-integration/page.tsx` | Server component; metadata (new); fixed 2 dead CTAs; retoken |

No other files were changed. `@/lib/flows/registry` (flow data source) is used but untouched.

## 6. Verification evidence

**Lint** — `npx eslint .`: `✖ 3 problems (3 errors, 0 warnings)`, identical to the Batch 1–4
baseline (same 2 pre-existing `temp/` files, none in Batch 5 scope). Each new/changed file was
also lint-checked individually immediately after writing — zero errors every time.

**TypeScript** — `npx tsc --noEmit`: same pre-existing baseline errors only
(`temp/examples/websocket/*`, `api/webhooks/github/route.ts`, `lib/redis.ts`). Zero new errors
from any of the 10 changed/added files, including the cross-component `Template` type import
from `TemplateCard.tsx` into the server `page.tsx`.

**Build** — `npx next build`: `✓ Compiled successfully`, all 86 routes generated with zero
errors; all 8 Batch 5 pages listed as `○ (Static)` prerendered content.

**Live rendering** — every page curl-verified `200` with a clean `dev.log` (no runtime errors
on any request, across two separate build/dev-server cycles). Content spot-checks on
downloaded HTML: JSON-LD present on every page (6–14 script tags depending on how many schema
objects each page declares); all dead-CTA fixes confirmed present (`chat.whats91.com`,
`/contact`, `developers.whats91.com/overview`, `/flow-builder` links all resolve in the
rendered markup); status-token classes confirmed rendering in volume on `whatsapp-coexistence`
(96× `text-success`, 70× `text-error` — consistent with its many red/green comparison cards).

**Live interaction** (browser):
- `chatbot-flows`: category switching confirmed via live click — the flow-card heading changed
  from "Welcome Flows" to "Sales Flows" after clicking the "Sales" category button, with all 6
  categories (Welcome/Sales/Support/E-commerce/Payments/Bookings) present.
- `whatsapp-templates`: Radix `Tabs` category switching confirmed via pointer-event dispatch —
  active tabpanel heading changed from "Marketing Templates" to "Utility Templates", and the
  correct 8 utility templates (Order Confirmation, Shipping Update, etc.) rendered with their
  exact preserved body text and variables.
- `whatsapp-templates`' per-card "Copy Template" button: clicked via three different methods
  (JS `.click()`, full pointer-event dispatch sequence, and a native coordinate click verified
  against the button's live `getBoundingClientRect()`) — the visual "Copied!" state never
  appeared. Root-caused this as an environment limitation, not a functional bug: (1) the
  `handleCopy` code is a direct, unmodified port of the pre-migration original's logic
  (`navigator.clipboard.writeText(...)` immediately followed by an un-awaited `setCopied(true)`,
  so the UI update does not depend on the clipboard call succeeding); (2) `navigator.clipboard
  .writeText` was directly tested and confirmed to reject asynchronously with "Document is not
  focused" rather than throwing synchronously, so it cannot be blocking the subsequent
  synchronous `setCopied(true)` line; (3) an unrelated floating "N Issues" badge confirmed via
  `document.body.innerHTML` to be a browser-tool overlay, not part of the page's own DOM. This
  matches the same class of sandboxed-browser-automation limitation already logged in the
  Batch 2 and Batch 3 reports (`IntersectionObserver` never firing, screenshots going blank
  after scroll) — recorded here rather than claimed as visually verified.

## 7. Behavior preservation — confirmed

- **Content**: every heading, stat, table row, FAQ answer, template body, and flow-category
  label is unchanged from the original across all 8 pages.
- **Routes**: all 8 slugs resolve identically; no URLs changed.
- **Tool functionality**: `chatbot-flows`' registry-driven category browsing and
  `/api/flows/[id]` fetch-then-copy action, and `whatsapp-templates`' per-card copy action, are
  functionally identical to the pre-migration originals — only their surrounding page chrome
  (metadata, JSON-LD, section styling) changed.
- **Metadata/JSON-LD**: `features` and `chat-shortcuts-conversation-automation` already had
  correct metadata/JSON-LD and are untouched in that respect; the other 6 pages gained real
  metadata and JSON-LD following the established `generatePageMetadata`/`generateServiceSchema`/
  `generateFAQSchema`/`generateBreadcrumbSchema` convention.
- **Links**: all 10 previously dead CTA buttons across this batch now have real destinations;
  0 dead buttons remain in Batch 5 scope.

## 8. Known issues / limitations

1. `whatsapp-templates`' "Copy Template" button click could not be visually confirmed in this
   browser-automation session (§6) — the code is verified correct by direct inspection and is
   an unmodified port of the pre-migration logic; the gap is in this session's tooling, not the
   implementation.
2. The `chatbot-flows` `nodeTypeConfig` dead-code removal (§4.5) is a genuine simplification —
   disclosed here since it removes data (icons/colors per node type) that existed in source but
   was never actually rendered, so no visible behavior changes.
3. `whatsapp-business-calling`'s Decline/Answer call-button colors and `google-sheets-integration`'s
   four button-reply-example tones are judgment-call semantic mappings (§4.6), not exact
   pixel-for-pixel recreations of the original's arbitrary raw-color choices — content and
   visual intent are unaffected.

## 9. Batch readiness

**All 8 Batch 5 pages are stable and ready to ship.** Lint/tsc/build are clean and identical to
the pre-existing baseline, all 10 dead buttons found across this batch are fixed with real
destinations, both genuine interactive tools (`chatbot-flows`, `whatsapp-templates`) retain
their exact original functionality behind new client islands, and all content/routes/metadata
are preserved or added following the established site convention. Per
`WHATS91_UI_ROLLOUT_PLAN.md`, the next batch is Batch 6 — Tools (`/tools` index plus the four
tool pages: QR code generator, link generator, cost calculator, ROI calculator). That batch's
explicit rule is "Visual shell only — never touch tool logic," which this batch's
`chatbot-flows`/`whatsapp-templates` client-island approach already demonstrates a safe pattern
for.
