import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Info } from 'lucide-react';

function OrbitControls3D() {
  const { state } = useAppContext();

  return (
    <div className="orbit-controls">
      <motion.div 
        className="control-panel glass-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="control-title">Orbit Controls</h3>

        <div className="asteroid-details">
          <h4 className="details-title">
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