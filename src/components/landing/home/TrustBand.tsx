import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/shared";
import { supportScope } from "@/lib/home-content";

const checks = [
  { title: "Recipient permissions", description: "Define how your team records opt-ins, handles opt-outs and limits each message to its intended purpose.", href: "/acceptable-use", label: "Review acceptable use" },
  { title: "Customer data", description: "Confirm processing roles, providers, locations, retention and the process for customer data-rights requests.", href: "/privacy", label: "Read the privacy notice" },
  { title: "Access and recovery", description: "Ask for the controls that apply to your service: credentials, access, logs, backup, incident reporting and recovery responsibilities.", href: "/trust/security", label: "Read the security statement" },
];
export function TrustBand() {
  return (
    <Section id="security" aria-labelledby="security-heading">
      <Container>
        <SectionHeader eyebrow="Before you connect customer data" id="security-heading" title="Check responsibilities alongside the workflow" description="Review the published policies and confirm the controls that apply to your setup. This page does not certify compliance, residency or a particular security control." />
        <div className="grid gap-5 md:grid-cols-3">
          {checks.map(check => (
            <article key={check.href} className="surface-card p-5 sm:p-6 min-w-0">
              <h3 className="heading-4 mb-3">{check.title}</h3>
              <p className="text-body-sm mb-4">{check.description}</p>
              <Link href={check.href} className="link-inline text-sm">{check.label}</Link>
            </article>
          ))}
        </div>
        <aside className="surface-card mt-6 p-5 sm:p-6" aria-labelledby="support-scope-heading">
          <h3 id="support-scope-heading" className="heading-4 mb-3">Support and availability</h3>
          <p className="text-body-sm">{supportScope} <Link href="/sla" className="link-inline">Read the support policy</Link>.</p>
        </aside>
      </Container>
    </Section>
  );
}
