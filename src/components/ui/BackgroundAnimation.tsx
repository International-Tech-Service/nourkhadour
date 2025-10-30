import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to various values
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.05]);
  const gridPosition = useTransform(scrollYProgress, [0, 1], ['0px 0px', '50px 50px']);

  // Scroll-triggered particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Store canvas dimensions
    const getCanvasWidth = () => canvas?.width || 0;
    const getCanvasHeight = () => canvas?.height || 0;

    // Lightweight particle system (only 15 particles)
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * getCanvasWidth();
        this.y = Math.random() * getCanvasHeight();
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
        this.alpha = 0;
      }

      draw(scrollActive: boolean) {
        if (!ctx) return;

        // Only animate when scrolling
        if (scrollActive) {
          this.alpha = Math.min(this.alpha + 0.05, 0.4);
          // Subtle movement on scroll
          this.x = this.baseX + Math.sin(Date.now() * 0.001 + this.baseX) * 20;
          this.y = this.baseY + Math.cos(Date.now() * 0.001 + this.baseY) * 20;
        } else {
          this.alpha = Math.max(this.alpha - 0.02, 0);
        }

        if (this.alpha > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Create fewer particles for better performance
    const particleCount = 15;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Only animate when scrolling
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.draw(isScrolling);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isScrolling]);

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Scroll-triggered canvas particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Scroll-triggered grid overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: gridOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: gridPosition,
          }}
        />
      </motion.div>

      {/* Subtle static corner accents (no animation) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500 opacity-20" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500 opacity-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500 opacity-20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-500 opacity-20" />
      </div>
    </>
  );
}
