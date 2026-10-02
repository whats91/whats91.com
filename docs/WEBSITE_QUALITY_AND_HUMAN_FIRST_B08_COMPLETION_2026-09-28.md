# Website Quality and Human-First B08 Completion Candidate

**Batch:** B08 — Bound form recovery and preserve enquiry context  
**Status:** ACCEPTED LOCALLY — independent coordinator review/check 49/49; primary journey remains PARTIAL  
**Executed:** 28 September 2026, Asia/Kolkata  
**Baseline HEAD:** `6fdf9db34ea3d06772059873890f03fa1ed02657`  
**Authority:** B07 accepted and B08 explicitly authorized in this chat on installed Node 24/current workspace. Local source, offline fixtures, safe GET/HEAD/OPTIONS and isolated browser mocks only. B09, commit, push, deployment, cloud changes, migrations, provider activation, real submissions and external account actions were not performed.

## Outcome and finding state

Contact and demo enquiries now have bounded captcha initialization, verification and submission; common client/server field limits; cancellation; actionable field/error/status recovery; retained input after failure; and acknowledgement only with a confirmed local saved-record identifier. A timeout after POST never asserts that nothing was saved. Uncertain submissions require an explicit duplicate-warning retry; confirmed popup receipts survive close/reopen. No automatic submission retry was added.

The MCP primary CTA says **Request Whats91 MCP access**. Its existing `/contact?subject=Whats91%20MCP%20Access` destination initializes the supported subject through direct/client navigation, refresh and history. Only one exact allowlisted nonpersonal query value is accepted; arbitrary/duplicate values cannot become trusted routing or HTML. This fixes F035's local context loss; actual MCP connection, capability and destination activation remain B14/OI01/OI10 decisions.

F005 is **PARTIAL**: independent bounded recovery and a process-local resource guard are implemented and verified. Durable cross-request/process idempotency, recovery of late writes, retention, recipient/delivery authority and final abuse policy remain withheld under OI09. F004 remains PARTIAL from B04. OI04 provider roles/transfer/storage/location/legal notice/retention facts were not fabricated. Primary conversion closure is withheld; no partial outcome is counted as final acceptance.

## Changed files and consumers

| Files | Classification and behavior |
|---|---|
| `src/lib/bounded-operation.ts`, `src/lib/enquiry-contract.ts` | REPLACE scattered validation/waiting with shared limits, deadline/cancellation helpers and supported subjects. Waiting can end even if an underlying operation cannot be cancelled. |
| `src/lib/recaptcha-client.ts` | REFINE lazy single-flight script loading, cleanup/retry after load failure, ready/execute/whole-captcha deadlines, empty/oversized token rejection and caller cancellation. Google verification loads on a valid submission rather than popup open. |
| `src/lib/recaptcha.ts` | REFINE fail-closed verification: explicit configured exact hosts, action, finite score, challenge age, bounded response body and network wait. No Host/X-Forwarded-For inference. |
| `src/lib/lead-request.ts`, contact/demo `route.ts` | REFINE bounded streaming JSON body/field parsing, eight-active-handler guard, whole-server deadline, bounded adapter outcomes and truthful saved-ID receipt. KEEP B01 read denial/private no-store and B04 independent receipt semantics. |
| `src/lib/crm-leads.ts`, `src/lib/bot-master.ts` | REFINE propagated cancellation, request/body deadlines and no redirects/raw provider error echo. HTTP 200 with explicit notification rejection remains a failure. KEEP existing destination defaults; no activation. |
| `src/lib/db.ts` | REFINE singleton logging to `log: []`; the installed Prisma formatter can include enquiry arguments in errors. Initialization/schema/records unchanged. |
| `src/lib/enquiry-client.ts`, `src/components/shared/useEnquiryForm.ts` | REPLACE shared submission/recovery logic: same-task lock, in-memory controlled fields, field/error focus, live status, cancellation, strict receipt validation, uncertainty and explicit retry. No PII browser storage or URL persistence. |
| `src/app/contact/ContactForm.tsx`, contact `page.tsx` | REFINE existing labels/controls, shared limits and recovery; supported subject; nearby factual reCAPTCHA/privacy link; Suspense support fallback if JavaScript does not initialize. Native fallback uses POST rather than putting personal fields in a GET URL. |
| `src/components/landing/BookDemoPopup.tsx` | REFINE equivalent shared contract, unique field IDs, dialog cancellation/restore, input/uncertainty preservation and manual receipt close; no invented consent agreement or booking/delivery claim. Native fallback uses POST. Protected Radix/UI primitives are consumed unchanged. |
| `src/components/landing/mcp/mcpContent.ts` | REFINE only primary CTA wording; KEEP existing enquiry destination and other MCP content. |
| `.env.example` | REFINE blank public site key/secret/explicit-host configuration skeleton plus score default; no approved host or operational credential inferred. |
| `tests/helpers/load-project-module.mjs`, `tests/enquiry-recovery.test.mjs`, existing API acceptance/read-denial tests | Shared isolated actual-TypeScript module loader and offline behavioral regressions with mocked capabilities. Existing eight-combination/read-denial assertions retained. |
| B07 report, batch progress ledger, this report/evidence | Record B07 independent acceptance and current B08 review gate. Original audit/playbook/blueprint remain historical authoritative scope. |

KEEP brand classes, visible labels/locks, support contact and the inherited 24-hour contact wording. The latter remains an OI11 policy fact for its scheduled owner review. PENDING: final durable acceptance/dedup/retention, legal register/notice facts and actual connected MCP behavior. PROTECTED: `src/components/ui`, Prisma schema and existing database records. No media, public date, locale, metadata/schema or connected capability claim was added. Shared demo consumers in Header/Footer and other triggers continue using the same component; no protected primitive or site shell edit was made.

The reviewable **B08-only** source/test patch is [`b08-recovery.patch`](evidence/b08-2026-09-28/b08-recovery.patch), diffed from captured inherited working files, not from HEAD. Its 21 files exclude inherited B01–B07 deltas. [`baseline.json`](evidence/b08-2026-09-28/baseline.json) identifies original hashes; [`candidate-manifest.json`](evidence/b08-2026-09-28/candidate-manifest.json) binds current hashes, build and verification boundaries. Temporary baseline copies remain `/private/tmp/whats91-b08-baseline/` for selective recovery.

## Explicit bounds and retry behavior

| Stage | Bound |
|---|---|
| Whole client attempt | 30 seconds, including captcha, POST and response body |
| Whole client captcha / script / ready / execute | 8 / 3 / 3 / 5 seconds |
| Whole server handler / streamed JSON body | 15 / 3 seconds |
| Google verification / local persistence waiting / each CRM or notification adapter | 5 / 8 / 5 seconds |
| Incoming JSON body | 16 KiB, both declared and actually read byte count; malformed UTF-8/JSON rejected; `application/json` required |
| Field maxima | name 100, email 254, phone 32, company 160, subject 100, message 4000, source 80, token 4096 characters |
| Validation | Name at least 2, email syntax, contact subject at least 3, message at least 10, phone 10–15 digits with accepted formatting; phone required for demo. Client and server share schemas. |
| Resource guard | Eight active handlers per loaded module/process; ninth is 429 with `Retry-After: 15`. No PII/identity key, per-IP window, replica or durable abuse-policy claim. |
| Receipt/retry | Successful HTTP, `success: true` and safe nonempty local record ID required. Known pre-acceptance failure is recoverable. Unknown/post-start timeout/cancellation is uncertain and blocks submit until explicit duplicate-warning retry. No automatic retry. |

Missing secret or an empty/invalid `RECAPTCHA_ALLOWED_HOSTNAMES` is unavailable/fail-closed **before provider fetch**. No domain is selected from branding or an incoming request. Configured score defaults to 0.5 and must be finite within 0–1; successful provider result must match action and exact configured lowercase hostname and have a challenge age at most 120 seconds (up to 5 seconds future clock skew). These token/action checks follow Google's [verification](https://developers.google.com/recaptcha/docs/verify) and [v3](https://developers.google.com/recaptcha/docs/v3) contracts. Real key registration/host approval and provider behavior were not exercised.

HTTP cancellation propagates to fetches and response-body waiting. The shared loader bounds its own lifetime when one caller cancels; another caller can still await that shared load. Prisma has no cancellation signal here: a started write can finish after waiting ends. A receipt already known when the handler exits still returns truthful success despite adapter failure/cancellation. Otherwise the response and UI preserve uncertainty. Repeated independent requests can write twice: an explicit offline test documents this gap instead of claiming durable deduplication. Releasing the handler resource slot does not prove an underlying late database write stopped.

## Verification and candidate identity

- `npm run check` **exit 0**: ESLint, no-emit TypeScript and **49/49 tests**. [`npm-check.txt`](evidence/b08-2026-09-28/npm-check.txt).
- B08 offline recovery fixture suite **21/21**: [`offline-recovery.tap`](evidence/b08-2026-09-28/offline-recovery.tap). These tests load real source with mocked DB/network/browser capabilities and shorter injected clocks; they do not activate providers or write records.
- Fresh `npm run build` **exit 0**, **96 generated pages**. Build ID **`GFf8haeyN5oRbz-Dv5Lt8`**, Node **24.1.0**, Next **16.3.6**. [`build.txt`](evidence/b08-2026-09-28/build.txt).
- Standalone preview **`http://127.0.0.1:4305`**, loopback only; OS PID **40077**, Codex process session **39225**. Fake public site key baked for browser mocks; real captcha secret/approved hosts and CRM/notification enabling credentials explicitly empty. This local artifact is not an authorized deploy candidate.
- Five-width browser matrix at **1440 / 1024 / 768 / 375 / 320**, **30 assertions each / 150 total**, exact decoded served build ID guard. [`browser-widths.json`](evidence/b08-2026-09-28/browser-widths.json).
- Real browser captcha/deadline fixtures **16 assertions**, including stalled script/ready/execute recovery, no pre-verification POST, source unavailable, immediate double-submit lock and whole-client timeout. The observed whole-client wait was **30,452 ms**. Exact stage elapsed times are in [`browser-deadlines.json`](evidence/b08-2026-09-28/browser-deadlines.json); deadline is nominal 30 seconds plus browser scheduling/observation overhead.
- JavaScript disabled/blocked support fallback and combined reduced-motion/forced-colors/CSS-zoom/text-spacing fixture: **9/9 assertions**, [`browser-failure-display.json`](evidence/b08-2026-09-28/browser-failure-display.json). CSS zoom is a local display fixture, not OS browser zoom or physical device proof.
- **12/12** safe route checks: contact/demo GET/HEAD 405 and OPTIONS 204; GitHub webhook GET 503; retired scorer GET/HEAD 405 and OPTIONS 204; MCP descriptor and Markdown API GET 200. [`safe-routes.json`](evidence/b08-2026-09-28/safe-routes.json). No live POST exercised.
- B07 all-mode on this build **exit 1**, **1370 pass / 1 fail / 169 not-checked / 1 unavailable**; 59 sitemap/HTML pages, 98 links, 190 JSON-LD instances, 60 build identity assertions and 171 bounded GETs. The same inherited duplicate description remains on `/blog/busy-erp-google-sheets-integration-complete-guide`; 166 FAQ browser assertions plus three certification/rate/eligibility assertions remain not-checked, and B03 remote scoring remains unavailable. [`live-validator.json`](evidence/b08-2026-09-28/live-validator.json). No unrelated page remediation or false all-pass declaration.

Offline coverage includes script/key/error/stall/retry, ready/execute/cancel/concurrent loader, missing/invalid host settings, independent action/score/host/age validation, provider/response-body stalls, malformed/oversized/invalid contact and demo requests before any write, stalled body, every inherited local/CRM/notification success combination, confirmed versus late/unconfirmed write, HTTP cancellation, ninth concurrent handler rejection/release, strict client receipts, safe field/protocol errors, subject allowlist and duplicate requests. Provider rejection and Prisma argument logging are checked independently.

All browser form POSTs were fulfilled/stalled/aborted by a deny-by-default fixture; no browser form POST was passed to the server. Captcha script response was synthetic; all other external requests were blocked. Only loopback GET/HEAD requests passed through. Fixture values are synthetic, nonpersonal and kept in isolated headless session `whats91-b08`; no user authenticated profile was used. Safe GET regression checks and validators likewise use the local preview.

## Visual and accessible behavior

Ten form/dialog screenshots in [`output/playwright/b08/`](../output/playwright/b08/) were captured and visually inspected at all five widths: `contact-error-{width}.png` and `demo-error-{width}.png`. Form fields, long uncertainty/retry copy and nearby privacy text wrap inside their controls. The matrix verifies input preservation, invalid/described-by associations, first-field/server-field focus, live submitting status, supported subject navigation, native POST fallback attributes, Cancel/Close/Escape restoration, reopened uncertainty and confirmed receipt retention. Additional screenshots capture the real total timeout, JavaScript fallback and display preferences.

Whole-page overflow remains **outside the changed form**: inherited desktop Header actions at 1024 produce a document width around 1087; inherited contact-information cards at 320 produce around 334. Default cookie preference overlay can cover form content at narrow widths; existing **Keep optional off** was chosen only in the isolated test profile for the matrix. These are retained adverse observations for B09/shared-layout/B31 review, not fixed or hidden by a whole-site responsive claim. Changed form/control bounds passed independently. The combined CSS-zoom/text-spacing/forced-colors screenshot also shows the inherited sticky Header covering the upper label after element capture; bounded geometry/focus assertions do not certify unobscured focus under every magnification/scroll condition. Keep this observation for shared-layout/B11/B31 review.

No screen-reader, physical mobile device, cross-browser support certification, complete WCAG conformance or performance budget acceptance is claimed. Initial/failed JavaScript, reduced motion, forced colors and CSS reflow/text spacing are bounded local fixtures; full support policy/device/performance work remains OI11/B29/B31.

## Preservation, owner gates and recovery

Package/lock hashes are identical to accepted B06/B07; all B07 validator/test hashes are unchanged. Protected UI and Prisma schema have no working diff. Both existing database files retain exact baseline SHA-256, mtime and size; `dev.log` and `tsconfig.tsbuildinfo` retain B06 sizes/mtimes. Builds generate Prisma client and replace `.next`; no migration, `db:push`, dependency change, secret inspection or real record write was performed. Inherited dirty source/docs/tests were preserved except named authorized B08 refinements and the ledger's B07 acceptance status. `git diff --check` and reverse-apply check of the B08-only patch both exited 0.

Remaining approval/closure gates:

1. **OI09:** choose durable acceptance/receipt reconciliation, cross-request/process idempotency, retry/duplicate policy, late-write recovery, retention, per-identity/replica abuse policy and real sandbox/recipient/delivery authority. Eight-active-handler protection and a UI lock do not satisfy these final policies.
2. **OI04/B09:** approve actual provider roles/transfers/storage/locations/retention/processing and legal notices. Current nearby wording describes only technical Google loading and links the existing Privacy Policy. It does not claim consent, a new legal agreement, residency or delivery. B09 consent/loading policy remains independently scheduled.
3. **OI01/OI10/B14:** approve actual MCP capability and exact activated destination. This remains an access enquiry with context, not a verified connection.
4. **OI11:** approved support wording/runtime/browser/device policy. Node 24/current-workspace exception covers this local verification only; the inherited response-time promise is unchanged.

The coordinator accepted the narrowly withheld independent guard work after independent `npm run check` (49/49; types clean; zero lint errors). F005/F004 remain PARTIAL. B09 technical portions were subsequently explicitly authorized; the current progress ledger records the next gate. This acceptance does not grant primary conversion closure or release permission.

For selective source recovery, use the captured B08 baseline and patch after reviewing current dirty changes; never reset the shared tree or restore unsafe B01–B04 behavior. Rebuild/reidentify the local artifact after any source recovery. Do not roll back database records or claim production rollback proof. A UI-only rollback must retain bounded safe error/uncertainty and confirmed receipt behavior.
