"use client";

import Link from "next/link";
import { User, MapPin, FileText } from "lucide-react";
import { Author } from "@/lib/blog/authors";
import { getPostsByAuthor } from "@/lib/blog/registry";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const authorPosts = getPostsByAuthor(author.id);
  const articleCount = authorPosts.length;

  return (
    <Link href={`/authors/${author.slug}`} className="block h-full group">
      <article className="relative h-full rounded-2xl border border-border/60 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-primary/30 hover:-translate-y-1">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hero Section with Avatar */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-br from-brand-primary/10 via-brand-accent/5 to-surface flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          {/* Avatar */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/80 backdrop-blur-sm border-2 border-brand-primary/20 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
            <User className="h-8 w-8 sm:h-10 sm:w-10 text-brand-primary" />
          </div>
          
          {/* Article Count Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-border/30 text-[10px] text-text-muted">
            <FileText className="h-3 w-3" />
            {articleCount} {articleCount === 1 ? 'article' : 'articles'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Name & Role */}
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1 group-hover:text-brand-primary transition-colors duration-200">
            {author.name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-primary font-medium mb-2">
            {author.role}
          </p>
          
          {/* Short Bio */}
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
            {author.shortBio}
          </p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-1.5">
            {author.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center text-[10px] text-text-muted bg-surface px-2 py-0.5 rounded border border-border/40"
              >
                {skill}
              </span>
            ))}
            {author.expertise.length > 3 && (
              <span className="text-[10px] text-text-muted px-2 py-0.5">
                +{author.expertise.length - 3}
              </span>
            )}
          </div>

          {/* Location */}
          {author.location && (
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/40 text-[10px] sm:text-xs text-text-muted">
              <MapPin className="h-3 w-3" />
              {author.location}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
