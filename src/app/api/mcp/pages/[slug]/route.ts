import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo/config";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

/**
 * MCP Passage Feed - Per-Page Structured Content
 * Part of SEO 2.0 - Machine-Consumable Passages for AI agents
 *
 * Each passage has stable IDs, structured sections, and plain text content
 * for easy consumption by LLMs without DOM parsing.
 */

interface MCPSession {
  id: string;
  heading: string;
  content: string;
  keywords?: string[];
}

interface MCPPage {
  url: string;
  title: string;
  description: string;
  updated_at: string;
  language: string;
  sections: MCPSession[];
}

// Page passage data - structured content for AI consumption
const pagePassages: Record<string, MCPPage> = {
  "busy-erp": {
    url: `${siteConfig.url}/solutions/busy-erp`,
    title: "Busy Accounting WhatsApp Integration",
    description: "Automate Busy Accounting reports & vouchers on WhatsApp. 24/7 ERP chatbot for balance inquiry, bill-by-bill ledger, receipts & bilty status.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "busy-erp__overview",
        heading: "Overview",
        content: "Whats91's Busy Accounting WhatsApp integration transforms how businesses communicate with customers. Automate invoice delivery, enable 24/7 balance inquiries, and reduce support calls by 50%. The integration connects directly to Busy ERP software for real-time data sync.",
        keywords: ["Busy Accounting", "WhatsApp Integration", "ERP Automation"],
      },
      {
        id: "busy-erp__invoice_automation",
        heading: "Invoice Automation",
        content: "When an invoice is saved in Busy, it's automatically sent via WhatsApp with PDF attachment. Includes payment links, due dates, and order details. No manual export needed. Works with all Busy invoice types: Sales, Purchase, Credit Note, Debit Note.",
        keywords: ["Invoice Delivery", "PDF Invoice", "Payment Link"],
      },
      {
        id: "busy-erp__balance_inquiry",
        heading: "24/7 Balance Inquiry Chatbot",
        content: "Customers send 'Hi' or 'Balance' on WhatsApp and receive instant outstanding balance, last payment details, and due dates. Reduces support calls by 50%. Works 24/7 without staff intervention. Supports bill-by-bill outstanding breakdown.",
        keywords: ["Balance Inquiry", "Chatbot", "Customer Self-Service"],
      },
      {
        id: "busy-erp__payment_reminders",
        heading: "Payment Reminders",
        content: "Automated reminder sequence: 7 days before due, 3 days before, on due date, and overdue. Professional messages that maintain relationships. 30-40% improvement in collection speed. Customizable reminder templates.",
        keywords: ["Payment Reminders", "Collection Automation", "Due Date Alerts"],
      },
      {
        id: "busy-erp__ledger_statements",
        heading: "Ledger Statements",
        content: "On-demand bill-by-bill ledger via WhatsApp. Customers request statement for any date range. PDF generation with complete transaction history. Reduces accounting queries significantly.",
        keywords: ["Ledger Statement", "Account Statement", "Transaction History"],
      },
      {
        id: "busy-erp__bilty_tracking",
        heading: "Bilty & Dispatch Updates",
        content: "Real-time transport status updates. LR/Bilty number sharing with tracking links. Delivery confirmation notifications. Integrates with major transport companies.",
        keywords: ["Bilty Status", "Dispatch Tracking", "LR Number"],
      },
      {
        id: "busy-erp__roi",
        heading: "ROI & Benefits",
        content: "Staff time savings: 3+ hours daily. Collection improvement: 35% faster payments. Support call reduction: 50%. Professional image enhancement. 24/7 customer service without additional staff.",
        keywords: ["ROI", "Time Savings", "Collection Improvement"],
      },
    ],
  },
  "miracle-whatsapp-api": {
    url: `${siteConfig.url}/solutions/miracle-whatsapp-api`,
    title: "Miracle Accounting Software WhatsApp API Integration",
    description: "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.",
    updated_at: "2026-05-29",
    language: "en",
    sections: [
      {
        id: "miracle-whatsapp-api__overview",
        heading: "Overview",
        content: "Whats91 provides a custom Miracle WhatsApp API endpoint for Miracle Accounting Software users who need official WhatsApp Cloud API delivery for invoice PDFs, GST bills, challans, builty PDFs, ledger statements, receipts, and payment reminders.",
        keywords: ["Miracle WhatsApp API", "Miracle Accounting Software WhatsApp Integration", "Miracle Accounting WhatsApp Cloud API"],
      },
      {
        id: "miracle-whatsapp-api__web_api",
        heading: "What is Miracle Web API",
        content: "Miracle Web API is the external API configuration used by Miracle Accounting Software to send structured HTTP requests to another system. It is also described as Miracle API, Miracle Accounting API, Miracle ERP API, Miracle Integration API, or Miracle Accounting Software API. For WhatsApp delivery, Miracle sends accounting fields, recipient mobile, template values, and Base64 PDF attachment data to Whats91.",
        keywords: ["Miracle Web API", "Miracle API", "Miracle Accounting API", "Miracle ERP API", "Miracle Integration API"],
      },
      {
        id: "miracle-whatsapp-api__connection_flow",
        heading: "How Miracle Accounting Software Connects to WhatsApp",
        content: "The flow is Miracle -> API Request -> Whats91 -> WhatsApp Cloud API -> Customer. Miracle generates an invoice, GST invoice, challan, builty, ledger statement, receipt, or payment reminder. Miracle sends JSON to Whats91. Whats91 validates the token, template, recipient, variables, attachment, and sender, then sends the approved WhatsApp template and PDF through WhatsApp Cloud API.",
        keywords: ["Miracle invoice WhatsApp", "Miracle PDF WhatsApp", "Miracle payment reminder automation", "WhatsApp Cloud API"],
      },
      {
        id: "miracle-whatsapp-api__endpoint",
        heading: "Custom Endpoint",
        content: "Use POST https://graph.whats91.com/api/custom/miracle/send-template in Miracle's WhatsApp Web API profile. The endpoint accepts Miracle-style JSON fields, aliases, template arguments, and Base64 PDF attachments.",
        keywords: ["Miracle API endpoint", "Whats91 custom Miracle endpoint", "WhatsApp Web API profile"],
      },
      {
        id: "miracle-whatsapp-api__payload",
        heading: "Payload Requirements",
        content: "Required fields include auth_token, template_id or template_name, country_code, and send_to. For PDF attachments use media_url_type=base64, base64 mapped to Miracle's attachment Base64 field, and file_name mapped to Miracle's attachment file-name field.",
        keywords: ["auth_token", "template_name", "Base64 PDF attachment"],
      },
      {
        id: "miracle-whatsapp-api__implementation",
        heading: "Implementation Steps",
        content: "Create and approve the WhatsApp template, generate a Whats91 API token, add the Miracle Web API profile, paste the JSON body, map send_to to party mobile, choose PDF and Log With Attachment, then send a controlled test document and review Whats91 logs.",
        keywords: ["How to setup WhatsApp in Miracle Software", "Miracle WhatsApp setup", "Whats91 implementation"],
      },
      {
        id: "miracle-whatsapp-api__web_vs_cloud",
        heading: "Miracle WhatsApp API vs WhatsApp Web Sending",
        content: "WhatsApp Web sending requires QR login and an active browser session. Whats91 Cloud API delivery does not require QR login, uses approved templates, supports Base64 PDF attachments, provides delivery logs, supports automation, and is better suited for scalable ERP and accounting document delivery.",
        keywords: ["Miracle WhatsApp API vs WhatsApp Web", "official WhatsApp Cloud API", "QR login replacement"],
      },
      {
        id: "miracle-whatsapp-api__industries",
        heading: "Industries Using Miracle WhatsApp Automation",
        content: "Common industries include textile businesses, ceramic businesses, FMCG distributors, manufacturers, wholesalers, commission agents, petrol pumps, and pharmaceutical distributors. Workflows include GST invoice delivery, builty PDFs, challans, transport documents, ledger statements, payment reminders, receipts, credit control, and customer communication.",
        keywords: ["Miracle WhatsApp automation industries", "Miracle ERP WhatsApp integration", "accounting document automation"],
      },
      {
        id: "miracle-whatsapp-api__workflow",
        heading: "Miracle WhatsApp API Workflow",
        content: "Miracle invoice generated -> Miracle Web API trigger -> Whats91 endpoint -> template validation -> Base64 PDF attachment check -> WhatsApp Cloud API -> customer receives PDF. Logs cover missing tokens, invalid phone numbers, missing templates, invalid Base64, missing file names, sender health, and Cloud API delivery responses.",
        keywords: ["Miracle WhatsApp API workflow", "Base64 PDF attachments", "template validation", "delivery logs"],
      },
      {
        id: "miracle-whatsapp-api__security",
        heading: "Token Security",
        content: "Never publish a live Whats91 token in screenshots, website content, or public documentation. Use YOUR_WHATS91_API_TOKEN in examples and rotate any token that was exposed in setup material.",
        keywords: ["Whats91 token security", "auth_token", "API token rotation"],
      },
    ],
  },
  "chat-shortcuts-conversation-automation": {
    url: `${siteConfig.url}/features/chat-shortcuts-conversation-automation`,
    title: "WhatsApp Chat Shortcuts, Ice Breakers and Slash Commands",
    description: "Use WhatsApp Ice Breakers and Slash Commands to start chatbots, Flow Builder, ERP, support, sales, demo, and order tracking automations.",
    updated_at: "2026-05-29",
    language: "en",
    sections: [
      {
        id: "chat-shortcuts__overview",
        heading: "Overview",
        content: "Whats91 Chat Shortcuts lets businesses configure Meta WhatsApp conversational components for connected phone numbers. Customers see WhatsApp Ice Breakers and WhatsApp Slash Commands inside WhatsApp, while Whats91 handles the automation after those selections arrive as normal webhook text.",
        keywords: ["WhatsApp Chat Shortcuts", "WhatsApp Ice Breakers", "WhatsApp Slash Commands"],
      },
      {
        id: "chat-shortcuts__ice_breakers",
        heading: "What are WhatsApp Ice Breakers",
        content: "WhatsApp Ice Breakers are quick-start prompts, also called WhatsApp Quick Start Prompts or WhatsApp Conversation Starters. Meta displays prompts such as Track My Order, Talk to Support, Request Invoice, and Book Demo inside WhatsApp. When tapped, Whats91 receives the prompt as incoming text and routes it into WhatsApp Business Automation.",
        keywords: ["WhatsApp Ice Breakers", "WhatsApp Quick Start Prompts", "WhatsApp Conversation Starters"],
      },
      {
        id: "chat-shortcuts__slash_commands",
        heading: "What are WhatsApp Slash Commands",
        content: "WhatsApp Slash Commands are typed commands such as /support, /orders, /ledger, and /demo. The command arrives as webhook text, and Whats91 can match it as a stable automation trigger for chatbots, Flow Builder, ERP workflows, CRM updates, order tracking, or human handoff.",
        keywords: ["WhatsApp Slash Commands", "WhatsApp Business Commands", "WhatsApp Automation Commands", "WhatsApp Conversational Automation"],
      },
      {
        id: "chat-shortcuts__how_it_works",
        heading: "How It Works",
        content: "Teams configure prompts and commands in Whats91, push them to Meta, customers tap or type them inside WhatsApp, and Whats91 routes the received text into Chatbots, Flow Builder, ERP workflows, custom handlers, or human handoff.",
        keywords: ["Flow Builder integration", "WhatsApp chatbot shortcuts", "webhook automation"],
      },
      {
        id: "chat-shortcuts__chatbots_comparison",
        heading: "WhatsApp Chat Shortcuts vs WhatsApp Chatbots",
        content: "Chat Shortcuts are visible conversation starters and command triggers. Chatbots run after a message is received. A shortcut can start a chatbot, but it is not the chatbot itself. Shortcuts do not require AI and work with Flow Builder, ERP workflows, and support routing.",
        keywords: ["WhatsApp Chat Shortcuts vs WhatsApp Chatbots", "Can Chat Shortcuts start chatbots", "Flow Builder triggers"],
      },
      {
        id: "chat-shortcuts__use_cases",
        heading: "Business Use Cases",
        content: "Common use cases include customer support automation, order tracking automation, ERP automation, accounting automation, lead generation, sales automation, and demo booking. Example shortcuts include Track My Order, Talk to Support, Request Invoice, Book Demo, /ledger, /orders, /support, and /demo.",
        keywords: ["WhatsApp customer support automation", "WhatsApp accounting automation", "WhatsApp order tracking automation"],
      },
      {
        id: "chat-shortcuts__limits",
        heading: "Meta Limits",
        content: "Whats91 enforces Meta limits such as maximum 4 ice breaker prompts, 80 characters per prompt, maximum 30 slash commands, 32 characters per command name, 256 characters per command description, no emojis, and no duplicates.",
        keywords: ["Meta conversational automation limits", "WhatsApp prompt limits", "slash command limits"],
      },
      {
        id: "chat-shortcuts__scope",
        heading: "Security And Scope",
        content: "Chat Shortcuts is separate from AI MetaBot, does not use WABA Bot ID APIs, does not depend on an AI runtime, and keeps configuration scoped to the selected WhatsApp phone number.",
        keywords: ["AI MetaBot separate", "WABA Bot ID", "WhatsApp number configuration"],
      },
    ],
  },
  "whatsapp-templates": {
    url: `${siteConfig.url}/whatsapp-templates`,
    title: "WhatsApp Business Message Template Library",
    description: "20+ pre-approved WhatsApp message templates for marketing, utility, and authentication. Industry-specific templates with best practices.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "templates__overview",
        heading: "Template Overview",
        content: "Comprehensive library of pre-approved WhatsApp message templates. Categories include Marketing (8 templates), Utility (8 templates), and Authentication (4 templates). Each template follows Meta's guidelines and includes variable placeholders.",
        keywords: ["WhatsApp Templates", "Message Templates", "Pre-approved"],
      },
      {
        id: "templates__marketing",
        heading: "Marketing Templates",
        content: "Templates for promotional campaigns, product launches, event invitations, and seasonal offers. Includes templates for: Promotional Offers, Product Launches, Event Invitations, Seasonal Campaigns. All templates include call-to-action buttons.",
        keywords: ["Marketing Templates", "Promotional Messages", "Campaigns"],
      },
      {
        id: "templates__utility",
        heading: "Utility Templates",
        content: "Transactional message templates for order confirmations, payment receipts, delivery updates, and account alerts. Templates for: Order Confirmations, Payment Receipts, Shipping Updates, Account Alerts. Cost: ₹0.115 per message (India).",
        keywords: ["Utility Templates", "Transactional Messages", "Order Updates"],
      },
      {
        id: "templates__authentication",
        heading: "Authentication Templates",
        content: "OTP delivery and account verification templates. Includes: OTP Verification, Account Verification, Password Reset, Two-Factor Authentication. Supports security codes with expiration times.",
        keywords: ["OTP Templates", "Authentication", "Verification"],
      },
      {
        id: "templates__structure",
        heading: "Template Structure",
        content: "Each template includes: Clear message body, Variable placeholders {{1}}, {{2}}, Optional headers (text, image, document), Call-to-action buttons. Templates must have no spelling errors and follow Meta's content policy.",
        keywords: ["Template Structure", "Variables", "Buttons"],
      },
      {
        id: "templates__rejection_reasons",
        heading: "Common Rejection Reasons",
        content: "Templates are rejected for: Vague or unclear content, Missing sample values, Promotional content in utility category, Incorrect variable usage, Trademark violations. Always provide realistic sample data when submitting.",
        keywords: ["Template Rejection", "Approval Issues", "Meta Guidelines"],
      },
    ],
  },
  "whatsapp-coexistence": {
    url: `${siteConfig.url}/whatsapp-coexistence`,
    title: "WhatsApp Coexistence: Strategic Implementation for Microbusinesses",
    description: "Complete guide to simultaneously using WhatsApp Business App and WhatsApp Cloud API on a single phone number.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "coexistence__overview",
        heading: "What is WhatsApp Coexistence",
        content: "WhatsApp Coexistence allows microbusinesses to use both the WhatsApp Business mobile app and WhatsApp Cloud API simultaneously on a single phone number. This provides manual messaging flexibility with enterprise-grade automation.",
        keywords: ["WhatsApp Coexistence", "Cloud API", "Business App"],
      },
      {
        id: "coexistence__architecture",
        heading: "Technical Architecture",
        content: "Bidirectional synchronization between mobile app and Cloud API. Messages sent from mobile app appear in Cloud API webhook. Messages received via API appear in mobile app. Enabled via `smb_message_echoes` webhook field.",
        keywords: ["Bidirectional Sync", "Webhook", "Architecture"],
      },
      {
        id: "coexistence__throughput",
        heading: "Throughput Limits",
        content: "Coexistence mode: 5 messages per second (suitable for microbusiness). Standard Cloud API: 80-100 messages per second (enterprise). Choose based on your volume needs. Upgrade path available without number change.",
        keywords: ["Throughput", "Message Limits", "MPS"],
      },
      {
        id: "coexistence__features",
        heading: "Feature Compatibility",
        content: "Supported: Template messages, Media messages, Interactive buttons, Webhook events, Profile management. Disabled: Click-to-WhatsApp Ads (requires migration), Some advanced analytics, High-volume batch sending.",
        keywords: ["Features", "Compatibility", "Limitations"],
      },
      {
        id: "coexistence__prerequisites",
        heading: "Prerequisites",
        content: "Requirements: WhatsApp Business App installed and active, Phone number registered in Business App, Meta Business Manager account, Cloud API app configured, `smb_message_echoes` enabled in webhook subscription.",
        keywords: ["Prerequisites", "Requirements", "Setup"],
      },
      {
        id: "coexistence__availability",
        heading: "Geographic Availability",
        content: "Currently available in select markets including India. Check Meta's official documentation for current availability list. Expanding to more countries progressively.",
        keywords: ["Availability", "India", "Markets"],
      },
    ],
  },
  "pricing": {
    url: `${siteConfig.url}/pricing`,
    title: "WhatsApp API Pricing India 2026",
    description: "Pay the exact Meta rates—₹0.8631 for Marketing and ₹0.1150 for Utility—without a single paisa of middleman markup.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "pricing__overview",
        heading: "Official Meta Rates (India)",
        content: "Effective January 1, 2026 per delivered message with INR billing. Marketing: ₹0.8631 per message. Utility: ₹0.1150 per message. Authentication: ₹0.1150 per message. Service: FREE within 24-hour customer window.",
        keywords: ["Pricing", "Meta Rates", "India"],
      },
      {
        id: "pricing__marketing",
        heading: "Marketing Messages",
        content: "Rate: ₹0.8631 per delivered message. Use cases: Promotional broadcasts, offers, newsletters, product launches. 2026 Update: 10% increase from previous year due to high promotional volume in India.",
        keywords: ["Marketing Pricing", "Promotional Messages", "Broadcasts"],
      },
      {
        id: "pricing__utility",
        heading: "Utility Messages",
        content: "Rate: ₹0.1150 per delivered message (base rate). Use cases: Order updates, shipping alerts, payment confirmations. Volume discounts available starting 25M messages/month. 7.5x cheaper than Marketing.",
        keywords: ["Utility Pricing", "Transactional Messages", "Volume Discounts"],
      },
      {
        id: "pricing__free_messaging",
        heading: "Free Messaging Windows",
        content: "Three scenarios for free messages: 1) 24-Hour Customer Service Window (customer messages first), 2) 72-Hour CTWA Ad Window (click-to-WhatsApp ad), 3) Utility in Service Window. Strategic use can significantly reduce costs.",
        keywords: ["Free Messages", "Service Window", "CTWA"],
      },
      {
        id: "pricing__volume_tiers",
        heading: "Volume Discounts",
        content: "Utility/Authentication volume tiers: 0-25M: ₹0.1150 (base), 25M-50M: ₹0.1081 (6% off), 50M-100M: ₹0.1012 (12% off), 100M-200M: ₹0.0943 (18% off), 200M-300M: ₹0.0874 (24% off), 300M+: ₹0.0805 (30% off).",
        keywords: ["Volume Discounts", "Tier Pricing", "Enterprise"],
      },
      {
        id: "pricing__transparency",
        heading: "Pricing Transparency",
        content: "Customers should reconcile the current Meta rate card, the selected Whats91 software plan, any quoted onboarding or integration work, and applicable taxes against the written order form and invoice.",
        keywords: ["Pricing Transparency", "Order Form", "Meta Rate Card"],
      },
    ],
  },
  "partners": {
    url: `${siteConfig.url}/partners`,
    title: "Whats91 Partner Program",
    description: "Partner and Tech Partner pricing for Whats91 Co-Existing, Standard, Flow Builder, Catalog Management, and Campaign Utility Templates with renewal benefits.",
    updated_at: "2026-06-06",
    language: "en",
    sections: [
      {
        id: "partners__overview",
        heading: "Overview",
        content: "The Whats91 Partner Program has two partner models. A Partner refers clients to Whats91 while Whats91 handles onboarding, support, WhatsApp setup, and integrations. A Tech Partner performs onboarding and support independently while using the Whats91 platform with stronger pricing benefits.",
        keywords: ["Whats91 Partner Program", "Partner", "Tech Partner"],
      },
      {
        id: "partners__responsibilities",
        heading: "Partner vs Tech Partner Responsibilities",
        content: "Partners focus on referrals and benefit from referred active renewals. Whats91 handles onboarding, support, and integrations. Tech Partners source and manage clients, handle onboarding, provide first-line support, configure WhatsApp setup, and handle integration delivery independently.",
        keywords: ["Partner responsibilities", "Tech Partner onboarding", "WhatsApp API reseller"],
      },
      {
        id: "partners__core_pricing",
        heading: "Core Plan Pricing",
        content: "Co-Existing 1 Year: Customer ₹5,000, Partner ₹3,500, Tech Partner ₹2,500. Co-Existing 3 Years: Customer ₹13,000, Partner ₹8,000, Tech Partner ₹6,000. Standard 1 Year: Customer ₹7,000, Partner ₹5,000, Tech Partner ₹4,000. Standard 3 Years: Customer ₹16,000, Partner ₹11,000, Tech Partner ₹9,000. All prices are exclusive of 18% GST.",
        keywords: ["Co-Existing Partner Pricing", "Standard Partner Pricing", "Tech Partner Pricing"],
      },
      {
        id: "partners__addon_pricing",
        heading: "Add-On Pricing",
        content: "Flow Builder add-on 103: Customer ₹2,000, Partner ₹1,500, Tech Partner ₹1,000. WhatsApp Catalog Management add-on 102: Customer ₹4,000, Partner ₹3,000, Tech Partner ₹2,000. Campaign Utility Templates add-on 101: Customer ₹2,000, Partner ₹1,500, Tech Partner ₹1,000. All prices are exclusive of 18% GST.",
        keywords: ["Flow Builder partner pricing", "Catalog Management partner pricing", "Campaign Utility Templates"],
      },
      {
        id: "partners__renewals",
        heading: "Renewal Benefits",
        content: "Partners receive ongoing renewal benefits based on their active and renewing client base. Exact benefits depend on partner type, client activity, renewal status, and commercial terms finalized with Whats91. No fixed renewal percentage is published on the page.",
        keywords: ["Partner renewal benefits", "Recurring partner benefits", "Client base growth"],
      },
      {
        id: "partners__meta_cost",
        heading: "Meta Message Charges",
        content: "Meta per-message charges are extra and are paid directly to Meta as per Meta template/message rates. Whats91 partner plan and add-on prices do not include Meta message charges.",
        keywords: ["Meta message charges", "Meta template rates", "WhatsApp message cost"],
      },
    ],
  },
  "whats91-coins": {
    url: `${siteConfig.url}/partners/whats91-coins`,
    title: "Whats91 Coins Wallet for Partners",
    description: "Guide and calculator for Whats91 Coins wallet recharge, GST, plan deductions, add-on deductions, and partner subscription assignment.",
    updated_at: "2026-06-06",
    language: "en",
    sections: [
      {
        id: "whats91-coins__overview",
        heading: "Overview",
        content: "Whats91 Coins are wallet credits used by Partners and Tech Partners to assign customer subscriptions, activate plans, and add add-ons independently. One INR of pre-GST recharge value equals one Whats91 Coin.",
        keywords: ["Whats91 Coins", "Partner wallet", "Tech Partner wallet"],
      },
      {
        id: "whats91-coins__gst",
        heading: "GST On Recharge",
        content: "Partners pay the recharge base amount plus 18% GST, but receive coins only for the pre-GST base amount. Example: a ₹10,000 base recharge costs ₹11,800 payable and credits 10,000 coins.",
        keywords: ["GST on recharge", "Coins credited", "Recharge payable"],
      },
      {
        id: "whats91-coins__deductions",
        heading: "Plan And Add-On Deductions",
        content: "Plan and add-on assignments deduct the listed pre-GST coin value only. Partner deductions include Co-Existing 1 Year 3,500, Co-Existing 3 Years 8,000, Standard / Extender 1 Year 5,000, Standard / Extender 3 Years 11,000, Flow Builder 1,500, Catalog 3,000, and Campaign Utility Templates 1,500. Tech Partner deductions are 2,500, 6,000, 4,000, 9,000, 1,000, 2,000, and 1,000 respectively.",
        keywords: ["Coin deductions", "Partner pricing", "Tech Partner pricing", "Standard Extender"],
      },
      {
        id: "whats91-coins__independent_assignment",
        heading: "Independent Assignment",
        content: "The Coins system helps partners independently assign eligible customer plans and add-ons from their wallet without waiting for Whats91 manual assignment. Meta per-message charges remain separate and are paid directly to Meta.",
        keywords: ["Customer assignment", "Partner subscription assignment", "Meta message charges"],
      },
      {
        id: "whats91-coins__calculator",
        heading: "Calculator Modes",
        content: "The calculator has two modes. I have coins: enter wallet balance to see maximum independent activations and verify a custom mix. I need activations: enter planned customer plans and add-ons to calculate total coins needed, shortfall, GST, and payable recharge amount.",
        keywords: ["Coins calculator", "Wallet balance calculator", "Recharge calculator"],
      },
    ],
  },
  "google-sheets-integration": {
    url: `${siteConfig.url}/google-sheets-integration`,
    title: "WhatsApp Campaign to Google Sheets Integration",
    description: "Automatically sync WhatsApp campaign responses to Google Sheets. Capture button replies like Interested, Not Interested and push data in real-time for seamless automation.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "sheets__overview",
        heading: "Integration Overview",
        content: "Every button click—Interested, Not Interested, Learn More—is automatically captured and pushed to Google Sheets in real-time. No manual exports, no delays. Responses sync within 1-3 seconds of user interaction.",
        keywords: ["Google Sheets", "Campaign Responses", "Real-Time Sync"],
      },
      {
        id: "sheets__how_it_works",
        heading: "How It Works",
        content: "6-step process: 1) Create campaign with interactive buttons, 2) Connect Google Sheet and map columns, 3) Launch campaign to audience, 4) Platform captures button responses via webhooks, 5) Auto-push to configured sheet, 6) Use Zapier/Make for further automation.",
        keywords: ["Workflow", "Process", "Automation"],
      },
      {
        id: "sheets__button_types",
        heading: "Button Response Types",
        content: "Interested: Customer expresses interest (Lead Score: High). Not Interested: Customer declines (Lead Score: Low). Learn More: Customer wants info (Lead Score: Medium). Call Me: Callback request (Priority: High). All responses include phone, timestamp, campaign ID, button text.",
        keywords: ["Button Replies", "Lead Scoring", "Response Types"],
      },
      {
        id: "sheets__data_fields",
        heading: "Data Fields Captured",
        content: "Fields logged per response: phone_number, timestamp, campaign_id, template_name, button_id, button_text, message_id, custom_fields (JSON). All fields are customizable for integration needs.",
        keywords: ["Data Fields", "Captured Data", "Field Reference"],
      },
      {
        id: "sheets__use_cases",
        heading: "Use Cases",
        content: "Lead Qualification: 3x faster lead response time. Event RSVPs: 85% response rate. Customer Surveys: 60% higher completion. Order Confirmations: 90% confirmation rate. All data flows automatically to Sheets for team visibility.",
        keywords: ["Use Cases", "Lead Qualification", "Surveys"],
      },
    ],
  },
  "chatbot-flows": {
    url: `${siteConfig.url}/chatbot-flows`,
    title: "ERP Chatbot Flow Library",
    description: "Pre-built conversational flows for Busy Accounting Software integration. Automate sales, purchases, payments, and more with WhatsApp chatbots.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "flows__overview",
        heading: "Flow Library Overview",
        content: "14+ pre-built chatbot flows for ERP automation. 8 categories: Sales Invoice, Sales Order, Sales Return, Purchase, Payments, Receipts, Ledgers, Reports. Each flow includes trigger events, processing steps, and WhatsApp message templates.",
        keywords: ["Chatbot Flows", "ERP Automation", "Pre-built Flows"],
      },
      {
        id: "flows__categories",
        heading: "Flow Categories",
        content: "Sales Invoice: Invoice creation, delivery, payment tracking. Sales Order: Order processing, fulfillment. Sales Return: Returns, credit notes. Purchase: PO automation, vendor communication. Payments: Reminders, confirmations. Receipts: Delivery, acknowledgment. Ledgers: Balance queries, statements. Reports: Automated delivery, on-demand.",
        keywords: ["Categories", "ERP Modules", "Flow Types"],
      },
      {
        id: "flows__structure",
        heading: "Flow Structure",
        content: "Each flow contains: Trigger event (webhook/message), Processing steps (API calls, conditions), Message templates, Integration endpoints. Flows execute in 1-5 seconds. Complexity levels: Basic, Intermediate, Advanced.",
        keywords: ["Flow Structure", "Steps", "Triggers"],
      },
      {
        id: "flows__integrations",
        heading: "Integrations",
        content: "Flows connect to: Busy API for data retrieval, WhatsApp Cloud API for messaging, PDF Generator for documents, Scheduler for timed triggers. All integrations are pre-configured and require minimal setup.",
        keywords: ["Integrations", "APIs", "Connectors"],
      },
    ],
  },
  "tools": {
    url: `${siteConfig.url}/tools`,
    title: "Free Tools - WhatsApp Business Resources",
    description: "Free online tools for WhatsApp Business users: link generator, QR code creator, cost calculator, and more.",
    updated_at: "2026-03-03",
    language: "en",
    sections: [
      {
        id: "tools__overview",
        heading: "Available Tools",
        content: "8 free tools available: WhatsApp Link Generator, QR Code Generator, WhatsApp API Cost Calculator, GST Calculator, SIP Calculator, Image Compressor, SEO Score Checker, Case Converter. All tools process data client-side for privacy.",
        keywords: ["Free Tools", "WhatsApp Tools", "Calculators"],
      },
      {
        id: "tools__link_generator",
        heading: "WhatsApp Link Generator",
        content: "Generate wa.me links with pre-filled messages. Enter phone number and message text, get a clickable link. Perfect for email signatures, websites, and social media. No signup required.",
        keywords: ["Link Generator", "wa.me", "Pre-filled Message"],
      },
      {
        id: "tools__cost_calculator",
        heading: "API Cost Calculator",
        content: "Calculate WhatsApp messaging costs by country (20+ supported), message category (Marketing/Utility/Auth/Service), and volume. Includes volume discount tiers. Compare costs across providers.",
        keywords: ["Cost Calculator", "Pricing Estimator", "Volume Discounts"],
      },
      {
        id: "tools__privacy",
        heading: "Privacy Focus",
        content: "All tools are 100% client-side processing. No data is sent to servers. No cookies stored. Mobile-responsive design. Free to use without registration.",
        keywords: ["Privacy", "Client-side", "No Registration"],
      },
    ],
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Check if it's a blog post
  if (slug.startsWith("blog-")) {
    const postSlug = slug.replace("blog-", "");
    const post = getPostBySlug(postSlug);

    if (post) {
      const blogPage: MCPPage = {
        url: `${siteConfig.url}/blog/${post.slug}`,
        title: post.title,
        description: post.excerpt,
        updated_at: post.publishedAt,
        language: "en",
        sections: [
          {
            id: `blog-${post.slug}__summary`,
            heading: "Summary",
            content: post.excerpt,
            keywords: post.seo.keywords,
          },
          {
            id: `blog-${post.slug}__tags`,
            heading: "Topics Covered",
            content: `This article covers: ${post.tags.join(", ")}. Category: ${post.category}. Reading time: ${post.readingTime} minutes.`,
            keywords: post.seo.keywords,
          },
        ],
      };

      return NextResponse.json(blogPage, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }
  }

  // Check static pages
  const page = pagePassages[slug];
  if (!page) {
    return NextResponse.json(
      { error: "Page not found", available_pages: Object.keys(pagePassages) },
      { status: 404 }
    );
  }

  return NextResponse.json(page, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Machine-readable passage feed for agents, not a search result.
      "X-Robots-Tag": "noindex",
    },
  });
}

// Generate index of all available pages
export async function generateStaticParams() {
  const staticSlugs = Object.keys(pagePassages);
  const blogPosts = getAllPosts();
  const blogSlugs = blogPosts.map((post) => `blog-${post.slug}`);

  return [...staticSlugs, ...blogSlugs].map((slug) => ({ slug }));
}
