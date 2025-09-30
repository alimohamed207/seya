import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { AsteroidData } from '../../context/AppContext';

interface AsteroidModelProps {
  asteroidData: AsteroidData;
}

function AsteroidModel({ asteroidData }: AsteroidModelProps) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  
  // Calculate orbital parameters
  const { semiMajorAxis, eccentricity, inclination } = asteroidData.orbitData;
  const scaledSemiMajor = semiMajorAxis * 3; // Scale for visualization
  const semiMinorAxis = scaledSemiMajor * Math.sqrt(1 - eccentricity * eccentricity);
  
  // Generate orbit path points
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      const r = (scaledSemiMajor * (1 - eccentricity * eccentricity)) / 
                (1 + eccentricity * Math.cos(angle));
      
      const x = r * Math.cos(angle);
      const y = 0;
      const z = r * Math.sin(angle) * Math.cos(inclination * Math.PI / 180);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, [scaledSemiMajor, eccentricity, inclination]);

  useFrame((state, delta) => {
    time.current += delta * 0.5; // Control orbital speed
    
    if (asteroidRef.current) {
      // Calculate current position on elliptical orbit
      const angle = time.current;
      const r = (scaledSemiMajor * (1 - eccentricity * eccentricity)) / 
                (1 + eccentricity * Math.cos(angle));
      
      const x = r * Math.cos(angle);
      const y = Math.sin(angle) * 0.2; // Small Y oscillation
      const z = r * Math.sin(angle) * Math.cos(inclination * Math.PI / 180);
      
      asteroidRef.current.position.set(x, y, z);
      asteroidRef.current.rotation.x += delta;
      asteroidRef.current.rotation.y += delta * 0.7;
    }
  });

  const asteroidSize = Math.max(0.02, asteroidData.diameter * 0.02);

  return (
    <group>
      {/* Orbit path */}
      <Line
        points={orbitPoints}
        color="#00D4FF"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      
      {/* Asteroid */}
      <mesh ref={asteroidRef}>
        <dodecahedronGeometry args={[asteroidSize]} />
        <meshPhongMaterial 
          color="#8B4513"
          shininess={5}
          roughness={0.8}
        />
      </mesh>
      
      {/* Asteroid trail effect */}
      <mesh ref={asteroidRef}>
        <sphereGeometry args={[asteroidSize * 2]} />
        <meshBasicMaterial 
          color="#FF6B35"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default AsteroidModel;