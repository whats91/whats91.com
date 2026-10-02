import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {projectLoader} from './helpers/load-project-module.mjs';
const load=projectLoader(new Map(),(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText);
const guides=load('src/lib/blog/erp-guides.ts');
const {parseExerciseCSV,checkExerciseCSV,checkSpreadsheetReference}=load('src/lib/blog/sheets-exercise.ts');

test('synthetic CSV preserves quoted commas, row shape, company/year and reconciled totals',()=>{
 assert.equal(parseExerciseCSV(guides.syntheticCSV)[1][5],'Sample Store, East');
 assert.deepEqual(checkExerciseCSV(guides.syntheticCSV),{columns:8,invoices:2,invoiced:77000,paid:10000,outstanding:67000});
 assert.deepEqual(checkExerciseCSV(guides.syntheticCSV.replaceAll('\n','\r\n')+'\r\n'),checkExerciseCSV(guides.syntheticCSV));
 assert.deepEqual(parseExerciseCSV('A,B\n"a""b","line\nwrap"'),[['A','B'],['a"b','line\nwrap']]);
 for(const [input,error] of [
  [guides.syntheticCSV.replace(guides.syntheticCSV.split('\n')[0],guides.syntheticCSV.split('\n')[0].replaceAll(',', ';')),/header/],
  [guides.syntheticCSV+'\n'+guides.syntheticCSV.split('\n')[1],/Duplicate/],
  [guides.syntheticCSV.replace('DEMO,2026-27,DEMO-002','OTHER,2026-27,DEMO-002'),/Mixed/],
  [guides.syntheticCSV.replace('2026-04-20','2026-02-30'),/date/],
  [guides.syntheticCSV.replace('32000,0','32000,=1+1'),/numeric/],
  [guides.syntheticCSV.replace('32000,0','32000,40000'),/exceeds/],
  [guides.syntheticCSV.replace('32000,0','32000'),/Incomplete/],
  [guides.syntheticCSV.replace('East"','East'),/Unclosed/],
 ])assert.throws(()=>checkExerciseCSV(input),error);
 assert.throws(()=>parseExerciseCSV('A\n"B"x'),/Unexpected/);
});
test('spreadsheet formula has the right input type and explicit prerequisite failures',()=>{
 assert.equal(checkSpreadsheetReference(guides.syntheticSpreadsheetURL,guides.syntheticRange,true,true),guides.syntheticImportRange);
 assert.throws(()=>checkSpreadsheetReference('https://example.invalid/export.csv','Raw!A1:H3',true,true),/spreadsheet URL/);
 assert.throws(()=>checkSpreadsheetReference('file:///tmp/export.csv','Raw!A1:H3',true,true),/spreadsheet URL/);
 assert.throws(()=>checkSpreadsheetReference(guides.syntheticSpreadsheetURL,'Raw!A:H',true,true),/bounded/);
 assert.throws(()=>checkSpreadsheetReference(guides.syntheticSpreadsheetURL,guides.syntheticRange,false,true),/Source access/);
 assert.throws(()=>checkSpreadsheetReference(guides.syntheticSpreadsheetURL,guides.syntheticRange,true,false),/Destination access/);
});
test('pilot explanation, canonical metadata and alternate content agree without inventing approval or history',()=>{
 const {getPostBySlug}=load('src/lib/blog/registry.ts');const {generateBlogPostMetadata}=load('src/lib/blog/metadata.ts');
 for(const guide of guides.erpGuides){
  const post=getPostBySlug(guide.slug),m=generateBlogPostMetadata(guide.slug),md=guides.guideMarkdown(guide);
  assert.equal(post.title,guide.title);assert.equal(post.excerpt,guide.description);assert.equal(m.description,guide.description);assert.equal(m.openGraph.description,guide.description);assert.equal(m.twitter.description,guide.description);assert.equal(post.content,md);
  assert.deepEqual(m.authors,[]);assert.deepEqual(post.editorial.history,[]);assert.equal(post.editorial.stage,'pending-human-review');
  assert.equal(post.publishedAt,guide===guides.sheetsGuide?'2026-03-15':'2026-01-10');
  for(const section of guide.sections){assert.ok(md.includes(section.heading));for(const p of section.paragraphs)assert.ok(md.includes(p));}
  for(const faq of guide.faqs)assert.ok(md.includes(faq.answer));
  assert.ok(!/Sharma Distributors|₹8,000|ROI:|100% automated|50% reduction|2–3 seconds/.test(md));
 }
 assert.ok(guides.guideMarkdown(guides.sheetsGuide).includes(guides.syntheticCSV));
 assert.ok(guides.guideMarkdown(guides.sheetsGuide).includes(guides.syntheticImportRange));
});
test('server article emits whole explanations, native links/disclosures and labelled overflow regions',()=>{
 const mock=()=>null;
 const avatar=load('src/components/blog/AvatarImage.tsx');
 const attribution=projectLoader(new Map([['./AvatarImage',avatar]]),(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText)('src/components/blog/ArticleAttribution.tsx');
 const renderLoad=projectLoader(new Map([['@/components/landing/Header',{Header:mock}],['@/components/landing/Footer',{Footer:mock}],['./ArticleAttribution',attribution],['./CopyArticleLink',load('src/components/blog/CopyArticleLink.tsx')]]),(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText);
 const {ERPGuideArticle}=renderLoad('src/components/blog/ERPGuideArticle.tsx');
 for(const guide of guides.erpGuides){
  const html=renderToStaticMarkup(createElement(ERPGuideArticle,{guide}));
  assert.ok(!html.includes('Invalid Date'));assert.ok(html.includes(guide===guides.sheetsGuide?'15 Mar 2026':'10 Jan 2026'));
  assert.equal((html.match(/<h1/g)||[]).length,1);assert.equal((html.match(/<meta/g)||[]).length,0);
  assert.equal((html.match(/<details/g)||[]).length,guide.faqs.length);
  for(const section of guide.sections)assert.ok(html.includes(`id="${section.id}"`)&&html.includes(`href="#${section.id}"`));
  assert.ok(html.includes('Share on X')&&html.includes('sharing/share-offsite')&&html.includes('Article link:')&&html.includes('disabled=""'));
  assert.ok(html.includes('Attribution pending')&&!html.includes('ui-avatars.com'));
  assert.ok(!/opacity:0|opacity-0|whileInView|initial=/.test(html));
  assert.equal((html.match(/<caption/g)||[]).length,guide.sections.filter(s=>s.table).length);
  assert.equal((html.match(/role="region"/g)||[]).length,guide.sections.filter(s=>s.table||s.code).length);
  const source=readFileSync(`src/app/blog/${guide.slug}/page.tsx`,'utf8');assert.ok(!source.includes('use client'));
 }
});
