'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { getBasePath } from '../utils/getBasePath';

const HeroSection: React.FC = () => {
  const basePath = getBasePath();
  const [isInside, setIsInside] = useState(false);
  // track raw mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // convert mouse position into centered percentage (−50…+50)
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const xParallax1 = useTransform(xPct, [-50, 50], [-20, 20]);
  const yParallax1 = useTransform(yPct, [-50, 50], [-20, 20]);
  const xParallax2 = useTransform(xPct, [-50, 50], [-40, 40]);
  const yParallax2 = useTransform(yPct, [-50, 50], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      setMousePos({ x: e.clientX, y: e.clientY });
      xPct.set((e.clientX - cx) / cx * 50);
      yPct.set((e.clientY - cy) / cy * 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [xPct, yPct]);

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-gradient-to-br-light dark:bg-gradient-to-br-dark text-text-light dark:text-text-dark transition-colors duration-500"
    >
      {/* Parallax Blob #1 */}
      <motion.div
        style={{ x: xParallax1, y: yParallax1 }}
        className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        transition={{ type: 'spring', stiffness: 30 }}
      />

      {/* Parallax Blob #2 */}
      <motion.div
        style={{ x: xParallax2, y: yParallax2 }}
        className="absolute w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        transition={{ type: 'spring', stiffness: 30 }}
      />

      {/* Spotlight Glow */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            key="spotlight"
            className="pointer-events-none fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.15), transparent 200px)`,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Khalil Abdel Majeed
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-2xl mx-auto"
        >
          A Web Developer & Designer crafting modern, interactive, and responsive web experiences.
        </motion.p>
        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-block bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-yellow-300 hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
