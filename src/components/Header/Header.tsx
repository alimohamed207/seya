import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Shield, BarChart3 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

function Header() {
  const { state, dispatch } = useAppContext();

  const userModes = [
    { id: 'educator', label: 'Educator', icon: Users, color: '#00D4FF' },
    { id: 'scientist', label: 'Scientist', icon: BarChart3, color: '#FF6B35' },
    { id: 'policymaker', label: 'Policymaker', icon: Shield, color: '#9B59B6' }
  ];

  const handleModeChange = (mode: 'educator' | 'scientist' | 'policymaker') => {
    dispatch({ type: 'SET_USER_MODE', payload: mode });
  };

  return (
    <header className="header">
      <div className="header-content">
        <motion.div 
          className="logo-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo">
            <img 
              src="/assets/images/nasa-logo.svg" 
              alt="NASA AS25 - Asteroid Impact Visualization System" 
              className="logo-svg"
              width="60"
              height="60"
            />
            <div className="logo-text">
              <h1>Seya</h1>
              <span className="subtitle">Impactor-2025 Threats Visualization</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mode-selector"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="mode-label">User Mode:</span>
          <div className="mode-buttons">
            {userModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <button
                  key={mode.id}
                  className={`mode-btn ${state.userMode === mode.id ? 'active' : ''}`}
                  onClick={() => handleModeChange(mode.id as any)}
                  style={{
                    '--mode-color': mode.color
                  } as React.CSSProperties}
                >
                  <IconComponent size={18} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Header;