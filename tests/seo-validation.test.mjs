import test from "node:test";
import assert from "node:assert/strict";
import { parseDocument, textContent, metadata, schemas, inventory, identity, internalLinks, exitCode, fetchEvidence } from "../scripts/seo-validation/evidence.mjs";
import { validate, reportExitCode } from "../scripts/seo-validation/run.mjs";

const origin = "https://whats91.com";
const bootstrap = (build = "fixture-build") => `<script>self.__next_f.push(${JSON.stringify([1, `0:${JSON.stringify({ b: build, c: ["", ""], f: [] })}\n`])})</script>`;
const page = (body = "", build = "fixture-build") => `<!doctype html><html><head><title>Fixture &amp; example</title><link href='${origin}/' REL='canonical'><meta content='Description' name='description'><meta content='Title' property='og:title'><meta content='${origin}/og.png' property='og:image'><meta content='summary' name='twitter:card'></head><body><h1>Fixture &amp; example</h1>${body}${bootstrap(build)}</body></html>`;
const schema = (data) => `<script nonce='fixture' TYPE='application/ld+json'>${typeof data === "string" ? data : JSON.stringify(data)}</script>`;
const goodSchema = { "@context": "https://schema.org", "@type": "WebPage", name: "Fixture" };
const sitemap = (urls) => `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;
const response = (body, status = 200, type = "text/html") => new Response(body, { status, headers: { "content-type": type } });
const fake = (overrides = {}) => async (url) => {
  const path = new URL(url).pathname;
  if (Object.hasOwn(overrides, path)) return overrides[path]();
  if (path === "/") return response(page(`<a href='/'>Home</a>${schema(goodSchema)}`));
  if (path === "/sitemap.xml") return response(sitemap([`${origin}/`]), 200, "application/xml");
  throw new Error(`Unexpected fixture request ${path}`);
};
const options = { base: "http://127.0.0.1:4305", expected: "fixture-build", mode: "crawl" };

test("one-line HTML counts elements, attribute order/case/quotes and encoded text", () => {
  const html = page(); assert.equal(html.includes("\n"), false);
  const doc = parseDocument(html); assert.deepEqual(doc.errors, []);
  assert.equal(exitCode(metadata(doc, `${origin}/`)), 0);
  const duplicate = parseDocument(html.replace("</head>", `<link rel="canonical" href="${origin}/"></head>`));
  assert.equal(metadata(duplicate, `${origin}/`).find((r) => r.check === "canonical").detail.count, 2);
  assert.equal(exitCode(metadata(duplicate, `${origin}/`)), 1);
});
test("missing canonical, missing/duplicate H1, empty metadata and wrong canonical fail", () => {
  for (const html of [page().replace(/<link[^>]+>/, ""), page().replace(/<h1>.*?<\/h1>/, ""), page("<h1>Second</h1>"), page().replace("content='Description'", "content=''"), page().replace(`href='${origin}/'`, `href='${origin}/wrong'`), page().replace(`href='${origin}/'`, "href='/'")]) assert.equal(exitCode(metadata(parseDocument(html), `${origin}/`)), 1);
});
test("comments, raw scripts and templates are not body evidence or fake elements", () => {
  const d = parseDocument(page(`<!-- <h1>Fake</h1> --><script>const x='<h1>Fake</h1>';</script><template>Hidden question</template><span hidden>Hidden answer</span>`));
  assert.equal(d.elements.filter((n) => n.tag === "h1").length, 1);
  assert.equal(textContent(d.root, true).includes("Hidden"), false);
});
test("sitemap rejects empty inventory, duplicate URL, wrong origin and non-HTML URLs", () => {
  for (const xml of ["", sitemap([]), sitemap([`${origin}/`, `${origin}/`]), sitemap(["https://evil.example/"]), sitemap([`${origin}/api/mcp`]), "<urlset><url></url></urlset>", "<sitemapindex></sitemapindex>"]) assert.throws(() => inventory(xml));
  assert.deepEqual(inventory(sitemap([`${origin}/`, `${origin}/pricing`])), [`${origin}/`, `${origin}/pricing`]);
});
test("schema parses reordered script attributes; bad JSON and meaningless roots fail independently", () => {
  assert.equal(exitCode(schemas(parseDocument(page(schema(goodSchema))), "/").rows), 0);
  for (const value of ["{broken", "null", "{}", "[]", '{"@context":"https://schema.org","@type":"WebPage"}', '{"@context":"https://schema.org","@type":"WebPage","bogus":"value"}', '{"@context":"https://schema.org","@type":[null],"name":"value"}', '{"@context":"https://schema.org","@graph":[]}']) {
    const rows = schemas(parseDocument(page(schema(value))), "/").rows;
    assert.equal(exitCode(rows), 1, value);
    if (value !== "{broken") assert.equal(rows.find((r) => r.check === "schema-json-syntax").status, "pass", "Valid JSON must not masquerade as meaningful schema");
  }
  assert.equal(exitCode(schemas(parseDocument(page()), "/").rows), 1);
});
test("FAQ only in JSON or hidden/server bootstrap fails content consistency", () => {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Question & answer?", acceptedAnswer: { "@type": "Answer", text: "Evidence answer." } }] };
  const check = (body) => schemas(parseDocument(page(body + schema(faq))), "/").rows;
  assert.equal(exitCode(check("<h2>Question &amp; answer?</h2><p>Evidence answer.</p>")), 0);
  assert.equal(exitCode(check("")), 1);
  assert.equal(exitCode(check("<p hidden>Question &amp; answer? Evidence answer.</p>")), 1);
  const collapsed = check("<button data-slot='accordion-trigger' aria-expanded='false'>Question &amp; answer?</button>");
  assert.equal(collapsed.find((r) => r.check === "faq-content-consistency").status, "not-checked");
  assert.equal(check("<button>Question &amp; answer?</button>").find((r) => r.check === "faq-content-consistency").status, "not-checked", "Custom question control requires expansion evidence too");
  assert.equal(check("<h2>Question &amp; answer?</h2>").find((r) => r.check === "faq-content-consistency").status, "fail", "Absent answer without matching collapsed control is a mismatch");
});
test("declared filtered FAQ contract reports inactive entries not-checked without hiding empty inventory", () => {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ["Visible", "Filtered"].map((name) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: "Answer" } })) };
  const d = parseDocument(page("<button>Visible</button>" + schema(faq)));
  assert.equal(schemas(d, "/faq", { filteredFaqs: true }).rows.filter((r) => r.check === "faq-content-consistency").every((r) => r.status === "not-checked"), true);
  assert.equal(schemas(parseDocument(page(schema(faq))), "/faq", { filteredFaqs: true }).rows.some((r) => r.status === "fail"), true);
});
test("graph duplicate IDs and unresolved local references fail; nested definitions resolve", () => {
  const graph = (nodes) => schemas(parseDocument(page(schema({ "@context": "https://schema.org", "@graph": nodes }))), "/").rows;
  const node = { "@type": "WebPage", "@id": `${origin}/#page`, name: "Fixture", publisher: { "@id": `${origin}/#org` } };
  assert.equal(exitCode(graph([node])), 1);
  const org = { "@type": "Organization", "@id": `${origin}/#org`, name: "Fixture" };
  assert.equal(exitCode(graph([node, org])), 0);
  assert.equal(exitCode(graph([node, org, org])), 1);
});
test("build identity uses decoded bootstrap, rejects wrong/missing/conflicting IDs", () => {
  assert.equal(identity(parseDocument(page()), "fixture-build", "/").status, "pass");
  assert.equal(identity(parseDocument(page()), "other-build", "/").status, "fail");
  assert.equal(identity(parseDocument(`<p>fixture-build</p>${schema({ b: "fixture-build" })}`), "fixture-build", "/").status, "unavailable");
  assert.equal(identity(parseDocument(page(bootstrap("other-build"))), "fixture-build", "/").status, "fail");
});
test("internal anchors include root/absolute same-site/query paths but exclude external and fragments from requests", () => {
  const links = internalLinks(parseDocument(page(`<a HREF='/'>Home</a><a href='${origin}/pricing?x=1&amp;y=2#faq'>Pricing</a><a href='https://other.example/'>Other</a><a href='/api/mcp'>MCP</a>`)), `${origin}/`);
  assert.deepEqual(links, ["/", "/pricing?x=1&y=2"]);
});
test("checked fetch rejects 404, empty, wrong media, redirects and connection errors", async () => {
  for (const fn of [async () => response("404", 404), async () => response("  "), async () => response("{}", 200, "application/json"), async () => response("redirect", 302), async () => { throw new Error("ECONNREFUSED"); }]) await assert.rejects(fetchEvidence("http://fixture/", { fetchImpl: fn, type: /text\/html/ }));
  assert.equal((await fetchEvidence("http://fixture/", { fetchImpl: async () => response("Good") })).body, "Good");
});
test("timeout covers both request and body stalls", async () => {
  await assert.rejects(fetchEvidence("http://fixture/", { fetchImpl: () => new Promise(() => {}), timeoutMs: 10 }), /Timeout/);
  await assert.rejects(fetchEvidence("http://fixture/", { fetchImpl: async () => ({ status: 200, headers: new Headers(), text: () => new Promise(() => {}) }), timeoutMs: 10 }), /Timeout/);
});
test("known-good run succeeds; wrong build stops before sitemap; absent expected ID cannot pass", async () => {
  assert.equal(reportExitCode(await validate({ ...options, fetchImpl: fake() })), 0);
  const bad = await validate({ ...options, expected: "wrong", fetchImpl: fake() });
  assert.equal(reportExitCode(bad), 1); assert.equal(bad.requests.length, 1);
  assert.equal(bad.rows.find((r) => r.check === "crawl").status, "not-checked");
  assert.equal(reportExitCode(await validate({ ...options, expected: "", fetchImpl: fake() })), 1);
});
test("empty/error sitemap and failed/empty page never pass through the orchestrator", async () => {
  for (const handler of [() => response(sitemap([]), 200, "application/xml"), () => response("Not found", 404), () => response("", 200, "application/xml"), () => { throw new Error("connection lost"); }]) assert.equal(reportExitCode(await validate({ ...options, fetchImpl: fake({ "/sitemap.xml": handler }) })), 1);
  for (const handler of [() => response("Missing", 404), () => response(""), () => response(page("", "other-build"))]) assert.equal(reportExitCode(await validate({ ...options, fetchImpl: fake({ "/sitemap.xml": () => response(sitemap([`${origin}/pricing`]), 200, "application/xml"), "/pricing": handler }) })), 1);
});
test("empty link inventory fails and broken discovered link fails", async () => {
  assert.equal(reportExitCode(await validate({ ...options, mode: "links", fetchImpl: fake({ "/": () => response(page()) }) })), 1);
  assert.equal(reportExitCode(await validate({ ...options, mode: "links", fetchImpl: fake({ "/": () => response(page("<a href='/broken'>Broken</a>")), "/broken": () => response("404", 404) }) })), 1);
});
test("endpoint checks fail on absent/error/empty evidence and never restore scoring", async () => {
  for (const handler of [() => response("", 200, "text/plain"), () => response("Not found", 404, "text/plain")]) {
    const report = await validate({ ...options, mode: "endpoints", fetchImpl: fake({ "/robots.txt": handler }) });
    assert.equal(reportExitCode(report), 1);
    assert.equal(report.rows.find((r) => r.check === "robots-policy").status, "unavailable");
    assert.equal(report.rows.find((r) => r.check === "remote-seo-scoring").status, "unavailable");
  }
});
test("all-not-checked/empty result sets fail, informational not-checked does not erase a checked pass", () => {
  assert.equal(exitCode([]), 1);
  assert.equal(exitCode([{ status: "not-checked" }]), 1);
  assert.equal(exitCode([{ status: "unavailable" }]), 1);
  assert.equal(exitCode([{ status: "pass" }, { status: "not-checked" }]), 0);
});

test("native closed FAQ disclosures remain unverified, open content is checked, and stray summaries are not controls", () => {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ["Visible", "Filtered"].map(name => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: "Evidence answer" } })) };
  const check = body => schemas(parseDocument(page(body + schema(faq))), "/faq", { filteredFaqs: true }).rows.filter(r => r.check === "faq-content-consistency");
  const closed = check("<details><summary>Visible</summary><p>Evidence answer</p></details>");
  assert.deepEqual(closed.map(r => r.status), ["not-checked", "not-checked"]);
  assert.equal(closed[0].detail.answerFound, false);
  assert.equal(check("<details><summary>Visible<span aria-hidden='true'>+</span></summary><p>Evidence answer</p></details>")[0].status, "not-checked");
  assert.equal(check("<details><summary>Visible+</summary><p>Evidence answer</p></details>")[0].status, "fail");
  const open = check("<details open><summary>Visible</summary><p>Evidence answer</p></details>");
  assert.equal(open[0].status, "pass");
  assert.equal(open[1].status, "not-checked");
  assert.equal(check("<summary>Visible</summary>")[0].status, "fail");
  assert.equal(check("<details><summary>Different</summary><p hidden>Visible Evidence answer</p></details>")[0].status, "fail");
});
