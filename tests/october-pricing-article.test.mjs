import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import ts from 'typescript';
import sharp from 'sharp';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { projectLoader } from './helpers/load-project-module.mjs';
const transform=(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const mocks=new Map(),load=projectLoader(mocks,transform);
const registry=load('src/lib/blog/registry.ts');mocks.set('@/lib/blog',registry);
const {octoberPricingGuide:guide,octoberPricingImages:images,octoberPricingExamples:examples}=load('src/lib/blog/october-pricing-guide.ts');
const {guideMarkdown}=load('src/lib/blog/erp-guides.ts');
const {generateBlogPostMetadata,generateBlogArticleSchema}=load('src/lib/blog/metadata.ts');
const slug='meta-whatsapp-pricing-october-2026-india';

test('new article explains the official future card without inventing an author, publication date or economic cause',()=>{
 const post=registry.getPostBySlug(slug),md=guideMarkdown(guide),meta=generateBlogPostMetadata(slug),schema=generateBlogArticleSchema(slug);
 assert.equal(post.slug,slug);assert.equal(post.content,md);assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(post.editorial.history,[]);
 assert.equal(post.publishedAt,undefined);assert.equal(post.updatedAt,undefined);assert.equal(schema.datePublished,undefined);assert.equal(schema.author,undefined);
 assert.equal(meta.openGraph.publishedTime,undefined);assert.deepEqual(meta.authors,[]);assert.equal(meta.alternates.canonical,`https://whats91.com/blog/${slug}`);
 assert.equal(meta.openGraph.images[0].url,`https://whats91.com${images.cover.src}`);assert.equal(meta.twitter.images[0],`https://whats91.com${images.cover.src}`);assert.equal(schema.image,`https://whats91.com${images.cover.src}`);
 assert.ok(md.split(/\s+/).length>1400);assert.ok(md.includes('1 October 2026')&&md.includes('not the same thing as a delivered message'));
 assert.ok(md.includes('₹0.8631')&&md.includes('₹0.1150')&&md.includes('₹2.4971'));
 assert.ok(md.includes('does not provide a verified economic cause')&&md.includes('does not say every market price increases'));
 assert.ok(md.includes('without markup'));
 for(const url of ['developers.facebook.com/documentation/business-messaging/whatsapp/pricing','/pricing#calculator','/plans','/tools/whatsapp-api-cost-calculator'])assert.ok(md.includes(url));
});

test('worked examples reconcile with the dated INR card and expose every exclusion',()=>{
 assert.equal(examples.campaignAndUpdates.meta,978.10);
 assert.equal(examples.withService.meta,1001.10);assert.equal(examples.withService.serviceFree,1000);assert.equal(examples.withService.billable.service,200);
 assert.equal(examples.freeEntry.meta,0);assert.equal(examples.freeEntry.billable.marketing,0);assert.equal(examples.freeEntry.billable.utility,0);
 assert.equal(examples.international.meta,24.97);assert.equal(examples.domestic.meta,1.15);
 assert.equal(examples.nextUtility.meta,.22);
 for(const example of Object.values(examples)){assert.equal(example.status,'estimate');assert.equal(example.total,null);assert.equal(example.tax,null);assert.equal(example.platform,null);}
});

test('three distinct optimized landscape assets are real project files and occur in the article and reader body',async()=>{
 const all=Object.values(images),md=guideMarkdown(guide);assert.equal(new Set(all.map(v=>v.src)).size,3);
 for(const image of all){const filename=`public${image.src}`;assert.ok(existsSync(filename));const meta=await sharp(filename).metadata();assert.equal(meta.format,'webp');assert.equal(meta.width,image.width);assert.equal(meta.height,image.height);assert.ok(meta.width>meta.height&&statSync(filename).size<200000);assert.ok(image.alt.length>35&&image.caption.length>40);assert.ok(md.includes(`![${image.alt}](${image.src})`));}
 const {GET:mdGet}=load('src/app/api/md/[slug]/route.ts');const {GET:jsonGet}=load('src/app/api/mcp/pages/[slug]/route.ts');const context={params:Promise.resolve({slug:`blog-${slug}`})};
 const [a,b]=await Promise.all([mdGet(new Request('https://whats91.com/api/md'),context),jsonGet(new Request('https://whats91.com/api/mcp'),context)]);assert.equal(a.status,200);assert.equal(b.status,200);
 const text=await a.text(),json=await b.json();for(const image of all){assert.ok(text.includes(image.src));assert.ok(JSON.stringify(json).includes(image.src));}assert.ok(text.includes(md));assert.equal(json.content,md);
});

test('HTML preserves one H1, section anchors, all three pictures, FAQ schema and source links',()=>{
 const empty=()=>null;const avatar=load('src/components/blog/AvatarImage.tsx');
 const componentLoad=projectLoader(new Map([['@/components/landing/Header',{Header:empty}],['@/components/landing/Footer',{Footer:empty}],['./ArticleAttribution',projectLoader(new Map([['./AvatarImage',avatar]]),transform)('src/components/blog/ArticleAttribution.tsx')],['./CopyArticleLink',load('src/components/blog/CopyArticleLink.tsx')]]),transform);
 const {PlatformGuideArticle}=componentLoad('src/components/blog/PlatformGuideArticle.tsx');const html=renderToStaticMarkup(createElement(PlatformGuideArticle,{guide}));
 assert.equal((html.match(/<h1/g)||[]).length,1);assert.equal((html.match(/<figure/g)||[]).length,3);assert.equal((html.match(/<details/g)||[]).length,guide.faqs.length);
 for(const image of Object.values(images)){assert.ok(decodeURIComponent(html).includes(image.src));assert.ok(html.includes(image.alt));}
 for(const section of guide.sections)assert.ok(html.includes(`id="${section.id}"`)&&html.includes(`href="#${section.id}"`));
 const article=JSON.parse(html.match(/<script id="article-schema"[^>]*>(.*?)<\/script>/s)[1]);assert.equal(article.image,`https://whats91.com${images.cover.src}`);assert.equal(article.datePublished,undefined);assert.equal(article.author,undefined);
 const faq=JSON.parse(html.match(/<script id="faq-schema"[^>]*>(.*?)<\/script>/s)[1]);assert.equal(faq.mainEntity.length,guide.faqs.length);
});

test('blog index, sitemap and RSS expose the new canonical path without a made-up publication timestamp',async()=>{
 assert.ok(registry.getAllPosts().some(p=>p.slug===slug));
 const sitemap=load('src/app/sitemap.ts').default();assert.ok(sitemap.some(row=>row.url.endsWith(`/blog/${slug}`)&&!('lastModified' in row)));
 const feed=await(await load('src/app/feed.xml/route.ts').GET()).text();const item=feed.split("<item>").find(part=>part.includes(`<link>https://whats91.com/blog/${slug}</link>`))?.split("</item>")[0];assert.ok(item&&!item.includes('<pubDate>'));
});
