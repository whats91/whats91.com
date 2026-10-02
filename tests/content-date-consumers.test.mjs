import test from "node:test";
import assert from "node:assert/strict";
import { projectLoader } from "./helpers/load-project-module.mjs";

const base = { id:"fixture",slug:"fixture",title:"Fixture",excerpt:"Fixture",content:"## Synthetic fixture body\n\nThis dated fixture provides actual reader content so date mapping is tested independently of the missing-body failure contract.",authorId:"unknown",category:"Test",tags:[],readingTime:1,seo:{title:"Fixture",description:"Fixture",keywords:[]} };
const pub="2026-01-10"; const updated="2026-02-01";
function routes(post, authorDates = {}) {
  const load=projectLoader(new Map([["@/lib/blog", {getAllPosts:()=>post?[post]:[],getPostBySlug:()=>post}],["./registry",{getPostBySlug:()=>post}],["@/lib/blog/authors",{getAuthorById:()=>undefined,getAllAuthors:()=>[{slug:"fixture",joinedAt:"2024-01-01",...authorDates}]}]]));
  return {md:load("src/app/api/md/[slug]/route.ts"),mcp:load("src/app/api/mcp/pages/[slug]/route.ts"),feed:load("src/app/feed.xml/route.ts"),sitemap:load("src/app/sitemap.ts"),metadata:load("src/lib/blog/metadata.ts"),seo:load("src/lib/seo/seo2.ts")};
}
test("actual MD/MCP handlers distinguish unknown, publication-only and material-update dates",async()=>{
  for(const dates of [{},{publishedAt:pub},{publishedAt:pub,updatedAt:updated},{publishedAt:pub,editorial:{stage:"pending-human-review",evidenceCheckedAt:updated,mediaCapturedAt:updated,history:[]}}]) {
    const post={...base,...dates};const r=routes(post);const ctx={params:Promise.resolve({slug:"blog-fixture"})};
    const md=await (await r.md.GET(new Request("http://localhost/api/md/blog-fixture"),ctx)).text();
    const mcp=await (await r.mcp.GET(new Request("http://localhost/api/mcp/pages/blog-fixture"),ctx)).json();
    assert.equal(md.includes("publishedAt:"),!!dates.publishedAt);assert.equal(md.includes("lastModified:"),!!dates.updatedAt);
    assert.equal(mcp.published_at,dates.publishedAt?`${pub}T00:00:00.000Z`:undefined);assert.equal(mcp.updated_at,dates.updatedAt?`${updated}T00:00:00.000Z`:undefined);
    assert.ok(!md.includes("editorial"));assert.ok(!("editorial" in mcp));
  }
  const r=routes(base);const staticMd=await (await r.md.GET(new Request("http://localhost/api/md/tools"),{params:Promise.resolve({slug:"tools"})})).text();assert.ok(!staticMd.includes("lastModified:"));
});
test("draft blog records cannot enter actual MD/MCP public handlers",async()=>{
  const r=routes({...base,isDraft:true,publishedAt:pub});const ctx={params:Promise.resolve({slug:"blog-fixture"})};
  assert.equal((await r.md.GET(new Request("http://localhost"),ctx)).status,404);assert.equal((await r.mcp.GET(new Request("http://localhost"),ctx)).status,404);
});
test("RSS permits undated items, derives known channel history and never substitutes review/request date",async()=>{
  for(const dates of [{},{publishedAt:pub},{publishedAt:pub,updatedAt:updated}]) {
    const xml=await (await routes({...base,...dates}).feed.GET()).text();
    assert.ok(xml.includes("<item>"));assert.equal(xml.includes("<pubDate>"),!!dates.publishedAt);assert.equal(xml.includes("<lastBuildDate>"),!!dates.publishedAt);
    if(dates.updatedAt) {assert.ok(xml.includes("<lastBuildDate>Sun, 01 Feb 2026 00:00:00 GMT</lastBuildDate>"));assert.equal((xml.match(/<pubDate>Sat, 10 Jan 2026 00:00:00 GMT<\/pubDate>/g)||[]).length,2);}
  }
  const empty=await (await routes(undefined).feed.GET()).text();assert.ok(!empty.includes("<pubDate>"));assert.ok(!empty.includes("<lastBuildDate>"));
});
test("actual metadata/schema/sitemap omit unsupported modification and profile joining dates",()=>{
  for(const dates of [{},{publishedAt:pub},{publishedAt:pub,updatedAt:updated}]) {
    const r=routes({...base,...dates});const meta=r.metadata.generateBlogPostMetadata("fixture");
    assert.equal(meta.openGraph.publishedTime,dates.publishedAt?`${pub}T00:00:00.000Z`:undefined);assert.equal(meta.openGraph.modifiedTime,dates.updatedAt?`${updated}T00:00:00.000Z`:undefined);
    const schema=r.seo.generateArticleSchema({title:"Fixture",description:"Fixture",url:"http://localhost",author:{name:"Fixture"},publishedTime:dates.publishedAt,modifiedTime:dates.updatedAt});
    assert.equal("datePublished" in schema,!!dates.publishedAt);assert.equal("dateModified" in schema,!!dates.updatedAt);
    const map=r.sitemap.default();assert.ok(!("lastModified" in map.find(row=>row.url.endsWith('/authors/fixture'))));
    assert.equal(map.find(row=>row.url.endsWith('/blog/fixture')).lastModified,dates.updatedAt?`${updated}T00:00:00.000Z`:dates.publishedAt?`${pub}T00:00:00.000Z`:undefined);
  }
});
test("supported profile content dates can be mapped without treating joining as publication",()=>{
  const map=routes(undefined,{publishedAt:pub,updatedAt:updated}).sitemap.default();
  assert.equal(map.find(row=>row.url.endsWith('/authors/fixture')).lastModified,`${updated}T00:00:00.000Z`);
});
test("canonical public list/featured/related/author lookups exclude drafts without editing original history",()=>{
  const r=projectLoader()("src/lib/blog/registry.ts");const original=r.blogPosts.map(p=>[p.slug,p.publishedAt,p.updatedAt]);
  const draft={...r.blogPosts[0],id:"draft",slug:"draft",isDraft:true};r.blogPosts.push(draft);
  try {assert.ok(!r.getAllPosts().includes(draft));assert.ok(!r.getFeaturedPosts().includes(draft));assert.ok(!r.getRelatedPosts(r.blogPosts[1].slug,100).includes(draft));assert.ok(!r.getPostsByAuthor(draft.authorId).includes(draft));assert.equal(r.getPostBySlug("draft"),undefined);} finally {r.blogPosts.pop();}
  assert.deepEqual(r.blogPosts.map(p=>[p.slug,p.publishedAt,p.updatedAt]),original);
});
