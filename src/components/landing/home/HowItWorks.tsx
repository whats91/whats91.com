import { Cable, PlugZap, Rocket } from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  IconBadge,
  Reveal,
} from "@/components/shared";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";

const steps = [
  {
    icon: Cable,
    title: "Connect your number",
    description:
      "We onboard your business onto the official WhatsApp Cloud API — verification, green-tick guidance, and template approvals handled with you.",
  },
  {
    icon: PlugZap,
    title: "Plug in your systems",
    description:
      "Connect Busy, Miracle, or Google Sheets in minutes — or wire your own CRM through webhooks and the Graph API.",
  },
  {
    icon: Rocket,
    title: "Launch and automate",
    description:
      "Send your first broadcast, switch on payment reminders, and let chatbot flows handle the routine conversations.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="default" aria-labelledby="how-heading">
      <Container>
        <SectionHeader
          eyebrow="Getting Started"
          id="how-heading"
          title="Live on WhatsApp in three steps"
          description="No infrastructure to host, no PC that has to stay switched on — everything runs on Meta's cloud."
        />

        <ol className="grid gap-10 md:gap-6 md:grid-cols-3 mb-12">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i as 0 | 1 | 2}>
                <div className="flex md:flex-col items-start gap-4 md:gap-0">
                  {/* Number + connector */}
                  <div className="flex md:w-full items-center shrink-0">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold shadow-md shadow-brand-primary/25 shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="hidden md:block flex-1 h-px border-t-2 border-dashed border-brand-200 mx-3"
                      />
                    )}
                  </div>
                  <div className="md:mt-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <IconBadge icon={step.icon} size="sm" />
                      <h3 className="heading-4">{step.title}</h3>
                    </div>
                    <p className="text-body-sm max-w-sm">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="text-center">
          <BookDemoPopup
            triggerLabel="Walk through it with our team"
            triggerSize="lg"
            source="homepage-how-it-works"
            triggerClassName="h-11 sm:h-12 px-7 rounded-xl"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
