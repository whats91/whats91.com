// Public reader guidance, not a capability or approval registry.
// Product, assurance, results and publication decisions remain in legal-policy-inputs.md.
export interface BusySection {
  id: string;
  aliases?: string[];
  title: string;
  text: string;
  items?: { title: string; text: string }[];
  table?: { headers: string[]; rows: string[][] };
}
export interface BusySolution {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  scope: string;
  steps: { title: string; text: string }[];
  sections: BusySection[];
  faqs: { question: string; answer: string }[];
  related: string[];
}
export const busySolutions: Record<string, BusySolution> = {
  "busy-erp": {
    slug: "busy-erp", name: "Busy WhatsApp integration",
    title: "Busy Accounting WhatsApp Integration",
    description: "Plan Busy invoice, receipt and ledger workflows on WhatsApp. Check sender eligibility, data mappings, customer permissions and delivery handling before launch.",
    intro: "Choose which accounting documents to send and which account questions customers should be able to ask. An outbound invoice workflow and a customer-requested ledger menu need different triggers and permissions.",
    scope: "This guide describes workflows to scope with Whats91. Confirm the Busy version, enabled connector, sender and template eligibility, account access and plan terms before relying on any workflow. Sending a request does not activate an integration.",
    steps: [
      { title: "Select the Busy record", text: "Identify the company, customer, voucher or report and the fields needed for the task." },
      { title: "Map recipient and permission", text: "Match the record to the intended recipient; decide who may request that account's information." },
      { title: "Prepare the message", text: "Agree the trigger, template or reply format and any PDF attachment for the enabled setup." },
      { title: "Check the result", text: "Handle rejected requests and delivery failures; route unresolved queries to the accounts team." },
    ],
    sections: [
      { id: "pillars-heading", title: "Outbound documents or an inbound menu?", text: "Use an event or schedule for a business-initiated message. Use an authenticated account lookup for a customer question. A message accepted for sending is not proof that the recipient received or read it.", items: [
        { title: "Document delivery", text: "Scope invoice or receipt PDFs, recipient mapping, template variables, permission to contact and failure handling." },
        { title: "Customer requests", text: "Scope balance, ledger or receipt options and the checks that bind a request to the correct customer account." },
      ] },
      { id: "use-cases-heading", aliases: ["use-cases"], title: "A menu built around accounting tasks", text: "These are candidate menu actions, not a list enabled for every account. Confirm the source record and output for each option.", table: { headers: ["Action", "Input to map", "Output to scope"], rows: [
        ["Check balance", "Company and party ledger", "Balance text with period or as-of context"],
        ["Bill-by-bill ledger", "Party, period and bill references", "Debit/credit detail; PDF if configured"],
        ["Last receipt", "Selected receipt voucher", "Receipt reference or PDF"],
        ["Bilty status", "Mapped transport record", "Available bilty/dispatch fields"],
        ["Download statement", "Party and date range", "Period statement PDF if configured"],
        ["Talk to team", "Unresolved question and routing context", "Handoff to a designated accounts queue"],
      ] } },
      { id: "how-heading", title: "Separate data retrieval from messaging", text: "The Busy API path explains the data contract. This page covers how an accounting record becomes a message or a menu reply. Agree whether the connector uses an event, polling or a snapshot; the freshness of a reply depends on that arrangement." },
      { id: "automations-heading", title: "Choose the trigger and stop condition", text: "Illustrative tasks include sending an invoice after an eligible entry, a receipt after reconciliation, an outstanding reminder on an agreed schedule, or a dispatch update when a mapped record changes. Stop reminders when the account is settled or disputed. A saved voucher alone does not confirm funds or delivery." },
      { id: "reports-heading", title: "Reports and vouchers to discuss", text: "Retain the distinction between a report over a period and a document for a transaction. Availability depends on the connector and your Busy data.", items: [
        { title: "Reports", text: "Outstanding/balance summary, bill-by-bill ledger, sales summary, stock and dispatch reports." },
        { title: "Vouchers", text: "Sales invoice, receipt, payment voucher, credit/debit note and bilty/transport document." },
      ] },
      { id: "security-heading", title: "Agree who can see each account", text: "Confirm recipient verification, company/party access boundaries, credential handling, request logs and retention for the selected setup. Review messaging permission, template approval and opt-out handling. This workflow description does not certify controls or compliance." },
      { id: "industries-heading", title: "Where this task fits", text: "A distributor may need invoice and outstanding replies; a manufacturer may need dispatch documents; a transport business may need mapped bilty fields. These are hypothetical uses. They do not establish a customer result or support for every industry record." },
      { id: "onboarding-heading", title: "Prepare a small integration scope", text: "Bring the Busy version and export/connector access, company and party mappings, the intended WhatsApp number and an example document with private values removed. Agree the menu, recipient rules, test cases, exception owner and written launch terms. Setup time depends on those prerequisites." },
    ],
    faqs: [
      { question: "Does this use WhatsApp Web automation?", answer: "The workflow discussed here uses the WhatsApp Business Platform path. Confirm the actual sender setup, enabled connector and permitted message formats for your account; the diagram does not establish approval or delivery." },
      { question: "Can a customer request a bill-by-bill ledger?", answer: "Scope a lookup using the authorized company, party and period. Confirm the available bill references, dates, debit/credit fields and PDF format with the connector before exposing the menu." },
      { question: "Does saving a receipt send it automatically?", answer: "Only an enabled and configured trigger could do that. Agree whether it runs on entry, synchronization or reconciled payment, and how failures and duplicate events are handled. No fixed delivery time is promised." },
      { question: "How do outbound templates and human handoff fit?", answer: "Check sender/template eligibility and permission to contact before outbound messaging. Define a human accounts destination for disputes, missing records and unsupported requests; unattended replies do not mean staffed support is available at all hours." },
      { question: "What data is stored?", answer: "Confirm the actual connector's storage, processing locations, logs, retention and provider responsibilities in the agreed setup. This guide does not establish a storage or privacy policy. Review the Privacy and Legal Center pages before sharing production data." },
    ], related: ["busy-api", "busy-reports", "busy-ai-agent"],
  },
  "busy-api": {
    slug: "busy-api", name: "Busy API",
    title: "Busy Accounting API: Data Contracts and Outputs",
    description: "Scope a Busy Accounting API for ledgers, outstanding, sales and inventory. Compare standard mappings, custom queries and JSON, HTML or PDF output needs.",
    intro: "For developers connecting Busy data to a CRM, dashboard or ordering application, start with the data contract: which company and period, which fields, which response format and which errors the receiving application must handle.",
    scope: "The architecture below is a scoping example. Obtain the current endpoint documentation and confirm enabled reports, credentials, filters, limits and deployment prerequisites for your account. No endpoint or sandbox access is granted by this page.",
    steps: [
      { title: "Application requests data", text: "Pass only the company, party and date filters authorized by the agreed contract." },
      { title: "Connector obtains records", text: "Use the configured Busy source or synchronized snapshot; establish its freshness." },
      { title: "Map and format", text: "Apply the selected report mapping or reviewed custom query and output format." },
      { title: "Application handles response", text: "Validate fields and handle empty, stale, denied or failed results before displaying or acting." },
    ],
    sections: [
      { id: "comparison-heading", title: "Standard mapping or a custom query?", text: "Compare the implementation work for your data requirement. Neither option implies unrestricted database access or a guaranteed setup date.", table: { headers: ["Decision", "Standard mapping", "Custom query"], rows: [
        ["Data shape", "Use a confirmed report schema", "Agree fields, joins and calculations"],
        ["Filters", "Confirm supported company/party/date filters", "Review additional voucher or branch rules"],
        ["Maintenance", "Check schema/version compatibility", "Retest business logic when the source changes"],
        ["Fit", "A receiving app can use the mapped report", "The required report differs from the available mapping"],
      ] } },
      { id: "ledger-heading", title: "Choose the ledger output for the receiving app", text: "Confirm which formats your endpoint supports. A PDF is a document; JSON still needs application logic; HTML still needs safe rendering and styling review.", items: [
        { title: "JSON", text: "Structured rows for a custom interface or downstream calculation: bill reference, date, debit/credit and balances as defined by the schema." },
        { title: "HTML", text: "A display-oriented ledger if available. Review escaping, accessibility and layout before embedding it in a portal." },
        { title: "PDF", text: "A printable statement if configured. Check the selected party, period and document fields before sharing." },
      ] },
      { id: "endpoints-heading", title: "Report contracts to request", text: "Ask for the current routes, HTTP methods, authentication, schemas and error responses for ledger, outstanding, sales, inventory and any HTML/PDF ledger variant. Paths shown in earlier illustrations were examples; they are not executable endpoints on this marketing website." },
      { id: "security-heading", title: "Confirm access and operating limits", text: "Review authentication, company boundaries, approved query scope, network restrictions, logging and retention with the integration owner. Obtain actual rate limits, timeouts and availability terms. Token access alone is not a guarantee of isolation or uptime." },
      { id: "targets-heading", title: "Route the output to the right reader", text: "A CRM may need party balances; a BI dashboard may need sales rows; an ordering portal may need stock and prices. Each target needs its own mapping and error handling. The API is the retrieval layer; WhatsApp automation, report viewing and Sheet refresh are separate consumers." },
      { id: "setup-heading", title: "What a technical scope should contain", text: "Provide your Busy version, company selection, sample schema with private values removed, expected volume and receiving application. Agree authentication, permissions, freshness, pagination if needed, error/retry behavior and a permitted test environment. Confirm the production release and support terms separately." },
    ], faqs: [
      { question: "Must the Busy computer stay online?", answer: "It depends on the connector and deployment. A cloud snapshot can serve only the data already synchronized; new local changes need an available source connection. Agree freshness and outage behavior before relying on it." },
      { question: "Can a custom query access any Busy data?", answer: "Do not assume that. Confirm the supported schema, licensed features, permission scope and reviewed query with the owner. Company, financial-year, branch and voucher filters depend on the actual contract." },
      { question: "Are API calls unlimited?", answer: "No unlimited-call promise is made here. Obtain the account's limits, expected volume, timeout and retry policy in writing. Design for throttling and failed requests." },
      { question: "Which formats and endpoints are available?", answer: "The planning choices are JSON data, display-oriented HTML and printable PDF ledgers. Obtain current endpoint documentation to confirm which report and format combinations are enabled; the website does not execute them." },
    ], related: ["busy-erp", "busy-reports", "busy-google-sheet", "busy-ecommerce"],
  },
  "busy-ai-agent": {
    slug: "busy-ai-agent", name: "Busy AI collections",
    title: "Busy ERP AI Collections: Boundaries and Handoffs",
    description: "Plan an AI-assisted Busy collections workflow on WhatsApp. Define invoice context, permitted responses, human escalation and payment reconciliation first.",
    intro: "An accounts team needs to know which invoice a customer is discussing, whether the balance is current and when a person must take over. Scope conversational assistance around those decisions before allowing messages or financial actions.",
    scope: "These are planning examples, not confirmation of a deployed autonomous agent. Confirm enabled AI and integration features, account eligibility and plan terms. Payment methods, settlement actions and negotiation permissions require separate confirmation; no recovery or ROI result is promised.",
    steps: [
      { title: "Read permitted context", text: "Select the company, party, invoice, due date and reconciled payment state." },
      { title: "Interpret the request", text: "Identify the invoice question; uncertain matches or disputes need a person." },
      { title: "Apply business boundaries", text: "Use only approved responses and actions; settlement authority must be explicit." },
      { title: "Record and hand off", text: "Keep the relevant context for an accounts reviewer and verify payment in the source system." },
    ], sections: [
      { id: "crisis-heading", title: "Start with the follow-up work you actually have", text: "List time spent finding invoices, answering balance questions, checking receipts and handling disputes. Use that baseline to decide which tasks are suitable for assistance. A generic savings percentage cannot establish your business case." },
      { id: "core-features-heading", aliases: ["pillars-heading"], title: "Four boundaries for conversational assistance", text: "Perception, reasoning, action and review are a useful way to separate responsibilities. They describe a design to validate, not a shipped learning or negotiation capability.", items: [
        { title: "Invoice context", text: "Retrieve only the required account records. Show the data period and check synchronization before answering." },
        { title: "Response choices", text: "Separate requests for a statement, a claimed payment and an invoice dispute. Escalate ambiguity instead of inventing an answer." },
        { title: "Permitted actions", text: "Define which replies or links are allowed. Discounts, interest waivers and installments need explicit authority and review." },
        { title: "Review loop", text: "Review exceptions and inappropriate replies. Model changes require evaluation; feedback is not proof of autonomous improvement." },
      ] },
      { id: "comparison-heading", title: "Fixed reminders or conversational assistance?", text: "Choose based on the task and review capacity. Both need correct records, contact permission and failure handling.", table: { headers: ["Task", "Fixed workflow", "AI-assisted workflow to validate"], rows: [
        ["Known due-date message", "An agreed schedule and template", "May add little value for a fixed reminder"],
        ["Customer question", "Menu or predefined response", "Interpret varied wording; validate the account match"],
        ["Dispute", "Route to a person", "Collect relevant context; route to a person"],
        ["Settlement", "Only an approved rule", "Only explicitly permitted terms with review controls"],
      ] } },
      { id: "phases-heading", title: "Illustrative follow-up sequence", text: "The timing and language below are examples to adapt to your credit policy and messaging permissions; they are not default schedules or approved templates.", items: [
        { title: "Before the due date", text: "Example: Invoice [reference] is due on [date]. Would you like a statement?" },
        { title: "On the due date", text: "Example: Please review invoice [reference]. Contact our accounts team if you have already paid or need clarification." },
        { title: "After the due date", text: "Example: Our records show [reference] outstanding as of [date]. Please share the payment reference or tell us about a dispute." },
        { title: "Unresolved account", text: "Example: I will pass this to the accounts team. Any revised terms need their confirmation." },
      ] },
      { id: "industry-heading", aliases: ["industries-heading"], title: "Keep industry questions within the account scope", text: "A distributor may ask about a scheme adjustment, a manufacturer about an invoice dispute, or a transport customer about a bilty reference. These hypothetical questions need mapped source fields and a review owner. Do not infer license checks, tax compliance or stock allocation from a conversation." },
      { id: "roi-metrics", title: "Measure a pilot before estimating savings", text: "Record the invoice cohort, period, staff time, disputed accounts, response accuracy and reconciled payments. Compare equivalent periods and include messaging, software and review costs. Keep assisted replies, payment promises and verified receipts separate. No calculator or measured ROI is supplied here." },
      { id: "api-heading", title: "Account data needed for the workflow", text: "Scope customer identifiers, ledger context, bill details and reconciled payment state using the Busy API data contract. A customer saying 'paid' is not a receipt. Define how stale data, missing records and failed lookups stop or defer a reminder." },
      { id: "security-heading", title: "Messaging and financial controls to agree", text: "Confirm contact permission, opt-out handling, access scope, conversation retention and human review. Obtain the enabled payment method and reconciliation contract before offering a payment action. This guide does not certify privacy-law compliance or promise a native payment experience." },
    ], faqs: [
      { question: "Can the agent negotiate without an accounts reviewer?", answer: "Do not assume that. Confirm the enabled capability and explicitly approved terms, amounts, escalation rules and audit process. Uncertain or disputed balances and unapproved settlement terms need a person." },
      { question: "Is there a fixed ten-minute sync?", answer: "No fixed interval or instant invoice delivery is promised here. Confirm the connector's refresh schedule, source availability, lag and failure behavior. A scheduled snapshot can become stale between updates." },
      { question: "Are native UPI payments included?", answer: "Confirm supported payment methods, provider/account eligibility, commercial terms and reconciliation separately. A displayed link or conversational payment claim is not proof of funds received." },
      { question: "How should we evaluate collections results?", answer: "Measure a defined pilot against an equivalent baseline, including disputes, staff review, service costs and verified receipts. This page supplies no customer recovery percentage, savings estimate or return guarantee." },
    ], related: ["busy-erp", "busy-api", "busy-reports"],
  },
  "busy-reports": {
    slug: "busy-reports", name: "Busy reports",
    title: "Busy Reports: Web and Mobile Access Planning",
    description: "Choose Busy ledger, outstanding, sales, purchase and MIS reports for staff access. Scope company filters, data freshness and web or mobile availability.",
    intro: "Owners and accounts staff usually need a selected report, not a remote session controlling the entire Busy desktop. Start with the reports they read, the companies they may see and how current the data must be.",
    scope: "This guide scopes a report-viewing setup. Confirm the enabled portal, supported reports, mobile access, user permissions and connector prerequisites for your account. It does not promise every Busy report, a native app or continuous availability.",
    steps: [
      { title: "Choose a report", text: "Set the report category, company, financial period and party filters." },
      { title: "Obtain mapped data", text: "Use the configured connector and record its last successful update." },
      { title: "Apply reader scope", text: "Validate the selected user's company and report permissions." },
      { title: "Read and reconcile", text: "Display the report context and compare important figures with the Busy source." },
    ], sections: [
      { id: "reports-heading", title: "Keep the report categories distinct", text: "Use this taxonomy to agree the report set. The actual fields and availability need confirmation against your installation.", items: [
        { title: "Party ledger", text: "Opening and closing balances, dated transactions and debit/credit breakdown for a selected party." },
        { title: "Bill-by-bill outstanding", text: "Receivables/payables, invoice references, due dates, age and pending amount." },
        { title: "Sales and purchases", text: "Sales summary, customer/item performance, vendor purchase rows and bill details." },
        { title: "Stock, tax and MIS", text: "Inventory movement, tax, payment and receipt reports; custom management information with agreed calculations." },
      ] },
      { id: "advantage-heading", title: "Report access or desktop access?", text: "This compares access patterns rather than claiming that all desktop setups have the same limitations.", table: { headers: ["Question", "Desktop/remote session", "Scoped report view"], rows: [
        ["What can the user do?", "Use the permitted desktop functions", "Read the configured report set"],
        ["How current is it?", "Depends on the source/session", "Depends on connector refresh and successful updates"],
        ["Who sees which company?", "Confirm installation permissions", "Confirm user and company access rules"],
        ["What happens on failure?", "Restore session/source access", "Show stale/unavailable state and use an agreed fallback"],
      ] } },
      { id: "security-heading", title: "Confirm the reader's access boundaries", text: "Agree who can see each company, party and report, how users authenticate, and what exports they may retain. Validate separation with permitted test users before sharing financial data. A unified dashboard alone does not prove company isolation or security." },
      { id: "industries-heading", title: "Pick reports for the decision", text: "A wholesaler may read outstanding bills, a manufacturer stock movements, and a multi-location retailer sales by company. These are hypothetical tasks. Define the fields and filters rather than assuming an industry-specific dashboard." },
      { id: "setup-heading", title: "Prepare the report list and freshness requirement", text: "Provide the Busy version, company/financial-year list, intended readers and required reports. Agree a source connection, mapped calculations, update status, exception owner and comparison against Busy. Confirm web/mobile support and any native app separately. A report viewer does not by itself send WhatsApp messages or write transactions." },
    ], faqs: [
      { question: "Does report reading require remote desktop?", answer: "A configured report-viewing setup can provide an alternative for its selected reports. Confirm the deployment and fallback: it does not establish access to every desktop feature or remove source/connector requirements." },
      { question: "Can staff see only their customer ledgers?", answer: "Specify the user, company and party scope and validate it in an authorized test setup. Do not assume that a report filter alone enforces permission." },
      { question: "Is there a mobile app and real-time refresh?", answer: "Confirm supported browsers and any native app for your account separately. Agree refresh timing and last-update/error handling; this guide does not promise instant or uninterrupted updates." },
      { question: "Which reports can we view?", answer: "Use ledger, bill-by-bill outstanding, sales/purchase and stock/tax/MIS as a scoping list. Confirm available reports, fields and custom calculations against the enabled connector and Busy version." },
    ], related: ["busy-api", "busy-erp", "busy-google-sheet"],
  },
  "busy-google-sheet": {
    slug: "busy-google-sheet", name: "Busy to Google Sheets",
    title: "Busy to Google Sheets: Pull-Based Report Planning",
    description: "Plan a Google Sheet that pulls mapped Busy report data from an API. Review query fields, refresh rules, sharing permissions, quotas and failure handling.",
    intro: "For an accounts or MIS team working in Sheets, the key question is how a defined report reaches the right columns and when it refreshes. In the pull pattern, the Sheet initiates a request to a report API and uses the response to update its rows.",
    scope: "The reverse-flow example describes request direction: the Sheet asks for Busy-derived data. It does not mean writing Sheet edits back into Busy. Confirm the enabled endpoint, script/add-on, Google permissions, connector and plan scope before use; this is not a quota bypass or uptime guarantee.",
    steps: [
      { title: "Sheet requests a report", text: "An agreed manual action or schedule initiates a request with selected filters." },
      { title: "API reads mapped Busy data", text: "Use an approved query and available source or synchronized snapshot." },
      { title: "Return structured rows", text: "Match response fields to the agreed Sheet columns and types." },
      { title: "Update the Sheet", text: "Validate the response, preserve any separate manual columns and report failed or stale refreshes." },
    ], sections: [
      { id: "comparison-heading", title: "Compare who initiates the update", text: "Push and pull designs can both work. Their constraints depend on the services, request volume and implementation; neither pattern removes platform limits.", table: { headers: ["Decision", "External push", "Sheet-initiated pull"], rows: [
        ["Initiator", "Connector writes to the Sheet", "Sheet script/add-on requests a report"],
        ["Refresh control", "Connector event or schedule", "Agreed Sheet action or schedule"],
        ["Limits to review", "Applicable API and connector limits", "Script runtime, fetching, Sheet operations and endpoint limits"],
        ["Failure handling", "Track rejected writes and retries", "Track failed fetch/update and show last success"],
      ] } },
      { id: "engine-heading", title: "Map the query to a stable Sheet structure", text: "Agree the company, period, party or voucher filters, column names, data types and row identity. Custom SQL is a query design to review against the supported schema and permissions, not access to arbitrary data. Use the Busy API page for the retrieval contract." },
      { id: "usecases-heading", title: "Useful report tasks for a Sheet", text: "Hypothetical uses include a sales summary, outstanding-bill list, customer performance table or consolidated MIS. Specify consolidation rules and freshness. Sheet formulas can add analysis, but edited cells do not update ERP records in this pull example." },
      { id: "security-heading", title: "Review both API access and Sheet sharing", text: "Confirm endpoint credentials, company/query access and script permissions. Restrict who can view or edit the Sheet and avoid exposing tokens in shared cells. Verify storage, retention and sharing responsibilities for the deployed setup; the pattern is not a security certification." },
      { id: "industries-heading", title: "Choose fields rather than an industry label", text: "A distributor may need pending amounts, a manufacturer stock movements and a retailer company-wise sales. These hypothetical report choices require mapped fields and agreed access. They are not proof of a delivered industry integration." },
      { id: "setup-heading", title: "Prepare the pull workflow", text: "Bring your Busy version, a permitted sample schema, selected companies and a Sheet column plan. Agree the query/API contract, authorized script or add-on, permissions, refresh schedule, applicable limits and retry behavior. Check stale and empty responses before relying on the report; confirm setup time separately." },
    ], faqs: [
      { question: "Does reverse flow eliminate API limits or 429 errors?", answer: "No. Request direction changes which operations a design uses; it does not remove Google, script, connector or endpoint limits. Confirm current limits for the actual setup and handle throttling and failed updates." },
      { question: "Does this write Sheet changes back into Busy?", answer: "No write-back is described here. The Sheet requests Busy-derived report data and updates its own rows. Writing ERP records needs a separately scoped and validated integration." },
      { question: "Can the Sheet refresh while the Busy computer is off?", answer: "That depends on the deployment. A synchronized snapshot may remain readable, but new changes cannot reach it without a working source connection. Confirm the connector and show the last successful update." },
      { question: "Can we combine companies or customize columns?", answer: "Agree the supported fields, authorized company scope, consolidation rules and column mapping. Do not assume isolation or unlimited custom queries; validate the query and sharing rules before use." },
    ], related: ["busy-api", "busy-reports", "busy-erp"],
  },
  "busy-ecommerce": {
    slug: "busy-ecommerce", name: "Busy ecommerce",
    title: "Busy ERP Ecommerce: Catalogue and Order Integration",
    description: "Scope a branded Busy ordering portal: catalogue and price data out, validated orders back. Plan customer access, stock freshness and reconciliation.",
    intro: "An ordering portal needs two directions: catalogue, stock and customer price data for the buyer, then an order that the business can validate and record in Busy. Treat a submitted web order and a confirmed ERP sales order as separate states.",
    scope: "This guide describes a commerce integration to scope, not a live storefront. Confirm the enabled portal, branding/domain options, user access, supported Busy fields and order-write capability. Refresh timing, stock accuracy, launch dates and business outcomes are not guaranteed.",
    steps: [
      { title: "Busy data to catalogue", text: "Map permitted products, units, prices and stock locations with update context." },
      { title: "Buyer or representative selects", text: "Use an authorized customer account and applicable ordering rules." },
      { title: "Submit for validation", text: "Recheck stock, price, tax and credit rules; handle source connection failures." },
      { title: "Reconcile the ERP order", text: "Confirm the recorded Busy reference, resolve rejected/duplicate orders and communicate the actual state." },
    ], sections: [
      { id: "core-features-heading", aliases: ["technical-heading"], title: "Scope the commerce functions separately", text: "Catalogue viewing, order entry and financial report access need different data and permissions. Availability must be confirmed for the actual setup.", items: [
        { title: "Catalogue and stock", text: "Map item masters, units, price lists, available quantities and selected godowns. Confirm barcode support separately." },
        { title: "Order conversion", text: "Confirm whether submitted orders can become Busy sales orders and how errors and duplicate submissions are reconciled." },
        { title: "Customer account view", text: "Scope ledger/outstanding visibility for the authenticated customer, using the report contract." },
        { title: "Connectivity", text: "Agree unavailable-source handling. Do not assume offline ordering or background sync is supported." },
      ] },
      { id: "personas-heading", title: "Three readers, three permission scopes", text: "An order placed on behalf of a customer should preserve the representative's identity, rather than hide who acted.", items: [
        { title: "Sales representative", text: "Confirm assigned customer access, customer-specific price rules and an auditable order-on-behalf workflow." },
        { title: "Customer", text: "Confirm login method, permitted catalogue, account view and visible order states. A submitted order is not a dispatch promise." },
        { title: "Owner or operator", text: "Review order exceptions, mappings, price/stock changes and reconciliation before fulfillment." },
      ] },
      { id: "sync-heading", title: "A periodic snapshot can go stale", text: "Stock and prices can change between refreshes. Agree the interval, last-success indicator and failure state. Revalidate the order against available source rules before confirmation; a shorter interval alone cannot eliminate overselling.", table: { headers: ["Data direction", "Fields to scope", "Check before use"], rows: [
        ["Busy → portal", "Product masters and price rules", "Supported units, variants, schemes and effective price"],
        ["Busy → portal", "Stock by selected location", "Update time and concurrent sales"],
        ["Portal → Busy", "Customer, order lines and totals", "Validation, duplicate handling and ERP reference"],
        ["Busy → account view", "Ledger and outstanding", "Customer permission, period and reconciliation"],
      ] } },
      { id: "industry-benefits-heading", aliases: ["industries-heading"], title: "Check the rules that matter to your catalogue", text: "For hypothetical auto-parts, garment, FMCG, pharmaceutical, chemical or distribution catalogues, ask which variants, locations, schemes, batches, expiry and pricing fields are supported. Do not infer regulatory compliance, automated license checks or correct tax treatment from an industry label." },
      { id: "roi-heading", title: "Evaluate ordering with a bounded pilot", text: "Track a defined order cohort: entry and review time, rejected/duplicate orders, stock exceptions and successfully reconciled ERP orders. Compare equivalent volumes and include setup, software and support costs. This page provides no productivity or collection improvement percentage." },
      { id: "whitelabel-heading", title: "Agree the branding and domain scope", text: "White-label means a portal can be presented with agreed business branding, if supported. Confirm domain configuration, design options, operational ownership and separate-company permissions. Branding alone does not establish SEO gains, customer loyalty or lower infrastructure costs." },
      { id: "security-heading", title: "Busy remains the record to reconcile against", text: "Define authentication, customer/company boundaries, authorized write operations and the handling of price, credit, tax and stock validation. Verify the configured order path rather than assuming every Busy rule is applied. Review logs, retention and signed availability/support terms separately." },
      { id: "setup-heading", title: "Prepare the catalogue and order contract", text: "Bring your Busy version, company and item mappings, customer scopes, unit/price/tax rules and a permitted example order. Agree domain and branding, connector deployment, refresh and order-validation rules, test cases, exception handling and launch responsibilities. No fixed implementation period is promised." },
    ], faqs: [
      { question: "Does a sync interval prevent overselling?", answer: "No interval guarantees that. Stock can change between updates or during an order. Confirm the source checks, reservation/validation behavior and exceptions before promising availability." },
      { question: "Can a representative order for a customer?", answer: "Confirm that order-on-behalf is enabled, which customers the representative may access and how their identity and permissions are recorded. Customer-specific pricing, schemes and credit rules need separate validation." },
      { question: "Are all Busy batches, schemes and offline features supported?", answer: "Do not assume that. Scope the actual fields, Busy version and connector behavior; confirm batch/expiry, variants, multi-unit pricing, scheme logic and offline operation individually." },
      { question: "Can we use our domain and view ledgers?", answer: "Confirm supported branding/domain setup and the customer report-access scope for your account. They are separate functions and do not prove financial-data isolation, uninterrupted service or a collection result." },
    ], related: ["busy-api", "busy-reports", "busy-erp"],
  },
};
export const busySceneCaption = "Illustrative workflow, not a product screenshot, live account state or customer result. Steps describe a setup to confirm; they do not establish default behavior or availability.";
export const busyEnquiryScope = "An enquiry does not book an appointment or activate a product. Availability, setup, support and commercial terms need separate confirmation; binding commitments require a signed agreement.";
export function busyMarkdown(solution: BusySolution): string {
  return [solution.intro, solution.scope, "## Illustrative workflow", busySceneCaption,
    ...solution.steps.map((step, i) => `${i + 1}. **${step.title}** — ${step.text}`),
    ...solution.sections.map(section => `## ${section.title}\n\n${section.text}${section.items ? "\n\n" + section.items.map(item => `- **${item.title}:** ${item.text}`).join("\n") : ""}${section.table ? "\n\n| " + section.table.headers.join(" | ") + " |\n| " + section.table.headers.map(() => "---").join(" | ") + " |\n" + section.table.rows.map(row => "| " + row.join(" | ") + " |").join("\n") : ""}`),
    "## Questions", ...solution.faqs.map(faq => `### ${faq.question}\n\n${faq.answer}`),
    "## Related workflows", ...solution.related.map(slug => `[${busySolutions[slug].name}](/solutions/${slug})`),
    "## Discuss your setup", busyEnquiryScope, "[Send an enquiry](/contact)",
  ].join("\n\n");
}
