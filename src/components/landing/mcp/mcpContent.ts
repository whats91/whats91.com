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
 */

export type McpStatus = "available";

export const statusLabel: Record<McpStatus, string> = {
  available: "Available now",
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
    status: "available",
    headline: "Add Whats91 in ChatGPT developer mode.",
    detail: "Sign in and start asking — the full Whats91 MCP tool set is live.",
  },
  {
    id: "claude_code",
    name: "Claude Code",
    status: "available",
    headline: "Add Whats91 as an MCP connector.",
    detail: "Works with Claude Code and Claude Web over the standards-based MCP connector.",
  },
  {
    id: "grok",
    name: "xAI Grok",
    status: "available",
    headline: "Connect via the xAI Remote MCP API.",
    detail: "Connect through the xAI Remote MCP API and start asking about your account.",
  },
  {
    id: "gemini",
    name: "Gemini",
    status: "available",
    headline: "Available for Gemini Enterprise.",
    detail: "Connect through the Gemini Enterprise Custom MCP Server.",
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
    line: "Delivered, read, failed, and pending — by day, for any range in the last 92 days.",
    status: "available",
    icon: BarChart3,
  },
  {
    id: "connection-health",
    title: "Connection health",
    line: "Confirm who's connected and that the link between your assistant and Whats91 is live.",
    status: "available",
    icon: Stethoscope,
  },
  {
    id: "contacts",
    title: "Contacts & contact books",
    line: "List, search, and see counts and membership.",
    status: "available",
    icon: Contact,
  },
  {
    id: "templates",
    title: "Templates",
    line: "Find approved templates, their status, and previews.",
    status: "available",
    icon: FileText,
  },
  {
    id: "campaigns-read",
    title: "Campaigns",
    line: "Status, audience size, results, and failures.",
    status: "available",
    icon: Megaphone,
  },
  {
    id: "media",
    title: "Media library",
    line: "Browse and search saved media.",
    status: "available",
    icon: ImageIcon,
  },
  {
    id: "forms",
    title: "Forms",
    line: "List and preview WhatsApp Forms.",
    status: "available",
    icon: FormInput,
  },
  {
    id: "chatbots",
    title: "Chatbots & flows",
    line: "Inspect and manage your automations.",
    status: "available",
    icon: Bot,
  },
  {
    id: "catalog",
    title: "Catalog & products",
    line: "Browse and update your catalog.",
    status: "available",
    icon: Boxes,
  },
  {
    id: "approved-actions",
    title: "Approved actions",
    line: "Draft campaigns and submit templates — always with a confirmation step before anything goes out.",
    status: "available",
    icon: PenSquare,
  },
];

/* ------------------------------------------------------------------ */
/* Live prompt examples (B7)                                           */
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
    status: "available",
  },
  {
    id: "prompt-today-2",
    group: "Analytics & operations",
    text: "Which day last week had the most failed messages?",
    answer: "Thursday — 640 failed, mostly invalid numbers.",
    status: "available",
  },
  {
    id: "prompt-marketing-1",
    group: "Marketing & campaigns",
    text: "What's the status and audience size of my latest campaign?",
    status: "available",
  },
  {
    id: "prompt-marketing-2",
    group: "Marketing & campaigns",
    text: "Show delivered vs. read for my Diwali broadcast.",
    status: "available",
  },
  {
    id: "prompt-support-1",
    group: "Support & templates",
    text: "Find my approved templates for order updates.",
    status: "available",
  },
  {
    id: "prompt-support-2",
    group: "Support & templates",
    text: "Do I have a template pending Meta review?",
    status: "available",
  },
  {
    id: "prompt-contacts-1",
    group: "Contacts",
    text: "How many contacts are in my 'VIP' book?",
    status: "available",
  },
  {
    id: "prompt-automation-1",
    group: "Automation & catalog",
    text: "Draft a re-engagement campaign to my 'Lapsed' book — I'll review before it sends.",
    status: "available",
  },
  {
    id: "prompt-automation-2",
    group: "Automation & catalog",
    text: "Which catalog products are missing images?",
    status: "available",
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
    body: "In your Whats91 dashboard, choose ChatGPT, Claude, Grok, or Gemini and follow the guided setup.",
  },
  {
    n: 2,
    title: "Sign in with Whats91",
    body: "A secure sign-in opens. No passwords or keys are ever shared with the assistant.",
  },
  {
    n: 3,
    title: "Approve what it can access",
    body: "You see exactly which capabilities are requested and approve only what you want.",
  },
  {
    n: 4,
    title: "Ask away",
    body: "Questions and answers happen right inside your assistant, from your own data. Disconnect any time.",
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
  { id: "permission", icon: ShieldCheck, title: "Permission-based", line: "You approve every capability, individually." },
  { id: "no-db", icon: ShieldCheck, title: "No database exposure", line: "Assistants use approved tools, never your database." },
  { id: "scoped", icon: Users, title: "Scoped to your account", line: "It can only ever see your data." },
  { id: "oauth", icon: ShieldCheck, title: "Secure sign-in", line: "OAuth-based; no shared passwords or keys." },
  { id: "rw-split", icon: ShieldCheck, title: "Read vs. write separated", line: "Reading can't change anything." },
  { id: "confirm", icon: Bell, title: "Confirm before it acts", line: "Changes need an explicit, one-time confirmation." },
  { id: "revoke", icon: ShieldCheck, title: "Revocable anytime", line: "Disconnect and access ends immediately." },
  { id: "audit", icon: BookOpen, title: "Auditable", line: "Every request is logged, with sensitive values hidden." },
];

/* ------------------------------------------------------------------ */
/* FAQ (B13) — single source for visible copy + FAQPage JSON-LD        */
/* ------------------------------------------------------------------ */

export interface McpFaqItem {
  id: string;
  q: string;
  a: string;
}

export const mcpFaqItems: McpFaqItem[] = [
  {
    id: "what-is-it",
    q: "What is Whats91 MCP?",
    a: "Whats91 MCP is our secure implementation of the Model Context Protocol, an open standard that lets AI assistants safely use outside tools and data. Connect a supported assistant, sign in with Whats91, and approve exactly what it may access — then it can ask for approved information from your own account and get a real answer back.",
  },
  {
    id: "which-clients",
    q: "Which AI assistants can I use?",
    a: "ChatGPT, Claude Code and Claude Web, xAI Grok, and Gemini (via Gemini Enterprise) are all supported and available now.",
  },
  {
    id: "database-access",
    q: "Does the AI get direct access to my database?",
    a: "No. It uses a fixed set of approved, validated tools — never your database or raw APIs.",
  },
  {
    id: "data-isolation",
    q: "Is my data isolated to my account?",
    a: "Yes. Every request is bound to your Whats91 account; it can't reach anyone else's data.",
  },
  {
    id: "what-today",
    q: "What can it do?",
    a: "Answer questions about your WhatsApp message performance and connection health, look up contacts, contact books, templates, campaigns, media, and forms, and — with your confirmation — draft campaigns, submit templates, and manage your catalog.",
  },
  {
    id: "accounting",
    q: "Can it read sales or accounting reports?",
    a: "No. Whats91 MCP covers WhatsApp Business Platform data, not accounting, orders, or finance.",
  },
  {
    id: "write-actions",
    q: "Can it send campaigns or submit templates?",
    a: "Yes. Approved write actions like drafting campaigns and submitting templates are available, and always require an explicit, one-time confirmation before anything goes out.",
  },
  {
    id: "gemini-support",
    q: "How does Gemini support work?",
    a: "Gemini connects through the Gemini Enterprise Custom MCP Server.",
  },
  {
    id: "not-groq",
    q: "Is it \"Groq\"?",
    a: "No — it's xAI Grok. Groq is an unrelated company.",
  },
  {
    id: "plan-included",
    q: "Is MCP included in my plan?",
    a: "It may need to be enabled for your account, and message reporting requires the reporting capability in your subscription.",
  },
  {
    id: "revoke",
    q: "Can I revoke access?",
    a: "Yes, anytime — disconnect and access ends immediately.",
  },
  {
    id: "legacy-mcp",
    q: "Is this the same as \"MCP Tools (Beta)\" in my dashboard?",
    a: "No. \"MCP Tools (Beta)\" is a separate, older dashboard feature. Whats91 MCP is the AI connection platform described on this page.",
  },
];

/* ------------------------------------------------------------------ */
/* Access — CTAs                                                       */
/* ------------------------------------------------------------------ */

// No verified, MCP-specific developer-docs route exists in this repository
// yet (see blueprint OD-5): the general API docs at developers.whats91.com
// cover the REST/webhook platform, not the MCP gateway. Point the
// "architecture" CTA at the in-page technical section instead of inventing
// a docs URL.
export const mcpAccess = {
  primaryLabel: "Connect Whats91 MCP",
  primaryHref: "/contact?subject=" + encodeURIComponent("Whats91 MCP Access"),
  secondaryLabel: "See how it works",
  secondaryHref: "#how-it-works",
  docsLabel: "See the architecture",
  docsHref: "#architecture",
} as const;
