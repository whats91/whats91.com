import { CheckCircle2, FileCheck, Lock, Server, Shield } from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  TrustPill,
  IconBadge,
  Reveal,
} from "@/components/shared";

const certifications = [
  { name: "Consent", description: "Opt-in first" },
  { name: "Privacy", description: "Clear notices" },
  { name: "Security", description: "Shared responsibility" },
  { name: "Data rights", description: "Request process" },
  { name: "DPDP", description: "Readiness" },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Protected connections",
    description: "Whats91 uses safeguards appropriate to the service and relies on the security controls of connected platforms.",
  },
  {
    icon: Server,
    title: "Shared security model",
    description: "Access control, logging, incident handling, and customer credential hygiene work together to reduce risk.",
  },
  {
    icon: FileCheck,
    title: "DPDP readiness",
    description: "Privacy notices, purpose limitation, data minimization, and request handling are part of the readiness program.",
  },
];

const complianceFeatures = [
  "Recipient opt-in responsibility",
  "Clear opt-out obligations",
  "Access, correction, erasure, and grievance process",
  "Purpose limitation and data minimization",
];

export function TrustBand() {
  return (
    <Section id="security" aria-labelledby="security-heading">
      <Container>
        <SectionHeader
          eyebrow="Security & Compliance"
          id="security-heading"
          title="Serious about your data, and your customers'"
          description="Meta-hosted messaging services, customer controls, and a factual India data-protection readiness program."
        />

        <Reveal>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
            {certifications.map((cert) => (
              <TrustPill key={cert.name} icon={Shield}>
                {cert.name} · {cert.description}
              </TrustPill>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
          {/* Security features + DPDP list */}
          <Reveal className="min-w-0">
            <div className="space-y-5 mb-8">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-3.5">
                  <IconBadge icon={feature.icon} className="shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-body-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="heading-4 mb-3">Compliance under India&apos;s DPDP Act 2023</h3>
            <ul className="space-y-2.5">
              {complianceFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/10 shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-brand-primary" aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Quality rating panel */}
          <Reveal delay={1} className="min-w-0">
            <div className="rounded-2xl gradient-brand-subtle border border-brand-primary/15 p-6 sm:p-8">
              <div className="surface-card p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft shrink-0">
                    <Shield className="h-5 w-5 text-success" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-text-primary">Quality Rating Protection</p>
                    <p className="text-caption">Stay in Meta&apos;s Green Zone</p>
                  </div>
                </div>
                <p className="text-body-sm">
                  Use available delivery and quality signals to identify problems early and keep messaging aligned with Meta policy.
                </p>
              </div>
              <p className="text-body-sm mt-5 px-1">
                The Digital Personal Data Protection Act emphasizes purpose
                limitation, data minimization, and user rights. Whats91&apos;s
                readiness statement separates current controls from future obligations.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
