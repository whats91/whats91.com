"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Tag, 
  X, 
  Sparkles,
  Zap,
  Code2,
  Database,
  Bot,
  TrendingUp,
  Clock
} from "lucide-react";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog/registry";
import { BlogCard } from "@/components/blog/BlogCard";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

// Useful reader actions; no unsupported catalogue-size or freshness claims.
const techStats = [
  { icon: Code2, value: "Browse", label: "API guides" },
  { icon: Bot, value: "Explore", label: "Automation examples" },
  { icon: Database, value: "Read", label: "Integration guides" },
  { icon: TrendingUp, value: "Review", label: "Account conditions" },
];

export default function BlogBrowser() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower);

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [allPosts, searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        
        <p className="container-page py-4 text-caption">Search and filters need JavaScript. Without scripts, the initial article list and links remain available.</p>
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5" />
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto py-12 sm:py-16">
            
            {/* Header with Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Technical Knowledge Base
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-4">
                Insights <span className="text-gradient">&</span> Resources
              </h1>
              
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Deep dives into WhatsApp Cloud API, ERP integrations, and enterprise automation patterns.
              </p>
            </div>

            {/* Tech Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {techStats.map((stat, index) => (
                <div 
                  key={index}
                  className="group relative rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm p-4 text-center hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <stat.icon className="h-5 w-5 text-brand-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl sm:text-2xl font-bold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Bar - Modern Style */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center bg-white rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                  <Search className="h-5 w-5 text-text-muted ml-4" />
                  <label htmlFor="blog-search" className="sr-only">Search articles</label>
                  <input
                    id="blog-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics, or keywords..."
                    className="min-w-0 flex-1 h-12 px-4 bg-transparent text-sm focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      aria-label="Clear article search"
                      onClick={() => setSearchQuery("")}
                      className="h-8 w-8 mr-2 rounded-lg bg-surface flex items-center justify-center hover:bg-border/50 transition-colors"
                    >
                      <X className="h-4 w-4 text-text-muted" />
                    </button>
                  )}
                  <button type="button" aria-label="Search articles" onClick={() => document.getElementById("blog-search")?.focus()} className="min-h-11 mr-2 px-3 sm:px-5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Filter - Pill Style */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button
                aria-pressed={!selectedCategory}
                onClick={() => setSelectedCategory(null)}
                className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  !selectedCategory 
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-primary/25"
                    : "bg-white border border-border/60 text-text-secondary hover:border-brand-primary/30 hover:text-brand-700 hover:shadow-md"
                }`}
              >
                <span className="relative z-10">All Posts</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category 
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-primary/25"
                      : "bg-white border border-border/60 text-text-secondary hover:border-brand-primary/30 hover:text-brand-700 hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>

            {/* Tags - Minimal Style */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              <span className="flex items-center gap-1.5 text-xs text-text-muted mr-2 py-1">
                <Tag className="h-3 w-3" />
                Quick filters:
              </span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                    selectedTag === tag 
                      ? "bg-brand-primary/15 text-brand-primary border border-brand-primary/30" 
                      : "bg-surface/50 text-text-muted hover:text-text-primary border border-transparent hover:border-border"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Active Filters Status */}
            {hasActiveFilters && (
              <div className="flex items-center justify-center gap-4 mt-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                  <Clock className="h-3.5 w-3.5 text-brand-primary" />
                  <span className="text-xs font-medium text-brand-primary">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border/60 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-border transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 sm:py-10">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            
            {/* Section Header */}
            {!hasActiveFilters && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                  Latest Articles
                  <span className="text-sm font-normal text-text-muted ml-1">
                    {allPosts.length}
                  </span>
                </h2>
              </div>
            )}

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className=""
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 mb-6">
                  <Search className="h-8 w-8 text-brand-primary" />
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-surface border-2 border-white flex items-center justify-center">
                    <X className="h-3 w-3 text-text-muted" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No matching articles
                </h3>
                <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                  We couldn&apos;t find any articles matching your search. Try different keywords or browse all articles.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="newsletter-heading" className="py-10 sm:py-12">
          <div className="container-page">
            <div className="surface-card mx-auto max-w-2xl p-6 sm:p-8">
              <h2 id="newsletter-heading" className="heading-3 mb-3">Newsletter unavailable</h2>
              <p className="text-body-sm mb-4">Email subscriptions are not available here. Browse the published guides and examples below; no subscription is created.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/whatsapp-templates" className="min-h-11 rounded-lg border border-border px-4 py-3 text-sm font-medium text-brand-700">Message examples</Link>
                <Link href="/chatbot-flows" className="min-h-11 rounded-lg border border-border px-4 py-3 text-sm font-medium text-brand-700">Flow JSON examples</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
