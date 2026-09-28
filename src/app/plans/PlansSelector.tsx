"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Check, Minus, Sparkles, Gift, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BILLING_CYCLES,
  DEFAULT_BILLING_CYCLE,
  annualPerMonth,
  annualSavings,
  checkoutHref,
  featureGroups,
  firstYearMonthlyCost,
  formatINR,
  planList,
  planPrice,
  setupFee,
  type BillingCycle,
} from "@/lib/plans";

const cycleOptions: { value: BillingCycle; label: string; badge?: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual", badge: "Setup free" },
];

/**
 * Billing-cycle switch + plan cards + full feature comparison.
 *
 * The only stateful part of /plans: the selected billing cycle drives the
 * prices shown and the plan/cycle carried into the checkout URL. Every price
 * shown here is exclusive of GST — the 18% is added and itemised at checkout.
 */
export function PlansSelector() {
  const [billing, setBilling] = useState<BillingCycle>(DEFAULT_BILLING_CYCLE);
  const groupName = useId();
  const isAnnual = billing === "annual";

  return (
    <div>
      {/* Billing cycle switch */}
      <fieldset className="flex flex-col items-center gap-3">
        <legend className="sr-only">Choose a billing cycle</legend>
        <div
          className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface p-1"
          data-testid="billing-switch"
        >
          {cycleOptions.map((option) => {
            const selected = billing === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "relative inline-flex cursor-pointer items-center gap-2 rounded-full px-4 sm:px-6 py-2.5",
                  "text-sm font-semibold transition-colors duration-200",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-primary has-[:focus-visible]:ring-offset-2",
                  selected
                    ? "bg-brand-600 text-brand-primary-foreground shadow-md shadow-brand-primary/20"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={selected}
                  onChange={() => setBilling(option.value)}
                  className="sr-only"
                />
                {option.label}
                {option.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      selected ? "bg-white/20 text-white" : "bg-success-soft text-success"
                    )}
                  >
                    {option.badge}
                  </span>
                )}
              </label>
            );
          })}
        </div>
        <p className="text-caption text-center">
          All prices exclude 18% GST. GST is shown as a separate line at checkout.
        </p>
      </fieldset>

      {/* Plan cards */}
      <div
        className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2"
        aria-live="polite"
      >
        {planList.map((plan) => {
          const price = planPrice(plan, billing);
          const setup = setupFee(plan, billing);
          const savings = annualSavings(plan);

          return (
            <article
              key={plan.id}
              aria-labelledby={`plan-${plan.id}-name`}
              className={cn(
                "relative flex flex-col rounded-2xl p-6 sm:p-8 transition-shadow duration-300",
                plan.featured
                  ? "border-2 border-brand-primary/40 bg-card shadow-lg shadow-brand-primary/10"
                  : "surface-card surface-card-hover"
              )}
            >
              {plan.featured && plan.featuredLabel && (
                <span className="absolute -top-3 left-6 sm:left-8 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-brand-primary-foreground shadow-sm">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {plan.featuredLabel}
                </span>
              )}

              <header className="mb-5">
                <h3 id={`plan-${plan.id}-name`} className="heading-3">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-body-sm">{plan.tagline}</p>
              </header>

              {/* Price block */}
              <div className="mb-5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl sm:text-[2.75rem] font-bold leading-none text-text-primary">
                    {formatINR(price)}
                  </span>
                  <span className="text-base font-medium text-text-secondary">
                    /{isAnnual ? "year" : "month"}
                  </span>
                  <span className="text-sm font-semibold text-brand-primary">+ 18% GST</span>
                </div>
                <p className="mt-2 text-caption">
                  {isAnnual
                    ? `≈ ${formatINR(annualPerMonth(plan))}/month, billed annually`
                    : `${formatINR(plan.annualPrice)}/year on annual billing`}
                </p>
              </div>

              {/* Setup fee treatment — the annual advantage */}
              {isAnnual ? (
                <div className="mb-6 rounded-xl border border-success-border bg-success-soft p-4">
                  <p className="flex items-start gap-2 text-sm font-semibold text-success">
                    <Gift className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                    One-time setup included at no additional charge
                  </p>
                  <p className="mt-1.5 pl-6 text-caption">
                    Saves {formatINR(savings)} in year one versus monthly billing
                    ({formatINR(firstYearMonthlyCost(plan))} for 12 months + {formatINR(plan.monthlySetupFee)} setup,
                    both excl. GST).
                  </p>
                </div>
              ) : (
                <div className="mb-6 rounded-xl border border-warning-border bg-warning-soft p-4">
                  <p className="flex items-start gap-2 text-sm font-semibold text-text-primary">
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-warning" aria-hidden="true" />
                    {formatINR(setup)} + GST one-time setup fee
                  </p>
                  <p className="mt-1.5 pl-6 text-caption">
                    Charged once, on your first payment. Switch to annual and setup is free.
                  </p>
                </div>
              )}

              {/* Highlights */}
              <ul className="mb-8 space-y-2.5">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-brand-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA — carries plan + cycle into checkout */}
              <Link
                href={checkoutHref(plan.id, billing)}
                className={cn(
                  "mt-auto inline-flex h-12 w-full items-center justify-center rounded-xl px-6",
                  "text-sm sm:text-base font-semibold transition-all duration-200",
                  plan.featured
                    ? "bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30"
                    : "border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border"
                )}
              >
                Choose {plan.name} — {isAnnual ? "Annual" : "Monthly"}
              </Link>
              <p className="mt-3 text-center text-caption">
                Total today at checkout includes 18% GST
                {!isAnnual && " and the one-time setup fee"}.
              </p>
            </article>
          );
        })}
      </div>

      {/* Feature comparison */}
      <div className="mt-12 sm:mt-16">
        <h3 className="heading-3 text-center mb-6 sm:mb-8">Full feature comparison</h3>
        <div className="surface-card overflow-hidden">
          {/* `relative` makes this the containing block for the absolutely
              positioned .sr-only labels in the cells. Without it they resolve
              against the viewport at the table's full 560px width and push the
              whole document into horizontal scroll on phones. */}
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <caption className="sr-only">
                Feature and price comparison between the WhatsApp Coexistence and WhatsApp Standard
                plans on {isAnnual ? "annual" : "monthly"} billing. All prices exclude 18% GST.
              </caption>
              <thead>
                <tr className="bg-surface/80">
                  <th scope="col" className="p-4 text-left text-xs font-semibold uppercase text-text-muted">
                    Feature
                  </th>
                  {planList.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={cn(
                        "p-4 text-center text-sm font-semibold text-text-primary",
                        plan.featured && "bg-brand-primary/5"
                      )}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Price rows */}
                <tr className="border-t border-border/60">
                  <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary">
                    {isAnnual ? "Annual price" : "Monthly price"}
                    <span className="block text-caption font-normal">+ 18% GST</span>
                  </th>
                  {planList.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn(
                        "p-4 text-center text-base font-bold text-brand-primary",
                        plan.featured && "bg-brand-primary/5"
                      )}
                    >
                      {formatINR(planPrice(plan, billing))}
                      <span className="block text-caption font-normal">
                        per {isAnnual ? "year" : "month"}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border/60">
                  <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary">
                    One-time setup fee
                    <span className="block text-caption font-normal">+ 18% GST, charged once</span>
                  </th>
                  {planList.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn("p-4 text-center text-sm", plan.featured && "bg-brand-primary/5")}
                    >
                      {isAnnual ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Included
                        </span>
                      ) : (
                        <span className="font-semibold text-text-primary">
                          {formatINR(plan.monthlySetupFee)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Feature rows, grouped */}
                {featureGroups.map((group) => (
                  <FeatureGroupRows key={group.title} title={group.title} features={group.features} />
                ))}

                {/* CTA row */}
                <tr className="border-t border-border/60">
                  <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary">
                    Get started
                  </th>
                  {planList.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn("p-4 text-center", plan.featured && "bg-brand-primary/5")}
                    >
                      <Link
                        href={checkoutHref(plan.id, billing)}
                        className={cn(
                          "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors duration-200",
                          plan.featured
                            ? "bg-brand-600 text-brand-primary-foreground hover:bg-brand-700"
                            : "border border-border/80 text-text-primary hover:bg-surface"
                        )}
                      >
                        <span className="sr-only">
                          {plan.name}, {isAnnual ? "annual" : "monthly"} billing —{" "}
                        </span>
                        Continue
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureGroupRows({
  title,
  features,
}: {
  title: string;
  features: (typeof featureGroups)[number]["features"];
}) {
  return (
    <>
      <tr className="border-t border-border/60 bg-surface/50">
        <th
          scope="colgroup"
          colSpan={planList.length + 1}
          className="p-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
        >
          {title}
        </th>
      </tr>
      {features.map((feature) => (
        <tr key={feature.label} className="border-t border-border/60">
          <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary">
            {feature.label}
            {feature.detail && (
              <span className="block text-caption font-normal">{feature.detail}</span>
            )}
          </th>
          {planList.map((plan) => {
            const included = feature[plan.id];
            return (
              <td
                key={plan.id}
                className={cn("p-4 text-center", plan.featured && "bg-brand-primary/5")}
              >
                {included ? (
                  <>
                    <Check className="mx-auto h-5 w-5 text-success" aria-hidden="true" />
                    <span className="sr-only">Included</span>
                  </>
                ) : (
                  <>
                    <Minus className="mx-auto h-5 w-5 text-text-muted/60" aria-hidden="true" />
                    <span className="sr-only">Not included</span>
                  </>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
