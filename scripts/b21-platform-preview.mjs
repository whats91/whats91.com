import { readFileSync, writeFileSync } from 'node:fs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
import { parseDocument, buildIds, textContent } from './seo-validation/evidence.mjs';
const load=projectLoader(), c=load('src/lib/platform-compatibility.ts'), f=load('src/app/faq/faqData.ts').faqData;
const build=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4307',checks=[],requests=[];
const check=(name,ok,detail)=>checks.push({name,ok:!!ok,...(detail===undefined?{}:{detail})});
async function get(path){if(!path.startsWith('/')||path.startsWith('//'))throw new Error('Nonlocal path');const r=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,method:'GET',status:r.status});check('GET '+path,r.status===200);return r.text();}
function schemas(doc){return doc.elements.filter(n=>n.tag==='script'&&n.attrs.type==='application/ld+json').flatMap(n=>{const x=JSON.parse(textContent(n));return Array.isArray(x)?x:x['@graph']||[x];});}
for(const path of ['/whatsapp-coexistence','/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026','/blog/whatsapp-cloud-api-complete-guide-2026','/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide']){
 const html=await get(path),doc=parseDocument(html),ss=schemas(doc);
 check('exact build '+path,JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 for(const text of [c.compatibilityQualification,c.migrationQualification,c.onboardingQualification])check('initial readable qualification '+path,doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===text));
 for(const row of c.compatibilityRows)check('initial scoped table '+path+' '+row.feature,doc.elements.some(e=>e.tag==='td'&&textContent(e).trim()===row.hybrid));
 check('named focusable table '+path,doc.elements.some(e=>e.attrs.role==='region'&&e.attrs.tabindex==='0'&&e.attrs['aria-labelledby']));
 check('old fixed hybrid/capacity claims absent '+path,!/\b(?:5|20) MPS|20 messages per second|5 messages\/second|80-100 MPS|6 months|2\.24\.17\+/.test(html));
 if(path.includes('restrictions')||path==='/whatsapp-coexistence'){
  const faq=ss.find(s=>s['@type']==='FAQPage');check('actual FAQ schema contract '+path,JSON.stringify(faq?.mainEntity?.map(q=>({question:q.name,answer:q.acceptedAnswer.text})))===JSON.stringify(c.compatibilityFAQs));
  for(const row of c.compatibilityFAQs)check('native initial FAQ '+path+' '+row.question,doc.elements.some(e=>e.tag==='summary'&&textContent(e).trim()===row.question)&&doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===row.answer));
 }
}
for(const slug of ['whatsapp-coexistence','blog-whatsapp-cloud-api-restrictions-coexistence-framework-2026']){
 const md=await get('/api/md/'+slug),mcp=JSON.parse(await get('/api/mcp/pages/'+slug));check('MD canonical compatibility '+slug,md.includes(c.compatibilityMarkdown));check('MCP canonical compatibility '+slug,mcp.sections.some(s=>s.content===c.compatibilityMarkdown));
}
const html=await get('/faq'),doc=parseDocument(html),faq=schemas(doc).find(s=>s['@type']==='FAQPage'),all=Object.values(f).flat();check('FAQ schema actual full inventory',JSON.stringify(faq?.mainEntity?.map(q=>({question:q.name,answer:q.acceptedAnswer.text})))===JSON.stringify(all));
for(const row of f['getting-started'])check('initial getting-started disclosure '+row.question,doc.elements.some(e=>e.tag==='summary'&&textContent(e).trim()===row.question));
check('noJS categories provided',html.includes('Other questions remain readable below.'));
for(const field of ['windowQualification','entryQualification'])check('dated window condition '+field,c[field].includes('24-hour')||c[field].includes('72-hour'));
for(const path of ['/blog/whatsapp-graph-api-v24-to-v25-transition-guide','/blog/whatsapp-username-system-2026-complete-guide']){
 const html=await get(path),doc=parseDocument(html);check('scaling consumer build '+path,JSON.stringify(buildIds(doc))===JSON.stringify([build]));check('initial scaling qualification '+path,doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===c.throughputQualification));check('fixed scaling forecast removed '+path,!/100K|100,000-message|80-500 msgs/.test(html));
}
for(const name of ['whatsapp-cloud-api-complete-guide-2026','whatsapp-web-6-hour-logout-unofficial-api-migration-guide','whatsapp-graph-api-v24-to-v25-transition-guide','whatsapp-username-system-2026-complete-guide']){
 const slug='blog-'+name,md=await get('/api/md/'+slug),mcp=JSON.parse(await get('/api/mcp/pages/'+slug)),scaling=name.includes('graph-api')||name.includes('username-system'),billingGuide=load('src/lib/blog/billing-guides.ts').billingGuides.find(g=>g.slug===name),text=billingGuide?load('src/lib/blog/erp-guides.ts').guideMarkdown(billingGuide):scaling?c.throughputQualification+'\n\n'+c.scalingQualification:c.compatibilityMarkdown;
 check('equivalent guide MD qualification '+name,md.includes(text));check('equivalent guide MCP qualification '+name,mcp.sections.some(s=>s.content===text));
}
const secondaryFAQs={};
for(const path of ['/solutions/marketing','/solutions/utility','/whatsapp-templates']){
 const html=await get(path),doc=parseDocument(html),faq=schemas(doc).find(s=>s['@type']==='FAQPage');
 check('secondary exact build '+path,JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 const rows=faq?.mainEntity?.map(q=>({question:q.name,answer:q.acceptedAnswer.text}))||[];
 check('secondary FAQ schema exists '+path,rows.length>0);secondaryFAQs[path]=rows;
 for(const row of rows){check('secondary initial native FAQ '+path+' '+row.question,doc.elements.some(e=>e.tag==='summary'&&textContent(e).trim()===row.question));check('secondary initial answer parity '+path+' '+row.question,doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===row.answer));}
 if(path.includes('marketing'))check('fixed marketing quota/upgrade/approval removed',!/2 marketing messages\/day|~2 per day|2\/day|7 consecutive days|every 6 hours|up to 48 hours|6-hour auto-upgrade|seconds to minutes|automatic 6-hour/.test(html.toLowerCase()));
 if(path.includes('utility'))check('fixed appeal deadline removed',!html.includes('You have 60 days to request'));
}
writeFileSync('docs/evidence/b21-2026-09-28/built-platform-consumers.json',JSON.stringify({buildId:build,checks,requests,faqInventory:f,compatibilityFAQs:c.compatibilityFAQs,secondaryFAQs,scope:'Actual initial HTML, schema and alternate-format contract; hydrated/no-JS visibility checked separately. No owner/account approval implied.'},null,2)+'\n');console.log(JSON.stringify({checks:checks.length,failures:checks.filter(c=>!c.ok)}));if(checks.some(c=>!c.ok))process.exitCode=1;
