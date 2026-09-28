"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, BookOpen, User } from "lucide-react";
import { BlogPostMeta } from "@/lib/blog/registry";
import { getAuthorById } from "@/lib/blog/authors";

interface BlogCardProps {
  post: BlogPostMeta;
  showAuthor?: boolean;
  variant?: "default" | "compact";
}

export function BlogCard({ post, showAuthor = true, variant = "default" }: BlogCardProps) {
  const author = getAuthorById(post.authorId);
  
  const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
    "WhatsApp API": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
    "ERP Integration": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    "Business Automation": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    "Industry Insights": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    "Product Updates": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
    "Tutorials": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
    "Case Studies": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  };

  const style = categoryStyles[post.category] || { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group relative h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full rounded-2xl border border-border/60 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-primary/30 hover:-translate-y-1">
          
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge - Floating */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${style.bg} ${style.text} border ${style.border} backdrop-blur-sm`}>
              {post.category}
            </span>
          </div>

          {/* Hero Image Placeholder with Icon */}
          <div className="relative h-36 sm:h-40 bg-gradient-to-br from-surface via-surface/50 to-brand-primary/5 flex items-center justify-center overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            
            {/* Reading Icon */}
            <div className="relative h-14 w-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/30 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
              <BookOpen className="h-6 w-6 text-brand-primary" />
            </div>
            
            {/* Reading Time Badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-border/30 text-[10px] text-text-muted">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Title */}
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors duration-200 leading-snug">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] text-text-muted bg-surface px-2 py-0.5 rounded"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-[10px] text-text-muted px-2 py-0.5">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>

            {/* Footer: Author & Date & Read More */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div className="flex items-center gap-2">
                {showAuthor && author && (
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs text-text-muted hover:text-brand-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <User className="h-3 w-3" />
                    {author.name}
                  </Link>
                )}
                {!showAuthor && (
                  <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-text-muted">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-brand-primary group-hover:gap-2 transition-all duration-200">
                Read
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
