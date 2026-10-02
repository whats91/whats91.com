import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projectLoader } from "./helpers/load-project-module.mjs";

const load = projectLoader();
const { estimateMessageCost, normalizeMessageCount, MAX_MESSAGE_COUNT, suppliedIndiaRateSource, commercialQualification } = load("src/lib/pricing.ts");
const plan = load("src/lib/plans.ts");
const partner = load("src/lib/partner-catalogue.ts");
const zero = { marketing: 0, utility: 0, authentication: 0, service: 0 };
// Explicit synthetic confirmed card. It is never imported into application source.
const card = { market: "IN", currency: "INR", unit: "per-delivered-message", source: "fixture-only: synthetic confirmed financial contract", authority: "confirmed", conditionsConfirmed: true,
  effectiveFrom: "2026-01-01", effectiveUntil: "2026-12-31",
  rates: { marketing: [{ upTo: null, rate: 0.73 }], utility: [{ upTo: 100, rate: 0.15 }, { upTo: 250, rate: 0.12 }, { upTo: null, rate: 0.09 }], authentication: [{ upTo: 30, rate: 0.2 }, { upTo: 200, rate: 0.16 }, { upTo: null, rate: 0.11 }], service: [{ upTo: null, rate: 0 }] } };
const estimate = (volumes = zero, overrides = {}) => estimateMessageCost({ volumes, market: "IN", currency: "INR", date: "2026-09-28", card, ...overrides });

test("explicit scoped-card helper requires a card, including zero volumes and every requested currency", () => {
  for (const currency of [undefined, "INR", "USD", "GBP", "BRL", "IDR"]) for (const market of ["IN", "US", "GB"]) {
    const value = estimateMessageCost({ volumes: zero, market, currency, date: "2026-09-28" });
    assert.equal(value.status, "unavailable"); for (const field of ["meta", "categories", "currency", "platform", "tax", "total"]) assert.equal(value[field], null);
  }
  assert.equal(suppliedIndiaRateSource.currency, "INR"); assert.equal(suppliedIndiaRateSource.effectiveFrom, "2026-10-01"); assert.equal(suppliedIndiaRateSource.status, "owner-approved-future-schedule");
  assert.equal(estimate(zero, { card: undefined, date: "2026-10-01" }).status, "unavailable");
});

test("both entry points use the same actual helper; 11000 marketing has equivalence at an explicitly supported fixture rate", () => {
  const value = estimate({ ...zero, marketing: 11000 });
  assert.equal(value.meta, 11000 * card.rates.marketing[0].rate);
  for (const f of ["src/app/pricing/PricingCostCalculator.tsx", "src/app/tools/whatsapp-api-cost-calculator/CostCalculatorClient.tsx"]) assert.match(readFileSync(f, "utf8"), /MessageBudget/);
  assert.match(readFileSync("src/components/shared/MessageBudget.tsx", "utf8"), /estimateScheduledMetaCost/);
  assert.equal(estimate(zero).meta, 0); assert.equal(value.total, null); // Meta subtotal is not a complete invoice.
});

test("marginal utility/authentication slab-minus, at and plus apply to their own quantities", () => {
  for (const [category, boundaries] of [["utility", [100, 250]], ["authentication", [30, 200]]]) {
    const tiers = card.rates[category];
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]; const prior = i === 0 ? 0 : boundaries[i - 1];
      const base = i === 0 ? 0 : boundaries[0] * tiers[0].rate;
      for (const delta of [-1, 0, 1]) {
        const count = boundary + delta;
        const expected = base + (boundary - prior + Math.min(0, delta)) * tiers[i].rate + Math.max(0, delta) * tiers[i + 1].rate;
        assert.equal(estimate({ ...zero, [category]: count }).categories[category], plan.roundMoney(expected));
      }
    }
  }
});

test("marketing or confirmed free service never unlocks unrelated category discounts", () => {
  const quantities = { ...zero, utility: 99, authentication: 29 };
  const before = estimate(quantities);
  for (const key of ["marketing", "service"]) {
    const after = estimate({ ...quantities, [key]: MAX_MESSAGE_COUNT });
    assert.equal(after.categories.utility, before.categories.utility); assert.equal(after.categories.authentication, before.categories.authentication);
  }
  const paidService = { ...card, rates: { ...card.rates, service: [{ upTo: null, rate: 0.27 }] } };
  assert.equal(estimate({ ...zero, service: 10 }, { card: paidService }).meta, 2.7);
  assert.equal(estimate({ ...zero, service: 10 }).meta, 0); // Only this confirmed synthetic allowance is free.
});

test("card authority, date, currency, market, unit and conditions fail closed; no INR relabelling", () => {
  for (const overrides of [{ authority: "pending" }, { conditionsConfirmed: false }, { source: "" }, { market: "US" }, { currency: "USD" }, { unit: "per-conversation" }, { effectiveFrom: "2026-10-01" }, { effectiveUntil: "2026-09-27" }, { effectiveFrom: "2026-02-30" }, { effectiveUntil: "2025-01-01" }]) assert.equal(estimate(zero, { card: { ...card, ...overrides } }).status, "unavailable");
  for (const date of ["2026-02-30", "today", "2026-13-01", "2027-01-01"]) assert.equal(estimate(zero, { date }).status, "unavailable");
  assert.equal(estimate(zero, { card: { ...card, currency: "" }, currency: "" }).status, "unavailable");
  assert.equal(estimate(zero, { card: { ...card, market: "" }, market: "" }).status, "unavailable");
  assert.equal(estimate(zero, { card: { ...card, rates: { ...card.rates, utility: [null] } } }).status, "unavailable");
  const usdCard = { ...card, market: "US", currency: "USD", rates: { ...card.rates, marketing: [{ upTo: null, rate: 0.03 }] } };
  assert.equal(estimate({ ...zero, marketing: 100 }, { card: usdCard, market: "US", currency: "USD" }).meta, 3);
  assert.equal(estimate(zero, { card: usdCard, market: "US", currency: "INR" }).status, "unavailable");
});

test("invalid or cross-category tier schedules cannot produce an estimate", () => {
  for (const tiers of [[], [{ upTo: 100, rate: 0.1 }], [{ upTo: 100, rate: -1 }, { upTo: null, rate: 0.1 }], [{ upTo: 100, rate: 0.1 }, { upTo: 50, rate: 0.1 }, { upTo: null, rate: 0.1 }], [{ upTo: null, rate: Infinity }]]) assert.equal(estimate(zero, { card: { ...card, rates: { ...card.rates, utility: tiers } } }).status, "unavailable");
  for (const category of ["marketing", "service"]) assert.equal(estimate(zero, { card: { ...card, rates: { ...card.rates, [category]: card.rates.utility } } }).status, "unavailable");
});

test("negative, fractional, malformed and unbounded quantities cannot make negative or invalid money", () => {
  for (const value of [-10, NaN, Infinity, "1e400", "bad"]) assert.equal(normalizeMessageCount(value), 0);
  assert.equal(normalizeMessageCount("10.9"), 10); assert.equal(normalizeMessageCount(MAX_MESSAGE_COUNT + 1), MAX_MESSAGE_COUNT);
  assert.equal(estimate({ ...zero, marketing: -100 }).meta, null);
  assert.ok(Number.isFinite(estimate({ ...zero, marketing: MAX_MESSAGE_COUNT }).meta));
});

test("financial rounding preserves raw category arithmetic until Meta subtotal; tax/platform remain unknown", () => {
  const fractional = { ...card, rates: Object.fromEntries(["marketing", "utility", "authentication", "service"].map(key => [key, [{ upTo: null, rate: 0.004 }]])) };
  const value = estimate({ marketing: 1, utility: 1, authentication: 1, service: 1 }, { card: fractional });
  assert.equal(value.meta, 0.02); assert.equal(value.categories.marketing, 0); assert.equal(value.platform, null); assert.equal(value.tax, null); assert.equal(value.total, null);
});

test("all original plan/cycle/setup/tax/first-year/rounding arithmetic and invalid-query handling remain intact", () => {
  const totals = { coexistence: { annual: 5900, monthly: 2004.82 }, standard: { annual: 8260, monthly: 3479.82 } };
  for (const item of plan.planList) for (const cycle of plan.BILLING_CYCLES) {
    const order = plan.buildOrder(item, cycle); assert.equal(order.total, totals[item.id][cycle]); assert.equal(order.gst, plan.gstOn(order.subtotal));
    assert.equal(order.total, plan.roundMoney(order.subtotal + order.gst)); assert.equal(order.setupFee, cycle === "annual" ? null : item.monthlySetupFee);
    assert.equal(order.recurring.total, plan.roundMoney(plan.planPrice(item, cycle) + plan.gstOn(plan.planPrice(item, cycle))));
    assert.equal(plan.firstYearMonthlyCost(item), item.monthlyPrice * 12 + item.monthlySetupFee); assert.equal(plan.annualSavings(item), plan.firstYearMonthlyCost(item) - item.annualPrice);
    assert.equal(plan.resolvePlanId([item.id.toUpperCase()]).value, item.id); assert.equal(plan.resolveBillingCycle([cycle.toUpperCase()]).value, cycle);
    assert.equal(plan.checkoutHref(item.id, cycle), `/checkout?plan=${item.id}&billing=${cycle}`);
  }
  assert.equal(plan.resolvePlanId("2year-20off").fromUrl, false); assert.equal(plan.resolveBillingCycle("3years").fromUrl, false); assert.equal(plan.formatINR(2004.82), "₹2,004.82"); assert.equal(plan.GST_RATE, 0.18);
});

test("approved plan prices and setup terms are public while Meta and unapproved commercial terms stay separate", () => {
  for (const item of plan.planList) {
    for (const amount of [item.monthlyPrice, item.annualPrice, item.monthlySetupFee]) assert.ok(commercialQualification.includes(plan.formatINR(amount)));
  }
  assert.match(commercialQualification, /18% GST/);
  assert.match(commercialQualification, /annual billing includes setup/);
  assert.match(commercialQualification, /Meta message charges pass through separately without Whats91 markup/);
  assert.match(commercialQualification, /Add-ons, feature eligibility, trials, renewal, invoice treatment and activation need separate confirmation/);
  const selector = readFileSync("src/app/plans/PlansSelector.tsx", "utf8");
  const checkout = readFileSync("src/app/checkout/page.tsx", "utf8");
  for (const source of [selector, checkout]) {
    assert.match(source, /buildOrder/); assert.match(source, /formatINR/);
    assert.doesNotMatch(source, /Current price unavailable|Confirm price|Current prices and commercial terms need confirmation/);
  }
  assert.match(checkout, /Payment unavailable/);
  assert.match(checkout, /robots: \{ index: false, follow: false \}/);
});

test("partner/add-on source totals and recharge separation reconcile without publishing unapproved money", () => {
  assert.equal(partner.coinItems.length, 7);
  const counts = Object.fromEntries(partner.coinItems.map(item => [item.key, 2]));
  for (const kind of ["partner", "techPartner"]) {
    const expected = partner.coinItems.reduce((sum, item) => sum + 2 * (kind === "partner" ? item.partnerCost : item.techPartnerCost), 0);
    assert.equal(partner.coinRequirement(counts, kind), expected);
    const result = partner.coinRecharge(expected, 1000); assert.equal(result.shortfall, expected - 1000); assert.equal(result.gst, plan.gstOn(result.shortfall)); assert.equal(result.total, plan.roundMoney(result.shortfall + result.gst));
    assert.equal(partner.publicCoinEstimate(counts, kind, 1000), null);
  }
  assert.equal(partner.coinRecharge(NaN, -1), null);
  assert.equal(partner.coinRecharge(-1, Infinity), null);
  assert.deepEqual(partner.coinRecharge(0, 1000), { required: 0, shortfall: 0, gst: 0, total: 0 });
  assert.equal(partner.coinRequirement({ coexisting1y: -1 }, "partner"), null); assert.equal(partner.coinRequirement({ coexisting1y: 1.9 }, "partner"), null);
});
