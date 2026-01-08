"use client";

import HeroSection from "../components/HeroSection";
import ServicesSection from "@/components/ServicesSection";

import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Khalil Abd Almageed | Web Developer & Designer",
    description: "Portfolio of Khalil Abd Almageed...",
    url: "https://khalil.mageed.net",
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HeroSection />
      <ServicesSection />
    </>
  );
}
