import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/siteData';
import Card from '../components/common/Card';
import Reveal from '../components/common/Reveal';
import { FiArrowUpRight } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal width="100%">
          <div className="section-header">
            <span className="section-badge">Case Studies</span>
            <h2 className="section-title">Selected <span className="text-gradient">Engineering Feats</span></h2>
            <p className="section-desc">
              Explore our portfolio of high-performance applications and enterprise 
              solutions delivered to clients worldwide.
            </p>
          </div>
        </Reveal>

        <motion.div 
          className="grid grid-3 projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="project-wrapper">
              <Card className="project-card" glow={true}>
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"; }} 
                  />
                  <motion.div 
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <FiArrowUpRight className="overlay-icon" />
                  </motion.div>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-client" style={{ color: "var(--color-primary)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "600" }}>Client: {project.client}</div>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
