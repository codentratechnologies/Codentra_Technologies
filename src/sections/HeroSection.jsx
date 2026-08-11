import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import UniverseBackground from '../three/UniverseBackground';
import SplitText from '../components/ui/SplitText';
import MagneticButton from '../components/ui/MagneticButton';
import { siteConfig } from '../data/siteData';

export default function HeroSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <UniverseBackground />
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          <SplitText 
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter uppercase text-white drop-shadow-2xl"
            stagger={0.08}
          >
            Engineering
          </SplitText>
          <SplitText 
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter uppercase text-gradient"
            delay={0.5}
            stagger={0.08}
          >
            The Future.
          </SplitText>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mt-8 font-light"
          >
            Award-winning digital experiences, scalable architecture, and AI-driven growth by Codentra.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton as="a" href="#projects" variant="primary">
              View Our Work
            </MagneticButton>
            <MagneticButton as="a" href="#contact" variant="secondary">
              Let's Talk
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
