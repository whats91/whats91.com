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
import { Badge } from "@/components/ui/badge";
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
  Workflow,
  Bot,
  Key,
  Zap,
  Layers,
  Users,
  Database,
  ShoppingCart,
  Target,
  HeadphonesIcon,
  Building2,
  BarChart3,
  FileText,
  Globe,
  Code2,
  Brain,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

const pagePath = "/flow-builder";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Flow Builder: Visual Chatbot Automation | Whats91";
const seoDescription =
  "No-code visual Flow Builder for WhatsApp — drag-and-drop nodes, Agentic AI with RAG, and Bring Your Own API for 40-60% lower automation costs.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Flow Builder",
      "WhatsApp No-Code Automation",
      "WhatsApp Chatbot Builder",
      "WhatsApp RAG AI",
      "Bring Your Own API WhatsApp",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const flowBuilderStats = [
  { value: "40-60%", label: "Cost Savings", sublabel: "with BYOA model" },
  { value: "90%", label: "Ticket Deflection", sublabel: "routine queries" },
  { value: "25%", label: "Cart Recovery", sublabel: "automated flows" },
  { value: "24/7", label: "Availability", sublabel: "no human needed" },
];

const coreFeatures = [
  {
    icon: Workflow,
    title: "Visual Nodemation Canvas",
    subtitle: "The N8N-Style Experience",
    description: "Bring your business logic to life with a drag-and-drop interface. Connect Triggers, Actions, and Logic nodes to build sophisticated customer journeys in minutes, not months.",
    benefits: ["Complete transparency—no black-box code", "Multi-path branching & parallel executions", "Deep cyclical loops for complex workflows", "Visual roadmap of customer experience"],
  },
  {
    icon: Brain,
    title: "Agentic AI & Knowledge Base",
    subtitle: "The RAG Advantage",
    description: "Go beyond simple responses. Train your AI on your PDFs, website data, and manuals. Our RAG-powered engine ensures your bot stays on-script, accurate, and helpful without hallucinating.",
    benefits: ["Natural Language Understanding (NLU)", "Intent classification & entity extraction", "Sentiment analysis for human handoff", "Knowledge base from your documents"],
  },
  {
    icon: Key,
    title: "Bring Your Own API (BYOA)",
    subtitle: "Economic Freedom",
    description: "Why pay markups on AI? Connect your own OpenAI, Gemini, or Claude API keys directly. Scale your automation without the subscription fatigue of per-resolution fees.",
    benefits: ["40-60% cost reduction on AI operations", "Model flexibility—different brains for tasks", "Data sovereignty for BFSI compliance", "Direct billing with AI providers"],
  },
];

const automationComparison = [
  { feature: "Logic Structure", traditional: "Rigid, sequential if/else", flowBuilder: "Graph-based, non-linear nodes" },
  { feature: "Integration Depth", traditional: "Limited native connectors", flowBuilder: "Limitless via HTTP Request" },
  { feature: "User Accessibility", traditional: "Requires developer input", flowBuilder: "Drag-and-drop for all teams" },
  { feature: "AI Capabilities", traditional: "Hard-coded keywords", flowBuilder: "Dynamic NLU & Agentic AI" },
  { feature: "Data Flow", traditional: "Single-stream processing", flowBuilder: "Multi-source merging" },
  { feature: "Cost Model", traditional: "Per-resolution markup", flowBuilder: "BYOA—pay raw token costs" },
];

const useCases = [
  {
    icon: ShoppingCart,
    title: "E-commerce Growth Engine",
    problem: "High cart abandonment and RTO losses",
    solution: "Automated abandoned cart reminders + COD verification flows that confirm orders before shipping.",
    result: "25% increase in recovered revenue, 50% reduction in fake orders",
    metrics: [{ label: "Cart Recovery", value: "15-25%" }, { label: "RTO Reduction", value: "50%" }],
  },
  {
    icon: Target,
    title: "24/7 Sales Concierge",
    problem: "Leads arriving at 2 AM are cold by morning",
    solution: "AI nodes qualify leads in real-time. High-intent leads get instant calendar booking for demos.",
    result: "40%+ higher conversion by engaging at peak interest",
    metrics: [{ label: "Lead Response", value: "< 30 sec" }, { label: "Conversion Lift", value: "40%+" }],
  },
  {
    icon: HeadphonesIcon,
    title: "Support Ticket Deflection",
    problem: "80% of time on same 5 questions",
    solution: "Knowledge base-grounded bot handles order tracking, refunds, and troubleshooting end-to-end.",
    result: "Free agents for complex issues, 90% routine ticket reduction",
    metrics: [{ label: "Deflection Rate", value: "90%" }, { label: "Agent Time Saved", value: "80%" }],
  },
];

const ragComponents = [
  { role: "The Library", component: "Sourcing", mechanism: "Ingesting PDFs, URLs, Docs" },
  { role: "The Translator", component: "Embedding", mechanism: "Converting text to vectors" },
  { role: "The Researcher", component: "Retrieval", mechanism: "Finding relevant data chunks" },
  { role: "The Context", component: "Augmentation", mechanism: "Feeding data to AI prompt" },
  { role: "The Spokesperson", component: "Generation", mechanism: "Crafting natural response" },
];

const nodeTypes = [
  { icon: Zap, name: "Trigger Nodes", description: "Webhooks, keywords, CTWA ads, scheduled times" },
  { icon: Layers, name: "Action Nodes", description: "Send messages, generate PDFs, API calls" },
  { icon: Bot, name: "AI Nodes", description: "Intent classification, entity extraction, sentiment" },
  { icon: Code2, name: "HTTP Nodes", description: "Connect to any API—Shopify, Busy, Shiprocket" },
  { icon: Users, name: "Routing Nodes", description: "Human handoff, agent assignment, escalations" },
  { icon: Database, name: "Data Nodes", description: "CRM updates, inventory checks, lookups" },
];

const industries = [
  { icon: ShoppingCart, name: "E-commerce & D2C", description: "Cart recovery, COD verify, order tracking" },
  { icon: Building2, name: "Real Estate", description: "Lead qualification, site visit booking" },
  { icon: Bot, name: "Healthcare", description: "Appointment scheduling, triage flows" },
  { icon: BarChart3, name: "Financial Services", description: "Lead capture, document collection" },
];

const complianceItems = [
  { icon: FileText, title: "DLT Registration & TRAI Rules", description: "Template approval managed within dashboard. Every Action Node remains compliant with Indian messaging regulations." },
  { icon: Zap, title: "DPDP Act 2023 Compliance", description: "Consent Flows with Opt-In nodes at journey start. Digital audit trail for every consent record." },
  { icon: Globe, title: "Data Localization", description: "BYOA model lets enterprises connect AI providers with India data residency or self-hosted models." },
];

const faqs = [
  { q: "What is a Visual Flow Builder for WhatsApp?", a: "A Visual Flow Builder is a no-code interface that lets you design customer journeys by connecting nodes on a canvas. Instead of writing code, you drag-and-drop triggers, actions, and logic blocks to create sophisticated automation workflows—similar to tools like N8N or Zapier, but built specifically for WhatsApp Business API." },
  { q: "How does the 'Bring Your Own API' (BYOA) model save costs?", a: "Most SaaS platforms bundle AI access and charge 40-100% markup on token costs. With BYOA, you connect your own OpenAI, Gemini, or Claude API keys directly. You pay raw token prices to the AI provider—for example, GPT-4o-mini costs a fraction of bundled services. This often results in 40-60% operational cost savings." },
  { q: "What is RAG and how does it help my chatbot?", a: "RAG (Retrieval-Augmented Generation) gives your AI a knowledge base it must reference before answering. Instead of hallucinating, the AI first retrieves relevant information from your PDFs, website, or documents, then generates a response grounded in your actual business data. This ensures accurate, on-brand answers." },
  { q: "Can I integrate my existing CRM or ERP with Flow Builder?", a: "Yes. HTTP Request nodes let you connect to virtually any API. We have pre-built templates for Shopify, Busy ERP, Shiprocket, Zoho, and others. For custom integrations, you configure the endpoint, authentication, and data mapping visually." },
  { q: "How does the chatbot know when to escalate to a human?", a: "Sentiment analysis nodes detect frustration or anger in user messages. When triggered, the flow can automatically route the conversation to a human agent, bypassing automated responses. You can also set escalation rules based on keywords, conversation length, or specific customer segments." },
  { q: "Is this compliant with Indian regulations like DLT and DPDP Act?", a: "Yes. The Flow Builder includes Opt-In nodes for consent collection, maintaining a digital audit trail. Template management handles DLT registration requirements. For BFSI enterprises, the BYOA model allows you to maintain data residency in India by connecting to compliant AI providers or self-hosted models." },
  { q: "What's the difference between this and WhatsApp's built-in Flows?", a: "WhatsApp Flows are limited to simple form-based interactions within the app. Our Flow Builder is a full automation engine with AI integration, external API connectivity, CRM sync, and complex branching logic—capable of end-to-end process automation, not just form collection." },
  { q: "How quickly can I build and deploy a workflow?", a: "Simple workflows (like FAQ bots or order tracking) can be built in under an hour. Complex integrations with AI and multiple systems typically take 1-3 days. Our team provides templates for common use cases to accelerate deployment." },
];

const agentSteps = [
  { step: 1, title: "Intent Classification", desc: "NLP identifies: Intent=Check Order Status, Entities=Blue Shirt, Last Tuesday" },
  { step: 2, title: "API Lookup", desc: "HTTP Request node queries Shopify API for orders matching phone number" },
  { step: 3, title: "Logistics Check", desc: "Integration with Shiprocket retrieves real-time tracking data" },
  { step: 4, title: "Response Generation", desc: "AI formulates: 'Hi! I found your order for Blue Cotton Shirt. It's in transit, arriving by Friday.'" },
];

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Flow Builder",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Flow Builder", url: pagePath },
  ]),
];

export default function FlowBuilderPage() {
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
                <Eyebrow icon={Workflow} className="mb-5">No-Code Automation Platform</Eyebrow>
                <h1 className="heading-1 mb-5">WhatsApp Flow Builder: Chatbot Automation Made Visual</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-6">
                  The logic of N8N meets the reach of WhatsApp Business API. Automate sales, support, and operations with a drag-and-drop canvas. No code. No limits. Total control.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="https://chat.whats91.com">Start Building Flows</PrimaryCTA>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                        Watch Demo
                      </button>
                    }
                  />
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>500+ Enterprises</TrustPill>
                  <TrustPill>Meta-hosted Cloud API</TrustPill>
                  <TrustPill>Contract-based SLA</TrustPill>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 min-w-0">
                {flowBuilderStats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} caption={stat.sublabel} />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Comparison */}
        <Section tone="surface" aria-labelledby="comparison-heading">
          <Container size="narrow">
            <SectionHeader
              id="comparison-heading"
              title="Traditional Chatbots vs. Visual Flow Builder"
              description="From rigid decision trees to flexible, graph-based automation"
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-sm font-semibold text-text-muted">Feature</th>
                      <th className="text-center p-4 text-sm font-semibold text-text-muted">Traditional</th>
                      <th className="text-center p-4 text-sm font-semibold text-brand-primary">Flow Builder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {automationComparison.map((row) => (
                      <tr key={row.feature} className="border-t border-border/60">
                        <td className="p-4 text-sm text-text-secondary font-medium">{row.feature}</td>
                        <td className="p-4 text-sm text-center text-text-muted">{row.traditional}</td>
                        <td className="p-4 text-sm text-center font-medium text-brand-primary">{row.flowBuilder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Features */}
        <Section aria-labelledby="core-features-heading">
          <Container>
            <SectionHeader
              eyebrow="Core Features"
              eyebrowIcon={Layers}
              id="core-features-heading"
              title="Democratizing Enterprise Intelligence"
              description="Three pillars that serve everyone from CMO to CTO"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {coreFeatures.map((feature) => (
                <div key={feature.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={feature.icon} size="lg" className="mb-5" />
                  <p className="text-xs text-brand-primary font-medium mb-2">{feature.subtitle}</p>
                  <h3 className="heading-3 mb-3">{feature.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Node Types */}
        <Section tone="surface" aria-labelledby="nodes-heading">
          <Container>
            <SectionHeader
              eyebrow="Building Blocks"
              eyebrowIcon={Code2}
              id="nodes-heading"
              title="Node Types for Every Automation Need"
              description="Connect these building blocks visually to create sophisticated workflows"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {nodeTypes.map((node) => (
                <div key={node.name} className="surface-card surface-card-hover flex items-start gap-4 p-5">
                  <IconBadge icon={node.icon} className="shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-text-primary">{node.name}</h4>
                    <p className="text-sm text-text-secondary">{node.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* RAG Deep Dive */}
        <Section aria-labelledby="rag-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <Eyebrow icon={Brain} className="mb-5">AI Integration</Eyebrow>
                <h2 id="rag-heading" className="heading-2 mb-5">How RAG Makes Your AI Business-Smart</h2>
                <p className="text-body mb-6">
                  Retrieval-Augmented Generation (RAG) gives your AI a knowledge base it must reference before answering. Instead of hallucinating or guessing, the AI retrieves relevant information from your PDFs, website, or documents first.
                </p>
                <p className="text-body-sm mb-6">
                  Think of it as giving your AI a <strong className="text-text-primary">rulebook</strong> or <strong className="text-text-primary">research assistant</strong>. Only after finding the factual answer does it generate a response—ensuring accuracy for your specific business context.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["PDF Upload", "Website Crawling", "Notion Sync", "Custom Docs"].map((tag) => (
                    <Badge key={tag} className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="surface-card overflow-hidden">
                <div className="p-5 bg-surface/50 border-b border-border/60">
                  <h3 className="heading-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    RAG Components Explained
                  </h3>
                </div>
                <div className="divide-y divide-border/60">
                  {ragComponents.map((item) => (
                    <div key={item.role} className="p-4 flex items-center gap-4">
                      <div className="w-24 shrink-0">
                        <div className="text-xs text-text-muted">{item.role}</div>
                        <div className="text-sm font-semibold text-brand-primary">{item.component}</div>
                      </div>
                      <div className="flex-1 text-sm text-text-secondary">{item.mechanism}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section tone="surface" aria-labelledby="usecases-heading">
          <Container>
            <SectionHeader
              eyebrow="Proven ROI"
              eyebrowIcon={Target}
              id="usecases-heading"
              title="Business Use Cases That Drive Results"
              description="Real-world scenarios with measurable outcomes for Indian enterprises"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="surface-card p-6">
                  <IconBadge icon={useCase.icon} size="lg" className="mb-5" />
                  <h3 className="heading-3 mb-2">{useCase.title}</h3>

                  <div className="mb-4">
                    <div className="text-xs text-error font-medium mb-1">The Problem</div>
                    <p className="text-sm text-text-secondary">{useCase.problem}</p>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-brand-primary font-medium mb-1">The Solution</div>
                    <p className="text-sm text-text-secondary">{useCase.solution}</p>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-success font-medium mb-1">The Result</div>
                    <p className="text-sm text-text-primary font-medium">{useCase.result}</p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border/60">
                    {useCase.metrics.map((metric) => (
                      <div key={metric.label} className="flex-1 text-center">
                        <div className="text-lg font-bold text-brand-primary">{metric.value}</div>
                        <div className="text-xs text-text-muted">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Industries */}
        <Section aria-labelledby="industries-heading">
          <Container>
            <SectionHeader id="industries-heading" title="Industries We Serve" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <div key={item.name} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-1">{item.name}</h4>
                  <p className="text-body-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Compliance */}
        <Section tone="surface" aria-labelledby="compliance-heading">
          <Container>
            <SectionHeader
              eyebrow="Trust & Compliance"
              eyebrowIcon={Zap}
              id="compliance-heading"
              title="Built for Indian Regulatory Requirements"
              description="Enterprise-grade compliance for BFSI, healthcare, and regulated industries"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {complianceItems.map((item) => (
                <div key={item.title} className="surface-card p-6">
                  <IconBadge icon={item.icon} size="lg" className="mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Agentic AI Example */}
        <Section aria-labelledby="agentic-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Agentic AI in Action"
              eyebrowIcon={Bot}
              id="agentic-heading"
              title="How AI Resolves Complex Queries"
              description="Example: Customer asks about a missing order"
            />
            <div className="surface-card overflow-hidden">
              <div className="p-4 bg-surface/50 border-b border-border/60">
                <p className="text-sm text-text-secondary italic">
                  &quot;I ordered a blue shirt last Tuesday but I haven&apos;t received it&quot;
                </p>
              </div>
              <div className="p-6 space-y-4">
                {agentSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-warning-border bg-warning-soft p-4 text-center">
              <p className="text-sm text-text-primary">
                <Zap className="h-4 w-4 inline mr-2 text-warning" aria-hidden="true" />
                <strong>Sentiment Detection:</strong> If frustration is detected, the flow automatically escalates to a human agent.
              </p>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section tone="surface" aria-labelledby="faq-heading">
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
                <h2 className="heading-2 !text-white mb-4">Ready to Build Your First Workflow?</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Stop settling for static bots. Join the automation revolution with Whats91. Start your free trial today and experience enterprise-grade nodemation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Start Free Trial
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Schedule Demo
                      </button>
                    }
                  />
                </div>
                <p className="mt-6 text-sm text-white/60">
                  Join 350+ Indian businesses that switched to Whats91 this month
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
