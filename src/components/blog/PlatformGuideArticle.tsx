import Link from "next/link";
import Image from "next/image";
import { generateBlogArticleSchema } from "@/lib/blog/metadata";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ArticleAttribution } from "./ArticleAttribution";
import { CopyArticleLink } from "./CopyArticleLink";
import { getPostBySlug } from "@/lib/blog/registry";
import { contentDates } from "@/lib/content/dates";
import { siteConfig } from "@/lib/seo/config";
import { billingGuides, type BillingGuide } from "@/lib/blog/billing-guides";

const linkClass = "inline-flex min-h-11 items-center text-brand-primary underline underline-offset-4 break-words";
export function PlatformGuideArticle({ guide }: { guide: BillingGuide }) {
  const post = getPostBySlug(guide.slug)!;
  const dates = contentDates(post);
  const url = `${siteConfig.url}/blog/${guide.slug}`;
  const related = billingGuides.filter(item => item.slug !== guide.slug).map(item => getPostBySlug(item.slug)!);
  const articleSchema = generateBlogArticleSchema(guide.slug);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main id="main-content" tabIndex={-1} className="flex-1 min-w-0">
      <article data-platform-guide={guide.slug} className="break-words [overflow-wrap:anywhere]">
        <header className="bg-surface/60 py-10 sm:py-14 border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-3 items-center text-sm">
              <Link href="/" className={linkClass}>Home</Link><span aria-hidden="true">/</span><Link href="/blog" className={linkClass}>Blog</Link><span aria-hidden="true">/</span><span>{post.category}</span>
            </nav>
            <p className="text-sm font-semibold text-brand-primary">{post.category}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-text-primary">{guide.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed">{guide.intro}</p>
            {post.coverImage && <figure className="space-y-2"><Image src={post.coverImage} alt={post.coverAlt || guide.title} width={1200} height={630} sizes="(max-width: 768px) 100vw, 896px" loading="eager" fetchPriority="high" className="w-full h-auto rounded-2xl border border-border" /><figcaption className="text-sm text-text-muted">{post.coverCaption}</figcaption></figure>}
            <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-secondary">
              {dates.published && <div><dt className="font-medium text-text-primary">Published</dt><dd><time dateTime={dates.published}>{new Date(dates.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time></dd></div>}
              <div><dt className="font-medium text-text-primary">Reading time</dt><dd>{post.readingTime} minutes</dd></div>
              <div><dt className="font-medium text-text-primary">Attribution</dt><dd>Pending</dd></div>
            </dl>
            <ul aria-label="Article topics" className="flex flex-wrap gap-2">{post.tags.map(tag => <li key={tag}><Link href={`/blog?tag=${encodeURIComponent(tag)}`} className="inline-flex min-h-11 items-center rounded-full border border-border px-3 text-sm text-text-secondary">{tag}</Link></li>)}</ul>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          <nav aria-labelledby="article-contents" className="rounded-2xl border border-border bg-surface/40 p-5 sm:p-6">
            <h2 id="article-contents" className="text-xl font-semibold mb-3">In this guide</h2>
            <ol className="list-decimal pl-5 space-y-1">{guide.sections.map(section => <li key={section.id}><a className={linkClass} href={`#${section.id}`}>{section.heading}</a></li>)}<li><a className={linkClass} href={`#${guide.faqId || "faq"}`}>Frequently asked questions</a></li></ol>
          </nav>
          {guide.sections.map(section => <section key={section.id} aria-labelledby={section.id} className="space-y-5">
            <h2 id={section.id} className="scroll-mt-28 text-2xl sm:text-3xl font-semibold leading-snug pb-3 border-b border-border/60">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => <p key={i} className="text-base leading-7 text-text-secondary">{paragraph}</p>)}
            {section.image && <figure className="space-y-2"><Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 768px) 100vw, 896px" loading="lazy" className="w-full h-auto rounded-2xl border border-border" /><figcaption className="text-sm text-text-muted">{section.image.caption}</figcaption></figure>}
            {section.steps && <ol className="list-decimal pl-6 space-y-3 text-text-secondary leading-7">{section.steps.map(step => <li key={step} className="pl-1">{step}</li>)}</ol>}
            {section.table && <div role="region" tabIndex={0} aria-labelledby={`${section.id}-table-caption`} className="max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-brand-primary">
              <table className="w-full min-w-[560px] text-sm [overflow-wrap:normal]">
                <caption id={`${section.id}-table-caption`} className="text-left p-4 font-medium text-text-primary bg-surface/40">{section.table.caption}</caption>
                <thead className="bg-surface/70 text-text-primary"><tr>{section.table.headers.map(h => <th key={h} scope="col" className="p-4 text-left align-top font-semibold">{h}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, i) => <tr key={i} className="border-t border-border/60">{row.map((cell, j) => j === 0 ? <th key={j} scope="row" className="p-4 text-left align-top font-medium text-text-primary">{cell}</th> : <td key={j} className="p-4 align-top text-text-secondary">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>}
            {section.code && <figure className="space-y-2"><figcaption id={`${section.id}-code-caption`} className="text-sm font-medium text-text-primary">{section.code.caption}</figcaption><pre role="region" tabIndex={0} aria-labelledby={`${section.id}-code-caption`} className="max-w-full overflow-x-auto rounded-xl border border-border bg-surface/60 p-4 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-brand-primary [overflow-wrap:normal]"><code>{section.code.text}</code></pre></figure>}
            {section.note && <p className="rounded-xl border-l-4 border-brand-primary bg-brand-primary/5 p-5 text-sm leading-6 text-text-secondary">{section.note}</p>}
            {section.links && <ul aria-label={`Further reading for ${section.heading}`} className="space-y-1">{section.links.map(link => <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>)}</ul>}
          </section>)}
          <section aria-labelledby={guide.faqId || "faq"} className="space-y-4">
            <h2 id={guide.faqId || "faq"} className="scroll-mt-28 text-2xl sm:text-3xl font-semibold">Frequently asked questions</h2>
            {guide.faqs.map(faq => <details key={faq.question} className="rounded-xl border border-border p-4 sm:p-5"><summary className="cursor-pointer min-h-11 font-medium leading-6 text-text-primary">{faq.question}</summary><p className="pt-4 text-text-secondary leading-7">{faq.answer}</p></details>)}
          </section>
          <section aria-labelledby="share-article" className="rounded-2xl border border-border bg-surface/40 p-5 sm:p-6 space-y-4">
            <h2 id="share-article" className="text-xl font-semibold">Share this guide</h2>
            <div className="flex flex-wrap gap-4"><a className={linkClass} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(url)}`}>Share on X</a><a className={linkClass} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>Share on LinkedIn</a></div>
            <CopyArticleLink url={url} />
            <a href={url} className="block w-full min-w-0 min-h-11 py-2 text-sm text-brand-primary underline underline-offset-4 [overflow-wrap:anywhere]">Article link: {url}</a>
          </section>
          <ArticleAttribution authorId={post.authorId} />
          <section aria-labelledby={guide.relatedId || "continue-reading"} className="space-y-5">
            <h2 id={guide.relatedId || "continue-reading"} className="text-2xl font-semibold">Continue reading</h2>
            <div className="grid sm:grid-cols-2 gap-5">{related.map(item => <Link key={item.id} href={`/blog/${item.slug}`} className="rounded-2xl border border-border p-6 block space-y-3 hover:border-brand-primary/40"><p className="text-sm text-brand-primary">{item.category}</p><h3 className="text-lg font-semibold leading-snug">{item.title}</h3><p className="text-sm text-text-secondary leading-6">{item.excerpt}</p><p className="text-sm text-brand-primary">Read guide →</p></Link>)}</div>
          </section>
        </div>
        <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
        <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      </article>
    </main>
    <Footer />
  </div>;
}
