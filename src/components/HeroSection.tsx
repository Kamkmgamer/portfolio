'use client';

import React from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  cubicBezier,
} from 'framer-motion';

const ease = cubicBezier(0.22, 1, 0.36, 1);

const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [isInside, setIsInside] = React.useState(false);
  // Viewport center stored in state to avoid reading window during render
  const [center, setCenter] = React.useState<{ cx: number; cy: number }>({ cx: 0, cy: 0 });

  // Pointer position as MotionValues
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Normalize to percentage offset from center (-50 to 50), based on state (SSR-safe)
  const xPct = useTransform(x, (val) => {
    const cx = center.cx;
    return cx ? ((val - cx) / cx) * 50 : 0;
  });
  const yPct = useTransform(y, (val) => {
    const cy = center.cy;
    return cy ? ((val - cy) / cy) * 50 : 0;
  });

  // Springs for smoother parallax (respect reduced motion)
  const springCfg = React.useMemo(
    () =>
      reduceMotion
        ? { stiffness: 1000, damping: 100 }
        : { stiffness: 60, damping: 20 },
    [reduceMotion]
  );

  const xParallax1 = useSpring(
    useTransform(xPct, [-50, 50], [-20, 20]),
    springCfg
  );
  const yParallax1 = useSpring(
    useTransform(yPct, [-50, 50], [-20, 20]),
    springCfg
  );
  const xParallax2 = useSpring(
    useTransform(xPct, [-50, 50], [-40, 40]),
    springCfg
  );
  const yParallax2 = useSpring(
    useTransform(yPct, [-50, 50], [-40, 40]),
    springCfg
  );

  // Spotlight gradient center as derived style; no React state needed
  const spotlightBg = useTransform([x, y], ([mx, my]) => {
    const alpha = 0.18;
    const radius = 240;
    return `radial-gradient(circle at ${mx}px ${my}px, rgba(0,0,0,${alpha}), transparent ${radius}px)`;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;

    // Set initial center to current viewport and align pointer values to center
    const initCx = window.innerWidth / 2;
    const initCy = window.innerHeight / 2;
    x.set(initCx);
    y.set(initCy);
    setCenter({ cx: initCx, cy: initCy });

    const onResize = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setCenter({ cx, cy });
    };

    window.addEventListener('resize', onResize);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onEnter = () => setIsInside(true);
    const onLeave = () => setIsInside(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [x, y, reduceMotion]);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark text-text-light dark:text-text-dark transition-colors duration-500"
      aria-labelledby="hero-title"
    >
      {/* Parallax Blob #1 */}
      <motion.div
        style={{ x: reduceMotion ? 0 : xParallax1, y: reduceMotion ? 0 : yParallax1 }}
        className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply blur-3xl opacity-20 will-change-transform"
        transition={{ type: 'spring', stiffness: 30 }}
      />

      {/* Parallax Blob #2 */}
      <motion.div
        style={{ x: reduceMotion ? 0 : xParallax2, y: reduceMotion ? 0 : yParallax2 }}
        className="absolute w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply blur-3xl opacity-20 will-change-transform"
        transition={{ type: 'spring', stiffness: 30 }}
      />

      {/* Spotlight Glow (disabled if reduced motion) */}
      <AnimatePresence>
        {!reduceMotion && isInside && (
          <motion.div
            key="spotlight"
            className="pointer-events-none fixed inset-0 z-0 will-change-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
            style={{ background: spotlightBg }}
          />
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg tracking-tight"
        >
          Hi, I&rsquo;m{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Khalil Abdel Majeed
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-2xl mx-auto text-balance"
        >
          A Web Developer & Designer crafting modern, interactive, and responsive
          web experiences.
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="inline-block bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-yellow-300 transform transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:ring-offset-2"
          aria-label="View my projects"
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;