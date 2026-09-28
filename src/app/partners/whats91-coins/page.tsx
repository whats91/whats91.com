import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeIndianRupee,
  Calculator,
  CheckCircle2,
  Coins,
  CreditCard,
  Handshake,
  Layers,
  RefreshCw,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";
import { CoinsCalculator } from "./CoinsCalculator";

const pagePath = "/partners/whats91-coins";
const pageUrl = `${siteConfig.url}${pagePath}`;
const partnerRegisterUrl = "https://app.whats91.com/partner/register";

export const metadata: Metadata = generatePageMetadata({
  title: "Whats91 Coins Wallet for Partners | Recharge & Usage Calculator",
  description:
    "Learn how Whats91 Coins help Partners and Tech Partners assign plans, add-ons, and customer subscriptions independently. Calculate coin usage, recharge value, GST, and wallet balance.",
  keywords: [
    "Whats91 Coins",
    "Whats91 Coins wallet",
    "Whats91 partner wallet",
    "WhatsApp API partner coins",
    "Tech Partner coins calculator",
    "Whats91 recharge calculator",
    "partner subscription assignment",
  ],
  path: pagePath,
});

const faqs = [
  {
    question: "What are Whats91 Coins?",
    answer:
      "Whats91 Coins are wallet credits used by Partners and Tech Partners to activate customer subscriptions, assign plans, and add add-ons from their partner wallet.",
  },
  {
    question: "What is the value of one Whats91 Coin?",
    answer:
      "One Whats91 Coin equals one INR of pre-GST wallet value. If a partner recharges a base amount of ₹10,000, the wallet receives 10,000 coins.",
  },
  {
    question: "How does GST work when recharging coins?",
    answer:
      "Partners pay the recharge base amount plus 18% GST. Coins are credited only for the pre-GST base amount, so a ₹10,000 recharge costs ₹11,800 payable and credits 10,000 coins.",
  },
  {
    question: "Do plan and add-on deductions include GST?",
    answer:
      "No. Plan and add-on deductions use the listed pre-GST coin values only. GST is handled at wallet recharge, not during each assignment deduction.",
  },
  {
    question: "Can partners assign plans independently?",
    answer:
      "Yes. The Coins system is designed so Partners and Tech Partners can assign eligible plans, add-ons, and customer subscriptions from their wallet without waiting for Whats91 manual assignment.",
  },
  {
    question: "Do Partner and Tech Partner coin deductions differ?",
    answer:
      "Yes. Coin deductions follow the Partner or Tech Partner pricing tier. Tech Partners use the lower Tech Partner coin values because they handle onboarding and support independently.",
  },
  {
    question: "Are Meta message charges paid with Whats91 Coins?",
    answer:
      "No. Meta per-message charges remain separate and are paid directly to Meta as per Meta template and message rates.",
  },
  {
    question: "Is the calculator a billing record?",
    answer:
      "No. The calculator is an educational estimate for planning wallet balance, coin requirements, and GST payable on recharge. Actual wallet activity is controlled inside the Whats91 platform.",
  },
];

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Partners", url: "/partners" },
    { name: "Whats91 Coins", url: pagePath },
  ]),
  generateFAQSchema(faqs),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Whats91 Coins Wallet for Partners",
    description:
      "Guide to Whats91 Coins for Partners and Tech Partners, including wallet recharge, GST treatment, subscription assignment, add-on deductions, and calculator usage.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: [
      { "@type": "Thing", name: "Whats91 Coins" },
      { "@type": "Thing", name: "Partner wallet recharge" },
      { "@type": "Thing", name: "Subscription assignment" },
      { "@type": "Thing", name: "GST on wallet recharge" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#calculator`,
    name: "Whats91 Coins Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description:
      "Calculator for Partners and Tech Partners to estimate Whats91 Coins usage, wallet balance, recharge shortfall, GST, and payable amount.",
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    featureList: [
      "Partner and Tech Partner coin pricing",
      "Wallet balance estimate",
      "Maximum activations by coin balance",
      "Custom assignment mix calculation",
      "Recharge GST calculation",
      "Coins needed by customer plan and add-on count",
    ],
  },
];

const explanationCards = [
  {
    icon: Coins,
    title: "1 INR equals 1 coin",
    text: "Coins represent pre-GST wallet value. A base recharge of ₹10,000 gives the partner 10,000 usable coins.",
  },
  {
    icon: BadgeIndianRupee,
    title: "GST is paid on recharge",
    text: "Partners pay base amount plus 18% GST. GST is not credited into the coin wallet.",
  },
  {
    icon: Layers,
    title: "Plans deduct listed coins",
    text: "Customer plan and add-on assignments deduct the Partner or Tech Partner pre-GST coin value.",
  },
  {
    icon: ShieldCheck,
    title: "Partners assign independently",
    text: "The wallet model helps partners activate eligible customer subscriptions without waiting for manual assignment.",
  },
];

const flowSteps = [
  "Partner recharges wallet with base amount plus 18% GST",
  "Whats91 credits coins equal to the pre-GST base amount",
  "Partner assigns customer plan or add-on from wallet",
  "Coins are deducted according to Partner or Tech Partner pricing",
  "Partner tracks balance and recharges again when needed",
];

export default function Whats91CoinsPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1">
        <article>
          <section className="relative overflow-hidden bg-gradient-to-b from-surface/80 to-background py-14 sm:py-16 md:py-20">
            <div className="absolute inset-0 gradient-brand-subtle" aria-hidden="true" />
            <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
                <header className="text-center lg:text-left">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-card px-4 py-1.5 text-xs font-semibold text-brand-primary shadow-sm sm:text-sm">
                    <Wallet className="h-4 w-4" />
                    Whats91 Coins Wallet
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                    Whats91 Coins Wallet for Partners
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0">
                    Whats91 Coins let Partners and Tech Partners recharge once, manage a coin balance, assign customer subscriptions, and activate add-ons independently from their wallet.
                  </p>
                  <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                    <Button asChild className="h-11 rounded-xl bg-brand-primary px-6 text-white hover:bg-brand-primary-hover">
                      <a href="#coins-calculator">
                        Use Calculator
                        <Calculator className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-xl border-border bg-card px-6 text-text-primary hover:bg-surface">
                      <Link href="/partners">
                        View Partner Pricing
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </header>

                <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-xl shadow-brand-primary/10 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Recharge formula</p>
                      <h2 className="mt-1 text-xl font-bold text-text-primary">GST is paid, but not credited as coins</h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <CreditCard className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Recharge base amount", "₹10,000"],
                      ["GST at 18%", "₹1,800"],
                      ["Total payable", "₹11,800"],
                      ["Coins credited", "10,000 coins"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/50 px-4 py-3">
                        <span className="text-sm text-text-secondary">{label}</span>
                        <span className="font-semibold text-text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4 text-sm leading-relaxed text-text-secondary">
                    <strong className="text-text-primary">Simple rule:</strong> 1 INR of pre-GST recharge value becomes 1 Whats91 Coin.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="coins-explained-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">How coins work</p>
                <h2 id="coins-explained-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  A wallet system for partner-led subscription management
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  Whats91 Coins are designed so partners can plan wallet balance, assign subscriptions, and activate add-ons without needing Whats91 to manually create every assignment.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-4">
                {explanationCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="rounded-2xl border-border/70 bg-card shadow-sm">
                      <CardContent className="p-5">
                        <Icon className="mb-4 h-6 w-6 text-brand-primary" />
                        <h3 className="font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="recharge-flow-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Recharge and assignment flow</p>
                  <h2 id="recharge-flow-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                    Recharge once, assign plans and add-ons as customers are onboarded
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    Partners pay GST during wallet recharge. After that, assigning a plan or add-on deducts only the listed coin value from the wallet, based on whether the account is a Partner or Tech Partner.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    Meta per-message charges remain separate and are paid directly to Meta as per Meta template/message rates.
                  </p>
                </div>
                <div className="space-y-4">
                  {flowSteps.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-sm font-bold text-brand-primary">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="coins-calculator" className="py-14 sm:py-16 md:py-20" aria-labelledby="coins-calculator-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <CoinsCalculator />
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="examples-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Examples</p>
                <h2 id="examples-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Partner and Tech Partner coin usage examples
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  {
                    title: "Partner example",
                    lines: [
                      "10,000 coin recharge means ₹10,000 base value plus ₹1,800 GST payable.",
                      "A Partner can activate two Standard / Extender 1 Year plans at 5,000 coins each.",
                      "The wallet deduction is 10,000 coins; GST was already handled at recharge.",
                    ],
                  },
                  {
                    title: "Tech Partner example",
                    lines: [
                      "10,000 coins can activate two Standard / Extender 1 Year plans at 4,000 coins each.",
                      "The same Tech Partner still has 2,000 coins left for add-ons such as Flow Builder or Catalog.",
                      "Lower deductions reflect the Tech Partner's responsibility for onboarding and support.",
                    ],
                  },
                ].map((example) => (
                  <Card key={example.title} className="rounded-2xl border-border/70 bg-card shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary">{example.title}</h3>
                      <ul className="mt-5 space-y-3">
                        {example.lines.map((line) => (
                          <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">FAQ</p>
                <h2 id="faq-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Whats91 Coins questions
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <summary className="cursor-pointer list-none text-base font-semibold text-text-primary">
                      <span className="flex items-center justify-between gap-4">
                        {faq.question}
                        <span className="text-brand-primary transition-transform group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-brand-primary p-8 text-center text-white shadow-xl shadow-brand-primary/20 sm:p-10">
                <Handshake className="mx-auto mb-4 h-10 w-10" />
                <h2 className="text-2xl font-bold sm:text-3xl">Need the full partner model?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  Review the Partner and Tech Partner pricing page to compare responsibilities, plans, add-ons, and renewal benefits.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl bg-white px-6 text-brand-700 hover:bg-white/90">
                    <Link href="/partners">Back to Partner Program</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl border-white/30 bg-transparent px-6 text-white hover:bg-white/10">
                    <a href={partnerRegisterUrl} target="_blank" rel="noopener noreferrer">
                      Register as Partner
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
