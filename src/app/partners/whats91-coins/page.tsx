import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata } from "@/lib/seo/config";
import { CoinsCalculator } from "./CoinsCalculator";
import { coinsFAQs } from "@/lib/pricing";

export const metadata = generatePageMetadata({ title: "Whats91 Coins | Partner Quantity Planner", description: "Plan partner assignments and wallet questions. Current coin conversion, deductions, recharge, durations, taxes and activation require confirmed terms.", path: "/partners/whats91-coins" });

export default function CoinsPage() {
  return <div className="min-h-screen flex flex-col bg-background"><FAQJsonLD faqs={coinsFAQs} /><Header /><main id="main-content" tabIndex={-1} className="flex-1"><div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
    <header><h1 className="heading-1">Whats91 Coins</h1><p className="text-lead mt-4">Plan the subscriptions and add-ons you want to discuss, with current wallet amounts withheld.</p></header>
    <section id="calculator" aria-labelledby="coins-calculator"><h2 id="coins-calculator" className="heading-3 mb-5">Partner quantity planner</h2><CoinsCalculator /></section>
    <section aria-labelledby="coins-questions" className="space-y-4"><h2 id="coins-questions" className="heading-3">Before recharging a wallet</h2>{coinsFAQs.map(item => <details className="surface-card p-4" key={item.question}><summary className="min-h-11 cursor-pointer font-semibold">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}</section>
    <Link href="/partners" className="inline-flex min-h-11 items-center text-primary underline">Review partner responsibilities and commercial conditions</Link>
  </div></main><Footer /></div>;
}
