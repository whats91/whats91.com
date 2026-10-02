import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { sourceFiles } from '../scripts/release/candidate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const retired = [
  'src/app/api/contact/route.ts', 'src/app/api/demo/route.ts',
  'src/app/api/webhooks/github/route.ts', 'src/lib/redis.ts',
  'src/lib/db.ts', 'src/lib/recaptcha.ts', 'src/lib/crm-leads.ts',
  'src/lib/bot-master.ts', 'scripts/deploy.js', 'scripts/commit.js',
  'ecosystem.config.cjs',
];

test('form storage, forwarding, Redis and Git updater are absent from the release source', () => {
  const snapshot = sourceFiles(root);
  for (const rel of retired) {
    assert.equal(fs.existsSync(path.join(root, rel)), false, rel);
    assert.ok(snapshot.deletedSources.includes(rel), rel);
  }
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.dependencies.ioredis, undefined);
  assert.equal(pkg.dependencies['@prisma/client'], undefined);
  assert.equal(pkg.scripts.commit, undefined);
  assert.equal(pkg.scripts.start, undefined);
  assert.equal(pkg.scripts['start:pm2'], undefined);
  const active = Object.keys(snapshot.files).filter(rel =>
    rel === 'package.json' || rel === 'next.config.ts'
    || rel.startsWith('src/') || rel.startsWith('scripts/')
  );
  for (const rel of active) {
    const content = fs.readFileSync(path.join(root, rel), 'utf8');
    assert.doesNotMatch(content, /\b(?:REDIS_URL|GITHUB_WEBHOOK_[A-Z_]+|GITHUB_TOKEN|GH_TOKEN|WHATS91_EXPECTED_CANDIDATE_ID|WHATS91_RELEASE_DIR)\b/, rel);
  }
});
