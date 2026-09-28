import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBadge } from "./IconBadge";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  /** Makes the whole card a link */
  href?: string;
  /** Link label shown when href is set */
  linkLabel?: string;
  /** Brand-tinted border/background — at most one per grid, e.g. "most popular" */
  featured?: boolean;
  /** Corner badge, e.g. <Badge>Most Popular</Badge>. Only meaningful with featured */
  badge?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standard feature card: icon tile, title, description, optional link.
 * Use inside a `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` wrapper.
 * At most one card in a grid should be `featured`.
 */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  linkLabel = "Learn more",
  featured = false,
  badge,
  className,
  children,
}: FeatureCardProps) {
  const body = (
    <>
      {badge && <div className="absolute -top-2.5 right-5">{badge}</div>}
      {icon && <IconBadge icon={icon} size="lg" className="mb-4" />}
      <h3 className="heading-4 mb-2">{title}</h3>
      <p className="text-body-sm">{description}</p>
      {children}
      {href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary">
          {linkLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );

  const cardClass = cn(
    "relative surface-card surface-card-hover p-5 sm:p-6 h-full flex flex-col items-start",
    featured && "border-brand-primary/25 bg-brand-primary/[0.03]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClass, "group")}>
        {body}
      </Link>
    );
  }

  return <div className={cardClass}>{body}</div>;
}
