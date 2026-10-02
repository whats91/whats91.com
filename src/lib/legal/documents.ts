import { noMarkupPolicy } from "@/lib/meta-pricing";
import type { ContentDates } from "@/lib/content/dates";
import type { EditorialRecord } from "@/lib/content/review";
export type LegalLink = {
  label: string;
  href: string;
  description?: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type LegalDocument = ContentDates & {
  /** Effective/version labels are not publication or approval evidence. */
  editorial?: EditorialRecord;
  title: string;
  eyebrow: string;
  summary: string;
  effectiveDate: string;
  version: string;
  status?: string;
  sections: LegalSection[];
  resources?: LegalLink[];
  related: LegalLink[];
};

const commonRelated: LegalLink[] = [
  { label: "Legal & Trust Center", href: "/legal" },
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Acceptable Use Policy", href: "/acceptable-use" },
  { label: "Data Rights", href: "/data-rights" },
];

export const privacyDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Privacy Notice",
  eyebrow: "Privacy and data use",
  summary:
    "This notice explains what Whats91 collects, why we use it, how customer messaging data is handled, and the choices available to individuals.",
  effectiveDate: "September 25, 2026",
  version: "2.0",
  sections: [
    {
      id: "scope",
      title: "Who we are and what this notice covers",
      paragraphs: [
        "Whats91 is a service brand owned and operated by Wilford Technology. In this notice, “Whats91”, “we”, “us”, and “our” refer to the operator of the Whats91 website and services.",
        "This notice applies to whats91.com, Whats91 account and support interactions, WhatsApp Cloud API tools provided through Whats91, and supported integrations such as Whats91 MCP. It does not replace the privacy notice of a Whats91 customer that communicates with its own end users.",
      ],
    },
    {
      id: "roles",
      title: "Our data-protection roles",
      paragraphs: [
        "For website visitors, prospects, account administrators, billing contacts, and people who contact support, Whats91 generally determines why and how the information is used.",
        "When a business customer uploads contacts, configures campaigns, receives messages, or otherwise processes information about its customers, that business decides the purpose. Whats91 processes that customer-controlled data to provide the contracted service and according to lawful instructions, applicable terms, and platform requirements.",
      ],
    },
    {
      id: "data-we-collect",
      title: "Information we collect",
      bullets: [
        "Account and contact information, such as name, business email, phone number, company, role, and login identifiers.",
        "Commercial and billing information needed for plans, invoices, taxes, payment reconciliation, and support. Whats91 does not intentionally store complete payment-card details when a payment provider handles them.",
        "Customer-controlled service data, such as WhatsApp Business Account identifiers, phone-number identifiers, templates, contacts, message content, media references, delivery events, webhooks, opt-in records, and automation settings.",
        "Technical and security information, such as IP address, browser and device details, timestamps, authentication events, logs, diagnostics, and abuse-prevention signals.",
        "Support, demo, survey, and other communications that you choose to send to us.",
        "Integration data needed for an action you request, including OAuth grants, approved scopes, tool arguments, requested results, and related audit records.",
      ],
    },
    {
      id: "sources",
      title: "Where information comes from",
      paragraphs: [
        "We receive information directly from you or your organisation, automatically from the website or service, from an authorised administrator or integration, and from platforms such as Meta when they return account, template, message, delivery, or billing events.",
        "If a Whats91 customer contacted you on WhatsApp, that customer is normally the source of your contact details and messaging instructions. Questions about why it contacts you should first be directed to that customer.",
      ],
    },
    {
      id: "purposes",
      title: "Why we use information",
      bullets: [
        "Provide, secure, support, troubleshoot, and improve the website and contracted services.",
        "Authenticate users, administer accounts, execute requested messages and automations, and return requested reports or tool results.",
        "Process subscriptions, usage records, invoices, taxes, payment issues, and service communications.",
        "Detect abuse, investigate security events, enforce our terms, and protect users and connected services.",
        "Respond to enquiries and send permitted marketing communications with an available opt-out.",
        "Comply with law, valid legal process, record-keeping requirements, and connected-platform policies.",
      ],
      note:
        "The legal ground depends on the context and applicable law. It may include consent, steps requested before or under a contract, compliance with law, and uses expressly permitted by applicable law. We do not describe contractual necessity or broad commercial interest as standalone DPDP grounds.",
    },
    {
      id: "customer-data",
      title: "Customer messaging data and opt-in responsibility",
      paragraphs: [
        "Business customers are responsible for required notices, valid permissions, lawful message purposes, opt-outs, and ensuring that uploaded contacts and content may be used. Whats91 provides technical tools; it does not create consent on a customer’s behalf.",
        "We use customer-controlled messaging data to provide and secure the requested service, comply with platform requirements, and meet documented legal obligations. We do not sell customer message content or use it to train a general-purpose AI model.",
      ],
    },
    {
      id: "sharing",
      title: "When information is shared",
      bullets: [
        "With Meta and WhatsApp services when required for customer-requested WhatsApp Business Platform features.",
        "With infrastructure, communications, support, security, professional, and payment providers that need it to perform a service for Whats91.",
        "With an authorised customer administrator, integration, or destination chosen by the customer.",
        "For a corporate transaction, subject to appropriate confidentiality and legal safeguards.",
        "When required by law or valid legal process, or reasonably necessary to protect rights, safety, and service integrity.",
      ],
      note:
        "The public subprocessor register remains a status page until the current provider list, processing locations, and change-notice process are factually verified.",
    },
    {
      id: "meta",
      title: "Meta and WhatsApp are independent platforms",
      paragraphs: [
        "Whats91 integrates with Meta and WhatsApp services, but those services operate under their own terms and privacy practices. Meta may independently process WhatsApp Business Account, message, billing, security, and platform-usage information. Customers should review the current terms that apply to their account.",
      ],
    },
    {
      id: "ai-mcp",
      title: "AI assistants and Whats91 MCP",
      paragraphs: [
        "A supported assistant can access only the Whats91 capabilities and account data needed for a tool operation that an authenticated user authorises. Whats91 does not receive a user’s complete assistant conversation history merely because the integration is connected.",
        "A result may be returned to the assistant provider selected by the user, which processes it under its own terms. Users should not submit passwords, API keys, one-time codes, complete card details, government identifiers, health information, or unrelated sensitive data through an MCP request.",
        "Disconnecting prevents new authorised requests but may not immediately erase security, audit, legal, or troubleshooting records already created.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and browser storage",
      paragraphs: [
        "The public website uses limited browser storage for consent choices and may use security technology such as Google reCAPTCHA on forms. At this notice’s date, Whats91 does not intentionally activate website analytics or advertising cookies on whats91.com. See the Cookie and Browser Storage Policy for the current inventory.",
      ],
    },
    {
      id: "retention",
      title: "Retention and deletion",
      paragraphs: [
        "We retain information only as long as reasonably needed for its purpose, an active service, security, dispute resolution, agreement enforcement, and tax, accounting, platform, or legal obligations.",
        "Retention differs by data type and customer configuration. Deletion may take additional time in backups and security records. We will not publish an exact period until the underlying product behavior and legal requirement are verified.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use safeguards appropriate to the service and information, but no internet service can guarantee absolute security. Customers remain responsible for users, credentials, connected systems, content, recipient permissions, and secure integration practices.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and data rights",
      paragraphs: [
        "Depending on applicable law and its commencement, you may request access to processing information, correction, erasure, consent withdrawal, grievance redressal, or nomination. Other rights may apply outside India. A request may be limited where identity cannot be verified or retention is required by law.",
        "If Whats91 processes your information only for a business customer, we may direct the request to that customer and assist it as appropriate. See the Data Rights and Grievance Procedure for instructions.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Whats91 is a business service and is not directed to children. Account administrators must be adults authorised to act for their organisation. Customers must not process a child’s data unless they have a lawful basis, required parental consent, and appropriate safeguards.",
      ],
    },
    {
      id: "transfers",
      title: "Cross-border processing",
      paragraphs: [
        "Connected platforms and providers may process information outside an individual’s state or country. Transfers are handled under applicable law, relevant contracts, and restrictions notified by a competent authority. This notice does not claim that all Whats91 data is stored only in India.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this notice",
      paragraphs: [
        "We may update this notice when services, providers, or legal obligations change. The effective date and version will be updated, and material changes will be communicated by a reasonable channel where required.",
      ],
    },
  ],
  related: [
    ...commonRelated,
    { label: "Cookie and Browser Storage Policy", href: "/cookies" },
    { label: "Subprocessor Disclosure", href: "/trust/subprocessors" },
  ],
};

export const termsDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Terms of Service",
  eyebrow: "Service agreement",
  summary:
    "These terms govern access to Whats91, including WhatsApp Cloud API tools, subscriptions, usage-based services, integrations, and professional services.",
  effectiveDate: "September 25, 2026",
  version: "2.0",
  sections: [
    {
      id: "agreement",
      title: "Agreement and contracting party",
      paragraphs: [
        "Whats91 is a service brand owned and operated by Wilford Technology. These Terms form an agreement between Wilford Technology, trading as Whats91, and the person or organisation accepting an order, creating an account, accessing the website, or using a service.",
        "If you use Whats91 for an organisation, you confirm authority to bind it. An order, proposal, statement of work, DPA, or enterprise agreement may add service-specific terms.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility and account responsibility",
      bullets: [
        "Administrators must be adults authorised to act for the customer.",
        "Registration, billing, business, and contact information must be accurate and current.",
        "Customers must protect credentials, restrict access, and promptly report suspected compromise.",
        "The customer is responsible for activity through its accounts, API credentials, integrations, users, and connected systems, except to the extent caused by Whats91’s proven breach.",
      ],
    },
    {
      id: "services",
      title: "Services and service documents",
      paragraphs: [
        "Whats91 may provide WhatsApp Cloud API onboarding and management, templates, automation, webhooks, team tools, reporting, integrations, support, and separately agreed professional services.",
        "The purchased plan, allowance, scope, support, and fees are defined in the checkout, order, proposal, or statement of work. Beta, preview, rolling-out, or third-party-dependent features may change or be withdrawn.",
      ],
    },
    {
      id: "meta-platform",
      title: "Meta and WhatsApp platform dependency",
      paragraphs: [
        "Whats91 connects to the WhatsApp Business Platform. Meta and WhatsApp operate their own networks, approvals, templates, pricing, policies, and enforcement. Whats91 cannot guarantee Meta approval, continued availability, delivery, template acceptance, quality rating, account restoration, or unchanged platform functionality.",
        "Customers must comply with current Meta and WhatsApp terms, messaging policies, commerce rules, documentation, and country or industry restrictions. A platform instruction or policy change may require Whats91 to restrict or modify access.",
      ],
    },
    {
      id: "waba",
      title: "WhatsApp Business Account and portability",
      paragraphs: [
        "A customer should retain appropriate control over its business assets and designate authorised administrators where the platform allows. Whats91 will not knowingly create or retain control of a WABA without the customer’s request or a valid service purpose.",
        "On a verified lawful migration request, Whats91 will reasonably assist with available portability steps, subject to Meta capabilities, security verification, undisputed charges, technical feasibility, and legally required retention. Portability does not transfer Whats91 software, credentials, confidential information, or intellectual property.",
      ],
    },
    {
      id: "permissions",
      title: "Recipient permission and lawful messaging",
      bullets: [
        "Obtain and retain valid opt-in or other required permission before initiating WhatsApp messages or calls.",
        "Clearly identify the business and communication types recipients should expect.",
        "Promptly respect every opt-out, block, and discontinuation request.",
        "Use approved templates and customer-service windows as required by Meta.",
        "Provide legally required notices and collect only information the customer may use.",
      ],
      note: "Whats91 tools do not convert purchased, scraped, borrowed, or unauthorised contact lists into valid consent.",
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: [
        "Customers must follow the Acceptable Use Policy. Prohibited conduct includes spam, deception, unlawful surveillance, harmful or illegal content, unauthorised access, security testing without permission, evasion of controls, and messaging for prohibited or improperly licensed activities.",
      ],
    },
    {
      id: "data",
      title: "Privacy and data processing",
      paragraphs: [
        "Each party must comply with applicable data law for its role. The customer determines the lawful purpose and recipients for customer-controlled messaging data. Whats91 processes it to provide and secure the service and as permitted by agreement and law.",
        "The Privacy Notice describes Whats91’s processing. Contract-specific processor obligations belong in an executed DPA; a reference to a DPA does not mean an unverified public template is already in force.",
      ],
    },
    {
      id: "fees",
      title: "Fees, taxes, and usage charges",
      paragraphs: [
        "Fees and cycles appear in the applicable checkout, proposal, or order. Unless stated otherwise, taxes are additional and subscriptions or prepaid services may require advance payment.",
        noMarkupPolicy + " Other third-party usage charges must be identified in the agreed commercial terms. Customers are responsible for authorised usage, subject to correction of verified errors.",
      ],
    },
    {
      id: "renewal",
      title: "Renewal, cancellation, and payment failure",
      paragraphs: [
        "The order or checkout must identify automatic renewal. Where enabled, the customer authorises disclosed recurring charges until cancellation takes effect. Cancellation normally stops future renewal and does not erase incurred charges.",
        "Failed or overdue payment may restrict access after reasonable notice where practicable. The Refund and Cancellation Policy explains correction and refund eligibility.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property and customer content",
      paragraphs: [
        "The customer retains its content, business data, brands, and materials and grants Whats91 a limited right to use them only as needed to provide, secure, and support the service.",
        "Whats91 and its licensors retain the platform, APIs, documentation, designs, software, workflows, improvements, and pre-existing materials. Bespoke ownership is governed by a signed statement of work.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      paragraphs: [
        "Each party must protect non-public business, technical, security, and commercial information and use it only for the agreement. This excludes information public without breach, independently developed, lawfully received, or legally required to be disclosed.",
      ],
    },
    {
      id: "support",
      title: "Support, maintenance, and availability",
      paragraphs: [
        "Whats91 uses reasonable efforts to operate and support the service. Maintenance, security events, internet failures, customer systems, Meta services, and other third parties can affect availability. A specific uptime, response time, or service credit applies only if stated in a signed order or SLA.",
      ],
    },
    {
      id: "suspension",
      title: "Suspension and termination",
      paragraphs: [
        "Whats91 may suspend or restrict service for non-payment, security risk, illegal activity, policy violations, platform instructions, or material breach. Where circumstances permit, we will provide notice and an opportunity to cure.",
        "On termination, access ends and outstanding amounts remain due. Customers should export needed data where an export is available. Retention and deletion follow the Privacy Notice, signed agreement, and law.",
      ],
    },
    {
      id: "warranties",
      title: "Disclaimers",
      paragraphs: [
        "Except for express signed commitments and rights that cannot be excluded, services are provided on an “as available” basis. Whats91 does not warrant uninterrupted service, universal compatibility, a business outcome, Meta approval, delivery, or freedom from every defect or security risk.",
      ],
    },
    {
      id: "liability",
      title: "Liability and indemnity",
      paragraphs: [
        "To the extent permitted by law, neither party is liable for indirect, special, punitive, or consequential loss. Whats91’s aggregate service-claim liability will not exceed fees paid for the affected service during the six months before the event, unless a signed agreement states another cap or law prohibits it.",
        "The customer will defend and indemnify Whats91 against third-party claims arising from unlawful content, unauthorised contact data, missing permission, misuse, or Meta-policy violations, except to the extent caused by Whats91’s breach or misconduct.",
      ],
    },
    {
      id: "general",
      title: "General terms and dispute resolution",
      paragraphs: [
        "The parties should first try to resolve disputes through written notice and direct discussion. These Terms are governed by Indian law and, subject to mandatory law, courts of competent jurisdiction in Ujjain, Madhya Pradesh have jurisdiction.",
        "If documents conflict, a signed order controls for its service, followed by an executed DPA for processing issues, these Terms, the AUP, and referenced policies. Meta and WhatsApp terms independently govern their platform.",
        "We may update these Terms for legal, security, platform, or service changes. Material changes will be communicated where required.",
      ],
    },
  ],
  resources: [
    {
      label: "WhatsApp Business Messaging Policy",
      href: "https://whatsappbusiness.com/policy/",
      description: "Recipient permission, message quality, restricted uses, and enforcement.",
    },
    {
      label: "WhatsApp Business Solution Terms",
      href: "https://www.whatsapp.com/legal/business-solution-terms/",
      description: "Terms governing use of the WhatsApp Business Platform.",
    },
  ],
  related: [
    ...commonRelated,
    { label: "Refund and Cancellation Policy", href: "/refund" },
    { label: "Service Level and Support Policy", href: "/sla" },
  ],
};

export const cookieDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Cookie and Browser Storage Policy",
  eyebrow: "Website storage choices",
  summary: "A factual inventory of the browser storage and third-party security technology currently used on the Whats91 public website.",
  effectiveDate: "September 25, 2026",
  version: "2.0",
  sections: [
    {
      id: "current-use",
      title: "Current website use",
      paragraphs: [
        "At this policy’s date, whats91.com uses limited first-party browser storage to remember cookie choices. The public website does not intentionally activate Google Analytics, Google Tag Manager, Meta Pixel, LinkedIn Insight Tag, Hotjar, or other advertising trackers.",
        "Submitting a valid enquiry loads Google reCAPTCHA for form verification; simply opening the demo form does not load it. Google may receive technical information and use cookies or similar storage under its own terms when reCAPTCHA loads or a protected form is used. Optional-category choices do not control this verification.",
        "Blog and author avatar placeholders use local text rather than requesting an external avatar service. This does not describe every external request made by the website.",
      ],
    },
    {
      id: "inventory",
      title: "Storage inventory",
      bullets: [
        "whats91_cookie_consent — a first-party localStorage entry recording the policy version, optional-category choices, and update time. It remains until cleared or replaced.",
        "Google reCAPTCHA storage — third-party security storage that may distinguish legitimate users from automated abuse. Duration and exact names are controlled by Google and may vary.",
        "Temporary browser or framework data — short-lived technical caching needed to load pages securely; Whats91 does not use it for advertising profiles.",
      ],
      note: "localStorage is browser storage, not a cookie, but it is described here because it serves a similar preference function.",
    },
    {
      id: "categories",
      title: "Categories",
      bullets: [
        "Essential and security: required for preference storage, form protection, service integrity, and core operation.",
        "Analytics: optional and currently inactive on the public website.",
        "Marketing: optional and currently inactive on the public website.",
      ],
    },
    {
      id: "choices",
      title: "Your choices",
      paragraphs: [
        "The banner lets you keep optional categories off, allow them, or save individual category choices. Because analytics and marketing are currently inactive, accepting them does not itself load an analytics or advertising vendor.",
        "You can reopen Cookie Settings from the website footer. Clearing site data removes the saved preference and the banner may appear again.",
        "If browser storage is blocked or a save cannot be confirmed, the interface explains that choices apply to the current page and may not be remembered after reload. Missing or unreadable saved choices require a new selection. A legacy general acceptance does not establish individual analytics or marketing choices.",
      ],
    },
    {
      id: "future-changes",
      title: "Before optional tracking is enabled",
      paragraphs: [
        "If Whats91 later introduces analytics or advertising technology, we will update this inventory and configure the site so optional technology is not intentionally activated before an applicable choice is available. Consent saved for this version is not blanket permission for an undisclosed vendor or materially different purpose.",
      ],
    },
    {
      id: "browser-controls",
      title: "Browser controls",
      paragraphs: [
        "Most browsers let you block cookies, clear local storage, and limit third-party content. Blocking essential security functions may prevent a form or protected feature from working correctly.",
      ],
    },
    {
      id: "updates",
      title: "Policy updates",
      paragraphs: ["We update this policy when the actual storage inventory or vendors change. The version and effective date identify the applicable disclosure."],
    },
  ],
  resources: [{ label: "Google Privacy Policy", href: "https://policies.google.com/privacy", description: "Applies to Google reCAPTCHA processing controlled by Google." }],
  related: [...commonRelated, { label: "Privacy Notice", href: "/privacy" }],
};

export const refundDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Refund and Cancellation Policy",
  eyebrow: "Billing and cancellation",
  summary: "This policy explains subscription cancellation, usage charges, billing corrections, project deposits, and the process for requesting a refund review.",
  effectiveDate: "September 25, 2026",
  version: "2.0",
  sections: [
    {
      id: "scope",
      title: "Scope",
      paragraphs: ["This policy applies to purchases made directly from Whats91 unless a signed order, proposal, statement of work, or enterprise agreement contains a different term. Purchases through another seller or platform follow that seller’s process."],
    },
    {
      id: "subscriptions",
      title: "Subscriptions and renewal",
      paragraphs: [
        "The checkout or order should state the billing cycle and whether renewal is automatic. Cancellation stops the next renewal when received before the disclosed billing cutoff. Access normally continues through the paid period unless suspended for cause.",
        "Unused time is not automatically refundable. We will review verified duplicate charges, incorrect billing, non-delivery, and rights under mandatory law.",
      ],
    },
    {
      id: "usage",
      title: "WhatsApp and usage-based charges",
      paragraphs: [
        noMarkupPolicy + " Usage charges are calculated from the applicable plan, effective rate card and available billing or delivery records. These components should be distinguishable in the commercial document or invoice.",
        "A mere send attempt will not be described as a Meta-delivered charge unless the applicable Meta pricing rule or underlying billing record charges that event. Disputed usage will be reviewed against available records.",
      ],
    },
    {
      id: "credits",
      title: "Prepaid credits and quotas",
      paragraphs: ["Used credits and fulfilled quotas are generally not refundable. The order or plan should state any validity or expiry rule. Where no expiry was disclosed, Whats91 will not invent one after purchase."],
    },
    {
      id: "projects",
      title: "Implementation and project work",
      paragraphs: ["A proposal may designate a reasonable mobilisation deposit as non-refundable once scheduled work begins. If a project is cancelled, the customer remains responsible for accepted milestones and documented work performed. Any unused balance is reviewed under the signed scope and mandatory law."],
    },
    {
      id: "eligible-review",
      title: "When a correction or refund review is available",
      bullets: [
        "A verified duplicate or unauthorised charge.",
        "A material billing-system error or charge inconsistent with the order or usage record.",
        "A paid service Whats91 did not provide, subject to agreed dependencies and force-majeure terms.",
        "A defective, deficient, misdescribed, or late consumer service where mandatory law requires a remedy.",
        "Any additional circumstance stated in a signed agreement.",
      ],
    },
    {
      id: "request",
      title: "How to request a review",
      paragraphs: [
        "Email support@whats91.com promptly with the account email, invoice or transaction reference, amount, date, reason, and supporting evidence. Do not send complete card numbers, passwords, API keys, or one-time codes.",
        "We will acknowledge the request, may verify identity or authority, and communicate the outcome and applicable refund timeframe. Payment-provider processing time is outside Whats91’s control.",
      ],
    },
    {
      id: "chargebacks",
      title: "Payment disputes and chargebacks",
      paragraphs: ["Contacting support first usually allows faster investigation. A chargeback may temporarily restrict the account while reviewed. Whats91 may submit relevant order, invoice, usage, and support records to the payment provider."],
    },
    {
      id: "mandatory-rights",
      title: "Mandatory rights",
      paragraphs: ["Nothing here excludes a refund, correction, cancellation, warranty, or consumer right that cannot lawfully be excluded. Business-to-business contracts may have different remedies from consumer transactions."],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: ["Changes apply prospectively from the displayed effective date unless law requires otherwise. A change will not retrospectively remove a right that already arose under an order or mandatory law."],
    },
  ],
  related: [...commonRelated, { label: "Service Level and Support Policy", href: "/sla" }],
};

export const complianceDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "DPDP Readiness Statement",
  eyebrow: "India data-protection readiness",
  summary: "Whats91’s readiness approach for India’s Digital Personal Data Protection framework without an unverified designation or premature full-compliance claim.",
  effectiveDate: "September 25, 2026",
  version: "2.0",
  status: "Readiness statement — phased law commencement",
  sections: [
    {
      id: "status",
      title: "Current legal status",
      paragraphs: [
        "The DPDP Act, 2023 and DPDP Rules, 2025 have phased commencement dates. As of this statement’s effective date, several institutional provisions are in force, section 6(9) and section 27(1)(d) are scheduled one year after the 13 November 2025 notification, and most operational obligations and rights are scheduled eighteen months after it.",
        "Whats91 is preparing for the framework while following other applicable Indian privacy, technology, contract, and consumer requirements. This page is not a certification and does not claim every DPDP obligation is already in force.",
      ],
    },
    {
      id: "roles",
      title: "Roles",
      paragraphs: [
        "Whats91 expects to act as a Data Fiduciary for information it controls about website visitors, administrators, prospects, and billing or support contacts. For customer-controlled contact and messaging data, Whats91 generally acts on the customer’s instructions as a processor or service provider.",
        "Whats91 does not claim Significant Data Fiduciary status. That status applies only if the Central Government notifies Whats91 or a class that includes it.",
      ],
    },
    {
      id: "notices-consent",
      title: "Notices, consent, and permitted uses",
      paragraphs: ["Readiness work includes clear notices, itemised data descriptions, specified purposes, and straightforward consent withdrawal where consent is used. Other processing will be assessed against uses permitted by applicable law rather than imported legal bases not provided by the DPDP Act."],
    },
    {
      id: "rights",
      title: "Data Principal rights",
      paragraphs: [
        "When the relevant provisions apply, the framework provides rights to access processing information, correction and erasure, grievance redressal, and nomination. Consent withdrawal is supported where consent is the basis.",
        "Data portability is not presented as a DPDP statutory right. It may still be offered contractually or required by another law or platform term.",
      ],
    },
    {
      id: "security",
      title: "Security readiness",
      paragraphs: ["The readiness program considers access control, logging, monitoring, backups, incident handling, secure vendor arrangements, and protections appropriate to the data and service. Cipher, certification, penetration-test, or universal MFA claims will be published only after scope and evidence are verified."],
    },
    {
      id: "breach",
      title: "Personal data breach readiness",
      paragraphs: ["The notified Rules contemplate notice to affected Data Principals and an initial intimation to the Board without delay, followed by specified details to the Board within seventy-two hours unless a longer period is allowed. Whats91 is aligning its response process to requirements applicable at the time of an incident."],
    },
    {
      id: "retention",
      title: "Retention and erasure",
      paragraphs: ["Retention will be tied to specified purposes, customer instructions, security and audit needs, and legal records. We do not promise universal deletion within thirty days where backups, fraud prevention, disputes, platform records, or law require a different period."],
    },
    {
      id: "children",
      title: "Children’s data",
      paragraphs: ["Whats91 is intended for business users. Where relevant DPDP provisions apply, processing a child’s data requires the safeguards and parental consent required by law unless an exemption exists. Customers are responsible for age-appropriate messaging programmes."],
    },
    {
      id: "transfers",
      title: "Processing outside India",
      paragraphs: ["The DPDP framework allows transfers subject to restrictions or requirements specified by the Central Government. This statement does not claim a general India-only storage requirement or present GDPR Standard Contractual Clauses as a standalone DPDP requirement."],
    },
    {
      id: "grievances",
      title: "Questions and grievances",
      paragraphs: ["Until a formally appointed DPO or different grievance contact is confirmed, send privacy questions to support@whats91.com with the subject “Privacy request”. Whats91 will verify the requester and respond within the period required by applicable law."],
    },
    {
      id: "updates",
      title: "Readiness updates",
      paragraphs: ["This statement will be updated as provisions commence and Whats91 verifies controls, contacts, retention schedules, and service-provider records."],
    },
  ],
  resources: [
    { label: "Digital Personal Data Protection Act, 2023", href: "https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf" },
    { label: "DPDP Act commencement notification", href: "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf" },
    { label: "Digital Personal Data Protection Rules, 2025", href: "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf" },
  ],
  related: [...commonRelated, { label: "Security Statement", href: "/trust/security" }],
};

export const acceptableUseDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Acceptable Use Policy",
  eyebrow: "Responsible messaging",
  summary: "Rules for lawful, consent-based, secure use of Whats91 and the WhatsApp Business Platform.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  sections: [
    { id: "scope", title: "Scope and responsibility", paragraphs: ["This policy applies to every customer, user, integration, API client, automation, campaign, and contractor using Whats91. Customers are responsible for account activity and for ensuring their users and providers comply."] },
    {
      id: "consent",
      title: "Permission and recipient expectations",
      bullets: [
        "Contact people only after receiving their phone number or identifier and valid permission for the expected WhatsApp communication.",
        "Keep evidence of permission appropriate to the message category, purpose, and applicable law.",
        "Identify the sending business accurately and do not impersonate another person or organisation.",
        "Provide a clear opt-out and promptly honour blocks and discontinuation requests.",
        "Do not use scraped, purchased, guessed, or borrowed lists unless every recipient independently gave valid permission for the specific sender and purpose.",
      ],
    },
    { id: "platform-rules", title: "WhatsApp platform rules", paragraphs: ["Use approved templates, service windows, quality controls, commerce features, calling features, and automation only as allowed by current Meta and WhatsApp terms, policies, and documentation. Customers must maintain accurate business and support information and comply with country, licence, age, and industry restrictions."] },
    {
      id: "prohibited",
      title: "Prohibited activity",
      bullets: [
        "Illegal, fraudulent, deceptive, abusive, harassing, discriminatory, exploitative, or rights-infringing activity.",
        "Spam, unsolicited bulk messaging, misleading sender identity, engagement manipulation, or evasion of recipient or platform controls.",
        "Malware, credential theft, phishing, unauthorised access, vulnerability exploitation, denial of service, or security testing without written permission.",
        "Sale, promotion, or facilitation of activities prohibited by WhatsApp policy or applicable law.",
        "Collection or transmission of unnecessary sensitive identifiers, complete card numbers, passwords, API keys, one-time codes, or health information where the service is not approved for that use.",
        "Using Business Solution Data to build unrelated profiles, sell data, or train or improve a general-purpose AI model in violation of applicable WhatsApp terms.",
      ],
    },
    { id: "automation", title: "Automation and human escalation", paragraphs: ["Automations must be accurate, proportionate, and able to respect opt-outs and access restrictions. Where required by WhatsApp policy or appropriate to the use case, customers must provide a prompt and direct route to a human or another effective support channel."] },
    { id: "fair-use", title: "Operational integrity and fair use", paragraphs: ["Do not place unreasonable load on the service, bypass rate or plan limits, interfere with other customers, reverse engineer protected components, or resell access except under an authorised partner agreement."] },
    { id: "enforcement", title: "Enforcement", paragraphs: ["Whats91 may investigate credible misuse, request permission evidence, restrict campaigns or features, preserve relevant records, suspend access, or terminate service. Urgent action may occur without advance notice to protect people, systems, or platform access. Where practicable, we will explain the basis and remediation path."] },
    { id: "reporting", title: "Report misuse", paragraphs: ["Report suspected abuse or compromise to support@whats91.com. Include the sending business, phone number, dates, message examples, and evidence, but do not send passwords or authentication secrets."] },
  ],
  resources: [
    { label: "WhatsApp Business Messaging Policy", href: "https://whatsappbusiness.com/policy/" },
    { label: "WhatsApp Business Solution Terms", href: "https://www.whatsapp.com/legal/business-solution-terms/" },
  ],
  related: commonRelated,
};

export const dataRightsDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Data Rights and Grievance Procedure",
  eyebrow: "Privacy requests",
  summary: "How individuals can ask Whats91 about personal data, request correction or erasure, withdraw consent, or raise a privacy grievance.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  sections: [
    {
      id: "requests",
      title: "Requests you can make",
      bullets: [
        "Ask for information about personal data and processing where applicable law provides that right.",
        "Correct inaccurate or incomplete personal data.",
        "Request erasure where the purpose is complete and no retention requirement applies.",
        "Withdraw consent for future processing where consent is the basis.",
        "Raise a grievance about privacy, security, or an earlier request.",
        "Nominate another individual to exercise applicable DPDP rights in circumstances provided by law once that right applies.",
      ],
    },
    { id: "submit", title: "How to submit a request", paragraphs: ["Email support@whats91.com with the subject “Privacy request”. Include your name, linked email or phone, organisation or Whats91 customer involved, requested right, and enough context to locate the information.", "Do not send passwords, API keys, one-time codes, complete card numbers, or unnecessary identity documents in the first email."] },
    { id: "verification", title: "Identity and authority verification", paragraphs: ["We may ask for proportionate information to verify identity, account authority, or a lawful representative. We will not disclose account or message data when the requester cannot be reliably connected to it."] },
    { id: "customer-data", title: "Requests involving a Whats91 customer", paragraphs: ["If a business contacted you using Whats91, that business normally decides why your information is used. Contact it first. When Whats91 processes the data for that customer, we may forward the request and provide reasonable assistance without independently changing records unless authorised or legally required."] },
    { id: "response", title: "Response and limitations", paragraphs: ["We will acknowledge and respond within the period required by applicable law. A request may be limited where retention or disclosure is legally required, another person’s rights would be affected, identity cannot be verified, or the request is manifestly fraudulent or abusive."] },
    { id: "grievance", title: "Grievance and escalation", paragraphs: ["If you disagree with the response, reply with the original request reference and unresolved issue. Relevant DPDP rights require using the Data Fiduciary’s grievance process before approaching the Board. Other complaint routes may apply under other laws."] },
  ],
  related: [...commonRelated, { label: "DPDP Readiness Statement", href: "/compliance" }],
};

export const securityDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Security Statement",
  eyebrow: "Trust and shared responsibility",
  summary: "A conservative description of Whats91’s security approach, customer responsibilities, and incident-reporting channel.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  sections: [
    { id: "approach", title: "Our approach", paragraphs: ["Whats91 uses technical and organisational measures intended to protect confidentiality, integrity, and availability. Measures are selected according to the service, data, risk, and available technology. This is not a certification or a guarantee that every incident can be prevented."] },
    {
      id: "safeguards",
      title: "Safeguard categories",
      bullets: [
        "Access controls and authentication appropriate to administrative and service functions.",
        "Encrypted network transport where supported by the protocol and connected service.",
        "Logging, monitoring, and diagnostics for reliability, abuse prevention, and incident investigation.",
        "Backup, recovery, and change-management practices appropriate to the service component.",
        "Vendor and contractual controls appropriate to providers processing information for Whats91.",
        "Processes for vulnerability handling, incident escalation, and service restoration.",
      ],
      note: "Whats91 does not publicly claim universal TLS versions, at-rest encryption coverage, MFA coverage, penetration-test frequency, or certifications until scope and evidence are verified.",
    },
    {
      id: "customer-responsibility",
      title: "Customer responsibilities",
      bullets: [
        "Use unique credentials and available multi-factor authentication, and promptly remove access when roles change.",
        "Protect API keys, tokens, webhook secrets, connected systems, and devices.",
        "Grant least-privilege access and regularly review administrators and integrations.",
        "Validate webhook destinations, restrict logs, and avoid secrets or unnecessary sensitive data in messages.",
        "Report suspected compromise promptly and cooperate with containment steps.",
      ],
    },
    { id: "incidents", title: "Incident handling", paragraphs: ["When Whats91 confirms an incident affecting customer information, it will investigate, contain, remediate, preserve relevant evidence, and provide notices required by law or contract. Timing and detail depend on the facts, investigation security, and legal requirements."] },
    { id: "reporting", title: "Report a security concern", paragraphs: ["Send a concise report to support@whats91.com with the subject “Security report”. Include the affected URL or feature, reproduction steps, impact, and safe evidence. Do not access other users’ data, disrupt service, use social engineering, or publish exploitable details before a reasonable investigation opportunity."] },
    { id: "assurance", title: "Assurance boundary", paragraphs: ["Security questionnaires, architecture details, test reports, or contract-specific assurances may be available to eligible customers subject to verification, confidentiality, and the purchased service. A website statement does not amend a signed security schedule."] },
  ],
  related: [...commonRelated, { label: "Subprocessor Disclosure", href: "/trust/subprocessors" }],
};

export const slaDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Service Level and Support Policy",
  eyebrow: "Support expectations",
  summary: "The default support and availability framework for Whats91, with contract-specific SLA commitments kept separate.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  sections: [
    { id: "scope", title: "Scope", paragraphs: ["This policy describes the default operational framework. A binding uptime percentage, response target, service credit, or dedicated support commitment applies only when stated in a signed order, proposal, or enterprise SLA."] },
    { id: "availability", title: "Availability", paragraphs: ["Whats91 uses reasonable efforts to keep services available. Availability can be affected by maintenance, security events, networks, Meta or WhatsApp services, customer systems, third-party providers, force majeure, and misuse. The public website alone does not create a 99.9% or other numerical SLA."] },
    {
      id: "support",
      title: "Support channel and priorities",
      paragraphs: ["Send support requests through the channel identified in the customer’s plan or to support@whats91.com. Include the account, affected feature, impact, timestamps, error text, and safe reproduction details."],
      bullets: [
        "Critical: a verified broad production outage or severe security event with no reasonable workaround.",
        "High: a major customer workflow is materially impaired.",
        "Normal: a limited defect, configuration issue, billing question, or general support request.",
        "Request: guidance, feature feedback, or planned change assistance.",
      ],
    },
    { id: "maintenance", title: "Maintenance and changes", paragraphs: ["We may perform maintenance and urgent security changes. Where practicable, material planned disruption will be communicated. Emergency work may occur without advance notice."] },
    { id: "dependencies", title: "Third-party dependencies", paragraphs: ["Meta, WhatsApp, internet, hosting, telecom, payment, and customer-controlled systems are outside Whats91’s complete control. A third-party incident is not automatically a Whats91 SLA breach, although we will use reasonable efforts to diagnose and communicate relevant impact."] },
    { id: "credits", title: "Service credits", paragraphs: ["Service credits are available only where an executed agreement defines the metric, exclusions, claim window, calculation, and remedy. No credit is created by a marketing statement or this general policy."] },
  ],
  related: [...commonRelated, { label: "Security Statement", href: "/trust/security" }],
};

export const dpaStatusDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Data Processing Agreement Status",
  eyebrow: "Contractual data processing",
  summary: "Status information for customers that require contractual processor terms. This page is not itself an executed DPA.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  status: "Status page — public template pending verified processing details",
  sections: [
    { id: "status", title: "Current status", paragraphs: ["Whats91 is validating legal entity details, service scope, data categories, retention, security measures, subprocessors, processing locations, and transfer terms needed for an accurate public DPA.", "Until verification is complete, Whats91 will not publish a template that invents providers, locations, safeguards, certifications, or deletion periods."] },
    { id: "roles", title: "Expected role structure", paragraphs: ["For customer-controlled contacts, messages, templates, media, delivery events, and automation records, the customer generally determines the purpose and Whats91 processes information to provide the service. Whats91 separately controls account, billing, security, and business records described in the Privacy Notice."] },
    { id: "request", title: "Request contract-specific terms", paragraphs: ["Customers with a procurement or regulatory need may email support@whats91.com with the subject “DPA request” and identify the service, organisation, applicable law, and required date. A DPA becomes binding only when accepted by authorised parties through the agreed process."] },
  ],
  related: [...commonRelated, { label: "Subprocessor Disclosure", href: "/trust/subprocessors" }, { label: "Security Statement", href: "/trust/security" }],
};

export const subprocessorStatusDocument: LegalDocument = {
  editorial: { stage: "pending-human-review", history: [] },
  title: "Subprocessor Disclosure Status",
  eyebrow: "Service-provider transparency",
  summary: "Status of the public list of providers that may process customer-controlled personal data for Whats91.",
  effectiveDate: "September 25, 2026",
  version: "1.0",
  status: "Status page — provider register under factual verification",
  sections: [
    { id: "status", title: "Why no provider list is published yet", paragraphs: ["A useful register must accurately identify the contracting provider, purpose, data categories, and relevant processing location. Whats91 is validating those details against systems used to provide the service.", "We will not copy a competitor’s list or infer providers from website code. A provider will be named only after its role and current use are confirmed."] },
    { id: "approach", title: "Provider-management approach", paragraphs: ["Whats91 expects providers processing customer-controlled personal data to use it only for the contracted service, protect it appropriately, support incident response, and comply with applicable law and contractual restrictions. Precise obligations depend on the provider and service."] },
    { id: "requests", title: "Customer requests and future updates", paragraphs: ["A customer needing contract-specific provider information may contact support@whats91.com. Once verified, this page will identify the current list and explain any change-notice or objection process."] },
  ],
  related: [...commonRelated, { label: "DPA Status", href: "/legal/dpa" }, { label: "Security Statement", href: "/trust/security" }],
};
