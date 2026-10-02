import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {projectLoader} from './helpers/load-project-module.mjs';
const transpile=(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const load=projectLoader(new Map(),transpile);
const guides=load('src/lib/blog/billing-guides.ts');
const {guideMarkdown}=load('src/lib/blog/erp-guides.ts');
const {estimateMessageCost,suppliedIndiaRateSource}=load('src/lib/pricing.ts');

test('published synthetic marginal example uses the accepted B12 arithmetic without activating current money',()=>{
 const card={market:'IN',currency:'INR',effectiveFrom:'2026-04-01',effectiveUntil:'2026-04-30',unit:'per-delivered-message',source:'synthetic fixture, not provider evidence',authority:'confirmed',conditionsConfirmed:true,rates:{marketing:[{upTo:null,rate:.20}],utility:[{upTo:1000,rate:.10},{upTo:null,rate:.08}],authentication:[{upTo:1000,rate:.05},{upTo:null,rate:.04}],service:[{upTo:null,rate:0}]}};
 const volumes={marketing:11000,utility:1200,authentication:1010,service:4000};
 const scenario={volumes,market:'IN',currency:'INR',date:'2026-04-15',card};
 const result=estimateMessageCost(scenario);
 assert.deepEqual(result.categories,{marketing:2200,utility:116,authentication:50.4,service:0});assert.equal(result.meta,2366.4);assert.equal(result.total,null);assert.equal(result.tax,null);assert.equal(result.platform,null);
 for(const n of [999,1000,1001]){
  const utility=estimateMessageCost({...scenario,volumes:{...volumes,utility:n}}).categories.utility;
  assert.equal(utility,n===999?99.9:n===1000?100:100.08);
  const authentication=estimateMessageCost({...scenario,volumes:{...volumes,authentication:n}}).categories.authentication;
  assert.equal(authentication,n===999?49.95:n===1000?50:50.04);
 }
 const extra=estimateMessageCost({...scenario,volumes:{...volumes,marketing:500000,service:900000}});assert.equal(extra.categories.utility,116);assert.equal(extra.categories.authentication,50.4);
 for(const change of [{card:undefined},{card:{...card,authority:'pending'}},{card:{...card,conditionsConfirmed:false}},{currency:'USD'},{date:'2026-05-01'}])assert.equal(estimateMessageCost({...scenario,...change}).status,'unavailable');
 assert.equal(estimateMessageCost({volumes,market:'IN',currency:'INR',date:'2026-10-01'}).status,'unavailable');
 assert.equal(suppliedIndiaRateSource.effectiveFrom,'2026-10-01');assert.equal(suppliedIndiaRateSource.status,'owner-approved-future-schedule');
 assert.ok(guides.syntheticBillingCode.includes('2366.40'));assert.ok(guides.syntheticBillingRows[1][3].includes('116.00'));
});

test('three-guide canonical body and twins agree while identity/history remain held',()=>{
 const {getPostBySlug}=load('src/lib/blog/registry.ts');const {generateBlogPostMetadata}=load('src/lib/blog/metadata.ts');
 const published=['2026-01-15','2026-02-28','2026-05-22'];
 for(const [i,guide] of guides.billingGuides.entries()){
  const post=getPostBySlug(guide.slug),metadata=generateBlogPostMetadata(guide.slug),md=guideMarkdown(guide);
  assert.equal(post.title,guide.title);assert.equal(post.excerpt,guide.description);assert.equal(metadata.description,guide.description);assert.equal(metadata.openGraph.description,guide.description);assert.equal(metadata.twitter.description,guide.description);assert.equal(post.content,md);
  assert.equal(post.publishedAt,published[i]);assert.deepEqual(post.editorial.history,[]);assert.equal(post.editorial.stage,'pending-human-review');assert.deepEqual(metadata.authors,[]);
  for(const s of guide.sections){assert.ok(md.includes(s.heading));for(const p of s.paragraphs)assert.ok(md.includes(p));if(s.code)assert.ok(md.includes(s.code.text));}
  for(const f of guide.faqs)assert.ok(md.includes(f.answer));
  assert.ok(!/98%|70%|30%|35%|20%|no workaround exists|immune|February 27, 2026|research\.md/.test(md));
 }
 assert.ok(guideMarkdown(guides.migrationGuide).includes('1 December 2025'));assert.ok(guideMarkdown(guides.indiaPricingGuide).includes('₹2,366.40'));
});

test('server reading replaces unnamed controls and preserves prior meaningful anchors',()=>{
 const mock=()=>null;const avatar=load('src/components/blog/AvatarImage.tsx');
 const attribution=projectLoader(new Map([['./AvatarImage',avatar]]),transpile)('src/components/blog/ArticleAttribution.tsx');
 const renderLoad=projectLoader(new Map([['@/components/landing/Header',{Header:mock}],['@/components/landing/Footer',{Footer:mock}],['./ArticleAttribution',attribution],['./CopyArticleLink',load('src/components/blog/CopyArticleLink.tsx')]]),transpile);
 const {PlatformGuideArticle}=renderLoad('src/components/blog/PlatformGuideArticle.tsx');
 const anchors=[['guide-platform-conditions','guide-billing-conditions'],['guide-platform-conditions','migration-buying-conditions'],['guide-rate-scope','guide-categories','guide-cost-components','guide-reconciliation','guide-next-step','guide-questions','guide-related']];
 for(const [i,guide] of guides.billingGuides.entries()){
  const html=renderToStaticMarkup(createElement(PlatformGuideArticle,{guide}));assert.equal((html.match(/<h1/g)||[]).length,1);assert.ok(!/<input|opacity:0|whileInView|Invalid Date/.test(html));assert.equal((html.match(/<details/g)||[]).length,guide.faqs.length);
  const article=JSON.parse(html.match(/<script id="article-schema"[^>]*>(.*?)<\/script>/s)[1]);assert.equal(article['@type'],'Article');assert.equal(article.headline,guide.title);assert.equal(article.description,guide.description);assert.equal(article.author,undefined);
  for(const id of anchors[i])assert.ok(html.includes(`id="${id}"`));
  const related=html.split(`id="${guide.relatedId||'continue-reading'}"`)[1].split('</section>')[0];
  for(const other of guides.billingGuides.filter(g=>g.slug!==guide.slug))assert.ok(related.includes(other.title));
  assert.ok(!related.includes('whatsapp-web-6-hour-logout-rule-india-2026'));
  assert.ok(html.includes('Share on X')&&html.includes('Article link:')&&html.includes('disabled=""'));assert.ok(html.includes('Attribution pending')&&!html.includes('ui-avatars.com'));
  for(const s of guide.sections)assert.ok(html.includes(`href="#${s.id}"`)&&html.includes(`id="${s.id}"`));
  assert.equal((html.match(/<caption/g)||[]).length,guide.sections.filter(s=>s.table).length);
  assert.equal((html.match(/role="region"/g)||[]).length,guide.sections.reduce((sum,s)=>sum+Number(!!s.table)+Number(!!s.code),0));
  assert.ok(!readFileSync(`src/app/blog/${guide.slug}/page.tsx`,'utf8').includes('use client'));
 }
});
