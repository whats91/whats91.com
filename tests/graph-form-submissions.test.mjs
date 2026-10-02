import test from "node:test";
import assert from "node:assert/strict";
import { projectLoader } from "./helpers/load-project-module.mjs";

const { graphSubmissionBody, newGraphSubmissionKey, submitGraphForm, graphFormSubmissionUrl } = projectLoader()("src/lib/graph-form-submissions.ts");

test("Graph contact and demo requests use the strict public fields contract", () => {
  const common = { name: "Fixture", email: "fixture@example.test", phone: "+919876543210" };
  assert.deepEqual(graphSubmissionBody("contact", { ...common, company: "Example", subject: "General Inquiry", message: "Please contact our team." }, "captcha"), {
    formType: "contact", fields: { ...common, company: "Example", subject: "General Inquiry", message: "Please contact our team." }, source: "contact-page", recaptchaToken: "captcha",
  });
  assert.deepEqual(graphSubmissionBody("demo", { ...common, source: "popup", subject: "ignored" }, "captcha"), {
    formType: "demo", fields: common, source: "popup", recaptchaToken: "captcha",
  });
});

test("Graph forwarding pins the endpoint and carries a reusable high-entropy key", async () => {
  const originalFetch = globalThis.fetch;
  let call;
  globalThis.fetch = async (...args) => { call = args; return new Response("{}", { status: 201 }); };
  try {
    const key = newGraphSubmissionKey();
    const signal = new AbortController().signal;
    const response = await submitGraphForm("demo", { name: "Fixture", email: "fixture@example.test", phone: "+919876543210" }, "captcha", key, signal);
    assert.equal(response.status, 201);
    assert.equal(call[0], graphFormSubmissionUrl);
    assert.equal(call[1].headers["Idempotency-Key"], key);
    assert.equal(call[1].signal, signal);
    assert.equal(call[1].redirect, "error");
    assert.deepEqual(JSON.parse(call[1].body), graphSubmissionBody("demo", { name: "Fixture", email: "fixture@example.test", phone: "+919876543210" }, "captcha"));
    await assert.rejects(submitGraphForm("demo", {}, "captcha", "short", signal));
  } finally { globalThis.fetch = originalFetch; }
});

test("contact and demo client submissions make one Graph POST and accept only an opaque receipt", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (...args) => { calls.push(args); return Response.json({ success: true, code: "RECEIVED", data: { id: `receipt_${calls.length}` } }, { status: 201 }); };
  try {
    const client = projectLoader(new Map([["@/lib/recaptcha-client", { executeRecaptcha: async () => "synthetic-captcha" }]]))("src/lib/enquiry-client.ts");
    const signal = new AbortController().signal;
    const contactFields = { name: "Fixture", email: "fixture@example.test", subject: "General Inquiry", message: "Please contact our team." };
    const demoFields = { name: "Fixture", email: "fixture@example.test", phone: "+919876543210", source: "popup" };
    assert.deepEqual(await client.submitEnquiry("contact", contactFields, newGraphSubmissionKey(), signal), { success: true, data: { id: "receipt_1" } });
    assert.deepEqual(await client.submitEnquiry("demo", demoFields, newGraphSubmissionKey(), signal), { success: true, data: { id: "receipt_2" } });
    assert.equal(calls.length, 2);
    assert(calls.every(([url, options]) => url === graphFormSubmissionUrl && options.method === "POST"));
    assert.deepEqual(calls.map(([, options]) => JSON.parse(options.body).formType), ["contact", "demo"]);
  } finally { globalThis.fetch = originalFetch; }
});

test("Graph errors keep fields private and an uncertain retry reuses the same key", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (...args) => {
    calls.push(args);
    return calls.length === 1
      ? Response.json({ success: false, code: "ACCEPTANCE_UNCONFIRMED", message: "private server detail" }, { status: 503 })
      : Response.json({ success: true, code: "RECEIVED", data: { id: "same-receipt" } }, { status: 200 });
  };
  try {
    const client = projectLoader(new Map([["@/lib/recaptcha-client", { executeRecaptcha: async () => "synthetic-captcha" }]]))("src/lib/enquiry-client.ts");
    const signal = new AbortController().signal, key = newGraphSubmissionKey();
    const first = await client.submitEnquiry("demo", { name: "Fixture" }, key, signal);
    assert.equal(first.uncertain, true);
    assert.doesNotMatch(first.message, /private server detail/);
    const second = await client.submitEnquiry("demo", { name: "Fixture" }, key, signal);
    assert.deepEqual(second, { success: true, data: { id: "same-receipt" } });
    assert.deepEqual(calls.map(([, options]) => options.headers["Idempotency-Key"]), [key, key]);
  } finally { globalThis.fetch = originalFetch; }
});

test("Graph validation errors map nested fields without echoing provider messages", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ success: false, code: "INVALID_FIELDS", errors: [{ path: ["fields", "email"], message: "private address" }] }, { status: 400 });
  try {
    const client = projectLoader(new Map([["@/lib/recaptcha-client", { executeRecaptcha: async () => "synthetic-captcha" }]]))("src/lib/enquiry-client.ts");
    const result = await client.submitEnquiry("contact", {}, newGraphSubmissionKey(), new AbortController().signal);
    assert.equal(result.uncertain, false);
    assert.deepEqual(result.fieldErrors, { email: "Check your email address." });
    assert.doesNotMatch(JSON.stringify(result), /private address/);
  } finally { globalThis.fetch = originalFetch; }
});
