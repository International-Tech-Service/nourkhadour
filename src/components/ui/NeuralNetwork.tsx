import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  layer: number;
  activated: boolean;
  activationTime: number;
}

interface Connection {
  from: Node;
  to: Node;
  weight: number;
  active: boolean;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const isInView = useInView(containerRef, { margin: '200px' });
  const mouseRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

    const getCanvasWidth = () => canvas?.width || 0;
    const getCanvasHeight = () => canvas?.height || 0;

    // Create neural network structure
    const layers = [5, 8, 8, 5]; // 4 layers
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    // Create nodes for each layer
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = (getCanvasWidth() / (layers.length + 1)) * (layerIndex + 1);
      const spacing = getCanvasHeight() / (nodeCount + 1);

      for (let i = 0; i < nodeCount; i++) {
        const y = spacing * (i + 1);
        nodes.push({
          x: layerX,
          y: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          layer: layerIndex,
          activated: false,
          activationTime: 0,
        });
      }
    });

    // Create connections between adjacent layers
    let nodeIndex = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNodes = nodes.slice(nodeIndex, nodeIndex + layers[l]);
      const nextLayerNodes = nodes.slice(nodeIndex + layers[l], nodeIndex + layers[l] + layers[l + 1]);

      currentLayerNodes.forEach(fromNode => {
        nextLayerNodes.forEach(toNode => {
          connections.push({
            from: fromNode,
            to: toNode,
            weight: Math.random(),
            active: false,
          });
        });
      });

      nodeIndex += layers[l];
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Activate nodes near mouse
      nodes.forEach(node => {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          node.activated = true;
          node.activationTime = Date.now();

          // Activate connected nodes
          connections.forEach(conn => {
            if (conn.from === node || conn.to === node) {
              conn.active = true;
              if (conn.to !== node) {
                conn.to.activated = true;
                conn.to.activationTime = Date.now();
              }
            }
          });
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Auto-activation wave
    let waveTime = 0;
    const activateWave = () => {
      const currentLayer = Math.floor(waveTime) % layers.length;
      nodes.forEach(node => {
        if (node.layer === currentLayer) {
          node.activated = true;
          node.activationTime = Date.now();

          // Activate connections
          connections.forEach(conn => {
            if (conn.from === node) {
              conn.active = true;
            }
          });
        }
      });
      waveTime += 0.015;
    };

    let animationId: number;

    const animate = () => {
      if (!isActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, getCanvasWidth(), getCanvasHeight());

      const now = Date.now();

      // Auto-activate waves
      activateWave();

      // Deactivate old activations
      nodes.forEach(node => {
        if (node.activated && now - node.activationTime > 1500) {
          node.activated = false;
        }
      });

      connections.forEach(conn => {
        if (conn.active && (!conn.from.activated && !conn.to.activated)) {
          conn.active = false;
        }
      });

      // Update and draw connections
      connections.forEach(conn => {
        const alpha = conn.active ? 0.6 : 0.15;
        const color = conn.active ? '#8b5cf6' : '#444';

        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = conn.active ? 2 : 1;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Draw signal particles on active connections
        if (conn.active) {
          const progress = ((now - conn.from.activationTime) % 1000) / 1000;
          const x = conn.from.x + (conn.to.x - conn.from.x) * progress;
          const y = conn.from.y + (conn.to.y - conn.from.y) * progress;

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7';
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Update and draw nodes
      nodes.forEach(node => {
        // Subtle floating movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce back to original position
        const originalX = (getCanvasWidth() / (layers.length + 1)) * (node.layer + 1);
        node.vx += (originalX - node.x) * 0.0005;
        node.vy *= 0.99;

        // Keep within bounds
        if (node.y < 50 || node.y > getCanvasHeight() - 50) {
          node.vy *= -1;
        }

        // Draw node
        const radius = node.activated ? 8 : 5;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);

        if (node.activated) {
          gradient.addColorStop(0, '#a855f7');
          gradient.addColorStop(0.5, '#8b5cf6');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

          // Glow effect
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
          ctx.fill();
        } else {
          gradient.addColorStop(0, '#666');
          gradient.addColorStop(1, '#333');
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node border
        ctx.strokeStyle = node.activated ? '#a855f7' : '#555';
        ctx.lineWidth = node.activated ? 2 : 1;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ opacity }}
    >
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none" />

      {/* Info text */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs font-mono text-purple-400 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
      >
        NEURAL NETWORK ACTIVE // HOVER TO INTERACT
      </motion.div>
    </motion.div>
  );
}

// Preload function for loading screen
export const preloadNeuralNetwork = () => {
  // This function can be called during loading to initialize any resources
  return new Promise((resolve) => {
    // Simulate preload (neural network is lightweight, no external resources)
    setTimeout(resolve, 100);
  });
};
