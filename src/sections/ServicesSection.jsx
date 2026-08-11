import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '../data/siteData';
import { FiMonitor, FiSmartphone, FiLayers, FiCode, FiDatabase, FiCloud, FiLayout, FiCpu } from 'react-icons/fi';
import MagneticButton from '../components/ui/MagneticButton';
import { cn } from '../utils/cn';

const iconMap = {
  FiMonitor, FiSmartphone, FiLayers, FiCode, FiDatabase, FiCloud, FiLayout, FiCpu
};

const ServiceCard = ({ service, index, total }) => {
  const Icon = iconMap[service.icon];
  
  // Calculate unique colors based on index
  const colors = [
    'from-blue-500/20', 'from-purple-500/20', 'from-cyan-500/20', 
    'from-emerald-500/20', 'from-rose-500/20', 'from-amber-500/20',
    'from-indigo-500/20', 'from-fuchsia-500/20'
  ];
  
  const gradientColor = colors[index % colors.length];

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className={cn("absolute inset-0 bg-background z-0")} />
      <div className={cn("absolute inset-0 bg-gradient-to-br via-background to-background z-0 opacity-50", gradientColor)} />
      
      {/* Animated Elements in bg */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] border border-white/5 rounded-full z-0"
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-primary font-heading tracking-widest font-bold">
            <span>0{index + 1}</span>
            <div className="w-12 h-px bg-primary" />
            <span className="uppercase">{service.title}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
            {service.title}
          </h2>
          
          <p className="text-xl text-white/70 leading-relaxed max-w-xl">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            {service.tech.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-white/10 glass text-sm font-medium">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-8">
            <MagneticButton variant="secondary" className="group">
              Explore {service.title}
            </MagneticButton>
          </div>
        </div>

        {/* Right: Visual/Icon */}
        <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            viewport={{ once: false, margin: "-200px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-64 h-64 md:w-96 md:h-96 rounded-full glass border-white/20 flex items-center justify-center relative group"
          >
            {Icon && <Icon className="w-32 h-32 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />}
            
            {/* Orbiting rings */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] border border-white/10 rounded-full border-dashed"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-40px] border border-primary/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-background">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} total={services.length} />
      ))}
    </section>
  );
}
