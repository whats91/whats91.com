# Whats91 Design System — Master Guideline

> **This is the single source of truth for all Whats91.com UI work.**
> Any AI model or developer redesigning a page must follow this document plus
> `WHATS91_PAGE_PATTERN_LIBRARY.md` and `WHATS91_PAGE_MIGRATION_GUIDE.md`.
> Implementation lives in `src/app/globals.css` and `src/components/shared/`.
> A live rendering of every primitive is at `/design-system` (internal, noindex).

---

## 1. Brand direction

**Direction name: "Evergreen Precision."**

Whats91 is a Meta-verified WhatsApp Cloud API platform for Indian businesses —
ERP-connected, developer-credible, compliance-serious. The visual language is:

- **Evergreen ink**: deep slate ink (`#0F172A`) for words, brand green
  (`#448C74`) for action and identity. Calm, not loud.
- **Mist surfaces**: white pages with soft green-tinted mist bands
  (`--surface #F8FAF9`) to create rhythm without decoration.
- **One accent family**: everything brand-colored comes from the green ramp
  (`brand-50 … brand-950`). No blue/indigo/purple as brand colors — ever
  (house rule in AGENTS.md).
- **Ink panels for developers**: dark surfaces exist only as "ink" code/API
  panels. The site itself is light.
- **Evidence over ornament**: numbers, screenshots, code and compliance badges
  do the persuading. No glassmorphism, no glow, no decorative 3D.

It should feel adjacent to WhatsApp (green, conversational) without imitating
WhatsApp or Meta trade dress, and clearly more engineered than template-based
competitors.

### Design principles

1. **Token first.** If a value isn't a token or documented recipe, don't use it.
2. **One way per job.** One card recipe, one container system, one heading
   scale. Variation comes from layout, not from new styles.
3. **Every breakpoint is designed.** Tablet is a layout, not a stretched phone.
4. **Accessible by default.** Contrast, focus, reduced motion, 12px text floor.
5. **Content is sacred.** Redesigns restyle real Whats91 content; they never
   invent claims, stats or customers.

---

## 2. Design tokens

All tokens are CSS custom properties in `src/app/globals.css`, registered in
`@theme inline` so they are usable as Tailwind utilities (e.g. `bg-brand-100`,
`text-success`, `border-info-border`). **Never hard-code hex values, arbitrary
px sizes or raw Tailwind palette colors (`green-600`, `blue-50`…) in pages.**

### 2.1 Color — core semantics (light theme)

| Token / utility | Value | Use |
| --- | --- | --- |
| `bg-background` | `#FFFFFF` | Page background |
| `text-foreground` / `text-text-primary` | `#0F172A` | Headings, strong text |
| `text-text-secondary` | `#475569` | Body copy |
| `text-text-muted` | `#64748B` | Captions, metadata |
| `bg-surface` | `#F8FAF9` | Alternating section bands (use `bg-surface/50`) |
| `bg-surface-subtle` | `#F1F5F4` | Nested subtle fills |
| `border-border` | `#E2E8F0` | Default borders (usually `border-border/60`) |
| `border-border-subtle` | `#F1F5F4` | Hairlines |
| `bg-card` | `#FFFFFF` | Card fill — **use instead of `bg-white`** |

### 2.2 Color — brand

| Token / utility | Value | Use |
| --- | --- | --- |
| `brand-primary` | `#448C74` | Primary actions, icons, links |
| `brand-primary-hover` | `#3A7A64` | Primary hover |
| `brand-primary-light` | `rgba(68,140,116,.08)` | Pill/badge fills, icon tiles |
| `brand-accent` | `#54a084` | Gradient endpoint only |
| `brand-50…950` | `#F2F8F5 → #122720` | Tints, charts, hover states, dark text on light green |

Gradients (only these two): `.gradient-brand-subtle` for hero/CTA band
backgrounds, `.text-gradient` for one emphasized phrase per page maximum.
Final-CTA panel: `bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent`.

### 2.3 Color — status (semantic only, never decorative)

| Meaning | Text/icon | Soft bg | Border |
| --- | --- | --- | --- |
| Success | `text-success` `#15803D` | `bg-success-soft` `#F0FDF4` | `border-success-border` `#BBF7D0` |
| Warning | `text-warning` `#B45309` | `bg-warning-soft` `#FFFBEB` | `border-warning-border` `#FDE68A` |
| Error | `text-error` `#DC2626` | `bg-error-soft` `#FEF2F2` | `border-error-border` `#FECACA` |
| Info | `text-info` `#0369A1` | `bg-info-soft` `#F0F9FF` | `border-info-border` `#BAE6FD` |

Migration mapping: green-* → success, amber/yellow-* → warning, red-* → error,
blue-* → info. Purple/pink/cyan/orange category colors: keep **only** in the
blog category badge system; nowhere else.

### 2.4 Color — ink (dark developer surfaces)

`bg-ink #0F172A`, `bg-ink-elevated #1E293B`, `border-ink-border #334155`,
`text-ink-text #CBD5E1`, `text-ink-text-muted #94A3B8`. Use via `.ink-panel`
or `<Section tone="ink">`. This is the **only** approved dark surface.

### 2.5 Shadows

`--shadow-xs/sm/md/lg/xl/2xl` (layered slate), `--shadow-brand`,
`--shadow-brand-sm` (green-tinted, primary CTAs only). Cards rest at `xs`,
hover to `md`. Nothing on the page exceeds `xl` except modals.

### 2.6 Radius

| Element | Radius |
| --- | --- |
| Inputs, small buttons | `rounded-md` (10px) |
| Buttons (CTA), icon tiles, banners | `rounded-xl` (16px) |
| Cards | `rounded-2xl` via `.surface-card` (16px) |
| Large CTA/hero panels | `rounded-2xl sm:rounded-3xl` |
| Pills, badges | `rounded-full` |

Never introduce other radii.

### 2.7 Spacing and layout

- Base unit 4px; components use the Tailwind scale (no arbitrary values).
- Containers (`--container-*` tokens): **default 1200px**, wide 1280px,
  narrow 896px, reading 720px — via `<Container size>` or `.container-page` etc.
- Section rhythm (fluid): `.section-pad-sm` (40–64px), `.section-pad`
  (56–96px), `.section-pad-lg` (72–120px) — via `<Section pad>`.
- Grid gaps: cards `gap-4`/`gap-5` (16/20px), major two-column splits
  `gap-10 lg:gap-14`.

### 2.8 Z-index

`--z-raised 10`, `--z-sticky 30`, `--z-dropdown 40`, `--z-header 50`,
`--z-overlay 80`, `--z-modal 90`, `--z-toast 100`. The header keeps `z-50`;
never exceed it except overlays/modals/toasts.

### 2.9 Motion tokens

Durations: `--duration-fast 150ms` (color/opacity), `--duration-base 200ms`
(hover lifts), `--duration-slow 300ms` (panels), `--duration-slower 500ms`
(entrances). Easing: `--ease-standard` for state changes, `--ease-out-soft`
for entrances. See §7.

---

## 3. Typography

**Font:** Inter (loaded via next/font, `--font-inter`). Mono: system mono
stack via `font-mono` (do not add a mono webfont without a performance review).

Use the fluid classes — never re-compose `text-3xl sm:text-4xl md:text-5xl`:

| Class | Size (fluid) | Weight / tracking | Use |
| --- | --- | --- | --- |
| `.heading-display` | 40→64px | 700 / -0.025em | Homepage hero only |
| `.heading-1` | 32→52px | 700 / -0.02em | Page `h1` |
| `.heading-2` | 26→38px | 700 / -0.02em | Section `h2` |
| `.heading-3` | 20→26px | 600 / -0.01em | Subsection `h3` |
| `.heading-4` | 18px | 600 | Card titles |
| `.text-lead` | 17→20px / 1.6 | 400 | Hero/section descriptions |
| `.text-body` | 16px / 1.65 | 400 | Default paragraphs |
| `.text-body-sm` | 14px / 1.6 | 400 | Dense UI copy, card descriptions |
| `.text-caption` | 12px / 1.5 | 400, `text-muted` | Metadata. **12px is the floor** |
| `.text-overline` | 12px, caps, +0.08em | 600, brand | Kickers above titles |

Rules: max one `h1` per page; don't skip levels; body/lead prose capped with
`.measure-prose` (65ch); no font-weight below 400; muted text only for
metadata, never for whole paragraphs; text in mock-UI visuals may go smaller
than 12px only inside `aria-hidden` decorative compositions.

---

## 4. Breakpoints and responsive rules

Tailwind defaults: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
Design targets: small phone 320–374, phone 375–639, large phone/phablet
640–767, tablet portrait 768–1023, laptop 1024–1279, desktop 1280–1535,
large desktop 1536+.

| Concern | Phone (<640) | Tablet (768–1023) | Desktop (≥1024) |
| --- | --- | --- | --- |
| Container padding | 16px | 24px | 32px |
| Hero | 1 col, centered text, CTAs stacked full-width | 1 col, centered, **max-w-2xl text**, CTAs in a row; or 2-col at `md` when visual is compact | 2 col (`lg:grid-cols-2`), text left |
| Feature grids | 1 col | 2 col (`sm:grid-cols-2`) | 3–4 col at `lg` |
| Stats | 2 col | 2–4 col | 4 col |
| Nav | Sheet menu | Sheet menu | Full nav from `lg` |
| Tables | Card fallback or `overflow-x-auto` | same | full table |
| Footer link groups | 2 col | 3 col | 6-col grid (`lg:grid-cols-6`) |
| Tabs with many items | horizontal scroll, no wrap | inline | inline |

**Tablet rule:** at `md`, always do at least one of: raise text max-width,
move grids to 2–3 columns, or activate the two-column split early. Never leave
a 700px-wide single column of full-bleed text.

Touch targets ≥44×44px on phone/tablet. CTA rows stack below `sm`
(`CTAGroup` handles this).

---

## 5. Core components

### 5.1 Shared primitives (`src/components/shared`) — use these first

| Component | Purpose / key props |
| --- | --- |
| `Container` | Horizontal container. `size: default\|wide\|narrow\|reading` |
| `Section` | Vertical band. `tone: default\|surface\|brand-soft\|ink`, `pad: none\|sm\|default\|lg`, `bordered` |
| `SectionHeader` | Eyebrow + fluid title + description. `align: center\|left`, `as: h1\|h2\|h3`, `id` for `aria-labelledby` |
| `Eyebrow` | Brand pill label. `icon`, `live` (animated dot) |
| `PrimaryCTA` / `SecondaryCTA` | Conversion links (render `<a>`; external URLs get `target=_blank rel=noopener`) |
| `CTAGroup` | CTA layout: stacks on phone. `align: center\|left\|responsive-hero` |
| `FeatureCard` | Icon tile + title + description (+ `href` to make the card a link) |
| `StatCard` | Metric tile: `value`, `label`, optional `icon` |
| `IconBadge` | Icon tile. `size sm\|md\|lg`, `tone brand\|success\|warning\|error\|info\|ink` |
| `TrustPill` | Proof chip for hero rows |

All are server-component safe (no client JS).

### 5.2 shadcn/ui (`src/components/ui`) — never modify these files

Use for interactive elements: `Button`, `Accordion` (FAQs), `Tabs`, `Sheet`
(mobile nav), `Dialog`, `Select`, `Input`, `Textarea`, `Checkbox`,
`RadioGroup`, `Switch`, `Tooltip`, `Table`, `Badge`, `Card` (app-like UI only —
marketing cards use `.surface-card`).

### 5.3 Buttons

| Role | Recipe | Notes |
| --- | --- | --- |
| Primary conversion | `PrimaryCTA` | One per hero/final CTA; brand fill + brand shadow + arrow |
| Secondary conversion | `SecondaryCTA` | Outline; pairs with primary |
| In-page action | `Button` default | Forms, tools |
| Quiet action | `Button variant="outline"/"ghost"` | Toolbars, cancel |
| Destructive | `Button variant="destructive"` | Confirmations only |
| Text link | `.link-inline` | Inside prose |

States are built in: hover (fill darkens / border strengthens), focus
(global 2px `--ring` outline, offset 2px), disabled (50% opacity, no pointer),
active (default). Button label text never wraps; if it would, shorten the label.

### 5.4 Cards

One recipe: `.surface-card` (card fill, 1px `border/60`, `rounded-2xl`,
`shadow-xs`). Interactive cards add `.surface-card-hover` (border →
brand-tinted, shadow → md). Padding `p-5 sm:p-6`. Equal-height in grids via
`h-full flex flex-col`. **Do not** invent per-page card styles, and do not use
hover lift on non-clickable cards.

Specialized cards (pricing, testimonial, blog, integration) are compositions
of `.surface-card` — see the Pattern Library.

### 5.5 Forms

`Input`/`Textarea`/`Select` from shadcn + `Label` (always visible — no
placeholder-as-label). Errors: `text-error` message under the field +
`aria-invalid` (shadcn styles the ring automatically). Required marked in the
label. Field width capped at `--container-narrow`. Submit uses `Button`
default, full-width below `sm`.

### 5.6 Badges and pills

`Eyebrow` (section kickers), `TrustPill` (proof chips), shadcn `Badge` for
inline statuses (map to status tokens), blog category badges keep their
existing color map.

### 5.7 Tables

Wrap in `.surface-card` + `overflow-x-auto`; `min-w-[640px]` on the table when
columns are wide; header row `bg-surface/50 text-text-secondary text-sm`;
row hairlines `border-border/60`. On phone, prefer the existing card-per-row
fallback pattern for comparison tables.

### 5.8 Accordions (FAQ)

shadcn `Accordion` (`type="single" collapsible`) inside `Container
size="narrow"`. Question: `text-body` weight 500; answer: `text-body-sm`.
Never hide crawl-relevant content anywhere else.

### 5.9 Code blocks

`.ink-panel` with a `bg-ink-elevated` title bar (filename in mono
`text-ink-text-muted`), `pre` in `font-mono text-xs sm:text-sm` with
`overflow-x-auto`. Copy-to-clipboard button optional (ghost, top-right).
Never show tokens/secrets; use `$TOKEN` placeholders.

### 5.10 Empty / loading / error states

Loading: shadcn `Skeleton` shaped like the final content. Empty: icon tile +
one-line explanation + one action. Error: `bg-error-soft` banner with icon +
retry. Never a blank region.

---

## 6. Section tones and rhythm

Allowed backgrounds, in order of intensity:
`default` (white) → `surface` (mist) → `brand-soft` (hero gradient) →
`ink` (developer) → brand-gradient panel (final CTA only, as an inner rounded
panel not a full-bleed band).

Rules: alternate default/surface down the page; `brand-soft` only for the hero
band and at most one emphasis band; one `ink` section per page max; never two
identical-tone bands adjacent; final CTA is an inner gradient panel inside a
`default` section.

---

## 7. Motion

- Hover states: color/border/shadow via `--duration-base --ease-standard`.
  Cards may translate up ≤2px; CTAs never move, only shadow/fill.
- Entrances: `.animate-fade-in-up` (500ms, `--ease-out-soft`, ≤12px travel),
  stagger ≤3 items, above-the-fold only on the hero. No parallax, no
  scroll-jacking, no looping decorative animation except the `Eyebrow live`
  dot and existing product demos.
- Accordions/dropdowns/sheets: Radix defaults (already tuned).
- **Reduced motion is global**: `prefers-reduced-motion` collapses all
  animation/transition to 0.01ms (in `globals.css`); the `live` dot ping is
  additionally hidden (`motion-reduce:hidden`). Never override this.
- Performance: animate only `transform`/`opacity`/`color`/`shadow`; no
  animation libraries for marketing sections (framer-motion stays confined to
  the existing product demo components).

---

## 8. Accessibility (WCAG 2.2 AA)

- **Contrast:** text-secondary on white 7.5:1 ✓; muted on white 4.9:1 ✓ (min
  size 12px); brand-primary on white is 3.9:1 — **fine for large text, icons
  and fills, but body-size brand text must be `brand-600` (#3A7A64) or darker**;
  white on brand-primary ✓ for button-size text; status text tokens all ≥4.5:1.
- Focus: global 2px `--ring` outline offset 2px — never remove; don't build
  custom focus styles.
- Keyboard: all interactive elements tabbable in DOM order; Radix handles
  menus/dialogs/accordions; card-links are single `<a>` wrappers.
- Semantics: one `main` per page, `header`/`footer`/`nav`/`section` +
  `aria-labelledby` via `SectionHeader id`; decorative icons `aria-hidden`
  (shared components do this); meaningful images need real alt text (see
  Visual Asset Guide).
- Forms: visible labels, described errors, no color-only signals.
- Touch targets ≥44px; link text descriptive (no bare "click here");
  modals trap focus (Radix); skip-link recommended when the header is next
  touched (documented, not yet implemented).

---

## 9. Performance rules

- Fonts: Inter via next/font only; no additional font families.
- Images: `next/image` always; AVIF/WebP; explicit dimensions (no CLS);
  above-the-fold hero images `priority`, everything else lazy (default).
- No new dependencies for visual effects; no animation/carousel libraries
  (embla exists — reuse it if a carousel is truly needed).
- Icons: import lucide icons individually (tree-shaken); never inline large
  SVG scenes into every page — put shared art in `/public`.
- Prefer server components; client islands only for real interactivity.
- Backgrounds: CSS gradients/borders only — no blur-heavy layered divs, no
  video backgrounds.
- Budget: keep marketing pages' first-load JS under the current baseline;
  check `next build` output when migrating.

---

## 10. Do / Don't

**Do**
- Use `Section`/`Container`/`SectionHeader` for every band
- Use `.heading-*`/`.text-*` classes for all type
- Use `bg-card`, `text-text-secondary`, status tokens
- Keep real content, real routes, real metadata
- Design tablet deliberately
- Check `/design-system` when unsure what something should look like

**Don't**
- Don't use `bg-white`, raw palette colors, arbitrary `text-[10px]`,
  inline `max-w-[1200px]`
- Don't invent new card/button/badge styles or radii
- Don't use blue/indigo/purple as brand colors
- Don't add gradients beyond the two approved ones
- Don't animate for decoration or ignore reduced motion
- Don't modify `src/components/ui/*`
- Don't invent stats, customers, logos or certifications
- Don't ship a page without phone + tablet + desktop verification
