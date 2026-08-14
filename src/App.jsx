import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import CursorGlow from './components/common/CursorGlow';
import Reveal from './components/common/Reveal';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ 
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
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
