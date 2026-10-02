import { metaPricingQualification, estimateScheduledMetaCost, formatMetaMoney, formatMetaRate, getMetaMarket } from "@/lib/meta-pricing";
import { formatINR, plans } from "@/lib/plans";

export const homeMetaEstimate = estimateScheduledMetaCost({ market: "IN", currency: "INR", date: "2026-10-01", volumes: { marketing: 1000, utility: 1000, authentication: 0, service: 0 }, freeEntry: { marketing: 0, utility: 0, authentication: 0, service: 0 }, serviceAllowanceRemaining: 1000, priorUtility: 0, priorAuthentication: 0, authenticationMode: "domestic", internationalEligible: false });
export const homeMetaScenario = `Illustrative October 2026 India budget: 1,000 Marketing deliveries at ${formatMetaRate(getMetaMarket("IN")!.rates.marketing)} and 1,000 Utility deliveries at ${formatMetaRate(getMetaMarket("IN")!.rates.utility)}; no prior monthly paid tier volume. Meta delivery subtotal ${homeMetaEstimate.meta === null ? "unavailable" : formatMetaMoney(homeMetaEstimate.meta)}. Platform fees and taxes are separate.`;
export const homePlanSummary = `Whats91 Coexistence platform subscription ${formatINR(plans.coexistence.monthlyPrice)}/month or ${formatINR(plans.coexistence.annualPrice)}/year, before 18% GST. Monthly billing has a ${formatINR(plans.coexistence.monthlySetupFee)} one-time setup fee; annual setup is included. Meta delivery charges are separate.`;

/** Home reader routes and conditions, shared by HTML and website-content twins.
 * This copy is not an owner-approved product, commercial or assurance register.
 * Factual approvals remain in docs/legal-policy-inputs.md.
 */
export const homeTitle = "Whats91 | WhatsApp Messaging & ERP Workflows for Indian Businesses";
export const homeDescription = "Explore WhatsApp campaigns, ERP documents and customer workflows with Whats91. Check account eligibility, integration scope and written terms before launch.";
export const offeringScope = "Confirm the features enabled for your account, integration prerequisites and written terms before launch. Meta's hosted messaging API does not establish Whats91's provider designation or host every connected ERP workflow.";
export const supportScope = "Confirm staffed support channels and hours in your written offer. A binding uptime percentage, response target or service credit applies only when stated in a signed order, proposal or enterprise SLA.";
export const illustrationScope = "Illustrative workflow with sample content. This is not a product screenshot, customer result or confirmation of account access.";
export const homeTasks = [
  { title: "Send ERP documents", detail: "Explore invoice, ledger and reminder workflows for Busy Accounting.", href: "/solutions/busy-erp", action: "Explore Busy integration" },
  { title: "Plan a campaign", detail: "Prepare your audience, opt-ins and template review before sending.", href: "/solutions/marketing", action: "Explore campaign workflows" },
  { title: "Route customer requests", detail: "Map a request to a reply, system lookup or human handoff.", href: "/flow-builder", action: "Explore Flow Builder" },
  { title: "Estimate message costs", detail: "Use Meta INR rates effective 1 October 2026; keep platform terms separate.", href: "/tools/whatsapp-api-cost-calculator", action: "Open cost calculator" },
] as const;
export const pilotMeasures = [
  { title: "Campaign response", before: "Record the opted-in audience and current response baseline.", compare: "Compare delivered messages, available read signals, replies and useful actions for the same audience and period." },
  { title: "ERP document requests", before: "Record how staff handle invoice and ledger requests today.", compare: "Measure completed requests, exceptions and staff time after the agreed workflow is configured." },
  { title: "Payment follow-ups", before: "Record the due accounts and existing follow-up process.", compare: "Compare payment timing and manual follow-ups for the agreed cohort; account for other collection activity." },
] as const;
export const featureRoutes = [
  { title: "Chat Shortcuts", description: "Explore ice breakers and slash commands that route customer messages to a workflow or support team.", href: "/features/chat-shortcuts-conversation-automation", badge: "Conversation entry" },
  { title: "Flow Builder", description: "Map triggers, conditions, actions, webhooks and handoff paths for a customer request.", href: "/flow-builder", badge: "Workflow design" },
  { title: "Chatbot Flow Library", description: "Explore ERP and support flow examples, then confirm the systems and permissions each flow needs.", href: "/chatbot-flows", badge: "Flow examples" },
  { title: "Whats91 MCP", description: "Explore Whats91 MCP and request confirmation of current assistant support, enabled tools and account eligibility.", href: "/mcp", badge: "Confirm access" },
] as const;
export const homeFaqs = [
  { question: "What is Whats91?", answer: "Whats91 is a WhatsApp Cloud API platform for Indian businesses exploring campaigns, ERP document workflows and customer conversation automation. Confirm the features, integrations and plan scope available to your account before launch." },
  { question: "Does Meta host every part of an ERP integration?", answer: "Meta hosts the WhatsApp Cloud API messaging service. An ERP integration can also depend on accounting software, a connector, customer systems and a chosen inbox. Confirm where each part runs, its permissions and what happens when it is offline." },
  { question: "How should I assess Busy Accounting integration?", answer: "Choose one workflow, such as an invoice PDF or ledger request. Confirm the Busy version, document fields, connector, data freshness, recipient permissions and exception handling. Ask for a demonstration of that scope before agreeing to rollout." },
  { question: "How should I assess chatbot automation?", answer: "Map the customer request, required data, reply and human handoff. Confirm enabled triggers and actions, permissions, failures and the support process. An illustrated flow does not establish live access or unattended availability." },
  { question: "What support and uptime commitments apply?", answer: supportScope },
  { question: "What should I check before sharing customer data?", answer: "Review the privacy and security statements, then confirm your processing roles, providers, locations, retention, access controls and data-rights process. These pages and workflow illustrations do not certify compliance or a particular security control." },
  { question: "How can I estimate WhatsApp API cost in India?", answer: metaPricingQualification + " Use the cost calculator for category volumes, remaining Service allowance and confirmed free-entry exclusions." },
] as const;
export const homeMarkdown = `## Who this is for\n\n${homeFaqs[0].answer}\n\n${offeringScope}\n\n## Choose your workflow\n\n${homeTasks.map(t => `### ${t.title}\n${t.detail}\n[${t.action}](https://whats91.com${t.href})`).join("\n\n")}\n\n## Meta message budget\n\n${homeMetaScenario}\n\n${metaPricingQualification}\n\n## Platform plan\n\n${homePlanSummary}\n\n[Compare both plans](/plans)\n\n## Before launch\n\n${supportScope}\n\n${illustrationScope}\n\nCustomer scale, campaign benchmarks and ROI figures are not established here. Agree on a pilot cohort, baseline, measurement period and exceptions before evaluating results. A demo request is an enquiry, not a scheduled appointment or activated account.\n\n## Frequently asked questions\n\n${homeFaqs.map(f => `### ${f.question}\n${f.answer}`).join("\n\n")}`;
export const featuresMarkdown = `## Choose a feature path\n\n${featureRoutes.map(f => `### ${f.title}\n${f.description}\n[Explore](https://whats91.com${f.href})`).join("\n\n")}\n\n${offeringScope}\n\n${supportScope}\n\n[Request a demo](https://whats91.com/contact). This is an enquiry, not a scheduled appointment or account activation.`;
