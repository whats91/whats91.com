import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";
import { Container, Section } from "@/components/shared";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateBreadcrumbSchema, generateFAQSchema, generatePageMetadata, generateServiceSchema, siteConfig } from "@/lib/seo/config";
import { busySolutions, busySceneCaption, busyEnquiryScope, type BusySolution } from "@/lib/busy-solutions";

export function busyMetadata(solution: BusySolution) {
  return generatePageMetadata({ title: solution.title, description: solution.description, keywords: [solution.name, "Busy Accounting integration"], path: `/solutions/${solution.slug}` });
}
export function BusySolutionPage({ solution }: { solution: BusySolution }) {
  const path = `/solutions/${solution.slug}`;
  const schema = [
    generateServiceSchema({ name: solution.title, description: solution.description, url: siteConfig.url + path }),
    generateFAQSchema(solution.faqs),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Solutions", url: "/#solutions" }, { name: solution.name, url: path }]),
  ];
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schema} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none [overflow-wrap:anywhere]">
        <article>
          <Section tone="brand-soft" pad="lg" aria-labelledby="solution-title">
            <Container>
              <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
                <header className="min-w-0">
                  <p className="text-sm font-semibold text-brand-800 mb-4">Busy Accounting · {solution.name}</p>
                  <h1 id="solution-title" className="heading-1 mb-5">{solution.title}</h1>
                  <p className="text-lead mb-5">{solution.intro}</p>
                  <p className="text-body mb-6">{solution.scope}</p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <BookDemoPopup source={`${solution.slug}-hero`} triggerLabel="Request a demo" triggerClassName="min-h-12 h-auto whitespace-normal px-6 py-3 rounded-xl" />
                    <Link href="/contact" className="inline-flex items-center justify-center min-h-12 rounded-xl border border-border bg-background px-6 py-3 font-semibold text-text-primary">Discuss this workflow</Link>
                  </div>
                </header>
                <figure className="min-w-0 surface-card p-5 sm:p-6" aria-labelledby="workflow-heading">
                  <h2 id="workflow-heading" className="heading-3 mb-3">Illustrative workflow</h2>
                  <figcaption className="text-body-sm mb-5">{busySceneCaption}</figcaption>
                  <ol className="space-y-4">
                    {solution.steps.map((step, index) => (
                      <li key={step.title} className="flex gap-3 min-w-0">
                        <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-white font-semibold">{index + 1}</span>
                        <div className="min-w-0"><h3 className="font-semibold text-text-primary">{step.title}</h3><p className="text-body-sm mt-1">{step.text}</p></div>
                      </li>
                    ))}
                  </ol>
                </figure>
              </div>
              <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {solution.sections.map(section => <Link key={section.id} href={`#${section.id}`} className="underline underline-offset-4 text-brand-800">{section.title}</Link>)}
                <Link href="#faq-heading" className="underline underline-offset-4 text-brand-800">Questions</Link>
              </nav>
            </Container>
          </Section>
          {solution.sections.map((section, index) => (
            <Section key={section.id} tone={index % 2 ? "surface" : "default"} aria-labelledby={section.id}>
              <Container size={section.items ? "default" : "narrow"}>
                {section.aliases?.map(alias => <span key={alias} id={alias} className="block scroll-mt-24" />)}
                <h2 id={section.id} className="heading-2 mb-5 scroll-mt-24">{section.title}</h2>
                <p className="text-lead mb-6">{section.text}</p>
                {section.items && <div className="grid gap-5 sm:grid-cols-2">{section.items.map(item => <div key={item.title} className="surface-card p-5 sm:p-6 min-w-0"><h3 className="heading-4 mb-3">{item.title}</h3><p className="text-body-sm">{item.text}</p></div>)}</div>}
                {solution.slug === "busy-api" && section.id === "endpoints-heading" && <p className="text-body-sm mb-6"><a href="https://developers.whats91.com/overview" className="underline underline-offset-4">Developer documentation</a>: confirm the current Busy-specific contract with the integration owner before using any endpoint.</p>}
                {section.table && <>
                  <p className="text-body-sm mb-3">On a narrow screen, scroll the table horizontally to read every column.</p>
                  <div role="region" aria-label={`${section.title} table`} tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-brand-800">
                    <table className="w-full min-w-[640px] text-sm text-text-primary [overflow-wrap:normal]">
                      <caption className="sr-only">{section.title}</caption>
                      <thead className="bg-surface"><tr>{section.table.headers.map(heading => <th key={heading} scope="col" className="p-4 text-left font-semibold">{heading}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map(row => <tr key={row[0]} className="border-t border-border">{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="min-w-[160px] p-4 text-left font-medium">{cell}</th> : <td key={i} className="p-4 align-top">{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </>}
              </Container>
            </Section>
          ))}
          <Section tone="surface" aria-labelledby="faq-heading">
            <Container size="narrow">
              <h2 id="faq-heading" className="heading-2 mb-6 scroll-mt-24">Questions about {solution.name}</h2>
              <div className="space-y-3">{solution.faqs.map(faq => <details key={faq.question} className="surface-card p-5"><summary className="cursor-pointer min-h-11 font-semibold text-text-primary">{faq.question}</summary><p className="text-body-sm mt-4">{faq.answer}</p></details>)}</div>
            </Container>
          </Section>
          <Section aria-labelledby="related-heading">
            <Container>
              <h2 id="related-heading" className="heading-2 mb-6">Choose the next workflow</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{solution.related.map(slug => <Link key={slug} href={`/solutions/${slug}`} className="surface-card p-5 underline underline-offset-4 font-semibold text-brand-800">{busySolutions[slug].name}</Link>)}</div>
              <p className="text-body-sm mt-6">Review <Link href="/privacy" className="underline">privacy terms</Link> and the <Link href="/legal" className="underline">Legal Center</Link>. Confirm support and availability in your signed <Link href="/sla" className="underline">service agreement</Link>.</p>
            </Container>
          </Section>
          <Section tone="brand-soft" aria-labelledby="enquiry-heading">
            <Container size="narrow">
              <h2 id="enquiry-heading" className="heading-2 mb-5">Discuss your {solution.name} setup</h2>
              <p className="text-lead mb-6">{busyEnquiryScope}</p>
              <Link href="/contact" className="inline-flex items-center justify-center min-h-12 rounded-xl bg-brand-800 text-white font-semibold px-6 py-3">Send an enquiry</Link>
            </Container>
          </Section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
