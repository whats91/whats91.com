# Whats91 Page Pattern Library

> Reusable page-level patterns built from the primitives in
> `WHATS91_DESIGN_SYSTEM.md`. Every pattern preserves existing routes and
> content; it only prescribes structure and component choice.

## 0. Shared shell (every public page)

```tsx
<div className="min-h-screen flex flex-col bg-background">
  <Header />
  <main className="flex-1">{/* sections */}</main>
  <Footer />
</div>
```

JSON-LD helpers (`FAQJsonLD`, `BreadcrumbJsonLD`, page schemas) stay exactly
as they are today.

### Navigation (current header is retained this phase)

- Sticky `z-50`, `bg-background/80 backdrop-blur-xl`, hairline bottom border.
- Desktop (≥`lg`): logo + Meta Partner pill, Solutions mega-menu (2-col, icon
  rows), primary links, ghost Templates link, `Get Started` primary button.
- Phone/tablet: logo + menu button opening the right `Sheet` (85vw/320px) with
  solutions list, primary links, bottom-pinned CTA pair.
- Improvements scheduled for Batch 1 (see rollout plan): active-link
  indicator, skip-to-content link, Radix hydration fix. IA does not change.

### Announcement bar (optional pattern)

Single line above the header: `bg-brand-primary text-brand-primary-foreground
text-sm text-center py-2 px-4`, one inline link, dismiss button (client
island, localStorage). Use sparingly — product launches only.

---

## 1. Hero variants

All heroes: `Section tone="brand-soft" pad="lg"` + `Container`, `h1` =
`.heading-1` (homepage may use `.heading-display`), description =
`.text-lead measure-prose`, CTAs via `CTAGroup`, proof via `TrustPill` row.
Max one `text-gradient` phrase.

| Variant | Layout | Content budget | Use on |
| --- | --- | --- | --- |
| **H1 Split product hero** | `lg:grid-cols-2 items-center gap-10 lg:gap-14`; right column = product visual (chat preview, dashboard, animated demo). Phone: text centered, visual below (decorative code blocks hidden `<sm`) | Eyebrow · headline ≤10 words · lead ≤30 words · 1+1 CTAs · 3 trust pills | Homepage, product/solution pages |
| **H2 Centered utility hero** | Single centered column, `max-w-3xl` | Eyebrow · headline · lead · 1–2 CTAs · ≤3 trust pills | Pricing, FAQ, contact, legal, tools index, blog index |
| **H3 Developer hero** | Split, right column = `.ink-panel` code sample with real API shape | Headline (technical, literal) · lead · CTA pair ("View docs" secondary) · uptime/throughput pills | API/developer pages, integrations with code |
| **H4 Article hero** | Left-aligned in `Container size="narrow"`; breadcrumbs, category badge, `h1`, excerpt, meta row (author, date, reading time) | No CTAs | Blog posts |
| **H5 Comparison/industry hero** | Centered like H2 plus a compact proof band (2×2 `StatCard` grid under CTAs — real numbers only) | Headline naming the industry/comparison explicitly | Industry, comparison pages |

Backgrounds: `gradient-brand-subtle` overlay only; optionally
`bg-gradient-to-b from-surface/80 to-background`. No imagery behind text.

---

## 2. Content section patterns

Every section: `Section` (alternate tones) + `Container` + `SectionHeader`
(`id` + `aria-labelledby`). Vary layouts down the page — never more than two
card-grid sections in a row.

| Pattern | Structure | Notes |
| --- | --- | --- |
| **S1 Feature grid** | `SectionHeader` centered + `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` of `FeatureCard` | 3–9 items; 4-up only for compact cards at `lg:grid-cols-4` |
| **S2 Alternating split** | `lg:grid-cols-2 items-center gap-10 lg:gap-14`; text side = left-aligned `SectionHeader` + bullet list (success-check icons) + optional inline CTA; other side = visual | Alternate image side per instance. Phone: text first, visual second (`order-*`) |
| **S3 Steps / workflow** | Numbered `IconBadge`-style circles + connecting line; vertical on phone, horizontal 3–4 across at `md` | Onboarding, "how it works" |
| **S4 Stats band** | `grid grid-cols-2 lg:grid-cols-4 gap-4` of `StatCard`, usually `tone="surface"` `bordered` | Real numbers only, cite units |
| **S5 Comparison table** | `.surface-card` + `overflow-x-auto` table (§5.7 of design system); phone uses existing card-per-row fallback | Check `text-success`, cross `text-text-muted` |
| **S6 Developer/API section** | `tone="ink"`; split: capability text (white headings, `text-ink-text` body) + `.ink-panel` code sample | ≤1 per page |
| **S7 Integration grid** | `FeatureCard` variant with logo/icon left, name + one-liner right; 2→3→4 columns | Real integrations only |
| **S8 Security/compliance** | Pill row of certifications (`TrustPill`) + S1 grid of security features + optional info-banner for DPDP notes | Only claims that are true today |
| **S9 Testimonial / results** | `.surface-card` with quote (`text-lead`), name/role/company; 1–3 across | Real customers only; skip section if none |
| **S10 FAQ** | `Container size="narrow"` + shadcn Accordion + `FAQJsonLD` | 5–10 questions; keep existing FAQ content |
| **S11 Pricing cards** | `.surface-card` per plan: name, price (`.heading-2`), unit caption, feature list with success checks, CTA; featured plan = `border-brand-primary/40 shadow-brand-sm` + Eyebrow "Most Popular" | Grid `md:grid-cols-2 lg:grid-cols-3`; parity of feature-list ordering |
| **S12 Final CTA** | Inside `Section tone="default"`: inner panel `rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent`, centered white `.heading-2`, short line, white-fill CTA (`bg-white text-brand-primary hover:bg-brand-50`), small trust note | Every marketing page ends with this, then Footer |
| **S13 Logo cloud** | Grayscale/monochrome logos `opacity-70 hover:opacity-100`, single row wrap; heading `.text-overline` ("Trusted by…") | Only with real, permitted logos — otherwise omit |
| **S14 Newsletter** | Narrow inline band: heading-3, one input + Button, caption with privacy note | Blog/resources only |

---

## 3. Page templates

Section orders below are the **default recipe** — keep a page's existing
content and drop sections that have no real content rather than inventing any.

### Homepage
H1 (display heading) → S13 (only when real logos exist) → S1 solutions grid
(featured Busy card keeps "Most Popular" eyebrow) → S2 Busy ERP deep-dive +
S5 comparison → S6 developer band → S8 security → S4 ROI stats + detail rows →
S10 FAQ → S12. Current section order already matches this — the migration is
a restyle, not a re-order. Fix the dead hero CTA buttons with
`PrimaryCTA href` / `SecondaryCTA href`.

### Product / solution pages (`/solutions/*`)
H1 (visual = the page's existing animated demo or mockup) → value block
(`Section tone="surface" bordered pad="sm"`, lead paragraph) → S1 features →
S2 workflow (×1–2, alternating) → S5 or S6 where relevant → S8 →
industries S1-compact → S3 onboarding → S10 → S12 with `ContactCard`.

### Feature pages (`/features/*`, `/flow-builder`, `/whatsapp-templates`, …)
H1 or H3 → S2 capability splits (2–3, alternating sides) → S1 secondary
features → S4 → S10 → S12.

### Developer / API pages
H3 → S6 → S1 (API capabilities: webhooks, templates, media…) → S5 (limits /
plans if applicable) → S8 → S12 (secondary CTA = external docs site).

### Industry pages
H5 → problem/solution S2 pair → S1 industry use-cases → S9 (only if real) →
S5 industry-specific comparison → S10 → S12.

### Integration pages (`/google-sheets-integration`, …)
H1 (visual = integration demo) → S3 how-it-connects → S1 capabilities →
S7 related integrations → S10 → S12.

### Pricing
H2 → S11 (or the existing Meta-rate tables as S5) → volume/discount S5 →
"what's included" S1 → S10 (billing FAQs) → S12. Keep every existing rate
figure and anchor (`#marketing`, `#utility`, `#volume`).

### Comparison pages
H5 → S5 main matrix → S2 differentiators (2–3) → S9 → S10 → S12.
Factual tone; no competitor logos beyond nominative use; no invented
competitor weaknesses.

### Blog index
H2 (keep search + filter islands) → posts `grid sm:grid-cols-2 lg:grid-cols-3`
of blog cards (`.surface-card` + category badge + title `.heading-4` + excerpt
+ author/meta row) → S14.

### Blog article
H4 → body in `Container size="reading"` (headings `.heading-2/3`, body
`.text-body`, callouts = status banners, tables per S5, code per §5.9) →
share row → author card → related posts (2, `.surface-card`) → S12 (compact).

### Contact / lead-gen
H2 → split: form (`Container size="narrow"`, shadcn fields) beside contact
methods (`FeatureCard` rows: WhatsApp, phone, email — keep existing links) →
S8 trust strip → S10.

### Legal / utility (`/privacy`, `/terms`, `/refund`, `/cookies`, `/compliance`)
H2 (compact, `pad="sm"`) → `Container size="reading"` prose with a sticky
table of contents at `lg` (optional) → keep all existing text verbatim.

---

## 4. Visual rhythm checklist (per page)

- [ ] Tones alternate; no two identical bands adjacent; ≤1 ink band
- [ ] No more than two card-grids in a row — break with S2/S3/S4
- [ ] Exactly one primary CTA concept repeated (hero + S12), not five
      different asks
- [ ] Every section has a `SectionHeader`; descriptions ≤2 sentences
- [ ] Phone, tablet, desktop each intentionally laid out (see §4 of the
      design system)
