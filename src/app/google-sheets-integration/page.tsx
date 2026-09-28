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
  TrustPill,
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
  FileSpreadsheet,
  MessageCircle,
  CheckCircle2,
  Zap,
  RefreshCw,
  Database,
  Webhook,
  Settings,
  Layers,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Sparkles,
  Globe,
  Shield,
  TrendingUp,
} from "lucide-react";

const pagePath = "/google-sheets-integration";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Campaign Responses to Google Sheets | Whats91";
const seoDescription =
  "Auto-sync every WhatsApp button click to Google Sheets in real-time. No code, no manual exports — automatic webhooks capture structured campaign response data.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Google Sheets Integration",
      "WhatsApp Campaign Response Tracking",
      "WhatsApp Button Click Sync",
      "WhatsApp Webhook Google Sheets",
      "WhatsApp Lead Qualification Sheets",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const features = [
  { icon: Zap, title: "Real-Time Sync", description: "Responses are pushed to Google Sheets within seconds of user interaction. No delays, no manual exports." },
  { icon: Webhook, title: "Automatic Webhooks", description: "Our platform handles all webhook configurations. When a user clicks a button, the data flows automatically." },
  { icon: Database, title: "Structured Data", description: "Every response is logged with timestamps, phone numbers, button selections, and custom campaign metadata." },
  { icon: Settings, title: "Custom Mapping", description: "Map response fields to specific Google Sheet columns. Define your own schema for maximum flexibility." },
];

const buttonReplyExamples = [
  { button: "Interested", icon: ThumbsUp, tone: "success" as const, description: "Customer expresses interest in your offer", dataLogged: ["Phone Number", "Timestamp", "Campaign ID", "Button: Interested", "Lead Score: High"] },
  { button: "Not Interested", icon: ThumbsDown, tone: "error" as const, description: "Customer declines the offer", dataLogged: ["Phone Number", "Timestamp", "Campaign ID", "Button: Not Interested", "Lead Score: Low"] },
  { button: "Learn More", icon: HelpCircle, tone: "info" as const, description: "Customer wants additional information", dataLogged: ["Phone Number", "Timestamp", "Campaign ID", "Button: Learn More", "Lead Score: Medium"] },
  { button: "Call Me", icon: MessageCircle, tone: "warning" as const, description: "Customer requests a callback", dataLogged: ["Phone Number", "Timestamp", "Campaign ID", "Button: Call Me", "Priority: High"] },
];

const toneClasses: Record<"success" | "error" | "info" | "warning", string> = {
  success: "bg-success-soft text-success border-success-border",
  error: "bg-error-soft text-error border-error-border",
  info: "bg-info-soft text-info border-info-border",
  warning: "bg-warning-soft text-warning border-warning-border",
};

const howItWorks = [
  { step: 1, title: "Create Campaign", description: "Design your WhatsApp campaign with interactive buttons (Quick Replies) using our template builder or custom templates.", icon: MessageCircle },
  { step: 2, title: "Configure Google Sheet", description: "Connect your Google Sheet and map the columns where you want response data to be stored.", icon: FileSpreadsheet },
  { step: 3, title: "Send Campaign", description: "Launch your campaign to your target audience. Messages are delivered via WhatsApp Cloud API.", icon: Globe },
  { step: 4, title: "Capture Responses", description: "When users click buttons, our platform captures the response instantly through webhooks.", icon: Webhook },
  { step: 5, title: "Auto-Push to Sheets", description: "Response data is automatically pushed to your configured Google Sheet in real-time.", icon: RefreshCw },
  { step: 6, title: "Automate Further", description: "Use Google Sheets' built-in automation or connect to Zapier/Make for advanced workflows.", icon: Zap },
];

const useCases = [
  { title: "Lead Qualification", description: "Automatically score and categorize leads based on button responses. High-intent responses trigger immediate follow-up sequences.", metrics: "3x faster lead response time", icon: TrendingUp },
  { title: "Event RSVPs", description: "Collect event confirmations via WhatsApp and log responses to Sheets for attendance tracking and reminders.", metrics: "85% response rate", icon: CheckCircle2 },
  { title: "Customer Surveys", description: "Run NPS surveys or feedback collection campaigns. All responses auto-populate your analytics spreadsheet.", metrics: "60% higher completion", icon: Sparkles },
  { title: "Order Confirmations", description: "Let customers confirm orders via WhatsApp buttons. Sync to Sheets for fulfillment team visibility.", metrics: "90% confirmation rate", icon: Shield },
];

const dataFields = [
  { field: "phone_number", description: "Customer's WhatsApp number", format: "+91XXXXXXXXXX" },
  { field: "timestamp", description: "Exact time of response", format: "2024-01-15 14:30:00 IST" },
  { field: "campaign_id", description: "Unique campaign identifier", format: "CAMP-2024-001" },
  { field: "template_name", description: "Template that was sent", format: "offer_jan_2024" },
  { field: "button_id", description: "ID of the clicked button", format: "btn_interested" },
  { field: "button_text", description: "Button label clicked", format: "Interested" },
  { field: "message_id", description: "WhatsApp message ID", format: "wamid.HBgM..." },
  { field: "custom_fields", description: "Any custom metadata", format: "JSON object" },
];

const faqs = [
  { q: "How quickly are responses synced to Google Sheets?", a: "Responses are typically synced within 1-3 seconds of the user clicking a button. Our webhook infrastructure ensures near-instant data capture and push to your connected Google Sheet." },
  { q: "Do I need to set up webhooks manually?", a: "No, Whats91 handles all webhook configurations automatically. You simply connect your Google Sheet once, and all incoming responses are routed automatically. No technical setup required." },
  { q: "What types of button responses are captured?", a: "We capture all Quick Reply button clicks and Call-to-Action responses. This includes custom button labels you define in your templates, such as 'Interested', 'Not Interested', 'Learn More', 'Call Me', or any custom options." },
  { q: "Can I use this with existing Google Sheets?", a: "Yes, you can connect to any existing Google Sheet. Just make sure the sheet has the appropriate column headers to receive the data. You can also create new sheets directly from our dashboard." },
  { q: "Is there a limit on the number of responses?", a: "There's no hard limit on responses. Google Sheets supports up to 10 million cells per spreadsheet. For high-volume campaigns, we recommend creating monthly sheets or using multiple tabs." },
  { q: "Can I connect multiple campaigns to one sheet?", a: "Yes, you can route multiple campaigns to a single Google Sheet. Each response includes the campaign_id field, allowing you to filter and analyze data by campaign." },
  { q: "What happens if Google Sheets is temporarily unavailable?", a: "Our system includes retry logic with exponential backoff. If Google Sheets is temporarily unavailable, responses are queued and automatically retried. No data is lost." },
  { q: "Can I trigger automations from the synced data?", a: "Absolutely! Once data is in Google Sheets, you can use Google Apps Script, Zapier, Make (Integromat), or similar tools to trigger follow-up actions like email sequences, CRM updates, or team notifications." },
];

const sampleSheetData = [
  { phone: "+91 98765 43210", timestamp: "2024-01-15 10:30:15", button: "Interested", campaign: "Jan Offer 2024" },
  { phone: "+91 87654 32109", timestamp: "2024-01-15 10:31:42", button: "Learn More", campaign: "Jan Offer 2024" },
  { phone: "+91 76543 21098", timestamp: "2024-01-15 10:32:08", button: "Not Interested", campaign: "Jan Offer 2024" },
  { phone: "+91 65432 10987", timestamp: "2024-01-15 10:33:55", button: "Call Me", campaign: "Jan Offer 2024" },
  { phone: "+91 54321 09876", timestamp: "2024-01-15 10:35:20", button: "Interested", campaign: "Jan Offer 2024" },
];

const sampleButtonTone: Record<string, "success" | "error" | "info" | "warning"> = {
  Interested: "success",
  "Not Interested": "error",
  "Learn More": "info",
  "Call Me": "warning",
};

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Campaign Responses to Google Sheets",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Google Sheets Integration", url: pagePath },
  ]),
];

export default function GoogleSheetsIntegrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schemaData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container size="narrow">
            <div className="text-center">
              <Eyebrow icon={FileSpreadsheet} className="mb-5">Google Sheets Integration</Eyebrow>
              <h1 className="heading-1 mb-5">
                WhatsApp Campaign Responses
                <span className="text-brand-primary block mt-2">Auto-Sync to Google Sheets</span>
              </h1>
              <p className="text-lead mb-8 max-w-2xl mx-auto">
                Every button click—<strong className="text-text-primary">Interested, Not Interested, Learn More</strong>—is
                automatically captured and pushed to your Google Sheets in real-time. No manual exports, no delays.
              </p>

              <CTAGroup align="center" className="mb-8 justify-center">
                <PrimaryCTA href="https://chat.whats91.com">Start Free Trial</PrimaryCTA>
                <ContactCard
                  variant="popup"
                  trigger={
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                    Talk to Integration Expert
                  </button>
                  }
                />
              </CTAGroup>

              <div className="flex flex-wrap justify-center gap-2.5">
                <TrustPill>Real-Time Sync</TrustPill>
                <TrustPill>No Code Setup</TrustPill>
                <TrustPill>Unlimited Responses</TrustPill>
              </div>
            </div>
          </Container>
        </Section>

        {/* Features */}
        <Section tone="surface">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="surface-card p-6">
                  <IconBadge icon={feature.icon} size="lg" className="mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* How It Works */}
        <Section aria-labelledby="how-heading">
          <Container>
            <SectionHeader
              eyebrow="Integration Flow"
              eyebrowIcon={Layers}
              id="how-heading"
              title="How Campaign Responses Flow to Google Sheets"
              description="A simple 6-step process from campaign creation to automated data sync"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="surface-card surface-card-hover relative p-5">
                  <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md">
                    {item.step}
                  </div>
                  <div className="flex items-start gap-4">
                    <IconBadge icon={item.icon} className="shrink-0" />
                    <div>
                      <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Button Reply Examples */}
        <Section tone="surface" aria-labelledby="buttons-heading">
          <Container>
            <SectionHeader
              eyebrow="Button Response Types"
              eyebrowIcon={MessageCircle}
              id="buttons-heading"
              title="Every Button Click is Captured"
              description="Here's how different button responses are logged and what data is captured for each interaction"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {buttonReplyExamples.map((example) => (
                <div key={example.button} className="surface-card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${toneClasses[example.tone]}`}>
                      <example.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${toneClasses[example.tone]}`}>
                          {example.button}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{example.description}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-surface/50 rounded-xl">
                    <p className="text-xs font-medium text-text-muted uppercase mb-2">Data Logged</p>
                    <div className="flex flex-wrap gap-2">
                      {example.dataLogged.map((data) => (
                        <Badge key={data} variant="outline" className="text-xs">{data}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Sample Spreadsheet View */}
        <Section aria-labelledby="preview-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Live Preview"
              eyebrowIcon={FileSpreadsheet}
              id="preview-heading"
              title="See How Data Appears in Google Sheets"
              description="Responses are automatically formatted and organized in your connected spreadsheet"
            />
            <div className="surface-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-success-soft border-b border-success-border">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <FileSpreadsheet className="h-4 w-4 text-success" aria-hidden="true" />
                  <span className="text-sm font-medium text-success">Campaign_Responses_Jan2024.xlsx</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-3 text-xs font-semibold text-text-muted uppercase border-b border-border/60">Phone Number</th>
                      <th className="text-left p-3 text-xs font-semibold text-text-muted uppercase border-b border-border/60">Timestamp</th>
                      <th className="text-left p-3 text-xs font-semibold text-text-muted uppercase border-b border-border/60">Button Clicked</th>
                      <th className="text-left p-3 text-xs font-semibold text-text-muted uppercase border-b border-border/60">Campaign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleSheetData.map((row, i) => (
                      <tr key={`${row.phone}-${i}`} className="border-b border-border/40 hover:bg-surface/30">
                        <td className="p-3 text-sm text-text-primary font-mono">{row.phone}</td>
                        <td className="p-3 text-sm text-text-secondary font-mono">{row.timestamp}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${toneClasses[sampleButtonTone[row.button]]}`}>
                            {row.button}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-text-secondary">{row.campaign}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <RefreshCw className="h-3 w-3 text-success animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  <span>Auto-syncing</span>
                </div>
                <div className="text-xs text-text-muted">5 responses • Last updated: Just now</div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Data Fields Reference */}
        <Section tone="surface" aria-labelledby="fields-heading">
          <Container size="narrow">
            <SectionHeader
              id="fields-heading"
              title="Complete Data Fields Reference"
              description="Every response includes these fields, fully customizable for your integration needs"
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Field Name</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Description</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Example Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFields.map((field) => (
                      <tr key={field.field} className="border-t border-border/60">
                        <td className="p-4 text-sm font-mono text-brand-primary">{field.field}</td>
                        <td className="p-4 text-sm text-text-secondary">{field.description}</td>
                        <td className="p-4 text-sm text-text-muted font-mono">{field.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section aria-labelledby="usecases-heading">
          <Container>
            <SectionHeader
              id="usecases-heading"
              title="Popular Use Cases"
              description="See how businesses use this integration to automate their workflows"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="surface-card p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={useCase.icon} size="lg" className="shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{useCase.title}</h3>
                      <p className="text-sm text-text-secondary mb-3">{useCase.description}</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-soft text-success text-xs font-medium">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                        {useCase.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <h2 className="heading-2 !text-white mb-4">Automate Your Campaign Response Tracking</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Start capturing every button click in Google Sheets automatically. No code, no complexity.
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
