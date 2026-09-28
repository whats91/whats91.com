# Busy Accounting MCP — Landing Page Master Blueprint (v2)

> **Version 2 — final, implementation-ready.** V2 *extends* the approved V1; it does not
> restart or replace it. Every verified repository fact, honesty guardrail, compatibility
> status, security boundary, SEO/a11y/performance plan, Sonnet handoff, acceptance
> criteria, product-owner question, and implementation order from V1 is **preserved**.
> V2 only *deepens* the parts that make this a flagship page: storytelling, hero, the
> executive command center, conversion, visual hierarchy, information architecture, and
> homepage-quality presentation. The complete V1 is archived verbatim at
> `BUSY_ACCOUNTING_MCP_PAGE_MASTER_PLAN_V1_ARCHIVE.md`.
>
> **Planning & documentation only. No page code is written here; no `src/` file is
> touched.** Claude Sonnet should be able to build the page directly from this document
> without another planning phase.
>
> **This is a *sibling* to the existing Whats91 MCP page (`/mcp`), not a copy** — same
> design system and shared primitives, different product (Busy ERP accounting vs. WhatsApp
> Business messaging), different hero metaphor, its own signature Executive Command Center,
> and a stronger accuracy boundary (the read-only + profitability guardrail).
>
> **Sources of truth (verified):**
> - `whats91_busy_api_server/docs/MCP_PUBLIC_GUIDE.md` (endpoint, auth, full 69-tool catalogue, security §14)
> - `whats91_busy_api_server/docs/MCP_COMPATIBILITY_REPORT.md` (client statuses, what was actually tested)
> - `whats91_busy_api_server/docs/skills/busy-accounting-mcp/SKILL.md` (tool semantics, every "unavailable" boundary)
> - Website build convention: `docs/STATIC_PAGE_GUIDE.md`; sibling page: `src/app/mcp/page.tsx` + `src/components/landing/mcp/*`
>
> **Date:** 2026-07-21.

### What changed from V1 → V2 (at a glance)

| Area | V1 | V2 upgrade |
|---|---|---|
| Hero (B1) | Strong single concept | 6 headline routes, layered sub-copy, dual-CTA strategy, a richer "living answer" scene, expanded desktop + mobile wireframes |
| Story arc (A2) | Linear list | Full emotional journey with named beats + connective "bridge lines" between sections |
| New section | — | **B3 "Why Busy MCP?"** (why not reports / exports / APIs — conversational accounting is different) |
| New section | — | **B6 "The accounting workflow"** (data-lifecycle visualization: Busy → Whats91 Sync → MCP → AI → answers → decisions) |
| Comparison | Inline before/after | **B4** promoted to a dedicated, conversion-grade "Busy reports vs. Busy MCP" section |
| Executive dashboard (B10) | One mock | **Signature section** — KPI cards, mini charts, receivable/inventory/sales widgets, collection queue, top movers, alerts, executive insights, full responsive spec |
| Prompts (B9) | 5 groups | **8 departments** (Owner, Accounts, Finance, Sales, Purchase, Inventory, Management, Auditor) with fuller conversations |
| Future (B15) | 3 horizons | Adds the **ecosystem vision** (Busy → MCP → AI → Whats91 → WhatsApp → CRM → automation → future agents), honesty preserved |
| SEO (C2) | Core plan | **Keyword clusters**, expanded blog cluster, deeper AI-Overview + entity optimization |
| Visuals (C3/C8) | Motion system | Adds a **homepage-parity review** and a catalog of premium visual devices (floating widgets, sticky storytelling, progressive reveal, data cards) |
| Conversion (C1) | CTA map | Every CTA re-mapped to its exact **emotional trigger point** |
| Wireframes | Several | Expanded ASCII for hero, comparison, command center, workflow, capability grid, architecture, mobile, final CTA |

**Preserved wholesale (do not weaken):** A5 honesty guardrail · A6 differentiation · the
compatibility matrix · security boundaries (D2) · capability accuracy (D1) · read-only
positioning · Sonnet handoff (D6) · acceptance (D9) · product-owner questions (D7) ·
implementation order (D8) · SEO/a11y/performance planning.

---

## How to read this document

- **Part A — Strategy & story** (positioning, the emotional journey, audience, hero
  discipline, the honesty guardrail, sibling differentiation). *Read first.*
- **Part B — The page, section by section** (product-first copy + ASCII wireframes, 17
  sections + hero). *This is the page.*
- **Part C — Craft** (conversion, SEO, motion, responsive, performance, analytics, visual
  system, **homepage-parity review**).
- **Part D — Evidence, reference & Sonnet handoff** (verified product facts, security,
  component reuse, content model, assets, acceptance, PO decisions, build order).

### Table of contents
- **A1** Positioning · **A2** The emotional journey (with bridge lines) · **A3** Audience &
  psychology · **A4** Hero discipline (5-5-5) · **A5** *The honesty guardrail
  (non-negotiable)* · **A6** Sibling-not-copy differentiation
- **B0** Section/tone map · **B1** Hero · **B2** Problem · **B3** Why Busy MCP? · **B4**
  Busy reports vs. Busy MCP · **B5** What is Busy MCP · **B6** The accounting workflow ·
  **B7** Supported AI clients · **B8** Capabilities (bento) · **B9** Live prompts (8
  departments) · **B10** Executive command center *(signature)* · **B11** How it works ·
  **B12** Trust & control · **B13** What it deliberately doesn't do · **B14** Architecture
  (ink) · **B15** Future vision + ecosystem · **B16** FAQ · **B17** Final CTA
- **C1** Conversion & CTA map · **C2** SEO (clusters, blog, AI Overviews, entity) · **C3**
  Motion & interaction · **C4** Responsive · **C5** Performance · **C6** Analytics · **C7**
  Visual system · **C8** Homepage-parity review
- **D1** Product evidence · **D2** Security (verified) · **D3** Component reuse & new
  components · **D4** Content model · **D5** Assets · **D6** Sonnet handoff · **D7** PO
  decisions · **D8** Implementation order · **D9** Acceptance

---
---

# PART A — Strategy & story

## A1. One-line positioning

> **"Ask your accounting anything — and get the real answer, straight from your own Busy
> books. Read-only, always."**

Busy Accounting MCP is **the AI layer for your Busy Accounting data**. It is a secure,
**read-only** bridge that lets the AI assistants your team already uses (ChatGPT, Claude,
and other MCP-compatible clients) reach approved, tenant-scoped information from your
synced Busy ERP — outstanding, sales, purchases, customers, suppliers, stock, trends — so
people can *ask instead of dig through reports*.

Category framing: **"the AI layer for your Busy accounting."** Not another API. Not
developer documentation. Not accounting software. Not "a ChatGPT plugin." An
**intelligent, permissioned, read-only bridge** between AI assistants and Busy data.

**The one sentence a busy owner should remember:** *"I can just ask ChatGPT what my
outstanding is — and it reads the real number out of my Busy books, without touching them."*

## A2. The emotional journey (why the page is ordered the way it is)

V2 turns the section list into a *felt* journey. Each section resolves the tension the
previous one created; a one-line **bridge** carries the reader across the seam (these
bridge lines can appear as small connective sub-headers or simply guide the copy).

```
  ACCOUNTING TODAY   "Every answer already exists in Busy — behind the right report, filter, and export."
     │  bridge → "But 'behind' is the whole problem."
  DAILY FRUSTRATION  "Search the menu · set company & year · filter · export · rebuild in Excel · repeat."
     │  bridge → "It's not that the data is missing. It's that reaching it is manual."
  WHY NOT …?         "Why not reports? Why not exports? Why not an API? Because none of them let you just ask."
     │  bridge → "So what if the answer just … came back when you asked?"
  THE RELIEF         "From opening reports to asking a question — the same data, a different motion."
     │  bridge → "Here's what makes that possible."
  WHAT IS BUSY MCP   "A read-only bridge from your AI assistant to your synced Busy data."
     │  bridge → "And here's exactly where your data travels — and where it never goes."
  THE WORKFLOW       "Busy → Whats91 sync → read-only MCP → your AI → sourced answer → your decision."
     │  bridge → "It works with the assistant you already open every day."
  SUPPORTED AI       "ChatGPT today; Claude and more MCP clients rolling out."
     │  bridge → "One connection; your whole accounting picture."
  CAPABILITIES       "Outstanding, sales, purchases, customers, stock, trends — organised by how you work."
     │  bridge → "See yourself using it."
  REAL CONVERSATIONS "The exact questions each team would ask — and the answers they'd get."
     │  bridge → "Now zoom out to the whole company."
  COMMAND CENTER     "One question returns your executive view: sales, receipts, receivables, movement, alerts."
     │  bridge → "Setting it up takes minutes."
  HOW IT WORKS       "Pick your assistant · sign in with your token · scoped automatically · ask away."
     │  bridge → "And you stay in control the whole time."
  CONFIDENCE (TRUST) "Read-only. You approve. Scoped to your account. Revoke anytime."
     │  bridge → "Confidence also means knowing its limits."
  HONEST LIMITS      "What it deliberately does NOT do — so you always trust the number."
     │  bridge → "For the technical reader, here's the machinery."
  ARCHITECTURE       "Open standard. Read-only, end to end."
     │  bridge → "And this is only the first room of a bigger house."
  FUTURE + ECOSYSTEM "Where Busy MCP sits in the wider Whats91 AI ecosystem — honestly scoped."
     │  bridge → "Answer the last doubts…"
  FAQ → DECISION     "…then make the call."
  FINAL CTA          "Ask your Busy data anything."
```

Emotional arc: **recognition → frustration named → intellectual permission ("why this is
different") → relief → clarity → trust in provenance → confidence in breadth → excitement →
executive awe → ease → safety → trust-through-honesty → technical credibility → ambition →
commitment.**

## A3. Audience & psychology

| Persona | Secretly wants | Fears | The page must… |
|---|---|---|---|
| **Business owner / MD** (primary) | "Just tell me my outstanding and my best/worst movers without me opening Busy." | Wrong numbers; data leaking; a gimmick. | Lead with outcomes + read-only reassurance; hide the plumbing; the hero + command center do the work. |
| **Accountant / finance team** | Fewer report exports, less Excel, faster answers to the same recurring asks. | AI "making up" figures; losing control of the ledger. | Show sourced, deterministic answers; be explicit (B13) about what it won't invent. |
| **CFO / controller** | Portfolio view: receivables risk, concentration, working-capital exposure. | Unverifiable "insights"; profit claims the data can't support. | The command center + the honest profitability boundary. |
| **Auditor** | Traceable, evidence-linked answers, reconciliation. | Fabricated reconciliations. | Emphasise reconciliation evidence, read-only, "no made-up numbers." |
| **Sales / purchase / ops manager** | Top dealers, dead stock, reorder, collections priorities — in their own words. | Learning yet another dashboard. | Department-tagged prompts (B9) in business language. |
| **Developer / technical evaluator** (secondary) | "Is this real, standards-based, secure, read-only?" | Hand-wavy security; write access to the ledger. | One credible architecture band (B14) + endpoint + read-only emphasis. |

Design implication: **~90% of the page speaks to non-technical finance readers.** The
developer gets one dense architecture band and the endpoint; everything else is outcomes.

## A4. Hero discipline (5-5-5)

The hero must land three messages in fifteen seconds:

- **First 5s — "What is this?"** → *Connect your AI assistant to your Busy Accounting data.*
- **Next 5s — "What can I do?"** → *Ask business questions in plain language — "What's my outstanding?" — and get real answers from your own books.*
- **Next 5s — "Can I trust it?"** → *Read-only · you approve access · scoped to your account · disconnect anytime.*

Everything in the hero serves one of these three beats. Nothing else. (Full hero build in B1.)

## A5. The honesty guardrail (NON-NEGOTIABLE accuracy) — *preserved from V1*

This page's credibility depends on never overstating the product. These constraints
override any marketing instinct. **Full evidence in D1/D2.** Every capability card and
client chip carries an explicit status; every "insight" claim is anchored to what the
tools actually return.

1. **Read-only.** The MCP server *cannot create, edit, delete, post, synchronise, or
   approve* accounting records. 67 of 69 tools are pure read; the only two non-read tools
   (`busy_export_sales_register`, `busy_export_purchase_register`) create a private CSV
   job and a signed download link — they **never change Busy data**. This is both a top
   selling point *and* the accuracy anchor. Say "read-only" prominently.
2. **No profit / margin / cost.** The product **cannot** answer gross profit, gross
   margin, customer profitability, or "true margin" — a dedicated readiness tool
   (`busy_get_profitability_readiness`) *blocks* these and never estimates them. No cost,
   no inventory valuation, no "blocked capital," no landed cost. **Never imply the page
   can tell you your profit or margin.** This is the single most important "do not overstate."
3. **No forecasts, no predictions, no probabilities.** Every score is a *deterministic
   review priority from observed evidence*, not a default probability, churn probability,
   credit rating, or forecast. "Dead stock," "stockout risk," "expected next purchase,"
   "CLV projection," "recommended actions" are all **human-review decision support**,
   explicitly bounded and non-predictive.
4. **Dimension honesty.** A Busy *material centre* is **not** a verified branch or
   warehouse. *Customer state* is **not** a sales territory. *Salesperson* attribution has
   **no** verified team/manager hierarchy and is **not** a commission or profit figure.
   *Product groups* are **not** brands or manufacturers. The page must not imply "branch
   performance," "territory analysis," or "brand analytics" as verified.
5. **No complete working capital / no operating-cycle ratios.** DSO, DPO, inventory days,
   and cash conversion cycle are **unavailable**. The working-capital tool reports *net
   trade exposure* only — never call it "complete working capital."
6. **No warranty / RMA / defect data.** Return analysis is observed sales-return
   quantity/value only — never a defect rate, warranty claim, or failure reason.
7. **Not arbitrary SQL / not generic table reads / not ingestion.** The surface is a fixed
   set of curated, schema-validated tools. Unknown parameters are rejected.
8. **Scope + freshness.** Answers require **synced Busy data** and an exact **company code
   + financial year** (Indian FY, 1 Apr–31 Mar). Results reflect the **latest sync**, not
   a live real-time posting state. INR, GST, and BUSY sign conventions apply. Do not imply
   real-time or multi-company auto-merge (canonical customer links are explicit,
   operator-approved, never auto-inferred from names).
9. **Client compatibility is evidence-graded (A5 + D1).** No branded desktop/CLI/hosted AI
   client was signed-in and executed during verification — statuses come from automated
   protocol/OAuth flow tests, official-SDK tests against the real warehouse,
   documentation, and one owner-reported ChatGPT connection. **xAI Grok is NOT in the
   compatibility matrix — do not claim Grok support** (D7-OD3).
10. **Security is code-reviewed & integration-tested, not certified.** Describe verified
    controls (OAuth 2.1, PKCE, RLS, tenant isolation, encryption at rest, revocation).
    **Never** claim "bank-grade," "military-grade," "SOC 2," "penetration tested,"
    "certified," or "unbreakable." The compatibility report is a protocol/integration
    result, not a security certification.

> Marketing tone is welcome; **inflation of current capability is not.** When in doubt,
> under-claim and label. Every V2 storytelling upgrade below has been written to stay
> inside this guardrail — the drama comes from *reaching* real numbers faster, never from
> inventing new ones.

## A6. Sibling-not-copy differentiation (vs. the Whats91 MCP page) — *preserved from V1*

The two pages share the design system and section rhythm but must feel distinct:

| Dimension | Whats91 MCP (`/mcp`) | **Busy Accounting MCP (this page)** |
|---|---|---|
| Data domain | WhatsApp Business messaging | **Busy ERP accounting** (outstanding, sales, purchases, stock, ledgers, trends) |
| Hub metaphor | Whats91 mark → message report card | **Busy company ledger / ₹ answer card** through the Whats91 bridge |
| Signature section | Capability bento | **Executive Command Center** (dashboard) + department-tagged prompts + workflow lifecycle |
| Accent iconography | chat / message | **ledger, ₹ rupee, receipt, chart, stock** (finance) |
| Honesty focus | private-preview status | **read-only + the profitability boundary** (a dedicated "what it doesn't do" section) |
| Audience | ops/marketing/support | **owners, accountants, CFOs, auditors, sales/purchase managers** |
| Numbers shown | delivered / read % | **₹ outstanding, top dealer, dead-stock count, GST** (INR, Indian FY) |

Reuse the *system*; invent the Busy scene, the command-center, the workflow lifecycle, and
the finance copy. Do **not** duplicate `McpHeroScene`/`McpCapabilityGrid` verbatim — build
Busy-specific components (D3) that share primitives.

---
---

# PART B — The page, section by section

## B0. Section & tone map (V2)

Product-first order (17 sections + hero). Tones alternate; one dark `ink` developer band;
brand-soft hero and brand CTA bookends. Uses the shared `Section` tone system
(`default` / `surface` / `brand-soft` / `ink`). Two of the new sections (B3 "Why", B6
"Workflow") are deliberately **compact** so the page gains narrative depth without bloating.

| # | Section | Purpose | `Section` tone | Weight |
|---|---|---|---|---|
| — | **B1 Hero** | what / can-I / trust in 15s | `brand-soft` | tall |
| 1 | **B2 Problem** ("Sound familiar?") | recognition | `default` | medium |
| 2 | **B3 Why Busy MCP?** | reports/exports/APIs vs. asking | `surface` | **compact** |
| 3 | **B4 Busy reports vs. Busy MCP** | the relief, as conversion | `default` | medium |
| 4 | **B5 What is Busy MCP** | plain definition + "this is NOT" | `surface` | medium |
| 5 | **B6 The accounting workflow** | data lifecycle & provenance | `default` | **compact** |
| 6 | **B7 Supported AI clients** | credibility + honest status | `surface` | medium |
| 7 | **B8 Capabilities (bento)** | excitement, organised by team | `default` | tall |
| 8 | **B9 Live prompts (8 departments)** | proof by conversation | `surface` | tall |
| 9 | **B10 Executive command center** | **signature** business-intelligence moment | `default` | tall |
| 10 | **B11 How it works** | 4 friendly steps | `surface` | medium |
| 11 | **B12 Trust & control** | read-only safety, icon-led | `default` | medium |
| 12 | **B13 What it deliberately doesn't do** | trust through honesty | `surface` | medium |
| 13 | **B14 Architecture** | the one developer moment | **`ink`** | medium |
| 14 | **B15 Future vision + ecosystem** | honest roadmap + where it fits | `default` | medium |
| 15 | **B16 FAQ** | last doubts + SEO | `surface` | medium |
| — | **B17 Final CTA** | commitment | brand band | tall |

**Status-pill system (B7, B8, B15):**

| Pill | Meaning | Style |
|---|---|---|
| **Available now** | Implemented in service `1.9.1`, tested against the real warehouse via official SDK; connectable today via ChatGPT developer mode | solid brand |
| **Rolling out** | Standards path verified by automated OAuth/flow tests or official docs; branded signed-in completion pending (Claude, Claude Code, Codex, VS Code/Copilot) | brand outline |
| **Limited** | Documented for a specific client surface only (e.g. Gemini **CLI**, not the Gemini app) | amber outline + tooltip |
| **Planned / Expected** | Standards-compatible but untested (Cursor, other MCP `2025-11-25` clients) | neutral/muted |

---

## B1. Hero — *the flagship moment*

**Objective:** land the 5-5-5; feel like the strongest SaaS hero on the site; be
instantly finance-credible; invite one confident action. The hero alone should make an
owner think *"wait — I can just ask this?"*

### Headline options (V2 — pick 1; ordered by recommendation)

1. **"Your Busy accounting, answerable by AI."** *(recommended — mirrors the sibling `/mcp`
   cadence, owns the category, reads in <1s.)*
2. "Ask your accounting. Get the real answer." *(punchy, verb-first, outcome-led.)*
3. "Your books can talk now." *(boldest; memorable; pair with a strong sub for clarity.)*
4. "Stop opening reports. Start asking questions." *(problem/relief in one line.)*
5. "Bring your Busy ledgers, sales & stock into ChatGPT and Claude." *(explicit, SEO-leaning.)*
6. "The read-only AI layer for your Busy Accounting data." *(category-defining; more literal.)*

> Rule: whichever headline is chosen, the **read-only** promise must appear within one
> glance — in the eyebrow, the sub, or the trust line — never later than the fold.

### Supporting copy (layered — H1 → sub → trust)

- **Eyebrow:** `Busy Accounting MCP · Read-only AI access`
- **Sub (the "what can I do"):** "Connect the AI assistant your team already uses to your
  Busy Accounting data. Ask in plain language — *'What's my outstanding?'*, *'Which
  products became dead stock?'*, *'Who are my top dealers this quarter?'* — and get real,
  sourced answers from your own books. It reads your data; it never changes it."
- **Trust line (the "can I trust it"):** "Read-only access · You approve the connection ·
  Scoped to your account · Disconnect anytime."

### CTA strategy (hero)

- **Primary:** **"Connect Busy MCP"** → request-access / contact with a Busy-MCP topic
  (OD-6). High-intent, unambiguous, verb-first.
- **Secondary (ghost):** **"See how it works"** → smooth-scrolls to `#how-it-works`. Keeps
  the not-yet-convinced *on the page* instead of bouncing.
- **Tertiary micro-link (optional, small, under CTAs):** "Read-only — here's exactly what
  it can and can't do" → `#what-it-doesnt-do`. Converts the skeptical accountant by
  *leading with the limits*, which paradoxically builds trust.
- **Client status chips** under the CTAs: `ChatGPT · Available now` · `Claude · Rolling
  out` · `Claude Code · Rolling out` · `More MCP clients · Rolling out`.

### Hero visual — the "living answer" scene (V2 concept)

A single continuous scene that *performs the product*: an **AI-client chip** → a **secure,
consent-gated Whats91 Busy MCP bridge** (a lock badge pulses on the path, labelled
"read-only") → a **Busy company node** (ledger / ₹ mark, built from `BrandLogo` + a rupee
glyph) → a returning **answer card**.

V2 upgrade over V1: the answer card **cycles through three real-shaped answers** on the
loop, so in ~13 seconds the visitor sees the *breadth* without reading a word:

1. `Outstanding  ₹18,42,500` · `Top overdue: Acme Traders`
2. `Top dealer (Q)  Acme Traders  ₹42 L  ▲9%`
3. `Dead stock  34 items  · review`

Numbers use `AnimatedNumber` count-up and `tabular-nums`. The lock + "read-only" chip on
the connector signal safety — never an open pipe or a write path. The whole scene is
`aria-hidden`; the message lives fully in the text.

### Wireframe — desktop hero (V2)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [ Whats91 logo ]      Solutions  Features  Free Tools  Pricing  ...      ⌂     │  ← reused Header
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ● Busy Accounting MCP · Read-only AI access                                   │
│                                                        ╭────────────────────╮  │
│  Your Busy accounting,                                 │   ● ChatGPT         │  │
│  answerable by AI.                                     │        ╲            │  │
│                                                        │    [ 🔒 read-only ] │  │  ← consent-gated
│  Connect the AI assistant your team already uses to    │         ╲           │  │    bridge (lock
│  your Busy Accounting data. Ask in plain language —    │       ( Busy ₹ )    │  │    pulses)
│  "What's my outstanding?" — and get real, sourced      │         hub         │  │
│  answers from your own books. It reads your data;      │          ▼          │  │
│  it never changes it.                                  │  ┌────────────────┐ │  │  ← answer card
│                                                        │  │ Outstanding    │ │  │    cycles 1→2→3
│  [ Connect Busy MCP ]   [ See how it works ]           │  │ ₹18,42,500     │ │  │
│  ↳ Read-only — see exactly what it can & can't do      │  │ Top overdue:   │ │  │
│                                                        │  │ Acme Traders   │ │  │
│  ✓ Read-only   ✓ You approve   ✓ Scoped   ✓ Revoke     ╰────────────────────╯  │
│                                                                                │
│  [ChatGPT ·now]  [Claude ·rolling]  [Claude Code ·rolling]  [More ·rolling]    │  ← status chips
└──────────────────────────────────────────────────────────────────────────────┘
```

### Wireframe — mobile hero (V2)

```
┌───────────────────────┐
│ [logo]            ≡    │
├───────────────────────┤
│ ● Busy MCP · Read-only │
│                        │
│ Your Busy accounting,  │
│ answerable by AI.      │
│                        │
│ Connect your AI to     │
│ Busy. Ask. Get real,   │
│ sourced answers.       │
│ It reads — never writes│
│                        │
│ [ Connect Busy MCP ]   │  ← full-width primary
│ [ See how it works ]   │  ← full-width ghost
│  read-only · limits ▸  │  ← tiny tertiary link
│                        │
│ ✓ Read-only ✓ Approve  │
│ ✓ Scoped   ✓ Revoke    │
│                        │
│   ┌─────────────────┐  │
│   │  ● ChatGPT      │  │  ← vertical
│   │      │          │  │    mini-flow
│   │  [🔒 read-only] │  │    (client →
│   │      │          │  │     lock →
│   │   (Busy ₹) hub  │  │     hub →
│   │      │          │  │     answer)
│   │  ┌───────────┐  │  │
│   │  │Outstanding│  │  │  ← card cycles
│   │  │₹18,42,500 │  │  │    on the loop
│   │  └───────────┘  │  │
│   └─────────────────┘  │
│ [ChatGPT][Claude]      │  ← 2×2 status
│ [Code][More]           │    chips
└───────────────────────┘
```

**Reduced-motion / a11y:** the scene freezes to a legible static diagram (client → lock →
Busy hub → a single answer card). No information is motion-dependent.

---

## B2. The problem — *"Sound familiar?"*

**Objective:** recognition. Make the finance reader feel *seen* before anything is sold.
**Bridge in:** the hero promised "just ask"; this section earns the right to that promise
by naming the pain first.

**Heading:** *"Your numbers live in Busy. Getting to them shouldn't cost you an afternoon."*
**Copy:** "Every answer — outstanding, top dealers, slow stock, this month's sales — is
already in Busy. But getting it means opening the right report, setting the company and
year, filtering, exporting, and rebuilding it in Excel. Then someone asks a slightly
different question, and you start over. The data isn't missing. Reaching it is just… manual."

**Three pain cards (icon + one line, each with a tiny animated tell):**
- 🔍 *"Which report was that in again?"* — answers scattered across Busy screens.
- ⏳ *"Give me a minute to pull that up."* — filter, export, repeat, every single day.
- 📊 *"Let me rebuild it in Excel."* — data re-keyed, stale the moment it's pasted.

**V2 micro-interaction:** on scroll-in, the three cards fade up staggered; a faint
"loading spinner" glyph in card 2 spins once (the *waiting* feeling), then settles — a
2-second emotional beat, reduced-motion-safe.

```
        Your numbers live in Busy.
        Getting to them shouldn't cost you an afternoon.
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │  🔍      │   │  ⏳      │   │  📊      │
   │ Scattered│   │ Manual   │   │ Excel    │
   │ reports  │   │ exports  │   │ rework   │
   └──────────┘   └──────────┘   └──────────┘
   bridge ▸ "It's not that the data is missing. It's that reaching it is manual."
```

---

## B3. Why Busy MCP? — *reports vs. exports vs. APIs vs. asking* (NEW in V2)

**Objective:** give the reader *intellectual permission* to want this — answer the
skeptic's "why not just use what I have?" before showing the product. Business-outcome
framed, compact, high-signal.

**Heading:** *"You already have reports. Here's why asking is different."*
**Sub:** "Busy MCP isn't a faster report or a new export button. It changes the *motion* of
getting an answer — from *finding* to *asking*."

**Four "why not …?" cards (problem → why it falls short → the shift):**

| You could… | …but | Busy MCP instead |
|---|---|---|
| **Open a report** | You have to know *which* report, then filter and read it. | You ask in your own words; it picks the right data. |
| **Export to Excel** | It's stale the moment you export, and every follow-up is a new export. | Answers stay live in the chat; follow-ups are just… more questions. |
| **Build on the API** | That's a developer project, and it's raw data, not answers. | No code. It returns business answers, not JSON, over a standard your AI already speaks. |
| **Ask a colleague** | You wait, and they open the same reports you would. | You get the answer in seconds, sourced, without interrupting anyone. |

**The payoff line (bold, centered):** *"Reports make you find the answer. Busy MCP lets you
ask for it."*

**V2 note:** keep this section visually *lighter* than the bento — a 2×2 or 4-up card row,
lots of whitespace, one accent. It's a thinking beat, not a feature dump.

```
   You already have reports. Here's why asking is different.
 ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
 │ Open a report  │ │ Export to Excel│ │ Build on the API│ │ Ask a colleague│
 │  ↳ which one?  │ │  ↳ stale, again│ │  ↳ dev project  │ │  ↳ you wait    │
 │  → just ask    │ │  → live in chat│ │  → no code      │ │  → seconds     │
 └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘
        "Reports make you find the answer. Busy MCP lets you ask for it."
```

---

## B4. Busy reports vs. Busy MCP — *the relief, as a conversion section*

**Objective:** the emotional turn — from friction to flow — made into one of the strongest
conversion sections on the page (V1's before/after, promoted and sharpened).
**Bridge in:** B3 argued *why*; B4 *shows* it in one glance.

**Heading:** *"From opening reports to just asking."*
Two columns, visually distinct (muted "Busy reports today" vs brand-green "With Busy MCP").
Each row is a real, evidence-safe pairing:

| Busy reports today | With Busy MCP |
|---|---|
| Open Busy, set company & year, filter, export | Ask: *"What's my outstanding for COM0001, FY 2026-27?"* |
| Rebuild the report in Excel | Natural-language answers, in seconds |
| Re-run the report for every follow-up | Ask follow-ups in the same conversation |
| Search menus to remember where it lives | Ask in your own words; it finds the data |
| Static report, fixed columns | Interactive intelligence you can drill into |
| Screenshot and paste into a message | Sourced answers, scoped to your account, read-only |

> Accuracy note: keep every "With" example to things the tools actually return
> (outstanding, sales, stock, trends, drill-down). **Never** show a profit/margin/cost
> example here or anywhere (A5).

**V2 interaction:** a subtle connector/arrow animates left→right between the columns
(reuse the `mcp-arrow-flow` idiom, re-namespaced `busymcp-`), reinforcing "this becomes
that." Static under reduced motion. Mobile stacks the two columns as cards, "today" above
"with," with the arrow rotating to point downward.

```
   From opening reports → to just asking.
 ┌────────── BUSY REPORTS TODAY ─────────┐        ┌──────────── WITH BUSY MCP ────────────┐
 │ ✕ Open Busy, filter, export            │        │ ✓ "What's my outstanding?"            │
 │ ✕ Rebuild in Excel                     │  ═══▶  │ ✓ Answers in seconds                  │
 │ ✕ Re-run for every follow-up           │        │ ✓ Follow-ups in the same chat         │
 │ ✕ Search menus to find the report      │        │ ✓ Ask in your own words               │
 │ ✕ Static report, fixed columns         │        │ ✓ Interactive, drillable intelligence │
 │ ✕ Screenshot & paste                   │        │ ✓ Sourced, scoped, read-only          │
 └────────────────────────────────────────┘        └───────────────────────────────────────┘
        (grey / muted)                                    (brand-green / elevated)
```

---

## B5. What is Busy Accounting MCP? (plain language)

**Objective:** define it in one breath; draw the read-only + tools distinction.
**Bridge in:** B4 showed the *feel*; B5 explains *what makes it possible*.

**Heading:** *"What is Busy Accounting MCP?"*
**Copy (the 40–55-word snippet target — crisp, directly under the H2):**
"Busy Accounting MCP is a secure, read-only bridge built on the open Model Context
Protocol. It lets a supported AI assistant connect to your Whats91-synced Busy data and
answer business questions — outstanding, sales, purchases, customers, stock — using a fixed
set of approved tools. It reads your books; it never changes them."

**"This is NOT" strip (4 reassurance cards):**
- ✕ Not write access to Busy → ✓ strictly read-only, always
- ✕ Not raw database or SQL access → ✓ a fixed set of approved, validated tools
- ✕ Not shared passwords → ✓ a secure, revocable sign-in with your existing token
- ✕ Not manual exports & Excel → ✓ live, in-context answers from your own data

*Microcopy:* "Open standard · MCP spec `2025-11-25` · endpoint `busyapi.whats91.com/mcp/v1`."

---

## B6. The accounting workflow — *where your data travels* (NEW in V2)

**Objective:** show the **complete data lifecycle** so the reader trusts the provenance —
and understands read-only *structurally*, not just as a claim. This is the "so where does
my data actually go?" answer, and it's a distinct, business-framed visual from the
technical architecture band (B14).

**Heading:** *"Your data's journey — from Busy to a real answer."*
**Sub:** "Nothing leaves Busy that you didn't sync, and nothing flows back the other way.
It's a one-way, read-only path from your books to your answer."

**Horizontal lifecycle (animated left→right, static-legible):**

```
  ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │  Busy   │──▶│ Whats91  │──▶│  Busy    │──▶│   AI     │──▶│Structured│──▶│ Business │──▶│ Business │
  │Accounting│  │  Sync    │  │  MCP     │  │Assistant │  │  data    │  │ answer   │  │ decision │
  │ (your   │  │(read the │  │(read-only│  │(ChatGPT, │  │(sourced, │  │(in plain │  │(you, in  │
  │  books) │  │ synced   │  │ approved │  │ Claude…) │  │ scoped)  │  │ language)│  │ control) │
  │         │  │  data)   │  │  tools)  │  │          │  │          │  │          │  │          │
  └─────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
      └──────────────── one-way · read-only · scoped to your account ────────────────┘
```

**Per-node micro-copy (business language, evidence-safe):**
- **Busy Accounting** — your books, on your system.
- **Whats91 Sync** — your data is synced into the Whats91 Busy Retrieval layer (the same
  data the existing Busy APIs read).
- **Busy MCP** — a read-only, approved-tools bridge; no SQL, no writes.
- **AI Assistant** — the client you already use, connected over the open protocol.
- **Structured data** — the tool returns exact, sourced figures (not a guess).
- **Business answer** — your assistant phrases it in plain language.
- **Business decision** — you verify and decide; the AI never acts on your books.

**V2 interaction:** a single "data pulse" travels the chain on a loop (reuse the
`conn-comet` dash idiom); the return direction is *deliberately absent* to reinforce
one-way/read-only. Under reduced motion, the chain is a static, labelled diagram. On
mobile, the chain rotates to **vertical** with the same labels (never shrink to unreadable).

**Why this section matters:** it pre-answers the auditor/CFO's provenance question, makes
"read-only" tangible, and visually separates *business lifecycle* (here) from *technical
security pipeline* (B14) so the two never feel redundant.

---

## B7. Supported AI clients (honest, evidence-graded) — *preserved statuses from V1*

**Objective:** credibility through the assistants they already use — with truthful,
evidence-graded status that reads as *transparent*, not *broken*.
**Bridge in:** B6 ended at "the AI assistant"; B7 answers "which ones, really?"

**Heading:** *"Works with the AI assistants your team already opens."*
**Sub:** "ChatGPT connects today in developer mode. Claude and more MCP clients are rolling
out. Every status below reflects what we've actually verified."

**Primary client cards** (neutral name chips / monograms — no third-party logo assets; D5):

| Client | Status | Headline | Detail (evidence-safe) |
|---|---|---|---|
| **ChatGPT** | **Available now** | "Add Busy MCP in ChatGPT developer mode." | Connects via OAuth (CIMD) with your existing Whats91 token; the full read-only tool set is discoverable. Verified end-to-end via automated OAuth flow and official-SDK tests. |
| **Claude** *(Claude.ai remote connector)* | **Rolling out** | "Add as a custom remote MCP connector." | Standards-based connection; the live authorization flow is verified, signed-in product completion is being finalised. |
| **Claude Code** | **Rolling out** | "`claude mcp add --transport http …`" | OAuth (CIMD/DCR) or a direct bearer header; protocol flow verified, product login pending. |
| **Developer clients** *(Codex · VS Code / Copilot)* | **Rolling out** | "Configure a remote MCP server." | Configuration documented from official sources; not yet product-tested. |
| **Gemini** *(Gemini CLI)* | **Limited** ⓘ | "Gemini CLI, via HTTP + headers." | Documented for the **CLI** only, not the Gemini app; not product-tested. |
| **Other MCP clients** *(Cursor, etc.)* | **Planned** | "Any MCP `2025-11-25` client." | Standards-compatible; not yet verified. |

**Footnote:** "We verify each client during rollout; statuses update as verification
completes. No branded client was signed in during testing — statuses reflect automated
protocol/OAuth flow tests, official-SDK tests against a real Busy warehouse, and vendor
documentation."

> **Grok:** intentionally **absent** — no Busy-MCP compatibility evidence exists for xAI
> Grok (D7-OD3). Do not add a Grok card unless the product owner confirms a tested path.

```
   Works with the AI assistants your team already opens.
 ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
 │ [ChatGPT]  │ │ [Claude]   │ │ [Claude    │ │ [Dev       │
 │ ●Available │ │ ○Rolling   │ │  Code]     │ │  clients]  │
 │ dev mode   │ │  out       │ │ ○Rolling   │ │ ○Rolling   │
 └────────────┘ └────────────┘ └────────────┘ └────────────┘
 ┌────────────┐ ┌────────────┐
 │ [Gemini    │ │ [Other MCP │
 │  CLI] ▲Ltd │ │  clients]  │
 │ ⓘ CLI only │ │ ·Planned   │
 └────────────┘ └────────────┘
```

---

## B8. Capabilities — bento tiers (organised by the way you work)

**Objective:** make the 69-tool surface feel *organised and business-relevant*, not a
technical list. Group into finance teams' mental model. Every card uses **business
language**, never raw tool names. All groups are **Available now** at the tool level
(implemented in `1.9.1`, tested against the real warehouse); the honesty boundary is
handled in B13.
**Bridge in:** B7 established *who* connects; B8 shows *what one connection covers*.

**Heading:** *"Everything you can ask — organised by the way you work."**
**Sub:** "One read-only connection covers your whole Busy picture. Ask in plain language;
answers come back sourced and scoped to your account."

Premium **bento grid**, each category = its own icon + accent. V2 gives the two most
owner-relevant tiles (Executive command center, Sales & revenue) larger cells and a live
micro-visual, so the grid has visual rhythm rather than nine equal boxes:

**1. 📌 Executive command center** *(large tile, links to B10)* — a compact company view:
sales, receipts, receivables, customer activity, stock movement, top movers, and
deterministic alerts; plus "what should each team review next?"

**2. 💰 Sales & revenue** *(large tile)* — company and customer sales registers,
product-line sales with GST, top/bottom customers, products, groups, states, salespeople
by a sales metric, with contribution and prior-period growth; trends, drill-down, period
comparison, growth/decline exceptions, seasonality.

**3. 🧾 Receivables & collections** — outstanding bills, overdue days and aging, credit
exposure (Standard/FIFO), a deterministic collection-priority queue, and actual
receipt-timing / late-payment behaviour.

**4. 👥 Customer intelligence** — 360° customer view, activity status
(active / slowing / dormant / reactivated), repeat-purchase cadence and reorder-due,
retention cohorts, lifetime-value scenario, and RFMB segmentation.

**5. 📦 Purchases & suppliers** — supplier discovery, supplier ledgers and payables,
purchase and purchase-return registers (voucher + item line), pending purchase orders, and
purchase trends.

**6. 📊 Inventory & product intelligence** — stock, prices, tax and hierarchy;
fast/slow/dead movement classification, inventory-aging & dead-stock review, a bounded
stockout / at-risk scenario, substitute candidates, and return-rate analysis.

**7. 🎯 Concentration & portfolio risk** — Pareto, ABC classification, and
customer/product concentration (top-1/5/10 shares, HHI dependency flags).

**8. 🔁 Cross-sell & product-group intelligence** — customer × product-group matrix,
penetration, evidence-ranked cross-sell opportunities, and product-group migration.

**9. 📤 Downloadable registers** — create a private, signed CSV export of the sales or
purchase register when you actually need a file (read-only; the export never changes Busy).

**Hard boundary note (small, honest, links to B13):** "Busy MCP answers from your synced
Busy data. It is **read-only** and does **not** calculate profit or margin, cost, or
valuation, and does not forecast. See *What it deliberately doesn't do*."

```
   Everything you can ask — organised by the way you work.

 ┌───────────────────────────┐ ┌───────────────────────────┐
 │ 📌 Executive command center│ │ 💰 Sales & revenue         │   ← large tiles + micro-visual
 │ sales·receipts·receivables │ │ registers·top movers·growth│     (mini bar / sparkline)
 │ ●Available now      [ view]│ │ ●Available now             │
 └───────────────────────────┘ └───────────────────────────┘
 ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
 │🧾Recv &  │ │👥Customer│ │📦Purchase│ │📊Inventory│
 │ collect  │ │ intel    │ │ & supplier│ │ & product │
 └──────────┘ └──────────┘ └──────────┘ └──────────┘
 ┌──────────┐ ┌──────────┐ ┌───────────────────────────┐
 │🎯Concen- │ │🔁Cross-  │ │ 📤 Downloadable registers │
 │ tration  │ │ sell     │ │ signed CSV · read-only     │
 └──────────┘ └──────────┘ └───────────────────────────┘

 ── Read-only · no profit/margin/cost · no forecasts. See what it doesn't do ▸ ──
                         [ Connect Busy MCP ]   ← mid-page CTA (peak excitement)
```

---

## B9. Live prompt examples — *8 departments* (proof by conversation)

**Objective:** let *every* team see themselves using it. Real questions in their own words,
grouped by department, styled like chat, each a copyable prompt chip with a sketched
answer. **All answers must be things the tools actually return** (D1); INR, Indian FY, real
Busy shapes.
**Bridge in:** B8 organised capability; B9 makes it personal — "that's *my* question."

**Heading:** *"Real questions. Real answers from your books."*
**Sub:** "Pick your team. Every prompt is copyable — paste it straight into your assistant."

Present as **department tabs or stacked labelled groups** (tabs on desktop, stacked on
mobile). Each department shows 2–3 conversations.

**👑 Business owner — Available now**
- 💬 "Give me today's executive alerts for COM0001, FY 2026-27."
  → *"3 alerts: receivables up 12% vs last month; 2 top-5 customers slowing; 34 dead-stock items."*
- 💬 "How did this quarter compare to last quarter?"
  → *"Net sales ₹2.31 Cr vs ₹2.04 Cr — up 13%. Top gain: Hardware group (+₹18.4 L)."*

**🧾 Accounts — Available now**
- 💬 "What's my total outstanding, and who are the top overdue customers?"
  → *"Outstanding ₹18,42,500. Top overdue: Acme Traders ₹3.1 L (62 days), …"*
- 💬 "List due outstanding bills for customer 1001."
  → *"7 open bills, ₹2.4 L due; oldest 48 days. Bill-wise breakdown shown."*

**💰 Finance — Available now**
- 💬 "Summarise my receivables aging and net trade exposure."
  → *"Receivables ₹18.4 L; aging 0-30 ₹9.1 L / 31-60 ₹5.2 L / 60+ ₹4.1 L; net trade exposure shown. (No DSO/DPO — see limits.)"*
- 💬 "Which customers concentrate most of my sales?"
  → *"Top-5 customers = 41% of net sales; HHI flag: moderate concentration."*

**📈 Sales — Available now**
- 💬 "Who are my top ten dealers this quarter and how did they change?"
  → *"1. Acme ₹42 L (+9%) · 2. …  contribution % and prior-period growth shown."*
- 💬 "Which customers are slowing down?"
  → *"7 customers moved to 'slowing' — net sales below their own cadence."*

**🛒 Purchase — Available now**
- 💬 "Which supplier has the highest payable?"
  → *"Top payable: Steel Corp ₹6.4 L across 8 open bills (aging shown)."*
- 💬 "Show my purchase trend for the last 6 months."
  → *"Net purchases by month (zero-filled); leading item groups + Others."*

**📦 Inventory — Available now**
- 💬 "Which products became dead stock?"
  → *"34 dead-stock candidates (no sale in lookback, stock on hand). Review list."*
- 💬 "What's at risk of stocking out in the next 30 days?"
  → *"Scenario (stated assumptions): 12 items below cover; at-risk qty/value shown."*

**🧭 Management — Available now**
- 💬 "What should our sales, purchase, and collections teams review next?"
  → *"Ranked review priorities per team, each with the evidence behind it (human-review, not auto-actions)."*
- 💬 "Show me warning-level exceptions across sales and receivables this quarter."
  → *"Only warning/info alerts, with the actual value and its alert-clear boundary."*

**🔎 Auditor — Available now**
- 💬 "Reconcile customer 1001's outstanding against the ledger."
  → *"Bill-reference outstanding vs. ledger receivable, with the reconciliation difference stated openly."*
- 💬 "Export the June 2026 product-line sales register as CSV."
  → *"Private signed CSV link created (short-lived); rows are not pasted into chat."*

> **Do NOT include** any profit/margin prompt, cost/valuation prompt, forecast ("how much
> will I sell next month"), branch/territory framing, or write action ("post this entry").
> Unsupported — would break A5. When a genuinely useful prompt brushes a boundary (e.g.
> Finance receivables), show the limit inline ("No DSO/DPO — see limits") to model honesty.

```
   Real questions. Real answers from your books.
 [ Owner | Accounts | Finance | Sales | Purchase | Inventory | Management | Auditor ]   ← tabs (desktop)

 [Accounts ·Available now]
  ┌ user ─────────────────────────────────────────┐
  │ 💬 What's my total outstanding & top overdue?  │  [copy]
  └────────────────────────────────────────────────┘
     ┌ assistant ──────────────────────────────────┐
     │ Outstanding ₹18,42,500. Top overdue: Acme    │
     │ Traders ₹3.1 L (62 days), …                  │
     └──────────────────────────────────────────────┘
```

---

## B10. Executive command center — *the signature section* (expanded in V2)

**Objective:** the section that makes this page *feel* like a flagship finance product and
the clearest differentiator from the sibling `/mcp` page. A tasteful, static-legible
**dashboard mock** in SVG/CSS (NOT a live app), showing the shape of what the
executive-summary + exception + recommended-action tools return. This is where the CFO
falls in love.
**Bridge in:** B9 showed single questions; B10 shows *one question returning the whole company*.

**Heading:** *"One question. Your whole company, at a glance."*
**Sub:** "Ask for your executive summary and Busy MCP returns a compact, sourced view —
sales, receipts, receivables, customer activity, stock movement, top movers, and
deterministic alerts. Every figure traces to your synced Busy data. Read-only."

### V2 dashboard composition (all evidence-backed shapes; illustrative INR, clearly a demo)

**Row 1 — KPI cards (4, `AnimatedNumber` count-up, `tabular-nums`, small vs-prior delta):**
- `Net sales (period)` — ₹2.31 Cr ▲13%
- `Receipts (evidence)` — ₹1.98 Cr *(labelled "receipt evidence," not "total collections" — D1)*
- `Receivables` — ₹18.42 L
- `Active customers` — 214 ▲6

**Row 2 — three insight widgets side by side:**

- **🧾 Receivables widget** — a horizontal **aging mini-bar** (0-30 / 31-60 / 60+) with a
  one-line "top overdue: Acme ₹3.1 L (62d)". Small "collection priority" chip → hints at
  the collection-priority queue.
- **💰 Sales widget** — a **top-movers list** (top 3–4 customers or product groups by net
  sales, each with contribution %), plus a tiny **sparkline** of the sales trend
  (zero-filled buckets).
- **📦 Inventory widget** — three **movement counters** (Fast / Slow / Dead) with a
  "34 dead-stock items · review" line and a "12 at stockout risk" sub-line.

**Row 3 — alerts & executive insights strip:**
- **Deterministic alerts** (each with an "expected range / clear boundary", never a
  probability or forecast): `⚠ Receivables ▲12% vs last month` · `⚠ 2 top-5 customers
  slowing` · `ℹ 34 dead-stock items` · `ℹ Concentration: top-5 = 41% (HHI moderate)`.
- **"Review next" chips** (from the recommended-actions tool, human-review framed):
  `Collections: 20 priority bills` · `Sales: 7 slowing customers` · `Purchase: 3 high payables`.

**Footer micro-note (mandatory honesty):** *"Illustrative. Every figure is sourced from
your synced Busy data, read-only. Gross profit, margin, and cost are not shown — see 'What
it deliberately doesn't do'. Alerts are deterministic review signals, not forecasts."*

### Desktop wireframe (V2)

```
   One question. Your whole company, at a glance.
 ┌──────────────── Executive summary · COM0001 · FY 2026-27 · "give me my executive dashboard" ─────────────┐
 │  ┌ Net sales ─────┐ ┌ Receipts (ev.) ┐ ┌ Receivables ──┐ ┌ Active cust. ─┐                              │
 │  │ ₹2.31 Cr ▲13%  │ │ ₹1.98 Cr       │ │ ₹18.42 L      │ │ 214 ▲6        │   ← KPI cards (count-up)      │
 │  └────────────────┘ └────────────────┘ └───────────────┘ └───────────────┘                              │
 │  ┌ Receivables ─────────────┐ ┌ Sales ─────────────────┐ ┌ Inventory ───────────────┐                  │
 │  │ 0-30 ▓▓▓▓▓▓ ₹9.1 L        │ │ 1 Acme      ₹42 L  18%  │ │ Fast 128                 │                  │
 │  │ 31-60 ▓▓▓▓  ₹5.2 L        │ │ 2 Hardware  ₹31 L  13%  │ │ Slow  46                 │                  │
 │  │ 60+  ▓▓▓   ₹4.1 L         │ │ 3 …         sparkline ╱ │ │ Dead  34 · review        │                  │
 │  │ top overdue: Acme (62d)   │ │ [trend ╱╱╲╱ ]           │ │ 12 at stockout risk      │                  │
 │  └───────────────────────────┘ └────────────────────────┘ └──────────────────────────┘                  │
 │  Alerts:  ⚠ Receivables ▲12%   ⚠ 2 top-5 slowing   ℹ 34 dead-stock   ℹ top-5 = 41% (HHI mod.)           │
 │  Review next:  [Collections · 20 bills]  [Sales · 7 slowing]  [Purchase · 3 payables]                    │
 │  Illustrative · sourced · read-only · no profit/margin/cost shown · alerts are review signals, not forecasts │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                   [ See a live walkthrough ]   ← command-center CTA
```

### Mobile behaviour
KPI cards wrap **2×2**; the three widgets **stack** vertically; alerts become a scrollable
chip row; the whole mock lives in its **own `overflow-x:auto` container** so it never
causes page overflow and never shrinks text to unreadable. Static and fully legible under
reduced motion (count-ups resolve to final values; sparkline is a static path).

### Motion (subtle, reduced-motion-safe)
KPI numbers count up once on first view; aging bars and the sparkline draw in once (soft
`camp-bar-flow`-style highlight sweep); alert chips fade in staggered. No looping,
attention-grabbing motion — this must read as *calm executive software*, not a casino.

---

## B11. How it works (four friendly steps)

**Objective:** remove "is this hard to set up?" friction. Business-framed; the technical
version is B14.
**Bridge in:** B10 showed the payoff; B11 shows how quickly you get there.

**Heading:** *"Connect in minutes."*

1. **Pick your assistant** — choose ChatGPT (developer mode) or another supported MCP
   client and point it at `busyapi.whats91.com/mcp/v1`.
2. **Sign in with your Whats91 token** — a secure Whats91 authorization page (OAuth 2.1 +
   PKCE) validates your **existing** Whats91 API token. No new password, no separate MCP
   token to manage; the token is never shown to the assistant.
3. **Your access is scoped automatically** — the connection is bound to your account and
   your synced Busy companies and financial years, enforced by row-level security. It's
   read-only.
4. **Ask away** — questions and answers happen inside your assistant, from your own books.
   Disconnect any time.

*Microcopy:* "You need an active Whats91 API token with Busy Retrieval access and at least
one synced company/financial year. Your token stays secure — enter it only on the HTTPS
`busyapi.whats91.com` page, never in chat."

```
   Connect in minutes.
  ①───────────②───────────③───────────④
  Pick your    Sign in with  Access is    Ask away
  assistant    your Whats91  scoped (read- (& disconnect
  (MCP URL)    token (OAuth) only, RLS)    anytime)
```

---

## B12. Trust & control (read-only safety, icon-led)

**Objective:** convert the verified security model (D2) into *reassurance*, not a lecture.
**Bridge in:** ease (B11) is only reassuring if you stay in control — B12 proves you do.

**Heading:** *"Your books. Read-only. Your rules."*
**Sub:** "Busy MCP is built so an AI assistant can read approved data — and never change it."

**Eight trust cards (icon + one line — all verified in D2):**
- 🔒 **Read-only** — it can read approved data; it cannot post, edit, delete, or sync.
- 🧩 **Approved tools only** — a fixed, schema-validated tool set; no raw SQL or table access.
- 👤 **Scoped to your account** — tenant-bound sessions; another account's session is rejected.
- 🗄 **Row-level security** — company and financial-year access enforced in the database.
- ✅ **OAuth sign-in** — standards-based (OAuth 2.1 + PKCE); reuses your existing token, no new one.
- 🔐 **Encrypted at rest** — your token is stored AES-256-GCM encrypted; short-lived access, rotating refresh.
- 🔁 **Revocable anytime** — disconnect, or revoke the token through your existing Whats91 process.
- 🧾 **Sourced answers** — every figure traces to your synced Busy data, with reconciliation evidence.

*Guardrail:* describe controls plainly; **no** "bank-grade / certified / SOC 2 /
pen-tested" claims (D2). The compatibility report is an integration test, not a certification.

```
   Your books. Read-only. Your rules.
 ┌────┐ ┌────┐ ┌────┐ ┌────┐   ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │🔒  │ │🧩  │ │👤  │ │🗄  │   │✅  │ │🔐  │ │🔁  │ │🧾  │
 │Read│ │Tool│ │Scope│ │RLS │   │OAuth│ │Enc │ │Revk│ │Src │
 └────┘ └────┘ └────┘ └────┘   └────┘ └────┘ └────┘ └────┘
```

---

## B13. What it deliberately doesn't do (trust through honesty)

**Objective:** the section that *earns* an accountant's trust and enforces A5. Frame the
boundaries as a feature ("so you always trust the number"), not an apology. A key
differentiator; the sibling `/mcp` page has nothing like it.
**Bridge in:** B12 proved control; real control means knowing exactly where the line is.

**Heading:** *"What it deliberately doesn't do — so you always trust the number."*
**Sub:** "Busy MCP will never guess. When something isn't in your data, it says so."

**Boundary cards (grouped, icon + one line):**
- 🚫 **No profit or margin** — gross profit, gross margin, and customer profitability aren't
  calculated; the cost and valuation sources aren't available, so it won't estimate them.
- 🚫 **No cost or inventory valuation** — no landed cost, no stock value, no "blocked capital."
- 🔮 **No forecasts or predictions** — every score is a deterministic *review priority* from
  observed evidence, not a probability, credit rating, or forecast.
- 🏭 **No verified branch / territory** — a Busy material centre isn't a branch or
  warehouse; customer state isn't a territory; salesperson isn't a team or commission figure.
- 📐 **No operating-cycle ratios** — no DSO, DPO, inventory days, or cash conversion cycle;
  the working-capital view shows *net trade exposure* only.
- ✍️ **No writing to Busy** — it never creates, edits, posts, or approves anything.
- 🧠 **No made-up numbers** — if a company, customer, product, or figure isn't in your
  synced data, it reports that plainly instead of inventing one.

*Closing line:* "Everything Busy MCP returns is human-review decision support — verify
against your books before acting on a financial or collection decision."

```
   What it deliberately doesn't do — so you always trust the number.
 ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
 │🚫 No profit/ │ │🚫 No cost/   │ │🔮 No forecast│ │🏭 No verified│
 │   margin     │ │  valuation   │ │  or prediction│ │ branch/terr. │
 └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
 ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
 │📐 No DSO/DPO/│ │✍️ No writing │ │🧠 No made-up │
 │  cycle ratios│ │   to Busy    │ │   numbers    │
 └──────────────┘ └──────────────┘ └──────────────┘
```

---

## B14. Architecture — the one developer moment (dark `ink` band)

**Objective:** one credible, satisfying technical section; the only place protocol terms
appear prominently. Distinct from B6 (business lifecycle) — this is the *security pipeline*.
**Bridge in:** B13 built trust for the layperson; B14 gives the evaluator the machinery.

**Heading:** *"Built on an open standard. Read-only, end to end."*

**One clean pipeline diagram:**
```
  AI client ──▶ Secure MCP connection ──▶ Whats91 Busy MCP Gateway
  (ChatGPT/Claude/  (OAuth 2.1 · S256 PKCE ·   (busyapi.whats91.com/mcp/v1)
   MCP clients)      Streamable HTTP)               │
                                                    ▼
                            Auth + tenant / RLS scope check ──▶ Approved read-only tool
                                                                     │
                                                                     ▼
                            Busy Retrieval service (your account, your company/FY)
                                                                     │
                                                                     ▼
                            PostgreSQL (row-level security) ──▶ structured, sourced result
```

**Copy (concise):** "Your assistant connects over the open **Model Context Protocol** (spec
`2025-11-25`) via Streamable HTTP. Every request passes an OAuth-secured check, resolves to
your tenant under PostgreSQL row-level security, and runs one **approved, read-only,
schema-validated** tool through the same service layer as our Busy Retrieval APIs. No SQL,
no writes, no cross-account access. Fixed-bearer clients using your existing Whats91 token
are supported too."

**Endpoint chip:** `https://busyapi.whats91.com/mcp/v1` (copyable — with a "copied ✓" state).
**Developer CTA:** "Read the integration guide" → docs (OD-5; if no public docs route
exists, link to `#how-it-works` + contact — do not invent a URL). Deeper protocol detail
(CIMD, DCR, refresh rotation, RFC 9728/8414) lives in the compatibility report / developer
docs — **not** on the page.

**V2 motion:** sequential node glow + arrow-flow left→right + a slow light sweep across the
`ink` panel (reuse the pattern shipped on `McpArchitectureDiagram`, re-namespaced
`busymcp-*`). Frozen and legible under reduced motion.

---

## B15. Future vision + ecosystem (honest roadmap, expanded in V2)

**Objective:** communicate ambition and momentum *without* blurring roadmap into
"available" — and show where Busy MCP sits in the wider Whats91 AI ecosystem.
**Bridge in:** B14 closed the technical case; B15 opens the horizon.

### Part 1 — Honest horizons (Today / Rolling out / Planned)

```
   TODAY (Available)         ROLLING OUT                 PLANNED / FUTURE
   ────────────────         ───────────                 ────────────────
   Read-only business       Claude, Claude Code,         More MCP clients
   answers across sales,    Codex, VS Code/Copilot       (Cursor, others);
   receivables, customers,  client verification;         broader coverage as
   purchases, inventory,    branded signed-in            vendors stabilise MCP.
   trends, concentration,   completion;                  (No profit/cost/forecast
   cross-sell, exports —    Gemini beyond the CLI.       planned — by design.)
   via ChatGPT dev mode.
```

*Framing rule:* "Today" uses **Available now** language; "Rolling out" / "Planned" use
future tense + pills. Reinforce that profit/cost/forecast are **out of scope by design**,
not "coming soon."

### Part 2 — The ecosystem picture (NEW in V2)

Show Busy MCP as *one room in a larger house* — the AI-access layer of the Whats91
platform — without promising unbuilt capabilities. This is a **vision diagram**, explicitly
labelled as direction, not a feature list.

```
   YOUR DATA                 THE AI LAYER              THE WHATS91 PLATFORM (today)      DIRECTION (honest)
   ─────────                 ────────────              ───────────────────────────      ──────────────────
   Busy Accounting ──┐                                                                   
                     ├──▶  Busy MCP (read-only) ──▶  Your AI assistant  ──▶  Whats91  ──▶  WhatsApp Business
   (more sources     │        (this page)                                    platform         · templates
    over time,       │                                 ┌── Whats91 MCP ──────┘                · campaigns
    honestly scoped) ┘                                 │   (WhatsApp data,                     · chatbots /
                                                        │    sibling page /mcp)                   Flow Builder
                                                        └── existing Busy solutions:            (existing products)
                                                            ERP · Reports · Google Sheet
                                                            · Busy AI Agent

   ▸ Vision, not a promise. Today: read-only Busy answers + the sibling Whats91 MCP for
     WhatsApp data. Direction: more AI-accessible surfaces across the same secure platform.
     No profit/cost/forecast, no write-to-Busy, is planned — those stay out of scope by design.
```

**Copy:** "Busy MCP is the accounting room of a bigger house. Today it gives your AI a
read-only window into Busy; alongside it, **Whats91 MCP** gives the same assistants a window
into your WhatsApp Business data, and your existing Whats91 products (Busy ERP, Reports,
Google Sheet sync, the Busy AI Agent) keep running as they do now. Over time, more of the
Whats91 platform becomes answerable by the AI you already use — the same secure, permissioned
way. What won't change: it stays read-only for Busy, and it never guesses your numbers."

*Guardrail:* every ecosystem node except "Busy MCP (today)" and "Whats91 MCP (existing)"
must read as **direction**, not shipped capability. Do not imply an autonomous "AI agent
that acts on your books" — that would violate A5/read-only. (The existing "Busy AI Agent"
product may be referenced as-is via its existing page, not reframed here.)

---

## B16. FAQ (trust + SEO; visible text == FAQ schema) — *preserved + extended*

Only evidence-backed answers; the same array feeds `FAQPage` JSON-LD (D4).

1. **What is Busy Accounting MCP?** — plain definition (B5).
2. **Is it read-only?** — Yes. It can read approved Busy data; it cannot create, edit,
   delete, post, sync, or approve. The only non-read tools create a private CSV export and
   never change Busy data.
3. **Which AI assistants can I use?** — ChatGPT (developer mode, available now); Claude and
   Claude Code (rolling out); Codex and VS Code/Copilot (documented, rolling out); Gemini
   CLI (limited); other MCP `2025-11-25` clients (planned).
4. **Does the AI get direct access to my Busy database?** — No. It uses a fixed set of
   approved, schema-validated tools — never raw SQL, generic table reads, or writes.
5. **Can it tell me my profit or margin?** — No. Gross profit, margin, customer
   profitability, and cost/valuation are deliberately not calculated, because the
   authoritative cost sources aren't available; it says so rather than estimating.
6. **Can it forecast sales or predict who will default?** — No. Every score is a
   deterministic review priority from observed evidence — not a forecast, probability, or
   credit rating.
7. **Whose data can it see?** — Only your account's synced Busy companies and financial
   years, enforced by tenant-bound sessions and database row-level security.
8. **Do I need a new login or token?** — No. It reuses your existing Whats91 API token via a
   secure OAuth sign-in; the token is stored encrypted and never shown to the assistant.
9. **What do I need before connecting?** — An active Whats91 API token with Busy Retrieval
   access, and at least one synced company and financial year.
10. **Are material centres the same as branches?** — No. A material centre is not a verified
    branch or warehouse, customer state is not a territory, and salesperson is not a team or
    commission figure. Those bases are stated, not assumed.
11. **Can I download a report?** — Yes. It can create a private, signed CSV export of the
    sales or purchase register when you need a file; export rows are never pasted into the
    chat, and the link is short-lived.
12. **How is this different from opening a Busy report?** — A report makes you find the
    answer (which report, which filter). Busy MCP lets you *ask* for it in plain language
    and get a sourced answer back, with follow-ups in the same conversation. *(Feeds B3/B4.)*
13. **Can I revoke access?** — Yes, anytime — disconnect the client, or revoke the token
    through your existing Whats91 process.
14. **Is this the same as the Whats91 MCP for WhatsApp?** — No. That connects AI to your
    WhatsApp Business data; this connects AI to your **Busy accounting** data. Sibling
    products, one platform. *(Link to `/mcp`.)*
15. **Is it certified or independently audited?** — We describe the controls we've built
    (OAuth 2.1, PKCE, row-level security, tenant isolation, encryption at rest, revocation).
    We do not claim third-party security certification. *(OD-7.)*

---

## B17. Final CTA

**Objective:** convert at the decision moment.
**Bridge in:** every doubt answered; now, the ask.

**Heading:** *"Ask your Busy data anything."*
**Sub:** "Connect your AI assistant to your Busy accounting — read-only, scoped to your
account, disconnect anytime."
**Primary CTA:** "Connect Busy MCP" (OD-6). **Secondary:** "See how it works"
(`#how-it-works`).
**Reassurance:** "Read-only · you approve the connection · your token stays encrypted."
**Legal line (small):** "See our Privacy Policy and Terms for how the MCP integration
handles data." → link `/privacy#ai-mcp` and `/terms#ai-mcp` (the AI/MCP sections already
exist on those pages).

```
 ┌──────────────────────── brand band ────────────────────────┐
 │                  Ask your Busy data anything.               │
 │   Read-only AI access to your accounting — scoped to you.   │
 │        [ Connect Busy MCP ]    [ See how it works ]         │
 │      Read-only · you approve · token stays encrypted        │
 │        Privacy Policy · Terms (AI & MCP integration)        │
 └─────────────────────────────────────────────────────────────┘
```

---
---

# PART C — Craft

## C1. Conversion strategy & CTA map (V2 — every CTA mapped to its emotional trigger)

One primary conversion (**connect / request access**); one secondary (**see how it
works**); a developer link for evaluators; repeated at the exact moments the reader is most
ready. Every CTA below is tied to *why the visitor is emotionally ready to click there*.

| Placement | CTA | Emotional trigger (why it converts here) |
|---|---|---|
| **B1 Hero (primary)** | Connect Busy MCP | first spark — "wait, I can just ask?" Capture high intent immediately. |
| **B1 Hero (secondary)** | See how it works | the curious-but-cautious — keep them scrolling instead of bouncing. |
| **B1 Hero (tertiary micro-link)** | Read-only — what it can & can't do | the skeptic — leading with limits *builds* trust and pulls them into B13. |
| **After B8 Capabilities (mid-page)** | Connect Busy MCP | **peak excitement** — they've just seen their whole picture in one connection. |
| **After B10 Command center** | See a live walkthrough / Talk to us | **awe → "show me it's real"** — the evaluator wants proof, not another signup yet. |
| **B14 Architecture (developer)** | Read the integration guide / copy endpoint | the technical evaluator — give them the endpoint and the machinery. |
| **B17 Final CTA (primary)** | Connect Busy MCP | **decision moment** — every objection answered. |
| **Footer** | Busy Accounting MCP → this route | ambient discoverability sitewide. |
| **Sticky (mobile, optional)** | Connect Busy MCP | thumb-reachable after the hero scrolls away; dismissible; reduced-motion-safe; must not cover content or fight the cookie banner. |

Rules: **one visual primary style** (brand button) reused everywhere; secondary is
ghost/outline; the tertiary hero link is text-only. All primary CTAs point to the same
destination (OD-6) for clean tracking. Mirror the sibling `/mcp` page's CTA destinations
unless OD-6 defines a Busy-specific flow.

## C2. SEO strategy (expanded in V2)

**Core (preserved):**
- **Route/canonical (OD-1):** recommended **`/busy-accounting-mcp`** (top-level,
  keyword-rich, sibling to `/mcp`). Alternative: `/solutions/busy-accounting-mcp`. Pick
  one, self-canonical, add to `sitemap.ts` (priority ~0.9, weekly).
- **Title (≤~60):** "Busy Accounting MCP — Ask Your Busy Data in ChatGPT & Claude".
- **Meta description:** "Connect ChatGPT, Claude, or any MCP client to your Busy Accounting
  data. Ask about outstanding, sales, purchases, and stock in plain language — read-only,
  scoped to your account, sourced answers."
- **H1:** hero headline (one only). **H2s:** the B-section headings. **H3s:** cards/steps.
- **Schema:** `BreadcrumbList` (Home › Busy Accounting MCP) + `FAQPage` (mirror visible
  text) + **`SoftwareApplication`** (name "Busy Accounting MCP", category
  "BusinessApplication", publisher "Wilford Technology"; **no** ratings/prices; **no**
  `Product`). Reuse the helpers in `src/lib/seo/config.ts`.
- **OG/Twitter:** new `public/og-busy-mcp.png` (1200×630) if the approved pipeline exists;
  else reuse the valid fallback and document the pending image (as `/mcp` does).
- **Schema caution:** no `HowTo` schema for B11 (Google retired HowTo rich results).

**V2 — keyword clusters (organise content + internal anchors + blog around these):**

| Cluster | Head term | Supporting long-tails |
|---|---|---|
| **Product / brand** | Busy Accounting MCP | "Busy MCP server", "Busy MCP", "Accounting MCP", "MCP for Busy" |
| **AI-for-Busy** | AI for Busy Accounting | "Busy Accounting AI", "Busy ERP AI", "AI for Busy", "Busy Accounting assistant", "Busy Accounting Copilot" |
| **Assistant integrations** | Busy ChatGPT integration | "Busy Accounting ChatGPT", "connect Busy to ChatGPT", "Claude Busy accounting", "Busy AI agent" (careful: distinct from the existing Busy AI Agent product) |
| **Reports / outcomes** | Busy Reports AI | "ask Busy outstanding in AI", "Busy sales analysis AI", "Busy dead stock AI", "Busy receivables AI", "Busy accounting copilot" |
| **Category** | AI Accounting Assistant | "AI accounting assistant India", "conversational accounting", "read-only accounting AI" |

> Verify demand before finalising; never fabricate metrics. Never target unofficial/
> scraping terms. Keep "Busy AI agent" usage disambiguated from the existing `/solutions/
> busy-ai-agent` product to avoid cannibalisation (internal-link, don't compete).

**V2 — supporting blog cluster (hub-and-spoke → this page):**
1. "What is an MCP server, and why does it matter for Busy Accounting?"
2. "How to ask your Busy outstanding in ChatGPT (safely, read-only)."
3. "Find dead stock and reorder risks in Busy with AI."
4. "Why AI should never guess your accounting numbers (and how read-only MCP prevents it)."
5. "Busy reports vs. asking your data: the shift to conversational accounting." *(feeds B3/B4.)*
6. "Claude + Busy: query your receivables and sales from your books." *(assistant-integration cluster.)*
7. "An executive command center for Busy, powered by AI (read-only)." *(feeds B10.)*
Each targets a long-tail from the clusters above and links up to this hub.

**V2 — AI Overviews / GEO:** write self-contained, citable answer passages — each FAQ
answer, each capability line, and the B5 definition must stand alone without surrounding
context. Keep every claim verifiable, **read-only**, dated, and India/Busy-scoped. Add the
route to the site's `llms.txt` priority list if that pattern is in use. Because AI Overviews
favour clear "X is / X does / X does not" statements, the B5 definition + B13 boundaries are
prime citation surfaces — keep them declarative.

**V2 — entity optimization:** establish "Busy Accounting MCP" as a distinct entity —
consistent naming sitewide; `SoftwareApplication.provider` → the existing Organization
entity; reference the parent Whats91 / Wilford Technology entity and the sibling "Whats91
MCP" and "Busy" (the accounting software) so the knowledge graph connects product → platform
→ ecosystem. Mention "Model Context Protocol" and "Busy Accounting Software" as related
entities in copy and schema `about`/`mentions`.

**Internal linking (in):** homepage `IntegrationsBand`, `/solutions/busy-erp`,
`/solutions/busy-api`, `/solutions/busy-reports`, `/solutions/busy-google-sheet`,
`/solutions/busy-ai-agent`, `/mcp` (sibling), `/features`, footer. **(out):**
`/solutions/busy-erp`, `/solutions/busy-reports`, `/mcp`, `/pricing`, `/contact`.
**Length:** ~1,400–2,000 words of substantive copy; natural usage, no stuffing.

## C3. Animation & interaction system (V2)

Match or exceed the homepage and the sibling `/mcp` page: **continuous, subtle, purposeful,
always-legible, reduced-motion-safe.** Pure CSS/SVG (transform/opacity/background-position/
stroke-dashoffset), mirroring `IntegrationsBand`, `PlatformPillars`, and the shipped `mcp-*`
keyframes. **No** WebGL, no JS animation loop, no new library. Namespace all new keyframes
`busymcp-*` (do not reuse or modify `mcp-*` or homepage keyframes).

**Hero "living answer" scene (single ~13s loop, one client active):**
1. **Idle (0s):** client chip + Busy hub + faint idle connector — the legible,
   reduced-motion end state.
2. **Connect + consent (0–3s):** dashed connector flows client→hub; a **lock / "read-only"**
   badge pulses on the path (a `busymcp-pulse` keyframe) — safety, not an open pipe.
3. **Read (3–6s):** an *approved tool* chip highlights at the hub ("Outstanding report"),
   never "the database."
4. **Answer (6–9s):** the **answer card** travels back to the client; numbers count up
   (`AnimatedNumber`).
5. **Rotate (9–13s):** the answer card **swaps content** (outstanding → top dealer →
   dead-stock) to hint at breadth; connector settles to a gentle idle.

**Interaction inventory (V2):**

| Interaction | Behaviour |
|---|---|
| Scroll reveals | `Reveal` fade+rise per section (once); staggered for grids. |
| Sticky storytelling (optional) | the workflow lifecycle (B6) or command center (B10) can pin briefly while a caption steps through nodes — CSS `position: sticky`, no JS scroll-jacking; degrade to normal flow when unsupported / reduced-motion. |
| Command-center mock | KPI count-ups; aging bars + sparkline draw once with a soft highlight sweep; alert chips staggered fade-in. Calm, non-looping. |
| Capability bento | staggered fade-up on enter; hover lift (`-translate-y-0.5`) + border tint + soft shadow; the two large tiles carry a small looping micro-visual (mini bar / sparkline) like `PlatformPillars`. |
| Comparison (B4) | left→right connector/arrow flow between columns (`busymcp-arrow-flow`); rotates downward on mobile. |
| Workflow (B6) | one-way data pulse along the chain (`conn-comet` idiom); return path deliberately absent. |
| Micro-interactions | status pills pulse once on first view; Gemini "Limited" tooltip on hover/focus; prompt chips show "copied ✓"; endpoint chip shows "copied ✓". |
| Architecture (B14) | sequential node glow + arrow-flow + slow light sweep (re-namespaced `busymcp-*`). |
| Progressive reveal | long lists (capabilities, prompts) reveal in staggered batches on scroll, never all-at-once. |
| Reduced motion | `prefers-reduced-motion`: all loops/reveals/count-ups freeze to complete states; hero = static diagram; sticky pinning released; pulses removed. Everything remains fully legible and usable. |

**Performance limits:** animate only transform/opacity/background-position/stroke-dashoffset;
`will-change` sparingly; don't animate offscreen; target CLS 0, negligible INP. Namespaced
keyframes in `globals.css` (`busymcp-*`).

## C4. Responsive plan

| Breakpoint | Behaviour |
|---|---|
| **≤360** | 1-col; hero → headline/sub/CTAs (full-width) → vertical mini-flow; client chips 2×2; bento tiers stack; **command-center** KPI 2×2 + widgets stacked, mock scrolls in its own container; **workflow** chain vertical; comparison + boundary grids → stacked cards; prompt departments become an accordion/stacked; sticky CTA (optional). |
| **361–639** | as above; timelines vertical; prompt tabs → stacked labelled groups. |
| **640–1023** | 2-col grids; hero simplified (vertical flow); steps 2-col; comparison side-by-side; command-center 2-col widgets; prompt tabs may appear. |
| **1024–1279** | full orbital hero; bento with 2 large + small tiles; client row; horizontal architecture + workflow; full command-center; prompt department tabs. |
| **≥1280** | max container; generous spacing; full animation. |

Rules: the orbital hero **must** degrade to a vertical flow; big grids → stacked cards;
tables → cards; the **command-center mock, workflow chain, and architecture diagram scroll
inside their own `overflow-x:auto` containers**, never shrinking text to unreadable or
causing **horizontal page overflow at 320px**. INR figures stay legible (`tabular-nums`).

## C5. Performance plan

- **Server components by default;** client islands only for prompt-copy, FAQ accordion, the
  endpoint copy button, prompt-department tabs, and (if interactive) the hero — prefer a
  pure-CSS hero like `IntegrationsBand`.
- CSS/SVG animation only; no WebGL / animation library.
- Optimized inline SVG for the scene, command-center mock, workflow, and architecture;
  client monograms as text (no logo requests); OG a static optimized PNG.
- Lazy-load below-the-fold heavy media; tiny hero critical path; hero text is the LCP.
- No layout shift (reserved dimensions; self-hosted Inter via `next/font`).
- Reduced motion respected; nothing animates offscreen. **CWV targets:** text LCP, CLS 0,
  low INP. The command center is the heaviest section — keep it SVG/CSS, lazy-revealed, and
  never JS-charted.

## C6. Analytics & conversion tracking

Wire to the project's standard tracker **only if one exists** (the `/mcp` page found none
and added no new dependency — do the same; leave typed no-op hooks). Event names
(namespaced, privacy-safe, no PII):
`busy_mcp_page_viewed` · `busy_mcp_primary_cta_clicked` · `busy_mcp_secondary_cta_clicked` ·
`busy_mcp_hero_limits_link_clicked` · `busy_mcp_midpage_cta_clicked` (`position`) ·
`busy_mcp_commandcenter_cta_clicked` · `busy_mcp_client_card_clicked` (`client`) ·
`busy_mcp_gemini_limited_tooltip_opened` · `busy_mcp_example_prompt_copied` (`prompt_id`,
`department`) · `busy_mcp_prompt_department_changed` (`department`) ·
`busy_mcp_capability_hovered` (`category`) · `busy_mcp_endpoint_copied` ·
`busy_mcp_faq_expanded` (`question_id`) · `busy_mcp_nav_source`.

## C7. Visual system & premium guardrails

Use the existing design system (`docs/STATIC_PAGE_GUIDE.md` + shared components):
- **Tokens:** `--brand-primary #448C74`, brand ramp, surface `#F8FAF9`, ink `#0F172A`;
  `heading-1..4`, `text-lead/-body/-sm`, `text-caption`, `text-overline`.
- **Cards:** `surface-card`, `surface-card-hover`, `border-border/60`, `rounded-xl/2xl`.
- **Section rhythm:** the B0 tone map (no two same-tone sections adjacent; one `ink` dev
  band; brand-soft hero + brand CTA).
- **Reuse:** `Container`, `Section`, `SectionHeader`, `Eyebrow`, `CTAGroup`/`PrimaryCTA`/
  `SecondaryCTA`, `IconBadge`, `FeatureCard`, `StatCard`, `TrustPill`, `Reveal`,
  `AnimatedNumber`, `BrandLogo`, `JsonLd`.
- **Finance flavour (within the system):** `lucide` finance icons (`ReceiptText`,
  `Landmark`, `Wallet`, `TrendingUp`, `PackageX`, `Boxes`, `FileSpreadsheet`,
  `IndianRupee`, `ScrollText`), `tabular-nums` for all INR figures, demo INR/GST/FY values.
- **Premium DO:** confident whitespace, one accent color, crisp SVG, subtle motion, tabular
  numbers, a believable (clearly-illustrative) command center, floating data cards,
  progressive reveal.
- **Premium DON'T:** heavy glassmorphism, neon, purple "AI" gradients, fake terminal
  windows, WebGL, distracting/looping-casino motion, unreadable small text, anything that
  reads as "developer docs," and — above all — any figure that implies profit/margin/cost/
  forecast.

## C8. Homepage-parity review (NEW in V2)

Benchmark the page against the existing Whats91 homepage so it *matches or exceeds* it
without changing the design language. The homepage's strongest devices (from
`IntegrationsBand`, `PlatformPillars`, `DeveloperBand`):

| Homepage strength | How this page matches it | Where it can *exceed* |
|---|---|---|
| **Connector "hub" scene** (`IntegrationsBand`: SVG paths + comets into a central hub) | Hero "living answer" scene reuses the hub/connector DNA (new Busy hub) | The answer card **cycles real answers** — a live "product playing itself" the homepage hub doesn't do |
| **Self-playing product scenes** (`PlatformPillars`: campaign funnel, flow execution, sync pipeline) | The **command center** is this page's signature self-playing scene | A full **executive dashboard** mock is richer than any single homepage scene |
| **Dark `ink` developer band** (`DeveloperBand`: live event stream) | The architecture band reuses the `ink` styling | Sequential node-glow + one-way workflow lifecycle gives *two* complementary technical visuals |
| **Bento capabilities** (`PlatformPillars` `BentoCapabilities`:每 tile a micro-visual) | The capability bento reuses the pattern | Two large tiles with live micro-visuals + department-tabbed prompts add depth |
| **Scroll reveals + staggered grids** (`Reveal`) | Used throughout | Optional **sticky storytelling** on the workflow/command center adds a premium beat the homepage lacks |
| **Honest, tabular metrics** (`PlatformPillars` funnel numbers, `AnimatedNumber`) | KPI count-ups, `tabular-nums`, INR | A dedicated **"what it doesn't do"** section is a trust device the homepage doesn't need but this page benefits from |

**Net:** this page should feel *at least* as alive as the homepage's `PlatformPillars`, with
the command center as its showpiece — while never crossing into motion that distracts from
finance credibility. Depth over spectacle.

---
---

# PART D — Evidence, reference & Sonnet handoff

> Everything in Part D is verified repository research + the implementation handoff,
> **preserved from V1**. V2 adds only: the two new components (B3 Why, B6 Workflow) in D3/D6,
> and updated section numbering in the D6 hierarchy. No technical fact is changed.

## D1. Product evidence (verified — the accuracy backbone)

**Sources:** `MCP_PUBLIC_GUIDE.md`, `MCP_COMPATIBILITY_REPORT.md`, `SKILL.md` (all in
`whats91_busy_api_server/docs/`).

**Shipped Busy MCP platform (verified):**
- Endpoint **`https://busyapi.whats91.com/mcp/v1`**; MCP **Streamable HTTP**; stable
  protocol **`2025-11-25`**; server SDK `@modelcontextprotocol/sdk 1.29.0`.
- Auth: existing Whats91 **bearer** token **or** standards-based **OAuth 2.1
  authorization-code + S256 PKCE** (RFC 9728 protected-resource metadata, RFC 8414 AS
  metadata, DCR, trusted **CIMD**, resource/audience binding, rotating refresh tokens,
  revocation). Reuses the existing Whats91 API token as the authorization credential — **no
  separate MCP user/token system**. Token stored **AES-256-GCM encrypted in Redis**.
- **Stateful, tenant-bound sessions;** cross-tenant session reuse rejected. Company +
  financial-year access limited by existing DB scope and **PostgreSQL row-level security**.
- **69 tools** in service **`1.9.1`**, catalogue `2026-07-19.8`: **67 read-only + 2
  non-destructive private export-job tools** (`busy_export_sales_register`,
  `busy_export_purchase_register`). *(Note: `MCP_PUBLIC_GUIDE.md` §7 says "Sixty-five tools
  are read-only," which conflicts with the 67/69 stated in the same guide's ChatGPT section,
  the compatibility report, and the `/health` `tool_count: 69`. Treat **69 total = 67 read +
  2 export** as authoritative; flag the §7 wording — D7-OD2.)*
- **Read-only:** cannot create, edit, delete, post, synchronise, or approve accounting
  records. Not arbitrary SQL, not generic table reads, not ingestion. Strict JSON schemas;
  unknown properties rejected.

**Capability groups → representative tools (business language on the page; tool names NEVER
shown to end users):**
- *Executive command center:* `busy_executive_dashboard_summary`, `busy_exception_alerts`,
  `busy_recommended_actions`.
- *Sales & revenue:* `busy_get_sales_register(_products)`, `busy_get_customer_sales_register`,
  `busy_get_customer_product_sales_returns`, `busy_top_entities_by_metric`,
  `busy_rank_products_by_dimension`, `busy_rank_customers_by_product_group`,
  `busy_rank_product_groups_by_customer`, `busy_analyze_product_performance`,
  `busy_analyze_product_group_performance`.
- *Growth / trends / seasonality:* `busy_sales_trend_summary`, `busy_drilldown_metric`,
  `busy_compare_period_performance`, `busy_detect_growth_decline`, `busy_analyze_seasonality`.
- *Receivables & collections:* `busy_list_customer_outstanding`,
  `busy_analyze_credit_line_outstanding`, `busy_credit_risk_scorecard`,
  `busy_collection_priority_queue`, `busy_payment_behaviour_analysis`,
  `busy_working_capital_summary`.
- *Customer intelligence:* `busy_list_customers`, `busy_get_customer_ledger`,
  `busy_customer_360_summary`, `busy_customer_activity_status`,
  `busy_customer_repeat_purchase_analysis`, `busy_customer_retention_cohorts`,
  `busy_customer_lifetime_value`, `busy_customer_segmentation`, `busy_list_pending_sales_orders`.
- *Purchases & suppliers:* `busy_list_suppliers`, `busy_get_supplier_ledger`,
  `busy_list_supplier_outstanding`, `busy_get_purchase_register(_products)`,
  `busy_list_pending_purchase_orders`, `busy_purchase_trend_summary`.
- *Inventory & product intelligence:* `busy_list_products`,
  `busy_product_movement_classification`, `busy_inventory_aging_and_dead_stock`,
  `busy_stockout_and_lost_sales_risk`, `busy_product_substitution_analysis`,
  `busy_product_return_and_warranty_analysis`.
- *Concentration & portfolio:* `busy_pareto_analysis`, `busy_abc_classification`,
  `busy_sales_concentration_risk`.
- *Cross-sell & product-group:* `busy_customer_product_group_matrix`,
  `busy_analyze_product_group_penetration`, `busy_find_cross_sell_opportunities`,
  `busy_analyze_customer_group_migration`, `busy_analyze_customer_product_group_sales`.
- *Pricing:* `busy_price_realization_analysis`, `busy_discount_and_margin_leakage` (pricing-gap
  **review only** — never "recoverable margin").
- *Performance scorecards (basis-acknowledged):* `busy_branch_performance_scorecard` (material
  centre ≠ branch), `busy_customer_state_performance_scorecard` (state ≠ territory),
  `busy_salesperson_performance_scorecard` (no commission/profit).
- *Discovery/foundation (behind the scenes, powers accuracy):* `busy_list_companies`,
  `busy_get_analytics_freshness`, `busy_get_profitability_readiness`, `busy_get_metric_catalog`,
  `busy_get_dimension_catalog`, `busy_plan_accounting_query`, `busy_resolve_entity`,
  `busy_get_canonical_customer_links`.
- *Exports:* `busy_export_sales_register`, `busy_export_purchase_register`.

**Explicitly UNAVAILABLE / must never be implied (the A5/B13 backbone):**
- Gross profit, gross margin, customer profitability, "true margin" — **blocked** by
  `busy_get_profitability_readiness`; cost, valuation, return-cost linkage, expense-allocation
  sources unavailable.
- Cost, inventory valuation, blocked capital, landed cost.
- Forecasts, predictions, probabilities; default probability, churn probability, credit rating,
  "will sell / will pay."
- Verified branch/warehouse (material centre), sales territory (customer state), team/manager
  hierarchy, commission (salesperson), brand/manufacturer (product group).
- DSO, DPO, inventory days, cash conversion cycle, complete working capital (only *net trade
  exposure*).
- Warranty/RMA/defect/failure-reason; supplier quality; goods-receipt/OTIF (PO timing is
  linked-voucher timing only); PO order value (unavailable).
- Real-time posting state (reflects latest sync); auto-merge across companies (canonical links
  are explicit + operator-approved).

**Client compatibility (from `MCP_COMPATIBILITY_REPORT.md`; no branded client was signed in
during verification):**
- Official MCP TypeScript SDK 1.29.0 — **Tested successfully** (real-warehouse E2E).
- MCP Inspector 0.22.0 — previous 61-tool build tested; 69-tool rerun **pending**.
- **ChatGPT** custom MCP apps — **automated-flow tested** (CIMD/callback → token → init →
  69-tool discovery → tool call); owner previously reported a successful connection after a CSP
  fix; **branded post-deploy scan pending**. → page: **Available now (dev mode)**.
- **Claude.ai** remote connector — exact live-metadata automated flow passed; signed-in
  completion **pending**. → **Rolling out**.
- **Claude Code** — automated protocol flow + docs verified; product login **pending**. →
  **Rolling out**.
- **OpenAI Codex** — documentation-verified, not product-tested. → **Rolling out**.
- **VS Code / GitHub Copilot** — documentation-verified. → **Rolling out** (developer client).
- **Google Gemini CLI** — documentation-verified (CLI only). → **Limited**.
- **Cursor** — expected; untested. → **Planned**.
- **Other MCP `2025-11-25` clients** — expected; untested. → **Planned**.
- **xAI Grok** — **not in the matrix; no evidence.** → **omit** (D7-OD3).

**Distinguish from the sibling product:** Whats91 MCP (`/mcp`, `mcp.whats91.com/mcp`) =
WhatsApp Business data. Busy Accounting MCP (this page, `busyapi.whats91.com/mcp/v1`) = Busy
ERP data. Same platform, different domains; the FAQ disambiguates and links.

## D2. Security controls (verified — surfaced as B12 copy)

All from `MCP_PUBLIC_GUIDE.md` §14 + compatibility report + SKILL. **Integration/code-review
level, NOT certified** — do not claim certification/pen-test/SOC 2/bank-grade:
- OAuth 2.1 authorization-code + **S256 PKCE**; RFC 9728 protected-resource metadata, RFC 8414
  AS metadata, DCR, trusted-host **CIMD** (SSRF boundary on CIMD fetch); resource/audience +
  client/redirect binding.
- **Rotating refresh tokens + replay rejection**; access-token revocation; existing-token
  validity/revocation and 2-hour verification cache follow current API behaviour.
- Existing Whats91 token reused; stored **AES-256-GCM encrypted in Redis**; CSRF-protected
  consent; token never in URL/args/logs/chat/screenshots.
- **Tenant-bound sessions**, cross-tenant rejection; **PostgreSQL row-level security**;
  company/FY scope enforced in DB; no `user_id` accepted from the client.
- **Read-only** surface; strict JSON schemas; unknown properties rejected; no SQL/table/write/
  ingestion.
- Host/Origin/HTTPS protections; rate limiting; timeout + response caps; malformed/oversized
  request rejection; safe errors.
- Exports: signed, **short-lived** CSV download links; export rows never injected into model
  context; treat links as temporary bearer capabilities (don't log/email/persist).
- HTTPS-only; enter the token only on the HTTPS `busyapi.whats91.com` authorization page; review
  AI answers against structured tool data before financial/collection decisions.

## D3. Component reuse & new components (V2)

**Reuse as-is** (`src/components/shared`): `Container`, `Section` (tones), `SectionHeader`,
`Eyebrow`, `CTAGroup`/`PrimaryCTA`/`SecondaryCTA`, `IconBadge`, `FeatureCard`, `StatCard`,
`TrustPill`, `Reveal`, `AnimatedNumber`, `BrandLogo`. SEO: `JsonLd` + `generatePageMetadata` /
`generateBreadcrumbSchema` / `generateFAQSchema` / `generateSoftwareApplicationSchema`.

**Reuse (additive edits only):** `Footer.tsx` (add a "Busy Accounting MCP" Resources link
next to "Whats91 MCP"), `sitemap.ts` (add the route), the contact form subject options (add
"Busy Accounting MCP Access"), `src/app/features/page.tsx` (optional Busy-MCP card), homepage
`IntegrationsBand` (optional additive link — do **not** restructure). Do **not** modify the
existing `/mcp` page except, optionally, a single "See also: Busy Accounting MCP" cross-link.

**Pattern references (do not modify):** existing `src/components/landing/mcp/*` — the closest
DNA; build **new, Busy-specific** siblings, don't import/rename these. `IntegrationsBand`,
`PlatformPillars` (esp. `CampaignJourneyScene`/`BentoCapabilities`/`FlowExecutionScene` for
command-center + workflow idioms), `DeveloperBand` (ink band styling).

**New components** (`src/components/landing/busy-mcp/`):
`BusyMcpHeroScene`, `BusyMcpStatusPill`, `BusyMcpClientCard`, `BusyMcpWhy` *(new in V2 — B3)*,
`BusyMcpComparison` *(B4)*, `BusyMcpWorkflow` *(new in V2 — B6 lifecycle)*,
`BusyMcpCapabilityGrid` (+ optional `BusyMcpCapabilityCard`), `BusyMcpExamplePrompt` (client
island: clipboard + analytics; + optional `BusyMcpPromptTabs` for the 8 departments),
`BusyMcpCommandCenter` (the signature mock), `BusyMcpFlowSteps` *(B11)*, `BusyMcpTrustGrid`,
`BusyMcpBoundaries` *(B13)*, `BusyMcpArchitectureDiagram`, `BusyMcpFuture` (+ ecosystem
diagram), `BusyMcpFaq`, and `busyMcpContent.ts` (the single typed content source).

> Risk control: **do not alter behaviour** of homepage/shared/existing-`mcp` components — only
> *additive* nav/footer/sitemap/contact edits and *new* `busy-mcp` components.

## D4. Content model (`busyMcpContent.ts`)

Single source of truth; the same FAQ array feeds both the visible FAQ and the FAQ JSON-LD
(mirror the shipped `mcpContent.ts` pattern exactly). Suggested types:

```ts
type BusyMcpStatus = "available" | "rolling" | "limited" | "planned";

interface BusyMcpClient {
  id: "chatgpt" | "claude" | "claude_code" | "dev_clients" | "gemini_cli" | "other";
  name: string; status: BusyMcpStatus; headline: string; detail: string;
}
interface BusyMcpWhyItem { id: string; couldDo: string; butLine: string; insteadLine: string; }   // B3
interface BusyMcpCapability {
  id: string; category: string; title: string; line: string;
  status: BusyMcpStatus; icon: LucideIcon; featured?: boolean;   // featured → large bento tile
}
interface BusyMcpPrompt {
  id: string; department: "owner"|"accounts"|"finance"|"sales"|"purchase"|"inventory"|"management"|"auditor";
  text: string; answer?: string; status: BusyMcpStatus;
}
interface BusyMcpWorkflowNode { id: string; label: string; sub: string; }                          // B6
interface BusyMcpBoundary { id: string; icon: LucideIcon; title: string; line: string; }           // B13
interface BusyMcpStep { n: number; title: string; body: string; }
interface BusyMcpTrustItem { id: string; icon: LucideIcon; title: string; line: string; }
interface BusyMcpHorizon { id: "today" | "rolling" | "planned"; label: string; title: string; body: string; }
interface BusyMcpFaqItem { id: string; q: string; a: string; }   // single source for FAQ + schema

const busyMcpAccess = {
  primaryLabel: "Connect Busy MCP",
  primaryHref: "/contact?subject=" + encodeURIComponent("Busy Accounting MCP Access"),
  secondaryLabel: "See how it works", secondaryHref: "#how-it-works",
  endpoint: "https://busyapi.whats91.com/mcp/v1",
} as const;
```

All copy in D-cited, evidence-safe language. `busyMcpAccess.primaryHref` mirrors the `/mcp`
page's contact-with-subject pattern unless OD-6 defines a Busy-specific flow. Add "Busy
Accounting MCP Access" to the contact form's subject options (it already has "Whats91 MCP
Preview Access").

## D5. Asset inventory

| Asset | Location | New? | Notes |
|---|---|---|---|
| Whats91 mark | `shared/BrandLogo.tsx` | reuse | hub base |
| Busy hub / ₹ ledger node | — | **new** inline SVG/CSS | build from brand tokens + `IndianRupee`/`ScrollText`; no third-party Busy logo |
| AI-client chips | — | **new** neutral text/monograms | **no** ChatGPT/Claude/Gemini logo assets (OD-8 parity with `/mcp`) |
| Hero scene, command-center mock, workflow chain, architecture diagram | — | **new** inline SVG/CSS | decorative or `aria-label`; reduced-motion static |
| Capability/trust/boundary icons | `lucide-react` | reuse | decorative (`aria-hidden`) |
| OG image | `public/og-busy-mcp.png` (1200×630) | **new if pipeline available** | else reuse existing OG fallback + document pending |

**Brand caution:** any third-party AI/Busy logos must be official assets used per each owner's
guidelines; **default to neutral name chips** (matches the `/mcp` page's OD-8 decision). No
implied partnership/endorsement with OpenAI, Anthropic, Google, or Busy.

## D6. Sonnet implementation handoff (V2 — updated hierarchy)

- **Route:** `src/app/busy-accounting-mcp/page.tsx` (or `src/app/solutions/busy-accounting-mcp/page.tsx`
  per OD-1) — **server component**; `metadata` via `generatePageMetadata({ title, description,
  keywords, path })` + `alternates.canonical`; inject JSON-LD via `JsonLd`
  (`generateBreadcrumbSchema` Home›Busy Accounting MCP, `generateFAQSchema(faq)`,
  `generateSoftwareApplicationSchema({ name:"Busy Accounting MCP",
  applicationCategory:"BusinessApplication", url })`).
- **New components:** `src/components/landing/busy-mcp/*` (D3) + `busyMcpContent.ts`.
- **Additive:** add route to `sitemap.ts`; Footer "Busy Accounting MCP" link; contact subject
  option; optional Features card; optional homepage/`/mcp` cross-links. Generate
  `public/og-busy-mcp.png` if the approved workflow exists.
- **Component hierarchy (V2):**
```
app/busy-accounting-mcp/page.tsx (server)
├── JsonLd (breadcrumb + FAQ + SoftwareApplication)
├── Header (reuse)
├── main
│   ├── BusyMcpHero (brand-soft) → BusyMcpHeroScene, CTAGroup, client status chips
│   ├── BusyMcpProblem (default)
│   ├── BusyMcpWhy (surface)               // B3 — why not reports/exports/APIs
│   ├── BusyMcpComparison (default)        // B4 — Busy reports vs Busy MCP
│   ├── BusyMcpWhatIs (surface)            // B5 — 40–55-word snippet + "this is NOT"
│   ├── BusyMcpWorkflow (default)          // B6 — data lifecycle (one-way, read-only)
│   ├── BusyMcpClients (surface) → BusyMcpClientCard × n
│   ├── BusyMcpCapabilities (default) → BusyMcpCapabilityGrid (bento) + mid CTA
│   ├── BusyMcpExamples (surface) → BusyMcpPromptTabs → BusyMcpExamplePrompt × n (8 depts)
│   ├── BusyMcpCommandCenter (default)     // B10 — the signature dashboard mock + CTA
│   ├── BusyMcpHowItWorks (surface) → BusyMcpFlowSteps
│   ├── BusyMcpTrust (default) → BusyMcpTrustGrid
│   ├── BusyMcpBoundaries (surface)        // B13 — "doesn't do"
│   ├── BusyMcpArchitecture (ink) → BusyMcpArchitectureDiagram + endpoint chip
│   ├── BusyMcpFuture (default)            // B15 — horizons + ecosystem diagram
│   ├── BusyMcpFaq (surface) → BusyMcpFaq
│   └── BusyMcpFinalCta (brand) → CTAGroup + legal links (/privacy#ai-mcp, /terms#ai-mcp)
└── Footer (reuse)
```
- **Server/client boundaries:** server for all content; client islands only for
  `BusyMcpExamplePrompt` (clipboard), `BusyMcpPromptTabs` (tab state), `BusyMcpFaq`
  (accordion), the endpoint "copy" button, and the hero **only if** interactive (prefer
  pure-CSS).
- **Accessibility checklist:** one `<h1>`; logical H2/H3; sections `aria-labelledby`;
  decorative scenes/mock/workflow `aria-hidden` (or `aria-label` summarising the pipeline);
  monograms have text; status conveyed by **text** not colour alone; prompt tabs are proper
  ARIA tabs (keyboard-operable); keyboard-operable CTAs/accordion/copy/tooltips with visible
  focus; WCAG-AA contrast incl. amber "Limited" pill and the `ink` band; INR figures
  `tabular-nums`; `prefers-reduced-motion` freezes all motion to legible states; no keyboard
  trap; command-center, workflow, and architecture scroll inside their own containers.
- **Motion:** namespaced `busymcp-*` keyframes in `globals.css`; **do not** touch existing
  `mcp-*` or homepage keyframes.
- **Testing:** `npx eslint` (clean) · `npx tsc --noEmit` (no new errors; ignore the
  pre-existing `redis.ts`/`webhooks/github`/`examples/*` failures) · `npx next build` (route
  prerenders static) · verify one H1, self-canonical, unique title/desc, OG present, in
  sitemap, FAQ schema text == visible, JSON-LD parses · reduced-motion + mobile (375) +
  desktop screenshots · no console errors (note: the in-app `seed` browser tab may show
  *stale* HMR errors from earlier edits — verify on a fresh tab).
- **Visual QA:** feels native (tone/spacing/type == homepage & `/mcp`); tonal alternation
  intact; reads as a *sibling*, not a clone; ChatGPT "Available", Claude/Code "Rolling out",
  Gemini "Limited (CLI)", **no Grok**; **no profit/margin/cost/forecast anywhere**; read-only
  stated prominently; INR/GST/FY framing; hero, command center, workflow, and mobile flow
  legible; no 320px overflow; command center feels like the showpiece.
- **Known uncertainties:** final route (OD-1); the §7 "65 vs 67 read-only" doc conflict
  (OD-2); Grok inclusion (OD-3); ChatGPT "Available now" vs softer "developer-mode preview"
  wording (OD-4); developer-docs URL (OD-5); access/CTA destination (OD-6); dedicated OG image
  (OD-9); prompt UI as tabs vs stacked (OD-13, new in V2).
- **Do-not-touch:** existing `/mcp` page behaviour and its `mcp/*` components;
  `IntegrationsBand`/`PlatformPillars`/`DeveloperBand` behaviour; backend Busy MCP server; the
  Busy Retrieval APIs. Do not invent capabilities/clients/stats/certifications.

## D7. Product-owner decisions required

| ID | Question | Impact |
|---|---|---|
| OD-1 | Route: `/busy-accounting-mcp` (recommended) vs `/solutions/busy-accounting-mcp`? | URL, canonical, sitemap, internal links |
| OD-2 | Confirm **69 tools = 67 read + 2 export** and correct the `MCP_PUBLIC_GUIDE.md` §7 "sixty-five" wording | accuracy of any tool-count claim |
| OD-3 | **Grok:** omit (recommended, no evidence) or provide a tested path? | client card accuracy / A5 |
| OD-4 | ChatGPT label: "Available now (developer mode)" vs softer "developer-mode preview" given the pending branded post-deploy scan | compatibility-claim governance |
| OD-5 | Public developer/integration-docs URL for the B14 CTA (else link `#how-it-works` + contact) | developer CTA |
| OD-6 | Access flow: contact-with-subject (like `/mcp`) vs a dedicated Busy-MCP request/self-serve flow | primary CTA + analytics |
| OD-7 | Confirm the security wording (controls described, **no** certification claim) | trust section governance |
| OD-8 | Legal/brand approval for any AI/Busy logos (else neutral name chips) | trademark compliance |
| OD-9 | Generate a dedicated `og-busy-mcp.png` now, or ship with the existing OG fallback? | social/SEO polish |
| OD-10 | Analytics destination for `busy_mcp_*` events (or leave no-op hooks like `/mcp`) | tracking wiring |
| OD-11 | Header nav: add a top-level entry now, or keep discovery via Footer/Features/Solutions only? | nav prominence vs clutter |
| OD-12 | Approve the supporting blog cluster (C2) and publish order | SEO authority program |
| **OD-13** *(new in V2)* | Prompt examples (B9): department **tabs** (recommended desktop) vs always-stacked groups; how many departments to show at launch (8 planned) | B9 UX + build complexity |
| **OD-14** *(new in V2)* | Command-center (B10): ship the full multi-widget mock at launch, or a phased simpler KPI+alerts version first? | signature-section scope |
| **OD-15** *(new in V2)* | Ecosystem diagram (B15): confirm which nodes are "today/existing" vs "direction," and that no autonomous write-to-Busy agent is implied | roadmap-honesty governance |

## D8. Implementation order (minimise rework) — *preserved, extended for V2 sections*

*Truth → structure → style → motion → responsive → SEO → a11y → performance.*

1. **Content + types + skeleton.** `busyMcpContent.ts` (all copy, statuses, prompts (8 depts),
   why-items, workflow nodes, boundaries, FAQ — locks A5 accuracy) + `page.tsx` with static
   sections in the B0 order using shared `Section`/`SectionHeader`/`Container`.
2. **SEO metadata + JSON-LD + sitemap + nav/footer + contact subject.** Wire metadata,
   Breadcrumb/FAQ/SoftwareApplication schema (FAQ sourced from content), add route to sitemap,
   additive Footer link, contact subject option.
3. **Core sections & premium cards (static).** `BusyMcpClientCard`, `BusyMcpWhy`,
   `BusyMcpCapabilityGrid`, `BusyMcpComparison`, `BusyMcpTrustGrid`, `BusyMcpBoundaries`,
   `BusyMcpFlowSteps`, `BusyMcpFuture`, `BusyMcpStatusPill`, `BusyMcpPromptTabs`, CTAs — fully
   styled, no animation.
4. **Signature visuals + animation.** `BusyMcpHeroScene`, `BusyMcpWorkflow`,
   `BusyMcpCommandCenter`, `BusyMcpArchitectureDiagram` + card/scroll micro-interactions +
   optional sticky storytelling, all pure CSS/SVG, namespaced `busymcp-*`.
5. **Responsive polish.** Every breakpoint (§C4); orbital→vertical hero; command center /
   workflow / architecture scroll-safe; prompt tabs → stacked; no 320px overflow.
6. **SEO/GEO finalization.** Definition-paragraph snippet, keyword-cluster anchors, alt text,
   OG image (OD-9), `llms.txt` entry, internal links, entity consistency.
7. **Accessibility.** Full checklist (D6): headings, aria, prompt-tab semantics, focus,
   contrast (ink + amber), reduced-motion freeze, keyboard paths, tooltips, `tabular-nums`.
8. **Performance & QA.** CWV pass, lazy-load, no offscreen animation; lint/type/build;
   cross-device + reduced-motion screenshots; visual QA vs homepage & `/mcp`; confirm **zero**
   profit/margin/cost/forecast language; confirm the command center reads as the showpiece.

## D9. Acceptance criteria

- `/busy-accounting-mcp` (or OD-1 route) live, indexable, self-canonical, in sitemap,
  breadcrumb Home›Busy Accounting MCP; one H1; logical headings.
- All B sections present (incl. the V2 additions B3 Why, B6 Workflow, expanded B10 command
  center, 8-department B9, ecosystem B15); reads as a **sibling** of `/mcp`, not a copy;
  native tone/spacing/type; feels *at least* as alive as the homepage `PlatformPillars`.
- **Read-only stated prominently;** the B13 "doesn't do" section present; the B6 workflow
  reinforces one-way/read-only.
- **Accuracy (A5) fully honored:** no profit/margin/cost/valuation/forecast anywhere; material
  centre ≠ branch, state ≠ territory, salesperson ≠ commission; no DSO/DPO/CCC; no
  warranty/defect; no SQL/write claims; ecosystem diagram implies no autonomous write agent.
- Client statuses correct: ChatGPT **Available** (dev mode; OD-4 wording), Claude & Claude Code
  **Rolling out**, dev clients **Rolling out**, Gemini **Limited (CLI)**, others **Planned**;
  **no Grok**.
- Security wording uses only verified controls; **no** certification/pen-test/bank-grade.
- Endpoint shown correctly: `busyapi.whats91.com/mcp/v1`.
- FAQ visible text == FAQ JSON-LD; JSON-LD parses; SoftwareApplication has no ratings/price.
- Every CTA present at its mapped emotional point (C1); primary CTAs share one destination.
- Desktop/tablet/mobile polished; no 320px overflow; command center, workflow & architecture
  scroll safely; INR figures legible.
- Reduced motion complete and legible; a11y checklist satisfied (incl. prompt-tab semantics).
- Lint + type-check + build pass (pre-existing unrelated failures documented separately).
- **No** homepage / shared / existing-`/mcp` / backend behaviour changed — additive only.

---

### One-paragraph brief for the builder

Build `/busy-accounting-mcp` as a premium, read-only "AI layer for Busy Accounting" landing
page — a *sibling* to `/mcp` using the same design system and shared primitives, but with its
own Busy "living answer" hero (an answer card that cycles outstanding → top dealer →
dead-stock), a compact "why asking beats reports/exports/APIs" section, a Busy-reports-vs-MCP
comparison, a one-way read-only **data-workflow lifecycle**, department-tabbed prompt examples
(8 teams) in INR/GST/Indian-FY language, a **signature Executive Command Center** (KPI cards,
receivable/sales/inventory widgets, collection queue, top movers, deterministic alerts), a
"what it deliberately doesn't do" trust section, an `ink` architecture band, and an honest
future+ecosystem vision. Everything must be evidence-backed (D1): 69 read-only tools (67 read +
2 non-destructive CSV exports) over MCP `2025-11-25` at `busyapi.whats91.com/mcp/v1`; ChatGPT
available in developer mode, Claude/Claude Code/dev clients rolling out, Gemini CLI limited, no
Grok; OAuth 2.1 + PKCE + RLS + tenant isolation + encryption at rest, described but never
"certified." Never imply profit, margin, cost, forecasts, verified branches/territories, or
write access. Content lives in one typed `busyMcpContent.ts` that also feeds the FAQ schema;
the page is a server component with tiny client islands for copy/tabs/accordion; motion is pure
CSS/SVG namespaced `busymcp-*`; additive nav/footer/sitemap/contact changes only.
