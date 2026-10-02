"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BILLING_CYCLES, DEFAULT_BILLING_CYCLE, buildOrder, checkoutHref, featureGroups, formatINR, GST_LABEL, planList, type BillingCycle } from "@/lib/plans";
import { commercialQualification } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PlansSelector() {
  const [billing, setBilling] = useState<BillingCycle>(DEFAULT_BILLING_CYCLE);
  const id = useId();
  return (
    <div className="space-y-8">
      <p className="rounded-xl border border-info-border bg-info-soft p-4 text-sm">{commercialQualification}</p>
      <noscript><style>{".plans-billing-preference { display: none; }"}</style><p className="text-caption">Use the cycle-labelled checkout link, then change between Annual and Monthly on checkout. Interactive billing preference requires JavaScript.</p></noscript>
      <fieldset className="plans-billing-preference flex flex-col items-center gap-3">
        <legend className="text-sm font-semibold mb-3">Preferred billing cycle</legend>
        <div className="inline-flex flex-wrap gap-2" data-testid="billing-switch">
          {BILLING_CYCLES.map(cycle => <label key={cycle} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full px-5 border border-border cursor-pointer", billing === cycle ? "bg-primary text-primary-foreground" : "bg-background")}>
            <input type="radio" className="accent-primary" name={id} value={cycle} checked={billing === cycle} onChange={() => setBilling(cycle)} />
            {cycle === "annual" ? "Annual" : "Monthly"}
          </label>)}
        </div>
        <p className="text-caption text-center">Monthly setup is charged once; annual setup is included. Confirm renewal and account eligibility in writing.</p>
      </fieldset>
      <div className="grid gap-6 md:grid-cols-2" aria-live="polite">
        {planList.map(plan => {
          const order = buildOrder(plan, billing);
          return <article key={plan.id} aria-labelledby={`plan-${plan.id}-name`} className="surface-card p-6 sm:p-8 flex flex-col">
          <h3 id={`plan-${plan.id}-name`} className="heading-3">{plan.name}</h3>
          <p className="text-body-sm mt-2">{plan.tagline}</p>
          <p className="text-2xl font-semibold mt-6">{formatINR(order.planAmount)} <span className="text-base font-normal">/{order.cycleUnit}</span></p>
          <p className="text-caption mt-2">Platform subscription before GST; Meta messages are separate.</p>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between gap-3"><dt>{billing === "monthly" ? "One-time setup" : "Setup"}</dt><dd className="font-medium">{order.setupFee === null ? "Included" : formatINR(order.setupFee)}</dd></div>
            <div className="flex justify-between gap-3"><dt>{GST_LABEL} on first payment</dt><dd className="font-medium">{formatINR(order.gst)}</dd></div>
            <div className="flex justify-between gap-3 font-semibold"><dt>First platform payment incl. GST</dt><dd>{formatINR(order.total)}</dd></div>
          </dl>
          <ul className="my-6 space-y-2 text-sm">{plan.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          <Link className="mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 py-3 text-center font-semibold" href={checkoutHref(plan.id, billing)}>Review {plan.name} — {billing === "annual" ? "Annual" : "Monthly"}</Link>
          <p className="text-caption mt-3 text-center">Selection only; no order, payment or activation.</p>
        </article>;})}
      </div>
      <section aria-labelledby={`${id}-comparison`}>
        <h3 id={`${id}-comparison`} className="heading-3 mb-4">Catalogue feature comparison</h3>
        <p className="text-caption mb-4">Confirm included features and availability for your account in the written offer. Focus the table and use arrow keys to scroll across columns.</p>
        <div role="region" aria-labelledby={`${id}-comparison`} tabIndex={0} className="relative overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[560px] w-full text-left text-sm">
            <caption className="sr-only">Coexistence and Standard catalogue features; confirm account eligibility</caption>
            <thead><tr><th scope="col" className="p-4">Feature</th>{planList.map(plan => <th scope="col" className="p-4" key={plan.id}>{plan.name}</th>)}</tr></thead>
            <tbody>{featureGroups.flatMap(group => group.features).map(feature => <tr className="border-t border-border" key={feature.label}><th scope="row" className="p-4 font-medium">{feature.label}</th>{planList.map(plan => <td className="p-4" key={plan.id}>{feature[plan.id] ? "Listed" : "Not listed"}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
