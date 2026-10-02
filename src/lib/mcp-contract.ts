/** Website contract only. Historical owner report is not a current account grant.
 * July 20 evidence is retained in mcpContent and the owner input sheet.
 */
export const mcpTitle = "Whats91 MCP: Access and Availability";
export const mcpDescription = "Explore Whats91 MCP for AI assistants. Confirm current tools, provider support and account eligibility with our team before connecting or choosing a plan.";
export const mcpQualification = "MCP availability was reported on 20 July 2026. Confirm current tools, assistant support, plan eligibility and account permissions with our team before connecting.";
export const mcpAccessNote = "This is an access enquiry. It does not connect an assistant, grant permissions or enable a subscription.";
export const mcpPlanQualification = "MCP access subject to account, provider and plan confirmation";
export const mcpResourceNote = "/api/mcp is a public website content catalogue with GET, HEAD and OPTIONS support. It does not execute MCP tools, provide account data or authorise a connection.";
export const mcpHistoricalGateway = "https://mcp.whats91.com/mcp";
export const mcpGatewayNote = "The source-reported product gateway is separate from this website. Its current operation, authentication metadata and account access have not been verified in this website review. Ask our team for the approved connection instructions.";
export interface McpFaqItem { id: string; q: string; a: string; }
export const mcpFaqItems: McpFaqItem[] = [
  { id: "what-is-it", q: "What is Whats91 MCP?", a: "MCP is an open protocol for AI assistants to use external tools and data. Whats91's product MCP platform was reported available on 20 July 2026. Current tools, provider support and account eligibility need confirmation before you connect. This website provides information and an access enquiry." },
  { id: "which-clients", q: "Which AI assistants can I use?", a: "ChatGPT, Claude Code and Claude Web, xAI Grok through its Remote MCP API, and Gemini Enterprise were named in the July 20 source report. Confirm the supported client, provider tier, setup path and current account availability with our team; a listed provider is not a verified connection for your account." },
  { id: "database-access", q: "Does the AI get direct access to my database?", a: "The documented architecture uses approved tools rather than direct database access. Ask for the current approved tool list and data permissions before connecting; the website content catalogue does not access your database or account." },
  { id: "data-isolation", q: "Is my data isolated to my account?", a: "The documented product design binds requests to an authorised account. Current enforcement and your account permissions require verification in the product service. This website review does not certify tenant isolation or security controls." },
  { id: "what-today", q: "What can it do?", a: "The source report lists message performance, connection health, contacts, templates, campaigns, media, forms, chatbots, catalog and approved actions. These are areas to discuss with our team, not a current executable tool list. Confirm each tool, its data limits and your entitlement before use." },
  { id: "accounting", q: "Can it read sales or accounting reports?", a: "Accounting, orders, payments and finance are outside the documented scope of the MCP experience on this page. Do not assume ERP integrations or accounting access are enabled through MCP." },
  { id: "write-actions", q: "Can it send campaigns or submit templates?", a: "Write actions were source-reported, but this website does not verify that they are enabled for your account. Confirm the specific action, permissions and approval process with our team. Example prompts and access enquiries do not send campaigns or submit templates." },
  { id: "gemini-support", q: "How does Gemini support work?", a: "The source report names the Gemini Enterprise Custom MCP Server path. Confirm current Enterprise eligibility, registration and imported actions before connecting; ordinary Gemini access is not assumed." },
  { id: "not-groq", q: 'Is it "Groq"?', a: "No — the provider named here is xAI Grok. Groq is an unrelated company." },
  { id: "plan-included", q: "Is MCP included in my plan?", a: "MCP is source-listed with WhatsApp Standard, subject to current account, provider and plan confirmation. Ask which tools and reporting entitlements are included, whether activation is required, and what terms apply before subscribing. This enquiry does not activate access." },
  { id: "revoke", q: "Can I revoke access?", a: "Revocation is part of the documented product design. Confirm the current disconnect process and when new requests stop. Disconnecting does not necessarily erase records already retained; see the Privacy Policy for the distinction." },
  { id: "legacy-mcp", q: 'Is this the same as "MCP Tools (Beta)" in my dashboard?', a: 'No. The source describes "MCP Tools (Beta)" as a separate older dashboard feature. The product MCP gateway is also separate from /api/mcp, the public website content catalogue. Confirm which service your setup instructions refer to.' },
];
export const mcpMarkdown = [
  "## Availability", mcpQualification, mcpAccessNote,
  "## Product gateway and website content", mcpGatewayNote, mcpResourceNote,
  "## Scope", "The reported areas include message performance, connection health, contacts, templates, campaigns, media, forms, chatbots, catalog and approved actions. Confirm each tool and entitlement. Accounting, orders, payments and finance are outside this page's documented MCP scope.",
  "## Illustrative architecture", "AI client → authorised product connection → gateway → permission check → approved tool → account-scoped result. This describes the documented design, not a verified current connection. Confirm current security controls, approvals, revocation and retention before use.",
  "## Access enquiry", "[Request Whats91 MCP access](/contact?subject=Whats91%20MCP%20Access)",
  ...mcpFaqItems.flatMap(f => ["### " + f.q, f.a]),
].join("\n\n");
