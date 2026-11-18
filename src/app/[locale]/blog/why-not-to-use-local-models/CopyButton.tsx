"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Inline, copyable command pill with a small confirmation toast. */
export function CopyButton({ code, locale }: { code: string; locale: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isAr = locale === "ar";
  const labels = {
    copy: isAr ? "نسخ الأمر" : "Copy command",
    copied: isAr ? "تم النسخ!" : "Copied!",
    failed: isAr ? "تعذّر النسخ" : "Couldn't copy",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState("idle"), 2000);
  };

  const visible = state !== "idle";

  return (
    <span className="relative mx-1 inline-flex max-w-full items-center align-middle">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${labels.copy}: ${code}`}
        title={labels.copy}
        dir="ltr"
        className="inline-flex min-w-0 max-w-full cursor-pointer items-center gap-2 rounded-md border border-line bg-paper-2 px-2 py-0.5 text-start font-mono text-[0.85em] text-ink transition-colors hover:border-line-strong"
      >
        <span className="min-w-0 [overflow-wrap:anywhere]">{code}</span>
        {state === "copied" ? (
          <Check aria-hidden="true" strokeWidth={2} className="size-3 shrink-0 text-success" />
        ) : (
          <Copy aria-hidden="true" strokeWidth={1.75} className="size-3 shrink-0 text-muted" />
        )}
      </button>

      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 font-sans text-xs font-medium text-paper shadow-[var(--shadow-float)] transition-[opacity,transform] duration-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {state === "copied" ? labels.copied : state === "failed" ? labels.failed : ""}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink"
        />
      </span>
    </span>
  );
}
