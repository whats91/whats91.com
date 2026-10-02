import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseDocument, buildIds, textContent } from './seo-validation/evidence.mjs';
import { projectLoader } from '../tests/helpers/load-project-module.mjs';
const load=projectLoader(),{authors}=load('src/lib/blog/authors.ts'),{getAllPosts}=load('src/lib/blog/registry.ts');
const base='http://127.0.0.1:4309',buildId=readFileSync('.next/BUILD_ID','utf8').trim(),rows=[],requests=[],scripts=new Set();
const get=async path=>{if(!path.startsWith('/')||path.startsWith('//'))throw Error('External fetch refused');const r=await fetch(base+path,{redirect:'error'});const body=await r.text();requests.push({path,method:'GET',status:r.status,decodedBytes:Buffer.byteLength(body)});return {r,body};};
const xml=(await get('/sitemap.xml')).body;
const paths=['/about','/contact','/careers','/authors',...authors.map(a=>'/authors/'+a.slug),'/blog',...getAllPosts().map(p=>'/blog/'+p.slug)];
const names=[...authors.map(a=>a.name),'Rahul Sharma','Priya Patel','Amit Kumar','Sneha Gupta'];
const flatten=value=>Array.isArray(value)?value.flatMap(flatten):value&&typeof value==='object'?[value,...Object.values(value).flatMap(flatten)]:[];
for(const path of paths){const {r,body}=await get(path),doc=parseDocument(body),main=doc.elements.find(e=>e.tag==='main'),visible=textContent(main,true),checks=[],add=(name,ok)=>checks.push({name,ok});
 add('success on exact built candidate',r.status===200&&JSON.stringify(buildIds(doc))===JSON.stringify([buildId]));
 add('one main and primary heading',doc.elements.filter(e=>e.tag==='main').length===1&&doc.elements.filter(e=>e.tag==='h1').length===1);
 add('no unapproved personal strings or avatar service in served payload',!names.some(name=>body.includes(name))&&!body.includes('ui-avatars.com'));
 const graph=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').flatMap(e=>flatten(JSON.parse(textContent(e))));
 add('no Person relation inferred',!graph.some(x=>x['@type']==='Person'));
 add('no automatic byline metadata',!doc.elements.some(e=>e.tag==='meta'&&['author','creator'].includes(e.attrs.name)||e.tag==='meta'&&e.attrs.property==='article:author'));
 add('canonical preserved',doc.elements.some(e=>e.tag==='link'&&e.attrs.rel==='canonical'&&e.attrs.href==='https://whats91.com'+path));
 if(path.startsWith('/authors')||path==='/careers'){
  add('deliberate temporary noindex and sitemap exclusion',doc.elements.some(e=>e.tag==='meta'&&e.attrs.name==='robots'&&e.attrs.content.includes('noindex')&&e.attrs.content.includes('follow'))&&!xml.includes('<loc>https://whats91.com'+path+'</loc>'));
 }
 if(path.startsWith('/authors')){
  add('profile content held with useful routing',visible.includes('reviewed')&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='/blog'));
  add('no portrait, joined or personal social claim',!visible.includes('Joined ')&&!doc.elements.some(e=>e.tag==='img'&&e.attrs.src?.includes('/authors/')));
 }
 if(path==='/careers'){
  add('all six preserved role anchors',Array.from({length:6},(_,i)=>'role-'+(i+1)).every(id=>doc.elements.some(e=>e.attrs.id===id)));
  add('no fabricated job terms/dates/benefits',!['days ago','Glassdoor','Unlimited PTO','Apply Now','Mumbai / Remote','Full-time','market-leading'].some(x=>visible.includes(x)));
  add('availability enquiry rather than application',visible.includes('Current openings have not been confirmed')&&body.includes('mailto:careers@whats91.com')&&!body.includes('Application%20for'));
 }
 if(path==='/about')add('unsupported history/leadership/office claims held',!['500+','10M+','Mumbai','15+ years','Founded','2020','highest standards'].some(x=>visible.includes(x)));
 if(path==='/contact')add('contact promise and operator scope held',!['within 24 hours','500+','9am','headquarters','9:00 AM'].some(x=>visible.includes(x))&&visible.includes('currently listed'));
 if(path.startsWith('/blog/'))add('withheld byline has profile navigation',visible.includes('Attribution pending')&&doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='/authors/devendar-singh-gohil'));
 for(const m of doc.elements.filter(e=>e.tag==='meta'&&['og:image','twitter:image'].includes(e.attrs.property||e.attrs.name))){const u=new URL(m.attrs.content,'https://whats91.com');add('generic social image path',u.origin==='https://whats91.com'&&u.pathname==='/og-image.png');const image=await get(u.pathname);add('social image resolves',image.r.status===200&&image.r.headers.get('content-type')?.includes('image/png'));}
 doc.elements.filter(e=>e.tag==='script'&&e.attrs.src?.startsWith('/_next/static/')).forEach(e=>scripts.add(e.attrs.src));rows.push({path,checks,decodedHTMLBytes:Buffer.byteLength(body)});
}
for(const path of ['/authors/b20-unregistered','/authors/not-a-person']){const {r,body}=await get(path);const doc=parseDocument(body);rows.push({path,checks:[{name:'unregistered profile has real 404',ok:r.status===404},{name:'404 noindex',ok:doc.elements.some(e=>e.tag==='meta'&&e.attrs.name==='robots'&&e.attrs.content.includes('noindex'))},{name:'404 exact build',ok:JSON.stringify(buildIds(doc))===JSON.stringify([buildId])}]});}
const feed=(await get('/feed.xml')).body;rows.push({path:'/feed.xml',checks:[{name:'ten articles retained with no invented attribution',ok:(feed.match(/<item>/g)||[]).length===10&&!/<(?:author|dc:creator|managingEditor|webMaster)>/.test(feed)&&!names.some(n=>feed.includes(n))}]});
const chunks=[];
for(const path of scripts){const {r,body}=await get(path);chunks.push({path,bytes:Buffer.byteLength(body),ok:r.status===200&&!names.some(n=>body.includes(n))&&!body.includes('ui-avatars.com')&&!['15+ years in enterprise','Market-leading salaries with ESOPs','Comprehensive health insurance'].some(n=>body.includes(n))});}
rows.push({path:'initial-client-script-consumers',checks:[{name:'pending private records absent from all referenced chunks',ok:chunks.every(x=>x.ok)}]});
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(resolve(dir,e.name)):[resolve(dir,e.name)]);}
const publicChunks=files('.next/static').filter(p=>/\.(?:js|css)$/.test(p));const leaks=publicChunks.filter(p=>{const s=readFileSync(p,'utf8');return names.some(n=>s.includes(n))||s.includes('ui-avatars.com')||s.includes('15+ years in enterprise')||s.includes('Market-leading salaries with ESOPs');});
rows.push({path:'.next/static',checks:[{name:'entire public static JS/CSS has no held identity or external avatar code',ok:leaks.length===0}]});
const evidence={buildId,rows,requests,chunks,publicChunksInspected:publicChunks.length,publicChunkLeaks:leaks,scope:'Initial parsed HTML for eight B20 pages, blog hub and ten attribution consumers; two unknown profiles, optional feed authorship, all referenced and complete static JS/CSS. GET only; no mail/provider calls or identity approval.'};writeFileSync('docs/evidence/b23-2026-09-28/built-identity-contract.json',JSON.stringify(evidence,null,2)+'\n');const checks=rows.flatMap(r=>r.checks);console.log(JSON.stringify({buildId,rows:rows.length,assertions:checks.length,failures:rows.flatMap(r=>r.checks.filter(c=>!c.ok).map(c=>({path:r.path,...c})))}));if(checks.some(c=>!c.ok))process.exitCode=1;
