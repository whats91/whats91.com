import { metaPricingDescription } from "@/lib/meta-pricing";
/** Published tool inventory and privacy scope, shared with machine-readable representations. */
export const localToolPrivacy = "Tool calculations run in this page’s browser state. Page requests and URL query links can reach the website. Copying uses the clipboard; opening or sharing a destination transfers its content. Avoid sensitive input. See the privacy policy for page requests and site preferences.";
export const localTools = [
  { title: "WhatsApp API Cost Calculator", href: "/tools/whatsapp-api-cost-calculator", description: metaPricingDescription },
  { title: "Lead Qualification ROI Calculator", href: "/tools/lead-qualification-roi-calculator", description: "Compare user-entered costs and qualification rates in one currency. Zero qualification means zero leads; ratios with zero denominators are unavailable. Results are scenarios, not prices or promised savings." },
  { title: "WhatsApp Link Generator", href: "/tools/whatsapp-link-generator", description: "Create wa.me links using an international number and an optional encoded message. Edits clear old links. This does not verify WhatsApp availability or send a message." },
  { title: "QR Code Generator", href: "/tools/qr-code-generator", description: "Generate local PNG QR codes for text, HTTP(S) URLs, WhatsApp, email, phone and Wi-Fi. Required fields, colors and image size are validated; edits clear the old preview. Test your PNG with the intended scanner." },
] as const;
export const localToolsMarkdown = `## Available local tools\n\n${localTools.map(tool => `### [${tool.title}](${tool.href})\n${tool.description}`).join("\n\n")}\n\n## Privacy and browser requirements\n\n${localToolPrivacy}\n\nGeneration, calculation, copying and downloading require JavaScript and relevant browser capabilities. If controls do not respond, reload with local scripts enabled. No private wallet, message send or payment is connected. [Privacy policy](/privacy).`;
