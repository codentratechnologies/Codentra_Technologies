import React from 'react';
import { roadmapData } from '../data/siteData';
import './Roadmap.css';

const Roadmap = () => {
  return (
    <section id="roadmap" className="roadmap-section">
      <div className="roadmap-container">
        
        <div className="section-header">
          <div className="section-header-label">
            <span className="dot"></span>
            <p>Our Approach</p>
          </div>
          <h2>How we turn <br/> ideas into reality.</h2>
        </div>
        
        <div className="bento-grid">
          {roadmapData.map((data, idx) => (
            <div 
              key={idx} 
              className="bento-item"
            >
              <div className="bento-card-inner">
                <span className="bento-num">0{idx + 1}</span>

                <div className="bento-card-top">
                  <span className="bento-phase">{data.phase}</span>
                </div>
                
                <div className="bento-card-content">
                  <h3>{data.title}</h3>
                  <ul className="bento-list">
                    {data.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bento-glow"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Roadmap;
