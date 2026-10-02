import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {projectLoader} from './helpers/load-project-module.mjs';
import {parseDocument,textContent} from '../scripts/seo-validation/evidence.mjs';
const transpile=(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const load=projectLoader(new Map(),transpile),{rolloutGuides}=load('src/lib/blog/rollout-guides.ts'),{guideMarkdown,sheetsGuide,benefitsGuide}=load('src/lib/blog/erp-guides.ts'),{billingGuides}=load('src/lib/blog/billing-guides.ts');
const {getPostBySlug}=load('src/lib/blog/registry.ts'),{generateBlogPostMetadata}=load('src/lib/blog/metadata.ts');
const allNine=[sheetsGuide,benefitsGuide,...billingGuides.slice(0,2),...rolloutGuides];
const mock=()=>null,avatar=load('src/components/blog/AvatarImage.tsx'),attribution=projectLoader(new Map([['./AvatarImage',avatar]]),transpile)('src/components/blog/ArticleAttribution.tsx');
const renderLoad=projectLoader(new Map([['@/components/landing/Header',{Header:mock}],['@/components/landing/Footer',{Footer:mock}],['./ArticleAttribution',attribution],['./CopyArticleLink',load('src/components/blog/CopyArticleLink.tsx')]]),transpile);
const {RolloutGuideArticle}=renderLoad('src/components/blog/RolloutGuideArticle.tsx'),{PlatformGuideArticle}=renderLoad('src/components/blog/PlatformGuideArticle.tsx'),{ERPGuideArticle}=renderLoad('src/components/blog/ERPGuideArticle.tsx');

test('all nine current server articles retain complete canonical explanation, native disclosure and scoped schema',()=>{
 assert.equal(allNine.length,9);
 for(const guide of allNine){
  const renderer=rolloutGuides.includes(guide)?RolloutGuideArticle:billingGuides.includes(guide)?PlatformGuideArticle:ERPGuideArticle;
  const html=renderToStaticMarkup(createElement(renderer,{guide})),doc=parseDocument(html),text=textContent(doc.elements.find(e=>e.tag==='article'));
  assert.equal(doc.elements.filter(e=>e.tag==='h1').length,1,guide.slug);assert.ok(text.includes(guide.intro));
  for(const s of guide.sections){assert.ok(text.includes(s.heading));for(const p of s.paragraphs)assert.ok(text.includes(p),guide.slug+' '+s.id);for(const p of s.steps||[])assert.ok(text.includes(p));if(s.table)for(const row of s.table.rows)for(const cell of row)assert.ok(text.includes(cell));if(s.code)assert.ok(text.includes(s.code.text));}
  const faq=doc.elements.filter(e=>e.tag==='script'&&e.attrs.type==='application/ld+json').map(e=>JSON.parse(textContent(e))).find(s=>s['@type']==='FAQPage');
  assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),guide.faqs);
  assert.equal(doc.elements.filter(e=>e.tag==='details').length,guide.faqs.length);for(const f of guide.faqs)assert.ok(text.includes(f.answer));
  assert.ok(!html.includes('opacity:0'));assert.ok(html.includes('Attribution pending')&&html.includes('Article link:')&&html.includes('disabled=""'));
  assert.ok(!readFileSync(`src/app/blog/${guide.slug}/page.tsx`,'utf8').includes('use client'));
 }
});

test('five rollout guide metadata/twins/index policy agree without advancing date or human provenance',()=>{
 const dates=['2026-03-20','2026-03-13','2026-03-06','2026-03-06','2026-02-26'];const sitemap=projectLoader(new Map([['@/lib/blog',load('src/lib/blog/registry.ts')]]),transpile)('src/app/sitemap.ts').default();
 for(const [i,g] of rolloutGuides.entries()){
  const post=getPostBySlug(g.slug),meta=generateBlogPostMetadata(g.slug),md=guideMarkdown(g);
  assert.equal(post.title,g.title);assert.equal(post.excerpt,g.description);assert.equal(post.content,md);assert.equal(meta.description,g.description);assert.equal(meta.openGraph.description,g.description);assert.equal(meta.twitter.description,g.description);
  assert.equal(post.publishedAt,dates[i]);assert.equal(post.updatedAt,undefined);assert.equal(post.authorId,'1');assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(post.editorial.history,[]);assert.deepEqual(meta.authors,[]);
  if(g.indexHold){assert.equal(meta.robots.index,false);assert.equal(meta.robots.follow,true);}
  assert.equal(!!meta.robots,g.indexHold);assert.equal(sitemap.some(p=>p.url===`https://whats91.com/blog/${g.slug}`),!g.indexHold);
  for(const s of g.sections)for(const p of s.paragraphs)assert.ok(md.includes(p));for(const f of g.faqs)assert.ok(md.includes(f.answer));
 }
 assert.deepEqual(rolloutGuides.filter(g=>g.indexHold).map(g=>g.slug),[rolloutGuides[1].slug,rolloutGuides[4].slug]);
});

test('rollout articles keep meaningful anchors and labelled focusable table/code containment',()=>{
 for(const g of rolloutGuides){
  const html=renderToStaticMarkup(createElement(RolloutGuideArticle,{guide:g})),doc=parseDocument(html);
  for(const s of g.sections){assert.ok(doc.elements.some(e=>e.attrs.id===s.id));assert.ok(doc.elements.some(e=>e.tag==='a'&&e.attrs.href==='#'+s.id));if(s.headingId)assert.ok(doc.elements.some(e=>e.tag==='h2'&&e.attrs.id===s.headingId));}
  const regions=doc.elements.filter(e=>e.attrs.role==='region');assert.equal(regions.length,g.sections.reduce((n,s)=>n+Number(!!s.table)+Number(!!s.code),0));
  for(const region of regions){assert.equal(region.attrs.tabindex,'0');assert.ok(doc.elements.some(e=>e.attrs.id===region.attrs['aria-labelledby']));assert.ok(region.attrs.class.includes('overflow-x-auto'));assert.ok(region.attrs.class.includes('max-w-full'));}
  assert.ok(doc.elements.some(e=>e.tag==='a'&&e.attrs.href===`https://whats91.com/blog/${g.slug}`));
 }
});

test('material forecasts and scope remain held while B13 compatibility and window qualifications stay canonical',()=>{
 const c=load('src/lib/platform-compatibility.ts'),r=rolloutGuides[0],md=guideMarkdown(r);
 assert.deepEqual(r.faqs,c.compatibilityFAQs);assert.deepEqual(r.sections.find(s=>s.id==='restrictions-conditions').table.rows,c.compatibilityRows.map(row=>[row.feature,row.standard,row.hybrid]));
 for(const g of [rolloutGuides[0],rolloutGuides[1],rolloutGuides[3]]){const m=guideMarkdown(g);assert.ok(m.includes(c.throughputQualification)&&m.includes(c.scalingQualification));}
 assert.ok(md.includes(c.migrationQualification)&&md.includes(c.onboardingQualification));
 const graph=guideMarkdown(rolloutGuides[1]);assert.ok(graph.includes('expiry')&&graph.includes('revocation')&&graph.includes('no-expiry')&&graph.includes('not a complete deployed handler'));assert.ok(graph.includes(c.windowQualification)&&graph.includes(c.entryQualification));
 assert.ok(guideMarkdown(rolloutGuides[4]).includes('press release, not the signed direction'));assert.ok(guideMarkdown(rolloutGuides[2]).includes('future tests'));
 assert.ok(guideMarkdown(rolloutGuides[3]).includes('Universal phone-number replacement'));
});
