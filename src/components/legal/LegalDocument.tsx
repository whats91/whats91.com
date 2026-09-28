import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Info,
  Mail,
  MapPin,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import type { LegalDocument as LegalDocumentData } from "@/lib/legal/documents";

type LegalDocumentProps = {
  document: LegalDocumentData;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <header className="border-b border-border bg-surface/60">
          <div className="mx-auto max-w-[1200px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-text-muted print:hidden">
              <Link href="/" className="hover:text-brand-700">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/legal" className="hover:text-brand-700">Legal &amp; Trust</Link>
              <ChevronRight className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
              <span className="hidden truncate sm:block" aria-current="page">{document.title}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-800">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                {document.eyebrow}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{document.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">{document.summary}</p>

              <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand-700" aria-hidden="true" />
                  <dt className="sr-only">Effective date</dt>
                  <dd><span className="text-text-muted">Effective</span> <span className="font-medium">{document.effectiveDate}</span></dd>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-brand-700" aria-hidden="true" />
                  <dt className="sr-only">Version</dt>
                  <dd><span className="text-text-muted">Version</span> <span className="font-medium">{document.version}</span></dd>
                </div>
              </dl>

              {document.status ? (
                <div className="mt-6 inline-flex items-start gap-2 rounded-lg border border-warning-border bg-warning-soft px-3.5 py-2.5 text-sm text-text-secondary">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                  <span>{document.status}</span>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start print:hidden">
            <nav aria-label={`${document.title} sections`} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">On this page</p>
              <ol className="space-y-1">
                {document.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-2 rounded-lg px-2.5 py-2 text-sm leading-5 text-text-secondary transition-colors hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                    >
                      <span className="w-5 shrink-0 text-text-muted">{index + 1}.</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[780px]">
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm leading-6 text-brand-950 sm:p-5">
              <strong className="font-semibold">Plain-language guide.</strong> Headings and summaries help navigation, but do not replace the full text or a signed customer agreement.
            </div>

            <div className="mt-3 divide-y divide-border">
              {document.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 py-8 sm:py-10" aria-labelledby={`${section.id}-heading`}>
                  <div className="mb-4 flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-100 text-xs font-bold text-brand-800" aria-hidden="true">{index + 1}</span>
                    <h2 id={`${section.id}-heading`} className="text-xl font-bold tracking-tight sm:text-2xl">{section.title}</h2>
                  </div>

                  <div className="space-y-4 text-[15px] leading-7 text-text-secondary sm:pl-10 sm:text-base">
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets ? (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.note ? (
                      <div className="rounded-lg border border-info-border bg-info-soft px-4 py-3 text-sm leading-6 text-text-secondary">
                        <strong className="text-text-primary">Important:</strong> {section.note}
                      </div>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            {document.resources?.length ? (
              <section className="border-t border-border py-9" aria-labelledby="references-heading">
                <h2 id="references-heading" className="text-xl font-bold tracking-tight">Referenced laws and platform policies</h2>
                <div className="mt-4 grid gap-3">
                  {document.resources.map((resource) => (
                    <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/60">
                      <span className="flex items-center gap-2 font-semibold text-text-primary group-hover:text-brand-800">
                        {resource.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {resource.description ? <span className="mt-1 block text-sm leading-6 text-text-muted">{resource.description}</span> : null}
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="border-t border-border py-9" aria-labelledby="contact-heading">
              <div className="rounded-2xl bg-ink p-6 text-ink-text shadow-lg sm:p-8">
                <h2 id="contact-heading" className="text-xl font-bold text-white">Contact Whats91</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-text">
                  For questions, account notices, privacy requests, or legal correspondence, contact us directly. Include enough context to route the request, but do not send passwords, API keys, or one-time codes.
                </p>
                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <a href="mailto:support@whats91.com" className="flex items-center gap-2 text-white hover:text-brand-200"><Mail className="h-4 w-4" aria-hidden="true" /> support@whats91.com</a>
                  <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />131, C21 Mall, Ujjain, Madhya Pradesh 456010, India</span>
                </div>
              </div>
            </section>

            <section className="border-t border-border py-9 print:hidden" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xl font-bold tracking-tight">Related legal documents</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {document.related.map((link) => (
                  <Link key={`${link.href}-${link.label}`} href={link.href} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-text-secondary hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800">{link.label}</Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
