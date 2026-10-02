import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { projectLoader } from './helpers/load-project-module.mjs';
const load = projectLoader();
const { createCopySession } = load('src/lib/resource-copy.ts');
const { createFlowExampleReader } = load('src/lib/flows/read-example.ts');
const { flowRegistry } = load('src/lib/flows/registry.ts');
const deferred = () => { let resolve; const promise = new Promise(r => resolve = r); return { promise, resolve }; };
const tick = () => new Promise(r => setImmediate(r));

test('copy success waits for clipboard completion and retains exact manual text', async () => {
  const wait = deferred(), states = [], writes = [];
  const pending = createCopySession().copy(() => 'exact {{1}} text & नमस्ते', text => { writes.push(text); return wait.promise; }, s => states.push(s));
  await tick(); assert.equal(states.at(-1).phase, 'pending'); assert.equal(states.at(-1).text, writes[0]);
  wait.resolve(); await pending; assert.equal(states.at(-1).phase, 'copied'); assert.deepEqual(writes, ['exact {{1}} text & नमस्ते']);
});
test('denied and unavailable clipboard preserve manual content and never claim success', async () => {
  for (const write of [undefined, async () => { throw new Error('permission denied'); }]) {
    const states = []; await createCopySession().copy(() => 'manual content', write, s => states.push(s));
    assert.equal(states.at(-1).phase, 'unavailable'); assert.equal(states.at(-1).text, 'manual content'); assert.match(states.at(-1).message, /manually/); assert.ok(states.every(s => s.phase !== 'copied'));
  }
});
test('failed or empty source cannot call clipboard or report successful copying', async () => {
  for (const read of [async () => { throw new Error('source failed'); }, () => '', () => '   ']) {
    let writes = 0; const states = []; await createCopySession().copy(read, async () => { writes++; }, s => states.push(s));
    assert.equal(writes, 0); assert.equal(states.at(-1).phase, 'unavailable');
  }
});
test('unmount or changed scope while reading prevents stale clipboard access', async () => {
  const wait = deferred(), states = [], session = createCopySession(); let writes = 0;
  const pending = session.copy(() => wait.promise, async () => { writes++; }, s => states.push(s));
  session.invalidate(); wait.resolve('old content'); await pending; assert.equal(writes, 0); assert.equal(states.length, 1); assert.equal(states[0].phase, 'pending');
});
test('late permission completion after invalidation cannot announce stale success', async () => {
  const wait = deferred(), states = [], session = createCopySession();
  const pending = session.copy(() => 'old content', () => wait.promise, s => states.push(s));
  await tick(); session.invalidate(); wait.resolve(); await pending; assert.equal(states.at(-1).phase, 'pending'); assert.ok(states.every(s => s.phase !== 'copied'));
});
test('latest copy wins when earlier clipboard operation finishes later', async () => {
  const wait = deferred(), states = [], session = createCopySession();
  const first = session.copy(() => 'first', () => wait.promise, s => states.push(s)); await tick();
  await session.copy(() => 'second', async () => {}, s => states.push(s)); wait.resolve(); await first;
  assert.equal(states.at(-1).phase, 'copied'); assert.equal(states.at(-1).text, 'second'); assert.equal(states.filter(s => s.phase === 'copied').length, 1);
});
test('allowlist rejects unknown/traversal-like/reserved IDs before invoking the filesystem', async () => {
  let reads = 0; const reader = createFlowExampleReader(async () => { reads++; throw new Error('must not read'); });
  for (const id of ['unknown', '../welcome-001', '%2e%2e%2f.env', 'constructor', '__proto__', '/welcome-001', 'welcome-001.json']) assert.equal((await reader(id)).status, 404);
  assert.equal(reads, 0);
});
test('all eleven preserved source examples return exact original bytes and bounded cache entries', async () => {
  const calls = []; const reader = createFlowExampleReader(async filename => { calls.push(filename); return fs.readFileSync(`src/lib/flows/json/${filename}`, 'utf8'); });
  assert.equal(flowRegistry.length, 11);
  for (const meta of flowRegistry) {
    const result = await reader(meta.id), again = await reader(meta.id); assert.equal(result.status, 200); assert.equal(result.text, fs.readFileSync(`src/lib/flows/json/${meta.jsonFile}.json`, 'utf8')); assert.deepEqual(again, result);
    const value = JSON.parse(result.text); assert.ok(Array.isArray(value.nodes) && Array.isArray(value.edges));
  }
  assert.equal(calls.length, 11); assert.equal(new Set(calls).size, 11);
});
test('file and parse failures are unavailable, non-disclosing and retriable rather than cached success', async () => {
  for (const failure of [async () => { throw new Error('/private/path/.env secret'); }, async () => '{', async () => 'null', async () => '[]']) {
    let calls = 0; const reader = createFlowExampleReader(async filename => { calls++; return calls === 1 ? failure() : fs.readFileSync(`src/lib/flows/json/${filename}`, 'utf8'); });
    const first = await reader('welcome-001'); assert.equal(first.status, 503); assert.doesNotMatch(first.error, /private|secret|env/); assert.equal((await reader('welcome-001')).status, 200); assert.equal(calls, 2);
  }
});
test('actual flow route returns exact JSON download headers, no-store errors and no unauthorized reads', async () => {
  let reads = 0;
  class NextResponse extends Response { static json(value, options) { return new Response(JSON.stringify(value), { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } }); } }
  const route = projectLoader(new Map([['next/server', { NextResponse }], ['fs', { promises: { readFile: async filename => { reads++; return fs.readFileSync(filename, 'utf8'); } } }]]))('src/app/api/flows/[id]/route.ts');
  for (const id of ['../welcome-001', 'unknown', '__proto__', 'x'.repeat(100)]) {
    const res = await route.GET(new Request('http://fixture/api/flows/unknown'), { params: Promise.resolve({ id }) }); assert.equal(res.status, 404); assert.equal(res.headers.get('cache-control'), 'no-store');
  }
  assert.equal(reads, 0);
  const res = await route.GET(new Request('http://fixture/api/flows/welcome-001'), { params: Promise.resolve({ id: 'welcome-001' }) });
  assert.equal(res.status, 200); assert.equal(res.headers.get('content-type'), 'application/json; charset=utf-8'); assert.match(res.headers.get('content-disposition'), /welcome-001.json/); assert.match(res.headers.get('cache-control'), /must-revalidate/); assert.equal(res.headers.get('x-content-type-options'), 'nosniff'); assert.equal(await res.text(), fs.readFileSync('src/lib/flows/json/welcome-001.json', 'utf8'));
  const failed = await route.GET(new Request('http://fixture/api/flows/unknown'), { params: Promise.reject(new Error('/private/secret')) }); assert.equal(failed.status, 503); assert.equal(failed.headers.get('cache-control'), 'no-store'); assert.doesNotMatch(await failed.text(), /private|secret/);
});
