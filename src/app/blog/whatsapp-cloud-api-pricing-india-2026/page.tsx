import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { getAuthorById } from "@/lib/blog/authors";
import { categoryColors, getRelatedPosts } from "@/lib/blog/registry";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock4,
  Code2,
  CreditCard,
  Database,
  FileText,
  IndianRupee,
  MessageCircle,
  ReceiptText,
  Shield,
  Tag,
  WalletCards,
  Zap,
} from "lucide-react";

const post = {
  slug: "whatsapp-cloud-api-pricing-india-2026",
  title: "WhatsApp Cloud API Pricing India 2026: Complete Cost Breakdown for Businesses",
  description:
    "Explore WhatsApp API pricing in India for 2026. Compare Meta direct fees, BSP markups, OTP costs, hidden infrastructure fees, and cost-saving strategies.",
  category: "WhatsApp API",
  publishedAt: "May 22, 2026",
  publishedIso: "2026-05-22",
  updatedAt: "May 22, 2026",
  updatedIso: "2026-05-22",
  readingTime: "21 minutes",
  tags: ["WhatsApp API", "Pricing", "India", "Cloud API", "2026"],
};

export const metadata = generatePageMetadata({
  title: "WhatsApp Cloud API Pricing India 2026 | Complete Cost Breakdown",
  description:
    "Explore WhatsApp API pricing in India for 2026. Compare Meta direct fees, BSP markups, transactional OTP costs, hidden infrastructure fees, and optimization strategies.",
  keywords: [
    "WhatsApp Cloud API pricing India",
    "WhatsApp API cost India 2026",
    "Meta per message rates INR",
    "WhatsApp marketing message price India",
    "WhatsApp utility message price India",
    "WhatsApp OTP cost India",
    "WhatsApp BSP markup",
    "WhatsApp utility vs marketing templates",
    "WhatsApp template categorization",
    "WhatsApp API accepted but no webhook billing",
  ],
  path: `/blog/${post.slug}`,
  type: "article",
  publishedTime: post.publishedIso,
  modifiedTime: post.updatedIso,
  author: "Devendar Singh Gohil",
});

const pricingRows = [
  {
    category: "Marketing",
    baseRate: "₹0.8631",
    commonBspRate: "₹1.09",
    useCase: "Offers, sales campaigns, newsletters, re-engagement, abandoned cart nudges",
  },
  {
    category: "Utility",
    baseRate: "₹0.1150",
    commonBspRate: "₹0.145",
    useCase: "Order confirmations, invoices, shipping updates, payment reminders",
  },
  {
    category: "Authentication",
    baseRate: "₹0.1150",
    commonBspRate: "₹0.145",
    useCase: "OTP, login verification, account recovery, two-factor authentication",
  },
  {
    category: "Authentication-International",
    baseRate: "₹2.3000",
    commonBspRate: "Varies",
    useCase: "Cross-border OTP traffic delivered to Indian users from non-domestic setups",
  },
  {
    category: "Service",
    baseRate: "₹0 inside CSW",
    commonBspRate: "Usually ₹0",
    useCase: "Customer-initiated support replies inside the 24-hour Customer Service Window",
  },
];

const scenarioRows = [
  {
    volume: "1,000 messages",
    mix: "700 marketing + 300 utility",
    metaOnly: "₹638.67",
    metaWithGst: "₹753.63",
    sampleBspInvoice: "₹2,721.67",
  },
  {
    volume: "10,000 messages",
    mix: "6,000 marketing + 4,000 utility",
    metaOnly: "₹5,638.60",
    metaWithGst: "₹6,653.55",
    sampleBspInvoice: "₹10,171.60",
  },
  {
    volume: "1 lakh messages",
    mix: "60,000 marketing + 40,000 utility",
    metaOnly: "₹56,386.00",
    metaWithGst: "₹66,535.48",
    sampleBspInvoice: "₹87,792.00",
  },
];

const estimatorRows = [
  {
    volume: "10K",
    mostlyUtility: "₹2,646 (₹3,123 with GST)",
    mostlyMarketing: "₹7,135 (₹8,419 with GST)",
  },
  {
    volume: "50K",
    mostlyUtility: "₹13,231 (₹15,613 with GST)",
    mostlyMarketing: "₹35,674 (₹42,095 with GST)",
  },
  {
    volume: "1L",
    mostlyUtility: "₹26,462 (₹31,225 with GST)",
    mostlyMarketing: "₹71,348 (₹84,191 with GST)",
  },
];

const categoryDecisionRows = [
  {
    template: "Your order has shipped.",
    category: "Utility",
    reason: "The message is purely transactional and tied to an existing order.",
  },
  {
    template: "Your order shipped - get 20% off your next order.",
    category: "Marketing",
    reason: "The discount changes the intent from order update to promotion.",
  },
  {
    template: "Complete your payment to finish order #1234.",
    category: "Utility",
    reason: "The reminder is tied to an active transaction the customer already started.",
  },
  {
    template: "Special discount expires tonight.",
    category: "Marketing",
    reason: "The primary intent is promotional urgency, not account or order servicing.",
  },
  {
    template: "Your May invoice is ready to download.",
    category: "Utility",
    reason: "Invoice availability is a post-purchase account update.",
  },
  {
    template: "New arrivals are live for VIP customers.",
    category: "Marketing",
    reason: "Product discovery and re-engagement usually fall under marketing.",
  },
];

const internalResourceLinks = [
  {
    title: "Cloud API Restrictions & Coexistence Framework",
    description: "Plan around 24-hour rules, quality limits, portfolio pacing, and coexistence options.",
    href: "/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026",
    icon: Shield,
  },
  {
    title: "Graph API v24 to v25 Migration Guide",
    description: "Understand BSUID, version changes, throughput planning, and pricing migration risks.",
    href: "/blog/whatsapp-graph-api-v24-to-v25-transition-guide",
    icon: Code2,
  },
  {
    title: "WhatsApp Templates",
    description: "Design compliant marketing, utility, authentication, and service templates.",
    href: "/whatsapp-templates",
    icon: FileText,
  },
  {
    title: "WhatsApp Coexistence",
    description: "Evaluate whether Business App and Cloud API coexistence fits your migration path.",
    href: "/whatsapp-coexistence",
    icon: MessageCircle,
  },
  {
    title: "WhatsApp API Pricing",
    description: "Compare Whats91 platform options, support plans, and implementation fit.",
    href: "/pricing",
    icon: Calculator,
  },
];

const hiddenCosts = [
  {
    icon: WalletCards,
    title: "Platform subscription",
    description:
      "Shared inboxes, template managers, analytics, and campaign builders usually sit behind a monthly BSP plan.",
  },
  {
    icon: Building2,
    title: "Agent seat charges",
    description:
      "Support teams often outgrow included seats. Extra agents can become more expensive than the base plan.",
  },
  {
    icon: Database,
    title: "CRM and ERP integrations",
    description:
      "Shopify, Zoho, Salesforce, Busy ERP, webhook, or spreadsheet connectors may be charged as add-ons.",
  },
  {
    icon: Code2,
    title: "Webhook infrastructure",
    description:
      "High-volume accounts need queues, workers, logs, retries, and idempotency controls for status callbacks.",
  },
  {
    icon: FileText,
    title: "Media storage",
    description:
      "Catalog images, PDFs, KYC files, and voice notes may need CDN, object storage, and retention policies.",
  },
  {
    icon: Shield,
    title: "Compliance operations",
    description:
      "Template reviews, opt-in records, DPDP controls, and quality monitoring need clear ownership.",
  },
];

const optimizationItems = [
  {
    title: "Route utility messages through active service windows",
    description:
      "Before sending an order update or payment receipt, check whether the customer has an active 24-hour window. If yes, send the eligible update without triggering a paid utility template.",
  },
  {
    title: "Use marketing templates only for high-intent segments",
    description:
      "Marketing is the expensive category. Segment by purchase history, previous replies, link clicks, and opt-in source instead of blasting every contact.",
  },
  {
    title: "Design templates that invite replies",
    description:
      "Quick replies and clear CTAs improve response quality, which helps protect sender quality and keeps future throughput healthy.",
  },
  {
    title: "Build WhatsApp-first with SMS fallback for OTP",
    description:
      "Attempt WhatsApp authentication first, wait for a delivery webhook within a short TTL, then fall back to SMS only when delivery is not confirmed.",
  },
];

const developerChecklist = [
  "Acknowledge incoming webhooks quickly with HTTP 200, then process asynchronously.",
  "Loop through every entry, change, message, and status in batched webhook payloads.",
  "Store processed wamid values or status event IDs to avoid duplicate processing.",
  "Separate accepted, sent, delivered, failed, and expired states in your billing ledger.",
  "Use a queue with token-bucket or leaky-bucket throttling for outbound templates.",
  "Retry rate-limit failures with exponential backoff and jitter.",
  "Keep mTLS trust stores current if your webhook endpoint requires mutual TLS.",
];

const faqItems = [
  {
    question: "Is WhatsApp Business API free in India?",
    answer:
      "There is no direct Meta setup license for Cloud API access, but business-initiated template messages are billed per delivered message. Most companies also pay a BSP platform subscription or integration cost.",
  },
  {
    question: "What is the WhatsApp marketing message price in India in 2026?",
    answer:
      "The researched INR base rate is ₹0.8631 per delivered marketing template. Some BSP platforms bill a higher effective rate, commonly around ₹1.09 before taxes.",
  },
  {
    question: "What is the WhatsApp utility message price in India in 2026?",
    answer:
      "The researched INR base rate is ₹0.1150 per delivered utility template outside the customer service window. Utility messages sent inside an eligible 24-hour customer service window can be free.",
  },
  {
    question: "Are undelivered WhatsApp template messages charged?",
    answer:
      "The pricing model is delivery-based for template messages. If a template is sent but not delivered to the user's device, it should not create the same Meta delivery charge.",
  },
  {
    question: "Is an accepted WhatsApp API message billed if no delivered webhook arrives?",
    answer:
      "Treat accepted or submitted status as proof that the send request entered processing, not as final billing evidence. Reconcile billable counts against delivered status events, provider logs, and the final BSP invoice.",
  },
  {
    question: "Why do BSP invoices cost more than the Meta rate card?",
    answer:
      "BSP invoices can include message markups, subscription plans, agent seats, automation add-ons, integration modules, GST, and support packages.",
  },
  {
    question: "Can I use the WhatsApp Business App and Cloud API on the same number?",
    answer:
      "A number normally must be removed from the WhatsApp Business App before standard Cloud API registration. Coexistence options are separate and should be reviewed before migration.",
  },
  {
    question: "Is DLT registration required for WhatsApp messages in India?",
    answer:
      "DLT registration is an SMS compliance requirement. WhatsApp templates are approved through Meta's template review and policy system instead.",
  },
  {
    question: "What is the biggest avoidable WhatsApp API cost mistake?",
    answer:
      "The most common mistake is mixing promotional language into utility templates. Meta can reclassify the template as marketing, which moves it to the higher rate.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
        {title}
      </h2>
      {children && <div className="text-text-secondary leading-relaxed">{children}</div>}
    </div>
  );
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const relatedPosts = getRelatedPosts(currentSlug, 2);
  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-surface/50">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-5 w-5 text-brand-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Continue Reading</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {relatedPosts.map((relatedPost) => (
            <Link href={`/blog/${relatedPost.slug}`} className="block group" key={relatedPost.id}>
              <Card className="h-full border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className={`${categoryColors[relatedPost.category] || "bg-gray-100 text-gray-700"} border text-xs mb-4`}>
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold text-text-primary text-lg mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span>{relatedPost.readingTime} min read</span>
                    <span className="flex items-center gap-1 text-brand-primary font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function JsonLd() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const faqSchema = generateFAQSchema(faqItems);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedIso,
    dateModified: post.updatedIso,
    author: {
      "@type": "Person",
      name: "Devendar Singh Gohil",
      url: `${siteConfig.url}/authors/devendar-singh-gohil`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    image: siteConfig.ogImage,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {[breadcrumbSchema, faqSchema, articleSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function WhatsAppCloudAPIPricingIndia2026Page() {
  const author = getAuthorById("1");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd />
      <Header />

      <main className="flex-1">
        <article>
          <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-surface/80 to-background">
            <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />

            <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <span className="text-text-primary font-medium truncate max-w-[220px]">WhatsApp API Pricing India</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-green-100 text-green-700 border-green-200 border text-sm px-3 py-1">
                  WhatsApp API
                </Badge>
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white border-0 text-sm px-3 py-1">
                  Featured
                </Badge>
              </div>

              <header>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight">
                  {post.title}
                </h1>
                <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                  A practical 2026 cost guide for Indian businesses comparing Meta&apos;s INR rate card,
                  BSP markups, OTP routing, hidden infrastructure costs, and ways to lower your monthly
                  WhatsApp API bill without risking compliance.
                </p>
              </header>

              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary transition-all cursor-pointer text-xs">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6 sm:py-8">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Published</p>
                    <p className="text-sm font-medium text-text-primary">{post.publishedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">{post.readingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Category</p>
                    <p className="text-sm font-medium text-text-primary">{post.category}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4">
                <p className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                  <span>
                    Pricing researched and updated on{" "}
                    <time dateTime={post.updatedIso} className="font-medium text-text-primary">
                      {post.updatedAt}
                    </time>{" "}
                    based on Meta documentation and Indian BSP market analysis.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="pb-8">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border/60 bg-surface/50 p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-primary" />
                  What you&apos;ll learn
                </h2>
                <ul className="space-y-2.5">
                  {[
                    "How per-delivered-template pricing replaced the older conversation budgeting model",
                    "Current researched India rates for marketing, utility, authentication, and international OTP traffic",
                    "How Meta decides whether a template is marketing or utility",
                    "Static 10K, 50K, and 1L monthly cost estimates for Indian teams",
                    "How platform markups, GST, agent seats, integrations, and webhooks change the real invoice",
                    "How to reconcile accepted messages, delayed webhooks, and delivered billing",
                    "Why official Cloud API is cheaper in risk-adjusted terms than unofficial WhatsApp Web automation",
                    "Practical routing rules to reduce marketing, utility, and OTP spend",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="pb-10">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 via-white to-surface/70 p-6 sm:p-8 overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
                  <div>
                    <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 border mb-4">
                      Pricing snapshot
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                      India is still a low-cost WhatsApp API market, but marketing dominates the bill.
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      As of May 22, 2026, the researched INR base card puts Indian marketing
                      templates at ₹0.8631 per delivered message, while utility and domestic
                      authentication are ₹0.1150. That is why a list with too much promotional
                      traffic can cost many times more than an operations-heavy notification flow.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Marketing", value: "₹0.8631", icon: IndianRupee },
                      { label: "Utility", value: "₹0.1150", icon: ReceiptText },
                      { label: "Auth", value: "₹0.1150", icon: Shield },
                      { label: "Auth Intl.", value: "₹2.3000", icon: CreditCard },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-border/60 bg-white p-4">
                        <item.icon className="h-5 w-5 text-brand-primary mb-3" />
                        <p className="text-xs text-text-muted">{item.label}</p>
                        <p className="text-lg font-bold text-text-primary">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-12">
            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
              <section className="space-y-6">
                <SectionHeading eyebrow="Context" title="Why WhatsApp API Pricing Feels Confusing in 2026">
                  <p>
                    Most confusion comes from mixing three different ideas: Meta&apos;s direct message
                    rate, the BSP platform invoice, and the business workflow that decides whether
                    a message is marketing, utility, authentication, or service.
                  </p>
                </SectionHeading>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-brand-primary" />
                      Business App
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>Free mobile-first tool for small teams.</li>
                      <li>Limited broadcast and automation capability.</li>
                      <li>Manual CRM and ERP workflows.</li>
                      <li>Not built for high-volume webhook-driven systems.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-brand-primary" />
                      Cloud API
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>Programmatic messaging through Meta&apos;s hosted platform.</li>
                      <li>Template-based outbound communication at scale.</li>
                      <li>CRM, ERP, chatbot, analytics, and shared inbox integration.</li>
                      <li>Pay per delivered business-initiated template message.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    The On-Premises API is no longer the long-term planning baseline. After Meta&apos;s
                    October 2025 deprecation milestone, new enterprise planning should assume Cloud
                    API, per-template delivery billing, and recipient-country pricing.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Billing model" title="How Meta Charges WhatsApp Cloud API Messages">
                  <p>
                    Business-initiated templates are billed by category when they are delivered to
                    the recipient. The recipient&apos;s country code determines the market rate, not the
                    city where your company is registered.
                  </p>
                </SectionHeading>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Marketing",
                      description: "Promotions, offers, newsletters, abandoned cart flows, product launches.",
                    },
                    {
                      title: "Utility",
                      description: "Transactional updates tied to an existing order, payment, appointment, or account.",
                    },
                    {
                      title: "Authentication",
                      description: "OTP and login verification templates. International routing can cost far more.",
                    },
                    {
                      title: "Service",
                      description: "Customer-initiated support replies inside the active customer service window.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-border/60 bg-white p-5">
                      <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="font-semibold text-text-primary mb-3">The 24-hour Customer Service Window</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    When a user messages your business, Meta opens a 24-hour Customer Service Window.
                    During that window, free-form support replies are allowed, and eligible utility
                    templates can be sent without the standard utility delivery charge. Marketing
                    templates and authentication templates should be treated as chargeable unless
                    a current Meta rule explicitly says otherwise.
                  </p>
                  <a
                    href="https://developers.facebook.com/docs/whatsapp/pricing/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
                  >
                    Check Meta&apos;s current pricing documentation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Template categorization" title="How Meta Decides Marketing vs Utility">
                  <p>
                    Meta looks at the intent of the template, not only the first sentence. A
                    transactional update can become marketing when it includes a coupon, cross-sell,
                    upsell, product discovery prompt, festive offer, or broad re-engagement hook.
                    That classification matters because marketing templates carry the highest
                    researched India rate in this guide.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Template example</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Likely category</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Why it matters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {categoryDecisionRows.map((row) => (
                        <tr key={row.template}>
                          <td className="p-4 font-medium text-text-primary">{row.template}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                row.category === "Marketing"
                                  ? "border-amber-200 bg-amber-50 text-amber-800"
                                  : "border-green-200 bg-green-50 text-green-700"
                              }
                            >
                              {row.category}
                            </Badge>
                          </td>
                          <td className="p-4 text-text-secondary">{row.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    CFO shortcut: if the message can increase demand, recover a dormant user, or
                    promote another purchase, budget it as marketing until template approval proves
                    otherwise. Keep pure order, account, payment, and delivery updates free from
                    promotional copy.
                  </p>
                  <Link
                    href="/whatsapp-templates"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
                  >
                    Review WhatsApp template setup
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Rate card" title="India WhatsApp API Pricing Breakdown">
                  <p>
                    The table below uses the researched INR base card and a common BSP markup example.
                    Final invoices can differ by provider, GST, currency billing, support tier, and
                    add-ons.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Category</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Meta INR base</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Common BSP billing</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Typical use case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {pricingRows.map((row) => (
                        <tr key={row.category}>
                          <td className="p-4 font-medium text-text-primary">{row.category}</td>
                          <td className="p-4 text-text-secondary">{row.baseRate}</td>
                          <td className="p-4 text-text-secondary">{row.commonBspRate}</td>
                          <td className="p-4 text-text-secondary">{row.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Calculator" title="Static WhatsApp API Cost Estimator">
                  <p>
                    Use this as a fast planning chart before opening a detailed calculator. The
                    mostly utility model assumes 80% utility and 20% marketing traffic. The mostly
                    marketing model assumes 80% marketing and 20% utility traffic. Estimates use
                    direct researched Meta delivery rates before BSP platform fees, seats, add-ons,
                    and implementation charges.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Monthly messages</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Mostly utility</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Mostly marketing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {estimatorRows.map((row) => (
                        <tr key={row.volume}>
                          <td className="p-4 font-medium text-text-primary">{row.volume}</td>
                          <td className="p-4 text-text-secondary">{row.mostlyUtility}</td>
                          <td className="p-4 font-medium text-brand-primary">{row.mostlyMarketing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">
                          Need a custom mix with OTP, service replies, and BSP markup?
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          Use the Whats91 cost calculator as the next step, then validate the result
                          against your provider invoice and delivery report.
                        </p>
                      </div>
                    </div>
                    <Button asChild className="bg-brand-primary hover:bg-brand-primary-hover shrink-0">
                      <Link href="/tools/whatsapp-api-cost-calculator">
                        Open calculator
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Cost scenarios" title="Sample WhatsApp API Invoices for India">
                  <p>
                    Use these scenarios as planning models, not universal quotes. The Meta-only
                    columns show delivery fees before platform subscription. The BSP invoice column
                    uses the research file&apos;s sample markup and platform-plan assumptions.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Volume</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Message mix</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Meta delivery</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Meta + 18% GST</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Sample BSP invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {scenarioRows.map((row) => (
                        <tr key={row.volume}>
                          <td className="p-4 font-medium text-text-primary">{row.volume}</td>
                          <td className="p-4 text-text-secondary">{row.mix}</td>
                          <td className="p-4 text-text-secondary">{row.metaOnly}</td>
                          <td className="p-4 text-text-secondary">{row.metaWithGst}</td>
                          <td className="p-4 font-medium text-brand-primary">{row.sampleBspInvoice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 text-white">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Need a quote for your real message mix?</h3>
                      <p className="text-sm text-white/85">
                        Share your marketing, utility, OTP, and support volumes. We can model the
                        monthly cost with direct Meta rates, platform fees, GST, and routing savings.
                      </p>
                    </div>
                    <Button asChild className="bg-white text-brand-primary hover:bg-white/90 shrink-0">
                      <Link href="/contact">
                        Talk to Whats91
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Hidden cost" title="Costs Businesses Usually Miss">
                  <p>
                    The message rate is only one part of the total cost of ownership. The rest
                    appears when support, automation, integrations, compliance, and analytics mature.
                  </p>
                </SectionHeading>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {hiddenCosts.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Internal resources" title="Related Whats91 Resources for Pricing Teams">
                  <p>
                    Pricing decisions touch template design, coexistence, Graph API migration, and
                    platform fit. Use these pages to connect the cost model with implementation
                    decisions before you migrate a production number.
                  </p>
                </SectionHeading>

                <div className="grid gap-4 md:grid-cols-2">
                  {internalResourceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group rounded-2xl border border-border/60 bg-white p-5 transition-all hover:border-brand-primary/30 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                            {item.description}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:gap-2 transition-all">
                            Open resource <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Risk-adjusted cost" title="Official Cloud API vs Unofficial WhatsApp APIs">
                  <p>
                    Unofficial WhatsApp Web automation can look cheaper on a monthly VPS bill, but
                    the operational risk usually destroys the savings once you account for bans,
                    missing webhooks, weak compliance, and limited throughput.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Factor</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Official Cloud API</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Unofficial web emulation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Compliance", "Runs on Meta-approved infrastructure", "Violates platform terms and raises DPDP/GDPR risk"],
                        ["Webhook reliability", "Structured message and status callbacks", "Browser sessions can disconnect or miss events"],
                        ["Scale", "Designed for tiered business throughput", "Constrained by device/browser behavior"],
                        ["Spam enforcement", "Quality warnings and recoverable limits", "Higher permanent number-loss risk"],
                        ["True cost", "Transparent delivery fees plus platform cost", "Cheap hosting, expensive operational failure"],
                      ].map(([factor, official, unofficial]) => (
                        <tr key={factor}>
                          <td className="p-4 font-medium text-text-primary">{factor}</td>
                          <td className="p-4 text-text-secondary">{official}</td>
                          <td className="p-4 text-text-secondary">{unofficial}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Optimization" title="How to Reduce WhatsApp API Costs">
                  <p>
                    Lower spend is not about suppressing messages blindly. It comes from categorizing
                    templates correctly, creating user replies, and routing each notification through
                    the cheapest compliant window.
                  </p>
                </SectionHeading>

                <div className="space-y-4">
                  {optimizationItems.map((item, index) => (
                    <div key={item.title} className="flex gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Developer notes" title="Pricing-Safe Architecture Checklist">
                  <p>
                    Cost control depends on engineering discipline. If webhook events are dropped,
                    duplicated, delayed, or misclassified, your billing and reporting both become unreliable.
                  </p>
                </SectionHeading>

                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {developerChecklist.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-surface/60 p-4">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-surface/50 p-6">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-brand-primary" />
                    Queue-first webhook pattern
                  </h3>
                  <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
                    <code>{`app.post("/webhooks/whatsapp", async (req, res) => {
  res.status(200).send("EVENT_RECEIVED");

  if (!isValidSignature(req.rawBody, req.headers["x-hub-signature-256"])) {
    return;
  }

  await queue.add("whatsapp-webhook", req.body);
});`}</code>
                  </pre>
                </div>

                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <ReceiptText className="h-5 w-5 text-brand-primary" />
                    Accepted But No Webhook: Billing Reconciliation
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    A successful send response means the message was accepted for processing. It is
                    not the same thing as final delivered billing. For finance reporting, treat
                    accepted and sent states as operational states, then reconcile billable counts
                    against delivered webhooks, provider delivery exports, and the final BSP invoice.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Accepted is not final",
                        description:
                          "Do not book accepted messages as a final delivery charge until delivery evidence exists.",
                      },
                      {
                        title: "Delivered is the billing anchor",
                        description:
                          "Use delivered status as the primary internal count for template delivery fees.",
                      },
                      {
                        title: "Webhook delays happen",
                        description:
                          "Hold accepted or sent messages in a pending state for a defined TTL before escalation.",
                      },
                      {
                        title: "No webhook needs reconciliation",
                        description:
                          "Mark missing-status records as unknown, then compare against provider logs and invoices.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl bg-surface/60 p-4">
                        <h4 className="font-medium text-text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="Mistakes" title="Common Pricing Mistakes">
                  <p>
                    The expensive mistakes are usually process mistakes, not rate-card mistakes.
                    Fixing them requires clearer template ownership and better campaign controls.
                  </p>
                </SectionHeading>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      icon: AlertTriangle,
                      title: "Submitting promotional copy as utility",
                      description:
                        "Discounts, offers, cross-sells, or festive language can move a template into marketing pricing.",
                    },
                    {
                      icon: ReceiptText,
                      title: "Triggering duplicate broadcasts",
                      description:
                        "Bad CRM sync logic can send the same abandoned cart or payment reminder more than once.",
                    },
                    {
                      icon: BarChart3,
                      title: "Ignoring response quality",
                      description:
                        "Low replies and high blocks can reduce sender quality, slow scaling, and increase recovery work.",
                    },
                    {
                      icon: Calculator,
                      title: "Budgeting only the message rate",
                      description:
                        "A real invoice includes taxes, platform plans, seats, add-ons, infrastructure, and support.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/60 bg-white p-6">
                      <item.icon className="h-5 w-5 text-brand-primary mb-3" />
                      <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

                <div className="space-y-4">
                  {faqItems.map((faq) => (
                    <div key={faq.question} className="rounded-xl border border-border/60 bg-white p-5">
                      <h3 className="font-semibold text-text-primary mb-2">{faq.question}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Marketing templates are the main cost driver in India.",
                    "Promotional copy inside a utility template can move the message into marketing pricing.",
                    "Utility and domestic authentication are low-cost, but routing still matters.",
                    "International OTP classification can change authentication economics dramatically.",
                    "BSP markups, seats, integrations, and GST often explain invoice shock.",
                    "Official Cloud API is the correct baseline for compliant scale.",
                    "Webhook reliability and delivery reconciliation directly affect billing accuracy.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary mb-2">
                      Build a lower-cost WhatsApp API stack
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Whats91 helps teams model template cost, set up Cloud API, route utility
                      traffic intelligently, and integrate WhatsApp with ERP or CRM systems.
                    </p>
                  </div>
                  <Button asChild className="bg-brand-primary hover:bg-brand-primary-hover shrink-0">
                    <Link href="/tools/whatsapp-api-cost-calculator">
                      Open cost calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </section>
            </div>
          </section>
        </article>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <section className="py-10 sm:py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 p-6 rounded-2xl bg-surface/50 border border-border/50">
              <div>
                <h2 className="font-semibold text-text-primary text-lg mb-1">Found this helpful?</h2>
                <p className="text-sm text-text-muted">Share it with your network</p>
              </div>
              <ShareButtons title={post.title} />
            </div>

            <Card className="border-border/60 bg-white overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <img
                    src="https://ui-avatars.com/api/?name=Devendar+Singh+Gohil&background=448C74&color=fff&size=128"
                    alt="Devendar Singh Gohil"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-1">Written by</p>
                    <h2 className="font-semibold text-text-primary text-lg">{author?.name || "Devendar Singh Gohil"}</h2>
                    <p className="text-sm text-brand-primary mb-3">{author?.role || "Developer"}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {author?.shortBio ||
                        "Lead Developer specializing in WhatsApp Cloud API integration and enterprise ERP solutions."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <RelatedPosts currentSlug={post.slug} />
      </main>

      <Footer />
    </div>
  );
}
