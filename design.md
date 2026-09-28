# Whats91 Website Design Reference

This file documents the current UI and content structure of `whats91.com` so future pages can follow the existing system. Source of truth is the code in `src/app`, `src/components/landing`, `src/components/blog`, `src/lib/blog`, and `src/app/globals.css`.

## Core Stack And Layout Rules

- Framework: Next.js App Router with TypeScript.
- Styling: Tailwind CSS 4 tokens defined in `src/app/globals.css`, plus shadcn/ui components from `src/components/ui`.
- Shared shell: most public pages use `<Header />`, `<main className="flex-1">`, and `<Footer />` inside `<div className="min-h-screen flex flex-col bg-background">`.
- Main content width: sections usually use `px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto`.
- Narrow article/content width: blog articles and some explanatory blocks use `max-w-4xl`; some tables use `max-w-[1000px]`.
- Section rhythm: alternate white/background sections with `bg-surface/50`; special warning sections use light red/amber; final CTA sections use the brand gradient.
- Breakpoints follow Tailwind defaults: base phone, `sm` >= 640px, `md` >= 768px, `lg` >= 1024px.
- Border radius style: cards are usually `rounded-xl` or `rounded-2xl`; major CTA panels use `rounded-2xl sm:rounded-3xl`.
- Icons: Lucide icons are used throughout cards, badges, nav, buttons, and tables.

## Exact Color Scheme

The canonical palette is in `src/app/globals.css`.

### Light Theme

| Token | Value | Usage |
| --- | --- | --- |
| `--background` | `#FFFFFF` | page background |
| `--foreground` | `#0F172A` | default text |
| `--surface` | `#F8FAF9` | subtle section/card backgrounds |
| `--surface-subtle` | `#F1F5F4` | softer surface shade |
| `--text-primary` | `#0F172A` | headings and strong body text |
| `--text-secondary` | `#475569` | normal paragraph copy |
| `--text-muted` | `#64748B` | metadata, captions, low-emphasis text |
| `--border` | `#E2E8F0` | borders and inputs |
| `--border-subtle` | `#F1F5F4` | faint borders |
| `--brand-primary` | `#448C74` | primary brand green, primary buttons, icons |
| `--brand-primary-hover` | `#3A7A64` | primary button hover |
| `--brand-primary-light` | `rgba(68, 140, 116, 0.08)` | badges and light fills |
| `--brand-primary-foreground` | `#FFFFFF` | text on brand buttons |
| `--brand-accent` | `#54a084` | gradients and secondary brand accents |
| `--card` | `#FFFFFF` | cards |
| `--card-foreground` | `#0F172A` | card text |
| `--popover` | `#FFFFFF` | popovers/sheets |
| `--popover-foreground` | `#0F172A` | popover text |
| `--primary` | `#448C74` | shadcn primary |
| `--primary-foreground` | `#FFFFFF` | shadcn primary text |
| `--secondary` | `#F8FAF9` | shadcn secondary |
| `--secondary-foreground` | `#0F172A` | shadcn secondary text |
| `--muted` | `#F8FAF9` | shadcn muted |
| `--muted-foreground` | `#64748B` | shadcn muted text |
| `--accent` | `#F8FAF9` | shadcn accent |
| `--accent-foreground` | `#0F172A` | shadcn accent text |
| `--destructive` | `#EF4444` | errors/destructive states |
| `--input` | `#E2E8F0` | input borders |
| `--ring` | `#448C74` | focus rings |
| `--chart-1` | `#448C74` | chart brand series |
| `--chart-2` | `#54a084` | chart series |
| `--chart-3` | `#64b094` | chart series |
| `--chart-4` | `#74c0a4` | chart series |
| `--chart-5` | `#94d0b4` | chart series |

### Dark Theme

Dark tokens exist but the public site is primarily light themed.

| Token | Value |
| --- | --- |
| `--background` | `#0F172A` |
| `--foreground` | `#F8FAFC` |
| `--surface` | `#1E293B` |
| `--surface-subtle` | `#334155` |
| `--text-primary` | `#F8FAFC` |
| `--text-secondary` | `#CBD5E1` |
| `--text-muted` | `#94A3B8` |
| `--border` | `rgba(255, 255, 255, 0.08)` |
| `--border-subtle` | `rgba(255, 255, 255, 0.04)` |
| `--brand-primary` | `#54a084` |
| `--brand-primary-hover` | `#64b094` |
| `--brand-primary-light` | `rgba(84, 160, 132, 0.15)` |
| `--brand-primary-foreground` | `#0F172A` |
| `--brand-accent` | `#64b094` |
| `--card` | `#1E293B` |
| `--destructive` | `#EF4444` |
| `--input` | `rgba(255, 255, 255, 0.08)` |
| `--ring` | `#54a084` |

### Gradients, Shadows, And Accent Usage

- `gradient-brand-subtle`: `linear-gradient(135deg, rgba(68, 140, 116, 0.04) 0%, rgba(84, 160, 132, 0.02) 100%)`.
- `text-gradient`: `linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)`.
- Final CTA gradient: `from-brand-primary via-brand-primary to-brand-accent`.
- Dark code/mock panels: `#0F172A`, with slate header colors from Tailwind.
- Brand shadows:
  - `--shadow-brand`: `0 8px 24px -4px rgba(68, 140, 116, 0.20)`.
  - `--shadow-brand-sm`: `0 4px 12px -2px rgba(68, 140, 116, 0.15)`.
- General shadows:
  - `--shadow-xs`: `0 1px 2px rgba(15, 23, 42, 0.04)`.
  - `--shadow-sm`: `0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)`.
  - `--shadow-md`: `0 4px 8px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.04)`.
  - `--shadow-lg`: `0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)`.
  - `--shadow-xl`: `0 20px 40px -8px rgba(15, 23, 42, 0.10), 0 8px 16px -4px rgba(15, 23, 42, 0.04)`.
  - `--shadow-2xl`: `0 32px 64px -12px rgba(15, 23, 42, 0.14)`.
- Current code also uses Tailwind default accent families for category/status meaning: green, blue, purple, orange, pink, cyan, amber, red, yellow, and slate. For new pages, use brand green for primary UI and reserve non-brand hues for existing category/status conventions only.

## Shared Header

File: `src/components/landing/Header.tsx`.

### Desktop Header

- Visible at `lg` and above.
- Sticky top nav: `sticky top-0 z-50`, border bottom, `bg-background/80`, `backdrop-blur-xl`.
- Height: `h-14` on phone, `sm:h-16` on larger screens.
- Container: `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8`.
- Left: logo image `/whats91_logo.svg`; `Meta Partner` pill appears from `sm`.
- Center nav:
  - `Solutions` dropdown with a 2-column mega menu at desktop.
  - Primary links: `Free Tools`, `Pricing`, `Blog`, `Contact`.
- Right CTAs:
  - ghost `Templates` link to `/whatsapp-templates`.
  - green `Get Started` button linking to `https://chat.whats91.com`.

### Phone Header

- Desktop nav and CTAs are hidden until `lg`.
- Phone shows logo and a ghost icon button with `Menu`.
- Menu opens a right-side `Sheet`:
  - width `85vw`, `sm:w-[320px]`;
  - logo header;
  - vertical Solutions list with icons;
  - primary links;
  - bottom fixed area with `WhatsApp Templates` outline button and green `Get Started` button.

Current Solutions dropdown items: Marketing & Engagement, Utility Messages, Busy ERP Integration, Busy E-Commerce, Busy AI Agent, Busy API, Busy Reports, Payment Reminders, Google Sheet Sync.

## Homepage Layout

Files: `src/app/page.tsx` plus landing components in `src/components/landing`.

Top-level order:

1. `HomepageAIJsonLD`
2. `Header`
3. `Hero`
4. `Solutions`
5. `BusyERP`
6. `Developers`
7. `Security`
8. `ROI`
9. `HomepageFAQ`
10. `FinalCTA`
11. `Footer`

### Desktop Homepage

- Header stays sticky above the page.
- `Hero`:
  - section padding `py-12 sm:py-16 md:py-20 lg:py-24`;
  - brand subtle gradient background;
  - two-column grid at `lg`: left content, right visual;
  - left content is `lg:text-left`, headline maxes at `lg:text-[52px]`;
  - CTA buttons are horizontal from `sm`;
  - right visual contains a dark webhook code snippet, chat preview card, and a floating `99.9% Uptime` badge visible only at `lg`.
- `Solutions`:
  - `bg-surface/50`;
  - centered section header;
  - cards in a 2-column grid from `sm`;
  - one featured Busy card with `Most Popular` badge.
- `BusyERP`:
  - white section;
  - three capability cards at `md`;
  - desktop comparison table is `hidden md:block`;
  - CTA centered below table.
- `Developers`:
  - `bg-surface/50`;
  - two-column layout at `lg`;
  - text/features on left, dark code block and payload type cards on right.
- `Security`:
  - certification pills wrap in a centered row;
  - feature grid is 1 column, then 2 at `sm`, 3 at `lg`;
  - DPDP compliance panel becomes two columns at `lg`.
- `ROI`:
  - `bg-surface/50`;
  - stats grid is 4 columns at `lg`;
  - ROI detail rows use desktop row layout from `sm`;
  - dark formula panel below.
- `HomepageFAQ`:
  - `bg-surface/40`;
  - FAQ cards are 2 columns at `md`.
- `FinalCTA`:
  - white section containing a large brand-gradient rounded panel;
  - centered badge, heading, paragraph, white CTA button, trust note.
- `Footer`:
  - desktop grid is `lg:grid-cols-6`;
  - brand/contact column spans 2 columns;
  - link groups occupy 4 columns.

### Phone Homepage

- Header height is `h-14`; nav becomes a right-side Sheet.
- Main container padding is `px-4`.
- `Hero`:
  - single-column grid;
  - text centered;
  - headline is `text-3xl`, then scales up by breakpoint;
  - highlight pills wrap and center;
  - CTA buttons stack full width until `sm`;
  - dark webhook code snippet is hidden below `sm`; the chat preview remains visible;
  - floating uptime badge is hidden.
- `Solutions`: one-column cards until `sm`.
- `BusyERP`: capability cards stack; comparison becomes individual mobile cards (`md:hidden`) instead of table.
- `Developers`: visual/code block appears before the text because the visual column is `order-1` on mobile and text is `order-2`.
- `Security`: certification pills wrap; DPDP panel stacks; quality card sits below text.
- `ROI`: stats grid uses 2 columns; ROI details are mobile cards under `sm`.
- `HomepageFAQ`: FAQ cards stack in one column.
- `FinalCTA`: gradient panel uses smaller padding and full-width CTA button until `sm`.
- `Footer`: brand/contact content is centered; link groups are a 2-column grid before desktop.

## Normal Static Pages

Examples: `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/pricing/page.tsx`, `src/app/faq/page.tsx`, legal/compliance/resource pages.

Normal pages use the shared shell but are usually less guide-like than solution pages.

Common structure:

1. `"use client"` when state is needed for forms, calculators, filters, tabs, or accordions.
2. `Header`.
3. Centered hero:
   - `relative overflow-hidden`;
   - often `py-12 sm:py-16 md:py-20` or `py-14 sm:py-16 md:py-20 lg:py-24`;
   - `gradient-brand-subtle` background;
   - optional badge;
   - `h1` with `text-3xl sm:text-4xl md:text-5xl`;
   - paragraph with `text-base sm:text-lg text-text-secondary`.
4. Content sections:
   - cards, forms, grids, tables, timelines, tabs, or FAQs;
   - alternating `bg-surface/50` or white backgrounds;
   - cards use `border-border/60 bg-white`, brand icons in `bg-brand-primary/10`.
5. Optional JSON-LD helpers:
   - `FAQJsonLD`, `BreadcrumbJsonLD`, or custom inline schema.
6. `Footer`.

Use normal pages when the page is a company/resource/tool/legal page rather than a long product solution landing page.

## Current Solutions Page Structure

Files: `src/app/solutions/*/page.tsx`.

Current solution slugs:

- `/solutions/marketing`
- `/solutions/utility`
- `/solutions/busy-erp`
- `/solutions/busy-ecommerce`
- `/solutions/busy-ai-agent`
- `/solutions/busy-api`
- `/solutions/busy-reports`
- `/solutions/payment-reminders`
- `/solutions/busy-google-sheet`

Most solution pages are client components because they use FAQ accordion state, tab state, code toggles, or other local interactions. They import:

- `Header`
- `Footer`
- `ContactCard`
- `Button`
- Lucide icons
- optional animation components such as `AnimatedChatbot`, `AnimatedAPIArchitecture`, `GoogleSheetAnimation`, `AnimatedPaymentReminder`, or custom visual mockups.

### Standard Solution Page Anatomy

1. Shell: `<div className="min-h-screen flex flex-col bg-background">`.
2. `Header`.
3. `main`.
4. Hero:
   - `relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-surface/80 to-background`;
   - inner `gradient-brand-subtle` overlay;
   - `lg:grid-cols-2` layout;
   - left content is centered on phone and left-aligned at `lg`;
   - badge with icon;
   - `h1` in `text-3xl sm:text-4xl md:text-5xl`;
   - subheadline `text-base sm:text-lg`;
   - two CTA buttons stacked on phone, row at `sm`;
   - trust badges in wrapping pill row;
   - right side is stats grid, animated demo, code/architecture visual, or product dashboard mockup.
5. Body sections:
   - `py-12 sm:py-16 md:py-20`;
   - alternate `bg-surface/50` and white;
   - section headers are centered with optional badge and `h2 text-2xl sm:text-3xl md:text-4xl`.
6. Reusable section types:
   - AI answer/core value block, often `py-10 sm:py-12 bg-surface/50 border-y border-border/40`;
   - feature grids: `grid gap-4/5/6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4`;
   - two-pillar cards;
   - comparison tables inside rounded `bg-white` panels with `overflow-x-auto`;
   - warning panels using red/amber backgrounds;
   - security/compliance grids;
   - industry grids;
   - setup/onboarding step cards using numbered circles;
   - FAQ accordion driven by `openFaq`;
   - final gradient CTA.
7. Final CTA:
   - usually `py-14 sm:py-16 md:py-20`;
   - inner rounded brand-gradient panel;
   - centered white text;
   - one or two CTAs;
   - `ContactCard` often appears beside or below CTA content depending on page.
8. `Footer`.

### Responsive Rules For Solution Pages

- Phone: hero is one column, text centered, buttons stacked, trust badges wrap, cards stack, tables horizontally scroll when needed.
- Tablet: many grids move to 2 columns at `sm` or `md`.
- Desktop: hero is two columns at `lg`; feature grids often become 3 or 4 columns; comparison tables replace mobile cards where implemented.

### Solution Page Content Families

- Marketing and Utility pages are long guide-style solution pages. They use stats-grid hero visuals and many policy/benchmark sections, including review cycles, pricing, consent, delivery behavior, developer examples, best practices, setup, FAQ, and final CTA.
- Busy ERP, Busy Reports, Busy API, Payment Reminders, Busy Google Sheet, Busy E-Commerce, and Busy AI Agent are product-solution pages. They use animated demos or dashboard mockups, then explain core value, feature grids, workflows, technical/security details, industries, onboarding, FAQ, and CTA.

Current solution pages do not consistently export page-level metadata because many are client components. They are still included in `src/app/sitemap.ts`. Future solution pages should keep the current visual structure, and if SEO metadata is needed, split metadata into a server wrapper or add a separate server-compatible pattern.

## Blog System

The current blog implementation is file-based articles plus a lightweight registry. The older `docs/BLOG_DEVELOPMENT_GUIDE.md` mentions `posts.ts`, but the actual current code uses `registry.ts`.

### Blog Files

- Blog index page: `src/app/blog/page.tsx`.
- Blog layout metadata and listing JSON-LD: `src/app/blog/layout.tsx`.
- Blog registry: `src/lib/blog/registry.ts`.
- Author registry: `src/lib/blog/authors.ts`.
- Blog cards: `src/components/blog/BlogCard.tsx`.
- Author cards: `src/components/blog/AuthorCard.tsx`.
- Share buttons: `src/components/blog/ShareButtons.tsx`.
- Individual posts: `src/app/blog/{post-slug}/page.tsx`.
- RSS feed: `src/app/feed.xml/route.ts`.
- Markdown twins: `src/app/api/md/[slug]/route.ts` with blog routes at `/api/md/blog-{post-slug}`.

### How Posts Attach To The Blog Main Page

Posts appear on `/blog` only when they are registered in `src/lib/blog/registry.ts`.

Flow:

1. `src/lib/blog/registry.ts` exports `blogPosts`.
2. `getAllPosts()` filters out `isDraft`, sorts by newest `publishedAt`, and returns the post metadata.
3. `src/app/blog/page.tsx` calls `getAllPosts()`, `getAllCategories()`, and `getAllTags()`.
4. `/blog` renders the searchable/filterable list using `BlogCard`.
5. `BlogCard` links to `/blog/${post.slug}`.

The homepage does not currently render a blog feed section. Blog access is through the header primary nav (`Blog`) and footer resource links (`Blog`, `Authors`).

### Blog Registry Shape

Each registry entry uses:

```ts
interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  isFeatured: boolean;
  isDraft?: boolean;
  content?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

Important behavior:

- `isDraft: true` hides a post from `getAllPosts()`.
- `publishedAt` controls list order.
- `authorId` must match an author in `src/lib/blog/authors.ts`.
- `category` and `tags` are free strings in the current code, not strict TypeScript unions.
- `content` is not the rendered article body. Actual rendered article content lives in the post route file. `content` is used by the markdown twin endpoint; if it is missing, `/api/md/blog-{slug}` returns only front matter and an empty body.
- `getRelatedPosts(currentSlug, limit)` scores related posts by shared tags and category.

### Tags And Categories

- Tags are added in the registry entry `tags` array.
- Categories are added as `category` strings in the registry.
- `/blog` computes all categories and tags dynamically from `blogPosts`.
- Blog filters search title, excerpt, tags, and category.
- Category badge colors are defined in `registry.ts` and duplicated in `BlogCard.tsx`:
  - `WhatsApp API`: green
  - `ERP Integration`: blue
  - `Business Automation`: purple
  - `Industry Insights`: orange
  - `Product Updates`: pink
  - `Tutorials`: cyan
  - `Case Studies`: amber
- Individual article tag links currently point to `/blog?tag=...`, but `/blog/page.tsx` does not currently read URL query params. The links navigate to the blog page but do not preselect the tag unless that behavior is added later.

### Authors

Authors are defined in `src/lib/blog/authors.ts`.

Author fields:

```ts
interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  expertise: string[];
  location?: string;
  joinedAt: string;
}
```

How authors attach:

- A blog post sets `authorId`.
- `BlogCard` resolves the author with `getAuthorById(post.authorId)` and links to `/authors/{author.slug}`.
- `/authors` lists all author cards using `getAllAuthors()`.
- `/authors/[slug]` uses `generateStaticParams`, `generateMetadata`, Person JSON-LD, and `getPostsByAuthor(author.id)` to show all posts by that author.
- Individual blog pages may also hardcode author display details or call `getAuthorById`. When changing an article author, update both the registry and the article page if the article page hardcodes author text/schema.

### Individual Blog Page Pattern

Most current posts are custom TSX pages rather than markdown-rendered pages.

Standard article structure:

1. Local `post` constant with slug, title, category, dates, reading time, tags.
2. `export const metadata = generatePageMetadata({... type: "article" ...})`.
3. Content arrays for tables/cards/FAQ.
4. Optional `SectionHeading` helper.
5. `RelatedPosts` helper that uses `getRelatedPosts(postSlug, 2)`.
6. `JsonLd` helper with:
   - breadcrumb schema;
   - FAQ schema when relevant;
   - Article schema with author, publisher, date, image, keywords.
7. Render shell:
   - `Header`;
   - `<article>`;
   - article hero with breadcrumbs, category/featured badges, `h1`, description, tags;
   - metadata cards for published date, reading time, category;
   - optional learning summary or key-takeaway box;
   - article body in `max-w-4xl` with cards, tables, callouts, CTAs;
   - share block with `ShareButtons`;
   - author card;
   - `RelatedPosts`;
   - `Footer`.

Article pages should keep the narrower `max-w-4xl` reading width. Tables should use `overflow-x-auto` and a `min-w` when columns are wide.

### Blog Index Page Layout

`/blog` is a client component with:

- shared header/footer;
- modern hero with brand gradient background, decorative grid, floating blurred brand accents;
- badge: `Technical Knowledge Base`;
- `h1`: `Insights & Resources`;
- four stats cards;
- large search bar;
- category pill filters;
- tag quick filters;
- active filter count and clear button;
- posts grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
- newsletter CTA gradient panel.

### RSS, Sitemap, And Markdown Twins

- RSS feed at `/feed.xml` uses `getAllPosts()`, includes the newest 20 posts, author names, category, tags, and excerpt-based content.
- Sitemap includes:
  - `/blog`;
  - every `/blog/{post.slug}`;
  - every `/api/md/blog-{post.slug}`;
  - `/authors` and `/authors/{author.slug}`.
- Markdown twin endpoint:
  - static pages use flat slugs like `/api/md/pricing`;
  - blog posts use `/api/md/blog-{post-slug}`;
  - nested paths like `/api/md/solutions/marketing` intentionally return JSON 404 from the catch-all route.

## Future Page Decision Guide

When asked to add a new page:

- Normal page: use the centered hero, shared shell, alternating sections, card/table/FAQ patterns, and optional JSON-LD. Best for company, legal, resource, pricing, FAQ, and simple product-support pages.
- Solution page: use the two-column solution hero, trust badges, alternating long-form sections, feature grids, comparison/workflow/security/onboarding/FAQ/final CTA structure, and add the route to header/footer/sitemap if it should be discoverable.
- Blog post: create a custom TSX route under `src/app/blog/{slug}/page.tsx`, add a registry entry in `src/lib/blog/registry.ts`, choose or add an author in `src/lib/blog/authors.ts`, include article metadata and JSON-LD, and add registry `content` if the markdown twin should contain the article body.

