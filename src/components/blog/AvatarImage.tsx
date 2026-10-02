/** Local text fallback works in initial HTML, with blocked images and without JavaScript.
 * src/alt remain accepted for compatibility; no unapproved portrait or external URL is loaded.
 */
interface AvatarImageProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
}
export function AvatarImage({ name, size = "md" }: AvatarImageProps) {
  const initials = Array.from(name.trim()).length <= 3 ? name.trim().toLocaleUpperCase("en-IN") || "?" : name.trim().split(/\s+/u).filter(Boolean).slice(0, 3).map(part => Array.from(part)[0]).join("").toLocaleUpperCase("en-IN") || "?";
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-sm", lg: "w-16 h-16 text-lg" };
  return <span aria-hidden="true" data-avatar-fallback="local-initials" className={`${sizes[size]} shrink-0 rounded-full bg-brand-primary/10 text-brand-primary inline-flex items-center justify-center font-semibold`}>{initials}</span>;
}
