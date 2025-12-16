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
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-text">Featured </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background dark:from-gray-950 to-transparent z-10 pointer-events-none" />

          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            {/* Glow behind carousel */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl -z-10" />

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
                    className="object-cover rounded-3xl select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                    priority={idx === 0}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="glass-card rounded-2xl p-6 max-w-lg">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={tag + i}
                              className="text-xs px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
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
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                animate={progressControls}
                initial={{ scaleX: 0 }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 origin-left"
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
            <div className="flex items-center gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    snapToIndex(idx);
                    resetProgressBar();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "w-8 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                autoPlay
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "glass-card text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {autoPlay ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
