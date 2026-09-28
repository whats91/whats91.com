import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container, Section, Eyebrow, IconBadge } from "@/components/shared";
import { cn } from "@/lib/utils";
import {
  BILLING_CYCLES,
  buildOrder,
  checkoutHref,
  featureGroups,
  formatINR,
  plans,
  resolveBillingCycle,
  resolvePlanId,
  GST_LABEL,
} from "@/lib/plans";
import {
  ArrowLeft,
  Check,
  Clock,
  Gift,
  Info,
  Lock,
  Receipt,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";

/**
 * Checkout is a per-visitor summary of a selection made on /plans and must
 * never be indexed or served from a shared cache keyed without its query.
 */
export const metadata: Metadata = {
  title: "Checkout | Whats91",
  description:
    "Review your selected Whats91 plan, billing cycle and GST breakdown before payment.",
  robots: { index: false, follow: false },
};

interface CheckoutPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Dummy checkout. Displays the order summary derived from the plan catalogue
 * in `@/lib/plans` and nothing else — there is deliberately no payment
 * gateway, API call, server action or persistence anywhere on this route.
 */
export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const planSelection = resolvePlanId(params.plan);
  const billingSelection = resolveBillingCycle(params.billing);

  const plan = plans[planSelection.value];
  const billing = billingSelection.value;
  const order = buildOrder(plan, billing);
  const isAnnual = billing === "annual";

  // True when the visitor landed here without a usable selection (direct
  // link, bookmark, stale URL) and we fell back to the default plan/cycle.
  const usingDefaults = !planSelection.fromUrl || !billingSelection.fromUrl;

  const includedFeatures = featureGroups.flatMap((group) =>
    group.features.filter((feature) => feature[plan.id]).map((feature) => feature.label)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Section tone="brand-soft" pad="sm">
          <Container>
            <Link
              href="/plans"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to plans
            </Link>
            <div className="mt-4">
              <Eyebrow icon={ShoppingCart} className="mb-4">
                Checkout
              </Eyebrow>
              <h1 className="heading-1">Review your order</h1>
              <p className="text-lead measure-prose mt-3">
                {plan.name} on {order.cycleLabel.toLowerCase()} billing. All amounts below are shown
                with 18% GST as a separate line item.
              </p>
            </div>
          </Container>
        </Section>

        <Section pad="default">
          <Container>
            {usingDefaults && (
              <div
                role="status"
                className="mb-8 rounded-xl border border-info-border bg-info-soft p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 shrink-0 text-info mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      No plan was selected, so we are showing {plan.name} on{" "}
                      {order.cycleLabel.toLowerCase()} billing.
                    </p>
                    <p className="mt-1 text-body-sm">
                      To pick a different combination, choose a plan and billing cycle on the{" "}
                      <Link href="/plans" className="font-semibold text-brand-primary hover:underline">
                        plans page
                      </Link>
                      , or switch billing cycle below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] items-start">
              {/* ---------------- Selection details ---------------- */}
              <div className="space-y-6">
                <section aria-labelledby="selection-heading" className="surface-card p-6 sm:p-8">
                  <h2 id="selection-heading" className="heading-3 mb-1">
                    {plan.name}
                  </h2>
                  <p className="text-body-sm mb-6">{plan.description}</p>

                  <dl className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="rounded-xl border border-border/60 bg-surface/60 p-4">
                      <dt className="text-caption uppercase tracking-wide">Selected plan</dt>
                      <dd className="mt-1 text-base font-semibold text-text-primary">{plan.name}</dd>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-surface/60 p-4">
                      <dt className="text-caption uppercase tracking-wide">Billing cycle</dt>
                      <dd className="mt-1 text-base font-semibold text-text-primary">
                        {order.cycleLabel}
                        <span className="block text-caption font-normal">
                          Billed every {order.cycleUnit}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  {/* Billing cycle switcher — plain links, keeps the plan */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-text-secondary">
                      Change billing cycle:
                    </span>
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface p-1">
                      {BILLING_CYCLES.map((cycle) => {
                        const active = cycle === billing;
                        return (
                          <Link
                            key={cycle}
                            href={checkoutHref(plan.id, cycle)}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                              active
                                ? "bg-brand-600 text-brand-primary-foreground"
                                : "text-text-secondary hover:text-text-primary"
                            )}
                          >
                            {cycle === "annual" ? "Annual" : "Monthly"}
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/plans"
                      className="text-sm font-semibold text-brand-primary hover:underline"
                    >
                      Change plan
                    </Link>
                  </div>
                </section>

                <section aria-labelledby="included-heading" className="surface-card p-6 sm:p-8">
                  <h2 id="included-heading" className="heading-4 mb-4">
                    What is included in {plan.name}
                  </h2>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {includedFeatures.map((label) => (
                      <li key={label} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-brand-primary" aria-hidden="true" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-caption">
                    Plan fees cover the Whats91 platform. WhatsApp conversation charges are billed
                    separately at Meta&apos;s India rates —{" "}
                    <Link href="/pricing" className="font-medium text-brand-primary hover:underline">
                      see the per-message rate card
                    </Link>
                    .
                  </p>
                </section>
              </div>

              {/* ---------------- Order summary ---------------- */}
              <section
                aria-labelledby="order-summary-heading"
                className="surface-card p-6 sm:p-7 lg:sticky lg:top-24"
              >
                <div className="flex items-center gap-3 mb-5">
                  <IconBadge icon={Receipt} />
                  <h2 id="order-summary-heading" className="heading-4">
                    Order summary
                  </h2>
                </div>

                <dl className="space-y-3">
                  {/* Plan price */}
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-text-secondary">
                      {plan.name}
                      <span className="block text-caption">
                        {order.cycleLabel} plan, per {order.cycleUnit}
                      </span>
                    </dt>
                    <dd className="text-sm font-semibold text-text-primary tabular-nums">
                      {formatINR(order.planAmount)}
                    </dd>
                  </div>

                  {/* One-time setup fee — monthly billing only */}
                  {order.setupFee !== null && (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm text-text-secondary">
                        One-time setup fee
                        <span className="block text-caption">Charged once, on this payment only</span>
                      </dt>
                      <dd className="text-sm font-semibold text-text-primary tabular-nums">
                        {formatINR(order.setupFee)}
                      </dd>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-3">
                    <dt className="text-sm font-medium text-text-primary">Subtotal</dt>
                    <dd className="text-sm font-semibold text-text-primary tabular-nums">
                      {formatINR(order.subtotal)}
                    </dd>
                  </div>

                  {/* GST */}
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-text-secondary">{GST_LABEL}</dt>
                    <dd className="text-sm font-semibold text-text-primary tabular-nums">
                      {formatINR(order.gst)}
                    </dd>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-4">
                    <dt className="text-base font-semibold text-text-primary">Total payable today</dt>
                    <dd className="text-2xl font-bold text-brand-primary tabular-nums">
                      {formatINR(order.total)}
                    </dd>
                  </div>
                </dl>

                {/* Cycle-specific disclosure */}
                {isAnnual ? (
                  <div className="mt-5 rounded-xl border border-success-border bg-success-soft p-4">
                    <p className="flex items-start gap-2 text-sm font-semibold text-success">
                      <Gift className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                      One-time setup included
                    </p>
                    <p className="mt-1.5 pl-6 text-caption">
                      No setup fee is charged on annual billing. Renews at{" "}
                      {formatINR(order.recurring.total)} per {order.recurring.unit}, including GST.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-5 rounded-xl border border-warning-border bg-warning-soft p-4">
                      <p className="flex items-start gap-2 text-sm font-semibold text-text-primary">
                        <Clock className="h-4 w-4 shrink-0 mt-0.5 text-warning" aria-hidden="true" />
                        Setup is charged once
                      </p>
                      <p className="mt-1.5 pl-6 text-caption">
                        The {formatINR(plan.monthlySetupFee)} + GST setup fee appears on this first
                        payment only. It is never charged again on this plan.
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-border/60 bg-surface/60 p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                        <RefreshCw className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                        Recurring from month two
                      </p>
                      <dl className="space-y-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-text-secondary">{plan.name}, monthly</dt>
                          <dd className="text-sm text-text-primary tabular-nums">
                            {formatINR(order.recurring.amount)}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-text-secondary">{GST_LABEL}</dt>
                          <dd className="text-sm text-text-primary tabular-nums">
                            {formatINR(order.recurring.gst)}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-2">
                          <dt className="text-sm font-semibold text-text-primary">
                            Recurring monthly total
                          </dt>
                          <dd className="text-sm font-bold text-text-primary tabular-nums">
                            {formatINR(order.recurring.total)}/{order.recurring.unit}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </>
                )}

                {/* Non-operative payment CTA */}
                <div className="mt-6">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    aria-describedby="payment-unavailable-note"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-base font-semibold text-brand-primary-foreground opacity-50 cursor-not-allowed"
                  >
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Proceed to Payment
                  </button>
                  <p
                    id="payment-unavailable-note"
                    className="mt-3 text-center text-caption"
                  >
                    Payment integration is coming soon. Nothing is charged and no order is placed
                    from this page.
                  </p>
                  <p className="mt-4 text-center text-sm text-text-secondary">
                    Want to start now?{" "}
                    <Link href="/contact" className="font-semibold text-brand-primary hover:underline">
                      Contact our team
                    </Link>{" "}
                    to activate this plan.
                  </p>
                </div>
              </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
