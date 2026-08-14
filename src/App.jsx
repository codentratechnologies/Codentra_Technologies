import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/layout/Navbar';
import CursorGlow from './components/common/CursorGlow';
import Reveal from './components/common/Reveal';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ 
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  limitCallbacks: true,
  syncInterval: 40
});
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import Roadmap from './sections/Roadmap';
import Contact from './sections/Contact';
import Footer from './components/layout/Footer';
import { techStack, ctaContent } from './data/siteData';
import './App.css';

const App = () => {
  useEffect(() => {
    // Ultra-Smooth Scroll Engine initialized with hardware optimization
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Synchronize Lenis with GSAP ScrollTrigger ticker for buttery 60fps/120fps frame rates
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-wrapper">


      <CursorGlow />
      <Navbar />

      <main>
        <Hero />

        {/* Tech Stack Marquee */}
        <div className="marquee-container" style={{ margin: '1.5rem 0', overflow: 'hidden' }}>
          <motion.div
            className="marquee-content"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ display: 'flex' }}
          >
            {Array(10).fill("Code Ka मंत्रा - Codentra").map((text, i) => (
              <motion.span
                key={i}
                className="marquee-item"
                whileHover={{ color: "#ffffff", scale: 1.1, opacity: 1 }}
                style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00E5FF', whiteSpace: 'nowrap' }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <About />
        <Services />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <Roadmap />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
