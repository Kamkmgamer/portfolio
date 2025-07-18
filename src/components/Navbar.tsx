'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-screen z-50 bg-surface-light/70 dark:bg-surface-dark/70 backdrop-blur-md shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        >
          Khalil.
        </Link>

        {/* Desktop Links + ThemeToggle */}
        <div className="hidden md:flex items-center space-x-6">
          {['About', 'Projects', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-text-light dark:text-text-dark text-lg font-medium transition-colors duration-300 hover:text-primary-light dark:hover:text-primary-dark"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-light dark:bg-primary-dark transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden cursor-hover text-text-light dark:text-text-dark focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {['About', 'Projects', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-text-light dark:text-text-dark text-lg font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
