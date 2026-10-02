import test from "node:test";
import assert from "node:assert/strict";
import { projectLoader } from "./helpers/load-project-module.mjs";
const { readPreferences, writePreferences, preferenceKey } = projectLoader()("src/lib/browser-preferences.ts");
const current = { version: 2, analytics: true, marketing: false, updatedAt: "2026-09-28T00:00:00.000Z" };
function storage(raw = null) { let value = raw; return { getItem: () => value, setItem: (key, next) => { assert.equal(key, preferenceKey); value = next; } }; }
test("missing and denied storage recover without a write or optional activation", () => {
  for (const access of [() => storage(), () => { throw new Error("denied getter"); }, () => ({ getItem() { throw new Error("denied read"); } })]) {
    const result = readPreferences(access); assert.notEqual(result.state, "current"); assert.equal(result.preferences.analytics, false); assert.equal(result.preferences.marketing, false);
  }
});
test("legacy choices do not widen category permission or rewrite old records", () => {
  for (const raw of ["accepted", "rejected"]) {
    const store = storage(raw); const result = readPreferences(() => store);
    assert.equal(result.state, "legacy"); assert.equal(result.preferences.analytics, false); assert.equal(result.preferences.marketing, false); assert.equal(store.getItem(), raw);
  }
});
test("malformed, unsupported and loosely typed records cannot establish a saved choice", () => {
  for (const raw of ["", "{", "null", "[]", JSON.stringify({ ...current, version: 1 }), JSON.stringify({ ...current, version: 3 }), JSON.stringify({ ...current, analytics: "false" }), JSON.stringify({ ...current, marketing: 1 }), JSON.stringify({ ...current, updatedAt: "invalid" }), JSON.stringify({ version: 2, analytics: true, marketing: true })]) {
    const result = readPreferences(() => storage(raw)); assert.equal(result.state, "invalid"); assert.equal(result.preferences.analytics, false); assert.equal(result.preferences.marketing, false);
  }
});
test("current typed preferences preserve individual choices without creating consent for a provider", () => {
  for (const analytics of [false, true]) for (const marketing of [false, true]) {
    const preferences = { ...current, analytics, marketing }; assert.deepEqual(readPreferences(() => storage(JSON.stringify(preferences))), { state: "current", preferences });
  }
});
test("confirmed write stores only category choices/version/time and can be reread", () => {
  const store = storage(); const result = writePreferences(() => store, current);
  assert.equal(result.persisted, true); assert.deepEqual(Object.keys(JSON.parse(store.getItem())).sort(), ["analytics", "marketing", "updatedAt", "version"]);
  assert.deepEqual(readPreferences(() => store).preferences, result.preferences);
});
test("denied, quota, silent-ignore and unreadable-after-write cannot claim persistence", () => {
  for (const access of [() => { throw new Error("denied"); }, () => ({ getItem: () => null, setItem() { throw new Error("quota"); } }), () => ({ getItem: () => null, setItem() {} }), () => ({ getItem() { throw new Error("readback"); }, setItem() {} })]) {
    const result = writePreferences(access, current); assert.equal(result.persisted, false); assert.equal(result.preferences.analytics, true); assert.equal(result.preferences.marketing, false);
  }
});
test("write failure preserves an existing record and does not coerce strings into approvals", () => {
  const previous = JSON.stringify({ ...current, analytics: false });
  const result = writePreferences(() => ({ getItem: () => previous, setItem() { throw new Error("blocked"); } }), { analytics: "true", marketing: "false" });
  assert.equal(result.persisted, false); assert.equal(result.preferences.analytics, false); assert.equal(result.preferences.marketing, false);
});
