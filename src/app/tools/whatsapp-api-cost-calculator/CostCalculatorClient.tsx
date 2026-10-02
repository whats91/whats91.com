import { MessageBudget } from "@/components/shared/MessageBudget";
import { pricingFAQs } from "@/lib/pricing";

export function CostCalculatorClient() {
  return (
    <div className="min-w-0 bg-background">
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="heading-1 mb-4">WhatsApp API Cost Calculator</h1>
          <p className="text-lead mb-8">Estimate Meta delivery charges for October 2026 onward. Keep your platform offer and taxes separate.</p>
          <MessageBudget />
          <section aria-labelledby="calculator-questions" className="mt-12 space-y-4">
            <h2 id="calculator-questions" className="heading-3">Before you budget</h2>
            {pricingFAQs.map(item => <details key={item.question} className="surface-card p-4"><summary className="cursor-pointer min-h-11 font-semibold">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}
          </section>
        </div>
    </div>
  );
}
