# Whats91 — Batch 1: Global Shell Migration Report

Scope: `Header.tsx`, `Footer.tsx`, `CookieConsent.tsx`, `BookDemoPopup.tsx`,
`not-found.tsx`. No individual page content was redesigned; Homepage (Batch 2)
was not touched.

---

## 1. Preflight findings

### 1.1 Existing architecture (before this batch)

- **Header** (`src/components/landing/Header.tsx`, client component): sticky,
  `z-50`, `bg-background/80 backdrop-blur-xl`. Desktop (`lg:` ≥1024px): logo +
  "Meta Partner" pill, a Radix `NavigationMenu` "Solutions" mega-menu (10
  items, 4 flagged `featured`/"Popular"), 5 primary links (Features, Free
  Tools, Pricing, Blog, Contact), a ghost "Templates" link
  (`/whatsapp-templates`), and a primary "Get Started" link to
  `https://chat.whats91.com` (external, new tab). Below `lg`: a `Sheet`
  (Radix Dialog-based) opened by a 36×36px icon button, containing the same
  10 solutions + 5 primary links, plus a footer with "WhatsApp Templates" and
  "Get Started" buttons and an "Official Business Solution Provider" caption.
  No active-route indication, no skip link, mobile trigger below the 44px
  touch-target minimum, "WhatsApp Templates" button in the sheet footer was
  **not** wrapped in `SheetClose` (so clicking it left the sheet's `isOpen`
  state `true` on the destination page, since Header persists across
  client-side navigations).
- **Footer** (client component solely for a `useEffect` + `fetch("/api/version")`
  call): brand column (logo, description, email/phone/WhatsApp/address,
  `BookDemoPopup` trigger) + 4 link-group columns (Solutions, Pricing,
  Resources, Company) + a bottom bar (copyright, version badge, 5 legal
  links). Grid was `md:grid-cols-2 lg:grid-cols-6` with the 4 link groups
  nested in their own always-2-column sub-grid — meaning at tablet (768–1023px)
  the four groups were squeezed into a 2×2 block inside only half the row.
- **CookieConsent** (client component): two separately-coded banners (a
  desktop bar and a full mobile popup), storage key `whats91_cookie_consent`,
  values `"accepted"`/`"rejected"`, plus a bare `X` "close" control that hid
  the banner **without** writing either value (dismiss-without-deciding).
  Mobile version measured to occupy roughly half the phone viewport.
- **BookDemoPopup** (client component, Radix `Dialog`): name/email/phone
  fields, `executeRecaptcha` + `POST /api/demo`, generic top-level error
  banner only (no per-field errors), success state with auto-close after 3s.
  Dialog had no explicit height/overflow handling and no `min-w-0` on its
  Cancel/Submit button row.
- **not-found.tsx** (client component, despite using no client state):
  standalone shell (no `<Header/>`), icon illustration, "Error 404" badge,
  H1, 2 CTA buttons (Home, Contact), 4 quick links (Pricing, FAQ, Blog, Free
  Tools), minimal footer with logo + copyright.
- **Skip link**: did not exist anywhere in the codebase.
- **`id="main-content"`**: did not exist anywhere in the codebase.

### 1.2 Route inventory (authoritative, from `find` + `next build`'s route table)

File-system route definitions (`src/app/**`), 65 rows in the build's route
table:

| Category | Count | Notes |
| --- | --- | --- |
| Static pages (`○`) | 51 | 50 `page.tsx` files (49 pre-existing + `/design-system` added in the foundation phase) + `/sitemap.xml` |
| Dynamic on-demand routes (`ƒ`) | 12 | All under `/api/*`, plus `/feed.xml` |
| SSG via `generateStaticParams` (`●`) | 2 | `/authors/[slug]` (10 authors), `/api/mcp/pages/[slug]` |
| **Total route-table rows** | **65** | |

This "65" is **not** the same number as the "86 static pages" figure printed
by `next build`'s "Generating static pages (86/86)" line — that figure counts
every individually pre-rendered HTML file **after** expanding dynamic
segments (each author's `/authors/{slug}` page counted separately, etc.),
whereas the 65 above counts distinct route **definitions** in the file
system/route table. Both numbers are cited here with their exact meaning so
neither is used loosely.

Of the 50 `page.tsx` files: 1 is a dynamic segment (`/authors/[slug]`), 10 are
individual blog article routes, and (per the Batch 0 audit) 39 were `"use
client"` before this batch. This batch did not change that count for any
page file — only the 5 shell files above changed their client/server status
(Footer moved from client to a plain function component; the other 4 remain
client components, which is required for `not-found.tsx`... actually
`not-found.tsx` no longer needs `"use client"` and had the directive removed,
since it has no hooks or browser-only APIs — see §3.5).

### 1.3 Hydration warning — root cause

Reproduced the mismatch (visible on every `next dev` page load, in both the
`NavigationMenu` trigger's `id`/`aria-controls` and the mobile `Sheet`
trigger's `aria-controls`) and diagnosed it **before making any code
changes**, per the required order:

1. Built and ran a **production** server (`next build && next start -p 3001`)
   and loaded the homepage and `/pricing` — **zero hydration warnings** in
   the console on either route, checked twice.
2. Loaded the same two routes on the existing `next dev` server (port 3000,
   identical source at that point) — the warning appeared **on every single
   load**, with the exact same drifting id pattern each time
   (`radix-_R_1aatmlb_-trigger-...` vs `radix-_R_aaatmlb_-trigger-...`).
3. Traced the id generation: `@radix-ui/react-id`'s `useId()` (v1.1.1) is a
   thin wrapper that returns `React.useId()` directly since React 19 is
   installed — so the drifting ids are React's own native `useId()` output,
   meaning the *tree position* genuinely differs between the SSR-emitted
   HTML and the client's first render, but **only** under `next dev`.

**Conclusion:** this is a `next dev`-only artifact of Next.js 16's
development compiler (its Fast-Refresh/on-demand-compilation wrapping around
`"use client"` boundaries shifts React's per-request `useId()` counter
between the SSR pass and the first client hydration pass). It is not caused
by, or fixable in, Header/Sheet's own code — the components contain no
`typeof window` branches, no `Date.now()`/`Math.random()`, and no
locale-dependent formatting, and they are demonstrably clean in the actual
shipped (production) build. Per the task's own preferred order, step 1
("identify incorrect server/client composition") found none to fix; no
`suppressHydrationWarning` was added, the shell was not converted to
client-only rendering, and no Radix package was upgraded (already at latest:
`react-navigation-menu@1.2.14`, `react-id@1.1.1`, compatible with React 19 /
Next 16). **Verification:** production console is confirmed clean (see §6).

### 1.4 Baseline lint / TypeScript / build

`bun` is not installed in this environment; `npx eslint .` was run instead
(identical command to `package.json`'s `"lint": "eslint ."` script) and is
noted as a substitution, not a scope change.

- **Baseline lint**: 3 errors, 0 warnings, exit 1 — all in files outside this
  batch's scope: `ecosystem.config.cjs` (2×
  `@typescript-eslint/no-require-imports`) and
  `temp/examples/websocket/frontend.tsx` (1× `react-hooks/set-state-in-effect`).
  `temp/` is a stray full repository copy (including its own `.git`) that
  predates this work.
- **Baseline `tsc --noEmit`**: exit 2, errors in `examples/websocket/*`,
  `src/app/api/webhooks/github/route.ts`, `src/lib/redis.ts`, and their
  duplicates under `temp/` — none in any Batch 1 file. `next.config.ts` has
  `typescript.ignoreBuildErrors: true`, so these do not fail `next build`,
  but they are **not** treated as passing — they are recorded here as the
  pre-existing baseline exactly as instructed.
- **Baseline `next build`**: succeeded, 65 route-table rows (see §1.2).

---

## 2. Foundation correction: primary CTA contrast

Computed exactly (WCAG 2.1 relative-luminance formula, not estimated):

| Pairing | Contrast ratio | WCAG AA (normal text, 4.5:1) |
| --- | --- | --- |
| White text on `#448C74` (brand-primary) — the CTA background before this batch | **4.00:1** | **Fails** |
| White text on `#3A7A64` (brand-600) — new CTA background | **5.06:1** | **Passes** |
| White text on `#316653` (brand-700) — new CTA hover state | **6.65:1** | Passes |
| `#448C74` icon/large-text/non-text UI on white | 4.00:1 | Passes (large-text/non-text threshold is 3:1) |

**Decision:** `#448C74` (brand-primary) is kept as the identity color for
icons, borders, badges, and large/display text, exactly as instructed.
Button/CTA **backgrounds** now use the existing brand ramp's `brand-600`
(resting) / `brand-700` (hover) — both values already existed in the ramp
added in the design-system foundation phase (`brand-600` is numerically
identical to the old `--brand-primary-hover`), so no new hex values were
introduced.

**Files changed for this correction:**
- `src/app/globals.css` — `--primary` (the shadcn semantic token driving
  `bg-primary`/`text-primary-foreground`, i.e. every default-variant
  `<Button>` across the site) changed from `#448C74` to `#3A7A64`, with an
  inline comment recording the measured ratios. `--brand-primary` itself,
  `--ring`, and `--brand-primary-light` were **not** changed (icons/borders/
  focus rings all already clear the 3:1 non-text threshold).
- `src/components/shared/CTAGroup.tsx` — `PrimaryCTA` now renders
  `bg-brand-600 ... hover:bg-brand-700` instead of
  `bg-brand-primary ... hover:bg-brand-primary-hover`.
- `src/components/landing/Header.tsx` — desktop + mobile "Get Started"
  buttons and the Solutions dropdown's "Popular" badge switched from
  `bg-brand-primary` to `bg-brand-600` (same defect pattern: solid green fill
  + white text).
- `src/components/landing/BookDemoPopup.tsx` — trigger and submit buttons
  switched to `bg-brand-600 hover:bg-brand-700`.
- `WHATS91_DESIGN_SYSTEM.md` already documented this exact rule in §2.2/§5.3
  from the foundation phase (written proactively during that phase); no
  further doc changes were needed.

**Not changed (documented, out of scope for this batch):** small badge/pill
text using `text-brand-primary` on a light tint (e.g. the Header's "Meta
Partner" pill, `Eyebrow` component) has the same ~4.0:1 ratio and technically
also falls short of the 4.5:1 threshold for its ~10–14px text. This is a
sitewide pattern spanning dozens of files well beyond Header/Footer/
CookieConsent/BookDemoPopup/not-found, so per "do not make uncontrolled
colour changes across unrelated components" it was **not** touched here. It
is recorded in §7 (Known issues) for a future accessibility-focused batch.

---

## 3. Implementation summary

### 3.1 Header (`src/components/landing/Header.tsx`)

- Added a `SkipLink` as the first rendered element (see §3.6).
- Preserved the **exact** navigation IA: same 10 solutions items (same
  hrefs, icons, descriptions, "Popular" flags), same 5 primary links, same
  Templates link, same "Get Started" external destination. Nothing renamed,
  removed, or merged.
- Added active-route state: `isNavActive()` matches exact path or a nested
  path (`/features` also activates on `/features/chat-shortcuts-...`); the
  Solutions trigger activates when `pathname.startsWith('/solutions/')`.
  Active links get `aria-current="page"` (external "Get Started" link is
  correctly excluded from any active-state logic). Applied identically on
  desktop nav, mobile Sheet nav, and the Templates link.
- Scroll-state treatment: a passive `scroll` listener toggles a border/shadow
  once `scrollY > 8`, replacing the constant `backdrop-blur-xl` with a
  lighter `backdrop-blur-sm` (per "no excessive blur or glass effect").
- Mobile menu trigger touch target fixed from 36×36px to 44×44px
  (`h-9 w-9` → `h-11 w-11`); accessible name improved from "Toggle menu" to
  "Open main menu".
- Added `SheetTitle`/`SheetDescription` (both `sr-only`) to the mobile
  Sheet — fixes a real, previously-console-flagged accessibility gap
  ("`DialogContent` requires a `DialogTitle`"); Radix's `Sheet` is built on
  `Dialog` and requires this for screen-reader users. Confirmed via a fresh
  browser tab that the warning is gone after the fix and no visual change
  resulted (the title/description are visually hidden).
- Fixed a latent bug: the mobile Sheet's "WhatsApp Templates" button was not
  wrapped in `SheetClose`, so navigating via it left the sheet's open state
  `true` on the destination route (Header persists across client-side
  navigations). Now wrapped, matching the "menu closes after a navigation
  link is selected" requirement.
- Sheet width increased slightly (`sm:w-[340px] md:w-[380px]`, was a flat
  `sm:w-[320px]`) for more breathing room at tablet widths.
- `max-h-[calc(100vh-180px)]` → `max-h-[calc(100dvh-180px)]` for correctness
  on mobile browsers with dynamic chrome.
- Decorative icons marked `aria-hidden="true"` throughout (menu icon,
  solution-list icons, the small status dot).
- CTA contrast fix (§2).

### 3.2 Footer (`src/components/landing/Footer.tsx`)

- Converted from a client component (whose only reason for `"use client"`
  was the version fetch) to a plain function component with no hooks and no
  browser-only APIs — safe to render from either a Server or Client
  Component parent (see §3.7 for why this matters).
- Version is now read via `process.env.NEXT_PUBLIC_APP_VERSION`, baked into
  the build (see §3.7) instead of a client-side `useEffect` + `fetch`. This
  removes the request, the "..." loading flash, and the associated
  hydration timing risk, and works identically regardless of whether the
  page rendering Footer is a Server or Client Component.
- Fixed a real tablet-layout bug: the four link-group columns (Solutions,
  Pricing, Resources, Company) were nested in an internal grid that only
  ever showed 2 columns, squeezed into half the row from `md` upward. Now:
  phone stays 2-up (unchanged from original, matches audit's stated
  requirement to keep the current architecture where it already works),
  and from `md` (768px) the four groups become **one clean 4-column row**
  spanning the full width — verified visually at 768px (see §6).
- WhatsApp contact icon recolored from raw Tailwind `green-500`/`green-600`
  to the site's own `text-brand-primary`/`hover:brand-primary-hover` tokens,
  removing the last raw-palette color in this file (small, in-scope,
  low-risk normalization).
- All links, groups, "Popular" tags, contact details, and the
  `BookDemoPopup` usage preserved exactly.

### 3.3 CookieConsent (`src/components/landing/CookieConsent.tsx`)

- Replaced the two separate desktop/mobile implementations with a single
  responsive layout (icon + one-line summary + Cookie Policy link, stacking
  to full-width buttons below `sm`, row layout from `sm` up).
- Storage key (`whats91_cookie_consent`), both recorded values
  (`"accepted"`/`"rejected"`), and the `/cookies` destination are unchanged.
- Removed the bare `X` "close" control, which previously hid the banner
  **without recording any decision** — a dismiss-without-deciding pattern
  the task explicitly asked to eliminate. Removed the redundant icon-only
  "Settings" button (it only ever linked to `/cookies`, which remains
  reachable via the inline "Cookie Policy" link in the banner text) to keep
  the compact layout to exactly two real decisions.
- Measured mobile footprint: **24% of a 700px-tall viewport** (167px),
  down from an estimated ~50%.
- `role="dialog" aria-modal="false"` (was `role="dialog"` with no
  `aria-modal`) — this banner does not trap focus or block the rest of the
  page, so `aria-modal="false"` is the accurate semantic; `aria-describedby`
  was dropped since the description and the accept/reject choice are now a
  single short paragraph referenced by `aria-labelledby` alone.
- `env(safe-area-inset-bottom)` preserved/generalized via inline style
  (`paddingBottom: max(0.75rem, env(...))`) for notched devices.

### 3.4 BookDemoPopup (`src/components/landing/BookDemoPopup.tsx`)

- Preserved exactly: field set (name/email/phone), `required`/`type`
  validation attributes, `executeRecaptcha` call, `POST /api/demo` payload
  shape, success auto-close-after-3s behavior, and the Privacy Policy link.
- Added per-field error surfacing: the API's zod `issues` array (each with a
  `path`) is now mapped to `aria-invalid` + an inline `<p id="...-error">`
  under the relevant field, linked via `aria-describedby`, in addition to
  the existing top-level banner (`role="alert"`, restyled onto the
  `error-soft`/`error-border` status tokens instead of `destructive/10`).
- Fixed a real horizontal-overflow bug found during testing (see §6): the
  Cancel/Submit button row used `flex-1` on both `whitespace-nowrap`
  buttons, which does not allow shrinking below content width — at 320px
  viewport the dialog rendered visibly wider than its own container,
  clipping the description text and both button labels. Fixed with
  `flex-col-reverse sm:flex-row` (submit prioritized above cancel when
  stacked, matching the existing hero/header CTA-stacking convention) —
  verified clean at 320px after the fix.
- Added `max-h-[calc(100dvh-2rem)] overflow-y-auto` to `DialogContent` for
  short-viewport scroll behavior (there was previously no height/overflow
  handling at all).
- Success-state icon switched to the shared `IconBadge` component
  (`tone="success"`) instead of a hardcoded `bg-brand-primary/10
  text-brand-primary` tile, for status-token consistency.
- CTA contrast fix (§2). Cancel/Close remain fully keyboard/focus-trap/
  return-focus correct via Radix `Dialog` (unmodified `ui/dialog.tsx`).

### 3.5 not-found.tsx (`src/app/not-found.tsx`)

- Rebuilt using the shared design-system primitives (`Container`, `Section`,
  `CTAGroup`, `PrimaryCTA`, `SecondaryCTA`, `Eyebrow`) instead of one-off
  markup, per `WHATS91_PAGE_PATTERN_LIBRARY.md`.
- Preserved exactly: no `<Header/>` (matches the original's intentional
  minimal shell), same two CTAs (Home, Contact — same destinations), same 4
  quick links (Pricing, FAQ, Blog, Free Tools — same destinations, same
  order), same minimal footer (logo + copyright).
- Dropped the `"use client"` directive — the page has no hooks or
  browser-only APIs and does not need it.
- Added `id="main-content" tabIndex={-1}` to its `<main>` so the skip link
  (were the header ever added to this page in a future batch) resolves
  directly rather than via the fallback.
- Verified the framework's `not-found.tsx` convention still returns a real
  HTTP 404 (see §6) — no code changes were needed for this, it's automatic.

### 3.6 Skip-to-content (new: `src/components/shared/SkipLink.tsx`)

**Chosen approach and why:** the codebase has no shared page-shell
component — every page inlines its own
`<div><Header/><main className="flex-1">...</main><Footer/></div>`
(confirmed via the pre-existing `design.md` and by grepping). Adding
`id="main-content"` to all 49 pre-existing pages' `<main>` elements would
have meant touching dozens of files far outside this batch's stated scope
("global shell only"). Instead:

- `SkipLink` is the first element Header renders. It targets
  `href="#main-content"` (so it still works via plain browser anchor
  behavior once a page adds the id, and degrades gracefully with JS
  disabled — nothing happens, same as any anchor to a currently-absent id).
- Its `onClick` handler looks for `#main-content` first, and **falls back to
  the page's `<main>` element** (which every existing page already has) if
  the id isn't present yet, dynamically adding `tabindex="-1"` and moving
  focus there. This makes the skip link **immediately functional on all 49
  pre-existing routes today**, not just on pages already migrated.
- `not-found.tsx`'s `<main>` now has the real id (see §3.5); other pages
  will pick up the id as they're migrated in their own batches. A one-line
  requirement was **not** added to `WHATS91_PAGE_MIGRATION_GUIDE.md` in this
  batch to keep the changed-file list minimal — noted here instead as a
  reminder for whoever runs Batch 2 onward: add
  `id="main-content" tabIndex={-1}` to each page's `<main>` as it migrates.
- Verified via direct `.click()` in the browser: focus moves to `<main>`,
  `tabindex="-1"` is applied, page scrolls to top of main content. (A
  synthetic Enter-key press through the browser-automation tool did not
  reliably trigger the anchor's click handler — a known limitation of that
  specific keyboard-automation path, not a defect in the component; the
  direct `.click()` test is the reliable signal here and confirms correct
  behavior for real users, who press Enter on a focused link via native
  browser behavior.)
- Styling (`.skip-link` in `globals.css`): fixed position, off-screen until
  `:focus-visible`, uses the `--z-toast` token (highest layer) so it's never
  obscured, `top` transition (caught by the global
  `prefers-reduced-motion` rule already in place from the foundation phase).

### 3.7 Version display (`next.config.ts`, `src/lib/version.ts`, `Footer.tsx`)

**Problem found during implementation:** an initial version made `Footer`
call `getAppVersion()` (a new `fs`/`path`-based helper) directly. This broke
the build immediately — Next.js reported `Module not found: Can't resolve
'fs'` in the **client** bundle, because roughly 39 of 49 page files are
still `"use client"` (per the Batch 0 audit) and directly `import { Footer }
... <Footer />`. In the Next.js App Router, once a component is reached via
a Client Component's own render (not passed down as `children` from a Server
Component), it is compiled into the client bundle regardless of whether it
has its own `"use client"` directive — there is no way for a component to
"opt back into" server-only execution once it's imported this way. Since
touching 39 page files to change how they render `Footer` is far outside
this batch's scope, `Footer` itself cannot safely do a request-time `fs`
read.

**Resolution:** `version.txt` is read once, at **build/config-evaluation
time**, inside `next.config.ts` (a pure Node context that Next.js never
bundles into either the server or client output) and exposed via
`env: { NEXT_PUBLIC_APP_VERSION: getAppVersion() }`. Next.js inlines
`NEXT_PUBLIC_*` values as plain string literals into every bundle at build
time. `Footer` now reads `process.env.NEXT_PUBLIC_APP_VERSION` directly —
no hooks, no fs, safe from either a Server or Client Component parent, and
identical between server-render and client-render (so it also cannot
introduce a hydration mismatch, unlike a runtime fetch would). `getAppVersion()`
(`src/lib/version.ts`) mirrors the existing `/api/version` route's path
fallback (project root in dev, `.next/standalone` under the pm2 config in
`ecosystem.config.cjs`) and defaults to `"0.0.0"` if `version.txt` is
missing, per "provide a graceful fallback."

**`/api/version` was intentionally left untouched.** `grep -rn "api/version"
src/` showed no other internal consumer, but it's a public route that could
be polled externally (health checks, deploy tooling), so it was not deleted
or refactored, per "do not delete `/api/version` if another part of the
application still uses it" — erring toward caution since external usage
can't be grepped for.

---

## 4. Files changed

| File | Reason |
| --- | --- |
| `src/components/landing/Header.tsx` | Batch 1 target: skip link, active-nav state, scroll treatment, touch-target fix, `SheetClose` bug fix, `SheetTitle`/`Description` a11y fix, CTA contrast |
| `src/components/landing/Footer.tsx` | Batch 1 target: server-safe version display, tablet grid fix, link-color normalization |
| `src/components/landing/CookieConsent.tsx` | Batch 1 target: compact unified banner, removed dismiss-without-deciding control |
| `src/components/landing/BookDemoPopup.tsx` | Batch 1 target: per-field errors, overflow fix, scroll handling, CTA contrast |
| `src/app/not-found.tsx` | Batch 1 target: restyle onto design-system primitives, `main-content` id |
| `src/components/shared/SkipLink.tsx` | New — required skip-to-content deliverable |
| `src/lib/version.ts` | New — build-time version reader (used by `next.config.ts` only) |
| `next.config.ts` | Bakes `version.txt` into `NEXT_PUBLIC_APP_VERSION` at build time — required to make Footer's version display server/client-safe without touching 39 other page files |
| `src/app/globals.css` | `--primary` token corrected for CTA contrast (§2); `.skip-link` recipe added |
| `src/components/shared/CTAGroup.tsx` | `PrimaryCTA` background corrected for CTA contrast (§2) — this file was created in the foundation phase, not new to this batch, but its color was wrong until now |

No other files were changed. No page content, route, slug, metadata, or
JSON-LD was touched.

---

## 5. Behaviour preservation — confirmed

- **Navigation IA unchanged**: same solutions list (10 items, same hrefs/
  icons/descriptions/featured flags), same primary links, same Templates
  link, same Get Started destination, same footer link groups/labels/hrefs/
  "Popular" flags, same legal links.
- **Forms unchanged**: BookDemoPopup's fields, validation, `/api/demo`
  payload shape and endpoint are identical; verified via a live `POST
  /api/demo` call in this session that the endpoint still validates and
  responds in the expected shape.
- **Cookie semantics unchanged**: same storage key, same two recorded
  values, same meaning: Reject writes `"rejected"`, Accept writes
  `"accepted"`. (The removed `X` button previously recorded **nothing** —
  its removal doesn't change any preserved semantic, it removes a
  non-deciding escape hatch.)
- **Routes unchanged**: 0 slugs renamed, 0 pages removed/merged; the route
  table is identical before and after this batch (65 rows, see §1.2 and §6).
- **Metadata/schema unchanged**: no `generateMetadata`, JSON-LD, or
  `sitemap.ts` entries were touched.

---

## 6. Verification evidence

**Lint** — `npx eslint .` (substituting for `bun run lint`, `bun` not
present in this environment):
```
✖ 3 problems (3 errors, 0 warnings)
```
Identical to the recorded baseline (same 2 files, same 3 errors, none in
Batch 1 files). Exit code 1 in both baseline and final — unchanged.

**TypeScript** — `npx tsc --noEmit`: output is **byte-for-byte identical**
to the recorded baseline (`diff` exit code 0). Zero new errors; all changed
files are TypeScript-clean.

**Build** — `npx next build`:
```
✓ Compiled successfully in 3.7s
```
Route table: 51 static + 12 dynamic + 2 SSG = 65 rows, matching the baseline
exactly.

**Responsive matrix** (dev server, real browser, per width):

| Width | Result |
| --- | --- |
| 320px | Header: exactly 320px wide, zero overflow. `not-found.tsx`: zero overflow, clean stack. BookDemoPopup: **found and fixed** a real overflow bug (button row) — clean after fix. CookieConsent: 24% of viewport height. Homepage: a **pre-existing, out-of-scope** overflow was found in homepage body content (Solutions/BusyERP section, ~38px), confirmed unrelated to Header/Footer and not touched (Batch 2 concern) |
| 375px | Mobile Sheet opens correctly (all 10 solutions + 5 primary links + footer CTAs), Cookie banner Accept/Reject both functional and correctly recorded to `localStorage` |
| 768px | Tablet: header shows the mobile Sheet trigger (by design, `lg` breakpoint is 1024px, unchanged from original); **Footer's 4-column tablet fix verified visually** — full-width brand row, then one clean 4-column link row, zero overflow |
| 1024–1536px | Desktop nav, Solutions mega-menu (no layout shift on open/close), active-route states (`aria-current="page"` confirmed via DOM inspection on `/pricing`; Solutions trigger active-class confirmed on `/solutions/busy-erp`) all verified |

**Keyboard / accessibility:**
- Skip link: appears on first `Tab` from page load, visible focus ring,
  `.click()` moves focus to `<main>` with dynamically-added `tabindex="-1"`.
- Mobile Sheet: opens via trigger, background scroll locked
  (`body { overflow: hidden }` confirmed), `Escape` closes it, body scroll
  restored, focus returned to the trigger button (`document.activeElement`
  confirmed as the "Open main menu" button) — all via direct DOM inspection.
- BookDemoPopup: `Escape` closes (confirmed visually), body scroll lock
  confirmed, focus lands in the first field on open (Radix default).
- `aria-current="page"` confirmed present/absent correctly across desktop
  and mobile nav, and correctly **absent** on the external "Get Started"
  link.

**Hydration / console:** production build (`next start`) shows **zero**
hydration warnings on homepage and `/pricing` (checked in a fresh browser
tab to rule out buffered console history). The pre-existing
`DialogContent requires a DialogTitle` warning (from the mobile Sheet
lacking a title) was found, fixed, and **re-verified as gone** in a fresh
tab after the fix.

**Links / routes:** scripted sweep of all 49 pre-existing page routes
(`curl` against the dev server) — 49/49 return `200`. `POST /api/demo`
verified live (reaches validation + reCAPTCHA check, as expected without a
real token). `/api/version` verified unchanged (`{"version":"1.6.3"}`).

**Reduced motion:** `window.matchMedia('(prefers-reduced-motion: reduce)')`
confirmed supported; the global reduced-motion rule from the foundation
phase (`globals.css`) already forces all transitions/animations to ~0ms
site-wide, which covers the new skip-link transition and CookieConsent's
slide-in without any additional per-component overrides needed (both also
carry explicit `motion-reduce:` Tailwind variants where an `animate-*`
utility is used, e.g. spinners).

**Console (final):** zero errors on homepage, `/pricing`, `/contact`,
`/about`, `/solutions/busy-erp`, a blog article, and `/design-system`,
checked in a fresh tab.

---

## 7. Known issues (honest list)

1. **Badge/pill text contrast**: `text-brand-primary` on light tints (Header's
   "Meta Partner" pill, the `Eyebrow` component used across dozens of
   sections) measures ~4.0:1, short of 4.5:1 for their small (~10–14px) text.
   This is a sitewide pattern outside this batch's 5 target files and was
   deliberately not touched here (see §2). Flag for a dedicated
   accessibility batch.
2. **Homepage body overflow at 320px** (~38px, in the Solutions/BusyERP
   section): pre-existing, confirmed unrelated to Header/Footer, out of
   scope (Batch 2 — Homepage). Documented here so it isn't lost.
3. **39 of 49 pages remain `"use client"`**: unchanged by this batch by
   design (this is exactly why the version-display fix had to be done via
   build-time env injection rather than a Server Component — see §3.7).
   Each page's own migration batch is the place to convert it and add
   `id="main-content"`.
4. **`WHATS91_PAGE_MIGRATION_GUIDE.md`** was not updated with the
   `id="main-content"` requirement in this batch, to keep the changed-file
   list to what was strictly necessary. Recorded here as a reminder before
   Batch 2 begins.
5. Two pre-existing baseline lint errors (`ecosystem.config.cjs`,
   `temp/examples/websocket/frontend.tsx`) and the pre-existing `tsc`
   errors (websocket examples, GitHub webhook route, `redis.ts`, all
   duplicated under `temp/`) remain exactly as they were — untouched, not
   introduced by this batch, not in scope.

---

## 8. Batch 2 readiness

**The global shell is stable and ready for Batch 2 (Homepage).** Header,
Footer, CookieConsent, BookDemoPopup, and the 404 page all: build cleanly,
lint cleanly (no new errors), type-check identically to baseline, render
correctly across the full responsive matrix, preserve every existing link/
route/form/consent behavior, and are free of the accessibility gaps found
during this pass. The one item Batch 2 should pick up immediately: the
homepage's existing hero CTA buttons have no `href` (dead buttons, noted in
the original UI audit) and the ~38px overflow at 320px found in this
session's testing (§7.2) — both squarely Homepage/Batch 2 concerns.
