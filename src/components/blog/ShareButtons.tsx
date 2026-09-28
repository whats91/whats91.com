"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = title;

  const handleShare = async (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === "copy") {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("twitter")}
        className="gap-2"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("linkedin")}
        className="gap-2"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("copy")}
        className="gap-2"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
