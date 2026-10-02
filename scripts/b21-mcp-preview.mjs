import { readFileSync, writeFileSync } from 'node:fs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
import { parseDocument, buildIds, textContent } from './seo-validation/evidence.mjs';
const c=projectLoader()('src/lib/mcp-contract.ts'), build=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4307',checks=[],requests=[];
const check=(name,ok,detail)=>checks.push({name,ok:!!ok,...(detail===undefined?{}:{detail})});
async function request(path,method='GET') { if(!path.startsWith('/')||path.startsWith('//'))throw Error('Nonlocal path');const r=await fetch(base+path,{method,redirect:'error',signal:AbortSignal.timeout(10000),...(['POST','PUT','PATCH','DELETE'].includes(method)?{headers:{'Content-Type':'application/json'},body:'{"jsonrpc":"2.0","method":"tools/call","params":{"name":"get_pricing"}}'}:{})});requests.push({path,method,status:r.status});return {response:r,body:await r.text()}; }
for(const [path,status] of [['/api/mcp',200],['/api/md/mcp',200],['/api/mcp/pages/mcp',200],['/.well-known/oauth-authorization-server',410],['/.well-known/protected-resource',410]]) {
 for(const method of ['GET','HEAD','OPTIONS','POST','PUT','PATCH','DELETE']) {
  const {response:r,body}=await request(path,method), expected=method==='OPTIONS'?204:['GET','HEAD'].includes(method)?status:405;
  check(`${method} status ${path}`,r.status===expected,r.status);
  check(`${method} Allow ${path}`,r.headers.get('allow')==='GET, HEAD, OPTIONS');
  check(`${method} CORS ${path}`,r.headers.get('access-control-allow-methods')==='GET, HEAD, OPTIONS'&&r.headers.get('access-control-allow-origin')==='*');
  check(`${method} noindex ${path}`,r.headers.get('x-robots-tag')==='noindex');
  if(['HEAD','OPTIONS'].includes(method))check(`${method} empty ${path}`,body==='');
  if(expected===405||expected===410)check(`${method} no-store ${path}`,r.headers.get('cache-control')==='no-store');
  if(method==='GET'&&status===410){const d=JSON.parse(body);check('retired auth metadata '+path,d.status==='retired'&&['issuer','authorization_endpoint','token_endpoint','jwks_uri','authorization_servers','scopes_supported'].every(k=>!(k in d)));}
 }
}
const {body:catalogueBody}=await request('/api/mcp'),catalogue=JSON.parse(catalogueBody);
check('resource-only catalogue',catalogue.kind==='website-content-catalogue'&&['tools','capabilities','protocolVersion','issuer'].every(k=>!(k in catalogue)));
check('actual catalogue count',catalogue.passages.total===catalogue.passages.pages.length);
for(const resource of [...catalogue.resources,...catalogue.passages.pages.map(p=>({uri:p.url,mimeType:'application/json'}))]) {
 const u=new URL(resource.uri);check('concrete same-site resource '+u.pathname,u.origin==='https://whats91.com'&&!/[{}]/.test(resource.uri));
 const {response:r,body}=await request(u.pathname);check('actual resource resolves '+u.pathname,r.status===200&&r.headers.get('content-type').includes(resource.mimeType));
 if(resource.mimeType==='application/json')check('resource JSON parses '+u.pathname,typeof JSON.parse(body)==='object');
}
const {body:html}=await request('/mcp'),doc=parseDocument(html),schema=doc.elements.filter(n=>n.tag==='script'&&n.attrs.type==='application/ld+json').map(n=>JSON.parse(textContent(n))).flat(),faq=schema.find(s=>s['@type']==='FAQPage');
check('exact candidate build',JSON.stringify(buildIds(doc))===JSON.stringify([build]));
check('initial qualification',doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===c.mcpQualification));
check('access enquiry note',doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===c.mcpAccessNote));
check('FAQ/schema parity',JSON.stringify(faq?.mainEntity.map(q=>({id:c.mcpFaqItems.find(f=>f.q===q.name)?.id,q:q.name,a:q.acceptedAnswer.text})))===JSON.stringify(c.mcpFaqItems));
for(const f of c.mcpFaqItems)check('native initial FAQ '+f.id,doc.elements.some(e=>e.tag==='summary'&&textContent(e).trim()===f.q)&&doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===f.a));
check('no stale preview/live status',!/(Available now|Private preview|Every capability below is live|Connect in minutes)/.test(html));
check('no fabricated paid/schema offers',schema.every(s=>!s.offers));
check('MD alternate',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='alternate'&&e.attrs.type==='text/markdown'&&e.attrs.href==='https://whats91.com/api/md/mcp'));
check('JSON alternate',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='alternate'&&e.attrs.type==='application/json'&&e.attrs.href==='https://whats91.com/api/mcp/pages/mcp'));
const {body:md}=await request('/api/md/mcp'),{body:passage}=await request('/api/mcp/pages/mcp');check('MD canonical contract',md.includes(c.mcpMarkdown));check('passage canonical contract',JSON.parse(passage).sections[0].content===c.mcpMarkdown);
for(const slug of ['/api/md/missing-b14-fixture','/api/mcp/pages/missing-b14-fixture'])check('unknown content remains404 '+slug,(await request(slug)).response.status===404);
for(const path of ['/','/features','/plans','/checkout?plan=standard&billing=annual']){const {body}=await request(path);check('no stale MCP status '+path,!/Private preview|MCP included|point any MCP-compatible client/.test(body));}
writeFileSync('docs/evidence/b21-2026-09-28/built-mcp-contract.json',JSON.stringify({buildId:build,checks,requests,scope:'Actual local built website routes. Unsupported-method payloads only sent to content/retirement endpoints. No account gateway or private request.'},null,2)+'\n');console.log(JSON.stringify({checks:checks.length,failures:checks.filter(c=>!c.ok),requests:requests.length}));if(checks.some(c=>!c.ok))process.exitCode=1;
