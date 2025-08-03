'use client';

import Image from 'next/image';
import React from 'react';
import {
  motion,
  useMotionValue,
  animate,
  useAnimation,
  useReducedMotion,
  cubicBezier,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { projects } from '@/data/projects';

export default function ProjectsCarousel() {
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const progressControls = useAnimation();
  const activeAnim = React.useRef<AnimationPlaybackControls | null>(null);

  const totalSlides = projects.length;
  const x = useMotionValue(0);
  const [width, setWidth] = React.useState(1);

  const spring = { type: 'spring' as const, stiffness: 300, damping: 30 };
  const snapEase = cubicBezier(0.22, 1, 0.36, 1);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const measure = () => setWidth(node.offsetWidth || 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const animateTo = React.useCallback(
    (to: number) => {
      // Stop any current animation
      activeAnim.current?.stop();

      if (reduceMotion) {
        // Quick tween instead of spring for reduced motion
        activeAnim.current = animate(x, [x.get(), to], { duration: 0.2, ease: (t) => t });
      } else {
        // Spring animation using keyframes to satisfy TS
        activeAnim.current = animate(x, [x.get(), to], spring);
      }
    },
    [x, reduceMotion]
  );

  const snapToIndex = React.useCallback(
    (index: number) => {
      const wrapped = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrent(wrapped);
      animateTo(-wrapped * width);
    },
    [totalSlides, width, animateTo]
  );

  const snapToClosest = React.useCallback(() => {
    const newIndex = Math.round(-x.get() / width);
    snapToIndex(newIndex);
    resetProgressBar();
  }, [snapToIndex, width, x]);

  const goToSlide = React.useCallback(
    (delta: number) => {
      snapToIndex(current + delta);
      resetProgressBar();
    },
    [current, snapToIndex]
  );

  const resetProgressBar = React.useCallback(async () => {
    await progressControls.set({ scaleX: 0 });
    if (autoPlay && !reduceMotion) {
      progressControls.start({
        scaleX: 1,
        transition: { duration: 5, ease: (t) => t },
      });
    }
  }, [autoPlay, reduceMotion, progressControls]);

  const startAutoplay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!autoPlay || reduceMotion) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % totalSlides;
        animateTo(-next * width);
        return next;
      });
    }, 5000);

    resetProgressBar();
  }, [autoPlay, reduceMotion, totalSlides, width, animateTo, resetProgressBar]);

  React.useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      activeAnim.current?.stop();
    };
  }, [startAutoplay]);

  React.useEffect(() => {
    // Reposition on width change
    activeAnim.current?.stop();
    animate(x, [x.get(), -current * width], { duration: 0.2, ease: snapEase });
  }, [width, current, x]);

  return (
    <section id="projects-carousel" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">My Projects</h2>

        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-lg">
          <motion.div
            ref={containerRef}
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -(totalSlides - 1) * width, right: 0 }}
            dragElastic={reduceMotion ? 0 : 0.05}
            style={{ x }}
            onDragEnd={snapToClosest}
            aria-roledescription="carousel"
          >
            {projects.map((project, idx) => (
              <div
                key={project.title + idx}
                className="relative flex-shrink-0 w-full h-80 md:h-[28rem]"
                role="group"
                aria-label={`${project.title}, slide ${idx + 1} of ${totalSlides}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-3xl select-none pointer-events-none"
                  draggable={false}
                  priority={idx === 0}
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold drop-shadow">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm drop-shadow">{project.description}</p>
                  )}
                  {project.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={tag + i}
                          className="text-xs bg-black/40 rounded px-1.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => goToSlide(-1)}
            aria-label="Previous slide"
            title="Previous"
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            aria-label="Next slide"
            title="Next"
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            ›
          </button>

          {/* Progress Bar */}
          <motion.div
            animate={progressControls}
            initial={{ scaleX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left"
          />
        </div>

        {/* Autoplay Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setAutoPlay((v) => !v)}
            className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              autoPlay
                ? 'bg-red-500 text-white focus-visible:ring-red-400'
                : 'bg-green-500 text-white focus-visible:ring-green-400'
            }`}
            aria-pressed={autoPlay}
          >
            {autoPlay ? 'Pause Autoplay' : 'Resume Autoplay'}
          </button>
        </div>
      </div>
    </section>
  );
}