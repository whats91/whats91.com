# Local evidence validators

These tools use Node built-ins only. Run against an already prepared production-mode
loopback preview. Default: `http://127.0.0.1:4305`. They issue GET requests only,
reject redirects and external targets, and leave the retired B03 SEO scorer unavailable.
They do not authorize deployment or certify production, claims, current prices,
AI readiness, ranking, or rich-result eligibility.

From the repository root:

```sh
node scripts/seo-validation/run.mjs all http://127.0.0.1:4305 \
  --expected-build-id "$(cat .next/BUILD_ID)" --output /tmp/whats91-validation.json
node --test tests/seo-validation.test.mjs
```

Choose `crawl`, `links`, `schema`, `endpoints`, or `readiness` instead of `all` for
a narrower run. Existing entry points delegate to those same modes and accept
the same origin and flags:

```sh
sh scripts/seo-validation/crawl-sitemap.sh
sh scripts/seo-validation/check-links.sh
node scripts/seo-validation/check-schema.mjs
sh scripts/seo-validation/check-endpoints.sh
node scripts/verify-ai-readiness.mjs
```

Expected build defaults to the local `.next/BUILD_ID`; pin `--expected-build-id`
explicitly when reviewing a saved candidate. Missing identity is unavailable,
and a mismatched Next App Router bootstrap ID is a failure. Each inspected HTML
page must match. A build ID identifies the served artifact; it does not prove
that current source or a deployed service matches it. Endpoint-only mode binds
to the homepage build and checks sitemap inventory; it does not crawl every page.

Results are `pass`, `fail`, `not-checked`, or `unavailable`. JSON reports include
individual assertions, request outcomes, counts, and expected/observed identity.
Console output prints non-pass assertions and counts. Exit 1 means failure or
required evidence unavailable, including empty inventories, HTTP errors, empty
bodies, timeouts, or wrong build. Exit 0 only means the requested **checked**
contracts passed; inspect the explicit not-checked rows. The intentionally
unavailable `remote-seo-scoring` row is the sole named exit-gate exclusion;
the separate retired-route GET 405/no-store check must succeed.

HTML/XML is parsed into a bounded element/attribute/text tree that handles
minified output, attribute order/case/quotes, raw script/style bodies, comments,
and common/numeric entities. It is not a complete HTML5 browser parser; malformed
nesting or unsupported structure is reported rather than certified. Metadata
counts are element occurrences, not line counts. Canonicals must be absolute
production URLs. XML supports a single nonempty `urlset`, not sitemap indexes.

JSON syntax, basic schema structure (schema.org context, typed roots and
descriptive properties), root ID uniqueness, local graph references, and
FAQ/server-text consistency have separate assertions. No homepage Service or Product,
price, rating, award or official-status fact is required. Unknown schema
vocabulary and factual truth are not certified. Text excludes scripts, styles,
templates and explicit hidden/aria-hidden elements; CSS visibility is not evaluated.
Matching question buttons require hydrated expansion before absent answers can
be checked. `/faq` has an explicit filtered-category contract from
`src/app/faq/FAQBrowser.tsx`; absent entries are not checked when its question
controls are present. Missing content without these contracts fails. Never read
a not-checked result as evidence of matching content.

Readiness mode verifies the current homepage/service/FAQ entity contract,
pricing/calculator schema, rendered calculator number inputs/category labels,
discovery links, and sampled endpoints. It does not inspect stale wrapper rate
strings or declare numerical rates current. Relative markdown discovery links
resolve against the production origin. Internal links include root and same-site
absolute links, preserve query strings, omit fragments/API/static assets, and
only check HTTP success/nonempty bodies. Hydrated links, external destinations,
fragment anchors and visual usability are outside this validator's scope.

Timeout covers both response and body (`--timeout-ms`, default 10000).
Endpoint samples cover seven markdown routing branches, two MCP GETs, robots,
PNG signature and the retired SEO GET boundary; they do not establish full API
semantics or full robots user-agent precedence. Safe fixtures run offline with
injected fetch responses; no lead submission, webhook POST or external fetch is used.

B25 scopes the global graph to website-brand Organization/WebSite and tests page-specific entities separately. Readiness does not require a manufactured Service or product. The four calculator quantity fields may use B23 validated text/numeric-inputmode controls; each must have a real label. No rate or numerical total is approved by this structural check.
