# Website Quality and Human-First Master Playbook

**Version:** 1.0  
**Prepared:** 28 September 2026  
**Language:** English  
**Applies to:** Public marketing websites for any product, service, organization, or industry  
**Tracks:** Improve an existing website / Build a new website  
**Purpose:** Give a coding agent one complete operating standard for planning, implementing, and verifying website quality in manageable phases.

## 1. Start here

Read this document completely before planning the target website. Apply technical quality, human-first content, factual accuracy, visual quality, accessibility, conversion behavior, and discoverability together throughout the work.

This document is self-contained. It does not require the conversations, original audits, or source project from which its lessons were developed. It defines reusable requirements; it is not evidence about the target business or permission to publish its website.

Use the owner's accompanying request to determine the authorized work:

| Owner request | What to do |
| --- | --- |
| Audit or review only | Inspect and report; create the requested report and plan, without changing website behavior or content. |
| Plan the work | Inspect the site or brief and produce the phased implementation plan, decisions, and acceptance criteria. |
| Implement a named phase | Complete preparation and that phase, including its relevant verification. |
| Build or improve the website through local completion | Inspect, create the project plan, and execute its authorized phases in sequence. Ask only for genuinely missing decisions or permissions. |
| Deploy or publish | Follow the target project's release authorization and process after checking the intended candidate and applicable release gates. |

If the file is supplied without a clear action request, inspect enough to identify the project and propose the appropriate track. Do not assume broad implementation or release permission from the attachment alone.

An authorized implementation request includes ordinary local edits and necessary verification within its scope. Do not ask for repeated approval for routine steps already authorized. Respect explicit per-batch approval requirements when the owner uses that workflow. Commit, push, deployment, DNS changes, search-engine submission, paid services, and external messages remain governed by the owner's actual authorization.

### 1.1 The result this playbook should produce

- A website that helps its intended readers understand the offering and complete the right next action.
- Accurate public statements supported by current sources and appropriate review.
- Consistent design with page structures suited to different reader tasks.
- Measured performance, accessible interactions, and reliable routes and forms.
- Coherent search, crawler, metadata, structured-data, and date behavior.
- One project-specific plan showing completed work, remaining work, dependencies, decisions, and evidence.
- Distinct local-completion, deployment, live-verification, and longer-term measurement states.

The target is useful, trustworthy content and a reliable website. AI-detector scores, artificial typos, forced slang, and claims of guaranteed ranking are not quality measures.

### 1.2 How to use the document

1. Complete the project brief in section 3.
2. Follow the common preparation in section 4.
3. Choose the existing-site track in section 5 or the new-site track in section 6.
4. Use sections 7–17 as the shared requirement catalogue.
5. Plan and execute batches with section 18.
6. Validate the final candidate with section 19.
7. Perform authorized release and live checks with section 20.
8. Maintain the result with section 21.

Use the templates in section 22 directly. Section 23 explains how to hand this file to a coding agent. Recheck changing platform guidance using section 24.

## 2. Authority, scope, and evidence

### 2.1 Establish the target project's authority

Read applicable repository instructions, the active requirements, current owner decisions, and relevant source before editing. Record which documents control implementation, product facts, commercial facts, and publication.

Use the owner's current instructions within applicable constraints. Generic guidance in this file does not replace the target project's stack, brand, commercial decisions, legal requirements, or release process. Historical audits identify possible issues; verify that each issue still exists before making it a task.

Distinguish requirements from observed behavior. An implementation can contain a bug; an old requirement can be superseded. When they disagree on a material fact, record the conflict and resolve the affected work using current evidence or an owner decision. Continue independent work that is not affected.

Do not carry product names, route counts, claim IDs, test totals, pricing, exclusions, or deployment commands from another website into this one. A personal-identity policy, footer address preference, or trial decision from one business is not a universal website rule.

### 2.2 Keep the project boundary explicit

Identify the exact marketing website repository and canonical origin. List public integrations and external destinations only where needed to test the website's user journey. Editing a marketing website does not authorize changing a connected product, API, customer portal, database, or shared infrastructure.

Check outbound links without expanding into authenticated product testing unless that work is authorized. Use human-readable business terms in public copy; keep private system names, decision IDs, internal paths, and implementation commentary out of visitor-facing content.

### 2.3 Record evidence at its actual level

| Evidence level | What it establishes | What it does not establish |
| --- | --- | --- |
| Source inspection | What the checked revision contains | What production serves |
| Automated test | Behavior covered by the actual assertions | Complete usability, truth, accessibility, or human approval |
| Production-mode local build | Generated output for recorded configuration | Deployment or working external delivery |
| Browser observation | Behavior on specified routes, states, viewports, and browsers | Untested devices or every user journey |
| Approved product/business fact | The exact fact, scope, conditions, and date approved | Other capabilities or broader guarantees |
| Human review | Review of specified content and evidence | Approval of later edits |
| Live observation | Public behavior observed at a stated time | Sustained reliability or field performance |
| Webmaster or field data | Measured indexing, traffic, crawl, or user performance | Guaranteed future rankings or conversions |

An agent's completion report is a lead to evidence. Verify the underlying changes and results before using it to close a gate.

## 3. Project brief and decisions

Keep this brief in the target project's existing plan or equivalent record. Reuse current sources; do not create a second claims register or competing blueprint.

| Field | Required detail |
| --- | --- |
| Website and scope | Name, canonical origin, repository/CMS, environments, in-scope surfaces, exclusions |
| Track and authority | Existing or new site; audit, plan, named batch, or full local implementation; release permissions |
| Business and offering | What is sold or explained; current availability; prerequisites; limitations; source of truth |
| Audiences | Buyers, users, evaluators, support readers, regions, languages, accessibility needs |
| Primary journeys | What each audience should understand or do; actual CTA destination and outcome |
| Brand and content | Approved naming, spelling convention, voice, design assets, protected wording |
| Commercial facts | Plans, currencies, taxes, billing periods, quotas, trials, refunds, add-ons, purchase path |
| Trust facts | Privacy, security, retention, providers, locations, legal text, evidence and accountable owners |
| Public identity | Organizational or individual authorship; permission for any names, photos, biographies, profiles |
| Real evidence | Approved captures, demos, documents, research, measurements, genuine customer/reader input |
| Technical baseline | Framework/runtime, content sources, hosting, cache layers, integrations, commands |
| Quality targets | Supported browsers/devices, accessibility target, performance budgets, verification scope |
| External operations | Search-console access, analytics policy, delivery recipient, monitoring and release owners |

Use `PENDING` for missing factual inputs. For each, record its effect, owner, affected phase, and safe interim treatment. Missing facts should block the dependent claim or behavior, not every unrelated task.

Separate three questions: Is the fact known? Is it approved for public use? Is the corresponding behavior implemented and verified? Approval of a policy does not prove its implementation.

A blank decision template, an unticked checkbox, or a copied agent suggestion is not approval. A clear owner approval already given in context should be recorded and used without asking again. If options conflict, request one concise clarification for the affected decision.

## 4. Common preparation: complete before broad changes

### Step 1 — Inspect the workspace and record a baseline

- Locate the actual website root, repository instructions, active plan, package/runtime configuration, content sources, tests, build modes, and release instructions.
- Record the branch/revision and staged, modified, and untracked paths, or the equivalent CMS revision.
- Identify inherited work and its ownership. Preserve it. Use targeted hashes or a baseline diff where concurrent work or a large dirty tree makes them useful.
- Identify generated files and which command owns them. Record any build that rewrites tracked sitemap, robots, feed, or asset files.
- Inspect relevant checks before running them. Avoid production submissions, bulk crawling, destructive cleanup, or writing test data as an accidental side effect.
- Establish a production-like local preview and its configuration. Keep sensitive environment values out of evidence.

### Step 2 — Build the complete route and surface inventory

For an existing site, reconcile source/CMS routes, generated routes, sitemap URLs, navigation links, and the accessible live site. For a new site, create the proposed inventory and mark it as planned.

Include routes omitted from the sitemap, intentional noindex pages, redirects, dynamic families, documents/downloads, feeds, error states, and internal/test routes. Inventory shared header/footer, navigation, forms, messages, image captions/alt text, social previews, structured data, and localized content.

For each route record its canonical source, audience task, page family, shared components, indexing intent, claims risk, CTA, and status. Map material claims to every place they appear, including metadata and shared copy.

Define count denominators: content records, public routes, indexable URLs, build artifacts, and tested pages can differ. Explain the differences; never copy a historical count into a current assertion.

### Step 3 — Establish the combined baseline

Inspect technical and editorial quality together. Assess every applicable requirement in sections 7–17 using source, built output, browser observation, and evidence review as appropriate.

For a modest marketing site, inspect every public route visually at the agreed widths. For a large or generated site, enumerate all routes, run feasible whole-inventory checks, and explicitly define representative visual coverage by template, content length, locale, state, and risk. Do not describe sampled coverage as exhaustive.

For new sites, classify unmet requirements as implementation tasks rather than defects. For existing sites, mark sound areas `KEEP` and record their regression coverage.

### Step 4 — Produce one actionable project plan

Each finding or task needs a stable ID, concrete evidence or requirement, impact, priority, affected surfaces, dependency, acceptance condition, and assigned batch. Identify canonical shared fixes before scheduling page edits.

Maintain a coverage row for each catalogue area Q1–Q11. Mark it `PASS`, `NEEDS WORK`, `PENDING EVIDENCE`, or `NOT APPLICABLE`, with a reason and evidence reference. A relevant area without a finding still needs a recorded review; an irrelevant feature does not need to be built simply to satisfy the catalogue.

Before finalizing the plan, test it against the full inventory: every route has a disposition, every required finding has a batch, every batch has verification, and every missing decision names the work it actually blocks. This prevents content, metadata, or shared components from falling between otherwise successful batches.

Use these priority definitions:

| Priority | Meaning | Treatment |
| --- | --- | --- |
| P0 | Active exposure, serious misleading behavior, broad unavailability, or an equivalent urgent failure | Address immediately within authority; escalate the specific blocked action. |
| P1 | Required correctness, primary conversion, accessibility, discoverability, claim, or agreed-quality defect | Close before acceptance of the affected release scope. |
| P2 | Valuable improvement with a usable, truthful baseline | Schedule by impact and dependency; explicitly decide whether required for this release. |
| P3 | Optional growth experiment or cosmetic refinement | Defer unless justified by reader need or measured evidence. |

Severity, confidence, business value, and release-blocking status are separate fields. Missing optional media or insufficient field traffic is not automatically a launch blocker. An unsupported public promise can be one.

## 5. Track A: improve an existing website

Follow this order, adapting batch sizes to the inventory. Do not turn the catalogue into a mandatory rewrite of every page.

| Phase | Work | Exit condition |
| --- | --- | --- |
| A0 — Baseline and inventory | Complete section 4; reconcile source, local build, and live differences. | Coverage, inherited work, current behavior, and evidence limitations are explicit. |
| A1 — Integrated audit and roadmap | Inspect all quality dimensions; map dependencies, owner inputs, and already-correct areas. | Every required finding belongs to a reviewable batch with measurable acceptance. |
| A2 — Shared foundations | Resolve shared defects: rendering/indexing policy, content ownership, date/review model, reusable components, payload ownership, conversion contracts, security-header responsibility as applicable. | Foundational contracts are implemented and verified for dependent work. |
| A3 — Representative pilot | Select a high-value page from an affected family. Refine its copy, proof, structure, responsive design, metadata, and CTA together. | Pilot passes relevant truth, visual, functional, accessibility, and performance checks. |
| A4 — Page-family batches | Expand the accepted pattern across affected commercial, product, audience, trust, guide, and utility pages. Preserve differences in reader tasks. | Each batch passes section 18, including cross-page claim and metadata checks. |
| A5 — Shared consistency and residual sweep | Reconcile synonyms, claims, links, media, dates, schema, empty hubs, and generated output across the entire inventory. | No unresolved required inconsistency remains; optional work is explicitly classified. |
| A6 — Final local acceptance | Audit the current complete candidate under section 19. | Local verdict and evidence are recorded; any correction is rechecked against its impact. |
| A7 — Authorized release and live acceptance | Use section 20 when the owner authorizes release. | Deployed candidate and public behavior are verified separately. |
| A8 — Measurement and maintenance | Use section 21. | Operational owners and review triggers are assigned. |

Move a serious broken conversion or exposure fix ahead of the pilot when required. Combine related work into coherent batches. If one screenshot approval is missing, continue a different ready batch. Do not release repeatedly merely because one local batch finished unless the owner wants incremental releases.

Preserve useful existing URLs and earned search equity. Changes to slugs, canonical ownership, redirects, indexed content, or internal-link structure require an explicit migration plan proportional to their impact. Do not remove a page solely because a similarity score is high.

## 6. Track B: build a new website

Establish facts, quality contracts, and content structure before producing all the pages. These steps prevent the need to retrofit an editorial and performance system later.

| Phase | Work | Exit condition |
| --- | --- | --- |
| B0 — Discovery and facts | Complete the project brief, reader journeys, product/commercial facts, voice, evidence inventory, and missing inputs. | The site can be described accurately without invented claims. |
| B1 — Site architecture and contracts | Plan routes, search intent, contextual links, CTA journeys, content model, authorship, dates, indexing, schema, accessibility, budgets, and supported devices. | An implementation-ready blueprint connects each page to a reader task and verification criteria. |
| B2 — Shared foundation | Build the shell, tokens, accessible primitives, content and metadata pipeline, environment controls, error pages, and minimum validation. | Representative content renders with the intended technical and editorial contracts. |
| B3 — Complete vertical slice | Build one commercial page plus its real authorized next action and one content-heavy page. Include copy, media, mobile, metadata, and error states. | The complete pattern works before expansion. A stubbed integration is clearly identified. |
| B4 — Controlled page expansion | Build small page-family batches from verified content. Resolve trust and commercial facts before publishing dependent claims. | Each page has distinct value and passes its phase checks. |
| B5 — Whole-site consistency | Review all shared facts, journeys, dates, links, schema, empty hubs, and asset behavior. | Required features and content are complete for the agreed scope. |
| B6 — Final local acceptance | Run section 19 against the release candidate. | Evidence supports the local verdict. |
| B7 — Authorized launch and live acceptance | Follow section 20. | Public behavior matches the intended release. |
| B8 — Measurement and maintenance | Follow section 21. | Search, performance, conversion, and content maintenance have owners. |

Use the project's chosen stack. Do not impose a framework or vendor from the source project. Add only page types that serve this business. A new website does not automatically need a blog, glossary, country pages, comparison pages, testimonials, or individual author profiles.

## 7. Q1 — Human-first content and reader usefulness

For each page, answer: Who is reading? Why are they here? What must they understand or decide? What evidence makes the explanation credible? What is the honest next action?

Classify blocks as `KEEP`, `REFINE`, `REPLACE`, `REMOVE`, `PENDING`, or `PROTECTED`. Provide a reason beyond “sounds AI-generated.” Preserve strong content.

Write with these rules:

- Answer the main question early. Use concrete descriptions of tasks, behavior, conditions, and limitations.
- Define unfamiliar terms when needed. Use audience language without keyword stuffing.
- Put material qualifications beside the claim. Do not rely on a disclaimer elsewhere to repair a misleading headline.
- Use natural sentence and paragraph length for comprehension. Avoid arbitrary punctuation, sentence-length, or readability-score targets.
- Remove empty slogans, repetitive introductions, unsupported superlatives, and repeated defensive paragraphs where they add no information.
- Keep necessary shared terminology and policy wording consistent. Vary page structure when the reader's task differs.
- Use examples with a clear status: actual and permissioned, hypothetical, or illustrative. A hypothetical example is not customer evidence.
- Explain a limitation or trade-off when it helps a decision. Do not fill pages with internal governance commentary or lists of unknowns.
- Proofread spelling, grammar, units, numbers, terminology, and locale conventions. Do not add deliberate errors to simulate a person.
- Do not require first-person stories, founder photos, or a personal byline to make a website feel human.

Distinct content should add a useful explanation, decision aid, verified example, operating detail, limitation, or well-supported synthesis. A longer page is not automatically more useful. Neither word count nor a fixed percentage of unique wording is a universal quality threshold.

Google's people-first guidance supports reader value, sourcing, and clear creation context; it does not prescribe a detector score or universal word count. [People-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### 7.1 Page-specific application

| Page family | Required focus |
| --- | --- |
| Home and overview | What the offering is, who it serves, relevant differentiation, appropriate proof, and a clear next step. |
| Product, feature, service, integration | Actual behavior, setup/dependencies, inputs/outputs, supported scope, limitations, and useful evidence. |
| Role, use case, industry, location | A distinct audience problem and decision context. Avoid noun-swapped duplicates or implied market presence. |
| Pricing, trial, purchase | Exact commercial conditions and the implemented buying path; readable calculations and caveats. |
| Guide, blog, glossary | A defined question, accurate answer, useful contribution, citations where needed, and truthful dates. |
| Comparison or alternatives | Dated primary evidence, comparable scope, fair distinctions, and explicit uncertainty. |
| Trust, legal, privacy, security | Current approved facts, precise boundaries, clear document status, and the project's required review. |
| About and contact | Verified organizational identity, real channels, accurate hours or response expectations, and approved public attribution. |
| Forms and utility states | Exact action, necessary information, errors, recovery, privacy context, and truthful success wording. |
| Index or hub | Useful routing or standalone value. Do not populate empty hubs with filler merely for indexing. |

## 8. Q2 — Claims, evidence, and cross-page consistency

Maintain a lightweight claims register or extend the existing one. Cover visible copy, FAQs, labels, captions, alt text, metadata, schema, downloads, and shared UI.

For each material claim record its exact meaning, source, evidence date, scope/conditions, public-use decision, affected pages, and recheck trigger. Useful statuses are `VERIFIED`, `QUALIFIED`, `PENDING`, `REJECTED`, and `EXPIRED`.

### 8.1 Reconcile the distinctions that cause repeat work

- Capability versus default configuration versus plan inclusion versus availability.
- A mechanism being undocumented versus the mechanism not existing.
- Automated behavior versus actions an authorized person can perform through the product.
- A specific record or collection path versus every place information might appear.
- Observation versus inference; missing data versus zero; freshness versus current state.
- Request received versus scheduled, approved, delivered, paid, or completed.
- Notice acknowledgement versus consent, agreement, or another legally meaningful action.
- Organization policy versus a universal rule for all users.
- Current shipped behavior versus a proposed feature or legacy implementation.

For example, absence of a dedicated text-collection field does not establish that visible text can never appear in an image or document. A chart showing no records does not prove no activity occurred. A quote-request button does not establish a self-service purchase path.

Do not transfer the source project's specific answers to the target website. Verify its own contracts and approved facts.

### 8.2 Claim review procedure

1. Extract factual statements and classify product, commercial, legal/policy, security, operational, comparative, and outcome claims.
2. Open and inspect their actual sources. A working citation link alone does not establish support.
3. Record whether each statement is an observed fact, approved owner fact, inference, estimate, principle, or recommendation.
4. Search every occurrence and equivalent phrasing across public sources and built output before planning the edit.
5. Propose the smallest accurate wording. Qualify, omit, or hold an unsupported statement; do not replace it with another unsupported promise.
6. Update the source and every approved dependent surface together.
7. Recheck contradictions, metadata, dates, evidence mappings, and review state after the change.

Search terms such as “always,” “never,” “all,” “only,” “cannot,” “guaranteed,” “secure,” “compliant,” “certified,” “best,” and “real-time” are review leads. Read the context; do not ban words mechanically or miss equivalent sentences without those words.

A proof source that contradicts a public claim is a finding even if the asset itself will remain unpublished. Report and resolve the contradiction; do not ignore inconvenient evidence.

### 8.3 Sensitive commercial and trust facts

Verify prices, currencies, billing units, tax applicability, renewals, trials, quotas, eligibility, cancellation, add-ons, supported integrations, business identity, contact hours, retention, residency, certifications, accessibility claims, and performance guarantees against their specific sources.

Owner confirmation of one category does not approve another. For example, a product-availability statement does not establish a certification or trial term. Apply the target project's review requirements; do not invent a universal counsel-signoff requirement.

## 9. Q3 — Authorship, review provenance, and date semantics

Implement or confirm this model before editing dates across page batches. Keep the mechanism proportional: a small site may need a simple reviewed register; a complex CMS may need revision-aware validation.

### 9.1 Authorship and review

- Organizational authorship is a valid choice. Publish individual names, photographs, biographies, profiles, or Person markup only when factual and approved.
- Keep an accountable internal reviewer/approver even when public identity is organizational.
- Distinguish drafted, technically verified, awaiting human review, reviewed, changed after review, and explicitly pending states.
- Tie review to a revision, content fingerprint, or another auditable snapshot. Define what the fingerprint covers and how metadata-only changes are treated.
- An automated test run or data migration does not create a human review event.
- Preserve historical review events. Record later changes and approvals separately; do not silently replace the approved fingerprint to make an edited page appear reviewed.
- A minor already-authorized correction may use an explicit review addendum with the final content scope. Keep an honest link to the original approval.
- Record pending facts separately from a page's editorial review state. A reviewed page may accurately state a limitation; it cannot publish an unsupported claim as verified.

### 9.2 Date contract

| Date | Meaning | Typical consumers |
| --- | --- | --- |
| First published | Verified first public availability | Article publication metadata, feed item publication date, visible publication date when useful |
| Materially updated | A meaningful change to the public page | Visible update date, modification metadata, sitemap lastmod where appropriate |
| Human reviewed | Review of the specified version by the designated human | Review record; optional visible review date |
| Evidence checked | When the underlying fact or source was verified | Claims register and evidence maintenance |
| Media captured | When a real capture was taken | Asset provenance and factual caption |

Define mappings explicitly for visible labels, JSON-LD, Open Graph, sitemap, and the chosen feed format. Publication, modification, and review dates must not be substituted for one another. Google recommends dates that represent actual publication or updates and agree with the page. [Publication-date guidance](https://developers.google.com/search/docs/appearance/publication-dates).

If a date is unknown, keep it unknown internally and omit the public field where permitted. If an output requires a date, resolve its contract or exclude the item until supported. Do not insert today's date, a deployment timestamp, or a review date as guessed publication history.

A public media addition or substantive explanation change should be evaluated for the modification date. An internal comment, formatting change, or tooling migration should not automatically refresh it. Date migrations must preserve review truth and avoid self-referential fingerprint changes.

## 10. Q4 — Information architecture, search intent, and metadata

### 10.1 Reader and route architecture

- Assign each page one primary reader task and a distinguishable role in the site.
- Map related commercial, explanatory, and trust pages before creating more URLs.
- Give shared definitions and mechanisms a clear source page; summarize and link from other pages where useful.
- Detect orphan routes, weak contextual inbound links, duplicate intents, and confusing hub navigation.
- Prefer meaningful HTML links with descriptive anchors. Check fragment targets, breadcrumbs, downloads, and outbound destinations.
- Preserve useful deep links and redirects when changing structure. Avoid redirecting unrelated missing pages to the homepage.

### 10.2 Technical search checks

Verify these on the correct build and, later, the public deployment:

- Intended success, redirect, not-found, and access-control HTTP statuses, including arbitrary unknown routes.
- Canonical origin and consistent URL conventions; sensible handling of query parameters, duplicates, pagination, and dynamic routes.
- Accessible main content and ordinary links in rendered HTML. Compare initial HTML and hydrated output where JavaScript changes meaningful content.
- Descriptive page titles, relevant descriptions, one clear main heading, and meaningful heading hierarchy. Treat exact character counts as diagnostics rather than hard ranking rules.
- Agreement between indexing intent, HTML robots, HTTP X-Robots-Tag, canonical, sitemap, and rendered content.
- Valid sitemap containing intended canonical, indexable URLs; declared sitemap location; meaningful lastmod values; no accidental staging, internal, redirect, or error URLs.
- Deliberate handling of empty/thin hubs: improve, retain for users with an appropriate indexing policy, consolidate, or remove through an approved migration.
- Accurate page-specific social previews, image URLs, brand identity, and document language.

A robots disallow is not an access-control mechanism and can prevent a crawler from seeing noindex. A sitemap helps discovery; it does not guarantee indexing. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### 10.3 Structured data and entities

Select only types that fit actual page content and current provider rules. Keep organization identity, entity IDs, breadcrumbs, products/services, offers, articles, and authors consistent. Omit unsupported ratings, prices, certifications, people, and relationships.

Validate both syntax and meaning. A JSON parser cannot tell whether a claim is true. Schema.org validity and search-engine rich-result eligibility are different checks; do not assume a software site qualifies for FAQ or other special displays. Markup should reflect visible content, and passing a validator does not guarantee a rich result. [Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### 10.4 International readiness

Record the intended markets, language conventions, currencies, tax wording, time zones, units, and support constraints. Add reciprocal locale alternates only for real equivalent localized pages; use x-default where appropriate. Avoid forced redirects that prevent users or crawlers from accessing a locale.

Prepare content structure for translation, text expansion, pluralization, and right-to-left layouts where relevant. Publish translations only with suitable language and factual review. Do not create location pages that imply an office, service, or legal offering that does not exist.

## 11. Q5 — AI-search discoverability and crawler policy

Create a dated crawler-purpose matrix from current official provider documentation: traditional search, AI search/discovery, user-requested retrieval, model training, and other uses. Do not copy an old user-agent list without rechecking its purpose.

Record the owner's desired policy. Audit robots rules, HTTP headers, authentication, CDN/WAF challenges, rate limits, and essential asset access together. A successful request with a spoofed user-agent is a diagnostic, not proof that a real provider crawled or indexed the site. Use provider verification methods and logs when available.

Content should identify the business clearly, answer questions directly, retain material qualifications nearby, use understandable headings/tables, and connect claims to useful evidence. Keep important explanations in accessible text alongside media.

Google states that its AI search features use the normal SEO foundation and require no special AI text file or special schema. Treat optional assistant-oriented files or endpoints as maintainable experiments, never prerequisites or ranking guarantees. Avoid hidden crawler-only claims, prompt-injection text, and fabricated citations. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

Search access and training preferences are separate decisions where providers support that distinction. Reverify controls for each provider; do not assume one robots token governs every product.

Measure discovery, indexing, referrals, and observed citations separately. Absence of a referral does not prove absence from AI answers. A one-off answer or brand search does not prove durable ranking.

## 12. Q6 — Visual consistency, responsive behavior, and accessibility

### 12.1 Design consistency

Map actual page families and shared components. Compare header/footer, navigation, typography, spacing, color, borders, content widths, buttons, tables, diagrams, and interaction states. Identify old-generation pages left behind by earlier redesigns.

Use shared tokens and primitives while allowing different page arguments. A policy document can remain visually quieter than a product page. Do not add animation, decorative graphs, or a complex hero merely to make every page look equally elaborate.

Review every affected section after copy changes. A long explanation placed in a short status badge can collapse columns even if the page has no document-level overflow. Fix the component contract or responsive layout when appropriate; do not distort facts to fit an unsuitable container.

### 12.2 Responsive evidence

Default review widths for a typical marketing site: **1440, 1024, 768, 375, and 320 CSS pixels**. Add content breakpoints or wider screens based on the actual design. Record viewport dimensions, browser, build, route, and state.

Check actual viewport behavior: readable text, navigation, long words, wrapping, clipped labels, overlapping elements, tables, fixed headers, touch controls, image loading, and content order. Inspect screenshots rather than relying only on geometry heuristics. Exclude hidden/animated states from overlap rules only after confirming why they are hidden.

Avoid page-level horizontal overflow. Intentionally wide data or proof media may use a labelled, keyboard-accessible inner scroller or accessible zoom/viewer when the interaction is justified. Provide a visible hint and nearby text explanation. Do not hide required evidence from mobile users simply because it is wide.

### 12.3 Accessibility

Use the project's agreed standard; WCAG 2.2 AA is a useful default target. Check semantic landmarks and headings, names/labels, contrast, focus visibility, keyboard operation, focus order and restoration, skip navigation, errors/status announcements, touch targets, and reading order.

Test zoom, reflow, text spacing, reduced motion, and high-contrast/forced-color behavior where applicable. Include real screen-reader and browser/device checks required by the project; distinguish emulation from physical-device evidence. Automated scans cover only part of accessibility. Record untested combinations and do not publish conformance claims beyond the evidence. [WCAG 2.2 reference](https://www.w3.org/WAI/WCAG22/quickref/).

Choose browser coverage from the audience and support policy. For a worldwide public site, plan representative Chromium, Firefox, and Safari journeys and relevant iOS/Android checks. Record unavailable environments as untested and decide their release impact from the agreed support requirement; a Chromium-only run must not be reported as cross-browser verification.

An accessibility statement must describe implemented features and the actual testing process. Verify claims such as “tested on every build” against the command pipeline that really runs the check.

## 13. Q7 — Functional journeys and conversion integrity

Create an interaction inventory and exercise each unique behavior, including its failure and recovery paths. Relevant examples include menus, accordions, tabs, pricing controls, filters, language/currency selectors, whole-card links, downloads, search, cookie preferences, media viewers, and forms.

Test direct navigation, client navigation, refresh, back/forward, keyboard actions, mobile menus, and no-JavaScript behavior appropriate to the site. Detect invisible overlays that intercept clicks. A styled button must perform its promised action or clearly expose its unavailable state.

### 13.1 Forms and external journeys

Trace the entire intended flow: CTA → form → validation → request acceptance → downstream processing → actual delivery or completion.

- Collect only approved fields and show the relevant privacy information.
- Validate on the server as well as the client where submission exists; handle field errors, timeouts, network failure, rate limits, and unavailable dependencies honestly.
- Prevent accidental duplicate submission and keep recoverable input where safe.
- Distinguish acceptance from final delivery in success text.
- Test initialization failures, such as an unavailable country list, as well as submission failures.
- Protect against appropriate abuse risks without making the form inaccessible.
- Keep secrets and external credentials server-side; avoid personal data in URLs, browser errors, logs, or test artifacts.
- Use mocks or a sandbox for routine failure tests. They establish application behavior, not production delivery.
- Run a real submission only within authorization, using an approved recipient and safe test data. Verify receipt and identify cleanup or retention needs.

If an integration is outside scope or unavailable, provide an honest working alternative approved for the site. Do not claim a booking, purchase, or response-time promise merely because a frontend control exists.

## 14. Q8 — Performance and delivery

### 14.1 Establish repeatable measurements

Record the revision/build, route, device profile, browser/tool version, network/CPU settings, cache state, and repeated-run method. Include the homepage, critical conversion page, and representative heavier page families.

Measure transferred CSS/JavaScript, unused or wrongly shared payload, image/font loading, render-blocking work, hydration/long tasks, server response, cache behavior, and layout stability. Compare equivalent conditions before and after changes.

Core Web Vitals good thresholds are **LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1**, assessed at the 75th percentile of visits and segmented by device type. Field measurements and lab diagnostics answer different questions. Lighthouse's Total Blocking Time is not field INP. A warm-cache instant load or passing bundle budget does not establish real-user performance. [Web Vitals guidance](https://web.dev/articles/vitals).

### 14.2 Optimization order

1. Remove unnecessary resources and work before adding infrastructure.
2. Scope route/family styles and scripts to their consumers; keep only truly shared primitives global.
3. Reduce unnecessary client components, hydration, dependencies, third-party scripts, and duplicated localization data.
4. Deliver responsive media with explicit dimensions; prioritize the actual LCP resource and lazy-load appropriate below-fold assets.
5. Use an appropriate font strategy, compression, cache policy, and static/server rendering model.
6. Verify cold direct loads and navigation between families after asset splitting. Check for missing styles, stale chunks, and cumulative navigation payload.
7. Re-measure the changed routes and shared consumers.

Set project-specific budgets by page family, including what is measured and compressed how. Reuse stricter justified existing budgets. Do not copy another site's numeric bundle budget as a universal rule or raise it merely to pass.

If field data is unavailable or too sparse, report it as unavailable and use reproducible lab evidence for local acceptance. Assign a field follow-up; do not claim a field pass or unnecessarily stop all development while waiting for traffic.

## 15. Q9 — Security, privacy, and reliability of the public site

This catalogue is a website quality review, not a substitute for an authorized penetration test. Inspect the relevant configuration, dependency state, requests, and responses proportionately.

- Check HTTPS, redirects, mixed content, cookie/storage behavior, public environment exposure, accidental source/evidence publication, and internal/debug routes.
- Internal routes should be excluded or actually protected as intended. Robots directives do not protect private information.
- Inspect headers from the application and every serving layer. Assign ownership and eliminate conflicting effective policies.
- Review CSP, framing policy, MIME sniffing protection, referrer behavior, and other relevant headers against actual integrations. Test user journeys after tightening them.
- Scope HSTS deliberately to the intended host policy. Do not add includeSubDomains or preload without establishing the affected domain scope, HTTPS readiness, and owner authority.
- Check error handling and dependency advisories for actual applicability; avoid unrelated upgrades during a narrow content batch.
- Inventory analytics, cookies, storage, embeds, and external transfers. Public statements must match actual behavior and applicable decisions.
- Examine stale cache behavior, invalidation, missing assets, errors, and recoverability. Do not disable security controls simply to make a local preview work.

Use current guidance and the site's operational context when selecting policies. [OWASP HTTP header guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).

Configuration observed locally does not prove the edge response. A duplicate-header source is an inference until the active serving configuration or equivalent evidence confirms it.

## 16. Q10 — Real product evidence, images, and media

Use real product media where it answers a reader's question and approved assets exist. Absence of a screenshot is not permission to manufacture product proof.

### 16.1 Intake and publication record

Record source filename, capture date, environment/context, owner permission, dimensions, file size, content hash, visible subject, proposed page, factual caption, alt text, privacy review, transformation, and replacement trigger.

Owner-controlled test/demo data can still display names, messages, account details, URLs, device identifiers, or third-party information. Permission to inspect a capture and permission to publish it are distinct. Examine embedded thumbnails and all intended derivatives at sufficient resolution.

Preserve originals in an appropriate non-public location. Use predictable names for approved derivatives. Inspect metadata and remove unnecessary identifying metadata. Verify any approved redaction in original downloadable and optimized outputs; a blur or a CSS overlay is not automatically safe redaction.

### 16.2 Truthful presentation

- A screenshot establishes the visible state at capture time; it does not establish every plan, user, environment, or default.
- Crops must preserve the context necessary to understand the evidence, including material legends, missing-data indicators, and relevant conditions.
- Do not alter values, statuses, or labels to make the product appear better.
- Do not call an illustration, generated UI, reconstructed chart, or mockup a real product screenshot.
- Describe demo/test context accurately. Do not imply that a capture is customer proof.
- Use factual captions and useful alt text. Do not encode private identity or unsupported SEO claims in alt text.

### 16.3 Responsive delivery and expansion

Start with one useful pilot and verify privacy, meaning, legibility, accessibility, and payload. Measure readable display size on phones; a full desktop screenshot shrunk into a narrow card can be technically responsive and still unreadable.

Use a truthful crop, an accessible inner scroller, or a verified accessible enlargement pattern when necessary. Provide a textual explanation so understanding does not depend on reading every image pixel. Reserve dimensions and apply sensible loading behavior.

Expand only to distinct proof points that help the chosen pages. Document which supplied images remain unpublished and why. Test captions and image changes together with dates, provenance, metadata, and layout.

## 17. Q11 — Genuine reader input and maintainable growth

Use real sales, support, demo, documentation, or reader questions when available. Store only authorized, minimized, anonymized summaries with source type, date range, audience, affected page, evidence owner, and resolution status.

Distinguish repeated confusion from one anecdote. Editorially proposed questions are allowed when useful, but label them internally as proposed; do not call them actual customer questions or survey evidence.

When no genuine input exists, defer the reader-feedback work explicitly. It does not require invented records, testimonials, personal profiles, or filler articles. Build a small intake process only if it is useful to the project.

Publish new content, comparisons, templates, localization, and profiles only when there is reader value, supporting material, and maintenance capacity. Do not treat a target number of articles or backlinks as proof of quality.

## 18. The combined batch workflow

Each implementation batch is one coherent change with a defined regression boundary. Group related pages or shared behavior; do not divide work solely into “all design now, all content later.”

1. **Confirm scope and baseline.** Identify task IDs, affected routes, protected content, inherited work, source authority, and missing inputs.
2. **Resolve shared meaning first.** Map equivalent claims and dependent consumers before editing. Record any approved exact wording or behavior.
3. **Prepare the complete change.** Include public copy, layout, metadata, schema, related links, media, dates, and review implications affected by the batch.
4. **Implement at the canonical source.** Avoid independent copies of the same fact and direct edits to generated artifacts unless that is the project's contract.
5. **Verify proportionately.** Run relevant checks, build when generated output changes, and inspect the current production-like preview. Rebuild after edits before trusting a production preview.
6. **Inspect rendered behavior.** Check visible DOM, mobile layout, relevant interactions, and accessibility. HTML or hydration payload string counts are not counts of visible elements.
7. **Sweep the whole claim or component family.** Search exact old wording and equivalent meanings. Inspect source, relevant generated payload, metadata, and public output. Separate current copy from correctly dated historical records.
8. **Review the diff and status.** Explain unexpected changes and generated-file churn. Never restore a generated file to HEAD if that would erase an inherited local change; use the recorded baseline and ownership.
9. **Update the project plan and evidence.** Record tests, manual coverage, facts approved, changed review states, pending decisions, and the next ready batch.
10. **Continue within authorization.** Proceed through authorized phases. If approval is required for the next boundary, present a concrete reviewable result and the smallest decision needed.

Create meaningful regression tests for changed behavior and consequential claims. Avoid brittle tests that pin every sentence, historical fingerprint, or old test count without a clear contract. Do not weaken an acceptance requirement to make a test pass.

If a content change exposes a layout defect within the authorized implementation scope, fix and verify the layout coherently. If the owner explicitly restricted the scope to text, report the defect and the smallest necessary scope extension. A green automated suite does not justify shipping visibly overlapping text.

Keep documentation proportional. Reuse one canonical plan and existing registers. A small task does not require a new packet, a new approval ID, and a new validator. More complex or sensitive batches may need a dedicated review packet.

## 19. Final local acceptance and completion verdict

The final audit evaluates the whole agreed candidate. It should challenge implementation assumptions, even when the same agent conducts it. All tests passing is evidence, not the verdict by itself.

### 19.1 Required acceptance procedure

1. Identify the candidate revision or exact working-tree baseline and authorized scope.
2. Reconcile the route inventory, plan, claims register, accepted decisions, date/review state, and required findings.
3. Run applicable full-project checks from a fresh, correctly configured production build. Include indexing-enabled and private-preview modes if the project supports both; label them clearly.
4. Crawl intended public routes and verify statuses, metadata, canonical/indexing behavior, sitemap, schema, links, media, and unknown-route handling.
5. Execute the agreed route/viewport matrix and manual visual inspections, plus supported browser/device and accessibility checks.
6. Exercise every critical journey and unique interaction. Identify mocked, sandboxed, and real external outcomes separately.
7. Perform a semantic site-wide sweep for unsupported claims, contradictions, fabricated proof/identity, stale facts, incorrect dates, leaked internal details, and duplicated intent.
8. Measure performance against the baseline and budgets; state field data availability separately.
9. Check the full final diff, inherited work preservation, generated output, and unexpected route impact.
10. Produce a closure matrix linking every required task to evidence, or a specific unresolved status.

Avoid universal totals in reports. Derive current counts and report passed, failed, skipped, cancelled, and not-run results accurately. Do not equate zero serious/critical automated findings with zero accessibility issues.

### 19.2 Corrections found during acceptance

For an audit-only request, record findings and a correction plan. For an implementation-through-completion request, fix in-scope defects and recheck them without another routine permission round.

After a correction, rebuild as needed, test the changed behavior and dependent consumers, and perform a bounded regression check. Re-run a full suite or whole-site matrix when shared impact or uncertainty justifies it. Do not repeat every expensive check after every documentation change.

Label reused evidence with its tested revision and explain why it remains applicable. If impact is uncertain, broaden the check. Re-audit only as far as required to support an honest final verdict.

### 19.3 Verdicts

| Verdict | Meaning |
| --- | --- |
| LOCAL PASS | Required local scope is implemented and supported by current evidence; required reviews are satisfied. |
| LOCAL PASS WITH EXPLICIT FOLLOW-UPS | No unresolved required local blocker; specific non-blocking external, optional, deferred, or unmeasured work remains with an owner and trigger. |
| INCOMPLETE / BLOCKED | Required implementation, factual decision, review, or verification is missing. |
| LIVE VERIFIED | The authorized deployed candidate has passed the stated public checks; external delivery and field measurement limitations remain explicit. |

Do not label an optional deferral as implementation completed. Do not treat a required failed check as a harmless follow-up. A website can be complete for its agreed release while search growth, future content, and field measurement continue.

## 20. Authorized release, live acceptance, and search setup

Deployment is a separate operational stage. Do not insert it between local batches unless the owner requested incremental releases. Apply the project's release process and current authorization.

### 20.1 Release handoff

Identify the accepted candidate, included changes, required runtime settings without secrets, build mode, integrations, generated assets, rollback/recovery approach, release operator, and post-release checks. When a different agent deploys, provide this evidence rather than assuming it has the full conversation.

Verify the release scope includes all legitimate intended work; do not accidentally publish only the last agent's files or include unrelated private artifacts. Respect the target project's staging/commit rules and deployment gate. Do not repeat the full audit during ordinary deployment when the tested candidate and release process do not require it.

### 20.2 Verify production

- Confirm the intended revision or observable release identity and representative changed content.
- Check HTTPS/canonical redirects, statuses, indexing directives, sitemap, robots, schema, headers, and access to assets.
- Check cache invalidation and previously changed pages for stale output.
- Verify navigation, representative page families, mobile behavior, proof media, and critical conversion paths.
- Confirm production-dependent initialization and actual authorized delivery; keep a mocked local pass distinct.
- Record failures as production, application, configuration, or external-service findings based on evidence.

DNS, CDN behavior, search consoles, delivery providers, and field metrics cannot be proven by local source inspection.

### 20.3 Search registration and measurement

When authorized, verify Google Search Console and Bing Webmaster Tools for the correct property, submit the canonical sitemap, and inspect representative URLs. Record sitemap fetch/processing status and actual indexing separately. A submitted sitemap or successful HTTP fetch is not confirmation of search indexing.

Choose other webmaster platforms according to the intended markets. IndexNow is optional change notification for participating engines; submit added, updated, or deleted URLs when appropriate, using verified ownership and the current protocol. It does not guarantee indexing and does not replace Google's normal discovery workflow. [IndexNow FAQ](https://www.indexnow.org/faq).

Keep analytics activation, visitor tracking, account connections, and external submissions within the owner's authorization. Do not introduce a tracking service simply to satisfy this playbook.

## 21. Ongoing ownership and review

Assign an owner and review trigger to content, commercial facts, integrations, media, crawler rules, security headers, and accessibility statements.

Use this adaptable cadence:

| Trigger or interval | Review |
| --- | --- |
| After a public change | Affected claims, shared occurrences, metadata, dates, links, layout, and integrations |
| After deployment | Candidate identity, caching, indexability, key journeys, and monitoring |
| Early launch period | Sitemap processing, crawl/indexing issues, real delivery, error trends |
| Once useful traffic exists | Field performance, search queries, landing-page outcomes, conversion quality, genuine reader confusion |
| Monthly or appropriate business interval | Broken links, stale screenshots, commercial changes, external-source changes, content opportunities |
| Quarterly or material platform change | Crawler purposes, search/schema policy, accessibility evidence, key trust facts, localization priorities |

Use real data to prioritize further work. Do not promise ranking, traffic, citations, or conversion gains merely because an implementation follows this playbook. Preserve correction history and superseded decisions without allowing obsolete states to appear as the current verdict.

## 22. Copy-ready project templates

These templates belong in the target project's existing planning system where possible. Empty fields are prompts for inspection or a decision, not approval.

### 22.1 Project implementation plan

```markdown
# Website Improvement or Build Plan

Track: Existing website / New website
Current authorization:
Website/repository and canonical origin:
Audience, markets, and main journeys:
Controlling sources and existing registers:
Baseline revision/build and inherited changes:
Scope and exclusions:
Commands and test side effects:
Quality targets and supported environments:

## Inventory
| ID | Route/surface | Canonical source | Family | Reader task | Indexing intent | Claims/CTA | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Findings and requirements
| ID | Evidence or new-site requirement | Impact | Priority | Required/optional | Dependencies | Batch | Acceptance |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Decisions and unknowns
| ID | Fact or decision | Current evidence | Owner | Affected work | Interim treatment | Status |
| --- | --- | --- | --- | --- | --- | --- |

## Batch order
| Batch | Goal | Routes/shared consumers | Requirement IDs | Prerequisites | Checks | Authorization | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Already correct
[Preserved areas and regression coverage.]

## Completion
[Local verdict, evidence, unresolved items, release state, next authorized action.]
```

### 22.2 Claim and review records

```markdown
| Claim ID | Exact meaning | Source and date | Conditions | Public-use decision | All consumers | Recheck trigger |
| --- | --- | --- | --- | --- | --- | --- |

| Page ID | Revision/fingerprint | Internal owner/reviewer | Review event/date | State | Pending facts | Public date effects |
| --- | --- | --- | --- | --- | --- | --- |

Date mappings:
- First publication:
- Material update:
- Human review:
- JSON-LD and social metadata:
- Sitemap:
- Feed:
- Treatment of unknown dates and internal-only edits:
```

### 22.3 Batch implementation brief

```markdown
# Batch [ID]: [Outcome]

Goal and reader/business benefit:
Authorized scope and explicit exclusions:
Finding/requirement IDs:
Current evidence and source authority:
Dependencies and resolved owner decisions:
Baseline and inherited-work protection:

Implementation:
1. Reconcile affected facts and all shared consumers.
2. Apply the coherent source/content/UI change.
3. Update dependent metadata, dates, media, links, and provenance as needed.
4. Verify generated output and relevant browser states.
5. Record evidence and residual issues in the canonical plan.

Acceptance checks and test data:
Responsive/accessibility/performance scope:
Expected route and shared-component impact:
External actions explicitly authorized, if any:
Missing decisions that block only dependent work:
Required completion report:
```

### 22.4 Completion report

```markdown
# Batch [ID] Result

Verdict and evidence level:
What changed and why:
Routes/files affected and inherited work preserved:
Claims/decisions used; unresolved facts:
Dates, fingerprints, and review-state effects:
Automated checks: commands, counts, result, tested build:
Browser checks: routes, widths, browsers, states, screenshots:
Source/built-output consistency and regression boundary:
Checks not run or mocked; limitations:
Generated-file changes:
Required remaining work:
Optional/deferred work and reason:
Release state: local / committed / pushed / deployed / live verified:
Next action within the owner's authorization:
```

### 22.5 Final closure matrix

```markdown
| Requirement/finding | Implemented state | Evidence and tested version | Human review if required | Remaining limitation | Verdict |
| --- | --- | --- | --- | --- | --- |

Inventory denominators and reconciliation:
Full vs sampled visual coverage:
Critical journey outcomes (mocked/sandbox/real):
Indexing and schema behavior:
Claims, dates, authorship, and media verification:
Accessibility coverage and untested combinations:
Performance: lab results and field-data status:
Required local blockers:
External release/live gates:
Optional growth backlog:
Final local verdict and deployment status:
```

## 23. Single-file handoff to a coding agent

Attach this file in the target website's project and state the track and authorized scope. If you authorize full local implementation, the agent should complete the plan and execute ready phases without repeatedly asking permission for already-authorized work.

Use this accompanying request:

```text
Use the attached Website Quality and Human-First Master Playbook for this website.

Project/repository: [target website]
Track: [existing-site improvement / new-site build]
Authorization: [audit and plan only / named batch / complete local implementation]
Scope and exclusions: [details]
Known sources and owner decisions: [references, if available]
Release authorization: [not authorized / separately specified]

First inspect the target project's instructions, current state, business facts,
content sources, and existing quality checks. Adapt the playbook to this business.
Create or update one project plan with the complete inventory, combined findings,
priorities, dependencies, owner inputs, and reviewable implementation batches.

For an existing website, preserve verified good work and resolve actual gaps.
For a new website, establish the content, date, review, technical, design,
accessibility, and performance contracts before expanding the page inventory.

If implementation is authorized, execute the applicable phases and their checks.
Resolve technical quality and human-first content together within each batch.
Use current evidence for claims; keep missing facts and blocked decisions explicit.
Continue independent authorized work while a dependent item is pending.

Preserve inherited work. Verify source, generated output, browser behavior,
cross-page consistency, dates, and relevant performance/accessibility impacts.
Keep local results, human approval, deployment, and live evidence distinct.

Finish with the closure matrix, the actual local-completion verdict, and the exact
remaining required or optional work. Stop at the authorized release boundary.
```

## 24. Reference policy and origin

The operating workflow combines lessons from an end-to-end marketing-site audit, local release acceptance, a Human-First content playbook, an editorial improvement programme, and subsequent claim, date, responsive-layout, and real-product-media corrections. Historical recommendations were reconciled rather than copied as universal rules.

In particular, this version does not inherit arbitrary word-count targets, forced personal authorship, a site's product facts, fixed page/test counts, inferred publication dates, universal HSTS settings, or a mandatory external service. The requirements are applied to the target site's evidence and authorized scope.

Official references directly checked on **28 September 2026**:

| Reference | Used for |
| --- | --- |
| [Google: People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Reader value, sourcing, creation context, and content self-assessment |
| [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features) | Ordinary SEO foundations and the absence of a special AI-file/schema requirement for Google AI features |
| [Google: Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | Meaning, visibility, accuracy, and eligibility limits |
| [Google: Publication dates](https://developers.google.com/search/docs/appearance/publication-dates) | Truthful publication/modification labels and metadata |
| [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Sitemap construction and meaningful modification information |
| [web.dev: Web Vitals](https://web.dev/articles/vitals) | Current performance metrics, thresholds, and field/lab distinctions |
| [W3C: WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) | Accessibility requirement reference |
| [OWASP: HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) | Security-header assessment and context-sensitive configuration |
| [IndexNow: FAQ](https://www.indexnow.org/faq) | Change notification, participating engines, and indexing limitations |

Recheck official documentation before relying on changing crawler tokens, search features, schema eligibility, framework behavior, legal requirements, or platform integrations. Record the new access date and the specific conclusion supported. When a source is inaccessible, report the limitation and avoid presenting an unverified detail as current.

The file is complete as an operating framework. Success for a particular website is demonstrated by its own implementation and acceptance evidence.
