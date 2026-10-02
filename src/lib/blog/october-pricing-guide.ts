import type { BillingGuide } from "./billing-guides";
import { estimateScheduledMetaCost, formatMetaMoney, formatMetaRate, freeEntryPricingPolicy, getMetaMarket, indiaRateRows, internationalPricingPolicy, metaPricingSchedule, noMarkupPolicy, servicePricingPolicy, tierPricingPolicy, utilityPricingPolicy } from "@/lib/meta-pricing";

const india = getMetaMarket("IN")!;
const zero = { marketing: 0, utility: 0, authentication: 0, service: 0 };
const budget = (volumes: typeof zero, overrides: Partial<Parameters<typeof estimateScheduledMetaCost>[0]> = {}) =>
  estimateScheduledMetaCost({ market: "IN", currency: metaPricingSchedule.currency, date: metaPricingSchedule.effectiveFrom, volumes, freeEntry: zero, serviceAllowanceRemaining: metaPricingSchedule.serviceFreePerPhonePerMonth, priorUtility: 0, priorAuthentication: 0, authenticationMode: "domestic", internationalEligible: false, ...overrides });
const amount = (value: ReturnType<typeof budget>) => {
  if (value.status !== "estimate") throw new Error("October article scenario needs a verified pricing card");
  return formatMetaMoney(value.meta);
};
const categoryAmount = (value: ReturnType<typeof budget>, category: keyof typeof zero) => {
  if (value.status !== "estimate") throw new Error("October article scenario needs a verified pricing card");
  return formatMetaMoney(value.categories[category]);
};
export const octoberPricingExamples = {
  campaignAndUpdates: budget({ ...zero, marketing: 1000, utility: 1000 }),
  withService: budget({ marketing: 1000, utility: 1000, authentication: 0, service: 1200 }),
  freeEntry: budget({ marketing: 100, utility: 100, authentication: 0, service: 0 }, { freeEntry: { marketing: 100, utility: 100, authentication: 0, service: 0 } }),
  international: budget({ ...zero, authentication: 10 }, { authenticationMode: "international", internationalEligible: true }),
  domestic: budget({ ...zero, authentication: 10 }),
  nextUtility: budget({ ...zero, utility: 2 }, { priorUtility: india.tiers.utility[0].upTo! - 1 }),
};
const imgBase = "/images/blog/meta-whatsapp-pricing-october-2026";
export const octoberPricingImages = {
  cover: { src: `${imgBase}/cover-refined-2026-10-watermarked.webp`, width: 1200, height: 630, alt: "Abstract message, category and planning layers beside a phone and blank budget sheet", caption: "Planning Meta delivery charges by category is separate from choosing a Whats91 subscription." },
  windows: { src: `${imgBase}/service-and-free-entry-windows-refined-2026-10-watermarked.webp`, width: 1440, height: 810, alt: "Two small-business colleagues reviewing a phone beside visual clock and entry-window motifs", caption: "A reply window permits some messages; the applicable allowance and free-entry conditions still determine their charge." },
  tiers: { src: `${imgBase}/marginal-tiers-and-platform-fees-refined-2026-10-watermarked.webp`, width: 1440, height: 810, alt: "Unnumbered message tokens climbing separate paper tiers beside a closed subscription folder", caption: "Paid Utility and Authentication deliveries move through their own marginal tiers; platform fees are a separate line." },
} as const;
const mainSource = { label: "Meta: pricing update and rate cards effective 1 October 2026", href: metaPricingSchedule.source };
const nonTemplateSource = { label: "Meta: non-template Service pricing", href: metaPricingSchedule.nonTemplateSource };
const internationalSource = { label: "Meta: Authentication international eligibility", href: metaPricingSchedule.authenticationInternationalSource };
const rupee = (value: number) => formatMetaRate(value);

/** A new article, separate from the earlier general India pricing guide. All numeric claims derive from the verified static card. */
export const octoberPricingGuide: BillingGuide = {
  slug: "meta-whatsapp-pricing-october-2026-india",
  title: "Meta WhatsApp pricing from 1 October 2026: India rates and worked examples",
  description: "Meta WhatsApp rates effective 1 October 2026: India INR prices, 1,000 free Service deliveries, paid Utility replies, tiers and Whats91 zero-markup terms.",
  intro: "If you are preparing an October WhatsApp budget, start with delivered messages, not the number of sends you plan to attempt. Meta's published INR card takes effect on 1 October 2026 at midnight in your Messaging account's timezone. The biggest practical changes are paid Service replies after a monthly free allowance and paid Utility templates even during an open customer-service window. This guide shows the India rates, the exceptions worth checking, and example arithmetic. It does not turn a future card into a September invoice or a Whats91 platform quote.",
  cover: octoberPricingImages.cover,
  sections: [
    { id: "october-changes", heading: "What changes on 1 October — and what does not", paragraphs: [
      "Meta charges for applicable business-to-customer deliveries by recipient market and message category. An API request accepted by a server is not the same thing as a delivered message or a final invoice. Keep delivery status, category and account billing records together when you reconcile the month.",
      "From 1 October, Meta starts charging for delivered Service messages after the business phone number uses its monthly free Service tier. It also starts charging delivered Utility templates sent in response to users inside the 24-hour customer-service window. Before that date, those Service replies and in-window Utility responses were free under the earlier rules. The window itself has no opening fee, and incoming customer messages are not charged. Template Marketing and Authentication remain category-priced. The new card also changes certain market rates and adds Authentication international rates in nine newly standalone markets; it does not say every market price increases.",
      "Meta's update tells businesses which rates and rules change and when. The official material checked for this article does not provide a verified economic cause for these changes, so claims about infrastructure costs, inflation, AI spending or a universal price increase would be speculation. For messages delivered before 1 October, use the previous applicable card rather than the October table below."
    ], links: [mainSource] },
    { id: "india-list-rates", heading: "India list rates: five prices to read correctly", paragraphs: [
      "These are the India recipient-market list rates in Meta's October INR workbook, per delivered business message. The workbook supplied for this work matches Meta's official October download byte for byte. The Marketing, Utility, domestic Authentication and Service figures are not interchangeable: a promotional template does not become a cheaper Utility message because it is sent during a reply window. Service is a pricing category for eligible non-template business replies, not a fourth template approval category.",
      "The Authentication international line is a different, conditional treatment of Authentication delivery. Its presence in the India row does not mean every India OTP pays that rate. Meta must establish eligibility and the business's primary location and market start-date conditions must apply. See the eligibility section before using it. All figures below are INR; they are not USD or a currency conversion."
    ], table: { caption: `Meta India list rates, ${metaPricingSchedule.effectiveLabel} — INR per delivered message, before eligible exemptions and marginal tier discounts`, headers: ["Category", "India list rate", "Read it as"], rows: indiaRateRows.map(([category, rate]) => [category, rate, category === "Service" ? "After the monthly phone-number allowance" : category === "Authentication international" ? "Only when Meta's international conditions apply" : category === "Utility" ? "Charged even inside the 24-hour reply window" : category === "Authentication" ? "Domestic Authentication treatment" : "Marketing template delivery"]) }, links: [mainSource, { label: "See the complete 47-market INR card", href: "/pricing#calculator" }] },
    { id: "service-free-entry", heading: "Service allowance and free-entry: two different checks", paragraphs: [
      servicePricingPolicy,
      "For one business phone number, 1,200 qualifying Service deliveries in a month with its full allowance unused leave 200 billable deliveries. That is a count across the phone number, not 1,000 free messages for each customer or each linked Messaging account. A group send uses one allowance unit for each delivered recipient. If the phone number has already consumed some of its allowance, enter only what remains in your budget. Meta's account-level record, not a planning page, determines the actual balance. Without a payment method, Meta says it will deliver Service messages inside the free tier but will not deliver them after that tier is exhausted.",
      freeEntryPricingPolicy,
      "The free-entry condition is a separate exception. A mobile ad click alone is insufficient: Meta describes a customer message through an eligible Click-to-WhatsApp ad, then a business response inside that customer's 24-hour service window. The free-entry period begins with the response and can extend up to seven days. Confirm the actual window for each phone-number/customer pair before removing Marketing, Utility, Authentication or Service deliveries from a billable cohort. Do not assume a desktop/web entry or any later contact is free."
    ], image: octoberPricingImages.windows, links: [mainSource, nonTemplateSource] },
    { id: "utility-window", heading: "A 24-hour reply window still matters, but it no longer makes Utility free", paragraphs: [
      utilityPricingPolicy,
      "Here is the operational distinction: a customer's incoming message opens or resets the service window. That window determines whether you may send a non-template reply. It does not set a permanent zero price. From October, an eligible Service reply may draw on the phone's remaining free allowance or become paid; a delivered Utility template in that same window is charged unless the distinct free-entry exception applies. Outside the window, Meta generally requires an approved template. Marketing, Utility and Authentication templates still need the correct approved purpose and category; a send attempt is not a billing record.",
      "For an order-update workflow, record whether the outbound item was a Utility template or a non-template Service reply, whether it was delivered, and whether a verified free-entry window was open. Those four pieces of evidence are more useful than a broad statement that all support traffic is free or all template traffic is paid."
    ], links: [mainSource, nonTemplateSource, { label: "Browse message examples and approval conditions", href: "/whatsapp-templates" }] },
    { id: "tiers-and-international", heading: "Volume tiers and international Authentication need their own evidence", paragraphs: [
      tierPricingPolicy,
      `For India, the first ${india.tiers.utility[0].upTo!.toLocaleString("en-IN")} paid Utility deliveries use the list rate ${rupee(india.tiers.utility[0].rate)}; the next tier uses ${rupee(india.tiers.utility[1].rate)} only for later Utility deliveries in that tier. The first ${india.tiers.authentication[0].upTo!.toLocaleString("en-IN")} paid Authentication deliveries use ${rupee(india.tiers.authentication[0].rate)}. Marketing messages and free Service deliveries do not push either category into a cheaper tier. The thresholds are monthly, market/category-specific and based on the business portfolio's Messaging accounts, so a small calculator scenario may need a prior paid-volume count rather than assuming it begins at zero.`,
      internationalPricingPolicy,
      "India has an Authentication international list rate in the October INR card, but the calculator cannot inspect Meta's notice, account eligibility or primary business location. For mixed domestic and international Authentication traffic, delivery order and a shared Authentication tier count matter. Work through the cohorts in order with your real prior paid count instead of multiplying an entire month's Authentication volume by whichever rate looks lower."
    ], image: octoberPricingImages.tiers, links: [mainSource, internationalSource, { label: "Inspect market-specific tier tables", href: "/pricing#calculator" }] },
    { id: "worked-examples", heading: "Worked October budgets, with the assumptions exposed", paragraphs: [
      `Example A — a team plans 1,000 delivered Marketing templates and 1,000 delivered Utility templates to India in October, with no confirmed free-entry deliveries and no earlier paid Utility volume that month. Marketing: 1,000 × ${rupee(india.rates.marketing!)} = ${categoryAmount(octoberPricingExamples.campaignAndUpdates, "marketing")}. Utility: 1,000 × ${rupee(india.rates.utility!)} = ${categoryAmount(octoberPricingExamples.campaignAndUpdates, "utility")}. The Meta delivery subtotal is ${amount(octoberPricingExamples.campaignAndUpdates)}. This is the same starting scenario as the website calculator; subscription, setup and tax are not in the subtotal.`,
      `Example B — add 1,200 delivered Service replies on one phone number with the full 1,000-message monthly allowance still available and no free-entry cohort. The first 1,000 Service deliveries consume that allowance; 200 × ${rupee(india.rates.service!)} = ${categoryAmount(octoberPricingExamples.withService, "service")}. Together with Example A's traffic, the Meta delivery subtotal becomes ${amount(octoberPricingExamples.withService)}. If the allowance was already partly used elsewhere on the same number, this estimate would be too low; update the remaining balance first.`,
      `Example C — suppose 100 Marketing and 100 Utility deliveries are independently confirmed inside an eligible free-entry window. Excluding those exact 200 deliveries leaves a Meta delivery estimate of ${amount(octoberPricingExamples.freeEntry)} for that isolated cohort. This is not a claim that those contacts qualify just because they clicked an ad. If eligibility or expiry is unknown, keep the traffic in the budget until you reconcile it.`,
      `At a tier boundary, the same marginal rule matters: if the India portfolio already has ${(india.tiers.utility[0].upTo! - 1).toLocaleString("en-IN")} paid Utility deliveries in the month, the next two cost ${rupee(india.tiers.utility[0].rate)} plus ${rupee(india.tiers.utility[1].rate)} before rounding once to ${amount(octoberPricingExamples.nextUtility)}. Repricing both at the lower rate would understate the cost. These are planning scenarios, not a forecast of how many messages will actually be delivered.`
    ], links: [{ label: "Try your own dated Meta cost scenario", href: "/tools/whatsapp-api-cost-calculator" }, mainSource] },
    { id: "budget-steps", heading: "Build your own budget in seven steps", paragraphs: [
      "A useful budget can be checked by someone else. Keep the source period, input counts and every exclusion beside the answer so your operations and accounts teams can repeat it when delivery records arrive."
    ], steps: [
      "Choose the delivery month. Use the October card only for deliveries on or after 1 October 2026 in the Messaging account timezone; split a period that crosses the change.",
      "Use the actual recipient market and original account billing currency. This article and calculator use Meta's INR card; do not relabel an INR amount as another currency.",
      "Count delivered Marketing, Utility, Authentication and Service recipients separately. Do not price queued, accepted, failed or incoming messages as delivered traffic.",
      "Confirm Service allowance remaining for each business phone number and whether a specific free-entry window exempts any deliveries. Record the basis; blank evidence is not a zero price.",
      "Enter earlier paid Utility and Authentication counts for the relevant market/category and business portfolio. Apply tier rates only to the units inside each tier.",
      "Use Authentication international only after checking Meta's actual eligibility, business location and applicable market/account start date. Separate mixed cohorts in delivery order.",
      "Add the Meta subtotal, then obtain the separate Whats91 platform, setup/integration and tax terms in a written offer. Reconcile the estimate against status webhooks and the final invoice."
    ], links: [{ label: "Open the Meta cost calculator", href: "/tools/whatsapp-api-cost-calculator" }, { label: "Review Whats91 platform plans separately", href: "/plans" }] },
    { id: "whats91-vs-meta", heading: "Meta pass-through is not the Whats91 platform fee", paragraphs: [
      noMarkupPolicy,
      "This means the per-message Meta line follows the applicable Meta rate and exemptions without a Whats91 percentage added to it. A Whats91 subscription can still pay for the separately agreed software and service scope. Setup, integrations, plan cycle, included features, renewal, taxes and invoice treatment need their own written terms; the Meta rate card does not determine those prices. Our calculator therefore shows a Meta delivery subtotal and leaves total payable unresolved when those other components are not quoted.",
      "Keep a comparison honest by putting the same delivered volume, market, category mix, billing currency and month on each side. A headline 'per-message' price that quietly bundles a subscription or assumes every support reply is permanently free is not comparable. Likewise, a planned 1,000-message free Service allowance must not be applied separately to each customer or to each partner's Messaging account on the same phone number."
    ], links: [{ label: "Review platform plan conditions", href: "/plans" }, { label: "Understand the full pricing card", href: "/pricing" }] },
    { id: "sources-and-limitations", heading: "Sources and what this article cannot verify for your account", paragraphs: [
      `The effective schedule, INR rates and volume tiers above come from Meta's official documentation and October workbooks, checked on ${metaPricingSchedule.verifiedOn}. The supplied INR list-rate file matched the official downloadable file byte for byte; the versioned source records both workbook hashes. The separate non-template and Authentication international documentation provides the policy checks described here. Links below lead to Meta's source pages rather than third-party summaries.`,
      "The website cannot see whether your business is eligible for an international rate, whether a particular ad entry opened a free-entry window, how much Service allowance remains, the currency actually used by your Messaging account, or what Meta finally invoiced. A delivery webhook and the account's billing evidence answer those questions. The article also does not model Calling API or Marketing Messages API token/max-price charges. Treat its numbers as dated scenario estimates and correct the input when account evidence differs."
    ], links: [mainSource, nonTemplateSource, internationalSource] },
  ],
  faqs: [
    { question: "Is this October card the price I pay for messages sent in September?", answer: `No. ${metaPricingSchedule.effectiveLabel} means the INR schedule applies from 00:00 on that date in the Messaging account timezone. Use the earlier applicable card for September deliveries.` },
    { question: "Are the first 1,000 Service replies free for each customer?", answer: servicePricingPolicy + " The allowance belongs to the business phone number for the month, not to each customer." },
    { question: "Is a Utility template free when a customer replies first?", answer: utilityPricingPolicy + " A confirmed eligible free-entry window is a separate exemption." },
    { question: "Does every Click-to-WhatsApp ad click make seven days of messages free?", answer: freeEntryPricingPolicy },
    { question: "Why did Meta increase all WhatsApp prices?", answer: "The premise is too broad. Meta's October announcement includes increases in some markets, decreases in others, new standalone-market treatment and new Service/Utility charging rules. Its checked documentation does not establish a universal increase or a verified economic cause. Use the applicable prior and future cards before claiming a price change for one market and category." },
    { question: "Does an Indian OTP automatically use the Authentication international rate?", answer: internationalPricingPolicy },
    { question: "Does Whats91 mark up Meta messaging charges?", answer: noMarkupPolicy + " The platform subscription and any separately agreed setup, integration and taxes require their own terms." },
    { question: "Is the estimate my final payable invoice?", answer: "No. It covers the selected Meta delivered-message scenario in INR. Confirm free-entry and international eligibility, remaining Service allowance, prior tier volumes and actual delivery/billing records. Platform fees and applicable taxes are separate." },
  ],
};
