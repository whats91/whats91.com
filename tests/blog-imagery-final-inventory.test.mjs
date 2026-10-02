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
const editorialVisuals=load('src/lib/blog/editorial-visuals.ts');
const visualBySlug={"busy-erp-google-sheets-integration-complete-guide":editorialVisuals.sheetsVisual,"whatsapp-graph-api-v24-to-v25-transition-guide":editorialVisuals.graphMigrationVisual,"whatsapp-username-system-2026-complete-guide":editorialVisuals.usernameVisual,"whatsapp-plus-launch-2026-premium-subscription-guide":editorialVisuals.plusVisual,"whatsapp-web-6-hour-logout-unofficial-api-migration-guide":editorialVisuals.webMigrationVisual,"whatsapp-web-6-hour-logout-rule-india-2026":editorialVisuals.logoutRuleVisual,"busy-accounting-whatsapp-integration-benefits":editorialVisuals.busyBenefitsVisual,"meta-whatsapp-pricing-october-2026-india":editorialVisuals.octoberPricingVisual};
const empty=()=>null;
const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['@/components/shared/Container',{Container:({children})=>createElement('div',null,children)}],['./ArticleAttribution',{ArticleAttribution:empty}],['./CopyArticleLink',{CopyArticleLink:empty}]]),transform);
const guides=new Map([
 ['11',[october.octoberPricingGuide,'EditorialGuideArticle']],
 ['10',[billing.indiaPricingGuide,'IndiaPricingGuideArticle']],
 ['9',[rollout.rolloutGuides[0],'RestrictionsGuideArticle']],
 ['8',[erp.sheetsGuide,'EditorialGuideArticle']],
 ['7',[rollout.rolloutGuides[1],'EditorialGuideArticle']],
 ['6',[rollout.rolloutGuides[3],'EditorialGuideArticle']],
 ['5',[rollout.rolloutGuides[2],'EditorialGuideArticle']],
 ['4',[billing.migrationGuide,'EditorialGuideArticle']],
 ['3',[rollout.rolloutGuides[4],'EditorialGuideArticle']],
 ['1',[billing.cloudGuide,'CloudGuideArticle']],
 ['2',[erp.benefitsGuide,'EditorialGuideArticle']],
]);
const historicalDates={10:['2026-05-22','2026-05-22'],9:['2026-03-20',undefined],8:['2026-03-15',undefined],7:['2026-03-13',undefined],6:['2026-03-06',undefined],5:['2026-03-06',undefined],4:['2026-02-28',undefined],3:['2026-02-26',undefined],1:['2026-01-15',undefined],2:['2026-01-10',undefined]};
const held=new Set(['7','3']);

test('redesigned posts have separate, compact listing thumbnails',async()=>{
 for(const slug of ['whatsapp-cloud-api-complete-guide-2026','whatsapp-cloud-api-pricing-india-2026','whatsapp-cloud-api-restrictions-coexistence-framework-2026','busy-erp-google-sheets-integration-complete-guide','whatsapp-graph-api-v24-to-v25-transition-guide','whatsapp-username-system-2026-complete-guide','whatsapp-plus-launch-2026-premium-subscription-guide','whatsapp-web-6-hour-logout-unofficial-api-migration-guide','whatsapp-web-6-hour-logout-rule-india-2026','busy-accounting-whatsapp-integration-benefits','meta-whatsapp-pricing-october-2026-india']){
  const post=registry.getPostBySlug(slug);
  assert.ok(post?.thumbnailImage);
  assert.notEqual(post.thumbnailImage,post.coverImage);
  const path=`public${post.thumbnailImage}`,meta=await sharp(path).metadata();
  assert.equal(meta.format,'webp');
  assert.equal(meta.width,1200);
  assert.equal(meta.height,536);
  assert.ok(statSync(path).size<200000);
 }
});

test('all 11 public posts have 2–4 distinct optimized landscape images in responsive server HTML',async()=>{
 const posts=registry.getAllPosts(),paths=new Set(),alts=new Set();assert.equal(posts.length,11);assert.deepEqual(new Set(posts.map(p=>p.id)),new Set(guides.keys()));
 for(const post of posts){
  const [guide,component]=guides.get(post.id),images=[guide.cover,...guide.sections.flatMap(section=>section.image?[section.image]:[])];
  assert.ok(images.every(image=>image.src.endsWith('-watermarked.webp')),`${post.slug} has an unwatermarked article image`);
  if(visualBySlug[post.slug]){
   assert.ok(visualBySlug[post.slug].heroSquare.endsWith('-watermarked.webp'));
   assert.ok(visualBySlug[post.slug].mobileFigure.endsWith('-watermarked.webp'));
  }
  assert.equal(post.slug,guide.slug);assert.ok(guide.cover);assert.ok(images.length>=2&&images.length<=4);assert.equal(post.id==='11'?images.length:2,post.id==='11'?3:2);
  assert.equal(new Set(images.map(image=>image.src)).size,images.length);assert.equal(new Set(images.map(image=>image.alt)).size,images.length);
  assert.equal(post.coverImage,guide.cover.src);assert.equal(post.coverAlt,guide.cover.alt);assert.equal(post.coverCaption,guide.cover.caption);
  let html;try{html=renderToStaticMarkup(createElement(componentLoad(`src/components/blog/${component}.tsx`)[component],{guide,visual:visualBySlug[post.slug]}));}catch(error){throw new Error(`render ${post.id} ${component}: ${error.message}`,{cause:error});}
  const tags=[...html.matchAll(/<img\b[^>]*>/g)].map(match=>match[0]).filter(tag=>!tag.includes('alt=""'));assert.equal(tags.length,images.length);assert.equal((html.match(/<h1\b/g)||[]).length,1);
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
