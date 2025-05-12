import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Box, Plane, Sphere } from '@react-three/drei';

const MallScene = () => (
  <>
    {/* Floor */}
    <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <meshStandardMaterial color="#e0e0e0" />
    </Plane>
    {/* Central Atrium */}
    <Box args={[4, 2, 4]} position={[0, 1, 0]}>
      <meshStandardMaterial color="#b0c4de" />
    </Box>
    {/* Shops */}
    <Box args={[2, 1, 2]} position={[-6, 0.5, -6]}>
      <meshStandardMaterial color="#f7cac9" />
    </Box>
    <Box args={[2, 1, 2]} position={[6, 0.5, -6]}>
      <meshStandardMaterial color="#92a8d1" />
    </Box>
    <Box args={[2, 1, 2]} position={[-6, 0.5, 6]}>
      <meshStandardMaterial color="#b5ead7" />
    </Box>
    <Box args={[2, 1, 2]} position={[6, 0.5, 6]}>
      <meshStandardMaterial color="#ffdac1" />
    </Box>
    {/* Decorative Sphere */}
    <Sphere args={[0.7, 32, 32]} position={[0, 3, 0]}>
      <meshStandardMaterial color="#f6e58d" />
    </Sphere>
    {/* Lighting */}
    <ambientLight intensity={0.7} />
    <directionalLight position={[5, 10, 7]} intensity={1.2} />
    <Environment preset="city" />
  </>
);

const ThreeDMall = () => (
  <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-white">
    <Canvas camera={{ position: [8, 8, 8], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <MallScene />
        <OrbitControls enablePan enableZoom enableRotate />
      </Suspense>
    </Canvas>
  </div>
);

export default ThreeDMall; 