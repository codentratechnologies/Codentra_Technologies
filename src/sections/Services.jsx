import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/siteData';
import Card from '../components/common/Card';
import Reveal from '../components/common/Reveal';
import * as Icons from 'react-icons/fi';
import './Services.css';

const Services = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <Reveal width="100%">
          <div className="section-header">
            <span className="section-badge">Our Expertise</span>
            <h2 className="section-title">Scaling Businesses with <span className="text-gradient">Core Technology</span></h2>
            <p className="section-desc">
              We provide end-to-end engineering solutions that bridge the gap between 
              complex business requirements and high-performance digital products.
            </p>
          </div>
        </Reveal>

        <motion.div 
          className="grid grid-4 services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon];
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="service-card" glow={true}>
                  <div className="service-icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.desc}</p>
                  <div className="service-link">
                    Learn More <Icons.FiArrowRight />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
