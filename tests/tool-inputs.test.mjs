import test from "node:test";
import assert from "node:assert/strict";
import { projectLoader } from "./helpers/load-project-module.mjs";
const load = projectLoader();
const { internationalPhone, whatsappPayload, qrPayload, qrAppearance, numericInput, calculateROI } = load("src/lib/tool-inputs.ts");
const pricing = load("src/lib/pricing.ts"), coins = load("src/lib/partner-catalogue.ts");
const base = { type: "text", text: "", number: "", message: "", email: "", subject: "", phone: "", wifi: { ssid: "", password: "", security: "WPA" } };
const payload = (type, overrides = {}) => qrPayload({ ...base, type, ...overrides });
const assumptions = { monthlyLeads: "100", humanCostPerLead: "5", aiCostPerLead: "2", selfBuildCostPerLead: "3", aiQualificationRate: "80", selfBuildQualificationRate: "40" };

test("international phone grammar rejects lossy cleanup, empty wrappers and misplaced plus", () => {
  for (const value of ["", " ", "0", "0123456789", "12345", "1+234567890", "++1234567890", "123 4567890", "123-4567890", "1234567ext8", "1".repeat(16)]) {
    assert.equal(internationalPhone(value).ok, false); assert.equal(whatsappPayload(value, "hello").ok, false); assert.equal(payload("phone", { phone: value }).ok, false);
  }
  for (const value of ["1234567", "123456789012345", "+919876543210"]) assert.equal(internationalPhone(value).ok, true);
  assert.equal(whatsappPayload("+919876543210", " hello & नमस्ते? ").value, "https://wa.me/919876543210?text=hello%20%26%20%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%3F");
  assert.equal(payload("phone", { phone: "919876543210" }).value, "tel:+919876543210");
});
test("navigable HTTP(S) is distinct from arbitrary text; unsupported protocols never wrapped", () => {
  for (const value of ["", "https://", "httpjunk", "javascript:alert(1)", "data:text/plain,x", "mailto:a@example.com", "ftp://example.com", "https://user:pass@example.com", "https://example.com/a b"]) assert.equal(payload("url", { text: value }).ok, false);
  assert.equal(payload("url", { text: "example.com/path?x=a%26b" }).value, "https://example.com/path?x=a%26b");
  assert.equal(payload("url", { text: "HTTP://EXAMPLE.COM" }).value, "http://example.com/");
  assert.equal(payload("text", { text: " javascript:example & plain text " }).value, " javascript:example & plain text ");
  assert.equal(payload("email").ok, false); assert.equal(payload("email", { email: "a@example.com?bcc=x@example.com" }).ok, false);
  assert.equal(payload("email", { email: "fixture@example.com", subject: "a & b?" }).value, "mailto:fixture@example.com?subject=a%20%26%20b%3F");
});
test("WiFi validates required fields, byte length, security and separator escaping without logging credentials", () => {
  assert.equal(payload("wifi").ok, false);
  for (const wifi of [{ ssid: "x".repeat(33), password: "", security: "nopass" }, { ssid: "न".repeat(11), password: "", security: "nopass" }, { ssid: "Fake", password: "short", security: "WPA" }, { ssid: "Fake", password: "invalid", security: "WEP" }, { ssid: "Fake", password: "", security: "unknown" }]) assert.equal(payload("wifi", { wifi }).ok, false);
  const fake = { ssid: 'Fixture;,:"\\', password: 'Fake;,:"\\Pass', security: "WPA" };
  const result = payload("wifi", { wifi: fake }); assert.equal(result.ok, true);
  assert.ok(result.value.includes('S:Fixture\\;\\,\\:\\"\\\\;')); assert.ok(result.value.includes('P:Fake\\;\\,\\:\\"\\\\Pass;'));
  assert.equal(payload("wifi", { wifi: { ssid: "Fake", password: "ignored", security: "nopass" } }).value, "WIFI:T:nopass;S:Fake;;");
  assert.equal(payload("wifi", { wifi: { ssid: "Fake", password: "a".repeat(64), security: "WPA" } }).ok, true);
  assert.equal(payload("wifi", { wifi: { ssid: "Fake", password: "abcde", security: "WEP" } }).ok, true);
});
test("QR appearance rejects malformed colors, inverted/low contrast and unsupported dimensions", () => {
  assert.equal(qrAppearance("#000000", "#ffffff", 256), null);
  for (const args of [["black", "#ffffff", 256], ["#ffffff", "#000000", 256], ["#999999", "#aaaaaa", 256], ["#000000", "#ffffff", 0], ["#000000", "#ffffff", Infinity], ["#000000", "#ffffff", 256.5]]) assert.equal(typeof qrAppearance(...args), "string");
});
test("numeric drafts distinguish valid zero from blank, malformed, negative, fractional counts and unsafe precision", () => {
  for (const value of ["", " ", "NaN", NaN, "Infinity", Infinity, "1e400", "-1", -1, "0x10", "1e3", "12x", "9007199254740992"]) assert.equal(numericInput(value), null);
  assert.equal(numericInput("0"), 0); assert.equal(numericInput("0.25"), .25); assert.equal(numericInput("0.25", { integer: true }), null); assert.equal(numericInput("101", { max: 100 }), null);
});
test("ROI zero qualification and zero denominators are honest; signed savings and difference use correct formula", () => {
  const normal = calculateROI(assumptions); assert.equal(normal.aq, 80); assert.equal(normal.humanROI, 150); assert.equal(normal.qualifiedDifference, 100);
  const zero = calculateROI({ ...assumptions, aiQualificationRate: "0", selfBuildQualificationRate: "0" }); assert.equal(zero.aq, 0); assert.equal(zero.sq, 0); assert.equal(zero.aiPerQualified, null); assert.equal(zero.qualifiedDifference, null);
  const emptyVolume = calculateROI({ ...assumptions, monthlyLeads: "0" }); assert.equal(emptyVolume.human, 0); assert.equal(emptyVolume.humanROI, null);
  const zeroCost = calculateROI({ ...assumptions, aiCostPerLead: "0" }); assert.equal(zeroCost.ai, 0); assert.equal(zeroCost.humanROI, null);
  const losses = calculateROI({ ...assumptions, aiCostPerLead: "10" }); assert.equal(losses.monthlyHumanSaving, -500); assert.equal(losses.humanROI, -50);
});
test("ROI invalid/blank/extreme assumptions cannot create fictional totals or non-finite monetary output", () => {
  for (const field of Object.keys(assumptions)) for (const value of ["", "NaN", "Infinity", "-1", "1e400"]) assert.equal(calculateROI({ ...assumptions, [field]: value }), null);
  assert.equal(calculateROI({ ...assumptions, monthlyLeads: "1.5" }), null); assert.equal(calculateROI({ ...assumptions, aiQualificationRate: "101" }), null);
  assert.equal(calculateROI({ ...assumptions, monthlyLeads: "9007199254740991", aiCostPerLead: "9007199254740991" }), null);
  assert.ok(calculateROI({ ...assumptions, aiCostPerLead: "0.25", aiQualificationRate: "0.5" }));
});
test("commercial invalid inputs fail closed while retained valid money/GST arithmetic remains separate", () => {
  const zero = { marketing: 0, utility: 0, authentication: 0, service: 0 };
  for (const value of ["", NaN, Infinity, -1, .5, pricing.MAX_MESSAGE_COUNT + 1]) {
    const result = pricing.estimateMessageCost({ volumes: { ...zero, marketing: value }, market: "IN", date: "2026-09-28" }); assert.equal(result.meta, null); assert.equal(result.counts, null);
  }
  for (const value of [NaN, Infinity, -1, .5, 1000001]) assert.equal(coins.coinRequirement({ coexisting1y: value }, "partner"), null);
  assert.equal(coins.coinRecharge(Number.MAX_SAFE_INTEGER, 0), null);
  assert.deepEqual(coins.coinRecharge(0, 0), { required: 0, shortfall: 0, gst: 0, total: 0 });
});
