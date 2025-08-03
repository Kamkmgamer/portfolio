'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';

export default function Spotlight() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const ref = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  // Pointer position and smooth follower values
  const pos = React.useRef({ x: 0, y: 0 });
  const smooth = React.useRef({ x: 0, y: 0 });

  // Track viewport to clamp values
  const size = React.useRef({ w: 0, h: 0 });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSize = () => {
      size.current.w = window.innerWidth;
      size.current.h = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMove = (e: PointerEvent) => {
      pos.current.x = Math.max(0, Math.min(e.clientX, size.current.w));
      pos.current.y = Math.max(0, Math.min(e.clientY, size.current.h));
      startLoop();
    };

    // Start an animation loop only when needed
    const startLoop = () => {
      if (rafRef.current != null || reduceMotion) return;
      const loop = () => {
        const el = ref.current;
        if (!el) {
          rafRef.current = null;
          return;
        }

        // Lerp toward pointer for smoothness
        const alpha = 0.18; // smoothing factor
        smooth.current.x += (pos.current.x - smooth.current.x) * alpha;
        smooth.current.y += (pos.current.y - smooth.current.y) * alpha;

        // Update background using smooth position
        const glowColor =
          resolvedTheme === 'dark'
            ? 'rgba(255, 255, 255, 0.20)'
            : 'rgba(0, 0, 0, 0.15)';
        const radius = 240;

        el.style.background = `radial-gradient(circle at ${smooth.current.x}px ${smooth.current.y}px, ${glowColor}, transparent ${radius}px)`;

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    // If reduced motion, set a static subtle gradient and skip events
    if (reduceMotion) {
      const el = ref.current;
      if (el) {
        const glowColor =
          resolvedTheme === 'dark'
            ? 'rgba(255, 255, 255, 0.10)'
            : 'rgba(0, 0, 0, 0.08)';
        el.style.background = `radial-gradient(60rem 40rem at 50% 30%, ${glowColor}, transparent 60%)`;
      }
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }

    window.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('resize', updateSize);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [resolvedTheme, reduceMotion]);

  // Layer styles
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{
        // Initial subtle background to avoid flash pre-first pointer move
        background:
          resolvedTheme === 'dark'
            ? 'radial-gradient(40rem 28rem at 50% 30%, rgba(255,255,255,0.08), transparent 60%)'
            : 'radial-gradient(40rem 28rem at 50% 30%, rgba(0,0,0,0.06), transparent 60%)',
        willChange: 'background',
      }}
    />
  );
}