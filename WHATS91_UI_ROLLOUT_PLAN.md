# Whats91 UI Rollout Plan

> Controlled page-by-page migration onto the new foundation. One batch at a
> time; each batch ends with lint + build + responsive verification before the
> next begins. Batches are ordered by business impact × component reuse.

## Batch 0 — Foundation ✅ (done in this phase)

Tokens, typography, layout primitives, shared components, `/design-system`
preview, documentation. No page redesigns.

## Batch 1 — Global shell

**Pages/files:** `Header.tsx`, `Footer.tsx`, `CookieConsent.tsx`,
`BookDemoPopup.tsx`, `not-found.tsx`.
**Work:** restyle to tokens; active-link state; skip-to-content link (+ add
`id="main-content"` to `main` in migrated pages as they land); fix Radix
hydration warnings; Footer version → server-side read of `version.txt`;
cookie banner reduced to a compact bottom sheet on phones.
**Risk:** highest blast radius — verify on every route type before merging.
**Verify:** all 49 routes render; nav works at every breakpoint; keyboard
pass on menu + sheet.

## Batch 2 — Homepage

`page.tsx` + `landing/` sections (Hero, Solutions, BusyERP, Developers,
Security, ROI, HomepageFAQ, FinalCTA).
Highest-traffic page; establishes S1/S2/S4/S6/S10/S12 in production. **Fix
the dead hero CTA buttons** (`PrimaryCTA href="/contact"`,
`SecondaryCTA href="https://developers.whats91.com/overview"` or as decided).

## Batch 3 — High-conversion product pages

`/pricing`, `/contact`, `/solutions/busy-erp`, `/solutions/marketing`,
`/solutions/utility`. Money pages; S5/S11 patterns proven here. Preserve all
rates, anchors and the contact form endpoint.

## Batch 4 — Remaining solutions

`/solutions/busy-ecommerce`, `busy-ai-agent`, `busy-api`, `busy-reports`,
`payment-reminders`, `busy-google-sheet`, `miracle-whatsapp-api`. Template
repetition — fast once Batch 3 lands. Keep animated demos untouched.

## Batch 5 — Feature & capability pages

`/features`, `/features/chat-shortcuts-conversation-automation`,
`/flow-builder`, `/whatsapp-templates`, `/whatsapp-business-calling`,
`/whatsapp-coexistence`, `/google-sheets-integration`, `/chatbot-flows`.
Developer-leaning pages exercise H3/S6.

## Batch 6 — Tools

`/tools` + the four tool pages (QR generator, link generator, cost
calculator, ROI calculator). **Visual shell only — never touch tool logic.**
Test each tool's function after restyling.

## Batch 7 — Trust & company

`/about`, `/partners`, `/partners/whats91-coins`, `/careers`, `/faq`,
`/compliance`.

## Batch 8 — Blog & resources

`/blog` index, `BlogCard`/`AuthorCard`/`ShareButtons`, `/authors`,
`/authors/[slug]`, then the 10 article pages (article template once, then
mechanical). Add T3 cover images per the Visual Asset Guide as they migrate.

## Batch 9 — Legal & utility

`/privacy`, `/terms`, `/refund`, `/cookies` — reading-width prose template.
Content verbatim.

## Batch 10 — Consistency & cleanup pass

- Site-wide sweep: remaining `bg-white`, raw palette colors, arbitrary text
  sizes, inline containers (`grep` checklist in the migration guide §7).
- Remove then-unused legacy classes from `globals.css` (`.card-modern`,
  `.btn-modern`, `.glass-subtle`, `.badge-modern`, `.focus-modern`,
  `.container-landing`) after confirming zero usages.
- Delete dead `tailwind.config.ts`.
- Full-route screenshot pass (desktop/tablet/phone), Lighthouse spot checks
  on homepage + pricing + one solution page, final build/lint.

## Rules for every batch

1. One batch per PR/change-set; never mix batches.
2. Follow `WHATS91_PAGE_MIGRATION_GUIDE.md` per page, including its report.
3. No route, content, form or SEO changes beyond what the guide allows.
4. A batch is done only when lint + build pass and phone/tablet/desktop
   verification is recorded for each page in the batch.
