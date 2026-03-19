"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  Float,
  Environment,
  MeshDistortMaterial,
  Sphere,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";

/* ── Animated Globe ── */
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.002;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[1.5, 0, 0]}>
        {/* Core Globe */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <MeshDistortMaterial
            color="#0a0a20"
            emissive="#c8920f"
            emissiveIntensity={0.08}
            roughness={0.3}
            metalness={0.8}
            distort={0.08}
            speed={2}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[1.82, 24, 24]} />
          <meshBasicMaterial
            color="#c8920f"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Outer glow sphere */}
        <mesh ref={glowRef} scale={1.15}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#c8920f"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Equatorial ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.01, 8, 128]} />
          <meshBasicMaterial color="#e4b020" transparent opacity={0.3} />
        </mesh>

        {/* Second orbit ring */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[2.6, 0.005, 8, 128]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating Particles ── */
function ParticleField() {
  const count = 1200;
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Gold-to-cyan gradient based on position
      const t = Math.random();
      if (t < 0.6) {
        colors[i3] = 0.78 + t * 0.1; // R: gold
        colors[i3 + 1] = 0.57 + t * 0.05;
        colors[i3 + 2] = 0.06;
      } else {
        colors[i3] = 0.0; // cyan
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 1.0;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Floating Airplane ── */
function Airplane() {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    t.current += delta * 0.3;
    const angle = t.current;
    const radius = 3.5;

    ref.current.position.x = Math.cos(angle) * radius + 1.5;
    ref.current.position.y = Math.sin(angle * 1.5) * 0.5;
    ref.current.position.z = Math.sin(angle) * radius;

    ref.current.rotation.y = -angle + Math.PI / 2;
    ref.current.rotation.z = Math.sin(angle * 1.5) * 0.15;
  });

  return (
    <group ref={ref}>
      {/* Fuselage */}
      <mesh>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.9}
          roughness={0.1}
          emissive="#c8920f"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.35, 0.08]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.14, 0.04, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.02, 0.12, 0.04]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Engine glow */}
      <pointLight color="#00d4ff" intensity={0.5} distance={0.4} />
    </group>
  );
}

/* ── Mountains ── */
function Mountains() {
  const mountains = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (i - 4) * 2.5 + Math.random() * 0.5,
        -3 + Math.random() * 0.5,
        -3 - Math.random() * 4,
      ] as [number, number, number],
      scale: 0.8 + Math.random() * 1.5,
      rotation: Math.random() * 0.3 - 0.15,
    }));
  }, []);

  return (
    <>
      {mountains.map((m, i) => (
        <mesh
          key={i}
          position={m.position}
          rotation={[0, 0, m.rotation]}
          scale={m.scale}
        >
          <coneGeometry args={[0.8, 2, 6]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#c8920f"
            emissiveIntensity={0.04}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

/* ── Scene Lighting ── */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a0a30" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#e4b020"
        castShadow
      />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[5, -3, 5]} intensity={0.4} color="#7c3aed" />
      <hemisphereLight
        color="#c8920f"
        groundColor="#00d4ff"
        intensity={0.3}
      />
    </>
  );
}

/* ── Main HeroScene component ── */
export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.5}
          />
          <ParticleField />
          <Globe />
          <Airplane />
          <Mountains />
          <fog attach="fog" args={["#02020a", 15, 35]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
