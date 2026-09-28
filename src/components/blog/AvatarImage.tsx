"use client";

interface AvatarImageProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function AvatarImage({ src, alt, name, size = "md" }: AvatarImageProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=25D366&color=fff${size === "lg" ? "&size=128" : ""}`;
  };

  return (
    <img
      src={src || "/images/default-avatar.png"}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full`}
      onError={handleError}
    />
  );
}
