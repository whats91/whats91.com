import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/shared/Container";
import { generateBlogArticleSchema } from "@/lib/blog/metadata";
import { getPostBySlug } from "@/lib/blog/registry";
import { contentDates } from "@/lib/content/dates";
import { siteConfig } from "@/lib/seo/config";
import { getAuthorLink, attributionLabel } from "@/lib/blog/author-links";
import { billingGuides, type BillingGuide } from "@/lib/blog/billing-guides";
import type { GuideSection } from "@/lib/blog/erp-guides";
import { CopyArticleLink } from "./CopyArticleLink";

const textLink = "inline-flex min-h-11 items-center gap-2 text-brand-primary underline underline-offset-4 hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

function Contents({ guide }: { guide: BillingGuide }) {
  return <ol className="space-y-1">
    {guide.sections.map((section, index) =>
      <li key={section.id}>
        <a href={`#${section.id}`} className="flex min-h-11 items-center gap-3 rounded-md px-2 py-2 text-sm leading-5 text-text-secondary hover:bg-brand-50 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-primary">
          <span aria-hidden="true" className="text-caption font-semibold text-brand-primary">{String(index + 1).padStart(2, "0")}</span>
          <span>{section.heading}</span>
        </a>
      </li>)}
    <li><a href={`#${guide.faqId || "faq"}`} className="flex min-h-11 items-center rounded-md px-2 py-2 text-sm text-text-secondary hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-primary">Frequently asked questions</a></li>
  </ol>;
}

function GuideImage({ image }: { image: NonNullable<GuideSection["image"]> }) {
  return <figure className="my-10 overflow-hidden rounded-3xl border border-brand-200 bg-brand-50 shadow-sm sm:my-12">
    <div className="px-5 pb-4 pt-6 sm:px-8 sm:pt-8">
      <p className="text-overline text-brand-primary">Evidence illustration</p>
      <h3 className="heading-3 mt-2">Match three separate records</h3>
    </div>
    <picture>
      <source media="(max-width: 640px)" srcSet="/images/blog/whatsapp-cloud-api-pricing-india-2026/reconciliation-mobile-refined-2026-10-watermarked.webp" type="image/webp" />
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 840px" loading="lazy" className="block h-auto w-full" />
    </picture>
    <figcaption className="px-5 pb-6 text-sm leading-6 text-text-secondary sm:px-8">{image.caption}</figcaption>
    <EvidenceLegend />
  </figure>;
}

function EvidenceLegend() {
  const roles = [
    { title: "Request", text: "An accepted send request identifies an attempt. It is not proof of delivery." },
    { title: "Delivery", text: "Match status events to the message reference. Keep missing or conflicting states unresolved." },
    { title: "Billing", text: "Apply the effective scope and reconcile the provider invoice as a separate record." },
  ];
  return <div className="grid border-t border-brand-200 bg-card sm:grid-cols-3" aria-label="Three billing evidence records">
    {roles.map((role, index) => <div key={role.title} className="border-b border-brand-100 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0">
      <span aria-hidden="true" className="text-overline text-brand-primary">0{index + 1}</span>
      <h4 className="mt-2 text-base font-semibold text-text-primary">{role.title}</h4>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{role.text}</p>
    </div>)}
  </div>;
}

function BudgetLayers() {
  const layers = [
    { title: "01 / Meta delivery", text: "Use the effective card, market, category, eligible delivered volume and tier." },
    { title: "02 / Platform & setup", text: "Use the written Whats91 plan, billing cycle and separately scoped integration terms." },
    { title: "03 / Tax & invoice", text: "Confirm applicable invoice treatment. Leave unknown amounts unavailable." },
  ];
  return <aside aria-label="Budget components" className="my-10 rounded-3xl bg-brand-900 p-6 text-brand-50 sm:p-8">
    <p className="text-overline text-brand-200">Build the full budget</p>
    <h3 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">Three amounts to keep apart</h3>
    <p className="mt-3 max-w-[var(--container-reading)] text-sm leading-6 text-brand-50">A Meta messaging estimate alone is not the total payable amount.</p>
    <div className="mt-7 grid gap-3 sm:grid-cols-3">
      {layers.map(layer => <div key={layer.title} className="rounded-2xl border border-brand-700 bg-brand-800 p-5">
        <h4 className="text-base font-semibold text-white">{layer.title}</h4>
        <p className="mt-3 text-sm leading-6 text-brand-50">{layer.text}</p>
      </div>)}
    </div>
  </aside>;
}

function MarginalRule() {
  return <aside aria-label="How marginal tiers work" className="my-9 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-7">
    <p className="text-overline text-brand-primary">Tier reading rule</p>
    <h3 className="heading-3 mt-2">Only the volume inside a tier gets that tier’s rate</h3>
    <p className="mt-3 text-body-sm">Utility and Authentication have separate schedules. Crossing a threshold does not reprice the earlier messages or other categories.</p>
  </aside>;
}

function GuideTable({ section }: { section: GuideSection }) {
  if (!section.table) return null;
  const labelId = `${section.id}-table-label`;
  return <div className="my-8">
    <p id={labelId} className="mb-2 text-sm font-semibold text-text-primary">{section.table.caption}</p>
    {section.table.headers.length > 2 && <p className="mb-3 text-caption sm:hidden">Scroll sideways to see every column →</p>}
    <div role="region" tabIndex={0} aria-labelledby={labelId} className="max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
      <table className={`w-full text-left text-sm leading-6 ${section.table.headers.length > 2 ? "min-w-[640px]" : "min-w-full"}`}>
        <caption className="sr-only">{section.table.caption}</caption>
        <thead className="bg-surface text-text-primary"><tr>{section.table.headers.map(header => <th scope="col" key={header} className="p-4 align-top font-semibold">{header}</th>)}</tr></thead>
        <tbody>{section.table.rows.map((row, index) => <tr key={index} className="border-t border-border/60">{row.map((cell, column) => column === 0
          ? <th key={column} scope="row" className="p-4 align-top font-medium text-text-primary">{cell}</th>
          : <td key={column} className="p-4 align-top text-text-secondary">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </div>;
}

function GuideCode({ section }: { section: GuideSection }) {
  if (!section.code) return null;
  const labelId = `${section.id}-code-label`;
  return <figure className="my-8">
    <figcaption id={labelId} className="mb-3 text-sm font-semibold text-text-primary">{section.code.caption}</figcaption>
    <pre role="region" tabIndex={0} aria-labelledby={labelId} className="max-w-full overflow-x-auto rounded-xl border border-ink-border bg-ink p-5 text-sm leading-6 text-ink-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"><code>{section.code.text}</code></pre>
  </figure>;
}

function GuideSectionView({ section, index }: { section: GuideSection; index: number }) {
  const isRates = section.id === "guide-rate-scope";
  const isCategories = section.id === "guide-categories";
  const isSynthetic = section.id === "guide-synthetic-model";
  const isCost = section.id === "guide-cost-components";
  const isReconciliation = section.id === "guide-reconciliation";
  const isNextStep = section.id === "guide-next-step";
  return <section aria-labelledby={section.id} className="border-t border-border/60 py-12 first:border-t-0 first:pt-4 sm:py-16">
    <p className="text-overline text-brand-primary">{isSynthetic ? "Invented arithmetic exercise" : `Part ${String(index + 1).padStart(2, "0")}`}</p>
    <h2 id={section.id} className="heading-2 mt-3 max-w-[var(--container-reading)] scroll-mt-28">{section.heading}</h2>
    {isRates && <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-primary" />Official India INR list card <span className="font-normal">Effective 1 October 2026</span></div>}
    {isSynthetic && <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950 sm:p-6"><strong className="block text-base">Invented rates for arithmetic only</strong><span className="mt-2 block">The amounts below are not Meta rates, Whats91 fees, or a payable quote. Use the official dated schedule above for an actual estimate.</span></div>}
    <div className="mt-7 space-y-5">
      {section.paragraphs.map((paragraph, paragraphIndex) => <div key={paragraphIndex}>
        <p className="max-w-[var(--container-reading)] text-body [overflow-wrap:anywhere]">{paragraph}</p>
        {isReconciliation && paragraphIndex === 0 && section.image && <GuideImage image={section.image} />}
      </div>)}
    </div>
    {isCategories && <MarginalRule />}
    {isCost && <BudgetLayers />}
    {!isReconciliation && section.image && <GuideImage image={section.image} />}
    {section.steps && <ol className="mt-8 grid gap-3">
      {section.steps.map((step, stepIndex) => <li key={step} className="flex items-start gap-4 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 text-sm leading-6 text-text-secondary sm:text-base">
        <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">{stepIndex + 1}</span>
        <span className="pt-1">{step}</span>
      </li>)}
    </ol>}
    <GuideTable section={section} />
    <GuideCode section={section} />
    {section.note && <p className="my-8 rounded-xl border-l-4 border-brand-primary bg-brand-50 p-5 text-sm leading-6 text-text-secondary">{section.note}</p>}
    {isNextStep && section.links?.[0] && <div className="my-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
      <h3 className="heading-3">Turn your confirmed inputs into an estimate</h3>
      <p className="mt-3 max-w-[var(--container-reading)] text-body-sm">The planner estimates Meta messaging charges; confirm platform, setup and invoice treatment separately.</p>
      <Link href={section.links[0].href} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">{section.links[0].label} <span aria-hidden="true" className="ml-2">→</span></Link>
    </div>}
    {section.links && <div className="mt-7 border-l-2 border-brand-200 pl-5">
      <h3 className="text-sm font-semibold text-text-primary">Further reading</h3>
      <ul className="mt-2 space-y-1">{section.links.slice(isNextStep ? 1 : 0).map(link => <li key={link.href}><Link href={link.href} className={textLink}>{link.label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
    </div>}
  </section>;
}

export function IndiaPricingGuideArticle({ guide }: { guide: BillingGuide }) {
  const post = getPostBySlug(guide.slug)!;
  const dates = contentDates(post);
  const author = getAuthorLink(post.authorId);
  const url = `${siteConfig.url}/blog/${guide.slug}`;
  const related = billingGuides.filter(item => item.slug !== guide.slug).map(item => getPostBySlug(item.slug)!);
  const articleSchema = generateBlogArticleSchema(guide.slug);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const [introLead, introDetail] = guide.intro.split("This guide publishes ");

  return <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">
      <article data-india-pricing-guide={guide.slug} className="min-w-0">
        <Container className="pt-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 text-sm text-text-secondary">
            <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog" className="inline-flex min-h-11 items-center underline underline-offset-4">Blog</Link><span aria-hidden="true">/</span><span>{post.category}</span>
          </nav>
          <header className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 sm:rounded-3xl">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <p className="text-overline text-brand-800">{post.category} / Pricing field guide</p>
                <h1 className="heading-1 mt-4">{guide.title}</h1>
                <p className="text-lead mt-5">{introLead.trim()}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-brand-800"><span className="rounded-full border border-brand-200 bg-card px-3 py-2">INR rate card · 1 Oct 2026</span><span className="rounded-full border border-brand-200 bg-card px-3 py-2">Meta + platform + tax kept separate</span></div>
                <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-brand-200 pt-5 text-sm text-text-secondary">
                  {dates.published && <div className="flex gap-1"><dt className="font-medium text-text-primary">Published</dt><dd><time dateTime={dates.published}>{new Date(dates.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time></dd></div>}
                  <div className="flex gap-1"><dt className="font-medium text-text-primary">Reading time</dt><dd>{post.readingTime} min</dd></div>
                  <div className="flex gap-1"><dt className="font-medium text-text-primary">Attribution</dt><dd>Pending</dd></div>
                </dl>
              </div>
              {guide.cover && <figure className="flex flex-col border-t border-brand-100 bg-brand-50 lg:border-l lg:border-t-0">
                <picture>
                  <source media="(min-width: 640px)" srcSet="/images/blog/whatsapp-cloud-api-pricing-india-2026/cover-hero-square-2026-10-watermarked.webp" type="image/webp" />
                  <Image src={guide.cover.src} alt={guide.cover.alt} width={guide.cover.width} height={guide.cover.height} sizes="(max-width: 1024px) 100vw, 540px" loading="eager" className="block h-auto w-full sm:aspect-square sm:object-contain" />
                </picture>
                <figcaption className="px-6 pb-6 text-sm leading-6 text-text-secondary sm:px-8">{guide.cover.caption}</figcaption>
              </figure>}
            </div>
          </header>
          {introDetail && <p className="mt-5 max-w-[var(--container-reading)] rounded-xl border-l-4 border-brand-primary bg-brand-50 px-5 py-4 text-sm leading-6 text-text-secondary">This guide publishes {introDetail}</p>}
          <div className="grid gap-3 border-b border-border/60 py-7 sm:grid-cols-3 sm:gap-5 sm:py-9">
            {[guide.sections[0], guide.sections[3], guide.sections[5]].map((section, index) => <a key={section.id} href={`#${section.id}`} className="group flex min-h-16 items-center gap-4 rounded-xl border border-border/60 bg-card px-5 py-4 hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-brand-primary">
              <span aria-hidden="true" className="text-overline text-brand-primary">0{index + 1}</span>
              <span className="text-sm font-medium leading-5 text-text-primary group-hover:text-brand-primary">{section.heading}</span>
            </a>)}
          </div>
        </Container>

        <Container className="pb-16 lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="py-5 lg:hidden"><details className="rounded-xl border border-border bg-surface/60 p-4">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-text-primary">In this guide <span aria-hidden="true" className="ml-auto text-brand-primary">+</span></summary>
            <nav aria-label="Article sections" className="border-t border-border/60 pt-3"><Contents guide={guide} /></nav>
          </details></div>
          <div className="min-w-0 lg:col-span-3">
            {guide.sections.map((section, index) => <GuideSectionView key={section.id} section={section} index={index} />)}
            <section aria-labelledby={guide.faqId || "faq"} className="border-t border-border/60 py-12 sm:py-16">
              <p className="text-overline text-brand-primary">Questions</p>
              <h2 id={guide.faqId || "faq"} className="heading-2 mt-3 scroll-mt-28">Frequently asked questions</h2>
              <div className="mt-7 space-y-3">{guide.faqs.map(faq => <details key={faq.question} className="group rounded-xl border border-border bg-card px-5 py-2 open:bg-surface/40">
                <summary className="flex min-h-14 cursor-pointer items-center py-3 font-medium leading-6 text-text-primary">{faq.question}<span aria-hidden="true" className="ml-auto pl-3 text-brand-primary group-open:hidden">+</span></summary>
                <p className="border-t border-border/60 py-5 text-body">{faq.answer}</p>
              </details>)}</div>
            </section>
            <section aria-labelledby="share-article" className="border-t border-border/60 py-9">
              <h2 id="share-article" className="text-lg font-semibold text-text-primary">Share this guide</h2>
              <div className="mt-3 flex flex-wrap gap-x-5"><a className={textLink} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(url)}`}>Share on X</a><a className={textLink} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>Share on LinkedIn</a></div>
              <div className="mt-3"><CopyArticleLink url={url} /></div>
              <a href={url} className="mt-2 block min-h-11 break-all py-2 text-sm text-brand-primary underline underline-offset-4">Article link: {url}</a>
            </section>
            <aside aria-label="Article attribution" className="rounded-xl border border-border/60 bg-surface/40 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-text-primary">{attributionLabel}</h2>
              <p className="mt-2 text-sm text-text-secondary">An approved author byline is not available for this article.</p>
              {author && <Link href={`/authors/${author.slug}`} className={textLink}>View author information</Link>}
            </aside>
          </div>
          <aside className="hidden lg:col-span-1 lg:block">
            <nav aria-label="Article sections" className="sticky top-24 border-l border-border/60 pl-5 pt-12">
              <p className="text-overline mb-4 text-brand-800">In this guide</p>
              <Contents guide={guide} />
            </nav>
          </aside>
        </Container>

        <section aria-labelledby={guide.relatedId || "continue-reading"} className="border-t border-border/60 bg-surface/40 py-12 sm:py-16">
          <Container>
            <p className="text-overline text-brand-primary">Next reads</p>
            <h2 id={guide.relatedId || "continue-reading"} className="heading-2 mt-3">Continue reading</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">{related.map(item => <Link key={item.id} href={`/blog/${item.slug}`} className="group overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-brand-primary">
              {item.coverImage && <Image src={item.coverImage} alt="" width={1200} height={630} sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" className="h-44 w-full object-cover" />}
              <div className="p-5 sm:p-6"><p className="text-overline text-brand-primary">{item.category}</p><h3 className="heading-3 mt-2 group-hover:text-brand-primary">{item.title}</h3><p className="mt-3 text-body-sm">{item.excerpt}</p><span className="mt-5 inline-block text-sm font-semibold text-brand-primary">Read guide →</span></div>
            </Link>)}</div>
          </Container>
        </section>
        <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
        <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      </article>
    </main>
    <Footer />
  </div>;
}
