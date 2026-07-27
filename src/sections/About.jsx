import React from 'react';
import { stats } from '../data/siteData';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-left">
        <div className="glow-effect"></div>
        <h1 className="about-heading">
          Proven <br/>
          Results. <br/>
          <span className="text-blue">Powerful</span> <br/>
          <span className="text-blue">Impact.</span>
        </h1>
      </div>
      
      <div className="about-right">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-panel">
            <div className="stat-panel-bg"></div>
            <span className="stat-index">0{idx + 1}</span>
            <div className="stat-content">
              <h2>{stat.value}</h2>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
