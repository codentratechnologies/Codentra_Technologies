import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig, stats } from '../data/siteData';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-visual">
          <Reveal delay={0.2}>
            <div className="image-stack">
              <div className="image-main glass">
                <img src={siteConfig.aboutImage} alt="Our Team" />
              </div>
              <motion.div 
                className="experience-badge animate-float"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <span className="exp-num">1+</span>
                <span className="exp-text">Years of <br /> Excellence</span>
              </motion.div>
            </div>
          </Reveal>

          <div className="about-stats-grid">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                className="stat-card glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <span className="stat-value">{stat.value}+</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="about-content">
          <Reveal delay={0.3}>
            <span className="section-badge">Our Legacy</span>
            <h2 className="section-title">Architecting the <span className="text-gradient">Next Chapter</span> of Innovation</h2>
          </Reveal>
          
          <Reveal delay={0.4}>
            <p className="about-text">
              Codentra Technologies was founded on the principle of technical uncompromising quality. 
              What started as a small collective of visionary engineers has evolved into a powerhouse 
              of digital transformation, dedicated to pushing the boundaries of what's possible in software engineering.
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <p className="about-text">
              We don't just build applications; we engineer legacies. Our approach combines 
              battle-tested architectural patterns with cutting-edge experimental technologies 
              to ensure your product isn't just relevant today, but dominant tomorrow.
            </p>
          </Reveal>
          
          <motion.div 
            className="mission-vision"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
             <motion.div variants={cardVariants} className="mv-card glass-card">
                <div className="mv-icon-wrapper">🚀</div>
                <h4>Our Mission</h4>
                <p>To bridge the gap between complex industrial challenges and elegant, scalable digital solutions that drive global impact.</p>
             </motion.div>
             <motion.div variants={cardVariants} className="mv-card glass-card">
                <div className="mv-icon-wrapper">👁️</div>
                <h4>Our Vision</h4>
                <p>To be the definitive engineering partner for the world's most ambitious startups, setting the standard for digital excellence.</p>
             </motion.div>
          </motion.div>

          <div className="about-footer-actions">
            <Reveal delay={0.7}>
              <Button href="#roadmap" variant="primary" className="about-cta">Discover Our Journey</Button>
            </Reveal>
            <Reveal delay={0.8}>
              <div className="founder-signature">
                <span className="sig-label">Built for Innovation</span>
                <div className="sig-line"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
