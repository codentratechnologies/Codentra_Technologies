import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { siteConfig } from '../data/siteData';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const orbitalVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.8,
      },
    },
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="badge">
            <span className="badge-dot"></span>
            Next-Gen Digital Engineering
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            Transforming Ideas <br />
            Into <span className="text-gradient">Powerful Solutions</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-desc">
            We architect scalable software, enterprise mobile applications, and
            immersive digital experiences designed for the next generation of
            business innovation.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta">
            <Button href="#contact" variant="primary">Launch Project</Button>
            <Button href="#services" variant="glass">Our Expertise</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={orbitalVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="orbital-system">
            {/* Central Hub */}
            <div className="logo-center-wrapper">
              <div className="logo-pulse"></div>
              <div className="logo-center">
                <img src="/images/logo-removed-bg.png" alt={siteConfig.name} className="center-logo" />
              </div>
            </div>

            {/* Orbital Rings */}
            <div className="orbital orbit-1"></div>
            <div className="orbital orbit-2"></div>
            <div className="orbital orbit-3"></div>

            {/* Dynamic Tech Nodes */}
            <div className="tech-node node-1">React</div>
            <div className="tech-node node-2">Python</div>
            <div className="tech-node node-3">Cloud</div>
            <div className="tech-node node-4">Node.js</div>
            <div className="tech-node node-5">AI/ML</div>
            <div className="tech-node node-6">DevOps</div>

            {/* Ambient Particles */}
            <div className="particle p-1"></div>
            <div className="particle p-2"></div>
            <div className="particle p-3"></div>
            <div className="particle p-4"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
