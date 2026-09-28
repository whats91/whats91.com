import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot Flow Library | BotMaster JSON Templates | Whats91",
  description: "Pre-built chatbot flow templates with BotMaster JSON schema. Copy-ready flows for WhatsApp automation - welcome, sales, support, e-commerce, payments, and bookings. Import directly into Flow Builder.",
  keywords: [
    "chatbot flow templates",
    "WhatsApp flow builder",
    "BotMaster JSON",
    "chatbot JSON templates",
    "WhatsApp automation flows",
    "flow builder library",
    "chatbot templates",
    "WhatsApp bot flows",
    "import chatbot flows",
    "flow JSON schema",
    "WhatsApp Business API flows",
    "chatbot automation templates",
    "visual flow builder",
    "nodemation flows",
    "WhatsApp conversation flows",
  ],
  openGraph: {
    title: "Chatbot Flow Library | BotMaster JSON Templates | Whats91",
    description: "Pre-built chatbot flow templates with BotMaster JSON schema. Copy-ready flows for WhatsApp automation - welcome, sales, support, e-commerce, payments, and bookings.",
    url: "https://whats91.com/chatbot-flows",
    siteName: "Whats91",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatbot Flow Library | BotMaster JSON Templates | Whats91",
    description: "Pre-built chatbot flow templates with BotMaster JSON schema. Copy-ready flows for WhatsApp automation.",
  },
  alternates: {
    canonical: "/chatbot-flows",
  },
};

export default function ChatbotFlowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
