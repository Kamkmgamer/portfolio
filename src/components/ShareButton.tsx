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
        // eslint-disable-next-line no-alert
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
        "inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-foreground hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      }
      onClick={onClick}
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
