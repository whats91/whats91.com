import type { ERPGuide } from "./erp-guides";

const metaOverview = { label: "Meta: WhatsApp Account Model Evolution, 16 June 2026", href: "https://developers.meta.com/resources/videos/whatsapp-account-model-evolution/" };
const metaHelp = { label: "Meta Business Help Center: account structure update", href: "https://www.facebook.com/business/help/1082831781117070" };
const metaRouting = { label: "Meta: Conversation Routing overview", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/conversation-routing/overview/" };
const partnerDetail = { label: "Gupshup: 2026 account-model rollout and compatibility", href: "https://support.gupshup.io/hc/en-us/articles/62505395379481-New-WhatsApp-Account-structure-WAME-WhatsApp-Account-Model-Evolution-2026" };

export const accountModelGuide: ERPGuide = {
  slug: "whatsapp-account-model-messaging-accounts-october-2026",
  title: "WhatsApp account model in October 2026: what changed for Cloud API teams?",
  description: "Meta's WhatsApp account split separates phone numbers from templates and billing. Understand the September–October rollout, routing and checks for Cloud API teams.",
  intro: "Meta's WhatsApp account model separates the phone number from each integration's templates and billing. Meta explained the architecture in June 2026; the automatic transition began on 23 September and was scheduled through mid-October. That timing matters now for businesses checking their Cloud API setup, but it does not mean every account screen or partner workflow has already changed in the same way.",
  cover: {
    src: "/images/blog/whatsapp-account-model-messaging-accounts-october-2026/cover-editorial-2026-10-watermarked.webp",
    width: 1200, height: 630,
    alt: "Green illustration of one WhatsApp business phone identity connected to separate template and billing cards",
    caption: "Illustration: the phone number and its messaging accounts now have distinct roles.",
  },
  sections: [
    {
      id: "timeline-and-scope",
      heading: "Separate the announcement from the rollout",
      paragraphs: [
        "Meta described the WhatsApp Account Model Evolution on 16 June 2026. Its design gives a WhatsApp Account (WAAC) the number and identity, while a Messaging Account (PMA) holds an integration's templates and billing. Gupshup's partner guidance dates the automatic migration from 23 September through mid-October 2026. Gupshup says existing campaigns should continue through the scheduled rollout; this window is not evidence that a particular number was migrated or tested.",
        "The account split is useful to teams that manage a Cloud API number, templates, a payment method, partner access or more than one integration. A business using only the WhatsApp Business phone app should not infer that it now has a Cloud API integration. The new architecture also does not establish that Whats91 has enabled a multi-provider workflow for a given customer.",
      ],
      links: [metaOverview, metaHelp, partnerDetail],
    },
    {
      id: "two-account-roles",
      heading: "Know which account owns which asset",
      paragraphs: [
        "Before this change, teams often used one WABA identifier when discussing the number, message templates and billing together. In the new model, the WhatsApp Account contains the business phone number and identity. A separate Messaging Account is associated with an integration and manages its own templates, payment settings and related messaging activity. Meta's developer presentation describes one number being usable across multiple partners and integrations with billing kept separate.",
        "Gupshup says the migrated Messaging Account retains the existing WABA ID for compatibility, while the WhatsApp Account gets its own identifier. Do not rename an existing account ID in code based on its label alone. Check the actual object returned by Meta and the identifier expected by each API call, webhook subscription and admin screen. The business portfolio remains a separate owner and permission boundary.",
      ],
      table: {
        caption: "Asset map for a Cloud API review",
        headers: ["Asset or task", "Account to inspect", "Practical check"],
        rows: [
          ["Phone number and business identity", "WhatsApp Account (WAAC)", "Record the number's owner and current account ID"],
          ["Templates and payment method", "Messaging Account (PMA)", "Check the intended integration's templates and billing method"],
          ["Multiple partner connections", "WhatsApp Account plus each Messaging Account", "Review sharing and which integration owns each messaging workflow"],
          ["Inbound conversation response", "Conversation Routing configuration", "Confirm the assigned responder for each entry point"],
        ],
      },
      links: [metaOverview, partnerDetail, { label: "Cloud API setup guide", href: "/blog/whatsapp-cloud-api-complete-guide-2026" }],
    },
    {
      id: "multiple-integrations",
      heading: "One number can have multiple integrations, but routing needs a decision",
      image: {
        src: "/images/blog/whatsapp-account-model-messaging-accounts-october-2026/account-routing-editorial-2026-10-watermarked.webp",
        width: 1440, height: 810,
        alt: "Green illustration of one business phone number routed to two distinct messaging account integrations",
        caption: "Illustration: a shared number can connect to separate integrations while incoming response ownership remains explicit.",
      },
      paragraphs: [
        "The architecture allows a number to be associated with more than one Messaging Account. Each integration can have separate templates and billing. That is a platform capability, not an instruction to connect another provider immediately. Gupshup notes that the number's quality or a ban can affect all associated messaging accounts, so separation of billing does not isolate every operational risk.",
        "Inbound messages need a clear responder. Meta's Conversation Routing documentation describes assigning each inbound message to a single responder based on its entry point. Before adding a second integration, identify who handles organic chats, ad-initiated chats and any handoff. Test the route with a consented number and inspect the actual webhook destination. Do not assume both systems receive or can reply to every message.",
      ],
      links: [metaRouting, partnerDetail],
    },
    {
      id: "safe-review",
      heading: "Review an existing Cloud API setup without disturbing it",
      paragraphs: [
        "For an existing customer, start with read-only checks in Meta Business Suite and WhatsApp Manager. Note the business portfolio, WhatsApp Account, Messaging Account, phone number ID, template list, billing method and subscribed app. Compare these with the IDs your integration stores. A changed label in the UI does not by itself require a migration or a new template.",
        "Gupshup's rollout guidance says existing Cloud API endpoints, phone number IDs, template workflows and billing remain backward compatible through the first half of 2028. This is partner guidance about Meta's transition, not a warranty for custom code. If an API or webhook payload differs from what your integration expects, capture a sanitized example, compare it with current Meta documentation, and plan a small test before changing production mappings.",
      ],
      steps: [
        "Record the number's current account ownership and both relevant account IDs without changing access.",
        "Confirm that existing approved templates, payment method and expected message statuses are visible in the intended Messaging Account.",
        "If more than one integration is connected, document who sends each template category and who is the inbound responder for each entry point.",
        "Run a limited, consented send and inbound test only after the account map and rollback path are reviewed.",
        "Escalate missing permissions, ambiguous routing or unexpected IDs before moving any customer traffic.",
      ],
      links: [metaHelp, partnerDetail, { label: "October 2026 India pricing guide", href: "/blog/meta-whatsapp-pricing-october-2026-india" }],
    },
    {
      id: "sources-and-limits",
      heading: "Sources, availability and limits of this guide",
      paragraphs: [
        "This guide was prepared on 16 October 2026. Meta's June developer presentation establishes the account model; Gupshup's September partner article gives the September–October rollout window and implementation context, including compatibility and routing. A recent independent explanation was also checked, but the account-model claims here rely on Meta and the partner's documented rollout. The Meta Help Center and developer routing pages may require a browser session; their links are provided for direct account-specific verification.",
        "No Whats91 customer account, WhatsApp Manager view, billing record, Cloud API request, webhook route or multi-provider setup was inspected for this article. Availability and the safe next step depend on the exact business portfolio, permissions, integration and Meta screen shown to the account owner. Do not treat the scheduled rollout date as a promise that every customer's configuration is identical.",
      ],
      links: [metaOverview, metaHelp, metaRouting, partnerDetail],
    },
  ],
  faqs: [
    { question: "Do existing Cloud API numbers need to be re-registered?", answer: "Meta and Gupshup describe an automatic account transition, with no general re-registration instruction. Check the actual account state and current Meta documentation before changing a working number." },
    { question: "Does my old WABA ID disappear?", answer: "Gupshup says the migrated Messaging Account retains the existing WABA ID for backward compatibility. Verify the object type and ID that each integration call expects instead of assuming every field refers to the new WhatsApp Account." },
    { question: "Can two providers use one number immediately?", answer: "The new model supports multiple integrations, but permissions, partner onboarding, templates, billing and Conversation Routing still need account-specific setup and testing. Do not infer that Whats91 currently exposes this for your account." },
    { question: "Will both providers receive incoming messages?", answer: "Do not assume so. Meta describes routing each inbound message to a single responder based on its entry point. Review the routing configuration and test the actual webhook behavior." },
  ],
};
