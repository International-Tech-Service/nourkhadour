import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  isLowEnd: boolean;
  reducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowEnd: false,
    reducedMotion: false,
    connectionSpeed: 'unknown',
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check device performance (cores and memory)
    const isLowEnd =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      // @ts-ignore - deviceMemory is not in TypeScript types yet
      (navigator.deviceMemory && navigator.deviceMemory < 4);

    // Check connection speed
    // @ts-ignore - connection is not in TypeScript types yet
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';

    if (connection) {
      const effectiveType = connection.effectiveType;
      connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
    }

    setMetrics({
      isLowEnd,
      reducedMotion: prefersReducedMotion,
      connectionSpeed,
    });
  }, []);

  return metrics;
}
