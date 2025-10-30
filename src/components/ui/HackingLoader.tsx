import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadNeuralNetwork } from './NeuralNetwork';

interface HackingLoaderProps {
  onComplete: () => void;
}

export default function HackingLoader({ onComplete }: HackingLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('INITIALIZING');
  const [showMatrix, setShowMatrix] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const statusMessages = [
    'INITIALIZING SYSTEM',
    'LOADING MODULES',
    'COMPILING ASSETS',
    'PRELOADING NEURAL NETWORK',
    'ESTABLISHING CONNECTION',
    'DECRYPTING DATA',
    'VERIFYING IDENTITY',
    'LAUNCHING INTERFACE',
    'ACCESS GRANTED',
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Purple for some chars
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#8b5cf6';
        } else {
          ctx.fillStyle = '#0f0';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Progress animation with preloading
  useEffect(() => {
    // Preload neural network at 40% progress
    const preloadAt = 40;
    let preloaded = false;

    const duration = 3000; // 3 seconds
    const steps = 100;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;

      // Preload neural network
      if (currentProgress >= preloadAt && !preloaded) {
        preloaded = true;
        preloadNeuralNetwork();
      }

      // Random glitch in numbers
      const glitchChance = Math.random();
      if (glitchChance > 0.9) {
        setProgress(Math.floor(Math.random() * 100));
        setTimeout(() => setProgress(currentProgress), 50);
      } else {
        setProgress(currentProgress);
      }

      // Update status message
      const messageIndex = Math.floor((currentProgress / 100) * statusMessages.length);
      setGlitchText(statusMessages[Math.min(messageIndex, statusMessages.length - 1)]);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setShowMatrix(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Glitch effect on numbers
  const glitchNumber = (num: number) => {
    const glitchChars = ['#', '@', '$', '%', '&', '*', '!', '?'];
    if (Math.random() > 0.85) {
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return num;
  };

  return (
    <AnimatePresence>
      {showMatrix && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Matrix rain background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-40"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          {/* Loading content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Main counter */}
            <div className="relative">
              <motion.div
                className="text-9xl font-mono font-bold text-green-400 glitch-text"
                animate={{
                  textShadow: [
                    '0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0',
                    '0 0 20px #8b5cf6, 0 0 30px #8b5cf6, 0 0 40px #8b5cf6',
                    '0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {String(progress).padStart(2, '0')}
                <span className="text-purple-500">%</span>
              </motion.div>

              {/* Glitching overlay numbers */}
              <motion.div
                className="absolute inset-0 text-9xl font-mono font-bold text-red-500 opacity-30"
                animate={{
                  x: [0, -2, 2, -2, 0],
                  opacity: [0, 0.3, 0, 0.3, 0],
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
              >
                {String(glitchNumber(progress)).padStart(2, '0')}%
              </motion.div>
            </div>

            {/* Status text */}
            <div className="h-8">
              <motion.div
                key={glitchText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-mono text-green-400 tracking-widest"
              >
                {'> '}{glitchText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-96 max-w-[90vw] mx-auto">
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden border border-green-900">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 via-purple-500 to-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  style={{
                    boxShadow: '0 0 10px #0f0, 0 0 20px #8b5cf6',
                  }}
                />
              </div>

              {/* Binary data stream */}
              <div className="mt-4 font-mono text-xs text-green-600 opacity-50 overflow-hidden">
                <motion.div
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="whitespace-nowrap"
                >
                  {Array.from({ length: 50 }, () =>
                    Math.random() > 0.5 ? '1' : '0'
                  ).join(' ')}
                </motion.div>
              </div>
            </div>

            {/* Scanning lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />
            </motion.div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-green-400 opacity-30" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500 opacity-30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-500 opacity-30" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-green-400 opacity-30" />
          </div>

          {/* Terminal info at bottom */}
          <div className="absolute bottom-8 left-0 right-0 text-center font-mono text-xs text-green-600 opacity-50">
            <div>NOUR KHADOUR // PORTFOLIO v2.0</div>
            <div className="mt-1">SYSTEM STATUS: LOADING...</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
