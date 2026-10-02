import fs from 'node:fs';
import crypto from 'node:crypto';
import { parseDocument } from './seo-validation/evidence.mjs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
const base='http://127.0.0.1:4313',dir='docs/evidence/b27-2026-09-28',buildId=fs.readFileSync('.next/BUILD_ID','utf8').trim();
const checks=[],responses=[],assets=new Set(),add=(name,path,ok,detail)=>checks.push({name,path,ok:!!ok,detail});
const policy=projectLoader()('src/lib/website-policy.ts'),expected=Object.fromEntries(policy.websiteSecurityHeaders().map(h=>[h.key.toLowerCase(),h.value]));
async function get(path,method='GET',ua,extraHeaders={}){const r=await fetch(base+path,{method,redirect:'manual',headers:{...extraHeaders,...(ua?{'User-Agent':ua}:{})}}),body=await r.text(),headers=Object.fromEntries(r.headers);responses.push({path,method,status:r.status,headers,bytes:Buffer.byteLength(body),sha256:crypto.createHash('sha256').update(body).digest('hex'),...(ua&&{diagnosticUserAgent:ua})});return{r,body,headers};}
function security(path,h){for(const [key,value]of Object.entries(expected)){
 const imagePolicy=key==='content-security-policy'&&path.startsWith('/_next/image?');
 add(imagePolicy?'framework optimizer retains strict sandbox CSP':'actual compatible '+key,path,h[key]===(imagePolicy?"script-src 'none'; frame-src 'none'; sandbox;":value),h[key]);
}add('no unnecessary framework header',path,!h['x-powered-by'],h['x-powered-by']);add('HSTS pending without scope',path,!h['strict-transport-security'],h['strict-transport-security']);add('incoming framing choice preserved',path,!h['x-frame-options']&&!h['content-security-policy'].includes('frame-ancestors'));}
const crawl=JSON.parse(fs.readFileSync(dir+'/final/crawl.json','utf8'));
for(const row of crawl.rows){const {r,body,headers}=await get(row.route);security(row.route,headers);add('preserved route status',row.route,r.status===row.status,r.status);const doc=parseDocument(body);for(const e of doc.elements){const address=e.attrs.src||(e.tag==='link'&&['stylesheet','preload','modulepreload'].includes(e.attrs.rel)?e.attrs.href:null);if(address&&address.startsWith('/'))assets.add(address);else if(address&&/^https?:/.test(address))add('no unexpected external rendering asset',row.route,new URL(address).origin==='https://www.google.com',address);}}
for(const path of ['/api','/api/version','/robots.txt','/llms.txt','/api/contact','/api/demo','/api/mcp','/api/md/tools','/api/flows','/.well-known/ai-plugin.json','/.well-known/oauth-authorization-server']){
 const {r,body,headers}=await get(path);security(path,headers);
 if(path.startsWith('/api'))add('API response noindex',path,headers['x-robots-tag']==='noindex');
 if(path==='/api'){add('retired debug410 with recovery',path,r.status===410&&JSON.parse(body).information==='/api/mcp'&&!body.includes('Hello, world'));add('debug no-store',path,headers['cache-control']==='no-store');}
 if(path==='/api/version'){add('bounded public display version',path,r.status===200&&JSON.stringify(JSON.parse(body))===JSON.stringify({version:fs.readFileSync('version.txt','utf8').trim()}));add('version no-store',path,headers['cache-control']==='no-store');}
 if(['/api/contact','/api/demo'].includes(path))add('retired website intake route absent',path,r.status===404&&!body.includes('fixture@example')&&!body.includes('contacts'));
 if(path==='/robots.txt')add('served robots exact source',path,body===fs.readFileSync('public/robots.txt','utf8'));
 const h=await get(path,'HEAD');add('HEAD same status without body',path,h.r.status===r.status&&h.body==='');security(path+' HEAD',h.headers);
}
for(const path of ['/api','/api/version','/api/contact','/api/demo']){const {r,body,headers}=await get(path,'OPTIONS');add('OPTIONS status without body',path,r.status===(['/api/contact','/api/demo'].includes(path)?404:204)&&(!['/api/contact','/api/demo'].includes(path)||!body.includes('fixture@example')));security(path+' OPTIONS',headers);}
// Benign non-existent source paths only. Bodies are neither saved nor inspected for private values.
for(const path of ['/docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_MASTER_PLAYBOOK.md','/src/lib/website-policy.ts','/scripts/b27-security-preview.mjs','/b27-unpublished-env-fixture']){const {r}=await get(path,'HEAD');add('source paths not served',path,r.status===404,r.status);}
const robots=fs.readFileSync('public/robots.txt','utf8'),fallback=robots.split(/User-agent:\s*\*/i)[1],rules=fallback.split('\n').map(s=>s.replace(/#.*/,'').trim()).filter(s=>/^(allow|disallow):/i.test(s)).map(s=>{const [key,...value]=s.split(':');return{allow:key.toLowerCase()==='allow',path:value.join(':').trim()};});
function allowed(path){return rules.filter(r=>path.startsWith(r.path)).sort((a,b)=>b.path.length-a.path.length||Number(b.allow)-Number(a.allow))[0]?.allow??true;}
for(const path of assets){const {r,headers,body}=await get(path);security(path,headers);add('essential asset HTTP200',path,r.status===200,r.status);add('essential wildcard crawl allowance',path,allowed(path));add('essential asset meaningful bytes',path,body.length>0);if(/\.js(?:\?|$)/.test(path))add('script type compatible with nosniff',path,/javascript/.test(headers['content-type']));if(/\.css(?:\?|$)/.test(path))add('CSS type compatible with nosniff',path,/text\/css/.test(headers['content-type']));}
const image='/_next/image?url=%2Fog-image.png&w=256&q=75';const im=await get(image);security(image,im.headers);add('optimized local rendering image accessible',image,im.r.status===200&&/image\//.test(im.headers['content-type']));add('optimized image wildcard allowance',image,allowed(image));
for(const ua of ['Googlebot','GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User','Bingbot','DuckDuckBot','Applebot','B27-generic-diagnostic']){const a=await get('/tools','GET',ua);security('UA '+ua,a.headers);add('UA diagnostic retains public route',ua,a.r.status===200);const denial=await get('/api/contact','HEAD',ua);add('spoofed UA cannot restore retired intake route',ua,denial.r.status===404&&denial.body==='');}
// Preserve inherited B06 HTML/RSC cache representations under the new app headers.
const html=await get('/pricing?b27-cache-variant=safe');
const redirect=await get('/pricing?b27-cache-variant=safe&_rsc=safe-b27','GET',undefined,{RSC:'1'});
add('RSC normalization remains same-origin redirect','/pricing',redirect.r.status===307&&/^\/pricing\?b27-cache-variant=safe&_rsc(?:=[A-Za-z0-9_-]+)?$/.test(redirect.headers.location||''));
const rscPath=redirect.headers.location;
if(rscPath?.startsWith('/pricing?')){
 const first=await get(rscPath,'GET',undefined,{RSC:'1'}),second=await get(rscPath,'GET',undefined,{RSC:'1'});
 security('/pricing HTML',html.headers);security('/pricing RSC',first.headers);
 add('distinct successful HTML/RSC representations','/pricing',html.r.status===200&&first.r.status===200&&html.headers['content-type'].includes('text/html')&&first.headers['content-type']==='text/x-component'&&html.body!==first.body);
 add('stable repeated RSC representation','/pricing',first.body===second.body&&first.headers['cache-control']===second.headers['cache-control']);
 add('router-aware cache Vary preserved','/pricing',[html,first,second].every(x=>['rsc','next-router-state-tree','next-router-prefetch','next-router-segment-prefetch'].every(k=>x.headers.vary?.toLowerCase().includes(k))));
 add('static HTML/RSC cache policy preserved','/pricing',[html,first,second].every(x=>x.headers['cache-control']==='s-maxage=31536000'));
}
const failures=checks.filter(c=>!c.ok),out={buildId,base,checks,failures,responses,assets:[...assets],scope:'Actual loopback GET/HEAD/OPTIONS only; normal index/noindex route variants preserved. No owner preview-mode/framing/HSTS choice activated. Spoofed UA is diagnostic only, never verified provider crawl/index proof. No private values read, POST or external request.'};fs.writeFileSync(dir+'/built-security-policy.json',JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify({buildId,checks:checks.length,failures:failures.length,assets:assets.size,requests:responses.length}));if(failures.length){console.log(failures);process.exitCode=1;}
