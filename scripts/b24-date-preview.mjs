import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync } from "node:fs";
import { projectLoader } from "../tests/helpers/load-project-module.mjs";
import { parseDocument, buildIds, textContent } from "./seo-validation/evidence.mjs";
const load=projectLoader();
const {getAllPosts}=load('src/lib/blog/registry.ts');
const {contentDates,contentDate}=load('src/lib/content/dates.ts');
const base='http://127.0.0.1:4310';const build=readFileSync('.next/BUILD_ID','utf8').trim();const checks=[];const requests=[];
function check(name,ok){checks.push({name,ok});if(!ok)throw new Error(name);}
async function get(path,method='GET'){
  if(!path.startsWith('/')||path.startsWith('//'))throw new Error('Nonlocal path');
  const response=await fetch(base+path,{method,redirect:'error',signal:AbortSignal.timeout(10000)});
  const text=await response.text();requests.push({path,method,status:response.status});return {response,text};
}
const sitemap=(await get('/sitemap.xml')).text;const feed=(await get('/feed.xml')).text;
// Use an XML parser: the bounded HTML validator intentionally has HTML void
// elements and cannot parse RSS link/CDATA semantics.
const xml = JSON.parse(execFileSync('python3', ['-c', `import json,sys,xml.etree.ElementTree as E
x=json.load(sys.stdin);s=E.fromstring(x['sitemap']);f=E.fromstring(x['feed']);ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
print(json.dumps({'urls':[{'loc':n.findtext('s:loc',namespaces=ns),'lastmod':n.findtext('s:lastmod',namespaces=ns)} for n in s.findall('s:url',ns)],'items':[{'link':n.findtext('link'),'pubDate':n.findtext('pubDate')} for n in f.findall('channel/item')]}))`], {input:JSON.stringify({sitemap,feed}),encoding:'utf8'}));
check('sitemap has no profile joinedAt lastmod',xml.urls.filter(row=>row.loc.includes('/authors/')).every(row=>!row.lastmod));
const feedItems=xml.items;check('feed matches published registry count',feedItems.length===getAllPosts().length);
for(const post of getAllPosts()){
  const dates=contentDates(post);const html=(await get('/blog/'+post.slug)).text;const doc=parseDocument(html);
  check('build '+post.slug,JSON.stringify(buildIds(doc))===JSON.stringify([build]));
  const meta=(property)=>doc.elements.filter(node=>node.tag==='meta'&&node.attrs.property===property).map(node=>node.attrs.content);
  check('OG publication '+post.slug,meta('article:published_time').length===1&&contentDate(meta('article:published_time')[0])===dates.published);
  check('OG modification '+post.slug,dates.modified?meta('article:modified_time').length===1&&contentDate(meta('article:modified_time')[0])===dates.modified:meta('article:modified_time').length===0);
  const md=(await get('/api/md/blog-'+post.slug)).text;const mcp=JSON.parse((await get('/api/mcp/pages/blog-'+post.slug)).text);
  check('MD publication '+post.slug,md.includes('publishedAt: '+dates.published));check('MD modification '+post.slug,dates.modified?md.includes('lastModified: '+dates.modified):!md.includes('lastModified:'));
  check('MCP date mapping '+post.slug,mcp.published_at===dates.published&&mcp.updated_at===dates.modified);
  const url=xml.urls.find(row=>row.loc.endsWith('/blog/'+post.slug));
  check('sitemap content date or explicit evidence hold '+post.slug,post.indexHold?url===undefined:!!url&&contentDate(url.lastmod)===dates.lastModified);
  const item=feedItems.find(row=>row.link.endsWith('/blog/'+post.slug));
  check('RSS publication '+post.slug,item.pubDate===dates.feedPublished);
  const articles=doc.elements.filter(node=>node.tag==='script'&&node.attrs.type==='application/ld+json').flatMap(node=>{const data=JSON.parse(textContent(node));return Array.isArray(data)?data:data['@graph']||[data];}).filter(schema=>schema['@type']==='Article'||schema['@type']==='BlogPosting');
  for(const article of articles){check('schema publication '+post.slug,!article.datePublished||contentDate(article.datePublished)===dates.published);check('schema modification '+post.slug,dates.modified?contentDate(article.dateModified)===dates.modified:!article.dateModified);}
}
for(const slug of ['busy-erp','miracle-whatsapp-api','chat-shortcuts-conversation-automation','whatsapp-templates','whatsapp-coexistence','tools','pricing','partners','whats91-coins','google-sheets-integration','chatbot-flows']){
  const md=(await get('/api/md/'+slug)).text;check('static MD no request time '+slug,!md.includes('lastModified:'));
}
const baseline=JSON.parse((await import('node:fs')).readFileSync('docs/evidence/b09-2026-09-28/safe-routes.json','utf8'));
const safe=[];
for(const row of baseline.rows){const {response}=await get(row.path,row.method);const pass=response.status===row.expected;safe.push({path:row.path,method:row.method,status:response.status,expected:row.expected,pass});check('safe route '+row.method+' '+row.path,pass);}
writeFileSync('docs/evidence/b24-2026-09-28/built-date-consumers.json',JSON.stringify({buildId:build,checks,requests,scope:'All ten declared published blog records: actual OG/MD/MCP/sitemap/RSS, available Article schemas only; eleven static MD omissions. Existing fixed date labels remain source-declared, not verified publication evidence. Local GET/HEAD/OPTIONS only; no POST or provider call.'},null,2)+'\n');
writeFileSync('docs/evidence/b24-2026-09-28/safe-routes.json',JSON.stringify({buildId:build,rows:safe},null,2)+'\n');
process.stdout.write(`${checks.length} date/safe-route assertions passed; ${requests.length} local requests\n`);
