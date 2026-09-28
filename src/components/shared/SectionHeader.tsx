import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeaderProps {
  /** Optional pill label above the title */
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** Heading level — defaults to h2 for in-page sections */
  as?: "h1" | "h2" | "h3";
  /** id applied to the heading, for aria-labelledby on the parent section */
  id?: string;
  className?: string;
}

/**
 * Standard section header: eyebrow pill, fluid heading, optional description.
 * Use once at the top of every content section instead of ad-hoc markup.
 */
export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  id,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-12",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={Heading === "h1" ? "heading-1" : "heading-2"}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("text-lead max-w-2xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
