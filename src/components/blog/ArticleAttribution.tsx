import Link from "next/link";
import { AvatarImage } from "./AvatarImage";
import { attributionLabel, getAuthorLink } from "@/lib/blog/author-links";
export function ArticleAttribution({ authorId }: { authorId: string }) {
  const author = getAuthorLink(authorId);
  return <aside aria-label="Article attribution" className="rounded-2xl border border-border/60 bg-surface/50 p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <AvatarImage name={author?.initials || ""} alt="" size="lg" />
      <div className="min-w-0 flex-1 break-words">
        <h2 className="text-lg font-semibold text-text-primary mb-2">{attributionLabel}</h2>
        <p className="text-sm text-text-secondary">An approved author byline is not available for this article.</p>
        {author && <Link href={`/authors/${author.slug}`} className="inline-flex min-h-11 items-center text-sm text-brand-primary underline">View author information</Link>}
      </div>
    </div>
  </aside>;
}
