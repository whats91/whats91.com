import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import ts from 'typescript';
import { projectLoader } from './helpers/load-project-module.mjs';
const load = projectLoader(new Map(), (filename, source) => ts.transpileModule(source, { fileName: filename, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText);
test('pending author records retain their link identities but cannot supply Person or social claims', () => {
 const {authors,getAllAuthors}=load('src/lib/blog/authors.ts'),{authorLinks}=load('src/lib/blog/author-links.ts');
 assert.equal(authors.length,4);
 assert.deepEqual(authorLinks.map(a=>[a.id,a.slug]).sort(),authors.map(a=>[a.id,a.slug]).sort());
 const before=authors.map(a=>a.id);getAllAuthors();assert.deepEqual(authors.map(a=>a.id),before);
 assert.ok(authors.every(a=>a.publicUse==='pending' && a.editorial.history.length===0));
 const {generateAuthorSchema,generateArticleSchema}=load('src/lib/seo/seo2.ts');
 const pending={name:'Fixture Name',role:'Fixture role',bio:'Fixture biography',social:{linkedin:'https://example.invalid/company'}};
 assert.equal(generateAuthorSchema(pending),undefined);
 assert.equal(generateArticleSchema({title:'Fixture',description:'Fixture',url:'https://example.invalid/article',author:pending}).author,undefined);
 const approved={...pending,publicUse:'approved'};
 assert.equal(generateAuthorSchema(approved).name,pending.name);
 assert.equal(generateArticleSchema({title:'Fixture',description:'Fixture',url:'https://example.invalid/article',author:approved}).author.name,pending.name);
});
test('metadata and RSS omit unapproved attribution without substituting an entity or date', async () => {
 const {blogPosts}=load('src/lib/blog/registry.ts'),{generateBlogPostMetadata}=load('src/lib/blog/metadata.ts');
 for(const post of blogPosts){const m=generateBlogPostMetadata(post.slug);assert.deepEqual(m.authors,[]);assert.equal(m.openGraph.authors,undefined);assert.ok(m.openGraph.images.length);}
 const {GET}=projectLoader(new Map([['@/lib/blog',load('src/lib/blog/registry.ts')]]))('src/app/feed.xml/route.ts');const xml=await (await GET()).text();
 assert.ok(!/<(?:author|dc:creator|managingEditor|webMaster)>/.test(xml));
 assert.equal((xml.match(/<item>/g)||[]).length,blogPosts.length);
 assert.ok(xml.includes('<language>en-IN</language>'));
});
test('local initials survive absent, external and failing image URLs in server HTML without image requests', () => {
 const {AvatarImage}=load('src/components/blog/AvatarImage.tsx');
 for(const src of [undefined,'/missing-avatar.png','https://example.invalid/avatar?name=Fixture']) {
  const html=renderToStaticMarkup(createElement(AvatarImage,{src,name:'Fixture Verylongsurname'.repeat(25),alt:'Fixture'}));
  assert.ok(!html.includes('<img')&&!html.includes('example.invalid')&&!html.includes('missing-avatar'));
  assert.ok(html.includes('data-avatar-fallback="local-initials"')&&html.includes('aria-hidden="true"'));
 }
 const blank=renderToStaticMarkup(createElement(AvatarImage,{name:' ',alt:''}));assert.ok(blank.includes('>?<'));
 const local=renderToStaticMarkup(createElement(AvatarImage,{name:'DSG',alt:''}));assert.ok(local.includes('>DSG<'));
});

test('empty recruiting categories have a useful status without advertising a vacancy or application', () => {
 const componentLoad=projectLoader(new Map(['button','card','badge'].map(name=>['@/components/ui/'+name,load('src/components/ui/'+name+'.tsx')])), (filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText);
 const {OpenPositionsClient}=componentLoad('src/app/careers/OpenPositionsClient.tsx');
 const html=renderToStaticMarkup(createElement(OpenPositionsClient,{roles:[]}));
 assert.ok(html.includes('No role categories found') && html.includes('role categories') && html.includes('role="status"'));
 assert.ok(!html.includes('Apply Now') && !html.includes('days ago'));
 const long=renderToStaticMarkup(createElement(OpenPositionsClient,{roles:[{id:99,title:'Synthetic extremely long role category '.repeat(20),department:'engineering'}]}));
 assert.ok(long.includes('aria-expanded="false"') && long.includes('availability details') && !long.includes('Application for'));
});
