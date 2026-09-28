import { cn } from "@/lib/utils";

const sizeClasses = {
  /** 1200px — default page container, matches the existing max-w-[1200px] pattern */
  default: "max-w-[var(--container-max)]",
  /** 1280px — full-bleed grids, wide tables */
  wide: "max-w-[var(--container-wide)]",
  /** 896px — forms, focused content */
  narrow: "max-w-[var(--container-narrow)]",
  /** 720px — long-form article prose */
  reading: "max-w-[var(--container-reading)]",
} as const;

export type ContainerSize = keyof typeof sizeClasses;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

/**
 * Standard horizontal page container. Replaces ad-hoc
 * `px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto` compositions.
 */
export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
