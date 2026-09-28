# Whats91 Visual Asset Guide

> Rules for every image, illustration, diagram and mock-UI on whats91.com,
> plus ready-to-use AI generation prompts. Companion to
> `WHATS91_DESIGN_SYSTEM.md`.

## 1. Asset categories and when to use them

| Category | What it is | When |
| --- | --- | --- |
| **Real product screenshot** | Actual capture of chat.whats91.com or the flow builder | Wherever the product UI is the argument (hero visuals, feature splits). Always preferred over illustration |
| **DOM mock-UI composition** | Hand-built decorative interface (current chat previews, code panels) | When a live screenshot can't show the point compactly. Must be marked decorative (`aria-hidden`) and **never presented as a real screenshot** |
| **Diagram** | Flow/architecture graphic (webhook flow, ERP sync) | Explaining how systems connect — prefer over decorative art |
| **Abstract brand illustration** | Minimal geometric art in brand greens | Section accents, empty states, blog covers |
| **Icons** | lucide-react only | Everywhere. No emoji, no mixed icon sets, no colored icon packs |
| **Logos** | Partner/customer marks | Only with permission; monochrome treatment in logo clouds |

### Truthfulness rule
Conceptual/mock UI must not carry fake customer data implying real usage, and
must never be labeled or captioned as a screenshot. Real screenshots must come
from a demo workspace with obviously sample data (no real phone numbers —
use `91XXXXXXXXXX`).

## 2. Current-state audit

- Almost all visuals today are **DOM mock-UIs** (chat previews, code panels,
  dashboard mockups) — these are good, keep and restyle with ink-panel tokens.
- `/public` holds only logos and OG images; there are no photos or heavy
  images — a clean starting point.
- Gaps found: no real product screenshots anywhere; no diagrams for the
  Busy-ERP sync or webhook architecture (explained in text/tables only); blog
  posts have no cover images (cards are text-only); OG images are generic.

## 3. Global specs

- Formats: photos/screenshots **AVIF/WebP** (JPEG fallback), diagrams/
  illustrations **SVG** (or 2× PNG when SVG impractical), logos SVG.
- Always through `next/image` with explicit `width`/`height` (no CLS) and
  meaningful `alt` (or `alt=""` + `aria-hidden` for decorative art).
- Standard ratios: hero/feature visuals **4:3** or **16:10**; blog covers
  **16:9** (1200×675); OG **1200×630**; screenshots inside device/browser
  frames use the frame's natural ratio; square tiles **1:1** (icon art).
- Max file budget: 150 KB for above-the-fold imagery, 80 KB elsewhere
  (post-optimization).
- Mobile crop: compose with the key subject in the central 60% so a
  center-crop to 1:1 still reads; never place critical text in outer margins.
- Text inside images: avoid; if unavoidable (UI screenshots), minimum
  rendered size 11px equivalent and the same information must exist in the
  page text or alt.

### Brand palette for generated art
Background `#FFFFFF` / mist `#F8FAF9`; greens `#448C74`, `#54a084`, tints
`#E1EFE9`/`#C3DFD3`; ink `#0F172A`; slate line-work `#475569`. No blues,
purples, neons, or gradients beyond green-on-green.

## 4. Illustration style ("Evergreen line-and-fill")

- Flat 2D, geometric, generous whitespace; 2px consistent line weight in
  slate; soft brand-green fills (tints above); rounded corners matching the
  16px radius language; subtle `shadow-sm`-like drop only.
- People: abstract/simplified if ever needed — no photoreal humans, no
  cartoonish mascots, no 3D blobs, no glassmorphism, no neon glow.
- WhatsApp references: generic chat-bubble shapes in brand green are fine;
  **never** reproduce WhatsApp's exact logo/UI chrome or Meta trade dress in
  generated art (the real WhatsApp icon may appear only in factual
  integration contexts using the official asset).

## 5. Diagram style

- Horizontal left→right flow (vertical on mobile via separate crop or
  responsive SVG), nodes as rounded-rect cards (white fill, `#E2E8F0` border,
  16px radius), arrows 2px slate with small solid heads, labels Inter 12–14px
  `#475569`, the "Whats91" node highlighted with brand fill `#448C74` + white
  text.
- Max 6 nodes per diagram; split anything bigger.

## 6. Ready-to-use generation prompt templates

> Replace `{...}` slots. All prompts assume a capable image model; request
> SVG-style flatness even when output is raster.

**T1 — Section illustration (abstract):**
"Minimal flat vector illustration for a B2B SaaS website, {subject, e.g. 'a
stream of chat message bubbles flowing into an organized inbox'}. Style:
geometric shapes, 2px slate-gray (#475569) outlines, soft sage-green fills
(#E1EFE9, #C3DFD3) with one saturated accent green (#448C74), white
background, rounded corners (16px feel), generous negative space, no people,
no text, no logos, no gradients, no 3D, no shadows except one subtle soft
drop shadow. Composition centered with the key subject in the middle 60%.
Aspect ratio {4:3}."

**T2 — Workflow diagram:**
"Clean flat technical diagram, horizontal left-to-right flow with {N} nodes:
{node1} → {node2} → {node3}. Each node is a white rounded-rectangle card with
a thin light-gray border (#E2E8F0) and a simple line icon; the '{highlight
node}' card is filled solid green (#448C74) with white icon. Connecting
arrows are 2px slate gray (#475569). White background, generous spacing, flat
vector style, no perspective, no gradients, no decorative elements. Labels
{omit text / short labels in a clean sans-serif}. Aspect ratio 16:9."

**T3 — Blog cover:**
"Editorial flat vector cover image about {topic}. Abstract composition of
{2–3 metaphorical elements}, sage and evergreen green palette (#448C74,
#54a084, #E1EFE9) on an off-white (#F8FAF9) background, thin slate outlines,
minimal geometric style, large negative space on the {left} third for title
overlay, no text in image, no logos, no people's faces. 1200×675, 16:9."

**T4 — Decorative UI composition (used only as marked-decorative art):**
"Stylized abstract interface composition suggesting a business messaging
dashboard: layered rounded-rectangle panels, chat bubble shapes, a small
ascending bar chart, checkmark ticks. Flat vector, white and mist (#F8FAF9)
panels, green accents (#448C74), slate outlines, soft single shadow,
deliberately generic and unbranded (must not resemble WhatsApp's actual
interface), no readable text — use gray placeholder bars instead of words.
Aspect ratio 4:3."

## 7. Page-specific asset recommendations (from the audit)

| Page | Asset | Spec |
| --- | --- | --- |
| Homepage hero | Real screenshot of chat.whats91.com inbox in a browser frame (preferred replacement for part of the mock composition) | 16:10, demo workspace, sample contacts, ≤150 KB. Alt: "Whats91 team inbox showing WhatsApp conversations" |
| Homepage Busy ERP section | T2 diagram: Busy ERP → Whats91 (highlight) → WhatsApp customer, with Google Sheets branch | 16:9 SVG |
| /solutions/busy-erp | Keep animated demo; add T2 diagram of the 10-minute sync loop | 16:9 SVG |
| /flow-builder | Real flow-builder canvas screenshot | 16:10, ≤150 KB. Alt: "Whats91 chatbot flow builder canvas with connected steps" |
| /pricing | None — tables carry the page. Do not add decorative art | — |
| Developer sections | No imagery; `.ink-panel` code is the visual | — |
| Blog posts (all) | T3 covers per post, consistent series style | 1200×675 |
| OG images | Template: mist background, logo top-left, `.heading-2`-style title, green accent bar | 1200×630 per page |
| /contact | T1: "chat bubble meeting a support headset shape" | 4:3 |
| Industry/solution pages | One T1 per hero where no demo exists; do not stack multiple illustrations per page | 4:3 |

## 8. Alt-text rules

- Screenshots: state what the UI shows, ≤125 chars ("Whats91 campaign
  dashboard with delivery and read-rate columns").
- Diagrams: summarize the flow in words ("Diagram: Busy ERP syncs invoices to
  Whats91, which sends WhatsApp messages to customers").
- Decorative art: `alt=""` + `aria-hidden="true"`.
- Logos: "{Company} logo". Never start alt text with "Image of".
