# Whats91 website quality and human-first audit — Phase 1

**Audit date:** 28 September 2026 (Asia/Kolkata). **Evidence level:** current source, read-only static checks, and inspection of selected existing image files. **Verdict:** source audit complete; website quality needs work. This is not a local acceptance, production security, browser, delivery, or deployment verdict.

**Authorization:** Phase 1 audit and this separate Markdown report only. No implementation, blueprint, batch schedule, commit, push, deployment, database change, dependency change, form submission, or external message was performed. Recommendations and acceptance conditions below describe subsequent work; they do not authorize it. The accompanying assignment overrides the playbook's generic request to prepare a roadmap or assigned batches.

**Controlling requirement:** `docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_MASTER_PLAYBOOK.md`, version 1.0, prepared 28 September 2026. SHA-256 `acddafd83a4ccfd0f30893f7d1034ffedae381b1e9630563f20498923a78128c`. Applicable `AGENTS.md` supplies project standards. Existing plans and previous completion reports were treated as contextual leads, not fresh approval or current acceptance evidence.

**Checked repository:** `/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com`. Canonical source origin: `https://whats91.com`. Branch: `main`. HEAD: `6fdf9db34ea3d06772059873890f03fa1ed02657`. Starting tracked tree was clean; the canonical playbook was the sole untracked path. It is inherited user work and was preserved. The report is the only new workspace artifact.

## 1. What matters most

Three urgent source risks need attention in the next authorized phase: anonymous contact/demo record retrieval (F001), unsigned deployment-triggering webhook (F002), and arbitrary server-side URL fetching (F003). Their application logic is confirmed. Public reachability, edge protection, stored data, and actual exploitation were deliberately not probed. Priority is P1 urgent, with potential P0 escalation if active public exposure is confirmed; source evidence alone does not establish an active incident.

Primary conversion can report success even when local persistence, CRM, and notification all fail (F004). Commercial calculations and instructions disagree across pricing, calculators, guides, FAQs, and assistant-readable copies (F006–F008, F012). Homepage numerical SLA/support claims and machine-readable certification/residency claims conflict with the careful legal framework (F009–F010). These are correctness issues, independent of visual polish.

There is useful content and substantial infrastructure to retain: centralized plans and explicit taxes, the honest disabled checkout, canonical metadata helpers, the matched source sitemap, shared semantic layout primitives, progressive enhancement in Reveal/AnimatedNumber, and centralized conservative legal documents. The audit does not recommend deleting useful URLs or rewriting every page.

No current production-like preview was established in this audit. Consequently rendered metadata, actual HTTP status/header behavior, responsive screenshots, keyboard/screen-reader journeys, performance, edge caches, and live delivery remain explicitly unverified. The report records those gaps instead of equating source review with acceptance.

## 2. Project brief, authority, and evidence boundaries

| Brief field | Current evidence / decision |
| --- | --- |
| Website / offering | Existing English marketing site for Whats91 WhatsApp Cloud API, automation, ERP integrations, resources, free tools and partner programs. Implementation of the connected products is outside this repository audit. |
| Audience / markets | Source emphasizes Indian businesses, ERP operators, marketers, developers, procurement/support readers and partners. Cross-country calculator exists; worldwide service eligibility and supported languages need owner confirmation (OI01/OI03). |
| Main journeys | Understand solution → demo/contact; inspect pricing → plans → checkout summary → contact for activation; resource → copy template/flow; tool → local output; trust → policy/support email; careers → role → email application. |
| Brand / protected surfaces | Whats91, existing green brand tokens; no blue/indigo under AGENTS. `src/components/ui/` is protected from modification. Existing legal wording and approvals must not be inferred or replaced casually. |
| Commercial authority | [src/lib/plans.ts:47](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/plans.ts:47) governs /plans and /checkout. Partner catalogues and calculators maintain separate prices. Owner approval, trials, renewal, add-on duration and availability are PENDING. |
| Trust authority | [docs/legal-policy-inputs.md:3](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/legal-policy-inputs.md:3) is the existing owner-input record; [src/lib/legal/documents.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/legal/documents.ts) is the public document source. Neither source text nor a review date establishes implementation or owner approval. |
| MCP authority conflict | [docs/mcp-page/MCP_PAGE_MASTER_PLAN.md:126](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/mcp-page/MCP_PAGE_MASTER_PLAN.md:126) describes preview; [src/components/landing/mcp/mcpContent.ts:22](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/mcpContent.ts:22) reports later owner confirmation of availability. The live page retains preview language. Preserve the reported confirmation as evidence to reconcile, not a new fact to discard. |
| Runtime baseline | Lockfile: Next 16.1.6, React 19.2.4, TypeScript 5.9.3, Prisma client 6.19.2, Tailwind 4.2.1, ESLint 9.39.3. Audit commands used Node v24.1.0; AGENTS describes Node 20.x. Production runtime not checked. |
| Build / generated files | [package.json:7](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/package.json:7) generates Prisma and .next, then copies static/public/.env into standalone. .next, next-env and tsbuildinfo are generated. No build was run because it can write artifacts and import database initialization. |
| Technical quality targets | Playbook default WCAG 2.2 AA and 1440/1024/768/375/320 CSS px are review requirements, not passed checks. Browser/device policy, per-family payload budgets and accountable operational owners are PENDING (OI11). |
| Exclusions | Authenticated products/subdomains, real submissions or recipient delivery, production/private data, secret values, database contents, deployment, DNS/CDN/WAF changes, tracking activation, webmaster submissions and penetration testing. |
| Facts / approval / behavior | This report separates source-confirmed behavior, owner evidence needed, current official platform guidance, and untested runtime behavior. No blank template, old report, comment or automated test is promoted to universal approval. |

### 2.1 Classification and priority

The requirement matrix uses **Present/Compliant** (source requirement met at the stated evidence level), **Partial**, **Missing**, **Violation/Risk**, **Not Applicable**, and **Needs Owner Input**. “Present/Compliant” never means a whole-site acceptance pass. Areas also receive the playbook coverage verdicts PASS, NEEDS WORK, PENDING EVIDENCE or NOT APPLICABLE.

Finding priority uses the playbook P0–P3 definitions. Severity describes impact, confidence describes the evidence, and release impact identifies the affected scope. PENDING owner inputs do not stop independent audit work. No findings are assigned implementation batches in Phase 1.

## 3. Complete source surface inventory

### 3.1 Denominators and reconciliation

- **60 page modules:** 59 fixed HTML routes plus `/authors/[slug]`.
- **63 concrete intended HTML routes:** 59 fixed routes plus four author records. There are ten blog records and ten explicit article routes, with no source registry/route mismatch.
- **59 intended sitemap URLs:** all 63 HTML routes except `/checkout`, `/design-system`, `/legal/dpa`, `/trust/subprocessors`. Source comparison found no unexpected sitemap URL, duplicate or missing indexable route. This is not an HTTP crawl result.
- **18 layouts**, **13 route-handler modules** (12 under `/api`, plus `/feed.xml`), a global not-found module and generated `/sitemap.xml`.
- **11 flow JSON records**, all parsed successfully; entry-node references and inspected edge endpoint keys resolve. That is structural evidence, not import/execution acceptance by the connected flow product.
- **11 public files:** nine normal public files plus two hidden `.well-known` OAuth discovery files. No downloadable PDF/document artifact is in `public`. Dynamic template/flow copying and QR downloads are separate interaction surfaces.
- **105 component modules**, including protected shadcn primitives; **30 library/data files**; **10 page modules marked client** (blog hub plus nine articles). All other pages default to server, with client islands where interaction requires them.

A literal internal-href scan found no missing fixed HTML target; `/feed.xml` is a valid route handler, not a missing page. This scan excludes dynamic expressions and cannot establish fragment validity, redirects, external reachability, rendered anchors or access control. The route ledger below and F024/F038 identify those remaining checks.

### 3.2 Route ledger

Every row identifies a current source, reader task, family, indexing intent, main CTA and editorial disposition. “Shared shell” below means Header/Footer plus their demo, cookie and skip-navigation consumers. Root metadata/JSON-LD, fonts, toast and cookie UI affect every HTML route. Articles also inherit the blog layout and article metadata. Legal routes use LegalDocument. Tool pages use dedicated client islands. Shared defects apply even when not repeated in every row.

| Route / family expansion | Source | Family / rendering | Reader task | Index intent | Main CTA | Disposition / findings |
| --- | --- | --- | --- | --- | --- | --- |
| /about | [src/app/about/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/about/page.tsx) | Company; Server | Assess organization and credibility | Indexable intent; sitemap | Contact / demo | PENDING identity, team and milestones; REFINE proof; F010 F013 |
| /acceptable-use | [src/app/acceptable-use/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/acceptable-use/page.tsx) | Legal; Server | Understand permissions and prohibited use | Indexable intent; sitemap | Platform policy / support | KEEP opt-in and escalation obligations; approval PENDING; F014 |
| /authors/[slug] | [src/app/authors/[slug]/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/authors/[slug]/page.tsx) | Profile; Server | Assess contributor and find their articles | Four profiles; sitemap | Article links / company social profiles | PENDING bios/permission; REFINE images and empty profiles; F013 F015 F017 |
| /authors | [src/app/authors/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/authors/page.tsx) | Hub; Server | Understand content attribution | Indexable intent; sitemap | Author profiles | PENDING personal approval; REFINE attribution evidence; F013 F015 F017 |
| /blog/busy-accounting-whatsapp-integration-benefits | [src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx) | Guide; Client | Decide when ERP messaging helps | Indexable intent; sitemap | Share / related guide / product CTA | PENDING named customer/ROI evidence; KEEP task examples; F010 F015 F016 F022 |
| /blog/busy-erp-google-sheets-integration-complete-guide | [src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx) | Guide; Client | Choose and set up a Sheet integration | Indexable intent; sitemap | Share / related guide / product CTA | REPLACE CSV/IMPORTRANGE instruction; REFINE platform limits; F008 F015 F022 F032 |
| /blog | [src/app/blog/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/page.tsx) | Hub; Client | Find guidance by subject | Indexable intent; sitemap | Search / category / article / newsletter | KEEP real article routing; REPLACE dead newsletter promise; F025 F018 |
| /blog/whatsapp-cloud-api-complete-guide-2026 | [src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx) | Guide; Client | Understand API setup and billing | Indexable intent; sitemap | Share / related guide / product CTA | RECONCILE conversation-era prices/hosting claims; F008 F015 F022 |
| /blog/whatsapp-cloud-api-pricing-india-2026 | [src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx) | Guide; Server | Estimate India delivered-message cost and reconcile billing | Indexable intent; sitemap | Share / related guide / product CTA | KEEP accepted/delivered/unknown distinction and dated sources; REFINE research exposure; F006 F008 F015 F021 |
| /blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026 | [src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx) | Guide; Client | Understand account/coexistence limits | Indexable intent; sitemap | Share / related guide / product CTA | RECONCILE 20 versus 5 MPS and stale rollout dates; F007 F015 F022 |
| /blog/whatsapp-graph-api-v24-to-v25-transition-guide | [src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/page.tsx) | Guide; Client | Plan a version migration | Indexable intent; sitemap | Share / related guide / product CTA | PENDING rollout/BSUID assumptions; REFINE permanent-token claim; F010 F015 F022 |
| /blog/whatsapp-plus-launch-2026-premium-subscription-guide | [src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx) | Guide; Client | Understand alleged premium consumer feature launch | Indexable intent; sitemap | Share / related guide / product CTA | PENDING launch/features/sources; KEEP distinction from Business API; F010 F015 F022 |
| /blog/whatsapp-username-system-2026-complete-guide | [src/app/blog/whatsapp-username-system-2026-complete-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-username-system-2026-complete-guide/page.tsx) | Guide; Client | Understand username/BSUID implications | Indexable intent; sitemap | Share / related guide / product CTA | PENDING rollout/eligibility; REFINE unbounded messaging claims; F010 F015 F022 |
| /blog/whatsapp-web-6-hour-logout-rule-india-2026 | [src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/page.tsx) | Guide; Client | Understand regulatory/session implications | Indexable intent; sitemap | Share / related guide / product CTA | PENDING primary legal source and dated applicability; F010 F015 F022 |
| /blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide | [src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx) | Guide; Client | Choose a safe migration path | Indexable intent; sitemap | Share / related guide / product CTA | REPLACE dummy-site advice; RECONCILE discounts/brand claims; F008 F010 F015 F022 |
| /careers | [src/app/careers/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/page.tsx) | Company; Server | Evaluate jobs and apply | Indexable intent; sitemap | Expand job / mailto application | PENDING jobs/benefits; REPLACE perpetual relative dates; F013 F015 F019 |
| /chatbot-flows | [src/app/chatbot-flows/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/chatbot-flows/page.tsx) | Resource; Server | Find and inspect reusable automation JSON | Indexable intent; sitemap | Filter / expand / copy JSON / Use Flow | KEEP structural library; REFINE failure and dead action; F025 F037 |
| /checkout | [src/app/checkout/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/checkout/page.tsx) | Commercial; Server | Review selected plan and total | Noindex; excluded | Disabled payment / contact activation | KEEP honest unavailable payment and invalid-query notice; F014 F027 |
| /compliance | [src/app/compliance/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/compliance/page.tsx) | Legal; Server | Understand DPDP readiness and scope | Indexable intent; sitemap | Primary resources / rights / support | KEEP readiness framing; current legal review PENDING; F014 |
| /contact | [src/app/contact/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/contact/page.tsx) | Conversion; Server | Submit a relevant enquiry | Indexable intent; sitemap | Contact form / email / phone / docs | REFINE acceptance and recovery; KEEP channels; F001 F004 F005 F035 |
| /cookies | [src/app/cookies/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/cookies/page.tsx) | Legal; Server | Understand cookies/storage and settings | Indexable intent; sitemap | Cookie settings / privacy | KEEP current-inactive optional categories; reconcile transfers; F028 F029 |
| /data-rights | [src/app/data-rights/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/data-rights/page.tsx) | Legal; Server | Find a privacy/grievance request route | Indexable intent; sitemap | Support email / related policies | KEEP minimized request guidance; operational evidence PENDING; F014 |
| /design-system | [src/app/design-system/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/design-system/page.tsx) | Internal; Server | Inspect design primitives | Noindex; excluded | Sample links and components | PROTECTED preview; retain noindex; do not treat samples as product; F030 |
| /faq | [src/app/faq/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/page.tsx) | Resource; Server | Find an answer or contact support | Indexable intent; sitemap | Search / categories / expand / contact | RECONCILE dated answers; REFINE accessible controls; F008 F009 F018 F024 |
| /features/chat-shortcuts-conversation-automation | [src/app/features/chat-shortcuts-conversation-automation/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/chat-shortcuts-conversation-automation/page.tsx) | Feature; Server | Understand shortcut matching and replies | Indexable intent; sitemap | Contact / related integrations | KEEP mechanism; REFINE repetition and illustrative UI; F010 F016 F021 |
| /features | [src/app/features/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/page.tsx) | Hub; Server | Choose a platform capability | Indexable intent; sitemap | Feature / product links | REFINE availability/claims; KEEP navigation; F010 F011 |
| /flow-builder | [src/app/flow-builder/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/flow-builder/page.tsx) | Product; Server | Evaluate automation and setup | Indexable intent; sitemap | Trial portal / demo | REFINE unlimited/accuracy/outcome promises; F010 F016 F022 |
| /google-sheets-integration | [src/app/google-sheets-integration/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/google-sheets-integration/page.tsx) | Integration; Server | Understand Sheet-driven WhatsApp workflows | Indexable intent; sitemap | Demo / chat portal | REFINE realtime/unlimited claims and illustrative UI; F010 F016 F022 |
| /legal/dpa | [src/app/legal/dpa/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/legal/dpa/page.tsx) | Trust status; Server | Understand DPA verification status | Noindex; excluded | DPA request email | KEEP truthful status and intentional noindex; F014 |
| /legal | [src/app/legal/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/legal/page.tsx) | Trust hub; Server | Find relevant policies and document status | Indexable intent; sitemap | Legal routes / support email | KEEP central routing and conservative status; F010 F014 |
| /mcp | [src/app/mcp/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/mcp/page.tsx) | Feature; Server | Assess assistant connection, controls and access | Indexable intent; sitemap | Contact subject / architecture anchor | RECONCILE status; KEEP shared FAQ/copy source; F011 F014 F035 |
| / | [src/app/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/page.tsx) | Home; Server | Understand platform and choose a next step | Indexable intent; sitemap | Demo / contact / chat portal | REFINE proof and claims; KEEP task routing; F009 F010 F016 |
| /partners | [src/app/partners/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/partners/page.tsx) | Partner; Server | Compare resale and technical partner economics | Indexable intent; sitemap | Contact / coins | REFINE period/availability authority; KEEP comparison; F008 F014 F027 |
| /partners/whats91-coins | [src/app/partners/whats91-coins/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/partners/whats91-coins/page.tsx) | Partner; Server | Estimate wallet use and recharge | Indexable intent; sitemap | Coins calculator / contact | KEEP coin/tax separation; PENDING catalogue approval; F014 F027 |
| /plans | [src/app/plans/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/plans/page.tsx) | Commercial; Server | Compare platform subscription and billing | Indexable intent; sitemap | Plan selector → checkout | KEEP catalogue/taxes; PENDING availability and terms; F008 F014 F027 |
| /pricing | [src/app/pricing/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/page.tsx) | Commercial; Server | Understand Meta fees and estimate spend | Indexable intent; sitemap | Calculator / plans / trial portal | REFINE conditions and calculations; KEEP fee distinctions; F006 F008 F014 F020 |
| /privacy | [src/app/privacy/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/privacy/page.tsx) | Legal; Server | Understand processing and choices | Indexable intent; sitemap | Related policies / support | PROTECTED pending owner review; KEEP role/transfer boundaries; F014 F028 |
| /refund | [src/app/refund/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/refund/page.tsx) | Legal; Server | Understand refunds and cancellation | Indexable intent; sitemap | Support / terms | PROTECTED pending commercial approval; F014 |
| /sla | [src/app/sla/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/sla/page.tsx) | Trust; Server | Understand default support versus signed SLA | Indexable intent; sitemap | Support / security | KEEP contractual-only commitments; reconcile public promises; F009 F014 |
| /solutions/busy-ai-agent | [src/app/solutions/busy-ai-agent/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-ai-agent/page.tsx) | Solution; Server | Assess accounting assistant capabilities and control | Indexable intent; sitemap | Demo / contact / related products | PENDING shipped capabilities and outcomes; KEEP scope explanation; F010 F016 |
| /solutions/busy-api | [src/app/solutions/busy-api/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-api/page.tsx) | Solution; Server | Assess API access for accounting integration | Indexable intent; sitemap | Demo / contact / related products | PENDING supported API surface and performance; KEEP architecture; F010 F016 F022 |
| /solutions/busy-ecommerce | [src/app/solutions/busy-ecommerce/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-ecommerce/page.tsx) | Solution; Server | Assess ecommerce order/accounting automation | Indexable intent; sitemap | Demo / contact / related products | PENDING availability/99.95% claims; KEEP workflow explanation; F009 F010 F016 |
| /solutions/busy-erp | [src/app/solutions/busy-erp/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-erp/page.tsx) | Solution; Server | Understand ERP messaging, prerequisites and value | Indexable intent; sitemap | Demo / contact / related products | REFINE numerical outcomes; KEEP practical task explanation; F010 F016 |
| /solutions/busy-google-sheet | [src/app/solutions/busy-google-sheet/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-google-sheet/page.tsx) | Solution; Server | Evaluate reverse-flow Sheet integration | Indexable intent; sitemap | Demo / contact / related products | REFINE zero limits/99.99% promise; KEEP architecture trade-off; F009 F010 F016 F022 |
| /solutions/busy-reports | [src/app/solutions/busy-reports/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-reports/page.tsx) | Solution; Server | Understand automated report access and delivery | Indexable intent; sitemap | Demo / contact / related products | PENDING isolation/speed promises; KEEP report taxonomy; F010 F016 F022 |
| /solutions/marketing | [src/app/solutions/marketing/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/marketing/page.tsx) | Solution; Server | Plan compliant campaign automation | Indexable intent; sitemap | Demo / contact / related products | REFINE ROI/version/capacity claims; KEEP opt-in conditions; F010 F016 F022 |
| /solutions/miracle-whatsapp-api | [src/app/solutions/miracle-whatsapp-api/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/miracle-whatsapp-api/page.tsx) | Solution; Server | Configure Miracle profile/template/PDF delivery | Indexable intent; sitemap | Demo / contact / related products | KEEP detailed setup and safe-token images; REFINE commentary/schema; F010 F016 F021 F023 |
| /solutions/payment-reminders | [src/app/solutions/payment-reminders/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/payment-reminders/page.tsx) | Solution; Server | Understand due-date-based reminders | Indexable intent; sitemap | Demo / contact / related products | KEEP invoice-age/credit-period example; PENDING outcomes; F010 F016 F022 |
| /solutions/utility | [src/app/solutions/utility/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/utility/page.tsx) | Solution; Server | Understand transaction templates and service windows | Indexable intent; sitemap | Demo / contact / related products | RECONCILE free conditions; REFINE code/sample controls; F008 F010 F018 F022 |
| /terms | [src/app/terms/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/terms/page.tsx) | Legal; Server | Understand contractual service boundaries | Indexable intent; sitemap | Related policies / support | PROTECTED pending approval; KEEP signed-order distinctions; F014 |
| /tools/lead-qualification-roi-calculator | [src/app/tools/lead-qualification-roi-calculator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/lead-qualification-roi-calculator/page.tsx) | Utility; Server | Compare lead qualification cost assumptions | Indexable intent; sitemap | Inputs / reset / outputs | KEEP editable assumptions; REFINE edge cases and claims; F010 F027 |
| /tools | [src/app/tools/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/page.tsx) | Hub; Server | Choose one of four utilities | Indexable intent; sitemap | Four tool links | KEEP useful routing; reconcile machine inventory/privacy; F012 F017 |
| /tools/qr-code-generator | [src/app/tools/qr-code-generator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/page.tsx) | Utility; Server | Generate/download/copy a QR image | Indexable intent; sitemap | Type / fields / generate / PNG / clipboard | KEEP local dynamic library; REFINE empty/type validation; F026 F027 |
| /tools/whatsapp-api-cost-calculator | [src/app/tools/whatsapp-api-cost-calculator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-api-cost-calculator/page.tsx) | Utility; Server | Estimate category/country costs | Indexable intent; sitemap | Country / quantities / comparison tab | REPLACE undocumented aggregate discount; verify currencies; F006 F020 |
| /tools/whatsapp-link-generator | [src/app/tools/whatsapp-link-generator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-link-generator/page.tsx) | Utility; Server | Create and copy a wa.me link | Indexable intent; sitemap | Generate / copy / test / QR link | KEEP encoded message; REFINE phone validation and recovery; F026 |
| /trust/security | [src/app/trust/security/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/trust/security/page.tsx) | Trust; Server | Understand assurance boundaries and reporting | Indexable intent; sitemap | Support security email / providers | KEEP conservative assurance language; verify controls; F001 F002 F003 F014 F030 |
| /trust/subprocessors | [src/app/trust/subprocessors/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/trust/subprocessors/page.tsx) | Trust status; Server | Understand provider register status | Noindex; excluded | Support request / DPA | KEEP truthful status and intentional noindex; F014 F028 |
| /whatsapp-business-calling | [src/app/whatsapp-business-calling/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-business-calling/page.tsx) | Product; Server | Understand calling eligibility and limitations | Indexable intent; sitemap | Contact / demo | KEEP VoIP explanation; PENDING price/capacity/outcomes; F010 F016 |
| /whatsapp-coexistence | [src/app/whatsapp-coexistence/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-coexistence/page.tsx) | Resource; Server | Decide whether hybrid number setup fits | Indexable intent; sitemap | Contact / plans | KEEP limitations/table; RECONCILE limits and history; F007 F008 F010 F020 |
| /whatsapp-templates | [src/app/whatsapp-templates/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-templates/page.tsx) | Resource; Server | Find and copy a useful message example | Indexable intent; sitemap | Copy template / contact | REPLACE pre-approval guarantee; KEEP useful examples; F010 F025 |

Dynamic author records are `devendar-singh-gohil`, `mayur-arya`, `santosh-patil`, `ankita-arya`. All ten current posts use author ID 1; the other profiles have no current articles. Retention/indexing should be an explicit reader-value decision, not an automatic deletion. Unknown author slugs call `notFound()`; actual response and streamed-status behavior are untested.

### 3.3 Non-HTML, API, alternate format and error surfaces

| Route family | Source | Purpose | Disposition / evidence |
| --- | --- | --- | --- |
| /api/contact | [src/app/api/contact/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/contact/route.ts) | POST enquiry; GET latest 50 records | F001/F004/F005; source Zod/reCAPTCHA; no GET auth |
| /api/demo | [src/app/api/demo/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/demo/route.ts) | POST demo request; GET latest 50 records | F001/F004/F005; source Zod/reCAPTCHA; no GET auth |
| /api/flows/[id] | [src/app/api/flows/[id]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/[id]/route.ts) | Allowlisted JSON file lookup and memory cache | KEEP registry-before-file lookup/404; F037 standalone trace/invalid export risk |
| /api/flows | [src/app/api/flows/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/route.ts) | Public metadata for 11 flow records | KEEP bounded static data; explicit machine index/header policy needs verification |
| /api/mcp/pages/[slug] | [src/app/api/mcp/pages/[slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/pages/[slug]/route.ts) | 11 static machine summaries plus 10 blog record responses | F012/F015; static response noindex; blog response lacks equivalent header |
| /api/mcp | [src/app/api/mcp/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/route.ts) | GET discovery descriptor; OPTIONS; five advertised tools | F011/F012; no tool execution POST handler; noindex source present |
| /api/md/[...slug] | [src/app/api/md/[...slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[...slug]/route.ts) | Nested paths intentionally return JSON 404 | KEEP helpful flat-slug explanation/noindex; list omits partners/coins accepted by flat route |
| /api/md/[slug] | [src/app/api/md/[slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[slug]/route.ts) | 11 static markdown copies plus 10 blog alternatives | F012/F015; canonical Link source present; nine blog bodies absent |
| /api | [src/app/api/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/route.ts) | GET Hello world | F030; leftover debug surface; no private data observed in source |
| /api/seo-check | [src/app/api/seo-check/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/seo-check/route.ts) | POST arbitrary URL fetch and heuristic SEO score | F003/F033; no current public tool page; simplified checks falsely pass |
| /api/version | [src/app/api/version/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/version/route.ts) | Public version-file lookup | KEEP bounded candidate reads/error fallback; runtime path response not checked |
| /api/webhooks/github | [src/app/api/webhooks/github/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/webhooks/github/route.ts) | GET status/path; POST deployment trigger | F002/F031/F034; not exercised |
| /feed.xml | [src/app/feed.xml/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/feed.xml/route.ts) | RSS from current blog registry | KEEP registry pubDate; F015 publication provenance; cache 30m/SWR source; no live fetch |

Additional surfaces: `/sitemap.xml` is source-generated, `/robots.txt` and `/llms.txt` are static public files, `/og-image.png` is the site-wide social image, `.well-known/oauth-authorization-server` and `.well-known/protected-resource` advertise unsupported same-origin auth routes (F011), and global not-found provides recovery links. No application redirect rules, middleware/proxy authentication layer, locale route family, dedicated loading/error boundary or current authenticated marketing route implementation was found. Edge rules and external product auth can exist outside this repository and were not inferred to be absent.

The markdown and MCP static key set is `busy-erp`, `miracle-whatsapp-api`, `chat-shortcuts-conversation-automation`, `whatsapp-templates`, `whatsapp-coexistence`, `tools`, `pricing`, `partners`, `whats91-coins`, `google-sheets-integration`, `chatbot-flows`. Both additionally handle `blog-{slug}` from the ten-record registry. These are alternate formats/discovery surfaces, not additional HTML page counts.

### 3.4 Shared source and interaction coverage

| Surface / canonical source | Review coverage / conclusion |
| --- | --- |
| Root layout, global CSS, Header, Footer, shared primitives | Metadata inheritance, global graph/font/script consumers, menus, skip-link contract, CTA anchors, focus/motion rules and brand contrast reviewed. F009/F018/F019/F020/F024/F030. Header mobile Sheet has labelled Radix foundations; direct keyboard/device verification remains open. |
| Home components (10) / solution animations (6) | Hero, proof, ROI, trust, routing and CTA claims reviewed; illustrations and interval/motion behavior traced. Preserve task routing and progressive numbers. F010/F016/F022/F036. |
| MCP component family (11) / mcpContent | Availability, client cards, sample answers, architecture, permission promises, FAQ and access destinations reviewed; visible status disagrees with later comment/FAQ. F011/F016/F035. |
| ContactForm / BookDemoPopup / lead libraries / db / Prisma | Field collection, labels, Zod, reCAPTCHA, submission lock, failure/input recovery, async persistence/CRM/notification, success, GET privacy, server credentials and startup side effects traced. F001/F004/F005/F028/F034/F035. Demo has a privacy link; contact lacks equivalent near-form notice. |
| CookieConsent / CookieSettingsLink | Current version, optional-off defaults, old-consent migration, persistent storage, custom dialog and footer reopening inspected. F028/F029. No intentional analytics/advertising script activation found in checked source. |
| Blog registry/authors/metadata/components | Ten records, four author profiles, categories, dates, article wrappers, shares and missing images inspected. Nine article clients use animation; pricing pillar is server. F013/F015/F017/F022/F025. |
| PlansSelector / checkout / plans library | Native plan radios, cycle selection, invalid-query fallback, currency/rounding/GST/first-year setup conditions, summary and disabled payment traced. Preserve central catalogue; no purchase is claimed. F014/F027. |
| Pricing / free-cost / coins / ROI calculators | Inputs, tiers, category/country currency, assumption scope, tax/fees, bounds and outputs traced. F006/F020/F027. No pricing truth is certified from code alone. |
| Link and QR generators | Local string/canvas generation, message encoding, URL param, library loading, clipboard success/failure, downloads and generated-state validity reviewed. F026/F027. SVG branch is dormant; current UI promises PNG, so no public SVG defect is alleged. |
| FAQ / careers / template / flow client islands | Search/filter/accordion/expanded states, current-content dates, labels, copy/download action wiring and failure feedback reviewed. F015/F018/F019/F025/F037. |
| LegalDocument / 11 document records | Roles, opt-in, taxes/renewal/refunds, processing/transfers/retention, readiness/security boundaries, signed SLA, pending DPA/provider status, TOC/related links and noindex reviewed. KEEP central structure; OI04/OI05 remain PENDING. |
| SEO configuration and both JSON-LD helper families | Canonical/social helper consumers, actual schema call sites, global graph, free defaults and dormant helpers reviewed. Dormant SEO20/seo2 risks distinguished from emitted page data. F021/F023/F024/F033. |
| Protected shadcn UI / hooks / utility library | Enumerated and reviewed at consumer/primitive-contract level (Radix dialog/sheet/collapsible and input/label/button/toast foundations). No edits. This is not an independent exhaustive accessibility audit of every unused primitive. |
| Package/config/runtime/deploy/version/commit scripts | Build/lint/type policy, lockfiles, standalone tracing, restart scope, deployment locking and rollout/recovery checked in source. Deploy/commit/version mutations were not run. F030/F031/F033/F034/F037. |
| Flow JSON data / registry / Redis | JSON parsing and basic node-reference check passed for all 11 records. Registry limits file choices; Redis has type error and no observed public route consumer. No database/cache connection was made. F031/F037. |
| Existing plans, research, legal owner sheet and prior reports | Used for conflicts and evidence leads; no previous PASS or owner fact carried forward as current verification. Pricing research is a mixed-source document, not a verified September rate card. No replacement plan/register created. |

### 3.5 Interaction inventory and evidence limits

Source contracts reviewed: desktop/mobile navigation and close; skip; demo open/submit/error/success/close; contact validation and submit/retry; consent accept/reject/customize/reopen/save; FAQ category/search/expand; blog search/category/article/share/copy/newsletter; careers filter/expand/apply; plan/billing selection/query fallback; price/country/ROI/coin inputs and reset; link generation/copy/test/QR handoff; QR types/colors/size/generate/PNG/copy; template copy and sample buttons; flow filtering/expand/copy/Use Flow; utility code expand; in-page anchors; external chat/docs/email/telephone/WhatsApp CTAs; illustration controls; not-found recovery.

None was exercised in a current browser session. Disabled checkout is intentionally honest. Flow “Use Flow” and newsletter subscription are unwired promises; template sample controls should communicate their illustrative role. Clipboard recovery differs by component. Direct navigation, hydration, refresh/back, overlays, keyboard/mobile and no-JS still need runtime acceptance (F038), even where source wiring is correct.

## 4. Findings with evidence and acceptance conditions

Findings are grouped by meaning for review, not scheduled as implementation batches. Each has a stable ID. Acceptance below requires a later authorized change and appropriate verification; no proposed condition has been marked passed here.

| ID | Finding | Priority | Severity | Classification | Release impact |
| --- | --- | --- | --- | --- | --- |
| F001 | Contact and demo records have anonymous GET handlers | P1 urgent; P0 if active public exposure | High / personal data | Violation/Risk | Required before acceptance of affected surface |
| F002 | Unsigned webhook can trigger detached deployment | P1 urgent; P0 if active public exposure | Critical / release integrity | Violation/Risk | Required before acceptance of affected surface |
| F003 | SEO-check endpoint accepts arbitrary server fetch targets | P1 urgent | High / SSRF and resource exhaustion | Violation/Risk | Required before acceptance of affected surface |
| F004 | Lead forms can declare success when every downstream action fails | P1 | High / primary conversion | Violation/Risk | Required before acceptance of affected surface |
| F005 | Form dependencies lack bounded recovery and complete abuse/error contracts | P1 | Medium / availability and accessibility | Partial | Required before acceptance of affected surface |
| F006 | Cost calculator applies undocumented aggregate discounts and duplicates rates | P1 | High / financial estimate | Violation/Risk | Required before acceptance of affected surface |
| F007 | Coexistence throughput and eligibility guidance disagree | P1 | High / product decisions | Violation/Risk | Required before acceptance of affected surface |
| F008 | Billing, migration and support answers retain conflicting eras | P1 | High / commercial and operating accuracy | Violation/Risk | Required before acceptance of affected surface |
| F009 | Unqualified numerical SLA and support promises conflict with policy | P1 | High / contractual expectations | Violation/Risk | Required before acceptance of affected surface |
| F010 | Material public claims lack mapped evidence and qualifications | P1 | High / reader trust | Needs Owner Input | Required before acceptance of affected surface |
| F011 | MCP status, discovery and auth advertisements are inconsistent | P1 | High / integration truth | Violation/Risk | Required before acceptance of affected surface |
| F012 | Markdown, llms and MCP summaries drift from public HTML | P1 | High / machine discoverability and truth | Violation/Risk | Required before acceptance of affected surface |
| F013 | Personal and organizational identity claims need public-use provenance | P1 for factual/public-use scope; P2 for empty-profile refinement | Medium / attribution | Needs Owner Input | Required before acceptance of affected surface |
| F014 | Commercial and legal owner inputs remain unresolved | P1 for dependent publication; independent audit complete | High / contract and privacy correctness | Needs Owner Input | Required before acceptance of affected surface |
| F015 | Dates and human-review states have no coherent auditable contract | P1 | Medium / freshness and provenance | Violation/Risk | Required before acceptance of affected surface |
| F016 | Illustrative dashboards and results need honest evidence labels | P1 for proof assertions; P2 for decorative clarity | Medium / misleading product proof | Partial | Required before acceptance of affected surface |
| F017 | Author images are missing and fallback creates an external transfer | P1 for broken social preview/privacy truth; P2 cosmetic avatar | Medium / assets and privacy | Violation/Risk | Required before acceptance of affected surface |
| F018 | FAQ and utility controls have incomplete names and disclosure semantics | P1 | Medium / accessibility | Violation/Risk | Required before acceptance of affected surface |
| F019 | Handmade cookie dialog and careers disclosures need focus/state contracts | P1 | Medium / keyboard operation | Violation/Risk | Required before acceptance of affected surface |
| F020 | Legacy brand-primary backgrounds fail normal white-text contrast | P1 | Medium / readability | Violation/Risk | Required before acceptance of affected surface |
| F021 | Visitor-facing explanations contain internal editorial/governance material | P1 where it misstates assurance; P2 readability | Medium / reader confusion | Violation/Risk | Required before acceptance of affected surface |
| F022 | Whole-client articles and animation can obscure content without JS | P1 for meaningful-content visibility; P2 payload | Medium / rendering and payload | Violation/Risk | Required before acceptance of affected surface |
| F023 | Paid feature schema can emit zero-price offers; dormant helpers manufacture facts | P1 emitted meanings; P2 dormant helper cleanup | High / structured-data truth | Violation/Risk | Required before acceptance of affected surface |
| F024 | Source SEO foundation is coherent but rendered parity and inherited graph need review | P1 applicable correctness; P2 graph simplification | Medium / discoverability | Partial | Required before acceptance of affected surface |
| F025 | Newsletter, flow-use and clipboard success promises are not reliable | P1 primary promised action; P2 incidental sample UI | Medium / interaction integrity | Violation/Risk | Required before acceptance of affected surface |
| F026 | Link and QR tools accept invalid or empty type-specific input | P1 tool correctness | Medium / unusable outputs | Violation/Risk | Required before acceptance of affected surface |
| F027 | Calculator and generated-output edge cases need explicit contracts | P1 consequential calculations; P2 incidental state polish | Medium / outputs and recovery | Partial | Required before acceptance of affected surface |
| F028 | Privacy inventory needs actual transfer/storage scope | P1 factual disclosures | Medium / privacy | Partial | Required before acceptance of affected surface |
| F029 | Consent storage and legacy migration can fail or imply broader consent | P1 usable preferences; P2 migration robustness | Medium / preferences | Violation/Risk | Required before acceptance of affected surface |
| F030 | Application source cannot establish effective edge/security/index policy | P1 unresolved relevant protections; P2 debug cleanup | Medium / reliability and exposure | Partial | Required before acceptance of affected surface |
| F031 | Type and quality gates are currently failing or bypassed | P1 | High / regression detection | Violation/Risk | Required before acceptance of affected surface |
| F032 | Google Sheets guide gives an invalid CSV/IMPORTRANGE procedure | P1 | Medium / reader instruction | Violation/Risk | Required before acceptance of affected surface |
| F033 | SEO validation scripts contain obsolete and false-positive assertions | P1 consequential validation; P2 tooling clarity | Medium / false confidence | Violation/Risk | Required before acceptance of affected surface |
| F034 | Deployment path is mutable, broad and lacks release identity/recovery gates | P1 | High / availability and release integrity | Violation/Risk | Required before acceptance of affected surface |
| F035 | MCP contact CTA loses its requested subject context | P1 conversion correctness | Medium / lead routing | Violation/Risk | Required before acceptance of affected surface |
| F036 | Performance and motion behavior have no current repeatable baseline | P1 missing agreed measurement; P2 source optimizations | Medium / delivery quality | Missing | Required before acceptance of affected surface |
| F037 | Flow route exports and standalone JSON delivery need build verification | P1 if download unavailable; P2 cleanup | Medium / resource availability | Partial | Required before acceptance of affected surface |
| F038 | Responsive, browser, delivery and whole-candidate acceptance evidence is absent | P1 verification requirement; no implementation verdict | Evidence gap | Partial | Required before acceptance of affected surface |
| F039 | Growth, feedback provenance and maintenance ownership are incomplete | P2 | Low / maintainability | Missing | Required ownership for maintained release; growth experiments optional |
| F040 | Blue/indigo styles remain despite project brand prohibition | P1 project-standard compliance; P2 visual refinement | Low / brand consistency | Violation/Risk | Required before acceptance of affected surface |
| F041 | Crawler policy conflates search visibility with training preferences | P1 policy correctness; P2 optional discovery experiments | Medium / discoverability and owner choice | Violation/Risk | Required before acceptance of affected surface |
| F042 | Locked Next version overlaps current security advisory ranges | P1 dependency/release correctness | High conditional; advisory severities vary | Violation/Risk | Required before acceptance of affected surface |

### F001 — Contact and demo records have anonymous GET handlers

**Priority:** P1 urgent; P0 if active public exposure. **Severity:** High / personal data. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/contact/route.ts:128](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/contact/route.ts:128); [src/app/api/demo/route.ts:119](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/demo/route.ts:119).

**Impact:** Both return up to 50 full records without an authentication/authorization guard. Repository has no protecting middleware/proxy. This conflicts with private lead handling; no records were retrieved.

**Remediation direction:** Remove public retrieval or enforce appropriately scoped authenticated access and non-cacheable private responses. Check edge exposure without accessing third-party records.

**Acceptance condition:** Anonymous requests cannot retrieve any record; authorized access is scoped and tested with isolated safe fixtures. Edge route policy and logging are verified.

**Dependencies:** Security owner and implementation authorization; external serving policy verification.

### F002 — Unsigned webhook can trigger detached deployment

**Priority:** P1 urgent; P0 if active public exposure. **Severity:** Critical / release integrity. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/webhooks/github/route.ts:117](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/webhooks/github/route.ts:117); [src/app/api/webhooks/github/route.ts:141](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/webhooks/github/route.ts:141).

**Impact:** No signature/event/schema/replay validation precedes deployment. Malformed payloads proceed. GET/POST disclose project path. File existence can limit execution, so exploitation is not asserted.

**Remediation direction:** Authenticate the exact raw payload before parsing; enforce allowed event/repository/ref, reject malformed/replayed payloads, return a truthful trigger state and minimize public diagnostics.

**Acceptance condition:** Unsigned/bad-signature/wrong-event/malformed payloads never spawn or write files; isolated signed permitted fixture triggers once; health response exposes no private path.

**Dependencies:** Release/security owner; implementation authorization; no real webhook/deploy test in audit.

### F003 — SEO-check endpoint accepts arbitrary server fetch targets

**Priority:** P1 urgent. **Severity:** High / SSRF and resource exhaustion. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/seo-check/route.ts:15](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/seo-check/route.ts:15); [src/app/api/seo-check/route.ts:27](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/seo-check/route.ts:27).

**Impact:** No URL Zod contract, protocol/address/redirect guard or response size bound. A 10-second abort alone does not prevent private-network fetches or oversized responses. No exploit request was sent.

**Remediation direction:** Remove unused endpoint or validate/contain destinations, redirects, resolution and bytes; bound requests and avoid returning misleading results.

**Acceptance condition:** Isolated tests reject unsafe targets and redirect hops without network contact; valid public targets meet byte/time limits and failure states.

**Dependencies:** Security owner; implementation authorization.

### F004 — Lead forms can declare success when every downstream action fails

**Priority:** P1. **Severity:** High / primary conversion. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/contact/route.ts:96](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/contact/route.ts:96); [src/app/api/contact/route.ts:108](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/contact/route.ts:108); [src/app/api/demo/route.ts:88](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/demo/route.ts:88).

**Impact:** All-settled failures are logged but success is returned unconditionally. Contact resets input and demo closes after success; a visitor can believe the request exists when none was accepted. The audit did not submit data.

**Remediation direction:** Define durable acceptance, separate notification delivery, preserve recoverable input on total failure and return an honest retryable outcome.

**Acceptance condition:** Sandbox each persistence/CRM/notification combination; all-failure cannot succeed, durable acceptance has an identifier, input survives failure, receipt language never implies a booked slot or delivered notification.

**Dependencies:** Conversion/data owner; OI09.

### F005 — Form dependencies lack bounded recovery and complete abuse/error contracts

**Priority:** P1. **Severity:** Medium / availability and accessibility. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/lib/recaptcha-client.ts:28](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/recaptcha-client.ts:28); [src/lib/crm-leads.ts:51](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/crm-leads.ts:51); [src/lib/recaptcha.ts:62](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/recaptcha.ts:62); [src/app/contact/ContactForm.tsx:108](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/contact/ContactForm.tsx:108).

**Impact:** Client ready/execute and external lead/notification calls lack an end-to-end timeout. Submit locking helps but no durable idempotency or rate/body-size limits are implemented. Contact noValidate relies on a generic error; demo maps fields. Captcha checks action/score but not hostname/challenge age.

**Remediation direction:** Bound initialization and downstream calls; define duplicate/retry behavior and suitable abuse controls, length limits and actionable field errors. Preserve the existing fail-closed secret/action/score behavior.

**Acceptance condition:** Mock blocked script, unavailable key, stalled verification, malformed/oversized inputs, retry/duplicate and downstream timeout. UI recovers and server returns truthful errors; disabled/invalid states are announced.

**Dependencies:** OI09/OI11; implementation authorization.

### F006 — Cost calculator applies undocumented aggregate discounts and duplicates rates

**Priority:** P1. **Severity:** High / financial estimate. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx:43](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx:43); [src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx:67](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx:67); [src/app/pricing/PricingCostCalculator.tsx:16](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/PricingCostCalculator.tsx:16).

**Impact:** Free calculator discounts all billable categories by total messages (including free service), unlike the pricing widget’s separate utility/auth slabs. At 11,000 India marketing messages it gives 5% off ₹9,494.10 (₹9,019.395 before formatting), while /pricing gives ₹9,494.10. Foreign rates have currency labels without source/rate-conversion evidence.

**Remediation direction:** Use an approved dated rate/eligibility contract across all consumers; explicitly separate platform fees, GST, free windows and category-specific tiers. Label estimates and unsupported currencies appropriately.

**Acceptance condition:** Same scenario yields equivalent results across pages; marketing/free service cannot unlock unrelated discounts; boundary/currency examples match dated primary rate evidence.

**Dependencies:** OI03/OI06; Meta pricing primary fetch was unavailable during audit.

### F007 — Coexistence throughput and eligibility guidance disagree

**Priority:** P1. **Severity:** High / product decisions. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/whatsapp-coexistence/page.tsx:339](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-coexistence/page.tsx:339); [src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx:145](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx:145).

**Impact:** Hybrid page says 5 MPS while restriction guide says 20 MPS. History/device/region constraints elsewhere are absolute and do not share dated product evidence. This is a confirmed conflict, not a determination of the correct current value.

**Remediation direction:** Resolve one scoped dated compatibility contract for hybrid versus standard, account rollout and region; apply to visible FAQ, metadata, schema and alternate formats.

**Acceptance condition:** No contradictory current limits remain; qualifications sit next to each claim; official/account evidence and recheck trigger recorded.

**Dependencies:** OI01/OI06.

### F008 — Billing, migration and support answers retain conflicting eras

**Priority:** P1. **Severity:** High / commercial and operating accuracy. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx:341](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx:341); [src/app/faq/faqData.ts:40](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/faqData.ts:40); [src/app/pricing/page.tsx:63](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/page.tsx:63); [src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx:840](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx:840).

**Impact:** Conversation-model guide conflicts with delivered-message pricing pillar. FAQ requires deactivation instead of explaining coexistence eligibility; onboarding time promises are unconditional. Migration guide sells multi-year discounts absent from primary plan catalogue. Free-window claims need nearby category/window conditions.

**Remediation direction:** Reconcile by mechanism, plan and evidence date; qualify migration and timing; connect related explanations to an approved canonical source. Retain historical content only when labelled historically.

**Acceptance condition:** Route-family sweep including FAQ/header/SEO/MD/MCP finds no current contradictory contract; price/eligibility/discount examples have owner and primary evidence.

**Dependencies:** OI01/OI03/OI06; preserve existing useful URLs.

### F009 — Unqualified numerical SLA and support promises conflict with policy

**Priority:** P1. **Severity:** High / contractual expectations. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/home/ProofBar.tsx:28](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ProofBar.tsx:28); [src/components/landing/home/ProofBar.tsx:36](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ProofBar.tsx:36); [src/app/solutions/busy-google-sheet/page.tsx:55](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-google-sheet/page.tsx:55); [src/lib/legal/documents.ts:698](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/legal/documents.ts:698).

**Impact:** Homepage promises 99.9% SLA and 24×7; solution pages add 99.99%/99.95%; contact and FAQ have differing hours, while SLA says only signed commitments bind. A remote disclaimer does not repair the immediate promise.

**Remediation direction:** Confirm contractual scope and actual support channels/hours; qualify near claim or hold unsupported percentages.

**Acceptance condition:** All marketing/metadata/schema/assistant consumers agree with approved signed-scope language and verified hours; no default numerical guarantee is implied.

**Dependencies:** OI02/OI05.

### F010 — Material public claims lack mapped evidence and qualifications

**Priority:** P1. **Severity:** High / reader trust. **Classification:** Needs Owner Input. **Confidence:** High presence/conflict; underlying facts unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/home/ResultsBand.tsx:50](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ResultsBand.tsx:50); [public/llms.txt:154](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/llms.txt:154); [src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx:524](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx:524); [src/app/flow-builder/page.tsx:94](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/flow-builder/page.tsx:94).

**Impact:** Observed claims include 500+ clients, 10M+ messages, 98% opens, efficiency/ROI/cost reductions, named case outcomes, Meta BSP status, pre-approved templates/100% approval, unlimited capability, residency/certification and hallucination-free results. No evidence/permission/recheck map supports their full scope. They are unsupported here, not proven fabricated.

**Remediation direction:** Extend current fact records rather than create a competing register; distinguish owner reports, estimates, hypothetical examples and externally verified facts. Qualify or hold each unsupported public promise and every equivalent occurrence.

**Acceptance condition:** Each sensitive public statement has exact meaning, source/date/scope/public-use decision/recheck trigger; all occurrences and hidden formats agree. No invented proof replaces removed claims.

**Dependencies:** OI01–OI08; product/commercial/legal/evidence owners by category.

### F011 — MCP status, discovery and auth advertisements are inconsistent

**Priority:** P1. **Severity:** High / integration truth. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/mcp/page.tsx:47](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/mcp/page.tsx:47); [src/components/landing/mcp/mcpContent.ts:22](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/mcpContent.ts:22); [src/app/api/mcp/route.ts:42](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/route.ts:42); [public/.well-known/oauth-authorization-server](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/.well-known/oauth-authorization-server).

**Impact:** Private preview hero/description coexist with Available now for all clients/tools and later source-reported owner confirmation. Marketing /api/mcp advertises executable tools and POST but implements GET descriptor/OPTIONS only. OAuth discovery advertises /api/auth/* and jwks.json absent from source, with no rewrite rules. External MCP product behavior is not audited.

**Remediation direction:** Reconcile dated availability evidence without discarding the July confirmation; distinguish marketing resource discovery from the real gateway; remove or point discovery only to verified endpoints under an approved contract.

**Acceptance condition:** Status is coherent across plans/page/FAQ/schema; advertised endpoints exist with verified protocol/auth behavior or are truthfully resource descriptions. Account/plan prerequisites are explicit.

**Dependencies:** OI01/OI10; external gateway owner; no connected product changes in Phase 1.

### F012 — Markdown, llms and MCP summaries drift from public HTML

**Priority:** P1. **Severity:** High / machine discoverability and truth. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/mcp/pages/[slug]/route.ts:509](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/pages/[slug]/route.ts:509); [src/app/api/mcp/pages/[slug]/route.ts:527](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/pages/[slug]/route.ts:527); [src/app/api/md/[slug]/route.ts:1118](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[slug]/route.ts:1118); [public/llms.txt:88](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/llms.txt:88).

**Impact:** Machine content lists eight tools while HTML exposes four, describes cookies/server processing inaccurately, repeats older product/price/trust claims and maintains independent manual copy. Nine blog markdown outputs contain headers but no substantive body because registry.content is absent. Flat/catch-all available lists also differ.

**Remediation direction:** Generate meaningful alternate representations from the actual approved canonical content or clearly retire unsupported summaries; use one reviewed claim mapping. Optional files need no ranking guarantee.

**Acceptance condition:** All 21 supported markdown/MCP slugs have purposeful parity with HTML; blog bodies carry meaningful content; counts/links/prices/qualifiers/privacy/status and canonical/header policy match.

**Dependencies:** OI01/OI03/OI04; source content contract.

### F013 — Personal and organizational identity claims need public-use provenance

**Priority:** P1 for factual/public-use scope; P2 for empty-profile refinement. **Severity:** Medium / attribution. **Classification:** Needs Owner Input. **Confidence:** High source presence; truth/permission PENDING. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/lib/blog/authors.ts:28](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/authors.ts:28); [src/app/about/page.tsx:136](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/about/page.tsx:136); [src/app/careers/OpenPositionsClient.tsx:31](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/OpenPositionsClient.tsx:31).

**Impact:** Four author identities/roles/bios and Person markup, about leadership names, offices/milestones, six jobs/benefits and rating claims are published without reviewed permission/identity evidence in checked records. Three authors have no current posts.

**Remediation direction:** Verify identities, roles, locations/jobs and permission, or adopt approved organizational authorship. Keep an internal accountable reviewer. Decide whether each empty profile adds reader value.

**Acceptance condition:** Public identity and recruiting statements are approved for their exact scope; profile/social/schema relationships are accurate; no automatic requirement for photos/personal bylines.

**Dependencies:** OI02/OI07/OI08.

### F014 — Commercial and legal owner inputs remain unresolved

**Priority:** P1 for dependent publication; independent audit complete. **Severity:** High / contract and privacy correctness. **Classification:** Needs Owner Input. **Confidence:** High unresolved-record evidence. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [docs/legal-policy-inputs.md:3](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/legal-policy-inputs.md:3); [src/lib/plans.ts:35](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/plans.ts:35); [src/lib/legal/documents.ts:19](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/legal/documents.ts:19).

**Impact:** Existing owner sheet already holds legal entity, DPO/grievance, providers, retention, safeguards, billing/refunds/SLA and AI/MCP unknowns. Fixed effective dates are source labels, not evidence of approval. Trials/renewal/add-on duration and purchase/activation terms need owner approval.

**Remediation direction:** Keep the existing sheet canonical and add only factual decisions in the later authorized phase. Preserve truthful DPA/provider status. Apply project-required review; do not invent a universal counsel gate.

**Acceptance condition:** Dependent public claims/terms have approved facts and implemented behavior evidence; remaining unknowns are held precisely without blocking unrelated fixes.

**Dependencies:** OI02–OI05/OI10; accountable owners PENDING.

### F015 — Dates and human-review states have no coherent auditable contract

**Priority:** P1. **Severity:** Medium / freshness and provenance. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/md/[slug]/route.ts:1076](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[slug]/route.ts:1076); [src/app/sitemap.ts:121](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/sitemap.ts:121); [src/app/api/mcp/pages/[slug]/route.ts:550](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/pages/[slug]/route.ts:550); [src/app/careers/OpenPositionsClient.tsx:42](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/OpenPositionsClient.tsx:42).

**Impact:** Static markdown reports request time as content modification; author sitemap uses joinedAt; MCP uses publication as update; job labels remain “2 days ago” indefinitely. Registry/article/feed dates exist but no revision-linked human approval or publication-history evidence was found. No current automated checks create human review.

**Remediation direction:** Define publication/material update/human review/evidence/capture separately; preserve unknowns and history, tie actual approval to a scoped revision and addendum. Fix date consumers together when authorized.

**Acceptance condition:** No request/deploy/review timestamp masquerades as content update; visible/OG/schema/feed/sitemap dates follow supported mappings; later edits invalidate or add to review appropriately.

**Dependencies:** OI08/OI12; content owner.

### F016 — Illustrative dashboards and results need honest evidence labels

**Priority:** P1 for proof assertions; P2 for decorative clarity. **Severity:** Medium / misleading product proof. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/home/ResultsBand.tsx:39](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ResultsBand.tsx:39); [src/components/landing/mcp/mcpContent.ts:179](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/mcpContent.ts:179); [src/components/landing/GoogleSheetAnimation.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/GoogleSheetAnimation.tsx).

**Impact:** Reconstructed chat/report/Sheet/API scenes and sample results are useful explanations, but fixed demo numbers/statuses must not imply live account performance or customer outcomes. Decorative clickable affordances need an honest role.

**Remediation direction:** Label illustrations/demo values near the relevant scene; publish real approved evidence only when available and helpful. Distinguish mechanism from default behavior.

**Acceptance condition:** Each proof-like scene has factual status/caption/alt text; synthetic numbers are identified; screenshots do not establish every plan/user/state.

**Dependencies:** OI01/OI08; asset/public-use decisions.

### F017 — Author images are missing and fallback creates an external transfer

**Priority:** P1 for broken social preview/privacy truth; P2 cosmetic avatar. **Severity:** Medium / assets and privacy. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/lib/blog/authors.ts:36](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/authors.ts:36); [src/components/blog/AvatarImage.tsx:18](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/AvatarImage.tsx:18); [src/app/authors/[slug]/page.tsx:59](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/authors/[slug]/page.tsx:59).

**Impact:** All four declared local author images are absent. Default-avatar path is also absent. Older flow-builder/Google-Sheets layouts reference missing OG files, but current page metadata overrides these with the generic existing OG image; treat those layout references as stale source, not a proven rendered break. Client error fallback requests ui-avatars.com with an author name, while author Open Graph points to missing images without client fallback.

**Remediation direction:** Use approved existing local artwork/initials or approved assets; remove unsupported external fallback or include its real processing scope. Verify derivative/social image paths.

**Acceptance condition:** Author images and previews resolve without unexpected external requests; no fallback loop on blocked provider; privacy inventory matches behavior and identity permissions.

**Dependencies:** OI07/OI04.

### F018 — FAQ and utility controls have incomplete names and disclosure semantics

**Priority:** P1. **Severity:** Medium / accessibility. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/faq/FAQBrowser.tsx:39](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/FAQBrowser.tsx:39); [src/app/faq/FAQBrowser.tsx:11](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/FAQBrowser.tsx:11); [src/app/solutions/utility/UtilityCodeSandbox.tsx:29](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/utility/UtilityCodeSandbox.tsx:29).

**Impact:** FAQ search is placeholder-only; category/accordion buttons lack selected/expanded/control relationships. Utility expand lacks aria-expanded/controls and its code scroller lacks accessible-region treatment. Country/filter/numeric control names need consumer-level verification.

**Remediation direction:** Add clear labels and programmatic states/relationships at the consumers; preserve protected primitives. Use static discoverable explanations and suitable status announcements.

**Acceptance condition:** Keyboard and accessibility-tree checks identify control purpose/current state; labels persist after input; all disclosures reflect expanded state and reading order.

**Dependencies:** OI11; implementation authorization.

### F019 — Handmade cookie dialog and careers disclosures need focus/state contracts

**Priority:** P1. **Severity:** Medium / keyboard operation. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/CookieConsent.tsx:93](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/CookieConsent.tsx:93); [src/app/careers/OpenPositionsClient.tsx:132](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/OpenPositionsClient.tsx:132).

**Impact:** Cookie preferences declare modal behavior without focus trap, initial focus, Escape handling/restoration or background inertness in source. Careers cards/filter choices lack complete expanded/selection state. Existing Radix demo/Sheet are sound foundations to retain.

**Remediation direction:** Use an accessible modal contract and consumer disclosure states without modifying shadcn files.

**Acceptance condition:** Keyboard focus stays in open preferences, returns to trigger, Escape behaves consistently; screen readers get names/states; careers controls expose selection and expansion.

**Dependencies:** OI11.

### F020 — Legacy brand-primary backgrounds fail normal white-text contrast

**Priority:** P1. **Severity:** Medium / readability. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/globals.css:141](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/globals.css:141); [src/app/faq/FAQBrowser.tsx:63](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/FAQBrowser.tsx:63); [src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:216](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:216).

**Impact:** Calculated sRGB contrast of white on #448C74 is 4.0006:1, below normal-text AA 4.5:1. Shared PrimaryCTA already uses #3A7A64 (5.063:1); several old filters/buttons override with legacy palette. This calculation does not certify every rendered style/state.

**Remediation direction:** Retain working shared CTA contrast; resolve failing actual consumer states and semantic token use.

**Acceptance condition:** Rendered normal/hover/focus/disabled states at supported themes meet applicable contrast; no blanket claim from a single token ratio.

**Dependencies:** OI11; actual rendered/theme verification.

### F021 — Visitor-facing explanations contain internal editorial/governance material

**Priority:** P1 where it misstates assurance; P2 readability. **Severity:** Medium / reader confusion. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/solutions/miracle-whatsapp-api/page.tsx:169](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/miracle-whatsapp-api/page.tsx:169); [src/app/features/chat-shortcuts-conversation-automation/page.tsx:264](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/chat-shortcuts-conversation-automation/page.tsx:264); [src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx:874](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx:874).

**Impact:** Miracle describes a supplied live-token incident; shortcut page addresses AI-search explanation; pricing exposes internal research-file context. Useful setup precautions can be stated without private workflow/commentary.

**Remediation direction:** Preserve public safety/setup facts and move internal decisions/provenance commentary to the owner record. Proofread Wats91 and locale/units during scoped edits.

**Acceptance condition:** Public pages answer the visitor task without private incident/setup history, internal file names or crawler-directed filler; provenance remains in an auditable private record.

**Dependencies:** OI08; protected source wording review.

### F022 — Whole-client articles and animation can obscure content without JS

**Priority:** P1 for meaningful-content visibility; P2 payload. **Severity:** Medium / rendering and payload. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/blog/Animations.tsx:8](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/Animations.tsx:8); [src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx:1](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx:1); [src/components/shared/Reveal.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/Reveal.tsx).

**Impact:** Nine article pages place main explanations behind client Framer initial opacity/whileInView. CSS reduced motion does not itself make opacity-hidden JS sections visible. Whole-page client boundaries add unnecessary hydration compared with server pricing pillar. Shared Reveal already offers a more resilient static baseline.

**Remediation direction:** Keep readable server content and scope interactive/motion islands. Implement reduced-motion/no-JS behavior; distinguish illustrative controls from product actions.

**Acceptance condition:** Initial HTML remains readable with JS disabled/failed; reduced-motion displays all required content; hydrated layout and navigation are verified; measured payload supports changes.

**Dependencies:** OI11; browser/build verification.

### F023 — Paid feature schema can emit zero-price offers; dormant helpers manufacture facts

**Priority:** P1 emitted meanings; P2 dormant helper cleanup. **Severity:** High / structured-data truth. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/lib/seo/config.ts:241](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/config.ts:241); [src/app/mcp/page.tsx:10](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/mcp/page.tsx:10); [src/app/features/chat-shortcuts-conversation-automation/page.tsx:12](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/chat-shortcuts-conversation-automation/page.tsx:12); [src/lib/seo/seo2.ts:213](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/seo2.ts:213).

**Impact:** Active paid feature helper defaults absent offer to 0; Miracle embeds a zero offer. That is different from free tools, where zero is appropriate. Dormant seo2 defaults version 2.0, inferred wordCount and product validUntil; no current consumer was found for those helpers.

**Remediation direction:** Emit only factual applicable offers/entities; do not substitute arbitrary values to satisfy validators. Guard or remove dormant unsupported defaults in a later scoped change.

**Acceptance condition:** Actual rendered paid schema has approved price conditions or no offer; genuinely free tools retain honest free offer; dormant helpers cannot emit invented date/version/count.

**Dependencies:** OI03/OI01; rendered schema check.

### F024 — Source SEO foundation is coherent but rendered parity and inherited graph need review

**Priority:** P1 applicable correctness; P2 graph simplification. **Severity:** Medium / discoverability. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/layout.tsx:6](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/layout.tsx:6); [src/app/blog/layout.tsx:33](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/layout.tsx:33); [src/app/faq/page.tsx:46](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/page.tsx:46).

**Impact:** Root graph appears on every route; blog hub schema/breadcrumbs inherit into articles; FAQ schema includes first 20 answers but JS category/collapsed visibility differs. Main-content IDs are absent on 23 direct-main page modules (design preview has no shell); Header skip link needs JS fallback on those. Source metadata helpers and sitemap are positive, but output truth/duplication/status are unverified.

**Remediation direction:** Validate initial DOM and rendered semantic graph for every intended route; scope page-specific entities appropriately; restore native skip targets and ordinary content/link semantics.

**Acceptance condition:** Current build crawl has intended status, one correct canonical/main heading, honest page entities, matching FAQ text, truthful robots/social images and working fragments/skip navigation.

**Dependencies:** OI11; production-like preview; do not count hydration strings as visible nodes.

### F025 — Newsletter, flow-use and clipboard success promises are not reliable

**Priority:** P1 primary promised action; P2 incidental sample UI. **Severity:** Medium / interaction integrity. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/blog/page.tsx:313](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/page.tsx:313); [src/app/chatbot-flows/ChatbotFlowLibrary.tsx:171](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/chatbot-flows/ChatbotFlowLibrary.tsx:171); [src/app/whatsapp-templates/TemplateCard.tsx:59](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-templates/TemplateCard.tsx:59); [src/components/blog/ShareButtons.tsx:24](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/ShareButtons.tsx:24).

**Impact:** Newsletter has input/button and weekly/unsubscribe promises without a submit contract. Use Flow has no handler/destination. Template copy sets copied without awaiting/catching permission failure; blog share has no catch; flow copy errors reach console only. Template message-action buttons are illustrative but look actionable.

**Remediation direction:** Wire authorized real outcomes or clearly mark/replace unavailability; await clipboard success, announce failure and expose manual-copy recovery. Identify sample controls as examples.

**Acceptance condition:** Every enabled button performs the promised action or states availability; denied clipboard/network reports failure and preserves usable content; newsletter privacy/delivery verified only if actually authorized.

**Dependencies:** OI09/OI04; no subscription service or external messaging activated in audit.

### F026 — Link and QR tools accept invalid or empty type-specific input

**Priority:** P1 tool correctness. **Severity:** Medium / unusable outputs. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/tools/whatsapp-link-generator/WhatsAppLinkGeneratorClient.tsx:49](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-link-generator/WhatsAppLinkGeneratorClient.tsx:49); [src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:61](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:61); [src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:77](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:77).

**Impact:** Link generator only requires a nonempty cleaned string and retains misplaced plus signs; QR blank URL becomes https://, blank WhatsApp becomes wa.me/, blank email/tel/WiFi generate nonempty wrappers. WiFi delimiter escaping and color contrast/scannability are not validated.

**Remediation direction:** Validate each required payload before construction and communicate errors near fields; treat arbitrary QR text distinctly from navigable URLs/phone formats.

**Acceptance condition:** Safe examples for each type generate scannable content; empty/invalid type data cannot produce successful output; clipboard denial/download fallback remain honest.

**Dependencies:** OI11; sandbox/local QR scans, no messages.

### F027 — Calculator and generated-output edge cases need explicit contracts

**Priority:** P1 consequential calculations; P2 incidental state polish. **Severity:** Medium / outputs and recovery. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/pricing/PricingCostCalculator.tsx:75](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/PricingCostCalculator.tsx:75); [src/app/tools/lead-qualification-roi-calculator/ROICalculatorClient.tsx:84](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/lead-qualification-roi-calculator/ROICalculatorClient.tsx:84); [src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:111](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx:111).

**Impact:** /pricing parseInt allows negative typed values despite HTML min. ROI forces at least one qualified lead even at a 0% assumption and cost inputs lack uniform clamping. QR generated=true is not invalidated on edited data/type/colors, so an old canvas can be downloaded as if current. Wide plans/partner/coin tables need accessible scroller and labels; geometry was not observed.

**Remediation direction:** Define finite/nonnegative bounds, zero-qualification meaning and stale-result status; preserve central GST/money logic and labelled wide-data access.

**Acceptance condition:** Boundary/zero/extreme/blank cases yield finite meaningful values or explicit unavailable results; changing QR inputs cannot silently download stale output; calculations/labels and keyboard scrollers verified.

**Dependencies:** OI03/OI11.

### F028 — Privacy inventory needs actual transfer/storage scope

**Priority:** P1 factual disclosures. **Severity:** Medium / privacy. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/BookDemoPopup.tsx:125](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/BookDemoPopup.tsx:125); [src/lib/crm-leads.ts:51](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/crm-leads.ts:51); [src/lib/bot-master.ts:47](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/bot-master.ts:47); [src/components/blog/AvatarImage.tsx:18](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/AvatarImage.tsx:18).

**Impact:** Global footer mounts demo with afterInteractive reCAPTCHA when configured, so third-party script can load before opening a form. Contact/demo send approved fields to local DB, graph CRM and notification provider; avatars add external name transfer. Tools processing is local but whole-site “no server data/cookies” is too broad. Actual provider role/location/policy needs owner verification; no names inferred into a legal subprocessor register.

**Remediation direction:** Create a minimal actual processing inventory tied to existing legal owner sheet; align form notices, security classification, loading and privacy wording with approved scope.

**Acceptance condition:** Observed requests/storage match statements for each route/state/consent choice; no unexpected optional trackers; transfer purpose/fields and authorized providers confirmed.

**Dependencies:** OI04/OI05/OI09; privacy/technical owners.

### F029 — Consent storage and legacy migration can fail or imply broader consent

**Priority:** P1 usable preferences; P2 migration robustness. **Severity:** Medium / preferences. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/CookieConsent.tsx:27](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/CookieConsent.tsx:27); [src/components/landing/CookieConsent.tsx:79](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/CookieConsent.tsx:79).

**Impact:** Persistent storage accesses are not all inside recovery guards. Legacy accepted maps to optional categories true without recorded category-specific provenance. Current optional defaults are off and policy says inactive, which should be retained; this is not evidence trackers are firing.

**Remediation direction:** Handle blocked/corrupt storage and migration scope explicitly; do not treat generic notice acceptance as proven granular consent.

**Acceptance condition:** Preferences render/reopen/save under storage denial/corruption; supported migration neither broadens consent nor activates unsupported optional processing.

**Dependencies:** OI04; actual storage/browser checks.

### F030 — Application source cannot establish effective edge/security/index policy

**Priority:** P1 unresolved relevant protections; P2 debug cleanup. **Severity:** Medium / reliability and exposure. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [next.config.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next.config.ts); [src/app/api/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/route.ts); [src/app/design-system/page.tsx:31](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/design-system/page.tsx:31).

**Impact:** No app header policy, environment-aware indexing switch or protecting auth middleware was found. HTTPS/redirect/CSP/framing/nosniff/referrer/HSTS and CDN/WAF policy may be served elsewhere. Internal design preview is noindex but public, not private; Hello world is a leftover debug route. No secret values were inspected.

**Remediation direction:** Assign serving-layer ownership and inspect effective policies before a release; choose controls for actual scripts/forms/media and approved host scope. Remove or clearly justify public debug/discovery routes.

**Acceptance condition:** Effective live and preview headers/index rules have accountable ownership and no conflicts; intended private routes enforce access; journeys still work after policy changes; HSTS scope is explicitly justified.

**Dependencies:** OI05/OI10/OI11; release/edge authority needed for changes.

### F031 — Type and quality gates are currently failing or bypassed

**Priority:** P1. **Severity:** High / regression detection. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [next.config.ts:8](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next.config.ts:8); [eslint.config.mjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/eslint.config.mjs); [tsconfig.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/tsconfig.json); [src/lib/redis.ts:14](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/redis.ts:14).

**Impact:** Current full ESLint fails with three errors; noEmit type check fails with seven diagnostics, including application webhook/Redis and missing example socket dependencies. Build ignores type errors and strict-mode is disabled. Several lint checks are suppressed. No dedicated test/typecheck scripts or behavioral test suite was found. These are existing baseline failures, not report-caused regressions.

**Remediation direction:** Decide proper example scope and production checks; fix substantive source errors and restore meaningful contract checks without sentence-pinning or unrelated upgrades.

**Acceptance condition:** Agreed lint/types and relevant behavior checks pass on current candidate; build cannot silently accept consequential errors; exclusions are deliberate and documented.

**Dependencies:** Implementation authorization; runtime/build owner.

### F032 — Google Sheets guide gives an invalid CSV/IMPORTRANGE procedure

**Priority:** P1. **Severity:** Medium / reader instruction. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx:186](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx:186).

**Impact:** IMPORTRANGE imports ranges from a Google spreadsheet URL, not a standalone scheduled CSV export. The official function documentation was checked on audit date. Users cannot follow the named procedure as written.

**Remediation direction:** Provide a verified import mechanism for the intended input, distinguish CSV from spreadsheet references and qualify scheduling/limits.

**Acceptance condition:** A safe documented example works from the actual input type; prerequisites and failure path are accurate; all FAQ/metadata/alternate instructions agree.

**Dependencies:** Product/content owner; official Google source in section 8.

### F033 — SEO validation scripts contain obsolete and false-positive assertions

**Priority:** P1 consequential validation; P2 tooling clarity. **Severity:** Medium / false confidence. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [scripts/verify-ai-readiness.mjs:8](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/verify-ai-readiness.mjs:8); [scripts/seo-validation/crawl-sitemap.sh:26](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/crawl-sitemap.sh:26); [src/app/api/seo-check/route.ts:152](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/seo-check/route.ts:152).

**Impact:** AI readiness reads the page wrapper rather than moved rate client and expects homepage Product while schema checker forbids it. Full-source check fails three expectations. grep -c counts matching lines, not minified tag occurrences; some endpoint/link scripts can pass empty/failed retrieval. SEO-check hardcodes robots/sitemap pass without fetching them and equates viewport with mobile readiness.

**Remediation direction:** Test actual current rendered contracts and meaningful occurrences; fail clearly on fetch/no inventory; retire ranking/AI claims and invented pass scores.

**Acceptance condition:** Known-good/known-bad isolated HTML/endpoints produce accurate diagnostics; tools distinguish not checked from pass; current canonical contracts are consistent.

**Dependencies:** Source/check ownership; no application behavior changes authorized here.

### F034 — Deployment path is mutable, broad and lacks release identity/recovery gates

**Priority:** P1. **Severity:** High / availability and release integrity. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [scripts/deploy.js:58](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/deploy.js:58); [scripts/deploy.js:207](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/deploy.js:207); [scripts/deploy.js:234](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/deploy.js:234); [src/lib/db.ts:54](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/db.ts:54).

**Impact:** Deploy fetches/reset latest main, copies directories in place (copy failures may be warnings), deletes build/cache before rebuild, runs npm install and restarts all PM2 apps. No exact-candidate readiness/rollback acceptance is implemented. Startup DB helper can create directories/tables asynchronously; build script copies .env to standalone. None ran.

**Remediation direction:** Use approved isolated candidate/build and scoped restart/recovery contracts; bound lock/notification calls; ensure ignored deployment files and private env have deliberate ownership and permissions. Review startup initialization/migrations separately.

**Acceptance condition:** Release evidence identifies exact deployed revision; failure preserves/reverts usable candidate; only intended service restarts; private artifact rules and database startup/error behavior verified.

**Dependencies:** Release/data owner; future explicit deploy authority; no cross-project changes.

### F035 — MCP contact CTA loses its requested subject context

**Priority:** P1 conversion correctness. **Severity:** Medium / lead routing. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/components/landing/mcp/mcpContent.ts:380](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/mcpContent.ts:380); [src/app/contact/ContactForm.tsx:12](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/contact/ContactForm.tsx:12).

**Impact:** CTA passes ?subject=Whats91 MCP Access, but form has no search-param initialization and uses a fixed select list. The visitor must re-explain the MCP access request; button says connect although actual outcome is contact.

**Remediation direction:** Align CTA with real request/access journey and preserve approved context in a supported field without putting personal information in URLs.

**Acceptance condition:** MCP CTA leads to clearly described access request with correct prefilled routing/context; refresh/back preserve expected state; success is request acceptance, not connected gateway.

**Dependencies:** OI01/OI09/OI10.

### F036 — Performance and motion behavior have no current repeatable baseline

**Priority:** P1 missing agreed measurement; P2 source optimizations. **Severity:** Medium / delivery quality. **Classification:** Missing. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/globals.css](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/globals.css); [src/components/landing/AnimatedAPIArchitecture.tsx:61](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedAPIArchitecture.tsx:61); [src/components/blog/Animations.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/Animations.tsx).

**Impact:** 1151-line global CSS contains family-specific scenes; global script/graph consumers and whole-client articles may cost work. Inter Latin subset/responsive explicit images and dynamic QR import are positives. No current transfer/hydration/long-task/cache/LCP/INP/CLS measurements or approved per-family budgets exist in this audit. Large source does not by itself prove poor field performance.

**Remediation direction:** Measure equivalent recorded profiles before choosing optimizations; scope resources to consumers and reduce unnecessary work; add reduced-motion/pause behavior for relevant scenes.

**Acceptance condition:** Repeated cold/nav lab evidence covers home/conversion/heavy families and approved budgets; field p75 is separately reported or honestly unavailable; no claimed CWV pass from source or warm cache.

**Dependencies:** OI11; production-like preview; no numeric bundle budget invented.

### F037 — Flow route exports and standalone JSON delivery need build verification

**Priority:** P1 if download unavailable; P2 cleanup. **Severity:** Medium / resource availability. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/app/api/flows/[id]/route.ts:50](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/[id]/route.ts:50); [src/app/api/flows/[id]/route.ts:32](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/[id]/route.ts:32); [next.config.ts:14](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next.config.ts:14).

**Impact:** LIST is a nonstandard route-handler export; JSON reads depend on src/lib/flows/json at runtime and file tracing includes only an explicit version-file rule. Next may infer dynamic file dependencies, so missing packaged data or a build rejection is a risk, not a proved outage. Eleven source JSON files parse and registry selection prevents arbitrary path lookup.

**Remediation direction:** Remove invalid route exports when authorized and verify trace/package file presence plus safe fetch/404 behavior in standalone.

**Acceptance condition:** Current production build accepts route exports and all 11 JSON routes return expected safe data from standalone; unknown IDs are 404 and copy errors are visible.

**Dependencies:** Build owner; OI11; fresh build not executed in audit.

### F038 — Responsive, browser, delivery and whole-candidate acceptance evidence is absent

**Priority:** P1 verification requirement; no implementation verdict. **Severity:** Evidence gap. **Classification:** Partial. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_MASTER_PLAYBOOK.md:375](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_MASTER_PLAYBOOK.md:375); [scripts/seo-validation/README.md](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/README.md).

**Impact:** No fresh preview/build or route-wide browser screenshots/interaction tests exist for this checked revision. All five widths, Chromium/Firefox/Safari, physical device and screen-reader combinations are untested; external CTA responses, forms/receipt, HTTP redirects/headers/unknown statuses, no-JS/reflow/forced colors and edge cache remain unknown. Prior reports are not current evidence.

**Remediation direction:** In a later authorized acceptance phase, prepare a fresh isolated production-mode candidate and record coverage by route/family/risk/state, while respecting real-submit and connected-product boundaries.

**Acceptance condition:** Whole-inventory static/DOM checks and defined screenshot/interaction/device matrix have current artifacts; real delivery tested only with approved recipient/data; untested combinations remain visible.

**Dependencies:** OI09/OI10/OI11; preview/build scope authorization.

### F039 — Growth, feedback provenance and maintenance ownership are incomplete

**Priority:** P2. **Severity:** Low / maintainability. **Classification:** Missing. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required ownership for maintained release; growth experiments optional.

**Evidence:** [src/app/faq/faqData.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/faqData.ts); [docs/legal-policy-inputs.md](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/docs/legal-policy-inputs.md).

**Impact:** Useful FAQs exist, but no minimized genuine-question provenance/date-range/resolution record, accountable cross-domain review ownership or maintenance triggers were found. No actual customer record was read; proposed FAQ text is not evidence of recurring customer confusion.

**Remediation direction:** Assign owners/triggers and retain only approved anonymized summaries when available. Defer unsupported growth claims and avoid filler/testimonials/profile quotas.

**Acceptance condition:** Each claim/content/media/crawler/header owner and recheck trigger exists; reader input distinguishes actual recurring evidence from proposed questions; field/search follow-up is authorized and separately measured.

**Dependencies:** OI08/OI11/OI12; optional intake only if useful.

### F040 — Blue/indigo styles remain despite project brand prohibition

**Priority:** P1 project-standard compliance; P2 visual refinement. **Severity:** Low / brand consistency. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [src/lib/flows/registry.ts:24](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/registry.ts:24); [src/components/blog/BlogCard.tsx:19](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/BlogCard.tsx:19); [src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx:344](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx:344).

**Impact:** Blog categories, guide cards and flow registry still use explicit blue utilities outside protected UI. This directly conflicts with AGENTS. It does not justify changing protected primitives or unrelated palette values mechanically.

**Remediation direction:** Use approved semantic brand/functional colors in actual consumer states during an authorized scoped change.

**Acceptance condition:** All affected rendered states comply with approved brand and contrast; protected UI files untouched; meaningful semantic distinctions preserved.

**Dependencies:** Brand owner; OI11.

### F041 — Crawler policy conflates search visibility with training preferences

**Priority:** P1 policy correctness; P2 optional discovery experiments. **Severity:** Medium / discoverability and owner choice. **Classification:** Violation/Risk. **Confidence:** High for source behavior; runtime exposure unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [public/robots.txt:34](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/robots.txt:34); [public/robots.txt:136](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/robots.txt:136).

**Impact:** Robots comments call allowing Google-Extended critical for AI Overviews, contrary to current official purpose. OAI-SearchBot has no explicit group while training bots have broad named rules; wildcard blocks essential Next resources. That is a policy review risk, not proof every provider is blocked or indexed.

**Remediation direction:** Record owner search/training/retrieval preferences separately, reconcile modern tokens and essential resources with headers/WAF/auth, and maintain optional llms/resource files only if useful.

**Acceptance condition:** Dated official purpose matrix and explicit owner decisions govern each effective rule; approved search resources are accessible at serving layers; no training access described as a ranking prerequisite; actual logs/index evidence kept separate.

**Dependencies:** OI10; current official sources in section 8.

### F042 — Locked Next version overlaps current security advisory ranges

**Priority:** P1 dependency/release correctness. **Severity:** High conditional; advisory severities vary. **Classification:** Violation/Risk. **Confidence:** High locked-version and range match; actual exploit conditions unverified. **Release impact:** Required before acceptance of affected surface.

**Evidence:** [package-lock.json:11182](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/package-lock.json:11182); [next.config.ts:5](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next.config.ts:5); [src/app/solutions/miracle-whatsapp-api/page.tsx:765](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/miracle-whatsapp-api/page.tsx:765).

**Impact:** Next 16.1.6 overlaps official image-optimizer DoS and RSC-cache ranges and the AVIF optimization RCE range. Source uses Next Image/default optimization; public supplied images are PNG/SVG, so attacker-controlled AVIF and large-file prerequisites are not established. No Server Actions or next/og ImageResponse were found; the September ImageResponse RCE starts at 16.2.0 and does not match 16.1.6. Full npm advisory query failed DNS; selected primary advisories were reviewed as fallback, not a complete clean scan.

**Remediation direction:** In a separately authorized dependency change, assess actual serving/image/cache prerequisites and current supported patched candidate; verify all lockfiles/build/journeys and rollback. Do not label every published advisory exploitable just from version, or upgrade silently in this audit.

**Acceptance condition:** Supported dependency candidate and complete applicable advisory review are recorded; relevant optimizer/cache protections verified safely; excluded advisory prerequisites are documented; whole-site build and affected journey checks pass before release.

**Dependencies:** Security/release owner; OI05/OI10/OI11; primary advisory matrix below.

## 5. Claim occurrence map and owner-input register

This is an audit occurrence map, not a new competing canonical claims register. Extend the existing owner sheet and current product sources only after authorization. “PENDING” means the specific claim cannot be treated as verified/public-approved/implemented merely from its presence in source.

| Claim family / findings | Consumers to reconcile | Exact missing authority |
| --- | --- | --- |
| Availability / MCP / F011 | mcpContent and page/metadata/FAQ/schema; plans/checkout feature inclusion; home integrations/features; public OAuth discovery and /api/mcp; current/legacy plan docs | Current scope, gateway identity, provider compatibility, account/plan prerequisites and meaning of later July source-reported approval. |
| Meta identity / scale / F010 | AGENTS project summary; home hero/proof/results; About; Header product summaries; solutions; global JSON-LD; llms; MD/MCP summaries | Official designation and public-use entitlement; scale metric definition/date/population and performance conditions. |
| Prices / billing / F006–F008 | plans library, pricing page/widget, cost tool, partners/coins, FAQ, pricing pillar/registry research, legacy guides, schemas, MD/MCP | Dated rate card/category tiers/currency; passed-through charges; approved platform/add-on fees, discounts, tax and billing terms. |
| SLA / support / F009 | ProofBar, About, FAQ, Contact, busy-google-sheet/ecommerce, llms/MD/MCP, Terms/SLA | Signed-scope availability evidence and current channels/hours; default versus enterprise commitments. |
| Privacy/security / F001–F003/F010/F014/F028 | TrustBand; legal/privacy/security/DPA/provider status; llms; tools/MCP summaries; lead forms/recaptcha/CRM/notification/avatar requests | Actual controls/provider roles/locations/retention; certification/residency evidence, client/server collection boundaries. |
| Outcomes / F010/F016 | ResultsBand; solution features; ROI/calculator defaults; named Busy case example; calling/flow-builder/Sheet claims; article FAQs and summary copies | Real measured baseline/sample/time range/permission; hypothesis or illustrative status where no proof exists. |
| Template/flow readiness / F010/F025 | Templates page/cards/schema; llms, md, mcp descriptors/summaries; flow library/JSON/Use Flow | Example versus WABA-approved template; import prerequisites, supported runtime and real deployment/action destination. |
| Identity / people / F013/F017 | Authors registry/profile/Card/Person/social preview; about leadership; careers job/benefit/rating copy; organization graph/footer | Truth of role/location/biography and permission to publish exact identity/assets; job availability and review dates. |
| Platform/legal changes / F007/F008/F015/F022/F032 | Coexistence/resource FAQs, logout/username/Graph/Plus guides, old Cloud guide, utility code, Sheet instructions | Current primary dated source, region/account/version constraints, capture versus inference, stale forecast handling. |

| Input ID | PENDING fact / decision | Accountable role (named owner PENDING) | Dependent scope | Safe interim treatment |
| --- | --- | --- | --- | --- |
| OI01 | Shipped product/integration capabilities, MCP status and exact Meta designation | Product / integration owner | F007/F008/F010/F011/F016/F023/F035 | Keep conflicting evidence visible internally; hold/qualify only dependent promises; do not alter connected products. |
| OI02 | Legal/operator identity, address/offices, contacts/hours and recruiting claims | Business / people operations owner | F009/F013/F014 | Retain current source as reported rather than verified; resolve contradictions before public approval. |
| OI03 | Plan/add-on fees, durations, currencies, trials, tax, renewals, discounts and activation path | Commercial / finance owner | F006/F008/F014/F023/F027 | Keep disabled checkout honest; no implied self-service payment, trial terms or unsupported tier discount. |
| OI04 | Actual privacy transfer/storage inventory, providers/locations/retention and consent decisions | Privacy / technical owner | F014/F017/F028/F029 | Use existing docs/legal-policy-inputs.md; do not populate provider register by code inference. |
| OI05 | Security/availability assurance evidence, incident/recovery, SLA and legal review requirements | Security / release / legal owner | F001–F003/F009/F010/F014/F030/F034 | No certified/residency/universal numerical promise without verified scoped evidence. |
| OI06 | Dated Meta platform/rate/eligibility and regulatory source verification | Product documentation / compliance owner | F006–F008/F010/F015/F022 | Keep unresolved current value PENDING; primary pricing pages inaccessible here; do not rely on cached third-party tables. |
| OI07 | Individual names/roles/photos/bios/social profiles permission or organizational authorship | Content / individuals / business owner | F013/F017 | Organizational byline is valid; no requirement to manufacture people, photos or experience. |
| OI08 | Genuine customer result evidence, publication permissions, media origin/capture/context | Evidence / content owner | F010/F013/F016/F021/F039 | Illustrations are not customer proof; retain safe screenshots as observed but public provenance remains PENDING. |
| OI09 | Durable enquiry acceptance contract, sandbox/safe recipient, dedup/retention and real delivery authority | Sales / support / technical owner | F004/F005/F025/F028/F035/F038 | No real forms/messages in this phase; define acceptance distinct from booked/sent/delivered. |
| OI10 | External destinations, real gateway/auth endpoints, edge/CDN/release and webmaster authority | Integration / infrastructure owner | F011/F030/F034/F035/F038 | No authenticated product or serving-layer changes, deployment or search submissions. |
| OI11 | Browser/device/a11y support policy, preview configuration and per-family performance budgets | Engineering / design / accessibility owner | F005/F018–F020/F022/F024/F026/F027/F030/F036–F038/F040 | Use stated default review widths as untested requirements; no conformance or CWV pass claimed. |
| OI12 | Publication/material-update/review/evidence/capture mapping, accountable reviewer and maintenance triggers | Editorial / operations owner | F015/F039 | Preserve supported dates and correction history; unknown dates remain unknown; no fake review event. |

## 6. Playbook requirement-by-requirement coverage

### 6.1 Catalogue area verdicts

| Area | Verdict | Classification | Evidence / findings |
| --- | --- | --- | --- |
| Q1 Human-first usefulness | NEEDS WORK | Partial | Every route has task/disposition; mechanism/setup content to retain; qualifications, evidence status, repetition and internal commentary need work (F008/F010/F016/F021/F032). |
| Q2 Claims and consistency | NEEDS WORK | Violation/Risk | Cross-page occurrence map and conflicts established (F004/F006–F014). Approvals PENDING. |
| Q3 Authorship/review/dates | NEEDS WORK | Violation/Risk | Source dates exist; publication provenance/approval model missing and runtime/job/join dates misused (F013/F015). |
| Q4 Architecture/SEO/schema | NEEDS WORK | Partial | PASS at source for 63/59 route/sitemap reconciliation and many metadata helpers. Output/semantics incomplete (F011/F017/F023/F024/F033/F038). |
| Q5 AI discovery/crawler policy | NEEDS WORK | Violation/Risk | Dated official purposes checked; current robots/assistant copy conflate purposes and drift. F010/F011/F012/F041; see section 8. |
| Q6 Design/responsive/accessibility | NEEDS WORK | Partial | Shared primitives and some accessible foundations present; source contrast/state/focus issues F018–F020/F024/F040. Responsive/browser evidence PENDING (F038). |
| Q7 Functional journeys | NEEDS WORK | Violation/Risk | All distinct interactions inventoried in source; false acceptance/dead actions/recovery/output gaps F004/F005/F025–F029/F035. Runtime not tested. |
| Q8 Performance | PENDING EVIDENCE | Missing | No reproducible current lab/field profile or budget; source risks distinguished from actual slowness (F036/F038). |
| Q9 Security/privacy/reliability | NEEDS WORK | Violation/Risk | Proportionate source review finds concrete guard/deploy/transfer issues F001–F003/F028–F031/F034. Edge behavior PENDING; selected primary dependency advisories mapped in F042. |
| Q10 Product media | NEEDS WORK | Partial | PNG pixels/dimensions/hashes inspected; safe token placeholders observed. Public-use/capture provenance/mobile legibility missing (F016/F017; section 7). |
| Q11 Reader input/growth | PENDING EVIDENCE | Missing | No genuine-reader provenance or owners/triggers; proposed FAQs valid but not customer evidence (F039). |

### 6.2 Detailed requirement matrix

Requirement IDs below are audit references to the playbook catalogue, not new implementation contracts. Related bullets are explicitly named together when the same evidence and classification applies. Playbook sections 1–6 and 18–24 are assessed separately after Q1–Q11.

| Requirement | Playbook obligation | Classification | Evidence / findings / limit |
| --- | --- | --- | --- |
| Q1.01 | Every page: reader, purpose, decision, credible evidence, honest action | Partial | Route ledger maps tasks/actions; proof/publication evidence gaps F010/F014/F016. |
| Q1.02 | Blocks have KEEP/REFINE/REPLACE/REMOVE/PENDING/PROTECTED with reasons | Present/Compliant | Route dispositions and section 7 KEEP list; no mechanical detector judgement. REMOVE applies only to obsolete unsupported artifacts when approved, not whole URLs. |
| Q1.03 | Answer early; concrete behavior, conditions and limitations | Partial | Setup/mechanism sections useful; unconditional availability/free/accuracy claims F008/F010/F011. |
| Q1.04 | Define unfamiliar terms; audience language; no keyword stuffing | Partial | ERP/MCP/Meta distinctions present; repetitive alias/AI-search sections F021; long jargon-led guides F022. |
| Q1.05 | Material qualifications adjacent to claim | Violation/Risk | SLA/free/approval and guaranteed outcomes not fixed by legal disclaimer elsewhere F008–F010. |
| Q1.06 | Natural comprehension; no arbitrary sentence/punctuation/detector targets | Present/Compliant | Audit uses reader task/mechanism, not detector scores; no such target required by source authority. |
| Q1.07 | Remove empty slogans, repeated intros, superlatives/defensive filler | Partial | Useful task-specific content coexists with exaggerated/repetitive feature/guide copy F010/F021/F022. |
| Q1.08 | Shared terminology consistent; different structures for different tasks | Partial | Central plans/legal/primitives positive; billing/status/FAQ differences F006–F012. |
| Q1.09 | Examples: actual permissioned versus hypothetical/illustrative | Needs Owner Input | Named Busy case and proof dashboards lack approval map F010/F016; OI08. |
| Q1.10 | Explain useful trade-offs; keep governance commentary out of pages | Violation/Risk | Coexistence/accepted-delivered distinctions KEEP; internal token/research/crawler commentary F021. |
| Q1.11 | Proofread spelling/grammar/units/locale; no deliberate errors | Partial | Wats91/mixed number/date conventions and stale terminology require scoped proofread; F008/F021. |
| Q1.12 | No forced personal byline/story/photo; useful distinct content not word-count quota | Present/Compliant | Organizational option retained; profiles require approval, not compulsory invention; F013/OI07. |
| Q1.13 | Home/overview: offering, audience, differentiation, proof, clear next step | Partial | Home route/task routing clear; results/SLA evidence needs work F009/F010/F016. |
| Q1.14 | Product/feature/integration: behavior/setup/inputs/outputs/scope/limits/proof | Partial | Miracle/shortcut mechanisms strong; current capabilities and limits PENDING F007/F010/F011/F016. |
| Q1.15 | Role/use-case/industry/location: distinct context, no implied false presence | Needs Owner Input | Solution contexts differ; named offices/jobs and case examples OI02/OI08; F013. |
| Q1.16 | Pricing/trial/purchase: conditions and implemented path/calculations | Violation/Risk | Central plan summary honest; estimate/discount/trial contracts unresolved F006/F008/F014/F027. |
| Q1.17 | Guide/blog: question/answer/contribution/citations/truthful dates | Partial | Ten route-specific questions; stale forecasts and conflicting rates/instructions F008/F015/F022/F032. |
| Q1.18 | Comparisons: dated primary evidence, comparable scope, fair uncertainty | Needs Owner Input | BSP/ROI/platform comparisons lack adequate shared dated primary approval evidence; OI03/OI06/OI08. |
| Q1.19 | Trust/legal: current approved facts, boundaries/status/review | Partial | Conservative central documents/status KEEP; existing owner sheet unresolved F014. |
| Q1.20 | About/contact: verified identity/channels/hours/public attribution | Needs Owner Input | Source channels present; inconsistent hours/identity/leadership evidence F009/F013/OI02. |
| Q1.21 | Forms/utility: exact action/necessary data/errors/recovery/privacy/truthful success | Violation/Risk | F004/F005/F025–F029; source validation positives do not prove receipt. |
| Q1.22 | Hub useful routing/value; no filler to populate empty hub | Partial | Tools/legal/blog navigation useful; empty author profiles require deliberate value/index decision F013. |
| Q2.01 | One lightweight claims register across copy/FAQ/captions/alt/meta/schema/download/UI | Missing | Existing legal owner sheet is partial; section 5 occurrence map exposes uncovered sensitive families F010/F014. |
| Q2.02 | Meaning/source/evidence date/scope/public decision/consumers/recheck/status per claim | Missing | No complete mapped VERIFIED/QUALIFIED/PENDING/REJECTED/EXPIRED model; OI01–OI12. |
| Q2.03 | Capability/default/plan inclusion/availability separated | Violation/Risk | MCP statuses and plan inclusion F011; trial/capability claims F010/F014. |
| Q2.04 | Undocumented versus nonexistent; automation versus authorized manual actions | Partial | No product absence inferred from this repo; source API discovery advertised execution F011. |
| Q2.05 | Specific collection path versus every information occurrence | Violation/Risk | Machine tools “no data/cookies” overlooks whole-site transfers F012/F028. |
| Q2.06 | Observation/inference; missing versus zero; freshness/current state | Violation/Risk | ROI zero-qualified forced to 1, sample proof, stale dates/forecasts F015/F016/F027. |
| Q2.07 | Received/scheduled/approved/delivered/paid/completed separated | Violation/Risk | F004 false acceptance; F025 dead actions. Pricing article and disabled checkout are KEEP. |
| Q2.08 | Notice acknowledgement/consent/agreement distinguished | Partial | Demo “agree to Privacy” and old cookie acceptance migration require exact legal/consent meaning; F029/OI04. |
| Q2.09 | Organization policy versus universal rule; shipped versus proposed/legacy | Violation/Risk | Default SLA/limits; MCP preview/available and old billing instructions F008/F009/F011. |
| Q2.10 | Classify statements; open supporting sources; observed/approved/inference/estimate/recommendation | Partial | Audit classifies source and owner unknowns; primary crawler guidance verified; Meta blocked; claims approval incomplete. |
| Q2.11 | Search equivalent occurrences and adverse proof; smallest accurate wording; update consumers/recheck | Partial | Section 5 map/contradictions created; canonical cross-consumer fixes recommended but not authorized. |
| Q2.12 | Review absolutes contextually rather than word bans | Present/Compliant | F010 retains necessary mechanisms/trade-offs; keywords are leads, not categorical ban. |
| Q2.13 | Sensitive commercial/identity/privacy/security/capacity facts specifically verified | Needs Owner Input | OI01–OI08; no category approval inferred from another; F010/F014. |
| Q3.01 | Approved factual public author/Person/photograph/biography or organization | Needs Owner Input | F013/F017; organizational authorship valid; OI07. |
| Q3.02 | Accountable internal reviewer; draft/technical/pending/reviewed/changed states | Missing | No content-wide auditable review model found; F015/OI12. |
| Q3.03 | Revision/fingerprint scope including metadata; automation not human review | Missing | F015; previous report/test not treated as approval. |
| Q3.04 | Historical reviews retained; addenda; pending facts separate from editorial review | Missing | Required future provenance contract; no historical approval fabricated; F015/OI12. |
| Q3.05 | Publication/material update/review/evidence/capture dates explicitly mapped | Violation/Risk | Request/joined/publication substituted for modification; hardcoded relative job dates F015. |
| Q3.06 | Visible/schema/OG/sitemap/feed dates agree with supported history | Partial | Registry metadata/feed consumers useful; source duplication and origin evidence unresolved F015. |
| Q3.07 | Unknown omitted/resolved; no guessed today/deploy/review publication dates | Violation/Risk | Static markdown runtime lastModified F015; static sitemap correctly avoids fake today. |
| Q3.08 | Public substantive media/text update evaluated; internal changes not automatic freshness | Missing | No material-update/review migration rule recorded; OI12. |
| Q4.01 | One reader task/page and related commercial/explanation/trust architecture | Present/Compliant | Full route ledger/task/family map at source level; no new URL proposed. |
| Q4.02 | Clear source for definitions; summarize/link; contextual inbound/orphan/duplicate review | Partial | Header/Footer/hubs link current routes; overlapping Sheet/coexistence guides need coherent authority F008/F012/F024. |
| Q4.03 | Descriptive HTML links; fragments/breadcrumb/download/outbound checked | Partial | Literal target scan passes; dynamic/fragment/remote/DOM journeys untested; F024/F035/F038. |
| Q4.04 | Preserve useful deep links; intentional redirects; unrelated 404 not homepage | Present/Compliant | No slugs changed; not-found recovery source sensible; source redirect rules absent; actual status untested. |
| Q4.05 | Correct success/redirect/unknown/auth HTTP status on current build/live | Partial | Source 404/notFound/error contracts inspected; no HTTP crawl/exposure probing; F001/F024/F038. |
| Q4.06 | Canonical origin/query/pagination/dynamic convention | Partial | Metadata helper and canonical Link present; checkout excluded; all actual rendered outputs untested. |
| Q4.07 | Accessible initial HTML/links versus hydrated meaningful content | Violation/Risk | Article opacity/client boundaries and FAQ collapsed states F022/F024. |
| Q4.08 | Descriptive title/description/main heading/hierarchy; no hard ranking character limit | Partial | All route metadata sources reviewed; validator heuristic misuse F033; current DOM counts absent. |
| Q4.09 | Robots HTML/header/canonical/sitemap/content agree | Partial | Source sitemap/noindex aligned; blog machine noindex asymmetry and /_next policy require review F012/F024; live headers unknown. |
| Q4.10 | Canonical indexable sitemap declared; meaningful lastmod; no staging/error/internal URLs | Partial | 59-route reconciliation PASS; static no today KEEP; author joinedAt misuse F015. |
| Q4.11 | Deliberate empty/thin hub indexing/migration treatment | Partial | Author profiles lack articles; useful hub paths retained pending value decision F013. |
| Q4.12 | Accurate page social image/identity/document language | Violation/Risk | Missing author OG images F017; generic site OG usable; English html/no reciprocal locale families. |
| Q4.13 | Appropriate actual schema/entity/offer/article/author IDs; omit unsupported facts | Violation/Risk | Free default paid offers F023; identity/claims PENDING F010/F013; actual graph semantic verification open F024. |
| Q4.14 | Validate schema syntax and meaning; eligibility separate; no rich-result guarantee | Partial | Current official FAQ feature deprecation checked (section 8); scripts/static graphs not truth proof F023/F024/F033. |
| Q4.15 | Markets/language/currency/tax/timezone/units/support constraints | Needs Owner Input | India/en-IN source foundation; foreign currency/office/support scope OI02/OI03/OI11. |
| Q4.16 | Reciprocal real locale alternates/x-default where applicable; no forced redirects | Not Applicable | No equivalent localized page family in current source; do not manufacture hreflang or locales. |
| Q4.17 | Translation expansion/plural/RTL readiness; approved translations/location claims | Partial | No translation contract or published locale family; country calculator/office statements need evidence; no new localization required. |
| Q5.01 | Dated official crawler-purpose matrix separates search/retrieval/training/other | Partial | Section 8 refresh complete for core providers; existing robots conflates purposes; owner policy OI10. |
| Q5.02 | Owner access/training preferences and combined robots/header/auth/WAF/rate/assets | Needs Owner Input | Robots default /_next block, broad named groups; edge/IP/log verification absent; no owner choices invented. |
| Q5.03 | Spoofed UA diagnostic not provider-index proof; use verified methods/logs | Present/Compliant | No spoofed-crawl or indexing success claimed; actual logs/webmaster state untested. |
| Q5.04 | Clear business, direct qualified answers, accessible text/evidence links | Partial | Useful setup text exists; claims/repetition/hidden-animation/empty twins F010/F012/F021/F022. |
| Q5.05 | Optional assistant files/endpoints no prerequisite/ranking guarantee/crawler-only false claims | Violation/Risk | llms/MD/MCP drift and Google-Extended visibility commentary; F010/F011/F012; section 8. |
| Q5.06 | No prompt injection/fabricated citation; provider-specific preferences verified | Partial | No malicious crawler instruction found in scoped review; claims/citations still need supporting evidence, not link existence. |
| Q5.07 | Discovery/index/referral/citations measured separately; no absence/one-off ranking inference | Missing | No current analytics/webmaster/provider evidence; measurement owner PENDING; no external submissions. |
| Q6.01 | Actual families/shared design: shell/type/spacing/colors/borders/width/buttons/tables/diagrams/states | Partial | Source map complete; legacy blue/contrast states and old guides F020/F040; actual viewport comparison absent. |
| Q6.02 | Tokens/primitives with task-specific structures, quiet policies; no compulsory decoration | Present/Compliant | Shared primitives and central legal renderer; differentiated tasks retained; no uniform animated rewrite proposed. |
| Q6.03 | Review affected sections/copy expansion/component contracts, not factual distortion | Partial | Wide tables/badges/CTA no-wrap risks source candidates; no edits or geometry claims F027/F038. |
| Q6.04 | Record screenshots/build/browser/state at 1440/1024/768/375/320 and useful breakpoints | Missing | No current responsive screenshots; F038. Selected source PNG inspection is not webpage viewport evidence. |
| Q6.05 | Actual wraps/navigation/clips/overlaps/images/touch/order; meaningful hidden-state exclusions | Missing | Requires current rendered journeys; F038, not inferred pass from Tailwind classes. |
| Q6.06 | No page horizontal overflow; labelled keyboard inner scroller/zoom/hint/text | Partial | Wide table/code/media consumers exist; region labels/keyboard contracts incomplete F018/F027; geometry untested. |
| Q6.07 | WCAG standard semantics/names/contrast/focus/order/restore/skip/errors/status/touch/reading | Violation/Risk | F018–F020/F024; Radix named Sheet/demo and shared focus ring KEEP; not conformance-certified. |
| Q6.08 | Zoom/reflow/text spacing/reduced motion/forced colors; screen-reader/real-device coverage | Missing | CSS reduction positive; JS animation issue F022; physical/screen-reader combinations all untested F038. |
| Q6.09 | Audience-based Chromium/Firefox/Safari/iOS/Android coverage; emulation distinct | Needs Owner Input | OI11 policy; zero fresh sessions in this audit, no cross-browser pass. |
| Q6.10 | Accessibility statement reflects implemented features and actual build testing | Not Applicable | No whole-site tested-every-build conformance statement found; any future statement must match actual pipeline. |
| Q7.01 | Inventory/exercise every unique menu/accordion/tab/filter/control/download/cookie/form/failure | Partial | Source inventory complete; F025/F026/F027; exercise coverage zero current browser sessions F038. |
| Q7.02 | Direct/client navigation/refresh/back/keyboard/mobile/no-JS/overlay checks | Missing | F022/F038; no invisible-overlay conclusion from source alone. |
| Q7.03 | Enabled styled button performs promise or honestly unavailable | Violation/Risk | Newsletter/Use Flow unwired; sample controls ambiguous F025. Disabled checkout honest KEEP. |
| Q7.04 | CTA→validation→acceptance→downstream→actual completion traced | Violation/Risk | Source lead chain traced but all-failure success F004; real receipt untested. |
| Q7.05 | Approved minimal fields/relevant privacy context/secrets server-side/no PII leaks | Partial | Server credential names only inspected; demo privacy link KEEP; contact/transfer/log scope F001/F028/OI09. |
| Q7.06 | Server+client input, field errors/timeouts/network/rate/unavailable initialization | Partial | Zod/captcha action+score KEEP; dependency/field/body/timeout gaps F005. |
| Q7.07 | Duplicate prevention/recoverable input; acceptance not delivery | Violation/Risk | UI submitting lock KEEP; no durable dedup/total failure integrity F004/F005. |
| Q7.08 | Appropriate accessible abuse protection; initialization failure handling | Partial | Captcha fail-closed helps; ready/execute unavailable behavior incomplete F005. |
| Q7.09 | Mocks/sandbox routine failures; real safe submission only with authority/receipt/cleanup | Present/Compliant | No real form/webhook/SEO exploit submitted; future sandbox/recipient gates explicit OI09/F038. |
| Q7.10 | External unavailable flow has honest approved alternative, no fake booking/payment/timing | Partial | Checkout contact alternative KEEP; MCP contact context/universal timing/dead newsletter F008/F025/F035. |
| Q8.01 | Recorded repeatable build/route/device/tool/network/CPU/cache/repeated-run profile | Missing | F036/F038; no current lab measurement; no invented numeric budgets. |
| Q8.02 | CSS/JS/unused/shared/media/font/blocking/hydration/tasks/server/cache/stability measured | Missing | Source risks found; no transfer/CPU/response claim of slowness or optimization gain. |
| Q8.03 | CWV p75 device segmented; LCP≤2.5s INP≤200ms CLS≤0.1; lab/TBT distinct | Partial | Current official thresholds verified; no site field results or TBT→INP equivalence claimed. |
| Q8.04 | Remove work before infra; scope styles/scripts/reduce client/dependency/localization work | Partial | Whole-client guides/global CSS/script consumers F022/F028/F036; no unsolicited infrastructure added. |
| Q8.05 | Responsive dimensioned media/LCP priority/lazy assets; fonts/cache/compression/server model | Partial | Next image dimensions, Inter and server pages positive; missing avatars/provenance and actual response profile open. |
| Q8.06 | Cold direct loads/cross-family nav/stale chunks/cumulative payload; remeasure | Missing | No current preview/measurement; F036/F038. |
| Q8.07 | Justified family budgets incl compressed method; no arbitrary copied/inflated budget | Needs Owner Input | OI11; no budget invented to mark pass. |
| Q8.08 | Sparse field honest unavailable; lab acceptance/owner follow-up not blanket development stop | Present/Compliant | Field unavailable recorded; independent audit completed; follow-up ownership OI11/F039. |
| Q9.01 | Proportionate source/config/dependency/request/response review, no unapproved pentest | Present/Compliant | Source and lock versions checked; no exploit/PII fetch/form/deploy used; runtime/edge/advisory gaps explicit. |
| Q9.02 | HTTPS/redirect/mixed content/storage/public env/evidence/internal route exposure | Partial | Source URLs/storage/discovery/debug inspected; no secret values; actual serving redirects/env/cache outside evidence F030. |
| Q9.03 | Actually protect private routes; robots not access control | Violation/Risk | Anonymous lead GET and unsigned deploy F001/F002; noindex preview not private F030. |
| Q9.04 | All-layer headers ownership/policy conflicts; CSP/frame/nosniff/referrer journeys | Needs Owner Input | No app headers defined; edge may own them; OI05/OI10/F030; cannot claim absent live protection. |
| Q9.05 | HSTS scope/HTTPS/subdomains/preload authority established deliberately | Needs Owner Input | No host-scope operational evidence; no HSTS changes proposed as automatic global fix. |
| Q9.06 | Actual applicable dependency advisory/error review; no unrelated upgrades | Partial | Locked versions/types and selected primary Next advisory applicability reviewed F042; full npm query unavailable; no dependency change. |
| Q9.07 | Analytics/cookies/storage/embeds/transfers inventory matches approved disclosure | Partial | Inactive optional categories KEEP; reCAPTCHA/avatar/lead chain F028/F029; owner roles/locations PENDING. |
| Q9.08 | Stale cache/invalidation/assets/errors/recovery; no disabling controls for preview | Violation/Risk | Missing image files, output/lead failure and mutable deployment F017/F025/F027/F034; edge stale behavior unknown. |
| Q10.01 | Real approved media answers reader need; no manufactured product proof | Partial | Two setup PNGs useful; mock scenes need status F016; no generated “screenshot” made in audit. |
| Q10.02 | Filename/capture/env/permission/dims/size/hash/subject/page/caption/alt/privacy/transform/recheck | Partial | Existing file dimensions/bytes/hash/pixels recorded in section 7; capture/public permission/transform history PENDING OI08. |
| Q10.03 | Demo data still privacy-reviewed; inspect thumbnails/derivatives; publication permission distinct | Partial | Direct PNG pixels show safe placeholder, no live token observed; optimized/original-source derivatives not supplied/verified. |
| Q10.04 | Originals private, predictable derivatives, metadata removal and safe redaction all outputs | Needs Owner Input | PNG chunk check recorded; originals/approval/redaction process unavailable; no CSS blur asserted safe. |
| Q10.05 | Capture proves visible state only; honest crops/values/status/context/demo versus customer | Partial | Current PNGs observed; no universal default/performance inferred; illustrative scenes F016. |
| Q10.06 | Factual caption/alt, no private identity or unsupported SEO assertion | Partial | Detailed Miracle text positive; actual capture origin/status needed; missing author assets F017. |
| Q10.07 | Privacy/meaning/legibility/a11y/payload pilot, phone readability/scroller/zoom/text | Missing | Source dimensioned delivery and text present; no mobile pixel/browser zoom acceptance F038. |
| Q10.08 | Only distinct proof expansion; unused supplied assets reason; dates/meta/layout together | Not Applicable | No media expansion authorized; existing assets inventoried; no additional supplied evidence assumed. |
| Q11.01 | Actual anonymized authorized reader/sales/support/demo provenance/date/audience/owner/resolution | Missing | No approved genuine-input record inspected; no private lead data accessed F039/OI08. |
| Q11.02 | Recurring confusion versus anecdote; proposed FAQ not genuine customer proof | Partial | FAQ examples useful but origin unspecified; preserve distinction internally F039. |
| Q11.03 | No genuine input → explicit defer; no invented records/testimonials/profiles/filler | Present/Compliant | OI08/F039 defer input evidence; no fake record generated by audit. |
| Q11.04 | Growth/localization/comparisons/templates/profiles reader value/evidence/maintenance, no count quota | Partial | Existing value mapped; proof/maintenance unresolved F010/F013/F039; no backlink/article quota proposed. |

### 6.3 Workflow and lifecycle requirements (sections 1–6, 18–24)

| Playbook sections / obligations | Classification | Evidence / scope decision |
| --- | --- | --- |
| 1: authority-driven action; results useful/truthful/measured/coherent; no detector metrics | Present/Compliant for audit scope | Phase 1 instruction followed; findings mapped across dimensions. Website improvement result is not achieved by reporting alone. |
| 2: repository authority, boundaries, current evidence, historical verification, meaningful public terms | Present/Compliant | AGENTS/playbook/current source checked; old reports not promoted; cross-product scope retained; public governance leaks reported F021. |
| 3: complete brief/known versus approved versus implemented; pending effect/owner/phase/interim; existing register reuse | Partial | Section 2 brief and OI01–OI12 provide current evidence/roles/blocked dependent scope; named owners/factual approval remain PENDING. No second blueprint/register. |
| 4 step 1: root/revision/dirty/generated/tests/side-effects/production-like preview | Partial | Source baseline and read-only commands recorded; inherited playbook preserved; fresh build/preview deferred because Phase 1 restricts writes. No source/production acceptance equivalence. |
| 4 step 2: all routes/dynamics/noindex/feeds/errors/internal/shared/locales/claims/count denominators | Present/Compliant at source level | 60 modules/63 concrete/59 sitemap, 13 handlers, 18 layouts, hidden public discovery and shared consumers all inventoried; live reconciliation unverified F038. |
| 4 step 3: integrated full catalogue/source/evidence/browser, visual denominator, KEEP sound areas | Partial | Q1–Q11 mapped; source coverage complete at reported depth; no current visual coverage, explicitly zero. KEEP list below. |
| 4 step 4: stable findings/impact/priority/dependencies/acceptance/batch/Q coverage; full-plan reconciliation | Partial | 42 stable findings have evidence and acceptance. Assigned batches/roadmap intentionally excluded by current instruction; future phase must consume this report. |
| 5 existing-site A0–A8 order; preserve useful URLs; urgent issues; phased acceptance | Partial | Existing track selected; Phase 1 source audit complete. A0 live/build portion unverified; A1 roadmap and A2–A8 not authorized. No deletion/slug/migration undertaken. |
| 6 new-site B0–B8; stack choice; only needed page types | Not Applicable | Existing Whats91 repo; no new site or compulsory blog/locale/profile type invented. |
| 18: coherent scoped batches; shared meanings/canonical changes/copy/meta/media/dates/tests/browser/sweep/diff/status/continue | Not Applicable to execution in Phase 1 | Recorded remediation directions and dependency/acceptance requirements only. No batch plan, application edit or regression suite written. Meaningful tests needed in authorized implementation. |
| 19: current fresh whole-candidate acceptance truth/routes/visual/functional/a11y/perf/diff/state | Partial | Static/source report validated; source-only verdict clear. Website final acceptance not run or passed; F038 covers exact missing evidence. |
| 20.1 release permission/candidate identity/rollback/migrations/build/env/cache/monitor | Not Applicable to execution; source risk recorded | No commit/push/release/deploy authorized or performed; F002/F034 describe current source release risks. |
| 20.2 public/live revision/routes/headers/assets/auth/errors/forms/receipt/mobile/cache | Missing acceptance evidence | No current live journey or edge acceptance; local source cannot prove DNS/CDN/delivery/provider behavior. |
| 20.3 webmaster/property/sitemap processing/indexing/IndexNow/markets/analytics authorization | Not Applicable to execution; measurement PENDING | No external connection/submission/tracking activated; OI10/OI11 require owner authority; no indexing claim. |
| 21 ownership/review triggers after public change/deploy/launch/traffic/monthly/platform changes/correction history | Missing | F039 and OI12; owner roles suggested as pending, not assumed assignments. |
| 22 templates reused in existing system; blanks not approvals; plan/claims/decision/media/batch acceptance structures | Present/Compliant adaptation for audit | This report uses inventory/findings/decision/evidence fields proportionately. It does not fill an implementation plan or imply review/owner approval. |
| 23 handoff required explicit scope/source/authority/boundary/acceptance/protected/current evidence | Present/Compliant | Dedicated Phase 1 assignment honored; final report can be handed to coordinator as evidence. No unauthorized external message sent. |
| 24 current primary sources changing crawler/schema/framework/legal/platform guidance; failure disclosed | Partial | Primary Google/OpenAI/Anthropic/Perplexity/Google Sheets/Web Vitals refreshed 28 Sep; Meta fetch failed; legal/regulatory/product rollout facts remain PENDING. No third-party snippet treated as official truth. |

## 7. Already-correct areas and asset evidence

### 7.1 KEEP and regression boundary

| KEEP area | Why preserve | Later regression evidence |
| --- | --- | --- |
| Central plans / checkout | Catalogue, separate Meta fees, 18% GST, rounding, monthly setup and annual inclusion are explicit; no live payment/order promise. | Plan/cycle/query/error totals and related catalogues; owner approval still needed for prices/availability. |
| Legal center / LegalDocument | One consistent semantic document source, summary/status, TOC, useful related links; DPA/providers explicitly under verification/noindex. | TOC/headers/printing/mobile/metadata and approved facts; do not flatten truthful status into certification. |
| Metadata/canonical source | Root no longer forces homepage canonical; page/helper/article canonical/social definitions exist; sitemap source covers intended URLs. | Fresh all-route DOM crawl, noindex exclusions, query handling and actual response headers. |
| Homepage FAQ and MCP data source | Visible FAQ and JSON-LD use common arrays in their page families; easier factual consistency. | Render text/schema parity and current approval/status, not sentence snapshots. |
| Shared semantic components | Server Container/Section/CTA anchors, central typography/spacing and focus rules; Radix named menus/dialog foundations. | Affected consumer states, keyboard focus, widths and color contrast; protected UI remains unchanged. |
| Reveal / AnimatedNumber | Readable final number/server baseline, aria treatment and CSS progressive enhancement/reduced-motion strategy. | No-JS/failed-JS/reduced-motion/viewport fallback and actual clarity; numbers need independent truth evidence. |
| Pricing pillar key distinction | Accepted API request versus delivered and unresolved billing state is clear; dated research/sources provided. | Retain unknown-versus-zero logic and update dated rates only after verified primary evidence. |
| Miracle/shortcut operating explanation | Detailed profile/field/token/PDF/template mechanics, examples and limitations provide value beyond slogans. | Preserve accurate behavior while removing internal commentary and repeated aliases; product contract verification separate. |
| Form server validation foundations | Zod safeParse, reCAPTCHA fail-closed action/score, submit locking, field association in demo and input recovery in failures. | Fix total-failure truth/timeout/idempotency; keep scoped field validation and safe secrets. |
| Static sitemap freshness restraint | Static pages omit invented every-build lastmod; known registry consumers centralize article dates. | Preserve meaningful-date mapping; correct author/request-time misuse without mass refreshing dates. |
| Local tools / flow allowlist | Dynamic QR library and canvas/client string processing; flow registry chooses file before read and unknown ID returns source 404. | Safe local generation/copy/download and packaged standalone flow JSON; no claim of whole-site no transfers. |

### 7.2 Media inventory

The two Miracle setup images and site OG image were inspected directly at their existing native pixels. Both Miracle screenshots visibly use `YOUR_WHATS91_API_TOKEN`; no live token was observed in those files. This finding neither establishes capture-date/public-use permission nor confirms every optimized/download derivative. Logos were inventoried by file/dimension/hash, not used as proof of product availability.

| Public file | Bytes | Pixels | SHA-256 | Observed role |
| --- | --- | --- | --- | --- |
| public/.well-known/oauth-authorization-server | 852 | — | e4396849191133e27cc98a0a6912f33cf04cbef9949f4f430d4ad9c04e27b3b5 | Static text/discovery |
| public/.well-known/protected-resource | 1016 | — | f100cf7494c9d1004b6d67a8d89225b6e86e4ee247d6a62f3f14c0ad730e0ed8 | Static text/discovery |
| public/llms.txt | 9574 | — | 2df7a15e1b6dfe6a272ebaf0eea13ee24381e276c5ec391800d6f9d2025d1010 | Static text/discovery |
| public/logo.svg | 1864 | — | dd75e113c2966d7ab05da0114f45db6b5a12fb94afc29e1be2a3299c5cfeae54 | Brand logo SVG |
| public/og-image.png | 59623 | 1200 × 630 | e354a4bb6482cdc0d1b572ed7618ab80451726ad8eef15de7fffb6a5e0bf413a | Social preview; inspected |
| public/robots.txt | 3298 | — | 8f2f7c0c142581fa17baeb3bf999d37cf392e1dc8fdde80b23ec729eb606886c | Static text/discovery |
| public/solutions/miracle/miracle-format-config.png | 105853 | 614 × 408 | d9403ff2e6479ddf39ed67c0f0cad51e04538062fbdccd16d67023edfd048104 | Setup screenshot; pixels inspected |
| public/solutions/miracle/miracle-logo.png | 5703 | 342 × 147 | f74cda4d9ae5d7b9549fa2b722b4df1a9c8a71f7590a06f2f7a1ae947c60776c | Logo/icon |
| public/solutions/miracle/miracle-web-api-profile.png | 61219 | 647 × 394 | efa547a658627651609596a41d7c0762e43484ff90267344809b70d0a430a3b2 | Setup screenshot; pixels inspected |
| public/solutions/miracle/whatsapp-icon.png | 56179 | 662 × 664 | bdade3fc4b1d51546f7a45853c06f73b73acef03adcf5c598732af640bdb2573 | Logo/icon |
| public/whats91_logo.svg | 5064 | — | 8496f336ac943eb0e9ec9009118bbe6417de531496977233ddecc67676837c93 | Brand logo SVG |

| PNG | Observed chunk types | EXIF/text chunks |
| --- | --- | --- |
| public/og-image.png | IDAT, IEND, IHDR, PLTE, pHYs | None found |
| public/solutions/miracle/miracle-format-config.png | IDAT, IEND, IHDR, pHYs | None found |
| public/solutions/miracle/miracle-logo.png | IDAT, IEND, IHDR, PLTE | None found |
| public/solutions/miracle/miracle-web-api-profile.png | IDAT, IEND, IHDR, pHYs | None found |
| public/solutions/miracle/whatsapp-icon.png | IDAT, IEND, IHDR, bKGD, cHRM, gAMA, tEXt | tEXt, tEXt |

Chunk inspection found no EXIF/text chunks in the five PNGs. It is a narrow metadata check, not a full privacy certification, SVG safety audit or proof of original redaction. Capture dates, environments, source originals, permissions, transformation history and replacement triggers are PENDING (OI08). There is no media intake/provenance register tying these facts to approved public use in the checked source. Current setup captions/text help explain the image; mobile legibility and accessible enlargement remain unverified.

## 8. Current official-source refresh and crawler policy

Access date for the following sources: **28 September 2026**. Source references are used only for the specific conclusions below; they do not verify Whats91 product features or owner policy.

| Official source | Supported conclusion / audit use |
| --- | --- |
| [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) and [current AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Normal reader-focused SEO remains the basis; no special AI file/schema is required. Google Search access is distinct from other training/grounding controls. Optional llms/twins are maintainable experiments, not guaranteed visibility. |
| [Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google-Extended controls Gemini training and specified grounding uses, not Search inclusion/ranking. Current robots comments wrongly frame it as critical for AI Overviews visibility. |
| [OpenAI crawlers](https://developers.openai.com/api/docs/bots) | OAI-SearchBot is search; GPTBot is model-training access; ChatGPT-User is user-triggered retrieval and not the search control. Policies are independent. |
| [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | ClaudeBot, Claude-SearchBot and Claude-User have training, search and requested-retrieval purposes respectively. Legacy anthropic-ai/Claude-Web entries do not replace a current purpose-based decision. |
| [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) | PerplexityBot supports search/discovery, not foundation-model training; Perplexity-User supports requested retrieval. Owner policy and effective WAF behavior need separate evidence. |
| [Google Search updates](https://developers.google.com/search/updates) | Current changelog says FAQ rich-result display ended 7 May 2026 and documentation was removed 15 June 2026. The old FAQPage documentation URL now redirects here. Do not promise FAQ rich results or copy the old government/health-only rule as current. Schema meaning and useful visible FAQs can still be assessed independently. |
| [Google IMPORTRANGE](https://support.google.com/docs/answer/3093340?hl=en) | Function input is a Google spreadsheet URL/range, supporting F032 correction of the standalone CSV instruction. |
| [Web Vitals](https://web.dev/articles/vitals) | Good p75 targets are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, segmented by device. No site performance measurements were supplied or generated here. |
| [Meta pricing](https://developers.facebook.com/docs/whatsapp/pricing/) and [volume tiers](https://developers.facebook.com/docs/whatsapp/pricing/volume-tiers) | Primary pricing fetch returned HTTP 429 and tiers were inaccessible through the research tool. Current rates, international currencies/tiers, coexistence/account eligibility and dated platform forecasts remain PENDING. Third-party snippets were not promoted to verified Meta facts. |

### 8.0 Dependency advisory applicability fallback

The npm bulk advisory endpoint could not be resolved from this execution environment. Primary maintainer advisories were inspected instead. This is a selected current Next.js review, not exhaustive all-package audit coverage. No vulnerability was exercised, dependency changed or deployed candidate identified.

| Official advisory | Version / source applicability | Current conclusion |
| --- | --- | --- |
| [Image optimization DoS GHSA-h64f-5h5j-jqjh](https://github.com/vercel/next.js/security/advisories/GHSA-h64f-5h5j-jqjh) | 16.0.0–before 16.2.5 includes locked 16.1.6. Default self-hosted image loader and unrestricted local patterns exist in source. | F042: configured path potentially applicable; attack needs large allowed local responses. Supplied images are small; no runtime/exploit proof. |
| [RSC cache collisions GHSA-vfv6-92ff-j949](https://github.com/vercel/next.js/security/advisories/GHSA-vfv6-92ff-j949) | 16.0.0–before 16.2.5 includes lock. App Router/RSC used. | F042: depends on shared caches insufficiently partitioning RSC variants; edge config not inspected. |
| [AVIF optimizer RCE GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) | Next before 16.3.3 includes lock; sharp 0.34.5 and sharp-libvips platform packages 1.2.4 locked. | F042: version warning; public assets are PNG/SVG and no remote-pattern/user-upload image source found. Actual malicious AVIF optimization reachability is unverified. |
| [Server Action SSRF GHSA-89xv-2m56-2m9x](https://github.com/vercel/next.js/security/advisories/GHSA-89xv-2m56-2m9x) | Range includes lock, but requires Server Actions and attacker-controlled host; standalone has documented host mitigation. | No use-server action found; affected source path not established. Separate handwritten SEO fetch issue F003 still exists. |
| [September ImageResponse RCE GHSA-vcvr-r3jv-pc5j](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j) | Affected 16.2.0–before 16.3.6 excludes 16.1.6; no next/og ImageResponse consumer found. | Not applicable to checked lock/source. Do not describe this as a current app RCE merely because latest release is a security patch. |

Other packages and remaining framework advisories need a complete successful advisory query and source applicability review in the next authorized verification scope. No generic “latest version” instruction or unchanged edge/WAF promise substitutes for that evidence. F042 is a dependency/release finding, not a penetration-test verdict.

### 8.1 Dated purpose matrix versus current source policy

| Provider / token | Purpose supported by current official source | Current source issue | Owner desired policy |
| --- | --- | --- | --- |
| Googlebot | Traditional Search and Google Search AI features | Named Allow:/ group; wildcard restrictions do not automatically transfer to it. Check public statuses/assets at serving layers. | PENDING OI10 |
| Google-Extended | Gemini training / specified non-Search grounding | Comment conflates AI Overviews/search and training; broad allow is a choice, not a required SEO fix. | PENDING OI10; separate training/grounding preference |
| OAI-SearchBot | ChatGPT search/discovery | No explicit modern group; wildcard /_next restrictions require essential-resource policy review. Absence of group does not imply complete blocking. | PENDING OI10 |
| GPTBot | OpenAI model-training collection | Explicit allow and API exceptions exist; must not infer owner training consent from a visibility comment. | PENDING OI10 |
| ChatGPT-User | User-requested retrieval | Not the search/training switch; provider states robots may not apply to user actions. | PENDING OI10 |
| ClaudeBot / Claude-SearchBot / Claude-User | Training / search / requested retrieval | Legacy tokens/current groups and shared wildcard policy need reconciliation with desired purposes. | PENDING OI10 |
| PerplexityBot / Perplexity-User | Search / requested retrieval | Purpose and actual WAF/IP/asset access must be inspected separately; no crawl proof from spoofed UA. | PENDING OI10 |
| Other named/legacy groups | Purpose not fully refreshed in this audit | Neeva/other legacy list should not be blindly retained as current. Verify each intended provider before change. | PENDING; optional providers need business justification |

Current `robots.txt` blocks `/_next/` for the wildcard group and uses broad named Allow groups. Essential-resource access and API/noindex exceptions need a deliberate combined policy; robots is never authentication. No provider logs, verified-IP crawl, sitemap processing, webmaster indexing or referral/citation outcome was inspected. No bots/IP lists/WAF settings were changed.

## 9. Commands, validation and untested evidence

| Check / command | Actual result | What it establishes / limit |
| --- | --- | --- |
| git status --short; git rev-parse HEAD; git branch --show-current | Baseline main / stated SHA; sole untracked canonical playbook. Final state checked after report. | No inherited source change erased; no commit/push performed. |
| rg --files / targeted rg / source reads / import-consumer and literal path review | 60 page modules, 18 layouts, 13 handlers; complete route/family/consumer ledger. | Source inventory, not page HTTP status or browser visibility. |
| Python read-only source/sitemap/registry/literal href/asset reconciliation | 63 concrete intended pages; 59 sitemap; only four intentional exclusions; no extra sitemap URLs; missing four author images/default avatar. | Literal scan does not evaluate expressions/fragments/externals/DOM. |
| Python flow JSON parse and basic entry/edge-reference inspection | 11/11 parse; all entry and inspected edge references resolve. | Not connected-product runtime schema, import or execution verification. |
| Direct native-image inspection; PNG dimension/hash/chunk scan | Two Miracle setup PNGs + OG pixels inspected; five PNGs dimensioned/metadata-chunk checked. | Not viewport screenshots, source capture/public approval or optimized derivative certification. |
| Read-only Python sRGB contrast calculation | #448C74 / white 4.0006:1; #3A7A64 / white 5.0630:1. | Confirms listed color pairs; not every rendered state or WCAG whole-site conformance. |
| ./node_modules/.bin/eslint . | EXIT 1: three errors (ecosystem.config.cjs requires ×2; temp/examples/websocket/frontend.tsx setState-in-effect ×1). | Existing whole-check baseline; no application/client lint cleanliness claimed from exclusions. |
| ./node_modules/.bin/tsc --noEmit --incremental false | EXIT 2: seven diagnostics: example socket dependencies ×2; webhook spawn/env/type ×4; Redis option/overload ×1. | Current installed type checking, no source or incremental cache output requested; Next generated types were existing, not fresh build evidence. |
| node scripts/verify-ai-readiness.mjs | EXIT 1: root core-entity text, home Product/Service/FAQ/Breadcrumb expectation, current calculator defaults expectation fail. | Checks actual source string assertions; stale expectations diagnosed F033, not automatically real missing features. |
| Linter/type wrapper correction | Initial check processes completed but shell wrapper used reserved zsh status variable and obscured exit reporting; corrected wrappers re-ran to obtain actual exits. | No pass inferred from empty early log; only final exit/results above used. |
| npm audit --json --package-lock-only --ignore-scripts | EXIT 1 / unavailable: getaddrinfo ENOTFOUND registry.npmjs.org; npm could not write its external log directory. No lockfile/source mutation. | Not a clean audit. Selected official Next advisories reviewed separately as fallback; no complete all-package verdict. |
| Listener inspection | No current audited preview identified on expected local ports; unrelated listener not treated as website evidence. | No browser/build acceptance on this revision. |
| Primary-document web research | Core crawler/schema/Sheets/CWV and selected Next advisory conclusions refreshed; Meta unavailable documented. | Not site live testing; no recommendation based on unchecked third-party data. |
| Report reference/coverage/hash/status validation | Performed after report generation; references/IDs/route denominators and source preservation checked. | Report integrity only, no app acceptance. |

### 9.1 Deliberately not run

No `bun run db:push`, Prisma generation, application import that could initialize a database, build/dev/start, deployment/version/commit scripts, dependency install/update, secret-value inspection, production contact/demo GET, form POST, webhook POST, SEO-check exploit, authenticated connected-product action, external message, analytics activation or webmaster submission. Existing build assets and old reports were not used as acceptance for the checked revision.

Existing SEO-validation HTTP scripts were inspected but not run against a nonexistent current candidate or production as an accidental bulk crawl. Several need repairs before their pass can establish coverage (F033). Full advisory enumeration and unresolved conditional applicability, effective headers, actual public route status/indexation, CDN caches and real recipient delivery are still unknown. A proportionate later release check must verify them; their absence does not prevent completion of this source audit.

## 10. Coverage gaps and Phase 1 completion

All current page modules, dynamic author/blog record sets, layouts, handlers, shared shell and key consumer contracts, libraries/data, public assets including hidden discovery, configuration and scripts were included in the source inventory and cross-family audit. Protected UI primitives were reviewed through consumer contracts; vendor packages/generated output were not audited line by line. Detailed source conclusions are attached to evidence anchors, not an assertion that every line or every unused component was independently certified.

No current rendered/built/live route reconciliation is claimed. Browser coverage is **0 routes / 0 current screenshots / 0 tested viewports**, with three existing image files inspected separately. Current runtime journey coverage is **0 submissions / 0 delivery receipts / 0 authenticated external flows**. Performance has **0 current lab runs / no supplied field dataset**. Missing evidence is represented by F038 and the detailed matrix, not silently counted as PASS.

Owner facts remain PENDING in OI01–OI12, with precise dependent scopes and safe treatment. Existing legal-policy-inputs.md remains the canonical owner record. This report does not create a second implementation plan or schedule the next phase.

**Phase 1 result:** durable source audit completed with route dispositions, Q1–Q11/workflow requirement coverage, 42 stable findings, retained strengths, claim occurrence map, owner inputs, commands and evidence limits. The website needs authorized corrective work and fresh acceptance; no implementation/release gate is closed by this report.

**Workspace change:** only `docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_PHASE_1_AUDIT_2026-09-28.md` was created. Canonical playbook and existing application/content/assets/config/dependencies/database/deployment files were preserved. No changes were staged.

## Appendix A. Enumerated source/config/data/script/public files

The ledger provides source-surface accountability and file identity at audit time. Files listed are not all independently browser-tested or reviewed at equal depth. Route and high-risk/shared consumers have detailed findings above; protected UI and nonpublic support files received structural/consumer-level review. Hashes of the initial application/source manifest and the expanded source/config/script/data manifest were checked after report creation. No pre-existing file changed.

| File | Bytes | SHA-256 (first 16 characters) |
| --- | --- | --- |
| [AGENTS.md](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/AGENTS.md) | 5542 | 909a772da61ea604 |
| [README.md](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/README.md) | 7313 | fe6e5d4f2eff4569 |
| [ecosystem.config.cjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/ecosystem.config.cjs) | 1251 | 7cfb9ea4e4007108 |
| [eslint.config.mjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/eslint.config.mjs) | 1632 | bd7adc9b35e2c723 |
| [next-env.d.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next-env.d.ts) | 251 | 7ad303e40d4fddf4 |
| [next.config.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/next.config.ts) | 778 | 7c3a53cbe7ea4e68 |
| [package.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/package.json) | 3817 | c8b23e9ed69f14fd |
| [postcss.config.mjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/postcss.config.mjs) | 81 | 141ef24ca27a99d0 |
| [prisma/schema.prisma](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/prisma/schema.prisma) | 1337 | 9770c16878b19b99 |
| [public/.well-known/oauth-authorization-server](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/.well-known/oauth-authorization-server) | 852 | e4396849191133e2 |
| [public/.well-known/protected-resource](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/.well-known/protected-resource) | 1016 | f100cf7494c9d100 |
| [public/llms.txt](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/llms.txt) | 9574 | 2df7a15e1b6dfe6a |
| [public/logo.svg](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/logo.svg) | 1864 | dd75e113c2966d7a |
| [public/og-image.png](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/og-image.png) | 59623 | e354a4bb6482cdc0 |
| [public/robots.txt](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/robots.txt) | 3298 | 8f2f7c0c142581fa |
| [public/solutions/miracle/miracle-format-config.png](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/solutions/miracle/miracle-format-config.png) | 105853 | d9403ff2e6479ddf |
| [public/solutions/miracle/miracle-logo.png](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/solutions/miracle/miracle-logo.png) | 5703 | f74cda4d9ae5d7b9 |
| [public/solutions/miracle/miracle-web-api-profile.png](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/solutions/miracle/miracle-web-api-profile.png) | 61219 | efa547a658627651 |
| [public/solutions/miracle/whatsapp-icon.png](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/solutions/miracle/whatsapp-icon.png) | 56179 | bdade3fc4b1d5154 |
| [public/whats91_logo.svg](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/public/whats91_logo.svg) | 5064 | 8496f336ac943eb0 |
| [scripts/auto-version.js](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/auto-version.js) | 2267 | 41c280542e1a7585 |
| [scripts/bump-version.js](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/bump-version.js) | 2581 | 54c4ca76b3ea67ea |
| [scripts/commit.js](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/commit.js) | 6016 | 88098fc6f5df774f |
| [scripts/deploy.js](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/deploy.js) | 16541 | f518861749573e4a |
| [scripts/git-commit.sh](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/git-commit.sh) | 2891 | dc88a304acb0399b |
| [scripts/seo-validation/README.md](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/README.md) | 1084 | ddde94fc69b1df5f |
| [scripts/seo-validation/check-endpoints.sh](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/check-endpoints.sh) | 3525 | ffb29a64510fe9b9 |
| [scripts/seo-validation/check-links.sh](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/check-links.sh) | 1156 | eb16f5125239ee50 |
| [scripts/seo-validation/check-schema.mjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/check-schema.mjs) | 4162 | cd1fccf524d0b768 |
| [scripts/seo-validation/crawl-sitemap.sh](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/seo-validation/crawl-sitemap.sh) | 2718 | 91e7a3f40d722ba7 |
| [scripts/verify-ai-readiness.mjs](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/scripts/verify-ai-readiness.mjs) | 3772 | 36c197b6bd393f52 |
| [server.js](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/server.js) | 703 | a7459563b9a8640a |
| [src/app/about/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/about/page.tsx) | 21426 | 8450f829ec1e11fe |
| [src/app/acceptable-use/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/acceptable-use/page.tsx) | 576 | 9c1a287f7f8cdb9c |
| [src/app/api/contact/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/contact/route.ts) | 4670 | 4671dfb0260e7f79 |
| [src/app/api/demo/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/demo/route.ts) | 4227 | 2d0d9935113cf593 |
| [src/app/api/flows/[id]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/[id]/route.ts) | 1483 | 7249cf81f9db2314 |
| [src/app/api/flows/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/flows/route.ts) | 363 | 856d1728efb3d502 |
| [src/app/api/mcp/pages/[slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/pages/[slug]/route.ts) | 36864 | 83f9835ea0a55c2c |
| [src/app/api/mcp/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/mcp/route.ts) | 6931 | 1c30fda01b684d4e |
| [src/app/api/md/[...slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[...slug]/route.ts) | 1437 | 71a22985310198b9 |
| [src/app/api/md/[slug]/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/md/[slug]/route.ts) | 47855 | cdcdef2f92df4659 |
| [src/app/api/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/route.ts) | 134 | bb3323e70b608cf9 |
| [src/app/api/seo-check/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/seo-check/route.ts) | 7046 | e2860917ab939944 |
| [src/app/api/version/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/version/route.ts) | 1439 | eaca38ba448dd4b7 |
| [src/app/api/webhooks/github/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/api/webhooks/github/route.ts) | 5513 | bcf0f91dda3cde2b |
| [src/app/authors/[slug]/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/authors/[slug]/page.tsx) | 11892 | a6ceea39cb074cdb |
| [src/app/authors/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/authors/page.tsx) | 3875 | 44a848e7f539865f |
| [src/app/blog/busy-accounting-whatsapp-integration-benefits/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-accounting-whatsapp-integration-benefits/layout.tsx) | 502 | 2fb25e3ecc319185 |
| [src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-accounting-whatsapp-integration-benefits/page.tsx) | 37769 | 9a8ab8f0864e5751 |
| [src/app/blog/busy-erp-google-sheets-integration-complete-guide/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-erp-google-sheets-integration-complete-guide/layout.tsx) | 506 | 629f382bbc1e4992 |
| [src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/busy-erp-google-sheets-integration-complete-guide/page.tsx) | 70331 | 68e35bcae13d54f3 |
| [src/app/blog/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/layout.tsx) | 2120 | c3e7234f2194a694 |
| [src/app/blog/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/page.tsx) | 16146 | 643bb668c779b0ec |
| [src/app/blog/whatsapp-cloud-api-complete-guide-2026/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-complete-guide-2026/layout.tsx) | 495 | 53c699a76c44aa02 |
| [src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-complete-guide-2026/page.tsx) | 33252 | 36fcc2adcf31caf9 |
| [src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-pricing-india-2026/page.tsx) | 61079 | c9a2aba0b0fd43a2 |
| [src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/layout.tsx) | 515 | 87e948bc0088cbb3 |
| [src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/page.tsx) | 57700 | 3e945b9679f7f4c0 |
| [src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/layout.tsx) | 503 | 5867a7dcbefb21d1 |
| [src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-graph-api-v24-to-v25-transition-guide/page.tsx) | 53345 | e19f498d48c364eb |
| [src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/layout.tsx) | 509 | 3933b15f0ae2cf04 |
| [src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-plus-launch-2026-premium-subscription-guide/page.tsx) | 44779 | 6250492d5ded4dd2 |
| [src/app/blog/whatsapp-username-system-2026-complete-guide/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-username-system-2026-complete-guide/layout.tsx) | 501 | 0a469f22a159ed23 |
| [src/app/blog/whatsapp-username-system-2026-complete-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-username-system-2026-complete-guide/page.tsx) | 49757 | 4bc0df2d694689c7 |
| [src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/layout.tsx) | 499 | 430193821f956f9c |
| [src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-rule-india-2026/page.tsx) | 40669 | a7f7698ad8bfa64a |
| [src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/layout.tsx) | 514 | 81a73d78ea35c581 |
| [src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/page.tsx) | 56247 | d3d91c300930f288 |
| [src/app/careers/OpenPositionsClient.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/OpenPositionsClient.tsx) | 8754 | df6da3e3a30e575e |
| [src/app/careers/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/careers/page.tsx) | 12221 | f17b6b79bdc44dd2 |
| [src/app/chatbot-flows/ChatbotFlowLibrary.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/chatbot-flows/ChatbotFlowLibrary.tsx) | 9239 | a75e67b75bf69c81 |
| [src/app/chatbot-flows/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/chatbot-flows/layout.tsx) | 1599 | 513552e142c36917 |
| [src/app/chatbot-flows/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/chatbot-flows/page.tsx) | 9847 | b5c26daebd21aca7 |
| [src/app/checkout/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/checkout/page.tsx) | 16385 | 32e0ecda198805f0 |
| [src/app/compliance/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/compliance/page.tsx) | 569 | 6828f8e4df9ab932 |
| [src/app/contact/ContactForm.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/contact/ContactForm.tsx) | 8720 | fc7133b31e64b686 |
| [src/app/contact/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/contact/page.tsx) | 11697 | 5f0e2ba1db34c743 |
| [src/app/cookies/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/cookies/layout.tsx) | 426 | 6862a479356b7a15 |
| [src/app/cookies/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/cookies/page.tsx) | 219 | f42e2276d0d94519 |
| [src/app/data-rights/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/data-rights/page.tsx) | 594 | 617df7ebc9ba1d3b |
| [src/app/design-system/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/design-system/page.tsx) | 10097 | 3520de1623196259 |
| [src/app/faq/FAQBrowser.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/FAQBrowser.tsx) | 7048 | 37be63bf69a623a9 |
| [src/app/faq/faqData.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/faqData.ts) | 22090 | f27adb0aabd10763 |
| [src/app/faq/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/faq/page.tsx) | 9259 | 19469df16f45ffe8 |
| [src/app/features/chat-shortcuts-conversation-automation/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/chat-shortcuts-conversation-automation/page.tsx) | 71789 | 8cf39b2ed120d0c1 |
| [src/app/features/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/features/page.tsx) | 8018 | 6968a45c3618e211 |
| [src/app/feed.xml/route.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/feed.xml/route.ts) | 3524 | 4b4653796a7aefe0 |
| [src/app/flow-builder/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/flow-builder/layout.tsx) | 1794 | 54a9211c64bf566d |
| [src/app/flow-builder/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/flow-builder/page.tsx) | 29303 | 17c8df28e86f65b8 |
| [src/app/globals.css](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/globals.css) | 32455 | ff33bc3b2f4c00c0 |
| [src/app/google-sheets-integration/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/google-sheets-integration/layout.tsx) | 1826 | fa0bed27fa9fa7e2 |
| [src/app/google-sheets-integration/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/google-sheets-integration/page.tsx) | 25016 | a99b299ef5eab759 |
| [src/app/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/layout.tsx) | 2418 | f2faa260378e194c |
| [src/app/legal/dpa/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/legal/dpa/page.tsx) | 649 | 0d3d32b901d00fbe |
| [src/app/legal/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/legal/page.tsx) | 7002 | a6dde38a64a88784 |
| [src/app/mcp/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/mcp/page.tsx) | 16439 | 6517bd4ff5809013 |
| [src/app/not-found.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/not-found.tsx) | 2970 | 8532b93f270d682a |
| [src/app/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/page.tsx) | 6793 | 9fcca049f62ffc05 |
| [src/app/partners/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/partners/page.tsx) | 33617 | dd552f1a09016058 |
| [src/app/partners/whats91-coins/CoinsCalculator.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/partners/whats91-coins/CoinsCalculator.tsx) | 15983 | 89ac7571c7aca51c |
| [src/app/partners/whats91-coins/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/partners/whats91-coins/page.tsx) | 19783 | 32ff1275b8a7f717 |
| [src/app/plans/PlansSelector.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/plans/PlansSelector.tsx) | 15506 | 6c394bccd2f74d6d |
| [src/app/plans/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/plans/page.tsx) | 16712 | 4f44698001b6225d |
| [src/app/pricing/PricingCostCalculator.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/PricingCostCalculator.tsx) | 5637 | 9e32673b44d863bd |
| [src/app/pricing/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/pricing/page.tsx) | 29513 | 9bed1af620d98e85 |
| [src/app/privacy/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/privacy/layout.tsx) | 424 | ab9be53fd1752ee8 |
| [src/app/privacy/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/privacy/page.tsx) | 221 | 477d0e7cc09e582e |
| [src/app/refund/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/refund/layout.tsx) | 425 | 33b27a350928417b |
| [src/app/refund/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/refund/page.tsx) | 218 | 018c8ae69e33c4f5 |
| [src/app/sitemap.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/sitemap.ts) | 6970 | 8db838ad25eed4ba |
| [src/app/sla/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/sla/page.tsx) | 544 | 8e5dccd567ac5ce1 |
| [src/app/solutions/busy-ai-agent/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-ai-agent/page.tsx) | 40163 | 7834bae78b5f361f |
| [src/app/solutions/busy-api/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-api/page.tsx) | 22097 | 3c568c32790e7727 |
| [src/app/solutions/busy-ecommerce/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-ecommerce/page.tsx) | 37501 | c469d637f8d9d62b |
| [src/app/solutions/busy-erp/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-erp/page.tsx) | 23465 | bbca178bb6f70be1 |
| [src/app/solutions/busy-google-sheet/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-google-sheet/page.tsx) | 21397 | 6bcfd69664cbf942 |
| [src/app/solutions/busy-reports/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/busy-reports/page.tsx) | 20231 | af7471f2b0f9a5fb |
| [src/app/solutions/marketing/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/marketing/page.tsx) | 31945 | 3b97132275058470 |
| [src/app/solutions/miracle-whatsapp-api/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/miracle-whatsapp-api/page.tsx) | 88018 | e597e599dbefe579 |
| [src/app/solutions/payment-reminders/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/payment-reminders/page.tsx) | 25498 | 70a1cd42aa43bdb7 |
| [src/app/solutions/utility/UtilityCodeSandbox.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/utility/UtilityCodeSandbox.tsx) | 1836 | 61a9dad434f76db7 |
| [src/app/solutions/utility/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/solutions/utility/page.tsx) | 33382 | fceeea223925f116 |
| [src/app/terms/layout.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/terms/layout.tsx) | 417 | e2df7048e611c3cb |
| [src/app/terms/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/terms/page.tsx) | 215 | 3c46a8a0cb88fc4c |
| [src/app/tools/lead-qualification-roi-calculator/ROICalculatorClient.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/lead-qualification-roi-calculator/ROICalculatorClient.tsx) | 26438 | 458c359106c2214f |
| [src/app/tools/lead-qualification-roi-calculator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/lead-qualification-roi-calculator/page.tsx) | 3482 | 75cb4d1ec3abf2e7 |
| [src/app/tools/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/page.tsx) | 15904 | 0a9c3f85ae938677 |
| [src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/QRCodeGeneratorClient.tsx) | 22390 | 9f226d788b376fce |
| [src/app/tools/qr-code-generator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/qr-code-generator/page.tsx) | 1983 | fd15fd657836834a |
| [src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx) | 30074 | ccd02ff5f9bd1688 |
| [src/app/tools/whatsapp-api-cost-calculator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-api-cost-calculator/page.tsx) | 3747 | 0a1568c32b29a475 |
| [src/app/tools/whatsapp-link-generator/WhatsAppLinkGeneratorClient.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-link-generator/WhatsAppLinkGeneratorClient.tsx) | 16764 | 148f97ee69975c8f |
| [src/app/tools/whatsapp-link-generator/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/tools/whatsapp-link-generator/page.tsx) | 2039 | 9e0d86c987a38f62 |
| [src/app/trust/security/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/trust/security/page.tsx) | 558 | 80ef3779755350f5 |
| [src/app/trust/subprocessors/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/trust/subprocessors/page.tsx) | 680 | 60bd86566183cea5 |
| [src/app/whatsapp-business-calling/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-business-calling/page.tsx) | 32695 | 89c347ff3338b098 |
| [src/app/whatsapp-coexistence/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-coexistence/page.tsx) | 42989 | 1ffcab4aa91e0a61 |
| [src/app/whatsapp-templates/TemplateCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-templates/TemplateCard.tsx) | 5048 | 3d8ceff9e05f57b2 |
| [src/app/whatsapp-templates/page.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/app/whatsapp-templates/page.tsx) | 29101 | e09d6fff71ac8603 |
| [src/components/blog/Animations.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/Animations.tsx) | 4774 | fe88dde5f88ab9cc |
| [src/components/blog/AuthorCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/AuthorCard.tsx) | 3882 | 56259ea07161512f |
| [src/components/blog/AvatarImage.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/AvatarImage.tsx) | 727 | 986fb5c47cf90b43 |
| [src/components/blog/BlogCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/BlogCard.tsx) | 6308 | 47ce870c7e646bb3 |
| [src/components/blog/ShareButtons.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/ShareButtons.tsx) | 1819 | ebddb3f8585e500a |
| [src/components/blog/index.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/blog/index.ts) | 47 | 0874bb90f6e635e5 |
| [src/components/landing/AnimatedAPIArchitecture.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedAPIArchitecture.tsx) | 12334 | dd12a2c34a23e4e1 |
| [src/components/landing/AnimatedChatbot.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedChatbot.tsx) | 17219 | 565e9355d8eedd70 |
| [src/components/landing/AnimatedPaymentReminder.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedPaymentReminder.tsx) | 17608 | 4f615aebde64162f |
| [src/components/landing/AnimatedReportPortal.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedReportPortal.tsx) | 19417 | deeeb2c1c173babd |
| [src/components/landing/AnimatedReverseFlow.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/AnimatedReverseFlow.tsx) | 14092 | 729e189331cc9707 |
| [src/components/landing/BookDemoPopup.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/BookDemoPopup.tsx) | 10473 | dc3e46f37cb6f3d6 |
| [src/components/landing/ContactCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/ContactCard.tsx) | 3614 | 1da5b9e9f81cc7cc |
| [src/components/landing/CookieConsent.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/CookieConsent.tsx) | 8067 | f1060a0d0e1a3413 |
| [src/components/landing/CookieSettingsLink.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/CookieSettingsLink.tsx) | 327 | d5caab514b3f2eec |
| [src/components/landing/Footer.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/Footer.tsx) | 12480 | 77201e8a0d2b4ee9 |
| [src/components/landing/GoogleSheetAnimation.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/GoogleSheetAnimation.tsx) | 11441 | fab00e530ad608ec |
| [src/components/landing/Header.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/Header.tsx) | 15191 | 64f6056ed250ab1b |
| [src/components/landing/home/DeveloperBand.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/DeveloperBand.tsx) | 7493 | 44ef62464e394f56 |
| [src/components/landing/home/FreeToolsBand.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/FreeToolsBand.tsx) | 4695 | ea50b1a448150064 |
| [src/components/landing/home/HomeFinalCTA.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/HomeFinalCTA.tsx) | 4294 | 7f201b1000757336 |
| [src/components/landing/home/HomeHero.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/HomeHero.tsx) | 10177 | 5617bbf0175cf27a |
| [src/components/landing/home/HowItWorks.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/HowItWorks.tsx) | 2998 | 8e4a90c3fee1290c |
| [src/components/landing/home/IntegrationsBand.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/IntegrationsBand.tsx) | 9851 | 5f47d438dbb286df |
| [src/components/landing/home/PlatformPillars.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/PlatformPillars.tsx) | 34801 | b3254d8ecf0af0f6 |
| [src/components/landing/home/ProofBar.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ProofBar.tsx) | 1977 | b3c570c01f3877fe |
| [src/components/landing/home/ResultsBand.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/ResultsBand.tsx) | 5611 | bd8bb2a739bd8052 |
| [src/components/landing/home/TrustBand.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/home/TrustBand.tsx) | 4916 | f5ed31a01ed22077 |
| [src/components/landing/index.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/index.ts) | 578 | 9bda63909e88fed4 |
| [src/components/landing/mcp/McpArchitectureDiagram.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpArchitectureDiagram.tsx) | 3458 | f2c6696ff68f7a68 |
| [src/components/landing/mcp/McpCapabilityGrid.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpCapabilityGrid.tsx) | 1555 | fa2d245362be968c |
| [src/components/landing/mcp/McpClientCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpClientCard.tsx) | 1297 | 9910bd71e3ade79a |
| [src/components/landing/mcp/McpComparison.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpComparison.tsx) | 2267 | c347542f7b376848 |
| [src/components/landing/mcp/McpExamplePrompt.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpExamplePrompt.tsx) | 2071 | 3d9ef393af538984 |
| [src/components/landing/mcp/McpFaq.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpFaq.tsx) | 1701 | 5e9b3609e85b237e |
| [src/components/landing/mcp/McpFlowSteps.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpFlowSteps.tsx) | 785 | aae32df6f469ccc6 |
| [src/components/landing/mcp/McpHeroScene.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpHeroScene.tsx) | 6390 | 7ab8fd58072c1ca9 |
| [src/components/landing/mcp/McpStatusPill.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpStatusPill.tsx) | 790 | ddb570ab2d20d254 |
| [src/components/landing/mcp/McpTrustGrid.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/McpTrustGrid.tsx) | 972 | 2e086e558257dddb |
| [src/components/landing/mcp/mcpContent.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/landing/mcp/mcpContent.ts) | 12428 | 0caa73d5a97aede1 |
| [src/components/legal/LegalDocument.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/legal/LegalDocument.tsx) | 9616 | 244ea83bcce24a5f |
| [src/components/seo/JsonLD.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/seo/JsonLD.tsx) | 15330 | 0f56d090d9333592 |
| [src/components/seo/SEO20.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/seo/SEO20.tsx) | 7221 | c64e6aed63d145b9 |
| [src/components/shared/AnimatedNumber.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/AnimatedNumber.tsx) | 2271 | ede2b39187048569 |
| [src/components/shared/BrandLogo.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/BrandLogo.tsx) | 1747 | 86164c764f78f157 |
| [src/components/shared/CTAGroup.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/CTAGroup.tsx) | 3110 | eaa27c5ce0e9debd |
| [src/components/shared/Container.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/Container.tsx) | 1054 | b3431301625aa350 |
| [src/components/shared/Eyebrow.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/Eyebrow.tsx) | 1147 | 56b974bc43d491de |
| [src/components/shared/FeatureCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/FeatureCard.tsx) | 2099 | 09fdbc9723d9d46f |
| [src/components/shared/IconBadge.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/IconBadge.tsx) | 1204 | 78dea1a1e7068103 |
| [src/components/shared/Reveal.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/Reveal.tsx) | 2249 | b64ee86127b2db18 |
| [src/components/shared/Section.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/Section.tsx) | 1483 | 71daf9b571f4c452 |
| [src/components/shared/SectionHeader.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/SectionHeader.tsx) | 1475 | 2efb4abf9bf12643 |
| [src/components/shared/SkipLink.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/SkipLink.tsx) | 1006 | 9034893509d47778 |
| [src/components/shared/StatCard.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/StatCard.tsx) | 1078 | 06e18dc482582fdb |
| [src/components/shared/TrustPill.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/TrustPill.tsx) | 651 | 698198ec333eb2a8 |
| [src/components/shared/index.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/shared/index.ts) | 577 | 35e4cbd32afe27a4 |
| [src/components/ui/accordion.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/accordion.tsx) | 2053 | 7251e973cc689641 |
| [src/components/ui/alert-dialog.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/alert-dialog.tsx) | 3864 | 59967c334f56dd44 |
| [src/components/ui/alert.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/alert.tsx) | 1614 | 49d8311589b810b1 |
| [src/components/ui/aspect-ratio.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/aspect-ratio.tsx) | 280 | 6a75117416aa8920 |
| [src/components/ui/avatar.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/avatar.tsx) | 1097 | e8672934f1c315f3 |
| [src/components/ui/badge.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/badge.tsx) | 1631 | f41c11fc13e9a1f1 |
| [src/components/ui/breadcrumb.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/breadcrumb.tsx) | 2357 | 22f3f4c13ed1085c |
| [src/components/ui/button.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/button.tsx) | 2123 | 82403231e33fd3d4 |
| [src/components/ui/calendar.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/calendar.tsx) | 7660 | fe832b1ba33bd42a |
| [src/components/ui/card.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/card.tsx) | 1989 | 78cdb63dff3ec7ef |
| [src/components/ui/carousel.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/carousel.tsx) | 5556 | b7ea0dda3903d972 |
| [src/components/ui/chart.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/chart.tsx) | 9781 | 670849399b33fecf |
| [src/components/ui/checkbox.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/checkbox.tsx) | 1226 | 4c395ef15549e460 |
| [src/components/ui/collapsible.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/collapsible.tsx) | 800 | c2c74dc3e99482d0 |
| [src/components/ui/command.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/command.tsx) | 4818 | 4fb4f8f95dfbe884 |
| [src/components/ui/context-menu.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/context-menu.tsx) | 8222 | 6573f8ed4232ae98 |
| [src/components/ui/dialog.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/dialog.tsx) | 3982 | 491a87bfae8f2877 |
| [src/components/ui/drawer.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/drawer.tsx) | 4255 | 0c9464ed4f95207f |
| [src/components/ui/dropdown-menu.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/dropdown-menu.tsx) | 8284 | 9b346378821ba06f |
| [src/components/ui/form.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/form.tsx) | 3759 | b41b4b10f5e11b2a |
| [src/components/ui/hover-card.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/hover-card.tsx) | 1532 | 031f6a309d87c8e4 |
| [src/components/ui/input-otp.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/input-otp.tsx) | 2254 | 35d561c352fde4e3 |
| [src/components/ui/input.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/input.tsx) | 967 | 6628e8fde207857b |
| [src/components/ui/label.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/label.tsx) | 611 | 9ec42c8a57e82311 |
| [src/components/ui/menubar.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/menubar.tsx) | 8394 | d3c5b6060323b78a |
| [src/components/ui/navigation-menu.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/navigation-menu.tsx) | 6664 | d71f57fe0f365541 |
| [src/components/ui/pagination.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/pagination.tsx) | 2712 | 53ffa0474d07dbfe |
| [src/components/ui/popover.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/popover.tsx) | 1635 | 29a217781737bbf5 |
| [src/components/ui/progress.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/progress.tsx) | 740 | e7a89220fb49e18d |
| [src/components/ui/radio-group.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/radio-group.tsx) | 1466 | b12ca5cef859dd75 |
| [src/components/ui/resizable.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/resizable.tsx) | 2028 | 41043c0f3dec3a41 |
| [src/components/ui/scroll-area.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/scroll-area.tsx) | 1645 | 1c5d0b242d051384 |
| [src/components/ui/select.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/select.tsx) | 6253 | 8795c9fac7c48d56 |
| [src/components/ui/separator.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/separator.tsx) | 699 | e9dddbd8dbbc0ecc |
| [src/components/ui/sheet.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/sheet.tsx) | 4090 | 3d6a560c635fd910 |
| [src/components/ui/sidebar.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/sidebar.tsx) | 21633 | 73561977bb06800b |
| [src/components/ui/skeleton.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/skeleton.tsx) | 276 | f2aea81d8baf2b62 |
| [src/components/ui/slider.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/slider.tsx) | 2001 | 55140ef92c201c82 |
| [src/components/ui/sonner.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/sonner.tsx) | 564 | 958d33cd8a852937 |
| [src/components/ui/switch.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/switch.tsx) | 1177 | 17f2390d98e8ce4d |
| [src/components/ui/table.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/table.tsx) | 2448 | 7b8c7a952cf49e78 |
| [src/components/ui/tabs.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/tabs.tsx) | 1969 | e8469e599381cf02 |
| [src/components/ui/textarea.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/textarea.tsx) | 759 | de4e9fb0fd8e8ed1 |
| [src/components/ui/toast.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/toast.tsx) | 4829 | 45d3d86ddb0b098a |
| [src/components/ui/toaster.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/toaster.tsx) | 785 | e4957974d6393d08 |
| [src/components/ui/toggle-group.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/toggle-group.tsx) | 1925 | 09eebce0dcbac76f |
| [src/components/ui/toggle.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/toggle.tsx) | 1570 | b201563ea8cdef36 |
| [src/components/ui/tooltip.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/components/ui/tooltip.tsx) | 1891 | 8d8a3645f547334b |
| [src/hooks/use-mobile.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/hooks/use-mobile.ts) | 565 | ad0936f84f1df79d |
| [src/hooks/use-toast.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/hooks/use-toast.ts) | 3917 | 12f8fcd1101acdd4 |
| [src/lib/blog/authors.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/authors.ts) | 5077 | 59cf6719848e7ef2 |
| [src/lib/blog/index.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/index.ts) | 287 | 068fab34484eb65a |
| [src/lib/blog/metadata.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/metadata.ts) | 2075 | 804b106c8f5624c1 |
| [src/lib/blog/registry.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/blog/registry.ts) | 16446 | a2c38ea46ffbbb18 |
| [src/lib/bot-master.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/bot-master.ts) | 3670 | a86dc2fb8c77344e |
| [src/lib/crm-leads.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/crm-leads.ts) | 2787 | 05a64a1190e6ec53 |
| [src/lib/db.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/db.ts) | 4551 | 4fcf933eadade33b |
| [src/lib/flows/json/book-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/book-001.json) | 5362 | 89fd0244eb2d7cfb |
| [src/lib/flows/json/ecom-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/ecom-001.json) | 5013 | 36388dca13727875 |
| [src/lib/flows/json/ecom-002.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/ecom-002.json) | 4851 | 5c6245f7152123fc |
| [src/lib/flows/json/pay-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/pay-001.json) | 5118 | 076c779f9a23b99c |
| [src/lib/flows/json/pay-002.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/pay-002.json) | 2510 | 98321dc6a7def79c |
| [src/lib/flows/json/sales-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/sales-001.json) | 5361 | 73db6b4056e68811 |
| [src/lib/flows/json/sales-002.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/sales-002.json) | 3948 | 7ee828753b0dc4b6 |
| [src/lib/flows/json/support-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/support-001.json) | 4865 | 506ab6edd6f2e3e4 |
| [src/lib/flows/json/support-002.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/support-002.json) | 5062 | 99ceb5c81eab6253 |
| [src/lib/flows/json/welcome-001.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/welcome-001.json) | 4979 | 4e88eda237a8ffa3 |
| [src/lib/flows/json/welcome-002.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/json/welcome-002.json) | 3131 | 7a3d7878e4c250a0 |
| [src/lib/flows/registry.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/flows/registry.ts) | 5866 | dd1e379d63bba3de |
| [src/lib/legal/documents.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/legal/documents.ts) | 52739 | bb26e389a09b9533 |
| [src/lib/plans.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/plans.ts) | 10571 | 97078db141300172 |
| [src/lib/recaptcha-client.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/recaptcha-client.ts) | 964 | bce47c44f02c887f |
| [src/lib/recaptcha.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/recaptcha.ts) | 2489 | 9002128f78d0a8b1 |
| [src/lib/redis.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/redis.ts) | 1832 | a47b6d1204883ebb |
| [src/lib/seo/JsonLd.tsx](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/JsonLd.tsx) | 678 | a7a05f35ea2c34b0 |
| [src/lib/seo/config.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/config.ts) | 8332 | 7c8b2c5148cbddba |
| [src/lib/seo/index.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/index.ts) | 140 | eea8c5430b5ca31c |
| [src/lib/seo/seo2.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/seo/seo2.ts) | 11506 | 7115bb6f3038d3d0 |
| [src/lib/utils.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/utils.ts) | 166 | 7c8c3dfc0cdd370d |
| [src/lib/version.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/src/lib/version.ts) | 725 | 3005f39076b3936b |
| [tailwind.config.ts](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/tailwind.config.ts) | 1696 | ade682235e52f45b |
| [tsconfig.json](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/tsconfig.json) | 742 | c17f648b9cb3de63 |
| [version.txt](/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com/version.txt) | 6 | 86f8fa832a763582 |

Lockfile versions were inspected without vendor-source review; docs/research authorities are identified in sections 2/3/8. Temporary extraction/check logs lived under `/tmp` and were not added as competing workspace documents. The inherited canonical playbook hash is recorded above so future auditing can identify the exact requirement version.
