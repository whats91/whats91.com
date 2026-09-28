# Busy Accounting MCP — Landing Page Master Blueprint (v1)

> **Planning & documentation only. No page code is written here; no `src/` file is
> touched.** Implementation to be completed later by Claude Sonnet using this
> document as the definitive spec — it should not need another planning phase.
>
> **This is a *sibling* to the existing Whats91 MCP page (`/mcp`), not a copy.**
> Same design system, same shared components, same tone — different product,
> different data domain (Busy ERP accounting vs. WhatsApp Business messaging),
> different hero metaphor, different capability map, and a stronger accuracy
> boundary (the profitability guardrail).
>
> **Sources of truth (verified this session):**
> - `whats91_busy_api_server/docs/MCP_PUBLIC_GUIDE.md` (endpoint, auth, full 69-tool catalogue, security §14)
> - `whats91_busy_api_server/docs/MCP_COMPATIBILITY_REPORT.md` (client statuses, what was actually tested)
> - `whats91_busy_api_server/docs/skills/busy-accounting-mcp/SKILL.md` (tool semantics, every "unavailable" boundary)
> - Website build convention: `docs/STATIC_PAGE_GUIDE.md`
> - Existing product MCP page: `src/app/mcp/page.tsx` + `src/components/landing/mcp/*`
>
> **Date:** 2026-07-21.

---

## How to read this document

- **Part A — Strategy & story** (positioning, the honesty guardrail, audience). *Read first.*
- **Part B — The page, section by section** (product-first copy + ASCII wireframes). *This is the page.*
- **Part C — Craft** (SEO, motion, responsive, performance, analytics, visual system, conversion).
- **Part D — Evidence, reference & Sonnet handoff** (verified product facts, component reuse, content model, acceptance, PO decisions, build order).

### Table of contents
- A1 Positioning · A2 Story arc · A3 Audience & psychology · A4 Hero discipline (5-5-5) · A5 **The honesty guardrail (non-negotiable accuracy)** · A6 Sibling-not-copy differentiation
- B0 Section/tone map · B1 Hero · B2 Problem · B3 Before/After · B4 What is Busy MCP · B5 Supported AI clients · B6 Capabilities (bento) · B7 Live prompt examples (by department) · B8 Executive command center · B9 How it works · B10 Trust & control · B11 What it deliberately doesn't do · B12 Architecture (ink band) · B13 Future vision · B14 FAQ · B15 Final CTA
- C1 Conversion & CTA map · C2 SEO · C3 Motion system · C4 Responsive · C5 Performance · C6 Analytics · C7 Visual system
- D1 Product evidence · D2 Security controls (verified) · D3 Component reuse & new components · D4 Content model (`busyMcpContent.ts`) · D5 Assets · D6 Sonnet handoff · D7 Product-owner decisions · D8 Implementation order · D9 Acceptance

---
---

# PART A — Strategy & story

## A1. One-line positioning

> **"Ask your accounting questions in plain language — and get real answers straight
> from your own Busy data."**

Busy Accounting MCP is **the AI layer for your Busy Accounting data**. It is a secure,
read-only bridge that lets the AI assistants your team already uses (ChatGPT, Claude,
and other MCP-compatible clients) reach approved, tenant-scoped information from your
synced Busy ERP — outstanding, sales, purchases, customers, suppliers, stock, trends —
so people can *ask instead of dig through reports*.

Category framing: **"the AI layer for your Busy accounting."** Not another API. Not
developer documentation. Not accounting software. Not "a ChatGPT plugin." An
**intelligent, permissioned bridge** between AI assistants and Busy data.

## A2. The story arc (why the page is ordered the way it is)

Each section answers the question the previous one raises — value first, protocol last.

```
   ACCOUNTING TODAY   "Every answer lives inside a Busy report I have to open, filter, and export."
        ↓
   THE PAIN          "Searching reports · manual exports · Excel rework · the same questions every day."
        ↓
   THE SHIFT         "What if I could just ask — in the AI I already use?"
        ↓
   BUSY MCP          "Connect your assistant to your Busy data. Ask. Get real, sourced answers."
        ↓
   SUPPORTED AI      "ChatGPT and Claude today; more MCP clients rolling out."
        ↓
   CAPABILITIES      "Outstanding, sales, purchases, customers, stock, trends — organised by the way you work."
        ↓
   REAL EXAMPLES     "See the exact questions each team would ask — and the answers they'd get."
        ↓
   COMMAND CENTER    "One executive view: sales, receipts, receivables, movement, alerts."
        ↓
   TRUST            "Read-only. You approve access. Scoped to your account. Disconnect anytime."
        ↓
   HONEST LIMITS    "What it deliberately does NOT do — so you always trust the number."
        ↓
   ARCHITECTURE     "For the technical reader: exactly how the secure, read-only connection works."
        ↓
   FUTURE → FAQ → CTA
```

Emotional beats: **recognition** (B2) → **relief** (B3) → **clarity** (B4) →
**confidence** (B5) → **excitement** (B6/B7/B8) → **safety** (B10) → **trust through
honesty** (B11) → **credibility** (B12) → **commitment** (B15).

## A3. Audience & psychology

| Persona | Secretly wants | Fears | The page must… |
|---|---|---|---|
| **Business owner / MD** (primary) | "Just tell me my outstanding and my best/worst movers without me opening Busy." | Wrong numbers; data leaking; a gimmick. | Lead with outcomes + read-only reassurance; hide the plumbing. |
| **Accountant / finance team** | Fewer report exports, less Excel, faster answers to the same recurring asks. | AI "making up" figures; losing control of the ledger. | Show sourced, deterministic answers; be explicit about what it will *not* invent. |
| **CFO / controller** | Portfolio view: receivables risk, concentration, working-capital exposure. | Unverifiable "insights"; profit claims the data can't support. | Show the executive command center; state the profitability boundary honestly. |
| **Auditor** | Traceable, evidence-linked answers, reconciliation. | Fabricated reconciliations. | Emphasise reconciliation evidence, read-only, audit-friendly. |
| **Sales / purchase / ops manager** | Top dealers, dead stock, reorder, collections priorities — in their own words. | Learning yet another dashboard. | Department-tagged prompt examples in business language. |
| **Developer / technical evaluator** (secondary) | "Is this real, standards-based, secure, read-only?" | Hand-wavy security; write access to the ledger. | One credible architecture moment + endpoint + read-only emphasis. |

Design implication: **~90% of the page speaks to non-technical finance readers.** The
developer gets one dense architecture band (B12) and the endpoint.

## A4. Hero discipline (5-5-5)

The hero must land three messages in fifteen seconds:

- **First 5s — "What is this?"** → *Connect your AI assistant to your Busy Accounting data.*
- **Next 5s — "What can I do?"** → *Ask business questions in plain language — "What's my outstanding?" — and get real answers from your own books.*
- **Next 5s — "Can I trust it?"** → *Read-only · you approve access · scoped to your account · disconnect anytime.*

Everything in the hero serves one of these three beats. Nothing else.

## A5. The honesty guardrail (NON-NEGOTIABLE accuracy)

This page's credibility depends on never overstating the product. These constraints
override any marketing instinct. **Full evidence in D1/D2.** Every capability card and
client chip carries an explicit status; every "insight" claim is anchored to what the
tools actually return.

1. **Read-only.** The MCP server *cannot create, edit, delete, post, synchronise, or
   approve* accounting records. 67 of 69 tools are pure read; the only two non-read
   tools (`busy_export_sales_register`, `busy_export_purchase_register`) create a
   private CSV job and a signed download link — they **never change Busy data**. This
   is both a top selling point *and* the accuracy anchor. Say "read-only" prominently.

2. **No profit / margin / cost.** The product **cannot** answer gross profit, gross
   margin, customer profitability, or "true margin" — a dedicated readiness tool
   (`busy_get_profitability_readiness`) *blocks* these and never estimates them. No
   cost, no inventory valuation, no "blocked capital," no landed cost. **Never imply
   the page can tell you your profit or margin.** This is the single most important
   "do not overstate."

3. **No forecasts, no predictions, no probabilities.** Every score is a *deterministic
   review priority from observed evidence*, not a default probability, churn
   probability, credit rating, or forecast. "Dead stock," "stockout risk," "expected
   next purchase," "CLV projection," "recommended actions" are all **human-review
   decision support**, explicitly bounded and non-predictive.

4. **Dimension honesty.** A Busy *material centre* is **not** a verified branch or
   warehouse. *Customer state* is **not** a sales territory. *Salesperson* attribution
   has **no** verified team/manager hierarchy and is **not** a commission or profit
   figure. *Product groups* are **not** brands or manufacturers. The page must not
   imply "branch performance," "territory analysis," or "brand analytics" as verified.
   (Where these tools exist, they require explicit acknowledgement of the basis.)

5. **No complete working capital / no operating-cycle ratios.** DSO, DPO, inventory
   days, and cash conversion cycle are **unavailable**. The working-capital tool
   reports *net trade exposure* only — never call it "complete working capital."

6. **No warranty / RMA / defect data.** Return analysis is observed sales-return
   quantity/value only — never a defect rate, warranty claim, or failure reason.

7. **Not arbitrary SQL / not generic table reads / not ingestion.** The surface is a
   fixed set of curated, schema-validated tools. Unknown parameters are rejected.

8. **Scope + freshness.** Answers require **synced Busy data** and an exact **company
   code + financial year** (Indian FY, 1 Apr–31 Mar). Results reflect the **latest
   sync**, not a live real-time posting state. INR, GST, and BUSY sign conventions
   apply. Do not imply real-time or multi-company auto-merge (canonical customer links
   are explicit, operator-approved, and never auto-inferred from names).

9. **Client compatibility is evidence-graded (A5 + D1).** No branded desktop/CLI/hosted
   AI client was signed-in and executed during verification — statuses come from
   automated protocol/OAuth flow tests, official-SDK tests against the real warehouse,
   documentation, and one owner-reported ChatGPT connection. **xAI Grok is NOT in the
   compatibility matrix — do not claim Grok support** (see D7-OD3).

10. **Security is code-reviewed & integration-tested, not certified.** Describe verified
    controls (OAuth 2.1, PKCE, RLS, tenant isolation, encryption at rest, revocation).
    **Never** claim "bank-grade," "military-grade," "SOC 2," "penetration tested,"
    "certified," or "unbreakable." The compatibility report is a protocol/integration
    result, not a security certification.

> Marketing tone is welcome; **inflation of current capability is not.** When in doubt,
> under-claim and label.

## A6. Sibling-not-copy differentiation (vs. the Whats91 MCP page)

The two pages share the design system and section rhythm but must feel distinct:

| Dimension | Whats91 MCP (`/mcp`) | **Busy Accounting MCP (this page)** |
|---|---|---|
| Data domain | WhatsApp Business messaging (message reports, contacts, templates, campaigns) | **Busy ERP accounting** (outstanding, sales, purchases, stock, ledgers, trends) |
| Hub metaphor | Whats91 WhatsApp mark → message report card | **Busy company ledger / ₹ answer card** through the Whats91 bridge |
| Signature section | Capability bento | **Executive Command Center mock** (dashboard) + department-tagged prompts |
| Accent iconography | chat / message | **ledger, ₹ rupee, receipt, chart, stock** (finance) |
| Honesty focus | private-preview status | **read-only + the profitability boundary** (a dedicated "what it doesn't do" section) |
| Audience | ops/marketing/support | **owners, accountants, CFOs, auditors, sales/purchase managers** |
| Numbers shown | delivered / read % | **₹ outstanding, top dealer, dead-stock count, GST** (INR, Indian FY) |

Reuse the *system*; invent the Busy scene, the command-center mock, and the
finance-specific copy. Do **not** duplicate `McpHeroScene`/`McpCapabilityGrid`
verbatim — build Busy-specific components (D3) that share primitives.

---
---

# PART B — The page, section by section

## B0. Section & tone map

Product-first order (15 sections + hero). Tones alternate; one dark `ink` developer
band; brand-soft hero and brand CTA bookends. Uses the shared `Section` tone system
(`default` / `surface` / `brand-soft` / `ink`).

| # | Section | Purpose | `Section` tone |
|---|---|---|---|
| — | **B1 Hero** | what / can-I / trust in 15s | `brand-soft` |
| 1 | **B2 Problem** ("Sound familiar?") | recognition | `default` |
| 2 | **B3 Before / After** | the relief | `surface` |
| 3 | **B4 What is Busy MCP** | plain definition + "this is NOT" | `default` |
| 4 | **B5 Supported AI clients** | credibility + honest status | `surface` |
| 5 | **B6 Capabilities (bento)** | excitement, organised by team | `default` |
| 6 | **B7 Live prompt examples** | proof by conversation, per department | `surface` |
| 7 | **B8 Executive command center** | the signature visual | `default` |
| 8 | **B9 How it works** | 4 friendly steps | `surface` |
| 9 | **B10 Trust & control** | read-only safety, icon-led | `default` |
| 10 | **B11 What it deliberately doesn't do** | trust through honesty | `surface` |
| 11 | **B12 Architecture** | the one developer moment | **`ink`** |
| 12 | **B13 Future vision** | Today / Rolling out / Planned | `default` |
| 13 | **B14 FAQ** | last doubts + SEO | `surface` |
| — | **B15 Final CTA** | commitment | brand band |

**Status-pill system (B5, B6, B13):**

| Pill | Meaning | Style |
|---|---|---|
| **Available now** | Implemented in service `1.9.1`, tested against the real warehouse via official SDK; connectable today via ChatGPT developer mode | solid brand |
| **Rolling out** | Standards-based path verified by automated OAuth/flow tests or official docs; branded signed-in completion pending (Claude, Claude Code, Codex, VS Code/Copilot) | brand outline |
| **Limited** | Documented for a specific client surface only (e.g. Gemini **CLI**, not the Gemini app) | amber outline + tooltip |
| **Planned / Expected** | Standards-compatible but untested (Cursor, other MCP `2025-11-25` clients) | neutral/muted |

---

## B1. Hero — *"Your Busy accounting, answerable by AI."*

**Objective:** land the 5-5-5; feel premium and finance-credible; invite action.

**Copy (recommended):**
- **Eyebrow:** `Busy Accounting MCP · Read-only AI access`
- **H1 (rec. first):**
  - **"Your Busy accounting, answerable by AI."**
  - alt: "Ask your accounting questions. Get answers from your own Busy data."
  - alt: "Bring your Busy ledgers, sales & stock into ChatGPT and Claude."
- **Sub:** "Connect the AI assistant your team already uses to your Busy Accounting
  data. Ask in plain language — *'What's my outstanding?'*, *'Which products became
  dead stock?'* — and get real, sourced answers from your own books. Read-only, always."
- **Trust line:** "Read-only access · You approve the connection · Scoped to your
  account · Disconnect anytime."
- **Primary CTA:** **"Connect Busy MCP"** → request-access / contact with a Busy-MCP topic (OD-6).
- **Secondary CTA:** **"See how it works"** → `#how-it-works`.
- **Client chips (with status):** `ChatGPT · Available now` · `Claude · Rolling out` ·
  `Claude Code · Rolling out` · `More MCP clients · Rolling out`.

**Hero visual — the "Busy answer scene"** (storyboard in C3): an **AI-client chip** →
a **secure, consent-gated Whats91 Busy MCP bridge** (lock badge on the path) → a **Busy
company node** (ledger/₹ mark) → a returning **answer card** that reads like a real
result: `Outstanding ₹18,42,500` · `Top dealer: Acme Traders` · `Dead stock: 34 items`.
Teaches the product; the lock + "read-only" chip signal safety, never an open pipe or
write path.

### Wireframe — desktop hero

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [ Whats91 logo ]     Solutions  Features  Free Tools  Pricing  ...   ⌂    │  ← reused Header
├──────────────────────────────────────────────────────────────────────────┤
│  ● Busy Accounting MCP · Read-only AI access                              │
│                                                    ╭───────────────────╮   │
│  Your Busy accounting,                             │  ChatGPT ●        │   │
│  answerable by AI.                                 │      ╲            │   │
│                                                    │   [ 🔒 read-only ] │   │  ← consent-gated
│  Connect the AI assistant your team already        │       ╲           │   │    bridge
│  uses to your Busy Accounting data. Ask in         │      ( Busy ₹ )   │   │
│  plain language and get real answers from          │       hub         │   │
│  your own books. Read-only, always.                │        ▼          │   │
│                                                    │  ┌─────────────┐  │   │  ← answer card
│  [ Connect Busy MCP ]  [ See how it works ]        │  │Outstanding  │  │   │    returns
│                                                    │  │₹18,42,500   │  │   │
│  ✓ Read-only  ✓ You approve  ✓ Scoped  ✓ Revoke    │  │Top: Acme    │  │   │
│                                                    ╰───────────────────╯   │
│  [ChatGPT ·now] [Claude ·rolling] [Claude Code ·rolling] [More ·rolling]   │  ← status chips
└──────────────────────────────────────────────────────────────────────────┘
```

### Wireframe — mobile hero

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
│ Busy. Ask. Get real    │
│ answers. Read-only.    │
│                        │
│ [ Connect Busy MCP ]   │  ← full-width
│ [ See how it works ]   │
│                        │
│ ✓ Read-only ✓ Approve  │
│ ✓ Scoped ✓ Revoke      │
│                        │
│   ┌─────────────────┐  │
│   │  ChatGPT ●      │  │  ← vertical
│   │      │          │  │    mini-flow
│   │  [🔒 read-only] │  │    (client →
│   │      │          │  │     lock →
│   │   (Busy ₹) hub  │  │     hub →
│   │      │          │  │     answer)
│   │  ┌───────────┐  │  │
│   │  │Outstanding│  │  │
│   │  │₹18,42,500 │  │  │
│   │  └───────────┘  │  │
│   └─────────────────┘  │
│ [ChatGPT][Claude]      │  ← 2×2 status
│ [Code][More]           │    chips
└───────────────────────┘
```

**Reduced-motion / a11y:** visual is `aria-hidden`; the message lives fully in the text.
Frozen state = a legible static diagram (client → lock → Busy hub → answer card).

---

## B2. The problem — *"Sound familiar?"*

**Objective:** recognition. Make the finance reader feel seen.

**Heading:** *"Your numbers live in Busy. Getting to them shouldn't cost you an afternoon."*
**Copy:** "Every answer — outstanding, top dealers, slow stock, this month's sales — is
already in Busy. But getting it means opening the right report, setting the company and
year, filtering, exporting, and rebuilding it in Excel. Then someone asks a slightly
different question, and you start over."

**Three pain cards (icon + one line):**
- 🔍 *"Which report was that in again?"* — answers scattered across Busy screens.
- ⏳ *"Give me a minute to pull that up."* — filter, export, repeat, every day.
- 📊 *"Let me rebuild it in Excel."* — data re-keyed, out of date the moment it's pasted.

```
        Your numbers live in Busy.
        Getting to them shouldn't cost you an afternoon.
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │  🔍      │   │  ⏳      │   │  📊      │
   │ Scattered│   │ Manual   │   │ Excel    │
   │ reports  │   │ exports  │   │ rework   │
   └──────────┘   └──────────┘   └──────────┘
```

---

## B3. Before / After — the relief, visualized

**Heading:** *"From opening reports to just asking."*
Two columns, muted "Without" vs brand-green "With".

| Without Busy MCP | With Busy MCP |
|---|---|
| Open Busy, set company & year, filter, export | Ask: *"What's my outstanding for COM0001, FY 2026-27?"* |
| Rebuild the report in Excel | Natural-language answers, in seconds |
| Re-run for every follow-up question | Ask follow-ups in the same chat |
| Screenshot and paste into a message | Sourced answers you can act on |
| Hope you exported the right column | Answers scoped to *your* account, read-only |

> Accuracy note: keep every "With" example to things the tools actually return
> (outstanding, sales, stock, trends). **Never** show a profit/margin example here.

```
   From opening reports → to just asking.
 ┌──────────── WITHOUT ────────────┐   ┌────────────── WITH ─────────────┐
 │ ✕ Open Busy, filter, export      │   │ ✓ "What's my outstanding?"      │
 │ ✕ Rebuild in Excel               │──▶│ ✓ Answers in seconds            │
 │ ✕ Re-run for every follow-up     │   │ ✓ Follow-ups in the same chat   │
 │ ✕ Screenshot & paste             │   │ ✓ Sourced, read-only answers    │
 └──────────────────────────────────┘   └─────────────────────────────────┘
        (grey / muted)                          (brand-green / elevated)
```

---

## B4. What is Busy Accounting MCP? (plain language)

**Heading:** *"What is Busy Accounting MCP?"*
**Copy (this is the 40–55-word snippet target — keep it crisp, directly under the H2):**
"Busy Accounting MCP is a secure, read-only bridge built on the open Model Context
Protocol. It lets a supported AI assistant connect to your Whats91-synced Busy data and
answer business questions — outstanding, sales, purchases, customers, stock — using a
fixed set of approved tools. It reads your books; it never changes them."

**"This is NOT" strip (4 reassurance cards):**
- ✕ Not write access to Busy → ✓ strictly read-only, always
- ✕ Not raw database or SQL access → ✓ a fixed set of approved, validated tools
- ✕ Not shared passwords → ✓ a secure, revocable sign-in with your existing token
- ✕ Not manual exports & Excel → ✓ live, in-context answers from your own data

*Microcopy:* "Open standard · MCP spec `2025-11-25` · endpoint `busyapi.whats91.com/mcp/v1`."

---

## B5. Supported AI clients (honest, evidence-graded)

**Heading:** *"Works with the AI assistants your team already opens."*
**Sub:** "ChatGPT connects today in developer mode. Claude and more MCP clients are
rolling out. Every status below reflects what we've actually verified."

**Primary client cards** (neutral name chips / monograms — no third-party logo assets;
see D5):

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

> **Grok:** intentionally **absent** — there is no Busy-MCP compatibility evidence for
> xAI Grok (D7-OD3). Do not add a Grok card unless the product owner confirms a tested path.

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

## B6. Capabilities — bento tiers (organised by the way you work)

**Objective:** make the 69-tool surface feel *organised and business-relevant*, not a
technical list. Group into finance teams' mental model. Every card uses **business
language**, never raw tool names. All groups are **Available now** at the tool level
(implemented in `1.9.1`, tested against the real warehouse), with the honesty boundary
handled separately in B11.

**Heading:** *"Everything you can ask — organised by the way you work."**
**Sub:** "One read-only connection covers your whole Busy picture. Ask in plain language;
answers come back sourced and scoped to your account."

Premium **bento grid**, each category = its own icon + accent:

**1. 📌 Executive command center** — a compact company view: sales, receipts,
receivables, customer activity, stock movement, top movers, and deterministic alerts;
plus "what should each team review next?"

**2. 💰 Sales & revenue** — company and customer sales registers, product-line sales
with GST, top/bottom customers, products, groups, states, salespeople by a sales metric,
with contribution and prior-period growth.

**3. 🧾 Receivables & collections** — outstanding bills, overdue days and aging, credit
exposure (Standard/FIFO), a deterministic collection-priority queue, and actual
receipt-timing / late-payment behaviour.

**4. 👥 Customer intelligence** — 360° customer view, activity status
(active / slowing / dormant / reactivated), repeat-purchase cadence and reorder-due,
retention cohorts, lifetime-value scenario, and RFMB segmentation.

**5. 📦 Purchases & suppliers** — supplier discovery, supplier ledgers and payables,
purchase and purchase-return registers (voucher + item line), pending purchase orders,
and purchase trends.

**6. 📊 Inventory & product intelligence** — stock, prices, tax and hierarchy;
fast/slow/dead movement classification, inventory-aging & dead-stock review, a bounded
stockout / at-risk scenario, substitute candidates, and return-rate analysis.

**7. 🎯 Concentration & portfolio risk** — Pareto, ABC classification, and
customer/product concentration (top-1/5/10 shares, HHI dependency flags).

**8. 🔁 Cross-sell & product-group intelligence** — customer × product-group matrix,
penetration, evidence-ranked cross-sell opportunities, and product-group migration.

**9. 📤 Downloadable registers** — create a private, signed CSV export of the sales or
purchase register when you actually need a file (read-only; the export never changes Busy).

**Hard boundary note (small, honest, links to B11):** "Busy MCP answers from your synced
Busy data. It is **read-only** and does **not** calculate profit or margin, cost, or
valuation, and does not forecast. See *What it deliberately doesn't do*."

```
   Everything you can ask — organised by the way you work.

 ┌───────────────────────────┐ ┌───────────────────────────┐
 │ 📌 Executive command center│ │ 💰 Sales & revenue         │   ← wide + tall tiles
 │ sales·receipts·receivables │ │ registers·top movers·growth│
 │ ●Available now             │ │ ●Available now             │
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
```

---

## B7. Live prompt examples (proof by conversation, by department)

**Objective:** let each visitor *see themselves using it*. Real questions in their own
words, grouped by department, styled like chat, each a copyable prompt chip with a
sketched answer. **All answers must be things the tools actually return** (D1). Answers
use INR, Indian FY, and read like real Busy output.

**Heading:** *"Real questions. Real answers from your books."**

**Owner / Executive — Available now**
- 💬 "What are today's executive alerts for COM0001, FY 2026-27?"
  → *"3 alerts: receivables up 12% vs last month; 2 top-5 customers slowing; 34 dead-stock items."*
- 💬 "Give me this quarter's sales vs last quarter."
  → *"Net sales ₹2.31 Cr vs ₹2.04 Cr — up 13%. Top gain: Hardware group (+₹18.4 L)."*

**Accounts / Collections — Available now**
- 💬 "What's my total outstanding, and who are the top overdue customers?"
  → *"Outstanding ₹18,42,500. Top overdue: Acme Traders ₹3.1 L (62 days), …"*
- 💬 "Build a collection priority queue for overdue bills."
  → *"Top 20 by priority — Acme ₹3.1 L (age 62d), … (review before outreach)."*
- 💬 "How quickly does customer 1001 actually pay?"
  → *"Avg 41 days to pay; late rate 38% on due-dated bills."*

**Sales — Available now**
- 💬 "Who are my top ten dealers this quarter and how did they change?"
  → *"1. Acme ₹42 L (+9%) · 2. …  contribution and prior-period growth shown."*
- 💬 "Which customers are slowing down?"
  → *"7 customers moved to 'slowing'; net sales down vs their own cadence."*

**Purchase — Available now**
- 💬 "Which supplier has the highest payable?"
  → *"Top payable: Steel Corp ₹6.4 L across 8 open bills (aging shown)."*
- 💬 "Show my purchase trend for the last 6 months."
  → *"Net purchases by month, zero-filled; leading item groups + Others."*

**Inventory / Operations — Available now**
- 💬 "Which products became dead stock?"
  → *"34 dead-stock candidates (no sale in lookback, stock on hand). Review list."*
- 💬 "What's at risk of stocking out in the next 30 days?"
  → *"Scenario (stated assumptions): 12 items below cover; at-risk qty/value shown."*

> **Do NOT include** any profit/margin prompt ("what's my margin on X"), any
> cost/valuation prompt, any forecast ("how much will I sell next month"), any
> "branch/territory" framing, or any write action ("post this entry"). These are
> unsupported and would break A5.

```
   Real questions. Real answers from your books.

 [Accounts ·Available now]
  ┌ user ─────────────────────────────────────────┐
  │ 💬 What's my total outstanding & top overdue?  │  [copy]
  └────────────────────────────────────────────────┘
     ┌ assistant ──────────────────────────────────┐
     │ Outstanding ₹18,42,500. Top overdue: Acme    │
     │ Traders ₹3.1 L (62 days), …                  │
     └──────────────────────────────────────────────┘

 [Inventory ·Available now]
  ┌ user ─────────────────────────────────────────┐
  │ 💬 Which products became dead stock?           │  [copy]
  └────────────────────────────────────────────────┘
```

---

## B8. Executive command center (the signature visual)

**Objective:** the section that makes this page *feel* like a flagship finance product —
and the clearest differentiator from the Whats91 MCP page. A tasteful, static-legible
**dashboard mock** rendered in SVG/CSS (NOT a live app), showing the shape of what the
executive-summary and exception tools return.

**Heading:** *"One question. Your whole company, at a glance."**
**Sub:** "Ask for your executive summary and Busy MCP returns a compact, sourced view —
sales, receipts, receivables, customer activity, stock movement, top movers, and
deterministic alerts."

**Mock contents (all evidence-backed shapes; use illustrative INR figures, clearly a demo):**
- KPI row: `Net sales (period)`, `Receipts (evidence)`, `Receivables`, `Active customers`
  — with a small "vs prior period" delta. *Label receipts as "receipt evidence," not
  "total collections" (D1).*
- A compact **top-movers** list (top customers / product groups by net sales, with
  contribution %).
- A **stock movement** mini-panel (fast / slow / dead counts).
- An **alerts** strip (deterministic exception signals: "receivables up 12%", "2 top-5
  customers slowing", "34 dead-stock items") — each with an "expected range / clear
  boundary," never a probability or forecast.
- A footer micro-note: *"Illustrative. Every figure is sourced from your synced Busy
  data, read-only. Gross profit, margin, and cost are not shown — see B11."*

```
   One question. Your whole company, at a glance.
 ┌──────────────────────── Executive summary · COM0001 · FY 2026-27 ─────────┐
 │  Net sales ₹2.31 Cr ▲13%   Receipts (evidence) ₹1.98 Cr   Receivables ₹18.4 L │
 │  ┌ Top movers ───────────┐  ┌ Stock movement ─┐  ┌ Alerts ───────────────┐ │
 │  │ 1 Acme    ₹42 L  18%  │  │ Fast   128       │  │ ⚠ Receivables ▲12%    │ │
 │  │ 2 Hardware grp ₹31 L  │  │ Slow    46       │  │ ⚠ 2 top-5 slowing     │ │
 │  │ 3 …                   │  │ Dead    34       │  │ ℹ 34 dead-stock items │ │
 │  └───────────────────────┘  └──────────────────┘  └───────────────────────┘ │
 │  Illustrative · sourced · read-only · no profit/margin/cost shown            │
 └──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile:** KPI row wraps 2×2; the three panels stack vertically; the mock scrolls
inside its own container (never causes page overflow). Static under reduced motion.

---

## B9. How it works (four friendly steps)

**Heading:** *"Connect in minutes."*

1. **Pick your assistant** — choose ChatGPT (developer mode) or another supported MCP
   client and point it at `busyapi.whats91.com/mcp/v1`.
2. **Sign in with your Whats91 token** — a secure Whats91 authorization page (OAuth 2.1
   + PKCE) validates your **existing** Whats91 API token. No new password, no separate
   MCP token to manage; the token is never shown to the assistant.
3. **Your access is scoped automatically** — the connection is bound to your account and
   your synced Busy companies and financial years, enforced by row-level security. It's
   read-only.
4. **Ask away** — questions and answers happen inside your assistant, from your own
   books. Disconnect any time.

*Microcopy:* "You need an active Whats91 API token with Busy Retrieval access and at
least one synced company/financial year. Your token stays secure — enter it only on the
HTTPS `busyapi.whats91.com` page, never in chat."

```
   Connect in minutes.
  ①───────────②───────────③───────────④
  Pick your    Sign in with  Access is    Ask away
  assistant    your Whats91  scoped (read- (& disconnect
  (MCP URL)    token (OAuth) only, RLS)    anytime)
```

---

## B10. Trust & control (read-only safety, icon-led)

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
pen-tested" claims (D2). The compatibility report is an integration test, not a
certification.

```
   Your books. Read-only. Your rules.
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │🔒  │ │🧩  │ │👤  │ │🗄  │
 │Read│ │Tool│ │Scope│ │RLS │
 │only│ │only│ │     │ │    │
 └────┘ └────┘ └────┘ └────┘
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │✅  │ │🔐  │ │🔁  │ │🧾  │
 │OAuth│ │Enc │ │Revk│ │Src │
 └────┘ └────┘ └────┘ └────┘
```

---

## B11. What it deliberately doesn't do (trust through honesty)

**Objective:** the section that *earns* an accountant's trust — and enforces A5. Frame
the boundaries as a feature ("so you always trust the number"), not an apology. This
section is a differentiator; the Whats91 MCP page has nothing like it.

**Heading:** *"What it deliberately doesn't do — so you always trust the number."*
**Sub:** "Busy MCP will never guess. When something isn't in your data, it says so."

**Boundary cards (grouped, icon + one line):**
- 🚫 **No profit or margin** — gross profit, gross margin, and customer profitability are
  not calculated; the cost and valuation sources aren't available, so it won't estimate them.
- 🚫 **No cost or inventory valuation** — no landed cost, no stock value, no "blocked capital."
- 🔮 **No forecasts or predictions** — every score is a deterministic *review priority*
  from observed evidence, not a probability, credit rating, or forecast.
- 🏭 **No verified branch / territory** — a Busy material centre isn't a branch or
  warehouse; customer state isn't a territory; salesperson isn't a team or commission figure.
- 📐 **No operating-cycle ratios** — no DSO, DPO, inventory days, or cash conversion
  cycle; the working-capital view shows *net trade exposure* only.
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

## B12. Architecture — the one developer moment (dark `ink` band)

**Objective:** one credible, satisfying technical section; the only place protocol terms
appear prominently.
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

**Copy (concise):** "Your assistant connects over the open **Model Context Protocol**
(spec `2025-11-25`) via Streamable HTTP. Every request passes an OAuth-secured check,
resolves to your tenant under PostgreSQL row-level security, and runs one **approved,
read-only, schema-validated** tool through the same service layer as our Busy Retrieval
APIs. No SQL, no writes, no cross-account access. Fixed-bearer clients using your
existing Whats91 token are supported too."

**Endpoint chip:** `https://busyapi.whats91.com/mcp/v1` (copyable).
**Developer CTA:** "Read the integration guide" → docs (OD-5; if no public docs route
exists, link to the in-page `#how-it-works` + contact, do not invent a URL).
Deeper protocol detail (CIMD, DCR, refresh rotation, RFC 9728/8414) lives in the
compatibility report / developer docs — **not** on the page.

---

## B13. Future vision (Today / Rolling out / Planned)

**Heading:** *"Available today — and expanding."*
**Sub:** "The read-only accounting surface is live now. More clients and capabilities
are being verified through rollout — clearly separated so you always know what's ready."

```
   TODAY (Available)         ROLLING OUT                 PLANNED / FUTURE
   ────────────────         ───────────                 ────────────────
   Read-only Busi-          Claude, Claude Code,         More MCP clients
   ness answers across      Codex, VS Code/Copilot       (Cursor, others);
   sales, receivables,      client verification;         broader client
   customers, purchases,    branded signed-in            coverage as vendors
   inventory, trends,       completion;                  stabilise MCP.
   concentration,           Gemini beyond the CLI.       (No profit/cost/
   cross-sell, exports —                                 forecast planned —
   via ChatGPT dev mode.                                 by design.)
```

*Framing rule:* "Today" uses **Available now** language; "Rolling out" / "Planned" use
future tense + pills. Never present a rolling/planned client as fully verified. Reinforce
that profit/cost/forecast are **out of scope by design**, not "coming soon."

---

## B14. FAQ (trust + SEO; visible text == FAQ schema)

Only evidence-backed answers; the same array feeds `FAQPage` JSON-LD (D4).

1. **What is Busy Accounting MCP?** — plain definition (B4).
2. **Is it read-only?** — Yes. It can read approved Busy data; it cannot create, edit,
   delete, post, sync, or approve. The only non-read tools create a private CSV export
   and never change Busy data.
3. **Which AI assistants can I use?** — ChatGPT (developer mode, available now); Claude
   and Claude Code (rolling out); Codex and VS Code/Copilot (documented, rolling out);
   Gemini CLI (limited); other MCP `2025-11-25` clients (planned).
4. **Does the AI get direct access to my Busy database?** — No. It uses a fixed set of
   approved, schema-validated tools — never raw SQL, generic table reads, or writes.
5. **Can it tell me my profit or margin?** — No. Gross profit, margin, customer
   profitability, and cost/valuation are deliberately not calculated, because the
   authoritative cost sources aren't available; it will say so rather than estimate.
6. **Can it forecast sales or predict who will default?** — No. Every score is a
   deterministic review priority from observed evidence — not a forecast, probability,
   or credit rating.
7. **Whose data can it see?** — Only your account's synced Busy companies and financial
   years, enforced by tenant-bound sessions and database row-level security.
8. **Do I need a new login or token?** — No. It reuses your existing Whats91 API token
   via a secure OAuth sign-in; the token is stored encrypted and never shown to the assistant.
9. **What do I need before connecting?** — An active Whats91 API token with Busy
   Retrieval access, and at least one synced company and financial year.
10. **Are material centres the same as branches?** — No. A material centre is not a
    verified branch or warehouse, customer state is not a territory, and salesperson is
    not a team or commission figure. Those bases are stated, not assumed.
11. **Can I download a report?** — Yes. It can create a private, signed CSV export of
    the sales or purchase register when you need a file; export rows are never pasted
    into the chat, and the link is short-lived.
12. **Can I revoke access?** — Yes, anytime — disconnect the client, or revoke the token
    through your existing Whats91 process.
13. **Is this the same as the Whats91 MCP for WhatsApp?** — No. That connects AI to your
    WhatsApp Business data; this connects AI to your **Busy accounting** data. Sibling
    products, one platform. *(Link to `/mcp`.)*
14. **Is it certified or independently audited?** — We describe the controls we've built
    (OAuth 2.1, PKCE, row-level security, tenant isolation, encryption at rest,
    revocation). We do not claim third-party security certification. *(OD-7.)*

---

## B15. Final CTA

**Heading:** *"Ask your Busy data anything."*
**Sub:** "Connect your AI assistant to your Busy accounting — read-only, scoped to your
account, disconnect anytime."
**Primary CTA:** "Connect Busy MCP" (OD-6). **Secondary:** "See how it works"
(`#how-it-works`).
**Reassurance:** "Read-only · you approve the connection · your token stays encrypted."
Include a small legal line: "See our Privacy Policy and Terms for how the MCP
integration handles data." *(Link to the AI/MCP sections already added at
`/privacy#ai-mcp` and `/terms#ai-mcp`.)*

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

## C1. Conversion strategy & CTA map

One primary conversion (**connect / request access**); one secondary (**see how it
works**); a developer link for evaluators; repeated at the right emotional moments.

| Placement | CTA | Why it exists |
|---|---|---|
| **Hero (primary)** | Connect Busy MCP | capture high-intent visitors immediately |
| **Hero (secondary)** | See how it works | scroll for the not-yet-convinced |
| **After B6 Capabilities (mid-page)** | Connect Busy MCP | peak excitement — first natural conversion point |
| **After B8 Command center** | See a live walkthrough / Talk to us | for the "show me" evaluator |
| **B12 Architecture (developer)** | Read the integration guide / view endpoint | serves the technical evaluator |
| **B15 Final CTA (primary)** | Connect Busy MCP | the commitment moment |
| **Footer** | Busy Accounting MCP → this route | ambient discoverability |
| **Sticky (mobile, optional)** | Connect Busy MCP | thumb-reachable after hero scrolls away; dismissible; reduced-motion-safe |

Rules: **one visual primary style** (brand button) reused everywhere; secondary is
ghost/outline. All primary CTAs point to the same destination (OD-6) for clean tracking.
Mirror the existing `/mcp` page's CTA destinations for consistency unless the owner
specifies a Busy-specific access flow.

## C2. SEO strategy

**Core:**
- **Route/canonical (OD-1):** recommended **`/busy-accounting-mcp`** (top-level,
  keyword-rich, sibling to `/mcp`). Alternative: `/solutions/busy-accounting-mcp`.
  Pick one, set a self-canonical, add to `sitemap.ts` (priority ~0.9, weekly).
- **Primary keywords:** "Busy Accounting MCP", "Busy MCP server", "Busy accounting AI",
  "connect Busy to ChatGPT", "AI for Busy Accounting", "Busy ERP MCP".
- **Secondary:** "ask accounting questions AI", "Busy outstanding report AI", "Busy
  sales analysis AI", "Busy dead stock AI", "Busy accounting ChatGPT integration",
  "Claude Busy accounting". Verify demand before finalising; never fabricate metrics.
  Never target unofficial/scraping terms.
- **Title (≤~60):** "Busy Accounting MCP — Ask Your Busy Data in ChatGPT & Claude".
- **Meta description:** "Connect ChatGPT, Claude, or any MCP client to your Busy
  Accounting data. Ask about outstanding, sales, purchases, and stock in plain
  language — read-only, scoped to your account, sourced answers."
- **H1:** hero headline (one only). **H2s:** the B-section headings. **H3s:** cards/steps.
- **Schema:** `BreadcrumbList` (Home › Busy Accounting MCP) + `FAQPage` (mirror visible
  text) + **`SoftwareApplication`** (name "Busy Accounting MCP", category
  "BusinessApplication", publisher "Wilford Technology"; **no** ratings/prices; **no**
  `Product`). Reuse `generateBreadcrumbSchema`, `generateFAQSchema`,
  `generateSoftwareApplicationSchema` from `src/lib/seo/config.ts`.
- **OG/Twitter:** new `public/og-busy-mcp.png` (1200×630) if the approved image pipeline
  is available; otherwise reuse the existing valid OG fallback and document the pending
  dedicated image (mirror how `/mcp` currently falls back to `/og-image.png`).
- **Definition-paragraph snippet:** structure B4 as a crisp 40–55-word "Busy Accounting
  MCP is …" paragraph directly under an H2 (featured-snippet shape). The FAQ and the B3
  comparison table are additional snippet surfaces.
- **GEO / AI Overviews:** write self-contained, citable answer passages (each FAQ answer
  and capability line stands alone). Keep claims verifiable, read-only, and dated. Add
  the route to the site's `llms.txt` priority list if that pattern is in use.
- **Entity optimization:** consistent naming ("Busy Accounting MCP", "Model Context
  Protocol", "Busy"), `SoftwareApplication.provider` → the existing Organization entity,
  reference the parent Whats91 / Wilford Technology entity.
- **Internal linking (in):** homepage `IntegrationsBand` (it already references the Busy
  ecosystem), `/solutions/busy-erp`, `/solutions/busy-api`, `/solutions/busy-reports`,
  `/solutions/busy-google-sheet`, `/solutions/busy-ai-agent`, `/mcp` (sibling), `/features`,
  footer. **(out):** `/solutions/busy-erp`, `/solutions/busy-reports`, `/mcp`, `/pricing`,
  `/contact`.
- **Length:** ~1,300–1,900 words of substantive copy; natural usage, no stuffing.
- **Schema caution:** do **not** use `HowTo` schema for B9 (Google retired HowTo rich
  results — consistent with the existing `/mcp` decision).

**Supporting blog cluster (create as content, link up to this page):**
1. "What is an MCP server, and why does it matter for Busy Accounting?"
2. "How to ask your Busy outstanding in ChatGPT (safely, read-only)."
3. "Find dead stock and reorder risks in Busy with AI."
4. "Why AI should never guess your accounting numbers (and how read-only MCP prevents it)."
Each targets a long-tail query and links to this hub (hub-and-spoke).

## C3. Animation & interaction system

Match the homepage and the existing `/mcp` page: **continuous, subtle, purposeful,
always-legible, reduced-motion-safe.** Pure CSS/SVG (transform/opacity/
background-position/stroke-dashoffset), mirroring `IntegrationsBand`, `PlatformPillars`,
and the existing `mcp-*` keyframes. **No** WebGL, no JS animation loop, no new library.
Namespace all new keyframes `busymcp-*` (do not reuse or modify the `mcp-*` keyframes).

**Hero "Busy answer scene" storyboard (single ~13s loop, one client active at a time):**
1. **Idle (0s):** client chip + Busy hub + faint idle connector — the legible,
   reduced-motion end state.
2. **Connect + consent (0–3s):** a dashed connector flows client→hub; a **lock /
   "read-only"** badge pulses on the path (reuse the `mcp-pulse` idea via a `busymcp-`
   keyframe) — signals safety, not an open pipe.
3. **Read (3–6s):** an *approved tool* chip highlights at the hub ("Outstanding report"),
   never "the database."
4. **Answer (6–9s):** the **answer card** (`Outstanding ₹18,42,500 · Top: Acme`) travels
   back to the client chip; numbers can use `AnimatedNumber` count-up.
5. **Rotate (9–13s):** connector settles to a gentle flowing-dash idle; the next loop can
   swap the answer card content (outstanding → top dealer → dead-stock count) to hint at breadth.

**Interaction inventory** (reuse the `/mcp` page's proven set):

| Interaction | Behaviour |
|---|---|
| Scroll reveals | `Reveal` fade+rise per section (once); staggered for grids. |
| Command-center mock | KPI numbers count up once on first view (`AnimatedNumber`); mini bar/step charts use static-legible CSS bars with a soft flowing highlight (like `PlatformPillars` `camp-bar-flow`). |
| Card animations | capability/client/trust cards: staggered fade-up on enter; hover lift (`-translate-y-0.5`) + border tint + soft shadow. |
| Micro-interactions | status pills gently pulse once on first view; the Gemini "Limited" tooltip opens on hover/focus; example-prompt chips show a "copied ✓" state on click. |
| Architecture band | left-to-right sequential node glow + arrow-flow (reuse the pattern just added to `McpArchitectureDiagram`, re-namespaced `busymcp-*`), plus a slow light sweep. |
| Reduced motion | `prefers-reduced-motion`: all loops/reveals freeze to complete states; hero = static diagram; pulses removed. Everything remains fully legible. |

**Performance limits:** animate only transform/opacity/background-position/
stroke-dashoffset; `will-change` sparingly; don't animate offscreen; target CLS 0,
negligible INP. Namespaced keyframes in `globals.css` (`busymcp-*`).

## C4. Responsive plan

| Breakpoint | Behaviour |
|---|---|
| **≤360** | 1-col; hero → headline/sub/CTAs (full-width) → vertical mini-flow; client chips 2×2; bento tiers stack; command-center KPI 2×2 + panels stacked, mock scrolls in its own container; comparison + boundary grids → stacked cards; prompt chips full-width; sticky CTA (optional). |
| **361–639** | as above; timelines vertical. |
| **640–1023** | 2-col grids; hero simplified (vertical flow); steps 2-col; comparison side-by-side; command-center 2-col panels. |
| **1024–1279** | full orbital hero; 3-col-ish bento; client row; horizontal architecture; full command-center. |
| **≥1280** | max container; generous spacing; full animation. |

Rules: orbital hero **must** degrade to a vertical flow on mobile; big grids → stacked
cards; tables → cards; the command-center mock and architecture diagram **scroll inside
their own `overflow-x:auto` container**, never shrinking text to unreadable or causing
**horizontal page overflow at 320px**. INR figures must stay legible (`tabular-nums`).

## C5. Performance plan

- **Server components by default;** client islands only for prompt-copy, FAQ accordion,
  and (if interactive) the hero — prefer a pure-CSS hero like `IntegrationsBand`.
- CSS/SVG animation only; no WebGL / animation library.
- Optimized inline SVG for the scene, command-center mock, and architecture; client
  monograms as text (no logo network requests); OG a static optimized PNG.
- Lazy-load below-the-fold heavy media; tiny hero critical path; hero text is the LCP.
- No layout shift (reserved dimensions; self-hosted Inter via `next/font`).
- Reduced motion respected; nothing animates offscreen. **CWV targets:** text LCP, CLS 0,
  low INP.

## C6. Analytics & conversion tracking

Wire to the project's standard tracker **only if one exists** (the `/mcp` page found
none and added no new dependency — do the same here; leave typed no-op hooks). Event
names (namespaced, privacy-safe, no PII):
`busy_mcp_page_viewed` · `busy_mcp_primary_cta_clicked` · `busy_mcp_secondary_cta_clicked`
· `busy_mcp_midpage_cta_clicked` (`position`) · `busy_mcp_client_card_clicked`
(`client`) · `busy_mcp_gemini_limited_tooltip_opened` · `busy_mcp_example_prompt_copied`
(`prompt_id`, `department`) · `busy_mcp_capability_hovered` (`category`) ·
`busy_mcp_endpoint_copied` · `busy_mcp_faq_expanded` (`question_id`) · `busy_mcp_nav_source`.

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
- **Finance flavour (within the system):** lean on `lucide` finance icons (`ReceiptText`,
  `Landmark`, `Wallet`, `TrendingUp`, `PackageX`, `Boxes`, `FileSpreadsheet`,
  `IndianRupee`, `ScrollText`), `tabular-nums` for all INR figures, and demo INR/GST/FY
  values so the page reads as Indian accounting.
- **Premium DO:** confident whitespace, one accent color, crisp SVG, subtle motion,
  tabular numbers, a believable (clearly-illustrative) command-center mock.
- **Premium DON'T:** heavy glassmorphism, neon, purple "AI" gradients, fake terminal
  windows, WebGL, distracting motion, unreadable small text, anything that reads as
  "developer docs," and — above all — any figure that implies profit/margin/cost/forecast.

---
---

# PART D — Evidence, reference & Sonnet handoff

## D1. Product evidence (verified — the accuracy backbone)

**Sources:** `MCP_PUBLIC_GUIDE.md`, `MCP_COMPATIBILITY_REPORT.md`, `SKILL.md` (all in
`whats91_busy_api_server/docs/`).

**Shipped Busy MCP platform (verified):**
- Endpoint **`https://busyapi.whats91.com/mcp/v1`**; MCP **Streamable HTTP**; stable
  protocol **`2025-11-25`**; server SDK `@modelcontextprotocol/sdk 1.29.0`.
- Auth: existing Whats91 **bearer** token **or** standards-based **OAuth 2.1
  authorization-code + S256 PKCE** (RFC 9728 protected-resource metadata, RFC 8414 AS
  metadata, DCR, trusted **CIMD**, resource/audience binding, rotating refresh tokens,
  revocation). Reuses the existing Whats91 API token as the authorization credential —
  **no separate MCP user/token system**. Token stored **AES-256-GCM encrypted in Redis**.
- **Stateful, tenant-bound sessions;** cross-tenant session reuse rejected. Company +
  financial-year access limited by existing DB scope and **PostgreSQL row-level security**.
- **69 tools** in service **`1.9.1`**, catalogue `2026-07-19.8`: **67 read-only + 2
  non-destructive private export-job tools** (`busy_export_sales_register`,
  `busy_export_purchase_register`). *(Note: `MCP_PUBLIC_GUIDE.md` §7 says "Sixty-five
  tools are read-only," which conflicts with the 67/69 stated in the same guide's ChatGPT
  section, the compatibility report, and the `/health` `tool_count: 69`. Treat **69 total
  = 67 read + 2 export** as authoritative; flag the §7 wording — D7-OD2.)*
- **Read-only:** cannot create, edit, delete, post, synchronise, or approve accounting
  records. Not arbitrary SQL, not generic table reads, not ingestion. Strict JSON schemas;
  unknown properties rejected.

**Capability groups → representative tools (business language on the page; tool names
NEVER shown to end users):**
- *Executive command center:* `busy_executive_dashboard_summary`, `busy_exception_alerts`,
  `busy_recommended_actions`.
- *Sales & revenue:* `busy_get_sales_register(_products)`,
  `busy_get_customer_sales_register`, `busy_get_customer_product_sales_returns`,
  `busy_top_entities_by_metric`, `busy_rank_products_by_dimension`,
  `busy_rank_customers_by_product_group`, `busy_rank_product_groups_by_customer`,
  `busy_analyze_product_performance`, `busy_analyze_product_group_performance`.
- *Growth / trends / seasonality:* `busy_sales_trend_summary`, `busy_drilldown_metric`,
  `busy_compare_period_performance`, `busy_detect_growth_decline`, `busy_analyze_seasonality`.
- *Receivables & collections:* `busy_list_customer_outstanding`,
  `busy_analyze_credit_line_outstanding`, `busy_credit_risk_scorecard`,
  `busy_collection_priority_queue`, `busy_payment_behaviour_analysis`,
  `busy_working_capital_summary`.
- *Customer intelligence:* `busy_list_customers`, `busy_get_customer_ledger`,
  `busy_customer_360_summary`, `busy_customer_activity_status`,
  `busy_customer_repeat_purchase_analysis`, `busy_customer_retention_cohorts`,
  `busy_customer_lifetime_value`, `busy_customer_segmentation`,
  `busy_list_pending_sales_orders`.
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
- *Pricing:* `busy_price_realization_analysis`, `busy_discount_and_margin_leakage`
  (pricing-gap **review only** — never "recoverable margin").
- *Performance scorecards (basis-acknowledged):* `busy_branch_performance_scorecard`
  (material centre ≠ branch), `busy_customer_state_performance_scorecard` (state ≠
  territory), `busy_salesperson_performance_scorecard` (no commission/profit).
- *Discovery/foundation (behind the scenes, powers accuracy):* `busy_list_companies`,
  `busy_get_analytics_freshness`, `busy_get_profitability_readiness`,
  `busy_get_metric_catalog`, `busy_get_dimension_catalog`, `busy_plan_accounting_query`,
  `busy_resolve_entity`, `busy_get_canonical_customer_links`.
- *Exports:* `busy_export_sales_register`, `busy_export_purchase_register`.

**Explicitly UNAVAILABLE / must never be implied (the A5/B11 backbone):**
- Gross profit, gross margin, customer profitability, "true margin" — **blocked** by
  `busy_get_profitability_readiness`; cost, valuation, return-cost linkage, and
  expense-allocation sources are unavailable.
- Cost, inventory valuation, blocked capital, landed cost.
- Forecasts, predictions, probabilities; default probability, churn probability, credit
  rating, "will sell / will pay."
- Verified branch/warehouse (material centre), sales territory (customer state), team/
  manager hierarchy, commission (salesperson), brand/manufacturer (product group).
- DSO, DPO, inventory days, cash conversion cycle, complete working capital (only *net
  trade exposure*).
- Warranty/RMA/defect/failure-reason; supplier quality; goods-receipt/OTIF (PO timing is
  linked-voucher timing only); PO order value (unavailable).
- Real-time posting state (reflects latest sync); auto-merge across companies (canonical
  links are explicit + operator-approved).

**Client compatibility (from `MCP_COMPATIBILITY_REPORT.md`; no branded client was signed
in during verification):**
- Official MCP TypeScript SDK 1.29.0 — **Tested successfully** (real-warehouse E2E).
- MCP Inspector 0.22.0 — previous 61-tool build tested; 69-tool rerun **pending**.
- **ChatGPT** custom MCP apps — **automated-flow tested** (CIMD/callback → token → init →
  69-tool discovery → tool call); owner previously reported a successful connection after
  a CSP fix; **branded post-deploy scan pending**. → page: **Available now (dev mode)**.
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

**Distinguish from the sibling product:** Whats91 MCP (`/mcp`,
`mcp.whats91.com/mcp`) = WhatsApp Business data. Busy Accounting MCP (this page,
`busyapi.whats91.com/mcp/v1`) = Busy ERP data. Same platform, different domains; the FAQ
disambiguates and links.

## D2. Security controls (verified — surfaced as B10 copy)

All from `MCP_PUBLIC_GUIDE.md` §14 + compatibility report + SKILL. **Integration/
code-review level, NOT certified** — do not claim certification/pen-test/SOC 2/bank-grade:
- OAuth 2.1 authorization-code + **S256 PKCE**; RFC 9728 protected-resource metadata,
  RFC 8414 AS metadata, DCR, trusted-host **CIMD** (SSRF boundary on CIMD fetch);
  resource/audience + client/redirect binding.
- **Rotating refresh tokens + replay rejection**; access-token revocation; existing-token
  validity/revocation and 2-hour verification cache follow current API behaviour.
- Existing Whats91 token reused; stored **AES-256-GCM encrypted in Redis**; CSRF-protected
  consent; token never in URL/args/logs/chat/screenshots.
- **Tenant-bound sessions**, cross-tenant rejection; **PostgreSQL row-level security**;
  company/FY scope enforced in DB; no `user_id` accepted from the client.
- **Read-only** surface; strict JSON schemas; unknown properties rejected; no SQL/table/
  write/ingestion.
- Host/Origin/HTTPS protections; rate limiting; timeout + response caps; malformed/
  oversized request rejection; safe errors.
- Exports: signed, **short-lived** CSV download links; export rows never injected into
  model context; treat links as temporary bearer capabilities (don't log/email/persist).
- HTTPS-only; enter the token only on the HTTPS `busyapi.whats91.com` authorization page;
  review AI answers against structured tool data before financial/collection decisions.

## D3. Component reuse & new components

**Reuse as-is** (`src/components/shared`): `Container`, `Section` (tones), `SectionHeader`,
`Eyebrow`, `CTAGroup`/`PrimaryCTA`/`SecondaryCTA`, `IconBadge`, `FeatureCard`, `StatCard`,
`TrustPill`, `Reveal`, `AnimatedNumber`, `BrandLogo`. SEO: `JsonLd` + `generatePageMetadata`
/ `generateBreadcrumbSchema` / `generateFAQSchema` / `generateSoftwareApplicationSchema`.

**Reuse (additive edits only):** `Footer.tsx` (add a "Busy Accounting MCP" Resources
link next to the existing "Whats91 MCP" one), `sitemap.ts` (add the route),
`src/app/features/page.tsx` (optional: a Busy-MCP card), homepage `IntegrationsBand`
(optional additive link — do **not** restructure). Do **not** modify the existing `/mcp`
page except, optionally, a single "See also: Busy Accounting MCP" cross-link.

**Pattern references (do not modify):** existing `src/components/landing/mcp/*`
(`McpHeroScene`, `McpCapabilityGrid`, `McpStatusPill`, `McpClientCard`, `McpComparison`,
`McpExamplePrompt`, `McpFlowSteps`, `McpTrustGrid`, `McpArchitectureDiagram`, `McpFaq`) —
the closest DNA; build **new, Busy-specific** siblings, don't import/rename these.
`IntegrationsBand`, `PlatformPillars` (esp. `CampaignJourneyScene`/`BentoCapabilities`
for the command-center mock idioms), `DeveloperBand` (ink band styling).

**New components** (`src/components/landing/busy-mcp/`):
`BusyMcpHeroScene`, `BusyMcpStatusPill`, `BusyMcpClientCard`, `BusyMcpComparison`,
`BusyMcpCapabilityGrid` (+ optional `BusyMcpCapabilityCard`), `BusyMcpExamplePrompt`
(client island: clipboard + analytics hook), `BusyMcpCommandCenter` (the signature mock),
`BusyMcpFlowSteps`, `BusyMcpTrustGrid`, `BusyMcpBoundaries` (the B11 "doesn't do" grid),
`BusyMcpArchitectureDiagram`, `BusyMcpFuture`, `BusyMcpFaq`, and `busyMcpContent.ts` (the
single typed content source — cards, prompts, FAQ, boundaries, statuses).

> Risk control: **do not alter behaviour** of homepage/shared/existing-`mcp` components —
> only *additive* nav/footer links and *new* `busy-mcp` components.

## D4. Content model (`busyMcpContent.ts`)

Single source of truth; the same FAQ array feeds both the visible FAQ and the FAQ JSON-LD
(mirror the existing `mcpContent.ts` pattern exactly). Suggested types:

```ts
type BusyMcpStatus = "available" | "rolling" | "limited" | "planned";

interface BusyMcpClient {
  id: "chatgpt" | "claude" | "claude_code" | "dev_clients" | "gemini_cli" | "other";
  name: string; status: BusyMcpStatus; headline: string; detail: string;
}
interface BusyMcpCapability {
  id: string; category: string; title: string; line: string;
  status: BusyMcpStatus; icon: LucideIcon;     // status = "available" for all live groups
}
interface BusyMcpPrompt {
  id: string; department: string; text: string; answer?: string; status: BusyMcpStatus;
}
interface BusyMcpBoundary { id: string; icon: LucideIcon; title: string; line: string; }
interface BusyMcpStep { n: number; title: string; body: string; }
interface BusyMcpTrustItem { id: string; icon: LucideIcon; title: string; line: string; }
interface BusyMcpHorizon { id: "today" | "rolling" | "planned"; label: string; title: string; body: string; }
interface BusyMcpFaqItem { id: string; q: string; a: string; }  // single source for FAQ + schema

const busyMcpAccess = {
  primaryLabel: "Connect Busy MCP",
  primaryHref: "/contact?subject=" + encodeURIComponent("Busy Accounting MCP Access"),
  secondaryLabel: "See how it works", secondaryHref: "#how-it-works",
  endpoint: "https://busyapi.whats91.com/mcp/v1",
} as const;
```

All copy in D-cited, evidence-safe language. `busyMcpAccess.primaryHref` mirrors the
`/mcp` page's contact-with-subject pattern unless OD-6 defines a Busy-specific flow.
Add "Busy Accounting MCP Access" to the contact form's subject options (it already has
"Whats91 MCP Preview Access").

## D5. Asset inventory

| Asset | Location | New? | Notes |
|---|---|---|---|
| Whats91 mark | `shared/BrandLogo.tsx` | reuse | hub base |
| Busy hub / ₹ ledger node | — | **new** inline SVG/CSS | build from brand tokens + `IndianRupee`/`ScrollText`; no third-party Busy logo |
| AI-client chips | — | **new** neutral text/monograms | **no** ChatGPT/Claude/Gemini logo assets (OD-8 parity with `/mcp`) |
| Hero scene, command-center mock, architecture diagram | — | **new** inline SVG/CSS | decorative or `aria-label`; reduced-motion static |
| Capability/trust/boundary icons | `lucide-react` | reuse | decorative (`aria-hidden`) |
| OG image | `public/og-busy-mcp.png` (1200×630) | **new if pipeline available** | else reuse existing OG fallback + document pending |

**Brand caution:** any third-party AI/Busy logos must be official assets used per each
owner's guidelines; **default to neutral name chips** (matches the `/mcp` page's OD-8
decision). No implied partnership/endorsement with OpenAI, Anthropic, Google, or Busy.

## D6. Sonnet implementation handoff

- **Route:** `src/app/busy-accounting-mcp/page.tsx` (or `src/app/solutions/busy-accounting-mcp/page.tsx`
  per OD-1) — **server component**; `metadata` via `generatePageMetadata({ title,
  description, keywords, path })` + `alternates.canonical`; inject JSON-LD via `JsonLd`
  (`generateBreadcrumbSchema` Home›Busy Accounting MCP, `generateFAQSchema(faq)`,
  `generateSoftwareApplicationSchema({ name:"Busy Accounting MCP",
  applicationCategory:"BusinessApplication", url })`).
- **New components:** `src/components/landing/busy-mcp/*` (D3) + `busyMcpContent.ts`.
- **Additive:** add route to `sitemap.ts`; add Footer "Busy Accounting MCP" link; add the
  contact subject option; optional Features card; optional homepage/`/mcp` cross-links.
  Generate `public/og-busy-mcp.png` if the approved workflow exists.
- **Component hierarchy:**
```
app/busy-accounting-mcp/page.tsx (server)
├── JsonLd (breadcrumb + FAQ + SoftwareApplication)
├── Header (reuse)
├── main
│   ├── BusyMcpHero (brand-soft) → BusyMcpHeroScene, CTAGroup, client status chips
│   ├── BusyMcpProblem (default)
│   ├── BusyMcpComparison (surface)
│   ├── BusyMcpWhatIs (default)            // 40–55-word snippet + "this is NOT"
│   ├── BusyMcpClients (surface) → BusyMcpClientCard × n
│   ├── BusyMcpCapabilities (default) → BusyMcpCapabilityGrid (bento) + mid CTA
│   ├── BusyMcpExamples (surface) → BusyMcpExamplePrompt × n (by department)
│   ├── BusyMcpCommandCenter (default) → the signature mock
│   ├── BusyMcpHowItWorks (surface) → BusyMcpFlowSteps
│   ├── BusyMcpTrust (default) → BusyMcpTrustGrid
│   ├── BusyMcpBoundaries (surface) → the "doesn't do" grid
│   ├── BusyMcpArchitecture (ink) → BusyMcpArchitectureDiagram + endpoint chip
│   ├── BusyMcpFuture (default) → BusyMcpFuture (Today/Rolling/Planned)
│   ├── BusyMcpFaq (surface) → BusyMcpFaq
│   └── BusyMcpFinalCta (brand) → CTAGroup + legal links (/privacy#ai-mcp, /terms#ai-mcp)
└── Footer (reuse)
```
- **Server/client boundaries:** server for all content; client islands only for
  `BusyMcpExamplePrompt` (clipboard), `BusyMcpFaq` (accordion), an endpoint "copy"
  button, and the hero **only if** interactive (prefer pure-CSS).
- **Accessibility checklist:** one `<h1>`; logical H2/H3; sections `aria-labelledby`;
  decorative scenes/mock `aria-hidden` (or `aria-label` summarising the pipeline);
  monograms have text; status conveyed by **text** not colour alone; keyboard-operable
  CTAs/accordion/copy/tooltips with visible focus; WCAG-AA contrast incl. amber "Limited"
  pill and the `ink` band; INR figures use `tabular-nums`; `prefers-reduced-motion`
  freezes all motion to legible states; no keyboard trap; command-center mock and
  architecture diagram scroll inside their own container.
- **Motion:** namespaced `busymcp-*` keyframes in `globals.css`; **do not** touch
  existing `mcp-*` or homepage keyframes.
- **Testing:** `npx eslint` (clean) · `npx tsc --noEmit` (no new errors; ignore the
  pre-existing `redis.ts`/`webhooks/github`/`examples/*` failures) · `npx next build`
  (route prerenders static) · verify one H1, self-canonical, unique title/desc, OG
  present, in sitemap, FAQ schema text == visible, JSON-LD parses · reduced-motion +
  mobile (375) + desktop screenshots · no console errors (note: the in-app `seed`
  browser tab may show *stale* HMR errors from earlier edits — verify on a fresh tab).
- **Visual QA:** feels native (tone/spacing/type == homepage & `/mcp`); tonal alternation
  intact; reads as a *sibling*, not a clone; ChatGPT "Available", Claude/Code "Rolling
  out", Gemini "Limited (CLI)", **no Grok**; **no profit/margin/cost/forecast anywhere**;
  read-only stated prominently; INR/GST/FY framing; mobile hero flow + command-center
  legible; no 320px overflow.
- **Known uncertainties:** final route (OD-1); the §7 "65 vs 67 read-only" doc conflict
  (OD-2); Grok inclusion (OD-3); whether to show ChatGPT as "Available now" vs a softer
  "developer-mode preview" given the pending branded scan (OD-4); access/CTA destination
  (OD-6); dedicated OG image (OD-9).
- **Do-not-touch:** existing `/mcp` page behaviour and its `mcp/*` components;
  `IntegrationsBand`/`PlatformPillars`/`DeveloperBand` behaviour; backend Busy MCP server;
  the Busy Retrieval APIs. Do not invent capabilities/clients/stats/certifications.

## D7. Product-owner decisions required

| ID | Question | Impact |
|---|---|---|
| OD-1 | Route: `/busy-accounting-mcp` (recommended) vs `/solutions/busy-accounting-mcp`? | URL, canonical, sitemap, internal links |
| OD-2 | Confirm **69 tools = 67 read + 2 export** and correct the `MCP_PUBLIC_GUIDE.md` §7 "sixty-five" wording | accuracy of any tool-count claim |
| OD-3 | **Grok:** omit (recommended, no evidence) or provide a tested path? | client card accuracy / A5 |
| OD-4 | ChatGPT label: "Available now (developer mode)" vs softer "developer-mode preview" given the pending branded post-deploy scan | compatibility-claim governance |
| OD-5 | Public developer/integration-docs URL for the B12 CTA (else link `#how-it-works` + contact) | developer CTA |
| OD-6 | Access flow: contact-with-subject (like `/mcp`) vs a dedicated Busy-MCP request/self-serve flow | primary CTA + analytics |
| OD-7 | Confirm the security wording (controls described, **no** certification claim) | trust section governance |
| OD-8 | Legal/brand approval for any AI/Busy logos (else neutral name chips) | trademark compliance |
| OD-9 | Generate a dedicated `og-busy-mcp.png` now, or ship with the existing OG fallback? | social/SEO polish |
| OD-10 | Analytics destination for `busy_mcp_*` events (or leave no-op hooks like `/mcp`) | tracking wiring |
| OD-11 | Header nav: add a top-level entry now, or keep discovery via Footer/Features/Solutions only? | nav prominence vs clutter |
| OD-12 | Approve the supporting blog cluster (C2) and publish order | SEO authority program |

## D8. Implementation order (minimise rework)

*Truth → structure → style → motion → responsive → SEO → a11y → performance.*

1. **Content + types + skeleton.** `busyMcpContent.ts` (all copy, statuses, prompts,
   boundaries, FAQ — locks A5 accuracy) + `page.tsx` with static sections in B0 order
   using shared `Section`/`SectionHeader`/`Container`.
2. **SEO metadata + JSON-LD + sitemap + nav/footer + contact subject.** Wire metadata,
   Breadcrumb/FAQ/SoftwareApplication schema (FAQ sourced from content), add route to
   sitemap, additive Footer link, contact subject option.
3. **Core sections & premium cards (static).** `BusyMcpClientCard`,
   `BusyMcpCapabilityGrid`, `BusyMcpComparison`, `BusyMcpTrustGrid`, `BusyMcpBoundaries`,
   `BusyMcpFlowSteps`, `BusyMcpFuture`, `BusyMcpFaq`, `BusyMcpStatusPill`, CTAs — fully
   styled, no animation.
4. **Signature visuals + animation.** `BusyMcpHeroScene`, `BusyMcpCommandCenter`,
   `BusyMcpArchitectureDiagram` + card/scroll micro-interactions, all pure CSS/SVG,
   namespaced `busymcp-*`.
5. **Responsive polish.** Every breakpoint (§C4); orbital→vertical hero; mock &
   architecture scroll-safe; no 320px overflow.
6. **SEO/GEO finalization.** Definition-paragraph snippet, alt text, OG image (OD-9),
   `llms.txt` entry, internal links, entity consistency.
7. **Accessibility.** Full checklist (D6): headings, aria, focus, contrast (ink + amber),
   reduced-motion freeze, keyboard paths, tooltips, `tabular-nums`.
8. **Performance & QA.** CWV pass, lazy-load, no offscreen animation; lint/type/build;
   cross-device + reduced-motion screenshots; visual QA vs homepage & `/mcp`; confirm
   **zero** profit/margin/cost/forecast language.

## D9. Acceptance criteria

- `/busy-accounting-mcp` (or OD-1 route) live, indexable, self-canonical, in sitemap,
  breadcrumb Home›Busy Accounting MCP; one H1; logical headings.
- All B sections present; reads as a **sibling** of `/mcp`, not a copy; native
  tone/spacing/type.
- **Read-only stated prominently;** the B11 "doesn't do" section present.
- **Accuracy (A5) fully honored:** no profit/margin/cost/valuation/forecast anywhere;
  material centre ≠ branch, state ≠ territory, salesperson ≠ commission; no DSO/DPO/CCC;
  no warranty/defect; no SQL/write claims.
- Client statuses correct: ChatGPT **Available** (dev mode; OD-4 wording), Claude & Claude
  Code **Rolling out**, dev clients **Rolling out**, Gemini **Limited (CLI)**, others
  **Planned**; **no Grok**.
- Security wording uses only verified controls; **no** certification/pen-test/bank-grade.
- Endpoint shown correctly: `busyapi.whats91.com/mcp/v1`.
- FAQ visible text == FAQ JSON-LD; JSON-LD parses; SoftwareApplication has no ratings/price.
- Desktop/tablet/mobile polished; no 320px overflow; command-center & architecture scroll
  safely; INR figures legible.
- Reduced motion complete and legible; a11y checklist satisfied.
- Lint + type-check + build pass (pre-existing unrelated failures documented separately).
- **No** homepage / shared / existing-`/mcp` / backend behaviour changed — additive only.

---

### One-paragraph brief for the builder

Build `/busy-accounting-mcp` as a premium, read-only "AI layer for Busy Accounting"
landing page — a sibling to `/mcp` using the same design system and shared primitives,
but with its own Busy "answer scene" hero, an Executive Command Center mock, department-
tagged prompt examples in INR/GST/Indian-FY language, and a dedicated "what it
deliberately doesn't do" section. Everything must be evidence-backed (D1): 69 read-only
tools (67 read + 2 non-destructive CSV exports) over MCP `2025-11-25` at
`busyapi.whats91.com/mcp/v1`; ChatGPT available in developer mode, Claude/Claude Code/dev
clients rolling out, Gemini CLI limited, no Grok; OAuth 2.1 + PKCE + RLS + tenant
isolation + encryption at rest, described but never "certified." Never imply profit,
margin, cost, forecasts, verified branches/territories, or write access. Content lives in
one typed `busyMcpContent.ts` that also feeds the FAQ schema; the page is a server
component with tiny client islands for copy/accordion; motion is pure CSS/SVG namespaced
`busymcp-*`; additive nav/footer/sitemap/contact changes only.
