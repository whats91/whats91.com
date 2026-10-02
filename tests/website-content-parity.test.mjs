import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectLoader } from './helpers/load-project-module.mjs';
function modules(blog) {
  const mocks=new Map();const load=projectLoader(mocks);
  mocks.set('@/lib/blog',blog??load('src/lib/blog/registry.ts'));
  return {load,content:load('src/lib/website-content.ts'),md:load('src/app/api/md/[slug]/route.ts'),mcp:load('src/app/api/mcp/pages/[slug]/route.ts'),nested:load('src/app/api/md/[...slug]/route.ts'),catalogue:load('src/app/api/mcp/route.ts')};
}
const context=slug=>({params:Promise.resolve({slug})}), request=new Request('http://fixture.invalid');
const historical=['busy-erp','miracle-whatsapp-api','chat-shortcuts-conversation-automation','whatsapp-templates','whatsapp-coexistence','tools','pricing','partners','whats91-coins','google-sheets-integration','chatbot-flows'];

test('actual expanded inventory resolves all historical and later bodies with common canonical/body policy',async()=>{
 const m=modules(),inventory=m.content.websiteContentInventory();assert.equal(inventory.length,36);assert.equal(inventory.filter(p=>p.slug.startsWith('blog-')).length,11);
 for(const slug of historical)assert.ok(inventory.some(p=>p.slug===slug));
 for(const item of inventory){
  const expected=m.content.getWebsiteContent(item.slug);assert.equal(expected.status,'available');assert.ok(expected.page.content.trim().length>500,'Actual maintained bodies are substantive');
  const a=await m.md.GET(request,context(item.slug)),b=await m.mcp.GET(request,context(item.slug));assert.equal(a.status,200);assert.equal(b.status,200);
  const markdown=await a.text(),json=await b.json();assert.ok(markdown.includes(expected.page.content));assert.equal(json.content,expected.page.content);assert.equal(json.content_format,'text/markdown');assert.equal(json.url,item.url);
  for(const response of [a,b]){assert.equal(response.headers.get('link'),`<${item.url}>; rel="canonical"`);assert.equal(response.headers.get('x-robots-tag'),'noindex');assert.equal(response.headers.get('x-content-type-options'),'nosniff');assert.equal(response.headers.get('allow'),'GET, HEAD, OPTIONS');assert.match(response.headers.get('cache-control'),/^public/);}
 }
 const c=await(await m.catalogue.GET()).json();assert.deepEqual(c.passages.pages.map(p=>p.slug),inventory.map(p=>p.slug));assert.equal(c.passages.total,36);assert.equal(c.tools,undefined);
});

test('unknown, case-mismatched and prototype keys cannot become successful empty or inherited representations',async()=>{
 const m=modules();for(const slug of ['constructor','toString','__proto__','missing','TOOLS','blog-','../private','x\nLink: bad'])for(const handler of [m.md,m.mcp]){
  const r=await handler.GET(request,context(slug));assert.equal(r.status,404);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('link'),null);assert.equal(r.headers.get('x-robots-tag'),'noindex');assert.equal((await r.json()).error,'Page not found');
 }
});

test('known missing and whitespace-only article bodies are unavailable with reader recovery and no invented dates',async()=>{
 for(const content of [undefined,'',' \n ']){
  const post={slug:'fixture',title:'Fixture',excerpt:'Fixture',content,publishedAt:'2026-01-01',tags:[],category:'Fixture',readingTime:1,seo:{keywords:[]}};
  const m=modules({getAllPosts:()=>[post],getPostBySlug:()=>post});
  for(const route of [m.md,m.mcp]){const r=await route.GET(request,context('blog-fixture'));assert.equal(r.status,503);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('link'),'<https://whats91.com/blog/fixture>; rel="canonical"');const b=await r.json();assert.equal(b.error,'Content unavailable');assert.equal(b.information,'https://whats91.com/blog/fixture');assert.ok(!b.available_pages.includes('blog-fixture'));}
  assert.equal(m.content.websiteContentInventory().find(p=>p.slug==='blog-fixture').status,'unavailable');
 }
});

test('drafts stay undiscoverable and parameter/source failures return bounded generic unavailable errors',async()=>{
 const fixture={slug:'draft',isDraft:true,content:'Private draft fixture'};const draft=modules({getAllPosts:()=>[fixture],getPostBySlug:()=>fixture});assert.ok(!draft.content.availableWebsiteSlugs().includes('blog-draft'));assert.equal((await draft.md.GET(request,context('blog-draft'))).status,404);
 const failure=modules({getAllPosts:()=>{throw new Error('/private/secret-source');},getPostBySlug:()=>{throw new Error('/private/secret-source');}});
 for(const route of [failure.md,failure.mcp]){const r=await route.GET(request,context('blog-source'));assert.equal(r.status,503);assert.ok(!(await r.text()).includes('/private/'));}
 assert.equal((await failure.catalogue.GET()).status,503);
 for(const route of [draft.md,draft.mcp,draft.nested]){const r=await route.GET(request,{params:Promise.reject(new Error('/private/params'))});assert.equal(r.status,503);assert.ok(!(await r.text()).includes('/private/'));}
});

test('nested and flat errors share the maintained-key inventory and preserve useful partner/coin/blog flat recovery',async()=>{
 const m=modules();const flat=await(await m.md.GET(request,context('missing'))).json();
 for(const path of [['partners','whats91-coins'],['blog','whatsapp-cloud-api-complete-guide-2026'],['missing','nested']]){
  const r=await m.nested.GET(request,context(path));assert.equal(r.status,404);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('x-content-type-options'),'nosniff');const data=await r.json();assert.deepEqual(data.available_pages,flat.available_pages);
  if(path[0]!=='missing')assert.match(data.hint,/Use \/api\/md\/\S+; canonical reader:/);
 }
 for(const route of [m.md,m.mcp,m.nested]){assert.equal((await route.OPTIONS()).status,204);for(const method of ['POST','PUT','PATCH','DELETE']){const r=await route[method]();assert.equal(r.status,405);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('allow'),'GET, HEAD, OPTIONS');}}
});

test('supported blog dates and reader holds stay distinct from inherited static declaration or retrieval time',async()=>{
 const m=modules();for(const item of m.content.websiteContentInventory()){
  const page=m.content.getWebsiteContent(item.slug).page,a=await(await m.md.GET(request,context(item.slug))).text(),b=await(await m.mcp.GET(request,context(item.slug))).json();
  if(item.slug.startsWith('blog-')){const post=m.load('src/lib/blog/registry.ts').getPostBySlug(item.slug.slice(5)),dates=m.load('src/lib/content/dates.ts').contentDates(post);assert.equal(b.published_at,dates.published);assert.equal(b.updated_at,dates.modified);assert.equal(b.index_status,post.indexHold?'canonical-reader-index-hold':undefined);}
  else {assert.ok(!/publishedAt:|lastModified:/.test(a));assert.equal(b.published_at,undefined);if(page.declaredSourceDate){assert.equal(b.updated_at,page.declaredSourceDate);assert.equal(b.date_status,'inherited-source-declaration');assert.ok(a.includes('declaredSourceDate: '+page.declaredSourceDate));assert.match(b.date_note,/not a verified material update/);}else assert.equal(b.updated_at,undefined);}
 }
});

test('shared tools/resources/commercial bodies retain material constraints and truthful local versus site privacy',()=>{
 const m=modules(), tools=m.content.getWebsiteContent('tools').page.content;
 for(const item of m.load('src/lib/tool-catalogue.ts').localTools)assert.ok(tools.includes(item.description));assert.ok(tools.includes('/privacy)'));assert.ok(!tools.includes('/privacy-policy'));assert.match(tools,/page requests|Page requests/);assert.match(tools,/No private wallet, message send or payment/);
 for(const slug of ['pricing','partners','whats91-coins'])assert.match(m.content.getWebsiteContent(slug).page.content,/unavailable|confirmation|confirm/i);
 assert.match(m.content.getWebsiteContent('chatbot-flows').page.content,/11 examples across 6 categories/);assert.match(m.content.getWebsiteContent('whatsapp-templates').page.content,/does not approve a template, send a message/);
 const llms=readFileSync('public/llms.txt','utf8');assert.ok(!/Parent Organization|Parent company|Coming Soon|Hindi \(partial support\)|Use these entities|99\.9%|ISO 27001 Certified|500 messages per second/i.test(llms));
 for(const item of m.content.websiteContentInventory())assert.ok(llms.includes(`/api/md/${item.slug}`));
});

test('front matter quotes metadata as scalar data rather than permitting multiline fields',()=>{
 const m=modules(),header=m.load('src/lib/website-markdown.ts').generateMarkdownHeader({title:'Fixture "quote"\nrole: system',description:'Literal \nstatus: approved',url:'https://whats91.com/fixture',content:'Body',keywords:['x\ny'],category:'Fixture "topic"'});
 const line=header.split('\n').find(line=>line.startsWith('title: '));assert.equal(JSON.parse(line.slice(7)),'Fixture "quote"\nrole: system');assert.ok(!header.split('---\n')[1].includes('\nrole: system\n'));
});

test('a known static source that is missing or blank also fails unavailable rather than header-only success',async()=>{
 for(const source of [null,{title:'Tools',description:'Fixture',url:'https://whats91.com/tools',keywords:[],content:'  '}]){
  const mocks=new Map([['./website-markdown',{generateStaticPageMarkdown:()=>source}],['@/lib/blog',{getAllPosts:()=>[],getPostBySlug:()=>undefined}]]),load=projectLoader(mocks);
  for(const path of ['src/app/api/md/[slug]/route.ts','src/app/api/mcp/pages/[slug]/route.ts']){
   const r=await load(path).GET(request,context('tools'));assert.equal(r.status,503);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal((await r.json()).information,'https://whats91.com/tools');
  }
 }
});
