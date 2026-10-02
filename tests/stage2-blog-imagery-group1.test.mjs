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
const visualBySlug={"busy-erp-google-sheets-integration-complete-guide":load('src/lib/blog/editorial-visuals.ts').sheetsVisual};
const {generateBlogPostMetadata,generateBlogArticleSchema}=load('src/lib/blog/metadata.ts');
const source=[
 {slug:'whatsapp-cloud-api-pricing-india-2026',id:'10',guide:load('src/lib/blog/billing-guides.ts').indiaPricingGuide,component:'IndiaPricingGuideArticle',section:'guide-reconciliation',published:'2026-05-22',updated:'2026-05-22'},
 {slug:'whatsapp-cloud-api-restrictions-coexistence-framework-2026',id:'9',guide:load('src/lib/blog/rollout-guides.ts').rolloutGuides[0],component:'RestrictionsGuideArticle',section:'restrictions-conditions',published:'2026-03-20'},
 {slug:'busy-erp-google-sheets-integration-complete-guide',id:'8',guide:load('src/lib/blog/erp-guides.ts').sheetsGuide,component:'EditorialGuideArticle',section:'validate-data',published:'2026-03-15'},
];
const empty=()=>null;
const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['@/components/shared/Container',{Container:({children})=>createElement('div',null,children)}],['./ArticleAttribution',{ArticleAttribution:empty}],['./CopyArticleLink',{CopyArticleLink:empty}]]),transform);

test('three selected posts each use two distinct optimized images in the rendered article and reader body',async()=>{
 const allPaths=[];
 for(const entry of source){
  const {guide,slug,section,id}=entry;const post=registry.getPostBySlug(slug);const inBody=guide.sections.find(item=>item.id===section)?.image;
  assert.equal(post.id,id);assert.ok(guide.cover&&inBody);assert.equal(guide.sections.filter(item=>item.image).length,1);
  const images=[guide.cover,inBody];assert.equal(new Set(images.map(image=>image.src)).size,2);
  assert.equal(post.coverImage,guide.cover.src);assert.equal(post.coverAlt,guide.cover.alt);assert.equal(post.coverCaption,guide.cover.caption);
  const markdown=guideMarkdown(guide);assert.equal(post.content,markdown);
  const html=renderToStaticMarkup(createElement(componentLoad(`src/components/blog/${entry.component}.tsx`)[entry.component],{guide,visual:visualBySlug[slug]}));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal([...html.matchAll(/<img\b[^>]*>/g)].filter(match=>!match[0].includes('alt=""')).length,2);
  assert.ok(html.includes(`href="#${section}"`));
  for(const image of images){
   allPaths.push(image.src);const path=`public${image.src}`;const meta=await sharp(path).metadata();
   assert.equal(meta.format,'webp');assert.equal(meta.width,image.width);assert.equal(meta.height,image.height);assert.ok(meta.width>meta.height);assert.ok(statSync(path).size<200000);
   assert.ok(image.alt.length>35&&image.caption.length>40);assert.ok(html.includes(image.alt));assert.ok((html.includes(image.src)||html.includes(encodeURIComponent(image.src))));assert.ok(markdown.includes(`![${image.alt}](${image.src})`));
  }
  const meta=generateBlogPostMetadata(slug),schema=generateBlogArticleSchema(slug);
  assert.equal(meta.openGraph.images[0].url,`https://whats91.com${guide.cover.src}`);assert.equal(meta.twitter.images[0],`https://whats91.com${guide.cover.src}`);assert.equal(schema.image,`https://whats91.com${guide.cover.src}`);
  assert.equal(post.publishedAt,entry.published);assert.equal(post.updatedAt,entry.updated);assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(post.editorial.history,[]);
 }
 assert.equal(new Set(allPaths).size,6);
});

test('Markdown and MCP endpoints include both images for each selected post',async()=>{
 const {GET:mdGet}=load('src/app/api/md/[slug]/route.ts');const {GET:jsonGet}=load('src/app/api/mcp/pages/[slug]/route.ts');
 for(const {slug,guide} of source){
  const context={params:Promise.resolve({slug:`blog-${slug}`})};
  const [a,b]=await Promise.all([mdGet(new Request('https://whats91.com/api/md'),context),jsonGet(new Request('https://whats91.com/api/mcp'),context)]);
  assert.equal(a.status,200);assert.equal(b.status,200);const text=await a.text(),json=await b.json();
  assert.equal(json.content,guideMarkdown(guide));assert.ok(text.includes(json.content));
  for(const image of [guide.cover,guide.sections.find(item=>item.image).image]){assert.ok(text.includes(image.src));assert.ok(JSON.stringify(json).includes(image.src));}
 }
});

test('group 1 retains the prior Stage 1 post and its undated editorial state',()=>{
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').id,'11');
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').publishedAt,undefined);
 assert.equal(source[1].guide.indexHold,false);
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').editorial.stage,'pending-human-review');
});
