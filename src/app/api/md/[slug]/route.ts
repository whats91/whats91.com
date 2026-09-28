import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/seo/config";

// Markdown twin generator for LLM consumption
// Part of SEO 2.0 strategy - provides clean, structured content for AI agents

interface MarkdownPage {
  title: string;
  description: string;
  url: string;
  lastModified: string;
  content: string;
  keywords: string[];
  category?: string;
}

function generateMarkdownHeader(page: MarkdownPage): string {
  return `---
title: "${page.title}"
description: "${page.description}"
url: ${page.url}
lastModified: ${page.lastModified}
keywords: [${page.keywords.map(k => `"${k}"`).join(", ")}]
${page.category ? `category: "${page.category}"` : ""}
---

# ${page.title}

> ${page.description}

**Source**: [${page.url}](${page.url})

---

`;
}

function generateStaticPageMarkdown(slug: string): MarkdownPage | null {
  const baseUrl = siteConfig.url;

  const staticPages: Record<string, Partial<MarkdownPage>> = {
    "busy-erp": {
      title: "Busy Accounting WhatsApp Integration",
      description: "Automate Busy Accounting reports & vouchers on WhatsApp. 24/7 ERP chatbot for balance inquiry, bill-by-bill ledger, receipts & bilty status.",
      keywords: ["Busy Accounting", "WhatsApp Integration", "ERP Automation", "Invoice Delivery", "Payment Reminders"],
      content: `
## Overview

Whats91's Busy Accounting WhatsApp integration transforms how businesses communicate with their customers. Automate invoice delivery, enable 24/7 balance inquiries, and reduce support calls by 50%.

## Key Features

### Automated Invoice Delivery
- Instant WhatsApp delivery when invoice is saved in Busy
- PDF attachment with order details
- Payment link integration
- Due date reminders

### 24/7 Balance Inquiry Chatbot
- Customer sends "Hi" or "Balance" on WhatsApp
- Bot responds with outstanding balance, last payment details, due dates
- Reduces support calls by 50%

### Bill-by-Bill Ledger
- Complete transaction history on demand
- PDF statement generation
- Transparent account tracking

### Payment Reminders
- Automated reminders: 7 days, 3 days, on due date, overdue
- Professional, relationship-maintaining messages
- 30-40% improvement in collections

### Bilty & Dispatch Updates
- Real-time transport status
- LR/Bilty number sharing
- Delivery tracking

## Implementation Timeline

| Week | Milestone |
|------|-----------|
| 1 | WhatsApp Business account setup |
| 2 | Busy data mapping & configuration |
| 3 | Chatbot menu customization |
| 4 | Go-live & team training |

## ROI

- Staff time savings: 3+ hours daily
- Collection improvement: 35% faster payments
- Support call reduction: 50%

## Get Started

Contact Whats91 for a personalized demo and implementation plan.
`,
    },
    "miracle-whatsapp-api": {
      title: "Miracle Accounting Software WhatsApp API Integration",
      description: "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.",
      keywords: ["Miracle WhatsApp API", "Miracle Accounting Software WhatsApp Integration", "Miracle Web API", "Miracle API", "Miracle Accounting API", "Miracle ERP API", "Miracle Invoice WhatsApp", "Miracle PDF WhatsApp", "Miracle Payment Reminder Automation", "Miracle Accounting WhatsApp Cloud API"],
      content: `
## Overview

Whats91 provides a custom Miracle WhatsApp API endpoint for businesses that use Miracle Accounting Software and need official WhatsApp Cloud API delivery. The integration sends approved WhatsApp templates with Miracle field placeholders and PDF attachments such as GST invoices, challans, builty documents, e-way bills, receipts, ledger statements, and payment reminders.

Miracle sends a JSON POST request to Whats91. Whats91 validates the token, template, recipient, variables, Base64 PDF attachment, and sender configuration. Whats91 then sends the message through WhatsApp Cloud API and records validation or delivery errors.

## Endpoint

\`\`\`
POST https://graph.whats91.com/api/custom/miracle/send-template
\`\`\`

This endpoint is designed for Miracle's WhatsApp Web API profile and accepts JSON fields, common aliases, template arguments, and Base64 PDF attachments.

## What is Miracle Web API?

Miracle Web API is the external integration configuration used by Miracle Accounting Software to send structured HTTP requests to another system. It is also described as Miracle API, Miracle Accounting API, Miracle ERP API, Miracle Integration API, or Miracle Accounting Software API depending on the business use case.

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

## Industries Using Miracle WhatsApp Automation

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

## Meta Limits Enforced By Whats91

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

Book Demo or \`/demo\` can start a focused demo booking workflow. Whats91 can collect company, interest, preferred time, and contact details, then notify the sales team or create a CRM record.

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

WhatsApp allows up to 4 ice breaker prompts.

### How many Slash Commands can WhatsApp support?

WhatsApp supports up to 30 slash commands.

### Can WhatsApp Chat Shortcuts work with CRM systems?

Yes. Whats91 can route shortcut text into CRM updates through Flow Builder, webhooks, or custom APIs.

### Can WhatsApp Chat Shortcuts automate order tracking?

Yes. Track My Order or \`/orders\` can start an order tracking workflow.
`,
    },
    "whatsapp-templates": {
      title: "WhatsApp Business Message Template Library",
      description: "20+ pre-approved WhatsApp message templates for marketing, utility, and authentication. Industry-specific templates with best practices.",
      keywords: ["WhatsApp Templates", "Message Templates", "Marketing Templates", "Utility Templates", "Authentication"],
      content: `
## Template Categories

### Marketing Templates (8)
Templates for promotional campaigns, product launches, and customer engagement.

Categories:
- Promotional Offers
- Product Launches
- Event Invitations
- Seasonal Campaigns

### Utility Templates (8)
Templates for transactional messages, account updates, and service notifications.

Categories:
- Order Confirmations
- Payment Receipts
- Delivery Updates
- Account Alerts

### Authentication Templates (4)
Templates for OTP delivery and account verification.

Categories:
- OTP Verification
- Account Verification
- Password Reset
- Two-Factor Authentication

## Template Structure

Each template follows Meta's guidelines:
- Clear, concise message body
- Variable placeholders {{1}}, {{2}}, etc.
- Optional headers (text, image, document)
- Optional call-to-action buttons
- No spelling or grammatical errors

## Common Rejection Reasons

1. Vague or unclear content
2. Missing sample values
3. Promotional content in utility category
4. Incorrect variable usage
5. Trademark violations

## Best Practices

1. Keep messages concise and actionable
2. Use variables for personalization
3. Include clear opt-out options
4. Test with sample data before submission
5. Monitor template performance metrics
`,
    },
    "whatsapp-coexistence": {
      title: "WhatsApp Coexistence: Strategic Implementation for Microbusinesses",
      description: "Complete guide to simultaneously using WhatsApp Business App and WhatsApp Cloud API on a single phone number.",
      keywords: ["WhatsApp Coexistence", "Cloud API", "Business App", "Microbusiness", "SMB", "WhatsApp Integration"],
      content: `
## What is WhatsApp Coexistence?

WhatsApp Coexistence allows microbusinesses to use both the WhatsApp Business mobile app and WhatsApp Cloud API simultaneously on a single phone number. This provides the best of both worlds: manual messaging flexibility with enterprise-grade automation.

## Technical Architecture

### Bidirectional Synchronization
- Messages sent from the mobile app appear in your Cloud API webhook
- Messages received via Cloud API appear in the mobile app
- Enabled via \`smb_message_echoes\` webhook field

### Message Flow
1. Customer sends message to business number
2. Message delivered to both mobile app AND Cloud API webhook
3. Business can respond from either interface
4. All messages synchronized across platforms

## Throughput Limits

| Mode | Throughput | Use Case |
|------|------------|----------|
| Coexistence | 5 MPS | Microbusiness, manual + automation |
| Standard Cloud API | 80-100 MPS | Enterprise, full automation |

## Feature Compatibility

### Supported Features
- Template message sending
- Media messages (images, documents)
- Interactive messages (buttons, lists)
- Webhook event notifications
- Business profile management

### Disabled Features
- Click-to-WhatsApp Ads (requires migration)
- Some advanced analytics
- High-volume batch sending

## Prerequisites

1. WhatsApp Business App installed and active
2. Phone number registered in Business App
3. Meta Business Manager account
4. Cloud API app configured
5. Enable \`smb_message_echoes\` in webhook subscription

## Geographic Availability

Currently available in select markets including India. Check Meta's documentation for current availability.

## Industry Blueprints

### Real Estate
- Property listing alerts via automation
- Manual follow-up for hot leads
- Site visit scheduling

### Retail
- Order confirmations via API
- Manual customer support
- Promotional campaigns

### Consultancy
- Appointment scheduling via API
- Manual consultation follow-ups
- Invoice delivery

## Implementation Steps

1. Verify Business App installation
2. Create Cloud API app in Meta Business Manager
3. Configure webhook with \`smb_message_echoes\`
4. Test bidirectional messaging
5. Deploy automation workflows
6. Train team on hybrid approach
`,
    },
    "tools": {
      title: "Free Tools - WhatsApp Business Resources",
      description: "Free online tools for WhatsApp Business users: link generator, QR code creator, cost calculator, and more.",
      keywords: ["WhatsApp Tools", "Free Tools", "QR Code Generator", "Link Generator", "Cost Calculator"],
      content: `
## Available Tools

### WhatsApp Link Generator
Generate wa.me links with pre-filled messages for easy customer communication.

### QR Code Generator
Create QR codes for:
- URLs
- vCards
- WiFi credentials
- Email
- Phone numbers
- Plain text

### WhatsApp API Cost Calculator
Calculate messaging costs by:
- Country (20+ countries supported)
- Message category (Marketing, Utility, Authentication, Service)
- Volume (discount tiers available)

### GST Calculator
Calculate Indian GST with CGST, SGST, and IGST breakdown.

### SIP Calculator
Plan investments with systematic investment plan returns calculator.

### Image Compressor
Client-side image optimization without uploading to servers.

### SEO Score Checker
Analyze webpage SEO performance with actionable recommendations.

### Case Converter
Transform text between different cases: upper, lower, title, sentence.

## Features

- 100% client-side processing (privacy-focused)
- No data stored on servers
- Mobile-responsive design
- Free to use
`,
    },
    "pricing": {
      title: "WhatsApp Business API Pricing - Transparent Costs",
      description: "Transparent WhatsApp Cloud API pricing for India, including per-delivered-message rates, free service windows, BSP markup risks, GST, and optimization guidance.",
      keywords: ["WhatsApp Pricing", "API Cost", "Business API Pricing", "WhatsApp Charges", "WhatsApp Cloud API Pricing India", "Meta Per Message Rates"],
      content: `
## Pricing Model

WhatsApp Cloud API planning should use the current per-delivered-message pricing model for business-initiated template messages. The recipient country determines the rate. For India, the latest Whats91 pricing pillar is available at [WhatsApp Cloud API Pricing India 2026](/blog/whatsapp-cloud-api-pricing-india-2026).

## Message Categories

| Type | Description | India Pricing |
|------|-------------|---------------|
| Marketing | Business-initiated promotional templates | ₹0.8631 per delivered message |
| Utility | Transactional templates outside eligible free windows | ₹0.1150 per delivered message |
| Authentication | Domestic OTP and verification templates | ₹0.1150 per delivered message |
| Authentication-International | Cross-border OTP traffic to India | ₹2.3000 base rate |
| Service | User-initiated support replies inside customer service window | ₹0 in the researched model |

*Pricing subject to Meta's updates

## Free and Lower-Cost Windows

- Customer-initiated replies inside the 24-hour customer service window can be free.
- Eligible utility messages inside an active service window can reduce cost.
- Marketing messages remain the main cost driver and should be segmented carefully.
- Promotional language inside utility templates can cause marketing classification.

## Useful Pricing Resources

- [WhatsApp API Cost Calculator](/tools/whatsapp-api-cost-calculator)
- [WhatsApp Cloud API Pricing India 2026](/blog/whatsapp-cloud-api-pricing-india-2026)
- [WhatsApp Templates](/whatsapp-templates)
- [WhatsApp Coexistence](/whatsapp-coexistence)

## Whats91 Service Planning

Contact for custom pricing based on:
- Message volume
- Required features
- Integration complexity
- Support level needed

## What's Included

- WhatsApp Cloud API integration
- Template management
- Webhook setup
- Analytics dashboard
- Technical support
- Contract-specific support and SLA options
`,
    },
    "partners": {
      title: "Whats91 Partner Program - Partner and Tech Partner Pricing",
      description: "Join the Whats91 Partner Program. Compare Partner and Tech Partner pricing for Co-Existing, Standard, Flow Builder, Catalog, and campaign add-ons with renewal benefits.",
      keywords: ["Whats91 Partner Program", "WhatsApp API Partner Pricing", "Whats91 Tech Partner", "WhatsApp Cloud API Reseller India", "Co-Existing Partner Pricing", "Standard WhatsApp API Partner Pricing"],
      content: `
## Overview

The Whats91 Partner Program has two partner types: Partner and Tech Partner.

A standard Partner refers clients to Whats91. Whats91 handles client onboarding, WhatsApp setup, support, and integrations. This model is useful for consultants, sales partners, regional business networks, and business advisors who can introduce qualified clients but do not want to manage technical delivery.

A Tech Partner performs onboarding and support independently while using the Whats91 platform. This model is useful for software agencies, ERP implementers, automation consultants, and technical service providers who can manage setup, client support, and delivery themselves.

Partners receive ongoing renewal benefits based on their active and renewing client base. Tech Partners receive greater platform and add-on benefits because they handle more of the client delivery responsibility.

## Partner Type Comparison

| Area | Partner | Tech Partner |
|---|---|---|
| Lead generation | Partner refers clients | Tech Partner sources and manages clients |
| Client onboarding | Whats91 handles onboarding | Tech Partner handles onboarding |
| WhatsApp setup | Whats91 configures setup | Tech Partner configures with platform access |
| Template/helpdesk support | Whats91 provides support | Tech Partner provides first-line support |
| ERP/integration work | Whats91 handles integrations | Tech Partner handles delivery independently |
| Renewal relationship | Benefit from referred active renewals | Benefit from managed active renewals |
| Discount level | Partner pricing | Higher Tech Partner benefits |

## Core Plan Pricing

All prices are in INR and exclusive of 18% GST.

| Plan | Term | Customer Price | Partner Price | Tech Partner Price |
|---|---:|---:|---:|---:|
| Co-Existing | 1 Year | ₹5,000 + 18% GST | ₹3,500 + 18% GST | ₹2,500 + 18% GST |
| Co-Existing | 3 Years | ₹13,000 + 18% GST | ₹8,000 + 18% GST | ₹6,000 + 18% GST |
| Standard | 1 Year | ₹7,000 + 18% GST | ₹5,000 + 18% GST | ₹4,000 + 18% GST |
| Standard | 3 Years | ₹16,000 + 18% GST | ₹11,000 + 18% GST | ₹9,000 + 18% GST |

## Add-On Pricing

All add-on prices are in INR and exclusive of 18% GST.

| Code | Add-on | Customer Price | Partner Price | Tech Partner Price |
|---|---|---:|---:|---:|
| 103 | Flow Builder | ₹2,000 + 18% GST | ₹1,500 + 18% GST | ₹1,000 + 18% GST |
| 102 | WhatsApp Catalog Management | ₹4,000 + 18% GST | ₹3,000 + 18% GST | ₹2,000 + 18% GST |
| 101 | Campaign Utility Templates | ₹2,000 + 18% GST | ₹1,500 + 18% GST | ₹1,000 + 18% GST |

## Renewal Benefits

The partner model is designed for recurring client growth. As a partner onboards more clients and those clients remain active and renew, the partner relationship becomes more valuable over time.

Exact renewal benefits depend on the selected partner type, active client base, renewal status, and commercial terms finalized with Whats91. The page does not publish fixed renewal percentages.

## Meta Message Cost Note

Meta per-message charges are extra and are paid directly to Meta as per Meta template/message rates. Whats91 plan and add-on prices do not include Meta message charges.

## FAQ

### What is the difference between Partner and Tech Partner?
A Partner refers clients to Whats91 and Whats91 handles onboarding, support, and integrations. A Tech Partner performs onboarding and support independently while using the Whats91 platform with greater pricing benefits.

### Who handles onboarding for standard Partners?
Whats91 handles client onboarding, WhatsApp setup, support coordination, and integration work for standard Partners.

### Who handles support for Tech Partners?
Tech Partners handle first-line onboarding and support for their clients.

### Are prices exclusive of GST?
Yes. All Customer, Partner, and Tech Partner prices are exclusive of 18% GST.

### Are Meta message charges included?
No. Meta per-message charges are extra and are paid directly to Meta as per Meta template and message rates.

### Do partners receive renewal benefits?
Yes. Partners receive ongoing renewal benefits based on their active and renewing client base.

### Are add-ons discounted for partners?
Yes. Flow Builder, WhatsApp Catalog Management, and Campaign Utility Templates have Customer, Partner, and Tech Partner prices.

### Which plan should partners sell?
Co-Existing is suitable when customers want to keep using the WhatsApp Business App alongside Cloud API workflows. Standard is suitable for clients who want a more API-led WhatsApp setup.

### Can software agencies become Tech Partners?
Yes. Software agencies, ERP implementers, automation consultants, and technical service providers can become Tech Partners.

### How do I apply?
Contact Whats91 through the Partners page or call +91 96698 23388.
`,
    },
    "whats91-coins": {
      title: "Whats91 Coins Wallet for Partners",
      description: "Learn how Whats91 Coins help Partners and Tech Partners assign plans, add-ons, and customer subscriptions independently. Calculate coin usage, recharge value, GST, and wallet balance.",
      keywords: ["Whats91 Coins", "Whats91 Coins Wallet", "Whats91 Partner Wallet", "Tech Partner Coins Calculator", "Whats91 Recharge Calculator", "Partner Subscription Assignment"],
      content: `
## Overview

Whats91 Coins are wallet credits used by Partners and Tech Partners to assign customer subscriptions, activate plans, and add add-ons independently inside the Whats91 partner workflow.

The core rule is simple: 1 INR of pre-GST recharge value equals 1 Whats91 Coin. If a partner recharges a base amount of ₹10,000, the partner pays ₹10,000 + 18% GST = ₹11,800, but receives 10,000 coins in the wallet.

GST is paid on recharge. GST is not credited as coins. Plan and add-on deductions use the listed pre-GST coin value only.

## Coin Formulas

- Coins credited = recharge base amount
- GST = base amount × 18%
- Payable = base amount × 1.18
- Plan/add-on deduction = listed coin value only

## How Partners Use Coins

1. Partner recharges wallet with base amount plus 18% GST.
2. Whats91 credits coins equal to the pre-GST base amount.
3. Partner assigns customer plan or add-on from wallet.
4. Coins are deducted according to Partner or Tech Partner pricing.
5. Partner tracks wallet balance and recharges again when needed.

Meta per-message charges remain separate and are paid directly to Meta as per Meta template/message rates.

## Partner Coin Deductions

| Item | Partner Coins | Tech Partner Coins |
|---|---:|---:|
| Co-Existing 1 Year | 3,500 | 2,500 |
| Co-Existing 3 Years | 8,000 | 6,000 |
| Standard / Extender 1 Year | 5,000 | 4,000 |
| Standard / Extender 3 Years | 11,000 | 9,000 |
| 103 - Flow Builder | 1,500 | 1,000 |
| 102 - WhatsApp Catalog Management | 3,000 | 2,000 |
| 101 - Campaign Utility Templates | 1,500 | 1,000 |

## Calculator Modes

### I have coins

Partners enter their current wallet balance, such as 10,000 coins. The calculator shows the maximum activations possible for each plan or add-on independently using \`Math.floor(coins / itemCoinCost)\`.

This mode also includes a custom mix builder. Partners can enter a chosen mix of plans and add-ons to see coins used, coins remaining, or shortage.

### I need activations

Partners enter how many plans and add-ons they want to assign. The calculator totals the coins needed, compares it with any existing wallet balance, then estimates the recharge shortfall, GST, and total payable amount.

## Examples

Partner example: A 10,000 coin wallet can activate two Standard / Extender 1 Year plans at 5,000 coins each. The wallet deduction is 10,000 coins.

Tech Partner example: A 10,000 coin wallet can activate two Standard / Extender 1 Year plans at 4,000 coins each and still leave 2,000 coins for add-ons.

## FAQ

### What are Whats91 Coins?
Whats91 Coins are wallet credits used by Partners and Tech Partners to activate customer subscriptions, assign plans, and add add-ons from their partner wallet.

### What is the value of one Whats91 Coin?
One Whats91 Coin equals one INR of pre-GST wallet value.

### How does GST work when recharging coins?
Partners pay the recharge base amount plus 18% GST. Coins are credited only for the pre-GST base amount.

### Do plan and add-on deductions include GST?
No. Plan and add-on deductions use the listed pre-GST coin values only.

### Can partners assign plans independently?
Yes. The Coins system helps partners assign eligible plans, add-ons, and customer subscriptions from their wallet without waiting for manual assignment.

### Are Meta message charges paid with Whats91 Coins?
No. Meta per-message charges remain separate and are paid directly to Meta.
`,
    },
    "google-sheets-integration": {
      title: "WhatsApp Campaign to Google Sheets Integration",
      description: "Automatically sync WhatsApp campaign responses to Google Sheets. Capture button replies and push data in real-time.",
      keywords: ["Google Sheets", "WhatsApp Integration", "Campaign Responses", "Real-Time Sync", "Automation"],
      content: `
## Overview

Every button click—Interested, Not Interested, Learn More—is automatically captured and pushed to Google Sheets in real-time. No manual exports, no delays.

## How It Works

1. Create campaign with interactive buttons
2. Connect Google Sheet and map columns
3. Launch campaign to audience
4. Platform captures button responses via webhooks
5. Auto-push to configured sheet
6. Use Zapier/Make for further automation

## Button Response Types

- **Interested**: Customer expresses interest (Lead Score: High)
- **Not Interested**: Customer declines (Lead Score: Low)
- **Learn More**: Customer wants info (Lead Score: Medium)
- **Call Me**: Callback request (Priority: High)

## Data Fields Captured

- phone_number
- timestamp
- campaign_id
- template_name
- button_id
- button_text
- message_id
- custom_fields (JSON)

## Use Cases

- **Lead Qualification**: 3x faster lead response time
- **Event RSVPs**: 85% response rate
- **Customer Surveys**: 60% higher completion
- **Order Confirmations**: 90% confirmation rate

## Features

- Real-time sync (1-3 seconds)
- Custom column mapping
- Multi-sheet support
- Webhook backup
- Data validation
`,
    },
    "chatbot-flows": {
      title: "ERP Chatbot Flow Library",
      description: "Pre-built conversational flows for Busy Accounting Software integration. Automate sales, purchases, payments, and more.",
      keywords: ["Chatbot Flows", "ERP Automation", "Busy Accounting", "WhatsApp Chatbot", "Pre-built Flows"],
      content: `
## Flow Library Overview

14+ pre-built chatbot flows for ERP automation across 8 categories.

## Categories

### Sales Invoice
- Invoice creation and delivery
- Payment tracking
- Due date reminders

### Sales Order
- Order processing
- Fulfillment updates
- Status tracking

### Sales Return
- Returns handling
- Credit notes
- Refund processing

### Purchase
- PO automation
- Vendor communication
- Inventory updates

### Payments
- Payment reminders
- Confirmation messages
- Receipt delivery

### Receipts
- Delivery acknowledgment
- Confirmation messages
- Status updates

### Ledgers
- Balance queries
- Statement generation
- Account summaries

### Reports
- Automated delivery
- On-demand reports
- Scheduled summaries

## Flow Structure

Each flow contains:
- Trigger event (webhook/message)
- Processing steps (API calls, conditions)
- Message templates
- Integration endpoints

## Integration Points

- Busy API for data retrieval
- WhatsApp Cloud API for messaging
- PDF Generator for documents
- Scheduler for timed triggers

## Complexity Levels

- **Basic**: Simple query-response flows
- **Intermediate**: Multi-step with conditions
- **Advanced**: Complex branching with integrations
`,
    },
  };

  const page = staticPages[slug];
  if (!page) return null;

  let routePath = slug;
  if (slug === "busy-erp" || slug === "miracle-whatsapp-api") {
    routePath = `solutions/${slug}`;
  } else if (slug === "chat-shortcuts-conversation-automation") {
    routePath = `features/${slug}`;
  } else if (slug === "whats91-coins") {
    routePath = "partners/whats91-coins";
  }

  return {
    title: page.title!,
    description: page.description!,
    url: `${baseUrl}/${routePath}`,
    lastModified: new Date().toISOString(),
    keywords: page.keywords || [],
    content: page.content || "",
  };
}

// List of available slugs for 404 response
const availableSlugs = [
  "busy-erp",
  "miracle-whatsapp-api",
  "chat-shortcuts-conversation-automation",
  "whatsapp-templates",
  "whatsapp-coexistence",
  "tools",
  "pricing",
  "partners",
  "whats91-coins",
  "google-sheets-integration",
  "chatbot-flows",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let page: MarkdownPage | null = null;

  // Check if it's a blog post
  if (slug.startsWith("blog-")) {
    const postSlug = slug.replace("blog-", "");
    const post = getPostBySlug(postSlug);

    if (post) {
      page = {
        title: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
        keywords: post.seo.keywords,
        category: post.category,
        content: post.content || "",
      };
    }
  } else {
    // Try static pages
    page = generateStaticPageMarkdown(slug);
  }

  if (!page) {
    // Return JSON 404 with available pages
    return NextResponse.json(
      { 
        error: "Page not found",
        slug: slug,
        available_pages: availableSlugs,
        hint: "Use one of the available page slugs, or prefix blog posts with 'blog-' (e.g., 'blog-whatsapp-cloud-api-complete-guide-2026')"
      },
      { 
        status: 404,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }

  // Generate markdown content
  const markdown = generateMarkdownHeader(page) + page.content;

  // Return as text/markdown for LLM consumption. The canonical Link header
  // points search engines at the HTML page so this alternate format never
  // competes with it as duplicate content (AI agents can still read it).
  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      Link: `<${page.url}>; rel="canonical"`,
    },
  });
}

// Note: generateStaticParams is not supported in API routes
// This route handles dynamic requests at runtime
