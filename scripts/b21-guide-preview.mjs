import {readFileSync,writeFileSync} from 'node:fs';
import {parseDocument,textContent,buildIds} from './seo-validation/evidence.mjs';
import {projectLoader} from '../tests/helpers/load-project-module.mjs';
const {erpGuides,guideMarkdown}=projectLoader()('src/lib/blog/erp-guides.ts');
const {getPostBySlug}=projectLoader()('src/lib/blog/registry.ts');
const {contentDates}=projectLoader()('src/lib/content/dates.ts');
const base='http://127.0.0.1:4307',build=readFileSync('.next/BUILD_ID','utf8').trim(),rows=[],requests=[],payload=[];
async function get(path){const response=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});const html=await response.text();requests.push({path,method:'GET',status:response.status});return {response,html};}
for(const guide of erpGuides){
 const path='/blog/'+guide.slug,{response,html}=await get(path),doc=parseDocument(html),main=doc.elements.find(e=>e.tag==='main'),text=textContent(main),checks=[],add=(name,ok)=>checks.push({name,ok});
 const schema=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').map(e=>JSON.parse(textContent(e))).find(g=>g['@type']==='FAQPage');
 const metas=doc.elements.filter(e=>e.tag==='meta');
 add('200 and current build identity',response.status===200&&JSON.stringify(buildIds(doc))===JSON.stringify([build]));
 add('one h1, semantic server article and complete body',doc.elements.filter(e=>e.tag==='h1').length===1&&doc.elements.some(e=>e.tag==='article'&&e.attrs['data-erp-guide']===guide.slug)&&text.includes(guide.intro)&&guide.sections.every(s=>s.paragraphs.every(p=>text.includes(p))));
 add('exactly one canonical description and matching social descriptions',metas.filter(m=>m.attrs.name==='description').length===1&&metas.find(m=>m.attrs.name==='description')?.attrs.content===guide.description&&['og:description','twitter:description'].every(n=>metas.some(m=>(m.attrs.property===n||m.attrs.name===n)&&m.attrs.content===guide.description)));
 add('canonical route preserved',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='canonical'&&e.attrs.href==='https://whats91.com'+path));
 add('native disclosure and FAQ schema/body parity',doc.elements.filter(e=>e.tag==='details').length===guide.faqs.length&&schema.mainEntity.length===guide.faqs.length&&guide.faqs.every(f=>text.includes(f.answer)&&schema.mainEntity.some(q=>q.name===f.question&&q.acceptedAnswer.text===f.answer)));
 add('anchors match each section and ordinary contents links',guide.sections.every(s=>doc.elements.some(e=>e.attrs.id===s.id)&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='#'+s.id)));
 add('tables/code have labelled keyboard overflow regions',doc.elements.filter(e=>e.tag==='table').length===guide.sections.filter(s=>s.table).length&&doc.elements.filter(e=>e.tag==='caption').length===guide.sections.filter(s=>s.table).length&&doc.elements.filter(e=>e.attrs.role==='region'&&e.attrs.tabindex==='0').length===guide.sections.filter(s=>s.table||s.code).length);
 add('native sharing with canonical public URL',doc.elements.some(e=>e.tag==='a'&&e.attrs.href.startsWith('https://twitter.com/intent/tweet?'))&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href.startsWith('https://www.linkedin.com/sharing/share-offsite/?'))&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='https://whats91.com'+path));
 add('pending local attribution with no Person/avatar provider',text.includes('Attribution pending')&&doc.elements.some(e=>e.attrs['data-avatar-fallback']==='local-initials')&&!html.includes('ui-avatars.com')&&!metas.some(e=>e.attrs.name==='author')&&!JSON.stringify(schema).includes('Person'));
 add('no whole article opacity-zero or Framer boundary',!html.includes('opacity:0')&&!html.includes('whileInView'));
 const md=await get('/api/md/blog-'+guide.slug),mcp=await get('/api/mcp/pages/blog-'+guide.slug),data=JSON.parse(mcp.html),expected=guideMarkdown(guide),post=getPostBySlug(guide.slug);
 add('complete canonical MD/MCP parity',md.response.status===200&&mcp.response.status===200&&md.html.includes(expected)&&data.sections.some(s=>s.content===expected)&&data.title===guide.title&&data.description===guide.description);
 add('history and attribution not advanced in twins',md.html.includes('publishedAt: '+post.publishedAt)&&data.published_at===contentDates(post).published&&!data.updated_at&&!md.html.includes('lastModified:')&&!data.author);
 add('retired claims absent from own article and twins',!/(Sharma Distributors|ROI:|50% reduction|100% automated|₹8,000-12,000|CURRENT_DATE\(\)|every 10-15 minutes)/.test(text+expected+JSON.stringify(schema)+JSON.stringify(metas.map(m=>m.attrs))));
 for(const link of [...new Set(guide.sections.flatMap(s=>(s.links||[]).map(l=>l.href)).filter(h=>h.startsWith('/')))]){const t=await get(link.split('#')[0]);add('ordinary local destination '+link,t.response.status===200);}
 const js=[];for(const p of [...new Set(doc.elements.filter(e=>e.tag==='script'&&e.attrs.src?.startsWith('/_next/static/')).map(e=>e.attrs.src))]){const r=await fetch(base+p);js.push({path:p,status:r.status,bytes:(await r.arrayBuffer()).byteLength});}
 payload.push({slug:guide.slug,htmlBytes:Buffer.byteLength(html),js,jsBytes:js.reduce((n,x)=>n+x.bytes,0)});rows.push({path,checks,sections:guide.sections.length,faqs:guide.faqs.length});
}
const d='docs/evidence/b21-2026-09-28/';writeFileSync(d+'built-guide-contract.json',JSON.stringify({buildId:build,rows,requests,scope:'Current loopback GET-only built HTML/metadata/schema/twins/link/payload checks; no live import or provider execution'},null,2)+'\n');writeFileSync(d+'payload-guides-after.json',JSON.stringify({buildId:build,rows:payload,scope:'Decoded GET and initial script reference bytes only; B29 matched profile pending'},null,2)+'\n');const checks=rows.flatMap(r=>r.checks);console.log(JSON.stringify({buildId:build,rows:rows.length,assertions:checks.length,failures:rows.flatMap(r=>r.checks.filter(c=>!c.ok).map(c=>({path:r.path,...c})))}));if(checks.some(c=>!c.ok))process.exitCode=1;
