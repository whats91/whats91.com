import { numericInput } from "@/lib/tool-inputs";
import { formatINR, plans, roundMoney } from "@/lib/plans";
import { contentDate } from "@/lib/content/dates";
import { metaPricingSchedule, getMetaMarket, metaPricingQualification, metaRateMarkdown, noMarkupPolicy, servicePricingPolicy, utilityPricingPolicy, freeEntryPricingPolicy, tierPricingPolicy, internationalPricingPolicy } from "@/lib/meta-pricing";

export const metaPricingUrl = metaPricingSchedule.source;
export const pricingQualification = metaPricingQualification;
export const commercialQualification = `Whats91 platform subscriptions: Coexistence ${formatINR(plans.coexistence.monthlyPrice)}/month or ${formatINR(plans.coexistence.annualPrice)}/year; Standard ${formatINR(plans.standard.monthlyPrice)}/month or ${formatINR(plans.standard.annualPrice)}/year. Monthly billing has a one-time setup fee of ${formatINR(plans.coexistence.monthlySetupFee)} or ${formatINR(plans.standard.monthlySetupFee)} respectively; annual billing includes setup. These amounts exclude 18% GST, added on top. Meta message charges pass through separately without Whats91 markup. Add-ons, feature eligibility, trials, renewal, invoice treatment and activation need separate confirmation. No payment or activation is available on this website.`;

// Compatibility export derives from the single manually maintained schedule.
export const suppliedIndiaRateSource = {
  effectiveFrom: metaPricingSchedule.effectiveFrom, currency: metaPricingSchedule.currency, market: "IN",
  unit: metaPricingSchedule.unit, status: "owner-approved-future-schedule",
  source: metaPricingUrl,
  originalDocument: "Cost per message in INR on the WhatsApp Business Platform, effective October 1, 2026; List rates, India row",
  listRates: getMetaMarket("IN")!.rates,
  conditions: [pricingQualification, servicePricingPolicy, freeEntryPricingPolicy, internationalPricingPolicy],
} as const;

export const messageCategories = ["marketing", "utility", "authentication", "service"] as const;
export type MessageCategory = typeof messageCategories[number];
export type MessageVolumes = Record<MessageCategory, number>;
export type RateTier = { upTo: number | null; rate: number };
export type ScopedRateCard = {
  market: string; currency: string; effectiveFrom: string; effectiveUntil: string;
  unit: "per-delivered-message"; source: string;
  authority: "confirmed" | "pending";
  conditionsConfirmed: boolean;
  rates: Record<MessageCategory, RateTier[]>;
};
export const MAX_MESSAGE_COUNT = 1_000_000_000;
export function normalizeMessageCount(value: number | string): number {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(MAX_MESSAGE_COUNT, Math.max(0, Math.floor(number))) : 0;
}

function validTiers(tiers: RateTier[], category: MessageCategory): boolean {
  if (!tiers.length || (category !== "utility" && category !== "authentication" && tiers.length !== 1)) return false;
  let previous = 0;
  return tiers.every((tier, index) => {
    if (!tier || typeof tier !== "object") return false;
    if (!Number.isFinite(tier.rate) || tier.rate < 0 || tier.rate > 1000) return false;
    if (tier.upTo === null) return index === tiers.length - 1;
    const valid = Number.isSafeInteger(tier.upTo) && tier.upTo > previous && index < tiers.length - 1;
    previous = tier.upTo;
    return valid;
  });
}

/** Marginal tiers, counted independently by category, before final money rounding. */
export function tieredMessageCost(volume: number, tiers: RateTier[]): number {
  let remaining = normalizeMessageCount(volume); let previous = 0; let cost = 0;
  for (const tier of tiers) {
    const units = tier.upTo === null ? remaining : Math.min(remaining, tier.upTo - previous);
    cost += units * tier.rate; remaining -= units;
    if (tier.upTo !== null) previous = tier.upTo;
    if (!remaining) break;
  }
  return cost;
}

/** Explicit scoped-card arithmetic for documented exercises; live budgets use estimateScheduledMetaCost. */
export function estimateMessageCost(input: {
  volumes: MessageVolumes; market: string; currency?: string; date: string;
  card?: ScopedRateCard;
}) {
  if (!messageCategories.every(key => numericInput(input.volumes[key], { integer: true, max: MAX_MESSAGE_COUNT }) !== null)) return { status: "unavailable" as const, counts: null, currency: null, meta: null, categories: null, platform: null, tax: null, total: null };
  const counts = Object.fromEntries(messageCategories.map(key => [key, normalizeMessageCount(input.volumes[key])])) as MessageVolumes;
  const card = input.card;
  const unavailable = { status: "unavailable" as const, counts, currency: null, meta: null, categories: null, platform: null, tax: null, total: null };
  if (!card || card.authority !== "confirmed" || !card.conditionsConfirmed || !card.source ||
      typeof card.market !== "string" || !card.market.trim() || !/^[A-Z]{3}$/.test(card.currency) ||
      card.unit !== "per-delivered-message" || card.market !== input.market || card.currency !== input.currency ||
      !/^\d{4}-\d{2}-\d{2}$/.test(input.date) || !contentDate(input.date) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(card.effectiveFrom) || !/^\d{4}-\d{2}-\d{2}$/.test(card.effectiveUntil) ||
      !contentDate(card.effectiveFrom) || !contentDate(card.effectiveUntil) ||
      card.effectiveFrom > card.effectiveUntil || input.date < card.effectiveFrom || input.date > card.effectiveUntil ||
      !messageCategories.every(key => Array.isArray(card.rates?.[key]) && validTiers(card.rates[key], key))) return unavailable;
  const raw = Object.fromEntries(messageCategories.map(key => [key, tieredMessageCost(counts[key], card.rates[key])])) as MessageVolumes;
  return { status: "estimate" as const, counts, currency: card.currency,
    categories: Object.fromEntries(messageCategories.map(key => [key, roundMoney(raw[key])])) as MessageVolumes,
    meta: roundMoney(messageCategories.reduce((sum, key) => sum + raw[key], 0)),
    platform: null, tax: null, total: null };
}

export const pricingFAQs = [
  { question: "Which pricing period does this calculator use?", answer: pricingQualification },
  { question: "How are message categories and tiers counted?", answer: tierPricingPolicy },
  { question: "Does an accepted API request prove a charge?", answer: "No. An accepted request is not delivery or a final billing record. Reconcile delivered and failed statuses with the applicable rate card and invoice. Missing delivery or pricing evidence leaves billing unresolved, rather than proving a zero charge." },
  { question: "Are service replies or messages in a window always free?", answer: `${servicePricingPolicy} ${utilityPricingPolicy} ${freeEntryPricingPolicy}` },
  { question: "What needs to be separate in my budget?", answer: "Separate Meta delivery charges, the listed Whats91 plan subscription, one-time monthly-billing setup, integrations and taxes. The listed platform/setup amounts have 18% GST added. Confirm Meta billing currency, any integration quote, renewal and trial conditions, invoice treatment and input-tax-credit eligibility separately." },
  { question: "Does Whats91 add a markup to Meta messaging charges?", answer: noMarkupPolicy },
  { question: "When does Authentication international apply?", answer: internationalPricingPolicy },
];
export const pricingMarkdown = `${metaRateMarkdown}\n\n## Platform buying conditions\n\n${commercialQualification}\n\n${pricingFAQs.map(item => `### ${item.question}\n${item.answer}`).join("\n\n")}\n\n[Platform plans](/plans)\n[Message cost calculator](/tools/whatsapp-api-cost-calculator)`;

export const calculatorMarkdown = `## Calculator inputs and assumptions\n\nChoose one recipient market, original INR billing and a delivery month on or after the schedule’s effective date. Enter whole delivered Marketing, Utility, Authentication and Service counts; include each delivered group recipient. Confirm any free-entry exclusions, the Service allowance remaining for one business phone number, and earlier paid Utility/Authentication counts in the same market and business portfolio. Defaults assume a full Service allowance and no prior paid tier volume. For mixed domestic/international Authentication, calculate cohorts in delivery order with their shared prior count. Unconfirmed international eligibility, unsupported markets/currency, earlier periods and malformed inputs leave the estimate unavailable. Calling and Marketing Messages API token charges are excluded. The Meta subtotal rounds once after original-precision category calculations; platform, tax and total payable remain separate. Controls run locally and require JavaScript; no invoice, account, wallet, send or payment is accessed.\n\n${pricingMarkdown}`;

export const partnerFAQs = [
  { question: "What distinguishes Partner and Tech Partner?", answer: "Discuss who will refer clients, deliver onboarding, provide support and manage integrations. Responsibilities and account permissions must be agreed for your partner arrangement." },
  { question: "Are partner discounts and renewal benefits confirmed here?", answer: "No current discount, renewal benefit or multi-year price is published here. Confirm the exact programme, duration, fees and responsibilities in a written agreement." },
  { question: "Are taxes and Meta charges included?", answer: noMarkupPolicy + " Confirm applicable taxes and their invoice treatment separately. A coin wallet or platform selection does not establish Meta billing currency." },
];

export const coinsFAQs = [
  { question: "Does one coin always equal one rupee?", answer: "Coin conversion, eligible deductions, recharge treatment and wallet permissions require confirmed commercial terms. This planner does not publish a current conversion rate." },
  { question: "How is recharge GST handled?", answer: "The inherited catalogue uses an 18% tax assumption and pre-tax credit arithmetic. Current tax applicability, credited value, deduction and invoicing rules need confirmation; no payable recharge estimate is displayed." },
  { question: "Can this planner activate subscriptions?", answer: "No. It records quantities only in this page's local state. It does not access a wallet, assign a subscription, take payment or activate an account." },
  { question: "Are Meta message charges included?", answer: noMarkupPolicy + " Use the separate message calculator for the applicable market, currency, category and pricing period." },
];

export const partnerMarkdown = '## Partner commercial conditions\n\n' + commercialQualification + '\n\n' + partnerFAQs.map(item => '### ' + item.question + '\n' + item.answer).join('\n\n') + '\n\nPublic customer plan subscription prices and setup are listed at [Plans](/plans). Partner/Tech Partner rates, add-on prices and durations remain unavailable pending a written agreement. Add-ons to discuss: 103 Flow Builder, 102 WhatsApp Catalog Management, 101 Campaign Utility Templates. [Quantity planner](/partners/whats91-coins).';
export const coinsMarkdown = '## Partner quantities and wallet conditions\n\n' + commercialQualification + '\n\n' + coinsFAQs.map(item => '### ' + item.question + '\n' + item.answer).join('\n\n') + '\n\nUse the local quantity planner to prepare a discussion. Current coin deductions, conversion, recharge and activation totals are unavailable. No wallet or subscription is accessed.';
