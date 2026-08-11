import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, navLinks } from '../../data/siteData';
import MagneticButton from '../ui/MagneticButton';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500",
          scrolled ? "py-2" : "py-6"
        )}
      >
        <div className={cn(
          "max-w-7xl mx-auto flex items-center justify-between rounded-full transition-all duration-500",
          scrolled ? "glass px-6 py-3" : "px-2"
        )}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group magnetic cursor-none">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform">
              C
            </div>
            <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
              Codentra
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, i) => (
              <MagneticButton 
                key={i} 
                variant="text" 
                as="a" 
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </MagneticButton>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton 
              as="a" 
              href="#contact" 
              variant="primary"
              className="hidden sm:inline-flex px-6 py-2 text-sm"
            >
              Start Project
            </MagneticButton>
            
            <button 
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 magnetic cursor-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} 
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
                className="w-6 h-0.5 bg-white block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-background/80 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-heading font-bold text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
