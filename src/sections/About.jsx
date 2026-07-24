import React from 'react';
import { stats } from '../data/siteData';
import './About.css';

const About = () => {
  // Vibrant blue gradient colors for the stat panels
  const panelColors = ['#00E5FF', '#1c3faa', '#102a83', '#061a5c'];
  
  return (
    <section id="about" className="about-section">
      <div className="about-left">
        <h1 className="about-heading">
          Proven <br/>
          Results. <br/>
          <span className="text-blue">Powerful</span> <br/>
          <span className="text-blue">Impact.</span>
        </h1>
      </div>
      
      <div className="about-right">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="stat-panel" 
            style={{ backgroundColor: panelColors[idx % panelColors.length] }}
          >
            <div className="stat-panel-bg"></div>
            <span className="stat-index">0{idx + 1}</span>
            <div className="stat-content">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
