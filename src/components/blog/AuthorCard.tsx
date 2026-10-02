import Link from "next/link";
import { AvatarImage } from "./AvatarImage";
interface AuthorCardProps { author: { id: string; slug: string; initials: string }; articleCount: number }
export function AuthorCard({ author, articleCount }: AuthorCardProps) {
  return <Link href={`/authors/${author.slug}`} className="block h-full rounded-2xl border border-border/60 bg-white p-6 hover:border-brand-primary/30">
    <article className="min-w-0 space-y-3 break-words">
      <AvatarImage name={author.initials} alt="" size="lg" />
      <h2 className="text-lg font-semibold text-text-primary">Author information {author.id}</h2>
      <p className="text-sm text-text-secondary">Profile details are not available while attribution is being reviewed.</p>
      <p className="text-sm text-brand-primary">{articleCount} {articleCount === 1 ? "linked article" : "linked articles"}</p>
    </article>
  </Link>;
}
