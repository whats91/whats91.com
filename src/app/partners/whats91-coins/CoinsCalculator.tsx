"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coinItems, type PartnerKind } from "@/lib/partner-catalogue";
import { commercialQualification } from "@/lib/pricing";

import { numericInput } from "@/lib/tool-inputs";
export function CoinsCalculator() {
  const id = useId();
  const [kind, setKind] = useState<PartnerKind>("partner");
  const [mode, setMode] = useState("need");
  const [balance, setBalance] = useState("0");
  const [counts, setCounts] = useState<Record<string, string>>({});
  const parsed = coinItems.map(item => numericInput(counts[item.key] ?? "0", { integer: true, max: 1000000 }));
  const balanceInvalid = numericInput(balance, { integer: true, max: 1000000 }) === null;
  const units = parsed.some(value => value === null) || (mode === "wallet" && balanceInvalid) ? null : parsed.reduce<number>((sum, n) => sum + n!, 0);
  return (
    <div className="surface-card p-5 sm:p-8 space-y-6" data-testid="coins-planner">
      <p className="rounded-xl border border-info-border bg-info-soft p-4 text-sm">{commercialQualification} Current coin deductions, conversion and recharge totals are unavailable.</p>
      <p className="text-caption">Changing quantities and selections requires JavaScript. If controls do not respond, reload with local scripts enabled.</p>
      <noscript><p className="text-caption">Changing quantities, partner type or balance requires JavaScript. Recharge and activation estimates remain unavailable.</p></noscript>
      <div role="group" aria-label="Partner type" className="flex flex-wrap gap-3">{(["partner", "techPartner"] as const).map(value => <button type="button" key={value} aria-pressed={kind === value} onClick={() => setKind(value)} className={`min-h-11 rounded-xl border px-4 ${kind === value ? "bg-primary text-primary-foreground" : "bg-background"}`}>{value === "partner" ? "Partner" : "Tech Partner"}</button>)}</div>
      <div role="group" aria-label="Planning mode" className="flex flex-wrap gap-3">{["need", "wallet"].map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`min-h-11 rounded-xl border px-4 ${mode === value ? "bg-primary text-primary-foreground" : "bg-background"}`}>{value === "need" ? "Planned assignments" : "Existing balance"}</button>)}</div>
      <p className="text-body-sm">{mode === "need" ? "Choose quantities to prepare an assignment request. Current coin requirements remain unavailable." : "Enter the balance you want to discuss, then choose assignments. Current conversion and purchasing capacity remain unavailable."}</p>
      {mode === "wallet" && <div><Label htmlFor={`${id}-balance`}>Existing wallet coins (for discussion)</Label><Input id={`${id}-balance`} type="text" inputMode="numeric" value={balance} aria-invalid={balanceInvalid} aria-describedby={`${id}-number-help`} onChange={event => setBalance(event.target.value)} className="h-11 mt-2" /></div>}
      <p id={`${id}-number-help`} className="text-sm">Enter whole quantities from 0 to 1,000,000. Blank, fractional or invalid input makes the total unavailable; this is an input limit, not an approved wallet entitlement.</p>
      <h3 id={`${id}-items`} className="text-lg font-semibold">Plans and add-ons to discuss</h3>
      <p className="text-caption">Preferred terms are subject to confirmation. Scroll the table to review every column.</p>
      <div role="region" aria-labelledby={`${id}-items`} tabIndex={0} className="relative overflow-x-auto rounded-xl border border-border">
        <table className="min-w-[620px] w-full text-left text-sm"><caption className="sr-only">Requested plans and add-ons; current deductions withheld</caption><thead><tr>{["Item", "Type", "Quantity", "Coin deduction"].map(label => <th scope="col" className="p-3" key={label}>{label}</th>)}</tr></thead><tbody>{coinItems.map(item => {
          const label = item.label.replace("1 Year", "annual option").replace("3 Years", "longer-term option");
          return <tr key={item.key} className="border-t border-border"><th scope="row" className="p-3 font-medium">{label}</th><td className="p-3">{item.group}</td><td className="p-3"><Label htmlFor={`${id}-${item.key}`} className="sr-only">{label} quantity</Label><Input id={`${id}-${item.key}`} type="text" inputMode="numeric" value={counts[item.key] ?? "0"} aria-invalid={numericInput(counts[item.key] ?? "0", { integer: true, max: 1000000 }) === null} aria-describedby={`${id}-number-help`} onChange={event => setCounts(previous => ({ ...previous, [item.key]: event.target.value }))} className="h-11 w-24" /></td><td className="p-3">Unavailable</td></tr>;
        })}</tbody></table>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true">Planned assignments: {units === null ? "Unavailable — correct quantities or balance" : units.toLocaleString("en-IN")}. Recharge and activation estimates unavailable.</p>
      <dl className="space-y-3 text-sm">{[["Required coins", "Unavailable"], ["Recharge base", "Unavailable"], ["GST", "Confirm applicability"], ["Total payable", "Unavailable"]].map(([label, value]) => <div className="flex flex-wrap justify-between gap-2" key={label}><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
      <button type="button" className="min-h-11 rounded-xl border px-4" onClick={() => { setCounts({}); setBalance("0"); }}>Reset quantities</button>
    </div>
  );
}
