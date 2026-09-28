"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { categories, faqData } from "./faqData";

export function FAQBrowser() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqData[activeCategory as keyof typeof faqData];

    const query = searchQuery.toLowerCase();
    return Object.values(faqData).flat().filter(
      faq => faq.question.toLowerCase().includes(query) ||
              faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, activeCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenFaq(null);
    setSearchQuery("");
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 pr-4 text-base rounded-xl border-border/60 bg-card shadow-sm focus:border-brand-primary focus:ring-brand-primary/20"
        />
      </div>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">

            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 hidden lg:block">
                  Categories
                </h3>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                        : "bg-card border border-border/60 text-text-secondary hover:border-brand-primary/30 hover:text-text-primary"
                    } ${searchQuery ? "opacity-50 pointer-events-none" : ""}`}
                    disabled={!!searchQuery}
                  >
                    <category.icon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              {/* Category Header */}
              {!searchQuery && (
                <div className="flex items-center gap-3 mb-6">
                  {(() => {
                    const cat = categories.find(c => c.id === activeCategory);
                    if (!cat) return null;
                    const Icon = cat.icon;
                    return (
                      <>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-text-primary">{cat.label}</h2>
                          <p className="text-sm text-text-muted">
                            {faqData[activeCategory as keyof typeof faqData].length} questions
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Search Results Header */}
              {searchQuery && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Search Results
                  </h2>
                  <p className="text-sm text-text-muted">
                    Found {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-200 hover:border-border"
                  >
                    <button
                      className="w-full flex items-start justify-between gap-4 p-5 text-left"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="text-sm sm:text-base font-medium text-text-primary pr-4">
                        {faq.question}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-text-muted shrink-0 mt-0.5" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No results found
                  </h3>
                  <p className="text-sm text-text-muted mb-6">
                    Try different keywords or browse by category
                  </p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
