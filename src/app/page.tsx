import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HomeHero } from "@/components/landing/home/HomeHero";
import { ProofBar } from "@/components/landing/home/ProofBar";
import { PlatformPillars } from "@/components/landing/home/PlatformPillars";
import { HowItWorks } from "@/components/landing/home/HowItWorks";
import { DeveloperBand } from "@/components/landing/home/DeveloperBand";
import { IntegrationsBand } from "@/components/landing/home/IntegrationsBand";
import { FreeToolsBand } from "@/components/landing/home/FreeToolsBand";
import { TrustBand } from "@/components/landing/home/TrustBand";
import { ResultsBand } from "@/components/landing/home/ResultsBand";
import { HomeFinalCTA } from "@/components/landing/home/HomeFinalCTA";
import { Container, Section, SectionHeader } from "@/components/shared";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://whats91.com",
  },
};

const homeFaqs = [
  {
    question: "What is Whats91?",
    answer:
      "Whats91 is a WhatsApp Cloud API platform for Indian businesses that need WhatsApp Business messaging, ERP integration, templates, webhooks, chatbot automation, and consent-based customer communication.",
  },
  {
    question: "What is WhatsApp Cloud API?",
    answer:
      "WhatsApp Cloud API is Meta's hosted API for sending and receiving WhatsApp Business Platform messages at scale. It supports templates, webhooks, media, interactive replies, automation, and CRM or ERP integrations.",
  },
  {
    question: "How does Busy Accounting WhatsApp integration work?",
    answer:
      "Whats91 connects Busy Accounting workflows with WhatsApp so businesses can automate invoice delivery, ledger balance replies, payment reminders, dispatch updates, reports, and customer self-service chatbot flows.",
  },
  {
    question: "Does Whats91 support chatbot automation?",
    answer:
      "Yes. Whats91 supports WhatsApp chatbot automation for FAQs, ledger inquiries, lead qualification, payment reminders, order updates, interactive buttons, and escalation to human support teams.",
  },
  {
    question: "Is Whats91 suitable for DPDP and enterprise compliance?",
    answer:
      "Whats91 is built for enterprise messaging workflows with opt-in tracking, webhook security, audit-friendly logs, DPDP-aware data practices, and compliance support for regulated customer communication.",
  },
  {
    question: "How can I estimate WhatsApp API cost in India?",
    answer:
      "Use the Whats91 WhatsApp API cost calculator or the WhatsApp Cloud API pricing India guide to estimate marketing, utility, authentication, service, GST, BSP markup, and hidden infrastructure costs.",
  },
];

function HomepageAIJsonLD() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://whats91.com/#homepage",
      url: "https://whats91.com",
      name: "Whats91 - WhatsApp Cloud API Platform for India",
      description:
        "Enterprise WhatsApp Cloud API platform for Indian businesses, with WhatsApp Business API onboarding, ERP integration, templates, pricing guidance, and automation tools.",
      isPartOf: {
        "@id": "https://whats91.com/#website",
      },
      about: [
        { "@type": "Thing", name: "WhatsApp Cloud API" },
        { "@type": "Thing", name: "WhatsApp Business Platform" },
        { "@type": "Thing", name: "WhatsApp Business API India" },
        { "@type": "Thing", name: "Busy ERP Integration" },
        { "@type": "Thing", name: "WhatsApp Templates" },
      ],
      mentions: [
        { "@type": "SoftwareApplication", name: "Busy Accounting" },
        { "@type": "SoftwareApplication", name: "Google Sheets" },
        { "@type": "Thing", name: "WhatsApp Business Platform" },
      ],
      mainEntity: {
        "@id": "https://whats91.com/#platform",
      },
      hasPart: [
        {
          "@type": "WebPage",
          name: "WhatsApp API Pricing",
          url: "https://whats91.com/pricing",
        },
        {
          "@type": "WebPage",
          name: "WhatsApp API Cost Calculator",
          url: "https://whats91.com/tools/whatsapp-api-cost-calculator",
        },
        {
          "@type": "WebPage",
          name: "WhatsApp Templates",
          url: "https://whats91.com/whatsapp-templates",
        },
        {
          "@type": "WebPage",
          name: "Busy ERP Integration",
          url: "https://whats91.com/solutions/busy-erp",
        },
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["main h1", "main section:first-of-type p", "#solutions h2"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://whats91.com/#homepage-faq",
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

function HomepageFAQ() {
  return (
    <Section tone="surface" pad="sm" id="faq" aria-labelledby="homepage-faq-heading">
      <Container className="max-w-[1000px]">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          id="homepage-faq-heading"
          title="Whats91, WhatsApp Cloud API, and ERP Automation"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* FAQ structured data lives in the JSON-LD FAQPage above; no
              microdata here so the same Q&As are not marked up twice. */}
          {homeFaqs.map((faq) => (
            <article key={faq.question} className="surface-card p-5">
              <h3 className="font-semibold text-text-primary mb-2">
                {faq.question}
              </h3>
              <p className="text-body-sm">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomepageAIJsonLD />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <HomeHero />
        <ProofBar />
        <PlatformPillars />
        <IntegrationsBand />
        <HowItWorks />
        <DeveloperBand />
        <FreeToolsBand />
        <TrustBand />
        <ResultsBand />
        <HomepageFAQ />
        <HomeFinalCTA />
      </main>
      <Footer />
    </div>
  );
}
