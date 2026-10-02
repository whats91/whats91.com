import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import ts from 'typescript';
import sharp from 'sharp';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { projectLoader } from './helpers/load-project-module.mjs';

const transform=(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const mocks=new Map(),load=projectLoader(mocks,transform);
const registry=load('src/lib/blog/registry.ts');mocks.set('@/lib/blog',registry);
const {guideMarkdown}=load('src/lib/blog/erp-guides.ts');
const {generateBlogPostMetadata,generateBlogArticleSchema}=load('src/lib/blog/metadata.ts');
const billing=load('src/lib/blog/billing-guides.ts'),erp=load('src/lib/blog/erp-guides.ts'),rollout=load('src/lib/blog/rollout-guides.ts'),october=load('src/lib/blog/october-pricing-guide.ts');
const empty=()=>null;
const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['./ArticleAttribution',{ArticleAttribution:empty}],['./CopyArticleLink',{CopyArticleLink:empty}]]),transform);
const guides=new Map([
 ['11',[october.octoberPricingGuide,'PlatformGuideArticle']],
 ['10',[billing.indiaPricingGuide,'PlatformGuideArticle']],
 ['9',[rollout.rolloutGuides[0],'RolloutGuideArticle']],
 ['8',[erp.sheetsGuide,'ERPGuideArticle']],
 ['7',[rollout.rolloutGuides[1],'RolloutGuideArticle']],
 ['6',[rollout.rolloutGuides[3],'RolloutGuideArticle']],
 ['5',[rollout.rolloutGuides[2],'RolloutGuideArticle']],
 ['4',[billing.migrationGuide,'PlatformGuideArticle']],
 ['3',[rollout.rolloutGuides[4],'RolloutGuideArticle']],
 ['1',[billing.cloudGuide,'PlatformGuideArticle']],
 ['2',[erp.benefitsGuide,'ERPGuideArticle']],
]);
const historicalDates={10:['2026-05-22','2026-05-22'],9:['2026-03-20',undefined],8:['2026-03-15',undefined],7:['2026-03-13',undefined],6:['2026-03-06',undefined],5:['2026-03-06',undefined],4:['2026-02-28',undefined],3:['2026-02-26',undefined],1:['2026-01-15',undefined],2:['2026-01-10',undefined]};
const held=new Set(['7','3']);

test('all 11 public posts have 2–4 distinct optimized landscape images in responsive server HTML',async()=>{
 const posts=registry.getAllPosts(),paths=new Set(),alts=new Set();assert.equal(posts.length,11);assert.deepEqual(new Set(posts.map(p=>p.id)),new Set(guides.keys()));
 for(const post of posts){
  const [guide,component]=guides.get(post.id),images=[guide.cover,...guide.sections.flatMap(section=>section.image?[section.image]:[])];
  assert.equal(post.slug,guide.slug);assert.ok(guide.cover);assert.ok(images.length>=2&&images.length<=4);assert.equal(post.id==='11'?images.length:2,post.id==='11'?3:2);
  assert.equal(new Set(images.map(image=>image.src)).size,images.length);assert.equal(new Set(images.map(image=>image.alt)).size,images.length);
  assert.equal(post.coverImage,guide.cover.src);assert.equal(post.coverAlt,guide.cover.alt);assert.equal(post.coverCaption,guide.cover.caption);
  let html;try{html=renderToStaticMarkup(createElement(componentLoad(`src/components/blog/${component}.tsx`)[component],{guide}));}catch(error){throw new Error(`render ${post.id} ${component}: ${error.message}`,{cause:error});}
  const tags=[...html.matchAll(/<img\b[^>]*>/g)].map(match=>match[0]);assert.equal(tags.length,images.length);assert.equal((html.match(/<h1\b/g)||[]).length,1);
  for(const [i,image] of images.entries()){
   assert.ok(!paths.has(image.src));paths.add(image.src);assert.ok(!alts.has(image.alt));alts.add(image.alt);
   assert.ok(image.alt.length>=35&&image.caption.length>=40);assert.ok(image.caption.startsWith('Illustration:')||post.id==='11');
   const path=`public${image.src}`,meta=await sharp(path).metadata();assert.equal(meta.format,'webp');assert.equal(meta.width,image.width);assert.equal(meta.height,image.height);assert.ok(meta.width>meta.height&&statSync(path).size<200000);
   assert.ok(tags[i].includes(`alt="${image.alt}"`));assert.ok(tags[i].includes('sizes='));assert.ok(tags[i].includes(i===0?'loading="eager"':'loading="lazy"'));
   assert.ok(html.includes(image.caption));assert.ok(html.includes(image.src)||html.includes(encodeURIComponent(image.src)));
   assert.ok(post.content.includes(`![${image.alt}](${image.src})`));
  }
  for(const section of guide.sections.filter(section=>section.image))assert.ok(html.includes(`href="#${section.id}"`));
 }
 assert.equal(paths.size,23);assert.equal(alts.size,23);
});

test('all 11 registry bodies, MD/MCP readers, cover metadata and historical holds agree',async()=>{
 const {GET:mdGet}=load('src/app/api/md/[slug]/route.ts'),{GET:jsonGet}=load('src/app/api/mcp/pages/[slug]/route.ts');
 for(const post of registry.getAllPosts()){
  const [guide]=guides.get(post.id),images=[guide.cover,...guide.sections.flatMap(section=>section.image?[section.image]:[])];
  assert.equal(post.content,guideMarkdown(guide));assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(post.editorial.history,[]);
  const expected=historicalDates[post.id]||[undefined,undefined];assert.equal(post.publishedAt,expected[0]);assert.equal(post.updatedAt,expected[1]);
  assert.equal(!!post.indexHold,held.has(post.id));
  const meta=generateBlogPostMetadata(post.slug),schema=generateBlogArticleSchema(post.slug),coverURL=`https://whats91.com${guide.cover.src}`;
  assert.equal(meta.openGraph.images[0].url,coverURL);assert.equal(meta.twitter.images[0],coverURL);assert.equal(schema.image,coverURL);
  assert.equal(meta.robots?.index,held.has(post.id)?false:undefined);
  const context={params:Promise.resolve({slug:`blog-${post.slug}`})};
  const [a,b]=await Promise.all([mdGet(new Request('https://whats91.com/api/md'),context),jsonGet(new Request('https://whats91.com/api/mcp'),context)]);
  assert.equal(a.status,200);assert.equal(b.status,200);const text=await a.text(),json=await b.json();assert.equal(json.content,post.content);assert.ok(text.includes(post.content));
  for(const image of images){assert.ok(text.includes(image.src));assert.ok(JSON.stringify(json).includes(image.src));}
 }
});
