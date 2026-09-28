import {
  CreditCard,
  Code2,
  Building2,
  Shield,
  HelpCircle,
  Zap,
} from "lucide-react";

export const categories = [
  { id: "getting-started", label: "Getting Started", icon: Zap },
  { id: "pricing", label: "Pricing & Billing", icon: CreditCard },
  { id: "technical", label: "Technical & API", icon: Code2 },
  { id: "busy-erp", label: "Busy ERP Integration", icon: Building2 },
  { id: "compliance", label: "Compliance & Security", icon: Shield },
  { id: "support", label: "Support & Troubleshooting", icon: HelpCircle },
];

// Comprehensive FAQ Data
export const faqData = {
  "getting-started": [
    {
      question: "What is WhatsApp Cloud API and how is it different from WhatsApp Business App?",
      answer: "WhatsApp Cloud API is Meta's hosted API for businesses to send and receive WhatsApp messages through approved accounts. It supports multiple users, automation, webhooks, templates, and CRM or ERP integrations. Capacity, availability, pricing, and eligibility remain subject to Meta's current platform terms and account limits."
    },
    {
      question: "How do I get started with Whats91 WhatsApp API?",
      answer: "Getting started is simple: 1) Sign up on whats91.com with your business details, 2) Verify your business with Meta (we guide you through the process), 3) Set up your WhatsApp Business Account (WABA), 4) Create your first message templates, 5) Integrate via our API or use our no-code dashboard. The entire onboarding takes 24-48 hours. Contact our sales team for a personalized demo."
    },
    {
      question: "What are the requirements to use WhatsApp Business API in India?",
      answer: "To use WhatsApp Business API in India, you need: a valid business with GST registration (optional but recommended for ITC), a verified Meta Business Manager account, a phone number not currently on WhatsApp (or willing to deactivate), accepted business category (no gambling, alcohol, etc.), and compliance with WhatsApp's Commerce Policy. We handle the Meta verification process for you."
    },
    {
      question: "How long does it take to get WhatsApp Business API access?",
      answer: "With Whats91, most businesses get API access within 24-48 hours. The process includes: account creation (instant), business verification (12-24 hours), number registration (2-4 hours), and template approval (varies by category - utility templates are often instant, marketing takes 24-48 hours). Enterprise clients with existing Meta verification can be live in under 4 hours."
    },
    {
      question: "Can I keep my existing WhatsApp number for Business API?",
      answer: "Yes, but with conditions. Your existing WhatsApp number can be migrated to Business API, but you must first: 1) Export your chat history (API doesn't retain personal chats), 2) Deactivate the number from WhatsApp/WhatsApp Business app, 3) Wait 24-48 hours before registration. We recommend using a new dedicated business number for seamless transition."
    },
    {
      question: "What's the difference between WhatsApp Cloud API and On-Premise API?",
      answer: "WhatsApp Cloud API is Meta's hosted solution - no server infrastructure required, automatic updates, built-in scalability, and no maintenance overhead. On-Premise API requires your own servers, dedicated hosting, and technical maintenance. Whats91 exclusively uses Cloud API, giving you enterprise-grade reliability without infrastructure costs. Cloud API also receives new features first."
    },
    {
      question: "Do I need technical knowledge to use Whats91?",
      answer: "Not necessarily. Whats91 offers two modes: 1) No-Code Dashboard - manage contacts, send broadcasts, view analytics through our intuitive interface, 2) API Integration - for developers building custom solutions. Our Busy ERP integration requires zero coding - we handle everything. For custom CRM integrations, basic API knowledge helps, but our team provides comprehensive documentation and support."
    },
  ],
  "pricing": [
    {
      question: "What are the WhatsApp API pricing rates in India for 2026?",
      answer: "Meta publishes WhatsApp Business Platform rates by market and message category, and those rates can change. Use the current Meta rate card and the Whats91 pricing page as estimates, then rely on your applicable plan, order form, and invoice for binding charges."
    },
    {
      question: "Are there any setup fees or monthly charges?",
      answer: "Setup fees, recurring platform fees, message charges, integrations, and taxes depend on the selected plan and any quoted scope. Review the pricing page and your written order form before purchase; the invoice should list applicable charges separately."
    },
    {
      question: "How does volume discount pricing work?",
      answer: "Utility and Authentication messages have automatic volume tiers: 0-25M messages at ₹0.1150 (base), 25M-50M at ₹0.1081 (6% off), 50M-100M at ₹0.1012 (12% off), up to 30% off at 300M+ messages. Marketing has a flat rate regardless of volume. Tier upgrades happen automatically - no negotiation needed."
    },
    {
      question: "When are WhatsApp messages completely free?",
      answer: "Three scenarios for free messaging: 1) 24-Hour Customer Service Window - any reply within 24 hours of customer message is free, 2) 72-Hour CTWA Window - all message types (including marketing) are free after a Click-to-WhatsApp ad click, 3) Utility templates within an active service window are free (April 2025 update)."
    },
    {
      question: "How is billing handled? Is there GST?",
      answer: "Meta bills in INR directly to Indian businesses. 18% GST applies and is fully claimable as Input Tax Credit (ITC) for GST-registered businesses. Invoices show every message as a line item with delivery status. No USD conversion fees, no foreign transaction charges. This local billing setup saves 12-20% compared to earlier USD billing."
    },
    {
      question: "What happens if my message is not delivered?",
      answer: "You don't pay. WhatsApp API uses per-delivered billing - only successfully delivered messages are charged. Undelivered messages due to invalid numbers, user opt-outs, or network issues cost nothing. Our dashboard shows detailed delivery analytics with reason codes for failed attempts."
    },
    {
      question: "How do I add money to my WhatsApp API account?",
      answer: "Meta uses a prepaid credit system. You can add funds directly through Meta Business Manager using credit card, debit card, or UPI. For Indian businesses, we recommend maintaining a balance equivalent to 2-4 weeks of messaging volume. Our dashboard shows real-time balance and projected usage alerts."
    },
    {
      question: "Can I get a refund for unused credits?",
      answer: "Meta's policy doesn't allow refunds for purchased credits. However, credits don't expire and can be used indefinitely. We recommend starting with smaller amounts and scaling based on actual usage. For enterprise clients, we offer custom billing arrangements with monthly invoicing."
    },
    {
      question: "Why can provider pricing differ from Meta rates?",
      answer: "Providers may separately charge for software, support, onboarding, integrations, or managed services. Compare the current Meta rate card with each provider's written commercial terms. Whats91 pricing and any pass-through charges are stated in the applicable plan or order form."
    },
  ],
  "technical": [
    {
      question: "How do WhatsApp Webhooks work?",
      answer: "Webhooks are HTTP callbacks that notify your server of events in real-time. When a customer messages you, WhatsApp sends a POST request to your webhook URL with the message payload. Our platform handles webhook setup automatically - you just specify your endpoint URL. For developers, we provide webhook security validation using X-Hub-Signature-256 headers."
    },
    {
      question: "What message templates are supported?",
      answer: "WhatsApp supports four template categories: 1) Utility - order confirmations, shipping updates, account alerts, 2) Marketing - promotional offers, newsletters, product launches, 3) Authentication - OTP delivery, verification codes, 4) Service - customer support responses. Each category has different pricing and approval requirements."
    },
    {
      question: "How do I create and approve message templates?",
      answer: "Templates are created through Meta Business Manager or our dashboard. Each template needs: a name, category, language code, and content body with optional variables. Meta reviews templates within 24-48 hours. Utility templates are often auto-approved. Marketing templates require more scrutiny. We provide pre-approved template libraries for common use cases."
    },
    {
      question: "What's the message rate limit (throughput)?",
      answer: "Throughput depends on your messaging tier: Tier 1 (verified) - 1,000 unique users per 24 hours, Tier 2 - 10,000 users, Tier 3 - 100,000 users, Tier 4 - unlimited. Within these limits, you can send multiple messages per user. Our platform supports burst throughput of 500+ messages per second for time-sensitive campaigns."
    },
    {
      question: "Can I send images, videos, and documents via WhatsApp API?",
      answer: "Yes, WhatsApp Cloud API supports rich media: Images (JPEG, PNG up to 5MB), Videos (MP4, 3GP up to 16MB), Documents (PDF, DOC, XLS up to 100MB), Audio (MP3, AAC, OGG up to 16MB), and Stickers. Media messages use template pricing. Our dashboard includes a media library for easy asset management."
    },
    {
      question: "How do I handle incoming customer messages?",
      answer: "Incoming messages are delivered via webhooks to your configured endpoint. You can: 1) Build a custom chat interface, 2) Use our multi-agent inbox dashboard, 3) Route to AI chatbots for auto-response, 4) Integrate with existing CRM/ticketing systems. Replies within 24 hours of customer message are free (Service window)."
    },
    {
      question: "What's Error 131049 (Frequency Cap Saturation)?",
      answer: "Meta limits users to approximately 2 marketing messages per day across ALL businesses. Error 131049 occurs when attempting to send a marketing message to a user who has already received their daily quota. Solution: Segment audiences strategically, time broadcasts appropriately, and focus on quality over quantity."
    },
    {
      question: "How do I integrate WhatsApp API with my CRM or custom application?",
      answer: "We provide REST APIs with comprehensive documentation: POST /messages for sending, Webhooks for receiving, GET /templates for template management, and Analytics APIs for reporting. SDKs available for Node.js, Python, PHP, and Java. For no-code integration, we offer Zapier connectors and Google Sheets sync."
    },
    {
      question: "What is the 24-hour messaging window?",
      answer: "When a customer messages you first, a 24-hour window opens. During this window, you can send unlimited free-form messages (no template required) to that customer at no cost. This is called the Customer Service Window (CSW). It resets each time the customer sends a new message."
    },
  ],
  "busy-erp": [
    {
      question: "What is Busy Accounting WhatsApp Integration?",
      answer: "Our Busy ERP WhatsApp integration automates business communication directly from your Busy Accounting software. Features include: automatic invoice delivery, payment reminders with ledger details, outstanding balance alerts, order confirmations, and real-time account inquiry via WhatsApp. No coding required - we handle the complete setup."
    },
    {
      question: "How does automatic invoice delivery work?",
      answer: "When you generate an invoice in Busy, our integration automatically: 1) Creates a PDF invoice, 2) Sends it via WhatsApp to the customer's registered number, 3) Logs the delivery in Busy, 4) Updates the customer's communication history. Invoices can be sent immediately or scheduled for business hours."
    },
    {
      question: "Can customers check their balance via WhatsApp?",
      answer: "Yes! Customers can message your business WhatsApp number with keywords like 'Balance', 'Outstanding', or 'Statement'. Our AI chatbot queries Busy in real-time and responds with: current outstanding, due date, recent transactions, and payment link. This reduces manual inquiry calls by 70-80%."
    },
    {
      question: "How do payment reminders work with Busy ERP?",
      answer: "Our integration sends automated payment reminders based on Busy ledger data. Configure: reminder timing (7 days before due, on due date, overdue), escalation rules, personalized messages with outstanding details, and payment links (integrated with Razorpay/PayU). Reminders are logged back to Busy for audit trail."
    },
    {
      question: "Does this work with Busy Single User and Multi-User editions?",
      answer: "Yes, our integration works with all Busy editions: Busy Basic (Single User), Busy Standard (Multi-User), Busy Enterprise, and Busy Cloud. The integration connects via Busy API (Enterprise/Cloud) or database connection (Standard). Setup requirements vary slightly by edition."
    },
    {
      question: "How long does Busy ERP integration take?",
      answer: "Standard integration takes 2-3 business days: Day 1 - WhatsApp Business setup and verification, Day 2 - Busy database connection and template creation, Day 3 - Testing and go-live. For complex setups with custom workflows, allow 5-7 days. We provide complete training and documentation."
    },
    {
      question: "Can I customize the message templates for Busy integration?",
      answer: "Absolutely. All message templates are customizable. Define: invoice message format, payment reminder text, balance inquiry response, and promotional broadcasts. Use variables like {customer_name}, {invoice_number}, {amount}, {due_date}. Our design team can help create branded templates."
    },
    {
      question: "What happens if a customer doesn't have WhatsApp?",
      answer: "Our system tracks delivery status. If WhatsApp delivery fails (no WhatsApp, invalid number, blocked), we can fallback to SMS or email based on your configuration. The Busy integration logs all attempts and final delivery status for each communication."
    },
    {
      question: "Can I send promotional offers to my Busy customer database?",
      answer: "Yes, use your Busy customer database for marketing campaigns. Import customers by group, outstanding amount, last transaction date, or custom filters. Ensure compliance: customers must opt-in for marketing messages, include opt-out instructions, and respect WhatsApp's frequency caps."
    },
  ],
  "compliance": [
    {
      question: "Is WhatsApp Business API compliant with India's DPDP Act 2023?",
      answer: "No platform can make a customer's messaging programme compliant by itself. The DPDP framework has phased commencement dates. Whats91 publishes a DPDP Readiness Statement covering roles, notices, data rights, security readiness, retention, transfers, and grievances without claiming an unverified designation or India-only storage. Customers remain responsible for their lawful purpose, recipient permissions, notices, message content, and industry obligations."
    },
    {
      question: "How is customer data protected on your platform?",
      answer: "Whats91 uses safeguards appropriate to the service, such as access controls, protected network connections, logging, monitoring, backup and incident-handling processes. Exact encryption coverage, MFA scope, testing frequency, provider certifications, and assurance reports are published only after their scope and evidence are verified. Customers must also protect credentials, integrations, devices, and recipient data."
    },
    {
      question: "Do I need customer consent to send WhatsApp messages?",
      answer: "Before initiating a WhatsApp message or call, the current WhatsApp Business Messaging Policy requires the recipient's phone number or identifier and opt-in permission for the expected communication. The exact notice and legal basis also depend on message purpose and applicable law. A customer-initiated conversation can open Meta's service window, but it does not provide blanket permission for unrelated future marketing."
    },
    {
      question: "How do I handle customer opt-outs?",
      answer: "Give recipients a clear way to opt out and promptly honour every request made on or off WhatsApp. Configure suppression and automation rules for your actual workflow, keep appropriate evidence, and do not continue a message category merely because another business relationship exists. Whats91 does not treat a technical sending capability as permission to contact someone."
    },
    {
      question: "What data does WhatsApp/Meta collect?",
      answer: "Meta and WhatsApp independently process information needed to operate the WhatsApp Business Platform, which can include account, phone-number, template, message, delivery, billing, security, and usage information. The exact processing is governed by their current terms and privacy documents. Whats91 does not claim that all business data remains only on Whats91 servers."
    },
    {
      question: "Is my business data shared with third parties?",
      answer: "Customer-controlled data may be shared with Meta and providers needed to deliver, secure, support, or bill the service, with authorised integrations, or when law requires it. Whats91 does not sell customer message content. The public subprocessor register remains a noindex status page until provider names, roles, locations, and notice procedures are factually verified."
    },
    {
      question: "How long is message data retained?",
      answer: "Retention differs by data type, customer configuration, platform behavior, security needs, contracts, and legal record-keeping. Whats91 does not publish fixed periods for messages, delivery logs, analytics, or contacts until the relevant product behavior and legal requirement are verified. See the Privacy Notice and ask support about contract-specific retention."
    },
    {
      question: "Can I use WhatsApp API for political campaigns?",
      answer: "WhatsApp prohibits use for political campaigns in India. Restricted content includes: political messaging, election-related content, and government campaigning. Business categories related to political organizations are typically rejected during Meta verification. Focus on commercial business communication."
    },
  ],
  "support": [
    {
      question: "What support options are available?",
      answer: "We offer tiered support: Free tier - Email support (24-48 hour response), documentation, and community forum. Pro tier - Priority email (12-hour response), chat support, and onboarding assistance. Enterprise tier - Dedicated account manager, phone support, custom SLAs, and 2-hour response guarantee. All tiers include access to our knowledge base."
    },
    {
      question: "How do I contact customer support?",
      answer: "Multiple channels available: WhatsApp us at +91 96698 23388 (fastest for quick queries), Email support@whats91.com, Call +91 96698 23388 (Mon-Sat, 10AM-7PM IST), or use the in-dashboard chat widget. Enterprise clients have a dedicated support channel with their account manager."
    },
    {
      question: "My messages are being marked as 'Undelivered'. What should I do?",
      answer: "Common causes: 1) Invalid phone number - verify format (with country code), 2) User not on WhatsApp - check if number has WhatsApp, 3) User blocked your business - review opt-out list, 4) Template quality issues - check Meta quality rating, 5) Rate limit exceeded - verify messaging tier. Our dashboard shows specific error codes for each failed message."
    },
    {
      question: "My WhatsApp Business number is showing low quality rating. How to fix?",
      answer: "Quality ratings depend on user feedback (blocks, reports). To improve: ensure consent before marketing messages, segment audiences better, reduce message frequency, improve content relevance, and honor opt-outs quickly. Quality typically recovers in 7-30 days of good sending behavior. Contact support for a quality audit."
    },
    {
      question: "Templates are being rejected. What's wrong?",
      answer: "Common rejection reasons: 1) Marketing content in utility template, 2) Missing opt-out for promotional content, 3) Suspicious links or phone numbers, 4) Generic/spammy language, 5) Prohibited content categories. Review WhatsApp's template guidelines. Our template review tool pre-checks submissions against Meta policies."
    },
    {
      question: "How do I upgrade my messaging tier?",
      answer: "Tiers upgrade automatically when you: maintain Green quality rating, send to 50%+ of your current daily limit consistently, and have no policy violations. Meta checks every 6 hours (2026 update). To accelerate: maintain high engagement rates, minimize blocks/reports, and ensure template compliance. Contact us for manual tier upgrade requests."
    },
    {
      question: "My webhook is not receiving messages. How to debug?",
      answer: "Check: 1) Webhook URL is publicly accessible (not localhost), 2) HTTPS with valid SSL certificate, 3) Server returns 200 OK within 20 seconds, 4) Webhook is subscribed to correct events in Meta dashboard, 5) Verify token matches. Our developer tools include webhook testing and debug logs. Contact support for detailed troubleshooting."
    },
    {
      question: "How long does template approval take?",
      answer: "Template approval times vary by category: Utility templates - often instant to 2 hours, Authentication templates - 2-6 hours, Marketing templates - 24-48 hours, Service templates - not required (free-form in 24h window). Rejected templates show specific reasons. Resubmission after correction typically takes half the original time."
    },
  ],
};
