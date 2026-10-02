import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/shared";
import { pilotMeasures } from "@/lib/home-content";

export function ResultsBand() {
  return (
    <Section tone="surface" aria-labelledby="results-heading">
      <Container>
        <SectionHeader eyebrow="Evaluate a pilot" id="results-heading" title="Measure your workflow before expanding it" description="Agree on the audience, baseline, measurement period and exceptions. Customer scale, campaign benchmarks and ROI figures are not established here." />
        <div className="grid gap-5 md:grid-cols-3">
          {pilotMeasures.map(item => (
            <article key={item.title} className="surface-card p-5 sm:p-6 min-w-0">
              <h3 className="heading-4 mb-4">{item.title}</h3>
              <p className="text-sm font-semibold text-text-primary mb-1">Before the pilot</p>
              <p className="text-body-sm mb-4">{item.before}</p>
              <p className="text-sm font-semibold text-text-primary mb-1">What to compare</p>
              <p className="text-body-sm">{item.compare}</p>
            </article>
          ))}
        </div>
        <p className="text-body-sm mt-6 text-center">Outcomes depend on your data, audience, configuration and other business activity. <Link href="/contact" className="link-inline">Discuss a pilot scope</Link>.</p>
      </Container>
    </Section>
  );
}
