import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import TechGlobe from '../three/TechGlobe';
import SplitText from '../components/ui/SplitText';

export default function TechnologiesSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen bg-background flex flex-col items-center justify-center overflow-hidden py-20">
      
      <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none px-6">
        <h2 className="text-xl text-primary uppercase tracking-widest font-semibold font-heading mb-4">
          Technologies
        </h2>
        <SplitText className="text-4xl md:text-5xl font-heading font-bold">
          The Engine of <span className="text-gradient">Innovation</span>
        </SplitText>
      </div>

      <div className="w-full h-full relative z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center text-primary/50">
            Initializing Core Systems...
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <TechGlobe />
          </Canvas>
        </Suspense>
      </div>

    </section>
  );
}
