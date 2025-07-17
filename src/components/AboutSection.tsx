'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/portfolio//images/about-me.jpg
"
            alt="Khalil Abdel Majeed working on a project"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-pink-500/20 mix-blend-multiply" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
            Hi, I’m <span className="font-semibold text-blue-600 dark:text-blue-400">Khalil Abdel Majeed</span>, a
            Web Developer & Designer with a passion for creating immersive and responsive websites. My goal is to blend
            aesthetics and functionality to deliver exceptional user experiences.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            I specialize in technologies like <span className="font-medium text-purple-600 dark:text-purple-400">Next.js, React, Tailwind CSS</span>, and love bringing ideas to life with clean code and eye-catching designs.
          </p>

          {/* Call to Action */}
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Let’s Work Together
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
