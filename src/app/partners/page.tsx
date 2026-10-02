import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata } from "@/lib/seo/config";
import { commercialQualification, partnerFAQs } from "@/lib/pricing";
import { formatINR, plans, type Plan } from "@/lib/plans";

export const metadata = generatePageMetadata({ title: "Whats91 Partner Program | Commercial Conditions", description: "Compare public platform plan prices while discussing separate Partner and Tech Partner rates, add-ons and responsibilities.", path: "/partners" });

const items: { name: string; plan?: Plan }[] = [
  { name: "WhatsApp Coexistence", plan: plans.coexistence },
  { name: "WhatsApp Standard", plan: plans.standard },
  { name: "103 — Flow Builder" },
  { name: "102 — WhatsApp Catalog Management" },
  { name: "101 — Campaign Utility Templates" },
];
export default function PartnersPage() {
  return <div className="min-h-screen flex flex-col bg-background"><FAQJsonLD faqs={partnerFAQs} /><Header /><main id="main-content" tabIndex={-1} className="flex-1"><div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
    <header><h1 className="heading-1">Whats91 Partner Program</h1><p className="text-lead mt-4">Discuss a referral or partner-led delivery arrangement that fits your team.</p></header>
    <p className="rounded-xl border border-info-border bg-info-soft p-4 text-sm">{commercialQualification}</p>
    <section aria-labelledby="partner-models" className="grid gap-6 sm:grid-cols-2"><h2 id="partner-models" className="sr-only">Partner models to discuss</h2>{[["Partner", "Discuss referrals with Whats91-led onboarding and support."], ["Tech Partner", "Discuss partner-led onboarding, support and integration delivery."]].map(([title, text]) => <article key={title} className="surface-card p-6"><h3 className="heading-3">{title}</h3><p className="text-body-sm mt-3">{text}</p><p className="text-caption mt-3">Permissions, responsibilities, eligibility and renewal benefits need agreement.</p></article>)}</section>
    <section id="pricing" aria-labelledby="partner-pricing" className="space-y-4"><h2 id="partner-pricing" className="heading-3">Plans and add-ons to discuss</h2><p className="text-body-sm">Public plan subscription prices exclude 18% GST; monthly setup and annual inclusion are detailed on <Link href="/plans" className="text-primary underline">Plans</Link>. Partner and Tech Partner rates, add-on prices, durations, included features and renewal benefits need a separate agreement. No automatic discount is assumed. Focus the table and use arrow keys to scroll across columns.</p><div role="region" aria-labelledby="partner-pricing" tabIndex={0} className="relative overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[640px] text-sm text-left"><caption className="sr-only">Public platform plan prices and separately pending partner terms</caption><thead><tr>{["Catalogue item", "Public platform subscription excl. GST", "Partner / Tech Partner terms"].map(label => <th scope="col" className="p-4" key={label}>{label}</th>)}</tr></thead><tbody>{items.map(item => <tr key={item.name} className="border-t border-border"><th scope="row" className="p-4 font-medium">{item.name}</th><td className="p-4">{item.plan ? `${formatINR(item.plan.monthlyPrice)}/month · ${formatINR(item.plan.annualPrice)}/year` : "Separate add-on quote"}</td><td className="p-4">Confirm written agreement</td></tr>)}</tbody></table></div></section>
    <section id="renewals" aria-labelledby="partner-renewals" className="surface-card p-6"><h2 id="partner-renewals" className="heading-3">Renewal and recharge conditions</h2><p className="text-body-sm mt-3">Confirm whether benefits apply at renewal, what a recharge credits, any deduction schedule and how tax is invoiced. This website does not assign subscriptions or enable a wallet.</p><Link href="/partners/whats91-coins" className="inline-flex min-h-11 items-center text-primary underline mt-3">Plan quantities and wallet questions</Link></section>
    <section aria-labelledby="partner-questions" className="space-y-4"><h2 id="partner-questions" className="heading-3">Partner questions</h2>{partnerFAQs.map(item => <details key={item.question} className="surface-card p-4"><summary className="min-h-11 font-semibold cursor-pointer">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}</section>
    <Link href="/contact" className="inline-flex min-h-12 items-center rounded-xl bg-primary text-primary-foreground px-5 font-semibold">Discuss a partner agreement</Link>
  </div></main><Footer /></div>;
}
