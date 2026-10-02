import Link from "next/link";
import { compatibilityQualification, compatibilityRows, eligibilityExamples, compatibilityFAQs, migrationQualification, onboardingQualification, platformEvidence } from "@/lib/platform-compatibility";

export function PlatformConditions({ id = "platform-conditions", examples = false, faqs = false }: { id?: string; examples?: boolean; faqs?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-heading`} className="surface-card p-4 sm:p-6 space-y-5 my-6">
    <h2 id={`${id}-heading`} className="heading-3">Check standard and hybrid account conditions</h2>
    <p className="text-body-sm">{compatibilityQualification}</p>
    <div role="region" aria-labelledby={`${id}-table-heading`} tabIndex={0} className="overflow-x-auto rounded-xl border border-text-muted">
      <table className="w-full min-w-[640px] text-sm text-left"><caption id={`${id}-table-heading`} className="text-left p-4 font-semibold">Standard and hybrid planning comparison</caption>
        <thead><tr>{["Aspect", "Standard Cloud API", "Hybrid Coexistence"].map(label => <th key={label} scope="col" className="p-3 bg-surface">{label}</th>)}</tr></thead>
        <tbody>{compatibilityRows.map(row => <tr key={row.feature} className="border-t border-border"><th scope="row" className="p-3 font-medium">{row.feature}</th><td className="p-3 text-text-secondary">{row.standard}</td><td className="p-3 text-text-secondary">{row.hybrid}</td></tr>)}</tbody>
      </table>
    </div>
    <p className="text-body-sm">{migrationQualification}</p><p className="text-body-sm">{onboardingQualification}</p>
    {examples && <div className="space-y-4"><h3 className="heading-4">Choose a path before changing the number</h3>{eligibilityExamples.map(row => <div key={row.situation}><h4 className="font-semibold">{row.situation}</h4><p className="text-body-sm mt-1">{row.action}</p></div>)}</div>}
    {faqs && <div className="space-y-3"><h3 className="heading-4">Compatibility questions</h3>{compatibilityFAQs.map(row => <details key={row.question} className="rounded-xl border border-text-muted"><summary className="min-h-11 cursor-pointer p-4 font-medium">{row.question}</summary><p className="text-body-sm px-4 pb-4">{row.answer}</p></details>)}</div>}
    <p className="text-sm text-text-secondary">Documentation checked {platformEvidence.checkedAt}; exact account capabilities remain unconfirmed. <a href={platformEvidence.coexistenceUrl} className="underline text-primary">Meta onboarding documentation</a>{" · "}<a href={platformEvidence.policyUrl} className="underline text-primary">Business Messaging Policy</a>{" · "}<Link href="/pricing" className="underline text-primary">Pricing conditions</Link></p>
  </section>;
}
