import { readFileSync,writeFileSync } from 'node:fs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
import { parseDocument,buildIds,textContent } from './seo-validation/evidence.mjs';
const build=readFileSync('.next/BUILD_ID','utf8').trim(),base='http://127.0.0.1:4309',c=projectLoader()('src/lib/product-media.ts'),rows=[];
for(const [slug,path] of [['miracle-whatsapp-api','/solutions/miracle-whatsapp-api'],['chat-shortcuts-conversation-automation','/features/chat-shortcuts-conversation-automation']]){
 const checks=[],r=await fetch(base+path),html=await r.text(),doc=parseDocument(html),visible=textContent(doc.elements.find(e=>e.tag==='main'),true),schemas=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').map(e=>textContent(e)).join(' ');
 const ck=(name,ok)=>checks.push({name,ok});
 ck('HTML 200 exact build',r.status===200&&JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 for(const caption of [c.setupScope,c.sceneCaption,...(slug.startsWith('miracle')?[c.setupCaptureScope,c.profileCaption,c.formatCaption]:[])])ck('canonical condition/caption visible',visible.includes(caption));
 ck('no public incident/research/crawler filler',!/live token appeared|provided setup material|For AI search engines|Topical authority|search engines and AI answer/.test(visible));
 ck('unsupported fixed setup durations omitted from emitted schema',!/totalTime/.test(schemas));
 ck('canonical unchanged',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='canonical'&&e.attrs.href==='https://whats91.com'+path));
 if(slug.startsWith('miracle')){ck('safe placeholder retained',visible.includes('YOUR_WHATS91_API_TOKEN'));ck('technical anchors retained',['miracle-answer','how-to-implement','miracle-web-api-heading','miracle-connects-heading','web-vs-cloud-heading','industries-heading','api-workflow-heading'].every(id=>doc.elements.some(e=>e.attrs.id===id)));}
 const md=await(await fetch(base+'/api/md/'+slug)).text(),mcp=await(await fetch(base+'/api/mcp/pages/'+slug)).json();
 for(const v of [c.setupScope,c.sceneCaption,...(slug.startsWith('miracle')?[c.setupCaptureScope,c.profileCaption,c.formatCaption]:[])]){ck('MD condition/caption parity',md.includes(v));ck('MCP condition/caption parity',mcp.sections.some(s=>s.content.includes(v)));}
 ck('historical machine date preserved',mcp.updated_at==='2026-05-29');
 rows.push({path,checks,machineDate:mcp.updated_at});
}
const result={buildId:build,rows,boundary:'GET-only HTML and public website content twins; no product endpoint execution, no product availability or media permission inference.'};
writeFileSync('docs/evidence/b23-2026-09-28/built-media-contract.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({assertions:rows.flatMap(r=>r.checks).length,failures:rows.flatMap(r=>r.checks).filter(c=>!c.ok)}));if(rows.some(r=>r.checks.some(c=>!c.ok)))process.exitCode=1;
