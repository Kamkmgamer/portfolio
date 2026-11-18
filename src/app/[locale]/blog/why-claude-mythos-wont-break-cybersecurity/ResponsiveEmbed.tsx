"use client";

import { useState, useEffect } from "react";

interface ResponsiveEmbedProps {
  iframeUrl: string;
  imageUrl: string;
}

export function ResponsiveEmbed({ iframeUrl, imageUrl }: ResponsiveEmbedProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Debounce so the embed only reloads after resizing settles.
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setKey((prev) => prev + 1), 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <figure className="my-10">
      {/* Desktop: live embed */}
      <div className="media-frame relative hidden h-[600px] w-full lg:block">
        <iframe
          key={key}
          src={iframeUrl}
          title="Embedded chart"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
          allowFullScreen
          scrolling="no"
        />
      </div>

      {/* Smaller screens: static image */}
      <div className="media-frame lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="Embedded chart" className="m-0 h-auto w-full border-0" loading="lazy" />
      </div>
    </figure>
  );
}
