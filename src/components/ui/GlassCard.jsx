import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function GlassCard({ children, className, delay = 0, hoverGlow = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {hoverGlow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
