import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  TrustPill,
  StatCard,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  Users,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  BarChart3,
  Globe,
  TrendingUp,
  AlertTriangle,
  Settings,
  Database,
  Sparkles,
  Bot,
  Video,
  Award,
  RefreshCw,
  Layers,
} from "lucide-react";

const pagePath = "/solutions/marketing";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Marketing at Scale | Whats91 Cloud API";
const seoDescription =
  "The 2026 guide to enterprise WhatsApp marketing — bulk messaging, template approval, Meta compliance, quality ratings, and maximizing ROI on the official WhatsApp Business API.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Marketing API",
      "WhatsApp Bulk Messaging",
      "WhatsApp Template Approval",
      "WhatsApp Business API Compliance",
      "WhatsApp Marketing ROI",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const marketingStats = [
  { value: "98%", label: "Open Rate", sublabel: "vs 20% email" },
  { value: "80%", label: "Read in 5 min", sublabel: "instant engagement" },
  { value: "45%", label: "Response Rate", sublabel: "vs <1% email" },
  { value: "10-25%", label: "Conversion Rate", sublabel: "industry leading" },
];

const portalFeatures = [
  {
    icon: Users,
    title: "Bulk Contact Management",
    description: "Upload CSV/Excel with thousands of contacts. Automated country code formatting and duplicate detection ensure clean data.",
    features: ["CSV/XLSX Support", "Auto-formatting", "Duplicate Detection"],
  },
  {
    icon: FileText,
    title: "Template Management",
    description: "WYSIWYG editor for media-rich templates with headers, body text, dynamic variables, and interactive buttons.",
    features: ["Visual Editor", "Media Headers", "Dynamic Variables"],
  },
  {
    icon: Database,
    title: "CRM Integration",
    description: "Connect with existing customer databases to map fields like {{Name}}, {{City}}, {{Last_Purchase}} into placeholders.",
    features: ["Field Mapping", "Real-time Sync", "Multi-platform"],
  },
  {
    icon: Layers,
    title: "Advanced Flow Builder",
    description: "Create automated follow-up sequences for abandoned carts, restock notifications, and triggered campaigns.",
    features: ["Auto Sequences", "Triggers", "A/B Testing"],
  },
];

const reviewTypes = [
  { type: "Machine-Learning Triage", duration: "Seconds to Minutes" },
  { type: "Manual Human Review", duration: "Up to 48 Hours" },
];

const templateStatuses = [
  { status: "Active - Quality Pending", tone: "warning", description: "New template, Meta monitoring initial batch" },
  { status: "Active - High Quality", tone: "success", description: "Green rating, eligible for tier upgrades" },
  { status: "Active - Medium Quality", tone: "warning", description: "Yellow warning, reduce sends" },
  { status: "Paused", tone: "error", description: "Low quality rating, 7-day warning" },
  { status: "Disabled", tone: "neutral", description: "Permanently blocked after repeated violations" },
] as const;

const toneDotClass: Record<(typeof templateStatuses)[number]["tone"], string> = {
  warning: "bg-warning",
  success: "bg-success",
  error: "bg-error",
  neutral: "bg-text-muted",
};

const rejectionCodes = [
  { code: "TAG_CONTENT_MISMATCH", cause: "Marketing content in Utility category", fix: "Change category to Marketing" },
  { code: "INVALID_FORMAT", cause: "Non-sequential placeholders", fix: "Fix placeholder numbering (1,2,3)" },
  { code: "POLICY_VIOLATION", cause: "Restricted categories (alcohol, etc.)", fix: "Review Meta Commerce Policy" },
  { code: "NAME_REUSE", cause: "Reusing rejected template name", fix: "Use unique template name" },
];

const messagingTiers = [
  { tier: "Tier 0", limit: "250", requirement: "Unverified Portfolio" },
  { tier: "Tier 1", limit: "1,000", requirement: "Verified + Approved Display Name" },
  { tier: "Tier 2", limit: "10,000", requirement: "High Quality + 50% Usage in 7 Days" },
  { tier: "Tier 3", limit: "100,000", requirement: "High Quality + 50% Usage in 7 Days" },
  { tier: "Tier 4", limit: "Unlimited", requirement: "Consistent Enterprise Volume" },
];

const channelComparison = [
  { metric: "Open Rate", whatsapp: "98%", email: "20%", sms: "45%" },
  { metric: "Response Rate", whatsapp: "45-55%", email: "< 1%", sms: "2-5%" },
  { metric: "Click-Through Rate", whatsapp: "45-60%", email: "2-5%", sms: "10-15%" },
  { metric: "Conversion Rate", whatsapp: "10-25%", email: "2-5%", sms: "3-7%" },
];

const kpiMetrics = [
  { name: "Delivery Rate", formula: "(Delivered / Sent) × 100", benchmark: "> 95%" },
  { name: "Read Rate", formula: "(Read / Delivered) × 100", benchmark: "> 80%" },
  { name: "Click-Through Rate", formula: "(Clicks / Read) × 100", benchmark: "> 20%" },
  { name: "Revenue Per Recipient", formula: "Revenue / Recipients", benchmark: "€2-6" },
];

const futureTrends = [
  { icon: Bot, title: "Business AI Integration", description: "Context-aware AI bots for sales and support conversations" },
  { icon: Video, title: "Video-Driven Marketing", description: "Interactive video headers with product demos and CTAs" },
  { icon: Globe, title: "US Market Expansion", description: "Clearer 10DLC frameworks opening new opportunities" },
];

const onboardingSteps = [
  { step: 1, title: "Complete Meta Verification", description: "Business verification is mandatory for scaling beyond 250 users" },
  { step: 2, title: "Upload Clean Contact Lists", description: "CSV/XLSX with proper country codes and consent records" },
  { step: 3, title: "Create Approved Templates", description: "Build templates with opt-out buttons and dynamic variables" },
  { step: 4, title: "Launch & Monitor Quality", description: "Track delivery, read rates, and maintain Green rating" },
];

const faqs = [
  { q: "How long does the Meta template review process take?", a: "Most templates are approved within seconds to minutes via machine-learning triage. However, for sensitive industries or new categories, manual review can take up to 48 hours. We recommend planning campaigns with a 48-hour buffer to account for potential delays." },
  { q: "Why are my WhatsApp marketing messages delayed?", a: "Delays can occur due to several factors: Meta's pacing mechanism for new templates, high block/report rates triggering throttling, global frequency caps (users limited to 2 marketing messages/day), or platform latency during peak periods. Check your quality rating and pacing settings." },
  { q: "What is Error 131049 (Saturation)?", a: "This error indicates the recipient has already received the maximum allowed marketing messages (currently ~2 per day) from all brands combined. This is a global Meta limit beyond your control. Delivery will succeed when the user's daily quota resets." },
  { q: "How do I upgrade my messaging tier?", a: "Tiers upgrade automatically when you: (1) Maintain 'High Quality' (Green) rating, and (2) Use at least 50% of your daily limit for 7 consecutive days. In 2026, Meta checks eligibility every 6 hours, allowing rapid scaling during peaks." },
  { q: "What happens if my template gets rejected?", a: "Meta provides specific rejection codes. Common fixes include: changing the category to Marketing (TAG_CONTENT_MISMATCH), fixing placeholder numbering (INVALID_FORMAT), or reviewing content against Commerce Policy (POLICY_VIOLATION). Delete rejected templates before resubmitting with corrections." },
  { q: "Do I need opt-in consent for marketing messages?", a: "Yes, absolutely. In 2025/2026, Meta mandates consent must be 'clear, voluntary, and traceable.' Assuming consent from previous transactions is not compliant. Use specific opt-in triggers like website checkboxes or keyword subscriptions (e.g., 'Text JOIN to subscribe')." },
  { q: "What is the 'Show the Door' policy?", a: "Every marketing template must include an easy opt-out mechanism—typically a button or clear instruction like 'Reply STOP to unsubscribe.' Failure to honor opt-out requests is the fastest way to trigger a 'Red' quality rating and potential account suspension." },
  { q: "How does the 24-hour service window work?", a: "When a user replies to your marketing message, a 24-hour 'service window' opens. During this window, you can send free-form messages without template approval. This is ideal for moving from broadcast to live agent or chatbot interactions." },
  { q: "What's the difference between Paused and Disabled templates?", a: "'Paused' is a warning state when quality drops to Low—you have 7 days to improve. 'Disabled' is permanent; the template is blocked forever. If quality doesn't improve after the 7-day pause, the template becomes Disabled." },
  { q: "Can I send marketing messages to US numbers?", a: "The US market (+1) has seen temporary pauses on marketing templates due to regulatory pressures. The situation is evolving with clearer 10DLC frameworks. Check with our support team for current US sending capabilities." },
];

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Marketing & Engagement",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Marketing & Engagement", url: pagePath },
  ]),
];

export default function WhatsAppMarketingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schemaData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container>
            <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
              <div className="text-center lg:text-left min-w-0">
                <Eyebrow icon={Award} className="mb-5">Official Meta Tech Partner</Eyebrow>
                <h1 className="heading-1 mb-5">Enterprise WhatsApp Marketing at Scale</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-6">
                  The comprehensive 2026 guide to bulk messaging, template approval, compliance, and
                  maximizing ROI through the official WhatsApp Business API.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="https://chat.whats91.com">Access Marketing Portal</PrimaryCTA>
                  <SecondaryCTA href="https://developers.whats91.com/overview">View Documentation</SecondaryCTA>
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>WhatsApp Cloud API v21.0</TrustPill>
                  <TrustPill>Meta-hosted Cloud API</TrustPill>
                  <TrustPill>Consent-first campaigns</TrustPill>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 min-w-0">
                {marketingStats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} caption={stat.sublabel} />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Channel Comparison */}
        <Section tone="surface" aria-labelledby="channel-heading">
          <Container>
            <SectionHeader id="channel-heading" title="WhatsApp vs Legacy Channels (2026 Benchmarks)" />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-sm font-semibold text-text-primary">Metric</th>
                      <th className="text-center p-4 text-sm font-semibold text-brand-primary">WhatsApp</th>
                      <th className="text-center p-4 text-sm font-semibold text-text-muted">Email</th>
                      <th className="text-center p-4 text-sm font-semibold text-text-muted">SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelComparison.map((row) => (
                      <tr key={row.metric} className="border-t border-border/60">
                        <td className="p-4 text-sm text-text-secondary font-medium">{row.metric}</td>
                        <td className="p-4 text-sm text-center font-bold text-brand-primary">{row.whatsapp}</td>
                        <td className="p-4 text-sm text-center text-text-muted">{row.email}</td>
                        <td className="p-4 text-sm text-center text-text-muted">{row.sms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Portal Features */}
        <Section aria-labelledby="portal-heading">
          <Container>
            <SectionHeader
              eyebrow="Portal Capabilities"
              eyebrowIcon={Settings}
              id="portal-heading"
              title="Professional-Grade Marketing Tools"
              description="Everything you need to manage enterprise-scale WhatsApp marketing campaigns"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {portalFeatures.map((feature) => (
                <div key={feature.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={feature.icon} size="lg" className="mb-5" />
                  <h3 className="heading-3 mb-3">{feature.title}</h3>
                  <p className="text-body mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.features.map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full bg-brand-primary/5 text-xs font-medium text-brand-primary">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Compliance */}
        <Section tone="surface" aria-labelledby="compliance-heading">
          <Container>
            <SectionHeader
              eyebrow="Mandatory Compliance"
              eyebrowIcon={AlertTriangle}
              id="compliance-heading"
              title="Meta Opt-In Requirements for 2025/2026"
            />
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="surface-card p-6">
                <h3 className="heading-4 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  Required Consent Standards
                </h3>
                <ul className="space-y-3">
                  {[
                    "Consent must be 'clear, voluntary, and traceable'",
                    "Specific opt-in triggers (checkboxes, keywords)",
                    "Timestamped consent records for Meta audits",
                    "No assumed consent from previous transactions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="heading-4 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-warning" aria-hidden="true" />
                  &quot;Show the Door&quot; Policy
                </h3>
                <ul className="space-y-3">
                  {[
                    "Every marketing template needs opt-out button",
                    "Clear instruction: 'Reply STOP to unsubscribe'",
                    "Honor requests within 24 hours",
                    "Fastest way to Red rating = ignoring opt-outs",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-warning-border bg-warning-soft p-5 text-center">
              <p className="text-sm text-text-primary">
                <strong>Important:</strong> Assuming consent from previous transactions is no longer compliant.
                Use specific opt-in triggers like website checkboxes or keyword subscriptions (e.g., &quot;Text JOIN to subscribe&quot;).
              </p>
            </div>
          </Container>
        </Section>

        {/* Meta Review Cycles */}
        <Section aria-labelledby="review-heading">
          <Container>
            <SectionHeader
              id="review-heading"
              title="Meta Template Review Process"
              description="Understanding the two-tiered review mechanism to set correct campaign expectations"
            />

            <div className="grid gap-6 md:grid-cols-2 mb-10">
              <div className="surface-card overflow-hidden">
                <div className="p-5 bg-surface/50 border-b border-border/60">
                  <h3 className="heading-4">Review Types &amp; Duration</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    {reviewTypes.map((row) => (
                      <tr key={row.type} className="border-b border-border/40 last:border-0">
                        <td className="p-4 text-sm text-text-primary font-medium">{row.type}</td>
                        <td className="p-4 text-sm text-brand-primary font-medium text-right">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="surface-card overflow-hidden">
                <div className="p-5 bg-surface/50 border-b border-border/60">
                  <h3 className="heading-4">Template Quality Statuses</h3>
                </div>
                <div className="p-4 space-y-3">
                  {templateStatuses.map((item) => (
                    <div key={item.status} className="flex items-start gap-3">
                      <span className={`h-3 w-3 rounded-full ${toneDotClass[item.tone]} mt-1 shrink-0`} aria-hidden="true" />
                      <div>
                        <div className="text-sm font-medium text-text-primary">{item.status}</div>
                        <div className="text-caption">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-card overflow-hidden">
              <div className="p-5 bg-surface/50 border-b border-border/60">
                <h3 className="heading-4">Common Rejection Codes &amp; Fixes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Code</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Underlying Cause</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Remediation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectionCodes.map((row) => (
                      <tr key={row.code} className="border-b border-border/40 last:border-0">
                        <td className="p-4 text-sm font-mono text-brand-primary font-medium">{row.code}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.cause}</td>
                        <td className="p-4 text-sm text-text-primary font-medium">{row.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Delivery Behavior */}
        <Section tone="surface" aria-labelledby="delivery-heading">
          <Container>
            <SectionHeader id="delivery-heading" title="Delivery Behavior &amp; Throughput" />
            <div className="grid gap-6 md:grid-cols-3">
              <div className="surface-card p-6">
                <IconBadge icon={Zap} size="lg" className="mb-4" />
                <h3 className="heading-4 mb-2">Messages Per Second</h3>
                <p className="text-3xl font-bold text-brand-primary mb-2">80 MPS</p>
                <p className="text-body-sm">Standard API connections. Tier 4 accounts can reach 1,000 MPS.</p>
              </div>
              <div className="surface-card p-6">
                <IconBadge icon={Clock} size="lg" className="mb-4" />
                <h3 className="heading-4 mb-2">Template Pacing</h3>
                <p className="text-body-sm mb-3">
                  New templates are &quot;paced&quot;—delivery slows if block/report rates spike in initial sends.
                </p>
                <p className="text-caption">Algorithmic protection, not a bug.</p>
              </div>
              <div className="surface-card p-6">
                <IconBadge icon={Globe} size="lg" className="mb-4" />
                <h3 className="heading-4 mb-2">Global Frequency Cap</h3>
                <p className="text-3xl font-bold text-brand-primary mb-2">2/day</p>
                <p className="text-body-sm">Users limited to ~2 marketing messages from ALL brands per day. Error 131049 = saturated.</p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Messaging Tiers */}
        <Section aria-labelledby="tiers-heading">
          <Container>
            <SectionHeader
              eyebrow="Scaling Pathways"
              eyebrowIcon={TrendingUp}
              id="tiers-heading"
              title="Messaging Tier System"
              description="Evaluated at Business Portfolio level with automatic 6-hour upgrade checks"
            />
            <div className="surface-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Tier</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Daily Limit</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messagingTiers.map((row) => (
                      <tr key={row.tier} className="border-t border-border/60">
                        <td className="p-4 text-sm text-text-primary font-medium">{row.tier}</td>
                        <td className="p-4 text-sm text-brand-primary font-bold">{row.limit}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.requirement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-center">
              <p className="text-sm text-text-secondary">
                <RefreshCw className="h-4 w-4 inline mr-2 text-brand-primary" aria-hidden="true" />
                <strong className="text-text-primary">6-Hour Auto-Upgrade:</strong> Hit 50% of daily limit + maintain
                Green rating = automatic tier bump within 6 hours.
              </p>
            </div>
          </Container>
        </Section>

        {/* KPIs */}
        <Section tone="surface" aria-labelledby="kpi-heading">
          <Container>
            <SectionHeader
              eyebrow="Analytics"
              eyebrowIcon={BarChart3}
              id="kpi-heading"
              title="Key Performance Indicators"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {kpiMetrics.map((kpi) => (
                <div key={kpi.name} className="surface-card surface-card-hover p-5">
                  <h4 className="heading-4 mb-2">{kpi.name}</h4>
                  <p className="text-xs text-text-muted mb-3 font-mono">{kpi.formula}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-caption">Benchmark</span>
                    <span className="text-sm font-bold text-brand-primary">{kpi.benchmark}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 surface-card p-5 text-center">
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Note:</strong> ~15% of reads are unmeasurable due to user
                privacy settings. A &quot;measurable&quot; 80% read rate often reflects a &quot;real&quot; 95% actual engagement.
              </p>
            </div>
          </Container>
        </Section>

        {/* Future Trends */}
        <Section aria-labelledby="trends-heading">
          <Container>
            <SectionHeader
              eyebrow="2026 Trends"
              eyebrowIcon={Sparkles}
              id="trends-heading"
              title="Future of WhatsApp Marketing"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {futureTrends.map((trend) => (
                <div key={trend.title} className="surface-card surface-card-hover p-6">
                  <IconBadge icon={trend.icon} size="lg" className="mb-4" />
                  <h3 className="heading-4 mb-2">{trend.title}</h3>
                  <p className="text-body-sm">{trend.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-warning-border bg-warning-soft p-5 text-center">
              <p className="text-sm text-text-primary">
                <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" aria-hidden="true" />
                <strong>AI Rules:</strong> &quot;General Purpose&quot; AI bots (ChatGPT clones) are banned. Only
                &quot;Business-Context&quot; AI bots for sales, support, and recommendations are allowed.
              </p>
            </div>
          </Container>
        </Section>

        {/* Setup Steps */}
        <Section tone="surface" aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader id="setup-heading" title="Quick Start Guide" />
            <div className="space-y-4">
              {onboardingSteps.map((item) => (
                <div key={item.step} className="surface-card flex items-start gap-4 p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-body-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader id="faq-heading" title="Frequently Asked Questions" />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="surface-card px-4 sm:px-5 border-b-0">
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-text-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Start scaling your WhatsApp marketing today</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Join 500+ enterprises using Whats91 for compliant, high-ROI WhatsApp campaigns.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Access Marketing Portal
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Talk to Sales
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
