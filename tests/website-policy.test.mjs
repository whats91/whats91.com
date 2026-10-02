import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectLoader } from './helpers/load-project-module.mjs';

function policy() { return projectLoader()('src/lib/website-policy.ts'); }
function directives(csp) { return new Map(csp.split(';').map(s=>s.trim().split(/\s+/)).map(([name,...values])=>[name,values])); }

test('production CSP confines active sources while retaining Next inline bootstrap, local blob/data tools and scoped captcha',()=>{
  const h=Object.fromEntries(policy().websiteSecurityHeaders().map(h=>[h.key,h.value])),d=directives(h['Content-Security-Policy']);
  assert.deepEqual(d.get('default-src'),["'self'"]);assert.deepEqual(d.get('object-src'),["'none'"]);assert.deepEqual(d.get('base-uri'),["'self'"]);assert.deepEqual(d.get('form-action'),["'self'"]);
  assert.ok(d.get('script-src').includes("'unsafe-inline'"));assert.ok(!d.get('script-src').includes("'unsafe-eval'"));
  for(const origin of ['https://www.google.com/recaptcha/','https://www.gstatic.com/recaptcha/'])assert.ok(d.get('script-src').includes(origin));
  assert.deepEqual(d.get('frame-src'),['https://www.google.com/recaptcha/','https://recaptcha.google.com/recaptcha/']);assert.deepEqual(d.get('connect-src'),["'self'",'https://www.google.com/recaptcha/','https://graph.whats91.com']);
  assert.deepEqual(d.get('img-src'),["'self'",'data:','blob:']);assert.ok(![...d.values()].flat().includes('*'));
  assert.equal(h['X-Content-Type-Options'],'nosniff');assert.equal(h['Referrer-Policy'],'strict-origin-when-cross-origin');
  assert.equal(h['Strict-Transport-Security'],undefined);assert.equal(h['X-Frame-Options'],undefined);assert.ok(!d.has('frame-ancestors'));assert.ok(!d.has('upgrade-insecure-requests'));
});

test('development eval exception does not weaken the production policy or enable a tracker',()=>{
  const p=policy();assert.ok(directives(p.websiteSecurityHeaders(true)[0].value).get('script-src').includes("'unsafe-eval'"));
  assert.ok(!p.websiteSecurityHeaders(false)[0].value.includes("'unsafe-eval'"));
  assert.ok(!p.websiteSecurityHeaders()[0].value.includes('googletagmanager'));
});

test('actual Next configuration installs global security and API noindex without changing unresolved HSTS/framing/preview choices',async()=>{
  const c=projectLoader()('next.config.ts').default,headers=await c.headers();assert.equal(c.poweredByHeader,false);assert.equal(c.output,'standalone');
  assert.ok(headers.find(h=>h.source==='/:path*').headers.some(h=>h.key==='Content-Security-Policy'));
  assert.deepEqual(headers.find(h=>h.source==='/api/:path*').headers,[{key:'X-Robots-Tag',value:'noindex'}]);
  assert.ok(!JSON.stringify(headers).includes('includeSubDomains'));assert.ok(!JSON.stringify(headers).includes('preload'));
});

test('public version exposes only valid already-public build display identity and gives bounded unavailable results',async()=>{
  const old=process.env.NEXT_PUBLIC_APP_VERSION;
  try{
    const route=projectLoader()('src/app/api/version/route.ts');
    for(const value of ['1.6.3','1.6.3-rc.1+fixture']){process.env.NEXT_PUBLIC_APP_VERSION=value;const r=await route.GET();assert.equal(r.status,200);assert.deepEqual(await r.json(),{version:value});assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('x-robots-tag'),'noindex');}
    for(const value of ['', '1.6.3\n','../private/file','0.0.0; path=/secret','1'.repeat(90)]){process.env.NEXT_PUBLIC_APP_VERSION=value;const r=await route.GET();assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:'Version unavailable'});}
    delete process.env.NEXT_PUBLIC_APP_VERSION;assert.equal((await route.GET()).status,503);
  }finally{if(old===undefined)delete process.env.NEXT_PUBLIC_APP_VERSION;else process.env.NEXT_PUBLIC_APP_VERSION=old;}
});

test('retired debug endpoint and version method recovery are explicit, read-only and bounded',async()=>{
  const load=projectLoader(),debug=load('src/app/api/route.ts'),r=await debug.GET();assert.equal(r.status,410);assert.equal((await r.json()).information,'/api/mcp');assert.equal(r.headers.get('cache-control'),'no-store');
  for(const route of [debug,load('src/app/api/version/route.ts')]){assert.equal((await route.OPTIONS()).status,204);for(const method of ['POST','PUT','PATCH','DELETE']){const result=await route[method]();assert.equal(result.status,405);assert.equal(result.headers.get('allow'),'GET, HEAD, OPTIONS');assert.equal(result.headers.get('x-robots-tag'),'noindex');assert.equal(result.headers.get('cache-control'),'no-store');}}
});

test('wildcard crawl exclusions preserve API/private hints while allowing required Next rendering resources',()=>{
  const source=readFileSync('public/robots.txt','utf8'),group=source.split(/User-agent:\s*\*/i)[1];
  const rules=group.split('\n').map(s=>s.replace(/#.*/,'').trim()).filter(s=>/^(allow|disallow):/i.test(s)).map(s=>{const [key,...value]=s.split(':');return {allow:key.toLowerCase()==='allow',path:value.join(':').trim()};});
  const allowed=path=>rules.filter(r=>path.startsWith(r.path)).sort((a,b)=>b.path.length-a.path.length||Number(b.allow)-Number(a.allow))[0]?.allow??true;
  for(const path of ['/_next/static/chunks/fixture.js','/_next/static/css/fixture.css','/_next/image?url=%2Flogo.svg&w=128&q=75','/logo.svg','/og-image.png','/api/md/tools','/api/mcp'])assert.ok(allowed(path),path);
  for(const path of ['/_next/other','/api/contact','/api/demo','/private/fixture'])assert.ok(!allowed(path),path);
  assert.ok(!/critical.*AI Overview|must be allowed for AI Overview/i.test(source));
});
