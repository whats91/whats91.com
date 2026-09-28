import { cn } from "@/lib/utils";

const toneClasses = {
  /** Plain page background (white in light theme) */
  default: "bg-background",
  /** Soft mist band — use to alternate with default sections */
  surface: "bg-surface/50",
  /** Very light brand-tinted gradient — hero and emphasis bands */
  "brand-soft": "gradient-brand-subtle",
  /** Dark ink band — developer/API sections only */
  ink: "bg-ink text-ink-text",
} as const;

const padClasses = {
  none: "",
  sm: "section-pad-sm",
  default: "section-pad",
  lg: "section-pad-lg",
} as const;

export type SectionTone = keyof typeof toneClasses;
export type SectionPad = keyof typeof padClasses;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  pad?: SectionPad;
  /** Adds top+bottom hairline borders, used with tone="surface" info bands */
  bordered?: boolean;
}

/**
 * Standard vertical page section with fluid rhythm and background tone.
 * Alternate `default` and `surface` tones down the page; use `brand-soft`
 * for heroes and `ink` for developer content only.
 */
export function Section({
  tone = "default",
  pad = "default",
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        toneClasses[tone],
        padClasses[pad],
        bordered && "border-y border-border/40",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
