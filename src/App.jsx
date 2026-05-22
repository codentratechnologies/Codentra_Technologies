import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import CursorGlow from './components/common/CursorGlow';
import Reveal from './components/common/Reveal';
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
        <div className="marquee-container">
          <motion.div
            className="marquee-content"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <motion.span
                key={i}
                className="marquee-item"
                whileHover={{ color: "var(--color-primary)", scale: 1.1, opacity: 1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <About />
        <Services />
        <WhyChooseUs />

        <div className="cta-divider section">
          <div className="container">
            <Reveal width="100%">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card cta-card"
              >
                <h2>{ctaContent.title}</h2>
                <p>{ctaContent.desc}</p>
                <a href={ctaContent.href} className="btn btn-primary">{ctaContent.btnText}</a>
              </motion.div>
            </Reveal>
          </div>
        </div>

        <Projects />
        <Testimonials />
        <Roadmap />
        <Contact />
      </main>

      <Footer />

      {/* Scroll to Top */}
      <motion.button
        className="scroll-top glass"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)" }}
      >
        ↑
      </motion.button>
    </div>
  );
};

export default App;
