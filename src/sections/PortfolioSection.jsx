import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../data/siteData';
import SplitText from '../components/ui/SplitText';
import { FiArrowUpRight } from 'react-icons/fi';
import MagneticButton from '../components/ui/MagneticButton';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative py-24 md:py-40 flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
      
      {/* Background glow for each project */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Image container with Tilt/Parallax */}
      <div className={`w-full md:w-3/5 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div 
          style={{ y }}
          className="relative rounded-2xl overflow-hidden glass border-white/10 aspect-[16/10] md:aspect-auto md:h-[600px] group-hover:border-primary/30 transition-colors duration-700"
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[0.16,1,0.3,1]" 
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center text-white/20 font-heading text-2xl">
              [Project Screenshot]
            </div>
          )}
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
        </motion.div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-2/5 flex flex-col ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="text-primary font-heading font-bold tracking-widest text-sm mb-4">
          0{index + 1} // CASE STUDY
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          {project.title}
        </h3>
        <p className="text-lg text-white/60 leading-relaxed mb-10">
          {project.desc}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-white/10 py-8">
          <div>
            <div className="text-3xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {project.statValue}
            </div>
            <div className="text-sm text-white/50">{project.statLabel}</div>
          </div>
          {project.statValue2 && (
            <div>
              <div className="text-3xl font-heading font-bold text-white mb-1 group-hover:text-accent transition-colors">
                {project.statValue2}
              </div>
              <div className="text-sm text-white/50">{project.statLabel2}</div>
            </div>
          )}
        </div>

        <div>
          <MagneticButton as="a" href={project.link || "#"} target="_blank" variant="secondary" className="inline-flex items-center gap-2">
            View Live Site <FiArrowUpRight />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default function PortfolioSection() {
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:mb-32">
          <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
            Selected Work
          </h2>
          <SplitText className="text-5xl md:text-7xl font-heading font-bold max-w-3xl leading-tight">
            Digital Experiences That <span className="text-gradient">Drive Results.</span>
          </SplitText>
        </div>

        <div className="flex flex-col">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
