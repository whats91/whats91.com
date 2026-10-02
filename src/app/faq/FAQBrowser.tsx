"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import { FAQJsonLD } from "@/components/seo/JsonLD";
import { categories, faqData } from "./faqData";

export function FAQBrowser() {
  const id = useId();
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const searching = !!searchQuery.trim();
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqData[activeCategory as keyof typeof faqData];
    const query = searchQuery.trim().toLowerCase();
    return Object.values(faqData).flat().filter(faq =>
      faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, activeCategory]);
  const category = categories.find(item => item.id === activeCategory)!;
  const CategoryIcon = category.icon;

  return (
    <>
      <FAQJsonLD faqs={filteredFaqs} />
      <div className="max-w-xl mx-auto px-4">
        <label htmlFor={`${id}-search`} className="block text-sm font-medium text-text-primary mb-2">Search questions</label>
        <div className="relative">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
          <Input id={`${id}-search`} type="search" placeholder="Search questions..." value={searchQuery}
            aria-controls={`${id}-results`} onChange={event => setSearchQuery(event.target.value)}
            className="h-12 pl-12 pr-4 text-base rounded-xl border-text-muted bg-card shadow-sm" />
        </div>
      </div>
      <section className="py-12 sm:py-16 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1 min-w-0">
              <div role="group" aria-labelledby={`${id}-categories`} className="lg:sticky top-24 space-y-2">
                <h2 id={`${id}-categories`} className="text-sm font-semibold text-text-secondary mb-4">Categories</h2>
                {categories.map(item => (
                  <button key={item.id} type="button" aria-pressed={!searching && activeCategory === item.id}
                    aria-controls={`${id}-results`} disabled={searching}
                    onClick={() => { setActiveCategory(item.id); setSearchQuery(""); }}
                    className={`w-full min-h-11 flex items-center gap-3 px-4 py-3 rounded-xl text-left border transition-colors disabled:bg-surface disabled:text-text-secondary disabled:border-text-muted ${
                      !searching && activeCategory === item.id
                        ? "bg-primary text-primary-foreground border-primary hover:bg-brand-700 hover:text-white"
                        : "bg-card border-text-muted text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}>
                    <item.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium min-w-0 break-words">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div id={`${id}-results`} aria-labelledby={`${id}-heading`} className="lg:col-span-3 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                {!searching && <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-primary"><CategoryIcon aria-hidden="true" className="h-5 w-5" /></div>}
                <div className="min-w-0">
                  <h2 id={`${id}-heading`} className="text-xl font-semibold text-text-primary">{searching ? "Search Results" : category.label}</h2>
                  <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-text-secondary break-words">
                    {filteredFaqs.length} question{filteredFaqs.length !== 1 ? "s" : ""}{searching && <> matching &quot;{searchQuery}&quot;</>}
                  </p>
                </div>
              </div>
              <div key={`${activeCategory}-${searchQuery}`} className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <details name={`${id}-accordion`} key={faq.question} className="group rounded-xl border border-text-muted bg-card">
                    <summary id={`${id}-question-${index}`} aria-controls={`${id}-answer-${index}`} className="list-none [&::-webkit-details-marker]:hidden w-full min-h-11 flex items-start justify-between gap-4 p-5 text-left cursor-pointer rounded-xl">
                      <span className="text-sm sm:text-base font-medium text-text-primary min-w-0 break-words">{faq.question}</span>
                      <ChevronDown aria-hidden="true" className="h-5 w-5 text-text-secondary shrink-0 mt-0.5 group-open:rotate-180" />
                    </summary>
                    <div id={`${id}-answer-${index}`} aria-labelledby={`${id}-question-${index}`} className="px-5 pb-5">
                      <p className="text-sm text-text-secondary leading-relaxed break-words">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
              {filteredFaqs.length === 0 && searching && (
                <div className="text-center py-12">
                  <HelpCircle aria-hidden="true" className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No results found</h3>
                  <p className="text-sm text-text-secondary mb-6">Try different keywords or browse by category</p>
                  <Button type="button" onClick={() => setSearchQuery("")} variant="outline" className="rounded-xl min-h-11">Clear Search</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
