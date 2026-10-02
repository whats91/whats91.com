import { metaPricingDescription } from "@/lib/meta-pricing";
import { templateResourceMarkdown, flowResourceMarkdown, messageExampleDescription, flowResourceDescription } from "@/lib/resource-content";
import { localToolsMarkdown } from "@/lib/tool-catalogue";
import { automationPages, automationMarkdown } from "@/lib/automation-pages";
import { busySolutions, busyMarkdown } from "@/lib/busy-solutions";
import { setupScope, sceneCaption, setupCaptureScope, profileCaption, formatCaption } from "@/lib/product-media";
import { homeTitle, homeDescription, homeMarkdown, featuresMarkdown } from "@/lib/home-content";
import { mcpTitle, mcpDescription, mcpMarkdown } from "@/lib/mcp-contract";
import { compatibilityMarkdown, compatibilityQualification } from "@/lib/platform-compatibility";
import { calculatorMarkdown, pricingMarkdown, partnerMarkdown, coinsMarkdown } from "@/lib/pricing";
import { siteConfig } from "@/lib/seo/config";


/** Canonical-source alternate bodies; no request clock or account execution. */
export interface MarkdownPage {
  title: string;
  description: string;
  url: string;
  publishedAt?: string;
  lastModified?: string;
  content: string;
  declaredSourceDate?: string;
  keywords: string[];
  category?: string;
}

export function generateMarkdownHeader(page: MarkdownPage): string {
  return `---
title: ${JSON.stringify(page.title)}
description: ${JSON.stringify(page.description)}
url: ${page.url}
${page.publishedAt ? `publishedAt: ${page.publishedAt}\n` : ""}${page.lastModified ? `lastModified: ${page.lastModified}\n` : ""}
keywords: [${page.keywords.map(k => JSON.stringify(k)).join(", ")}]
${page.declaredSourceDate ? `declaredSourceDate: ${page.declaredSourceDate}\ndateStatus: inherited-source-declaration\n` : ""}
${page.category ? `category: ${JSON.stringify(page.category)}` : ""}
---

# ${page.title}

> ${page.description}

**Source**: [${page.url}](${page.url})

---

`;
}

export function generateStaticPageMarkdown(slug: string): MarkdownPage | null {
  const baseUrl = siteConfig.url;

  const staticPages: Record<string, Partial<MarkdownPage>> = {
    tools: { title: "Whats91 local tools", description: "Local link and PNG generators, volume planning and user-assumption ROI scenarios.", keywords: ["Local tools", "PNG", "wa.me", "ROI"], content: localToolsMarkdown },
    home: { title: homeTitle, description: homeDescription, keywords: ["Whats91", "ERP workflows"], content: homeMarkdown },
    features: { title: "Whats91 Features", description: "Explore Whats91 feature paths; confirm account eligibility and integration scope before launch.", keywords: ["Whats91 features"], content: featuresMarkdown },
    mcp: { title: mcpTitle, description: mcpDescription, keywords: ["Whats91 MCP", "MCP access"], content: mcpMarkdown },
    ...Object.fromEntries(Object.values(busySolutions).map(solution => [solution.slug, {
      title: solution.title, description: solution.description,
      keywords: [solution.name, "Busy Accounting integration"], content: busyMarkdown(solution),
    }])),
    "miracle-whatsapp-api": {
      title: "Miracle Accounting Software WhatsApp API Integration",
      description: "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.",
      keywords: ["Miracle WhatsApp API", "Miracle Accounting Software WhatsApp Integration", "Miracle Web API", "Miracle API", "Miracle Accounting API", "Miracle ERP API", "Miracle Invoice WhatsApp", "Miracle PDF WhatsApp", "Miracle Payment Reminder Automation", "Miracle Accounting WhatsApp Cloud API"],
      content: `
## Overview

${setupScope}

${sceneCaption}

${profileCaption} ${formatCaption} ${setupCaptureScope}

Whats91 provides a custom Miracle WhatsApp API endpoint for businesses that use Miracle Accounting Software and need official WhatsApp Cloud API delivery. The integration sends approved WhatsApp templates with Miracle field placeholders and PDF attachments such as GST invoices, challans, builty documents, e-way bills, receipts, ledger statements, and payment reminders.

Miracle sends a JSON POST request to Whats91. Whats91 validates the token, template, recipient, variables, Base64 PDF attachment, and sender configuration. Whats91 then sends the message through WhatsApp Cloud API and records validation or delivery errors.

## Endpoint

\`\`\`
POST https://graph.whats91.com/api/custom/miracle/send-template
\`\`\`

This endpoint is designed for Miracle's WhatsApp Web API profile and accepts JSON fields, common aliases, template arguments, and Base64 PDF attachments.

## What is Miracle Web API?

Miracle Web API is the external integration configuration used by Miracle Accounting Software to send structured HTTP requests to another system.

For WhatsApp delivery, Miracle Web API collects accounting fields such as party mobile number, bill number, bill date, amount, party name, attachment Base64, and file name. Miracle substitutes those fields into the configured JSON body and sends the request to Whats91. Whats91 acts as the messaging validation and Cloud API delivery layer.

The workflow is API-driven: Miracle generates or selects an accounting document, Miracle Web API sends the request, Whats91 validates the request, WhatsApp Cloud API delivers the approved template and document, and the customer receives the PDF on WhatsApp.

## How Miracle Accounting Software Connects to WhatsApp

The complete flow is:

1. Miracle generates an invoice, GST invoice, challan, builty, ledger statement, receipt, or payment reminder.
2. Miracle prepares an API request using the WhatsApp Web API profile.
3. Miracle sends the JSON request to Whats91.
4. Whats91 validates the template, token, recipient, variables, attachment, and sender.
5. Whats91 sends the approved template through WhatsApp Cloud API.
6. The customer receives the message and PDF attachment on WhatsApp.

This supports invoice delivery, GST invoice delivery, challan delivery, builty delivery, ledger statements, payment reminders, and routine customer communication.

## Miracle WhatsApp API vs WhatsApp Web Sending

| Feature | WhatsApp Web | Whats91 Cloud API |
|---|---|---|
| QR Login | Requires QR login and active session | No QR login required |
| Official API | Not an official API delivery path | Uses WhatsApp Cloud API |
| PDF Attachments | Depends on browser/session stability | Supports Base64 PDF attachments |
| Template Messaging | Does not use approved utility templates | Uses approved WhatsApp templates |
| Multi User Access | Limited by browser/device session | Team-managed sender and logs |
| Audit Logs | Limited | Request, template, attachment, and delivery logs |
| Delivery Tracking | Depends on visible chat status | Cloud API events and Whats91 logs |
| Automation | Fragile for recurring workflows | API-triggered accounting workflows |
| ERP Integration | Browser-style sending layer | Structured Miracle-to-Whats91 API flow |
| Scalability | Limited by session reliability | Better for high-volume document delivery |
| Business Verification | Not tied to API sender controls | Uses Meta Business Platform controls |
| Reliability | Can fail on logout or device change | Clearer API validation and error handling |

## Miracle Workflow Examples by Industry

Illustrative use cases, not customer case studies or measured results.

- Textile businesses: invoice PDFs, builty PDFs, challans, ledgers, and outstanding reminders.
- Ceramic industry: dispatch documents, tax invoices, dealer communication, and payment follow-up.
- FMCG distributors: retailer invoices, route-wise order updates, ledger sharing, and reminder templates.
- Manufacturers: finished goods invoices, challans, dispatch PDFs, account statements, and receipt confirmations.
- Wholesalers: daily invoice delivery, customer statements, payment receipts, and balance reminders.
- Commission agents: settlement documents, party statements, receipts, and account follow-up.
- Petrol pumps: monthly statements, credit bills, GST invoices, and fleet customer reminders.
- Pharmaceutical distributors: GST invoices, delivery challans, account reconciliation, and credit control communication.

## Miracle WhatsApp API Workflow

1. Miracle invoice generated.
2. Miracle Web API trigger.
3. Whats91 endpoint receives JSON.
4. Template validation.
5. Base64 PDF attachment check.
6. WhatsApp Cloud API delivery.
7. Customer receives PDF on WhatsApp.

Template delivery uses approved WhatsApp templates. PDF delivery uses \`media_url_type=base64\`, a Base64 document payload, and a file name. Logs and error handling cover missing tokens, invalid phones, missing templates, blank attachments, missing file names, sender health, and Cloud API delivery responses.

## Safe Sample Payload

\`\`\`json
{
  "template_name": "builty",
  "country_code": "91",
  "send_to": "<<129:Party Mobile No.-1>>",
  "media_url_type": "base64",
  "base64": "<<288:Attachment Base64>>",
  "file_name": "<<287:Attachment File Name>>",
  "auth_token": "YOUR_WHATS91_API_TOKEN"
}
\`\`\`

Never publish a live Whats91 token in screenshots, website content, or public documentation. Rotate any token that was exposed in setup material.

## How to Implement

1. Create and approve the WhatsApp utility template in Whats91 or Meta.
2. Generate a Whats91 API token for the Miracle integration.
3. In Miracle, create a WhatsApp Web API profile.
4. Set the POST URL to \`https://graph.whats91.com/api/custom/miracle/send-template\`.
5. Add \`auth_token\` with \`YOUR_WHATS91_API_TOKEN\` as the safe placeholder during documentation.
6. Create a WhatsApp format and paste the JSON message body.
7. Map \`send_to\` to the party mobile field.
8. For PDF attachments, use \`media_url_type=base64\`, Miracle's attachment Base64 field, and Miracle's attachment file-name field.
9. Select PDF file type and Log With Attachment in Miracle.
10. Send a test invoice or builty and review Whats91 logs.

## Supported Fields

| Field | Required | Aliases | Notes |
|---|---|---|---|
| auth_token | Required | authToken, token | Whats91 API token. Keep private. |
| template_id | Required | template_name, templateName | Approved template ID, Meta template ID, or template name. |
| country_code | Required | - | Use 91 for India. |
| send_to | Required | mobile, receiver, phone | Actual WhatsApp recipient field. |
| sender_id | Recommended | senderId, sender | Useful for accounts with multiple senders. |
| template_argument1... | As needed | - | One value per approved template variable. |
| media_url_type | For attachments | - | Use base64 or url. |
| base64 / file_name | For Base64 PDFs | fileName, filename | Miracle PDF attachment payload and file name. |

## Common Errors

- \`MIRACLE_MISSING_AUTH_TOKEN\`: Add \`auth_token\` or an accepted alias.
- \`MIRACLE_MISSING_TEMPLATE_ID\`: Add \`template_id\`, \`template_name\`, or \`templateName\`.
- \`MIRACLE_TEMPLATE_NOT_FOUND\`: Verify template spelling, language, account, and approval status.
- \`MIRACLE_MISSING_SEND_TO\`: Map \`send_to\` to a populated party mobile field.
- \`MIRACLE_INVALID_PHONE\`: Clean the mobile number and country code.
- \`MIRACLE_INVALID_BASE64\`: Confirm PDF and Log With Attachment settings in Miracle.
- \`MIRACLE_MISSING_FILE_NAME\`: Add \`file_name\` for Base64 attachments.
- \`MIRACLE_SEND_FAILED\`: Review Whats91 logs for sender health, template, or delivery status.

## Best Use Cases

- Sales invoices and GST documents
- Builty, challan, and transport PDFs
- Outstanding balance reminders
- Payment receipt confirmations
- Account statements and ledger follow-ups
- E-way bill and dispatch document sharing

## FAQ

### What is Miracle Web API?
Miracle Web API is Miracle's external API configuration for sending structured accounting data and document fields to systems such as Whats91.

### How does Miracle WhatsApp API integration work?
Miracle sends JSON to Whats91, Whats91 validates the request, and Whats91 sends the approved WhatsApp template and PDF through WhatsApp Cloud API.

### Can Miracle send PDF invoices to WhatsApp?
Yes. Use Base64 PDF attachment mapping with \`media_url_type=base64\`, \`base64\`, and \`file_name\`.

### Can Miracle send GST invoices through WhatsApp?
Yes. GST invoice PDFs can be sent through approved WhatsApp templates and Miracle attachment fields.

### Does Miracle support Base64 PDF attachments?
Yes. Enable PDF output and Log With Attachment in Miracle, then map the Base64 field into the Whats91 request.

### Can Miracle send payment reminders automatically?
Yes. Miracle can trigger approved reminder templates when the required party and amount fields are available.

### Can Miracle connect to WhatsApp Cloud API?
Yes. Miracle connects through Whats91, which handles WhatsApp Cloud API delivery.

### Can Miracle work with approved WhatsApp templates?
Yes. Send the template name or ID and the required variables to Whats91.
`,
    },
    "chat-shortcuts-conversation-automation": {
      title: "WhatsApp Chat Shortcuts, Ice Breakers and Slash Commands",
      description: "Use WhatsApp Ice Breakers and Slash Commands to start chatbots, Flow Builder, ERP, support, sales, demo, and order tracking automations.",
      keywords: ["WhatsApp Chat Shortcuts", "WhatsApp Ice Breakers", "WhatsApp Quick Start Prompts", "WhatsApp Conversation Starters", "WhatsApp Slash Commands", "WhatsApp Business Commands", "WhatsApp Automation Commands", "WhatsApp Conversational Automation", "WhatsApp Cloud API automation", "WhatsApp Flow Builder integration"],
      content: `
## Overview

${setupScope}

${sceneCaption}

Whats91 Chat Shortcuts helps businesses create a smoother WhatsApp experience by adding quick conversation prompts and slash commands to connected WhatsApp numbers. Customers can tap options like "Track my order" or "Talk to support", or type commands like \`/ledger\` and \`/orders\`.

Meta displays these shortcuts inside WhatsApp. Whats91 handles the real automation after the customer taps a prompt or sends a slash command, because those interactions arrive as normal incoming webhook text messages. Existing Whats91 Chatbots and Flow Builder can then match the prompt text or command and reply with business logic.

This feature is intentionally separate from AI MetaBot. It does not use WABA Bot ID APIs and does not depend on an AI runtime.

## Key Benefits

- Reduce customer typing effort with pre-configured ice breakers.
- Offer command-style actions for frequent business tasks.
- Route prompt taps and slash commands into existing Whats91 Chatbots and Flow Builder.
- Configure shortcuts per WhatsApp phone number.
- Pull existing Meta configuration and sync it into Whats91.
- Push local drafts to Meta when ready.
- Clear shortcuts on Meta without deleting local automation logic.

## How It Works

1. Configure prompts and slash commands in Whats91.
2. Push the configuration to Meta for the selected WhatsApp phone number.
3. Meta shows the prompts and commands inside WhatsApp.
4. A customer taps a prompt or sends a slash command.
5. Whats91 receives normal webhook text and routes it into Chatbots, Flow Builder, ERP workflows, custom handlers, or human handoff.

## Business Use Cases

### Support Automation

Recommended prompts:
- Talk to support
- Track my ticket
- Check service status
- Request callback

Recommended commands:
- \`/support\`: Talk to support team
- \`/ticket\`: Check ticket status
- \`/callback\`: Request a callback

### Accounting And ERP Automation

Recommended prompts:
- View ledger balance
- Request invoice
- Check pending bills
- Share payment reminder

Recommended commands:
- \`/ledger\`: View ledger balance
- \`/invoice\`: Request latest invoice
- \`/pending\`: View pending bills

### Order And Delivery Tracking

Recommended prompts:
- Track my order
- View recent orders
- Cancel an order
- Talk to dispatch

Recommended commands:
- \`/orders\`: View order history
- \`/track\`: Track current order
- \`/delivery\`: Check delivery status

### Sales And Lead Capture

Recommended prompts:
- View latest offers
- Talk to sales
- Request product catalog
- Book a demo

Recommended commands:
- \`/sales\`: Connect with sales team
- \`/catalog\`: View product catalog
- \`/demo\`: Book a product demo

## Existing setup values to confirm

These are values in the existing setup example, not confirmed current provider limits or account entitlements. Confirm the supported limits and enabled configuration before use.

| Area | Limit |
|---|---|
| Ice breakers | Maximum 4 prompts |
| Prompt length | Maximum 80 characters |
| Slash commands | Maximum 30 commands |
| Command name | Maximum 32 characters |
| Command description | Maximum 256 characters |
| Emojis | Rejected |
| Duplicate prompts | Rejected |
| Duplicate command names | Rejected case-insensitively |

Command names are stored without the \`/\` prefix.

## Webhook Runtime Behavior

Meta does not execute the automation logic. It only displays prompts and commands inside WhatsApp.

When a customer taps an ice breaker, Whats91 receives a normal text message:

\`\`\`json
{
  "text": {
    "body": "Track my order"
  }
}
\`\`\`

When a customer sends a slash command, Whats91 also receives a normal text message:

\`\`\`json
{
  "text": {
    "body": "/ledger customer ABC"
  }
}
\`\`\`

Whats91 can then route the text through existing Chatbots, Flow Builder trigger matching, custom ERP or business automation handlers, and human handoff logic.

## Dashboard Management

The Whats91 dashboard supports selected number context, sync status, ice breaker editing, slash command editing, WhatsApp preview, business presets, usage guidance, and a clear confirmation flow. Teams can pull from Meta, save a local draft, push to Meta, clear the live Meta configuration, and test the shortcuts in WhatsApp.

## What are WhatsApp Ice Breakers?

WhatsApp Ice Breakers are quick-start prompts that Meta can display inside a WhatsApp conversation with a business phone number. They are also called WhatsApp Quick Start Prompts or WhatsApp Conversation Starters because they help a customer begin without typing from a blank screen. Examples include Track My Order, Talk to Support, Request Invoice, and Book Demo.

Meta displays the prompt options in WhatsApp. Whats91 receives the selected prompt through the incoming message webhook and routes it into WhatsApp Business Automation. This means Track My Order can start an order-status workflow, Talk to Support can start a support chatbot, Request Invoice can route into accounting automation, and Book Demo can create a lead capture or demo scheduling flow.

Ice Breakers help businesses because the customer's first intent becomes clear immediately. They reduce vague opening messages, improve routing accuracy, and connect naturally to Flow Builder, chatbot flows, WhatsApp Templates, CRM updates, ERP workflows, and support handoff. They help customers because tapping a prompt is faster than typing and easier on mobile screens.

## What are WhatsApp Slash Commands?

WhatsApp Slash Commands are typed command shortcuts such as \`/support\`, \`/orders\`, \`/ledger\`, and \`/demo\`. They are useful for repeat users who know the action they want. A command is configured in Whats91, published to Meta for the selected WhatsApp business phone number, and delivered back to Whats91 as normal incoming text when the customer sends it.

The command starts a workflow but does not execute the business logic by itself. Whats91 matches the command and routes it to a chatbot, Flow Builder journey, ERP workflow, CRM update, Google Sheets integration, custom webhook, or human handoff. For example, \`/ledger customer ABC\` can be parsed as the ledger command plus an account reference.

Slash commands create stable automation triggers. Natural language varies, but a command such as \`/orders\` or \`/ledger\` gives the system a predictable starting point for WhatsApp Conversational Automation.

## WhatsApp Chat Shortcuts vs WhatsApp Chatbots

| Feature | WhatsApp Chat Shortcuts | WhatsApp Chatbots |
|---|---|---|
| Visible in WhatsApp | Yes. Prompts and commands appear inside WhatsApp. | No. Bot logic runs after a message is received. |
| Starts Workflow | Yes. A tap or command can start a route. | Yes. A bot can reply after matching a trigger. |
| Requires AI | No. Shortcuts are deterministic conversation starters. | Optional. Bots can be rule-based or AI-assisted. |
| Works with Flow Builder | Yes. Shortcut text can become a trigger. | Yes. Bot steps can hand off to flows. |
| Works with ERP | Yes. Commands can route to ERP workflows. | Yes. Bots can query ERP data after trigger matching. |
| Customer Friendly | High. Customers tap instead of typing. | High when menus and replies are clear. |
| Support Friendly | High. Common intents are visible before the first message. | High. Support logic can answer and escalate. |

Chat Shortcuts are the first-click or first-command layer. Chatbots handle the next step: asking questions, sending replies, calling APIs, escalating to humans, or continuing a workflow. A shortcut can start a chatbot, but it is not the chatbot itself.

## Business Use Cases for WhatsApp Chat Shortcuts

### Customer Support Automation

Customer support teams can use prompts like Talk to Support and commands like \`/support\` to reduce vague opening messages. Whats91 can route the incoming text into support chatbots, callback flows, ticket-status flows, or human handoff.

### Order Tracking Automation

Track My Order or \`/orders\` can start an order tracking workflow. Whats91 can collect an order ID, query a connected system, send a status update, or route the case to support for exceptions.

### ERP Automation

Commands such as \`/ledger\`, \`/invoice\`, and \`/pending\` can route to ERP workflows. This supports Busy ERP WhatsApp automation, Miracle WhatsApp API workflows, custom APIs, and account-document delivery.

### Accounting Automation

Request Invoice, View Ledger Balance, and \`/ledger\` help customers request accounting information without typing long messages. Whats91 can route the request to templates, account workflows, ERP lookups, or accounts-team handoff.

### Lead Generation

Prompts like View Latest Offers, Talk to Sales, Request Product Catalog, and Book Demo guide prospects into lead capture flows. Whats91 can collect details, qualify the lead, update a CRM, or notify sales.

### Sales Automation

Sales teams can use \`/sales\`, catalog prompts, offer prompts, and callback prompts to prioritize high-intent buyers. The trigger can start product selection, qualification, WhatsApp Business Calling follow-up, or human handoff.

### Demo Booking

Book Demo or \`/demo\` can start a demo request workflow. A request alone does not reserve an appointment; scheduling requires separately configured availability and confirmation. Teams can collect company, interest, preferred time and contact details, then route the enquiry to sales or a CRM.

## FAQ

### What are WhatsApp Chat Shortcuts?

Chat Shortcuts are quick conversation options shown in WhatsApp. They include ice breakers customers can tap and slash commands customers can type.

### Does Meta run the chatbot?

No. Meta only displays the prompts and commands. Whats91 receives the selected text through webhooks and runs the automation through Chatbots, Flow Builder, custom business workflows, or human handoff.

### Can each WhatsApp number have different shortcuts?

Yes. Chat Shortcuts are configured per selected WhatsApp phone number setup.

### Can I sync existing shortcuts from Meta?

Yes. Whats91 can fetch existing prompts and commands from Meta and manage them inside Whats91.

### Do Chat Shortcuts work with Whats91 Flow Builder?

Yes. Tapped prompts and slash commands arrive as normal incoming text messages, so Flow Builder can use them as triggers.

### Can WhatsApp Chat Shortcuts start a chatbot?

Yes. WhatsApp Chat Shortcuts can start a chatbot when the prompt text or slash command is matched as an incoming message trigger.

### Can WhatsApp Slash Commands trigger ERP workflows?

Yes. Commands such as \`/ledger\`, \`/invoice\`, and \`/orders\` can trigger ERP workflows through Whats91 routing.

### Can WhatsApp Ice Breakers be configured per phone number?

Yes. Ice Breakers can be configured for the selected WhatsApp business phone number.

### Are WhatsApp Chat Shortcuts available in WhatsApp Cloud API?

Yes. Chat Shortcuts use Meta WhatsApp conversational automation components for business phone numbers.

### Do WhatsApp Chat Shortcuts require AI?

No. Chat Shortcuts are deterministic conversation starters and do not require AI.

### How many Ice Breakers does WhatsApp allow?

The existing example uses up to 4 prompts. Confirm the current provider and account limits before configuring your number.

### How many Slash Commands can WhatsApp support?

The existing example uses up to 30 commands. Confirm the current provider and account limits before configuring your number.

### Can WhatsApp Chat Shortcuts work with CRM systems?

Yes. Whats91 can route shortcut text into CRM updates through Flow Builder, webhooks, or custom APIs.

### Can WhatsApp Chat Shortcuts automate order tracking?

Yes. Track My Order or \`/orders\` can start an order tracking workflow.
`,
    },
    "whatsapp-templates": { title: "WhatsApp Message Examples", description: messageExampleDescription, keywords: ["Message examples", "Account approval"], content: templateResourceMarkdown },
    "whatsapp-coexistence": { title: "WhatsApp Coexistence: Account Conditions", description: compatibilityQualification, keywords: ["WhatsApp Coexistence", "Cloud API", "Business App"], content: compatibilityMarkdown },
    "whatsapp-api-cost-calculator": { title: "WhatsApp API Cost Calculator", description: metaPricingDescription, keywords: ["Meta INR rates", "Cost calculator"], content: calculatorMarkdown },
    "pricing": { title: "WhatsApp API Pricing India", description: metaPricingDescription, keywords: ["Commercial conditions", "Pricing"], content: pricingMarkdown },
    "partners": { title: "Whats91 Partner Program", description: "Public plan prices are listed separately; Partner and Tech Partner rates and add-on terms require a written agreement.", keywords: ["Commercial conditions", "Pricing"], content: partnerMarkdown },
    "whats91-coins": { title: "Whats91 Coins", description: "Partner quantities and wallet conditions; current conversion, deduction and recharge amounts unavailable.", keywords: ["Commercial conditions", "Pricing"], content: coinsMarkdown },
    ...Object.fromEntries(Object.values(automationPages).map(page => [page.slug, {
      title: page.title, description: page.description, keywords: [page.name, "Whats91 workflows"], content: automationMarkdown(page),
    }])),
    "chatbot-flows": { title: "Chatbot Flow JSON Examples", description: flowResourceDescription, keywords: ["JSON examples", "Downloads", "Import requirements"], content: flowResourceMarkdown },
  };

  const page = Object.hasOwn(staticPages, slug) ? staticPages[slug] : undefined;
  if (!page) return null;

  let routePath = slug === "home" ? "" : slug;
  if (Object.hasOwn(automationPages, slug)) {
    routePath = automationPages[slug].path.slice(1);
  } else if (Object.hasOwn(busySolutions, slug) || slug === "miracle-whatsapp-api") {
    routePath = `solutions/${slug}`;
  } else if (slug === "chat-shortcuts-conversation-automation") {
    routePath = `features/${slug}`;
  } else if (slug === "whatsapp-api-cost-calculator") {
    routePath = "tools/whatsapp-api-cost-calculator";
  } else if (slug === "whats91-coins") {
    routePath = "partners/whats91-coins";
  }

  return {
    title: page.title!,
    description: page.description!,
    url: `${baseUrl}/${routePath}`,
    keywords: page.keywords || [],
    content: page.content || "",
  };
}
