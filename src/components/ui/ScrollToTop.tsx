import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg glow-hover z-40 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </motion.button>
  );
}
