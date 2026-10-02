# B19 — Identity, author assets and recruiting completion candidate

Status: **TECHNICALLY VERIFIED / COORDINATOR REVIEW / PARTIAL**. Authorized local B19 technical corrections and scoped verification are complete. **Stop before B20.** OI02/OI07/OI08/OI12 and factual identity, attribution, jobs, media rights, permanent index policy and human approval remain **PENDING**.

## Candidate and boundaries

B18 was independently accepted (94/94 checks and 6,466 hashes). B19 began on 28 September and continued on 29 September 2026; these are internal work dates, not public publication/material-update/review dates. AGENTS, master playbook, audit F013/F017, Phase2 section 3/B19, ledger and canonical owner inputs were followed. Scope is Q1.12/Q1.20/Q3.01/Q4.11/Q4.12/Q4.17 and shared Q3.06.

- HEAD remains `6fdf9db34ea3d06772059873890f03fa1ed02657`; inherited dirty work is preserved.
- Exact current build: `lZwqn8myzMsOIvI2MFAy1`, Node 24.1.0 / Next 16.3.6. Fresh webpack build generated **111/111 entries**; sitemap has **53 HTML routes**. Entry count is not a claim of newly created public routes.
- Loopback preview: `http://127.0.0.1:4305`, bind `127.0.0.1`, PID `37008`, process session `57976`. Task-owned preceding preview was replaced; no cloud process changed.
- Real database/Redis/CRM/notification/captcha activating credentials were overridden empty for the local preview, with a fake public fixture captcha key. Existing secrets were neither exported nor included in evidence.
- No subagents/new chat/model override/outgoing coordinator message, commit/push/deploy/publication, database/schema push, real submission/message/call/payment, private account or original-media access.

## Changed behavior

All four author IDs, slugs, raw names/biographies/roles/expertise/socials/avatars/location/joinedAt and history remain recoverable. A pending flag prevents publication; a separate safe client projection avoids bundling held person facts. The author hub and four existing 200 routes offer article navigation, including useful empty states for three records. Unknown records return 404. Titles are generic record labels, and initials are explicitly placeholders, not identity proof. No new person or organizational author is invented.

The external ui-avatars name transfer, missing author/default-image requests and repeated error fallback are replaced by local text initials. The fallback is server-renderable and needs no browser image API or event handler. Four profile OG/Twitter previews reuse the unchanged local generic brand/topic image with appropriate alt text, without person portraits. Asset dimensions, PNG text/EXIF chunks, SVG structure/links and five absent declared avatar paths are inspected in `asset-inspection.json`; original ownership, privacy chain and public-use authority remain pending.

Ten articles, the blog hub/cards, profile lists, RSS, metadata and Article/Person helpers consistently withhold unsupported author facts. Existing record links and article publication/material dates stay intact. Nine attribution panels now sit outside inherited FadeIn wrappers, so their notice remains readable without app JavaScript. The pricing article has the same pending byline in its server header. RSS omits unsupported author/editor/creator fields; metadata no longer silently assigns “Whats91 Team” or the site operator. Person schema needs explicit approval. Blog-card title and profile links are separate valid anchors with independent keyboard navigation.

About now offers practical ERP/automation routing and source-qualified operator/contact information. Unsupported leadership, experience, scale, milestones and headquarters claims are held; original values/history/team and careers records are preserved in `src/lib/identity/source-records.ts`, with no public imports. Contact keeps the originally listed three phones, general/support email and Ujjain address with recipient/visit confirmation context. Unverified hours and 24-hour response promises are withheld, including ContactForm’s intro. Existing guarded enquiry behavior is unchanged; the final CTA anchors local contact availability rather than activating a portal.

Careers shows six **previously listed unconfirmed role categories**, retaining IDs 1–6 and department labels. Keyboard filters, status announcements, disclosure controls/focus and encoded role-specific **availability enquiry** mailto links work. Locations, employment terms/requirements/benefits/ratings/experience/dates and Apply/resume-retention promises are held. No vacancy, application receipt or JobPosting is asserted. Mailto hrefs were inspected only; no mail application opened or email sent. No-JS retains all category labels, qualification and native enquiry guidance; filters/disclosures require JavaScript as stated. Actual-component empty and long-title props were tested as explicitly synthetic fixtures.

Interim `noindex, follow` applies to the author hub, four profiles and Careers; those six routes are excluded from the sitemap, with canonicals and routes preserved. Permanent indexing, consolidation or redirect decisions remain owner-only. Cookie disclosure is narrowly corrected for text avatars; it does not claim the whole website has no external providers.

## Owner and consumer closure

The **only approval/evidence question matrix** is the B19 table in [legal-policy-inputs.md](legal-policy-inputs.md#b19-identity-attribution-assets-and-recruiting--exact-owner-decisions-pending). It asks for exact organization/offices/channels, each of four author records, four historical About leadership records, originals/rights/privacy/caption/alt scope, each of six hiring records, permanent route/index intent and actual date/reviewer evidence. All remain PENDING. No named accountable reviewer, approval, photo, biography, benefit or date was created.

`consumer-closure.json` maps the implementation and evidence; it is derived review evidence, not a competing identity or permission register. F013/F017 remain PARTIAL because tests cannot establish person, organization, hiring or permission facts. Source-reported operator/contact details and old public assets are not owner approval. Broader entity/schema/MD/passage/discovery/privacy reconciliation remains B25/B26/B27/B31.

## Verification

| Check | Exact result and limit |
| --- | --- |
| Final `npm run check` | **98/98 tests**, 0 failed/skipped/cancelled; lint and type checks clean. Four new contract tests cover author-publication withholding, record-link/history preservation, local-initials behavior, and actual empty/long-role rendering. |
| Fresh build | **111/111 generated entries**, successful webpack production build; source unchanged since this runtime build. |
| Ten built regression/consumer helpers | **1,800 pass / 0 fail** on current build: shell 256, dates/safe routes 107, pricing 128, platform 153, MCP 285, home 230, media 33, ERP 175, automation 203, identity 230. |
| Whole-site validator | **1,192 pass / 1 fail / 181 not-checked / 1 unavailable**, exit 1. Sole failure is inherited Busy-to-Sheets duplicate description; retired SEO scoring unavailable. The website is not all-pass. |
| Hydrated Chromium | **105 states, 550 assertions**, no failures/page errors: nine pages × five widths, ten article attribution views × five widths, and two synthetic long-label pages × five widths. |
| No-JS / failed-app-JS / blocked-images + reader modes | **312 states / 972 final resolved assertions**. Eight B19 pages and bylines readable across five widths; reduced-motion/text-spacing/forced-colors at 320. See timing disposition below. |
| Targeted supplement | **50 states / 100 pass assertions**: all six actual role panels × five widths; settled blog hero × five widths × hydrated/noJS/failedJS/blocked-images. |
| Actual component fixtures | **10 states / 27 pass assertions**; empty and synthetic long role props across five widths, including bottom reachability at 375/320. No public job/route created. |
| Identity consumer output | Initial HTML, all public client JS/CSS, feed/schema/OG/metadata, hub/four profiles/unknown 404, cards and ten bylines checked; no held person strings, external-avatar code or unsupported Person attribution leaked. |
| Historical record and media preservation | **27** blog/author/legal/plan records preserve IDs/date/history; raw author fields preserved. **869** inherited public/B16 media/evidence files unchanged, including exact **125 stored B16 media response bodies**. No new certificate or derivative/privacy scope inferred. |

The initial static pass sampled 15 blog-hub headings before its inherited 500ms CSS animation plus 100ms delay had settled. `browser-static.json` retains those initial failures. `browser-detail-and-settle.json` repeats the **same visibility assertion** after 800ms in the exact modes/widths and all 15 pass; `browser-static-resolved.json` records the mapping explicitly. No runtime edit or assertion weakening was used. The heading briefly starts transparent; no instant paint/performance certification is made. A bounded diagnostic and its timeout led to this timing check; preliminary evidence is retained.

Careers expansion initially had valid DOM assertions but some panel captures were outside the viewport. Thirty targeted full-card views close that capture gap. Initial stitched fixture captures showed stale/duplicated boundary pixels; final fixtures use fresh isolated pages and bounded viewport/bottom shots. Preliminary captures remain labelled. Scope and exact filenames are recorded in `visual-inspection.json` and both visual indexes.

**255** hydrated raw viewport captures and **64** overview sheets cover all scoped section tiles, bylines and long-label states; all 64 sheets were actually inspected. **32** supplementary sheets were actually inspected: all 30 role panels, 20 settled heroes, 24 selected 320px static B19 heroes, ten noJS bylines, 27 reader-mode heroes and 12 fixture viewport/bottom captures. **13** critical 320px captures were separately viewed at native size, along with the existing generic OG. Other static widths have automated checks; full article bodies were not visually re-audited in B19. Screenshot overviews are reduced images for layout inspection, not native font/contrast certification.

Real form/call/provider/API actions and external requests were blocked; hydrated network records show zero external requests and zero form API posts. Demo open/Escape/focus and native navigation were exercised without submission. No mailto click. API helper negative method/guard fixtures are isolated loopback contract probes under empty adapters, not real sends.

## Exact delta, recovery and deferred work

`source-review-inventory.json` enumerates **31 changed baseline files and 16 new source/test/helper/report files**, separate from the inherited Git diff. The 31 include the canonical owner sheet/ledger; three identity routes/hub, About/Contact/ContactForm/Careers pair, ten article byline consumers, feed/layout/sitemap, author/avatar/card and SEO/legal helpers. New work is three source modules, one test file, ten preview helpers, one fixture-render helper and this report. No shadcn UI, package/config, database/schema, public binary asset, guarded API implementation, editorial registry or unrelated reader-family body is changed by B19.

`baseline.json` records **5,608 inherited nonignored files**, HEAD and protected DB/dev.log/tsbuildinfo bytes/mtime/size. Recovery before-source is `/private/tmp/whats91-b19-baseline`; the bounded `b19-identity-family.patch` independently applies to a disposable before-source copy and must hash-match every listed output. Candidate manifest includes baseline inheritance, exact B19 source/helpers/reports/evidence/captures and current `.next` server/static/build identity. Secrets, caches and standalone vendors are excluded; manifest/verification exclude themselves. `patch-verification.json`, `preservation-checks.json`, `whitespace-check.json` and `manifest-verification.json` provide exact current counts/hashes. No working-tree reset, Git mutation or release action.

The remaining **six inherited article matrix observations** and inherited duplicate description stay assigned to B20/B21/B22/B31/content batches. B19 pending attribution does not correct or approve article provider/legal/product/results claims. Inherited FadeIn article body sections remain unavailable without app JS; the independent attribution panels now survive, and broader article fallback work remains queued. Blog hub proof counts (500+/50+/30+/100%) and broader dormant entity claims are later-batch source leads. B29 performance, actual jobs/channels/support/product availability, originals/media permissions, OI12 publication/material-review dates and broader acceptance remain pending.

**Stop before B20 for coordinator review.** This is local technical evidence, unreleased and awaiting independent review; no owner fact, permission or human review is inferred.
