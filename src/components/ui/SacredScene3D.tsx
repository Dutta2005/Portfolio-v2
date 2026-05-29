import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ─── 🔱 Sacred 3D Background Scene ──────────────────────────────────────────────
// Three.js scene with starfield, floating sacred geometry, and ember particles

// ── Sacred Geometry: Floating wireframe shapes ──
function SacredGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const geo1Ref = useRef<THREE.Mesh>(null);
  const geo2Ref = useRef<THREE.Mesh>(null);
  const geo3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02;
    }
    if (geo1Ref.current) {
      geo1Ref.current.rotation.x = t * 0.15;
      geo1Ref.current.rotation.z = t * 0.1;
      geo1Ref.current.position.y = Math.sin(t * 0.3) * 0.5;
    }
    if (geo2Ref.current) {
      geo2Ref.current.rotation.y = t * 0.12;
      geo2Ref.current.rotation.x = t * 0.08;
      geo2Ref.current.position.y = Math.cos(t * 0.25) * 0.4;
    }
    if (geo3Ref.current) {
      geo3Ref.current.rotation.z = t * 0.1;
      geo3Ref.current.rotation.y = t * 0.15;
      geo3Ref.current.position.y = Math.sin(t * 0.35 + 1) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dodecahedron — saffron glow */}
      <mesh ref={geo1Ref} position={[-4, 1, -3]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial
          color="#ff6b1a"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Icosahedron — violet glow */}
      <mesh ref={geo2Ref} position={[4.5, -0.5, -4]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Octahedron — gold glow */}
      <mesh ref={geo3Ref} position={[0, -2, -5]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Torus ring — ganga */}
      <mesh position={[-2, -1.5, -6]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 8, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Another torus ring — saffron */}
      <mesh position={[3, 2, -7]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.5, 0.015, 8, 32]} />
        <meshBasicMaterial
          color="#ff6b1a"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

// ── Sacred Ember Particles ──
function EmberParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    const colorOptions = [
      [1, 0.42, 0.1],     // saffron
      [0.96, 0.62, 0.04],  // gold
      [0.55, 0.36, 0.96],  // violet
      [0.13, 0.83, 0.93],  // ganga
    ];

    for (let i = 0; i < count; i++) {
      // Spread across the scene
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

      // Random sacred color
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];

      sz[i] = Math.random() * 3 + 0.5;

      // Slow upward drift
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return { positions: pos, colors: col, sizes: sz, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset when too high
      if (pos[i * 3 + 1] > 7) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = -6;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Main Scene Component ──
function Scene() {
  return (
    <>
      {/* Starfield */}
      <Stars
        radius={50}
        depth={80}
        count={1500}
        factor={3}
        saturation={0.3}
        fade
        speed={0.3}
      />

      {/* Sacred geometry shapes */}
      <SacredGeometry />

      {/* Ember particles */}
      <EmberParticles count={60} />

      {/* Ambient light */}
      <ambientLight intensity={0.1} />
    </>
  );
}

// ── Exported Component ──
export default function SacredScene3D() {
  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
