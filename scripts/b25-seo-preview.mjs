import fs from 'node:fs';
import crypto from 'node:crypto';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
import { parseDocument, textContent, buildIds, inventory, metadata } from './seo-validation/evidence.mjs';

const base = process.env.B25_PREVIEW || 'http://127.0.0.1:4311';
const phase = process.env.B25_PHASE || 'final';
const dir = `docs/evidence/b25-2026-09-28/${phase}`;
fs.mkdirSync(`${dir}/html`, { recursive: true });
const expectedBuild = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
const origin = 'https://whats91.com';
const load=projectLoader(),posts=load('src/lib/blog/registry.ts').getAllPosts(),contentDates=load('src/lib/content/dates.ts').contentDates;
const normalize = s => s.replace(/\s+/g, ' ').trim();
const audit = fs.readFileSync('docs/WEBSITE_QUALITY_AND_HUMAN_FIRST_PHASE_1_AUDIT_2026-09-28.md', 'utf8');
const historical = [...new Set([...audit.split('### 3.2 Route ledger')[1].split('Dynamic author records')[0].matchAll(/^\| (\/\S*?) \| \[src\/app\/[^\]]*(?:page|route)\.tsx?\]/gm)].map(m => m[1]).filter(p => !p.startsWith('/api/') && !p.includes('[')))];
const appPaths = JSON.parse(fs.readFileSync('.next/server/app-paths-manifest.json', 'utf8'));
const concrete = Object.keys(appPaths).filter(p => p.endsWith('/page') && !p.startsWith('/_') && !p.includes('[')).map(p => p === '/page' ? '/' : p.slice(0, -5));
const authorSource = fs.readFileSync('src/lib/blog/author-links.ts', 'utf8');
const authorRoutes = [...authorSource.matchAll(/"slug": "([^"]+)"/g)].map(m => `/authors/${m[1]}`);
historical.push(...authorRoutes);
const routes = [...new Set([...historical, ...concrete, ...authorRoutes])].sort();
const stateRoutes = ['/b25-unknown-page','/authors/b25-unknown-author','/blog/b25-unknown-article','/careers/b25-unknown-job','/checkout?plan=not-a-plan&billing=bad','/checkout?plan=standard&billing=monthly','/blog?tag=API','/contact?subject=Whats91%20MCP%20Access','/tools/qr-code-generator?text=https%3A%2F%2Fexample.invalid','/tools/whatsapp-link-generator?phone=919000000000&message=Local%20fixture'];
const holds = new Set(['/checkout','/design-system','/legal/dpa','/trust/subprocessors','/authors',...authorRoutes,'/careers','/blog/whatsapp-graph-api-v24-to-v25-transition-guide','/blog/whatsapp-web-6-hour-logout-rule-india-2026']);
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemapBody = await sitemapResponse.text();
fs.writeFileSync(`${dir}/sitemap.xml`, sitemapBody);
const sitemap = inventory(sitemapBody);
const sitemapPaths = sitemap.map(u => new URL(u).pathname);
const rows = [], checks = [], cache = new Map(), images = new Map();
function check(name, target, ok, detail) { checks.push({ name, target, ok: !!ok, detail }); }
async function read(route) {
  if (cache.has(route)) return cache.get(route);
  const res = await fetch(base + route, { redirect: 'manual' });
  const body = await res.text();
  const doc = parseDocument(body);
  const data = { status: res.status, headers: Object.fromEntries(res.headers), body, doc };
  cache.set(route, data); return data;
}
function walk(value, fn) { if (Array.isArray(value)) value.forEach(v => walk(v, fn)); else if (value && typeof value === 'object') { fn(value); Object.values(value).forEach(v => walk(v, fn)); } }
for (const route of [...routes, ...stateRoutes]) {
  const {status,headers,body,doc} = await read(route);
  const pathname = new URL(origin + route).pathname;
  const isUnknown = route.includes('b25-unknown');
  const expectedStatus = isUnknown ? 404 : 200;
  const file = `${dir}/html/${route === '/' ? 'home' : encodeURIComponent(route)}.html`;
  fs.writeFileSync(file, body);
  check('http-status',route,status === expectedStatus,{status,expectedStatus});
  check('build-id',route,JSON.stringify(buildIds(doc)) === JSON.stringify([expectedBuild]),buildIds(doc));
  check('html-parse',route,!doc.errors.length,doc.errors);
  const get = (attr,key) => doc.elements.filter(n => n.tag === 'meta' && n.attrs[attr] === key).map(n => n.attrs.content);
  const canonicals = doc.elements.filter(n => n.tag==='link' && n.attrs.rel==='canonical').map(n => n.attrs.href);
  const robots = [...get('name','robots'),...get('name','googlebot'),headers['x-robots-tag'] || ''];
  const h1 = doc.elements.filter(n => n.tag === 'h1').map(n => normalize(textContent(n,true)));
  const mains = doc.elements.filter(n => n.tag === 'main');
  if (!isUnknown) {
    for (const m of metadata(doc, origin + pathname)) check(m.check,route,m.status==='pass',m.detail);
    check('main-landmark',route,mains.length===1,mains.length);
    check('index-intent',route,robots.join(',').includes('noindex') === holds.has(pathname),{robots,held:holds.has(pathname)});
    check('sitemap-disposition',route,sitemapPaths.includes(pathname) === !holds.has(pathname),{included:sitemapPaths.includes(pathname),held:holds.has(pathname)});
    for (const k of ['og:title','og:description','og:url','og:type','og:image']) check('social-'+k,route,get('property',k).length===1 && !!get('property',k)[0],get('property',k));
    for (const k of ['twitter:title','twitter:description','twitter:image']) check('social-'+k,route,get('name',k).length===1 && !!get('name',k)[0],get('name',k));
    check('social-url',route,get('property','og:url')[0] === origin + pathname || pathname === '/' && get('property','og:url')[0] === origin,get('property','og:url'));
    if(pathname !== '/features/chat-shortcuts-conversation-automation') check('social-title-parity',route,get('property','og:title')[0]===get('name','twitter:title')[0],{og:get('property','og:title'),twitter:get('name','twitter:title')});
    else check('custom-social-topic',route,[...get('property','og:title'),...get('name','twitter:title')].every(s=>/Shortcuts/.test(s)),'Existing topic-specific social summaries retained');
    check('no-hreflang',route,!doc.elements.some(n=>n.tag==='link' && n.attrs.hreflang), 'No translated page family exists');
    const skip = doc.elements.find(n=>n.tag==='a' && n.attrs.href==='#main-content');
    if (skip) check('native-skip-target',route,mains.some(n=>n.attrs.id==='main-content' && n.attrs.tabindex==='-1'),'Native focusable main');
  } else check('error-noindex',route,robots.join(',').includes('noindex'),robots);
  const schemas = []; let schemaErrors=[];
  for (const s of doc.elements.filter(n=>n.tag==='script' && n.attrs.type==='application/ld+json')) {
    try { schemas.push(JSON.parse(s.children.map(c=>c.text||'').join(''))); } catch(e) {schemaErrors.push(e.message);}
  }
  check('schema-json',route,!schemaErrors.length && (isUnknown || schemas.length>0),schemaErrors);
  const nodes=[]; schemas.forEach(s=>walk(s,n=>nodes.push(n)));
  const definitions=nodes.filter(n=>n['@id'] && n['@type']);
  const refs=nodes.filter(n=>n['@id'] && !n['@type'] && Object.keys(n).length===1).map(n=>n['@id']);
  check('entity-id-resolution',route,refs.every(id=>definitions.some(n=>n['@id']===id)),{definitions:definitions.map(n=>n['@id']),unresolved:refs.filter(id=>!definitions.some(n=>n['@id']===id))});
  const orgs=nodes.filter(n=>n['@type']==='Organization' && n['@id']==='https://whats91.com/#organization');
  if(schemas.length) check('global-website-brand-scope',route,orgs.length===1 && nodes.filter(n=>n['@type']==='WebSite').length===1 && !nodes.some(n=>['OfferCatalog','DataFeed','DefinedTermSet'].includes(n['@type'])),{brandDefinitions:orgs.length,websiteDefinitions:nodes.filter(n=>n['@type']==='WebSite').length});
  if(pathname.startsWith('/blog/') && !isUnknown) {
    const articles=nodes.filter(n=>n['@type']==='Article');
    check('single-page-article',route,articles.length===1,articles.length);
    check('article-visible-headline',route,articles.length===1 && h1[0]===normalize(articles[0].headline||''),articles.map(n=>n.headline));
    check('article-url-identity',route,articles.length===1 && articles[0]['@id']===origin+pathname+'#article' && articles[0].url===origin+pathname,articles.map(n=>n['@id']));
    check('article-date-visible',route,articles.every(n=>!n.datePublished || doc.elements.some(e=>e.tag==='time' && e.attrs.datetime===n.datePublished)),articles.map(n=>n.datePublished));
    check('article-no-modification-invention',route,articles.every(n=>n.dateModified===contentDates(posts.find(p=>origin+'/blog/'+p.slug===origin+pathname)).modified),articles.map(n=>n.dateModified));
  }
  const breadcrumbs=nodes.filter(n=>n['@type']==='BreadcrumbList');
  check('single-route-breadcrumb',route,breadcrumbs.length<=1,breadcrumbs.length);
  check('no-unsupported-people-jobs',route,!nodes.some(n=>['Person','JobPosting','AggregateRating','Review'].includes(n['@type'])),'All owner facts remain pending');
  check('no-paid-free-offer',route,pathname.startsWith('/tools/') || !nodes.some(n=>n['@type']==='Offer' && Number(n.price)===0),'Only explicit free utility access can carry zero');
  check('no-invented-schema-facts',route,!nodes.some(n=>n.wordCount!==undefined || n.softwareVersion!==undefined || n.priceValidUntil!==undefined || n.foundingDate!==undefined),'No inferred count, version, expiry or founding date');
  check('blog-hub-scope',route,!pathname.startsWith('/blog/') || !nodes.some(n=>n['@type']==='Blog'),'Hub entity belongs only to /blog');
  const faqs=nodes.filter(n=>n['@type']==='Question').map(n=>({question:n.name,answer:n.acceptedAnswer?.text}));
  const bodyText=normalize(textContent(doc.root,false));
  // Actual nodes only: scripts and head excluded, closed disclosure descendants retained.
  const readerText=normalize(doc.elements.filter(n=>n.tag==='main').map(n=>{
    const clone = node => node.text!==undefined ? node : ['script','style','template'].includes(node.tag) ? {text:''} : {tag:node.tag,attrs:{},children:node.children.map(clone)};
    return textContent(clone(n));
  }).join(' '));
  for(const faq of faqs) check('faq-readable-dom-support',route,readerText.includes(normalize(faq.question||'')) && readerText.includes(normalize(faq.answer||'')),faq);
  const anchors=doc.elements.filter(n=>n.tag==='a' && n.attrs.href).map(n=>({href:n.attrs.href,text:normalize(textContent(n,true)) || n.attrs['aria-label'] || n.children.filter(c=>c.tag==='img').map(c=>c.attrs.alt||'').join(' ')}));
  for(const a of anchors) {
    let u; try {u=new URL(a.href,origin+route);} catch {check('valid-link',route,false,a);continue;}
    if(u.origin!==origin)continue;
    check('meaningful-internal-link',route,!!a.text,a);
    if(u.pathname.startsWith('/api/') || /\.(png|svg|json|txt|xml)$/.test(u.pathname))continue;
    const target = u.pathname+u.search;
    const dest = target === route ? {doc,status} : await read(target);
    check('internal-link-status',route,dest.status===200,{...a,status:dest.status});
    if(u.hash)check('fragment-target',route,dest.doc.elements.some(n=>n.attrs.id===decodeURIComponent(u.hash.slice(1))),a);
  }
  for (const url of [...get('property','og:image'),...get('name','twitter:image')]) {
    let u;try{u=new URL(url,origin);}catch{check('social-image-url',route,false,url);continue;}
    if(u.origin!==origin){check('social-image-local',route,false,url);continue;}
    if(!images.has(u.pathname)){
      const res=await fetch(base+u.pathname);const bytes=Buffer.from(await res.arrayBuffer());
      const dimensions=bytes.subarray(1,4).toString()==='PNG'?{width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}:null;
      images.set(u.pathname,{status:res.status,type:res.headers.get('content-type'),bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),dimensions});
    }
    check('social-image-fetch',route,images.get(u.pathname).status===200 && images.get(u.pathname).type?.startsWith('image/'),images.get(u.pathname));
    check('social-image-dimensions',route,images.get(u.pathname).dimensions?.width===1200 && images.get(u.pathname).dimensions?.height===630,images.get(u.pathname).dimensions);
  }
  rows.push({route,status,canonical:canonicals,h1,robots,held:holds.has(pathname),historical:historical.includes(pathname),sitemap:sitemapPaths.includes(pathname),shell:anchors.some(a=>a.href==='#main-content'),schemas,faqCount:faqs.length,links:anchors,readerTextSha256:crypto.createHash('sha256').update(readerText).digest('hex'),readerTextLength:readerText.length,htmlFile:file,htmlSha256:crypto.createHash('sha256').update(body).digest('hex'),bodyTextLength:bodyText.length});
}
check('sitemap-current-inventory','sitemap',sitemapPaths.every(p=>routes.includes(p) && !holds.has(p)),sitemapPaths);
check('sitemap-no-invented-static-lastmod','sitemap',parseDocument(sitemapBody).elements.filter(n=>n.tag==='url').every(n=>!n.children.some(c=>c.tag==='lastmod') || textContent(n).includes('/blog/')),'Only date-supported articles carry lastmod');
const result={buildId:expectedBuild,base,phase,historicalRoutes:historical,currentRoutes:routes,stateRoutes,sitemapPaths,counts:{historical:historical.length,current:routes.length,states:stateRoutes.length,sitemap:sitemap.length,holds:[...holds].length},rows,images:Object.fromEntries(images),checks,failures:checks.filter(c=>!c.ok)};
fs.writeFileSync(`${dir}/crawl.json`,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({buildId:expectedBuild,counts:result.counts,checks:checks.length,failed:result.failures.length,failures:result.failures.slice(0,35)}));
process.exitCode=phase==='before'?0:result.failures.length?1:0;
