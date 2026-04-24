"use client";

import { useState, useEffect } from "react";

interface ResponsiveEmbedProps {
  iframeUrl: string;
  imageUrl: string;
}

export function ResponsiveEmbed({ iframeUrl, imageUrl }: ResponsiveEmbedProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce the resize event to avoid constant reloading while dragging
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setKey((prev) => prev + 1);
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="my-10">
      {/* Desktop: Iframe (Shows on screens >= 1024px) */}
      <div className="hidden lg:block rounded-xl overflow-hidden border border-white/10 bg-white/5 relative h-[600px] w-full">
        <iframe
          key={key}
          src={iframeUrl}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
        />
      </div>

      {/* Mobile/Small Screen: Image (Shows on screens < 1024px) */}
      <div className="lg:hidden rounded-xl overflow-hidden border border-white/10 bg-white/5 relative">
        <img
          src={imageUrl}
          alt="Embedded Content"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
