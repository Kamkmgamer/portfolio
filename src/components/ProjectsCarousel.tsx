"use client";

import Image from "next/image";
import React from "react";
import {
  motion,
  useMotionValue,
  animate,
  useAnimation,
  useReducedMotion,
  cubicBezier,
  type AnimationPlaybackControls,
} from "framer-motion";
import { projects } from "@/data/projects";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

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

  const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

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
      activeAnim.current?.stop();

      if (reduceMotion) {
        activeAnim.current = animate(x, [x.get(), to], {
          duration: 0.2,
          ease: (t) => t,
        });
      } else {
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
    activeAnim.current?.stop();
    animate(x, [x.get(), -current * width], { duration: 0.2, ease });
  }, [width, current, x]);

  return (
    <section id="projects-carousel" className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight">
            <span className="text-text italic font-normal">Featured </span>
            <span className="bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background dark:from-gray-950 to-transparent z-10 pointer-events-none" />

          {/* Main carousel */}
          <div className="relative overflow-hidden">
            {/* Glow behind carousel */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent-gold))]/10 via-[hsl(var(--accent-bronze))]/10 to-transparent blur-3xl -z-10" />

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
                <motion.div
                  key={project.title + idx}
                  className="relative flex-shrink-0 w-full h-80 md:h-[32rem] group"
                  role="group"
                  aria-label={`${project.title}, slide ${
                    idx + 1
                  } of ${totalSlides}`}
                >
                  {/* Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover select-none pointer-events-none transition-transform duration-1000 group-hover:scale-110"
                    draggable={false}
                    priority={idx === 0}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl md:text-5xl font-display text-white mb-4 group-hover:text-[hsl(var(--accent-gold))] transition-colors duration-500 leading-tight">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-white/70 text-base md:text-lg mb-6 line-clamp-2 font-light">
                          {project.description}
                        </p>
                      )}
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={tag + i}
                              className="text-[0.65rem] font-bold uppercase tracking-[0.2em] px-4 py-1.5 border border-[hsl(var(--accent-gold))]/30 text-[hsl(var(--accent-gold))] bg-black/40 backdrop-blur-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
              <motion.div
                animate={progressControls}
                initial={{ scaleX: 0 }}
                className="h-full bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-gold))] origin-left"
              />
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous button */}
            <motion.button
              type="button"
              onClick={() => goToSlide(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex items-center gap-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    snapToIndex(idx);
                    resetProgressBar();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-0.5 transition-all duration-500 ${
                    current === idx
                      ? "w-12 bg-[hsl(var(--accent-gold))]"
                      : "w-6 bg-white/10 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              type="button"
              onClick={() => goToSlide(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Autoplay toggle */}
            <motion.button
              type="button"
              onClick={() => setAutoPlay((v) => !v)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={autoPlay}
              aria-label={autoPlay ? "Pause autoplay" : "Resume autoplay"}
              className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                autoPlay ? "text-[hsl(var(--accent-gold))]" : "text-text/30"
              }`}
            >
              {autoPlay ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
