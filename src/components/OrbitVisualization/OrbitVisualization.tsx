import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useAppContext } from '../../context/AppContext';
import OrbitControls3D from './OrbitControls3D';
import EarthModel from './EarthModel';
import AsteroidModel from './AsteroidModel';
import './OrbitVisualization.css';

function OrbitVisualization() {
  const { state } = useAppContext();

  return (
    <motion.div 
      className="orbit-visualization"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="visualization-header">
        <h2 className="visualization-title">3D Orbit Visualization</h2>
        <p className="visualization-subtitle">
          Real-time view of {state.currentAsteroid.name} trajectory around Earth
        </p>
      </div>

      <div className="visualization-container">
        <div className="canvas-wrapper">
          <Canvas
            camera={{ position: [10, 5, 10], fov: 60 }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              <Stars 
                radius={300}
                depth={50}
                count={1000}
                factor={4}
                saturation={0}
                fade
              />
              
              <EarthModel />
              <AsteroidModel asteroidData={state.currentAsteroid} />
              
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={50}
              />
            </Suspense>
          </Canvas>
        </div>
        
        <OrbitControls3D />
      </div>
    </motion.div>
  );
}

export default OrbitVisualization;