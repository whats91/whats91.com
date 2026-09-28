import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Flow Builder: Visual Chatbot Automation Platform | Whats91",
  description: "Build sophisticated WhatsApp automation workflows with our visual Flow Builder. Drag-and-drop nodes, AI integration, Bring Your Own API (BYOA) model. Save 40-60% on AI costs with enterprise-grade automation.",
  keywords: [
    "WhatsApp Flow Builder",
    "WhatsApp chatbot builder",
    "WhatsApp automation India",
    "no-code WhatsApp automation",
    "WhatsApp Business API chatbot",
    "visual flow builder",
    "nodemation",
    "RAG chatbot WhatsApp",
    "Bring Your Own API",
    "BYOA WhatsApp",
    "OpenAI WhatsApp integration",
    "enterprise WhatsApp automation",
  ],
  openGraph: {
    title: "WhatsApp Flow Builder: Visual Chatbot Automation | Whats91",
    description: "Build sophisticated WhatsApp automation workflows with drag-and-drop nodes, AI integration, and BYOA model. Save 40-60% on AI costs.",
    url: "https://whats91.com/flow-builder",
    siteName: "Whats91",
    type: "website",
    images: [
      {
        url: "https://whats91.com/og-flow-builder.png",
        width: 1200,
        height: 630,
        alt: "Whats91 Flow Builder - Visual WhatsApp Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Flow Builder: Visual Chatbot Automation | Whats91",
    description: "Build sophisticated WhatsApp automation workflows with drag-and-drop nodes, AI integration, and BYOA model.",
    images: ["https://whats91.com/og-flow-builder.png"],
  },
  alternates: {
    canonical: "https://whats91.com/flow-builder",
  },
};

export default function FlowBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
