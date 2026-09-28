import { Container, Section, AnimatedNumber } from "@/components/shared";

/**
 * Slim quantified-credibility strip directly under the hero.
 * All four figures are existing site claims (About page). Numbers
 * count up on first view; static final values without JS/motion.
 */
export function ProofBar() {
  return (
    <Section tone="surface" pad="none" bordered aria-label="Platform statistics">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 py-7 sm:py-8">
          <div className="text-center">
            <dt className="sr-only">Enterprise clients</dt>
            <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              <AnimatedNumber value={500} suffix="+" />
            </dd>
            <dd className="text-caption mt-1" aria-hidden="true">Enterprise clients</dd>
          </div>
          <div className="text-center">
            <dt className="sr-only">Messages monthly</dt>
            <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              <AnimatedNumber value={10} suffix="M+" />
            </dd>
            <dd className="text-caption mt-1" aria-hidden="true">Messages monthly</dd>
          </div>
          <div className="text-center">
            <dt className="sr-only">Uptime SLA</dt>
            <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              <AnimatedNumber value={99.9} decimals={1} suffix="%" />
            </dd>
            <dd className="text-caption mt-1" aria-hidden="true">Uptime SLA</dd>
          </div>
          <div className="text-center">
            <dt className="sr-only">Support coverage</dt>
            <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">24×7</dd>
            <dd className="text-caption mt-1" aria-hidden="true">Support coverage</dd>
          </div>
        </dl>
      </Container>
    </Section>
  );
}
