/** One public explanation for server articles, FAQ schema, registry and machine-readable twins.
 * Publication dates and attribution live in the existing registry; this technical correction
 * supplies no historical review event, approved integration scope or customer result.
 */
export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
  steps?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  code?: { caption: string; text: string };
  note?: string;
  image?: { src: string; width: number; height: number; alt: string; caption: string };
  links?: { label: string; href: string }[];
}
export interface ERPGuide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  cover?: { src: string; width: number; height: number; alt: string; caption: string };
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
}

export const syntheticCSV = 'Company,FinancialYear,Invoice,InvoiceDate,DueDate,Customer,AmountINR,PaidINR\nDEMO,2026-27,DEMO-001,2026-04-01,2026-04-15,"Sample Store, East",45000,10000\nDEMO,2026-27,DEMO-002,2026-04-03,2026-04-20,Sample Store West,32000,0';
export const syntheticSpreadsheetURL = "https://docs.google.com/spreadsheets/d/DEMO_SPREADSHEET_ID";
export const syntheticRange = "Raw!A1:H3";
export const syntheticImportRange = `=IMPORTRANGE("${syntheticSpreadsheetURL}", "${syntheticRange}")`;
export const googleSources = [
  { label: "Google: import a file into Sheets", href: "https://support.google.com/docs/answer/40608?hl=en" },
  { label: "Google: IMPORTRANGE syntax, access and limits", href: "https://support.google.com/docs/answer/3093340?hl=en" },
  { label: "Google: IMPORTDATA for CSV/TSV URLs", href: "https://support.google.com/docs/answer/3093335?hl=en" },
  { label: "Google: Sheets API usage limits", href: "https://developers.google.com/workspace/sheets/api/limits" },
];

export const sheetsGuide: ERPGuide = {
  slug: "busy-erp-google-sheets-integration-complete-guide",
  cover: { src: "/images/blog/busy-erp-google-sheets-integration-complete-guide/cover.webp", width: 1200, height: 630, alt: "Printed accounting export beside an empty spreadsheet grid with a review marker", caption: "Illustration: verify an exported report before using its spreadsheet copy for decisions." },
  title: "Busy ERP to Google Sheets: CSV Import and Spreadsheet Reporting",
  description: "Import a Busy CSV export into Google Sheets, use IMPORTRANGE only for spreadsheet ranges, and plan validation, access and refresh before automation.",
  intro: "Start with the input you actually have. A CSV exported from Busy is a file: import it into Google Sheets. IMPORTRANGE reads cells from another Google spreadsheet; it cannot read that CSV file. Both paths can support reporting, but neither establishes a live Busy connection by itself.",
  sections: [
    { id: "choose-input", heading: "Choose the path for your input", paragraphs: [
      "For a finance or operations team, a checked export is often a useful first step: take one report, preserve the company and financial year, and reconcile it before building a dashboard. Ask your Busy provider which export fields your edition and report support. This guide does not verify a particular Busy installation or connector.",
      "A spreadsheet is a reporting copy. Keep Busy as the accounting record and show when the copy was obtained. Changing a Sheet does not write a voucher back to Busy unless a separately designed and verified integration does so.",
    ], table: { caption: "Input type determines the import method", headers: ["Input", "Appropriate path", "Refresh responsibility"], rows: [
      ["Local CSV export", "File → Import in Google Sheets", "An operator obtains and imports a new export"],
      ["Existing Google spreadsheet", "IMPORTRANGE with its URL and a cell range", "Source cells and Google’s refresh behavior"],
      ["CSV/TSV at a URL", "IMPORTDATA for a suitably accessible URL", "The URL publisher and import behavior"],
      ["Authenticated Busy/API connector", "Separately verified integration", "Named scheduler, permissions, retries and monitoring"],
    ] }, links: googleSources.slice(0, 3) },
    { id: "prepare-export", heading: "Prepare one report and a safe destination", paragraphs: [
      "Choose a question first: outstanding by invoice, stock by warehouse, or sales by period. Export only the columns needed to answer it. Confirm the report’s filters, company, financial year, currency, opening balances and treatment of cancelled or reversed vouchers. Avoid putting payroll, full bank details or unrelated customer information into a shared dashboard.",
      "Keep an unchanged export and a short import log with report name, extraction time, filters and operator. In Sheets, separate Raw data from Calculations and Dashboard tabs. Review who can view and edit the destination before importing financial data; do not publish a private ledger as a public CSV link.",
    ], steps: ["Confirm the export option with your Busy provider; obtain a CSV report through the supported workflow.", "Inspect the header and a few rows locally. Use explicit dates and numeric amounts without currency symbols or thousands separators where possible.", "Decide whether a full snapshot replaces the previous snapshot or a transaction feed appends new rows. Repeated snapshots must not be appended as new transactions.", "Use a stable key such as company + financial year + invoice reference; define how amendments and credit notes will be reconciled."] },
    { id: "csv-import", heading: "Import a CSV file into Google Sheets", paragraphs: [
      "On a computer, open the destination spreadsheet and choose File → Import. Select the CSV, choose an available import option such as inserting a new sheet, and use the correct separator, then import. For this example, use a comma separator and rename the imported tab Raw. Google lists the supported formats and import options in its file-import documentation.",
      "The sample below is invented data for a two-invoice exercise. Save it as a UTF-8 .csv file if you want to try the documented steps in your own disposable spreadsheet. DEMO is not a real company. The quotation marks around the first customer preserve the comma inside that one cell.",
    ], code: { caption: "Synthetic CSV — header plus two rows, eight columns", text: syntheticCSV }, note: "Expected check: 2 invoices, ₹77,000 total invoiced, ₹10,000 paid and ₹67,000 outstanding. These are sample arithmetic, not customer results. The offline fixture checks parsing and totals; no live Sheets import was performed for this guide.", links: [googleSources[0]] },
    { id: "validate-data", heading: "Check types, totals and freshness before analysis", image: { src: "/images/blog/busy-erp-google-sheets-integration-complete-guide/validate-rows.webp", width: 1440, height: 810, alt: "Two paper grids inspected row by row for matching records and freshness", caption: "Illustration: compare source rows, duplicates and freshness before accepting a reporting copy." }, paragraphs: [
      "Compare row count, unique invoice keys and totals with the original Busy report. If the totals differ, stop and inspect the export filters, duplicate rows, credit notes, blank amounts and date formats. A successful upload alone does not establish correct accounting data.",
      "For the sample, columns G and H contain invoiced and paid amounts. In Calculations, =SUM(Raw!G2:G3)-SUM(Raw!H2:H3) gives 67000. Keep invoice references as text if leading zeros matter. Verify that dates were interpreted as intended for the spreadsheet’s locale rather than silently swapping day and month.",
      "For an ageing exercise, put an explicit as-of date in Calculations!B1. With a recognised due date in Raw!E2, =MAX(0,$B$1-Raw!E2) gives days overdue. At 2026-04-30, the two sample invoices are 15 and 10 days overdue. Use outstanding amounts, not the original invoice totals, in ageing buckets. A changing current-date formula cannot make a stale export current.",
    ], table: { caption: "Example checks before a reporting copy is accepted", headers: ["Check", "Expected sample", "If it fails"], rows: [
      ["Shape", "8 headers and 2 data rows", "Correct separator/quoting; re-import into a new tab"],
      ["Scope", "DEMO / 2026-27 only", "Separate company and year; check source filters"],
      ["Totals", "45000 + 32000 − 10000 = 67000", "Reconcile omissions, duplicates and amendments"],
      ["Freshness", "Explicit extraction/import time", "Obtain a new export before acting on stale balances"],
    ] } },
    { id: "spreadsheet-range", heading: "Use IMPORTRANGE only after the source is a spreadsheet", paragraphs: [
      "If a second spreadsheet needs the checked Raw data, use its Google spreadsheet URL and range. Replace DEMO_SPREADSHEET_ID below with your source spreadsheet ID; this placeholder is not a working document. The source tab must be named Raw and contain A1:H3. Enter the formula into a clear area of the destination.",
      "You need source access and must explicitly connect the spreadsheets. Google documents a first-use #REF! prompt to allow access. Review destination editors: once connected, any destination editor can pull other source ranges. A small selected range is not a permission boundary.",
      "Google documents update delays and a 10 MB received-data limit per request. Keep ranges bounded and avoid chains and cycles. IMPORTRANGE does not refresh the CSV in Busy or upload a new export; an operator or separately verified process must update the source data.",
    ], code: { caption: "Illustrative formula — Google spreadsheet URL plus range, never a CSV file path", text: syntheticImportRange }, links: [googleSources[1]] },
    { id: "refresh-and-failures", heading: "Plan refresh and handle failures visibly", paragraphs: [
      "A manual CSV import is a snapshot. Set an owner and a freshness threshold suitable for the report. If a refresh fails, keep the last checked snapshot clearly dated, flag the failure and do not label it live. Do not let a partial import overwrite the last reconciled dashboard.",
      "IMPORTDATA is documented for CSV or TSV at a URL. A local file path is not such a URL, and the formula is not an authenticated Busy connector. For private financial data, keep the manual import path or evaluate an authenticated integration rather than exposing a ledger to make a formula work.",
      "For automation, ask for the actual supported Busy interface, required permissions, field mapping, company/year isolation, scheduler, update semantics, failure log and recovery process. There is no verified universal refresh interval in this guide. Google’s Sheets API has per-minute quotas and documents bounded exponential backoff for quota errors; switching from push to pull does not remove those quotas.",
    ], table: { caption: "Failure checks for each input path", headers: ["Symptom", "Check", "Next action"], rows: [
      ["CSV appears in one column", "Separator and quoting", "Re-import a copy using the right separator"],
      ["Repeated or mixed invoices", "Key, company, year, snapshot vs append", "Stop refresh and reconcile the source scope"],
      ["#REF! or permission error", "Source URL, source access, range, destination access grant", "Review permissions; do not broaden sharing blindly"],
      ["Loading, delay or stale values", "Source timestamp, range size and chains", "Bound ranges and disclose freshness"],
      ["API quota or timeout", "Connector logs and project limits", "Bound retries; preserve the last accepted snapshot"],
    ] }, links: googleSources.slice(2) },
    { id: "reporting", heading: "Build a dashboard that answers one operational question", paragraphs: [
      "For receivables, group outstanding amounts into due, 1–30, 31–60, 61–90 and over-90-day buckets at a stated as-of date. Reconcile their sum with the source report. Show disputed invoices separately so a dashboard does not turn a dispute into an automatic reminder.",
      "For inventory, compare stock by warehouse and batch only when those fields exist in the export. Confirm units and stock valuation basis before combining companies or years. For sales, use a consistent net/gross basis and handle returns. A chart should state its filters and last successful refresh.",
      "Forecasting is a separate modelling exercise. Historical sales alone do not establish forecast accuracy; test assumptions, seasonality and missing periods. Keep statutory reports and accounting approvals in their authorised workflow. A spreadsheet dashboard is not evidence of tax or legal compliance.",
    ], table: { caption: "Candidate report inputs — confirm availability in your installation", headers: ["Report task", "Fields to request", "Decision check"], rows: [
      ["Receivable ageing", "Invoice key, due date, unpaid balance, dispute status", "Who should receive a reviewed follow-up?"],
      ["Inventory planning", "Item, unit, warehouse, batch, quantity, extraction time", "Is stock low in the right location?"],
      ["Sales review", "Period, invoice/return reference, net amount, product", "Which changes survive reconciliation?"],
      ["Cash planning", "Confirmed receipts/payments and opening balance", "What assumptions remain outside the report?"],
    ] } },
    { id: "downstream-workflows", heading: "Treat CRM, documents and WhatsApp as separate downstream work", paragraphs: [
      "A checked Sheet can be a staging copy for a CRM migration: map customer keys and field types, preview the destination records, and prevent duplicate updates. Do not assume that Salesforce, Zoho or another ERP connector is installed or that every field can be transferred.",
      "For document generation, agree a template, reference and storage permission before creating PDFs. Validate totals and recipients against the accounting record. A Google Sheet by itself does not create invoices or send WhatsApp messages.",
      "A candidate messaging workflow is: checked record → permitted recipient → reviewed template/attachment → configured sending service → recorded result and failure handling. Balance and ledger replies need customer-to-ledger authorisation; a matching phone number alone should not disclose all financial data. Confirm platform/account conditions and supported trigger behavior before a pilot.",
    ], links: [{ label: "Busy Google Sheets solution scope", href: "/solutions/busy-google-sheet" }, { label: "Five Busy messaging workflows", href: "/blog/busy-accounting-whatsapp-integration-benefits" }, { label: "Platform and account conditions", href: "/whatsapp-coexistence" }] },
    { id: "access-and-pilot", heading: "Keep access narrow and test a recoverable pilot", paragraphs: [
      "Use synthetic data first, then obtain approval for a limited real report. Separate who can import, edit calculations and view outputs. Decide retention, deletion and incident handling with the responsible owner; this guide makes no encryption, compliance, audit-log completeness or provider-security assurance.",
      "Before expanding, demonstrate a repeat refresh, a duplicate row, a changed invoice, an unavailable source and a recovery to the last checked snapshot. Record what the operator should see at each failure. Automation is ready only when supported behavior and reconciliation are verified for the intended company and report.",
    ], steps: ["Choose one report, a data owner and a freshness requirement.", "Reconcile a small sample and document the actual import method.", "Verify permissions and downstream disclosure scope.", "Test refresh, failures and recovery before enabling actions.", "Measure the pilot with real approval; do not infer savings from the sample."], links: [{ label: "Discuss the report and integration scope", href: "/contact?source=busy-sheets-guide" }] },
    { id: "sources", heading: "Google documentation used for the import paths", paragraphs: ["The linked Google documentation was checked on 29 September 2026 for import syntax, file import options, access behavior and API limits. That check is not a live Busy or Google Sheets integration test, and does not change this article’s source-record publication date."], links: googleSources },
  ],
  faqs: [
    { question: "Can IMPORTRANGE read a Busy CSV export?", answer: "No. Import the CSV through File → Import in Google Sheets. IMPORTRANGE requires a Google spreadsheet URL and a range; use it only after the source is a spreadsheet." },
    { question: "Does a CSV import stay in sync with Busy?", answer: "No. It is a snapshot. A person must import a fresh export, or a separately verified connector must update it. Show the extraction time and stop downstream actions when the data is stale." },
    { question: "What if IMPORTRANGE shows a permission error?", answer: "Check the source spreadsheet URL, source access and range, then review the destination access grant. Destination editors can import other source ranges once connected, so keep source and destination sharing appropriate." },
    { question: "Can I use IMPORTDATA instead?", answer: "IMPORTDATA is documented for CSV or TSV at a URL. It does not import a local file or establish an authenticated Busy connection. Do not publish a private financial export simply to use the formula." },
    { question: "Which Busy fields and sync interval are supported?", answer: "Confirm your edition, report, supported interface, mapping, permissions and refresh behavior with the provider. This guide has not verified a particular Busy account, connector or universal sync interval." },
    { question: "Does importing rows send WhatsApp messages?", answer: "No. Sending requires a separately configured and verified workflow, permitted recipients, appropriate templates and recorded outcomes. Review customer-to-ledger authorisation before exposing balance or ledger data." },
  ],
};

export const benefitsGuide: ERPGuide = {
  slug: "busy-accounting-whatsapp-integration-benefits",
  cover: { src: "/images/blog/busy-accounting-whatsapp-integration-benefits/cover.webp", width: 1200, height: 630, alt: "Closed accounting file, blank document and phone beside a recipient review card", caption: "Illustration: check source records and recipient permissions before evaluating a messaging workflow." },
  title: "Five Busy Accounting WhatsApp Workflows to Evaluate",
  description: "Evaluate invoice delivery, balance replies, ledgers, reminders and dispatch updates from Busy, with setup conditions and a practical pilot measurement plan.",
  intro: "WhatsApp can be a delivery and enquiry channel for selected Busy accounting workflows. Start with a task that is repeated often, confirm the supported data path and recipient permissions, and measure a small pilot. The examples below describe possible workflows; they are not a verified customer deployment or a promise of savings.",
  sections: [
    { id: "choose-workflow", heading: "Choose a task before choosing automation", paragraphs: [
      "An accounts team may export invoice PDFs, find customer contacts, answer balance calls and send statements manually. The useful question is where an integration can remove repeated handling while keeping accounting accuracy and customer privacy intact.",
      "Count the actual requests, handling time, failures and exceptions for one comparable period. Keep a person responsible for disputed balances, changed invoices and delivery failures. A workflow that sends the wrong document faster is not an improvement.",
    ], table: { caption: "Five candidate workflows and their required inputs", headers: ["Task", "Input to confirm", "Result to measure"], rows: [
      ["Invoice/receipt delivery", "Final document, reference, permitted recipient", "Correct delivery and exception handling time"],
      ["Balance enquiry", "Authorised customer mapping and fresh balance", "Resolution without exposing another ledger"],
      ["Ledger request", "Company, year, date range, opening balance", "Accurate statement and dispute handling"],
      ["Payment reminder", "Unpaid/disputed status and sending rules", "Relevant reminders without paid-bill repeats"],
      ["Dispatch update", "Confirmed dispatch source and timestamp", "Useful status rather than an invented tracking event"],
    ] } },
    { id: "invoice-delivery", heading: "1. Invoice and receipt delivery", image: { src: "/images/blog/busy-accounting-whatsapp-integration-benefits/invoice-checks.webp", width: 1440, height: 810, alt: "Abstract document, recipient, permission and outcome cards with a pause before sending", caption: "Illustration: a candidate invoice workflow needs document, recipient, permission and outcome checks." }, paragraphs: [
      "A manual path may be: create an invoice in Busy, export the final PDF, find the contact, attach the document and send it. A candidate integration can handle the document and recipient mapping once a supported trigger is available. Confirm whether that trigger is a voucher event, a checked export or another provider-supported mechanism.",
      "Before sending, validate company, invoice reference, amount, recipient and document version. The sending service must satisfy the account and template conditions for that message. Record the result and let the operator correct an invalid number or attachment without duplicating an already accepted send.",
      "A payment link is optional and requires its own approved provider and amount checks. No payment provider is activated by reading this guide. Keep the accounting receipt distinct from a messaging delivery status; a sent or delivered message does not prove payment.",
    ], steps: ["Finalise and reconcile the document.", "Map the intended recipient and confirm permission.", "Validate the template and attachment for the configured sender.", "Send through the supported service, then record the outcome and exceptions."], links: [{ label: "Busy ERP workflow scope", href: "/solutions/busy-erp" }, { label: "Message budgeting and billing conditions", href: "/blog/whatsapp-cloud-api-pricing-india-2026" }] },
    { id: "balance-enquiry", heading: "2. Customer balance enquiries", paragraphs: [
      "A customer might ask for Balance instead of calling the accounts desk. A configured flow could identify the authorised ledger, retrieve a checked balance and return the amount with an as-of time. If the mapping is missing or ambiguous, route the request to a person instead of showing another customer’s account.",
      "Do not promise an instant or always-available answer. The response depends on the configured flow, the data source, its freshness and platform availability. Show when the balance was obtained and provide a human contact for disputes. Access to a WhatsApp number alone is not sufficient justification to disclose every ledger linked to it.",
    ], note: "Illustrative response: “Sample Store East: ₹35,000 outstanding as of 30 April 2026. Ask the accounts team if a recent payment is missing.” This uses the synthetic invoice below and is not live customer information." },
    { id: "ledger-requests", heading: "3. Bill-by-bill ledger requests", paragraphs: [
      "A statement request needs a company, financial year, date range and authorised customer mapping. Include the opening balance and a clear debit/credit convention. Reconcile the closing balance with Busy before offering a PDF or message summary.",
      "This invented example starts with zero opening balance and lists transactions in chronological order. Debits increase the amount owed; credits reduce it. The final ₹67,000 equals ₹77,000 in invoices minus a ₹10,000 receipt. A real statement must also account for opening balances, returns and adjustments.",
    ], table: { caption: "Synthetic ledger — DEMO company, 2026–27; not a customer result", headers: ["Date", "Reference", "Debit ₹", "Credit ₹", "Balance ₹"], rows: [
      ["2026-04-01", "DEMO-001", "45,000", "0", "45,000"],
      ["2026-04-02", "DEMO-REC-001", "0", "10,000", "35,000"],
      ["2026-04-03", "DEMO-002", "32,000", "0", "67,000"],
    ] }, links: [{ label: "Build a checked spreadsheet reporting copy", href: "/blog/busy-erp-google-sheets-integration-complete-guide#validate-data" }] },
    { id: "payment-reminders", heading: "4. Reviewed payment reminders", paragraphs: [
      "A reminder flow could use due date and outstanding amount to prepare a follow-up. Agree the cadence with the responsible team and recheck the balance immediately before sending. Suppress paid, disputed, cancelled and wrongly mapped invoices.",
      "A candidate rule might create a review queue before the due date and another after it. These are configuration choices, not an approved universal schedule. Keep templates and recipients appropriate to the platform/account conditions, and give the customer a way to report a mismatch.",
      "Compare overdue balances and collection timing over comparable periods, accounting for customer mix and disputes. This guide provides no verified percentage improvement or guaranteed collection result.",
    ], links: [{ label: "Payment reminder scope and conditions", href: "/solutions/payment-reminders" }] },
    { id: "dispatch-updates", heading: "5. Bilty and dispatch enquiries", paragraphs: [
      "Where the source contains confirmed dispatch details, a reply can include transport name, LR/bilty number, dispatch date and a timestamp. A Busy challan or bilty record is not automatically a carrier tracking feed. Identify where each status came from.",
      "Expected delivery dates and current location require an appropriate source. If no current status is available, say so and provide the dispatch desk’s next step. Do not invent a delivered event from a document being created or a WhatsApp message being read.",
    ], table: { caption: "Dispatch reply fields and source checks", headers: ["Field", "Check before showing it"], rows: [
      ["Transport and LR/bilty reference", "Matches the intended order/customer"],
      ["Dispatch date", "Recorded dispatch, not invoice creation time"],
      ["Delivery estimate", "Supplied by a responsible source and labelled an estimate"],
      ["Current status", "Origin and freshness are known; otherwise show unavailable"],
    ] } },
    { id: "implementation", heading: "Use readiness stages rather than a fixed launch timeline", paragraphs: [
      "Account setup, approved templates, supported Busy access and field mapping can take different amounts of time. A four-week promise would hide those dependencies. Agree ownership and proceed only when each stage has evidence.",
    ], steps: ["Scope: select one company, task and data owner; confirm Busy edition and supported interface.", "Access: verify sender/account eligibility, recipient permissions and customer-to-ledger authorisation.", "Mapping: preview documents and responses with synthetic records; reconcile totals and references.", "Failure rehearsal: test duplicate triggers, stale data, wrong mappings, unavailable sources and rejected sends.", "Limited pilot: enable only the approved workflow, train the operator, and preserve a recovery path."], links: [{ label: "Account and coexistence conditions", href: "/whatsapp-coexistence" }, { label: "Ask about a workflow pilot", href: "/contact?source=busy-workflows-guide" }] },
    { id: "measure-pilot", heading: "Measure value without inventing an ROI result", paragraphs: [
      "Use your own baseline and a comparable pilot period. Count handled requests, successful resolutions, delivery failures, manual corrections and duplicate sends. Measure active handling time separately from waiting time. Include review and exception work in the pilot total.",
      "Time difference = baseline handling hours − pilot handling hours for comparable work. Any financial estimate needs an agreed labour cost basis, current platform/message/integration charges and actual implementation effort. Faster collections are not automatically revenue or profit; discuss how to value them with the finance owner.",
      "No named customer outcome, monthly saving, price band or payback period is verified for this guide. Use the pricing page to understand the charge categories and request confirmed commercial terms before deciding.",
    ], table: { caption: "Pilot measurement worksheet — fill with observed values", headers: ["Measure", "Baseline and pilot record", "Interpretation"], rows: [
      ["Correct resolutions", "Comparable request count and resolved count", "Exclude wrong-recipient and stale-data replies"],
      ["Handling time", "Operator hours including exceptions", "Compare equivalent tasks and workload"],
      ["Reliability", "Failures, repeats, recovery time", "Do not count accepted sends as guaranteed delivery"],
      ["Costs", "Confirmed implementation, platform and message charges", "No assumed fixed monthly price"],
      ["Collections", "Comparable balances, due dates and disputes", "Avoid attributing every payment change to automation"],
    ] }, links: [{ label: "Pricing conditions and quote inputs", href: "/pricing" }] },
    { id: "next-step", heading: "Bring one workflow and its exceptions to the discussion", paragraphs: [
      "Describe the Busy report or document, company/year, intended recipients and what happens when a record changes. Bring a redacted or synthetic example initially. That is enough to discuss scope without sending a live ledger through a public enquiry form.",
      "The contact route creates an enquiry. It does not connect your Busy account, apply a template, schedule a reminder or submit a payment. Confirm supported behavior and current commercial terms before enabling the pilot.",
    ], links: [{ label: "Discuss one Busy workflow", href: "/contact?source=busy-workflows-guide" }, { label: "Explore the ERP solution scope", href: "/solutions/busy-erp" }] },
  ],
  faqs: [
    { question: "Which workflow should we evaluate first?", answer: "Choose a frequently repeated task with a reliable source and clear recipient mapping, then measure a limited pilot. Invoice delivery, balance enquiries, ledgers, reminders and dispatch updates have different prerequisites." },
    { question: "Will saving a Busy invoice automatically send it?", answer: "Only a separately configured and verified trigger and sending workflow can do that. Confirm supported Busy access, document/recipient mapping, permissions, templates and failure handling before enabling it." },
    { question: "Is the ledger example a real customer result?", answer: "No. It is synthetic data showing chronological debit/credit arithmetic with zero opening balance. It does not demonstrate a live integration, customer savings or delivery success." },
    { question: "How much does this save or cost?", answer: "This guide has no verified savings, price band or payback result. Measure comparable handling time and exceptions, and obtain current implementation, platform and message charges before estimating value." },
    { question: "Can a balance bot share any ledger matching a phone number?", answer: "No. Confirm customer-to-ledger authorisation, company and data freshness. Ambiguous mappings and disputed balances need a human review path rather than automatic disclosure." },
  ],
};

export const erpGuides = [sheetsGuide, benefitsGuide];
export function guideMarkdown(guide: ERPGuide): string {
  return [guide.intro, guide.cover && `![${guide.cover.alt}](${guide.cover.src})\n\n*${guide.cover.caption}*`, ...guide.sections.map(section => [
    `## ${section.heading}`, section.paragraphs.join("\n\n"),
    section.steps?.map((step, i) => `${i + 1}. ${step}`).join("\n"),
    section.table && [section.table.caption, `| ${section.table.headers.join(" | ")} |`, `| ${section.table.headers.map(() => "---").join(" | ")} |`, ...section.table.rows.map(row => `| ${row.join(" | ")} |`)].join("\n"),
    section.code && `${section.code.caption}\n\n\`\`\`\n${section.code.text}\n\`\`\``,
    section.note,
    section.image && `![${section.image.alt}](${section.image.src})\n\n*${section.image.caption}*`,
    section.links?.map(link => `[${link.label}](${link.href})`).join("\n"),
  ].filter(Boolean).join("\n\n")), "## Frequently asked questions", ...guide.faqs.map(faq => `### ${faq.question}\n\n${faq.answer}`)].join("\n\n");
}
