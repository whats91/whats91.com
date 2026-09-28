import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  Phone,
  PhoneIncoming,
  PhoneCall,
  Shield,
  Globe,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Zap,
  Building2,
  HeartPulse,
  ShoppingCart,
  Truck,
  Settings,
  Code2,
  AlertTriangle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const pagePath = "/whatsapp-business-calling";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Business Calling via Cloud API | Whats91";
const seoDescription =
  "Enable free inbound WhatsApp voice calls through Cloud API. Verified business identity, 1,000+ concurrent calls, and a 24-hour free messaging window per call.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Business Calling",
      "WhatsApp Cloud API Voice",
      "WhatsApp Voice Calls API",
      "WhatsApp Inbound Calling Free",
      "WhatsApp Calling Webhook",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const technicalPrerequisites = [
  { title: "Meta Developer Console Configuration", description: "Enable 'Allow voice calls' in your WhatsApp Business Account settings. Configure the calls webhook field to receive event notifications.", icon: Settings },
  { title: "Webhook & Signaling Setup", description: "Configure your webhook to handle incoming call events. Meta sends signaling via the Graph API while your infrastructure handles the media stream.", icon: Code2 },
  { title: "SIP/WebRTC Infrastructure", description: "Deploy a SIP or WebRTC client for agents to receive calls. Meta provides signaling endpoints but doesn't manage internal routing.", icon: PhoneCall },
  { title: "Secure Media Streams", description: "Implement SRTP with DTLS/SDES key exchange protocols for encrypted voice media between WhatsApp and your systems.", icon: Shield },
];

const benefits = [
  { icon: PhoneIncoming, title: "Free Inbound Calling", description: "User-initiated calls cost your business $0.00. No per-minute charges, no international fees—unlimited global reach at zero session cost.", highlight: "Save up to ₹10+ lakhs/year vs toll-free numbers" },
  { icon: Clock, title: "24-Hour Service Window", description: "Every incoming call opens a 24-hour customer service window. Even missed calls become messaging opportunities with free follow-up.", highlight: "Turn missed calls into conversations" },
  { icon: Shield, title: "Verified Branded Identity", description: "Display your verified business name and green badge during calls. Build trust instantly—no more 'Potential Spam' labels.", highlight: "Increase answer rates by 40%+" },
  { icon: Globe, title: "International Reach at No Cost", description: "Customers worldwide can call via WhatsApp without international calling fees. Perfect for global brands and travel businesses.", highlight: "Eliminate toll-free international charges" },
];

const signalingFlow = [
  { step: 1, action: "User Initiation", description: "User taps the call icon in WhatsApp mobile app" },
  { step: 2, action: "Meta Signaling", description: "Meta receives the call event and triggers webhook" },
  { step: 3, action: "RTC Processing", description: "Meta's RTC infrastructure initializes session & media negotiation" },
  { step: 4, action: "Partner Notification", description: "Your webhook receives the call event payload" },
  { step: 5, action: "Call Routing", description: "Your VoIP system routes the call to the right agent" },
  { step: 6, action: "Agent Connection", description: "Agent answers via WebRTC/SIP, establishing voice link" },
];

const useCases = [
  { industry: "Real Estate", icon: Building2, useCase: "High-touch sales consultation", impact: "Resolve complex questions on floor plans or pricing instantly. Build trust with prospective buyers through personal voice interaction." },
  { industry: "Healthcare", icon: HeartPulse, useCase: "Urgent patient coordination", impact: "Provide empathy and reassurance during medical escalations. Quick voice consultation for appointment changes or prescription queries." },
  { industry: "E-commerce", icon: ShoppingCart, useCase: "High-value order verification", impact: "Reduce fraud by confirming sensitive transactions via live voice. Increase checkout confidence for premium purchases." },
  { industry: "Logistics", icon: Truck, useCase: "Last-mile delivery support", impact: "Customers call drivers for real-time location updates. Resolve access issues and delivery timing instantly." },
];

const costComparison = [
  { type: "Inbound Call (UIC)", metaCharge: "FREE", benefit: "Unlimited global reach at no session cost" },
  { type: "Customer Service Window", metaCharge: "FREE", benefit: "24 hours of free-form messaging follows the call" },
  { type: "Outbound Call (BIC)", metaCharge: "Per-minute (6s increments)", benefit: "Requires paid template for permission first" },
];

const kpis = [
  { metric: "Total Calls Received", description: "Measure user demand for voice assistance", icon: PhoneIncoming },
  { metric: "Average Call Duration", description: "Indicator of issue complexity and resolution quality", icon: Clock },
  { metric: "Missed Call Rate", description: "Helps adjust agent staffing levels", icon: TrendingUp },
  { metric: "Post-Call Conversion", description: "Link voice sessions to purchases or resolutions", icon: DollarSign },
];

const pitfalls = [
  { issue: "Expired Access Tokens", cause: "Using temporary tokens instead of permanent access tokens", solution: "Generate permanent access tokens in Meta Business Manager for stable integration" },
  { issue: "Webhook Verification Failure", cause: "Missing /whatsapp path or incorrect webhook URL verification", solution: "Verify webhook URL matches Meta's required format and path structure" },
  { issue: "Concurrent Call Limit Exceeded", cause: "Exceeding the 1,000 concurrent call limit", solution: "Monitor volume metrics and request limit increase from Meta for high-traffic events" },
  { issue: "Display Name Rejection", cause: "Poorly chosen or inconsistent business display name", solution: "Use clear, professional names consistent with your brand and legal entity" },
];

const faqs = [
  { question: "What is WhatsApp Business Calling and how does it work with Cloud API?", answer: "WhatsApp Business Calling allows businesses to receive and make voice calls through the WhatsApp Cloud API. When enabled, customers can tap a call icon within their chat thread to initiate a VoIP call to your business. The call is routed through Meta's infrastructure to your configured webhook, then to your SIP/WebRTC client where agents can answer. This transforms a messaging thread into a high-definition, contextual support channel." },
  { question: "How much does it cost to receive WhatsApp calls through Cloud API?", answer: "User-initiated (inbound) calls are completely FREE for businesses. Meta charges $0.00 for incoming calls, regardless of duration or caller location. This includes international calls—a customer in Brazil calling your UK business pays nothing, and neither do you. The call also opens a 24-hour customer service window, allowing free follow-up messaging." },
  { question: "What's the difference between inbound and outbound WhatsApp calls?", answer: "Inbound calls (User-Initiated Calls) are when customers call your business—they're free, require no pre-authorization, and open a 24-hour messaging window. Outbound calls (Business-Initiated Calls) require a 'Call Permission Request' template, are limited to one request per 24 hours per user, and incur per-minute charges. We recommend focusing on inbound calling first for maximum ROI and compliance simplicity." },
  { question: "What are the technical requirements to enable WhatsApp calling?", answer: "Your business phone number needs at least Tier 1 messaging limits (1,000+ daily conversations). You need: (1) Meta Developer Console access with calling enabled, (2) A configured webhook to receive call events, (3) SIP or WebRTC infrastructure for agents, and (4) SRTP encryption implementation. Note that PSTN routing is not supported—calls must terminate on digital endpoints like softphones." },
  { question: "Can I route WhatsApp calls to my existing phone system?", answer: "WhatsApp Calling is purely VoIP-to-VoIP—you cannot natively route calls to standard mobile or landline numbers. However, you can integrate with modern cloud contact centers (like Twilio, Vonage, or custom WebRTC solutions) that support SIP trunking. The 'agent-side' leg must terminate on a digital system like a softphone or web-based call interface." },
  { question: "What happens when I miss a WhatsApp call from a customer?", answer: "A missed call is not a lost interaction—it's a converted messaging opportunity. Even if unanswered, the call opens a fresh 24-hour customer service window. You can immediately respond via text with an automated message like 'Sorry we missed your call! How can we help?' This follow-up is free (no template required) and often leads to quick resolution." },
  { question: "How many concurrent calls can WhatsApp Business Calling handle?", answer: "The standard limit is 1,000 concurrent calls per business phone number—sufficient for most enterprise deployments. For high-traffic events or larger organizations, you can request a limit increase from Meta. This capacity allows significant scaling without infrastructure concerns." },
  { question: "Is WhatsApp Business Calling secure for sensitive conversations?", answer: "Yes. All WhatsApp voice calls are end-to-end encrypted—only the participants can hear the conversation. Additionally, the verified business identity (green badge) ensures customers know they're speaking with your legitimate business, not an impersonator. This makes it suitable for banking, healthcare, and other sensitive sectors." },
  { question: "How does the 24-hour customer service window work with calls?", answer: "When a user calls your business (whether answered or not), a 24-hour window opens. During this window, you can send unlimited free-form messages to that customer without using templates or paying message fees. This dramatically reduces follow-up costs and enables rapid issue resolution through combined voice + text support." },
  { question: "When was WhatsApp Business Calling released?", answer: "WhatsApp Business Calling via Cloud API was released to General Availability on July 1, 2025. It represents the most significant architectural evolution since the Cloud API's inception, transforming the platform from text-centric messaging to a full-fledged voice communication channel." },
];

export default function WhatsAppBusinessCallingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FAQJsonLD faqs={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "WhatsApp Business Calling", url: pageUrl },
        ]}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container>
            <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
              <div className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left min-w-0">
                <div className="flex justify-center lg:justify-start">
                  <Eyebrow live>Cloud API Voice Integration</Eyebrow>
                </div>

                <h1 className="heading-1">
                  <span className="block">WhatsApp Business Calling:</span>
                  <span className="block mt-1 text-gradient">Seamless Inbound Voice for Cloud API</span>
                </h1>

                <p className="text-lead max-w-lg mx-auto lg:mx-0">
                  Enable your business to receive incoming WhatsApp voice calls directly through the Cloud API.
                  Transform messaging threads into high-definition, contextual support channels—at zero cost.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-primary">FREE</div>
                    <div className="text-xs sm:text-sm text-text-muted">Inbound Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-primary">1,000+</div>
                    <div className="text-xs sm:text-sm text-text-muted">Concurrent Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-primary">24hr</div>
                    <div className="text-xs sm:text-sm text-text-muted">Service Window</div>
                  </div>
                </div>

                <CTAGroup align="responsive-hero" className="pt-2">
                  <PrimaryCTA href="/contact">Enable Calling Now</PrimaryCTA>
                  <SecondaryCTA href="https://developers.whats91.com/overview">View Documentation</SecondaryCTA>
                </CTAGroup>
              </div>

              {/* Visual */}
              <div className="flex justify-center lg:justify-end min-w-0">
                <div className="relative w-full max-w-md">
                  <div className="relative rounded-3xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 border border-brand-primary/10 p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 animate-ping rounded-full bg-brand-primary/20 motion-reduce:hidden" style={{ animationDuration: "2s" }} />
                        <div className="absolute inset-2 animate-ping rounded-full bg-brand-primary/30 motion-reduce:hidden" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-brand-primary shadow-lg shadow-brand-primary/30">
                          <PhoneIncoming className="h-10 w-10 sm:h-12 sm:w-12 text-white" aria-hidden="true" />
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <p className="text-lg sm:text-xl font-semibold text-text-primary">Incoming WhatsApp Call</p>
                        <p className="text-sm text-text-muted">Customer calling from chat thread</p>
                      </div>

                      <div className="flex gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error shadow-md">
                            <Phone className="h-5 w-5 text-white rotate-[135deg]" aria-hidden="true" />
                          </div>
                          <span className="text-xs text-text-muted">Decline</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success shadow-md animate-pulse motion-reduce:animate-none">
                            <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                          </div>
                          <span className="text-xs text-text-muted">Answer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 rounded-xl surface-card px-3.5 py-2.5 shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                      <span className="text-xs font-semibold text-text-primary">Verified Business</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Benefits */}
        <Section tone="surface" aria-labelledby="benefits-heading">
          <Container>
            <SectionHeader
              eyebrow="Key Benefits"
              eyebrowIcon={Sparkles}
              id="benefits-heading"
              title="The Core Benefits of Inbound WhatsApp Voice"
              description="Transform your customer support with voice calls that are contextual, free, and trusted."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="surface-card p-6">
                  <div className="flex flex-col gap-4">
                    <IconBadge icon={benefit.icon} size="lg" />
                    <h3 className="text-lg font-semibold text-text-primary">{benefit.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{benefit.description}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full w-fit">
                      <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                      {benefit.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Strategic Shift */}
        <Section aria-labelledby="strategy-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <Eyebrow icon={TrendingUp} className="mb-4">Strategic Advantage</Eyebrow>
                <h2 id="strategy-heading" className="heading-2 mb-4">The &quot;Incoming-First&quot; Strategy</h2>
                <p className="text-body mb-6">
                  While receiving calls is native and frictionless, initiating calls requires complex permissions and templates.
                  Smart businesses focus on <strong className="text-text-primary">User-Initiated Calls (UIC)</strong>—they&apos;re free,
                  require no pre-authorization, and immediately open a 24-hour customer service window.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-success-soft border border-success-border">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Inbound Calls = FREE</p>
                      <p className="text-xs text-success">No per-minute charges, opens 24h messaging window</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-warning-soft border border-warning-border">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Outbound Calls = Complex</p>
                      <p className="text-xs text-warning">Requires Call Permission Request, limited to 1 per 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="surface-card overflow-hidden">
                <div className="px-6 py-4 bg-surface/80 border-b border-border/60">
                  <h3 className="text-lg font-semibold text-text-primary">Cost Comparison</h3>
                </div>
                <div className="divide-y divide-border/60">
                  {costComparison.map((item) => (
                    <div key={item.type} className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-text-primary">{item.type}</span>
                        <span className={`text-sm font-bold ${item.metaCharge === "FREE" ? "text-success" : "text-text-primary"}`}>
                          {item.metaCharge}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">{item.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Signaling Flow */}
        <Section tone="surface" aria-labelledby="signaling-heading">
          <Container>
            <SectionHeader
              eyebrow="Technical Architecture"
              eyebrowIcon={Code2}
              id="signaling-heading"
              title="The Signaling Flow for Incoming Calls"
              description="Understand the six-step event sequence when a user initiates a WhatsApp call to your business."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {signalingFlow.map((step) => (
                <div key={step.step} className="surface-card surface-card-hover flex items-start gap-4 p-5 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white font-bold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">{step.action}</h4>
                    <p className="text-xs text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Technical Prerequisites */}
        <Section aria-labelledby="prereq-heading">
          <Container>
            <SectionHeader
              eyebrow="Implementation Guide"
              eyebrowIcon={Settings}
              id="prereq-heading"
              title="Technical Prerequisites & Implementation"
              description="Configure your infrastructure to receive WhatsApp voice calls through Cloud API."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
              {technicalPrerequisites.map((prereq) => (
                <div key={prereq.title} className="surface-card flex items-start gap-4 p-5">
                  <IconBadge icon={prereq.icon} size="lg" className="shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">{prereq.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{prereq.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-base font-semibold text-text-primary mb-2">Important: No PSTN Support</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    WhatsApp Calling API is purely VoIP-to-VoIP. It cannot natively route calls to standard mobile or landline numbers.
                    The agent-side leg must terminate on a digital system like a softphone, WebRTC client, or cloud contact center platform.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section tone="surface" aria-labelledby="usecases-heading">
          <Container>
            <SectionHeader
              eyebrow="Industry Applications"
              eyebrowIcon={Building2}
              id="usecases-heading"
              title="Industry-Specific Use Cases"
              description="See how businesses across industries are transforming customer journeys with WhatsApp voice."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {useCases.map((useCase) => (
                <div key={useCase.industry} className="surface-card p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <IconBadge icon={useCase.icon} size="lg" />
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{useCase.industry}</h3>
                        <p className="text-sm text-brand-primary font-medium">{useCase.useCase}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{useCase.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* KPIs */}
        <Section aria-labelledby="kpi-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h2 id="kpi-heading" className="heading-2 mb-4">Measuring Success: Key Performance Indicators</h2>
                <p className="text-body mb-6">
                  Monitor these metrics through your integrated dashboard to track ROI and optimize your voice support strategy.
                </p>
                <div className="p-4 rounded-xl bg-success-soft border border-success-border">
                  <p className="text-sm text-success">
                    <strong>Early adopters report:</strong> 26% increase in conversions and significant boost in Net Promoter Score (NPS)
                    by switching from chat to voice for complex issues.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2">
                {kpis.map((kpi) => (
                  <div key={kpi.metric} className="surface-card surface-card-hover p-5">
                    <IconBadge icon={kpi.icon} className="mb-3" />
                    <h4 className="text-sm font-semibold text-text-primary mb-1">{kpi.metric}</h4>
                    <p className="text-xs text-text-muted">{kpi.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Troubleshooting */}
        <Section tone="surface" aria-labelledby="pitfalls-heading">
          <Container>
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-error-soft border border-error-border px-4 py-1.5 text-xs sm:text-sm font-medium text-error">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                Troubleshooting
              </span>
              <h2 id="pitfalls-heading" className="heading-2">Common Implementation Pitfalls</h2>
              <p className="text-body max-w-2xl mx-auto">
                Avoid these common issues when setting up WhatsApp Business Calling.
              </p>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {pitfalls.map((pitfall) => (
                <div key={pitfall.issue} className="surface-card p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-soft text-error shrink-0">
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1">{pitfall.issue}</h4>
                      <p className="text-xs text-text-muted mb-2"><strong>Cause:</strong> {pitfall.cause}</p>
                      <p className="text-xs text-success"><strong>Fix:</strong> {pitfall.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader
              id="faq-heading"
              title="Frequently Asked Questions"
              description="Everything you need to know about WhatsApp Business Calling."
            />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="surface-card px-4 sm:px-5 border-b-0">
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section tone="surface">
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-xs sm:text-sm font-medium text-white mb-6">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  General Available Since July 2025
                </div>
                <h2 className="heading-2 !text-white mb-4">Ready to Enable Voice Calling?</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Transform your WhatsApp messaging into a full-fledged voice support channel.
                  Free inbound calls, verified identity, and seamless integration.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Get Started Free
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
