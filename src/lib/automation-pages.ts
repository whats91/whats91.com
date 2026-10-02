import { metaPricingQualification, utilityPricingPolicy, servicePricingPolicy, freeEntryPricingPolicy } from "@/lib/meta-pricing";
// Reader guidance derived from the six route sources; not a product capability registry.
// Owner facts and publication decisions remain in docs/legal-policy-inputs.md.
import { windowQualification, entryQualification, onboardingQualification } from "@/lib/platform-compatibility";
export interface AutomationSection { id: string; aliases?: string[]; title: string; text: string; items?: { title: string; text: string }[]; table?: { headers: string[]; rows: string[][] }; }
export interface AutomationPage { slug: string; path: string; name: string; title: string; description: string; intro: string; scope: string; steps: { title: string; text: string }[]; sections: AutomationSection[]; faqs: { question: string; answer: string }[]; related: string[]; }
export const automationSceneCaption = "Static illustration of a workflow to scope. It is not a product screenshot, a live status or a customer result. No account is connected and no message or call is made.";
export const automationEnquiryScope = "An enquiry asks the team to confirm the scope, availability and commercial terms. It does not book an appointment, activate an integration, create a trial or send a WhatsApp message.";
import { utilityExample } from "@/lib/utility-example";
export { utilityExample } from "@/lib/utility-example";
export const automationPages: Record<string, AutomationPage> = {
  "marketing": {
    "slug": "marketing",
    "path": "/solutions/marketing",
    "name": "WhatsApp marketing",
    "title": "WhatsApp Marketing: Campaign Setup and Measurement",
    "description": "Plan WhatsApp marketing campaigns with permission, template review, recipient mapping and delivery handling. Measure results using your own campaign data.",
    "intro": "A campaign starts with an audience and a reason to contact them. Decide who has agreed to receive that kind of offer, which template fits the purpose and what the team will do when a recipient replies or opts out.",
    "scope": "Confirm the campaign tools enabled for your Whats91 plan, sender/account eligibility and target markets. The examples describe a scope to discuss; they do not establish a connected account, an approved template or a campaign result.",
    "steps": [
      {
        "title": "Select the audience",
        "text": "Use a contact list with the intended campaign purpose and permission records. Exclude withdrawn permissions and inappropriate recipients."
      },
      {
        "title": "Map an approved template",
        "text": "Match language, variables, media and buttons to the approved template and the actual record fields."
      },
      {
        "title": "Schedule and monitor",
        "text": "Confirm scheduling, account limits and pacing. Separate accepted requests, delivery events, reads and failures."
      },
      {
        "title": "Handle the reply",
        "text": "Route questions to the right team, record opt-outs and reconcile any attributed order in your source system."
      }
    ],
    "sections": [
      {
        "id": "channel-heading",
        "title": "Choose the channel for the task",
        "text": "Compare your own audience, costs and response handling rather than assuming a universal open or conversion rate.",
        "table": {
          "headers": [
            "Decision",
            "WhatsApp campaign",
            "Other channel to compare"
          ],
          "rows": [
            [
              "Permission",
              "Check permission for the proposed WhatsApp purpose",
              "Check the permission and rules for that channel"
            ],
            [
              "Content",
              "Confirm approved template and eligible format",
              "Review the format the channel supports"
            ],
            [
              "Replies",
              "Assign a team or scoped workflow",
              "Plan its own reply and opt-out handling"
            ],
            [
              "Measurement",
              "Use available status events and an attribution method",
              "Use comparable cohorts and reporting periods"
            ]
          ]
        }
      },
      {
        "id": "portal-heading",
        "title": "Scope the campaign tools you need",
        "text": "Ask which tools are enabled and how they handle invalid data before planning the campaign. A website description is not confirmation of a portal feature.",
        "items": [
          {
            "title": "Contact import",
            "text": "If CSV/Excel import is available, agree column mapping, phone-number validation, duplicate handling and an exclusion list. Review a sample before uploading private records."
          },
          {
            "title": "Template variables",
            "text": "Map fields such as [name], [city] or [last purchase] to the approved variable positions. Define a fallback or stop condition for missing values; personalization does not make a message eligible."
          },
          {
            "title": "Sequences and experiments",
            "text": "Confirm scheduling, segmentation, any flow triggers and experiment support. Stop a follow-up on opt-out or an unresolved complaint, and define who can change the rules. No automatic A/B testing is assumed."
          }
        ]
      },
      {
        "id": "compliance-heading",
        "title": "Keep permission tied to the campaign purpose",
        "text": "Record what the recipient agreed to, the source and time of that choice, and how withdrawal is handled. A past purchase alone does not establish permission for every promotion. Review applicable law and the Business Messaging Policy for your actual campaign."
      },
      {
        "id": "review-heading",
        "title": "Template review is a separate gate",
        "text": "Submit the exact category, language, variables and sample values for provider review. Onboarding assistance does not guarantee approval or a review deadline. Check the status and reason in the actual account; do not infer approval from a template shown here.",
        "items": [
          {
            "title": "Rejected or changed category",
            "text": "Review the whole content and the provider reason. Revise only with the correct purpose and format; do not delete a working template or account based on this guide."
          },
          {
            "title": "Paused or restricted",
            "text": "Inspect actual quality, account status and recipient feedback. Pause affected sends while the owner resolves the restriction; a retry is not proof that delivery will succeed."
          }
        ]
      },
      {
        "id": "delivery-heading",
        "title": "A queued campaign still needs delivery handling",
        "text": "Account restrictions, template pacing, recipient conditions and temporary errors can affect sending. Read the actual provider response and status events. Agree bounded retries for appropriate errors and suppress duplicates; do not force repeated sends to an ineligible recipient."
      },
      {
        "id": "tiers-heading",
        "title": "Check limits before choosing campaign volume",
        "text": "Throughput, distinct-recipient limits, template pacing and quality restrictions are different controls. Confirm the limits for the actual sender or portfolio, version and region. A verification badge or account upgrade does not establish a universal daily allowance."
      },
      {
        "id": "kpi-heading",
        "title": "Measure the campaign with explicit denominators",
        "text": "Use a fixed campaign cohort and period. Missing events are unknown, not zero. No benchmark, conversion lift or revenue result is supplied here.",
        "table": {
          "headers": [
            "Measure",
            "Definition to agree",
            "Caveat"
          ],
          "rows": [
            [
              "Delivery rate",
              "Delivered messages / eligible send attempts",
              "Define attempts, retries and late events"
            ],
            [
              "Read rate",
              "Available read events / delivered messages",
              "Read information may be incomplete"
            ],
            [
              "Response rate",
              "Recipients who reply / delivered recipients",
              "Deduplicate recipients and set the response period"
            ],
            [
              "Attributed orders",
              "Verified orders under the agreed attribution rule",
              "A click or reply alone is not revenue"
            ],
            [
              "Campaign cost",
              "Effective messaging, platform and staff costs",
              "Use the dated INR message calculator at /pricing; platform and staff costs are separate"
            ]
          ]
        }
      },
      {
        "id": "trends-heading",
        "title": "Choose a useful follow-up, then check support",
        "text": "Illustrative tasks include an opted-in restock notification, a promotion relevant to the chosen segment, or routing an interested reply to sales. Confirm any AI, flow or specialized marketing API support and policy eligibility separately. No general-purpose AI policy, region launch or priority-delivery feature is established by this page."
      },
      {
        "id": "setup-heading",
        "title": "Prepare a reviewable campaign scope",
        "text": "Bring the sender/account details, target markets, audience purpose, permission process and a template draft with private values removed. Agree recipient mapping, scheduling, failure handling, opt-out ownership and a permitted test plan. Setup and review time depend on these prerequisites."
      }
    ],
    "faqs": [
      {
        "question": "Does a template shown here have provider approval?",
        "answer": "No. Confirm the actual template status, category, language and enabled sender in your account before using it."
      },
      {
        "question": "Why might a recipient not receive a campaign?",
        "answer": "Check the actual error, recipient eligibility, template/account status, limits and pacing. Do not assume a fixed retry deadline or guaranteed recovery."
      },
      {
        "question": "Can an earlier customer receive promotional messages?",
        "answer": "A transaction does not establish permission for every promotional purpose. Review the permission record, intended content, withdrawal process and applicable policy before including the customer."
      },
      {
        "question": "How do service windows affect a campaign?",
        "answer": "Use the messaging-window conditions below and check the actual category. A service window does not by itself turn promotional content into utility content or prove a free price."
      },
      {
        "question": "Can I start a trial from this page?",
        "answer": "Send an enquiry to confirm plan availability, trial terms and setup requirements. This page does not create an account or activate a campaign."
      }
    ],
    "related": [
      "utility",
      "google-sheets-integration",
      "flow-builder"
    ]
  },
  "payment-reminders": {
    "slug": "payment-reminders",
    "path": "/solutions/payment-reminders",
    "name": "payment reminders",
    "title": "WhatsApp Payment Reminders: Due Dates and Credit Rules",
    "description": "Plan payment reminders using invoice age, due dates, reconciled balances and customer terms. Define stop conditions, recipient permissions and accounts handoff.",
    "intro": "An accounts team needs to know which invoice is outstanding and whether it is actually due. Separate a scheduled follow-up from a credit-limit rule, and stop or defer reminders when payment, a dispute or stale data makes the message inappropriate.",
    "scope": "Confirm the enabled Busy connector or other accounting source, rule controls, sender/template eligibility and plan scope. The rules below are hypothetical designs to validate against your accounts data; they are not default schedules or proof of automated collection.",
    "steps": [
      {
        "title": "Obtain the account context",
        "text": "Select company, party, invoice, agreed credit terms and reconciled balance. Establish source freshness."
      },
      {
        "title": "Evaluate the chosen rule",
        "text": "Use due date or invoice age as explicitly configured; apply any agreed threshold, exclusions and schedule."
      },
      {
        "title": "Prepare the permitted reminder",
        "text": "Map the recipient, invoice reference, amount and date into the eligible template or reply format."
      },
      {
        "title": "Reconcile and stop",
        "text": "Review failures, claimed payments and disputes with accounts. Stop or defer follow-ups when the agreed stop condition is met."
      }
    ],
    "sections": [
      {
        "id": "logic-heading",
        "title": "Define eligibility before a reminder",
        "text": "Agree whether the rule uses invoice age, a stored due date, total outstanding or a credit limit. These answer different questions. Confirm the financial year, company and party mapping so a reminder refers to the intended account.",
        "items": [
          {
            "title": "Customer terms",
            "text": "Use the credit period or due date agreed for that customer. Define day counting, timezone, grace period and which invoices are included."
          },
          {
            "title": "Credit-limit check",
            "text": "If enabled, compare the chosen balance with the configured limit. Decide how disputed invoices, partial payments and adjustments change the calculation."
          },
          {
            "title": "Exclusions",
            "text": "Scope minimum amounts, selected customer groups, opt-outs and accounts needing human review. Agree who can override a rule and how that choice is recorded."
          }
        ]
      },
      {
        "id": "modes-heading",
        "title": "Scheduled follow-up or a conditional rule?",
        "text": "Choose the operating mode for the business policy rather than treating every outstanding balance as overdue.",
        "table": {
          "headers": [
            "Mode to scope",
            "Input",
            "Control and limitation"
          ],
          "rows": [
            [
              "Scheduled",
              "Selected invoice cohort and agreed daily/weekly/monthly schedule",
              "Recheck payment and permission before each eligible message"
            ],
            [
              "Invoice aging",
              "Invoice date and customer credit period",
              "Age from invoice date is different from days past due"
            ],
            [
              "Credit threshold",
              "Defined outstanding balance and configured limit",
              "Crossing a threshold is not proof of non-payment or delivery"
            ],
            [
              "On-demand",
              "Authorized accounts request and current data",
              "Confirm access, validation and duplicate handling before enabling"
            ]
          ]
        }
      },
      {
        "id": "capabilities-heading",
        "title": "Examples of credit rules",
        "text": "Hypothetical examples: these amounts and dates explain a rule, not a customer account, a default policy or a sent reminder.",
        "items": [
          {
            "title": "Example A: ₹1,00,000 credit limit",
            "text": "If the chosen rule sends only when the defined outstanding exceeds ₹1,00,000, an amount at or below that threshold does not trigger that rule. Confirm which balance is compared and whether due-date conditions also apply."
          },
          {
            "title": "Example B: 15-day invoice-age credit period",
            "text": "If the configured rule allows a strict 15-day credit period counted from the invoice date, the first eligible evaluation is day 16. Day 16 is not 16 days overdue. Confirm day counting, due-date basis, timezone, reconciled payment state and exclusions; eligibility is not a promise of a message being sent or received."
          },
          {
            "title": "Template values",
            "text": "Map [name], [amount], [bill number] and [due date] to the approved template. A day-1, day-15, day-30 or day-45 follow-up sequence would require an explicitly chosen schedule; none is assumed here."
          }
        ]
      },
      {
        "id": "validation-heading",
        "title": "Recheck the balance at the decision point",
        "text": "The freshness of a Busy record depends on the enabled connector and synchronization arrangement. Define how stale or unavailable data stops a reminder. A saved receipt, a customer saying “paid”, an accepted message request and a delivered message are separate states.",
        "items": [
          {
            "title": "Before dispatch",
            "text": "Check the account match, latest payment/adjustment state, chosen rule, recipient permission, template status and duplicate-event handling."
          },
          {
            "title": "After a reply",
            "text": "Route a claimed payment or dispute to accounts with the invoice reference. Reconcile in the accounting source before describing a balance as settled."
          },
          {
            "title": "Text or document",
            "text": "Confirm whether an eligible template can include the mapped invoice/statement PDF. Review company, party and period before sharing it."
          }
        ]
      },
      {
        "id": "security-heading",
        "title": "Set access and review boundaries",
        "text": "Confirm company/party access, authorized roles, credentials, logs, retention and recipient verification for the actual integration. This description does not establish accounting-grade security, zero data mixing, a certification or legal compliance. Review privacy terms before providing production records."
      },
      {
        "id": "industries-heading",
        "title": "Match the reminder to the account question",
        "text": "Illustrative uses: a distributor follows agreed customer terms; a manufacturer checks an invoice dispute; a logistics business needs the mapped bilty reference; a retailer checks a reconciled balance. The fields and permitted workflow depend on the source and enabled setup."
      },
      {
        "id": "setup-heading",
        "title": "Prepare the rule with your accounts team",
        "text": "Bring the accounting source/version, company/party mappings, credit-policy definition, sender and template draft with private values removed. Agree scheduling, reconciliation freshness, exclusions, an exception owner and permitted test cases. Obtain actual scope and timing; no fixed go-live period or collection result is promised."
      }
    ],
    "faqs": [
      {
        "question": "Does any outstanding balance trigger a reminder?",
        "answer": "Only the explicitly enabled rule could do that. Define due date, invoice age or credit threshold, and recheck payments, exclusions and permission first."
      },
      {
        "question": "What does the 15-day example mean?",
        "answer": "It is a hypothetical credit period counted from the invoice date. If configured that way, day 16 is the first eligible evaluation. It is not a default schedule, 16 days past due or a delivery guarantee."
      },
      {
        "question": "Can I send immediately from this website?",
        "answer": "No reminder is sent by this page. Confirm on-demand controls and authorized access in the actual setup before enabling that mode."
      },
      {
        "question": "What happens after a payment or dispute?",
        "answer": "Agree a stop/defer rule. Verify payment in the accounting source; route disputes and uncertain matches to the accounts team."
      },
      {
        "question": "Are company isolation and audit logs guaranteed?",
        "answer": "Confirm the implemented access boundaries, roles, logging and retention with the integration owner. No assurance is established by this workflow illustration."
      }
    ],
    "related": [
      "busy-erp",
      "busy-ai-agent",
      "utility"
    ]
  },
  "utility": {
    "slug": "utility",
    "path": "/solutions/utility",
    "name": "transactional utility messages",
    "title": "WhatsApp Utility Messages: Transactional Templates and Conditions",
    "description": "Plan transactional WhatsApp messages with record references, template review, permission and delivery events. Check window and effective pricing conditions.",
    "intro": "A useful transactional message tells the customer what changed in a specific order, payment, appointment or service they use. Start with that record and its purpose; adding an offer can change how the whole message is classified.",
    "scope": "Confirm the transaction source, enabled messaging tools, sender/template eligibility and plan scope. The task examples and request below are illustrative; they do not establish template approval, priority delivery or a connected integration.",
    "steps": [
      {
        "title": "Select a transaction event",
        "text": "Choose the specific order, receipt, appointment or service update and its authorized source."
      },
      {
        "title": "Map the template",
        "text": "Match recipient, language and variable positions; include only the fields needed for the transaction."
      },
      {
        "title": "Check eligibility and dispatch",
        "text": "Confirm permission, category, format/window conditions and sender limits before an eligible request."
      },
      {
        "title": "Handle status and questions",
        "text": "Distinguish acceptance from delivery. Reconcile failures, duplicate events and customer replies with the source owner."
      }
    ],
    "sections": [
      {
        "id": "taxonomy-heading",
        "title": "Transactional tasks to discuss",
        "text": "These are examples of message purposes, not provider approval of a category. Review the full content and actual template classification.",
        "items": [
          {
            "title": "Orders and logistics",
            "text": "Confirmation, cancellation or modification for a specific order; shipment, delivery or exception updates tied to a mapped reference."
          },
          {
            "title": "Finance",
            "text": "A receipt, invoice notice or refund update tied to the actual transaction. A message is not proof that funds settled."
          },
          {
            "title": "Appointments",
            "text": "A confirmation, reminder or rescheduling notice for the selected booking."
          },
          {
            "title": "Account and service",
            "text": "An eligible subscription/service update, maintenance or restoration notice. Security or authentication content needs its own classification and permitted format review."
          }
        ]
      },
      {
        "id": "portal-heading",
        "title": "Check the source and mapping contract",
        "text": "For a webhook, scheduled process or supported file import, agree who supplies the event, which fields are required and when the data is current. Confirm validation, duplicate handling and any retry/preview tools; no automatic connector or instant dispatch is assumed."
      },
      {
        "id": "trap-heading",
        "title": "Review the whole message purpose",
        "text": "A specific transaction reference helps the reader, but does not guarantee utility classification. A friendly greeting alone does not establish a marketing category either. Review offers, promotional links, vague context and the complete text against current provider guidance.",
        "table": {
          "headers": [
            "Draft choice",
            "Question to resolve"
          ],
          "rows": [
            [
              "Order update plus an upsell",
              "Does the offer make the whole message promotional?"
            ],
            [
              "“Shop more” or generic promotional link",
              "Does the action serve the transaction or another campaign?"
            ],
            [
              "No identifiable record",
              "Can the customer understand which transaction changed?"
            ],
            [
              "Neutral template wording",
              "Does the provider approve this exact content and category?"
            ]
          ]
        }
      },
      {
        "id": "review-heading",
        "title": "Approval and reclassification need account evidence",
        "text": "Confirm the exact template category, language, variables and status in the actual account. If rejected or reclassified, inspect the reason and revise the content as appropriate. No word list, pre-approved sample or guaranteed review time establishes approval."
      },
      {
        "id": "pricing-heading",
        "title": "Keep format permission separate from pricing",
        "text": metaPricingQualification + " " + utilityPricingPolicy,
        "table": {
          "headers": [
            "Situation",
            "What to verify",
            "Budgeting basis"
          ],
          "rows": [
            [
              "Inside a reply window",
              "Category and effective allowance conditions",
              "Dated recipient-market/category rates and confirmed exclusions at /pricing"
            ],
            [
              "Outside a reply window",
              "Eligible approved template and effective tariff",
              "Dated recipient-market/category rates and confirmed exclusions at /pricing"
            ],
            [
              "Qualifying entry event",
              "Actual eligibility, response/delivery timing and policy",
              "Dated recipient-market/category rates and confirmed exclusions at /pricing"
            ],
            [
              "Changed classification",
              "Actual category and applicable rate period",
              "Dated recipient-market/category rates and confirmed exclusions at /pricing"
            ]
          ]
        }
      },
      {
        "id": "delivery-heading",
        "title": "Time-sensitive does not mean unrestricted",
        "text": "Throughput, recipient limits, template pacing and quality restrictions need account-specific checks. Confirm any specialized API/flag and its permitted purpose before using it. This page does not establish a queue bypass, frequency-cap exemption or instant delivery."
      },
      {
        "id": "buttons-heading",
        "title": "Choose an action the customer can use",
        "text": "Scope a tracking link, invoice document, appointment confirmation or support reply around the transaction. Confirm the template supports that button type and how an event is recorded. A link click or button display alone is not proof that a customer message opened a reply window."
      },
      {
        "id": "consent-heading",
        "title": "Contact permission still needs review",
        "text": "Document the intended transactional purpose, how the recipient chose it and how withdrawal is handled. Check applicable policy and law for your setup; a previous order alone does not establish permission for unrelated promotions. Keep promotional additions out of a transactional draft unless deliberately reviewed."
      },
      {
        "id": "sandbox-heading",
        "title": "Sample utility template request",
        "text": "Illustrative request only. Replace placeholders using the current API version, authorized sender, eligible recipient and the exact approved template, language and parameter order. The code panel only expands or scrolls text; it cannot send, authenticate or validate an account."
      },
      {
        "id": "practices-heading",
        "title": "Handle ambiguous and failed states",
        "text": "Validate the record and missing fields before requesting a message. Record actual provider statuses and stop inappropriate repeated requests. A phone being offline or a visual tick in a chat is not a billing reconciliation rule. Confirm final charges against provider billing and delivery records."
      },
      {
        "id": "setup-heading",
        "title": "Prepare a small transactional scope",
        "text": "Bring the source event/schema, template draft, mapping, permission process and expected volume. Agree failure handling, duplicate suppression, account limits, any document attachment and a permitted test plan. Confirm platform fees separately from message charges."
      }
    ],
    "faqs": [
      {
        "question": "What separates utility from marketing?",
        "answer": "A transactional update concerns a specific transaction or service context. An offer or promotional purpose may change classification; confirm the whole template with current provider guidance and the account status."
      },
      {
        "question": "Are these pre-approved templates?",
        "answer": "No. The examples explain possible tasks. Confirm the exact template, category, language and approved status for your actual sender."
      },
      {
        "question": "Does a service window mean the message is free?",
        "answer": servicePricingPolicy + " " + utilityPricingPolicy + " " + freeEntryPricingPolicy
      },
      {
        "question": "Can a time-sensitive flag bypass queues?",
        "answer": "No bypass or priority-delivery capability is established here. Obtain the current API contract and eligibility before relying on any specialized sending feature."
      },
      {
        "question": "Does an accepted request prove delivery or billing?",
        "answer": "No. Track actual delivery events and reconcile billing records. Missing status is unknown; a device tick or phone condition is not enough to establish a charge."
      }
    ],
    "related": [
      "marketing",
      "payment-reminders",
      "google-sheets-integration"
    ]
  },
  "flow-builder": {
    "slug": "flow-builder",
    "path": "/flow-builder",
    "name": "flow design",
    "title": "WhatsApp Flow Builder: Design Rules, Lookups and Handoffs",
    "description": "Plan WhatsApp automation flows with triggers, conditions, data lookups and human handoff. Confirm enabled nodes, integrations, AI limits and commercial terms.",
    "intro": "Write the decision path before designing a canvas: what starts the conversation, what data the task needs, which actions are permitted and when a person should take over. A flow diagram helps review those choices; it does not prove that every node is available.",
    "scope": "Confirm the visual editor, node types, integrations, AI options and plan terms enabled for your account. This page describes designs to scope, not a deployed agent, unlimited integration access or measured savings.",
    "steps": [
      {
        "title": "Define the trigger",
        "text": "Choose an eligible incoming message, supported event or schedule. Confirm payload and permission scope."
      },
      {
        "title": "Branch on verified data",
        "text": "Validate required fields, retrieve only authorized records and define missing/stale/error paths."
      },
      {
        "title": "Perform a permitted action",
        "text": "Use an eligible message format or supported API action. Keep financial or destructive decisions within explicit authority."
      },
      {
        "title": "Hand off and review",
        "text": "Carry the relevant context to a designated person; evaluate failed and uncertain paths before wider use."
      }
    ],
    "sections": [
      {
        "id": "comparison-heading",
        "title": "Fixed rules, an automation graph or an in-app form?",
        "text": "Choose the tool around the task. Visual design does not remove the need for integration work and access controls.",
        "table": {
          "headers": [
            "Approach",
            "Useful for",
            "Constraint"
          ],
          "rows": [
            [
              "Fixed reply/menu",
              "Known questions and stable choices",
              "Define unmatched input and human help"
            ],
            [
              "Automation graph",
              "Branching, data lookups and action sequencing",
              "Confirm nodes, limits, auth and failure paths"
            ],
            [
              "WhatsApp Flows",
              "Structured in-app interactions where supported",
              "Confirm the actual form, data exchange and platform contract"
            ],
            [
              "AI assistance",
              "Varied wording or document retrieval",
              "Evaluate accuracy, allowed actions and escalation"
            ]
          ]
        }
      },
      {
        "id": "core-features-heading",
        "title": "Separate the canvas, AI and provider access",
        "text": "These are different setup questions. Confirm each enabled feature and its cost rather than treating them as one default bundle.",
        "items": [
          {
            "title": "Visual canvas",
            "text": "If available, confirm trigger/action/condition editing, versioning, test mode, loop guards and who can publish a change."
          },
          {
            "title": "AI with a knowledge base",
            "text": "Retrieval-Augmented Generation (RAG) retrieves document context for a model response. It can still retrieve incomplete information or produce a wrong answer; require evaluation and a no-answer/handoff path."
          },
          {
            "title": "Bring Your Own API",
            "text": "If supported, scope the AI provider, credentials, quota and billing separately. Direct provider billing does not prove a fixed saving, data residency or regulatory compliance."
          }
        ]
      },
      {
        "id": "nodes-heading",
        "title": "Map the node contract before connecting it",
        "text": "Candidate node roles include trigger, condition, message action, HTTP lookup, data mapping and human routing. Obtain the current list supported by the editor; confirm authentication, payload schemas, timeout, rate limit and permissions for every external action.",
        "items": [
          {
            "title": "Data and HTTP",
            "text": "An order lookup needs an authorized customer match and an endpoint contract. A provider name does not establish a prebuilt connector or access to every API."
          },
          {
            "title": "Routing",
            "text": "Define the handoff queue, staffed hours and fallback if nobody is available. A sentiment signal may assist routing but must not be the only way to ask for a person."
          }
        ]
      },
      {
        "id": "rag-heading",
        "title": "A knowledge base needs its own checks",
        "text": "Agree the permitted documents, ingestion method, retrieval freshness, source attribution and access boundaries. PDFs, URLs or other sources must be supported by the enabled setup. Test missing answers and contradictory documents; retrieval does not guarantee accuracy.",
        "table": {
          "headers": [
            "Stage",
            "Question to settle"
          ],
          "rows": [
            [
              "Source",
              "Which permitted documents and versions are included?"
            ],
            [
              "Index",
              "How are documents prepared and refreshed?"
            ],
            [
              "Retrieve",
              "How is a relevant authorized passage selected?"
            ],
            [
              "Generate",
              "What may the model answer or act on?"
            ],
            [
              "Review",
              "What happens when evidence is missing or confidence is low?"
            ]
          ]
        }
      },
      {
        "id": "usecases-heading",
        "title": "Use cases to evaluate in a permitted pilot",
        "text": "Hypothetical designs: a cart follow-up checks contact permission and purchase state; lead qualification captures a request and routes it to sales; support retrieves an authorized order status and escalates a dispute. No ticket deflection, response-time, conversion or recovered-revenue result is supplied."
      },
      {
        "id": "industries-heading",
        "title": "Adapt the task without assuming industry compliance",
        "text": "An ecommerce status lookup, real-estate enquiry or appointment change needs a specific data contract and routing owner. Sensitive financial or health information requires its own review; an industry label is not approval for autonomous decisions."
      },
      {
        "id": "compliance-heading",
        "title": "Review permissions, providers and records",
        "text": "Confirm contact permission, message/template eligibility, credential storage, processing locations, retention and access controls. Do not infer DLT registration, DPDP compliance or India residency from a flow, an opt-in node or a chosen AI provider."
      },
      {
        "id": "agentic-heading",
        "title": "Illustrative missing-order path",
        "text": "Hypothetical customer question: “I ordered a blue shirt last Tuesday but have not received it.” Verify the customer and order match; retrieve the authorized order/dispatch record; answer only from current fields. If the match or delivery date is unclear, say so and route to support. No actual order, live tracking or successful resolution is shown."
      }
    ],
    "faqs": [
      {
        "question": "Does a visual flow mean no integration work?",
        "answer": "No. A supported editor may simplify design, but lookups still need endpoint schemas, credentials, permissions, data mapping and failure handling."
      },
      {
        "question": "Does RAG prevent hallucinations?",
        "answer": "No accuracy guarantee is made. Retrieval adds document context, but the source may be stale or incomplete and the model can answer incorrectly. Test source-grounded answers and escalation."
      },
      {
        "question": "Does using my own AI key guarantee savings?",
        "answer": "Confirm whether that option is supported, then compare provider usage, platform fees, integration and review costs. No fixed percentage saving or residency assurance follows from a key."
      },
      {
        "question": "Is this the same as WhatsApp Flows?",
        "answer": "A business automation graph and a supported in-app form solve different tasks. Confirm the actual editor/node contract and Meta Flows support before choosing how they connect."
      },
      {
        "question": "Can the flow activate a service from this page?",
        "answer": "No. This page explains a design. Send an enquiry to confirm enabled tools, commercial terms, a permitted test environment and who authorizes publication."
      }
    ],
    "related": [
      "marketing",
      "google-sheets-integration",
      "busy-api"
    ]
  },
  "google-sheets-integration": {
    "slug": "google-sheets-integration",
    "path": "/google-sheets-integration",
    "name": "campaign responses in Google Sheets",
    "title": "WhatsApp Campaign Responses to Google Sheets",
    "description": "Plan a Google Sheets workflow for eligible WhatsApp campaign replies. Define event fields, column mappings, access, quotas, duplicate handling and follow-up.",
    "intro": "A campaign reply can be useful to sales or operations only if the row identifies what the person answered and which campaign it belongs to. Define the event and the Sheet mapping before treating a button label as a lead score or a follow-up instruction.",
    "scope": "Confirm the enabled response-to-Sheet integration, supported event types, Google access and plan scope. The row examples are placeholders; no live Sheet, connected account, sync delay, unlimited capacity or customer result is demonstrated.",
    "steps": [
      {
        "title": "Choose the response event",
        "text": "Confirm which incoming quick-reply or other supported events are available and how they relate to a campaign."
      },
      {
        "title": "Authorize and map the Sheet",
        "text": "Select the destination and permitted access. Agree columns, data types and optional fields."
      },
      {
        "title": "Write with recovery rules",
        "text": "Validate the event and define duplicate, failure, retry and reconciliation behavior for the enabled integration."
      },
      {
        "title": "Review before follow-up",
        "text": "Use the reply context to decide the next task. Contact permission and message eligibility still apply."
      }
    ],
    "sections": [
      {
        "id": "features-heading",
        "title": "What the integration scope should answer",
        "text": "Ask how the enabled integration receives events and writes rows. Automatic operation, if configured, still depends on permissions, provider availability, quotas and data mapping.",
        "items": [
          {
            "title": "Access",
            "text": "Confirm the Google authorization method, selected file/tab and who can read the response data. Keep credentials and private Sheet URLs out of public examples."
          },
          {
            "title": "Mapping",
            "text": "Agree column names, time format/timezone, campaign identity and optional metadata. Do not presume every event supplies every field."
          },
          {
            "title": "Recovery",
            "text": "Confirm actual queue, retry limits, duplicate detection and reconciliation. A failed write may remain unresolved; no loss-free promise is made."
          }
        ]
      },
      {
        "id": "how-heading",
        "title": "From campaign reply to a row",
        "text": "Prepare an eligible campaign/template; configure the supported event capture and authorized Sheet; map and validate the response; check write results; route failed or duplicate events for review. Any Apps Script, Zapier, Make or CRM follow-up is a separate authorized integration with its own costs and limits."
      },
      {
        "id": "buttons-heading",
        "title": "A reply label is not a completed action",
        "text": "Illustrative quick-reply labels include Interested, Not Interested, Learn More and Call Me. A mapped reply can help route work; a lead score or priority needs an explicitly chosen rule. A URL or telephone call-to-action does not by itself prove an incoming quick-reply event. Confirm each button/event contract."
      },
      {
        "id": "preview-heading",
        "title": "Illustrative Sheet row mapping",
        "text": "Placeholder values below explain columns. This is a static mapping example, not a product screenshot, a live spreadsheet or a successful sync. It does not contact anyone.",
        "table": {
          "headers": [
            "Recipient reference",
            "Response time",
            "Reply label",
            "Campaign reference"
          ],
          "rows": [
            [
              "[authorized recipient]",
              "[event time + timezone]",
              "Interested",
              "[campaign id]"
            ],
            [
              "[authorized recipient]",
              "[event time + timezone]",
              "Not Interested",
              "[campaign id]"
            ],
            [
              "[authorized recipient]",
              "[event time + timezone]",
              "Call Me",
              "[campaign id]"
            ]
          ]
        }
      },
      {
        "id": "fields-heading",
        "title": "Fields to confirm for the event schema",
        "text": "Obtain the actual supported payload and map only required information. These are candidate field names, not a promise that every event contains them.",
        "table": {
          "headers": [
            "Candidate field",
            "Meaning to map",
            "Validation question"
          ],
          "rows": [
            [
              "phone_number",
              "Authorized recipient identifier",
              "Is this field present and necessary?"
            ],
            [
              "timestamp",
              "Response event time",
              "Which timezone and source clock?"
            ],
            [
              "campaign_id / template_name",
              "Context for the reply",
              "How is it joined to the sent campaign?"
            ],
            [
              "button_id / button_text",
              "Supported reply payload",
              "Does this button produce a capturable event?"
            ],
            [
              "message_id",
              "Message/event reference if supplied",
              "How are duplicate or repeated events handled?"
            ],
            [
              "custom_fields",
              "Explicitly mapped metadata",
              "What access and retention apply?"
            ]
          ]
        }
      },
      {
        "id": "usecases-heading",
        "title": "Keep the next task explicit",
        "text": "Hypothetical uses: a sales team reviews an interested reply; an event team counts supported RSVP responses; operations reviews an order confirmation; a survey owner analyzes the selected answers. None establishes a response rate, automatic lead quality or faster response outcome."
      },
      {
        "id": "limits-heading",
        "title": "Check quotas and unresolved writes",
        "text": "Google documents API quotas and retry guidance; confirm the actual Google project and integration limits. A large spreadsheet cell allowance does not establish unlimited response ingestion. Define how the team finds missing rows, handles permission changes and stops inappropriate follow-ups."
      }
    ],
    "faqs": [
      {
        "question": "Will every button click appear in the Sheet?",
        "answer": "Do not assume that. Confirm which events the enabled integration captures. Quick replies and URL/call actions can have different event contracts; missing fields need explicit handling."
      },
      {
        "question": "Is sync always instant?",
        "answer": "No fixed delay is promised. Event delivery, integration processing, Google access, quotas and outages can affect a write. Confirm actual monitoring and recovery behavior."
      },
      {
        "question": "Are responses unlimited?",
        "answer": "No unlimited-response promise is made. Check provider quotas, file capacity, integration limits and plan terms for the expected volume."
      },
      {
        "question": "Does retry guarantee that no data is lost?",
        "answer": "No. Confirm queue persistence, bounded retry and reconciliation in the actual implementation. Failed or missing writes need a visible review path."
      },
      {
        "question": "Is this the Busy report-to-Sheet workflow?",
        "answer": "No. This page concerns campaign response rows. The Busy Google Sheet page describes a separate report retrieval/refresh workflow and its data contract."
      }
    ],
    "related": [
      "marketing",
      "busy-google-sheet",
      "flow-builder"
    ]
  },
  "whatsapp-business-calling": {
    "slug": "whatsapp-business-calling",
    "path": "/whatsapp-business-calling",
    "name": "WhatsApp Business Calling",
    "title": "WhatsApp Business Calling: Voice Setup and Eligibility",
    "description": "Assess WhatsApp Business Calling with account eligibility, VoIP endpoints, event handling, agent routing and effective voice and follow-up messaging charges.",
    "intro": "Voice support needs an eligible WhatsApp account and an agent endpoint that can actually receive a call. Separate a customer-initiated call from a business-initiated call, and plan staffing, unanswered calls and messaging follow-up for each.",
    "scope": "Confirm calling support for the number, account, API version, provider, country and plan before designing the integration. The workflow is illustrative; no fixed capacity, verification badge, trial entitlement, calling tariff or successful connection is established.",
    "steps": [
      {
        "title": "Check account support",
        "text": "Obtain current calling eligibility, permissions and settings for the actual number and market."
      },
      {
        "title": "Handle the calling event",
        "text": "Agree the provider signaling/event contract, verification and failure responses."
      },
      {
        "title": "Route to a digital endpoint",
        "text": "Confirm a supported VoIP/SIP/WebRTC integration and a staffed agent destination."
      },
      {
        "title": "Resolve or hand off",
        "text": "Track answer/failure/missed states. Check permissions, window eligibility and pricing separately before a follow-up."
      }
    ],
    "sections": [
      {
        "id": "benefits-heading",
        "title": "Choose voice for a question that needs a person",
        "text": "Illustrative uses include explaining an order exception, coordinating an appointment change or discussing a sales request. A call does not establish fraud prevention, regulatory suitability, a verification badge or better answer/conversion rates."
      },
      {
        "id": "strategy-heading",
        "title": "Inbound and outbound have different prerequisites",
        "text": "A customer-initiated call and a business-initiated call need their own availability, permissions and charge checks. Confirm whether the actual call or missed-call event creates an eligible messaging window. No universal permission-request quota or permanent free-call price is supplied.",
        "table": {
          "headers": [
            "Path",
            "Confirm before use",
            "Price here"
          ],
          "rows": [
            [
              "Inbound call",
              "Number/account/market support, receiving endpoint and routing",
              "Unavailable"
            ],
            [
              "Outbound call",
              "Permitted initiation and applicable customer permission rules",
              "Unavailable"
            ],
            [
              "Messaging follow-up",
              "Actual window trigger, category and effective tariff",
              "Unavailable"
            ]
          ]
        }
      },
      {
        "id": "signaling-heading",
        "title": "Separate event signaling from voice media",
        "text": "Agree the actual provider call-event/session contract and how the enabled integration negotiates media. Route an eligible call to the chosen agent endpoint and handle unanswered, failed and ended states. A webhook acknowledgement alone is not proof of an answered call or a working audio path."
      },
      {
        "id": "prereq-heading",
        "title": "VoIP endpoints and a reviewable setup",
        "text": "Preserve the voice distinction: the workflow discussed here is VoIP-to-VoIP using a supported digital endpoint, such as a softphone or SIP/WebRTC integration. Do not assume native forwarding to an ordinary mobile or landline/PSTN number. Confirm any contact-center bridge and provider support separately.",
        "items": [
          {
            "title": "Account and event access",
            "text": "Obtain current settings, API/version support, credentials, event schemas and webhook verification instructions; no fixed messaging tier is asserted."
          },
          {
            "title": "Agent routing",
            "text": "Confirm endpoint support, media negotiation, network/firewall requirements, staffing and routing/fallback. Signaling support alone does not provide an internal contact center."
          },
          {
            "title": "Security and records",
            "text": "Review actual encryption scope, endpoint controls, access, recording permission, logs, retention and providers. No end-to-end encryption or banking/healthcare certification is inferred here."
          }
        ]
      },
      {
        "id": "usecases-heading",
        "title": "Define a bounded support task",
        "text": "Hypothetical examples: clarify a property enquiry; coordinate an appointment change; discuss an order exception; route a delivery-access question to a staffed operations team. Do not use this illustration as emergency/clinical advice, payment verification or proof of live delivery tracking."
      },
      {
        "id": "kpi-heading",
        "title": "Measure answered calls and resolved work",
        "text": "Define the cohort and period, then record attempted, answered, missed and failed calls separately. Specify the denominator for missed-call rate and the method for linking a resolved issue or verified order. Duration alone does not prove resolution quality. No conversion lift or savings result is supplied."
      },
      {
        "id": "pitfalls-heading",
        "title": "Troubleshoot the actual integration contract",
        "text": "Check credentials and their actual lifetime/permissions, webhook verification, subscribed event types, endpoint reachability, negotiated media and routing. Do not assume a “permanent” token cannot expire or that a specific webhook path is universal. Obtain the account capacity, provider quotas and failure codes; no 1,000-call limit or automatic increase is established."
      }
    ],
    "faqs": [
      {
        "question": "Can I forward directly to a mobile or landline?",
        "answer": "The scoped workflow uses a supported digital VoIP endpoint. Do not assume native PSTN forwarding. Confirm any contact-center bridge and its permitted provider contract separately."
      },
      {
        "question": "How much do calling and follow-up messages cost?",
        "answer": "Current numerical charges are unavailable here. Confirm direction, market, effective tariff, currency and units. Keep platform/infrastructure costs and follow-up message charges separate."
      },
      {
        "question": "Does a missed call make later messages free?",
        "answer": "Do not assume that. Confirm the current window trigger and eligibility for the actual event and account, then apply effective pricing, category and permission conditions."
      },
      {
        "question": "How many calls can the account handle?",
        "answer": "Obtain the actual number/account/provider capacity, concurrency limits and escalation process. No universal 1,000-call allowance or infrastructure capacity is promised."
      },
      {
        "question": "Is calling automatically included in a plan or trial?",
        "answer": "Confirm current account/region eligibility, enabled integration and written commercial terms. This page does not activate a trial, provide a badge or connect a call."
      }
    ],
    "related": [
      "flow-builder",
      "utility",
      "marketing"
    ]
  }
};
export const automationConditions = [windowQualification, entryQualification, onboardingQualification];
export const automationSources = [
  { label: "Business Messaging Policy", url: "https://whatsappbusiness.com/policy/" },
  { label: "Meta platform documentation", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/overview" },
  { label: "Pricing conditions", url: "/pricing" },
];
export const sheetsLimitsSource = { label: "Google Sheets API limits and retry guidance", url: "https://developers.google.com/workspace/sheets/api/limits" };
export function automationMarkdown(page: AutomationPage): string {
  return [page.intro, page.scope, automationSceneCaption, "## Illustrative workflow", ...page.steps.map((s,i) => `${i+1}. **${s.title}**: ${s.text}`), ...page.sections.map(s => `## ${s.title}\n\n${s.text}${s.items ? "\n\n" + s.items.map(x => `### ${x.title}\n${x.text}`).join("\n\n") : ""}${s.table ? "\n\n| " + s.table.headers.join(" | ") + " |\n| " + s.table.headers.map(() => "---").join(" | ") + " |\n" + s.table.rows.map(r => "| " + r.join(" | ") + " |").join("\n") : ""}${page.slug === "utility" && s.id === "sandbox-heading" ? "\n\n```sh\n" + utilityExample + "\n```" : ""}`), "## Messaging and setup conditions", ...automationConditions, ...automationSources.map(s => `[${s.label}](${s.url})`), ...(page.slug === "google-sheets-integration" ? [`[${sheetsLimitsSource.label}](${sheetsLimitsSource.url})`] : []), "## Questions", ...page.faqs.map(f => `### ${f.question}\n${f.answer}`), "## Next workflow", ...page.related.map(slug => `[${automationPages[slug]?.name ?? slug}](${automationPages[slug]?.path ?? "/solutions/" + slug})`), "## Discuss the setup", automationEnquiryScope, "[Send an enquiry](/contact)"].join("\n\n");
}
