# Website Quality and Human-First B07 Completion Candidate

**Batch:** B07 — Make verification tools report evidence honestly  
**Status:** ACCEPTED LOCALLY — independent coordinator review and 28/28 checks; website is not all-pass  
**Executed:** 28 September 2026, Asia/Kolkata  
**Baseline HEAD:** `6fdf9db34ea3d06772059873890f03fa1ed02657`  
**Authority:** B06 accepted after independent coordinator review; B07 explicitly authorized in this thread on installed Node 24/current workspace. Script, offline fixture, documentation and safe local GET work only. No B08, commit, push, deployment, cloud change, external account action, real submission, malicious probe or application/UI modification.

## Outcome and finding state

F033 is locally repaired and ready for independent coordinator review. The validators identify the served build, count parsed element occurrences, distinguish checked assertions from unavailable or not-checked evidence, and reject empty inventories, bad/empty/error/timeout responses and wrong builds. They no longer require a homepage Product or Breadcrumb absent from its current contract, a price/rating/official-status assertion, or historical calculator rate strings in the page wrapper. The existing B03 retired SEO scorer remains unavailable.

The combined live run correctly **exits 1**. The Busy ERP–Google Sheets guide emits **two description meta tags**. The tool reports that single metadata failure rather than hiding it; an independent Python standard-library HTMLParser confirms count 2. Application remediation is outside B07 and was not attempted.

## Changed files and contracts

| File | Change |
|---|---|
| `scripts/seo-validation/evidence.mjs` | Dependency-free structural HTML/XML tree; quoted attributes/comments/raw scripts; element counts; checked GET/response-body timeout; sitemap inventory; JSON syntax/basic structure/FAQ/local graph checks; decoded Next bootstrap build identity |
| `scripts/seo-validation/run.mjs` | Shared modes, loopback-only GET targeting, per-page build guard, explicit status rows and JSON evidence; separate syntax/semantic/eligibility boundaries |
| `scripts/seo-validation/crawl-sitemap.sh` | Compatibility wrapper for crawl mode; source line counts removed |
| `scripts/seo-validation/check-links.sh` | Compatibility wrapper; root/absolute same-site links included, query strings preserved; empty inventory or failed fetch cannot pass |
| `scripts/seo-validation/check-endpoints.sh` | Compatibility wrapper; nonempty successful responses required for sampled robots/markdown/MCP/image endpoints; retired SEO GET checked safely |
| `scripts/seo-validation/check-schema.mjs` | Compatibility wrapper; real script element attributes/JSON parsed, no forced Product/rating/zero-price/award facts |
| `scripts/verify-ai-readiness.mjs` | Compatibility wrapper for served-evidence mode; current entity contract and rendered calculator controls; no source-substring score or eternal rates |
| `scripts/seo-validation/README.md` | Runtime, command, exit, parser, build identity, source contract and verification limits documented |
| `tests/seo-validation.test.mjs` | 17 offline behavior fixtures with known-good and adverse inputs |
| B06 completion report and batch progress ledger | Record independent local acceptance of B06, preserve production/edge/override exclusions and identify B07 review gate |
| This report and `docs/evidence/b07-2026-09-28/` | Durable results, hashes, patch, negative and independent diagnostic evidence |

The reviewable script/test patch is [`b07-validator.patch`](evidence/b07-2026-09-28/b07-validator.patch). Exact file hashes, unchanged B06 package/lock hashes and local artifact identity are in [`candidate-manifest.json`](evidence/b07-2026-09-28/candidate-manifest.json). No new dependency was added. Inherited B01–B06 source, dirty documentation/tests/database state, AGENTS and protected UI components were preserved.

## Offline verification

[`offline-fixtures.tap`](evidence/b07-2026-09-28/offline-fixtures.tap) records **17/17 passing tests**. Negative inputs are expected to produce failure/unavailable/nonzero results; passing tests establish that rejection behavior.

- One-line HTML with multiple tags; reordered/case-insensitive/single-quoted attributes; entity decoding; duplicate canonical count 2; missing/wrong/relative canonical; empty metadata and missing/duplicate H1.
- Comments, raw script content, templates and explicit hidden nodes cannot masquerade as body text or H1 tags.
- Empty/error sitemap, duplicate URLs, foreign origin, API inventory entry, missing loc, unsupported sitemap index; no inventory cannot pass.
- Invalid JSON fails syntax. Valid JSON `null`, `{}`, `[]`, empty graph, bare type, bogus properties and non-string types fail basic schema structure. Useful schema passes that bounded check without semantic certification.
- FAQ only in JSON/hidden text fails server consistency; matching rendered Q/A passes; question controls/category filtering yield not-checked pending browser observation. Empty filtered inventory is not excused.
- Duplicate graph IDs and unresolved same-site references fail; nested definitions resolve.
- Missing/mismatched/conflicting build IDs fail or remain unavailable; plain text/schema containing a build token cannot establish bootstrap identity.
- HTTP 404, empty body, wrong media type, redirect, network error, request timeout and body timeout reject. Empty/broken link inventories and missing endpoint evidence reject.
- Known-good full crawl fixture exits 0. Wrong-build orchestration stops before sitemap/page verification. Empty/all-not-checked results do not become checked passes.

[`npm-check.log`](evidence/b07-2026-09-28/npm-check.log) records successful ESLint, TypeScript and **28/28 tests** (11 inherited + 17 B07). `git diff --check` passes. No lead, webhook or SEO-fetch POST is exercised.

## Identified B06 preview and live results

- Base: `http://127.0.0.1:4305`, loopback only; Node `24.1.0`, Next `16.3.6`.
- Expected and observed build: **`LqJ6HGJMEhtCWAWLqevpg`**, matching `.next/BUILD_ID` and the decoded App Router root bootstrap on all 59 HTML pages (60 identity assertions including initial homepage guard).
- Scope: **59 sitemap URLs**, **190 JSON-LD blocks**, **98 internal link destinations**, **171 GET requests** in combined mode. B06's 63-route/194-block snapshot also included four non-sitemap routes; these are different inventories, not lost schema blocks.
- Final combined report: **1370 pass, 1 fail, 169 not-checked, 1 unavailable**, exit **1**. Counts describe assertions, not quality scores or percentages.

See [`live-all.json`](evidence/b07-2026-09-28/live-all.json), [`live-all.log`](evidence/b07-2026-09-28/live-all.log) and [`diagnostic-cross-check.json`](evidence/b07-2026-09-28/diagnostic-cross-check.json).

| Compatibility entry point | Exit | Meaning |
|---|---:|---|
| Crawl sitemap | 1 | Duplicate description count 2 on `/blog/busy-erp-google-sheets-integration-complete-guide` |
| Internal links | 0 | 98 discovered destinations returned successful nonempty responses; fragments/hydrated/external links outside scope |
| Schema | 0 | Checked syntax/basic structure/graph contracts pass; 166 FAQ checks and semantic/eligibility certifications explicitly not checked |
| Endpoints | 0 | Checked sampled endpoint contracts pass; retired remote scoring deliberately unavailable |
| Readiness compatibility | 0 | Current rendered entity/control/discovery contracts pass; 169 assertions remain not checked and retired scoring unavailable; no AI readiness score |

All entry-point commands and statuses are in [`entrypoints.json`](evidence/b07-2026-09-28/entrypoints.json); individual `live-*.json` and `live-*.log` artifacts retain complete rows. The live [`wrong-build.json`](evidence/b07-2026-09-28/wrong-build.json) negative pins `deliberately-wrong-build`, observes the B06 ID, exits 1 and stops after the initial homepage request.

## Honest residuals and recovery

Of 169 not-checked assertions, **166** need hydrated FAQ expansion or category selection. The current Radix/custom question controls omit answers from initial HTML; `/faq` renders one active category via `FAQBrowser.tsx`. This is recorded as a browser evidence requirement, never as a matching-content pass. Remaining not-checked rows cover full schema vocabulary/factual semantic certification, search-feature eligibility, and current prices/official-status/AI behavior. OI01/OI03 owner facts remain unresolved by these tools.

The parser is bounded structural extraction, not a full HTML5 DOM/layout/hydration engine. It decodes common/numeric entities, checks parsed emitted elements, reports malformed structure, and never executes embedded scripts. CSS visibility, robots user-agent precedence, full API semantics, live provider rates, external content, fragment anchors, calculator calculations/inactive tabs and visual usability remain outside scope. Build identity establishes the served artifact, not source freshness or production release proof. No visual delta was introduced.

Exit 0 for a narrow mode means only its checked contracts passed; unavailable remote scoring is an explicit named exclusion, while its GET 405/no-store boundary is separately required. Required fetch/inventory/build failures remain nonzero. Recovery must preserve explicit unavailable/not-checked reporting if a future Next bootstrap/parser contract changes; reverting to the old false-green scripts is not acceptable closure.

**Next gate:** Independent coordinator review of B07 patch, fixtures, identified live evidence and residuals before B08. No subsequent batch or release action is authorized by this report.
