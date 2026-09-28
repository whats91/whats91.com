# Whats91 Page Migration Guide

> Exact procedure for redesigning **one** existing page onto the new
> foundation. Written so any capable AI coding model (or developer) can follow
> it deterministically. One page per task — never batch-refactor.

## 1. Required inputs

1. Target page URL (e.g. `https://whats91.com/solutions/busy-erp`)
2. The page's source file(s) under `src/app/...`
3. `WHATS91_DESIGN_SYSTEM.md` (master guideline)
4. `WHATS91_PAGE_PATTERN_LIBRARY.md` (pick the matching template)
5. `WHATS91_VISUAL_ASSET_GUIDE.md` (if the page needs assets)
6. Current desktop + mobile screenshots (take them before editing)

## 2. Pre-flight audit of the selected page

Before writing any code:

- Read the entire page source; list every section in order with its content.
- Note the route, `metadata`/`generateMetadata`, JSON-LD blocks, anchor ids
  (`#marketing` etc.), internal/external links, forms and API calls.
- Identify which pattern-library template applies and map each existing
  section to a pattern (S1–S14). Sections that don't map cleanly keep their
  content and get the closest pattern — never delete content to fit a pattern.
- Check which shared components the page imports and where else those are
  used (`grep -r "ComponentName" src/`) — page-local changes only.
- Record whether the page is a client component and which parts genuinely
  need client state (accordion, tabs, calculator). Everything else becomes
  server-rendered.

## 3. Content-preservation rules (hard requirements)

- Route/slug unchanged. Anchors unchanged. All links preserved.
- All headings, paragraphs, table data, FAQ questions/answers, prices, phone
  numbers and legal text preserved verbatim unless the task explicitly
  approves copy edits. Reordering within the template is allowed; deletion is
  not.
- `metadata`, JSON-LD, analytics hooks, forms and their endpoints unchanged.
- No new claims, stats, customers, logos or certifications.

## 4. Component-selection rules

1. Layout: `Section` + `Container` + `SectionHeader` for every band.
2. Type: `.heading-*` / `.text-lead` / `.text-body*` / `.text-caption` only.
3. CTAs: `PrimaryCTA` / `SecondaryCTA` / `CTAGroup`; in-page actions use
   shadcn `Button`.
4. Cards: `.surface-card` (+`-hover` when clickable), `FeatureCard`,
   `StatCard`; icon tiles via `IconBadge`; pills via `Eyebrow`/`TrustPill`.
5. Interactivity: shadcn `Accordion`/`Tabs`/`Dialog`/form controls.
6. Colors: semantic tokens only. Mechanical replacements:
   `bg-white → bg-card`, `text-slate-500/600 → text-text-secondary or
   text-text-muted`, `green-* → success tokens or brand-*`,
   `amber/yellow-* → warning`, `red-* → error`, `blue-* → info`,
   `#0F172A panels → .ink-panel / ink tokens`,
   `px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto → <Container>`.
7. If a needed pattern is missing from the system, **stop and flag it** in
   the report instead of inventing page-local styling. Truly page-specific
   layout may compose primitives with Tailwind utilities, but must not define
   new colors, radii, shadows or font sizes.

## 5. Implementation order

1. Convert the page shell to the template's section order (content in place).
2. Replace layout wrappers (Container/Section/SectionHeader).
3. Replace typography classes.
4. Replace cards/CTAs/pills/status colors.
5. Split client islands: page file becomes a server component exporting
   `metadata`; interactive fragments move to small `"use client"` child
   components. (If this is risky for the page, keep the client component and
   note it in the report — visual migration first.)
6. Restyle mock-UI visuals with ink tokens; wire real assets per the Visual
   Asset Guide (generation prompts included there).

## 6. Verification checklist (all required)

**Responsive** — dev server at 360, 375, 768 (tablet must not be stretched
mobile: check line lengths and grid columns), 1024, 1280, 1536 px. No
horizontal page scroll anywhere; tables scroll inside their own container.

**Accessibility** — one `h1`; heading order; keyboard-tab through all
interactive elements with visible focus; decorative icons `aria-hidden`;
form labels/errors; touch targets ≥44px; contrast spot-check any new
color pairing; reduced-motion mode (emulate in devtools) leaves the page
fully usable.

**Regression** —
```bash
bun run lint          # must pass
npx next build        # must pass; page appears in route list
```
- Every link and anchor on the page still resolves (click through).
- Forms still submit to the same endpoint (test with dummy data locally).
- JSON-LD still present (view page source).
- Diff review: only the intended page files changed (`git status` if the
  repo is under git in your environment; otherwise compare against the file
  list you recorded in pre-flight).
- Compare before/after screenshots; content parity confirmed section by
  section.

## 7. Definition of done

A page is done when: all §3 rules hold, all §6 checks pass, no raw palette
colors / `bg-white` / arbitrary text sizes / inline 1200px containers remain
in the page file, and the report below is produced.

## 8. Expected output format (report)

```
PAGE: /solutions/busy-erp
TEMPLATE USED: Product/solution (Pattern Library §3)
FILES CHANGED: (list)
CLIENT ISLANDS: (list or "unchanged — reason")
CONTENT CHANGES: none | (approved edits list)
ASSETS: (created/needed with prompt refs, or "none")
CHECKS: lint ✅ build ✅ responsive ✅ a11y ✅ links ✅ schema ✅
FLAGGED FOR SYSTEM: (missing patterns, if any)
KNOWN ISSUES: (or "none")
```

---

## 9. Standard prompt template for a single page redesign

Copy, fill the `{...}` slots, and give to the AI coding model together with
file access:

```
You are redesigning ONE page of whats91.com onto its established design
system. This is a restyle, not a rewrite.

TARGET PAGE
- URL: {https://whats91.com/...}
- Source: {src/app/.../page.tsx and any page-local components}
- Screenshots of current state: {attached / paths}

AUTHORITATIVE REFERENCES (read before coding, follow exactly)
- WHATS91_DESIGN_SYSTEM.md — tokens, typography, components, breakpoints,
  accessibility, motion. Do not deviate or invent styles.
- WHATS91_PAGE_PATTERN_LIBRARY.md — use the "{template name}" template.
- WHATS91_PAGE_MIGRATION_GUIDE.md — follow its process and verification
  checklist end to end.
- Live primitive reference: run the dev server and open /design-system.

HARD RULES
1. Do not change the route, slug, anchors, metadata, JSON-LD, forms,
   analytics, or backend behavior.
2. Preserve all existing content verbatim (headings, copy, tables, FAQs,
   prices, links). Reorder within the template only. Invent nothing.
3. Use shared primitives (src/components/shared) and shadcn components
   (src/components/ui — never modify those files). No page-local colors,
   radii, shadows, font sizes, or bg-white / raw palette classes.
4. Design phone (360/375), tablet (768 — a real layout, not stretched
   mobile), and desktop (1280+) intentionally.
5. Meet the accessibility checklist in the migration guide.
6. Touch only this page's files. If a shared component seems to need a
   change, flag it in your report instead of changing it.
7. If an asset is needed, follow WHATS91_VISUAL_ASSET_GUIDE.md and output
   the generation prompt; use a placeholder with correct dimensions.

PROCESS
1. Audit the current page per the migration guide §2 (report the section map
   first).
2. Implement per §4–5.
3. Verify per §6: bun run lint, npx next build, responsive widths, keyboard
   pass, link/anchor pass, reduced motion.
4. Produce the §8 report, including every changed file and any unresolved
   issues. Do not claim completion without the checks' actual output.
```
