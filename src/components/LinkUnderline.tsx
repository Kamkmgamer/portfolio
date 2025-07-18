// src/components/LinkUnderline.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LinkUnderlineProps {
  href: string
  children: React.ReactNode
}

export function LinkUnderline({ href, children }: LinkUnderlineProps) {
  return (
    <a href={href} className="relative overflow-hidden text-primary-light dark:text-primary-dark">
      <span className="relative z-10">{children}</span>
      <motion.span
        layoutId="underline"
        className="absolute bottom-0 left-0 h-0.5 bg-primary-light dark:bg-primary-dark"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </a>
  )
}
