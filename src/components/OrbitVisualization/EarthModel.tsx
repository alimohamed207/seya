import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function EarthModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // In a real implementation, you would load actual Earth textures
  // For now, we'll create a simple Earth-like appearance
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Rotate Earth
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 32]} />
      <meshPhongMaterial 
        color="#4A90E2"
        shininess={30}
        transparent
        opacity={0.9}
      />
      {/* Atmosphere glow effect */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </mesh>
  );
}

export default EarthModel;