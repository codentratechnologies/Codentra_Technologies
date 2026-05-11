import React from 'react';
import './Card.css';

const Card = ({ children, className = '', glow = false }) => {
  return (
    <div className={`premium-card glass-card ${glow ? 'glow-effect' : ''} ${className}`}>
      <div className="card-inner">
        {children}
      </div>
      <div className="card-border"></div>
    </div>
  );
};

export default Card;
