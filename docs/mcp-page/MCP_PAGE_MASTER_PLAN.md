# Whats91 MCP Landing Page — Master Blueprint (v2)

> **Version 2 — product-first refinement.** v1 was a technically excellent
> architecture spec; v2 re-frames it as a premium, homepage-quality SaaS landing
> blueprint **without removing any verified technical content**. Low-level details
> (OAuth, PKCE, JSON-RPC, tool registry, token rotation) now live in **Part D —
> Evidence, Reference & Sonnet Handoff**; the visitor-facing plan (Parts A–B)
> leads with *value*, *outcomes*, and *trust*.
>
> **Still planning/documentation only. No page code written; no `src/` file
> touched.** Implementation to be completed by Claude Sonnet using this document.
>
> **Sources of truth:** the MCP program docs in `../../whats91_project/docs/mcp/`
> (separate repo) and this website repo. **Build convention:**
> [`docs/STATIC_PAGE_GUIDE.md`](../STATIC_PAGE_GUIDE.md).
> **Date:** 2026-07-20.

---

## How to read this document

- **Part A — Strategy & story** (positioning, narrative arc, audience psychology,
  the honesty guardrail). *Read first.*
- **Part B — The page, section by section** (product-first copy + ASCII
  wireframes). *This is the page.*
- **Part C — Craft** (conversion, SEO, motion, responsive, performance, analytics,
  visual system).
- **Part D — Evidence, reference & handoff** (all verified repository research,
  security validation, component reuse, assets, competitor refs, PO decisions,
  Sonnet handoff, **and the new Sonnet Implementation Order**).

### Table of contents
- A1 One-line positioning · A2 The story arc · A3 Audience & psychology · A4 The
  5-5-5 message hierarchy · A5 The honesty guardrail (accuracy that cannot be
  broken)
- B0 Page flow & tone map · B1 Hero · B2 The problem · B3 Before/After · B4 What is
  MCP · B5 Supported AI clients · B6 Capabilities (bento tiers) · B7 Live prompt
  examples · B8 How it works · B9 Trust & control · B10 Future vision · B11
  Architecture (the one dev moment) · B12 Availability & roadmap · B13 FAQ · B14
  Final CTA
- C1 Conversion & CTA map · C2 SEO (incl. AI Overviews, entity, snippets, blog
  cluster) · C3 Animation & interaction system · C4 Responsive · C5 Performance ·
  C6 Analytics · C7 Visual system & premium guardrails
- D1 Repository evidence · D2 Security controls (verified) · D3 Component reuse ·
  D4 Assets · D5 Competitor/inspiration refs · D6 Sonnet implementation handoff ·
  D7 Product-owner decisions · **D8 Sonnet Implementation Order** · D9 Acceptance

---
---

# PART A — Strategy & story

## A1. One-line positioning

> **"Ask your AI assistant about your WhatsApp business — and get real answers
> from your own Whats91 account."**

Whats91 MCP is the **AI access layer** for a Whats91 account: it lets the AI
assistants a team already uses (ChatGPT, Claude, Grok, Gemini) securely reach
approved Whats91 data and tools, so people can *ask instead of dig*.

Category framing for the page: **"the AI layer for your WhatsApp business."** Not a
developer tool, not documentation — a product capability that turns dashboards
into conversations.

## A2. The story arc (why the page is ordered the way it is)

The page tells a story, not a feature list. Each section answers the question the
previous one raises:

```
   PROBLEM            "I run my business on WhatsApp, but answers live in dashboards."
      ↓
   THE PAIN           "Filtering, exporting, screenshotting, copy-pasting — every day."
      ↓
   THE SHIFT          "What if I could just ask? In the AI I already use?"
      ↓
   WHATS91 MCP        "Connect your assistant to your Whats91 account. Ask. Get real answers."
      ↓
   SUPPORTED AI       "ChatGPT, Claude, Grok, Gemini — the tools your team already opens."
      ↓
   CAPABILITIES       "Message performance today. Contacts, templates, campaigns rolling out."
      ↓
   REAL EXAMPLES      "See the actual questions you'd ask — and the answers you'd get."
      ↓
   TRUST              "You approve every permission. No database access. Disconnect anytime."
      ↓
   HOW / ARCHITECTURE "For the technical reader: exactly how the secure connection works."
      ↓
   FUTURE VISION      "Where this goes: the AI layer for your whole Whats91 stack."
      ↓
   FAQ → CTA          "Answer the last doubts, then invite them into the preview."
```

Emotional beats: **recognition** (B2 problem) → **relief** (B3 before/after) →
**clarity** (B4) → **confidence** (B5 clients) → **excitement** (B6/B7) →
**safety** (B9) → **ambition** (B10) → **commitment** (B14).

## A3. Audience & psychology

| Persona | What they secretly want | What they fear | The page must… |
|---|---|---|---|
| **Business owner / ops lead** (primary) | "Just tell me my numbers without me hunting for them." | "Is my customer data safe? Is this a gimmick?" | Lead with outcomes + reassurance; hide the plumbing. |
| **Marketing / support manager** | Faster answers, fewer tabs, less waiting on reports. | Learning a new tool; being oversold. | Concrete prompts in their language; honest availability. |
| **Developer / technical evaluator** (secondary) | "Is this real, standards-based, and secure?" | Hand-wavy security; lock-in; toy demos. | One credible architecture moment + real docs link. |

Design implication: **95% of the page speaks to non-technical readers.** The
developer gets exactly one dense, satisfying section (B11) and the appendix (Part D).

## A4. The 5-5-5 message hierarchy (hero discipline)

The hero must land three messages in fifteen seconds:

- **First 5s — "What is this?"** → *Connect your AI assistant to your Whats91
  WhatsApp business account.*
- **Next 5s — "What can I do?"** → *Ask business questions in plain language and
  get real answers from your own data.*
- **Next 5s — "Can I trust it?"** → *You approve every permission. No database
  access. Disconnect anytime.*

Everything in the hero (headline, sub, chips, visual, CTA) serves one of these
three beats. Nothing else.

## A5. The honesty guardrail (non-negotiable accuracy)

This product is in **private preview**, and the page's credibility depends on
never overstating it. These constraints override any marketing instinct (full
evidence in **Part D1/D2**):

1. **Only one business capability is live today:** the **WhatsApp Message Report
   Summary** (delivery analytics) plus connection diagnostics. Everything else is
   **Rolling out** or **Coming soon** — always labeled.
2. **No provider is formally certified.** ChatGPT is *product-owner-reported*
   working (for the report tool); Claude Code/Web and Grok are *in verification*;
   **Gemini is Limited**. All formal compatibility runs are currently pending.
3. **It's "xAI Grok," never "Groq."**
4. **Out of scope — never imply:** accounting/sales reports, orders, payments,
   receivables, "top customers," "best-selling products," Google Sheets export,
   or company/financial-year selection. (MCP covers *WhatsApp Business Platform*
   data, not ERP finance.)
5. **Security is code-reviewed, not pen-tested/certified** — describe controls,
   never claim "bank-grade," "military-grade," or a certification.
6. **"Whats91 MCP" ≠** the site's `/api/mcp` content endpoint **≠** the legacy
   dashboard "MCP Tools (Beta)." Disambiguate (FAQ).

> Marketing tone is welcome; **inflation of current capability is not.** Every
> capability card and client chip carries an explicit status pill.

---
---

# PART B — The page, section by section

## B0. Page flow & section tone map

Product-first order (13 sections + hero). Tones alternate so no two same-shade
sections touch; one dark "ink" developer moment; brand-soft hero and CTA
bookends.

| # | Section | Purpose | `Section` tone |
|---|---|---|---|
| — | **B1 Hero** | What / can-I / trust in 15s | `brand-soft` |
| 1 | **B2 The problem** ("Sound familiar?") | recognition of the pain | `default` |
| 2 | **B3 Before / After** | the relief, visualized | `surface` |
| 3 | **B4 What is Whats91 MCP** | plain definition + "this is NOT" | `default` |
| 4 | **B5 Supported AI clients** | credibility + honest status | `surface` |
| 5 | **B6 Capabilities (bento tiers)** | excitement, Today/Rolling/Soon | `default` |
| 6 | **B7 Live prompt examples** | proof by conversation | `surface` |
| 7 | **B8 How it works** | 4 friendly steps | `default` |
| 8 | **B9 Trust & control** | safety, icon-led | `surface` |
| 9 | **B10 Future vision** | ambition, Today/Next/Future | `default` (with brand accents) |
| 10 | **B11 Architecture** | the one developer moment | **`ink`** (dark) |
| 11 | **B12 Availability & roadmap** | honest expectations | `default` |
| 12 | **B13 FAQ** | last doubts + SEO | `surface` |
| — | **B14 Final CTA** | commitment | brand band |

**Status-pill system (used across B5, B6, B7, B12):**

| Pill | Meaning | Style |
|---|---|---|
| **Available now** | Live; ChatGPT-reported working (report tool + diagnostics) | solid brand-primary |
| **Rolling out** | Built/registered, in provider verification (Claude/Grok; contacts/templates/campaigns read) | brand outline |
| **Limited** | Constrained/provider-dependent (Gemini Enterprise) | amber outline + tooltip |
| **Coming soon** | Roadmap, not enabled (chatbots, flows, catalog, writes) | neutral/muted |

---

## B1. Hero — *"Your WhatsApp business, answerable by AI."*

**Objective:** land the 5-5-5 hierarchy; feel premium and memorable; invite action.

**Copy (recommended):**
- **Eyebrow:** `Whats91 MCP · Private preview`
- **H1 (pick one; rec. first):**
  - **"Your WhatsApp business, answerable by AI."**
  - alt: "Ask your AI assistant about your WhatsApp business."
  - alt: "Bring your Whats91 data into ChatGPT, Claude, Grok & Gemini."
- **Sub (the "what can I do"):** "Connect the AI assistant your team already uses
  to your Whats91 account. Ask questions in plain language — *'How did today's
  messages perform?'* — and get real answers from your own data."
- **Trust line (the "can I trust it"):** "You approve every permission · No
  database access · Disconnect anytime."
- **Primary CTA:** **"Join the MCP preview"** → request-access (OD-6).
- **Secondary CTA:** **"See how it works"** → `#how-it-works` (in-page scroll).
- **Client chips (with status):** `ChatGPT · Available now` · `Claude Code · Rolling
  out` · `Grok · Rolling out` · `Gemini · Limited`.

**Hero visual:** the **MCP connection scene** (storyboard in C3) — Whats91
`BrandLogo` hub center, four AI-client chips around it, one **secure, consent-gated
connection** animating a question out and a **result card** back. Teaches the
product; never implies an open pipe.

### Wireframe — desktop hero

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [ Whats91 logo ]        Solutions  Features  Free Tools  Pricing  ...  ⌂  │  ← reused Header
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ● Whats91 MCP · Private preview                                          │
│                                                     ╭──────────────────╮   │
│   Your WhatsApp business,                           │   ChatGPT ●       │   │
│   answerable by AI.                                 │        ╲          │   │
│                                                     │   Claude ●──▶ (91)│   │  ← animated
│   Connect the AI assistant your team already        │        ╱   hub  ◀─│   │    connection
│   uses to your Whats91 account. Ask in plain        │   Grok ●    │     │   │    scene
│   language and get real answers from your data.     │   Gemini ○  ▼     │   │
│                                                     │   [ 🔒 approved ] │   │
│   [ Join the MCP preview ]  [ See how it works ]    │   ┌───────────┐   │   │
│                                                     │   │Delivered  │   │   │  ← result card
│   ✓ You approve permissions  ✓ No DB access         │   │9,540 · 82%│   │   │    returns
│   ✓ Disconnect anytime                              ╰──────────────────╯   │
│                                                                            │
│   [ChatGPT ·now] [Claude ·rolling] [Grok ·rolling] [Gemini ·limited]       │  ← status chips
└──────────────────────────────────────────────────────────────────────────┘
```

### Wireframe — mobile hero

```
┌───────────────────────┐
│ [logo]            ≡    │
├───────────────────────┤
│ ● Whats91 MCP·Preview  │
│                        │
│ Your WhatsApp          │
│ business, answerable   │
│ by AI.                 │
│                        │
│ Connect your AI        │
│ assistant to Whats91.  │
│ Ask. Get real answers. │
│                        │
│ [ Join the preview ]   │  ← full-width
│ [ See how it works ]   │
│                        │
│ ✓ You approve  ✓ No DB │
│ ✓ Disconnect anytime   │
│                        │
│   ┌─────────────────┐  │
│   │  ChatGPT ●      │  │  ← vertical
│   │      │          │  │    mini-flow
│   │  [🔒 approved]  │  │    (client →
│   │      │          │  │     lock →
│   │    ( 91 ) hub   │  │     hub →
│   │      │          │  │     result)
│   │  ┌──────────┐   │  │
│   │  │Delivered │   │  │
│   │  │9,540·82% │   │  │
│   │  └──────────┘   │  │
│   └─────────────────┘  │
│ [ChatGPT][Claude]      │  ← 2×2 status
│ [Grok][Gemini·ltd]     │    chips
└───────────────────────┘
```

**Reduced-motion / a11y:** visual is `aria-hidden`; message is fully in the text.
Frozen state = a legible static diagram (client → lock → hub → result).

---

## B2. The problem — *"Sound familiar?"*

**Objective:** recognition. Make the reader feel seen before selling anything.

**Heading:** *"You run your business on WhatsApp. Your answers shouldn't be this hard."*
**Copy:** "Your customers, campaigns, and conversations live on WhatsApp. But every
time you need a number, you're back in dashboards — filtering, exporting,
screenshotting, and pasting it somewhere else. The data is yours. Getting to it
shouldn't cost you an afternoon."

**Three pain cards (icon + one line):**
- 🔍 *"Which report was that in again?"* — answers scattered across screens.
- ⏳ *"Give me a minute to pull that up."* — manual filtering and exporting.
- 📋 *"Let me copy this into a message."* — data trapped, re-typed, out of date.

**Wireframe:**
```
        You run your business on WhatsApp.
        Your answers shouldn't be this hard.
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │  🔍      │   │  ⏳      │   │  📋      │
   │ Scattered│   │ Manual   │   │ Trapped  │
   │ reports  │   │ exports  │   │ data     │
   └──────────┘   └──────────┘   └──────────┘
```

---

## B3. Before / After — the relief, visualized

**Objective:** the emotional turn — from friction to flow — in one glance.

**Heading:** *"From digging for data to just asking."*
Two columns, visually distinct (muted/grey "Without" vs brand-green "With").

| Without Whats91 MCP | With Whats91 MCP |
|---|---|
| Open the dashboard, filter, export | Ask: *"How did today's messages perform?"* |
| Manual reports & screenshots | Natural-language answers, in seconds |
| Copy-paste between tools | Live business context, right in your AI |
| Build against raw APIs | AI-ready, permission-scoped tools |
| Hope you're reading the right number | Answers from *your* account, scoped to you |

> Accuracy note: keep "With" examples anchored to **reporting** (the live tool) or
> mark rolling-out ones. Do not imply sales/accounting answers.

**Wireframe:**
```
   From digging for data → to just asking.
 ┌───────────────── WITHOUT ────────────────┐   ┌──────────────── WITH ─────────────────┐
 │ ✕ Open dashboard, filter, export          │   │ ✓ "How did today's messages perform?" │
 │ ✕ Manual reports & screenshots            │──▶│ ✓ Natural-language answers in seconds │
 │ ✕ Copy-paste between tools                │   │ ✓ Live business context in your AI    │
 │ ✕ Build against raw APIs                  │   │ ✓ AI-ready, permission-scoped tools   │
 └───────────────────────────────────────────┘   └───────────────────────────────────────┘
        (grey / muted)                                    (brand-green / elevated)
```

---

## B4. What is Whats91 MCP? (plain-language)

**Objective:** define MCP in one breath; draw the key security distinction.
**Heading:** *"What is Whats91 MCP?"*
**Copy:** "MCP (Model Context Protocol) is an open standard that lets AI
assistants safely use outside tools and data. **Whats91 MCP** is our secure
implementation: connect a supported assistant once, sign in with Whats91, and
approve exactly what it may access. From then on, it can ask for approved
information — like your message-delivery report — and get a real answer from your
own Whats91 account."

**"This is NOT" strip (4 reassurance cards):**
- ✕ Not direct database access → ✓ a fixed set of approved tools
- ✕ Not shared passwords or keys → ✓ a secure, revocable sign-in
- ✕ Not an open, unrestricted API → ✓ only what you approve
- ✕ Not manual exports & copy-paste → ✓ live, in-context answers

*Microcopy:* "Open standard · spec revision 2025-11-25."

---

## B5. Supported AI clients (honest, premium)

**Objective:** credibility through the assistants they already use — with truthful
status that reads as *transparent*, not *broken*.
**Heading:** *"Works with the AI assistants your team already opens."*

**Four premium client cards** (real brand assets per D4 policy; else neutral name
chips):

| Client | Status | Headline | Detail |
|---|---|---|---|
| **ChatGPT** | **Available now** | "Add Whats91 in ChatGPT developer mode." | Sign-in and the message-report tool are working; more tools roll out through the preview. |
| **Claude Code** *(+ Claude Web)* | **Rolling out** | "Add Whats91 as an MCP connector." | Standards-based connection; verification in progress. |
| **xAI Grok** | **Rolling out** | "Connect via the xAI Remote MCP API." | API path targeted; the grok.com UI connector isn't supported yet. |
| **Gemini** | **Limited** ⓘ | "Available for Gemini Enterprise." | Enterprise-only Custom MCP Server; some actions must be enabled manually in Google. Capabilities may vary. |

**Footnote:** "We verify compatibility with each provider during the preview;
statuses update as verification completes."
Gemini card gets an amber pill + tooltip (never red/error styling).

**Wireframe:**
```
   Works with the AI assistants your team already opens.
 ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
 │ [ChatGPT]   │ │ [Claude]    │ │ [Grok]      │ │ [Gemini]    │
 │ ●Available  │ │ ○Rolling out│ │ ○Rolling out│ │ ▲Limited ⓘ  │
 │ Add in dev  │ │ MCP         │ │ xAI Remote  │ │ Enterprise  │
 │ mode        │ │ connector   │ │ MCP API     │ │ only        │
 └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

---

## B6. Capabilities — bento tiers (Today / Rolling out / Coming soon)

**Objective:** make capability feel *exciting* and *organized*, with unmistakable
availability. Premium **bento grid**, not long text. Each category has its own
icon + accent so it's scannable.

**Heading:** *"What you can ask — and what's coming next."**
**Sub:** "Start with message performance today. New capabilities light up through
the preview."

**Tier 1 — Available today** (solid brand accent):
- 📊 **Message performance** — delivered, read, failed, pending, by day, for any
  range in the last 92 days.
- 🩺 **Connection health** — confirm who's connected and that the link is live.

**Tier 2 — Rolling out** (brand outline):
- 👥 **Contacts & contact books** — list, search, counts, membership.
- 🧾 **Templates** — find approved templates, status, previews.
- 📣 **Campaigns (read)** — status, audience size, results, failures.
- 🖼 **Media library** — browse and search saved media.
- 🗂 **Forms** — list and preview WhatsApp Forms.

**Tier 3 — Coming soon** (muted):
- 🤖 **Chatbots & flows** — inspect and (later) manage automations.
- 🛍 **Catalog & products** — browse and (later) update your catalog.
- ✍️ **Approved actions** — draft campaigns, submit templates — always with a
  confirmation step.

**Hard boundary note (small, honest):** "Whats91 MCP covers your **WhatsApp
Business Platform** data and workflows. It does not access accounting, sales,
orders, or payment data."

**Wireframe — bento capability grid:**
```
   What you can ask — and what's coming next.

 AVAILABLE TODAY ─────────────────────────────────
 ┌───────────────────────┐ ┌───────────────────────┐
 │ 📊 Message performance │ │ 🩺 Connection health   │
 │ delivered·read·failed  │ │ who's connected        │
 │ ●Available now         │ │ ●Available now         │
 └───────────────────────┘ └───────────────────────┘

 ROLLING OUT ─────────────────────────────────────
 ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
 │👥Contacts│ │🧾Templates│ │📣Campaign│ │🖼 Media  │ │🗂 Forms  │
 │ ○rolling │ │ ○rolling │ │ (read)   │ │ ○rolling │ │ ○rolling │
 └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘

 COMING SOON ─────────────────────────────────────
 ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
 │🤖 Chatbots &  │ │🛍 Catalog &   │ │✍️ Approved     │
 │   flows       │ │   products    │ │   actions      │
 │ ·coming soon  │ │ ·coming soon  │ │ ·with confirm  │
 └───────────────┘ └───────────────┘ └───────────────┘

 ── Covers WhatsApp Business data — not accounting, orders, or payments. ──
```

---

## B7. Live prompt examples (proof by conversation)

**Objective:** let visitors *see themselves using it*. Real questions, in their
language, tagged by availability, styled like a chat.

**Heading:** *"Real questions. Real answers from your account."*

Grouped by job-to-be-done; each is a **copyable prompt chip** in a chat bubble,
with an availability pill and a sketched answer:

**Analytics & operations — Available now**
- 💬 "How many WhatsApp messages did we deliver and read today?"
  → *"Today: 9,540 delivered (98%), 7,890 read (82%), 210 failed."*
- 💬 "Which day last week had the most failed messages?"
  → *"Thursday — 640 failed, mostly invalid numbers."*

**Marketing & campaigns — Rolling out**
- 💬 "What's the status and audience size of my latest campaign?" *(rolling out)*
- 💬 "Show delivered vs. read for my Diwali broadcast." *(rolling out)*

**Support & templates — Rolling out**
- 💬 "Find my approved templates for order updates." *(rolling out)*
- 💬 "Do I have a template pending Meta review?" *(rolling out)*

**Contacts — Rolling out**
- 💬 "How many contacts are in my 'VIP' book?" *(rolling out)*

**Automation & catalog — Coming soon**
- 💬 "Draft a re-engagement campaign to my 'Lapsed' book — I'll review before it
  sends." *(coming soon · always confirmed)*
- 💬 "Which catalog products are missing images?" *(coming soon)*

> Do **not** include ERP-style prompts ("top customers by sales," "best sellers,"
> "outstanding payments," "export to Google Sheet") — unsupported (A5/D1).

**Wireframe — chat-style examples:**
```
   Real questions. Real answers from your account.

 [Analytics ·Available now]
  ┌ user ─────────────────────────────────────────┐
  │ 💬 How did today's messages perform?           │  [copy]
  └────────────────────────────────────────────────┘
     ┌ assistant ──────────────────────────────────┐
     │ 9,540 delivered (98%) · 7,890 read (82%) ·   │
     │ 210 failed. Want a day-by-day breakdown?     │
     └──────────────────────────────────────────────┘

 [Marketing ·Rolling out]
  ┌ user ─────────────────────────────────────────┐
  │ 💬 Status & audience of my latest campaign?    │  [copy]
  └────────────────────────────────────────────────┘
```

---

## B8. How it works (four friendly steps)

**Objective:** remove "is this hard to set up?" friction. Business-framed; the
technical version is B11/Part D.
**Heading:** *"Connect in minutes."*

1. **Pick your assistant** — in your Whats91 dashboard, choose ChatGPT, Claude,
   Grok, or Gemini and follow the guided setup.
2. **Sign in with Whats91** — a secure sign-in opens. No passwords or keys are ever
   shared with the assistant.
3. **Approve what it can access** — you see exactly which capabilities are
   requested and approve only what you want.
4. **Ask away** — questions and answers happen right inside your assistant, from
   your own data. Disconnect any time.

*Microcopy:* "Team members need permission to connect. Sign-in stays secure —
Whats91 never shows tokens to you or the assistant."

**Wireframe:**
```
   Connect in minutes.
  ①───────────②───────────③───────────④
  Pick your    Sign in      Approve      Ask away
  assistant    with Whats91 access       (& disconnect
                                          anytime)
```

---

## B9. Trust & control (icon-led, the safety promise)

**Objective:** convert the verified security model (Part D2) into *reassurance*,
not a lecture. Icons + one line each, not paragraphs.
**Heading:** *"Your data. Your rules."*
**Sub:** "Whats91 MCP is built so an AI assistant can only ever do what you allow."

**Eight trust cards (icon + one line):**
- 🔐 **Permission-based** — you approve every capability, individually.
- 🚫 **No database exposure** — assistants use approved tools, never your database.
- 👤 **Scoped to your account** — it can only ever see *your* data.
- ✅ **Secure sign-in** — OAuth-based; no shared passwords or keys.
- 🔀 **Read vs. write separated** — reading can't change anything.
- 🛑 **Confirm before it acts** — changes need an explicit, one-time confirmation.
- 🔁 **Revocable anytime** — disconnect and access ends immediately.
- 📝 **Auditable** — every request is logged, with sensitive values hidden.

*Guardrail:* describe controls plainly; **no** "bank-grade / military-grade /
certified" claims (code-reviewed, pen-test pending — D2).

**Wireframe:**
```
   Your data. Your rules.
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │🔐  │ │🚫  │ │👤  │ │✅  │
 │Perm│ │NoDB│ │Scope│ │OAuth│
 └────┘ └────┘ └────┘ └────┘
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │🔀  │ │🛑  │ │🔁  │ │📝  │
 │R/W │ │Conf│ │Revk│ │Audit│
 └────┘ └────┘ └────┘ └────┘
```

---

## B10. Future vision — *"The AI layer for your whole Whats91 stack."*

**Objective:** communicate ambition and momentum *without* blurring roadmap into
"available." Three clearly separated horizons.
**Heading:** *"This is just the first question."*
**Sub:** "Whats91 MCP is becoming the AI layer across your entire Whats91 account —
one secure connection, more you can ask and do over time."

```
   TODAY                    NEXT                      FUTURE
   ─────                    ────                      ──────
   Ask about your          Ask across contacts,      Safely act — draft
   message performance     templates & campaigns     campaigns, submit
   (live now)              (rolling out)             templates, manage
                                                     catalog — always with
                                                     your confirmation
                                                     (coming soon)
```

*Framing rule:* "Today" uses **Available now** language; "Next"/"Future" use
future tense and pills. Never present Future as usable.

---

## B11. Architecture — the one developer moment (dark `ink` band)

**Objective:** give the technical evaluator a single credible, satisfying section;
keep the marketing page light. This is the **only** place protocol terms appear
prominently on the page.
**Heading:** *"Built on an open standard, secured end to end."*

**One clean diagram:**
```
  AI client ──▶ Secure MCP connection ──▶ Whats91 MCP Gateway
  (ChatGPT/Claude/  (OAuth 2.1 · Streamable   (mcp.whats91.com/mcp)
   Grok/Gemini)      HTTP)                          │
                                                    ▼
                            Permission & scope check ──▶ Approved tool
                                                             │
                                                             ▼
                            Whats91 service (bound to YOUR account) ──▶ scoped result
```

**Copy (concise):** "Your assistant connects over the open **Model Context
Protocol** (spec 2025-11-25). Every request passes an OAuth-secured permission
check, runs an approved, schema-validated tool, and executes inside Whats91's own
services bound to your account — so it only ever returns *your* data. No SQL, no
raw API keys, no cross-account access."

**CTA:** "Read the developer documentation" → docs (OD-5).
Deeper protocol detail (PKCE, DCR, JSON-RPC, token rotation, tool registry) lives
in **Part D** and the developer docs — **not** on the page.

---

## B12. Availability & roadmap (honest expectations)

**Objective:** set correct expectations; no invented release stages.
**Heading:** *"Available today, expanding through the preview."*

**Now / Rolling out / Planned** board (mirrors B6 tiers) + a short note:
"Whats91 MCP is in **private preview**. It may need to be enabled for your account,
and message reporting requires the reporting capability in your subscription. New
capabilities and verified providers are added as the preview progresses."

*(Stage wording pending OD-10; do not invent "beta/GA" labels beyond "private preview.")*

---

## B13. FAQ (trust + SEO; visible text == FAQ schema)

Only evidence-backed answers; PO-dependent ones flagged. Feeds `FAQPage` JSON-LD.

1. **What is Whats91 MCP?** — plain definition (B4).
2. **Which AI assistants can I use?** — ChatGPT (available now), Claude Code/Web
   (rolling out), xAI Grok (rolling out, via the xAI Remote MCP API), Gemini
   (Limited, Enterprise).
3. **Does the AI get direct access to my database?** — No. It uses a fixed set of
   approved, validated tools — never your database or raw APIs.
4. **Is my data isolated to my account?** — Yes. Every request is bound to your
   Whats91 account; it can't reach anyone else's data.
5. **What can it do today?** — Answer questions about your WhatsApp message
   performance, plus connection health. More read capabilities are rolling out.
6. **Can it read sales or accounting reports?** — No. Whats91 MCP covers WhatsApp
   Business Platform data, not accounting, orders, or finance.
7. **Can it send campaigns or submit templates?** — Not yet. Approved write actions
   are coming, and will always require their own permission plus an explicit
   confirmation step.
8. **Why is Gemini "Limited"?** — Gemini support is Enterprise-only, uses a
   pre-registered client, and some actions must be enabled manually in Google; what
   works can vary with Google's current MCP support.
9. **Can I export results to Google Sheets?** — Not through MCP. (Whats91 has a
   separate Google Sheets integration.) *(Confirm — OD-4.)*
10. **Is it "Groq"?** — No — it's **xAI Grok**. (Groq is an unrelated company.)
11. **Is MCP included in my plan?** — It may need enabling for your account, and
    message reporting requires the reporting capability. *(Packaging — OD-3.)*
12. **How do I enable it?** — From your Whats91 dashboard under MCP; you'll need
    connect permission. *(OD-3.)*
13. **Can I revoke access?** — Yes, anytime — disconnect and access ends immediately.
14. **Is this the same as "MCP Tools (Beta)" in my dashboard?** — No; that's a
    separate, older feature. Whats91 MCP is the platform described here. *(OD-2.)*

---

## B14. Final CTA

**Objective:** convert to the correct preview action.
**Heading:** *"Connect your AI assistant to Whats91."*
**Sub:** "Start with your message performance today — and grow into everything
your WhatsApp business can tell you."
**Primary CTA:** "Join the MCP preview" (OD-6). **Secondary:** "Read the docs" (OD-5).
**Reassurance:** "You choose what your assistant can access. Disconnect anytime."

**Wireframe:**
```
 ┌──────────────────────── brand band ────────────────────────┐
 │            Connect your AI assistant to Whats91.            │
 │   Start with message performance today — grow into more.    │
 │        [ Join the MCP preview ]   [ Read the docs ]         │
 │      You choose access · Disconnect anytime                 │
 └─────────────────────────────────────────────────────────────┘
```

---
---

# PART C — Craft (conversion, SEO, motion, responsive, performance, analytics, visual system)

## C1. Conversion strategy & CTA map

One primary conversion (**join the preview**); one secondary (**docs**); repeated
at the right emotional moments — never nagging.

| Placement | CTA | Why it exists |
|---|---|---|
| **Hero (primary)** | Join the MCP preview | capture high-intent visitors immediately |
| **Hero (secondary)** | See how it works | scroll for the not-yet-convinced (keeps them on-page) |
| **After B6 Capabilities (mid-page)** | Join the MCP preview | peak excitement — first natural conversion point |
| **After B9 Trust (mid-page, softer)** | See if my account qualifies / Talk to us | for the reassured-but-cautious |
| **Sticky (mobile only, optional)** | Join the preview | thumb-reachable bar appears after the hero scrolls away; dismissible; respects reduced-motion (no animation) |
| **B11 Architecture** | Read the developer docs | serves the technical evaluator specifically |
| **B14 Final CTA (primary)** | Join the MCP preview | the commitment moment |
| **Footer** | MCP for AI assistants → `/mcp` | ambient discoverability sitewide |

Rules: **one visual primary style** (brand button) reused everywhere; secondary is
ghost/outline. Sticky mobile CTA only if it doesn't cover content or fight the
cookie banner. All CTAs point to the same destination(s) (OD-5/OD-6) so tracking
is clean.

## C2. SEO strategy (v1 spec + v2 growth additions)

**Core (unchanged from v1):**
- **Slug/canonical:** `/mcp` → `https://whats91.com/mcp`. Indexable; add to `sitemap.ts` (~0.9).
- **Primary keyword:** "Whats91 MCP" / "WhatsApp MCP server."
- **Secondary:** "connect WhatsApp data to ChatGPT," "Whats91 ChatGPT integration,"
  "Whats91 Claude Code integration," "WhatsApp Business MCP," "MCP server for
  WhatsApp reports," "AI assistant for WhatsApp Business data," "WhatsApp CRM MCP."
  Verify demand before finalizing; never fabricate metrics. **Never** target
  unofficial/unauthorized-automation terms (official WhatsApp Business Platform).
- **Title:** "Whats91 MCP — Connect Your AI Assistant to WhatsApp Data" (≤~60).
- **Meta description:** "Connect ChatGPT, Claude, Grok, or Gemini to your Whats91
  WhatsApp Business data. Ask in plain language, get real answers, stay in control.
  Private preview."
- **H1:** hero headline (one only). **H2s:** the B-section headings. **H3s:** cards/steps.
- **Schema:** `BreadcrumbList` + `FAQPage` (mirror visible text) +
  **`SoftwareApplication`** (name "Whats91 MCP," category "BusinessApplication,"
  publisher "Wilford Technology"; **no** ratings/prices; **no** `Product`).
- **OG/Twitter:** new `public/og-mcp.png` (1200×630); titles/description per above.
- **Alt text:** meaningful; hero scene decorative (`aria-hidden`); client logos get alt.
- **Entity/brand consistency:** "Whats91 MCP," "xAI Grok," "ChatGPT," "Claude
  Code," "Gemini," "Model Context Protocol," "WhatsApp Business Platform." Never "Groq."
- **Length:** ~1,300–1,900 words of substantive copy; natural usage, no stuffing.

**v2 additions:**

- **Featured-snippet targeting:** structure B4 as a crisp 40–55-word **definition
  paragraph** ("Whats91 MCP is …") directly under an H2 — the shape Google lifts
  for "what is" queries. The B13 FAQ and the B3 comparison table are additional
  snippet surfaces (list/table snippets).
- **AI Overviews / GEO** (the site already runs `llms.txt` + a content MCP): write
  **self-contained, citable answer passages** — each FAQ answer and each capability
  line should stand alone without surrounding context. Keep claims verifiable and
  dated ("as of the private preview"). Add `/mcp` to the site's `llms.txt` priority
  list and consider a passage feed entry (mirrors existing `/api/mcp/pages/*`
  pattern) — *note it's content discovery, not the product MCP* (avoid the
  three-MCP confusion in machine-readable feeds too).
- **Entity optimization:** establish "Whats91 MCP" as an entity — consistent naming
  sitewide, `SoftwareApplication` with `provider`→ the existing Organization
  entity, and `sameAs`/docs links; reference the parent "Whats91 / Wilford
  Technology" entity so the knowledge graph connects the product to the brand.
- **Internal linking (in):** homepage `IntegrationsBand` (AI side) + `DeveloperBand`;
  `/features`; Solutions mega-menu; `/solutions/busy-api`;
  `/features/chat-shortcuts-conversation-automation`; `/chatbot-flows`; footer.
  **(out):** `/solutions/busy-api`, `/pricing`, `/contact`, `/whatsapp-templates`,
  `/chatbot-flows`, developer docs.
- **Supporting blog cluster** (topic authority; create as content, link to `/mcp`):
  1. "What is an MCP server, and why does it matter for WhatsApp Business?"
  2. "How to connect ChatGPT to your WhatsApp Business data (safely)."
  3. "Claude Code + Whats91: query your WhatsApp reports from your terminal."
  4. "MCP security explained: why AI assistants never touch your database."
  Each targets a long-tail query and links up to `/mcp` (hub-and-spoke).
- **Schema caution:** do **not** use `HowTo` schema for B8 (Google retired HowTo
  rich results); keep steps as semantic HTML only.

## C3. Animation & interaction system (expanded)

Match or exceed the homepage: **continuous, subtle, purposeful, always-legible,
reduced-motion-safe.** Pure CSS/SVG (transform/opacity/`background-position`/
`stroke-dashoffset`), mirroring `IntegrationsBand` and the `PlatformPillars`
scenes. **No** WebGL, no JS animation loop, no new library.

**Hero scene storyboard (single ~14s loop, one active client at a time):**
1. **Idle (0s):** hub + four dimmed client chips + faint idle connectors — the
   legible, reduced-motion end state.
2. **Activate (0–1.5s):** one client chip brightens (start ChatGPT).
3. **Connect + consent (1.5–4s):** a dashed connector flows client→hub; a **lock/
   "approved scope"** badge pulses on the path — signals security, not an open pipe.
4. **Tool select (4–6s):** an *approved tool* card ("Message Report") highlights at
   the hub (never "the database").
5. **Response (6–9s):** a **result card** ("Delivered 9,540 · Read 82%") travels
   back to the client chip.
6. **Rotate (9–14s):** connector settles to a gentle flowing-dash idle; next loop
   activates the next client (Claude → Grok → Gemini), showing all four over time.

**Interaction inventory:**

| Interaction | Behavior |
|---|---|
| **Scroll reveals** | `Reveal` fade+rise per section on enter (once); staggered for grids. |
| **Section transitions** | tone changes provide rhythm; no heavy parallax. Optional: connector "thread" motif subtly continues between B5→B6 (a thin flowing line) to imply one connected system. |
| **Card animations** | capability/client/trust cards: on enter, staggered fade-up; on hover, lift (`-translate-y-0.5`) + border tint + soft shadow. |
| **Micro-interactions** | status pills gently pulse once on first view; the Gemini "ⓘ" tooltip opens on hover/focus; example-prompt chips show a "copied ✓" state on click. |
| **Hover** | client chip hover pauses hero rotation and highlights that connection + tooltip; capability card hover reveals a one-line "example prompt." |
| **Button interactions** | primary CTA: subtle scale/elevation on hover, arrow nudges 2px; focus ring always visible; active state on press. |
| **Loading transitions** | server-rendered = no spinner; content is present on first paint. Any client island (prompt-copy) hydrates without layout shift. Images/logos reserve dimensions (no CLS). |
| **Reduced motion** | `prefers-reduced-motion`: all loops/reveals freeze to complete states; hero = static diagram; hover lifts become instant (no transition); pulses removed. Everything remains fully legible and usable. |

**How-it-works sub-diagram:** a simpler linear SVG (client→consent→gateway→tool→
result) reusing connector styles; static-legible under reduced motion.

**Performance limits:** animate only transform/opacity/background-position/
stroke-dashoffset; `will-change` sparingly; don't animate offscreen; target CLS 0,
negligible INP. Namespaced keyframes in `globals.css` (e.g. `mcp-*`).

## C4. Responsive plan

| Breakpoint | Behavior |
|---|---|
| **≤360 (small mobile)** | 1-col; hero → headline/sub/CTAs (full-width) → vertical mini-flow; client chips 2×2; bento tiers stack (Today→Rolling→Soon); comparison + capability tables → stacked cards; prompt chips scroll-x or truncate; sticky CTA bar (optional). |
| **361–639 (mobile)** | as above; timelines vertical. |
| **640–1023 (tablet)** | 2-col grids; hero simplified (vertical flow or compact orbital); steps 2-col; comparison side-by-side. |
| **1024–1279 (laptop)** | full orbital hero; 3-col capabilities; 4-col client row; horizontal architecture diagram. |
| **≥1280 (desktop)** | max container; generous spacing; full animation. |

Rules: the orbital hero **must** degrade to a vertical flow on mobile; big grids →
stacked cards; tables → cards; logos stay readable; **no horizontal overflow at 320px.**

## C5. Performance plan

- **Server components by default;** the only client islands are prompt-copy, FAQ
  accordion, and (if interactive) the hero rotation control — keep JS minimal;
  prefer a pure-CSS hero (no JS) like `IntegrationsBand`.
- **CSS/SVG animation only**; no WebGL/animation-library.
- Optimized inline SVG for scene + `BrandLogo`; client logos optimized SVG with
  fixed intrinsic dimensions; OG image a static optimized PNG.
- Lazy-load below-the-fold heavy media; tiny hero critical path.
- No layout shift (reserved dimensions; self-hosted Inter via `next/font`).
- Reduced motion respected; nothing animates offscreen.
- **CWV targets:** text LCP (hero heading), CLS 0, low INP.

## C6. Analytics & conversion tracking

Wire to the project's standard tracker (OD-9). Events:
`mcp_page_viewed` · `mcp_primary_cta_clicked` · `mcp_secondary_cta_clicked` ·
`mcp_midpage_cta_clicked` (payload: `position`) · `mcp_sticky_cta_clicked` ·
`mcp_docs_clicked` · `mcp_client_card_clicked` (`client=chatgpt|claude_code|grok|
gemini`) · `mcp_gemini_limited_tooltip_opened` · `mcp_example_prompt_copied`
(`prompt_id`, `tier`) · `mcp_capability_card_hovered` (`category`) ·
`mcp_request_access_opened` · `mcp_request_access_submitted` · `mcp_faq_expanded`
(`question_id`) · `mcp_nav_source` (features/solutions/homepage/footer/blog).
Privacy-safe; no PII.

## C7. Visual system & premium-feel guardrails

Use the existing design system (`docs/STATIC_PAGE_GUIDE.md` + shared components):
- **Tokens:** `--brand-primary #448C74`, logo green `#45BC96`, surface `#F8FAF9`,
  ink `#0F172A`; `heading-1..4`, `text-body/-sm`, `text-caption`.
- **Cards:** `surface-card`, `border-border/60`, `rounded-xl/2xl`, `shadow-sm` →
  `shadow-md` hover; brand-tinted `lucide` icon tiles (`bg-brand-primary/10`).
- **Section rhythm:** the B0 tone map (no two same-tone sections adjacent; one
  `ink` dev band; brand-soft hero + brand CTA).
- **Reuse:** `Container`, `Section`, `SectionHeader`, `Reveal`, `CTAGroup`,
  `FeatureCard`, `IconBadge`, `StatCard`, `TrustPill`, `BrandLogo` (D3).
- **Premium DO:** confident whitespace, one accent color, crisp SVG, subtle motion,
  real logos, tabular numbers in result cards.
- **Premium DON'T (avoid):** heavy glassmorphism, neon, generic purple "AI"
  gradients, fake terminal windows, WebGL, distracting motion, unreadable small
  text, logo misuse, anything that reads as "developer docs."

---
---

# PART D — Evidence, reference & Sonnet handoff

> Everything below is preserved verified research + the implementation handoff.
> The visitor-facing page (Parts A–B) draws its *claims* from D1/D2 and its
> *build* from D3–D8.

## D1. Repository evidence (verified — the accuracy backbone)

**Sources:** `whats91_project/docs/mcp/advanced-tools/00_CURRENT_STATE_AUDIT.md`
(audit 2026-07-20), `PHASE_5_PROVIDER_COMPATIBILITY_MATRIX.md`,
`03_SECURITY_SCOPES_AND_APPROVALS.md`, `01_ARCHITECTURE_AND_BOUNDARIES.md`,
`08_PROVIDER_COMPATIBILITY_GUIDE.md`, `FUTURE_CAPABILITIES_BACKLOG.md`,
`MCP_CUSTOMER_HELP.md`, `PHASE_4_SECURITY_REVIEW.md`.

**Shipped MCP platform (Verified):** OAuth 2.1 AS (PKCE S256, DCR, CIMD, refresh
rotation + reuse detection) `src/modules/mcpOAuth/`; MCP gateway `/mcp` (Streamable
HTTP + JSON-RPC) `src/modules/mcpGateway/`; tool registry + Ajv JSON-schema
validation (`additionalProperties:false`); **live tools = 3 diagnostics
(`whats91_ping`, `whats91_whoami`, `whats91_connection_info`) +
`whats91_message_report_summary` + `whats91_guide_get`**; tenant-scoped data (6
`customer_mcp_*` tables, `user_id NOT NULL`); audit + redaction + observability;
admin oversight + kill switch (`mcp.connections`); rate limits;
**endpoint `https://mcp.whats91.com/mcp`**; **MCP spec 2025-11-25**.
Audit's key line: *"No business tool or new business scope is enabled"* beyond the
report tool + diagnostics + guide.

**Message report tool (the one live business capability):** WhatsApp *message-
delivery* analytics — sent / delivered / read / failed / pending; **today preset**
or custom range with `group_by=day`; **fixed `Asia/Kolkata`**; **92-day cap**;
reconciles with dashboard "All Messages"; entitlement `mcp_platform` +
`message_reports`; identity = `context.grant.userId`.

**Registered OAuth scopes today:** `mcp:connect`, `mcp:tools:diagnostics`,
`mcp:reports:read`, `mcp:contacts:read/write`, `mcp:blacklist:read/write`,
`mcp:media:read`, `mcp:templates:read/write`, `mcp:forms:read/write`,
`mcp:campaigns:read/write/execute`. **Proposed (not registered):** `media:write`,
`chatbots:*`, `chatbot_flows:*`, `catalogs:*`. **A registered scope ≠ a
provider-verified GA tool** — only the report + diagnostics tools are verified in
the Phase-5 matrix.

**Provider compatibility (all Phase-5 runs `NOT_RUN`):**
- **ChatGPT** — developer-mode app → `mcp.whats91.com/mcp`; transport+OAuth+tools
  **product-owner-reported working**; resources/prompts "treat as unavailable
  until proven." → page: **Available now (report tool)**.
- **Claude Code** (local CLI) + **Claude Web** (custom connector) — "expected,"
  DCR+PKCE; `NOT_RUN`. → **Rolling out**.
- **xAI Grok** — "xAI Remote MCP API"; **"grok.com UI OAuth remains unclaimed until
  publicly supported and verified."** → **Rolling out (API path)**.
- **Gemini** — Gemini Enterprise Custom MCP Server; static pre-registered client;
  Streamable HTTP; **imported actions enabled manually; classified LIMITED**. →
  **Limited**.
- Generic MCP Inspector — protocol-control baseline (internal, not marketed).
- Design posture: **tools-only** is the lowest common denominator (ChatGPT);
  resources/prompts/elicitation **never load-bearing**.

**Three different "MCP" things — disambiguate (FAQ):** (1) **product platform**
`mcp.whats91.com/mcp` (this page); (2) website **content MCP** `whats91.com/api/mcp`
(`get_pricing`/`get_template`/`calculate_cost`, GEO/SEO only); (3) **legacy "MCP
Tools (Beta)"** (`aiMcpTools`, do-not-touch, `01` §4).

**Out of MCP scope (never imply):** orders/payments ("very high money risk; never
mix"; own blueprint), accounting/sales reports, receivables, top customers,
best-selling products, Google Sheets export, conversation/message content
(PII-policy pending), billing/quota (product decision), **company/financial-year
selection** (identity is only `grant.userId`; tools never accept a
tenant/company/FY id — IDOR-safe by construction).

**Roadmap (Part B10/B12 "coming" language only):** phases `01…19` — Contact Books
(read→write) → Blacklist → Media (read→upload) → Templates (read→write/submit) →
WhatsApp Forms → Campaigns (read→draft→execute) → Keyword Chatbots → Chatbot Flows
(read→write→publish) → Catalog (read→write) → Cross-module workflows → Phase 19
production hardening = per-provider live re-verification.

**Dashboard reality (`MCP_CUSTOMER_HELP.md`):** Customer Dashboard → MCP with
guided pages for **ChatGPT, Claude, Gemini, Grok** (Overview/Testing/History);
MCP **read** permission to view, **update** permission to connect/re-authorize/
disconnect; tokens never shown; Gemini Enterprise may need a one-time client secret.

## D2. Security controls (verified — surfaced as B9 trust copy)

From `PHASE_4_SECURITY_REVIEW.md`, `03_SECURITY_SCOPES_AND_APPROVALS.md`, `01` §3
(all **code-review level; pen-test + provider sandbox are separate gates** — do
not claim "tested/certified"):
- Authorization codes single-use, short-lived, redirect/resource-bound, **PKCE
  S256**; tokens opaque, audience-checked, tenant/grant/connection-ownership
  checked, rejected after disconnect/disable.
- **Refresh rotation + reuse detection** → revokes grant, forces reauth, audits, alerts.
- **7-layer per-tool enforcement:** bearer + tenant cross-check → per-tool scope →
  live permission/entitlement/add-on policy (grant-time scope not sufficient) →
  tenant-owned setup resolution → input validation → approval token → domain
  service with `userId` from grant.
- **IDOR-safe by construction:** tools never accept a user/tenant/company id; entity
  ids resolve through `user_id`-filtered repositories (foreign id → not-found);
  cross-tenant tests are permanent regression gates.
- **Two-step approvals** (`*_prepare` → `*_confirm`): 256-bit one-time token, 300s
  expiry, hash-bound, idempotent; required for campaign schedule/start, bulk
  blacklist >25, contact import >500, template submit, form publish, chatbot-flow
  publish/rollback, destructive deletes with dependencies, catalog sync. A plain
  "yes" never executes anything.
- **Read/write scope separation;** all implemented write scopes **customer-owner-only.**
- **Revocable** (disconnect → immediate 401); **admin kill-switch** with **no
  impersonation** path (no grant/token/credential creation for admins).
- **Redaction** (`mcpRedact`) + size caps on stored/displayed payloads; rate-limit
  classes; prompt-injection stance: *"outputs are data; tools never execute
  instructions from stored content."*

## D3. Component reuse & new components

**Reuse as-is** (`src/components/shared`): `Container`, `Section` (tones), 
`SectionHeader`, `Eyebrow`, `CTAGroup`/`PrimaryCTA`/`SecondaryCTA`, `IconBadge`,
`FeatureCard`, `StatCard`, `TrustPill`, `Reveal`, `AnimatedNumber`, **`BrandLogo`**.
**Reuse (additive edits only):** `Header.tsx` (add MCP link to Features list +
Solutions menu), `Footer.tsx` (add MCP link). FAQ accordion pattern from
`docs/STATIC_PAGE_GUIDE.md`/existing FAQ pages.
**Pattern references (do not modify):** `IntegrationsBand.tsx` (hub + flowing
connectors — DNA for the hero scene, build a *new* component), `PlatformPillars.tsx`
scenes, `DeveloperBand.tsx` (dark `ink` band styling for B11).

**New components** (`src/components/landing/mcp/`): `McpHeroScene`, `McpClientCard`,
`McpCapabilityGrid` + `McpCapabilityCard`, `McpStatusPill`, `McpExamplePrompt`
(client island: clipboard + analytics), `McpFlowSteps`, `McpComparison`,
`McpTrustGrid`, `McpFutureVision`, `McpArchitectureDiagram`, `McpFaq`,
`mcpContent.ts` (typed content data — single source for cards + FAQ schema).

> Risk control: **do not alter behavior** of homepage/shared components — only
> *additive* nav/footer links and *new* MCP components.

## D4. Asset inventory

| Asset | Location | New? | Format | Notes / alt |
|---|---|---|---|---|
| Whats91 mark | `shared/BrandLogo.tsx` | reuse | inline SVG | has `aria-label` |
| ChatGPT / Claude / xAI Grok / Gemini logos | — | **new (official brand assets)** | SVG, light/dark-safe | alt "ChatGPT logo" etc.; **OD-8 brand approval** |
| Capability/trust icons | `lucide-react` | reuse | SVG | decorative (aria-hidden) |
| Hero MCP scene, architecture diagram | — | **new** (SVG/CSS from `BrandLogo` + logos) | inline SVG | decorative or `aria-label` |
| OG image | — | **new `public/og-mcp.png`** 1200×630 | PNG | via project `sharp` pipeline |

**Brand caution (OD-8):** third-party AI logos must be official assets used per each
provider's brand guidelines; no fake approximations; no implied partnership. If
rights are unclear, use neutral **name chips** until approved.

## D5. Competitor / inspiration references (structure only — do not copy)

| Reference | Study | Why | Don't copy |
|---|---|---|---|
| modelcontextprotocol.io | plain "what is MCP" framing | sets expectations | its copy/diagrams |
| OpenAI/Anthropic connector docs | connect-flow step hierarchy | mirrors our B8 | screenshots/assets/text |
| Stripe / Twilio dev landing pages | business-value-first hero + progressive depth + clean architecture diagram | same dual-audience | their visual identity |
| Zapier / Make integration hubs | client/logo compatibility grid w/ status | our B5 | card/logo treatment |
| **Whats91 homepage (this repo)** | **primary** — rhythm, connector scenes, tone, CTAs | must feel native | n/a (reuse system, invent MCP scene) |

## D6. Sonnet implementation handoff

- **Route:** `src/app/mcp/page.tsx` — **server component**; `generateMetadata()` via
  `generatePageMetadata({ title, description, keywords, path:"/mcp", image:"/og-mcp.png" })`;
  inject JSON-LD (`generateBreadcrumbSchema` `Home›MCP`, `generateFAQSchema(faq)`,
  `generateSoftwareApplicationSchema({name:"Whats91 MCP", applicationCategory:"BusinessApplication", url:"https://whats91.com/mcp"})`).
- **New components:** `src/components/landing/mcp/*` (D3) + `mcpContent.ts`.
- **Sitemap:** add `/mcp`. **Nav/Footer:** additive links. **OG:** generate `public/og-mcp.png`.
- **Component hierarchy:**
```
app/mcp/page.tsx (server)
├── Header (reuse)
├── main
│   ├── McpHero (brand-soft) → McpHeroScene, CTAGroup, McpClientCard×4
│   ├── McpProblem (default)
│   ├── McpComparison (surface)
│   ├── McpWhatIs (default)           // 40–55-word definition para for snippet
│   ├── McpClients (surface) → McpClientCard×4
│   ├── McpCapabilities (default) → McpCapabilityGrid (bento tiers)
│   ├── McpExamples (surface) → McpExamplePrompt×N
│   ├── McpHowItWorks (default) → McpFlowSteps
│   ├── McpTrust (surface) → McpTrustGrid
│   ├── McpFuture (default) → McpFutureVision
│   ├── McpArchitecture (ink) → McpArchitectureDiagram
│   ├── McpAvailability (default)
│   ├── McpFaq (surface) → McpFaq
│   └── McpFinalCta (brand) → CTAGroup
└── Footer (reuse)
```
- **Server/client boundaries:** server for all content; client islands only for
  `McpExamplePrompt` (clipboard+analytics), `McpFaq` (accordion), and
  `McpHeroScene` *only if* interactive (else pure-CSS server component).
- **Content types (`mcpContent.ts`):**
```ts
type McpStatus = "available" | "rolling" | "limited" | "soon";
interface McpClient { id:"chatgpt"|"claude_code"|"grok"|"gemini"; name:string;
  status:McpStatus; headline:string; detail:string; logo:string; }
interface McpCapability { id:string; tier:"today"|"rolling"|"soon"; category:string;
  title:string; line:string; status:McpStatus; icon:LucideIcon; }
interface McpPrompt { id:string; group:string; text:string; answer?:string; status:McpStatus; }
interface McpStep { n:number; title:string; body:string; }
interface McpFaqItem { id:string; q:string; a:string; }   // single source for visible FAQ + schema
```
- **Accessibility checklist:** one `<h1>`; logical H2/H3; sections
  `aria-labelledby`; decorative scenes `aria-hidden`; logos have `alt`; status by
  **text** not color alone; keyboard-operable CTAs/accordion/copy/tooltips with
  visible focus; WCAG-AA contrast incl. amber "Limited" pill and the dark `ink`
  band; `prefers-reduced-motion` freezes all motion to legible states; no keyboard trap.
- **Testing:** `npx eslint` (clean) · `npx tsc --noEmit` (no new errors) ·
  `npx next build` (static) · reuse `scripts/seo-validation/*` against the local
  build (200, one self-canonical, one H1, unique title/desc, OG present, in
  sitemap, FAQ schema text == visible) · JSON-LD parses · reduced-motion + mobile
  (375) + desktop screenshots · no console errors.
- **Visual QA:** feels native (tone/spacing/type == homepage); tonal alternation
  intact; Gemini reads "Limited" not broken; "xAI Grok" spelled right; nothing
  shown available beyond report+diagnostics; logos crisp, no CLS; mobile hero flow legible.
- **Acceptance:** `/mcp` live, indexable, in sitemap, breadcrumb `Home›MCP`; all A5
  accuracy constraints honored; all B sections present; hero has no protocol
  jargon; lint/type/build + SEO + a11y + reduced-motion pass; **no homepage/shared
  behavior changed.**
- **Known uncertainties:** exact live status of contacts/templates/campaigns tools
  at build (re-check D1 / scope catalog — default conservative); docs URL (OD-5);
  access mechanism (OD-6); plan-gating (OD-3).
- **Do-not-touch:** `IntegrationsBand`/`PlatformPillars`/other homepage bands'
  behavior; the legacy "MCP Tools (Beta)" (`aiMcpTools`); the `/api/mcp` content
  endpoint. Do not invent capabilities/providers/stats/certifications/release stages.

## D7. Product-owner decisions required

| ID | Question | Impact |
|---|---|---|
| OD-1 | Repoint homepage `IntegrationsBand` MCP mention from `whats91.com/api/mcp` (content) to `/mcp` (product)? | linking clarity; avoids 3-MCP confusion |
| OD-2 | Phrasing/positioning vs. legacy dashboard "MCP Tools (Beta)"? Rename risk? | customer confusion |
| OD-3 | Is MCP plan-gated? How enabled? Does `message_reports` need a specific plan? | FAQ/availability/CTA |
| OD-4 | Confirm "no Google Sheets export via MCP" phrasing | accuracy |
| OD-5 | Developer-docs URL/location | "Read the docs" CTAs |
| OD-6 | Preview access: request-access form vs contact vs dashboard self-serve | primary CTA + analytics |
| OD-7 | Promote MCP to top-level header now or at GA? | nav prominence vs clutter |
| OD-8 | Legal/brand approval for OpenAI/Anthropic/xAI/Google logos (else name chips) | trademark compliance |
| OD-9 | Which analytics tool receives MCP events? | wiring |
| OD-10 | Confirm marketed stage wording ("private preview") + "verification in progress" | matches `NOT_RUN` reality |
| OD-11 | Approve "Available now" for ChatGPT (PO-reported, not a formal Phase-5 PASS) | compatibility-claim governance |
| OD-12 | Approve the supporting blog cluster (C2) and its publish order | SEO authority program |

## D8. Sonnet Implementation Order (build sequence + rationale)

Build in this order to **minimize rework** — structure and truth before polish, so
later passes don't invalidate earlier ones.

1. **Phase 1 — Content + types + page skeleton.** Create `mcpContent.ts` (all
   copy, capabilities, clients, prompts, FAQ — the single source of truth) and
   `app/mcp/page.tsx` with static sections in the B0 order using existing
   `Section`/`SectionHeader`/`Container`. *Why first:* locks the narrative and
   accuracy (A5) before any pixels; every later phase reads from `mcpContent.ts`.
2. **Phase 2 — SEO metadata + JSON-LD + sitemap + nav/footer links.** Wire
   `generateMetadata`, Breadcrumb/FAQ/SoftwareApplication schema (FAQ sourced from
   `mcpContent.ts`), add `/mcp` to sitemap, additive nav/footer links. *Why here:*
   cheap, structural, and keeps the FAQ schema/visible text in lockstep from the start.
3. **Phase 3 — Core sections & premium cards (static).** `McpClientCard`,
   `McpCapabilityGrid` (bento tiers), `McpComparison`, `McpTrustGrid`,
   `McpFutureVision`, `McpFlowSteps`, `McpFaq`, `McpStatusPill`, CTAs. Fully styled,
   no animation yet. *Why:* the page must be complete and correct *before* motion;
   validates layout/tone/responsive structure early.
4. **Phase 4 — Hero + animations.** `McpHeroScene` (+ how-it-works/architecture
   diagrams) and card/scroll micro-interactions, all pure CSS/SVG namespaced
   `mcp-*`. *Why after cards:* animation targets stable DOM; avoids re-doing motion
   when layout shifts.
5. **Phase 5 — Responsive polish.** Verify every breakpoint (§C4), orbital→vertical
   hero, tables→cards, no 320px overflow, sticky mobile CTA (if approved). *Why
   here:* motion + layout are settled, so responsive fixes are final.
6. **Phase 6 — SEO/GEO finalization.** Definition-paragraph snippet shape, alt text,
   OG image (`og-mcp.png`), `llms.txt` entry, internal links in/out, entity
   consistency pass. *Why late:* copy is final by now, so no re-writing schema/snippets.
7. **Phase 7 — Accessibility.** Full a11y checklist (D6): headings, aria, focus,
   contrast (incl. `ink` band + amber pill), reduced-motion freeze states,
   keyboard paths, tooltips. *Why here:* audit the finished, animated, responsive
   page once — not a moving target.
8. **Phase 8 — Performance & QA.** CWV pass (LCP/CLS/INP), lazy-load, dimension
   reservations, kill any offscreen animation; run `scripts/seo-validation/*`,
   lint/type/build, cross-device screenshots, visual QA vs. homepage. *Why last:*
   optimize and verify the final artifact.

**Rework-avoidance principle:** *truth → structure → style → motion → responsive →
SEO → a11y → performance.* Each phase depends only on stabilized outputs of the
prior ones, so nothing built early is invalidated late.

## D9. Plan acceptance checklist (v2)

- [x] v1 technical content **preserved** (D1 evidence, D2 security, D6 handoff, SEO,
      a11y, animation, roadmap, analytics, component reuse) — nothing accurate removed.
- [x] Reframed **product-first**: story arc (A2), hero 5-5-5 (A4, B1), value before tech.
- [x] Low-level tech relocated to Part D / B11 / developer docs (not in hero/early sections).
- [x] Premium sections added: Before/After comparison (B3), bento capability tiers
      (B6), live prompt examples (B7), trust grid (B9), future vision (B10).
- [x] ASCII wireframes for hero (desktop+mobile), capabilities, comparison,
      workflow, security, final CTA.
- [x] Conversion/CTA map (C1) with rationale incl. sticky + mid-page.
- [x] SEO expanded: featured snippets, AI Overviews/GEO, entity, internal linking,
      supporting blog cluster, schema caution (C2).
- [x] Animation system expanded (scroll/micro/hover/loading/transition/card/button/
      reduced-motion) (C3).
- [x] **Sonnet Implementation Order** added with rework rationale (D8).
- [x] Accuracy guardrails intact (A5): private preview; only report+diagnostics
      live; xAI Grok not Groq; Gemini Limited; out-of-scope items; three-MCP
      disambiguation; no unverified security/certification claims.
- [x] Product-owner decisions listed separately (D7).
- [x] **No production page code implemented; no `src/` file modified.**
