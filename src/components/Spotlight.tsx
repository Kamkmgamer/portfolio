'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Spotlight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Wait for client mount
  useEffect(() => {
    setMounted(true);

    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Server or pre-hydration: render nothing (avoid mismatch)
  if (!mounted) {
    return <div className="pointer-events-none fixed inset-0 z-[-1]" />;
  }

  // Determine glow color based on theme
  const glowColor =
    resolvedTheme === 'dark'
      ? 'rgba(255, 255, 255, 0.2)' // light glow in dark mode
      : 'rgba(0, 0, 0, 0.15)';      // dark glow in light mode

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{
        background: `radial-gradient(
          circle at ${mousePos.x}px ${mousePos.y}px,
          ${glowColor},
          transparent 200px
        )`,
        transition: 'background 0.2s ease-out',
      }}
    />
  );
}
