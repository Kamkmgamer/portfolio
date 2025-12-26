"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rippleColorClass?: string; // tailwind class for bg color
  rippleOpacityClass?: string; // tailwind opacity class
}

export function RippleButton({
  children,
  className = "",
  rippleColorClass = "bg-[hsl(var(--accent-gold))]",
  rippleOpacityClass = "opacity-20",
  onClick,
  onKeyDown,
  ...props
}: RippleButtonProps) {
  const reduceMotion = useReducedMotion();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  // Create a ripple element at coordinates relative to the button
  const createRipple = (x: number, y: number) => {
    const target = btnRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");

    ripple.className = [
      "ripple",
      "pointer-events-none",
      "absolute",
      "rounded-full",
      rippleColorClass,
      rippleOpacityClass,
    ].join(" ");
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - rect.left - size / 2}px`;
    ripple.style.top = `${y - rect.top - size / 2}px`;

    // Remove after animation ends
    const cleanup = () => {
      ripple.removeEventListener("animationend", cleanup);
      ripple.remove();
    };
    ripple.addEventListener("animationend", cleanup);

    // Insert and kick off animation on next frame for consistent styles
    target.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.classList.add("ripple-animate");
    });
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!reduceMotion) {
      createRipple(e.clientX, e.clientY);
    }
    onClick?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    // Simulate ripple on keyboard activation
    if (!reduceMotion && (e.key === "Enter" || e.key === " ")) {
      const target = btnRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        createRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
    onKeyDown?.(e);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative overflow-hidden isolate ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
