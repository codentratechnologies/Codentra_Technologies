import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Reveal from '../components/common/Reveal';
import { FiCpu, FiShield, FiZap, FiTarget } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    { icon: <FiCpu />, title: 'Scalable Architecture', desc: 'We build systems that grow with your business, ensuring long-term stability and performance.' },
    { icon: <FiShield />, title: 'Enterprise Security', desc: 'Security is at the core of our development process, protecting your data and users.' },
    { icon: <FiZap />, title: 'Ultra-Fast Performance', desc: 'Optimization is our obsession. We deliver lightning-fast digital experiences.' },
    { icon: <FiTarget />, title: 'Strategic Engineering', desc: 'We don’t just code; we engineer solutions that align with your business objectives.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section className="section why-section">
      <div className="container">
        <Reveal width="100%">
          <div className="section-header">
            <span className="section-badge">The Codentra Advantage</span>
            <h2 className="section-title">Why Global Startups <br /> <span className="text-gradient">Choose Us</span></h2>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-4 why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="why-card">
                <div className="why-icon">{f.icon}</div>
                <h3 className="why-title">{f.title}</h3>
                <p className="why-desc">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
