import { readFileSync,writeFileSync } from 'node:fs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
import { parseDocument,buildIds,textContent } from './seo-validation/evidence.mjs';
const load=projectLoader(),pricing=load('src/lib/pricing.ts');
const build=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4309',checks=[],requests=[];
function check(name,ok,detail){checks.push({name,ok:!!ok,...(detail===undefined?{}:{detail})});}
async function get(path){const r=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,method:'GET',status:r.status});check('GET '+path,r.status===200);return r.text();}
function schemas(doc){return doc.elements.filter(n=>n.tag==='script'&&n.attrs.type==='application/ld+json').flatMap(n=>{const d=JSON.parse(textContent(n));return Array.isArray(d)?d:d['@graph']||[d];});}
const groups=[{slug:'pricing',paths:['/pricing','/plans','/tools/whatsapp-api-cost-calculator','/blog/whatsapp-cloud-api-pricing-india-2026'],faqs:pricing.pricingFAQs,md:pricing.pricingMarkdown},{slug:'partners',paths:['/partners'],faqs:pricing.partnerFAQs,md:pricing.partnerMarkdown},{slug:'whats91-coins',paths:['/partners/whats91-coins'],faqs:pricing.coinsFAQs,md:pricing.coinsMarkdown}];
for(const g of groups){
 const md=await get('/api/md/'+g.slug),mcp=JSON.parse(await get('/api/mcp/pages/'+g.slug)),machine=mcp.sections.map(s=>s.content).join('\n');
 check('canonical MD '+g.slug,md.includes(g.md));check('canonical MCP '+g.slug,machine.includes(g.md));
 for(const f of g.faqs){check('MD FAQ '+g.slug+' '+f.question,md.includes(f.question)&&md.includes(f.answer));check('MCP FAQ '+g.slug+' '+f.question,machine.includes(f.question)&&machine.includes(f.answer));}
 for(const path of g.paths){const html=await get(path),doc=parseDocument(html),all=schemas(doc);check('build '+path,JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 const faq=all.find(s=>s['@type']==='FAQPage');check('FAQ schema '+path,JSON.stringify(faq?.mainEntity?.map(q=>({question:q.name,answer:q.acceptedAnswer.text})))===JSON.stringify(g.faqs));
 for(const f of g.faqs)check('server disclosure '+path+' '+f.question,doc.elements.some(e=>e.tag==='summary'&&textContent(e).trim()===f.question)&&doc.elements.some(e=>e.tag==='p'&&textContent(e).trim()===f.answer));
 check('current numeric rates withheld '+path,!/0\.8631|0\.115|₹0\.12|\$0\.00/.test(html));
 check('paid Offers absent '+path,path.startsWith('/tools/')||all.every(s=>!s.offers));
 }
}
const blogMD=await get('/api/md/blog-whatsapp-cloud-api-pricing-india-2026'),blogMCP=JSON.parse(await get('/api/mcp/pages/blog-whatsapp-cloud-api-pricing-india-2026'));
check('pricing pillar MD complete canonical content',blogMD.includes(load('src/lib/blog/erp-guides.ts').guideMarkdown(load('src/lib/blog/billing-guides.ts').indiaPricingGuide)));check('pricing pillar MCP canonical content',JSON.stringify(blogMCP).includes('Message estimates are unavailable'));
for(const plan of ['coexistence','standard'])for(const billing of ['annual','monthly']){
 const path=`/checkout?plan=${plan}&billing=${billing}`,html=await get(path),doc=parseDocument(html);
 check('checkout build '+plan+billing,JSON.stringify(buildIds(doc))===JSON.stringify([build]));check('noindex '+plan+billing,doc.elements.some(e=>e.tag==='meta'&&e.attrs.name==='robots'&&e.attrs.content.includes('noindex')&&e.attrs.content.includes('nofollow')));
 check('payment disabled '+plan+billing,doc.elements.some(e=>e.tag==='button'&&'disabled' in e.attrs&&textContent(e).includes('Payment unavailable')));check('quote withheld '+plan+billing,!html.includes("₹")&&schemas(doc).every(s=>!s.offers));
}
const invalid=await get('/checkout?plan=unknown&billing=3years');check('invalid query native fallback',invalid.includes('No usable plan or billing selection was provided.'));
const capabilities=await get('/api/mcp');check('MCP discovery withholds numeric prices',capabilities.includes('current numerical rates are unavailable')&&capabilities.includes('current numeric quotes unavailable'));
const discovery=await get('/llms.txt');check('discovery withholds quotes',discovery.includes('current monetary estimates unavailable')&&!discovery.includes('Public Partner and Tech Partner plan and add-on pricing'));
const doc=parseDocument(await get('/pricing'));for(const id of ['marketing','utility','volume','calculator'])check('public pricing anchor '+id,doc.elements.some(e=>e.attrs.id===id));
writeFileSync('docs/evidence/b23-2026-09-28/built-pricing-consumers.json',JSON.stringify({buildId:build,checks,requests,scope:'Canonical changed FAQs/qualifications and absent monetary quotes in actual initial HTML, schema, MD/MCP; four checkout query variants and invalid fallback. Current numerical rates/terms are unapproved; no payment or external fetch.'},null,2)+'\n');
console.log(JSON.stringify({checks:checks.length,failures:checks.filter(c=>!c.ok),requests:requests.length}));if(checks.some(c=>!c.ok))process.exitCode=1;
