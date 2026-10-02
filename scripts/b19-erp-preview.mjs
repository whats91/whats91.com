import { readFileSync, writeFileSync } from 'node:fs';
import { parseDocument, buildIds, textContent } from './seo-validation/evidence.mjs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
const {busySolutions,busyMarkdown,busySceneCaption,busyEnquiryScope}=projectLoader()('src/lib/busy-solutions.ts');
const build=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4305',rows=[],requests=[],payload=[];
const baseline=JSON.parse(readFileSync('docs/evidence/b17-2026-09-28/source-occurrences-before.json','utf8'));
async function get(path){const response=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,method:'GET',status:response.status});return {response,html:await response.text()};}
for(const solution of Object.values(busySolutions)){
 const path='/solutions/'+solution.slug,{response,html}=await get(path),doc=parseDocument(html),main=doc.elements.find(e=>e.tag==='main'),visible=textContent(main,true),checks=[];
 const add=(name,ok)=>checks.push({name,ok});
 const graphs=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').flatMap(e=>{const data=JSON.parse(textContent(e));return Array.isArray(data)?data:data['@graph']||[data];});
 const faq=graphs.find(g=>g['@type']==='FAQPage'&&g.mainEntity?.some(q=>q.name===solution.faqs[0].question)),service=graphs.find(g=>g['@type']==='Service'&&g.url==='https://whats91.com'+path);
 add('200 and exact build identity',response.status===200&&JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 add('single h1 and server-rendered intent/scope',doc.elements.filter(e=>e.tag==='h1').length===1&&visible.includes(solution.intro)&&visible.includes(solution.scope));
 add('canonical route and metadata qualification',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='canonical'&&e.attrs.href==='https://whats91.com'+path)&&doc.elements.some(e=>e.tag==='meta'&&e.attrs.name==='description'&&e.attrs.content===solution.description));
 add('OG and Twitter descriptions match direct copy', ['og:description','twitter:description'].every(name=>doc.elements.some(e=>e.tag==='meta'&&(e.attrs.property===name||e.attrs.name===name)&&e.attrs.content===solution.description)));
 add('Service description parity without numerical promise',service?.description===solution.description);
 add('native answer HTML and FAQ schema parity',faq?.mainEntity.length===solution.faqs.length&&solution.faqs.every(f=>textContent(main).includes(f.answer)&&faq.mainEntity.some(q=>q.name===f.question&&q.acceptedAnswer.text===f.answer))&&doc.elements.filter(e=>e.tag==='details').length>=solution.faqs.length);
 add('accessible static workflow and near-scene scope',visible.includes(busySceneCaption)&&solution.steps.every(step=>visible.includes(step.title)&&visible.includes(step.text))&&doc.elements.some(e=>e.tag==='figure'&&e.attrs['aria-labelledby']==='workflow-heading'));
 add('all original route anchors retained',baseline.find(b=>b.slug===solution.slug).anchors.every(id=>doc.elements.some(e=>e.attrs.id===id)));
 add('related task links and native enquiry fallback',solution.related.every(slug=>doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='/solutions/'+slug))&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='/contact'&&textContent(e,true)==='Request a demo')&&visible.includes(busyEnquiryScope));
 add('no replaced metric/customer/status assertions in visible/meta/schema',!/(99\.(?:9|95|99)%|98%|98\.5%|100%|350,000|₹4\.2L|₹55,000|₹6\.6|₹77,000|50%|80%|95%|Zero API Limits|Sub-100ms|Live Conversation|Sharma Distributors|ABC Trading Co\.)/i.test(visible+graphs.map(g=>JSON.stringify(g)).join('')+doc.elements.filter(e=>e.tag==='meta').map(e=>e.attrs.content).join('')));
 const tables=doc.elements.filter(e=>e.tag==='table');
 add('every report/comparison table has caption and keyboard region',tables.length===solution.sections.filter(s=>s.table).length&&tables.every(t=>t.children.some(c=>c.tag==='caption'))&&doc.elements.filter(e=>e.attrs.role==='region'&&e.attrs.tabindex==='0').length===tables.length);
 const md=await get('/api/md/'+solution.slug),pass=await get('/api/mcp/pages/'+solution.slug),data=JSON.parse(pass.html),expected=busyMarkdown(solution);
 add('both built alternate representations have whole canonical guidance',md.response.status===200&&pass.response.status===200&&md.html.includes(expected)&&data.sections[0].content===expected&&data.title===solution.title&&data.description===solution.description);
 add('alternate FAQ and scene scope parity',solution.faqs.every(f=>md.html.includes(f.answer)&&data.sections.some(s=>s.heading===f.question&&s.content===f.answer))&&md.html.includes(busySceneCaption));
 add('no automatic alternate date refresh',!(/publishedAt:|lastModified:/.test(md.html))&&!data.published_at&&data.updated_at===(solution.slug==='busy-erp'?'2026-03-03':undefined));
 add('resource headers remain read-only/noindex',md.response.headers.get('x-robots-tag')==='noindex'&&pass.response.headers.get('x-robots-tag')==='noindex'&&pass.response.headers.get('allow')==='GET, HEAD, OPTIONS');
 if(solution.slug==='busy-erp')add('existing ERP passage identities preserved',['overview','invoice_automation','balance_inquiry','payment_reminders','ledger_statements','bilty_tracking','roi'].every(id=>data.sections.some(s=>s.id==='busy-erp__'+id)));
 const links=[...new Set(doc.elements.filter(e=>e.tag==='a').map(e=>e.attrs.href).filter(h=>h?.startsWith('/solutions/')||['/contact','/privacy','/legal','/sla'].includes(h)))];
 for(const link of links){const target=await get(link.split('#')[0]);add('local destination '+link,target.response.status===200);}
 const scripts=[...new Set(doc.elements.filter(e=>e.tag==='script'&&e.attrs.src?.startsWith('/_next/static/')).map(e=>e.attrs.src))],js=[];
 for(const path of scripts){const r=await fetch(base+path);js.push({path,status:r.status,bytes:(await r.arrayBuffer()).byteLength});}
 payload.push({slug:solution.slug,status:response.status,htmlBytes:Buffer.byteLength(html),js,jsBytes:js.reduce((n,x)=>n+x.bytes,0)});
 rows.push({path,checks,sections:solution.sections.length,faqs:solution.faqs.length,links});
}
const evidence={buildId:build,rows,requests,scope:'Six actual built routes, native initial disclosure/diagram/link semantics, meta/Service/FAQ qualification, whole canonical MD/MCP content, dates and native enquiry fallback. No product/backend/account verification.'};
writeFileSync('docs/evidence/b19-2026-09-28/built-erp-contract.json',JSON.stringify(evidence,null,2)+'\n');
writeFileSync('docs/evidence/b19-2026-09-28/payload-after.json',JSON.stringify({buildId:build,scope:'GET decoded body bytes and initial script reference bytes only; no matched network/CPU/cache/CWV profile, no speed conclusion or B29 pass.',rows:payload},null,2)+'\n');
const checks=rows.flatMap(r=>r.checks);console.log(JSON.stringify({buildId:build,rows:rows.length,assertions:checks.length,failures:rows.flatMap(r=>r.checks.filter(c=>!c.ok).map(c=>({path:r.path,...c})))}));if(checks.some(c=>!c.ok))process.exitCode=1;
