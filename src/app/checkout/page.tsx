import { metaPricingQualification } from "@/lib/meta-pricing";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BILLING_CYCLES, buildOrder, checkoutHref, formatINR, GST_LABEL, plans, resolveBillingCycle, resolvePlanId } from "@/lib/plans";
import { generatePageMetadata } from "@/lib/seo/config";
import { commercialQualification } from "@/lib/pricing";

export const metadata: Metadata = { ...generatePageMetadata({ title: "Checkout | Whats91", description: "Review selected Whats91 platform and setup prices with 18% GST. Meta message charges are separate; online payment is unavailable.", path: "/checkout" }), robots: { index: false, follow: false } };

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const selection = resolvePlanId(params.plan);
  const cycle = resolveBillingCycle(params.billing);
  const plan = plans[selection.value];
  const order = buildOrder(plan, cycle.value);
  const usingDefaults = !selection.fromUrl || !cycle.fromUrl;
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <Link href="/plans" className="inline-flex min-h-11 items-center text-primary underline">Back to plans</Link>
          <header><h1 className="heading-1">Review your selection</h1><p className="text-lead mt-4">{plan.name} — preferred {order.cycleLabel.toLowerCase()} billing.</p></header>
          {usingDefaults && <p role="status" className="rounded-xl border border-info-border bg-info-soft p-4">No usable plan or billing selection was provided. Showing {plan.name} on {order.cycleLabel.toLowerCase()} billing; you can change this preference below.</p>}
          <p className="text-body-sm">{commercialQualification}</p>
          <div className="grid gap-8 lg:grid-cols-2">
            <section aria-labelledby="selection-heading" className="surface-card p-6 space-y-5">
              <h2 id="selection-heading" className="heading-3">{plan.name}</h2><p className="text-body-sm">{plan.description}</p>
              <nav aria-label="Preferred billing cycle" className="flex flex-wrap gap-3">{BILLING_CYCLES.map(billing => <Link key={billing} href={checkoutHref(plan.id, billing)} aria-current={billing === cycle.value ? "true" : undefined} className="inline-flex min-h-11 items-center rounded-xl border border-border px-4">{billing === "annual" ? "Annual" : "Monthly"}</Link>)}</nav>
              <Link href="/plans" className="inline-flex min-h-11 items-center text-primary underline">Change plan</Link>
              <p className="text-caption">Monthly setup is charged once; annual setup is included. Confirm included features, renewal and account eligibility in your written offer.</p>
            </section>
            <section aria-labelledby="order-summary-heading" className="surface-card p-6 space-y-5">
              <h2 id="order-summary-heading" className="heading-3">Platform first-payment summary</h2><p className="text-caption">{metaPricingQualification} <Link href="/pricing" className="text-primary underline">View message rates</Link></p>
              <dl className="space-y-4 text-sm">{[[`Platform subscription · ${order.cycleLabel.toLowerCase()}`, formatINR(order.planAmount)], ["One-time setup", order.setupFee === null ? "Included with annual billing" : formatINR(order.setupFee)], ["Subtotal before GST", formatINR(order.subtotal)], [GST_LABEL, formatINR(order.gst)], ["First platform payment incl. GST", formatINR(order.total)], ["Meta messaging charges", "Separate Meta pass-through; no markup"], ["Renewal terms", "Confirm written offer"]].map(([name, value]) => <div className="flex flex-wrap justify-between gap-2" key={name}><dt>{name}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
              <p className="text-caption">The first-payment figure covers only this listed platform subscription and setup. Meta deliveries, integrations and any add-ons are outside it; final invoice treatment requires confirmation.</p>
              <button disabled className="h-12 w-full rounded-xl bg-primary text-primary-foreground">Payment unavailable</button>
              <p id="payment-unavailable-note" className="text-caption">This selection does not create an order or activate a plan. No payment gateway or account action is connected.</p>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-primary underline">Discuss a written offer</Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
