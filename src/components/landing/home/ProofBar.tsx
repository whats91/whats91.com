import Link from "next/link";
import { Container, Section } from "@/components/shared";
import { homeTasks } from "@/lib/home-content";

export function ProofBar() {
  return (
    <Section tone="surface" pad="none" bordered aria-labelledby="workflow-routes-heading">
      <Container>
        <h2 id="workflow-routes-heading" className="heading-4 pt-7 text-center">What do you need to do?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-7 sm:py-8">
          {homeTasks.map(task => (
            <li key={task.href} className="min-w-0">
              <h3 className="font-semibold text-text-primary mb-2">{task.title}</h3>
              <p className="text-body-sm mb-3">{task.detail}</p>
              <Link className="link-inline text-sm" href={task.href}>{task.action}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
