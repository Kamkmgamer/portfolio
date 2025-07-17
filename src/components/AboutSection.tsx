'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const AboutSection: React.FC = () => {
  const { scrollY } = useViewportScroll();
  // Parallax: move image up/down as user scrolls
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section
      id="about"
      className="relative w-full py-24 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Parallax Image */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/about-me.png?updatedAt=1752777671112"
            alt="Khalil Abdel Majeed working on a project"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-pink-200/20 dark:from-blue-500/30 dark:via-purple-500/20 dark:to-pink-500/20 mix-blend-multiply" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Me
            </span>
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-6">
            Hi, I’m{' '}
            <span className="font-semibold text-primary-light dark:text-primary-dark">
              Khalil Abdel Majeed
            </span>
            , a Web Developer & Designer passionate about crafting immersive
            user experiences.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed">
            I specialize in{' '}
            <span className="font-medium text-secondary-light dark:text-secondary-dark">
              Next.js, React, Tailwind CSS
            </span>{' '}
            and love bringing ideas to life with clean code and beautiful
            design.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
