import type { EditorialVisual } from "@/components/blog/EditorialGuideArticle";

const images = "/images/blog";

export const mcpNewsVisual: EditorialVisual = {
  eyebrow: "Cloud API setup guide",
  heroSquare: `${images}/whatsapp-business-tools-mcp-onboarding-2026/cover-hero-square-editorial-2026-10-watermarked.webp`,
  quickLinks: ["announcement-and-availability", "before-connecting", "pilot-and-proof"],
  focusSectionId: "before-connecting",
  figureEyebrow: "Setup review",
  figureTitle: "Keep a person responsible for each change",
  figureIntro: "Define the target account, permitted action and expected result before an agent-assisted test.",
  mobileFigure: `${images}/whatsapp-business-tools-mcp-onboarding-2026/review-checklist-mobile-editorial-2026-10-watermarked.webp`,
  cards: [
    { title: "Target", text: "Confirm the intended business, app, WhatsApp account and test number." },
    { title: "Permission", text: "Review the operator role and approve each asset change or test send." },
    { title: "Outcome", text: "Compare the response and later events with the expected result." },
  ],
};

export const sheetsVisual: EditorialVisual = {
  eyebrow: "Import & validation guide",
  heroSquare: `${images}/busy-erp-google-sheets-integration-complete-guide/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["choose-input", "csv-import", "validate-data"],
  focusSectionId: "validate-data",
  figureEyebrow: "Evidence illustration",
  figureTitle: "Validate the reporting copy against its source",
  figureIntro: "A successful import is only a starting state. Compare the rows and totals before relying on a dashboard.",
  mobileFigure: `${images}/busy-erp-google-sheets-integration-complete-guide/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Source", text: "Keep the original export, company and financial-year context available." },
    { title: "Match", text: "Check row counts, dates, amounts and duplicates against that export." },
    { title: "Freshness", text: "Record when the copy was produced and who reviews exceptions." },
  ],
};

export const graphMigrationVisual: EditorialVisual = {
  eyebrow: "Migration field guide",
  heroSquare: `${images}/whatsapp-graph-api-v24-to-v25-transition-guide/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["version-evidence", "feature-comparison", "migration-pilot"],
  focusSectionId: "migration-pilot",
  figureEyebrow: "Migration decision map",
  figureTitle: "Evidence before a limited pilot",
  figureIntro: "A version label does not establish feature support. Keep the current contract and recovery route in view.",
  mobileFigure: `${images}/whatsapp-graph-api-v24-to-v25-transition-guide/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Document", text: "Record the current integration and the supported target contract." },
    { title: "Rehearse", text: "Use synthetic events to check the consumers a change could affect." },
    { title: "Recover", text: "Set stop and rollback criteria before the limited pilot." },
  ],
};

export const usernameVisual: EditorialVisual = {
  eyebrow: "Identity readiness guide",
  heroSquare: `${images}/whatsapp-username-system-2026-complete-guide/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["announcement", "addressability", "identity-mapping"],
  focusSectionId: "identity-mapping",
  figureEyebrow: "Identity decision map",
  figureTitle: "Keep ambiguous customer matches unresolved",
  figureIntro: "A handle, phone reference and internal customer record need their own source and scope.",
  mobileFigure: `${images}/whatsapp-username-system-2026-complete-guide/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Source", text: "Preserve where each external identifier came from." },
    { title: "Scope", text: "Confirm the documented namespace and account rollout before joining records." },
    { title: "Review", text: "Keep uncertain matches separate and reversible." },
  ],
};

export const plusVisual: EditorialVisual = {
  eyebrow: "Subscription decision guide",
  heroSquare: `${images}/whatsapp-plus-launch-2026-premium-subscription-guide/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["announcement", "benefits", "price-and-plan"],
  focusSectionId: "price-and-plan",
  figureEyebrow: "Offer review",
  figureTitle: "Read the offer that is actually shown to you",
  figureIntro: "An announcement does not settle local availability, included features or renewal terms.",
  mobileFigure: `${images}/whatsapp-plus-launch-2026-premium-subscription-guide/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Availability", text: "Check the genuine account offer in the app." },
    { title: "Included terms", text: "Compare features against your actual use, not a preview." },
    { title: "Renewal", text: "Read the local price, billing period and cancellation terms before buying." },
  ],
};

export const webMigrationVisual: EditorialVisual = {
  eyebrow: "Migration planning guide",
  heroSquare: `${images}/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["migration-session-dependency", "guide-platform-conditions", "migration-cutover"],
  focusSectionId: "migration-cutover",
  figureEyebrow: "Cutover decision map",
  figureTitle: "Assess, rehearse and retain a recovery path",
  figureIntro: "A browser-linked dependency needs an inventory and stop criteria before any separately authorized migration.",
  mobileFigure: `${images}/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Assess", text: "Record the current session dependency, number state and supported path." },
    { title: "Rehearse", text: "Test synthetic failures and uncertain delivery without customer traffic." },
    { title: "Recover", text: "Set an operator pause and rollback criteria before a pilot." },
  ],
};

export const logoutRuleVisual: EditorialVisual = {
  eyebrow: "Historical rule explainer",
  heroSquare: `${images}/whatsapp-web-6-hour-logout-rule-india-2026/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["historical-announcement", "current-status", "session-recovery"],
  focusSectionId: "session-recovery",
  figureEyebrow: "Investigation map",
  figureTitle: "Observe the interruption before naming its cause",
  figureIntro: "A dated direction does not prove why a particular browser-linked session disconnected today.",
  mobileFigure: `${images}/whatsapp-web-6-hour-logout-rule-india-2026/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Observe", text: "Record the connection, device and client state at the time of interruption." },
    { title: "Separate", text: "Keep historical announcements apart from current account evidence." },
    { title: "Recover", text: "Give staff a safe route to resume work without a guessed timer." },
  ],
};

export const busyBenefitsVisual: EditorialVisual = {
  eyebrow: "Workflow evaluation guide",
  heroSquare: `${images}/busy-accounting-whatsapp-integration-benefits/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["choose-workflow", "invoice-delivery", "implementation"],
  focusSectionId: "invoice-delivery",
  figureEyebrow: "Invoice workflow",
  figureTitle: "Review the document, recipient and permission",
  figureIntro: "A candidate accounting workflow still needs source records, an authorized recipient and an outcome path.",
  mobileFigure: `${images}/busy-accounting-whatsapp-integration-benefits/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Document", text: "Confirm the final invoice and the correct business record." },
    { title: "Recipient", text: "Check the customer mapping and messaging permission." },
    { title: "Outcome", text: "Retain a pause and human path for failed or unknown delivery." },
  ],
};

export const octoberPricingVisual: EditorialVisual = {
  eyebrow: "India pricing guide",
  heroSquare: `${images}/meta-whatsapp-pricing-october-2026/cover-hero-square-2026-10-watermarked.webp`,
  quickLinks: ["october-changes", "india-list-rates", "service-free-entry"],
  focusSectionId: "service-free-entry",
  figureEyebrow: "Allowance and eligibility",
  figureTitle: "Keep two free-message mechanisms separate",
  figureIntro: "The monthly Service allowance and a confirmed free-entry window have different conditions and evidence.",
  mobileFigure: `${images}/meta-whatsapp-pricing-october-2026/body-mobile-refined-2026-10-watermarked.webp`,
  cards: [
    { title: "Allowance", text: "Track the Service amount remaining for the business phone number." },
    { title: "Free entry", text: "Confirm the eligible entry, business response and active window for the customer." },
    { title: "Evidence", text: "Keep unmatched or unverified deliveries in the budget until reconciled." },
  ],
};
