import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-8 z-10">
            {/* Logo Mark */}
            <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-primary"
                initial={{ height: "0%" }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10 text-white font-bold text-2xl mix-blend-difference">C</span>
            </div>
            
            {/* Percentage */}
            <div className="text-5xl font-heading font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
              {Math.min(progress, 100)}%
            </div>
          </div>
          
          {/* Background Glow */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-96 h-96 bg-primary rounded-full blur-[120px] pointer-events-none opacity-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
