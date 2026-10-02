import { numericInput } from "@/lib/tool-inputs";
import { GST_RATE, roundMoney } from "@/lib/plans";
export type PartnerKind = "partner" | "techPartner";

export type CoinItem = {
  key: string;
  label: string;
  group: "Plan" | "Add-on";
  partnerCost: number;
  techPartnerCost: number;
};

export const coinItems: CoinItem[] = [
  { key: "coexisting1y", label: "Co-Existing 1 Year", group: "Plan", partnerCost: 3500, techPartnerCost: 2500 },
  { key: "coexisting3y", label: "Co-Existing 3 Years", group: "Plan", partnerCost: 8000, techPartnerCost: 6000 },
  { key: "standard1y", label: "Standard / Extender 1 Year", group: "Plan", partnerCost: 5000, techPartnerCost: 4000 },
  { key: "standard3y", label: "Standard / Extender 3 Years", group: "Plan", partnerCost: 11000, techPartnerCost: 9000 },
  { key: "flowBuilder", label: "103 - Flow Builder", group: "Add-on", partnerCost: 1500, techPartnerCost: 1000 },
  { key: "catalog", label: "102 - WhatsApp Catalog Management", group: "Add-on", partnerCost: 3000, techPartnerCost: 2000 },
  { key: "campaignUtility", label: "101 - Campaign Utility Templates", group: "Add-on", partnerCost: 1500, techPartnerCost: 1000 },
];


// Source catalogue only; current price, duration, recharge/tax approval is absent.
export const partnerTermsConfirmed = false;
export function coinRequirement(counts: Record<string, number>, kind: PartnerKind): number | null {
  if (!["partner", "techPartner"].includes(kind) || Object.keys(counts).some(key => !coinItems.some(item => item.key === key)) || coinItems.some(item => numericInput(counts[item.key] ?? 0, { integer: true, max: 1000000 }) === null)) return null;
  return coinItems.reduce((sum, item) => sum + (counts[item.key] ?? 0) * (kind === "partner" ? item.partnerCost : item.techPartnerCost), 0);
}
export function coinRecharge(required: number, balance: number) {
  if (numericInput(required) === null || numericInput(balance) === null) return null;
  const shortfall = Math.max(0, required - balance);
  const gst = roundMoney(shortfall * GST_RATE);
  const total = roundMoney(shortfall + gst);
  return Number.isFinite(total) && total <= Number.MAX_SAFE_INTEGER ? { required, shortfall, gst, total } : null;
}
export function publicCoinEstimate(counts: Record<string, number>, kind: PartnerKind, balance: number) {
  const required = coinRequirement(counts, kind);
  return partnerTermsConfirmed && required !== null ? coinRecharge(required, balance) : null;
}
