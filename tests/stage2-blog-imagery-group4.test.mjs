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
const source=[
 {slug:'whatsapp-cloud-api-complete-guide-2026',id:'1',guide:load('src/lib/blog/billing-guides.ts').cloudGuide,component:'PlatformGuideArticle',section:'cloud-operating-model',published:'2026-01-15',indexHold:undefined},
 {slug:'busy-accounting-whatsapp-integration-benefits',id:'2',guide:load('src/lib/blog/erp-guides.ts').benefitsGuide,component:'ERPGuideArticle',section:'invoice-delivery',published:'2026-01-10',indexHold:undefined},
];
const empty=()=>null;
const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['./ArticleAttribution',{ArticleAttribution:empty}],['./CopyArticleLink',{CopyArticleLink:empty}]]),transform);

test('two selected posts each use two distinct optimized images in the rendered article and reader body',async()=>{
 const allPaths=[];
 for(const entry of source){
  const {guide,slug,section,id}=entry;const post=registry.getPostBySlug(slug);const inBody=guide.sections.find(item=>item.id===section)?.image;
  assert.equal(post.id,id);assert.ok(guide.cover&&inBody);assert.equal(guide.sections.filter(item=>item.image).length,1);
  const images=[guide.cover,inBody];assert.equal(new Set(images.map(image=>image.src)).size,2);
  assert.equal(post.coverImage,guide.cover.src);assert.equal(post.coverAlt,guide.cover.alt);assert.equal(post.coverCaption,guide.cover.caption);
  const markdown=guideMarkdown(guide);assert.equal(post.content,markdown);
  const html=renderToStaticMarkup(createElement(componentLoad(`src/components/blog/${entry.component}.tsx`)[entry.component],{guide}));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal((html.match(/<img\b/g)||[]).length,2);
  assert.ok(html.includes(`href="#${section}"`));
  for(const image of images){
   allPaths.push(image.src);const path=`public${image.src}`;const meta=await sharp(path).metadata();
   assert.equal(meta.format,'webp');assert.equal(meta.width,image.width);assert.equal(meta.height,image.height);assert.ok(meta.width>meta.height);assert.ok(statSync(path).size<200000);
   assert.ok(image.alt.length>35&&image.caption.length>40);assert.ok(html.includes(image.alt));assert.ok((html.includes(image.src)||html.includes(encodeURIComponent(image.src))));assert.ok(markdown.includes(`![${image.alt}](${image.src})`));
  }
  const meta=generateBlogPostMetadata(slug),schema=generateBlogArticleSchema(slug);
  assert.equal(meta.openGraph.images[0].url,`https://whats91.com${guide.cover.src}`);assert.equal(meta.twitter.images[0],`https://whats91.com${guide.cover.src}`);assert.equal(schema.image,`https://whats91.com${guide.cover.src}`);
  assert.equal(post.publishedAt,entry.published);assert.equal(post.updatedAt,undefined);assert.equal(post.indexHold,entry.indexHold);assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(post.editorial.history,[]);
 }
 assert.equal(new Set(allPaths).size,4);
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

test('group 4 retains earlier imagery and both held articles',()=>{
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').id,'11');
 for(const slug of ['whatsapp-cloud-api-pricing-india-2026','whatsapp-cloud-api-restrictions-coexistence-framework-2026','busy-erp-google-sheets-integration-complete-guide','whatsapp-graph-api-v24-to-v25-transition-guide','whatsapp-username-system-2026-complete-guide','whatsapp-plus-launch-2026-premium-subscription-guide','whatsapp-web-6-hour-logout-unofficial-api-migration-guide','whatsapp-web-6-hour-logout-rule-india-2026'])assert.ok(registry.getPostBySlug(slug).coverImage);
 for(const slug of ['whatsapp-graph-api-v24-to-v25-transition-guide','whatsapp-web-6-hour-logout-rule-india-2026'])assert.equal(generateBlogPostMetadata(slug).robots.index,false);
});
