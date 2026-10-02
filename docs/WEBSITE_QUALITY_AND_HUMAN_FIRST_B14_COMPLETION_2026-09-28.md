# B14 — MCP availability and truthful website discovery

**Status: TECHNICALLY VERIFIED / COORDINATOR REVIEW PENDING / F011 PARTIAL.** B14 only. Stop before B15. The technical website contract is ready for review with current product, provider, account, plan and gateway facts precisely withheld. No connected product or release approval is implied.

## Candidate and authority

B13 independent technical acceptance is recorded in the canonical batch ledger: coordinator check **82/82**, all **1,804** B13 manifest hashes verified, build `oUtYvkLJBw45rY6uFAfpD`. F007/F008 remain PARTIAL. B14 was then explicitly authorized in this chat with Node 24, the current workspace and local build/loopback verification; no delegation, other chat, commit, push, cloud, deployment, provider activation, private access or real submission was authorized.

- Workspace: `/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com`.
- HEAD unchanged: `6fdf9db34ea3d06772059873890f03fa1ed02657`.
- Final build: **`kBzrSFLnEyGxAcYnyZDv1`**, Node **24.1.0**, Next **16.3.6**, **99 generated pages**. Build and `npm run check` both exit **0**.
- Task-owned production-mode preview: **`http://127.0.0.1:4305`**, bind **127.0.0.1**, OS PID **89209**, exec session **18889**. B13 and intermediate task-owned previews were stopped. This listener is retained for review.
- Baseline: **1,801** inherited nonignored files; **22** refined, **1,777** unchanged, **2** unsupported static OAuth advertisements retired. **10** new source/test/helper files plus this report. The source inventory and selective patch include exactly **35** changed/new/retired paths, separate from the larger inherited Git diff.
- Build safety: owner-authorized current-workspace exception applies. The inherited build pipeline still invokes Prisma generation and dotenv loading/copying; this is not a claim of zero env loading. A fake public captcha fixture was used for the final build. Runtime BOT_MASTER_AUTH_TOKEN, CRM_LEADS_COMPANY_UID, RECAPTCHA_SECRET_KEY and RECAPTCHA_ALLOWED_HOSTNAMES were empty, with the explicitly selected existing local SQLite path. No secret values were copied into evidence. SQLite content/mtime/size remained unchanged; no migration or `db:push` ran.

The sealed candidate verifies **2,985 artifact hashes with zero mismatches**, including compiled server/static output and **33/33** protected checks.

Evidence: [scope](evidence/b14-2026-09-28/scope.json), [baseline](evidence/b14-2026-09-28/baseline.json), [source/import inventory](evidence/b14-2026-09-28/source-review-inventory.json), [B14-only patch](evidence/b14-2026-09-28/b14-mcp-contract.patch), [candidate manifest](evidence/b14-2026-09-28/candidate-manifest.json), [hash verification](evidence/b14-2026-09-28/manifest-verification.json).

## Final behavior and historical evidence

The **20 July 2026 owner-reported availability confirmation** remains in `mcpContent.ts`, alongside an explicit historical-evidence annotation. The earlier MCP master plan's limited business-tool/provider audit is also unchanged. The later report is not discarded, and neither historical source establishes universal current access. The visitor now sees that availability was reported on July 20 and must confirm current tools, assistant support, plan entitlement and account permissions.

`src/lib/mcp-contract.ts` supplies shared qualifications and the same twelve FAQ answers to HTML, FAQPage schema, Markdown and passage feeds. Client, capability and prompt IDs/arrays remain useful; statuses read **Confirm access**. Architecture is explicitly illustrative and source-reported. Sample numbers are labelled illustrative, and copying a prompt only copies text. No accounting, orders, payments or finance access is implied. Security/isolation/approval/revocation/audit controls are described as the documented design needing current product verification, with retained-record limits consistent with B09 privacy terms.

The home integration band, feature card, Standard plan copy and comparison detail now qualify MCP access. Existing plan amounts, billing cycles, setup/GST arithmetic, IDs and editorial records are preserved. Current prices/payment/activation remain unavailable under B12. This batch does not approve the other home/integration/service claims assigned to later batches.

The primary CTA is still `/contact?subject=Whats91%20MCP%20Access`. B08 subject allowlisting, validation, bounded verification, cancellation, known failure, uncertain receipt handling and retry logic are unchanged. MCP enquiry copy states that submission does not connect an assistant or enable access. The contact page's existing no-JS/failed-JS support fallback now also has a native email link carrying that exact subject. Its fallback is not a functioning no-JS form. A synthetic receipt still says **Enquiry Received**, with the no-activation qualification visible, and another enquiry retains the subject.

Native MCP FAQ disclosures work before hydration, with no JavaScript and with scripts blocked. Unhydrated copy buttons are withheld; prompt text remains selectable. Local page-specific wrapping repairs address the 1024px sample-card overflow and narrow expanded-text min-width issue without modifying shared primitives or protected UI.

## Website resources versus product gateway

`/api/mcp` is now a **website content catalogue**. It advertises actual same-site resource/passages URLs and **GET, HEAD, OPTIONS** only. There is no `tools`, protocol version, executable capabilities, fictitious `whats91://` URI, auth issuer or account permission advertisement. Catalogue count equals the listed passage count; every concrete resource URL was parsed and fetched locally. Pricing resources retain the explicitly unavailable numerical-rate/quote conditions.

The descriptor, Markdown and passage routes share read-only headers. OPTIONS returns **204** with no body; HEAD has no body. POST/PUT/PATCH/DELETE return **405**, `Allow: GET, HEAD, OPTIONS`, no-store and noindex without executing JSON-RPC. Unknown Markdown/passage slugs remain **404**. Existing canonical Markdown links remain correct. New `/api/md/mcp` and `/api/mcp/pages/mcp` representations have matching qualifications/FAQ answers and no fabricated publication, update or review date; the MCP HTML advertises these actual alternates.

Unsupported static metadata at `/.well-known/oauth-authorization-server` and `/.well-known/protected-resource` has been replaced by explicit **410 Gone**, no-store/noindex retirement responses. They publish no issuer, authorization/token route, JWKS, grants, supported scopes or bearer/resource registration. OPTIONS and unsupported methods retain the read-only policy. No OAuth service, gateway or account authorization was fabricated from a dependency.

The approved-source historical destination is `https://mcp.whats91.com/mcp`, separate from this website. The authorized unauthenticated public GET could not resolve through the local network; a public web open also returned an internal error. These failures are retained as **unavailable evidence**, not proof that the product does or does not work. No sign-in, token request, connection, JSON-RPC POST or private endpoint access occurred. OI10 still requires current approved gateway/auth identity; OI01/OI03 require enabled tools, each client/tier/setup path, permissions and plan entitlement/terms.

Protocol reasoning used the pinned official [MCP transport specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) and [authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization). The static website catalogue is not an executable Streamable HTTP gateway. [Reference boundaries](evidence/b14-2026-09-28/protocol-references.json) and [external read-only outcome](evidence/b14-2026-09-28/external-read-only.json) retain the distinction.

## Verification on the final build

| Run | Final outcome | Evidence |
|---|---:|---|
| `npm run check` (lint, noEmit types, tests) | **91/91**, zero lint/type errors, exit 0 | `check-acceptance.txt` |
| New consequential MCP fixture tests | **9/9**, included in 91 | `mcp-fixtures.txt`, `tests/mcp-website-contract.test.mjs` |
| Built MCP methods/headers, retirement, concrete URLs, alternates, FAQ/schema parity | **279/279**, 70 local requests, exit 0 | `built-mcp-contract.json` |
| Accepted shell/safe-route regression | **256/256** | `built-shells.json` |
| Date and safe-route regression | **107/107** | `built-date-consumers.json` |
| Pricing/payment/quote regression | **128/128** | `built-pricing-consumers.json` |
| Platform qualification regression | **173/173** | `built-platform-consumers.json` |
| Hydrated five routes × five widths, all 12 FAQ open/close states, copy, CTA/failure/retry/cancel, expanded text/forced colors | **320/320**, 25 route-width rows | `browser-mcp-accepted.json` |
| No JavaScript: five routes × five widths, every MCP FAQ, selectable prompt/native email fallback | **150/150**, 25 rows | `browser-mcp-nojs-accepted.json` |
| Full changed MCP section checks/screenshots | **30/30**, 30 rows | `browser-section-inspection.json` |
| Home/feature/Standard/architecture/FAQ consumer screenshots and scoped status | **50/50**, 25 rows | `browser-consumer-inspection.json` |
| Settled native full-page captures | **5/5**, five widths | `browser-full-page.json` |
| JavaScript enabled with all scripts aborted: native FAQ and enquiry fallback | **85/85**, 10 rows | `browser-failedjs.json` |
| Synthetic enquiry receipt, no connected-access claim, reset subject | **5/5** | `browser-synthetic-receipt.json` |
| Whole-site inherited GET-only validator | **1,306 pass / 1 fail / 229 not-checked / 1 unavailable**, exit 1 | `site-validator-final.json` |

All accepted route/browser artifacts above identify build `kBzrSFLnEyGxAcYnyZDv1`. The **943** built assertions and **645** browser assertions are bounded technical evidence, not provider/account/security/conformance approval. Local denied-method payloads were sent only to website content/retirement handlers. Browser traffic passed only loopback GET/HEAD; two unavailable-verification replies and one enquiry receipt were intercepted synthetic POSTs, never actual service submissions. Clipboard and captcha were fixtures. Failed-JS script aborts were deliberate. No externally loaded provider service, real enquiry, lead, payment, email, WhatsApp action or MCP account connection occurred.

Actual screenshots were reviewed at **1440 / 1024 / 768 / 375 / 320 CSS px**, including status wrapping, long copy, native controls, architecture, prompts and plan enquiry conditions. Raw screenshots/contact sheets are under `output/playwright/b14/`. Full-page captures from scroll zero and recorded DOM coordinates produce faithful inspection crops; these avoid fixed-header artifacts in initial locator screenshots without hiding or changing UI. The original captures and diagnostics are retained. Reduced motion, keyboard names/focus/native FAQ states, 320px expanded letter/word/paragraph spacing and forced colors were checked. This is browser emulation, not physical-device or screen-reader acceptance.

Intermediate failures remain visible: sandbox EPERM for loopback start/read (authorized escalation succeeded), Markdown GET headers missing from the first fixture (fixed), overly broad alert lookup also matching Next's route announcer (scoped to the form), initial no-JS form assumption (actual support fallback tested), 1024px sample-card overflow (repaired), and settled 320px expanded-text overflow (local wrapping repaired). Assertions were retained; final results are fresh, not relabelled historical passes.

## Residual gates, preservation and recovery

The sole current whole-site validator failure is the inherited duplicate description on `/blog/busy-erp-google-sheets-integration-complete-guide`. Its two identical meta descriptions remain assigned to later content/metadata batches. B03 scoring stays deliberately unavailable. The **eight inherited B13 article matrix observations** remain: five unnamed-input observations on the Cloud API complete guide, two Miracle article code-width observations at 375/320, and one Graph article share/tag overflow at 320. Those article browser states were not rerun or repaired by B14; their B13 evidence is byte-preserved. No whole-site fact or WCAG conformance claim is made.

OI01/OI10/OI03 remain PENDING for current tools, provider tiers/setup, account/plan/reporting eligibility, approved gateway/auth metadata and commercial authority. OI05/OI12 and earlier owner/support/date/history gates remain pending; there are **zero** new human-review events and **zero** newly approved product/commercial facts. Full device/screen-reader/support-policy coverage and matched performance-budget acceptance remain B29/B31 work; no numeric performance improvement is asserted.

All **33** explicit protected checks pass, including both database files' SHA/mtime/size, dev.log, tsconfig.tsbuildinfo, protected UI, B13 evidence/output, prior B05–B13 completion reports, package/config/env-example safety, source prices/privacy/date records, MCP master plan and B08 form contracts. Before/after module evaluation confirms **27** existing records' IDs/dates/authors/editorial history unchanged: 10 posts, 4 authors, 11 legal records and 2 plans. The complete baseline comparison records every authorized refinement and the two retired advertisements; there is no unrelated deletion. Prior manifest file bytes remain unchanged, although authorized later source/build changes naturally supersede older source/build hashes.

Recovery uses the B14-only patch and baseline hashes/snapshot for selective source repair, preserving all inherited work. Retired OAuth source originals are retained in the patch and baseline for historical review; recovery must keep a truthful retirement/resource-only representation and must not re-enable the misleading advertisements or an unsafe handler. No `reset --hard`, database rollback, branch/index mutation or operational rollback occurred. Generated `.next` output is build evidence; source remains canonical.

## Closure and next gate

| Ownership | Scoped conclusion |
|---|---|
| F011 | Technical correction verified; coordinator review pending; current product/account facts PARTIAL |
| Q2.03 | Consistent qualified status across MCP page/cards, FAQ, metadata/schema, plans, home/features and alternate formats |
| Q2.04 | Implemented website methods/resources match advertisements; unsupported OAuth claims retired; external product identity remains withheld |
| Q7.10 | Exact B08 enquiry subject, failure/retry/cancel/fallback and synthetic receipt preserve the enquiry-only contract |
| Q2.11 / Q4.05 shared | Affected equivalents and built/browser states checked; broader claims and full accessibility remain separate owner/batch gates |

See the [canonical batch ledger](WEBSITE_QUALITY_AND_HUMAN_FIRST_BATCH_PROGRESS_2026-09-28.md) and [single owner input sheet](legal-policy-inputs.md). **Stop for coordinator review before B15. No commit, push, deployment, publication, private access or activation is authorized or performed.**
