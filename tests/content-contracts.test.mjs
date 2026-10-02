import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projectLoader } from "./helpers/load-project-module.mjs";
import { normalizedSource, inventory } from "../scripts/content-review.mjs";

const load = projectLoader();
const { contentDate, contentDates, feedItems } = load("src/lib/content/dates.ts");
const { fingerprint, publicRecord, appendHumanReview, reviewState } = load("src/lib/content/review.ts");
const pub = "2026-01-10"; const update = "2026-02-01";
test("unknown/invalid dates stay omitted; impossible dates and updates before publication are rejected", () => {
  for (const value of [undefined, "", "yesterday", "2026-02-30", "2026-13-01", "2026-01-10T25:00:00Z"]) assert.equal(contentDate(value), undefined);
  assert.deepEqual(contentDates({}), { published: undefined, modified: undefined, lastModified: undefined, feedPublished: undefined });
  assert.equal(contentDates({ publishedAt: update, updatedAt: pub }).modified, undefined);
});
test("publication, material update, review/evidence/capture dates and required feed dates stay distinct", () => {
  const initial = contentDates({ publishedAt: pub }); assert.equal(initial.modified, undefined); assert.equal(initial.lastModified, initial.published);
  const material = contentDates({ publishedAt: pub, updatedAt: update, reviewedAt: "2026-09-28", evidenceCheckedAt: "2026-09-28", mediaCapturedAt: "2026-09-28" });
  assert.equal(material.published, contentDate(pub)); assert.equal(material.modified, contentDate(update)); assert.equal(material.feedPublished, initial.feedPublished);
  assert.deepEqual(feedItems([{}, {publishedAt: pub}], true), [{publishedAt: pub}]); assert.equal(feedItems([{}]).length, 1);
});
const parts = { content: fingerprint("page"), metadata: fingerprint({title: "Title"}), media: fingerprint("image bytes and caption") };
function event(snapshot, extra = {}) { return { id: "test-human-decision", actor: "Synthetic fixture reviewer", reviewedAt: "2026-01-20", decisionSource: "fixture-only: explicit human decision", kind: "review", scope: Object.keys(snapshot), snapshot, fingerprint: fingerprint(snapshot), ...extra }; }
test("review states distinguish draft/technical/pending from actual reviewed revision and changed revision", () => {
  assert.equal(reviewState(undefined, parts), "draft");
  for (const stage of ["draft","technically-verified","pending-human-review"]) assert.equal(reviewState({stage, history: []}, parts), stage);
  const history = appendHumanReview([], event(parts));
  assert.equal(reviewState({stage:"pending-human-review",history}, parts), "reviewed-revision");
  for (const key of Object.keys(parts)) assert.equal(reviewState({stage:"pending-human-review",history}, {...parts,[key]:fingerprint("changed")}), "changed-after-review");
});
test("history is immutable and scoped addenda cannot conceal unrelated changes or rewrite old approval", () => {
  const original = event(parts); const history = appendHumanReview([], original);
  original.snapshot = {}; assert.deepEqual(history[0].snapshot, parts);
  assert.throws(() => { history[0].snapshot.media = "rewrite"; });
  assert.throws(() => appendHumanReview(history, event(parts)));
  const changed = {...parts, metadata:fingerprint("new title")};
  const addendum = event(changed, {id:"addendum",kind:"addendum",parentId:history[0].id,reviewedAt:"2026-02-01",scope:["metadata"]});
  const next = appendHumanReview(history, addendum); assert.equal(next.length,2); assert.deepEqual(next[0],history[0]); assert.equal(reviewState({stage:"pending-human-review",history:next},changed),"reviewed-revision");
  assert.throws(() => appendHumanReview(history, {...addendum,snapshot:{...changed,media:"unreviewed"},fingerprint:fingerprint({...changed,media:"unreviewed"})}));
  assert.throws(() => appendHumanReview(history, {...addendum,parentId:"wrong"}));
  assert.throws(() => appendHumanReview(history, {...addendum,reviewedAt:"2026-01-01"}));
});
test("incomplete or corrupted review evidence cannot become approval; pending facts are independent", () => {
  for (const extra of [{actor:""},{decisionSource:""},{reviewedAt:"today"},{fingerprint:"changed"},{scope:[]},{kind:"automatic-approval"},{snapshot:{content:{mutable:true}}}]) assert.throws(() => appendHumanReview([],event(parts,extra)));
  assert.equal(reviewState({stage:"technically-verified",history:[event(parts,{fingerprint:"invalid"})]},parts),"pending-human-review");
  assert.equal(reviewState({stage:"reviewed-revision",history:[]},parts),"pending-human-review");
  const history=appendHumanReview([],event(parts));
  const record={stage:"pending-human-review",history,claims:[{status:"PENDING"}]}; assert.equal(reviewState(record,parts),"reviewed-revision"); assert.equal(record.claims[0].status,"PENDING");
});
test("fingerprint excludes internal governance but includes public dates, metadata, media and captions", () => {
  const record = {title:"Title",publishedAt:pub,editorial:{history:[],evidenceCheckedAt:pub}};
  assert.equal(fingerprint(publicRecord(record)), fingerprint(publicRecord({...record,editorial:{history:["synthetic"],evidenceCheckedAt:update}})));
  assert.notEqual(fingerprint(publicRecord(record)),fingerprint(publicRecord({...record,publishedAt:update})));
  assert.equal(normalizedSource("page.ts", 'const page = {title:"Title", editorial:{ history: [] }};'), normalizedSource("page.ts", '// internal comment\nconst page={title: "Title",editorial:{history:["new review"]}};'));
  assert.equal(normalizedSource("page.ts", 'const page={title:"Title",editorial:{history:[]}};'), normalizedSource("page.ts", 'const page={title:"Title","editorial":{history:["review"]}};'));
  for (const value of ['const page={title:"Changed"};','const page={title:"Title", publishedAt:"2026-02-01"};','const page={title:"Title",image:"new.png",alt:"Evidence"};']) assert.notEqual(fingerprint(normalizedSource("page.ts",value)),fingerprint(normalizedSource("page.ts",'const page={title:"Title"};')));
});
test("current canonical inventory covers records/consumers/assets and has no fabricated human events", () => {
  const result=inventory(); assert.equal(result.records.filter(r=>r.id.startsWith("blog:")).length,12); assert.equal(result.records.filter(r=>r.id.startsWith("author:")).length,4); assert.equal(result.records.filter(r=>r.id.startsWith("plan:")).length,2);
  assert.equal(result.records.filter(r=>r.id.startsWith("legal:")).length,11); // Legal Center is a hub, not a twelfth document.
  for (const record of result.records) { assert.equal(record.state,"pending-human-review"); assert.equal(record.humanEvents,0); assert.ok(Object.keys(record.mediaHashes).length>0); assert.ok(record.parts['source:src/app/layout.tsx']); assert.ok(record.parts['source:src/app/globals.css']); assert.ok(!record.sourceHashes['src/lib/content/review.ts']); }
  const legal=result.records.find(r=>r.id==='legal:privacyDocument'); assert.ok(legal.consumers.includes('src/app/privacy/page.tsx')); assert.ok(legal.consumers.includes('src/app/legal/dpa/page.tsx'));
  for (const r of result.records.filter(r=>r.id.startsWith('blog:'))) for(const path of ['src/app/feed.xml/route.ts','src/app/api/md/[slug]/route.ts','src/app/api/mcp/pages/[slug]/route.ts','src/app/sitemap.ts']) assert.ok(r.consumers.includes(path));
  // Human history is supplied only by a human; the inventory never writes a record.
  assert.ok(!readFileSync('scripts/content-review.mjs','utf8').includes('writeFile'));
});
