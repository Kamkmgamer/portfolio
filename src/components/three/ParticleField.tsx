"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Particle shader for ethereal glow effect
const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  varying float vAlpha;
  
  uniform float time;
  uniform float mouseX;
  uniform float mouseY;
  
  void main() {
    vColor = customColor;
    
    vec3 pos = position;
    
    // Organic movement with time
    float wave = sin(time * 0.3 + position.x * 0.5) * 0.5;
    float wave2 = cos(time * 0.2 + position.y * 0.3) * 0.3;
    pos.x += wave;
    pos.y += wave2;
    pos.z += sin(time * 0.4 + position.z * 0.2) * 0.2;
    
    // Mouse interaction - gentle pull
    vec3 mousePos = vec3(mouseX * 8.0, mouseY * 5.0, 0.0);
    float dist = distance(pos.xy, mousePos.xy);
    float influence = smoothstep(5.0, 0.0, dist) * 0.8;
    pos.xy += normalize(mousePos.xy - pos.xy) * influence * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Alpha based on depth
    vAlpha = smoothstep(-12.0, -2.0, mvPosition.z) * 0.8;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Circular soft-edged particle
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    
    // Glow effect
    vec3 glowColor = vColor * 1.5;
    vec3 finalColor = mix(vColor, glowColor, smoothstep(0.3, 0.0, dist));
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface ParticleSystemProps {
  count?: number;
  spread?: number;
  colors?: THREE.Color[];
}

function ParticleSystem({
  count = 800,
  spread = 12,
  colors,
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const defaultColors = useMemo(
    () => [
      new THREE.Color("#c45d3e"), // Ember rust
      new THREE.Color("#8b3a2a"), // Deep rust
      new THREE.Color("#614124"), // Bronze dark
      new THREE.Color("#d4a574"), // Warm sand
    ],
    [],
  );

  const particleColors = colors || defaultColors;

  const [positions, sizes, colorArray] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a 3D space
      pos[i * 3] = (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.8 - 3;

      // Varying sizes
      siz[i] = Math.random() * 3 + 0.5;

      // Random color from palette
      const color =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, siz, col];
  }, [count, spread, particleColors]);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouseX: { value: 0 },
      mouseY: { value: 0 },
    }),
    [],
  );

  // Track mouse movement
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = clock.getElapsedTime();
      material.uniforms.mouseX.value +=
        (mouseRef.current.x - material.uniforms.mouseX.value) * 0.05;
      material.uniforms.mouseY.value +=
        (mouseRef.current.y - material.uniforms.mouseY.value) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute
          attach="attributes-customColor"
          args={[colorArray, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Morphing geometric shapes
function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, 0, -5]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#2a1810"
        wireframe
        emissive="#c45d3e"
        emissiveIntensity={0.15}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Floating ring element
function FloatingRing({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.z = t * 0.1 + (rotation || 0);
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#c45d3e"
        emissive="#c45d3e"
        emissiveIntensity={0.3}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#c45d3e" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#8b3a2a"
        />

        <ParticleSystem count={600} spread={15} />
        <GeometricMesh />
        <FloatingRing position={[-5, 2, -6]} rotation={0.5} />
        <FloatingRing position={[6, -1, -8]} rotation={1.2} />
      </Canvas>
    </div>
  );
}
