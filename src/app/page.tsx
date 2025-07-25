// src/app/page.tsx
'use client'; // page.tsx also needs to be a client component if it renders client components directly
                // (like Navbar with its useState, or if you plan to use AnimatePresence)

import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import InteractiveCursor from '@/components/CursorProvider';
import ServicesSection from "@/components/ServicesSection";
import GitHubActivitySection from "@/components/GitHubActivitySection";




export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <SkillsSection />
      <ProjectsCarousel />
      <InteractiveCursor />
      <ServicesSection />
      <GitHubActivitySection />
    </>
  );
}
