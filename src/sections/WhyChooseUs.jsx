import React from 'react';
import { FiCpu, FiShield, FiZap, FiTarget } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    { icon: <FiCpu />, title: 'Scalable Architecture', desc: 'We build systems that grow with your business, ensuring long-term stability and performance.' },
    { icon: <FiShield />, title: 'Enterprise Security', desc: 'Security is at the core of our development process, protecting your data and users.' },
    { icon: <FiZap />, title: 'Ultra-Fast Performance', desc: 'Optimization is our obsession. We deliver lightning-fast digital experiences.' },
    { icon: <FiTarget />, title: 'Strategic Engineering', desc: 'We don’t just code; we engineer solutions that align with your business objectives.' }
  ];

  return (
    <section className="why-section">
      <div className="why-container">
        
        <div className="why-header">
          <div className="why-subtitle">
            <span className="blue-line"></span>
            <p>THE CODENTRA ADVANTAGE</p>
          </div>
          <h2 className="why-title">
            Why Global Startups <br /> Choose Us
          </h2>
        </div>

        <div className="why-grid">
          {features.map((f, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
