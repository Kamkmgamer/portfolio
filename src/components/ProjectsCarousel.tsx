'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, animate, useAnimation } from 'framer-motion'
import { projects } from '@/data/projects'

export default function ProjectsCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const totalSlides = projects.length
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressControls = useAnimation()

  const slideWidth = () => containerRef.current?.offsetWidth || 1

  const snapToClosest = () => {
    const newIndex = Math.round(-x.get() / slideWidth())
    const wrappedIndex = (newIndex + totalSlides) % totalSlides
    setCurrent(wrappedIndex)
    animate(x, -wrappedIndex * slideWidth(), { type: 'spring', stiffness: 300, damping: 30 })
    resetProgressBar()
  }

  const goToSlide = (index: number) => {
    const wrappedIndex = (index + totalSlides) % totalSlides
    setCurrent(wrappedIndex)
    animate(x, -wrappedIndex * slideWidth(), { type: 'spring', stiffness: 300, damping: 30 })
    resetProgressBar()
  }

  const resetProgressBar = async () => {
    await progressControls.set({ scaleX: 0 })
    if (autoPlay) {
      progressControls.start({ scaleX: 1, transition: { duration: 5, ease: 'linear' } })
    }
  }

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      goToSlide(current + 1)
    }, 5000)
    resetProgressBar()
  }

  useEffect(() => {
    if (autoPlay) startAutoplay()
    else progressControls.stop()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, current])

  return (
    <section id="projects-carousel" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">My Projects</h2>

        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-lg">
          <motion.div
            ref={containerRef}
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -slideWidth() * totalSlides, right: 0 }}
            dragElastic={0.05}
            style={{ x }}
            onDragEnd={snapToClosest}
          >
            {[...projects, ...projects, ...projects].map((project, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-full h-80 md:h-[28rem]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-3xl select-none pointer-events-none"
                  draggable={false}
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold drop-shadow">{project.title}</h3>
                  <p className="text-sm drop-shadow">{project.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => goToSlide(current - 1)}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10"
          >
            ‹
          </button>
          <button
            onClick={() => goToSlide(current + 1)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10"
          >
            ›
          </button>

          {/* Progress Bar */}
          <motion.div
            animate={progressControls}
            initial={{ scaleX: 0 }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left"
          />
        </div>

        {/* Autoplay Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              autoPlay ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {autoPlay ? 'Pause Autoplay' : 'Resume Autoplay'}
          </button>
        </div>
      </div>
    </section>
  )
}
