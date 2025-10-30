import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function SkillsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const isInView = useInView(containerRef, { margin: '200px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Only animate when in view
  useEffect(() => {
    setIsActive(isInView);
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Binary rain effect
    const chars = '01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);
    const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.3);

    // Floating code snippets
    const codeSnippets = [
      'function()',
      'const',
      'let',
      '=>',
      'async',
      'await',
      'class',
      'import',
      '{...}',
      '[]',
      '</>',
      '&&',
      '||',
    ];

    class FloatingCode {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * getCanvasWidth();
        this.y = Math.random() * getCanvasHeight();
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.speed = Math.random() * 0.3 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
      }

      update() {
        this.y -= this.speed;
        if (this.y < -20) {
          this.y = getCanvasHeight() + 20;
          this.x = Math.random() * getCanvasWidth();
        }
      }

      draw() {
        if (!ctx || !canvas) return;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
      }
    }

    // Store canvas dimensions
    const getCanvasWidth = () => canvas?.width || 0;
    const getCanvasHeight = () => canvas?.height || 0;

    const floatingCodes: FloatingCode[] = [];
    for (let i = 0; i < 15; i++) {
      floatingCodes.push(new FloatingCode());
    }

    let animationId: number;

    const animate = () => {
      // Only animate when active (in view)
      if (!isActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Binary rain
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Alternate colors
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#8b5cf6';
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#06b6d4';
        } else {
          ctx.fillStyle = '#333';
        }

        ctx.globalAlpha = 0.8;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        // Reset drop
        if (y > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }

      // Floating code snippets
      floatingCodes.forEach((code) => {
        code.update();
        code.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Binary rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Static glowing orbs - no animation for performance */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Static circuit lines - no animation for performance */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
        <path
          d="M 0,100 Q 200,50 400,100 T 800,100"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
        <path
          d="M 0,200 Q 300,150 600,200 T 1200,200"
          stroke="#06b6d4"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Static side accents - no animation for performance */}
      <div className="absolute top-0 right-0 w-1 h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-10" />
      <div className="absolute bottom-0 left-0 w-1 h-20 bg-gradient-to-t from-transparent via-cyan-500 to-transparent opacity-10" />
    </motion.div>
  );
}
