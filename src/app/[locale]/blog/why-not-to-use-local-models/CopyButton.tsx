"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code, locale }: { code: string; locale: string }) {
    const [copied, setCopied] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setToastVisible(true);
        setTimeout(() => {
            setCopied(false);
            setToastVisible(false);
        }, 2000);
    };

    const copiedLabel = locale === "ar" ? "تم النسخ!" : "Copied!";

    return (
        <span className="relative inline-flex items-center gap-1.5 mx-1 align-middle">
            {/* The code pill */}
            <button
                onClick={handleCopy}
                aria-label="Copy command"
                title="Click to copy"
                className={`
          inline-flex items-center gap-2
          px-2.5 py-0.5
          rounded-md
          font-mono text-sm
          border
          transition-all duration-200 cursor-pointer select-all
          bg-neutral-100 border-neutral-300 text-neutral-800
          hover:bg-neutral-200 hover:border-neutral-400
          dark:bg-white/8 dark:border-white/15 dark:text-[hsl(var(--accent-gold))]
          dark:hover:bg-white/12 dark:hover:border-white/25
        `}
            >
                <span className="whitespace-nowrap">{code}</span>
                <span
                    className={`
            flex-shrink-0 transition-colors duration-200
            text-neutral-400 hover:text-neutral-600
            dark:text-text/40 dark:hover:text-[hsl(var(--accent-gold))]
          `}
                >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </span>
            </button>

            {/* Toast */}
            <span
                aria-live="polite"
                className={`
          pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
          px-2.5 py-1 rounded-lg text-xs font-sans font-medium whitespace-nowrap
          shadow-lg
          bg-neutral-900 text-white
          dark:bg-white dark:text-neutral-900
          transition-all duration-200
          ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
            >
                {copiedLabel}
                {/* arrow */}
                <span
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                    style={{
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid",
                        borderTopColor: "inherit",
                    }}
                />
            </span>
        </span>
    );
}
