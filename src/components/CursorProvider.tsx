'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

type CursorTheme = {
  background: string;
  borderRadius: string;
  text?: string;
  size: number;
};

const defaultTheme: CursorTheme = {
  background: 'rgba(156, 163, 175, 0.2)',
  borderRadius: '50%',
  size: 20,
};

const themes: Record<string, CursorTheme> = {
  button: {
    background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
    borderRadius: '50%',
    text: 'Click',
    size: 60,
  },
  link: {
    background: 'linear-gradient(90deg, #facc15, #f59e0b)',
    borderRadius: '50%',
    text: 'Open',
    size: 60,
  },
  image: {
    background: 'linear-gradient(90deg, #10b981, #34d399)',
    borderRadius: '12px',
    text: 'View',
    size: 60,
  },
  custom: {
    background: 'linear-gradient(90deg, #ef4444, #f97316)',
    borderRadius: '20%',
    size: 70,
  },
};

export default function InteractiveCursor() {
  const [theme, setTheme] = useState<CursorTheme>(defaultTheme);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  // Keep motion values stable
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs with reduced-motion consideration
  const springConfig = useMemo(
    () =>
      reduceMotion
        ? { stiffness: 1000, damping: 100 } // almost no trail
        : { stiffness: 500, damping: 40 },
    [reduceMotion]
  );

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Track if pointer is down (optional: could shrink/expand on press)
  const isPointerInside = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Some older browsers may report 0 for clientX/Y if out of bounds
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const parseIntSafe = (val: string | null, fallback: number) => {
      const n = parseInt(val ?? '', 10);
      return Number.isFinite(n) ? n : fallback;
    };

    const applyElementTheme = (el: HTMLElement) => {
      setHovering(true);

      const tag = el.tagName;
      if (tag === 'BUTTON') {
        setTheme(themes.button);
        return;
      }
      if (tag === 'A') {
        setTheme(themes.link);
        return;
      }
      if (tag === 'IMG') {
        setTheme(themes.image);
        return;
      }
      if (el.classList.contains('cursor-hover')) {
        const customBg = el.getAttribute('data-cursor-bg');
        const customShape = el.getAttribute('data-cursor-shape');
        const customSize = parseIntSafe(
          el.getAttribute('data-cursor-size'),
          themes.custom.size
        );
        setTheme({
          ...themes.custom,
          background: customBg ?? themes.custom.background,
          borderRadius: customShape ?? themes.custom.borderRadius,
          text: el.getAttribute('data-cursor-text') ?? 'Hover',
          size: customSize,
        });
        return;
      }

      // Fallback to default if none matched
      setTheme(defaultTheme);
    };

    const resetTheme = () => {
      setHovering(false);
      setTheme(defaultTheme);
    };

    // Use event delegation so we don't attach many listeners
    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest matching interactive ancestor
      const el =
        target.closest<HTMLElement>('a, button, img, .cursor-hover') ?? null;
      if (el) {
        applyElementTheme(el);
      }
    };

    const handlePointerOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      // Only reset when leaving the matched element area fully
      if (!related) {
        resetTheme();
        return;
      }
      const leavingEl = e.target as HTMLElement | null;
      if (
        leavingEl &&
        !related.closest('a, button, img, .cursor-hover') &&
        !leavingEl.contains(related)
      ) {
        resetTheme();
      }
    };

    const handlePointerEnterViewport = () => {
      isPointerInside.current = true;
    };
    const handlePointerLeaveViewport = () => {
      isPointerInside.current = false;
      resetTheme();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerout', handlePointerOut, true);
    window.addEventListener('pointerenter', handlePointerEnterViewport);
    window.addEventListener('pointerleave', handlePointerLeaveViewport);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerout', handlePointerOut, true);
      window.removeEventListener('pointerenter', handlePointerEnterViewport);
      window.removeEventListener('pointerleave', handlePointerLeaveViewport);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform will-change-opacity"
      style={{
        x: springX,
        y: springY,
        // Center the cursor element under the pointer
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: theme.borderRadius,
      }}
      animate={{
        width: hovering ? theme.size : defaultTheme.size,
        height: hovering ? theme.size : defaultTheme.size,
        background: theme.background,
        scale: hovering ? 1.12 : 1,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      {theme.text && hovering && (
        <span
          className="text-[10px] leading-none font-medium text-white select-none"
          style={{
            pointerEvents: 'none',
            mixBlendMode: 'difference',
          }}
        >
          {theme.text}
        </span>
      )}
    </motion.div>
  );
}