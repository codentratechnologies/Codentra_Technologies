import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/common/Reveal';
import './Roadmap.css';

const Roadmap = () => {
  const steps = [
    { year: 'Phase 1', title: 'Conceptualization', desc: 'Defining the product vision, market fit, and technical architecture.' },
    { year: 'Phase 2', title: 'Engineering', desc: 'High-fidelity development, rigorous testing, and performance optimization.' },
    { year: 'Phase 3', title: 'Deployment', desc: 'Secure cloud infrastructure setup and global product launch.' },
    { year: 'Phase 4', title: 'Scale', desc: 'Continuous integration, feature expansion, and user-driven evolution.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <Reveal width="100%">
          <div className="section-header">
            <span className="section-badge">Growth Strategy</span>
            <h2 className="section-title">Our Engineering <span className="text-gradient">Roadmap</span></h2>
          </div>
        </Reveal>

        <motion.div
          className="roadmap-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="roadmap-item">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content glass">
                <span className="roadmap-year">{step.year}</span>
                <h3 className="roadmap-title">{step.title}</h3>
                <p className="roadmap-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;
