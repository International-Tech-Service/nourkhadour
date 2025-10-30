import { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Mail } from 'lucide-react';
import * as THREE from 'three';
import { usePerformance } from '../../hooks/usePerformance';

// Animated 3D Sphere - Memoized for performance
const AnimatedSphere = memo(function AnimatedSphere({ isLowEnd }: { isLowEnd: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  // Reduce quality on low-end devices
  const sphereArgs: [number, number, number] = isLowEnd ? [1, 32, 32] : [1, 100, 200];
  const distortAmount = isLowEnd ? 0.3 : 0.5;

  return (
    <Sphere ref={meshRef} args={sphereArgs} scale={2.5}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={distortAmount}
        speed={isLowEnd ? 1 : 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
});

// Floating Particles - Memoized and optimized
const Particles = memo(function Particles({ isLowEnd }: { isLowEnd: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!);
  const particleCount = isLowEnd ? 300 : 1000;

  useEffect(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        positions.setXYZ(
          i,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
      }
      positions.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(particleCount * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#a855f7" transparent opacity={0.6} />
    </points>
  );
});

export default function HeroSection() {
  const { isLowEnd, reducedMotion } = usePerformance();
  const shouldRender3D = !reducedMotion && !isLowEnd;

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - Only render on capable devices */}
      {shouldRender3D ? (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: !isLowEnd, powerPreference: 'high-performance' }}
            dpr={isLowEnd ? 1 : [1, 2]}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
            <AnimatedSphere isLowEnd={isLowEnd} />
            <Particles isLowEnd={isLowEnd} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      ) : (
        // Fallback gradient background for low-end devices
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-purple-400 font-semibold text-lg mb-4"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text animate-gradient">Nour Khadour</span>
          </motion.h1>

          {/* Title with Typing Effect */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-text-secondary mb-8"
          >
            Full-Stack Developer <span className="text-purple-500">&</span><br className="md:hidden" />
            <span className="gradient-text"> Tech Entrepreneur</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-text-tertiary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Building innovative digital solutions with{' '}
            <span className="text-purple-400 font-semibold">26+ projects</span> in Flutter, React, and Next.js.
            Founder of{' '}
            <a
              href="https://intertech.services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              International Tech Service
            </a>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg"
              >
                View My Work
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-8 py-4 text-lg"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-6 justify-center items-center mt-12"
          >
            <a
              href="https://gitlab.com/enn_kh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-purple-400 transition-colors"
              aria-label="GitLab Profile"
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Github size={28} />
              </motion.div>
            </a>
            <a
              href="mailto:nournh95@gmail.com"
              className="text-text-tertiary hover:text-purple-400 transition-colors"
              aria-label="Email"
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Mail size={28} />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-purple-400 cursor-pointer"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={32} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
