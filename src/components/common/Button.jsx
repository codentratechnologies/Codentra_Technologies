import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      href={href} 
      className={`btn btn-${variant} ${className}`} 
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-glow"></span>
    </Component>
  );
};

export default Button;
