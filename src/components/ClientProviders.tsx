"use client";

import dynamic from "next/dynamic";

// Dynamic imports for Three.js components (no SSR)
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Three.js Background */}
      <ParticleField />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
