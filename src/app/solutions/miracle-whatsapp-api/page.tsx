import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck,
  FileJson,
  FileText,
  KeyRound,
  LayoutTemplate,
  MonitorCog,
  Paperclip,
  Phone,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  TableProperties,
  TestTube2,
  TriangleAlert,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

const pagePath = "/solutions/miracle-whatsapp-api";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Miracle Accounting Software WhatsApp API Integration | Whats91";
const seoDescription =
  "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.";
const openGraphTitle = "Miracle Accounting Software WhatsApp API Integration";
const openGraphDescription =
  "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.";
const twitterTitle = "Miracle Accounting Software WhatsApp API Integration";
const twitterDescription =
  "Send invoices, challans, builty PDFs, ledger statements, and payment reminders from Miracle through Whats91 Cloud API without QR login.";

const baseMetadata = generatePageMetadata({
  title: seoTitle,
  description: seoDescription,
  keywords: [
    "Miracle WhatsApp API",
    "Miracle Accounting Software WhatsApp Integration",
    "Miracle Web API",
    "Miracle API",
    "Miracle Accounting API",
    "Miracle ERP API",
    "Miracle Integration API",
    "Miracle Accounting Software WhatsApp API",
    "Miracle Invoice WhatsApp",
    "Miracle PDF WhatsApp",
    "Miracle Payment Reminder Automation",
    "Miracle Accounting WhatsApp Cloud API",
    "Miracle WhatsApp Software",
    "Miracle Accounting WhatsApp Integration",
    "Miracle GST Software WhatsApp API Provider",
    "How to setup WhatsApp in Miracle Software",
    "Send invoice from Miracle on WhatsApp",
    "Send outstanding reminder on WhatsApp Miracle",
    "WhatsApp API for Miracle Accounting",
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
        alt: openGraphTitle,
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

const samplePayload = `{
  "template_name": "builty",
  "country_code": "91",
  "send_to": "<<129:Party Mobile No.-1>>",
  "media_url_type": "base64",
  "base64": "<<288:Attachment Base64>>",
  "file_name": "<<287:Attachment File Name>>",
  "auth_token": "YOUR_WHATS91_API_TOKEN"
}`;

const extendedPayload = `{
  "auth_token": "YOUR_WHATS91_API_TOKEN",
  "template_id": "YOUR_TEMPLATE_ID_OR_NAME",
  "country_code": "91",
  "sender_id": "YOUR_WHATSAPP_PHONE_NUMBER_ID",
  "send_to": "<<129:Party Mobile No.-1>>",
  "template_argument1": "<<083:Party Name>>",
  "template_argument2": "<<114:Bill No>>",
  "template_argument3": "<<105:Bill Amount>>",
  "template_argument4": "<<104:Bill Date>>",
  "media_url_type": "base64",
  "base64": "<<288:Attachment Base64>>",
  "file_name": "<<287:Attachment File Name>>"
}`;

const useCases = [
  {
    icon: FileText,
    title: "Invoice Delivery",
    description: "Send sales invoices and GST documents from Miracle to customers on WhatsApp with PDF attachments.",
  },
  {
    icon: Paperclip,
    title: "Builty and Challan PDFs",
    description: "Attach Simple Challan, full-page invoices, e-way bill copies, and transport documents using Miracle Base64 fields.",
  },
  {
    icon: RefreshCw,
    title: "Outstanding Reminders",
    description: "Use approved utility templates for payment reminders, balance follow-ups, and account statement nudges.",
  },
  {
    icon: FileCheck,
    title: "Receipts and Statements",
    description: "Confirm payments, share ledger statements, and reduce manual accounting calls from regular parties.",
  },
];

const implementationSteps = [
  {
    step: "01",
    icon: LayoutTemplate,
    title: "Create the WhatsApp template",
    description:
      "Create and approve the required WhatsApp utility template in Whats91 or Meta. Keep variables aligned with Miracle fields such as party name, bill number, amount, and bill date.",
  },
  {
    step: "02",
    icon: KeyRound,
    title: "Generate a Whats91 API token",
    description:
      "Create a Whats91 API token for the Miracle integration. Do not paste a live token into website content, screenshots, or public documents. Use YOUR_WHATS91_API_TOKEN as the setup placeholder.",
  },
  {
    step: "03",
    icon: MonitorCog,
    title: "Add Miracle Web API profile",
    description:
      "In Miracle, add a WhatsApp Web API profile and set the POST URL to https://graph.whats91.com/api/custom/miracle/send-template.",
  },
  {
    step: "04",
    icon: FileJson,
    title: "Paste the JSON message body",
    description:
      "Set Profile Type to Web, select WhatsApp as the format, and paste the JSON body with Miracle placeholders for mobile number, attachment Base64, and file name.",
  },
  {
    step: "05",
    icon: Paperclip,
    title: "Enable PDF attachment logging",
    description:
      "Select the required attachment format, choose PDF as file type, use Log With Attachment, and save the format for invoice or challan sending.",
  },
  {
    step: "06",
    icon: TestTube2,
    title: "Send a test document",
    description:
      "Send a test invoice or builty to a controlled number, confirm template delivery, validate the attached PDF, and review Whats91 logs for request or template errors.",
  },
];

const fieldRows = [
  {
    field: "auth_token",
    required: "Required",
    aliases: "authToken, token",
    notes: "Whats91 API token. Keep it in Miracle configuration only and rotate exposed tokens.",
  },
  {
    field: "template_id",
    required: "Required",
    aliases: "template_name, templateName",
    notes: "Use the Whats91 template ID, Meta template ID, or approved template name such as builty.",
  },
  {
    field: "country_code",
    required: "Required",
    aliases: "-",
    notes: "Use 91 for India unless the recipient is in another country.",
  },
  {
    field: "send_to",
    required: "Required",
    aliases: "mobile, receiver, phone",
    notes: "Recipient mobile field from Miracle. The message is sent to this value, not the log-only mobile field.",
  },
  {
    field: "sender_id",
    required: "Recommended",
    aliases: "senderId, sender",
    notes: "WhatsApp sender or phone number ID when your account uses multiple senders.",
  },
  {
    field: "template_argument1...",
    required: "As needed",
    aliases: "-",
    notes: "Use one field per approved template variable for party name, bill number, amount, date, and company name.",
  },
  {
    field: "media_url_type",
    required: "For attachments",
    aliases: "-",
    notes: "Use base64 for Miracle PDF attachment fields or url when using a public document link.",
  },
  {
    field: "base64 / file_name",
    required: "For Base64 PDFs",
    aliases: "fileName, filename",
    notes: "Use Miracle attachment placeholders such as <<288:Attachment Base64>> and <<287:Attachment File Name>>.",
  },
];

const troubleshootingRows = [
  {
    issue: "MIRACLE_MISSING_AUTH_TOKEN",
    cause: "Token key is missing or named incorrectly.",
    fix: "Add auth_token in the JSON body or Miracle key-value profile. authToken and token are accepted aliases.",
  },
  {
    issue: "MIRACLE_MISSING_TEMPLATE_ID",
    cause: "No template_id or template_name was sent.",
    fix: "Send the approved Whats91 template ID, Meta template ID, or approved template name.",
  },
  {
    issue: "MIRACLE_TEMPLATE_NOT_FOUND",
    cause: "Template value does not match an approved template.",
    fix: "Check spelling, language, category, approval status, and account ownership in Whats91.",
  },
  {
    issue: "MIRACLE_MISSING_SEND_TO",
    cause: "Recipient mobile number is blank after Miracle field substitution.",
    fix: "Map send_to to the correct party mobile field and test with a party that has a valid number.",
  },
  {
    issue: "MIRACLE_INVALID_PHONE",
    cause: "Recipient mobile has spaces, invalid digits, or wrong country code.",
    fix: "Use country_code 91 and keep send_to as the 10-digit Indian mobile number where possible.",
  },
  {
    issue: "MIRACLE_INVALID_BASE64",
    cause: "Attachment Base64 is empty, truncated, or not a PDF payload.",
    fix: "Select PDF file type and Log With Attachment in Miracle, then retry with a generated document.",
  },
  {
    issue: "MIRACLE_MISSING_FILE_NAME",
    cause: "A Base64 attachment was sent without a file name.",
    fix: "Add file_name with Miracle's attachment file-name placeholder.",
  },
  {
    issue: "MIRACLE_SEND_FAILED",
    cause: "WhatsApp delivery failed after request validation.",
    fix: "Review Whats91 logs for template status, sender health, phone quality, and recipient eligibility.",
  },
];

const apiComparisonRows = [
  {
    feature: "QR Login",
    web: "Requires a phone-linked WhatsApp Web session and QR login.",
    cloud: "Uses an official Cloud API sender connected through Whats91.",
  },
  {
    feature: "Official API",
    web: "Not an official business API delivery path.",
    cloud: "Uses WhatsApp Cloud API through the Meta Business Platform.",
  },
  {
    feature: "PDF Attachments",
    web: "Depends on browser session stability and manual sending behavior.",
    cloud: "Supports template messages with Base64 PDF attachments from Miracle fields.",
  },
  {
    feature: "Template Messaging",
    web: "Works like a user chat session and does not use approved utility templates.",
    cloud: "Uses approved WhatsApp templates for invoices, reminders, statements, and documents.",
  },
  {
    feature: "Multi User Access",
    web: "Limited by the active device/session and operational access controls.",
    cloud: "Can be managed by teams in Whats91 with sender-level configuration and logs.",
  },
  {
    feature: "Audit Logs",
    web: "Usually limited to what the desktop/session can show.",
    cloud: "Whats91 can track request validation, template response, attachment status, and delivery outcome.",
  },
  {
    feature: "Delivery Tracking",
    web: "Message tracking depends on visible WhatsApp status.",
    cloud: "Delivery events can be tracked through Cloud API webhooks and Whats91 logs.",
  },
  {
    feature: "Automation",
    web: "Hard to run reliably for recurring accounting workflows.",
    cloud: "Built for API-triggered invoice, challan, ledger, and payment reminder workflows.",
  },
  {
    feature: "ERP Integration",
    web: "ERP output must depend on a browser-like sending layer.",
    cloud: "Miracle sends a structured API request to Whats91 for ERP-to-WhatsApp delivery.",
  },
  {
    feature: "Scalability",
    web: "Session interruptions and device limits reduce scale.",
    cloud: "Cloud API delivery is better suited for high-volume accounting document sending.",
  },
  {
    feature: "Business Verification",
    web: "Does not depend on Meta business verification for API sender trust.",
    cloud: "Uses the Meta Business Platform, sender setup, templates, and business account controls.",
  },
  {
    feature: "Reliability",
    web: "Can fail when the browser logs out, phone disconnects, or session changes.",
    cloud: "Does not depend on QR login and gives clearer API-level error handling.",
  },
];

const industryUseCases = [
  {
    title: "Textile Businesses",
    content:
      "Textile traders use Miracle Accounting Software for sales bills, transport documents, outstanding balances, and party-wise account follow-up. WhatsApp automation helps them send invoice PDFs, builty PDFs, challans, and ledger statements directly to buyers, brokers, and transport contacts. A common workflow starts when a sales invoice or dispatch document is generated in Miracle. The Miracle Web API profile sends the document fields and PDF attachment to Whats91, and Whats91 delivers the approved WhatsApp template with the attached document. This reduces calls asking for bill copies, transport details, and pending balance information. Textile businesses also benefit from payment reminder automation because buyers often purchase on credit and need regular follow-up by bill number, due date, party name, and amount. The API flow keeps the document tied to the accounting transaction instead of depending on staff to download and forward PDFs manually. It also helps owners standardize communication across counters, branches, dispatch desks, and account teams without changing how billing staff already work inside Miracle.",
  },
  {
    title: "Ceramic Industry",
    content:
      "Ceramic manufacturers and distributors often manage high document volume across dealers, transporters, and project buyers. Miracle WhatsApp automation can send tax invoices, dispatch challans, lorry receipts, e-way bill references, and payment reminders as soon as the accounting or dispatch record is ready. The customer receives the PDF on WhatsApp in a familiar format, while the business keeps a more consistent audit trail through Whats91 logs. Ceramic workflows also involve frequent status questions about material dispatch, order confirmation, and balance due. By using WhatsApp templates and Miracle field placeholders, teams can send structured messages that include invoice number, truck details, amount, date, and branch information. For businesses with multiple counters or companies in Miracle, the official WhatsApp Cloud API route is more reliable than one staff member maintaining a WhatsApp Web session. It also supports cleaner dealer communication when one buyer receives documents for multiple projects, sites, or transport lots during the same billing cycle.",
  },
  {
    title: "FMCG Distributors",
    content:
      "FMCG distributors need fast communication with retailers, stockists, sales teams, and delivery staff. Miracle Accounting Software holds invoices, credit notes, outstanding amounts, route-wise party information, and payment history. Whats91 can turn those records into WhatsApp messages for invoice delivery, order confirmation, ledger sharing, and payment reminders. A retailer can receive the sales invoice PDF immediately after billing, and the distributor can follow up later with approved reminder templates. This matters because FMCG teams handle many small-value transactions where manual PDF forwarding wastes time. WhatsApp Cloud API delivery also helps avoid missed messages when staff phones change, WhatsApp Web sessions expire, or multiple users need access. For recurring customer communication, the Miracle API request gives Whats91 the structured fields needed for clean template delivery and document attachment. Route supervisors can also use the same document trail to resolve disputes about delivered goods, billed quantities, credit notes, and pending payments.",
  },
  {
    title: "Manufacturers",
    content:
      "Manufacturers use Miracle for invoices, dispatch records, purchase and sales accounting, ledgers, receipts, and customer balances. WhatsApp automation is useful when production, dispatch, accounts, and sales teams need to communicate with customers from the same accounting source. A finished goods invoice can trigger a Whats91 template with the PDF invoice attached. A challan or transport document can be sent to the buyer or consignee. A ledger statement can be shared before payment follow-up. The workflow is API-driven, so staff do not need to export a PDF, open WhatsApp Web, find the customer, and attach the file manually. Manufacturers also benefit from error handling because failed messages can be checked in Whats91 logs by template, phone number, attachment, or sender status. This creates a more dependable document delivery layer for accounting and dispatch operations. It is especially useful where dispatch timing, goods movement, and payment follow-up must stay aligned across multiple departments.",
  },
  {
    title: "Wholesalers",
    content:
      "Wholesalers manage repeat parties, high invoice counts, daily dispatches, and frequent outstanding follow-up. Miracle WhatsApp API integration lets them send invoices, statements, payment receipts, challans, and reminders directly from accounting workflows. When billing is completed in Miracle, the API request can include party mobile number, bill number, amount, date, PDF Base64, and file name. Whats91 validates the request and sends the approved message through WhatsApp Cloud API. This helps wholesalers maintain faster customer communication without giving every staff member access to a shared WhatsApp Web session. The same setup can support reminder templates for overdue bills and statement sharing for customers who ask for account reconciliation. It is especially useful when a business has many parties and needs consistent document delivery throughout the day. Owners can also monitor whether document sending failures are caused by missing mobile numbers, invalid templates, attachment issues, or customer-side delivery limits. This creates a cleaner process for daily billing teams.",
  },
  {
    title: "Commission Agents",
    content:
      "Commission agents often send account summaries, invoices, receipts, settlement details, challans, and party-wise statements to principals, buyers, and sellers. Miracle Accounting Software stores those documents and values, while Whats91 handles the WhatsApp delivery layer. With a Miracle Web API profile, the agent can trigger a structured POST request containing the mobile number, template name, variables, and PDF attachment. The customer receives the document through an approved template instead of an informal forwarded message. This is useful when records need to be sent repeatedly and accurately, especially around settlement cycles and payment follow-up. Commission agents also benefit from template consistency because every message can include the correct party name, document number, date, and amount. The official API path reduces dependency on an individual staff phone and improves traceability for outgoing communication. It also helps teams keep buyer, seller, and principal communication separate while using the same accounting data source.",
  },
  {
    title: "Petrol Pumps",
    content:
      "Petrol pumps and fuel distributors use Miracle for credit sales, bills, receipts, ledger statements, and customer balances. Many customers ask for bill copies, monthly statements, and payment status on WhatsApp. Miracle WhatsApp automation can send GST invoices, account statements, and payment reminders to fleet customers, companies, and regular credit parties. A common workflow is monthly statement delivery, where the accounting team generates the statement in Miracle and sends it through Whats91 with an approved utility template. Payment reminders can include balance amount, due date, party name, and a PDF statement if required. Because fuel businesses often operate with shifts and multiple staff members, an API-based sender is more reliable than WhatsApp Web tied to one browser session. Whats91 logs also help the business confirm whether a message request was accepted and delivered. This makes customer follow-up more consistent for fleet operators, contractors, and credit customers with recurring monthly billing.",
  },
  {
    title: "Pharmaceutical Distributors",
    content:
      "Pharmaceutical distributors need accurate and timely document communication for retailers, hospitals, clinics, and stockists. Miracle Accounting Software can generate GST invoices, credit notes, delivery challans, ledger statements, and outstanding reminders. Whats91 connects those records to WhatsApp Cloud API delivery so the buyer receives approved template messages and PDF documents without manual forwarding. This is useful for daily invoice volume, credit control, dispatch communication, and account reconciliation. The API request can carry the party mobile field, invoice details, amount, date, and Base64 PDF attachment from Miracle. Whats91 then validates the template and sends the message through the configured WhatsApp sender. For pharma teams, reliability matters because document errors can affect payment cycles and customer service. A structured Miracle WhatsApp API workflow gives the accounts team a repeatable process with delivery logs and clearer failure reasons. It also supports cleaner communication with hospitals and retailers that need invoice copies quickly for internal purchase records.",
  },
];

const miracleWorkflowSteps = [
  "Miracle invoice generated",
  "Miracle Web API trigger",
  "Whats91 endpoint receives JSON",
  "Template validation",
  "Base64 PDF attachment check",
  "WhatsApp Cloud API delivery",
  "Customer receives PDF on WhatsApp",
];

const faqs = [
  {
    question: "What is Miracle WhatsApp API integration?",
    answer:
      "Miracle WhatsApp API integration connects Miracle Accounting Software with Whats91 so businesses can send approved WhatsApp template messages, invoices, challans, builty PDFs, payment reminders, and account statements directly from Miracle workflows.",
  },
  {
    question: "Does Miracle require a custom Whats91 endpoint?",
    answer:
      "Yes. Miracle's WhatsApp Web API format works best with the Whats91 custom Miracle endpoint because it accepts Miracle-style JSON fields, aliases, template arguments, and Base64 PDF attachments.",
  },
  {
    question: "Can I send PDF invoices from Miracle on WhatsApp?",
    answer:
      "Yes. Use media_url_type as base64, map base64 to Miracle's attachment Base64 field, and map file_name to Miracle's attachment file-name field. Select PDF and Log With Attachment in Miracle.",
  },
  {
    question: "Should the Whats91 token be sent as a header?",
    answer:
      "For this Miracle custom endpoint, place the token in the auth_token field in the JSON body or Miracle key-value profile. Do not publish a live token in screenshots, pages, or public documentation.",
  },
  {
    question: "Can I use template_name instead of template_id?",
    answer:
      "Yes. The endpoint supports template_id as the primary field and accepts template_name or templateName as aliases when they match an approved Whats91 or Meta template.",
  },
  {
    question: "Which Miracle fields decide the WhatsApp recipient?",
    answer:
      "The send_to value decides the actual recipient. The Mobile No. field in Miracle may be used for logs in Web profile mode, so the JSON body should still include the correct send_to placeholder.",
  },
  {
    question: "Is this a replacement for WhatsApp Web QR sending?",
    answer:
      "Yes. This setup uses the official WhatsApp Cloud API path through Whats91 instead of relying on a browser session or QR-based WhatsApp Web sending.",
  },
  {
    question: "Which businesses use Miracle WhatsApp Software workflows?",
    answer:
      "Miracle WhatsApp Software workflows are common for distributors, textile traders, commission agents, manufacturers, petrol pumps, ceramic businesses, wholesalers, and accounting teams that send high volumes of invoices and reminders.",
  },
  {
    question: "What is Miracle Web API?",
    answer:
      "Miracle Web API is the external API configuration path that allows Miracle Accounting Software to send structured HTTP requests to another system. In this page, Miracle Web API is used to send template fields, recipient numbers, and PDF attachment data from Miracle to Whats91.",
  },
  {
    question: "How does Miracle WhatsApp API integration work?",
    answer:
      "Miracle WhatsApp API integration works by sending a JSON request from Miracle to the Whats91 custom Miracle endpoint. Whats91 validates the token, template, recipient number, variables, and attachment, then sends the approved template message through WhatsApp Cloud API.",
  },
  {
    question: "Can Miracle send PDF invoices to WhatsApp?",
    answer:
      "Yes. Miracle can send PDF invoices to WhatsApp when the PDF is passed as a Base64 attachment field and the request includes media_url_type as base64, a file_name value, a recipient number, an approved template, and a valid Whats91 token.",
  },
  {
    question: "Can Miracle send GST invoices through WhatsApp?",
    answer:
      "Yes. GST invoice PDFs generated from Miracle can be sent through WhatsApp using Whats91 templates and PDF attachment mapping. The template text can include bill number, party name, amount, date, and other approved variables.",
  },
  {
    question: "Does Miracle support Base64 PDF attachments?",
    answer:
      "Yes. Miracle can provide attachment data through a Base64 field when PDF output and Log With Attachment are enabled. Whats91 accepts that value through the base64 field and sends the file as a WhatsApp document attachment.",
  },
  {
    question: "Can Miracle send payment reminders automatically?",
    answer:
      "Yes. Miracle can trigger payment reminder messages when the required party mobile number, amount, due information, and approved reminder template fields are available. Whats91 can also connect reminders with broader payment reminder automation workflows.",
  },
  {
    question: "Can Miracle connect to WhatsApp Cloud API?",
    answer:
      "Yes. Miracle connects to WhatsApp Cloud API through Whats91. Miracle sends the API request to Whats91, and Whats91 handles template validation, sender configuration, Cloud API delivery, logs, and errors.",
  },
  {
    question: "Can Miracle send ledger statements through WhatsApp?",
    answer:
      "Yes. Miracle can send ledger statements through WhatsApp when the statement PDF or relevant account fields are mapped into the Whats91 JSON request and delivered with an approved WhatsApp utility template.",
  },
  {
    question: "Can Miracle send challans and builty PDFs?",
    answer:
      "Yes. Miracle can send challans, builty PDFs, transport documents, and other accounting attachments when the PDF is mapped to the Base64 field and the file name is included in the request.",
  },
  {
    question: "Can Miracle automate customer communication?",
    answer:
      "Yes. Miracle can automate customer communication for invoices, GST bills, challans, builty documents, ledgers, payment receipts, statements, reminders, and other accounting messages by sending structured API requests to Whats91.",
  },
  {
    question: "Does Miracle require WhatsApp Web QR login?",
    answer:
      "No. The Whats91 Miracle integration uses the official WhatsApp Cloud API route and does not require QR login or a browser-based WhatsApp Web session for message delivery.",
  },
  {
    question: "Can Miracle use official WhatsApp Cloud API?",
    answer:
      "Yes. Miracle can use official WhatsApp Cloud API through Whats91. Whats91 receives the Miracle API request and sends the message through the configured Meta Business Platform sender.",
  },
  {
    question: "Which industries use Miracle WhatsApp automation?",
    answer:
      "Miracle WhatsApp automation is used by textile businesses, ceramic businesses, FMCG distributors, manufacturers, wholesalers, commission agents, petrol pumps, pharmaceutical distributors, and other accounting-heavy businesses.",
  },
  {
    question: "How do I configure Miracle Web API for WhatsApp?",
    answer:
      "Create an approved WhatsApp template, generate a Whats91 token, add a Miracle Web API profile, set the POST URL to the Whats91 custom Miracle endpoint, paste the JSON payload, map recipient and attachment fields, enable PDF attachments, and send a test message.",
  },
  {
    question: "Can Miracle work with approved WhatsApp templates?",
    answer:
      "Yes. Miracle can work with approved WhatsApp templates by sending the template name or template ID and the required template variables to Whats91. Whats91 validates the template before sending it through WhatsApp Cloud API.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${pageUrl}#software-application`,
  name: "Miracle WhatsApp API Integration",
  description:
    "Whats91 integration for connecting Miracle Accounting Software and Miracle Web API workflows to WhatsApp Cloud API for invoice PDFs, GST bills, challans, builty documents, ledgers, and payment reminders.",
  url: pageUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp Cloud API",
  publisher: {
    "@type": "Organization",
    name: siteConfig.publisher,
    url: siteConfig.url,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: `${siteConfig.url}/contact?source=miracle-whatsapp-api-schema`,
  },
  featureList: [
    "Miracle Web API endpoint configuration",
    "Approved WhatsApp template delivery",
    "Miracle invoice PDF delivery",
    "GST invoice and challan WhatsApp sending",
    "Base64 PDF attachment support",
    "Ledger statement delivery",
    "Payment reminder automation",
    "WhatsApp Cloud API delivery logs",
    "ERP document workflow integration",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${pageUrl}#how-to-connect-miracle-accounting-software-to-whatsapp`,
  name: "How to Connect Miracle Accounting Software to WhatsApp",
  description:
    "Configure Miracle Accounting Software with Whats91 by creating a template, generating a token, configuring Miracle API, adding a JSON payload, enabling attachments, and sending a test message.",
  totalTime: "PT20M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Miracle Accounting Software",
    },
    {
      "@type": "HowToTool",
      name: "Whats91",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Create template",
      text: "Create and approve the required WhatsApp utility template for invoice, challan, ledger, builty, or payment reminder communication.",
      url: `${pageUrl}#how-to-implement`,
    },
    {
      "@type": "HowToStep",
      name: "Generate token",
      text: "Generate a Whats91 API token for the Miracle integration and keep it private inside the Miracle configuration.",
      url: `${pageUrl}#how-to-implement`,
    },
    {
      "@type": "HowToStep",
      name: "Configure Miracle API",
      text: "Create a Miracle WhatsApp Web API profile and set the POST URL to the Whats91 custom Miracle endpoint.",
      url: `${pageUrl}#how-to-implement`,
    },
    {
      "@type": "HowToStep",
      name: "Add JSON payload",
      text: "Paste the JSON body with auth_token, template name or ID, country code, send_to, template variables, and Miracle field placeholders.",
      url: `${pageUrl}#how-to-implement`,
    },
    {
      "@type": "HowToStep",
      name: "Enable attachments",
      text: "Enable PDF attachment output in Miracle and map Base64 and file-name placeholders into the Whats91 request.",
      url: `${pageUrl}#how-to-implement`,
    },
    {
      "@type": "HowToStep",
      name: "Send test message",
      text: "Send a controlled test invoice or builty PDF, confirm WhatsApp delivery, and review Whats91 logs for validation or delivery errors.",
      url: `${pageUrl}#how-to-implement`,
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}#techarticle`,
  headline: "Miracle WhatsApp API and Web API Integration Guide",
  description:
    "Technical implementation guidance for connecting Miracle Accounting Software, Miracle Web API requests, Whats91 endpoint validation, Base64 PDF attachments, and WhatsApp Cloud API delivery.",
  url: pageUrl,
  inLanguage: "en-IN",
  dateModified: "2026-05-29",
  author: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.publisher,
    url: siteConfig.url,
  },
  about: [
    "Miracle WhatsApp API",
    "Miracle Web API",
    "Miracle Accounting Software WhatsApp Integration",
    "WhatsApp Cloud API",
    "Base64 PDF attachments",
    "ERP integration",
    "Accounting automation",
  ],
  proficiencyLevel: "Intermediate",
  dependencies: "Miracle Accounting Software, Whats91 API token, approved WhatsApp templates, WhatsApp Cloud API sender",
};

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Miracle Accounting Software WhatsApp API Integration",
    description:
      "Guide and implementation page for connecting Miracle Accounting Software with Whats91 WhatsApp API for invoices, challans, builty PDFs, reminders, and statements.",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: [
      { "@type": "Thing", name: "Miracle WhatsApp API" },
      { "@type": "Thing", name: "Miracle Web API" },
      { "@type": "Thing", name: "Miracle Accounting API" },
      { "@type": "Thing", name: "Miracle ERP API" },
      { "@type": "Thing", name: "Miracle WhatsApp Software" },
      { "@type": "Thing", name: "Miracle Accounting Software" },
      { "@type": "Thing", name: "WhatsApp Cloud API" },
      { "@type": "Thing", name: "Meta Business Platform" },
      { "@type": "Thing", name: "ERP Integration" },
      { "@type": "Thing", name: "Accounting Automation" },
      { "@type": "Thing", name: "Invoice Automation" },
      { "@type": "Thing", name: "Payment Reminder Automation" },
      { "@type": "Thing", name: "PDF Document Delivery" },
      { "@type": "Thing", name: "Business Messaging" },
    ],
    mentions: [
      { "@type": "WebPage", name: "WhatsApp Templates", url: `${siteConfig.url}/whatsapp-templates` },
      { "@type": "WebPage", name: "Flow Builder", url: `${siteConfig.url}/flow-builder` },
      { "@type": "Service", name: "Payment Reminder Automation", url: `${siteConfig.url}/solutions/payment-reminders` },
      { "@type": "Service", name: "Busy ERP WhatsApp Integration", url: `${siteConfig.url}/solutions/busy-erp` },
    ],
    mainEntity: {
      "@id": `${pageUrl}#service`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["main h1", "#miracle-answer", "#how-to-implement"],
    },
  },
  softwareApplicationSchema,
  {
    ...generateServiceSchema({
      name: "Miracle WhatsApp API Integration",
      description:
        "Whats91 implementation service for sending Miracle Accounting invoices, builty PDFs, challans, statements, and payment reminders through WhatsApp Cloud API.",
      url: pageUrl,
      provider: "Whats91",
      areaServed: "India",
    }),
    "@id": `${pageUrl}#service`,
    serviceType: "Miracle Accounting WhatsApp API Integration",
  },
  howToSchema,
  techArticleSchema,
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Miracle WhatsApp API", url: pagePath },
  ]),
];

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function MiracleSetupVisual() {
  return (
    <div className="min-w-0 space-y-5">
      <p className="rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-3 py-2 text-xs leading-relaxed text-text-secondary">
        <span className="font-semibold text-text-primary">Note:</span> Miracle may call this profile "WhatsApp Web API", but Whats91 delivery uses the official WhatsApp Cloud API and does not require QR login.
      </p>

      <figure className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-xl">
        <div className="border-b border-border/60 bg-surface px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Setup Screenshot 1</p>
          <figcaption className="mt-1 text-sm font-semibold text-text-primary">
            Add WhatsApp Web API Profile in Miracle
          </figcaption>
        </div>
        <div className="bg-[#f7f1f8] p-3">
          <Image
            src="/solutions/miracle/miracle-web-api-profile.png"
            alt="Miracle Add WhatsApp Web API Profile screen configured with the Whats91 custom Miracle endpoint"
            width={647}
            height={394}
            className="h-auto w-full rounded-lg border border-border/60 bg-white"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-xl">
        <div className="border-b border-border/60 bg-surface px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Setup Screenshot 2</p>
          <figcaption className="mt-1 text-sm font-semibold text-text-primary">
            Paste JSON Body and Enable PDF Attachment Logging
          </figcaption>
        </div>
        <div className="bg-[#f7f1f8] p-3">
          <Image
            src="/solutions/miracle/miracle-format-config.png"
            alt="Miracle WhatsApp Telegram Format screen showing JSON message body and PDF attachment settings"
            width={614}
            height={408}
            className="h-auto w-full rounded-lg border border-border/60 bg-white"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </figure>

      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
        These are the actual Miracle setup screenshots with the credential text masked for public serving. Rotate any token that appears in shared setup material.
      </p>
    </div>
  );
}

function MiracleDeliveryAnimation() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white p-4 shadow-xl sm:p-5">
      <style>{`
        @keyframes miracle-doc-glow {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 24px rgba(68, 140, 116, 0.10); }
          50% { transform: translateY(-4px) scale(1.02); box-shadow: 0 18px 36px rgba(68, 140, 116, 0.22); }
        }
        @keyframes miracle-packet-travel {
          0% { transform: translateX(-34px) scale(0.78); opacity: 0; }
          14% { opacity: 1; }
          70% { transform: translateX(calc(100% - 8px)) scale(1); opacity: 1; }
          100% { transform: translateX(calc(100% + 30px)) scale(0.82); opacity: 0; }
        }
        @keyframes miracle-packet-travel-alt {
          0%, 22% { transform: translateX(-34px) scale(0.72); opacity: 0; }
          34% { opacity: 1; }
          82% { transform: translateX(calc(100% - 4px)) scale(0.95); opacity: 1; }
          100% { transform: translateX(calc(100% + 30px)) scale(0.8); opacity: 0; }
        }
        @keyframes miracle-bubble-live {
          0%, 100% { transform: translateY(8px) scale(0.97); opacity: 0.58; }
          35%, 75% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes miracle-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.48; }
          50% { transform: scale(1.18); opacity: 0.16; }
        }
        @keyframes miracle-lane-flow {
          from { background-position: 0 0; }
          to { background-position: 36px 0; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(68,140,116,0.16),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.12),transparent_26%)]" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Visual live delivery</p>
            <h3 className="mt-1 text-lg font-semibold text-text-primary">Miracle Software to WhatsApp</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-brand-primary/15 bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Live
          </div>
        </div>

        <div className="grid min-h-[310px] grid-cols-[minmax(0,1fr)_58px_minmax(0,0.72fr)] items-center gap-2 sm:min-h-[340px] sm:grid-cols-[minmax(0,1fr)_84px_minmax(0,0.78fr)] sm:gap-4">
          <div className="min-w-0 rounded-2xl border border-border/70 bg-white/95 p-3 shadow-lg">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-surface">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-[#ead8ef] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                <span className="ml-2 truncate text-[10px] font-semibold text-text-primary sm:text-xs">Miracle Accounting</span>
              </div>
              <div className="space-y-3 bg-white p-3">
                <div className="rounded-lg bg-[#ef1b24] p-2">
                  <Image
                    src="/solutions/miracle/miracle-logo.png"
                    alt="Miracle Accounting Software logo"
                    width={342}
                    height={147}
                    className="h-auto w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="h-2 rounded-full bg-border/80" />
                  <div className="h-2 w-4/5 rounded-full bg-border/70" />
                  <div className="h-2 w-2/3 rounded-full bg-border/60" />
                </div>
                <div
                  className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-3"
                  style={{ animation: "miracle-doc-glow 3.2s ease-in-out infinite" }}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-primary shadow-sm">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">Invoice PDF</p>
                        <p className="text-[10px] text-text-muted">Generated</p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="grid gap-1.5">
                    <div className="h-1.5 rounded-full bg-brand-primary/25" />
                    <div className="h-1.5 w-3/4 rounded-full bg-brand-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex h-full min-w-0 items-center justify-center">
            <div
              className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(68,140,116,0.18) 0 45%, transparent 45% 100%)",
                backgroundSize: "18px 4px",
                animation: "miracle-lane-flow 1.1s linear infinite",
              }}
            />
            <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-primary/15 to-transparent sm:hidden" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl shadow-brand-primary/20 sm:h-16 sm:w-16">
              <span
                className="absolute inset-0 rounded-full bg-[#25D366]"
                style={{ animation: "miracle-pulse-ring 2s ease-in-out infinite" }}
              />
              <Image
                src="/solutions/miracle/whatsapp-icon.png"
                alt="WhatsApp logo"
                width={662}
                height={664}
                className="relative h-11 w-11 object-contain sm:h-12 sm:w-12"
              />
            </div>
            <div
              className="absolute left-0 top-[38%] z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
              style={{ animation: "miracle-packet-travel 3.4s ease-in-out infinite" }}
            >
              <Send className="h-4 w-4" />
            </div>
            <div
              className="absolute left-0 top-[56%] z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-brand-primary/20 bg-white text-brand-primary shadow-md"
              style={{ animation: "miracle-packet-travel-alt 3.4s ease-in-out infinite" }}
            >
              <FileText className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="mx-auto w-full max-w-[210px] rounded-[28px] border border-border/70 bg-[#0f172a] p-2 shadow-2xl">
              <div className="overflow-hidden rounded-[22px] bg-[#eaf7ef]">
                <div className="flex items-center gap-2 bg-[#075E54] px-3 py-3 text-white">
                  <Image
                    src="/solutions/miracle/whatsapp-icon.png"
                    alt="WhatsApp logo"
                    width={662}
                    height={664}
                    className="h-8 w-8 rounded-full object-contain"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">Customer</p>
                    <p className="text-[9px] text-white/75">online</p>
                  </div>
                </div>
                <div className="space-y-2 p-3">
                  {[
                    { text: "Invoice PDF", delay: "0s", width: "w-[92%]" },
                    { text: "Builty sent", delay: "0.7s", width: "w-[78%]" },
                    { text: "Reminder", delay: "1.4s", width: "w-[86%]" },
                  ].map((bubble) => (
                    <div
                      key={bubble.text}
                      className={`ml-auto rounded-2xl rounded-br-sm bg-[#DCF8C6] px-3 py-2 text-right shadow-sm ${bubble.width}`}
                      style={{ animation: "miracle-bubble-live 3.2s ease-in-out infinite", animationDelay: bubble.delay }}
                    >
                      <p className="text-[11px] font-semibold text-text-primary">{bubble.text}</p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <span className="text-[8px] text-text-muted">sent</span>
                        <CheckCircle2 className="h-3 w-3 text-brand-primary" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-t border-white/70 bg-white/70 px-3 py-2">
                  <div className="h-2 flex-1 rounded-full bg-border" />
                  <div className="h-7 w-7 rounded-full bg-[#25D366]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {["Miracle", "Whats91", "WhatsApp"].map((label) => (
            <div key={label} className="rounded-xl border border-border/60 bg-white/80 px-2 py-2 text-[10px] font-semibold text-text-secondary shadow-sm sm:text-xs">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MiracleWhatsAppApiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schemaData} />
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-surface/80 to-background pb-14 pt-3 sm:pb-16 sm:pt-3 md:pb-20 md:pt-4 lg:pb-24 lg:pt-5">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="text-center lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/10 px-4 py-1.5 text-xs font-medium text-brand-primary sm:text-sm">
                  <Zap className="h-3.5 w-3.5" />
                  Miracle WhatsApp API
                </div>
                <h1 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                  Miracle Accounting Software WhatsApp API Integration
                </h1>
                <p className="mx-auto mb-4 max-w-xl text-base font-semibold leading-relaxed text-text-primary sm:text-lg lg:mx-0">
                  Send invoices, challans, builty PDFs, ledger statements, and payment reminders from Miracle through Whats91 Cloud API.
                </p>
                <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base lg:mx-0">
                  Whats91 gives Miracle Accounting Software users a clean POST endpoint that accepts approved template details, Miracle field placeholders, and Base64 PDF attachments without QR-based WhatsApp Web sending.
                </p>
                <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                  <Button asChild size="lg" className="h-12 rounded-xl bg-brand-primary px-7 text-base font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover">
                    <a href="tel:+919669823388" aria-label="Call +91 96698 23388 for a Miracle WhatsApp API demo">
                      Demo • +91 96698 23388
                      <Phone className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-border/80 px-7 text-base font-semibold hover:bg-surface">
                    <Link href="#how-to-implement">View Setup Steps</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {["Official Cloud API", "Base64 PDF Attachments", "No public token leaks"].map((badge) => (
                    <div key={badge} className="flex items-center gap-1.5 rounded-full border border-border/50 bg-white/80 px-3 py-1.5 text-xs text-text-muted sm:text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              <MiracleDeliveryAnimation />
            </div>
          </div>
        </section>

        <section id="miracle-answer" className="border-y border-border/40 bg-surface/50 py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-xl font-bold text-text-primary sm:text-2xl md:text-3xl">
              What is Miracle WhatsApp Software integration?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Miracle WhatsApp Software integration is the process of connecting Miracle Accounting Software with an official WhatsApp API provider so accounting teams can send transactional documents automatically. With Whats91, Miracle sends a JSON POST request to a custom endpoint, Whats91 validates the template and attachment fields, and the customer receives an approved WhatsApp template with the correct PDF document.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Use Cases"
              title="Built for Miracle Accounting Workflows"
              description="The page targets practical accounting tasks rather than generic messaging. Each workflow maps to real Miracle fields, templates, and document attachments."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border/60 bg-white p-5 shadow-md transition-all duration-300 hover:border-brand-primary/30 hover:shadow-xl">
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-to-implement" className="bg-surface/50 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How to Implement"
              title="Miracle WhatsApp API Setup Steps"
              description="Use this implementation checklist for Miracle Web API profile setup, template mapping, PDF attachment delivery, and test sending through Whats91."
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
              <div className="grid min-w-0 grid-cols-1 gap-4">
                {implementationSteps.map((item) => (
                  <article key={item.step} className="rounded-2xl border border-border/60 bg-white p-5 shadow-md">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                          Step {item.step}
                        </div>
                        <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-2 break-words text-sm leading-relaxed text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="min-w-0">
                <MiracleSetupVisual />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="JSON Payload"
              title="Safe Payload Examples for Miracle"
              description="These examples are safe to publish because they use placeholders only. Store live tokens in Miracle or Whats91 configuration, never in public content."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <Code2 className="h-4 w-4 text-brand-primary" />
                  Simple builty template with PDF attachment
                </div>
                <pre className="overflow-auto rounded-2xl border border-ink-border bg-ink-elevated p-4 text-xs leading-relaxed text-ink-text shadow-lg">
                  <code>{samplePayload}</code>
                </pre>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <TableProperties className="h-4 w-4 text-brand-primary" />
                  Extended template argument format
                </div>
                <pre className="overflow-auto rounded-2xl border border-ink-border bg-ink-elevated p-4 text-xs leading-relaxed text-ink-text shadow-lg">
                  <code>{extendedPayload}</code>
                </pre>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <h3 className="font-semibold text-amber-900">Security note for existing setup material</h3>
                  <p className="mt-1 text-sm leading-relaxed text-amber-800">
                    A live token appeared in the provided setup material. Rotate that token before production use and replace all public references with YOUR_WHATS91_API_TOKEN.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface/50 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Field Reference"
              title="Miracle Custom API Fields"
              description="The Whats91 Miracle endpoint accepts clear field names and several Miracle-friendly aliases so setup can match the fields available in your Miracle build."
            />
            <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-white shadow-lg">
              <div className="w-full max-w-full overflow-x-auto">
                <table className="w-full min-w-[820px] text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-surface">
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Field</th>
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Required</th>
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Aliases</th>
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldRows.map((row) => (
                      <tr key={row.field} className="border-b border-border/40 last:border-0">
                        <td className="px-4 py-4 font-mono text-xs font-semibold text-brand-primary">{row.field}</td>
                        <td className="px-4 py-4 font-medium text-text-primary">{row.required}</td>
                        <td className="px-4 py-4 font-mono text-xs text-text-secondary">{row.aliases}</td>
                        <td className="px-4 py-4 text-text-secondary">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Troubleshooting"
              title="Common Miracle WhatsApp API Errors"
              description="Most setup problems are caused by token placement, template mismatch, blank recipient fields, or attachment settings. Use Whats91 logs to confirm the exact error code."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              {troubleshootingRows.map((row) => (
                <article key={row.issue} className="rounded-2xl border border-border/60 bg-white p-5 shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <TriangleAlert className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-sm font-semibold text-text-primary">{row.issue}</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Cause:</span> {row.cause}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Fix:</span> {row.fix}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface/50 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Why Whats91"
              title="Official API Delivery Instead of QR-Based Sending"
              description="Miracle users often start with WhatsApp Web sending, but official API delivery is more stable for accounting documents, recurring templates, and audit-friendly communication."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Compliance-ready templates",
                  description: "Use approved utility templates for invoices, statements, dispatch updates, and payment confirmations.",
                },
                {
                  icon: Settings,
                  title: "Miracle-friendly endpoint",
                  description: "The custom endpoint accepts Miracle JSON, key aliases, Base64 PDF fields, and template arguments.",
                },
                {
                  icon: Phone,
                  title: "Works for Indian accounting teams",
                  description: "Designed for distributors, textile traders, commission agents, manufacturers, and wholesalers using Miracle.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-border/60 bg-white p-6 shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20" aria-labelledby="miracle-web-api-heading">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-md sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-primary">Technical definition</p>
              <h2 id="miracle-web-api-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                What is Miracle Web API?
              </h2>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-text-secondary sm:text-base">
                <p>
                  Miracle Web API is the external integration mechanism used by Miracle Accounting Software to send structured data from an accounting workflow to another application over HTTP. In a WhatsApp integration, Miracle Web API acts as the request source. It collects the selected accounting fields, document details, party mobile number, template values, and attachment data, then submits them to a configured API endpoint. The endpoint can belong to a messaging provider, middleware service, ERP connector, reporting system, CRM, or custom business application.
                </p>
                <p>
                  In practical terms, Miracle Web API lets Miracle Accounting Software communicate with systems outside the desktop accounting environment. A user or configured workflow can generate an invoice, challan, builty, ledger statement, receipt, or reminder, and Miracle can pass the required values to an external API. The external system receives the request, validates it, performs the next action, and returns a response. This is why the same integration concept may be described as Miracle API, Miracle Accounting API, Miracle ERP API, Miracle Integration API, or Miracle Accounting Software API. The phrase changes by use case, but the core function is structured data exchange from Miracle to another system.
                </p>
                <p>
                  Miracle Web API works by using a profile configuration inside Miracle. The profile stores the request URL, optional key-value settings, and the message body format. For WhatsApp delivery through Whats91, the configured POST URL is <span className="break-all font-mono text-text-primary">https://graph.whats91.com/api/custom/miracle/send-template</span>. The body is JSON. Miracle replaces field placeholders with live accounting values before sending the request. For example, the party mobile placeholder becomes the recipient number, the bill number placeholder becomes a template variable, and the attachment Base64 placeholder becomes the PDF document payload.
                </p>
                <p>
                  External integrations depend on predictable field mapping. A Miracle Accounting API request should identify the recipient, the approved template, the country code, the template variables, and any attachment fields. Whats91 accepts both clear field names and common Miracle-friendly aliases so the setup can match the fields available in a specific Miracle build. When the request reaches Whats91, the platform checks the token, sender account, template reference, phone number, attachment format, and file name. Only after validation does Whats91 send the message through WhatsApp Cloud API.
                </p>
                <p>
                  Webhook and API workflows are different parts of the integration lifecycle. Miracle sends an outbound API request to Whats91. Whats91 then communicates with the WhatsApp Cloud API and receives delivery status callbacks from Meta. The business does not need to maintain a WhatsApp Web browser session or keep a QR login active. Delivery events, validation failures, phone errors, template problems, and attachment errors can be reviewed through Whats91 logs. Those logs are useful for accounting teams because they separate Miracle field issues from WhatsApp delivery issues.
                </p>
                <p>
                  Accounting automation workflows usually start from a document or account event. An invoice is generated, a challan is prepared, a builty PDF is created, a ledger statement is requested, or a payment reminder is due. Miracle Web API gives that event a technical path to Whats91. Whats91 then connects the event to approved <Link href="/whatsapp-templates" className="font-semibold text-brand-primary hover:underline">WhatsApp templates</Link>, document attachments, and official sender delivery. For follow-up logic, teams can combine Miracle document sending with <Link href="/flow-builder" className="font-semibold text-brand-primary hover:underline">Flow Builder automation</Link> when a response needs to start a reminder, support handoff, or collection workflow.
                </p>
                <p>
                  Whats91 integrates with Miracle Web API by exposing a Miracle-specific endpoint that understands Miracle field placeholders, Base64 PDF values, template aliases, and common JSON naming differences. Miracle remains the accounting source. Whats91 becomes the delivery, validation, logging, and WhatsApp Cloud API layer. This separation is important: accounting data stays structured in Miracle, while Whats91 handles the messaging rules required by the Meta Business Platform.
                </p>
                <p>
                  A well-configured Miracle Web API integration should be treated like a document workflow, not just a message button. The request should prove which accounting event created the message, which customer should receive it, which approved template applies, which PDF belongs to the transaction, and how failures should be traced after sending. That structure is what makes Miracle WhatsApp API useful for recurring accounting automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface/50 py-12 sm:py-16 md:py-20" aria-labelledby="miracle-connects-heading">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="miracle-connects-heading"
              eyebrow="Connection flow"
              title="How Miracle Accounting Software Connects to WhatsApp"
              description="The integration path is Miracle -> API Request -> Whats91 -> WhatsApp Cloud API -> Customer."
            />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-start">
              <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-md">
                <div className="grid gap-3">
                  {[
                    "Miracle",
                    "API Request",
                    "Whats91",
                    "WhatsApp Cloud API",
                    "Customer",
                  ].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-sm font-bold text-white shadow-sm">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1 rounded-xl border border-border/60 bg-surface/70 px-4 py-3">
                        <p className="font-semibold text-text-primary">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5 text-sm leading-relaxed text-text-secondary sm:text-base">
                <p>
                  Miracle Accounting Software connects to WhatsApp by sending a document-aware API request to Whats91. The request begins inside Miracle, where the accounting record already contains the party, bill number, GST invoice details, challan details, builty reference, ledger balance, amount, date, and document attachment. Miracle substitutes field placeholders into the JSON body and sends the request to the Whats91 custom Miracle endpoint.
                </p>
                <p>
                  Step one is document generation. A user creates or selects an invoice, GST invoice, challan, builty, ledger statement, receipt, or payment reminder inside Miracle. Step two is API preparation. Miracle reads the configured WhatsApp Web API profile, applies the POST URL, replaces placeholders such as party mobile number and attachment Base64, and prepares a JSON payload. Step three is Whats91 validation. Whats91 checks the authentication token, template name or ID, country code, recipient mobile number, template arguments, PDF attachment, and file name.
                </p>
                <p>
                  Step four is WhatsApp Cloud API delivery. After validation, Whats91 sends the approved template message through the configured WhatsApp Cloud API sender. If the message includes a PDF, Whats91 converts the Base64 attachment into the document delivery format expected by WhatsApp. Step five is customer receipt. The customer receives the message on WhatsApp with the approved template text and the attached invoice, challan, builty, ledger, or statement PDF.
                </p>
                <p>
                  This flow supports invoice delivery and GST invoice delivery because the template can carry structured bill details while the PDF carries the formal accounting document. It supports challan and builty delivery because transport or dispatch PDFs can be sent with the same attachment mapping. It supports ledger statements and payment reminders because the message can include outstanding amount, party name, due date, and account context. For broader collection workflows, the integration can connect naturally with <Link href="/solutions/payment-reminders" className="font-semibold text-brand-primary hover:underline">payment reminder automation</Link>.
                </p>
                <p>
                  Customer communication becomes more consistent because the sender, template, document, and accounting fields are controlled by configuration. Teams can also combine this document flow with <Link href="/features/chat-shortcuts-conversation-automation" className="font-semibold text-brand-primary hover:underline">WhatsApp Chat Shortcuts</Link> when customers need quick replies such as Track My Order, Request Invoice, or Talk to Support. If a reply requires automation, the response can be routed into <Link href="/chatbot-flows" className="font-semibold text-brand-primary hover:underline">chatbot flows</Link> or a human support path.
                </p>
                <p>
                  The important technical point is that Miracle does not send the WhatsApp message directly to the customer. Miracle sends an API request to Whats91. Whats91 manages the WhatsApp Cloud API requirements, approved template use, attachment handling, sender configuration, delivery logs, and error handling. This makes the setup more reliable than a WhatsApp Web session and more appropriate for accounting teams that send high volumes of PDFs throughout the day.
                </p>
                <p>
                  For invoice delivery, the transaction source is the Miracle invoice record. For GST invoice delivery, the PDF attachment is the tax document generated from Miracle. For challan and builty delivery, the PDF usually represents dispatch or transport proof. For ledger statements, the attachment or template values summarize account activity. For payment reminders, Miracle provides party and balance context, while Whats91 sends the reminder through an approved template. Each case follows the same integration pattern: Miracle prepares accounting data, Whats91 validates and delivers the WhatsApp message, and the customer receives a document or action-ready update without staff manually forwarding files.
                </p>
                <p>
                  This is also useful for customer communication after the document is delivered. A customer may reply with a payment confirmation, ask for another invoice copy, request a ledger statement, or raise a support question. Because the original message was sent through Whats91, the business can keep WhatsApp communication aligned with official templates, sender configuration, and follow-up workflows instead of treating each reply as an isolated manual chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20" aria-labelledby="web-vs-cloud-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="web-vs-cloud-heading"
              eyebrow="Comparison"
              title="Miracle WhatsApp API vs WhatsApp Web Sending"
              description="The same Miracle document can be sent through a browser-style WhatsApp Web path or through Whats91 Cloud API. The operational behavior is different."
            />
            <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-white shadow-lg">
              <div className="w-full max-w-full overflow-x-auto">
                <table className="w-full min-w-[820px] text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-surface">
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Feature</th>
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">WhatsApp Web</th>
                      <th className="px-4 py-4 text-left font-semibold text-text-primary">Whats91 Cloud API</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiComparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-border/40 last:border-0">
                        <td className="px-4 py-4 font-semibold text-text-primary">{row.feature}</td>
                        <td className="px-4 py-4 text-text-secondary">{row.web}</td>
                        <td className="px-4 py-4 text-text-secondary">{row.cloud}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-border/60 bg-white p-6 shadow-md">
              <div className="space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                <p>
                  WhatsApp Web sending can work for light, manual communication, but it depends on an active browser session and a logged-in WhatsApp account. That creates operational risk for accounting teams that need repeatable invoice delivery, PDF document sending, payment reminders, and delivery tracking. If the session logs out or the device changes, sending can stop without an API-level validation trail.
                </p>
                <p>
                  Whats91 Cloud API delivery is designed for structured business messaging. Miracle sends data to Whats91, and Whats91 sends the approved template through the official WhatsApp Cloud API. This is better for Miracle ERP WhatsApp integration because the document, template, sender, recipient, and response status are handled as an API workflow. Teams can also connect customer replies to <Link href="/flow-builder" className="font-semibold text-brand-primary hover:underline">automation flows</Link> or support bots without relying on one browser session.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface/50 py-12 sm:py-16 md:py-20" aria-labelledby="industries-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="industries-heading"
              eyebrow="Industry workflows"
              title="Industries Using Miracle WhatsApp Automation"
              description="Miracle WhatsApp automation is most useful where accounting documents, credit follow-up, dispatch documents, and customer communication repeat every day."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {industryUseCases.map((industry) => (
                <article key={industry.title} className="rounded-2xl border border-border/60 bg-white p-5 shadow-md">
                  <h3 className="text-lg font-semibold text-text-primary">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{industry.content}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Businesses that use multiple systems can combine Miracle workflows with <Link href="/solutions/busy-erp" className="font-semibold text-brand-primary hover:underline">Busy ERP WhatsApp automation</Link> for other branches or companies, and <Link href="/solutions/busy-google-sheet" className="font-semibold text-brand-primary hover:underline">spreadsheet-connected operations</Link> when teams need WhatsApp responses or delivery data available outside the accounting system.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20" aria-labelledby="api-workflow-heading">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="api-workflow-heading"
              eyebrow="Technical workflow"
              title="Miracle WhatsApp API Workflow"
              description="A Miracle document request moves through validation, template delivery, attachment handling, and delivery logging before the customer receives the PDF."
            />
            <div className="grid gap-3 md:grid-cols-7">
              {miracleWorkflowSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-border/60 bg-white p-4 text-center shadow-md">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-xs font-semibold leading-snug text-text-primary sm:text-sm">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-border/60 bg-white p-5 shadow-md">
                <h3 className="font-semibold text-text-primary">Template and PDF delivery</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Template delivery starts when Miracle sends the template name or template ID with approved variables. Whats91 checks that the template exists, belongs to the sender account, and can be used for the requested message. PDF delivery starts when Miracle sends <span className="font-mono text-text-primary">media_url_type</span> as <span className="font-mono text-text-primary">base64</span>, the Base64 attachment value, and the file name. Whats91 validates the attachment and sends it as a WhatsApp document with the template message.
                </p>
              </article>
              <article className="rounded-2xl border border-border/60 bg-white p-5 shadow-md">
                <h3 className="font-semibold text-text-primary">Logs and error handling</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Delivery logs help separate Miracle setup issues from WhatsApp delivery issues. A missing token, invalid phone number, missing template, blank attachment, or missing file name can be handled before Cloud API delivery. If the request passes validation but sending fails, Whats91 logs can point to sender health, template status, recipient eligibility, or Cloud API response details. This creates a clearer troubleshooting path for accounting and support teams.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Miracle WhatsApp API Questions"
              description="Answers for Miracle Accounting users planning Whats91 Cloud API implementation."
            />
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border/60 bg-white p-5 shadow-md"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="font-semibold text-text-primary">
                      {faq.question}
                    </h3>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-semibold text-brand-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-brand-primary to-brand-primary-hover py-12 sm:py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
              <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">Start with a technical setup call</p>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Connect Miracle Accounting Software to WhatsApp without exposing tokens or relying on WhatsApp Web.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  Share your Miracle template fields, attachment format, and sender setup. Whats91 will map the custom endpoint, approve templates, and validate test messages before go-live.
                </p>
                <Button asChild size="lg" className="mt-6 h-12 rounded-xl bg-white px-7 text-base font-semibold text-brand-primary hover:bg-white/90">
                  <Link href="/contact?source=miracle-whatsapp-api-cta">
                    Request Miracle WhatsApp API Setup
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <ContactCard className="shadow-2xl" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
