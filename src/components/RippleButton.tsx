// src/components/RippleButton.tsx
'use client'

import React, { MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function RippleButton({ children, className = '', ...props }: RippleButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = 'absolute bg-white opacity-30 rounded-full animate-ripple'
    target.appendChild(ripple)
    setTimeout(() => {
      ripple.remove()
    }, 600)

    if (props.onClick) props.onClick(e)
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  )
}