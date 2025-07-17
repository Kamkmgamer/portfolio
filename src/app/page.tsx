// src/app/page.tsx
'use client'; // page.tsx also needs to be a client component if it renders client components directly
                // (like Navbar with its useState, or if you plan to use AnimatePresence)

import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";

import ProjectsSection from '../components/ProjectsSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      {/* Other sections... */}
    </>
  );
}
