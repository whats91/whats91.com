import type { ERPGuide } from "./erp-guides";

const changelog = { label: "Meta: WhatsApp Business Platform changelog, 8 October 2026", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/changelog/" };
const overview = { label: "Meta: Direct Send overview and eligibility", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/direct-send#eligibility" };
const sending = { label: "Meta: send utility and authentication messages", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/direct-send/send-utility-and-authentication-messages/" };
const limits = { label: "Meta: supported Direct Send formats and limits", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/direct-send/supported-features-and-limits/" };

export const directSendGuide: ERPGuide = {
  slug: "whatsapp-direct-send-utility-eligibility-2026",
  title: "WhatsApp Direct Send utility messages: who became eligible in October 2026?",
  description: "Meta widened Direct Send utility eligibility on 8 October 2026. Check the 100,000 messaging-limit threshold, account banner, supported formats and safe pilot path.",
  intro: "On 8 October 2026, Meta updated Direct Send eligibility: business portfolios with a messaging limit of 100,000 or unlimited are now generally eligible for Direct Send utility messaging. That is an eligibility rule, not proof that a particular WhatsApp account has the feature. A team should check its own WhatsApp Manager banner before changing how it sends order updates or other utility messages.",
  cover: {
    src: "/images/blog/whatsapp-direct-send-utility-eligibility-2026/cover-editorial-2026-10-watermarked.webp",
    width: 1200,
    height: 630,
    alt: "Green illustration of a utility message on a phone beside an eligibility card and generated template",
    caption: "Illustration: check account eligibility before piloting the Meta Direct Send utility path.",
  },
  sections: [
    {
      id: "what-changed",
      heading: "What changed on 8 October, and what did not",
      paragraphs: [
        "Meta's 8 October changelog widened the general eligibility rule for Direct Send utility messaging to portfolios with a 100,000 or unlimited messaging limit. The Direct Send overview, updated the same day, says the solution remains a phased rollout and tells businesses to verify availability in WhatsApp Manager. An eligible-looking limit alone is therefore not an activation signal.",
        "Direct Send itself predates this entry. Its purpose is to let an eligible business submit business-initiated utility content through the Cloud API without first creating the corresponding message template by hand. Meta matches the content to an existing template or uses an onboarding fallback and creates a new template asynchronously. This is a change in the integration path, not an exemption from category rules, recipient permission, message charges or delivery checks.",
      ],
      links: [changelog, overview, { label: "Cloud API operating guide", href: "/blog/whatsapp-cloud-api-complete-guide-2026" }],
    },
    {
      id: "eligibility-check",
      heading: "Check the account before planning a send",
      paragraphs: [
        "Find the portfolio's actual messaging limit and open WhatsApp Manager for the intended Messaging account. Meta says a banner there indicates whether Direct Send is enabled. Record the business, account, phone number and banner state. A portfolio at the threshold may be generally eligible yet still lack access during rollout or because another prerequisite is unmet.",
        "If the feature is not enabled, keep using the approved-template path. Meta documents a synchronous code 100 response for a Direct Send category request from an ineligible account; its detail says the category requires Direct Send and recommends an approved template. Do not interpret that error as a temporary delivery delay and blindly retry customer traffic.",
      ],
      table: {
        caption: "Eligibility signals to keep separate",
        headers: ["Signal", "What it tells you", "What to do"],
        rows: [
          ["Portfolio limit of 100,000 or unlimited", "Generally eligible for utility Direct Send under Meta's 8 October rule", "Check the intended account in WhatsApp Manager"],
          ["Eligible banner in WhatsApp Manager", "Meta indicates account availability", "Review prerequisites and test a supported utility use case"],
          ["No eligible banner or code 100", "Do not assume Direct Send is enabled", "Continue with an approved utility template"],
          ["Authentication category", "Still beta and restricted", "Do not infer access from utility eligibility"],
        ],
      },
      links: [overview, sending],
    },
    {
      id: "integration-difference",
      heading: "Understand the API path and category boundary",
      paragraphs: [
        "Direct Send uses the existing Cloud API messages endpoint with a category field. Meta's utility example sends ordinary text content with category set to utility; the platform then handles template matching or generation behind the scenes. This is different from submitting an approved template name and parameters. A developer should follow Meta's current request reference rather than adapting a live sender from this short explanation alone.",
        "Omitting category follows the normal free-form Service flow. It is not a way to start a Direct Send utility message: outside an open service window, the usual 131047 error can apply. Marketing is not a supported Direct Send category. Authentication is documented as beta and access restricted, with its own category and conditions. A customer update belongs in Utility only when it satisfies Meta's category guidelines; writing marketing copy in an order notification does not make it Utility.",
      ],
      table: {
        caption: "Do not mix the message paths",
        headers: ["Intent", "Documented path", "Important boundary"],
        rows: [
          ["Eligible business-initiated Utility", "Direct Send request with category: utility", "Only after account availability and content fit are confirmed"],
          ["Existing approved Utility template", "Standard template send", "A reliable fallback when Direct Send is unavailable"],
          ["Service reply", "Normal free-form send or category: service", "Requires an open customer-service window"],
          ["Marketing or Authentication", "Separate documented paths", "Marketing is unsupported here; Authentication remains restricted beta"],
        ],
      },
      links: [sending, limits, { label: "October India message-pricing guide", href: "/blog/meta-whatsapp-pricing-october-2026-india" }],
    },
    {
      id: "pilot-checklist",
      heading: "Pilot one genuine utility workflow",
      image: {
        src: "/images/blog/whatsapp-direct-send-utility-eligibility-2026/eligibility-check-editorial-2026-10-watermarked.webp",
        width: 1440,
        height: 810,
        alt: "Three green illustrated stages showing account eligibility, a parcel update on a phone and delivery review",
        caption: "Illustration: verify account access, message category and the observed outcome as separate steps.",
      },
      paragraphs: [
        "A useful first case is an order or delivery update tied to a real customer transaction, using a consented test recipient and a business account whose Direct Send banner shows access. Keep the content strictly informational. Before a live change, review how your system creates and displays templates, records message IDs, handles reclassification and processes later status webhooks.",
        "Send one controlled example using Meta's documented request format. Compare the synchronous API result, the actual template or fallback behavior, and later status events. Record any error and stop criteria. A successful request does not prove that the message arrived, that every future message will match the same template, or that Whats91's existing product interface exposes Direct Send.",
      ],
      steps: [
        "Confirm the exact portfolio limit and Direct Send banner for the intended account; save a dated, non-sensitive eligibility note.",
        "Choose a consented utility use case and review its text against Meta's category and content rules.",
        "Check that the selected format is supported. Meta lists text, selected interactive buttons and certain media headers for Utility; other formats need their own path.",
        "Test one controlled send, then inspect the response, generated-template view where applicable and later delivery status separately.",
        "Compare category, charges and operator visibility with the existing approved-template workflow before considering broader use.",
      ],
      links: [overview, limits, sending],
    },
    {
      id: "scope-and-cost",
      heading: "Keep format, pricing and product scope explicit",
      paragraphs: [
        "Meta lists Direct Send Utility support for text, selected call-to-action URL and reply buttons, some media headers and a standalone voice-call button. Formats outside its supported list should not be assumed to work. The supported-features page says Direct Send follows standard Cloud API throughput eligibility; the 100,000 threshold here is a general eligibility criterion, not a promise of extra throughput or a quota of free messages.",
        "Meta's sending guide identifies Utility Direct Send messages as charged at Utility rates. Use the rate applicable to the recipient market, date and account when budgeting. The October 2026 India pricing article covers the local rate schedule and separates Utility from Service allowances. No Direct Send-specific discount or Whats91 product support is established by this Meta update.",
      ],
      links: [limits, sending, { label: "Meta WhatsApp pricing in India from October 2026", href: "/blog/meta-whatsapp-pricing-october-2026-india" }],
    },
    {
      id: "sources-and-status",
      heading: "Sources and status of this guide",
      paragraphs: [
        "This guide was prepared on 13 October 2026 from Meta's WhatsApp Business Platform changelog and Direct Send documentation. The new fact is the 8 October portfolio-limit eligibility update. The Direct Send mechanics and supported-format pages describe the existing feature; their earlier update dates are not presented as October launches. Meta's overview calls Utility generally eligible at the threshold while also noting a phased rollout and account-level confirmation.",
        "No Whats91 or customer Meta account, WhatsApp Manager banner, API send, generated template, delivery, charge or billing record was tested for this article. The checklist is for deciding whether a small, authorized pilot is sensible; it is not a statement that a particular business or Whats91 feature has been activated.",
      ],
      links: [changelog, overview, sending, limits],
    },
  ],
  faqs: [
    { question: "Does a 100,000 messaging limit automatically turn on Direct Send?", answer: "No. Meta describes portfolios at 100,000 or unlimited as generally eligible for Utility Direct Send, but says rollout is phased. Check the intended Messaging account's banner in WhatsApp Manager." },
    { question: "Can I use Direct Send for marketing?", answer: "No. Meta's supported-features page excludes Marketing, and its sending reference shows marketing as an unsupported category value." },
    { question: "Does this remove the need for category review or customer permission?", answer: "No. The message still needs to fit Meta's Utility rules and your recipient-permission process. Direct Send changes template handling, not those obligations." },
    { question: "Is Authentication Direct Send generally available too?", answer: "No. Meta labels Authentication Direct Send beta and access restricted. The 8 October eligibility update specifically concerns Utility messaging." },
    { question: "Does Whats91 already offer Direct Send in its interface?", answer: "This Meta documentation does not establish a Whats91 product feature. Confirm integration support with the current Whats91 product team before planning to use it through an existing Whats91 workflow." },
  ],
};
