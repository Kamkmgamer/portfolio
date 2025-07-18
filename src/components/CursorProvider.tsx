"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorTheme = {
  background: string; // color or gradient
  borderRadius: string;
  text?: string;
  size: number;
};

const defaultTheme: CursorTheme = {
  background: "rgba(156, 163, 175, 0.2)", // gray-400 light
  borderRadius: "50%",
  size: 20,
};

const themes: Record<string, CursorTheme> = {
  button: {
    background: "linear-gradient(90deg, #0ea5e9, #38bdf8)", // blue gradient
    borderRadius: "50%",
    text: "Click",
    size: 60,
  },
  link: {
    background: "linear-gradient(90deg, #facc15, #f59e0b)", // yellow gradient
    borderRadius: "50%",
    text: "Open",
    size: 60,
  },
  image: {
    background: "linear-gradient(90deg, #10b981, #34d399)", // green gradient
    borderRadius: "12px",
    text: "View",
    size: 60,
  },
  custom: {
    background: "linear-gradient(90deg, #ef4444, #f97316)", // red-orange gradient
    borderRadius: "20%",
    size: 70,
  },
};

export default function InteractiveCursor() {
  const [theme, setTheme] = useState<CursorTheme>(defaultTheme);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const setCategoryTheme = (el: HTMLElement) => {
      setHovering(true);
      if (el.tagName === "BUTTON") {
        setTheme(themes.button);
      } else if (el.tagName === "A") {
        setTheme(themes.link);
      } else if (el.tagName === "IMG") {
        setTheme(themes.image);
      } else if (el.classList.contains("cursor-hover")) {
        const customBg = el.getAttribute("data-cursor-bg");
        const customShape = el.getAttribute("data-cursor-shape");
        const customSize = parseInt(el.getAttribute("data-cursor-size") || "70");
        setTheme({
          ...themes.custom,
          background: customBg || themes.custom.background,
          borderRadius: customShape || themes.custom.borderRadius,
          text: el.getAttribute("data-cursor-text") || "Hover",
          size: customSize,
        });
      }
    };

    const resetTheme = () => {
      setHovering(false);
      setTheme(defaultTheme);
    };

    window.addEventListener("mousemove", move);

    const hoverElements = document.querySelectorAll("a, button, img, .cursor-hover");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => setCategoryTheme(el as HTMLElement));
      el.addEventListener("mouseleave", resetTheme);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", () => setCategoryTheme(el as HTMLElement));
        el.removeEventListener("mouseleave", resetTheme);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        borderRadius: theme.borderRadius,
      }}
      animate={{
        width: hovering ? theme.size : defaultTheme.size,
        height: hovering ? theme.size : defaultTheme.size,
        background: theme.background,
        scale: hovering ? 1.2 : 1, // Slight grow on hover
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {theme.text && (
        <span
          className="text-xs font-medium text-white"
          style={{
            pointerEvents: "none",
            mixBlendMode: "difference",
          }}
        >
          {theme.text}
        </span>
      )}
    </motion.div>
  );
}
