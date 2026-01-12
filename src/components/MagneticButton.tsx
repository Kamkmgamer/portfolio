"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Scale on hover
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring, scale }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`relative group ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-lg bg-gradient-to-r from-ember/20 to-rust/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.5 : 0,
          }}
        />

        {/* Button content */}
        <span className="relative z-10">{children}</span>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-sm"
          initial={false}
        >
          <motion.div
            className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            initial={{ x: "-200%" }}
            animate={{ x: isHovered ? "300%" : "-200%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </Component>
    </motion.div>
  );
}
