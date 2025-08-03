'use client';

import React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';

type LinkUnderlineProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

const ease = cubicBezier(0.22, 1, 0.36, 1);

export function LinkUnderline({
  href,
  children,
  external = false,
  className = '',
}: LinkUnderlineProps) {
  const content = (
    <motion.span
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={`relative inline-flex items-baseline overflow-hidden text-primary-light dark:text-primary-dark focus:outline-none ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        variants={{
          rest: { width: 0 },
          hover: { width: '100%' },
        }}
        transition={{ duration: 0.28, ease }}
        className="absolute bottom-0 left-0 h-0.5 bg-primary-light dark:bg-primary-dark"
      />
      {/* Focus ring */}
      <span className="absolute inset-0 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50 dark:focus-visible:ring-primary-dark/50 pointer-events-none" />
    </motion.span>
  );

  // Use Next.js Link for internal routes, <a> with target for external
  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block align-baseline"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block align-baseline">
      {content}
    </Link>
  );
}