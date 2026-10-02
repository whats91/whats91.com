import test from 'node:test';
import assert from 'node:assert/strict';
import { projectLoader } from './helpers/load-project-module.mjs';

test('public readiness checks release identity without requiring website storage', async () => {
  const fsMock = {
    lstatSync: () => ({ isFile: () => true, isSymbolicLink: () => false, size: 200 }),
    readFileSync: filename => filename.endsWith('release-identity.json')
      ? JSON.stringify({ candidateId: 'a'.repeat(64), buildId: 'synthetic-build', version: '1.6.3' })
      : filename.endsWith('BUILD_ID') ? 'synthetic-build' : '1.6.3',
  };
  const route = projectLoader(new Map([['node:fs', fsMock]]))('src/app/api/ready/route.ts');
  const good = await route.GET();
  assert.equal(good.status, 200);
  assert.equal((await good.json()).scope, 'website');
  assert.equal(good.headers.get('cache-control'), 'no-store');
  assert.equal(good.headers.get('x-robots-tag'), 'noindex');
  fsMock.readFileSync = () => { throw new Error('/private/environment/path secret'); };
  const bad = await route.GET();
  assert.equal(bad.status, 503);
  assert.deepEqual(await bad.json(), { status: 'unavailable' });
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) assert.equal((await route[method]()).status, 405);
  assert.equal((await route.OPTIONS()).status, 204);
});
