'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white overflow-hidden">
      {/* Decorative background circles */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      />
      {/* Hero Content */}
      <div className="z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          Hi, I&apos;m <span className="text-yellow-300">Khalil Abdel Majeed</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-2xl mx-auto text-gray-100 drop-shadow"
        >
          A Web Developer & Designer crafting modern, interactive, and responsive web experiences.
        </motion.p>
        <motion.a
          href="#portfolio"
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
