"use client";

import { Share2 } from "lucide-react";
import React from "react";

type ShareButtonProps = {
  title: string;
  className?: string;
};

export default function ShareButton({ title, className }: ShareButtonProps) {
  const onClick = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        // Optional: simple UX feedback
        alert("Link copied to clipboard");
      }
    } catch {
      // no-op on user cancel or failure
    }
  };

  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex items-center gap-2 px-5 py-3 rounded-none border border-[hsl(var(--accent-gold))]/20 text-text/70 hover:text-text hover:bg-[hsl(var(--accent-gold))]/5 transition focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-gold))] focus:ring-offset-2 dark:focus:ring-offset-black uppercase tracking-widest text-[0.7rem] font-bold"
      }
      onClick={onClick}
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
