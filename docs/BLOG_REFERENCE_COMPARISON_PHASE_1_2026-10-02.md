# Whats91 blog reference comparison — Phase 1

**Review date:** 2 October 2026, Asia/Kolkata  
**Status:** Analysis complete; proposed redesign sequence for owner review. No application code, article content, generated assets, publication settings, or deployment changed.  
**Scope:** Four complete WhatsApp Business reference articles, the live Whats91 blog index, and three representative live Whats91 articles.  
**Evidence:** 48 accepted browser screenshots in [the evidence folder](./evidence/blog-reference-comparison-2026-10-02/). Source inspection supplements live observations.

## Decision summary

Whats91 already has useful technical content, topic-specific original imagery, working contents links, explicit source links, and mobile tables contained within the article. The strongest opportunity is to improve how readers enter, scan, understand, and continue reading that content.

The reference articles create a more deliberate editorial rhythm: a compact desktop hero, a narrower and larger-text reading column, frequent visuals tied to the argument, contextual links, and image-led recommendations at the end. They are not flawless templates. Their multi-column graphics shrink badly on mobile, some bright green headings deserve contrast review, and none of the four provides the useful in-article contents navigation already present on Whats91.

The most concrete functional defect is the Whats91 tag journey: selecting an article tag navigates to `/blog?tag=Enterprise`, but the index still shows all 11 posts. The largest layout issues are the oversized index introduction/filter area and article headers plus expanded contents lists that put the first substantive section roughly 1,700–1,930 CSS pixels below the page top on mobile.

**Recommended first pilot:** the Cloud API complete guide. It exercises a technical introduction, choice table, process explanation, delivery states, references, FAQ, CTA, and related reading. Use that single article to establish the reading layout and explanatory visual system. Review it before applying the changes to other article families. Treat pricing as a separate, more exacting follow-up because conditions, units, dates, examples, and source references need to remain tightly connected.

## Method, evidence labels, and limits

- **Observed:** current live browser state, interaction, screenshot, or DOM measurement from this review.
- **Source-confirmed:** current local source explains an observed behavior. Local source is not proof of a production release SHA.
- **Interpretation:** a design judgment based on those observations; not measured conversion or reading behavior.
- **Proposal:** a future change, acceptance criterion, or asset brief. No proposal was implemented in this phase.
- **Historical context:** existing project handoff documents and memory informed the constraints. They were not used as current live visual evidence or current test results.

All eight pages were read from header through footer. Desktop inspection used a 1440 × 1000 viewport; mobile inspection used a 390 × 844 viewport in the same real browser. The mobile results are browser viewport checks, not physical-device tests. Measurements below are approximate CSS pixels at those viewports, not universal breakpoints or performance metrics.

The review included initial and lower-page states, image loading, headings, links, tables, contents navigation, related reading, and footer treatment. On Whats91 it also exercised search and clearing search, an article-tag navigation, a contents link, an FAQ expansion, and the mobile menu. No enquiries, subscriptions, social posts, or other external messages were submitted.

Full-page exports were inspected before acceptance. The agentic-commerce exports at both sizes and the AI article mobile export contained grey offscreen image placeholders even though those images were loaded in viewport inspection. Those three exports were rejected and removed. Their accepted viewport captures and whole-page browser traversal support the observations; blank export areas are **not** reported as website defects. The screenshot numbering therefore intentionally skips 12, 40, and 42.

This is not a full accessibility, performance, SEO, legal, pricing-accuracy, or analytics audit. Keyboard-only journeys, screen readers, zoom/reflow, contrast ratios, device testing, network budgets, every outbound destination, and every article remain future checks. No conversion improvement or ranking effect is claimed.

## Numbered review steps and overall health

| Step | Page and complete reading journey | General health |
|---|---|---|
| 1 / R1 | [Customer engagement guide](https://whatsappbusiness.com/blog/customer-engagement-ultimate-guide/) | Strong editorial structure; dense case-study middle and small mobile diagram labels |
| 2 / R2 | [AI customer service agents](https://whatsappbusiness.com/blog/ai-customer-service-agents/) | Strong evidence-led design; long mobile sequence and repeated visual/text statistics |
| 3 / R3 | [Agentic commerce strategy](https://whatsappbusiness.com/blog/agentic-commerce-ai-strategy/) | Strong channel-by-channel narrative; visual detail and reading order need mobile care |
| 4 / R4 | [Remarketing ads guide](https://whatsappbusiness.com/blog/remarketing-ads-guide/) | Strong practical sequence; multi-column journey graphic is weak at phone width |
| 5 / W1 | [Whats91 blog index](https://whats91.com/blog) | Needs priority work on discovery, page height, and URL-based filtering |
| 6 / W2 | [Whats91 Cloud API complete guide](https://whats91.com/blog/whatsapp-cloud-api-complete-guide-2026) | Sound technical structure; best first pilot for reading layout and explanatory visuals |
| 7 / W3 | [Whats91 Busy Accounting guide](https://whats91.com/blog/busy-accounting-whatsapp-integration-benefits) | Useful workflow detail; repetitive section presentation and weak onward reading |
| 8 / W4 | [Whats91 October 2026 pricing guide](https://whats91.com/blog/meta-whatsapp-pricing-october-2026-india) | Careful source-oriented structure; slow access to rates and mobile table interpretation |

## 1. R1 — Customer engagement guide

**Observed publication label:** 10 September 2025. **Category:** Customers.

The complete sequence is introduction → definition → lifecycle → importance → four business cases → benefits and B2B/B2C discussion → tools → product next step → four open FAQ answers → footnotes → three related articles → footer.

The desktop hero pairs title/date with a large photo-and-chat composition in a dark green rounded panel. The body moves to a much narrower reading column. The article uses five main editorial images including the hero: the hero composition, lifecycle infinity diagram, shopping/chat collage, plant/chat collage, and closing photograph. These change the texture of the article while staying connected to its subject.

The lifecycle graphic is particularly useful on desktop because the relationship between stages is visible at once. On mobile, it scales to roughly 350 × 201 pixels and its labels become small. This is a reason to adapt complex diagrams, rather than merely making a desktop image responsive.

Links to Dermalogica, Pegadaian, Mercedes-Benz, and Paragon appear alongside the relevant business discussion. Research references and product links are woven into the narrative. A partner-oriented next step appears before the end; a features-oriented link appears later. The four FAQ answers are visible prose rather than accordions. Three image cards provide onward reading, although the current recommendations are not all close matches to the customer-engagement topic.

**Strength to adapt:** alternate explanation, evidence, and a visual that earns its position. Place source and product links where they answer the reader's current question.

**Caution:** the middle case-study stretch is still lengthy, there is no in-article contents navigation, and some large headings use bright green on white. Contrast was not formally measured. Do not copy either the lack of navigation or the colour treatment without testing.

![R1 desktop hero, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/01-meta-engagement-desktop-hero.jpg)

Evidence: [desktop lifecycle](./evidence/blog-reference-comparison-2026-10-02/02-meta-engagement-desktop-lifecycle.jpg), [mobile lifecycle](./evidence/blog-reference-comparison-2026-10-02/05-meta-engagement-mobile-diagram.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/03-meta-engagement-desktop-full.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/41-meta-engagement-mobile-full.jpg).

## 2. R2 — AI customer service agents

**Observed publication label:** 17 September 2026.

The complete sequence is guest-author/sponsor context → adoption and trust → human handoff → upsell/service opportunity → conclusion → two sponsor/product actions → source footnotes → three related cards → footer. The named IDC contributor and role are explicit near the start; this is stronger provenance presentation than an anonymous expert-style voice would be.

Six main images, including the hero, support the argument. Two square evidence cards are paired with prose in the desktop column; three wider visual cards then vary the presentation with a photo/statistic composition, quotation, and forecast. These are static explanatory graphics in the observed states. No in-article video, canvas, or interactive animation was observed.

The desktop evidence pairing is economical: a roughly 375-pixel square card sits alongside a narrower text block. Mobile stacks these elements. It remains understandable, but repeated statistics in the graphic and adjacent copy, together with the vertical spacing, make the sequence longer. The visual should add a relationship, comparison, or memorable emphasis rather than duplicate an entire paragraph.

The article links contextually to the agentic-commerce article. Two clear green actions at the end lead toward enterprise AI and the platform. There is no FAQ or in-article contents list in the observed article.

**Strength to adapt:** modular evidence panels and clear provenance, with a small number of explicit next steps.

**Caution:** Whats91 must not imitate sponsored-research statistics or a named expert byline without its own approved source and attribution. A graphic that contains essential words must remain understandable in accessible text and at phone width.

![R2 desktop evidence pairing, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/07-meta-ai-desktop-evidence.jpg)

Evidence: [desktop hero](./evidence/blog-reference-comparison-2026-10-02/06-meta-ai-desktop-hero.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/08-meta-ai-desktop-full.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/09-meta-ai-mobile-hero.jpg), [mobile evidence](./evidence/blog-reference-comparison-2026-10-02/10-meta-ai-mobile-evidence.jpg). A mobile full-page export was rejected for capture defects; the complete page was still traversed and inspected.

## 3. R3 — Agentic commerce strategy

**Observed publication label:** 12 August 2026. **Category:** Business Messaging.

The complete sequence is IDC contributor/sponsor context → opening evidence panel → three numbered channel types → definitions, supporting evidence, and risk/opportunity questions for each → broader strategic context → team photograph → footnotes → two sponsor/product actions → three related cards → footer.

Six main images, including the hero, provide several forms of evidence: the opening statistic, survey bars, a concierge/photo-statistic panel, a quotation card, and a team photograph. The channel-by-channel structure gives the reader a reason to continue. The short questions following each channel help convert broad strategy into an assessment task.

The opening desktop section places prose beside the statistic card. The mobile sequence places the card before the associated prose. This can work, but the surrounding context must still introduce what the statistic means. Wide evidence panels demand close attention to label size. Dark headings and bright green subheadings create hierarchy, but the bright green treatment should not be copied without a contrast check.

The article's visual energy comes from image composition, changing block sizes, and section pacing. No in-article animated explainer or video was observed. That distinction matters: Whats91 does not need an animation library to adopt this editorial principle.

**Strength to adapt:** explain one option at a time using a consistent pattern—what it is, what evidence or mechanism supports it, and what the reader should decide.

**Caution:** do not transplant a sponsor-oriented narrative into a technical setup guide. Whats91's corresponding panels should explain actual setup choices, responsibilities, and delivery states.

![R3 later evidence panel, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/49-meta-commerce-desktop-quote.jpg)

Evidence: [desktop hero](./evidence/blog-reference-comparison-2026-10-02/11-meta-commerce-desktop-hero.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/13-meta-commerce-mobile-hero.jpg), [mobile statistic](./evidence/blog-reference-comparison-2026-10-02/14-meta-commerce-mobile-stat.jpg), [late section](./evidence/blog-reference-comparison-2026-10-02/50-meta-commerce-desktop-late-section.jpg), [end of article](./evidence/blog-reference-comparison-2026-10-02/51-meta-commerce-desktop-end.jpg). Desktop and mobile full-page exports were rejected; viewport evidence is used instead.

## 4. R4 — Remarketing ads guide

**Observed publication label:** 27 August 2025. **Category:** Marketing Messages.

The complete sequence is introduction with two early linked routes → definition and benefits → qualified business example → how remarketing works → comparison → five-stage journey graphic → seven types → best practices → tools → product next step → three open FAQ answers → three related cards → footer.

Five main images, including the hero, combine photographic compositions and flat illustration. The five-column journey graphic is the strongest desktop teaching device: it turns a sequence into something a reader can scan. It is also the clearest mobile weakness in the sample. Scaling five columns into the phone's content width makes the words and examples hard to use.

Contextual links cover ads, B2C discussion, marketing, measurement, and partner/product next steps. The early linked alternatives help readers who arrived with a slightly different question. The seven-type list and best-practice material provide substantial text after the visual explanation; the page is not merely a sequence of decorative pictures.

**Strength to adapt:** a practical journey that links each concept to an action or choice, with a relevant commercial next step after the explanation.

**Caution:** keep the journey's content as responsive text/cards or an equivalent mobile layout. Do not export five columns of essential copy into one raster image and call the mobile task complete.

![R4 desktop journey graphic, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/16-meta-remarketing-desktop-journey.jpg)

Evidence: [desktop hero](./evidence/blog-reference-comparison-2026-10-02/15-meta-remarketing-desktop-hero.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/17-meta-remarketing-desktop-full.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/18-meta-remarketing-mobile-hero.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/43-meta-remarketing-mobile-full.jpg).

## 5. W1 — Whats91 blog index

The live index presents 11 articles in three desktop columns and one mobile column. Topic-specific cream/sage covers give the catalogue a consistent identity. Cards contain category, title, excerpt, tags, reading time, and pending attribution. Titles and excerpts are clamped; some useful differentiating detail is consequently hidden.

Before the reader reaches those cards, the page presents a JavaScript notice, badge, large heading, introduction, four action-like cards, search, category controls, and roughly 35 tag controls. At the measured viewport, “Latest Articles” starts around y=902 on desktop and y=1263 on mobile. The first card title is around y=1135 and y=1476 respectively. No article is visible in the first 844-pixel mobile viewport.

The four cards say Browse/API guides, Explore/Automation examples, Read/Integration guides, and Review/Account conditions. They have hover styling but are plain `div` elements without an action. Their appearance suggests navigation that does not exist. Either give them a distinct useful destination or remove them from the discovery path.

Search itself worked: entering `pricing` returned three matches; clearing restored 11. Because search includes excerpts and tags, a less obviously pricing-focused title can legitimately match. The large tag inventory is less useful for this small catalogue. Similar labels such as WhatsApp API, Cloud API, and WhatsApp Cloud API fragment a reader's mental model.

**Verified functional gap:** clicking the Cloud guide's Enterprise tag navigated to `https://whats91.com/blog?tag=Enterprise`. The index still displayed All Posts and all 11 articles. Source confirms that the selected tag starts as `null` and the component does not initialize it from the URL. This needs a functional correction before visual polish can make that journey reliable.

The JavaScript explanation is an unconditional paragraph, visible even while filtering works. A progressive-enhancement message should appear only in the relevant state. The newsletter area honestly says the subscription is unavailable and offers other resources; it nevertheless consumes a substantial closing block without providing the promised subscription action.

The October pricing article appears last because it has no publication date. The registry sorts by actual publication date and the index does not use its featured-post helper. The remedy is an explicitly curated placement or a confirmed publication decision—not inventing a date to improve sorting.

**Interpretation:** the page currently prioritizes its introduction and taxonomy over its actual editorial inventory. A smaller introduction, search, a few meaningful categories, optional additional filters, and immediately visible articles would be more proportionate to 11 posts.

![W1 desktop index before the articles, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/20-whats91-index-desktop-top.jpg)

Evidence: [article cards](./evidence/blog-reference-comparison-2026-10-02/21-whats91-index-desktop-cards.jpg), [mobile top](./evidence/blog-reference-comparison-2026-10-02/19-whats91-index-mobile-top.jpg), [mobile filters and first article](./evidence/blog-reference-comparison-2026-10-02/29-whats91-index-mobile-filters.jpg), [tag destination state](./evidence/blog-reference-comparison-2026-10-02/28-whats91-tag-mobile-state.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/22-whats91-index-desktop-full.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/44-whats91-index-mobile-full.jpg). The screenshot alone cannot establish the URL query; the navigation observation and source confirm that part of the finding.

## 6. W2 — Whats91 Cloud API complete guide

The full article contains nine substantive sections, five expandable FAQ answers, sharing, attribution, two related guides, and the site footer. Its sequence covers registration choices, the operating model, setup, message types, delivery states, costs, capacity, a pilot, and the next step. This is a useful technical progression.

The large vertically stacked hero contains breadcrumbs, category, a bold title, a long introduction, a wide cover, caption, metadata, and tags. The contents box then lists all sections plus FAQ. The first substantive heading is around y=1819 on desktop and y=1719 on mobile. The issue is the accumulated height of several reasonable elements, not one oversized margin.

The observed desktop prose column is about 832 pixels wide at 16-pixel text with 28-pixel line height. Mobile prose is approximately 358 pixels wide. The generous line height helps, but the desktop width and smaller type feel closer to technical documentation than the reference articles' narrower, larger-text editorial layout.

The two images are a topic-specific still-life cover and an operating-model illustration. The illustration separates responsibilities visually, but the reader needs its caption and surrounding prose to decode the unlabeled parts. The rest of the guide has a long run of text, lists, and tables. There are opportunities for a labelled setup-choice explanation and an accurate delivery-state diagram; simply adding more decorative covers would not solve them.

The contents link was exercised and reached `#cloud-operating-model`. Mobile tables remained inside their own horizontal scroll region instead of widening the page. These are strengths to preserve. A persistent or compact contents affordance could help on a long guide without keeping the entire contents list expanded before the first answer.

“Discuss Cloud API setup” and pricing-related links are relevant next steps, but their styling is similar to reference links. One primary article-level next action would be clearer. The global app-opening action serves a different reader intent. Related reading currently shows migration and the older pricing guide as text-only cards.

**Interpretation:** this is the best pilot because its content already has meaningful teaching units. Its first redesign should make those units easier to reach and understand, while preserving technical distinctions such as accepted versus delivered.

![W2 desktop article hero, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/23-whats91-cloud-desktop-hero.jpg)

Evidence: [operating model](./evidence/blog-reference-comparison-2026-10-02/24-whats91-cloud-desktop-model.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/26-whats91-cloud-mobile-hero.jpg), [mobile table](./evidence/blog-reference-comparison-2026-10-02/27-whats91-cloud-mobile-table.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/25-whats91-cloud-desktop-full.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/45-whats91-cloud-mobile-full.jpg).

## 7. W3 — Whats91 Busy Accounting guide

The complete sequence covers choosing a workflow, invoice sharing, outstanding balances, ledger sharing, payment reminders, bilty documents, readiness, a pilot/ROI discussion, and next steps. Five native FAQ items, sharing, attribution, one related guide, and the footer follow. The synthetic ledger example is identified as an example; it is not presented as customer evidence.

The cover and four-stage invoice illustration fit the subject. The illustration's icon cards are largely unlabeled, so the surrounding numbered steps do much of the explanatory work. Later workflows return to repeated paragraphs, lists, and tables without comparable visual aids. A small reusable “trigger → source document → recipient check → message → result” pattern could help readers compare workflows, provided each workflow's actual contract remains distinct.

The same desktop type/width and tall preamble apply. The first substantive section starts around y=1819 on desktop and y=1703 on mobile. Unlike the platform template, this template places publication/reading/attribution metadata before the cover. That inconsistency does not prevent use, but it signals separate templates that should share a deliberate editorial rule.

The pilot discussion and contact links fit the subject. The end recommendations are weaker: only the Sheets guide qualifies under the current registry scoring, leaving a single half-width card on desktop. A curated set should explain why each next article is useful; a fixed number of generic recommendations would be less helpful.

**Strength to preserve:** practical steps, sample-data honesty, readiness conditions, and conservative benefit wording.

**Improvement:** give each important workflow a small visual explanation, reduce repeated block styling, and make the pilot next step distinct. Any savings, results, customer logos, or real product screenshots require their own approved evidence.

![W3 invoice workflow section, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/31-whats91-busy-desktop-workflow.jpg)

Evidence: [desktop hero](./evidence/blog-reference-comparison-2026-10-02/30-whats91-busy-desktop-hero.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/33-whats91-busy-mobile-hero.jpg), [mobile workflow](./evidence/blog-reference-comparison-2026-10-02/34-whats91-busy-mobile-workflow.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/32-whats91-busy-desktop-full.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/46-whats91-busy-mobile-full.jpg).

## 8. W4 — Whats91 October 2026 pricing guide

The complete sequence is changes → rate table → service/free-entry conditions → utility-window treatment → volume tiers → worked examples → seven-step budgeting method → platform fees → official sources. Eight native FAQ items, sharing, attribution, three related cards, and the footer follow.

The page uses three illustrations: a pricing cover, a people/clock scene for window rules, and an abstract tier illustration. These establish a consistent tone but do not directly label the conditions or explain the arithmetic. Pricing readers would benefit more from a clearly labelled window timeline, tier diagram, and transparent worked example than from additional abstract illustrations.

The long introduction is roughly six desktop lines and fourteen mobile lines at the observed widths. On mobile, the cover begins around y=802; contents begins around y=1315; the first substantive section around y=1932; and the rates section around y=3083. This is considerable travel for someone arriving to answer a rate question.

The mobile rate table is at least 560 pixels wide inside an approximately 356-pixel viewport region. The right-hand interpretive column is initially offscreen. Horizontal containment is correct, but a visible scroll cue or mobile row/card presentation would help readers discover the missing explanation. The first FAQ was opened successfully and its answer appeared in place.

Source links, qualification notes, and the distinction between charges and platform fees are useful editorial building blocks. This review does **not** validate the rates or billing rules. Any redesign must keep units, effective dates, eligibility conditions, illustrative assumptions, and source references adjacent to the claims they qualify.

The article has no publication label because the source publication date is unresolved. An effective date in a title is not automatically a publication date. Its lower index position should be solved explicitly rather than by silently converting one date type into another.

**Interpretation:** preserve the careful qualifications, but restructure the entry around “what changed / which rate / which condition / worked example.” This should follow the general article pilot, with a separate content and calculation review.

![W4 mobile pricing table, actual browser capture](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/evidence/blog-reference-comparison-2026-10-02/38-whats91-pricing-mobile-table.jpg)

Evidence: [desktop hero](./evidence/blog-reference-comparison-2026-10-02/35-whats91-pricing-desktop-hero.jpg), [mobile hero](./evidence/blog-reference-comparison-2026-10-02/37-whats91-pricing-mobile-hero.jpg), [expanded FAQ](./evidence/blog-reference-comparison-2026-10-02/39-whats91-pricing-mobile-faq.jpg), [complete desktop](./evidence/blog-reference-comparison-2026-10-02/36-whats91-pricing-desktop-full.jpg), [complete mobile](./evidence/blog-reference-comparison-2026-10-02/47-whats91-pricing-mobile-full.jpg).

## Cross-page pattern matrix

Counts below refer to main editorial images, including the hero, and exclude logos and related-card thumbnails. They describe this sample rather than every article on either site.

| Pattern | R1 Engagement | R2 AI service | R3 Agentic commerce | R4 Remarketing | Whats91 Cloud / Busy / October |
|---|---|---|---|---|---|
| Desktop entry | Text/image split in dark panel | Same shared hero | Same shared hero | Same shared hero | Vertically stacked title, intro, metadata/cover, tags |
| Main imagery | 5; lifecycle plus contextual collages/photos | 6; paired stats, quote, forecast | 6; stats, survey, quotation, team | 5; journey plus photo/illustration | 2 / 2 / 3; cover plus one or two supporting illustrations |
| Body rhythm | Narrative, cases, figures | Prose/evidence pairings | Numbered channel evaluations | Definition, stages, types, practice | Repeated heading/paragraph/list/table sections |
| Contents navigation | None observed | None observed | None observed | None observed | Full early list; working anchors; no persistent article contents observed |
| Links | Contextual cases/research/products | Contextual evidence and related topic | Evidence and sponsor/product routes | Contextual topic/tool/product routes | Clear links, often separate further-reading blocks |
| FAQ | 4 open answers | None observed | None observed | 3 open answers | 5 / 5 / 8 native expandable items |
| Author/date treatment | Date visible | Date plus named IDC contributor/sponsor context | Date plus named IDC contributor/sponsor context | Date visible | Genuine available dates; pending attribution; October publication date absent |
| Primary next step | Partner/features links | Two end buttons | Two end buttons | Product next step | Relevant text links have similar emphasis to references |
| Related reading | 3 image cards | 3 image cards | 3 image cards | 3 image cards | 2 / 1 / 3 text-only cards with different selection rules |
| Sharing | No article share bar observed | Same | Same | Same | X, LinkedIn, copy control, and long visible article URL |
| Motion | Static visuals observed | Static visuals observed | Static visuals observed | Static visuals observed | Sampled article visuals static; index has decorative pulse styling |
| Main mobile weakness | Lifecycle labels shrink | Long stacked evidence sequence | Dense panels and changed order | Five-column raster journey shrinks | Long preamble; tables need scroll discovery; diagrams rely on surrounding copy |

### Typography, width, and density

| Measured property | Reference article family | Whats91 article samples | Design implication |
|---|---|---|---|
| Desktop title | About 36px / 39.6px, regular weight | 48px / 60px, bold | Hierarchy comes from arrangement as well as title size; a bigger title alone does not improve the entry |
| Mobile title | About 32px / 35.2px | 30px / 37.5px | Both readable; the long surrounding introduction is a larger height contributor on Whats91 |
| Desktop body width | About 750px | About 832px | Prototype a narrower Whats91 prose measure while allowing tables/figures to be wider |
| Desktop body text | About 18px / 23.4px | 16px / 28px | Test roughly 18px prose with comfortable line height; do not copy the reference line height automatically |
| Desktop section headings | Frequently 48px / 52.8px; subheadings about 36px | Generally 30px, semibold, often with a bottom rule | The reference's heading scale creates strong pauses, but can exceed its own H1; Whats91 needs a coherent hierarchy rather than identical dimensions |
| Mobile content width | About 350px, 20px side margins | About 358px, 16px side margins | Both fit; mobile diagrams and tables need purpose-built treatment more than a small margin adjustment |
| Whats91 index heading | Not compared to a reference index in this scope | 60px desktop, 36px mobile | Judge the index by access to articles, not by visual similarity to article heroes |

### How long before the useful content begins?

| Whats91 location | Desktop y-position | Mobile y-position |
|---|---:|---:|
| Index: Latest Articles heading | ~902 | ~1263 |
| Index: first card title | ~1135 | ~1476 |
| Cloud: contents begins | ~1230 | ~1102 |
| Cloud: first substantive section | ~1819 | ~1719 |
| Busy: first substantive section | ~1819 | ~1703 |
| October pricing: contents begins | ~1288 | ~1315 |
| October pricing: first substantive section | ~1877 | ~1932 |
| October pricing: rates section | ~2496 | ~3083 |

These measurements establish the current layout, not a claim that every reader needs all content in the first screen. The proposal is to shorten the route to the first useful answer and keep navigation available without forcing readers through a long expanded contents block.

## Prioritized gaps and proposed acceptance criteria

P1 means a first-pilot or immediately adjacent discovery issue. P2 means the next design iteration. Owner-dependent items are explicitly identified; visual work cannot supply missing factual approval.

| Priority | Finding and evidence | Proposed change | Acceptance for a later implementation |
|---|---|---|---|
| P1 | Article tag → unfiltered index; W1/W2, screenshot 28 and source | Initialize and maintain the selected filter from a supported URL contract | Opening the Enterprise tag URL selects that tag and shows matching posts; clear/back/forward and unknown tags behave deliberately; existing search still works |
| P1 | Index article discovery begins below a large introduction and taxonomy; W1, 19–22/29/44 | Short introduction, useful category navigation, compact search, optional advanced tags; remove or activate the four inert cards | At 390 × 844 a reader can identify at least one actual article without traversing the current full tag wall; count and active-filter state remain clear |
| P1 | Article answer delayed by stacked hero and full contents; W2–W4 | Shorter introduction, deliberate metadata position, compact/collapsible contents on mobile; consider a split hero only where it fits | First useful explanation is materially earlier than the measured baseline; title, date context, cover caption, and contents remain available; anchor targets are not hidden under the header |
| P1 | Desktop prose is wide and visually small; W2–W4 | Prototype ~700–760px or an equivalent readable character measure with ~18px prose; retain wider figures/tables where needed | Review long paragraphs and dense lists at desktop and mobile sizes; no page-level horizontal overflow or cramped controls |
| P1 | Supporting images suggest mechanisms but do not label them; W2/W3 | Add or adapt a small number of semantic explainers tied to real decisions | A reader can explain each diagram without guessing what an icon means; mobile labels remain legible; accessible text communicates the same relationship |
| P1, owner-dependent | Repeated “Attribution Pending,” absent approved byline; all Whats91 samples | Decide approved authorship/review treatment and publication/date policy | No invented author, credentials, review date, or publication date; any unresolved status remains explicit until approved |
| P2 | Mobile table's interpretation is offscreen; W4, 38 | Visible horizontal-scroll affordance or a labelled mobile row/card alternative | All columns/qualifications can be discovered and read at 390px; keyboard scroll and focus are tested; no data disappears in the alternate view |
| P2 | CTA and supporting references look alike; W2–W4 | One clearly named primary next step after the relevant explanation, with secondary reference links | CTA wording matches an available service and destination; no false demo, free offer, result, or eligibility promise |
| P2 | Related-reading logic differs and may yield a single card; W2–W4 | Curated topic relationships or improved shared logic, with covers where useful | Each recommendation has a clear topical reason; one/two/three-item layouts work; publication/index-hold policy is explicitly respected |
| P2, owner-dependent | Undated October article appears last despite topical importance; W1/W4 | Explicit featured/editorial placement under an approved promotion policy | Effective dates are not recast as publication dates; held-content promotion is an intentional owner decision |
| P2 | Large sharing/attribution/closing blocks repeat before a large footer; W2–W4 | Compact sharing and a coherent author/review/next-reading close | Copy/share controls remain accessible; canonical link is still available; the next article is easy to locate |
| P2 | Always-visible JavaScript message and unavailable newsletter block; W1 | Show state guidance only when relevant; end with useful available resources | Normal scripted view has no misleading fallback notice; no non-functional signup is introduced; no new backend/form route is required |

## Original visual system and asset brief

The reference lesson is **explanatory variety**, not a requirement to reproduce Meta's assets, branding, headline colours, statistics, or page chrome. Whats91 should retain its own green/neutral palette and the established cream/sage imagery unless the owner approves a broader visual change. Existing source-backed illustrations and captions are reusable assets, not automatic replacement candidates.

### First-pilot assets

| Asset or module | Reader question it answers | Proposed treatment | Required input and verification |
|---|---|---|---|
| Cloud guide cover | “Is this the guide I need?” | Reuse the current original cover initially; test a more compact crop/layout without changing its meaning | Current cover, alt text, caption; verify crop at both widths |
| Responsibilities diagram | “Which part does Meta, my application, and the operator own?” | Labelled responsive flow; revise the existing conceptual illustration or pair it with semantic labels | Current article/source contract; verify boundaries and arrows, not just appearance |
| Setup-choice comparison | “Which setup path applies to me?” | Two or three responsive choice cards with requirements and next step | Existing comparison content and verified links; preserve caveats |
| Delivery-state explanation | “Does accepted mean delivered?” | Small labelled state/branch diagram including the relevant unknown/failure distinctions | Current lifecycle wording; ensure no arrow implies a guaranteed outcome or an unsupported transition |
| Busy workflow module, later | “What triggers this message and what must be checked?” | Text-backed steps with source document, recipient validation, message, and result | Workflow-specific details; synthetic examples clearly identified |
| Pricing window/tier module, later | “When does this rule apply and how is the example calculated?” | Responsive timeline plus explicit units and worked calculation | Current official sources, effective date, assumptions, and calculation review before publication |

Essential explanatory labels should be HTML text or have an equally complete adjacent text explanation. A raster image can support the story, but it should not be the sole carrier of a pricing rule or technical requirement. Mobile variants should rearrange content, not merely shrink it.

No asset generation is needed to approve this plan. A later asset request should specify the exact section, teaching purpose, source-backed labels, desktop/mobile arrangement, alt text, caption, and approval status. Do not invent product screenshots, testimonials, customer outcomes, badges, logos, or research statistics. Reuse third-party visual assets only with appropriate rights; the reference screenshots here are review evidence, not a production asset library.

### Motion decision

The inspected references demonstrate that static composition can provide a varied reading experience. Motion is optional for Whats91. If a future pilot uses it, apply it only where staged revelation teaches something—for example, showing the progression of a message state after a reader action. Keep a complete static explanation, respect reduced-motion preferences, and provide control for any sustained playback. Do not add automatic scroll reveals that hide essential content or a new animation dependency solely to resemble these reference pages.

## Source feasibility and change boundaries

The following local files were read in this phase. They explain likely implementation seams; they are not a prescribed architecture for the redesign.

| Source | Current responsibility / implication |
|---|---|
| [BlogBrowser.tsx](../src/components/blog/BlogBrowser.tsx) | Index introduction, search, categories, tags, grid, closing block. URL filter initialization and the unconditional JavaScript message are localized concerns. It already has client state because filtering is interactive. |
| [blog/page.tsx](../src/app/blog/page.tsx) | Server wrapper and SEO/structured data around the index. Preserve server-rendered initial article availability. |
| [PlatformGuideArticle.tsx](../src/components/blog/PlatformGuideArticle.tsx) | Shared article header, section rendering, tables, FAQ, sharing, related reading. A global layout change has a wider effect than the first pilot. Related posts currently come from `billingGuides`, excluding the current slug. |
| [ERPGuideArticle.tsx](../src/components/blog/ERPGuideArticle.tsx) | Similar article rendering with metadata before the cover; uses `getRelatedPosts(slug, 2)`. Shared visual rules could reduce drift, but a full template rewrite is not required to test one article. |
| [ArticleAttribution.tsx](../src/components/blog/ArticleAttribution.tsx) | Pending author presentation is explicit. It cannot be resolved by styling or an inferred author name. |
| [registry.ts](../src/lib/blog/registry.ts) | Catalogue, actual-date sorting, featured helper, and tag/category-related scoring. Current related scoring does not itself exclude index-held posts. Any changed recommendation/promotion policy needs an explicit rule. |
| [metadata.ts](../src/lib/blog/metadata.ts) | Article metadata and index-hold behavior. An existing hold produces noindex/follow; redesign is not authorization to remove it. |
| [dates.ts](../src/lib/content/dates.ts) | Preserves genuine content dates. A visual refresh or pricing effective date must not silently become a publication date. |
| [Animations.tsx](../src/components/blog/Animations.tsx) | Animation helpers exist, but the inspected current article components do not import them. Their presence does not prove live article animation. |

**Feasibility assessment:** the index corrections are localized. Article redesign is moderate in scope because the layout is shared, imagery and captions have several consumers, and editorial metadata has deliberate constraints. Responsive diagrams and pricing explanations require content/design work as well as styling. No estimate or delivery promise is made before the first pilot is approved.

Use an explicit pilot boundary or equivalent isolation so that one accepted article does not silently change all 11 posts. Retain Server Components for static article rendering. Add client behavior only where the interaction requires it. Read the relevant installed Next.js documentation before implementation, as required by this checkout's agent instructions.

Preserve the existing SEO configuration, canonical URLs, article/FAQ structured data, Markdown/MCP content parity, image alt text and captions, actual dates, attribution state, and index holds. Preserve responsive `next/image` behavior and avoid turning full article bodies into client components. Do not modify `src/components/ui/`, introduce blue/indigo styling, add a website database, or alter the Graph-only contact/demo intake contract. These are implementation constraints, not changes performed here.

Historical project context is available in [the Phase 1 website audit](./WEBSITE_QUALITY_AND_HUMAN_FIRST_PHASE_1_AUDIT_2026-09-28.md) and [the imagery handoff](./OCTOBER_2026_BLOG_IMAGES_STAGE_2_GROUP_4_FINAL_2026-09-30.md). The latter describes 23 original images across 11 posts and earlier local verification. Those earlier results are not asserted as current tests or proof of deployment in this report.

## Proposed review and implementation sequence

1. **Approve the first article and editorial rules.** Recommended pilot: Cloud API complete guide. Confirm the approved authorship/review treatment, handling of unresolved publication dates, and one primary next action. Unresolved facts remain pending.
2. **Prepare one complete article design for review.** Show desktop and mobile hero, early answer, compact contents, body typography, an explanatory module, a table, FAQ, CTA, author/review block, and related reading. A hero-only mockup is insufficient because the current problems continue throughout the page.
3. **Implement only the approved Cloud pilot locally.** Reuse the current cover initially. Introduce the responsibilities and delivery-state explanations only after their content is verified. Preserve original claims and source links; explicitly list any proposed content changes for review.
4. **Verify the complete pilot.** Inspect at 1440px and 390px and an intermediate width; test contents anchors, mobile menu, FAQ, table access, copy/share destinations, keyboard focus, reduced motion if used, and page overflow. Compare metadata, dates, captions, structured data, and Markdown/MCP output. Run appropriate lint/type/build checks and any required existing parity tests once code changes exist.
5. **Review the blog-index slice.** Correct URL filters, remove or activate inert cards, shorten the discovery path, and agree on the featured-content rule. Test entry from article tags, filtering, clearing, back/forward, initial server content, and empty states. This is a separate reviewable change even if delivered near the pilot.
6. **Adapt the accepted system to Busy.** Check that ERP workflows remain distinct and that related reading works with a small eligible set. Add workflow visuals where they answer a real question rather than repeating the Cloud diagram.
7. **Design and review pricing separately.** Bring rates and conditions closer to the entry, give mobile readers access to every table qualification, and validate any new timelines/calculations against current official sources. Resolve date/promotion questions with the owner.
8. **Inventory and roll out to remaining articles in small batches.** List each route, template, data source, special module, and parity consumer before changing it. Apply only the accepted patterns that fit that article. Keep deployment/publication as a later authorized phase with its own live acceptance.

This is a sequence proposed for review, not authorization to start implementation or a declaration that the remaining catalogue was audited in full.

## Decisions that remain with the owner

| Decision | Recommended starting point | Current status |
|---|---|---|
| First article | Cloud API complete guide | Proposed |
| Visual direction | Preserve Whats91 identity; improve reading structure and labelled explainers | Proposed |
| Authorship and review credit | Use only an approved, supportable attribution | Pending |
| Publication vs effective/review dates | Preserve their different meanings; do not create dates for sorting | Existing constraint; unresolved article facts pending |
| Promotion of undated/index-held content | Explicit editorial decision before featured placement or changed related rules | Pending |
| Primary article CTA | One available service/action matched to the article | Exact wording and destination to confirm during pilot review |
| Use of real UI/customer proof | Only approved assets with verified context and rights | No such new assets requested or created |
| Motion | Begin with a complete static design; add only if it improves explanation | Proposed |

## Evidence manifest

All files below are actual screenshots captured during this review. Full-page files can be tall; viewport files are better for inspecting type and controls. Filenames record page and state. No generated mockup is included in this evidence set.

### R1 — Customer engagement

- [01 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/01-meta-engagement-desktop-hero.jpg)
- [02 — Desktop lifecycle](./evidence/blog-reference-comparison-2026-10-02/02-meta-engagement-desktop-lifecycle.jpg)
- [03 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/03-meta-engagement-desktop-full.jpg)
- [04 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/04-meta-engagement-mobile-hero.jpg)
- [05 — Mobile diagram](./evidence/blog-reference-comparison-2026-10-02/05-meta-engagement-mobile-diagram.jpg)
- [41 — Complete mobile page](./evidence/blog-reference-comparison-2026-10-02/41-meta-engagement-mobile-full.jpg)

### R2 — AI customer service agents

- [06 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/06-meta-ai-desktop-hero.jpg)
- [07 — Desktop evidence pairing](./evidence/blog-reference-comparison-2026-10-02/07-meta-ai-desktop-evidence.jpg)
- [08 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/08-meta-ai-desktop-full.jpg)
- [09 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/09-meta-ai-mobile-hero.jpg)
- [10 — Mobile evidence](./evidence/blog-reference-comparison-2026-10-02/10-meta-ai-mobile-evidence.jpg)

### R3 — Agentic commerce

- [11 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/11-meta-commerce-desktop-hero.jpg)
- [13 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/13-meta-commerce-mobile-hero.jpg)
- [14 — Mobile statistic](./evidence/blog-reference-comparison-2026-10-02/14-meta-commerce-mobile-stat.jpg)
- [49 — Desktop quotation panel](./evidence/blog-reference-comparison-2026-10-02/49-meta-commerce-desktop-quote.jpg)
- [50 — Desktop late section](./evidence/blog-reference-comparison-2026-10-02/50-meta-commerce-desktop-late-section.jpg)
- [51 — Desktop end of article](./evidence/blog-reference-comparison-2026-10-02/51-meta-commerce-desktop-end.jpg)

### R4 — Remarketing

- [15 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/15-meta-remarketing-desktop-hero.jpg)
- [16 — Desktop journey graphic](./evidence/blog-reference-comparison-2026-10-02/16-meta-remarketing-desktop-journey.jpg)
- [17 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/17-meta-remarketing-desktop-full.jpg)
- [18 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/18-meta-remarketing-mobile-hero.jpg)
- [43 — Complete mobile page](./evidence/blog-reference-comparison-2026-10-02/43-meta-remarketing-mobile-full.jpg)

### W1 — Whats91 index and shared navigation

- [19 — Mobile index top](./evidence/blog-reference-comparison-2026-10-02/19-whats91-index-mobile-top.jpg)
- [20 — Desktop index top](./evidence/blog-reference-comparison-2026-10-02/20-whats91-index-desktop-top.jpg)
- [21 — Desktop article cards](./evidence/blog-reference-comparison-2026-10-02/21-whats91-index-desktop-cards.jpg)
- [22 — Complete desktop index](./evidence/blog-reference-comparison-2026-10-02/22-whats91-index-desktop-full.jpg)
- [28 — Mobile state after article-tag navigation](./evidence/blog-reference-comparison-2026-10-02/28-whats91-tag-mobile-state.jpg)
- [29 — Mobile filters and first article](./evidence/blog-reference-comparison-2026-10-02/29-whats91-index-mobile-filters.jpg)
- [44 — Complete mobile index](./evidence/blog-reference-comparison-2026-10-02/44-whats91-index-mobile-full.jpg)
- [48 — Open mobile menu](./evidence/blog-reference-comparison-2026-10-02/48-whats91-mobile-menu.jpg)

### W2 — Whats91 Cloud API

- [23 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/23-whats91-cloud-desktop-hero.jpg)
- [24 — Desktop operating model](./evidence/blog-reference-comparison-2026-10-02/24-whats91-cloud-desktop-model.jpg)
- [25 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/25-whats91-cloud-desktop-full.jpg)
- [26 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/26-whats91-cloud-mobile-hero.jpg)
- [27 — Mobile table region](./evidence/blog-reference-comparison-2026-10-02/27-whats91-cloud-mobile-table.jpg)
- [45 — Complete mobile page](./evidence/blog-reference-comparison-2026-10-02/45-whats91-cloud-mobile-full.jpg)

### W3 — Whats91 Busy Accounting

- [30 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/30-whats91-busy-desktop-hero.jpg)
- [31 — Desktop invoice workflow](./evidence/blog-reference-comparison-2026-10-02/31-whats91-busy-desktop-workflow.jpg)
- [32 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/32-whats91-busy-desktop-full.jpg)
- [33 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/33-whats91-busy-mobile-hero.jpg)
- [34 — Mobile workflow](./evidence/blog-reference-comparison-2026-10-02/34-whats91-busy-mobile-workflow.jpg)
- [46 — Complete mobile page](./evidence/blog-reference-comparison-2026-10-02/46-whats91-busy-mobile-full.jpg)

### W4 — Whats91 October pricing

- [35 — Desktop hero](./evidence/blog-reference-comparison-2026-10-02/35-whats91-pricing-desktop-hero.jpg)
- [36 — Complete desktop page](./evidence/blog-reference-comparison-2026-10-02/36-whats91-pricing-desktop-full.jpg)
- [37 — Mobile hero](./evidence/blog-reference-comparison-2026-10-02/37-whats91-pricing-mobile-hero.jpg)
- [38 — Mobile pricing table](./evidence/blog-reference-comparison-2026-10-02/38-whats91-pricing-mobile-table.jpg)
- [39 — Expanded mobile FAQ](./evidence/blog-reference-comparison-2026-10-02/39-whats91-pricing-mobile-faq.jpg)
- [47 — Complete mobile page](./evidence/blog-reference-comparison-2026-10-02/47-whats91-pricing-mobile-full.jpg)

## Completion record

The deliverables for this analysis are this Markdown report and 48 accepted screenshot files. Application source and published content were not edited. No image-generation job, build, deployment, push, form submission, or social-share submission was performed for this documentation-only review. Existing unrelated `output/` material was left in place.

Delivery checks: all 106 local file-link occurrences resolve; every screenshot is listed in the manifest; all 48 JPEG files decode and have the expected 1440px desktop or 390px mobile width. The evidence set is approximately 17.86 MiB. `git diff --check` reported no tracked-diff errors, and no tracked application changes were present. No application tests were run for this documentation-only change.

The proposed next phase remains one complete, reviewable Cloud guide pilot followed by separate index, ERP, pricing, and wider-catalogue decisions. Current observations and proposed acceptance criteria are kept separate so that approval can be based on a concrete scope.
