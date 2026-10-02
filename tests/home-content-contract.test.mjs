import test from "node:test";
import assert from "node:assert/strict";
import { projectLoader } from "./helpers/load-project-module.mjs";
const load = () => projectLoader(new Map([["@/lib/blog", { getAllPosts: () => [], getPostBySlug: () => undefined }]]));
for (const slug of ["home", "features"]) {
  test(`${slug} website-content twins preserve qualification, canonical URL and no invented dates`, async () => {
    const l = load(), c = l("src/lib/home-content.ts"), expected = slug === "home" ? c.homeMarkdown : c.featuresMarkdown;
    const request = new Request("http://fixture.invalid/"), params = { params: Promise.resolve({ slug }) };
    const md = await l("src/app/api/md/[slug]/route.ts").GET(request, params);
    const response = await l("src/app/api/mcp/pages/[slug]/route.ts").GET(request, params);
    const text = await md.text(), passages = await response.json();
    assert.equal(md.status, 200); assert.equal(response.status, 200);
    assert.ok(text.includes(expected)); assert.equal(passages.sections[0].content, expected);
    const url = slug === "home" ? "https://whats91.com/" : "https://whats91.com/features";
    assert.equal(passages.url, url); assert.match(md.headers.get("link"), new RegExp(url));
    for (const qualification of [c.offeringScope, c.supportScope]) assert.ok(expected.includes(qualification));
    assert.equal(passages.updated_at, undefined); assert.equal(passages.published_at, undefined);
    assert.equal(/publishedAt:|lastModified:/.test(text), false);
    assert.equal(md.headers.get("x-robots-tag"), "noindex");
    assert.equal(response.headers.get("allow"), "GET, HEAD, OPTIONS");
    if (slug === "home") for (const faq of c.homeFaqs) assert.ok(passages.sections.some(s => s.heading === faq.question && s.content === faq.answer));
  });
}
test("home and feature catalogue resources resolve to implemented read-only passages", async () => {
  const l = load(), catalogue = await (await l("src/app/api/mcp/route.ts").GET()).json();
  for (const slug of ["home", "features"]) {
    const item = catalogue.passages.pages.find(p => p.slug === slug);
    assert.ok(item); assert.equal(new URL(item.url).pathname, `/api/mcp/pages/${slug}`);
    const route = l("src/app/api/mcp/pages/[slug]/route.ts");
    const response = await route.GET(new Request("http://fixture.invalid/"), { params: Promise.resolve({ slug }) });
    assert.equal(response.status, 200); assert.ok((await response.json()).sections.length);
    const write = await route.POST(new Request(item.url, { method: "POST", body: '{"method":"tools/call"}' }));
    assert.equal(write.status, 405); assert.equal(write.headers.get("cache-control"), "no-store");
  }
  assert.equal(Object.hasOwn(catalogue, "tools"), false);
});
