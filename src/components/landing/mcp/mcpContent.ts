import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Boxes,
  Contact,
  FileText,
  FormInput,
  Image as ImageIcon,
  Megaphone,
  PenSquare,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

/**
 * Single source of truth for the /mcp page — copy and structured data all
 * read from here so the visible FAQ and FAQPage JSON-LD can never drift
 * apart. As of 2026-07-20 every capability and client below is confirmed
 * shipped and verified — status differentiation (rolling out / limited /
 * coming soon) was removed at the product owner's confirmation that all
 * backend tools and provider integrations are live in production.
 * B14: retain this as the historical source-reported July 20 confirmation.
 * It is not current per-provider, per-tool, per-plan or per-account proof.
 */

export type McpStatus = "confirm";

export const statusLabel: Record<McpStatus, string> = {
  confirm: "Confirm access",
};

/* ------------------------------------------------------------------ */
/* Supported AI clients (B5)                                           */
/* ------------------------------------------------------------------ */

export interface McpClient {
  id: "chatgpt" | "claude_code" | "grok" | "gemini";
  name: string;
  status: McpStatus;
  headline: string;
  detail: string;
}

export const mcpClients: McpClient[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    status: "confirm",
    headline: "Add Whats91 in ChatGPT developer mode.",
    detail: "Source-reported ChatGPT path. Confirm current developer-mode eligibility and enabled tools.",
  },
  {
    id: "claude_code",
    name: "Claude Code",
    status: "confirm",
    headline: "Add Whats91 as an MCP connector.",
    detail: "Source-reported Claude Code and Claude Web paths. Confirm each client and current setup.",
  },
  {
    id: "grok",
    name: "xAI Grok",
    status: "confirm",
    headline: "Connect via the xAI Remote MCP API.",
    detail: "Source-reported API path. Confirm provider access; a grok.com UI connection is not assumed.",
  },
  {
    id: "gemini",
    name: "Gemini",
    status: "confirm",
    headline: "Ask about Gemini Enterprise.",
    detail: "Source-reported Enterprise path. Confirm registration, eligibility and imported actions.",
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities (B6)                                                    */
/* ------------------------------------------------------------------ */

export interface McpCapability {
  id: string;
  title: string;
  line: string;
  status: McpStatus;
  icon: LucideIcon;
}

export const mcpCapabilities: McpCapability[] = [
  {
    id: "message-performance",
    title: "Message performance",
    line: "Discuss delivered, read, failed and pending reports. Confirm date range limits and reporting entitlement.",
    status: "confirm",
    icon: BarChart3,
  },
  {
    id: "connection-health",
    title: "Connection health",
    line: "Confirm who's connected and that the link between your assistant and Whats91 is live.",
    status: "confirm",
    icon: Stethoscope,
  },
  {
    id: "contacts",
    title: "Contacts & contact books",
    line: "List, search, and see counts and membership.",
    status: "confirm",
    icon: Contact,
  },
  {
    id: "templates",
    title: "Templates",
    line: "Find approved templates, their status, and previews.",
    status: "confirm",
    icon: FileText,
  },
  {
    id: "campaigns-read",
    title: "Campaigns",
    line: "Status, audience size, results, and failures.",
    status: "confirm",
    icon: Megaphone,
  },
  {
    id: "media",
    title: "Media library",
    line: "Browse and search saved media.",
    status: "confirm",
    icon: ImageIcon,
  },
  {
    id: "forms",
    title: "Forms",
    line: "List and preview WhatsApp Forms.",
    status: "confirm",
    icon: FormInput,
  },
  {
    id: "chatbots",
    title: "Chatbots & flows",
    line: "Inspect and manage your automations.",
    status: "confirm",
    icon: Bot,
  },
  {
    id: "catalog",
    title: "Catalog & products",
    line: "Browse and update your catalog.",
    status: "confirm",
    icon: Boxes,
  },
  {
    id: "approved-actions",
    title: "Approved actions",
    line: "Discuss campaign drafts and template submission. Confirm enabled actions, permissions and approval steps.",
    status: "confirm",
    icon: PenSquare,
  },
];

/* ------------------------------------------------------------------ */
/* Illustrative prompt examples (B7)                                           */
/* ------------------------------------------------------------------ */

export interface McpPrompt {
  id: string;
  group: string;
  text: string;
  answer?: string;
  status: McpStatus;
}

export const mcpPrompts: McpPrompt[] = [
  {
    id: "prompt-today-1",
    group: "Analytics & operations",
    text: "How many WhatsApp messages did we deliver and read today?",
    answer: "Today: 9,540 delivered (98%), 7,890 read (82%), 210 failed.",
    status: "confirm",
  },
  {
    id: "prompt-today-2",
    group: "Analytics & operations",
    text: "Which day last week had the most failed messages?",
    answer: "Thursday — 640 failed, mostly invalid numbers.",
    status: "confirm",
  },
  {
    id: "prompt-marketing-1",
    group: "Marketing & campaigns",
    text: "What's the status and audience size of my latest campaign?",
    status: "confirm",
  },
  {
    id: "prompt-marketing-2",
    group: "Marketing & campaigns",
    text: "Show delivered vs. read for my Diwali broadcast.",
    status: "confirm",
  },
  {
    id: "prompt-support-1",
    group: "Support & templates",
    text: "Find my approved templates for order updates.",
    status: "confirm",
  },
  {
    id: "prompt-support-2",
    group: "Support & templates",
    text: "Do I have a template pending Meta review?",
    status: "confirm",
  },
  {
    id: "prompt-contacts-1",
    group: "Contacts",
    text: "How many contacts are in my 'VIP' book?",
    status: "confirm",
  },
  {
    id: "prompt-automation-1",
    group: "Automation & catalog",
    text: "Draft a re-engagement campaign to my 'Lapsed' book — I'll review before it sends.",
    status: "confirm",
  },
  {
    id: "prompt-automation-2",
    group: "Automation & catalog",
    text: "Which catalog products are missing images?",
    status: "confirm",
  },
];

export const mcpPromptGroups = [
  "Analytics & operations",
  "Marketing & campaigns",
  "Support & templates",
  "Contacts",
  "Automation & catalog",
] as const;

/* ------------------------------------------------------------------ */
/* How it works (B8)                                                   */
/* ------------------------------------------------------------------ */

export interface McpStep {
  n: number;
  title: string;
  body: string;
}

export const mcpSteps: McpStep[] = [
  {
    n: 1,
    title: "Pick your assistant",
    body: "Request access and tell our team which assistant and account you want to use.",
  },
  {
    n: 2,
    title: "Confirm eligibility",
    body: "Confirm provider requirements, plan entitlements and the approved connection instructions.",
  },
  {
    n: 3,
    title: "Review permissions",
    body: "Review the actual tool list, data access and approval controls before authorising a connection.",
  },
  {
    n: 4,
    title: "Connect when approved",
    body: "Follow the verified product setup, check a permitted result and confirm the disconnect process.",
  },
];

/* ------------------------------------------------------------------ */
/* Trust & control (B9)                                                */
/* ------------------------------------------------------------------ */

export interface McpTrustItem {
  id: string;
  icon: LucideIcon;
  title: string;
  line: string;
}

export const mcpTrustItems: McpTrustItem[] = [
  { id: "permission", icon: ShieldCheck, title: "Permission-based", line: "Confirm which permissions the product asks you to approve." },
  { id: "no-db", icon: ShieldCheck, title: "No database exposure", line: "Documented design: approved tools instead of direct database access." },
  { id: "scoped", icon: Users, title: "Scoped to your account", line: "Confirm account binding and tenant isolation in the product service." },
  { id: "oauth", icon: ShieldCheck, title: "Secure sign-in", line: "Ask for verified authentication and consent instructions." },
  { id: "rw-split", icon: ShieldCheck, title: "Read vs. write separated", line: "Confirm read permissions and write permissions separately." },
  { id: "confirm", icon: Bell, title: "Confirm before it acts", line: "Verify the approval process for each enabled write action." },
  { id: "revoke", icon: ShieldCheck, title: "Revocable anytime", line: "Confirm when new requests stop and what records remain." },
  { id: "audit", icon: BookOpen, title: "Auditable", line: "Confirm current audit coverage, redaction and retention." },
];

/* ------------------------------------------------------------------ */
/* FAQ (B13) — single source for visible copy + FAQPage JSON-LD        */
/* ------------------------------------------------------------------ */

export { mcpFaqItems, type McpFaqItem } from "@/lib/mcp-contract";

/* ------------------------------------------------------------------ */
/* Access — CTAs                                                       */
/* ------------------------------------------------------------------ */

// No verified, MCP-specific developer-docs route exists in this repository
// yet (see blueprint OD-5): the general API docs at developers.whats91.com
// cover the REST/webhook platform, not the MCP gateway. Point the
// "architecture" CTA at the in-page technical section instead of inventing
// a docs URL.
export const mcpAccess = {
  primaryLabel: "Request Whats91 MCP access",
  primaryHref: "/contact?subject=" + encodeURIComponent("Whats91 MCP Access"),
  secondaryLabel: "See how it works",
  secondaryHref: "#how-it-works",
  docsLabel: "See the architecture",
  docsHref: "#architecture",
} as const;
