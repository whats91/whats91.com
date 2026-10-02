# Whats91 blog design comparison and first-article plan

**Reviewed:** 2 October 2026 · **Status:** analysis complete; proposals await owner direction.  
**Deliverables:** this report, 90 accepted viewport screenshots, 16 DOM/style observation files, and a capture manifest.  
**Scope:** live reference articles, the live Whats91 blog index, three representative Whats91 articles, and relevant local source/design contracts. No application code, article content, or production assets were changed. No images were generated; nothing was committed, pushed, deployed, or published.

## 1. Decision summary

Whats91 already has a credible base: topic-specific illustrations, restrained sage branding, useful long-form explanations, source links, tables, contents navigation, and native FAQ disclosures. The live site includes the imagery described in the earlier local handoff. The next improvement should be **editorial structure and navigation**, supported by purposeful visuals.

The references feel more editorial because they vary the presentation inside the reading flow: photographs with message overlays, lifecycle diagrams, large evidence panels, image-and-text splits, pull quotes, and a visually strong related-reading section. The lesson is to give each important idea an appropriate form. Adding more decorative pictures alone would leave Whats91's main weaknesses intact.

The highest-priority findings are:

1. **Discovery is delayed.** At 390 × 844, the first Whats91 article title begins around 1,476 px down the page. Introductory cards and 35 quick-filter chips occupy the space before the list. An article topic link also fails to apply its requested filter.
2. **The desktop reading measure is wider than the project's own article pattern.** Sampled Whats91 prose is 832 px wide at 16 px, versus a documented 720 px reading container. Reference prose is 750 px at 18 px. Width, type size, and paragraph structure should be considered together.
3. **The explanatory layer is thin.** Existing artwork establishes tone, but operational distinctions and pricing arithmetic still live mainly in paragraphs and tables. Readers need labelled process diagrams, decision paths, and clearly separated examples.
4. **The ending has weak priority.** Large share and pending-attribution panels precede relatively quiet, text-only related links. Important next actions compete as lists of equally weighted links.
5. **Mobile layouts contain content, but some information is hard to discover.** Whats91 tables scroll correctly; their hidden columns have little visible explanation. Reference diagrams shrink into difficult-to-read raster text. Neither approach should be accepted unchanged for a new explainer.

**Recommended first pilot:** [WhatsApp Cloud API: Setup, Delivery and Billing Guide](https://whats91.com/blog/whatsapp-cloud-api-complete-guide-2026). It provides enough variety to validate a reusable article system without making a dated pricing article the design experiment. The proposed sequence in section 10 starts with an owner-reviewed content/block map and desktop/mobile design, followed by one explicitly authorized implementation slice.

### Flow health

These are qualitative design judgments, not analytics, conversion measurements, or accessibility certification.

| Reader step | Current health | Evidence and implication |
|---|---|---|
| 1. Find a relevant article | Needs work | Index entry is long; query-string topic navigation is ineffective. E43–51, E65–67. |
| 2. Understand the article's purpose | Functional, inconsistent | Clear titles and leads; duplicated category treatment, long introductions, and metadata placement vary. E52, E69, E81, E88. |
| 3. Navigate and understand the explanation | Functional, needs stronger visual structure | Contents links and FAQs work; prose/table repetition and hidden mobile columns increase effort. E54, E59, E78–80, E85, E90. |
| 4. Choose a next action or article | Needs work | Useful destinations exist, but CTA hierarchy and related-card presentation are weak. E58, E60, E76, E87. |

## 2. Scope, method, and evidence limits

### Pages reviewed

| ID | Live page | Reason for inclusion |
|---|---|---|
| R1 | [Customer engagement guide](https://whatsappbusiness.com/blog/customer-engagement-ultimate-guide/) | Long educational guide, lifecycle diagram, illustrated use cases, FAQs. |
| R2 | [AI customer service agents](https://whatsappbusiness.com/blog/ai-customer-service-agents/) | Sponsored thought leadership, statistic panels, pull quote, explicit closing CTAs. |
| R3 | [Agentic commerce strategy](https://whatsappbusiness.com/blog/agentic-commerce-ai-strategy/) | Structured comparison, mixed visual modules, evidence-led narrative. |
| R4 | [Remarketing ads guide](https://whatsappbusiness.com/blog/remarketing-ads-guide/) | Crosslinking, journey diagram, examples, long-form instruction. |
| W0 | [Whats91 blog index](https://whats91.com/blog) | Discovery, search, categories, tags, cards, ordering, navigation. |
| W1 | [Cloud API setup guide](https://whats91.com/blog/whatsapp-cloud-api-complete-guide-2026) | Evergreen platform guide and proposed first pilot. |
| W2 | [Busy ERP to Google Sheets](https://whats91.com/blog/busy-erp-google-sheets-integration-complete-guide) | Practical workflow, code samples, multiple tables, ERP article template. |
| W3 | [October 2026 pricing guide](https://whats91.com/blog/meta-whatsapp-pricing-october-2026-india) | Dated technical explanation, three illustrations, worked examples, source limitations. |

Each page was inspected through its full content structure, including lower sections, related reading, and footer. Desktop viewport captures were taken at 1440 × 1000, with responsive checks at 390 × 844. Screenshots cover the start, explanatory modules, middle/lower reading flow, endings, and mobile problem areas; they are representative checkpoints, not an unbroken recording of every scroll position.

The audit used live browser screenshots, accessibility/DOM observations, computed styles, and targeted source inspection. Search, a no-results query, tag selection, an article topic link, contents navigation, FAQ disclosure, mobile menu opening/closing, and horizontal table scrolling were exercised. No enquiry forms or social posts were submitted.

**Evidence conventions:** E01–E91 refer to the numbered screenshot filenames in [the evidence index](#appendix-a-screenshot-index). E08 is intentionally absent. [The manifest](evidence/blog-design-comparison-2026-10-02/capture-manifest.json) records source URL, viewport, scroll position, document height, and UTC capture time for each accepted image. All retained screenshots were visually inspected. Some viewport images intentionally include the end of the preceding section for context.

**Boundaries:** This is a design/content-presentation audit, not a new verification of Meta rates, provider eligibility, quoted statistics, customer outcomes, or product capabilities. It does not certify WCAG compliance, Core Web Vitals, SEO, screen-reader behavior, no-JavaScript behavior, reduced motion, or physical-device behavior. Those need the implementation acceptance checks below. Other Whats91 articles were visible as cards/links but were not individually audited end to end.

Document heights and initial image observations are state-dependent: lazy loading, sticky-header changes, and open FAQs affect them. An initial full-page screenshot produced lazy-image blanks and a displaced sticky header; it was rejected. Viewport evidence was used instead. Empty image URLs or zero intrinsic dimensions in an early observation JSON do not establish broken images.

## 3. Reference observations: page by page

### R1 — Customer engagement guide

**Observed sequence:** dark split hero → definition → lifecycle diagram → business importance → strategy examples → benefits → audience distinctions → tools → closing product direction → open FAQs → footnotes → three related cards → footer.

The hero combines a human photograph and conversational overlay. Five article images, including the hero, recur at meaningful topic changes. The lifecycle diagram condenses a process into one recognisable shape; later composites connect abstract advice to a business/customer interaction. Large green headings strongly interrupt the text rhythm. Contextual links connect research, examples, product information, and adjacent learning topics.

There is no visible article contents menu. The page is long, and some stretches remain dense despite the images. The lifecycle's labels become small on mobile. The closing direction is principally a prose link rather than a dominant article-specific button.

**Useful transfer:** introduce a labelled model early, then use examples to deepen it. **Do not transfer:** the exact infinity graphic, photographs, copy, bright-green text treatment, or reliance on small raster labels.

Evidence: E01–07, E39–40, E91. [Live source](https://whatsappbusiness.com/blog/customer-engagement-ultimate-guide/).

![R1: a process diagram placed between the explanation and the next section](evidence/blog-design-comparison-2026-10-02/04-reference-engagement-lifecycle-detail.jpg)

### R2 — AI customer service agents

**Observed sequence:** split hero → sponsor/guest attribution → problem framing → measurement evidence → trust/escalation → revenue opportunity → practical direction → forecast visual → sponsor block and two buttons → footnotes → related cards → footer.

Six article images include the hero, two square evidence panels, and wide visual panels. Desktop image-and-text pairings vary the column rhythm; mobile stacks the modules. Statistic typography and a quote panel create visible pauses. Attribution and sponsorship are explicit near the beginning, with further sponsor detail at the end. An in-body link connects to the commerce article.

The square modules hold up better on mobile than the wide information graphics. Some chart text becomes very small after scaling. The closing sponsor block is visually clear but serves sponsored content; it is not an appropriate default model for Whats91 authorship.

**Useful transfer:** pair one substantiated insight with one relevant visual; distinguish evidence, interpretation, and next action. **Do not transfer:** the reported statistics, quote, sponsor identity, or image-based text as the sole accessible explanation.

Evidence: E09–18. [Live source](https://whatsappbusiness.com/blog/ai-customer-service-agents/).

![R2: square evidence art paired with supporting text](evidence/blog-design-comparison-2026-10-02/10-reference-ai-statistic.jpg)

### R3 — Agentic commerce strategy

**Observed sequence:** split hero → sponsor/guest attribution → introductory evidence split → three channel approaches → supporting chart/photo modules → strategic synthesis → pull quote → closing photograph → footnotes/sponsor CTAs → related cards.

Six article images give the comparison a changing visual rhythm. Numbered subheads and repeated question/risk/benefit framing make the options easier to compare. The pull quote and closing photograph create two distinct pauses late in the article. Internal editorial links are much less prominent here than in the engagement and remarketing guides.

Wide statistics shrink considerably on mobile. The heading outline also uses a level-five heading before later level-three and level-two sections; visual prominence is not a reliable semantic hierarchy. This should not be imitated.

**Useful transfer:** a consistent comparison framework across alternatives, with supporting visuals where they reduce explanation effort. **Do not transfer:** research figures, copied argumentation, quote assets, or skipped heading levels.

Evidence: E19–28; heading outline observed in the live accessibility tree. [Live source](https://whatsappbusiness.com/blog/agentic-commerce-ai-strategy/).

![R3: a comparison graphic within the article's argument](evidence/blog-design-comparison-2026-10-02/21-reference-commerce-comparison.jpg)

### R4 — Remarketing guide

**Observed sequence:** split hero → introductory next-read links → definition and qualified case example → distinctions → buyer-journey diagram → numbered strategies → visual examples → best practices → tools → product direction → open FAQs → related cards/footer.

Five article images include the hero, a labelled journey, an illustrated ad example, a photo/ad collage, and a closing photograph. Early crosslinks explain why the adjacent article is useful, rather than listing destinations without context. Qualifications sit near the example they qualify. The page combines numbered instruction with longer explanatory paragraphs.

The journey image becomes roughly 350 × 138 px on mobile, making its internal copy difficult to read. Long paragraphs and the lack of a contents menu still create substantial scroll effort. Related cards use the same broad current-content mix seen on the engagement guide.

**Useful transfer:** contextual next-read prompts, local qualifications, and a journey visual. **Do not transfer:** the ad artwork, protected wording, case outcomes, or a mobile diagram that depends on miniature text.

Evidence: E29–38. [Live source](https://whatsappbusiness.com/blog/remarketing-ads-guide/).

![R4: crosslinks presented as editorial guidance near the introduction](evidence/blog-design-comparison-2026-10-02/30-reference-remarketing-crosslinks.jpg)

### Shared reference system — strengths and limits

The four pages share a forest-green navigation/hero system, bright green emphasis, rounded image corners, a relatively narrow white reading column, and a wider related-reading section. The desktop hero is approximately 1,344 px wide with 48 px outer margins; its title and image occupy separate halves. Mobile stacks them into a 350 px column. The navigation remains visible while scrolling, and the mobile menu provides grouped navigation. Related reading expands to three image-led cards on desktop and stacks on mobile.

No visible reading-time label, table of contents, progress rail, article sidebar, or share toolbar was found in these four pages. These absences are observations, not features Whats91 should remove. Whats91's contents navigation and share fallback are useful capabilities worth preserving.

**Animation-like elements:** the conversational overlays, collages, oversized numbers, and quote panels create a sense of activity. The inspected article modules were static images. No article video, canvas, or Lottie player was found in the inspected DOM, and no moving explanatory sequence was observed. This bounded observation does not rule out every hover or entrance effect. A static labelled diagram can deliver the same explanatory value without a motion library.

The references also expose quality issues: small mobile raster text, occasional dense passages, an irregular heading outline, and a related-card excerpt that includes run-together sponsor/byline text. Their visual system is a reference for editorial composition, not a complete quality standard.

## 4. Whats91: observed reader experience

### W0 — Blog index

**What works.** The index displays 11 public article cards with actual covers. Search and category/tag controls have clear labels. Searching “Busy” produced two results; an unmatched query produced zero results; clearing the search restored the list. Desktop uses three columns and mobile one. Cards expose topic, reading time, title, excerpt, and a link. The first-visit cookie choice is visible and can be dismissed without blocking reading.

**Where it loses focus.** Before the reader reaches an article, the page shows a technical JavaScript notice, a badge/title/lead, four non-interactive introductory cards, search, category controls, and 35 quick-filter buttons. The cards explain browsing but do not themselves navigate. At the measured viewport, the first cover starts at approximately y=955 desktop/y=1,316 mobile, and the first title at y=1,135/y=1,476. This is considerable setup for a list of 11 articles. E43, E49–51.

Card covers are cropped into shallow frames, approximately 361 × 160 px desktop and 356 × 144 px mobile, despite the source cover's wider-height 1200 × 630 format. Titles and excerpts clamp to two lines. Small tags and reading-time badges use 10 px text; the site's design specification sets a 12 px floor. The existing green physical-object illustrations are coherent, but similar palette/composition makes some adjacent covers harder to distinguish at thumbnail scale. E44, E51.

The October pricing article is last in the list even though its topic is timely. Source explains the behavior: its publication date is intentionally absent, and sorting treats missing dates as zero. This is not a reason to fabricate a date. A curated featured position with truthful date semantics would solve a different, legitimate editorial need. E45; source S6.

The ending is headed “Newsletter unavailable,” followed by useful resource links. The honest status is preferable to a fake form, but the section gives an unavailable feature more emphasis than the available destinations. It could instead be a purposeful resource continuation. E45–46.

**Verified interaction defect.** The Cloud API article's Enterprise topic link navigates to `/blog?tag=Enterprise`. The index then shows all 11 posts with no selected tag. Manually choosing Enterprise produces one result. This is a reproducible broken expectation, not a style preference. The index initializes its tag state to `null` and does not consume the URL query. E65–67; S1, S2.

**Mobile navigation.** The settled menu opens as a side sheet with a close control and fixed lower actions. Its long Solutions list appears before Blog and other general destinations, which require scrolling inside the menu. The screenshot does not establish missing links; it shows their low position in a long navigation hierarchy. E68.

![W0: the mobile quick-filter wall before the article list](evidence/blog-design-comparison-2026-10-02/50-whats91-index-mobile-filters.jpg)

### W1 — Cloud API guide

The article has a breadcrumb, repeated category label, large title, short lead, cover and caption, metadata, topic links, and a ten-item contents block. The first substantive section begins around y=1,819 desktop and y=1,719 mobile. Some introductory space is useful; the combined sequence is lengthy before the reader gets an answer. E52–54, E62–63.

Its body covers registration choices, operating responsibilities, setup, message formats, delivery states, billing, capacity, pilot measurement, and next steps. Tables and the illustrative delivery-event code sample provide practical detail. Section source/resource links are meaningful, and statements are qualified rather than presented as universal product guarantees. The two images comprise a cover and an operating-model illustration. E55–57.

The operating model already has a relevant three-part visual metaphor, but labels and operational distinctions remain in surrounding prose and a table. A readable diagram of responsibilities and a separate delivery-status sequence would help readers connect the concepts. The delivery code block should remain available as technical detail, not carry the whole explanation.

The final implementation section offers five similarly weighted destinations. A primary task and one secondary path would guide the reader better. FAQs use native disclosures; opening a question displayed its answer. A contents link updated the hash and left the target heading below the sticky header in the settled state. These working behaviors should survive any redesign. E54, E58–59.

Share controls, a visible canonical-link fallback, a large pending-attribution card, two text-only related cards, and the global footer follow. The shared renderer selects related posts only from the billing-guide collection. The October article uses that renderer but sits outside that collection, so it does not appear reciprocally as a related item on the Cloud guide. This is an editorial coverage limitation. E60–61; S2, S6.

![W1: current prose and operating-model illustration](evidence/blog-design-comparison-2026-10-02/54-whats91-cloud-toc-anchor.jpg)

### W2 — Busy ERP to Google Sheets

This guide offers the strongest practical teaching material of the three samples: an input-path table, preparation instructions, a clearly labelled illustrative CSV, a validation section, an IMPORTRANGE formula, failure-handling tables, reporting uses, a pilot checklist, and sources. It distinguishes an offline export from a separately verified integration. These distinctions must remain explicit through visual simplification. E69–75.

The template differs from the Cloud guide: metadata appears before the cover. Both then show topics and a tall contents block. The two images establish context and illustrate validation, but there is no verified step-by-step product screenshot walkthrough. Most of the explanation follows a repeated paragraph/table/link pattern. A compact input decision tree and one properly sourced annotated example could make the practical sequence clearer.

At 390 px, a 560 px table sits inside a 356 px viewport. Horizontal scrolling worked: the test moved from scrollLeft 0 to 204 and revealed the third column. The caption and first column scroll out of view with the table; no persistent visual cue tells the reader what is hidden. The formula also overflows inside its own contained region. These are contained layouts, not page-level overflow failures, but discoverability needs work. E78–80.

The guide ends with source context, six FAQ questions, share controls, pending attribution, and one related card occupying one half of a two-column desktop grid. The empty other half weakens the ending. The registry's positive-match filtering explains the single result. E76; S3, S6.

![W2: a mobile table initially hides the refresh-responsibility column](evidence/blog-design-comparison-2026-10-02/78-whats91-sheets-mobile-table-left.jpg)

The [scrolled state](evidence/blog-design-comparison-2026-10-02/79-whats91-sheets-mobile-table-right.jpg) confirms that the column is available.

### W3 — October pricing guide

The article has a clear dated subject, a rate table, three captioned illustrations, explicit worked scenarios, a seven-step budgeting method, links to the calculator and platform plans, source-check context, limitations, eight FAQs, and related reading. These are useful editorial ingredients. This audit does not revalidate the numeric rates or rules shown in them. E81–87.

The opening is unusually long: on the mobile viewport, the cover begins around y=801 after the title and lead, and the first body section begins around y=1,932 after metadata/topics/contents. Its introduction still uses future-card/September framing on the October 2 audit date. An editorial date review should determine the right current wording while preserving the effective period and evidence history; a design change must not silently create a new publication or review date.

The two body illustrations communicate time windows and tiering as metaphors. They do not explain the actual branching rules or arithmetic. The worked examples are four long paragraphs, each mixing inputs, exclusions, calculation, and result. A named scenario block with labelled parts would materially improve comparison, particularly on mobile. E83–85, E90.

The mobile rate table contains its overflow, but important interpretive text and part of the caption lie outside the initial view. Essential eligibility/context should remain visible outside a horizontal table or use an appropriate stacked treatment. Repeated source lists should remain traceable while becoming less repetitive in presentation. E86, E89.

![W3: worked examples are present, but their inputs and results share paragraph styling](evidence/blog-design-comparison-2026-10-02/85-whats91-october-worked-examples.jpg)

## 5. Measured layout and typography

Measurements are computed CSS/layout values at the stated viewports, not inferred from screenshots. See the [observation files](#appendix-b-observation-and-source-register). “Body” excludes lead paragraphs and special modules.

| Element | Reference articles: desktop / mobile | Whats91 sampled guides: desktop / mobile | Design implication |
|---|---|---|---|
| Main reading width | 750 / 350 px | 832 / 358 px | Whats91 has more characters per line at a smaller desktop body size. |
| H1 | 36/39.6 px, weight 400 / 32/35.2 px | 48/60 px, weight 700 / 30/37.5 px | Whats91's title is already visually strong; larger is not the missing ingredient. |
| Body text | 18/23.4 px / same | 16/28 px / same | Reference line spacing is relatively tight; do not copy it mechanically. |
| Main section heading | Often 48/52.8 px / 36/39.6 px; varies by module | 30/41.25 px / 24/33 px | Reference hierarchy relies on large regular headings; Whats91 is denser and more uniform. |
| Typeface reported by CSS | WhatsApp Sans Var, Arial fallback | System sans stack | A deliberate brand/type decision is needed; do not import the reference's font. |
| Article outer horizontal margin | Hero 48 px; body 345 px / body 20 px | Body 304 px / 16 px | Wide assets and narrow prose can use different measures. |
| Related reading | Three image-led columns / stacked | Two text-only columns / stacked; sometimes one item | Stronger visual continuity and selection are achievable with existing assets. |

The Whats91 specification already defines a **720 px reading container**, a **65ch prose cap**, and a **12 px minimum for non-decorative text**. Sampled articles use the same `max-w-4xl` wrapper for hero and body, resulting in 832 px of content at 1440 px. Blog cards use explicit 10 px labels. These are specific gaps against local guidance, independent of the reference comparison.

The design document names Inter, while the actual global CSS intentionally supplies a system stack. This audit does not assume a failed font load. The owner/design specification should reconcile that difference before a type-system change; a fast system font can be retained. S4, S7–S8.

**Proposed test direction:** constrain ordinary prose to the existing reading measure; compare 16 px and 18 px body options with the real copy; retain comfortable line spacing; allow tables, examples, and selected figures to break out to a wider measure. Choose by rendered desktop/mobile readability, not a competitor's exact pixel values.

## 6. Reusable-pattern matrix

| Pattern | Reference evidence | Whats91 now | Proposed adaptation |
|---|---|---|---|
| Article hero | Split forest panel, title/image balance; E01, E09, E19, E29 | Stacked title/lead/cover; E52, E69, E81 | Keep Whats91 identity; shorten lead and standardize metadata order. Explore a wider cover with narrower prose, not a copied green split hero. |
| Early answer/model | Lifecycle or framing visual; E04, E20, E31 | Contents before substantive answer | Add a concise reader outcome/answer block and one genuinely explanatory model near the start. |
| Reading rhythm | Full-width art, splits, quotes, lists | Repeated paragraph → image/table → links | Introduce a small set of semantic editorial blocks; avoid decorating every section. |
| Evidence emphasis | Large numeric panels, footnotes | Sources and qualified examples mostly in body text | Use source-linked evidence callouts only where evidence exists; never manufacture a statistic to fill a design. |
| Process explanation | Lifecycle/journey raster diagrams | Conceptual imagery plus tables | Build labelled HTML/SVG diagrams with matching prose/list equivalents and mobile reflow. |
| In-body crosslinks | Contextual prompts, especially R1/R4 | Mostly end-of-section link lists | Explain the next reader task beside each important internal link. Keep source citations distinct from commercial CTAs. |
| Navigation within article | No visible TOC in sampled references | Large native contents list | Preserve anchors; explore a compact mobile disclosure and optional desktop rail after a usability check. |
| Worked examples | Evidence panels and scenario-oriented imagery | CSV/code is labelled; pricing examples remain paragraphs | Named scenario blocks: inputs → rule/steps → result → limitations. Keep real text selectable. |
| FAQs | Open questions/answers in R1/R4 | Native `<details>` | Keep native behavior; ensure scan-friendly labels and measured spacing. |
| Conversion | Global CTAs; sponsor buttons on R2/R3 | Equal-weight link lists and footer demo | One article-specific primary next step and a useful secondary read. No forced lead capture. |
| Related reading | Large cover images, titles, excerpts | Quiet text-only cards | Reuse existing covers, curated relevance, concise excerpts; support one, two, or three items gracefully. |
| Motion | Static art creates energy; no observed article explainer motion | Static art, hover/menu effects | Start static. Add user-controlled progression only if it makes a process easier to understand. |
| Footer | Compact dark resource/privacy ending | Dense global product/legal footer | Give the article its own decisive ending before the global footer; avoid expanding footer scope in the pilot. |

## 7. Prioritized recommendations and acceptance

Priority denotes reader impact and dependency, not an instruction to implement everything together. **P1** should shape the first authorized work; **P2** follows the pilot; **P3** is optional exploration. Effort is relative and not a time estimate.

| ID | Priority / effort | Finding and proposed change | Evidence | Acceptance for a later implementation |
|---|---|---|---|---|
| F01 | P1 / small | Apply topic query state consistently. Define URL behavior for search/category/tag and history. | E65–67; S1–S2 | Following Enterprise selects it and shows its one result; direct URL, reload, back/forward, clear, and invalid tag have deliberate behavior. |
| F02 | P1 / medium | Reduce index setup: shorter intro, compact category controls, expandable tag browsing, articles earlier. | E43, E49–51 | At 390 × 844 a useful article choice appears within the initial view or a short first scroll; no large wall of optional chips before results. Measure the resulting position. |
| F03 | P1 / medium | Use a proper prose measure and shared typography/spacing rules. | E54, E70, E85; S2–S4, S7 | Approved real-copy renders at 1440/1024/768/375/320; no clipped words, tiny informational labels, or accidental long lines. |
| F04 | P1 / medium | Add purposeful explanatory blocks to the first article: responsibilities, delivery-state sequence, pilot checklist. | E04, E21, E31 versus E54–57 | A reader can explain the distinction without reading tiny image text; meaning survives missing images/JS and reduced motion. |
| F05 | P1 / medium | Improve mobile table/code discovery; choose scroll or stacked form per information type. | E78–80, E89 | Hidden columns have a visible cue; captions remain understandable; table/code regions retain keyboard access and labels; no page-level overflow. |
| F06 | P1 / medium + owner input | Standardize headline/lead/metadata; resolve attribution through the existing owner-input process. | E52, E69, E81, E87 | Consistent order; effective date, publication date, evidence-check date, and human review are not conflated. No invented author/reviewer. Pending stays truthful until approved. |
| F07 | P2 / small–medium | Use compact share treatment and stronger image-led related reading with explicit editorial relevance. | E15, E28 versus E60, E76, E87 | Relevant next articles, no current-article self-link, graceful one-item layout, no empty grid gap, clear readable titles. |
| F08 | P2 / small–medium | Curate timely index placement separately from publication chronology. | E45; S6 | An approved featured article can lead without falsifying its date; held content remains governed by existing indexing/editorial rules. |
| F09 | P2 / medium | Give each article a primary task CTA and one secondary path; improve contextual internal links. | E30, E58, E85 | Destination matches the reader's stage and actual capability; no new storage/form delivery or unsupported commercial promises. |
| F10 | P2 / medium | Convert pricing prose examples to labelled scenario blocks; review temporal wording and duplicated explanation. | E81, E85, E88, E90 | Inputs, assumptions, arithmetic, period, result, and exclusions remain adjacent; one canonical data/content source serves visible and machine-readable versions. |
| F11 | P2 / small | Replace the unavailable-newsletter emphasis with available resource navigation. | E45 | No fake signup; clear, useful existing destinations and truthful subscription availability. |
| F12 | P3 / medium–large | Explore optional step-controlled motion only after the static article succeeds. | Static reference modules E10–13, E21–24 | Entire explanation available without animation; reduced motion and no-JS baselines; no autoplay obstruction or speculative UI. |

**What to preserve:** existing route/anchor stability, source-backed qualifications, synthetic-example labels, author/date provenance, SEO configuration, structured data parity, Markdown/MCP content parity, native navigation/disclosures, current brand tokens, and Graph-only contact/demo delivery. No change to `src/components/ui/` is required by these recommendations.

## 8. Assets and feasibility

The prior imagery packet records 23 original optimized images across 11 posts. The live index has covers for its 11 cards, and the three sampled articles visibly use their expected two/two/three image sets. This verifies sampled live presentation; it is not a re-audit of all image files or all remaining articles. [Existing imagery packet](OCTOBER_2026_BLOG_IMAGES_STAGE_2_GROUP_4_FINAL_2026-09-30.md).

| Asset/block | Existing material | What a later phase would need | Feasibility and constraint |
|---|---|---|---|
| Cover and related thumbnails | Topic-specific WebP covers, alt/caption records | Crop/focal-point review and approved card format | Low effort; reuse first. Do not substitute competitor photography. |
| Responsibility map | Cloud operating-model prose and illustration | Approved labels, arrows, ownership boundaries, text equivalent | Medium; native HTML/SVG suits selectable labels and responsive layout. |
| Delivery-state explainer | Qualified prose and illustrative event sample | Validated state distinctions and branching; explicit unknown outcome | Medium; use domain truth, not a simplistic guaranteed-success animation. |
| ERP input decision tree | Existing input table and source links | Approved branching between file, Sheet, URL, authenticated connector | Medium; vertical mobile flow and ordinary list fallback. |
| Annotated product walkthrough | No verified workflow screenshots in the sampled articles | Authorized test environment, reproducible steps, version/date, redacted data, usage rights | Higher dependency; do not generate fake product screens. |
| Pricing scenario blocks | Existing canonical examples and rate source records | Editorial/rate review plus presentation schema for inputs/result/conditions | Medium; figures must come from the same verified source and preserve period semantics. |
| Customer story or quote | No approved new customer proof supplied for this audit | Permission, original evidence, exact attribution and scope | Blocked on evidence; layout must not invent social proof. |
| Motion sequence | No need established by the audit | Approved storyboard, static equivalent, controls, reduced-motion behavior | Optional later work; avoid a new library for decoration alone. |

The current guide renderer supports a fixed order of paragraphs, image, steps, table, code, note, and links within each section. This simplifies publishing, but limits purposeful interleaving and side-by-side explanation. A later implementation should introduce only the semantic blocks the approved pilot actually needs and update all relevant consumers. It should not create a parallel article body maintained separately from Markdown/MCP output. S2–S3, S6, S9.

Use original Whats91 design work. The saved reference screenshots document this comparison; they are not licensed production assets. Do not transplant reference prose, photos, branded illustrations, statistics, quotes, or proprietary font files. No original reference asset was downloaded into the public website directories.

## 9. Proposed first-blog brief

**Candidate:** Cloud API setup/delivery/billing guide.  
**Reader:** an operations or technical decision-maker planning a first controlled integration.  
**Reader outcome:** understand who owns each part, what evidence distinguishes a send request from delivery, and what to prepare for a scoped pilot.  
**Design objective:** turn the existing qualified explanation into a guide that is easier to scan and act on while preserving its factual boundaries.

This candidate covers headline/metadata, a conceptual model, tables, code, steps, citations, FAQ, CTA, and related reading. Its approved patterns could transfer to other guides. The Sheets article is a useful second pilot for richer procedural content; the dated pricing guide should follow with its own source and temporal review.

### Proposed block sequence — not new approved article copy

| Order | Reader need | Proposed form | Content constraint |
|---|---|---|---|
| 1 | Is this the guide I need? | Breadcrumb, category, title, short lead, compact truthful metadata, existing cover | Keep title/route intent and pending provenance; no fake freshness. |
| 2 | What will I understand? | Three concise outcomes or an answer summary | Summarize the actual guide, not unsupported benefits. |
| 3 | How do I move around? | Accessible compact contents; desktop alternative explored in mockup | Preserve meaningful anchors and keyboard behavior. |
| 4 | Who does what? | Labelled business system → messaging/API → operations map, with a separate inbound/status return path | Explain responsibilities without implying a verified existing ERP integration. |
| 5 | Which setup path applies? | Decision checklist plus existing registration distinctions | Retain eligibility and number-migration qualifications. |
| 6 | What must I prepare? | Numbered checklist with relevant documentation links | Use verified steps; product screens only with evidence. |
| 7 | What happened to a message? | Labelled states and outcome branches; optional expandable event example | Accepted, delivered, failed, and unknown must remain distinct; avoid guaranteed linear success. |
| 8 | What affects permission, billing, and capacity? | Separate concise callouts, tables where comparison is useful | Keep dated billing sources and avoid universal limits. |
| 9 | How do I judge a pilot? | Measurable checklist and evidence to collect | No invented benchmark or promised customer outcome. |
| 10 | What should I do next? | One primary scoped-discussion action, one secondary technical read | Existing routes/Graph form contract only. |
| 11 | Questions, provenance, onward reading | FAQ, compact share, truthful attribution, image-led related cards | Native fallback, meaningful relevance, approved identity only. |

## 10. Owner-review and implementation sequence

The sequence is a proposal. Completing this audit does not authorize its implementation.

1. **Confirm the pilot and priorities.** Review this report, select the Cloud guide or an explicit alternative, and agree whether index corrections are a separate small work item. Keep the first article's scope bounded.
2. **Prepare the content/block map.** Map each existing claim, source, qualifier, example, anchor, and CTA to the proposed form. Identify missing evidence and preserve the existing owner-input ledger. Review this before rewriting or generating assets.
3. **Review desktop and mobile designs.** Produce the complete article sequence, including middle sections, table/code states, FAQs, related reading, and footer transition. Include real current text and deliberate narrow-screen diagram variants. Agree on type measure, metadata order, and CTA priority.
4. **Approve the asset plan.** Reuse appropriate originals. Specify each new diagram's teaching purpose, text equivalent, source, caption, and mobile arrangement. Require evidence for any actual product screenshot or customer statement.
5. **Authorize and implement one pilot.** Keep server-readable article content and shared canonical records; introduce only necessary interaction islands. Preserve routes, metadata, schema, Markdown/MCP, attribution/date/index holds, and inherited work. Inspect the installed Next.js guidance before coding, as required by AGENTS.md.
6. **Run local acceptance on the complete article.** Use the existing B20 contract: 1440/1024/768/375/320 widths; contents/skip/FAQ/share/CTA behavior; focusable labelled tables/code; no-JS, failed-JS and reduced-motion reading; text spacing/reflow/forced colors; actual screenshots; appropriate lint/types/tests and baseline-relative patch review. Test any URL-filter fix with direct navigation and browser history. Do not claim performance improvement without matched measurements.
7. **Owner reviews the concrete result.** Present before/after evidence, changed-file scope, preserved factual conditions, validation results, and unresolved decisions. Publication/deployment remains a separate explicitly authorized stage.
8. **Expand only after pilot acceptance.** Apply the approved system to the Sheets guide, then the October pricing article with current source review, then other article types. Address the index/related-reading system with shared patterns proven by the pilot.

## Appendix A. Screenshot index

All screenshots are in `docs/evidence/blog-design-comparison-2026-10-02/`. Names describe the visible checkpoint rather than claiming full-page coverage. The manifest is authoritative for dimensions, URL, time, and scroll position.

| Evidence | Page / visible checkpoint | Viewport | Scroll y |
|---|---|---|---|
| [E01](evidence/blog-design-comparison-2026-10-02/01-reference-engagement-desktop-top.jpg) | Reference: engagement desktop top | 1440 × 1000 | 0 px |
| [E02](evidence/blog-design-comparison-2026-10-02/02-reference-engagement-case-visual.jpg) | Reference: engagement case visual | 1440 × 1000 | 2206 px |
| [E03](evidence/blog-design-comparison-2026-10-02/03-reference-engagement-benefits.jpg) | Reference: engagement benefits | 1440 × 1000 | 4528 px |
| [E04](evidence/blog-design-comparison-2026-10-02/04-reference-engagement-lifecycle-detail.jpg) | Reference: engagement lifecycle detail | 1440 × 1000 | 1322 px |
| [E05](evidence/blog-design-comparison-2026-10-02/05-reference-engagement-tools.jpg) | Reference: engagement tools | 1440 × 1000 | 6031 px |
| [E06](evidence/blog-design-comparison-2026-10-02/06-reference-engagement-cta-faq.jpg) | Reference: engagement cta faq | 1440 × 1000 | 8217 px |
| [E07](evidence/blog-design-comparison-2026-10-02/07-reference-engagement-footnotes-related.jpg) | Reference: engagement footnotes related | 1440 × 1000 | 10266 px |
| [E09](evidence/blog-design-comparison-2026-10-02/09-reference-ai-desktop-top.jpg) | Reference: ai desktop top | 1440 × 1000 | 0 px |
| [E10](evidence/blog-design-comparison-2026-10-02/10-reference-ai-statistic.jpg) | Reference: ai statistic | 1440 × 1000 | 1372 px |
| [E11](evidence/blog-design-comparison-2026-10-02/11-reference-ai-trust.jpg) | Reference: ai trust | 1440 × 1000 | 2490 px |
| [E12](evidence/blog-design-comparison-2026-10-02/12-reference-ai-quote.jpg) | Reference: ai quote | 1440 × 1000 | 4180 px |
| [E13](evidence/blog-design-comparison-2026-10-02/13-reference-ai-forecast.jpg) | Reference: ai forecast | 1440 × 1000 | 5480 px |
| [E14](evidence/blog-design-comparison-2026-10-02/14-reference-ai-sponsor-footnotes.jpg) | Reference: ai sponsor footnotes | 1440 × 1000 | 6300 px |
| [E15](evidence/blog-design-comparison-2026-10-02/15-reference-ai-related-footer.jpg) | Reference: ai related footer | 1440 × 1000 | 7310 px |
| [E16](evidence/blog-design-comparison-2026-10-02/16-reference-ai-mobile-top.jpg) | Reference: ai mobile top | 390 × 844 | 0 px |
| [E17](evidence/blog-design-comparison-2026-10-02/17-reference-ai-mobile-statistic.jpg) | Reference: ai mobile statistic | 390 × 844 | 1660 px |
| [E18](evidence/blog-design-comparison-2026-10-02/18-reference-ai-mobile-sponsor.jpg) | Reference: ai mobile sponsor | 390 × 844 | 8361 px |
| [E19](evidence/blog-design-comparison-2026-10-02/19-reference-commerce-desktop-top.jpg) | Reference: commerce desktop top | 1440 × 1000 | 0 px |
| [E20](evidence/blog-design-comparison-2026-10-02/20-reference-commerce-intro-statistic.jpg) | Reference: commerce intro statistic | 1440 × 1000 | 822 px |
| [E21](evidence/blog-design-comparison-2026-10-02/21-reference-commerce-comparison.jpg) | Reference: commerce comparison | 1440 × 1000 | 1770 px |
| [E22](evidence/blog-design-comparison-2026-10-02/22-reference-commerce-chatbot.jpg) | Reference: commerce chatbot | 1440 × 1000 | 2620 px |
| [E23](evidence/blog-design-comparison-2026-10-02/23-reference-commerce-pullquote.jpg) | Reference: commerce pullquote | 1440 × 1000 | 3610 px |
| [E24](evidence/blog-design-comparison-2026-10-02/24-reference-commerce-closing-visual.jpg) | Reference: commerce closing visual | 1440 × 1000 | 4860 px |
| [E25](evidence/blog-design-comparison-2026-10-02/25-reference-commerce-sponsor-related.jpg) | Reference: commerce sponsor related | 1440 × 1000 | 6200 px |
| [E26](evidence/blog-design-comparison-2026-10-02/26-reference-commerce-mobile-top.jpg) | Reference: commerce mobile top | 390 × 844 | 0 px |
| [E27](evidence/blog-design-comparison-2026-10-02/27-reference-commerce-mobile-statistics.jpg) | Reference: commerce mobile statistics | 390 × 844 | 2328 px |
| [E28](evidence/blog-design-comparison-2026-10-02/28-reference-commerce-mobile-related.jpg) | Reference: commerce mobile related | 390 × 844 | 8534 px |
| [E29](evidence/blog-design-comparison-2026-10-02/29-reference-remarketing-desktop-top.jpg) | Reference: remarketing desktop top | 1440 × 1000 | 0 px |
| [E30](evidence/blog-design-comparison-2026-10-02/30-reference-remarketing-crosslinks.jpg) | Reference: remarketing crosslinks | 1440 × 1000 | 952 px |
| [E31](evidence/blog-design-comparison-2026-10-02/31-reference-remarketing-journey.jpg) | Reference: remarketing journey | 1440 × 1000 | 2750 px |
| [E32](evidence/blog-design-comparison-2026-10-02/32-reference-remarketing-ad-example.jpg) | Reference: remarketing ad example | 1440 × 1000 | 4110 px |
| [E33](evidence/blog-design-comparison-2026-10-02/33-reference-remarketing-practices.jpg) | Reference: remarketing practices | 1440 × 1000 | 5500 px |
| [E34](evidence/blog-design-comparison-2026-10-02/34-reference-remarketing-tools.jpg) | Reference: remarketing tools | 1440 × 1000 | 7000 px |
| [E35](evidence/blog-design-comparison-2026-10-02/35-reference-remarketing-faq.jpg) | Reference: remarketing faq | 1440 × 1000 | 8400 px |
| [E36](evidence/blog-design-comparison-2026-10-02/36-reference-remarketing-related-footer.jpg) | Reference: remarketing related footer | 1440 × 1000 | 9420 px |
| [E37](evidence/blog-design-comparison-2026-10-02/37-reference-remarketing-mobile-top.jpg) | Reference: remarketing mobile top | 390 × 844 | 0 px |
| [E38](evidence/blog-design-comparison-2026-10-02/38-reference-remarketing-mobile-journey.jpg) | Reference: remarketing mobile journey | 390 × 844 | 4364 px |
| [E39](evidence/blog-design-comparison-2026-10-02/39-reference-engagement-mobile-top.jpg) | Reference: engagement mobile top | 390 × 844 | 0 px |
| [E40](evidence/blog-design-comparison-2026-10-02/40-reference-engagement-mobile-lifecycle.jpg) | Reference: engagement mobile lifecycle | 390 × 844 | 2052 px |
| [E41](evidence/blog-design-comparison-2026-10-02/41-reference-mobile-navigation.jpg) | Reference: mobile navigation | 390 × 844 | 0 px |
| [E42](evidence/blog-design-comparison-2026-10-02/42-whats91-index-desktop-top.jpg) | Whats91: index desktop top | 1440 × 1000 | 0 px |
| [E43](evidence/blog-design-comparison-2026-10-02/43-whats91-index-desktop-clear.jpg) | Whats91: index desktop clear | 1440 × 1000 | 0 px |
| [E44](evidence/blog-design-comparison-2026-10-02/44-whats91-index-grid.jpg) | Whats91: index grid | 1440 × 1000 | 850 px |
| [E45](evidence/blog-design-comparison-2026-10-02/45-whats91-index-last-row.jpg) | Whats91: index last row | 1440 × 1000 | 2180 px |
| [E46](evidence/blog-design-comparison-2026-10-02/46-whats91-index-footer.jpg) | Whats91: index footer | 1440 × 1000 | 2808 px |
| [E47](evidence/blog-design-comparison-2026-10-02/47-whats91-index-search-busy.jpg) | Whats91: index search busy | 1440 × 1000 | 600 px |
| [E48](evidence/blog-design-comparison-2026-10-02/48-whats91-index-empty-search.jpg) | Whats91: index empty search | 1440 × 1000 | 0 px |
| [E49](evidence/blog-design-comparison-2026-10-02/49-whats91-index-mobile-top.jpg) | Whats91: index mobile top | 390 × 844 | 0 px |
| [E50](evidence/blog-design-comparison-2026-10-02/50-whats91-index-mobile-filters.jpg) | Whats91: index mobile filters | 390 × 844 | 650 px |
| [E51](evidence/blog-design-comparison-2026-10-02/51-whats91-index-mobile-first-card.jpg) | Whats91: index mobile first card | 390 × 844 | 1216 px |
| [E52](evidence/blog-design-comparison-2026-10-02/52-whats91-cloud-desktop-top.jpg) | Whats91: cloud desktop top | 1440 × 1000 | 0 px |
| [E53](evidence/blog-design-comparison-2026-10-02/53-whats91-cloud-contents.jpg) | Whats91: cloud contents | 1440 × 1000 | 1000 px |
| [E54](evidence/blog-design-comparison-2026-10-02/54-whats91-cloud-toc-anchor.jpg) | Whats91: cloud toc anchor | 1440 × 1000 | 2741 px |
| [E55](evidence/blog-design-comparison-2026-10-02/55-whats91-cloud-illustration-context.jpg) | Whats91: cloud illustration context | 1440 × 1000 | 2741 px |
| [E56](evidence/blog-design-comparison-2026-10-02/56-whats91-cloud-body-table.jpg) | Whats91: cloud body table | 1440 × 1000 | 5150 px |
| [E57](evidence/blog-design-comparison-2026-10-02/57-whats91-cloud-delivery-example.jpg) | Whats91: cloud delivery example | 1440 × 1000 | 5900 px |
| [E58](evidence/blog-design-comparison-2026-10-02/58-whats91-cloud-next-step.jpg) | Whats91: cloud next step | 1440 × 1000 | 8090 px |
| [E59](evidence/blog-design-comparison-2026-10-02/59-whats91-cloud-faq-open.jpg) | Whats91: cloud faq open | 1440 × 1000 | 8274 px |
| [E60](evidence/blog-design-comparison-2026-10-02/60-whats91-cloud-share-related.jpg) | Whats91: cloud share related | 1440 × 1000 | 9510 px |
| [E61](evidence/blog-design-comparison-2026-10-02/61-whats91-cloud-footer.jpg) | Whats91: cloud footer | 1440 × 1000 | 10172 px |
| [E62](evidence/blog-design-comparison-2026-10-02/62-whats91-cloud-mobile-top.jpg) | Whats91: cloud mobile top | 390 × 844 | 0 px |
| [E63](evidence/blog-design-comparison-2026-10-02/63-whats91-cloud-mobile-contents.jpg) | Whats91: cloud mobile contents | 390 × 844 | 1008 px |
| [E64](evidence/blog-design-comparison-2026-10-02/64-whats91-cloud-mobile-illustration.jpg) | Whats91: cloud mobile illustration | 390 × 844 | 3530 px |
| [E65](evidence/blog-design-comparison-2026-10-02/65-whats91-tag-destination-top.jpg) | Whats91: tag destination top | 390 × 844 | 0 px |
| [E66](evidence/blog-design-comparison-2026-10-02/66-whats91-tag-url-unfiltered.jpg) | Whats91: tag url unfiltered | 390 × 844 | 880 px |
| [E67](evidence/blog-design-comparison-2026-10-02/67-whats91-tag-manual-filter.jpg) | Whats91: tag manual filter | 390 × 844 | 628 px |
| [E68](evidence/blog-design-comparison-2026-10-02/68-whats91-mobile-menu.jpg) | Whats91: mobile menu | 390 × 844 | 0 px |
| [E69](evidence/blog-design-comparison-2026-10-02/69-whats91-sheets-desktop-top.jpg) | Whats91: sheets desktop top | 1440 × 1000 | 0 px |
| [E70](evidence/blog-design-comparison-2026-10-02/70-whats91-sheets-input-table.jpg) | Whats91: sheets input table | 1440 × 1000 | 1770 px |
| [E71](evidence/blog-design-comparison-2026-10-02/71-whats91-sheets-csv-example.jpg) | Whats91: sheets csv example | 1440 × 1000 | 3260 px |
| [E72](evidence/blog-design-comparison-2026-10-02/72-whats91-sheets-validation-visual.jpg) | Whats91: sheets validation visual | 1440 × 1000 | 4290 px |
| [E73](evidence/blog-design-comparison-2026-10-02/73-whats91-sheets-formula.jpg) | Whats91: sheets formula | 1440 × 1000 | 5210 px |
| [E74](evidence/blog-design-comparison-2026-10-02/74-whats91-sheets-failure-table.jpg) | Whats91: sheets failure table | 1440 × 1000 | 6200 px |
| [E75](evidence/blog-design-comparison-2026-10-02/75-whats91-sheets-sources-faq.jpg) | Whats91: sheets sources faq | 1440 × 1000 | 8880 px |
| [E76](evidence/blog-design-comparison-2026-10-02/76-whats91-sheets-share-related.jpg) | Whats91: sheets share related | 1440 × 1000 | 10060 px |
| [E77](evidence/blog-design-comparison-2026-10-02/77-whats91-sheets-mobile-top.jpg) | Whats91: sheets mobile top | 390 × 844 | 0 px |
| [E78](evidence/blog-design-comparison-2026-10-02/78-whats91-sheets-mobile-table-left.jpg) | Whats91: sheets mobile table left | 390 × 844 | 1980 px |
| [E79](evidence/blog-design-comparison-2026-10-02/79-whats91-sheets-mobile-table-right.jpg) | Whats91: sheets mobile table right | 390 × 844 | 1980 px |
| [E80](evidence/blog-design-comparison-2026-10-02/80-whats91-sheets-mobile-formula.jpg) | Whats91: sheets mobile formula | 390 × 844 | 6850 px |
| [E81](evidence/blog-design-comparison-2026-10-02/81-whats91-october-desktop-top.jpg) | Whats91: october desktop top | 1440 × 1000 | 0 px |
| [E82](evidence/blog-design-comparison-2026-10-02/82-whats91-october-rate-table.jpg) | Whats91: october rate table | 1440 × 1000 | 2450 px |
| [E83](evidence/blog-design-comparison-2026-10-02/83-whats91-october-window-illustration.jpg) | Whats91: october window illustration | 1440 × 1000 | 3960 px |
| [E84](evidence/blog-design-comparison-2026-10-02/84-whats91-october-tier-illustration.jpg) | Whats91: october tier illustration | 1440 × 1000 | 6020 px |
| [E85](evidence/blog-design-comparison-2026-10-02/85-whats91-october-worked-examples.jpg) | Whats91: october worked examples | 1440 × 1000 | 6750 px |
| [E86](evidence/blog-design-comparison-2026-10-02/86-whats91-october-sources.jpg) | Whats91: october sources | 1440 × 1000 | 8840 px |
| [E87](evidence/blog-design-comparison-2026-10-02/87-whats91-october-share-related.jpg) | Whats91: october share related | 1440 × 1000 | 10360 px |
| [E88](evidence/blog-design-comparison-2026-10-02/88-whats91-october-mobile-top.jpg) | Whats91: october mobile top | 390 × 844 | 0 px |
| [E89](evidence/blog-design-comparison-2026-10-02/89-whats91-october-mobile-rates.jpg) | Whats91: october mobile rates | 390 × 844 | 3750 px |
| [E90](evidence/blog-design-comparison-2026-10-02/90-whats91-october-mobile-examples.jpg) | Whats91: october mobile examples | 390 × 844 | 9361 px |
| [E91](evidence/blog-design-comparison-2026-10-02/91-reference-engagement-footer.jpg) | Reference: engagement footer | 1440 × 1000 | 10866 px |

## Appendix B. Observation and source register

### Browser measurement files

Each pair contains desktop/mobile observations for the named page. They include headings, sampled paragraph styles, image positions, link destinations, and media-element observations. Initial lazy-loading state is preserved rather than rewritten after the fact.

| Page | Desktop | Mobile |
|---|---|---|
| R1 | [Engagement desktop](evidence/blog-design-comparison-2026-10-02/reference-engagement-desktop-observations.json) | [Engagement mobile](evidence/blog-design-comparison-2026-10-02/reference-engagement-mobile-observations.json) |
| R2 | [AI desktop](evidence/blog-design-comparison-2026-10-02/reference-ai-desktop-observations.json) | [AI mobile](evidence/blog-design-comparison-2026-10-02/reference-ai-mobile-observations.json) |
| R3 | [Commerce desktop](evidence/blog-design-comparison-2026-10-02/reference-commerce-desktop-observations.json) | [Commerce mobile](evidence/blog-design-comparison-2026-10-02/reference-commerce-mobile-observations.json) |
| R4 | [Remarketing desktop](evidence/blog-design-comparison-2026-10-02/reference-remarketing-desktop-observations.json) | [Remarketing mobile](evidence/blog-design-comparison-2026-10-02/reference-remarketing-mobile-observations.json) |
| W0 | [Index desktop](evidence/blog-design-comparison-2026-10-02/whats91-index-desktop-observations.json) | [Index mobile](evidence/blog-design-comparison-2026-10-02/whats91-index-mobile-observations.json) |
| W1 | [Cloud desktop](evidence/blog-design-comparison-2026-10-02/whats91-cloud-desktop-observations.json) | [Cloud mobile](evidence/blog-design-comparison-2026-10-02/whats91-cloud-mobile-observations.json) |
| W2 | [Sheets desktop](evidence/blog-design-comparison-2026-10-02/whats91-sheets-desktop-observations.json) | [Sheets mobile](evidence/blog-design-comparison-2026-10-02/whats91-sheets-mobile-observations.json) |
| W3 | [October desktop](evidence/blog-design-comparison-2026-10-02/whats91-october-desktop-observations.json) | [October mobile](evidence/blog-design-comparison-2026-10-02/whats91-october-mobile-observations.json) |

### Local sources inspected

Line numbers identify the inspected snapshot and may change after later edits. The code explains observed behavior; it is not evidence that a future proposal is implemented.

| ID | Source | Relevant evidence |
|---|---|---|
| S1 | [BlogBrowser.tsx](../src/components/blog/BlogBrowser.tsx), lines 34–70, 120–205, 278 onward | Local filter state, unconditional JavaScript notice, search/categories/tags, unavailable-newsletter section. |
| S2 | [PlatformGuideArticle.tsx](../src/components/blog/PlatformGuideArticle.tsx), lines 18–79 | Related selection, hero/metadata order, body width, fixed section order, table/code/FAQ/share structure. |
| S3 | [ERPGuideArticle.tsx](../src/components/blog/ERPGuideArticle.tsx), lines 18–79 | Different metadata order, registry-related selection, table labels, otherwise similar rendering. |
| S4 | [BlogCard.tsx](../src/components/blog/BlogCard.tsx) | Shallow fixed image height, clamped copy, 10 px informational labels, pending attribution. |
| S5 | [October pricing guide](../src/lib/blog/october-pricing-guide.ts), lines 24–28, 46–98 | Three-image records, example paragraphs, source/limitation text. |
| S6 | [Blog registry](../src/lib/blog/registry.ts), lines 49–69, 298–328 | October record without publication date, descending date sort, related scoring, shared canonical content. |
| S7 | [Design system](../WHATS91_DESIGN_SYSTEM.md), lines 119–166 | Reading/narrow containers, typography specification, 65ch measure, 12 px floor. |
| S8 | [Page pattern library](../WHATS91_PAGE_PATTERN_LIBRARY.md), lines 50 and 127–137; [global CSS](../src/app/globals.css), line 45 | Article hero/body pattern and actual system font stack. |
| S9 | [B20 article contract](WEBSITE_QUALITY_AND_HUMAN_FIRST_B20_ARTICLE_CONTRACT_2026-09-28.md) | Server-readable explanations, canonical parity, evidence/attribution safeguards, future acceptance requirements. Historical completion states are not reassessed here. |
| S10 | [Final imagery packet](OCTOBER_2026_BLOG_IMAGES_STAGE_2_GROUP_4_FINAL_2026-09-30.md); [prior local review](OCTOBER_2026_PRICING_AND_BLOG_FINAL_LOCAL_REVIEW_2026-09-30.md) | Existing asset provenance and earlier local validation boundaries. Current screenshots supply the live design observations in this report. |

### Completion record

- Eight live pages inspected with desktop and mobile evidence; lower sections and endings included.
- Ninety accepted JPEG screenshots and sixteen observation JSONs retained; incomplete/transient duplicate attempts excluded in the manifest.
- Report links, evidence inventory, image files, and change scope checked after writing.
- Browser viewport override restored. No runtime code change means no application build or test run was required for this report-only task.
- Next action is owner review of the proposed pilot and design direction.
