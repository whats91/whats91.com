import "./home-scenes.css";
import "./connector-scenes.css";
import { generatePageMetadata } from "@/lib/seo/config";
import { homeTitle, homeDescription, homeFaqs } from "@/lib/home-content";
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

export const metadata = generatePageMetadata({ title: homeTitle, description: homeDescription, path: "/" });

function HomepageAIJsonLD() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://whats91.com/#homepage",
      url: "https://whats91.com",
      name: "Whats91 - WhatsApp Cloud API Platform for India",
      description:
        homeDescription,
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
