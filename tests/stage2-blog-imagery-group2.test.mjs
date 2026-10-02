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
 {slug:'whatsapp-graph-api-v24-to-v25-transition-guide',id:'7',guide:load('src/lib/blog/rollout-guides.ts').rolloutGuides[1],component:'RolloutGuideArticle',section:'migration-pilot',published:'2026-03-13',indexHold:true},
 {slug:'whatsapp-username-system-2026-complete-guide',id:'6',guide:load('src/lib/blog/rollout-guides.ts').rolloutGuides[3],component:'RolloutGuideArticle',section:'identity-mapping',published:'2026-03-06',indexHold:false},
 {slug:'whatsapp-plus-launch-2026-premium-subscription-guide',id:'5',guide:load('src/lib/blog/rollout-guides.ts').rolloutGuides[2],component:'RolloutGuideArticle',section:'price-and-plan',published:'2026-03-06',indexHold:false},
];
const empty=()=>null;
const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['./ArticleAttribution',{ArticleAttribution:empty}],['./CopyArticleLink',{CopyArticleLink:empty}]]),transform);

test('three selected posts each use two distinct optimized images in the rendered article and reader body',async()=>{
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

test('group 2 retains earlier covers and Graph article index hold',()=>{
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').id,'11');
 assert.equal(registry.getPostBySlug('meta-whatsapp-pricing-october-2026-india').publishedAt,undefined);
 assert.equal(source[0].guide.indexHold,true);
 assert.equal(generateBlogPostMetadata(source[0].slug).robots.index,false);
 for(const slug of ['whatsapp-cloud-api-pricing-india-2026','whatsapp-cloud-api-restrictions-coexistence-framework-2026','busy-erp-google-sheets-integration-complete-guide'])assert.ok(registry.getPostBySlug(slug).coverImage);
});
