"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 700, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trail1X = useSpring(cursorX, {
    damping: 35,
    stiffness: 500,
    mass: 0.3,
  });
  const trail1Y = useSpring(cursorY, {
    damping: 35,
    stiffness: 500,
    mass: 0.3,
  });
  const trail2X = useSpring(cursorX, {
    damping: 40,
    stiffness: 400,
    mass: 0.4,
  });
  const trail2Y = useSpring(cursorY, {
    damping: 40,
    stiffness: 400,
    mass: 0.4,
  });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer"
      );
      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (
    !isVisible &&
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9997 mix-blend-difference"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-ember"
          animate={{
            scale: isVisible ? 1 : 0,
            opacity: isVisible ? 0.3 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9998 mix-blend-difference"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-ember"
          animate={{
            scale: isVisible ? 1 : 0,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isPressed ? 0.8 : isPointer ? 1.8 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-10 h-10 rounded-full border border-white/30"
            animate={{
              scale: isPointer ? 1.2 : 1,
              opacity: isPointer ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Inner dot */}
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: isPointer ? 0.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-ember blur-xl"
            animate={{
              scale: isPointer ? 1 : 0,
              opacity: isPointer ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
