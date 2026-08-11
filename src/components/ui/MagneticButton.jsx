import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  as: Component = 'button',
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-300 magnetic";
  
  const variants = {
    primary: "bg-primary text-black px-8 py-4 hover:bg-white",
    secondary: "glass px-8 py-4 text-white hover:bg-white/10",
    text: "text-white hover:text-primary px-4 py-2"
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
