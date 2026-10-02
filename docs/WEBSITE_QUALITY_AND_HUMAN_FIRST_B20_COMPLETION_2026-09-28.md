# B20 — ERP guide instructions and server-readable pilot

**Status:** TECHNICALLY VERIFIED / COORDINATOR REVIEW / PARTIAL  
**Executed:** 29 September 2026, Asia/Kolkata. The packet filenames retain the originating 28 September batch date.  
**Boundary:** B20 only. STOP before B21. No commit, push, deployment, publication, private-account activity or outgoing coordinator message.

The two authorized ERP guides now deliver their complete explanation in initial server HTML, with native contents, FAQ disclosures, source links, sharing fallbacks and contained table/code regions. The Google Sheets guide separates CSV file import from spreadsheet-to-spreadsheet IMPORTRANGE. The benefits guide retains five useful workflows with prerequisites, reconciliation and explicitly synthetic examples. Unsupported named results, price bands, launch timing and universal automation assurances are withheld. The inherited duplicate description is corrected at the article emitter.

This is a local technical candidate awaiting independent coordinator review. F032's two-guide instructions are corrected locally; actual Busy export, Google import and live synchronization remain unverified. F022 remains PARTIAL: two of nine formerly client articles have been converted, seven remain for B21/B22. No human editorial review or owner fact approval is inferred.

## Scope and source changes

Routes remain `/blog/busy-erp-google-sheets-integration-complete-guide` and `/blog/busy-accounting-whatsapp-integration-benefits`.

| Change | Purpose and consumers |
|---|---|
| Two page entries and their layouts | Thin server entries using a shared server article; remove the direct duplicate description emitter; preserve route/publication identity |
| `src/lib/blog/erp-guides.ts` | Canonical typed sections, examples, FAQ and links for both visible articles and full Markdown content |
| `src/components/blog/ERPGuideArticle.tsx` | Semantic article/header/sections, native contents and FAQ, B19 pending attribution/local initials, labelled keyboard-scrollable regions, ordinary CTA/source/share/related links |
| `src/components/blog/CopyArticleLink.tsx` | Optional narrow clipboard island, initially disabled server state, success/error announcement and permanent native canonical-link recovery |
| `src/lib/blog/registry.ts` | Canonical titles/excerpts/SEO/full Markdown; preserves IDs, slugs, tags, categories, raw dates, author IDs and editorial history; Sheets reading estimate becomes 12 minutes |
| `src/app/api/mcp/pages/[slug]/route.ts` | Full conditional article passage for these two guides; existing read-only method/guard behavior retained |
| `src/lib/blog/sheets-exercise.ts`, one test file and twelve scripts | Offline exercises, renderer/content tests and current-build guide/inherited safeguard checks |
| Ledger, owner-input sheet and article contract | Exact pending decisions, nine-route denominator, downstream contract and stop boundary |

The baseline-relative inventory has **8 changed inherited files and 19 new source/helper/test/report files: 27 patch files**. It separates the B20 delta from the inherited dirty Git tree. See [source inventory](evidence/b20-2026-09-28/source-review-inventory.json), [exact patch](evidence/b20-2026-09-28/b20-erp-guide-pilot.patch) and [disposable patch verification](evidence/b20-2026-09-28/patch-verification.json). Before editing, fourteen article blocks were classified in [block dispositions](evidence/b20-2026-09-28/block-dispositions-before.json); original HTML and occurrence maps remain in the packet.

The single canonical guide record supplies body, FAQ/schema, registry titles/descriptions/excerpts, related-card text and full MD/MCP explanation. Metadata still uses the existing blog configuration. B19 pending authorship, local initials, publication labels, raw history and permanent-index contracts are retained. The existing pricing pillar remains a protected server reference. Reveal/AnimatedNumber baselines, shadcn UI, public media, database, packages, configuration, API denial/retirement/enquiry guards and earlier batch evidence remain protected.

## Instructions and evidence limits

Official public Google documentation was opened on **29 September 2026**. The corrected procedure explains:

1. Obtain a supported Busy report/export, inspect company/year/date scope, preserve the source and choose a safe destination.
2. Import a local CSV through Google Sheets **File → Import**, select the separator/import option and validate data types, duplicate keys, totals and freshness.
3. Use IMPORTRANGE only for an existing Google spreadsheet URL plus bounded range. Check source access and destination connection permission; destination editors can import other source ranges once connected.
4. Treat IMPORTDATA as a separate CSV/TSV URL path. Do not publish a private ledger to make that path work.
5. Keep live connectors, triggers, refresh, recovery, quotas and downstream WhatsApp/CRM/document workflows conditional on separately verified implementation.

Sources: [Google file import](https://support.google.com/docs/answer/40608?hl=en), [IMPORTRANGE](https://support.google.com/docs/answer/3093340?hl=en), [IMPORTDATA](https://support.google.com/docs/answer/3093335?hl=en), [Sheets API limits](https://developers.google.com/workspace/sheets/api/limits). The limits page records an update of 3 September 2026. Dated source/support boundaries are in [documentation record](evidence/b20-2026-09-28/google-documentation.json).

**Thirteen synthetic/offline fixtures pass.** The two-row/eight-column CSV checks a quoted comma, explicit company/year/date keys and ₹77,000 invoiced − ₹10,000 paid = ₹67,000 outstanding. Fixtures exercise malformed/duplicate/mixed-scope inputs, invalid dates/amounts, URL/range prerequisites, missing source/destination permission, bounded range, age calculations and the chronological ₹45,000 → ₹35,000 → ₹67,000 ledger example. The helper is a small fixture parser and prerequisite validator; it is not Google's formula engine or a Busy connector. No Google UI import, actual Sheets calculation, private source access, Busy export, scheduler or live sync was executed. These limits appear beside the public examples and in [fixture results](evidence/b20-2026-09-28/synthetic-procedure-fixtures.json).

The Sheets guide retains about 2,203 Markdown words and the benefits guide about 1,638, preserving practical reporting/access/recovery and five workflow explanations. Semantic claim closure is limited to these two guide consumers. The [parity matrix](evidence/b20-2026-09-28/claim-consumer-parity.json) records withheld proof/commercial/security/refresh claims and preserved identity/history. The broader source sweep still finds synthetic Sharma names in two inherited landing animation files; those are unchanged and are not treated as approved customer proof by this batch.

## Verification

Final build **`_Yh_dfhmWvfqdBS6gdhps`**, Node **24.1.0**, Next **16.3.6**, 111 generated entries and 53 sitemap HTML routes. The owner-authorized Node/current-workspace exception applies to local verification only. Captcha, CRM, notification and database enabling values were explicitly empty for build/preview; a fake public captcha key was used for intercepted fixtures. No secret environment file was read/copied for the packet.

| Current candidate check | Result |
|---|---|
| Full `npm run check` | 102/102 tests; zero lint warnings/errors and zero TypeScript errors |
| Guide built contract | 37 assertions |
| Inherited shell/date/pricing/platform/MCP/home/media/ERP/automation/identity regressions | 1,800 assertions, all pass |
| Total built assertions | **1,837**, all pass |
| Browser main matrix | 46 rows / 972 assertions / 86 screenshots |
| Settled native share/related and static supplements | 20 rows / 40 assertions / 40 screenshots |
| Fresh native detail checks | 2 rows / 4 assertions / 6 screenshots |
| Total browser | **68 rows / 1,016 assertions / 132 recorded screenshots**, all pass |
| Offline procedure fixtures | 13/13 |
| Whole-site basic validator | **1,201 pass / 0 fail / 192 not-checked / 1 unavailable**, exit 0 |

The browser matrix covers both guides at **1440/1024/768/375/320** in hydrated, disabled-JS, failed-script and reduced-motion conditions; additional 320px text-spacing, forced-color and 1280→320 reflow checks pass. It exercises native TOC/skip focus, keyboard FAQ opening/closing, labelled region focus/scroll, complete paragraph visibility, dates, local initials and share fallbacks. Social/canonical destinations were inspected without external navigation. Clipboard success/denial were synthetic mocks, not actual OS clipboard permission tests. The task-owned CLI Chromium session allowed loopback GET/HEAD and blocked external/mutating requests; the main run records **zero external requests, zero POSTs and zero browser errors**.

Visual inspection actually covered **23 all-section hydrated overview sheets, 10 native/keyboard overview sheets and 6 fresh native detail captures**. All changed sections across the five widths were inspected. Maps preserve source PNGs and crop coverage in [visual record](evidence/b20-2026-09-28/visual-inspection.json). A hydrated full-page Sheets PNG at 320px showed a duplicate hero-like tail, and 375px a sticky-header ghost. Fresh DOM checks show one H1 and the correct separate related card; settled native viewport captures at every width resolve that tail. The original images remain as a full-page capture/compositor ambiguity. Native viewport evidence is used for that portion. Emulated Chromium coverage does not establish physical-device, assistive-technology or complete OI11 conformance.

The 192 not-checked basic-validator assertions include eleven newly native closed FAQ answers plus 181 inherited assertions. Their native keyboard/static reading behavior has separate browser evidence. B03's retired scoring remains the one expected unavailable item. A basic-validator exit 0 does not approve site-wide facts, domain-owner decisions, ranking or release.

The packet retains preliminary failures: the initial lint diagnosis, an early browser-harness URL-global error, date-rendering correction and two real 320px text-spacing overflow failures. The final share anchor uses its own block/width/wrapping classes and passes the same text-spacing checks. Earlier logs/screenshots/build IDs are clearly under `preliminary/`; current summaries bind to the final build. See [regressions](evidence/b20-2026-09-28/results-regression-summary.json), [browser summary](evidence/b20-2026-09-28/browser-results-summary.json), [final check](evidence/b20-2026-09-28/check-final.txt) and [validator](evidence/b20-2026-09-28/whole-site-validator.json).

## Bounded payload comparison

| Route | HTML before → after | Initial referenced JS before → after | JS difference |
|---|---:|---:|---:|
| Busy → Sheets | 141,586 → 180,171 bytes | 1,056,204 → 831,072 bytes | −225,132 |
| Busy workflow benefits | 113,517 → 164,463 bytes | 1,019,562 → 831,072 bytes | −188,490 |

HTML increases by **38,585 / 50,946 bytes** as the complete server explanation is delivered. These are decoded GET body bytes and sums of distinct initially referenced script bodies, with shared scripts counted per route. The before build is B19 `lZwqn8myzMsOIvI2MFAy1`; the after build is the final B20 ID. Cache, encoding, network, CPU/device, latency and CWV conditions were not matched. There is no speed/CWV acceptance claim; **B29 remains pending**. See [comparison and limits](evidence/b20-2026-09-28/payload-comparison.json).

## Preservation and review identity

The safe pre-edit snapshot contains **6,433 files** at HEAD `6fdf9db34ea3d06772059873890f03fa1ed02657`. Eight inherited files changed; **6,425 remain byte-identical**, with no removal. New files are explicitly enumerated. Database, dev log and incremental type-info files retain their original hash, size and modification time. Public assets and the 125 stored B16 optimizer/download bodies remain unchanged. Earlier batch packets, author/history contracts, pricing and animation baselines are not rewritten.

The exact patch is checked/applied only against a disposable copy of before-source and matched to all 27 current file hashes. The [candidate manifest](evidence/b20-2026-09-28/candidate-manifest.json) seals baseline-relative source, current evidence/captures and actual `.next` server/static/build artifacts; it excludes secrets, caches, standalone vendors and its own manifest/verification files. [Manifest verification](evidence/b20-2026-09-28/manifest-verification.json) records the exact count and zero mismatches. Inherited Git dirt is retained; HEAD is unchanged. The original audit, master playbook and Phase 2 blueprint remain historical authority, with current status in the execution ledger.

Current loopback preview: **http://127.0.0.1:4306**, bound to `127.0.0.1`, PID **54549**, Codex session **15187**. It remains available for review. This is not production evidence.

## Pending decisions and next gate

- **F022:** PARTIAL until all nine formerly client guides pass. Two B20 pilots are converted; two B21 and five B22 articles remain. The already-server pricing pillar is an additional B21 reference outside the nine.
- **OI01:** Actual supported Busy export/import/connector, account access, trigger/scheduler/sync and recovery behavior.
- **OI06:** Continuing dated documentation review and current commercial/provider conditions; no universal refresh or commercial approval.
- **OI08:** Permissioned named customer proof, outcomes and media. Synthetic examples provide no customer-result evidence.
- **OI12:** Verified history, named human review and editorial approval. This batch creates zero human events.
- B19 identity/authorship/index/jobs decisions, OI02/OI07 and broader OI11 support/conformance remain pending. Existing pricing owner decisions stay pending.
- Inherited **Cloud unnamed controls** and **Graph 320px code overflow** remain assigned to B21/B22 and are not closed here.

Use [the article contract](WEBSITE_QUALITY_AND_HUMAN_FIRST_B20_ARTICLE_CONTRACT_2026-09-28.md) for subsequent authorized consumers. Owner questions remain in the single [owner-input sheet](legal-policy-inputs.md); no second decision source is introduced. Independent coordinator acceptance is the next gate. **Do not start B21 from this report.** Recovery should preserve the corrected CSV/spreadsheet distinction and server-reading baseline; do not restore the old client-hidden body or unsupported claims. No new chat, subagent, model override, real send, email, payment, provider activation, database push, commit, push, cloud change or deployment occurred.
