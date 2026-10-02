"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateROI, numericInput, type ROIInputs } from "@/lib/tool-inputs";

const empty: ROIInputs = { monthlyLeads: "", humanCostPerLead: "", aiCostPerLead: "", selfBuildCostPerLead: "", aiQualificationRate: "", selfBuildQualificationRate: "" };
const fields: { key: keyof ROIInputs; label: string; integer?: boolean; percent?: boolean }[] = [
  { key: "monthlyLeads", label: "Monthly leads", integer: true },
  { key: "humanCostPerLead", label: "Human cost per lead" },
  { key: "aiCostPerLead", label: "AI cost per lead" },
  { key: "selfBuildCostPerLead", label: "Self-built cost per lead" },
  { key: "aiQualificationRate", label: "AI qualification rate (%)", percent: true },
  { key: "selfBuildQualificationRate", label: "Self-built qualification rate (%)", percent: true },
];
const amount = (value: number | null) => value === null ? "Unavailable" : value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
export function ROICalculatorClient() {
  const [input, setInput] = useState<ROIInputs>(empty);
  const results = calculateROI(input);
  const rows: [string, number | null | undefined][] = [
    ["Human monthly cost", results?.human], ["AI monthly cost", results?.ai], ["Self-built monthly cost", results?.self],
    ["AI qualified leads", results?.aq], ["Self-built qualified leads", results?.sq],
    ["AI cost per qualified lead", results?.aiPerQualified], ["Self-built cost per qualified lead", results?.selfPerQualified],
    ["Monthly saving versus human", results?.monthlyHumanSaving], ["Yearly saving versus human", results?.yearlyHumanSaving],
    ["Monthly saving versus self-built", results?.monthlySelfSaving], ["Yearly saving versus self-built", results?.yearlySelfSaving],
    ["ROI versus human (%)", results?.humanROI], ["ROI versus self-built (%)", results?.selfROI], ["Qualified lead difference versus self-built (%)", results?.qualifiedDifference],
  ];
  return <div className="grid gap-6 lg:grid-cols-2">
    <section aria-labelledby="roi-input-heading" className="surface-card p-5 sm:p-8 min-w-0">
      <h2 id="roi-input-heading" className="heading-3">Your assumptions</h2>
      <p id="roi-input-help" className="text-body-sm my-4">Enter all six values, using the same currency for every cost. Zero is allowed. Lead counts must be whole numbers; rates run from 0 to 100%. These inputs do not establish Whats91 prices or AI accuracy.</p>
      <div className="grid gap-5 sm:grid-cols-2">{fields.map(field => {
        const invalid = input[field.key] !== "" && numericInput(input[field.key], { integer: field.integer, max: field.percent ? 100 : undefined }) === null;
        return <div key={field.key} className="min-w-0"><Label htmlFor={field.key}>{field.label}</Label><Input id={field.key} type="text" inputMode={field.integer ? "numeric" : "decimal"} value={input[field.key]} aria-invalid={invalid} aria-describedby={invalid ? `${field.key}-error roi-input-help` : "roi-input-help"} onChange={event => setInput(previous => ({ ...previous, [field.key]: event.target.value }))} className="mt-2 h-11" />{invalid && <p id={`${field.key}-error`} className="text-sm text-error mt-2">Enter a finite, nonnegative {field.integer ? "whole number" : field.percent ? "percentage up to 100" : "cost"}.</p>}</div>;
      })}</div>
      <button type="button" onClick={() => setInput(empty)} className="min-h-11 rounded-xl border px-4 mt-6">Clear assumptions</button>
    </section>
    <section aria-labelledby="roi-results-heading" className="surface-card p-5 sm:p-8 min-w-0">
      <h2 id="roi-results-heading" className="heading-3">Scenario results</h2>
      <p role="status" aria-live="polite" aria-atomic="true" className="text-sm my-4">{results ? "Calculated from the current assumptions. Negative savings mean additional cost. A zero denominator makes that ratio unavailable." : "Results unavailable. Complete valid assumptions; reduce values if their calculated totals exceed safe numeric precision."}</p>
      <dl className="space-y-3 text-sm">{rows.map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-border pb-3"><dt className="min-w-0 max-w-full">{label}</dt><dd className="font-semibold break-all">{amount(value ?? null)}</dd></div>)}</dl>
      <p className="text-caption mt-4">Costs use your common currency. Qualified counts round to the nearest whole lead. ROI is (baseline cost − AI cost) ÷ AI cost × 100; it excludes revenue and does not predict realised returns.</p>
    </section>
  </div>;
}
