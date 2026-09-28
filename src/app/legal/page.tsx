import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Cookie,
  FileCheck2,
  FileText,
  Gavel,
  LifeBuoy,
  LockKeyhole,
  RotateCcw,
  Scale,
  ServerCog,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Legal & Trust Center | Whats91",
  description: "Whats91 legal terms, privacy, acceptable use, data rights, billing, security, and service transparency documents.",
  path: "/legal",
});

const documents = [
  { title: "Terms of Service", description: "Account, platform, billing, liability, and contract terms.", href: "/terms", icon: Gavel, tag: "Core" },
  { title: "Privacy Notice", description: "Information collection, customer data, integrations, retention, and rights.", href: "/privacy", icon: ShieldCheck, tag: "Core" },
  { title: "Acceptable Use Policy", description: "Consent-based messaging, prohibited activity, and platform compliance.", href: "/acceptable-use", icon: BookOpenCheck, tag: "Core" },
  { title: "Cookie & Browser Storage", description: "Current storage inventory, reCAPTCHA, and preference controls.", href: "/cookies", icon: Cookie, tag: "Website" },
  { title: "Refund & Cancellation", description: "Cancellation, usage disputes, corrections, and refund reviews.", href: "/refund", icon: RotateCcw, tag: "Billing" },
  { title: "Data Rights & Grievances", description: "Request access, correction, erasure, withdrawal, or grievance review.", href: "/data-rights", icon: UserRoundCheck, tag: "Privacy" },
  { title: "DPDP Readiness", description: "A phased, factual readiness statement for India’s DPDP framework.", href: "/compliance", icon: Scale, tag: "Readiness" },
  { title: "Security Statement", description: "Safeguard approach, shared responsibility, and security reporting.", href: "/trust/security", icon: LockKeyhole, tag: "Trust" },
  { title: "Service Level & Support", description: "Default availability, maintenance, support, and SLA boundaries.", href: "/sla", icon: LifeBuoy, tag: "Operations" },
  { title: "DPA Status", description: "Contractual data-processing status while verified facts are completed.", href: "/legal/dpa", icon: FileCheck2, tag: "Status" },
  { title: "Subprocessor Status", description: "Provider-register status and the verified-facts publication rule.", href: "/trust/subprocessors", icon: ServerCog, tag: "Status" },
];

export default function LegalCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <header className="border-b border-border bg-surface/60">
          <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-800">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Legal &amp; Trust
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">Clear rules. Verifiable claims. One legal center.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                Find the documents that govern Whats91 services, explain data handling, set responsible-messaging rules, and show where a disclosure is still being factually verified.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
                <span className="rounded-full border border-border bg-card px-3 py-1.5">Operated by Wilford Technology</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5">Last legal review: 25 Sep 2026</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-labelledby="documents-heading">
          <div className="mb-7 max-w-2xl">
            <h2 id="documents-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Documents and disclosures</h2>
            <p className="mt-2 text-text-secondary">Core policies are indexable. Status pages remain noindex until their operational facts are verified.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <Link key={document.href} href={document.href} className="group flex min-h-56 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-text-muted">{document.tag}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-text-primary group-hover:text-brand-800">{document.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">{document.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Read document <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border bg-surface/60">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Need a contract-specific document?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Procurement, DPA, privacy, security, and enterprise SLA requests can be routed through support. Please identify your organisation and service scope.</p>
            </div>
            <a href="mailto:support@whats91.com?subject=Legal%20document%20request" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700">Contact support <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
