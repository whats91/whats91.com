# Website Quality and Human-First B05 Completion Evidence

**Date:** 28 September 2026, Asia/Kolkata  
**Batch:** B05 — Restore quality gates and establish a safe build harness  
**Status:** Local completion candidate; coordinator verification pending  
**Source baseline:** `6fdf9db34ea3d06772059873890f03fa1ed02657` plus the preserved B01–B04 working-tree changes  
**Fresh build ID:** `xNiR40gNm3dTiGqGV3wNL`  
**Preview:** `http://127.0.0.1:4305`, loopback only; PID `12804`; Codex process session `9528`

## Authority and boundaries

The owner explicitly approved installed Node 24, the existing local workspace, generated local build output and a loopback preview. This overrides B05's earlier Node 20 and scratch-workspace assumptions. `AGENTS.md` now records Node 24.x. No cloud runtime, dependency version, lockfile, schema, database record, external account, commit, push, deployment or publication changed.

The build used explicit non-secret process values. It did not copy `.env` into standalone output. CRM and Bot Master endpoints were redirected to a closed loopback port, their credentials were empty, reCAPTCHA keys were empty, and no form or external action was submitted.

## Source changes

- `eslint.config.mjs`: file-specific CommonJS allowance for PM2 and exact websocket-example exclusions.
- `tsconfig.json`: exact exclusion for the nonproduction websocket sample whose optional socket.io dependencies are absent.
- `src/lib/redis.ts`: removed the cluster-only `retryDelayOnFailover` option from the single Redis client.
- `next.config.ts`: removed `typescript.ignoreBuildErrors`.
- `package.json`: added reproducible check/type/test scripts; production build now uses webpack, packages static/public assets and never copies `.env`.
- `src/app/layout.tsx`, `src/app/globals.css`: replaced build-time Google Inter fetching with the existing sans-serif intent backed by a local system font stack.
- `src/app/api/flows/[id]/route.ts`: removed only the invalid `LIST` route export that blocked Next's route-type gate. B24 still owns full flow packaging and behavior closure.
- `AGENTS.md`: changed only the Node runtime statement from 20.x to 24.x per owner instruction.

## Gate evidence

The inherited baseline was three ESLint errors and three TypeScript diagnostics. Repository-wide ESLint and `tsc --noEmit --incremental false` now exit 0.

A temporary `src/__b05_type_gate__.ts` assigned a number to a string. After removing the invalid `LIST` export, `next build --webpack` compiled and then exited 1 on that exact type error. The fixture was deleted and its absence was verified before the accepted build.

The initial build attempts also established two real harness blockers:

1. `next/font/google` could not fetch Inter, so the root layout now uses a local system sans stack.
2. Turbopack's CSS loader tried to bind an internal helper port forbidden by the local execution sandbox, so the supported webpack build mode is explicit.

The first validation of the revised package build reached all 96 pages but ran out of disk while copying Prisma's traced engine. Only the failed generated `.next` directory was removed, recovering about 900 MiB; source, dependencies, databases and inherited documents were preserved. The exact `npm run build` command then exited 0 from a clean `.next`.

Final commands:

```text
npm run check
  eslint .                                      exit 0
  tsc --noEmit --incremental false             exit 0
  node --test tests/*.test.mjs                 11 passed, 0 failed

DATABASE_URL=file:./db/custom.db \
NEXT_TELEMETRY_DISABLED=1 CHECKPOINT_DISABLE=1 \
CRM_LEADS_API_BASE_URL=http://127.0.0.1:9 CRM_LEADS_COMPANY_UID= \
BOT_MASTER_API_URL=http://127.0.0.1:9/disabled BOT_MASTER_AUTH_TOKEN= \
RECAPTCHA_SECRET_KEY= NEXT_PUBLIC_RECAPTCHA_SITE_KEY= \
npm run build                                  exit 0

git diff --check                               exit 0
```

The build compiled with Next 16.1.6 webpack, passed TypeScript, generated 96 pages, collected standalone traces and packaged static/public assets. Prisma Client 6.19.2 generation wrote installed generated client code. No `.env` file exists in `.next/standalone`.

## Storage and generated effects

- `.next` is a fresh ignored artifact for build ID `xNiR40gNm3dTiGqGV3wNL`.
- The stale September 25 output and failed partial outputs were replaced during clean-build recovery.
- The existing `db/custom.db` and `temp/db/custom.db` file sizes and modification times remained unchanged.
- Build and preview imported the singleton and logged only that `db/custom.db` existed; no database query, raw table creation, migration, seed or form write ran.
- `dev.log` and `tsconfig.tsbuildinfo` metadata remained unchanged.
- `package-lock.json` and `bun.lock` remain outside the diff.

Import-time schema creation for a missing database remains owned by B28. It did not execute against the existing file in this batch.

## Runtime acceptance

Final standalone smoke:

| Request | Result |
|---|---:|
| `GET /` | 200 |
| `GET /contact` | 200 |
| `GET /tools/whatsapp-api-cost-calculator` | 200 |
| `GET /legal` | 200 |
| `GET /api/contact` | 405, non-cacheable |
| `GET /api/demo` | 405, non-cacheable |
| `GET /api/webhooks/github` | 503, non-cacheable |
| `GET /api/seo-check` | 405, non-cacheable |
| `POST /api/seo-check` with a loopback-shaped inert value | 410, non-cacheable, no fetch |
| `GET /api/version` | 200, `1.6.3` |

No lead POST, webhook POST, database retrieval, CRM request, WhatsApp notification or reCAPTCHA request was made.

## Browser acceptance

The built-in browser inspected home, contact, the API cost calculator and legal center at 375×900 and 1440×900. External Google, gstatic, Whats91 subdomain, wa.me and avatar requests were blocked.

- Every route exposed one expected H1 and a semantic main region.
- Every measured route reported no horizontal overflow.
- The contact form was visible and readable at both widths; it was not filled or submitted.
- Mobile and desktop screenshots showed intact navigation, hierarchy, cards, form fields and calculator panels after the system-font change.
- Browser console warnings/errors: none.

Physical devices, Safari, Firefox, screen readers and production-edge behavior were not tested. These are not claimed by B05.

## Closure

- **B05:** locally complete; coordinator verification pending.
- **F031:** closed for the local candidate: lint/types/check scripts pass, the build type bypass is removed, an injected type error is rejected and a fresh standalone build runs.
- **Q9.06/Q9.08/Q7.09 shared evidence:** local gates and mocked regressions pass; dependency advisories remain B06 and release/storage recovery remains B28/B31.
- **F004:** remains PARTIAL. OI09 still blocks the owner-approved durable lead receipt, retry/dedup/retention policy and real-delivery evidence.
- **F037 supporting delta:** invalid `LIST` export removed; B24 remains the primary owner for all flow resource actions and packaged-data closure.

No B06 work was started.
