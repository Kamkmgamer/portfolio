"use client";

import { Check, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  title: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

/** Native share sheet when available, otherwise copies the URL with inline feedback. */
export default function ShareButton({ title, label, copiedLabel, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // User dismissed the share sheet or clipboard is unavailable — nothing to do.
    }
  };

  return (
    <button type="button" onClick={onClick} className={cn("btn btn-secondary", className)}>
      {copied ? <Check aria-hidden="true" className="text-success" /> : <Share2 aria-hidden="true" strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
