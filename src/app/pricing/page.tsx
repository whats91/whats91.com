import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { pricingFAQs, pricingQualification, commercialQualification, metaPricingUrl } from "@/lib/pricing";
import { PricingCostCalculator } from "./PricingCostCalculator";
import { metaPricingDescription, metaPricingSchedule, servicePricingPolicy, utilityPricingPolicy, freeEntryPricingPolicy, tierPricingPolicy } from "@/lib/meta-pricing";

export const metadata = generatePageMetadata({ title: "WhatsApp API Pricing India | Meta INR Rates & Platform Plans", description: metaPricingDescription, path: "/pricing" });

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FAQJsonLD faqs={pricingFAQs} />
      <BreadcrumbJsonLD items={[{ name: "Home", url: siteConfig.url }, { name: "Pricing", url: `${siteConfig.url}/pricing` }]} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
          <header><h1 className="heading-1">WhatsApp API Pricing India</h1><p className="text-lead mt-4">Build a budget from the effective message rate card and a separate platform offer.</p></header>
          <p className="text-body">{pricingQualification}</p>
          <span id="marketing" aria-hidden="true" />
          <section id="rates" aria-labelledby="rates-heading" className="surface-card p-6 space-y-4">
            <h2 id="rates-heading" className="heading-3">{metaPricingSchedule.effectiveLabel} · INR per delivered message</h2>
            <p className="text-body-sm">Match each delivered message to its recipient market, category, billing currency and pricing period. An accepted send request is not evidence of delivery or a final billed amount.</p>
            <p className="text-body-sm">The calculator below uses the official INR card for all 47 recipient markets and regions. It applies the supported monthly tier schedules and explicit allowances. Account eligibility and your invoice must still be reconciled separately.</p>
            <a href={metaPricingUrl} className="inline-flex min-h-11 items-center text-primary underline">Meta pricing and effective rate cards</a>
          </section>
          <span id="utility" aria-hidden="true" />
          <section id="volume" aria-labelledby="volume-heading" className="space-y-3">
            <h2 id="volume-heading" className="heading-3">Volume tiers belong to a category</h2>
            <p className="text-body-sm">{tierPricingPolicy}</p>
            <p className="text-caption">Select a recipient market below to see its numeric marginal tiers and rates.</p>
          </section>
          <section id="calculator" aria-labelledby="calculator-heading" className="space-y-4"><h2 id="calculator-heading" className="heading-3">Plan monthly message volumes</h2><PricingCostCalculator /></section>
          <section id="free" aria-labelledby="free-heading" className="surface-card p-6 space-y-3"><h2 id="free-heading" className="heading-3">Service allowance and free-entry windows</h2>{[servicePricingPolicy, utilityPricingPolicy, freeEntryPricingPolicy].map(text => <p key={text} className="text-body-sm">{text}</p>)}</section>
          <section id="billing" aria-labelledby="billing-heading" className="surface-card p-6 space-y-4"><h2 id="billing-heading" className="heading-3">What your written offer needs to show</h2><p className="text-body-sm">{commercialQualification}</p><ul className="list-disc pl-5 space-y-2 text-sm"><li>Meta message charges and their rate-card period, category and currency.</li><li>Platform subscription, renewal cycle, any trial and add-on duration.</li><li>One-time setup, quoted integration work and annual inclusion.</li><li>Applicable taxes, invoice rounding and total payable in the original currency.</li></ul><p className="text-caption">The plan selector and checkout summary show 18% GST on the listed platform and setup amounts. Final invoice and input-tax-credit treatment still require confirmation.</p><Link href="/plans" className="inline-flex min-h-11 items-center text-primary underline">Compare platform prices and features</Link></section>
          <section aria-labelledby="pricing-questions" className="space-y-4"><h2 id="pricing-questions" className="heading-3">Pricing questions</h2>{pricingFAQs.map(item => <details className="surface-card p-4" key={item.question}><summary className="min-h-11 cursor-pointer font-semibold">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
