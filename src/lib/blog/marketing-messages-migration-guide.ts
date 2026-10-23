import type { ERPGuide } from "./erp-guides";

const announcement = { label: "Meta developer announcement, 21 October 2026", href: "https://developers.facebook.com/blog/post/2026/10/21/sunsetting-marketing-messages-on-the-cloud-api/" };
const overview = { label: "Meta: Marketing Messages API overview and timeline", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/marketing-messages/overview/" };
const routing = { label: "Meta: route templates by their latest category", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/marketing-messages/route-template-messages/" };
const onboarding = { label: "Meta: Marketing Messages API onboarding", href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/marketing-messages/onboarding/" };

export const marketingMessagesMigrationGuide: ERPGuide = {
  slug: "whatsapp-cloud-api-marketing-messages-sunset-2027",
  title: "Cloud API marketing messages end in 2027: the migration dates and checks",
  description: "Meta is moving WhatsApp marketing sends from Cloud API to its Marketing Messages API. See the April and October 2027 milestones and a practical migration checklist.",
  intro: "Meta announced that WhatsApp marketing messages sent through the Cloud API will stop on 13 October 2027. There is an earlier boundary: Messaging accounts created on or after 13 April 2027 cannot use Cloud API for marketing sends. Marketing Messages API for WhatsApp is the successor send path. Service, Utility and Authentication messaging remains on Cloud API.",
  cover: {
    src: "/images/blog/whatsapp-cloud-api-marketing-messages-sunset-2027/cover-editorial-2026-10-watermarked.webp",
    width: 1200,
    height: 630,
    alt: "Green illustration of a business phone routing messages toward Cloud API and a dedicated marketing send path",
    caption: "Illustration: plan a separate route for marketing templates while other message categories remain on Cloud API.",
  },
  sections: [
    {
      id: "announcement-and-dates",
      heading: "Read the announcement and effective dates separately",
      paragraphs: [
        "Meta's developer blog published this migration notice on 21 October 2026. Its overview records a global sunset announcement on 13 October 2026, and says the Marketing Messages API became generally available on 19 November 2025. Those are announcement and product-availability milestones; the sending restrictions arrive later. This article was checked on 22 October 2026, so the 2027 dates below are scheduled future changes, not restrictions already observed in a customer account.",
        "From 13 April 2027, a newly created Messaging account cannot send marketing messages through Cloud API. An account created before that date can continue using the Cloud API marketing path until 13 October 2027. From 13 October 2027, Meta says a Cloud API marketing send will return an error. Marketing sends can continue through Marketing Messages API, or other supported surfaces where Meta allows them.",
      ],
      table: {
        caption: "Meta's published migration timeline",
        headers: ["Date", "Meta milestone", "Planning meaning"],
        rows: [
          ["19 Nov 2025", "Marketing Messages API generally available", "The successor API is available for integration"],
          ["13 Oct 2026", "Global sunset announcement recorded in Meta's overview", "Start assessing existing marketing send paths"],
          ["13 Apr 2027", "New Messaging accounts lose Cloud API marketing sends", "Onboard new accounts directly to the Marketing Messages API"],
          ["13 Oct 2027", "Cloud API marketing support ends globally", "Move remaining marketing sends before this date"],
        ],
      },
      links: [announcement, overview],
    },
    {
      id: "scope-by-category",
      heading: "Only the marketing send path changes",
      paragraphs: [
        "The sunset concerns WhatsApp marketing messages sent through the Cloud API. Meta explicitly says Service, Authentication and Utility messages remain supported there. Do not move all outbound traffic to the marketing endpoint: Meta's category-routing guide sends MARKETING templates to /<PHONE_NUMBER_ID>/marketing_messages and other supported categories to /<PHONE_NUMBER_ID>/messages.",
        "Existing phone numbers and approved marketing templates can be used with the Marketing Messages API, according to Meta. Its overview describes a similar technical schema and the same billing model as Cloud API, but this does not prove that a provider's product surface, fees, permissions or account onboarding are already ready. Review the current Meta pricing and the customer's actual billing evidence before estimating a campaign cost.",
      ],
      table: {
        caption: "Where each supported message category belongs after migration",
        headers: ["Message category", "Documented API send path", "2027 change"],
        rows: [
          ["Marketing template", "Marketing Messages API /marketing_messages", "Required for new accounts from 13 Apr and all accounts from 13 Oct"],
          ["Utility template", "Cloud API /messages", "Continues on Cloud API"],
          ["Authentication template", "Cloud API /messages", "Continues on Cloud API"],
          ["Service reply", "Cloud API /messages", "Continues on Cloud API under its existing rules"],
        ],
      },
      links: [overview, routing, { label: "Cloud API operating guide", href: "/blog/whatsapp-cloud-api-complete-guide-2026" }],
    },
    {
      id: "category-routing",
      heading: "Route by the latest template category",
      paragraphs: [
        "A template approved as Utility can later be reclassified as Marketing if its content is promotional. Meta specifically calls out that reclassified traffic must be routed to the Marketing Messages API. A sender that chooses the endpoint solely from an old template label can therefore break even when its marketing campaign list looks complete.",
        "Meta's routing guidance recommends maintaining a mapping of Messaging account, template identity, language and latest category, subscribing to category-update webhooks, and refreshing missing or changed categories before sending. A controlled failed send may justify a category refresh and idempotent retry on the correct endpoint. An unknown delivery outcome does not justify a blind duplicate send.",
      ],
      links: [routing, announcement, { label: "October 2026 India pricing and billing guide", href: "/blog/meta-whatsapp-pricing-october-2026-india" }],
    },
    {
      id: "migration-plan",
      heading: "Run a small migration before moving campaigns",
      image: {
        src: "/images/blog/whatsapp-cloud-api-marketing-messages-sunset-2027/migration-path-editorial-2026-10-watermarked.webp",
        width: 1440,
        height: 810,
        alt: "Green three-stage illustration of Cloud API messaging, a dated review checklist and a marketing message send path",
        caption: "Illustration: inventory, test and reconcile a marketing send before changing the default route.",
      },
      paragraphs: [
        "Start with an inventory of the business portfolios, Messaging accounts, phone numbers and marketing templates that actually send through Cloud API. Separate established accounts from any account planned for creation after 13 April 2027. Identify the owner of the sending integration and the person who can accept Meta's Marketing Messages API terms for the right business.",
        "Then onboard the intended account using Meta's current guide and test a consented marketing template through the Marketing Messages API endpoint. Compare the synchronous response, later status webhook, category, and billed delivery separately. Meta says most integrations may take about two weeks, but that is an average in its notice, not a deadline or a guarantee for a particular application.",
      ],
      steps: [
        "List active Cloud API marketing senders and their Messaging account IDs, numbers, templates and languages.",
        "Confirm terms acceptance, permissions and onboarding for the intended Marketing Messages API account.",
        "Build category-aware routing and handle Meta's completed template-category updates.",
        "Send a small consented pilot and reconcile response, delivery, category and billing evidence.",
        "Move campaigns in stages, retain a rollback decision, and monitor failures before the relevant 2027 date.",
      ],
      links: [onboarding, routing, overview],
    },
    {
      id: "product-and-source-limits",
      heading: "What this guide does and does not establish",
      paragraphs: [
        "This guide follows Meta's 21 October developer notice and its Marketing Messages API overview, which was marked updated 13 October 2026 when checked on 22 October. Meta's category-routing document was marked updated 21 September 2026. The later 21 October post reinforces an already documented October announcement; the April and October 2027 restrictions are future effective dates. Feature availability and some optimizations can vary by geography and account.",
        "No Whats91 customer account, Marketing Messages API integration, terms acceptance, campaign send, billing record or webhook was inspected for this article. It does not claim that Whats91 currently offers this API in its interface or that any customer's traffic has been migrated. An account owner and the current Whats91 product team should verify the exact integration path before moving real traffic.",
      ],
      links: [announcement, overview, routing, onboarding],
    },
  ],
  faqs: [
    { question: "Does WhatsApp Cloud API itself end in October 2027?", answer: "No. Meta's announced sunset is for marketing messages sent through Cloud API. It says Service, Utility and Authentication messages continue there." },
    { question: "What changes for a Messaging account created after 13 April 2027?", answer: "Meta says an account created on or after that date cannot send marketing through Cloud API. It can send marketing through the Marketing Messages API after the required onboarding." },
    { question: "Can existing marketing templates and phone numbers still be used?", answer: "Meta says existing phone numbers and marketing templates can be used with the Marketing Messages API. Confirm the account's permissions, terms and test outcome before changing production sends." },
    { question: "What if a Utility template becomes Marketing?", answer: "Route it by the latest category. Meta says reclassified Marketing traffic belongs on the Marketing Messages API; keep the category mapping current and review failed sends safely." },
    { question: "Has Whats91 already migrated my marketing campaigns?", answer: "This article cannot confirm a customer-specific Whats91 integration or migration. Ask the current product team to check your account, send path and delivery evidence." },
  ],
};
