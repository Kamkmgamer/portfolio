"use client";

import HeroSection from "../components/HeroSection";

import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ServicesSection from "@/components/ServicesSection";
import GitHubActivitySection from "@/components/GitHubActivitySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <SkillsSection />
      <ProjectsCarousel />
      <ServicesSection />
      <GitHubActivitySection />
    </>
  );
}
