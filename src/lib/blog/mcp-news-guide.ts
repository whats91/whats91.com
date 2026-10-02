import type { ERPGuide } from "./erp-guides";

const metaAnnouncement = {
  label: "Meta for Developers: WhatsApp Business Tools MCP announcement, 15 September 2026",
  href: "https://developers.facebook.com/blog/post/2026/09/15/whatsapp-business-messaging-mcp-ai-agent/",
};
const metaOverview = {
  label: "Meta: WhatsApp Business Tools MCP documentation",
  href: "https://developers.facebook.com/documentation/mcp/whatsapp-business-tools-mcp",
};
const independentReport = {
  label: "TechCrunch: reporting on the setup and test workflows",
  href: "https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/",
};

export const mcpNewsGuide: ERPGuide = {
  slug: "whatsapp-business-tools-mcp-onboarding-2026",
  title: "Meta's WhatsApp Business Tools MCP: a practical Cloud API setup checklist",
  description: "Meta announced agent-assisted WhatsApp Business Platform setup in September 2026. See its rollout limits and a safe way to test onboarding, templates and webhooks.",
  intro: "On 15 September 2026, Meta announced WhatsApp Business Tools MCP, a connection that lets a compatible AI coding agent work through selected WhatsApp Business Platform setup and test tasks. For a team preparing a Cloud API integration, the useful question is whether it can shorten a specific setup check while keeping a person responsible for account changes and verification. Access was described as a gradual rollout, so first confirm that the tool is available to your account.",
  cover: {
    src: "/images/blog/whatsapp-business-tools-mcp-onboarding-2026/cover-editorial-2026-10-watermarked.webp",
    width: 1200,
    height: 630,
    alt: "Illustrated phone and account setup cards connected to a human reviewer by a green path",
    caption: "Illustration: an agent can assist with setup; the team still checks the target account and test outcome.",
  },
  sections: [
    {
      id: "announcement-and-availability",
      heading: "What Meta announced, and when it applies",
      paragraphs: [
        "Meta introduced the MCP on 15 September 2026 for development and testing workflows. MCP is a way for a coding assistant to call tools exposed by another service. Here the service is Meta's WhatsApp Business Platform: an agent can help create or inspect business messaging assets, prepare templates and send test messages from its working environment.",
        "The announcement is a rollout, not a mandatory Cloud API migration or a new customer-messaging entitlement. Meta did not set a universal effective date for every business account in the announcement. An integration owner should check the current Meta documentation and whether the connection is visible to their agent and account before planning a test. A missing tool does not prove that a WhatsApp Business Account or Cloud API number is broken.",
      ],
      links: [metaAnnouncement, metaOverview, independentReport],
    },
    {
      id: "who-benefits",
      heading: "Who may find it useful",
      paragraphs: [
        "The immediate audience is the person setting up or maintaining an integration: a developer, an implementation partner or a technical operator with the right Meta permissions. They may need to move among the Developer Console, business settings, template management and webhook configuration. An agent can coordinate supported checks in one workflow and point to a missing prerequisite.",
        "A customer using an existing Whats91 inbox or campaign workflow does not gain an AI agent in their chats because of this announcement. The MCP is a Meta setup tool. It does not establish a new Whats91 feature, replace Whats91's own account setup process, or prove that a particular customer's account is eligible."
      ],
      table: {
        caption: "Choose a task with a result you can verify",
        headers: ["Setup task", "Useful check", "What the result does not prove"],
        rows: [
          ["Business and app access", "Correct business, app, role and terms", "Permission to change an unrelated business"],
          ["Phone number", "Expected number and registration state", "That all recipients can receive messages"],
          ["Template", "Intended category, content and approval state", "Approval or delivery merely because it was submitted"],
          ["Webhook or test message", "Configured callback and observed test event", "A production campaign is ready"],
        ],
      },
      links: [metaAnnouncement, independentReport, { label: "Cloud API operating guide", href: "/blog/whatsapp-cloud-api-complete-guide-2026" }],
    },
    {
      id: "before-connecting",
      heading: "Prepare a bounded test before connecting an agent",
      image: {
        src: "/images/blog/whatsapp-business-tools-mcp-onboarding-2026/review-checklist-editorial-2026-10-watermarked.webp",
        width: 1440,
        height: 810,
        alt: "Illustrated account and message cards lead to a checklist examined by a human operator",
        caption: "Illustration: agree on the target account, permissions and expected result before a setup test.",
      },
      paragraphs: [
        "Write down the exact Meta business, developer app, WhatsApp account and test number intended for the trial. Confirm the human operator's administrative role, the required business terms and any payment or verification prerequisite in Meta's own screens. Use the supported sign-in and permission flow; do not paste access tokens, customer conversations or private documents into an agent prompt.",
        "Decide which actions are read-only and which can create or alter an asset. Have a named owner approve each change, then compare the result with the intended account. If the agent reports an error, keep the actual error and official settings link; do not tell it to try random accounts or numbers until one passes."
      ],
      steps: [
        "Start with one read-only discovery request and confirm the returned business and app identifiers against your own record.",
        "Choose one test task, such as inspecting a template state or checking a webhook subscription, and write the expected result.",
        "Review the requested permissions and target asset before any mutation or test send.",
        "Capture a sanitized result: action, time, target reference, response and any follow-up status. Keep secrets and customer data out of the record.",
      ],
      links: [metaOverview, { label: "WhatsApp account and coexistence conditions", href: "/whatsapp-coexistence" }],
    },
    {
      id: "pilot-and-proof",
      heading: "Judge a pilot by the observed outcome",
      paragraphs: [
        "A useful first pilot is deliberately small. For example, ask the agent to identify the intended account and the state of one already planned test template. If a person then authorizes a test send, use a number the team controls and check the send response, later delivery event and webhook receipt separately. An accepted API request is not proof of recipient delivery, template approval or correct webhook handling.",
        "Record how much manual setup the trial actually removed, what still required a console or human approval, and which errors it surfaced. If the account is not in the rollout, keep the existing documented setup path. Do not replace a working production process on the strength of a demo conversation."
      ],
      links: [metaAnnouncement, independentReport, { label: "How to distinguish API acceptance and delivery", href: "/blog/whatsapp-cloud-api-complete-guide-2026" }],
    },
    {
      id: "unchanged-rules",
      heading: "Messaging rules and charges still need their own review",
      paragraphs: [
        "Creating a template through an agent does not grant approval for its category or waive recipient permission. A test connection also does not alter the customer-service window, business messaging policy or Meta's message charges. Those conditions belong to the account and actual message path, regardless of which interface configured it.",
        "If a team later considers customer traffic, first confirm its approved template, consent records, target recipient, rate card and delivery monitoring. The October 2026 India pricing change is covered separately; it should not be treated as part of this MCP announcement."
      ],
      links: [
        { label: "WhatsApp Business Messaging Policy", href: "https://whatsappbusiness.com/policy/" },
        { label: "Meta October 2026 India pricing guide", href: "/blog/meta-whatsapp-pricing-october-2026-india" },
      ],
    },
    {
      id: "sources-and-limitations",
      heading: "Sources and current limits of this guide",
      paragraphs: [
        "This article was prepared on 2 October 2026. Meta's developer news index confirms the announced account, number, template and test-message scope; independent reporting adds detail on setup checks and the gradual rollout. The exact tool inventory, per-account access and current availability were not independently exercised. Verify those details in Meta's current documentation and your account before connecting an agent.",
        "No Whats91 customer account, Meta MCP installation, template approval or message delivery was tested for this article. Its checklist is an editorial way to evaluate a trial, not a claim that Meta or Whats91 completed those steps for you."
      ],
      links: [metaAnnouncement, metaOverview, independentReport],
    },
  ],
  faqs: [
    { question: "Is WhatsApp Business Tools MCP available to every Cloud API account?", answer: "The September 2026 announcement described a gradual rollout. Check the current Meta documentation, your agent's connection options and your account permissions before assuming access." },
    { question: "Will it answer customer WhatsApp messages for my business?", answer: "This release concerns setup and testing tools for integration teams. It does not, by itself, deploy a customer-facing assistant or change an existing Whats91 messaging workflow." },
    { question: "Can an agent approve templates or guarantee test-message delivery?", answer: "No such guarantee follows from creating a template or submitting a test request. Check the actual template status, send response, later delivery event and webhook result separately." },
    { question: "Does using the MCP change WhatsApp message pricing?", answer: "The MCP announcement does not establish a new message rate. Use Meta's applicable rate card and the actual account, market, category and delivery evidence for any sending plan." },
  ],
};
