import {readFileSync,writeFileSync} from 'node:fs';
import {projectLoader} from '../tests/helpers/load-project-module.mjs';
import {parseDocument,buildIds,textContent} from './seo-validation/evidence.mjs';
const load=projectLoader(),tools=load('src/lib/tool-catalogue.ts'),buildId=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4311',checks=[],requests=[];
const add=(name,ok)=>checks.push({name,ok:!!ok});
async function get(path){const r=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,method:'GET',status:r.status});add('GET '+path,r.status===200);return r.text();}
for(const path of ['/tools',...tools.localTools.map(x=>x.href),'/pricing','/plans','/partners','/partners/whats91-coins','/checkout']){
 const html=await get(path),doc=parseDocument(html);add('current build '+path,JSON.stringify(buildIds(doc))===JSON.stringify([buildId]));add('no invented formats or privacy promises '+path,!/PNG or SVG|vCards|70-90%|never leaves your browser|never stored on our servers/.test(html));
 if(path.includes('roi-calculator')){add('server method and JS explanation',html.includes('What happens at zero qualification?')&&html.includes('requires JavaScript'));const faq=doc.elements.filter(x=>x.tag==='script'&&x.attrs.type==='application/ld+json').flatMap(x=>{const v=JSON.parse(textContent(x));return Array.isArray(v)?v:[v]}).find(x=>x['@type']==='FAQPage');add('visible scenario questions match schema',faq.mainEntity.every(q=>doc.elements.some(e=>e.tag==='summary'&&textContent(e)===q.name)&&html.includes(q.acceptedAnswer.text)));}
}
const md=await get('/api/md/tools'),mcp=JSON.parse(await get('/api/mcp/pages/tools'));
add('MD canonical tool inventory/privacy',md.includes(tools.localToolsMarkdown));add('MCP exactly four tools and privacy',mcp.sections.length===5&&mcp.sections.at(-1).content.includes(tools.localToolPrivacy));
for(const t of tools.localTools){add('MCP canonical description '+t.title,mcp.sections.some(s=>s.heading===t.title&&s.content.includes(t.description)));add('MD tool route '+t.href,md.includes(t.href));}
add('no eight-tool or universal transfer claim',!JSON.stringify(mcp).includes('8 free tools')&&!JSON.stringify(mcp).includes('No data is sent to servers'));
for(const query of ['?plan=&billing=','?plan=nope&billing=0','?plan=NaN&billing=Infinity','?plan=standard&plan=unknown&billing=monthly&billing=unknown']){const html=await get('/checkout'+query);add('disabled/withheld checkout '+query,html.includes('Payment unavailable')&&html.includes('Total payable')&&html.includes('Unavailable')&&!html.includes('₹'));if(!query.includes('plan=standard'))add('explicit invalid selection fallback '+query,html.includes('No usable plan or billing selection was provided.'));}
writeFileSync('docs/evidence/b25-2026-09-28/built-tools-contract.json',JSON.stringify({buildId,checks,requests,scope:'Actual current build HTML, tool schema, MD/MCP inventory/privacy and four malformed/empty/repeated checkout query cases. No external action or submission.'},null,2)+'\n');console.log(JSON.stringify({buildId,checks:checks.length,failed:checks.filter(x=>!x.ok)}));if(checks.some(x=>!x.ok))process.exitCode=1;
