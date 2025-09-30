import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Thermometer, 
  Activity, 
  Users, 
  AlertTriangle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { ImpactScenario } from '../../context/AppContext';

interface ImpactResultsProps {
  scenario: ImpactScenario;
}

function ImpactResults({ scenario }: ImpactResultsProps) {
  const effects = scenario.effects;
  
  const resultItems = [
    {
      label: 'Crater Diameter',
      value: `${effects.craterDiameter} km`,
      icon: Target,
      color: '#8B0000',
      description: 'Main impact crater size'
    },
    {
      label: 'Blast Radius',
      value: `${effects.blastRadius} km`,
      icon: Zap,
      color: '#FF4444',
      description: 'Destructive blast zone'
    },
    {
      label: 'Thermal Radius',
      value: `${effects.thermalRadius} km`,
      icon: Thermometer,
      color: '#FF6B35',
      description: 'Thermal radiation zone'
    },
    {
      label: 'Seismic Magnitude',
      value: `${effects.seismicMagnitude.toFixed(1)}`,
      icon: Activity,
      color: '#9B59B6',
      description: 'Earthquake magnitude'
    },
    {
      label: 'Affected Population',
      value: effects.affectedPopulation.toLocaleString(),
      icon: Users,
      color: '#00D4FF',
      description: 'People in impact zones'
    },
    {
      label: 'Estimated Casualties',
      value: effects.estimatedCasualties.toLocaleString(),
      icon: AlertTriangle,
      color: '#FF4444',
      description: 'Potential fatalities'
    }
  ];

  const getThreatLevel = () => {
    if (effects.estimatedCasualties > 1000000) return 'critical';
    if (effects.estimatedCasualties > 100000) return 'high';
    if (effects.estimatedCasualties > 10000) return 'medium';
    return 'low';
  };

  const threatLevel = getThreatLevel();

  return (
    <motion.div 
      className="impact-results"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header">
        <h3 className="results-title">
          <TrendingUp size={20} />
          Impact Analysis Results
        </h3>
        <div className="impact-location">
          <MapPin size={16} />
          <span>{scenario.location.name}</span>
        </div>
      </div>

      <div className="threat-indicator">
        <div className={`threat-badge threat-${threatLevel}`}>
          <AlertTriangle size={16} />
          <span>Threat Level: {threatLevel.toUpperCase()}</span>
        </div>
      </div>

      <div className="results-grid">
        {resultItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={index}
              className="result-card"
              style={{ '--item-color': item.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="result-header">
                <IconComponent className="result-icon" size={18} />
                <span className="result-label">{item.label}</span>
              </div>
              <div className="result-value">{item.value}</div>
              <div className="result-description">{item.description}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mitigation-preview">
        <h4 className="mitigation-title">Mitigation Options</h4>
        <div className="mitigation-options">
          <div className="mitigation-option">
            <div className="option-header">
              <strong>Deflection Mission</strong>
              <span className="success-rate">
                {(scenario.mitigationOptions.deflection.probability * 100).toFixed(0)}% success rate
              </span>
            </div>
            <div className="option-details">
              <span>Time required: {scenario.mitigationOptions.deflection.timeRequired} days</span>
              <span>Estimated cost: ${scenario.mitigationOptions.deflection.cost}B USD</span>
            </div>
          </div>
          
          <div className="mitigation-option">
            <div className="option-header">
              <strong>Evacuation Plan</strong>
              <span className={`feasibility ${scenario.mitigationOptions.evacuation.feasible ? 'feasible' : 'not-feasible'}`}>
                {scenario.mitigationOptions.evacuation.feasible ? 'Feasible' : 'Not Feasible'}
              </span>
            </div>
            <div className="option-details">
              <span>Time required: {scenario.mitigationOptions.evacuation.timeRequired} days</span>
              <span>Lives saved: {scenario.mitigationOptions.evacuation.livesToSave.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ImpactResults;