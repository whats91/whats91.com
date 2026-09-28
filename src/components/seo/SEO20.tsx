"use client";

/**
 * SEO 2.0 Structured Data Injector
 * Injects JSON-LD schemas for AI agents and LLM optimization
 *
 * Usage:
 * <SEO20StructuredData
 *   schemas={[organizationSchema, articleSchema]}
 * />
 */

interface SEO20StructuredDataProps {
  schemas: object[];
}

export function SEO20StructuredData({ schemas }: SEO20StructuredDataProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

/**
 * Speakable Content Wrapper
 * Marks content as suitable for voice search and AI summaries
 *
 * Usage:
 * <SpeakableContent>
 *   <h1>Main heading</h1>
 *   <p>Key information...</p>
 * </SpeakableContent>
 */

interface SpeakableContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SpeakableContent({ children, className = "" }: SpeakableContentProps) {
  return (
    <div
      className={`speakable-content ${className}`}
      data-speakable="true"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {children}
    </div>
  );
}

/**
 * Semantic Article Wrapper
 * Provides proper semantic structure for AI crawlers
 *
 * Usage:
 * <SemanticArticle
 *   headline="Article Title"
 *   description="Article description"
 *   author="Author Name"
 *   publishedDate="2026-01-15"
 * >
 *   Content here...
 * </SemanticArticle>
 */

interface SemanticArticleProps {
  children: React.ReactNode;
  headline: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  className?: string;
}

export function SemanticArticle({
  children,
  headline,
  description,
  author,
  publishedDate,
  modifiedDate,
  className = "",
}: SemanticArticleProps) {
  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className={className}
    >
      <header>
        <h1 itemProp="headline">{headline}</h1>
        <meta itemProp="description" content={description} />
        <meta itemProp="author" content={author} />
        <meta itemProp="datePublished" content={publishedDate} />
        {modifiedDate && <meta itemProp="dateModified" content={modifiedDate} />}
      </header>
      <div itemProp="articleBody">{children}</div>
    </article>
  );
}

/**
 * Semantic Section Wrapper
 * Provides proper section boundaries for content chunking
 *
 * Usage:
 * <SemanticSection
 *   heading="Features"
 *   description="Key features of our product"
 * >
 *   Content here...
 * </SemanticSection>
 */

interface SemanticSectionProps {
  children: React.ReactNode;
  heading: string;
  description?: string;
  id?: string;
  className?: string;
}

export function SemanticSection({
  children,
  heading,
  description,
  id,
  className = "",
}: SemanticSectionProps) {
  const headingId = id || `section-${heading.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      itemScope
      itemType="https://schema.org/WebPageElement"
      className={className}
    >
      <h2 id={headingId} itemProp="name">
        {heading}
      </h2>
      {description && (
        <p itemProp="description" className="text-text-secondary">
          {description}
        </p>
      )}
      <div itemProp="mainContent">{children}</div>
    </section>
  );
}

/**
 * FAQ Schema Component
 * Renders FAQ with proper schema markup for AI snippets
 *
 * Usage:
 * <FAQSchema
 *   faqs={[
 *     { question: "What is WhatsApp Cloud API?", answer: "..." }
 *   ]}
 * />
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQSchema({ faqs, className = "" }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section
        itemScope
        itemType="https://schema.org/FAQPage"
        className={className}
      >
        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="border-b border-border pb-4"
            >
              <h3 itemProp="name" className="font-semibold text-lg">
                {faq.question}
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className="mt-2 text-text-secondary"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/**
 * Breadcrumb Schema Component
 * Renders breadcrumb navigation with schema markup
 *
 * Usage:
 * <BreadcrumbSchema
 *   items={[
 *     { name: "Home", url: "/" },
 *     { name: "Blog", url: "/blog" },
 *     { name: "Article", url: "/blog/article" }
 *   ]}
 * />
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbSchema({ items, className = "" }: BreadcrumbSchemaProps) {
  const baseUrl = "https://whats91.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex items-center gap-2 text-sm"
        >
          {items.map((item, index) => (
            <li
              key={item.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              {index > 0 && <span className="text-text-muted">/</span>}
              <a
                itemProp="item"
                href={item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`}
                className="hover:text-brand-primary transition-colors"
              >
                <span itemProp="name">{item.name}</span>
              </a>
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
