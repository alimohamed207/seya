import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  Target, 
  Zap,
  TrendingUp,
  Users,
  Globe,
  Shield
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import './Dashboard.css';

function Dashboard() {
  const { state } = useAppContext();
  const [timeToImpact, setTimeToImpact] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const approachDate = new Date(state.currentAsteroid.closeApproachDate);
      const timeDiff = approachDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeToImpact(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeToImpact('Impact occurred');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [state.currentAsteroid.closeApproachDate]);

  const alertCards = [
    {
      id: 1,
      type: 'critical',
      title: 'High-Risk Asteroid Detected',
      message: `${state.currentAsteroid.name} poses a significant threat to Earth`,
      icon: AlertTriangle,
      color: '#FF4444'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Close Approach Imminent',
      message: `Closest approach in ${timeToImpact}`,
      icon: Clock,
      color: '#FF6B35'
    },
    {
      id: 3,
      type: 'info',
      title: 'Mitigation Options Available',
      message: 'Multiple response strategies identified',
      icon: Shield,
      color: '#00D4FF'
    }
  ];

  const statsCards = [
    {
      label: 'Asteroid Diameter',
      value: `${state.currentAsteroid.diameter} km`,
      icon: Target,
      trend: '+0.1km (refined estimate)',
      color: '#00D4FF'
    },
    {
      label: 'Approach Velocity',
      value: `${state.currentAsteroid.velocity} km/s`,
      icon: Zap,
      trend: 'Relative to Earth',
      color: '#FF6B35'
    },
    {
      label: 'Minimum Distance',
      value: `${(state.currentAsteroid.distance * 149.6).toFixed(1)}M km`,
      icon: Globe,
      trend: `${state.currentAsteroid.distance} AU`,
      color: '#9B59B6'
    },
    {
      label: 'Threat Level',
      value: state.currentAsteroid.threatLevel.toUpperCase(),
      icon: TrendingUp,
      trend: 'Based on size & trajectory',
      color: state.currentAsteroid.threatLevel === 'high' ? '#FF4444' : '#00D4FF'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h2 className="dashboard-title">Mission Control Dashboard</h2>
        <p className="dashboard-subtitle">
          Real-time monitoring of {state.currentAsteroid.name} and threat assessment
        </p>
      </motion.div>

      <div className="dashboard-grid">
        <motion.div className="alerts-section" variants={itemVariants}>
          <h3 className="section-title">Active Alerts</h3>
          <div className="alerts-container">
            {alertCards.map((alert, index) => {
              const IconComponent = alert.icon;
              return (
                <motion.div
                  key={alert.id}
                  className={`alert-card ${alert.type}`}
                  style={{ '--alert-color': alert.color } as React.CSSProperties}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <IconComponent className="alert-icon" />
                  <div className="alert-content">
                    <h4 className="alert-title">{alert.title}</h4>
                    <p className="alert-message">{alert.message}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div className="stats-section" variants={itemVariants}>
          <h3 className="section-title">Asteroid Statistics</h3>
          <div className="stats-grid">
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  style={{ '--stat-color': stat.color } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="stat-header">
                    <IconComponent className="stat-icon" />
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-trend">{stat.trend}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div className="info-panel" variants={itemVariants}>
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn primary">
              <Globe size={20} />
              View 3D Orbit
            </button>
            <button className="action-btn secondary">
              <Target size={20} />
              Run Impact Simulation
            </button>
            <button className="action-btn danger">
              <Shield size={20} />
              Evaluate Mitigation
            </button>
          </div>
          
          <div className="asteroid-info">
            <h4>About {state.currentAsteroid.name}</h4>
            <p>
              This Near-Earth Object was recently classified as a potentially hazardous asteroid 
              due to its size and close approach distance. Continuous monitoring and impact 
              assessment are critical for public safety and decision-making.
            </p>
            
            <div className="orbital-elements">
              <h5>Orbital Elements</h5>
              <div className="element-grid">
                <div className="element">
                  <span className="element-label">Semi-major axis:</span>
                  <span className="element-value">{state.currentAsteroid.orbitData.semiMajorAxis} AU</span>
                </div>
                <div className="element">
                  <span className="element-label">Eccentricity:</span>
                  <span className="element-value">{state.currentAsteroid.orbitData.eccentricity}</span>
                </div>
                <div className="element">
                  <span className="element-label">Inclination:</span>
                  <span className="element-value">{state.currentAsteroid.orbitData.inclination}°</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;