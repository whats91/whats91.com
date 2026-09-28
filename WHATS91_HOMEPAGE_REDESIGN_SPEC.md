# Whats91 Homepage Redesign — Implementation Spec

> **v3 addendum (motion-first revision, same day):** the page was revised
> from static mockups to *animated product scenes* — see §10 at the end of
> this document for the scene system, the per-section motion script, and
> the revised section inventory. Sections §3–§5 below describe the v2
> narrative structure, which v3 keeps; where v3 changed a section's
> presentation, §10 is authoritative.

> Full 2026-level rebuild of `/` — new narrative, new hero, new sections,
> new visuals and motion — implemented on the existing design system
> (`WHATS91_DESIGN_SYSTEM.md`). **Preserved untouched:** root metadata,
> `HomepageAIJsonLD` (all 6 schema blocks), FAQ content + schema.org
> microdata, anchor ids (`#home`, `#solutions`, `#busy-erp`, `#developers`,
> `#security`), all backend/forms behavior, the `/` route.

## 1. What the audit says the homepage must sell

Full-site inventory (49 pages) shows the platform's real breadth, most of
which the old homepage never surfaced:

| Cluster | Real capabilities found on live pages |
| --- | --- |
| **Reach** | Broadcast campaigns (98% open), CTWA ads, cart recovery, approved template library (`/solutions/marketing`, `/whatsapp-templates`) |
| **Automate** | Visual N8N-style Flow Builder ("Nodemation Canvas"), agentic AI + NLU + knowledge base, chat shortcuts, 24/7 AI agent, chatbot flow library (`/flow-builder`, `/chatbot-flows`, `/features/...`) |
| **Integrate** | Busy ERP 10-minute sync engine, invoice PDF automation, ledger bot, payment reminders, Miracle support, Google Sheets sync, custom CRM via API (`/solutions/*`) |
| **Developer** | Graph API v21, webhooks + SHA256 validation, docs site, changelog |
| **More** | Business Calling (₹10L+/yr savings claim), Coexistence mode, Busy Reports, B2B/B2C e-commerce |
| **Free tools** | Cost calculator, ROI calculator, link generator, QR generator (`/tools/*`) — previously invisible from the homepage |
| **Trust** | Meta Verified BSP, zero-markup Meta rates (₹0.8631/₹0.1150), INR billing + GST ITC, DPDP/ISO/SOC/GDPR, 99.9% uptime, 500 msgs/sec, 500+ enterprise clients, 10M+ messages monthly, 24/7 support (all existing site claims — nothing invented) |

**The old homepage's failure**: generic "enterprise conversations" story,
four flat card sections, no product shown beyond one chat bubble, Flow
Builder/tools/calling never mentioned.

## 2. Research patterns adopted (learned, not copied)

From fresh top-tier SaaS research (Stripe, Linear, Intercom + the six
WhatsApp-BSP competitors studied earlier): problem→solution→proof arc;
breadth clustered into named capability modules instead of card soup;
authentic working-state product mockups (not decorative art); slim
quantified proof bar directly under the hero; developer path as its own
persona lane; restrained, meaning-bearing motion; layered CTAs
(demo / pricing / docs / WhatsApp).

## 3. New narrative architecture (section order)

| # | Section (component) | Story beat | Tone / anchor |
| --- | --- | --- | --- |
| 1 | `HomeHero` | "Run your entire business on WhatsApp" — instant value + live product composition | `brand-soft`, `#home` |
| 2 | `ProofBar` | Immediate quantified credibility | `surface` slim band |
| 3 | `PlatformPillars` | The platform story in 3 named modules — **Reach → Automate → Integrate** — each a split with a working-state mockup, plus a "everything around it" capability grid | alternating, `#solutions` (intro), `#busy-erp` (pillar 3) |
| 4 | `HowItWorks` | "This is how you get there" — 3 steps | default |
| 5 | `DeveloperBand` | The developer lane — webhook code, payload types, docs | `ink`, `#developers` |
| 6 | `FreeToolsBand` | Zero-friction entry points (4 real tools) | `surface` |
| 7 | `TrustBand` | Security & DPDP compliance | default, `#security` |
| 8 | `ResultsBand` | Outcomes (98% open, 3x leads, …) | `surface` |
| 9 | `HomepageFAQ` | Objection handling (**unchanged** — microdata) | `surface` |
| 10 | `HomeFinalCTA` | Close: demo or WhatsApp | gradient panel |

Rhythm check: brand-soft → surface → white/surface alternation → ink →
surface → white → surface → surface(FAQ, `pad="sm"`) → white+gradient.
No two identical adjacent tones except FAQ (kept `pad="sm"`, visually
distinct card grid). One ink band. One gradient panel.

## 4. Section design detail

### 4.1 HomeHero
- **Layout**: `lg:grid-cols-12` — content `lg:col-span-6`, visual
  `lg:col-span-6`. Phone: single column, centered, visual below. **Tablet
  (`md`, 768–1023): its own layout** — content centered `max-w-2xl`, CTA
  row horizontal, composition below at full readable width (not the
  squeezed 2-col, not stretched phone).
- **Content**: `Eyebrow live` "Meta Verified Business Solution Provider" →
  `h1.heading-display`: "Run your entire business **on WhatsApp**"
  (gradient on the last phrase only) → lead (`.text-lead`, is the
  speakable `main section:first-of-type p`): platform definition naming
  WhatsApp Cloud API, campaigns/chatbots/ERP, zero-markup rates → CTA
  pair: `BookDemoPopup` (primary, real dialog) + `SecondaryCTA` →
  `/pricing` ("See transparent pricing" — the zero-markup differentiator
  is the strongest self-serve hook) → trust pill row (Zero-markup Meta
  rates · 99.9% uptime SLA · DPDP-ready).
- **Visual — "command center" composition** (all DOM, all `aria-hidden`,
  never presented as screenshots): center = team-inbox card (conversation
  list with unread counts + one open chat with template message); floating
  top-right = mini flow-canvas chip (3 nodes + edges, "Flow active");
  floating bottom-left = campaign stat chip (Delivered 12,480 · Read 98%);
  floating top-left = webhook event chip (`message.delivered` ✓). Float
  chips use `animate-float` (7s, ±6px) with staggered delays;
  `motion-reduce` disables.
- **A11y**: single `h1`; decorative composition `aria-hidden="true"`;
  CTAs are real controls (dialog button + link).

### 4.2 ProofBar
Slim `Section tone="surface" pad="none" bordered` strip:
4 inline stat items (500+ enterprise clients · 10M+ messages monthly ·
99.9% uptime SLA · 24×7 support) — `text-2xl font-bold` value +
`text-caption` label, `grid grid-cols-2 md:grid-cols-4`, `py-6`.
All four figures are existing About-page claims.

### 4.3 PlatformPillars
Intro (`SectionHeader` centered, **`id="solutions"` on the section, h2
inside it** — required by the speakable JSON-LD selector `#solutions h2`):
eyebrow "The Whats91 Platform", h2 "One platform for every WhatsApp
conversation".

Three pillar splits (S2 pattern, image side alternates, `items-center`,
`gap-10 lg:gap-14`, each with overline label, h3, lead-in, 4 checkmark
bullets, inline links to the real pages):

1. **REACH — "Campaigns your customers actually open"**
   Bullets: 98%-open broadcasts, CTWA ads, abandoned-cart recovery,
   approved template library. Links → `/solutions/marketing`,
   `/whatsapp-templates`.
   Visual: **campaign composer mockup** — template message bubble
   (real-looking utility template with `{{1}}` variables), audience
   count row, delivered/read progress bars.
2. **AUTOMATE — "Flows that work while you sleep"**
   Bullets: visual N8N-style Flow Builder, agentic AI with knowledge
   base + NLU, chat shortcuts, human handoff. Links → `/flow-builder`,
   `/chatbot-flows`.
   Visual: **flow-canvas mockup** — node graph (Trigger → AI Intent →
   two branches → actions) drawn with DOM nodes + SVG edges.
3. **INTEGRATE — "Your ERP, speaking WhatsApp"** (`id="busy-erp"`)
   Bullets: invoice PDFs on save (10-minute sync engine), "Balance"
   ledger bot, automated payment reminders, Google Sheets + Miracle.
   Links → `/solutions/busy-erp`, `/solutions/miracle-whatsapp-api`.
   Visual: **sync diagram** — Busy ERP node ⇄ Whats91 node (brand-filled)
   ⇄ WhatsApp customer node, Sheets branch, animated data-dot on the
   connector (`motion-reduce` static), "every 10 minutes" caption.
   Below the split, full-width: the **comparison table** (Standard
   Notifications vs Whats91 Enterprise — content preserved verbatim,
   desktop table + mobile card fallback).

Then **capability grid** ("…and everything around the conversation"):
6 compact `FeatureCard`s — Business Calling (`/whatsapp-business-calling`),
Coexistence Mode (`/whatsapp-coexistence`), Busy Reports
(`/solutions/busy-reports`), Payment Reminders
(`/solutions/payment-reminders`), B2B/B2C Storefront
(`/solutions/busy-ecommerce`), Chat Shortcuts
(`/features/chat-shortcuts-conversation-automation`).
Grid: 1 col → **2 col at `md` (tablet-specific)** → 3 col at `lg`.

### 4.4 HowItWorks
3 steps, numbered circles + connecting line: 1 "Connect your number"
(WABA onboarding on official Cloud API) · 2 "Plug in your systems" (Busy,
Miracle, Sheets, or your CRM via API) · 3 "Launch campaigns & automations"
(templates, flows, reminders). Phone: vertical timeline (line on left);
**tablet+desktop: horizontal 3-across** with the connector between
circles. CTA under: `BookDemoPopup` ghost-ish secondary placement.

### 4.5 DeveloperBand (`tone="ink"`)
Split: left — overline "FOR DEVELOPERS", h2, lead, 3 icon rows (Graph API
v21, SHA256 signature validation, docs + changelog links as `link-inline`
on ink), CTA → docs. Right — webhook.js code panel (existing snippet,
`.ink-panel` on `bg-ink-elevated` header) + payload-type chips row
(Text/Interactive/Location/Media) as translucent chips
(`bg-white/5 border-white/10`). Order on phone: code first (proof), text
second.

### 4.6 FreeToolsBand
`SectionHeader` "Try the platform math first — free, no signup" + 4
`FeatureCard`s → `/tools/whatsapp-api-cost-calculator`,
`/tools/lead-qualification-roi-calculator`,
`/tools/whatsapp-link-generator`, `/tools/qr-code-generator`.
Grid: 1 → 2 (`sm`) → 4 (`lg`); tablet keeps 2×2.

### 4.7 TrustBand (`#security`)
Condensed from the old Security section, content preserved: h2 +
certification `TrustPill` row (ISO 27001 · ISO 27701 · SOC 2 · GDPR ·
DPDP) + 2-col split: DPDP compliance list (4 checkmark items) beside the
Quality Rating Protection card (success-toned). The 3 security feature
cards fold into 3 slim icon rows under the pills (encryption,
infrastructure, DPDP tooling) — same copy, tighter presentation.

### 4.8 ResultsBand
`SectionHeader` + 4 `StatCard`s (98% open vs 42% email · 50% lower
acquisition · 95% efficiency gain · 40–50% support reduction) + the 3
"Marketing Strategy Impact" rows (cart recovery 45–60%, lead qual 3x,
invoice speed 90%+) — all existing content, presented as a single
`surface-card` ledger. Efficiency-formula ink chip retained as a footnote
row.

### 4.9 HomepageFAQ — unchanged (schema.org microdata, all 6 Q&As).

### 4.10 HomeFinalCTA
Gradient panel (system recipe): badge, h2 "Put your business on
WhatsApp — properly.", one line, dual CTA: white-fill "Book a demo"
(`BookDemoPopup`) + outline-on-gradient "Chat with us on WhatsApp"
(`https://wa.me/919669823388` — existing footer contact). Trust line:
"Trusted by 500+ enterprises across India" (existing claim).

## 5. Motion system (all new, all reduced-motion safe)

| Motion | Mechanism | Details |
| --- | --- | --- |
| Scroll reveal | `Reveal` client island (IntersectionObserver) + `.reveal`/`.is-visible` CSS | 500ms, `--ease-out-soft`, 16px rise; stagger via `delay` prop (`.reveal-d1..d3`); unobserves after firing; hidden-state only applies under `@media (scripting: enabled)` so no-JS users always see content; `prefers-reduced-motion` forces visible instantly |
| Hero float | `.animate-float` keyframes | ±6px translateY, 7s ease-in-out infinite, staggered `animation-delay`; killed by global reduced-motion rule |
| Sync-diagram data dot | `.animate-dash` on SVG connector dot | 3s linear infinite; reduced-motion → static |
| Hovers | existing system (`surface-card-hover`, CTA shadows) | unchanged |

No animation libraries. No scroll-jacking, no parallax. JS added: one
~40-line island.

## 6. AI image-generation prompts (future asset upgrades)

The build ships with DOM/SVG mockups (crisp, zero-weight, theme-perfect).
When raster/illustrated upgrades are wanted, generate with these (per
`WHATS91_VISUAL_ASSET_GUIDE.md` rules — brand palette, no text unless
noted, never presented as real screenshots):

1. **Hero ambient backdrop** (optional, behind the composition)
   *Size 1600×1200 (4:3), AVIF/WebP ≤150KB.*
   "Ultra-minimal abstract background for a SaaS hero: soft radial wash of
   pale sage green (#F2F8F5) into white, two barely-visible large rounded
   geometric shapes in #E1EFE9 offset to the upper right, extremely subtle
   0.5px dot grid in #C3DFD3 at 15% opacity fading toward edges. No text,
   no objects, no gradients other than the described wash, flat vector
   style, generous negative space. Must stay quiet enough for dark text
   overlay on the left half."
2. **Reach pillar illustration** (if replacing the DOM composer)
   *Size 1200×900 (4:3), SVG-style flat.*
   "Flat vector composition of a WhatsApp-style business broadcast: one
   large rounded white message card with green header bar (#448C74),
   three abstract gray text lines and a green pill button; behind it a
   fanned stack of two identical faded cards suggesting a broadcast to
   many; to the right a slim vertical progress column with three rounded
   bars in #448C74/#9CC9B7/#E1EFE9 and small check ticks. Slate 2px
   outlines (#475569), white background, soft single shadow, no readable
   text — gray placeholder bars only, no logos, must not replicate
   WhatsApp's actual UI chrome."
3. **Automate pillar illustration**
   *Size 1200×900 (4:3), SVG-style flat.*
   "Flat vector node-graph on a subtle dot-grid canvas (#F8FAF9): five
   rounded-rectangle nodes connected left-to-right by smooth 2px slate
   curves with small arrowheads; first node green-filled (#448C74) with a
   white lightning glyph, middle node with a simple sparkle/AI glyph,
   branch splitting to two end nodes with check glyphs; one dashed curve
   looping back to suggest a cycle. Slate outlines, sage fills
   (#E1EFE9/#C3DFD3), generous spacing, no text, no gradients, no 3D."
4. **Integrate pillar diagram**
   *Size 1400×700 (2:1), SVG preferred.*
   "Clean flat technical diagram, three columns: left node 'ledger book'
   glyph card (white, slate outline), center node filled solid green
   (#448C74) rounded square with a white chat-bubble glyph and subtle
   glow ring, right node a phone outline with a small message card;
   double-headed 2px slate connectors with tiny circular data dots along
   them; a fourth smaller spreadsheet-glyph card branching from center
   downward. White background, minimal, no text, no brand logos."
5. **OG image refresh for `/`**
   *Size 1200×630, PNG.*
   "Open-graph card: off-white #F8FAF9 background, thin #448C74 accent
   bar down the left edge, large dark-slate (#0F172A) headline area
   left-aligned (text to be typeset separately, leave clear space),
   bottom-right a small flat vector cluster of one chat bubble + one
   flow-node + one bar-chart glyph in brand greens. Flat, minimal,
   premium; no photography, no gradients."

## 7. Accessibility checklist (built in, verified in §8)

One `h1`; ordered heading levels every section; all mockups
`aria-hidden`; every interactive element a real link/button ≥44px;
`aria-labelledby` on every section via `SectionHeader id`; FAQ microdata
untouched; skip-link target `#main-content` retained on `<main>`;
contrast: all text tokens per system (CTA = brand-600 fix, gradient-panel
text white/brand-700); reveal/float/dot animations all disabled under
reduced motion; keyboard: dialog (Radix) + links only, no custom widgets.

## 8. Performance budget

No new dependencies. One new ~40-line client island (`Reveal`) +
existing `BookDemoPopup` island — everything else server-rendered. All
visuals DOM/inline-SVG (0 image bytes added). CSS additions ~70 lines in
`globals.css`. Target: first-load JS for `/` within ±5KB of the previous
build (verified against `next build` output).

## 9. Constraints honored (unchanged)

Route `/`; root metadata; `HomepageAIJsonLD` (WebPage, Product, Service,
FAQPage, BreadcrumbList, Speakable — byte-identical); FAQ Q&A text +
microdata; anchors `#home #solutions #busy-erp #developers #security`
(speakable selector `#solutions h2` still matches); Header/Footer/
CookieConsent from Batch 1; `/api/demo` flow via the existing
`BookDemoPopup`; no backend, form, or analytics changes; every claim and
number sourced from existing site content (inventory in §1).

## 10. v3 — Motion-first revision (authoritative for animation)

### 10.1 The scene system

All product animation is pure CSS ("Product animation scenes" block in
`globals.css`). One shared-duration loop per scene; every element's
keyframes encode its own timing window as percentages, so the whole scene
resets in sync. Two element classes:

- **Persistent** (messages, bars, badges): base styles are the *completed*
  state; keyframes hide them at 0% and reveal at their moment. Under
  `prefers-reduced-motion` the global rule collapses the animation to one
  instant run → the finished scene is what reduced-motion users see.
- **Transient** (`.scene-transient`: typing dots, traveling sync dots,
  sent-tick states): base hidden; they exist only mid-loop and simply
  never appear without motion.

Tailwind note: arbitrary animation classes must be **literal** at the call
site (`[animation:hs-msg-2_12s_ease-out_infinite]`) — never built via
string interpolation, or the scanner won't generate them.

### 10.2 Scene scripts (as implemented)

| Scene (component) | Loop | Script |
| --- | --- | --- |
| **Hero conversation** (`HomeHero`) | 12s | Customer "Balance?" (8%) → typing dots overlaying the reply slot (13–22%) → ledger reply card with Statement.pdf (29%) → ticks ✓✓ gray (33%) crossfade to read-blue (48%) → "Invoice #1042 auto-sent · Busy ERP" toast (60–88%) → whole chat fades and rebuilds. Floating flow-status + campaign chips keep the 7s float. |
| **Campaign journey** (`CampaignJourneyScene`) | 12s | Card in (6%) → "Approved" badge pops (14%) → Delivered bar fills to 99% (20–46%) → Read bar fills to 98% (30–58%) → customer reply bubble + "+247 replies" (68%). |
| **Flow execution** (`FlowExecutionScene`) | 12s | Trigger node ring-lights (12%) → edge 1 draws (dash-offset, 12–28%) → AI-intent node lights (30%) → chosen-branch edge draws (30–46%) → ledger-reply node lights (48%) → "Handled by bot in 3 seconds" badge (58%). Untaken human-handoff branch stays dim. |
| **Sync pipeline** (`SyncPipelineScene`) | mixed | Data dots continuously slide both connectors (2.8s/3.4s, hidden under reduced motion); Whats91 node pulses a ring (3.5s); customer node's "1" new-message badge pops once per 12s. |
| **Event stream** (`DeveloperBand`) | 10s | Five log lines land in sequence (message.received → sha256 verified → route → reply template → 200 OK 42ms) + blinking prompt caret. Reduced motion = full log visible. |
| **Bento micro-visuals** | ambient | Calling: 12-bar waveform (staggered scaleY) · Reports: mini chart grows each 6s · Reminders: bell rings each 5s · Coexistence: ⇄ pulse · Shortcuts: `/invoice` types itself (steps(9)) with blinking caret. |
| **Counters** (`AnimatedNumber` island) | once | ProofBar (500+/10M+/99.9%), Results strip (98%/50%/95%), calculator total (₹11,506) count up on first view; server-rendered final values mean no-JS/reduced-motion/broken-IO always shows correct numbers. |

### 10.3 v3 section changes vs §3

- **Pillars now vary rhythm deliberately**: Reach = split (scene right) →
  Automate = **full-width canvas band** (copy row above, wide executing
  flow below) → Integrate = split (scene left). No repeated template.
- **Capability grid → bento**: 3+3 / 2+2+2 / full-width-slim tile spans;
  every tile has a distinct internal layout and its own micro-visual —
  no two tiles alike, no icon-card repetition.
- **DeveloperBand**: static `webhook.js` listing replaced by the live
  event-stream terminal (the code path is now *shown executing*); payload
  chips retained; docs/changelog links unchanged.
- **FreeToolsBand**: card grid replaced by a split — tool list rows (left)
  beside a conceptual cost-calculator preview (right) using the real
  pricing-page rates (₹0.8631/₹0.1150, zero markup) with a counting total.
- **ResultsBand**: StatCard grid replaced by a single dashboard-style
  surface: 4-column divided stat strip (counting) + impact ledger +
  ink formula footer.

### 10.4 Performance & a11y (v3 measured)

704 KB uncompressed JS referenced by the prerendered homepage (+1 KB vs
v2 for the `AnimatedNumber` island; still ~43 KB less than the plain
`/privacy` page). ~118 concurrent CSS animations measured live — all
compositor-friendly (opacity/transform), except two tiny documented
exceptions: bar-width fills and the 6px sync-dot `left` travel. All scenes
`aria-hidden`; every scene has a designed reduced-motion end state.
