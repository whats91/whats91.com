import { freeEntryPricingPolicy } from "@/lib/meta-pricing";
// Documentation retrieval date, never a publication/material-update or owner approval date.
export const platformEvidence = {
  checkedAt: "2026-09-28",
  policyUpdatedAt: "2026-09-23",
  policyUrl: "https://whatsappbusiness.com/policy/",
  coexistenceUrl: "https://developers.facebook.com/docs/whatsapp/embedded-signup/custom-flows/onboarding-business-app-users",
  limitsUrl: "https://developers.facebook.com/docs/whatsapp/cloud-api/overview",
  exactAccountCapabilities: "unconfirmed",
} as const;
export const compatibilityQualification = "Coexistence is an option to assess for an existing Business App number. Confirm eligibility for that number, account, country, app/API version and rollout before planning a hybrid setup. This guide does not confirm availability for your account.";
export const throughputQualification = "Throughput in messages per second is separate from recipient messaging limits, template pacing and quality restrictions. Standard and hybrid limits must be checked for the actual account; no fixed MPS or universal upgrade is confirmed here.";
export const scalingQualification = "A version announcement, business verification or username rollout does not establish a fixed daily recipient baseline. Confirm the current number or portfolio limit, quality and provider upgrade conditions before planning campaigns.";
export const historyQualification = "Confirm whether history and media import is offered, which records are included, consent, linked-device support and synchronization behavior. No fixed import period, device count or complete CRM history is guaranteed.";
export const migrationQualification = "Identify whether the number is on the Business App, already API-only or new. Assess coexistence and standard registration separately. Do not delete, deactivate, disconnect or re-register a working account based on this guide; agree a supported migration, backup and recovery plan first.";
export const onboardingQualification = "Onboarding, verification, template review and integration timing depend on the account, provider, workflow and outstanding approvals. Confirm the scope and schedule with the team; no instant approval, fixed waiting period or go-live deadline is promised.";
export const windowQualification = "A customer message opens or resets the 24-hour reply window. Outside it, an approved template is needed. Permission to use a message format does not determine its price; confirm the effective category, allowance and account conditions separately.";
export const entryQualification = freeEntryPricingPolicy;
export const organizationQualification = "Whats91 onboarding assistance, integrations, support channels and response commitments depend on your agreed service scope. Provider/account approval is separate from Whats91 assistance; no organization policy establishes universal Meta eligibility.";
export const compatibilityRows = [
  { feature: "Operating model", standard: "API integration with your chosen interface", hybrid: "Business App alongside API, subject to eligibility" },
  { feature: "Throughput and recipient limits", standard: "Check actual account limits", hybrid: "Check actual hybrid account limits" },
  { feature: "History, media and devices", standard: "Agree migration and retention scope", hybrid: "Confirm import, sync and linked-device scope" },
  { feature: "Calls, groups and app features", standard: "Confirm API/version/region support", hybrid: "Confirm each app/API feature separately" },
  { feature: "Region and onboarding", standard: "Check number/account/provider eligibility", hybrid: "Check country, app version and rollout" },
  { feature: "Billing", standard: "Effective category/rate; platform fees separate", hybrid: "Distinguish app and API traffic; confirm tariffs" },
];
export const eligibilityExamples = [
  { situation: "Existing Business App number", action: "Assess hybrid eligibility before changing the working app; confirm import and device needs." },
  { situation: "Number already on Cloud API", action: "Request a supported transition plan. Do not assume an API-only number can switch to hybrid directly." },
  { situation: "New number or eligibility unknown", action: "Compare standard registration and hybrid requirements with the provider. A country or plan name alone is not approval." },
];
export const compatibilityFAQs = [
  { question: "Can I keep my existing number and Business App?", answer: compatibilityQualification + " " + migrationQualification },
  { question: "What throughput can I expect?", answer: throughputQualification },
  { question: "Will all my chats, media and linked devices carry over?", answer: historyQualification },
  { question: "What happens if I change phones or stop using the app?", answer: "Confirm the current activity, device-change, disconnection and recovery rules for your account. Monitor connection status and pause affected automations while investigating; no fixed inactivity deadline or automatic reconnection is promised here." },
  { question: "Are calling, verification badges and marketing APIs compatible?", answer: "Check each feature against the current API/app version, country, provider and account eligibility. A standard or hybrid label does not confirm calling, group access, a verification badge or a marketing API integration." },
  { question: "Does a service or entry window guarantee free messaging?", answer: windowQualification + " " + entryQualification + " An accepted send is not proof of delivery or final billing; unresolved pricing evidence remains unresolved." },
];
export const compatibilityMarkdown = `## Standard and hybrid account conditions\n\nDocumentation checked ${platformEvidence.checkedAt}; exact account capabilities remain unconfirmed.\n\n${compatibilityQualification}\n\n${throughputQualification}\n\n${historyQualification}\n\n${migrationQualification}\n\n${onboardingQualification}\n\n${organizationQualification}\n\n| Aspect | Standard Cloud API | Hybrid Coexistence |\n| --- | --- | --- |\n${compatibilityRows.map(row => `| ${row.feature} | ${row.standard} | ${row.hybrid} |`).join("\n")}\n\n## Eligibility examples\n\n${eligibilityExamples.map(row => `### ${row.situation}\n${row.action}`).join("\n\n")}\n\n## Questions\n\n${compatibilityFAQs.map(row => `### ${row.question}\n${row.answer}`).join("\n\n")}\n\n[Meta onboarding documentation](${platformEvidence.coexistenceUrl})\n[Business Messaging Policy](${platformEvidence.policyUrl})\n[Pricing conditions](/pricing)`;
