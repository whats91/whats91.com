# Whats91.com website deployment runbook

**Scope:** The Next.js marketing website at `https://whats91.com` on the `whats91` account of `159.65.148.106`. This document describes the deployment that was verified on 30 September 2026 and the procedure for subsequent releases. Recheck every live fact before using it; this is an operating record, not evidence that a future candidate is ready.

## 1. Production map and fixed boundaries

| Item | Verified first-deployment value |
| --- | --- |
| Public origin | `https://whats91.com` |
| SSH target | `whats91@159.65.148.106` using the existing SSH key |
| Server hostname | `botmastersender` |
| Site account | `whats91`; do not deploy as root |
| Proxy target | Website process on `127.0.0.1:3249`; public HTTP redirects to HTTPS |
| Site root and persistent environment | `/home/whats91/htdocs/whats91.com` and its owner-managed `.env` |
| Release base | `/home/whats91/releases/whats91.com` |
| Immutable runtime releases | `/home/whats91/releases/whats91.com/releases/<candidate-id>` |
| Staging | `/home/whats91/releases/whats91.com/staging/<unique-id>` |
| Node and npm | `/home/whats91/.nvm/versions/node/v24.21.0/bin/node` and `npm` 11.19.0 |
| PM2 | 7.0.4 in the same Node 24 installation; one process named `whats91` |
| Local source | `/Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com` |

The plain SSH login shell initially found `/usr/bin/node` v18.19.1. Always prepend the **absolute Node 24 bin directory** to `PATH` for install/build/PM2 commands; do not trust `node` or `npm` from an unprepared login shell. Use `BatchMode=yes`, a short connection timeout, and `StrictHostKeyChecking=yes`. Investigate a host-key mismatch; never silently accept a replacement key.

The first two deployments used source transfer without Git publication. On **2 October 2026**, the owner explicitly requested a Git push before deployment. For this release, commit only the approved source set, push that exact commit to `origin/main`, and build from the same committed source snapshot on Linux. Retain the verified archive transport and immutable-release promotion below; the production host is not a Git checkout. Do not run `git pull` on the server, invoke the retired `scripts/deploy.js`, use the old webhook deployment path, or include `docs/evidence`, `output`, secrets, or generated files in the commit. For later releases, confirm the owner's publication scope and current remote state before pushing; never reset or discard unrelated work.

This is currently a **single-process** service. The production PM2 entry runs the absolute Node binary with `--env-file=/home/whats91/htdocs/whats91.com/.env` and `start.mjs` from an immutable release directory. The running older release has its own saved PM2 startup contract; record that contract before changing it. The new release needs no release-identity environment variable. Set `HOSTNAME=127.0.0.1` for the listener; `PORT=3249` comes from the existing `.env`. The release has no copied `.env` file or symlink to it.

## 2. Application contracts that affect deployment

1. `next.config.ts` produces a **standalone** Next.js build. Build on the target Linux host: a macOS `node_modules`/standalone bundle can contain incompatible Sharp and Next binaries.
2. `scripts/release/candidate.mjs` hashes the exact safe tracked and untracked source files, and `scripts/package-standalone.mjs` hashes the Linux runtime package. The identity includes source digest, artifact digest, build ID, version, and local `HEAD`; the candidate ID is the release identity, **not** the Git SHA alone.
3. `start.mjs` rejects a release directory whose name differs from the manifest candidate ID, or modified package files, before opening the listener. `/api/ready` returns bounded release identity only after those checks.
4. Contact and demo submissions go from the browser only to `https://graph.whats91.com/public/form-submissions`. The website has no submission storage, CRM forwarding, or Bot Master notification. A Graph receipt confirms acceptance; a retry with unchanged fields keeps the idempotency key.
5. Before activating this build, verify Graph ingress/proxy IP handling, CAPTCHA configuration, the exact website CORS origins, and browser success/error behavior. The old production candidate remains a separate historical release; do not infer its form behavior from this local source.
6. A build can pass while DNS/proxy, Graph acceptance, reboot persistence, or browser behavior fails. Keep those checks distinct in the report.

## 3. Read-only preflight before every release

Read `AGENTS.md`, this runbook, the applicable change reports, and the current source diff. Establish exactly which local changes the owner authorized for publication. The 30 September candidate came from a large dirty working tree; never assume a future dirty tree is approved merely because it is present.

From the local repository:

```bash
pwd
git status --short --branch
git rev-parse HEAD
git remote -v
node -v
npm -v
rg -n 'NEXT_PUBLIC_[A-Z_]+|process\.env\.[A-Z_]+' src next.config.ts
```

From the server, inspect state **without printing `.env` contents, tokens, database rows, or PM2 environment values**:

```bash
ssh -o BatchMode=yes -o ConnectTimeout=8 -o StrictHostKeyChecking=yes \
  whats91@159.65.148.106

export PATH=/home/whats91/.nvm/versions/node/v24.21.0/bin:$PATH
whoami
hostname
node -v
npm -v
pm2 --version
stat -c '%U %a %n' /home/whats91/htdocs/whats91.com/.env
pm2 jlist | node -e 'let s="";process.stdin.on("data",x=>s+=x).on("end",()=>{for(const p of JSON.parse(s))console.log(JSON.stringify({name:p.name,status:p.pm2_env.status,cwd:p.pm2_env.pm_cwd,script:p.pm2_env.pm_exec_path,interpreter:p.pm2_env.exec_interpreter,instances:p.pm2_env.instances,restarts:p.pm2_env.restart_time}))})'
ss -ltnp | grep ':3249 ' || true
df -h /home/whats91
crontab -l
```

Check that `.env` is owned by `whats91` and mode `600`. Confirm free disk space for a second full install/build; the disk had only about **35 GiB free** at the 30 September verification. Do not alter DNS, TLS, CloudPanel, Nginx, or firewall as a substitute for diagnosing an application issue. A port owned by an unknown process, duplicate PM2 identity, or unexpected release path is a stop condition.

## 4. Verify and freeze one local source snapshot

Run the repository's full check on the **current candidate**. Resolve failures in the authorized scope, then rerun. On 30 September, an inventory assertion still expected 10 blogs after an eleventh article was added; the count was corrected and `npm run check` passed **217/217**. A passing previous batch report does not cover later changes.

```bash
cd /Users/devendarsingh/Desktop/NewCodeFolder/whats91/whats91.com
npm run check
git diff --check
```

The current build code requires local Git metadata for source enumeration. Capture tracked and untracked safe files exactly once; this includes authorized dirty work but excludes ignored data, `.env`, `node_modules`, generated builds, and `docs/evidence`. The retired OAuth advertisements and the explicitly removed website form/storage source paths are the only accepted missing tracked paths in the current candidate code. Run the following in the local repository, and record the resulting SHA-256 and file count:

```bash
umask 077
SNAP_DIR="$(mktemp -d /tmp/whats91-release.XXXXXXXX)"
export SNAP_DIR
node --input-type=module <<'JS'
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { sourceFiles } from './scripts/release/candidate.mjs';
const snapshot = sourceFiles(process.cwd());
snapshot.head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
fs.writeFileSync(path.join(process.env.SNAP_DIR, 'source-manifest.json'), JSON.stringify(snapshot));
fs.writeFileSync(path.join(process.env.SNAP_DIR, 'source-files.nul'), Object.keys(snapshot.files).join('\0') + '\0');
console.log({ head: snapshot.head, files: Object.keys(snapshot.files).length, deleted: snapshot.deletedSources });
JS
COPYFILE_DISABLE=1 tar --null -czf "$SNAP_DIR/source.tar.gz" -T "$SNAP_DIR/source-files.nul"
shasum -a 256 "$SNAP_DIR/source.tar.gz"
tar -tzf "$SNAP_DIR/source.tar.gz" > "$SNAP_DIR/archive-members.txt" || exit 1
if rg '(^|/)\._|(^|/)(\.git|\.next|node_modules)(/|$)' "$SNAP_DIR/archive-members.txt"; then
  exit 1
fi
```

The last command checks the known macOS AppleDouble and generated-tree hazards; also inspect the archive's file list and confirm there is no private `.env`, SQLite file, key, certificate, cache, or log. `.env.example` is allowed. If source files change after snapshot creation, throw this snapshot away and repeat the checks and archive. Never edit a frozen archive in place.

## 5. Transfer the snapshot to isolated server staging

Create a fresh, private staging directory under `/home/whats91/releases/whats91.com/staging`, then transfer **only** `source.tar.gz` and `source-manifest.json` using `scp` with the same SSH host-key settings. Record the local archive hash and compare it on the server before extraction. Do not transfer the local `.git`, `node_modules`, `.next`, `.env`, `db`, or `docs/evidence` trees. Check for another active deployment first; do not remove an unfamiliar staging or lock directory.

From the local Mac, retain the exact staging path returned by the server:

```bash
TARGET=whats91@159.65.148.106
STAGE="$(ssh -o BatchMode=yes -o ConnectTimeout=8 -o StrictHostKeyChecking=yes "$TARGET" \
  'umask 077; base=/home/whats91/releases/whats91.com; mkdir -p "$base/staging" "$base/releases"; mktemp -d "$base/staging/deploy.XXXXXXXX"')"
test -n "$STAGE"
scp -o BatchMode=yes -o ConnectTimeout=8 -o StrictHostKeyChecking=yes \
  "$SNAP_DIR/source.tar.gz" "$SNAP_DIR/source-manifest.json" "$TARGET:$STAGE/"
```

Example server-side commands after replacing the placeholders with this run's recorded paths and hash. On a new SSH login, set `STAGE` again to the **same** path printed above; do not create a second stage:

```bash
umask 077
BASE=/home/whats91/releases/whats91.com
STAGE='<exact-staging-path-returned-above>'
test -d "$STAGE"
printf '%s  %s\n' '<recorded-source-tar-sha256>' "$STAGE/source.tar.gz" | sha256sum -c -
mkdir -m 700 "$STAGE/source"
tar -xzf "$STAGE/source.tar.gz" -C "$STAGE/source"
```

Mac archive metadata caused **689 `._*` AppleDouble files** during the first transfer, including duplicate flow JSON entries; the Linux build succeeded but packaging correctly failed with `FLOW_PACKAGING_MISMATCH`. `COPYFILE_DISABLE=1` should prevent this. If any `._*` files still appear, first confirm none are listed in `source-manifest.json`, then delete only those generated files inside this isolated staging tree and verify every manifest source hash again:

```bash
cd "$STAGE/source"
find . -type f -name '._*' -print
# Only after confirming these are unlisted archive metadata:
find . -type f -name '._*' -delete
export PATH=/home/whats91/.nvm/versions/node/v24.21.0/bin:$PATH
node --input-type=module -e 'import fs from "node:fs";import {checkFiles} from "./scripts/release/candidate.mjs";const s=JSON.parse(fs.readFileSync("../source-manifest.json","utf8"));checkFiles(process.cwd(),s.files);console.log("source files verified:",Object.keys(s.files).length)'
```

Stop on a hash mismatch or unexpected extra source file. Preserve the failed staging tree/logs for diagnosis; do not promote it.

## 6. Install and build on Linux

In the verified staging `source` directory, install from the checked-in npm lockfile. Do not replace `npm ci` with an unlocked install or copy macOS modules.

```bash
cd "$STAGE/source"
export PATH=/home/whats91/.nvm/versions/node/v24.21.0/bin:$PATH
npm ci --no-audit --no-fund > "$STAGE/npm-ci.log" 2>&1
```

The current client code uses `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` at build time. Read only that **public** key from the owner-managed `.env` into a shell variable without printing it. Recheck the source for any new build-time variables on future releases. Keep server secrets out of build logs and the release tree.

```bash
ENV_FILE=/home/whats91/htdocs/whats91.com/.env
export NEXT_PUBLIC_RECAPTCHA_SITE_KEY="$(node --env-file="$ENV_FILE" -p 'process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""')"
test -n "$NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
```

The repository's `scripts/build.mjs` calls local Git, which the transferred snapshot intentionally does not contain. Create this **staging-only** wrapper at `$STAGE/build-server.mjs`; it uses the transferred source hashes, runs the same Next build step, writes the required build-source receipt, and calls the repository's own package verifier. It is not product code and it must be reviewed again if the repository build contract changes:

```bash
cat > "$STAGE/build-server.mjs" <<'JS'
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const snapshot = JSON.parse(fs.readFileSync('../source-manifest.json', 'utf8'));
const { checkFiles } = await import(pathToFileURL(path.join(root, 'scripts/release/candidate.mjs')));
const { packageStandalone } = await import(pathToFileURL(path.join(root, 'scripts/package-standalone.mjs')));
checkFiles(root, snapshot.files);

function run(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: root, env: process.env, stdio: 'inherit',
  });
  if (result.status !== 0) throw new Error(`build step failed: ${script}`);
}

run('node_modules/next/dist/bin/next', ['build', '--webpack']);
checkFiles(root, snapshot.files);
const runtimeFiles = Object.fromEntries(Object.entries(snapshot.files)
  .filter(([name]) => !name.startsWith('docs/') && !name.startsWith('tests/')));
fs.writeFileSync('.next/build-source-receipt.json', JSON.stringify({
  runtimeFiles, deletedSources: snapshot.deletedSources, head: snapshot.head,
}) + '\n');
const manifest = packageStandalone(root, { sources: snapshot, head: snapshot.head });
console.log(JSON.stringify({ buildId: manifest.buildId, candidateId: manifest.candidateId, packaging: 'verified-linux' }));
JS
cd "$STAGE/source"
node "$STAGE/build-server.mjs" > "$STAGE/build.log" 2>&1
tail -8 "$STAGE/build.log"
```

Use Node 24 and retain the private staging log. A successful Next page-generation message alone is **not** enough; require the final `packaging: verified-linux` receipt. If packaging fails because of AppleDouble metadata, remove only the unlisted generated `._*` files from staging and rerun the package step after verifying all source hashes; do not accept an unverified bundle.

## 7. Materialize and verify the immutable runtime

Read `candidateId` and `buildId` from the verified `source/.next/standalone/release-manifest.json`. The runtime directory name is the **full candidate ID**. Refuse to overwrite an existing release directory. On the same filesystem, move the verified `standalone` tree from staging into `releases/<candidate-id>` and independently run `verifyPackage` there:

```bash
BASE=/home/whats91/releases/whats91.com
NEW_ID='<full-verified-candidate-id>'
export NEW_ID
NEW_RELEASE="$BASE/releases/$NEW_ID"
test ! -e "$NEW_RELEASE"
mv "$STAGE/source/.next/standalone" "$NEW_RELEASE"
cd "$NEW_RELEASE"
node --input-type=module -e 'import fs from "node:fs";import {verifyPackage} from "./release-contract/candidate.mjs";const m=JSON.parse(fs.readFileSync("release-manifest.json","utf8"));if(m.candidateId!==process.env.NEW_ID)throw new Error("RELEASE_DIRECTORY_ID_MISMATCH");verifyPackage(process.cwd(),m);console.log(m.candidateId,m.buildId,Object.keys(m.artifacts).length)'
test ! -e .env
```

The package must contain `server.js`, `start.mjs`, `.next/BUILD_ID`, static/public assets, `version.txt`, the release manifest and identity, bundled Linux dependencies, and all currently required flow JSON examples. Do not put private configuration, a database, logs, or a symlink inside the immutable release. `verifyPackage` excludes only mutable `.next/cache` from its artifact hash.

## 8. Graph intake and temporary-port gate

Before every promotion, verify the Graph public form endpoint and configuration on its own release. Confirm the deployed ingress proxy preserves the real client IP, blocks direct Node-port access, allows both website origins, and has the expected reCAPTCHA secret, hostname and score policy. This website release has no database bootstrap or migration step. Do not send real prospect data during a synthetic preflight.

Start the new immutable runtime directly on an unused **temporary loopback port**, leaving PM2 and public port 3249 untouched. The explicit `PORT` environment variable overrides the `.env` value for this bounded smoke test:

```bash
cd "$NEW_RELEASE"
NODE_BIN=/home/whats91/.nvm/versions/node/v24.21.0/bin/node
ENV_FILE=/home/whats91/htdocs/whats91.com/.env
HOSTNAME=127.0.0.1 PORT=3250 \
  "$NODE_BIN" --env-file="$ENV_FILE" start.mjs > "$STAGE/smoke.log" 2>&1 &
SMOKE_PID=$!
# Use a trap in the operator shell to kill/wait for this exact PID on exit.
curl --fail --silent --show-error --max-time 8 http://127.0.0.1:3250/api/ready | \
  node -e 'let s="";process.stdin.on("data",x=>s+=x).on("end",()=>{const r=JSON.parse(s),m=require("./release-manifest.json");if(r.status!=="ready"||r.scope!=="website"||r.candidateId!==m.candidateId||r.buildId!==m.buildId||r.version!==m.version)process.exit(1);console.log("exact temporary readiness passed")})'
curl --fail --silent --show-error --max-time 8 -o /dev/null http://127.0.0.1:3250/
curl --fail --silent --show-error --max-time 8 -o /dev/null http://127.0.0.1:3250/contact
curl --fail --silent --show-error --max-time 8 -o /dev/null http://127.0.0.1:3250/pricing
kill "$SMOKE_PID"
wait "$SMOKE_PID" 2>/dev/null || true
```

Parse `/api/ready` and require **exact** `status=ready`, `scope=website`, candidate ID, build ID, and version from this release manifest. An HTTP 200 from an old process is not proof. Confirm the temporary process stopped and port 3250 is free. Use another free loopback port if 3250 is occupied; do not kill an unknown listener.

## 9. Promote through PM2 and verify public serving

Before replacing the running process, record its PM2 name, PID, restart count, absolute cwd, existing release candidate ID, and public/loopback health. Back up `~/.pm2/dump.pm2` privately. The first deployment had no previous release on this host; later deployments should normally have one. Stop if the existing PM2 identity is ambiguous, if the old release is missing/corrupt, or if the new release has not passed the temporary-port gate.

The new release uses the following PM2 shape. For a subsequent release, stop and delete only the verified `whats91` PM2 entry, then start the new one from the directory named by its candidate ID. This causes a short cutover; record the currently running release's PM2 startup command and environment key names first so its different startup contract can be restored if needed. Do not `pm2 save` the new entry until all checks pass. If the cutover fails, delete the failed entry, restart the previous immutable release under its recorded startup contract, and verify its readiness/public response before saving it.

```bash
export PATH=/home/whats91/.nvm/versions/node/v24.21.0/bin:$PATH
NODE_BIN=/home/whats91/.nvm/versions/node/v24.21.0/bin/node
ENV_FILE=/home/whats91/htdocs/whats91.com/.env
export HOSTNAME=127.0.0.1 NODE_ENV=production

# For a repeat release, after recording the previous exact release:
pm2 stop whats91
pm2 delete whats91
pm2 start "$NODE_BIN" --name whats91 --cwd "$NEW_RELEASE" --interpreter none -- \
  --env-file="$ENV_FILE" start.mjs
```

Verify the listener is **only** `127.0.0.1:3249`, one PM2 process is online with the new actual cwd and absolute Node interpreter, and its restart count stays stable. Check representative loopback and proxy/public routes, exact readiness JSON, a real static CSS/JS asset, HTTP→HTTPS redirect, and certificate validation:

```bash
ss -ltnp | grep ':3249 '
curl --fail --silent --show-error http://127.0.0.1:3249/api/ready
curl --fail --silent --show-error --resolve whats91.com:443:127.0.0.1 \
  https://whats91.com/api/ready
curl --silent --show-error --resolve whats91.com:443:127.0.0.1 \
  -o /dev/null -w '%{http_code} %{ssl_verify_result}\n' https://whats91.com/
curl --silent --show-error -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  http://whats91.com/
```

Also check `/contact`, `/pricing`, and at least one representative changed route. From outside the server, resolve `whats91.com` to the expected IP and verify public HTTPS. Confirm retired `/api/contact` and `/api/demo` paths return 404. Verify the browser form sends to `https://graph.whats91.com/public/form-submissions` under the production Content Security Policy and Graph CORS policy. A synthetic local Graph stub can validate UI behavior; a real production submission and downstream provider delivery require their own acceptance evidence. Inspect PM2 restart count and bounded logs without printing secrets.

Only after stable verification:

```bash
pm2 save
chmod 600 /home/whats91/.pm2/dump.pm2
```

The first deployment added this user-owned crontab entry for reboot resurrection; preserve it, ensure it is present **once**, and do not add duplicates on repeat releases:

```text
@reboot /home/whats91/.nvm/versions/node/v24.21.0/bin/node /home/whats91/.nvm/versions/node/v24.21.0/lib/node_modules/pm2/bin/pm2 resurrect
```

The cron service was active and the entry was installed, but an actual server reboot was **not** performed. Do not report reboot recovery as observed until it is tested. The site user lacked passwordless sudo, so no systemd PM2 startup unit was installed.

## 10. Recovery, diagnosis, and retention

- **502 from the public proxy:** Check whether PM2 has the intended process, whether it restarts, and whether `127.0.0.1:3249` answers. The first deployment's DNS and TLS virtual host were already present; before process start, the proxy returned 502. Do not edit Nginx/DNS solely because the app listener is absent.
- **Startup exits before port binding:** Check the candidate pin, release hashes, absolute Node version, `.env` existence/mode, and missing private dependencies. `start.mjs` intentionally gives a generic failure; use bounded private diagnostics, not a public error page with paths/secrets.
- **`FLOW_PACKAGING_MISMATCH`:** Inspect `._*` AppleDouble files in staging and compare the currently required flow JSON names/hashes. Never weaken the package check to get a release through.
- **Node or native-module failure:** Reinstall/rebuild in Linux staging from the lockfile. Never deploy the Mac standalone tree.
- **Readiness 200 but wrong candidate ID:** You are hitting the previous process or proxy target. Stop and identify the exact process before saving PM2.
- **Failed promotion:** Recreate the prior `whats91` PM2 entry with its recorded prior startup contract, verify its manifest identity and loopback/public routes, then `pm2 save`. Preserve the failed release and logs for diagnosis.
- **Disk pressure:** The server was 93% used on 30 September. Remove only task-owned obsolete staging after recording evidence and checking process/cwd references. Never delete the active release, previous rollback release, `.env`, database, PM2 dump, or an unfamiliar directory.

Keep at least the current and immediately prior verified runtime releases. The first release on this host had **no local rollback release**. A future agent should not claim that old-server rollback is ready without separately verifying its current state and routing procedure.

After recording `PREV_RELEASE` and its manifest `PREV_ID` before cutover, use the same PM2 shape below **only if** that prior release has this directory-pinned startup wrapper. An older release can require a different PM2 environment and must be restored from its recorded PM2 state instead of assuming this command applies:

```bash
pm2 stop whats91 || true
pm2 delete whats91 || true
export HOSTNAME=127.0.0.1 NODE_ENV=production
pm2 start "$NODE_BIN" --name whats91 --cwd "$PREV_RELEASE" --interpreter none -- \
  --env-file="$ENV_FILE" start.mjs
# Require exact prior candidate ID from loopback and public /api/ready, then:
pm2 save
```

## 11. Completion evidence to record for every deployment

Record the date/time with timezone; owner-approved source scope and local dirty-tree status; local `HEAD` and exact source archive SHA-256; number of manifest source files; Linux `npm ci`, Next build and package result; full candidate ID, build ID, version, artifact count and immutable path; Graph endpoint/CORS/CSP validation; previous release ID; PM2 name/cwd/interpreter/PID/restarts and saved dump; loopback listener/readiness/routes; public DNS/IP/TLS/redirect/routes/static assets; any browser or real form/provider checks actually performed; rollback outcome or target; and unresolved limitations. Never treat PM2 `online`, a 200 from the wrong candidate, or a successful build as complete production evidence.

## 12. First deployment record — 30 September 2026

- The local Git `HEAD` was `6fdf9db34ea3d06772059873890f03fa1ed02657`, but the deployed source was an **authorized dirty working-tree snapshot**, not that commit alone. No Git push/pull was used. The old `scripts/deploy.js` was left untouched.
- Local check passed **217/217** after the eleventh-blog inventory assertion was updated. The source archive SHA-256 was `fea2f5d88e28795cbfd9a5865b3490e8f2fdabf8c2b545913fc35568e26e32f2`, with **646** verified source files.
- Linux `npm ci` installed 668 packages. Prisma generation and Next/Webpack build passed. AppleDouble metadata was removed from isolated staging. Verified Linux package: candidate `40596064e6af53b37742bf63e67137412c13f8fa6ddc637498bd9e031d647efd`, build `mUS6sKIXcpg-UMprt4tTR`, version `1.6.3`, **2,933** artifact files, about 121 MiB.
- `.env` existed but had mode `770`; it was restricted to `600`. `PORT=3249` was present. The configured SQLite file and parent were missing; the owner explicitly authorized a new empty database. Prisma initialized `Contact`, `Demo`, `Post`, and `User` tables; integrity check was `ok`, initial row counts were zero, and file mode was set to `600`. No historical rows were migrated.
- PM2 7.0.4 was installed under the site user's Node 24. The single `whats91` process used the full release path above, absolute Node binary, `interpreter=none`, and arguments `--env-file=/home/whats91/htdocs/whats91.com/.env start.mjs`. It listened on `127.0.0.1:3249`, with zero restarts at final check. PM2 was saved and the `@reboot` cron entry was added; reboot recovery remains untested.
- Direct loopback and public HTTPS returned 200 for `/`, `/contact`, `/pricing`, the October pricing article, and `/api/ready`; the readiness response matched this candidate/build/version. Public DNS resolved to `159.65.148.106`, TLS certificate verification succeeded, a static CSS asset returned 200, and HTTP redirected to HTTPS. Safe form-route checks returned Contact/Demo GET 405, Contact OPTIONS 204, and invalid Contact POST 400; the new database still had zero Contact/Demo rows after those checks.
- **Not verified:** A real Contact/Demo submission, CRM or notification delivery, a full browser/device acceptance, an actual server reboot, and rollback to a prior release on this new host. These must not be inferred from the HTTP and PM2 checks above.

## 13. Repeat deployment record — 30 September 2026

- The subsequent deployment used a fresh snapshot of the local dirty working tree: 648 source files, archive SHA-256 `4b0f3ad52ccd0ac15372fe331cecf69900aed553a4a5ccf3e2286eda8c31631d`. The local `npm run check` passed 218/218. The runtime changes since the first deployment were the plan/pricing updates; the snapshot also included this runbook and the local completion note. No Git-based deployment or `scripts/deploy.js` was used.
- Linux staging verified every source hash, ran `npm ci`, built with the production public reCAPTCHA site key, and verified the complete release package. The immutable candidate is `3c3f863c7450ef02b06d90e0e387c239b23076911bc9a08dbde218ae9f023fc7`, build `rg_dfSiJBjrDm8j4UEyOW`, version `1.6.3`, with 2,934 artifact files. The previous candidate `40596064e6af53b37742bf63e67137412c13f8fa6ddc637498bd9e031d647efd` was reverified and retained as the rollback target.
- The production SQLite file passed integrity and required-table checks. There was no schema change or migration. The new candidate passed isolated loopback checks on temporary port 3250 before cutover, including readiness and the changed plans, checkout, pricing, and calculator routes.
- Cutover replaced the single `whats91` PM2 process and saved the new PM2 dump with mode `600`. The final process had the exact new release cwd, zero restarts, and listened only on `127.0.0.1:3249`. Both loopback and public `/api/ready` returned the exact candidate/build/version. Public HTTPS returned 200 for `/`, `/plans`, `/pricing`, `/checkout?plan=standard&billing=monthly`, and `/tools/whatsapp-api-cost-calculator`; the plans HTML contained the expected updated price markers. A published CSS asset returned 200, HTTP redirected to HTTPS with 301, and the PM2 reboot cron entry remained present exactly once.
- No real form submission, CRM delivery, browser/device acceptance, reboot recovery, or rollback execution was performed. This record was appended locally after the sealed release snapshot and will be included in the next deployment snapshot.
