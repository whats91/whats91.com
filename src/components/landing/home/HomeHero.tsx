import { FileText, Workflow, IndianRupee, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow, CTAGroup, SecondaryCTA, TrustPill } from "@/components/shared";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";
import { illustrationScope, offeringScope } from "@/lib/home-content";

function WorkflowPreview() {
  return (
    <figure className="mx-auto w-full max-w-[400px]">
      <div className="surface-card overflow-hidden rounded-3xl shadow-xl" aria-hidden="true">
        <div className="bg-brand-600 px-5 py-4 text-white"><p className="font-semibold">Example: a ledger request</p><p className="text-xs mt-1 text-white/90">Customer → workflow → accounts team</p></div>
        <div className="p-5 space-y-4 bg-surface/60">
          <p className="rounded-2xl rounded-bl-md bg-card border border-border/60 p-3 text-sm text-text-primary">Can I get my account statement?</p>
          <div className="flex gap-3 items-start"><Workflow className="h-5 w-5 text-brand-primary shrink-0 mt-1" /><p className="text-body-sm">Check the requester, authorised account and available ERP data.</p></div>
          <div className="rounded-2xl rounded-br-md bg-brand-600 p-4 text-white"><p className="text-sm">If the checks succeed, prepare the statement.</p><p className="mt-3 flex gap-2 items-center text-xs"><FileText className="h-4 w-4 shrink-0" /> Sample statement PDF</p></div>
          <p className="text-body-sm">If data is missing or access is unclear, route the request to the accounts team.</p>
        </div>
      </div>
      <figcaption className="mt-4 text-caption text-center">{illustrationScope}</figcaption>
    </figure>
  );
}
export function HomeHero() {
  return (
    <Section id="home" tone="brand-soft" pad="lg" className="overflow-hidden">
      <Container>
        <div className="grid gap-10 lg:gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 lg:max-w-none min-w-0">
            <Eyebrow icon={Workflow}>For Indian businesses using WhatsApp</Eyebrow>
            <h1 className="heading-display">Connect customer messages <span className="text-gradient">to your business workflows</span></h1>
            <p className="text-lead measure-prose">Explore campaigns, ERP documents and customer request flows with Whats91. Start with one task: sending an invoice, answering a ledger request or routing a conversation to your team.</p>
            <p className="text-body-sm">{offeringScope}</p>
            <CTAGroup align="responsive-hero">
              <BookDemoPopup triggerLabel="Request a demo" triggerSize="lg" source="homepage-hero" triggerClassName="min-h-11 h-auto py-3 px-6 text-sm sm:text-base rounded-xl w-full sm:w-auto whitespace-normal" />
              <SecondaryCTA href="/features" className="h-auto min-h-11 py-3 whitespace-normal">Explore workflow features</SecondaryCTA>
            </CTAGroup>
            <p className="text-caption">A request sends an enquiry; it does not schedule an appointment or activate an account.</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              <TrustPill icon={IndianRupee}>Separate message and platform terms</TrustPill>
              <TrustPill icon={ShieldCheck}>Plan recipient permissions</TrustPill>
            </div>
          </div>
          <div className="lg:col-span-6 min-w-0"><WorkflowPreview /></div>
        </div>
      </Container>
    </Section>
  );
}
