"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShardProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
  floatAmplitude: number;
  delay: number;
}

function Shard({
  position,
  scale,
  rotationSpeed,
  floatAmplitude,
  delay,
}: ShardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() + delay;
      meshRef.current.rotation.x = t * rotationSpeed * 0.3;
      meshRef.current.rotation.y = t * rotationSpeed * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(t * 0.5) * floatAmplitude;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#1a0d08"
        metalness={0.9}
        roughness={0.1}
        transmission={0.3}
        thickness={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ShardField() {
  const shards = useMemo(() => {
    const items: ShardProps[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 5,
        ],
        scale: Math.random() * 0.4 + 0.2,
        rotationSpeed: Math.random() * 0.5 + 0.1,
        floatAmplitude: Math.random() * 0.5 + 0.2,
        delay: Math.random() * Math.PI * 2,
      });
    }

    return items;
  }, []);

  return (
    <>
      {shards.map((shard, i) => (
        <Shard key={i} {...shard} />
      ))}
    </>
  );
}

// Glowing lines connecting shards
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(30 * 6); // 30 line segments

    for (let i = 0; i < 30; i++) {
      const idx = i * 6;
      positions[idx] = (Math.random() - 0.5) * 20;
      positions[idx + 1] = (Math.random() - 0.5) * 10;
      positions[idx + 2] = (Math.random() - 0.5) * 8 - 5;
      positions[idx + 3] = (Math.random() - 0.5) * 20;
      positions[idx + 4] = (Math.random() - 0.5) * 10;
      positions[idx + 5] = (Math.random() - 0.5) * 8 - 5;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#c45d3e" transparent opacity={0.15} />
    </lineSegments>
  );
}

// Ambient fog glow
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.z = t * 0.02;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 + Math.sin(t * 0.3) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial
        color="#c45d3e"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function CrystallineShards() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#c45d3e" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#614124" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#d4a574"
        />

        <ShardField />
        <ConnectionLines />
        <AmbientGlow />
      </Canvas>
    </div>
  );
}
