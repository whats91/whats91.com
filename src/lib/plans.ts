import type { ContentDates } from "@/lib/content/dates";
import type { EditorialRecord } from "@/lib/content/review";
/**
 * Whats91 platform plan catalogue.
 *
 * Single source of truth shared by the /plans comparison page and the
 * /checkout order summary, so the two can never drift apart.
 *
 * IMPORTANT: every amount below is EXCLUSIVE of GST. GST is always applied
 * and displayed as its own line item at `GST_RATE`. Do not bake tax into
 * these numbers.
 *
 * These are Whats91 platform subscription fees. Per-message Meta charges are
 * billed separately at the rates published on /pricing.
 */

export const GST_RATE = 0.18;
export const GST_LABEL = "GST (18%)";

export type PlanId = "coexistence" | "standard";
export type BillingCycle = "monthly" | "annual";

export const PLAN_IDS: readonly PlanId[] = ["coexistence", "standard"] as const;
export const BILLING_CYCLES: readonly BillingCycle[] = ["monthly", "annual"] as const;

export const DEFAULT_PLAN_ID: PlanId = "coexistence";
export const DEFAULT_BILLING_CYCLE: BillingCycle = "annual";

export interface Plan extends ContentDates {
  /** Internal provenance; omitted from public metadata. No human review is inferred. */
  editorial?: EditorialRecord;
  id: PlanId;
  name: string;
  /** One-line positioning shown under the plan name */
  tagline: string;
  /** Longer supporting sentence for the plan card */
  description: string;
  /** Annual subscription, excl. GST. Includes setup at no extra charge. */
  annualPrice: number;
  /** Monthly subscription, excl. GST */
  monthlyPrice: number;
  /** One-time setup fee, excl. GST. Charged on monthly billing only. */
  monthlySetupFee: number;
  /** Bullet list rendered on the plan card */
  highlights: string[];
  /** Marks the richer tier — styled as the emphasised card */
  featured?: boolean;
  featuredLabel?: string;
}

export const plans: Record<PlanId, Plan> = {
  coexistence: {
    id: "coexistence",
    editorial: { stage: "pending-human-review", history: [], claims: [{
      id: "plan:coexistence", meaning: "Coexistence platform subscription amounts, monthly setup inclusion and 18% GST calculation",
      source: ["src/lib/plans.ts", "Owner approval recorded 30 September 2026 in docs/legal-policy-inputs.md#platform-plan-price-approval--30-september-2026"],
      conditions: ["Subscription and monthly setup amounts exclude 18% GST; annual setup is included", "Meta messages are separate; renewal, invoice treatment, account eligibility and activation remain unconfirmed"],
      publicUse: "approved", status: "VERIFIED",
      consumers: ["src/app/plans/page.tsx", "src/app/plans/PlansSelector.tsx", "src/app/checkout/page.tsx"],
      recheck: ["Owner price/setup/GST change", "Invoice or renewal decision", "Account availability change"],
      adverseEvidence: ["F006/F011/F014 still govern unapproved capability, invoice and activation claims"],
    }] },
    name: "WhatsApp Coexistence",
    tagline: "WhatsApp Business App + Cloud API on one number",
    description:
      "Keep answering from the WhatsApp Business App your team already uses, and run templates, campaigns and automation through the Cloud API on the same number.",
    annualPrice: 5000,
    monthlyPrice: 699,
    monthlySetupFee: 1000,
    highlights: [
      "Use the WhatsApp Business App and WhatsApp Cloud API together",
      "Template Management",
      "Contact Book Management",
      "Campaign Builder",
      "Chatbot Automation",
      "Public API Access",
    ],
  },
  standard: {
    id: "standard",
    editorial: { stage: "pending-human-review", history: [], claims: [{
      id: "plan:standard", meaning: "Standard platform subscription amounts, monthly setup inclusion and 18% GST calculation",
      source: ["src/lib/plans.ts", "Owner approval recorded 30 September 2026 in docs/legal-policy-inputs.md#platform-plan-price-approval--30-september-2026"],
      conditions: ["Subscription and monthly setup amounts exclude 18% GST; annual setup is included", "Meta messages are separate; renewal, invoice treatment, account eligibility and activation remain unconfirmed"],
      publicUse: "approved", status: "VERIFIED",
      consumers: ["src/app/plans/page.tsx", "src/app/plans/PlansSelector.tsx", "src/app/checkout/page.tsx"],
      recheck: ["Owner price/setup/GST change", "Invoice or renewal decision", "Account availability change"],
      adverseEvidence: ["F006/F011/F014 still govern unapproved capability, invoice and activation claims"],
    }] },
    name: "WhatsApp Standard",
    tagline: "Whats91 platform and chat inbox; confirm MCP access",
    description:
      "Everything in Coexistence, plus the full Whats91 chat application for viewing and managing conversations, and source-listed MCP access subject to current account, provider and plan confirmation.",
    annualPrice: 7000,
    monthlyPrice: 949,
    monthlySetupFee: 2000,
    highlights: [
      "Everything in WhatsApp Coexistence",
      "MCP access subject to confirmation",
      "Full Chat Application access to view and manage conversations",
      "Template Management",
      "Contact Book Management",
      "Campaign Builder",
      "Chatbot Automation",
      "Public API Access",
    ],
    featured: true,
    featuredLabel: "Most complete",
  },
};

export const planList: Plan[] = [plans.coexistence, plans.standard];

/* ------------------------------------------------------------------ */
/* Feature comparison matrix                                           */
/* ------------------------------------------------------------------ */

export interface PlanFeature {
  label: string;
  /** Short clarifier shown under the feature name */
  detail?: string;
  coexistence: boolean;
  standard: boolean;
}

export interface PlanFeatureGroup {
  title: string;
  features: PlanFeature[];
}

export const featureGroups: PlanFeatureGroup[] = [
  {
    title: "WhatsApp connectivity",
    features: [
      {
        label: "WhatsApp Business App + Cloud API together",
        detail: "Coexistence mode — the app and the API share one business number",
        coexistence: true,
        standard: true,
      },
    ],
  },
  {
    title: "Core platform",
    features: [
      {
        label: "Template Management",
        detail: "Create, submit and track message templates",
        coexistence: true,
        standard: true,
      },
      {
        label: "Contact Book Management",
        detail: "Organise contacts, attributes and segments",
        coexistence: true,
        standard: true,
      },
      {
        label: "Campaign Builder",
        detail: "Build and schedule template campaigns",
        coexistence: true,
        standard: true,
      },
      {
        label: "Chatbot Automation",
        detail: "Automated flows and rule-based replies",
        coexistence: true,
        standard: true,
      },
      {
        label: "Public API Access",
        detail: "Send and receive programmatically from your own systems",
        coexistence: true,
        standard: true,
      },
    ],
  },
  {
    title: "Standard additions",
    features: [
      {
        label: "MCP access subject to confirmation",
        detail: "Source-listed with Standard; confirm current account, provider, tools and plan entitlement before subscribing",
        coexistence: false,
        standard: true,
      },
      {
        label: "Full Chat Application access",
        detail: "View and manage conversations inside Whats91",
        coexistence: false,
        standard: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Money helpers                                                       */
/* ------------------------------------------------------------------ */

/** Rounds to paise. Keeps 1699 * 0.18 from surfacing as 305.82000000000005. */
export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function gstOn(amount: number): number {
  return roundMoney(amount * GST_RATE);
}

/**
 * Indian-format currency. Whole rupees render without decimals (₹5,000);
 * amounts carrying paise always render two decimals (₹2,004.82).
 */
export function formatINR(value: number): string {
  const hasPaise = Math.round(value * 100) % 100 !== 0;
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/* ------------------------------------------------------------------ */
/* Pricing derivations                                                 */
/* ------------------------------------------------------------------ */

/** Subscription price for a cycle, excl. GST. */
export function planPrice(plan: Plan, billing: BillingCycle): number {
  return billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
}

/** Setup fee due for a cycle, excl. GST. Annual includes setup at no charge. */
export function setupFee(plan: Plan, billing: BillingCycle): number {
  return billing === "annual" ? 0 : plan.monthlySetupFee;
}

/** Approximate monthly equivalent of the annual price, for card sub-copy. */
export function annualPerMonth(plan: Plan): number {
  return Math.round(plan.annualPrice / 12);
}

/**
 * What a customer pays across their first twelve months on monthly billing
 * (12 subscriptions + the one-time setup fee), excl. GST.
 */
export function firstYearMonthlyCost(plan: Plan): number {
  return roundMoney(plan.monthlyPrice * 12 + plan.monthlySetupFee);
}

/** First-year saving from choosing annual over monthly, excl. GST. */
export function annualSavings(plan: Plan): number {
  return roundMoney(firstYearMonthlyCost(plan) - plan.annualPrice);
}

export interface RecurringCharge {
  /** Subscription amount, excl. GST */
  amount: number;
  gst: number;
  total: number;
  /** "month" | "year" */
  unit: string;
}

export interface OrderBreakdown {
  plan: Plan;
  billing: BillingCycle;
  /** "Annual" | "Monthly" */
  cycleLabel: string;
  /** "year" | "month" */
  cycleUnit: string;
  /** Subscription line, excl. GST */
  planAmount: number;
  /** One-time setup line, excl. GST. `null` when setup is included (annual). */
  setupFee: number | null;
  subtotal: number;
  gst: number;
  /** Total payable today, incl. GST */
  total: number;
  /** What is charged on every renewal after the first payment, incl. GST */
  recurring: RecurringCharge;
}

/**
 * Builds every line of the checkout order summary from the plan catalogue.
 *
 * Pure arithmetic — no network, no persistence. Expected results:
 *   Coexistence annual  → 5,000 + 900 GST      = ₹5,900 today
 *   Standard annual     → 7,000 + 1,260 GST    = ₹8,260 today
 *   Coexistence monthly → 699 + 1,000 + 305.82 = ₹2,004.82 today,
 *                         then ₹824.82/month
 *   Standard monthly    → 949 + 2,000 + 530.82 = ₹3,479.82 today,
 *                         then ₹1,119.82/month
 */
export function buildOrder(plan: Plan, billing: BillingCycle): OrderBreakdown {
  const planAmount = planPrice(plan, billing);
  const setup = setupFee(plan, billing);
  const subtotal = roundMoney(planAmount + setup);
  const gst = gstOn(subtotal);
  const total = roundMoney(subtotal + gst);

  const recurringGst = gstOn(planAmount);

  return {
    plan,
    billing,
    cycleLabel: billing === "annual" ? "Annual" : "Monthly",
    cycleUnit: billing === "annual" ? "year" : "month",
    planAmount,
    setupFee: billing === "monthly" ? setup : null,
    subtotal,
    gst,
    total,
    recurring: {
      amount: planAmount,
      gst: recurringGst,
      total: roundMoney(planAmount + recurringGst),
      unit: billing === "annual" ? "year" : "month",
    },
  };
}

/* ------------------------------------------------------------------ */
/* URL parameter parsing                                               */
/* ------------------------------------------------------------------ */

export interface ResolvedSelection<T> {
  value: T;
  /** false when the query string was missing or unrecognised */
  fromUrl: boolean;
}

export function resolvePlanId(raw?: string | string[]): ResolvedSelection<PlanId> {
  const candidate = (Array.isArray(raw) ? raw[0] : raw)?.trim().toLowerCase();
  const match = PLAN_IDS.find((id) => id === candidate);
  return { value: match ?? DEFAULT_PLAN_ID, fromUrl: Boolean(match) };
}

export function resolveBillingCycle(raw?: string | string[]): ResolvedSelection<BillingCycle> {
  const candidate = (Array.isArray(raw) ? raw[0] : raw)?.trim().toLowerCase();
  const match = BILLING_CYCLES.find((cycle) => cycle === candidate);
  return { value: match ?? DEFAULT_BILLING_CYCLE, fromUrl: Boolean(match) };
}

/** Canonical checkout link for a plan + cycle selection. */
export function checkoutHref(planId: PlanId, billing: BillingCycle): string {
  return `/checkout?plan=${planId}&billing=${billing}`;
}
