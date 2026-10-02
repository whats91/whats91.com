import { noMarkupPolicy } from "@/lib/meta-pricing";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { commercialQualification, pricingFAQs } from "@/lib/pricing";
import { PlansSelector } from "./PlansSelector";

export const metadata = generatePageMetadata({ title: "Whats91 Plans | Coexistence & Standard", description: "Compare Coexistence and Standard monthly or annual platform prices, setup fees and 18% GST. Meta message charges are separate.", path: "/plans" });

export default function PlansPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FAQJsonLD faqs={pricingFAQs} />
      <BreadcrumbJsonLD items={[{ name: "Home", url: siteConfig.url }, { name: "Plans", url: `${siteConfig.url}/plans` }]} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
          <header><h1 className="heading-1">Whats91 Platform Plans</h1><p className="text-lead mt-4">Compare Coexistence and Standard, then review the conditions of your proposed subscription.</p></header>
          <section id="compare" aria-label="Compare plans"><PlansSelector /></section>
          <section id="gst" aria-labelledby="gst-heading" className="surface-card p-6 space-y-3">
            <h2 id="gst-heading" className="heading-3">Separate platform, message and tax charges</h2>
            <p className="text-body-sm">The prices above exclude 18% GST. Monthly billing adds the listed one-time setup fee; annual billing includes setup. The first platform payment and GST are shown for your selected cycle. Meta message charges, integrations and any add-ons are separate.</p><p className="text-body-sm">{noMarkupPolicy}</p>
            <p className="text-body-sm">Confirm renewal, trial and add-on terms, account eligibility, final invoice treatment and input-tax-credit eligibility in a written offer.</p>
            <p className="text-body-sm">{commercialQualification}</p>
            <Link href="/pricing" className="inline-flex min-h-11 items-center text-primary underline">Review message billing conditions</Link>
          </section>
          <section aria-labelledby="plans-questions" className="space-y-4"><h2 id="plans-questions" className="heading-3">Buying questions</h2>{pricingFAQs.map(item => <details className="surface-card p-4" key={item.question}><summary className="min-h-11 cursor-pointer font-semibold">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
