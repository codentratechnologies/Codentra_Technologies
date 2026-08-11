import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, OrbitControls } from '@react-three/drei';
import { techStack } from '../data/siteData';
import * as THREE from 'three';

const TechOrbit = ({ text, radius, speed, angleOffset }) => {
  const ref = useRef();
  
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() * speed + angleOffset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * (radius * 0.2); // slight wobble
    
    // Make text always face camera
    if (camera) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#00E5FF"
    >
      {text}
    </Text>
  );
};

export default function TechGlobe() {
  const globeRef = useRef();

  useFrame((_, delta) => {
    globeRef.current.rotation.y += delta * 0.1;
    globeRef.current.rotation.x += delta * 0.05;
  });

  return (
    <group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      
      {/* Central Globe */}
      <Sphere ref={globeRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial 
          color="#050505" 
          wireframe={true} 
          transparent 
          opacity={0.3} 
          emissive="#00E5FF" 
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Orbiting Tech Stack */}
      {useMemo(() => techStack.map((tech, i) => {
        const radius = 4 + Math.random() * 2;
        const speed = 0.2 + Math.random() * 0.2;
        const angleOffset = (i / techStack.length) * Math.PI * 2;
        
        return (
          <TechOrbit 
            key={tech} 
            text={tech} 
            radius={radius} 
            speed={speed} 
            angleOffset={angleOffset} 
          />
        );
      }), [])}

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#6d28d9" />
    </group>
  );
}
