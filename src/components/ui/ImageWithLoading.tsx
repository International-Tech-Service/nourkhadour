import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export default function ImageWithLoading({
  src,
  alt,
  className = '',
  placeholderClassName = ''
}: ImageWithLoadingProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div className={`${placeholderClassName} bg-surface/50 flex items-center justify-center`}>
        <span className="text-text-tertiary text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className={`${placeholderClassName} bg-surface/50 animate-pulse`} />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        decoding="async"
      />
    </>
  );
}
