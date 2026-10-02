import { readFileSync, writeFileSync } from 'node:fs';
import { parseDocument, buildIds, textContent } from './seo-validation/evidence.mjs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
const build=readFileSync('.next/BUILD_ID','utf8').trim(), base='http://127.0.0.1:4305',c=projectLoader()('src/lib/home-content.ts'),rows=[],requests=[];
async function get(path){const response=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,status:response.status,method:'GET'});return{response,html:await response.text()};}
function add(path,checks){rows.push({path,checks});}
const sitemap=(await get('/sitemap.xml')).html;
const paths=[...sitemap.matchAll(/<loc>https:\/\/whats91\.com([^<]*)<\/loc>/g)].map(m=>m[1]||'/');
for(const path of paths){
 const{response,html}=await get(path),doc=parseDocument(html),header=doc.elements.find(e=>e.tag==='header'),footer=doc.elements.find(e=>e.tag==='footer'),footText=footer?textContent(footer,true):'',checks=[];
 checks.push({name:'200 and candidate identity',ok:response.status===200&&JSON.stringify(buildIds(doc))===JSON.stringify([build])});
 checks.push({name:'shared footer support scope',ok:!!footer&&footText.includes('Confirm support channels and staffed hours in your written offer.')&&footText.includes('signed agreement')});
 checks.push({name:'initial shell demo is native enquiry link',ok:doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='/contact'&&textContent(e,true)==='Request a demo')});
 checks.push({name:'no guaranteed outcome in rendered header/footer',ok:!/(98%|500\+|24[×x/]7|99\.9|10-minute|Official Meta Business Solution Provider)/.test((header?textContent(header):'')+footText)});
 if(path==='/'||path==='/features'){
  const main=doc.elements.find(e=>e.tag==='main'),visible=textContent(main,true),faqs=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').map(e=>JSON.parse(textContent(e))).filter(v=>v['@type']==='FAQPage');
  checks.push({name:'offering and support scope visible',ok:visible.includes(c.offeringScope)&&visible.includes(c.supportScope)});
  checks.push({name:'no unsupported numeric or designation proof in text, alt, meta or schema',ok:!/(500\+|10M\+|98%|99\.9|24[×x/]7|45-60%|40-50%|95%|Official Meta Business Solution Provider)/.test(textContent(main)+doc.elements.filter(e=>e.tag==='meta'||e.attrs.alt||e.tag==='script'&&e.attrs.type==='application/ld+json').map(e=>e.attrs.content||e.attrs.alt||textContent(e)).join(' ' ))});
  checks.push({name:'native request action does not imply appointment or access',ok:visible.includes('not a scheduled appointment or account activation')||visible.includes('does not schedule an appointment or activate an account')});
  if(path==='/'){
   checks.push({name:'home workflow routing complete',ok:c.homeTasks.every(t=>doc.elements.some(e=>e.tag==='a'&&e.attrs.href===t.href&&textContent(e,true)===t.action))});
   checks.push({name:'home illustration scope is adjacent in six visible captions',ok:visible.split(c.illustrationScope).length-1===6});
   checks.push({name:'visible and FAQ schema answer parity',ok:faqs.length===1&&c.homeFaqs.every(f=>visible.includes(f.answer)&&faqs[0].mainEntity.some(q=>q.name===f.question&&q.acceptedAnswer.text===f.answer))});
  }else checks.push({name:'all feature routes and qualifications present',ok:c.featureRoutes.every(f=>visible.includes(f.description)&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href===f.href))});
 }
 add(path,checks);
}
for(const slug of ['home','features']){
 const md=await get('/api/md/'+slug),pass=await get('/api/mcp/pages/'+slug),data=JSON.parse(pass.html),expected=slug==='home'?c.homeMarkdown:c.featuresMarkdown;
 add('/api/md/'+slug,[{name:'actual built alternate representation parity',ok:md.response.status===200&&pass.response.status===200&&md.html.includes(expected)&&data.sections[0].content===expected},{name:'no invented public dates',ok:data.updated_at===undefined&&data.published_at===undefined&&!/publishedAt:|lastModified:/.test(md.html)},{name:'resource-only headers',ok:md.response.headers.get('x-robots-tag')==='noindex'&&pass.response.headers.get('allow')==='GET, HEAD, OPTIONS'}]);
}
const llms=await get('/llms.txt');add('/llms.txt',[{name:'current designation/results/certification guarantees omitted',ok:!/99\.9%|GDPR Compliant|ISO 27001 Certified Infrastructure|Meta Business Solution Provider|Data Localization: India/.test(llms.html)},{name:'home and feature exact equivalents discoverable',ok:llms.html.includes('/api/md/home')&&llms.html.includes('/api/md/features')}]);
const evidence={buildId:build,sitemapRoutes:paths.length,rows,requests,scope:'All sitemap HTML: initial native demo fallback and shell support contract; home/features visible/schema/meta qualification and illustrative scope, direct twins and llms. Local GET only, no product/account/certification approval.'};
writeFileSync('docs/evidence/b18-2026-09-28/built-home-contract.json',JSON.stringify(evidence,null,2)+'\n');const checks=rows.flatMap(r=>r.checks);console.log(JSON.stringify({rows:rows.length,assertions:checks.length,failures:rows.flatMap(r=>r.checks.filter(c=>!c.ok).map(c=>({path:r.path,...c})))}));if(checks.some(c=>!c.ok))process.exitCode=1;
