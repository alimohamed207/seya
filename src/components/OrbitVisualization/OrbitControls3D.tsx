import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Info } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

function OrbitControls3D() {
  const { state } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="orbit-controls">
      <motion.div 
        className="control-panel glass-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="control-title">Orbit Controls</h3>
        
        <div className="control-section">
          <label className="control-label">Animation</label>
          <div className="control-buttons">
            <button 
              className={`control-btn ${isPlaying ? 'active' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="control-btn">
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="control-section">
          <label className="control-label">Time Scale</label>
          <div className="slider-container">
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={timeScale}
              onChange={(e) => setTimeScale(parseFloat(e.target.value))}
              className="time-slider"
            />
            <span className="slider-value">{timeScale}x</span>
          </div>
        </div>

        <div className="control-section">
          <label className="control-label">View Options</label>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showInfo}
                onChange={(e) => setShowInfo(e.target.checked)}
              />
              <span className="checkmark"></span>
              Show Info Labels
            </label>
          </div>
        </div>

        <div className="asteroid-details">
          <h4 className="details-title">
            <Zap size={16} />
            {state.currentAsteroid.name}
          </h4>
          
          <div className="detail-item">
            <span className="detail-label">Diameter:</span>
            <span className="detail-value">{state.currentAsteroid.diameter} km</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Velocity:</span>
            <span className="detail-value">{state.currentAsteroid.velocity} km/s</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Distance:</span>
            <span className="detail-value">{state.currentAsteroid.distance} AU</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Threat Level:</span>
            <span className={`detail-value threat-${state.currentAsteroid.threatLevel}`}>
              {state.currentAsteroid.threatLevel.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="info-section">
          <div className="info-header">
            <Info size={16} />
            <span>Navigation Tips</span>
          </div>
          <ul className="info-list">
            <li>Mouse wheel: Zoom in/out</li>
            <li>Left drag: Rotate view</li>
            <li>Right drag: Pan camera</li>
            <li>Double-click: Reset view</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default OrbitControls3D;