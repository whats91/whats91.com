import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  generateSoftwareApplicationSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleSlash,
  ClipboardCheck,
  Database,
  Eye,
  FileText,
  GitBranch,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  MessageSquareText,
  MousePointerClick,
  RefreshCw,
  Route,
  Save,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  TerminalSquare,
  UserRoundCheck,
  Workflow,
  Zap,
} from "lucide-react";

import { setupScope, sceneCaption } from "@/lib/product-media";

const pagePath = "/features/chat-shortcuts-conversation-automation";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Chat Shortcuts, Ice Breakers & Slash Commands | Whats91";
const seoDescription =
  "Use WhatsApp Ice Breakers and Slash Commands to start chatbots, Flow Builder, ERP, support, sales, demo, and order tracking automations.";
const openGraphTitle = "WhatsApp Chat Shortcuts for Ice Breakers, Slash Commands and Automation";
const openGraphDescription =
  "Learn how Whats91 Chat Shortcuts turn WhatsApp Ice Breakers and Slash Commands into chatbot, Flow Builder, ERP, CRM, support, sales, and order tracking workflows.";
const twitterTitle = "WhatsApp Chat Shortcuts, Ice Breakers & Slash Commands";
const twitterDescription =
  "Configure WhatsApp quick-start prompts and slash commands, then route them into chatbots, Flow Builder, ERP, CRM, support, sales, and order automation.";

const baseMetadata = generatePageMetadata({
  title: seoTitle,
  description: seoDescription,
  keywords: [
    "WhatsApp conversation automation",
    "WhatsApp ice breakers",
    "WhatsApp slash commands",
    "WhatsApp chatbot shortcuts",
    "WhatsApp Business Platform automation",
    "WhatsApp Cloud API automation",
    "WhatsApp Flow Builder integration",
    "WhatsApp chatbot for ERP",
    "WhatsApp customer support automation",
    "WhatsApp order tracking automation",
    "WhatsApp accounting automation",
  ],
  path: pagePath,
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: openGraphTitle,
    description: openGraphDescription,
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Whats91 brand and messaging graphic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: twitterTitle,
    description: twitterDescription,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
};

const trustChips = [
  "Ice breakers",
  "Slash commands",
  "Per-number setup",
  "Flow Builder routing",
];

const flowSteps = [
  {
    icon: LayoutDashboard,
    title: "Configure in Whats91",
    description: "Add customer-ready prompts and slash commands for the selected WhatsApp number.",
  },
  {
    icon: Send,
    title: "Push to Meta",
    description: "Publish the shortcut configuration so customers see it directly inside WhatsApp.",
  },
  {
    icon: MousePointerClick,
    title: "Customer taps or types",
    description: "A tap on an ice breaker or a slash command arrives as normal incoming text.",
  },
  {
    icon: Route,
    title: "Route automation",
    description: "Whats91 matches the text and sends it into chatbots, flows, ERP logic, or human handoff.",
  },
];

const featureCards = [
  {
    icon: MessageSquareText,
    title: "Ice Breakers",
    description: "Show quick prompts such as Track my order, Talk to support, or View ledger balance inside WhatsApp.",
  },
  {
    icon: TerminalSquare,
    title: "Slash Commands",
    description: "Offer command-style actions like /ledger, /orders, /support, and /demo for repeat workflows.",
  },
  {
    icon: Smartphone,
    title: "Per-Number Configuration",
    description: "Configure different shortcuts for support, sales, accounts, or dispatch WhatsApp numbers.",
  },
  {
    icon: RefreshCw,
    title: "Pull from Meta",
    description: "Fetch existing conversational automation settings and bring them into Whats91 before editing.",
  },
  {
    icon: Save,
    title: "Save Draft",
    description: "Prepare prompts and commands locally before publishing changes to WhatsApp.",
  },
  {
    icon: Send,
    title: "Push to Meta",
    description: "Publish the approved shortcut set when the business is ready to go live.",
  },
  {
    icon: CircleSlash,
    title: "Clear on Meta",
    description: "Remove live shortcuts from WhatsApp while keeping the automation strategy cleanly managed.",
  },
  {
    icon: Eye,
    title: "WhatsApp Preview",
    description: "Preview how prompts and commands will look to customers before publishing.",
  },
  {
    icon: ClipboardCheck,
    title: "Validation",
    description: "Prevent duplicate prompts, emoji usage, and command values that do not follow the confirmed configuration limits.",
  },
  {
    icon: Sparkles,
    title: "Business Presets",
    description: "Start from support, sales, and accounts presets, then customize the wording for your business.",
  },
];

const useCases = [
  {
    icon: Headphones,
    title: "Support Automation",
    description: "Help customers begin service conversations without typing long messages.",
    prompts: ["Talk to support", "Track my ticket", "Check service status", "Request callback"],
    commands: ["/support", "/ticket", "/callback"],
  },
  {
    icon: Database,
    title: "Accounting and ERP Automation",
    description: "Turn ledger, invoice, and pending bill requests into connected business workflows.",
    prompts: ["View ledger balance", "Request invoice", "Check pending bills", "Share payment reminder"],
    commands: ["/ledger", "/invoice", "/pending"],
  },
  {
    icon: Store,
    title: "Order and Delivery Tracking",
    description: "Let buyers check order status, delivery progress, and dispatch details quickly.",
    prompts: ["Track my order", "View recent orders", "Cancel an order", "Talk to dispatch"],
    commands: ["/orders", "/track", "/delivery"],
  },
  {
    icon: UserRoundCheck,
    title: "Sales and Lead Capture",
    description: "Guide prospects into catalog, demo, offer, and sales conversations with fewer steps.",
    prompts: ["View latest offers", "Talk to sales", "Request product catalog", "Book a demo"],
    commands: ["/sales", "/catalog", "/demo"],
  },
];

const comparisonRows = [
  { feature: "Visible in WhatsApp", shortcuts: "Yes. Prompts and commands appear inside WhatsApp.", chatbots: "No. The bot logic runs after a message is received." },
  { feature: "Starts Workflow", shortcuts: "Yes. A tap or command can start a route.", chatbots: "Yes. A bot can reply after matching a trigger." },
  { feature: "Requires AI", shortcuts: "No. Chat Shortcuts are deterministic conversation starters.", chatbots: "Optional. Chatbots can be rule-based or AI-assisted." },
  { feature: "Works with Flow Builder", shortcuts: "Yes. Shortcut text can become a Flow Builder trigger.", chatbots: "Yes. Chatbot steps can hand off to flows." },
  { feature: "Works with ERP", shortcuts: "Yes. Commands can route to ERP workflows.", chatbots: "Yes. Bots can query ERP data after trigger matching." },
  { feature: "Customer Friendly", shortcuts: "Very high. Customers tap instead of typing.", chatbots: "High when bot menus and replies are clear." },
  { feature: "Support Friendly", shortcuts: "High. Common intents are visible before the first message.", chatbots: "High. Support logic can answer and escalate." },
];

const deepUseCases = [
  {
    title: "Customer Support Automation",
    content:
      "Customer support automation is one of the clearest uses for WhatsApp Chat Shortcuts because support conversations often begin with repeated intents. A customer usually wants to talk to support, track a ticket, request a callback, check service status, or share a complaint. Without shortcuts, the customer has to type a message and wait for the business to understand the intent. With Chat Shortcuts, the customer can tap a visible option such as Talk to Support or type /support, and Whats91 receives that text as a clean automation trigger. The trigger can open a support bot, show a menu, collect an order number, route to a department, or create a human handoff. This makes the first step faster and more predictable. For businesses already using the Whats91 Chatbot Flow Library, shortcut text can map directly to support flows, escalation flows, callback flows, and ticket-status flows. It also improves reporting because the first message already identifies the support category. Teams can measure how many users choose support, callback, ticket, or service-status paths and improve staffing around real demand. The customer receives a guided entry point, while the support team receives a cleaner queue with fewer vague messages and fewer manual clarification steps.",
  },
  {
    title: "Order Tracking Automation",
    content:
      "Order tracking automation works well with WhatsApp Chat Shortcuts because the customer intent is short, frequent, and time-sensitive. A buyer does not want to search for a tracking page or explain the whole issue. They want to tap Track My Order or type /orders and receive the next useful step immediately. Whats91 can route that incoming text into a Flow Builder journey that asks for an order ID, reads order status from an ecommerce system, checks dispatch data, or sends a delivery update. For teams using Google Sheets as an operations layer, the same trigger can be connected to a Google Sheets response workflow for lightweight order lookup. The benefit is not only faster response time; it also reduces repetitive support volume and gives customers a consistent path for order history, cancellation requests, dispatch questions, and delivery exceptions. A shortcut can also separate routine tracking from urgent delivery problems. For example, Track My Order can return status automatically, while Talk to Dispatch can hand the case to an agent. This keeps automation useful without hiding human help when the customer needs intervention. It also gives operations teams a consistent phrase to monitor when customers ask about fulfillment, failed delivery, or delayed shipments.",
  },
  {
    title: "ERP Automation",
    content:
      "ERP automation becomes easier when the starting intent is structured. In many businesses, WhatsApp is already the communication layer for invoices, ledgers, challans, dispatch updates, payment reminders, and order documents. Chat Shortcuts create a clean entry point into those ERP workflows. A customer can type /ledger, /invoice, or /pending, and Whats91 can route the command to the right automation path. For Busy users, this can connect naturally with Busy ERP WhatsApp workflows for balances, invoices, statements, and reports. For Miracle users, the same concept aligns with Miracle WhatsApp API document delivery, where business documents and reminders are sent through WhatsApp templates. Chat Shortcuts do not replace ERP integration; they make the first customer request easier to detect, classify, and route before the ERP workflow runs. This is important because ERP requests often need strict mapping. A command can decide whether the workflow needs a party account, invoice number, date range, transport document, or payment reference. Once that first branch is clear, the automation can ask only the required follow-up questions and avoid long menus. This improves accuracy for teams that manage multiple companies, branches, phone numbers, or document types in the same WhatsApp environment. It also reduces manual classification work.",
  },
  {
    title: "Accounting Automation",
    content:
      "Accounting automation benefits from Chat Shortcuts because account-related requests are repetitive and easy to misroute when typed freely. Customers ask for invoice copies, ledger balances, pending bills, payment receipts, due dates, account statements, and payment reminders. A visible prompt such as Request Invoice or View Ledger Balance reduces ambiguity. A slash command such as /ledger gives returning customers a faster path. Whats91 can match the prompt or command and start the correct accounting workflow. That workflow may ask for confirmation, fetch a ledger summary, send an approved WhatsApp template, or hand the request to accounts staff when manual review is needed. The result is a clearer customer journey and a lower support burden for the accounting team, especially in B2B businesses where the same parties ask for the same documents every week. Shortcuts also help enforce consistent wording for finance workflows. Instead of asking staff to interpret many versions of the same request, the business can publish a small set of approved entry points. This improves auditability, template alignment, and customer confidence because the account path is visible before the conversation begins. It also makes recurring requests easier to train because customers learn the same prompt or command for every future account query.",
  },
  {
    title: "Lead Generation",
    content:
      "Lead generation workflows often fail because the first customer action is unclear. A prospect may send Hi, Price, Details, or a product name, and the team has to infer intent. WhatsApp Chat Shortcuts solve this by exposing direct conversation starters such as View Latest Offers, Request Product Catalog, Talk to Sales, or Book Demo. These prompts make the next step obvious and help Whats91 route the customer into the right lead capture journey. A Flow Builder sequence can collect name, location, product interest, budget, timeline, and preferred callback time. The same journey can tag the contact, send a catalog link, notify a sales agent, or push the lead into a CRM system. For campaigns that use WhatsApp templates, shortcuts also give customers a cleaner post-click path after they respond to marketing or utility messages. For the business, every shortcut becomes a measurable intent source. Teams can compare demo requests, catalog requests, sales chats, and offer clicks without relying only on manual notes. This makes WhatsApp lead quality easier to analyze after campaigns, website visits, and referral conversations.",
  },
  {
    title: "Sales Automation",
    content:
      "Sales automation needs speed and context. When a prospect opens WhatsApp, the business should make the most important next actions visible immediately. Chat Shortcuts can show options such as Talk to Sales, View Offers, Request Catalog, and Book Demo. A slash command such as /sales can also serve repeat customers or sales agents who know the action they want. Whats91 can route these triggers into a sales qualification flow, a product selector, a price-list request, or a human sales handoff. If the business also uses WhatsApp Business Calling, a shortcut can guide the customer from chat into a call request or callback workflow. This keeps the lead inside WhatsApp, shortens response time, and gives sales teams a structured way to prioritize high-intent contacts instead of manually reading every opening message. Sales managers can also use shortcut data to understand which offers or product paths generate the most demand. Because the initial action is explicit, the team can separate casual inquiries from buyers who ask for pricing, catalog details, or demos. That makes follow-up more focused and less dependent on guesswork. A stable sales shortcut can also be reused across website CTAs, template replies, catalog campaigns, and agent handoff flows.",
  },
  {
    title: "Demo Booking",
    content:
      "Demo booking is a strong fit for Chat Shortcuts because it is a high-intent action that should not be buried in a long menu. A visible Book Demo prompt or /demo command can start a focused booking workflow. Whats91 can ask for the customer name, company, phone number, product interest, preferred time, and location. The workflow can then notify the sales team, create a CRM entry, or send a confirmation message. For product pages, solution pages, and template-driven campaigns, this creates a direct path from interest to scheduled action. For visitors evaluating WhatsApp Conversational Automation, demo booking is a simple example of a shortcut becoming a conversion event. The workflow can remain simple or become advanced over time. A first version may notify a salesperson. Scheduling requires a separately configured availability and confirmation workflow; a demo request alone does not reserve an appointment. The shortcut stays the same while the automation behind it matures. This keeps the public WhatsApp entry point consistent even when the internal sales process changes.",
  },
];

const dashboardSections = [
  "Selected number summary",
  "Sync status",
  "Ice breakers editor",
  "Slash commands editor",
  "WhatsApp preview",
  "Business presets",
  "Usage drawer",
  "Clear confirmation modal",
];

const rules = [
  { item: "Ice breakers", limit: "Maximum 4 prompts", note: "Use customer-ready phrases that are easy to tap." },
  { item: "Prompt length", limit: "Maximum 80 characters", note: "Keep prompts short, direct, and action-oriented." },
  { item: "Slash commands", limit: "Maximum 30 commands", note: "Use commands for frequent business actions." },
  { item: "Command name", limit: "Maximum 32 characters", note: "Whats91 stores names without the / prefix." },
  { item: "Command description", limit: "Maximum 256 characters", note: "Explain what the command does in plain language." },
  { item: "Emojis", limit: "Rejected", note: "Keep prompts and command fields text-only in this example; confirm provider requirements." },
  { item: "Duplicates", limit: "Rejected", note: "Prompt text and command names must be unique." },
];

const routingExamples = [
  {
    title: "Ice breaker tap",
    payload: '{ "text": { "body": "Track my order" } }',
    result: "Flow Builder can match Track my order and start the order-status workflow.",
  },
  {
    title: "Slash command",
    payload: '{ "text": { "body": "/ledger customer ABC" } }',
    result: "A chatbot or ERP handler can detect /ledger and return account balance or statement details.",
  },
];

const securityNotes = [
  "Chat Shortcuts is separate from AI MetaBot and does not require an AI runtime.",
  "Meta displays the prompts and commands; Whats91 handles the real automation after webhook text arrives.",
  "The feature does not use WABA Bot ID APIs.",
  "Keep access tokens private when configuring integrations; do not include them in customer prompts or replies.",
  "Shortcut configuration is scoped to the selected WhatsApp phone number.",
];

const faqs = [
  {
    question: "What are WhatsApp Chat Shortcuts?",
    answer:
      "WhatsApp Chat Shortcuts are quick conversation options shown in WhatsApp. They include ice breakers customers can tap and slash commands customers can type to start common business workflows faster.",
  },
  {
    question: "Does Meta run the chatbot?",
    answer:
      "No. Meta only displays the prompts and commands. Whats91 receives the selected text through webhooks and runs the automation through Chatbots, Flow Builder, custom business workflows, or human handoff rules.",
  },
  {
    question: "Can each WhatsApp number have different shortcuts?",
    answer:
      "Yes. Whats91 configures Chat Shortcuts per selected WhatsApp phone number setup, so support, sales, accounts, and dispatch numbers can each have different prompts and commands.",
  },
  {
    question: "Can I sync existing shortcuts from Meta?",
    answer:
      "Yes. Whats91 can pull the current conversational automation configuration from Meta so your team can review and manage it inside the dashboard.",
  },
  {
    question: "Can I save changes before publishing to Meta?",
    answer:
      "Yes. Save Draft stores the prompt and command configuration locally, while Push to Meta publishes the current set when you are ready.",
  },
  {
    question: "How do I remove shortcuts from WhatsApp?",
    answer:
      "Use Clear on Meta. Whats91 clears the live Meta configuration by publishing empty prompts and commands arrays.",
  },
  {
    question: "Do Chat Shortcuts work with Whats91 Flow Builder?",
    answer:
      "Yes. Tapped prompts and slash commands arrive as normal incoming text messages, so Flow Builder can use them as triggers in automation journeys.",
  },
  {
    question: "Do Chat Shortcuts work with Whats91 Chatbots?",
    answer:
      "Yes. Existing deterministic Chatbots can match prompt text or slash commands and reply automatically.",
  },
  {
    question: "Can WhatsApp Chat Shortcuts start a chatbot?",
    answer:
      "Yes. WhatsApp Chat Shortcuts can start a chatbot when the prompt text or slash command is matched as an incoming message trigger. Meta displays the shortcut, and Whats91 receives the selected text through the webhook so a chatbot can reply or continue the workflow.",
  },
  {
    question: "Can WhatsApp Slash Commands trigger ERP workflows?",
    answer:
      "Yes. WhatsApp Slash Commands such as /ledger, /invoice, or /orders can trigger ERP workflows when Whats91 matches the command text and routes it to a configured Busy ERP, Miracle, custom API, or business automation flow.",
  },
  {
    question: "Can WhatsApp Ice Breakers be configured per phone number?",
    answer:
      "Yes. WhatsApp Ice Breakers are configured for the selected WhatsApp business phone number. This means a support number, sales number, accounts number, and dispatch number can each use different quick-start prompts.",
  },
  {
    question: "Are WhatsApp Chat Shortcuts available in WhatsApp Cloud API?",
    answer:
      "Yes. WhatsApp Chat Shortcuts use Meta WhatsApp conversational automation components for business phone numbers. Whats91 manages the setup and routing for businesses using WhatsApp Cloud API workflows.",
  },
  {
    question: "Can WhatsApp Flow Builder use Chat Shortcuts as triggers?",
    answer:
      "Yes. WhatsApp Flow Builder can use Chat Shortcuts as triggers because an ice breaker tap or slash command arrives as normal incoming text. A flow can match that text and continue with questions, API calls, ERP lookups, tags, or handoff steps.",
  },
  {
    question: "Do WhatsApp Chat Shortcuts require AI?",
    answer:
      "No. WhatsApp Chat Shortcuts do not require AI. They are deterministic conversation starters. AI can be added later inside a chatbot or flow, but the shortcut itself works without an AI runtime.",
  },
  {
    question: "How many Ice Breakers does WhatsApp allow?",
    answer:
      "The existing example uses up to 4 prompts. Confirm the current provider and account limits before configuring your number.",
  },
  {
    question: "How many Slash Commands can WhatsApp support?",
    answer:
      "The existing example uses up to 30 commands. Confirm the current provider and account limits before configuring your number. Review command names, descriptions, duplicate values and formatting against the confirmed setup.",
  },
  {
    question: "Can WhatsApp Chat Shortcuts work with CRM systems?",
    answer:
      "Yes. WhatsApp Chat Shortcuts can work with CRM systems when Whats91 routes the incoming prompt or command into a Flow Builder action, webhook, custom API, or lead capture workflow that updates the CRM.",
  },
  {
    question: "Can WhatsApp Chat Shortcuts automate order tracking?",
    answer:
      "Yes. A prompt such as Track My Order or a command such as /orders can start an order tracking workflow. Whats91 can collect an order ID, query a system, send a status update, or route the conversation to support.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${pageUrl}#how-to-configure-whatsapp-chat-shortcuts`,
  name: "How to Configure WhatsApp Chat Shortcuts",
  description:
    "Configure WhatsApp Chat Shortcuts in Whats91 by adding prompts and commands, saving a draft, publishing to Meta, receiving incoming text, and routing the workflow.",
  tool: [
    {
      "@type": "HowToTool",
      name: "Whats91 Chat Shortcuts",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Configure shortcuts",
      text: "Add WhatsApp Ice Breakers and Slash Commands for the selected WhatsApp business phone number in Whats91.",
      url: `${pageUrl}#how-it-works`,
    },
    {
      "@type": "HowToStep",
      name: "Save draft",
      text: "Save the shortcut configuration as a local draft so the team can review prompt text, command names, and descriptions before publishing.",
      url: `${pageUrl}#how-it-works`,
    },
    {
      "@type": "HowToStep",
      name: "Push to Meta",
      text: "Publish the approved prompts and commands to Meta so they appear inside WhatsApp for the selected business phone number.",
      url: `${pageUrl}#how-it-works`,
    },
    {
      "@type": "HowToStep",
      name: "Receive incoming text",
      text: "When a customer taps an ice breaker or sends a slash command, Whats91 receives the selected value as a normal incoming WhatsApp text message.",
      url: `${pageUrl}#routing-heading`,
    },
    {
      "@type": "HowToStep",
      name: "Route workflow",
      text: "Match the incoming prompt or command and route it into Chatbots, Flow Builder, ERP automation, CRM updates, order tracking, or human handoff.",
      url: `${pageUrl}#routing-heading`,
    },
  ],
};

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Chat Shortcuts and Conversation Automation", url: pagePath },
  ]),
  generateFAQSchema(faqs),
  generateServiceSchema({
    name: "Whats91 Chat Shortcuts and Conversation Automation",
    description:
      "Configure WhatsApp ice breakers and slash commands, then route customer selections into Whats91 chatbots, Flow Builder, ERP workflows, and support automation.",
    url: pageUrl,
  }),
  generateSoftwareApplicationSchema({
    name: "Whats91 Chat Shortcuts",
    description:
      "WhatsApp conversational automation feature for configuring ice breakers, slash commands, live WhatsApp previews, and webhook-based routing into business automation.",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  }),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "WhatsApp Chat Shortcuts and Conversation Automation for Businesses",
    description:
      "Learn how Whats91 lets businesses configure WhatsApp ice breakers and slash commands, then route customer taps into automation workflows.",
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: [
      "WhatsApp conversation automation",
      "WhatsApp ice breakers",
      "WhatsApp slash commands",
      "WhatsApp chatbot shortcuts",
      "WhatsApp conversational automation",
      "WhatsApp Business Automation",
    ],
    mentions: [
      {
        "@type": "SoftwareApplication",
        name: "Whats91 Flow Builder",
        url: `${siteConfig.url}/flow-builder`,
      },
      {
        "@type": "Service",
        name: "Busy ERP WhatsApp Integration",
        url: `${siteConfig.url}/solutions/busy-erp`,
      },
      {
        "@type": "Service",
        name: "Miracle WhatsApp API",
        url: `${siteConfig.url}/solutions/miracle-whatsapp-api`,
      },
      {
        "@type": "WebPage",
        name: "WhatsApp Templates",
        url: `${siteConfig.url}/whatsapp-templates`,
      },
    ],
  },
  howToSchema,
];

function ChatShortcutsPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]" aria-label="WhatsApp chat shortcuts preview">
      <div className="absolute -inset-4 rounded-[2rem] bg-brand-primary/10 blur-2xl" aria-hidden="true" />
      <div className="relative grid gap-4 rounded-3xl border border-border/70 bg-card p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
        <div className="rounded-2xl border border-border/70 bg-surface/70 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Illustrative dashboard</p>
              <h2 className="text-lg font-semibold text-text-primary">Chat Shortcuts</h2>
            </div>
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
              Sample
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-card p-3">
              <p className="mb-2 text-xs font-semibold text-text-muted">Ice breakers</p>
              {["Track my order", "Talk to support", "View ledger"].map((prompt) => (
                <div key={prompt} className="mb-2 rounded-lg bg-brand-primary/10 px-3 py-2 text-sm font-medium text-text-primary last:mb-0">
                  {prompt}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-3">
              <p className="mb-2 text-xs font-semibold text-text-muted">Slash commands</p>
              {["/ledger", "/orders", "/support"].map((command) => (
                <div key={command} className="mb-2 flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm last:mb-0">
                  <code className="font-mono font-semibold text-brand-primary">{command}</code>
                  <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-[#eef7f2] p-3 shadow-lg">
          <div className="rounded-[1.35rem] bg-card">
            <div className="flex items-center gap-3 rounded-t-[1.35rem] bg-brand-primary px-4 py-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Whats91 Business</p>
                <p className="text-xs text-white">Online</p>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-surface px-3 py-2 text-sm text-text-primary">
                Welcome. Choose an option to continue.
              </div>
              <div className="flex flex-wrap gap-2">
                {["Track my order", "Talk to support", "View ledger"].map((prompt) => (
                  <span key={prompt} className="rounded-full border border-brand-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-brand-primary">
                    {prompt}
                  </span>
                ))}
              </div>
              <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand-primary px-3 py-2 text-sm text-white">
                /ledger customer ABC
              </div>
              <div className="max-w-[84%] rounded-2xl rounded-tl-sm bg-surface px-3 py-2 text-sm text-text-primary">
                Opening your ledger workflow now.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">{description}</p>
    </div>
  );
}

export default function ChatShortcutsConversationAutomationPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <article>
          <header className="relative overflow-hidden bg-gradient-to-b from-surface/80 to-background py-12 sm:py-16 md:py-20">
            <div className="absolute inset-0 gradient-brand-subtle" aria-hidden="true" />
            <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-12 lg:px-8">
              <div className="text-center lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-sm">
                  <Zap className="h-3.5 w-3.5" />
                  WhatsApp conversational automation
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                  WhatsApp Chat Shortcuts and Conversation Automation for Businesses
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0">
                  Configure WhatsApp ice breakers and slash commands directly from Whats91. Customers tap a prompt or type a command, and Whats91 routes that text into chatbots, Flow Builder, support, sales, order tracking, or ERP workflows.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{setupScope}</p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button asChild className="h-11 bg-brand-primary px-6 text-white hover:bg-brand-primary-hover">
                    <Link href="/contact">
                      Request a demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 border-border bg-card px-6 text-text-primary hover:bg-surface">
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {trustChips.map((chip) => (
                    <span key={chip} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-sm">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <figure className="min-w-0">
                <ChatShortcutsPreview />
                <figcaption className="mt-3 text-sm leading-relaxed text-text-secondary">{sceneCaption}</figcaption>
              </figure>
            </div>
          </header>

          <section className="border-y border-border/50 bg-surface/50 py-10 sm:py-12" aria-labelledby="direct-answer-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Direct answer</p>
                <h2 id="direct-answer-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  What are Whats91 Chat Shortcuts?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                  Whats91 Chat Shortcuts are Meta WhatsApp conversational components for business phone numbers. Meta shows ice breakers and slash commands inside WhatsApp, while Whats91 receives the selected text through normal webhooks and runs the actual automation through Chatbots, Flow Builder, ERP logic, custom workflows, or human handoff.
                </p>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-14 sm:py-16 md:py-20" aria-labelledby="how-it-works-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="how-it-works-heading"
                eyebrow="How it works"
                title="From shortcut tap to business automation"
                description="The visitor sees a simple WhatsApp option, while Whats91 handles the routing and workflow logic behind the scenes."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {flowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-text-muted">0{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="features-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="features-heading"
                eyebrow="Feature set"
                title="Everything needed to manage WhatsApp shortcuts"
                description="Review the selected number, prompts and routing before publishing a configuration."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {featureCards.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-text-primary">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="use-cases-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="use-cases-heading"
                eyebrow="Use cases"
                title="Shortcut examples for real business workflows"
                description="Use prompts for tap-first journeys and commands for repeat users who know exactly what they need."
              />
              <div className="grid gap-5 md:grid-cols-2">
                {useCases.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary">{item.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Prompts</p>
                          <div className="flex flex-wrap gap-2">
                            {item.prompts.map((prompt) => (
                              <span key={prompt} className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                                {prompt}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Commands</p>
                          <div className="flex flex-wrap gap-2">
                            {item.commands.map((command) => (
                              <code key={command} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary">
                                {command}
                              </code>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="dashboard-heading">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Dashboard walkthrough</p>
                <h2 id="dashboard-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                  Manage drafts, live sync, and WhatsApp preview in one place
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  The Whats91 dashboard keeps shortcut setup understandable for operations teams. They can select the phone number, edit prompts and commands, save local drafts, publish to Meta, and inspect how the shortcuts will look inside WhatsApp.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dashboardSections.map((section) => (
                    <div key={section} className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm font-semibold text-text-primary">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      {section}
                    </div>
                  ))}
                </div>
              </div>
              <figure className="min-w-0 rounded-3xl border border-border/70 bg-card p-4 shadow-xl shadow-slate-900/10 sm:p-5">
                <div className="rounded-2xl border border-border/70 bg-surface/70 p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-text-muted">Selected WhatsApp number</p>
                      <p className="text-lg font-bold text-text-primary">Example support number</p>
                    </div>
                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">Draft saved</span>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl bg-card p-4 shadow-sm">
                      <p className="mb-3 text-sm font-semibold text-text-primary">Prompt editor</p>
                      {["Track my order", "Talk to support", "Request callback", "View ledger balance"].map((prompt, index) => (
                        <div key={prompt} className="mb-2 flex items-center justify-between rounded-lg border border-border/70 px-3 py-2 last:mb-0">
                          <span className="text-sm text-text-primary">{prompt}</span>
                          <span className="text-xs text-text-muted">{prompt.length}/80</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-card p-4 shadow-sm">
                      <p className="mb-3 text-sm font-semibold text-text-primary">Command editor</p>
                      {[
                        ["/ledger", "View ledger balance"],
                        ["/orders", "View order history"],
                        ["/support", "Talk to support"],
                      ].map(([command, description]) => (
                        <div key={command} className="mb-2 rounded-lg border border-border/70 px-3 py-2 last:mb-0">
                          <code className="text-sm font-semibold text-brand-primary">{command}</code>
                          <p className="text-xs text-text-secondary">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Pull from Meta", "Save Draft", "Push to Meta", "Clear on Meta"].map((action) => (
                      <span key={action} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-text-secondary">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <figcaption className="mt-3 text-sm leading-relaxed text-text-secondary">{sceneCaption}</figcaption>
              </figure>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="rules-heading">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="rules-heading"
                eyebrow="Setup example"
                title="Existing setup values to confirm"
                description="These are values in the existing setup example, not confirmed current provider limits or account entitlements. Confirm the supported limits and enabled configuration before use."
              />
              <div className="grid gap-3 md:hidden">
                {rules.map((rule) => (
                  <div key={rule.item} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-text-primary">{rule.item}</h3>
                      <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                        {rule.limit}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{rule.note}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm md:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead className="bg-surface">
                      <tr>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">Item</th>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">Rule</th>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">Whats91 guidance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/70">
                      {rules.map((rule) => (
                        <tr key={rule.item}>
                          <td className="px-5 py-4 text-sm font-semibold text-text-primary">{rule.item}</td>
                          <td className="px-5 py-4 text-sm text-text-secondary">{rule.limit}</td>
                          <td className="px-5 py-4 text-sm text-text-secondary">{rule.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="routing-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="routing-heading"
                eyebrow="Automation routing"
                title="Shortcuts arrive as normal WhatsApp text"
                description="That simple webhook behavior is what makes Chat Shortcuts work naturally with existing Whats91 Chatbots and Flow Builder triggers."
              />
              <div className="grid gap-5 lg:grid-cols-2">
                {routingExamples.map((example) => (
                  <div key={example.title} className="min-w-0 rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <GitBranch className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">{example.title}</h3>
                    </div>
                    <pre tabIndex={0} role="region" aria-label="Example webhook text" className="max-w-full overflow-x-auto rounded-xl bg-ink-elevated p-4 text-xs leading-relaxed text-ink-text">
                      <code>{example.payload}</code>
                    </pre>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">{example.result}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Chatbots", icon: Bot },
                  { label: "Flow Builder", icon: Workflow },
                  { label: "ERP handlers", icon: Database },
                  { label: "Human handoff", icon: UserRoundCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 text-sm font-semibold text-text-primary">
                    <Icon className="h-5 w-5 text-brand-primary" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="security-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 sm:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 id="security-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Security and product scope
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  Chat Shortcuts is a focused conversational automation feature. It gives businesses Meta conversational components without mixing the setup with AI bot identity or unsafe token exposure.
                </p>
                <div className="mt-6 grid gap-3">
                  {securityNotes.map((note) => (
                    <div key={note} className="flex items-start gap-3 rounded-xl bg-card px-4 py-3 text-sm text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="ice-breakers-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Conversation starters</p>
                <h2 id="ice-breakers-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                  What are WhatsApp Ice Breakers?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-text-secondary">
                  <p>
                    WhatsApp Ice Breakers are quick-start prompts that Meta can display inside a WhatsApp conversation with a business phone number. They are also commonly described as WhatsApp Quick Start Prompts or WhatsApp Conversation Starters because they help the customer begin a conversation without deciding what to type first. Instead of opening a blank chat window, the customer sees a small set of suggested actions such as Track My Order, Talk to Support, Request Invoice, or Book Demo. When the customer taps one of those options, WhatsApp sends the prompt text as a normal incoming message.
                  </p>
                  <p>
                    Meta displays WhatsApp Ice Breakers as visible prompt options in the WhatsApp user interface for eligible business phone numbers. The display layer belongs to Meta, but the automation layer belongs to the business platform that receives the webhook. Whats91 uses that distinction clearly: Meta shows the prompt, and Whats91 routes the selected prompt into WhatsApp Business Automation. This means a prompt like Track My Order can trigger an order-status flow, Talk to Support can start a support chatbot, Request Invoice can move into an accounting workflow, and Book Demo can send the customer into a lead capture or demo scheduling flow.
                  </p>
                  <p>
                    For businesses, the main benefit is cleaner intent detection. A free-form message such as “hi” or “need help” requires classification before automation can continue. A tapped prompt already carries the customer intent in plain text. That makes routing more reliable for <Link href="/flow-builder" className="font-semibold text-brand-primary hover:underline">Flow Builder workflows</Link>, deterministic chatbots, CRM updates, ERP lookups, and support handoff. Ice Breakers also help teams standardize the most important first actions across support, sales, accounts, dispatch, and service departments.
                  </p>
                  <p>
                    For customers, the experience is faster and easier. The customer does not need to remember a command, search for a menu, or explain a basic request. They can tap a short prompt and immediately move into the right journey. This is especially useful on mobile screens where typing long messages is slower. WhatsApp Quick Start Prompts reduce friction for common requests such as order tracking, invoice requests, service callbacks, demo booking, payment questions, and catalog requests.
                  </p>
                  <p>
                    Ice Breakers also improve content consistency. A business can align the visible prompt text with approved <Link href="/whatsapp-templates" className="font-semibold text-brand-primary hover:underline">WhatsApp Templates</Link>, chatbot menus, and internal workflow names. For example, a utility template may ask the customer to reply if they need invoice support, while an Ice Breaker can offer Request Invoice as a visible next step. The prompt becomes a predictable bridge between WhatsApp conversation design and backend automation.
                  </p>
                  <p>
                    In practical terms, WhatsApp Ice Breakers answer a simple question: “What should the customer do first?” Good prompts are short, action-oriented, and tied to real workflows. Track My Order should connect to order tracking. Talk to Support should connect to a support queue or <Link href="/chatbot-flows" className="font-semibold text-brand-primary hover:underline">chatbot flow</Link>. Request Invoice should connect to accounting or ERP logic. Book Demo should connect to sales qualification. This keeps the conversation useful from the first tap.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="slash-commands-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Command routing</p>
                <h2 id="slash-commands-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                  What are WhatsApp Slash Commands?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-text-secondary">
                  <p>
                    WhatsApp Slash Commands are typed command shortcuts that customers can use to start a specific business action inside WhatsApp. A command usually begins with a slash, such as /support, /orders, /ledger, or /demo. The command tells the business system what the customer wants before a long explanation is needed. For returning customers, account users, dealers, distributors, and internal teams, WhatsApp Slash Commands are a fast way to access repeated workflows.
                  </p>
                  <p>
                    The workflow is direct. A business configures the command name and description in Whats91, publishes the configuration to Meta, and Meta makes the commands available for the connected WhatsApp business phone number. When a customer sends a command such as /orders, the WhatsApp webhook delivers the message body to Whats91 as normal incoming text. Whats91 then matches the command and routes it to the correct automation trigger. The command itself does not run the business logic; it starts the route that runs the business logic.
                  </p>
                  <p>
                    This distinction matters for WhatsApp Conversational Automation. Meta provides the display and messaging surface. Whats91 provides the command routing, trigger matching, and business workflow connection. A /support command can start a support chatbot or open a human handoff path. A /orders command can start an order tracking journey. A /ledger command can route to an accounting or ERP workflow. A /demo command can start a sales qualification flow. The same command can also connect to custom webhooks, CRM updates, or <Link href="/google-sheets-integration" className="font-semibold text-brand-primary hover:underline">Google Sheets integrations</Link> when a business uses spreadsheets as an operations layer.
                  </p>
                  <p>
                    WhatsApp Business Commands are useful because they create stable automation triggers. Natural language can vary widely. Customers may type “where is my order,” “order status,” “track parcel,” or “delivery update.” A command like /orders gives the system one reliable starting point. The command can still collect more information after it begins. For example, /orders can ask for an order ID, mobile number, or invoice reference. /ledger can ask for a party name or account code. /demo can ask for product interest and preferred time.
                  </p>
                  <p>
                    A slash command arrives as webhook text. Whats91 does not need the command to be an AI intent before it can act. It can use exact matching, prefix matching, command parsing, or a Flow Builder trigger. If the command includes extra text, such as /ledger customer ABC, the route can extract the command and pass the remaining value into the next workflow step. This makes WhatsApp Automation Commands practical for ERP, support, sales, delivery, and account workflows where deterministic routing is preferred.
                  </p>
                  <p>
                    Slash commands also work well alongside Ice Breakers. Ice Breakers are ideal for new or casual customers because they are visible and tap-friendly. Slash commands are ideal for repeat users who know what they want. Together, they create a complete WhatsApp Conversational Automation model: visible prompts for guided starts, typed commands for power users, and Whats91 routing for chatbots, <Link href="/flow-builder" className="font-semibold text-brand-primary hover:underline">visual automation flows</Link>, ERP workflows, and support operations.
                  </p>
                  <p>
                    Slash commands are structured text inputs inside the same WhatsApp conversation. Match the command and validate the requested account or order before returning data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="shortcuts-vs-chatbots-heading">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="shortcuts-vs-chatbots-heading"
                eyebrow="Comparison"
                title="WhatsApp Chat Shortcuts vs WhatsApp Chatbots"
                description="Chat Shortcuts and chatbots work together, but they solve different parts of the customer journey."
              />
              <div className="grid gap-3 md:hidden">
                {comparisonRows.map((row) => (
                  <div key={row.feature} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-text-primary">{row.feature}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary"><span className="font-semibold text-text-primary">Chat Shortcuts:</span> {row.shortcuts}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary"><span className="font-semibold text-text-primary">Chatbots:</span> {row.chatbots}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm md:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead className="bg-surface">
                      <tr>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">Feature</th>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">WhatsApp Chat Shortcuts</th>
                        <th className="px-5 py-4 text-sm font-semibold text-text-primary">WhatsApp Chatbots</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/70">
                      {comparisonRows.map((row) => (
                        <tr key={row.feature}>
                          <td className="px-5 py-4 text-sm font-semibold text-text-primary">{row.feature}</td>
                          <td className="px-5 py-4 text-sm leading-relaxed text-text-secondary">{row.shortcuts}</td>
                          <td className="px-5 py-4 text-sm leading-relaxed text-text-secondary">{row.chatbots}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                <p className="text-base leading-relaxed text-text-secondary">
                  WhatsApp Chat Shortcuts are best understood as the first-click or first-command layer of a conversation. They make the customer intent visible before automation begins. WhatsApp Chatbots handle the next step: asking questions, validating inputs, sending replies, calling APIs, escalating to humans, or continuing a workflow. A shortcut can start a chatbot, but it is not the chatbot itself. This separation helps businesses keep the customer interface simple while keeping the automation layer powerful.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  In Whats91, the two features are designed to work together. A shortcut can trigger a deterministic bot, a <Link href="/chatbot-flows" className="font-semibold text-brand-primary hover:underline">pre-built chatbot flow</Link>, a <Link href="/flow-builder" className="font-semibold text-brand-primary hover:underline">Flow Builder</Link> journey, a CRM update, or an ERP integration. That is why Chat Shortcuts are useful for both customer-facing simplicity and operations-facing automation.
                </p>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="business-use-cases-deep-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="business-use-cases-deep-heading"
                eyebrow="Workflow examples"
                title="Business Use Cases for WhatsApp Chat Shortcuts"
                description="Illustrative workflow options for support, sales, accounts and ERP teams. Confirm enabled integrations and permissions before returning data or scheduling an action."
              />
              <div className="space-y-5">
                {deepUseCases.map((item) => (
                  <section key={item.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6" aria-labelledby={`${item.title.toLowerCase().replaceAll(" ", "-")}-heading`}>
                    <h3 id={`${item.title.toLowerCase().replaceAll(" ", "-")}-heading`} className="text-xl font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.content}</p>
                  </section>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 sm:p-6">
                <p className="text-base leading-relaxed text-text-secondary">
                  For ERP-heavy businesses, Chat Shortcuts can sit in front of <Link href="/solutions/busy-erp" className="font-semibold text-brand-primary hover:underline">Busy ERP WhatsApp automation</Link> and <Link href="/solutions/miracle-whatsapp-api" className="font-semibold text-brand-primary hover:underline">Miracle WhatsApp API workflows</Link>. For support and sales-heavy teams, shortcuts can connect to chatbots, Flow Builder, CRM actions, Google Sheets, templates, and even <Link href="/whatsapp-business-calling" className="font-semibold text-brand-primary hover:underline">WhatsApp Business Calling</Link> follow-up flows.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                id="faq-heading"
                eyebrow="FAQ"
                title="Chat Shortcuts questions"
                description="Answers for teams evaluating WhatsApp ice breakers, slash commands, and webhook-based automation."
              />
              <div className="grid gap-4 md:grid-cols-2">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <h3 className="text-base font-semibold text-text-primary">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="cta-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-700 to-brand-800 p-6 text-center text-white shadow-xl shadow-brand-primary/20 sm:p-10 md:p-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Ready to simplify WhatsApp starts?</p>
                <h2 id="cta-heading" className="text-2xl font-bold sm:text-3xl md:text-4xl">
                  Add Chat Shortcuts to your Whats91 automation stack
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white">
                  Configure quick prompts, slash commands, and routing logic for support, sales, accounts, delivery, and ERP use cases.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{setupScope}</p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="h-11 bg-white px-6 text-brand-700 hover:bg-white/90">
                    <Link href="/contact">Request a demo</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 border-white/50 bg-white/10 px-6 text-white hover:bg-white/20">
                    <Link href="/flow-builder">Explore Flow Builder</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 border-white/50 bg-white/10 px-6 text-white hover:bg-white/20">
                    <Link href="/chatbot-flows">View Chatbot Flows</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
