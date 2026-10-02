# Website Quality and Human-First B06 Completion Candidate

**Batch:** B06 — Resolve dependency advisory exposure  
**Status:** ACCEPTED LOCALLY — independent coordinator review confirmed manifest/locks, audit and 11/11 regression checks; production/edge exclusions and override notes remain  
**Executed:** 28 September 2026, Asia/Kolkata  
**Baseline HEAD:** `6fdf9db34ea3d06772059873890f03fa1ed02657`  
**Authority boundary:** Local dependency, lock, install, build, preview and safe-fixture verification only. No commit, push, deployment, cloud change, authenticated account action, real submission, malicious payload or B07 work was performed.

## Outcome

The locked npm candidate moved from **29 affected package nodes** (`2 critical`, `17 high`, `8 moderate`, `2 low`) to **0 advisories** across **737 dependencies**. Next.js is now `16.3.6`, `sharp` is `0.35.5`, Prisma CLI/client are paired at `6.19.3`, and `eslint-config-next` matches Next at `16.3.6`. The npm and Bun locks describe the same direct candidate and patched overrides.

Five direct packages with no imports or runtime/config consumers were removed rather than carried through major advisory upgrades: `@mdxeditor/editor`, `next-auth`, `next-intl`, `react-syntax-highlighter`, and `uuid`. The source search covered `src`, `prisma`, `scripts`, `tests`, `next.config.ts`, and `package.json`; only Prisma had an application import, while `sharp` remains an intentional direct dependency for Next image optimization and the standalone deployment path.

The current production build generated **96 pages** with build ID `LqJ6HGJMEhtCWAWLqevpg`. The before/after HTTP snapshot contains the same **63 intended HTML routes**, the same **59 sitemap routes**, the same **194 JSON-LD blocks**, and **0 status, content-type, redirect or schema differences**.

## Complete npm enumeration

The complete successful baseline query is preserved at [`npm-audit-before.json`](evidence/b06-2026-09-28/npm-audit-before.json); the zero-advisory result is preserved at [`npm-audit-after.json`](evidence/b06-2026-09-28/npm-audit-after.json). The baseline package nodes were:

| Package node | Severity | Relationship |
|---|---:|---|
| `@babel/core` | low | transitive |
| `@humanfs/node` | moderate | transitive |
| `@mdxeditor/editor` | moderate | direct |
| `@prisma/config` | high | transitive |
| `baseline-browser-mapping` | moderate | transitive |
| `brace-expansion` | high | transitive |
| `browserslist` | high | transitive |
| `deepmerge-ts` | high | transitive |
| `defu` | high | transitive |
| `effect` | high | transitive |
| `flatted` | high | transitive |
| `icu-minify` | low | transitive |
| `js-cookie` | high | transitive |
| `js-yaml` | high | transitive |
| `lodash` | high | transitive |
| `lodash-es` | high | transitive |
| `minimatch` | high | transitive |
| `nanoid` | high | transitive |
| `next` | critical | direct |
| `next-auth` | critical | direct |
| `next-intl` | moderate | direct |
| `picomatch` | high | transitive |
| `postcss` | high | transitive |
| `prisma` | high | direct |
| `prismjs` | moderate | transitive |
| `react-syntax-highlighter` | moderate | direct |
| `refractor` | moderate | transitive |
| `sharp` | high | direct |
| `uuid` | moderate | direct |

## Maintainer advisory refresh and applicability

- The [Next.js maintainer advisory list](https://github.com/vercel/next.js/security/advisories) added several July–September 2026 advisories beyond the Phase 1 fallback. The locked `16.1.6` was within the aggregate critical audit range. The [AVIF optimizer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) identifies `16.3.3` as the patched 16.x release, while the newer [Node ImageResponse advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j) requires `16.3.6`. The candidate therefore uses `16.3.6`, the current stable npm release observed during execution.
- App Router/RSC and `next/image` are used, so framework and optimizer findings were treated as applicable dependency exposure even where an exploit prerequisite was absent. Source recheck found no `use server` action, `next/og` `ImageResponse`, proxy/middleware, rewrite destination, remote image pattern, public AVIF asset or user-upload image source. Those absences narrow prerequisites; they do not substitute for the upgrade.
- The [Auth.js 4.24.15 release](https://github.com/nextauthjs/next-auth/releases/tag/next-auth@4.24.15) closes the current 4.x security advisories. This repository had no `next-auth` consumer, so the unused package and its vulnerable nested `uuid` were removed.
- The [next-intl maintainer advisories](https://github.com/amannn/next-intl/security/advisories) require at least `4.9.2` for the combined open-redirect and precompile prototype-pollution set. No plugin, middleware, locale route or package import exists here, so the unused dependency was removed.
- The [sharp maintainer advisories](https://github.com/lovell/sharp/security/advisories) cover the locked `0.34.5`. The retained direct optimizer dependency is now `0.35.5`, with the lock resolving its `1.3.4` libvips packages.
- Prisma CLI `6.19.3` fixes the affected `effect` version but still pins vulnerable `deepmerge-ts@7.1.5`. Because no stable Prisma line observed in the registry carried `deepmerge-ts@8`, the manifest uses the narrow flat override `deepmerge-ts: 8.0.0`. Prisma generation, lint, types, tests and the production build all pass with that override. `brace-expansion@<2` is similarly constrained to `1.1.18`; newer major instances keep their own versions.
- The remaining build and runtime transitives were refreshed by the scoped install and non-breaking `npm audit fix`. No unrelated application source or UI primitive changed in B06.

## Manifest and lock changes

| Item | Before | Candidate |
|---|---:|---:|
| `next` | npm `16.1.6`; Bun `16.1.3` | both `16.3.6` |
| `eslint-config-next` | npm `16.1.6`; Bun `16.1.3` | both `16.3.6` |
| `sharp` | locked `0.34.5` | locked `0.35.5` |
| `prisma` / `@prisma/client` | locked `6.19.2` | locked `6.19.3` |
| `deepmerge-ts` | `7.1.5` via Prisma config | `8.0.0` override |
| `brace-expansion` 1.x | `1.1.12` | `1.1.18` constrained override |
| npm dependency count | `971` | `737` |

Candidate hashes:

- `package.json`: `e037e1c87b7f143783ccbdbae9e21c2ce990927677f8e36c4039ba3e345cd431`
- `package-lock.json`: `bbeaffdbd7f3c1700b0e5426dec02251c8d9e0f6084d771064ce74abdc85034a`
- `bun.lock`: `97944b8d67915eff4459ad66ad042d884198bb2784ab94180e0a5bfc91a02030`

`npm ci --ignore-scripts` reproduced the npm tree with 0 advisories. Bun was not installed system-wide, so a temporary `bun@1.3.9` runner regenerated the lock; `bun install --lockfile-only --frozen-lockfile --ignore-scripts` then passed with 724 Bun package entries. No temporary runtime was added to the project manifest.

## Verification

| Check | Result |
|---|---|
| `npm ci --ignore-scripts` | PASS — 737 packages, 0 advisories |
| `prisma generate` | PASS — Prisma Client `6.19.3` |
| `npm run check` | PASS — ESLint 0, TypeScript 0, 11/11 tests |
| `npm run build` | PASS — Next `16.3.6`, webpack, 96 pages |
| Bun frozen lock | PASS — 724 packages |
| `git diff --check` | PASS |
| Before/after route and schema comparison | PASS — 63 routes, 59 sitemap routes, 194 schema blocks, 0 differences |
| Safe local optimizer fixture | PASS — public `/og-image.png`, repeated 200, stable ETag and SHA-256, 23,839 bytes |
| Safe HTML/RSC cache variants | PASS — HTML and `text/x-component` remained distinct; RSC cache-key redirect deterministic; repeated RSC SHA-256 stable; `Vary` includes router variant headers |
| Cross-family client navigation | PASS — pricing → blog → article → legal; expected title/H1, no horizontal overflow, no console warning/error |

Evidence:

- [`routes-before.json`](evidence/b06-2026-09-28/routes-before.json)
- [`routes-after.json`](evidence/b06-2026-09-28/routes-after.json)
- [`runtime-safe-fixtures.json`](evidence/b06-2026-09-28/runtime-safe-fixtures.json)
- [`browser-navigation.json`](evidence/b06-2026-09-28/browser-navigation.json)
- [`candidate-environment.json`](evidence/b06-2026-09-28/candidate-environment.json)

The existing database files, `dev.log`, and `tsconfig.tsbuildinfo` retained their pre-B06 metadata. The standalone tree contains no copied `.env` file.

## Boundaries and recovery

No malicious AVIF, SVG, recursive-merge, glob or denial-of-service payload was used. No edge cache, CDN, WAF, production runtime, Windows-hosted runtime, authenticated account, external API, real lead submission or delivery path was tested. The result proves the local candidate and lock state; it does not claim production deployment or edge mitigation.

The pre-B06 `package.json`, `package-lock.json`, and `bun.lock` are retained in `/private/tmp/whats91-b06-rollback/` for local compatibility recovery. Reverting to that affected lock state would restore functionality only and cannot count as security closure. The current loopback preview is PID `18318` on `127.0.0.1:4305`, process session `7282`.

B07 was not started. Coordinator review of this report and the preserved evidence is the next gate.
