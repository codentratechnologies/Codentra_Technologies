import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';

export default function UniverseBackground() {
  const ref = useRef();
  
  // Generate random points in a sphere
  const sphere = useMemo(() => {
    return inSphere(new Float32Array(5000 * 3), { radius: 15 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
      
      // Floating effect
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for glow
        />
      </Points>
      
      {/* Aurora Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#6d28d9" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00E5FF" />
    </group>
  );
}
