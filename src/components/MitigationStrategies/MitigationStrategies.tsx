import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Rocket, Users, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import StrategyComparison from './StrategyComparison';
import './MitigationStrategies.css';

function MitigationStrategies() {
  const { state, dispatch } = useAppContext();

  const strategies = [
    {
      id: 'deflection',
      name: 'Asteroid Deflection',
      icon: Rocket,
      color: '#00D4FF',
      description: 'Use kinetic impactor or gravity tractor to alter asteroid trajectory',
      effectiveness: 85,
      timeRequired: 180,
      cost: 2.5,
      riskLevel: 'Medium',
      advantages: [
        'Prevents impact entirely if successful',
        'Proven technology (DART mission)',
        'No population displacement required'
      ],
      disadvantages: [
        'Requires significant lead time',
        'Complex space mission logistics',
        'Success not guaranteed'
      ]
    },
    {
      id: 'nuclear',
      name: 'Nuclear Disruption',
      icon: Zap,
      color: '#FF6B35',
      description: 'Fragment asteroid using nuclear device to reduce impact severity',
      effectiveness: 95,
      timeRequired: 120,
      cost: 5.0,
      riskLevel: 'High',
      advantages: [
        'High probability of success',
        'Can work with shorter lead times',
        'Existing nuclear technology'
      ],
      disadvantages: [
        'May create multiple smaller impacts',
        'International treaty complications',
        'Radioactive contamination risk'
      ]
    },
    {
      id: 'evacuation',
      name: 'Mass Evacuation',
      icon: Users,
      color: '#9B59B6',
      description: 'Evacuate population from predicted impact zones',
      effectiveness: 70,
      timeRequired: 30,
      cost: 10.0,
      riskLevel: 'Low',
      advantages: [
        'Saves lives with certainty',
        'No space mission required',
        'Can be implemented quickly'
      ],
      disadvantages: [
        'Massive logistical challenge',
        'Economic and social disruption',
        'Impact still occurs'
      ]
    }
  ];

  const handleStrategySelect = (strategyId: string) => {
    dispatch({ type: 'SET_SELECTED_MITIGATION', payload: strategyId });
  };

  return (
    <motion.div 
      className="mitigation-strategies"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="strategies-header">
        <h2 className="strategies-title">Mitigation Strategies</h2>
        <p className="strategies-subtitle">
          Evaluate and compare different approaches to address the {state.currentAsteroid.name} threat
        </p>
      </div>

      <div className="strategies-grid">
        {strategies.map((strategy, index) => {
          const IconComponent = strategy.icon;
          const isSelected = state.selectedMitigation === strategy.id;
          
          return (
            <motion.div
              key={strategy.id}
              className={`strategy-card ${isSelected ? 'selected' : ''}`}
              style={{ '--strategy-color': strategy.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => handleStrategySelect(strategy.id)}
            >
              <div className="strategy-header">
                <div className="strategy-icon-wrapper">
                  <IconComponent className="strategy-icon" size={24} />
                </div>
                <div className="strategy-info">
                  <h3 className="strategy-name">{strategy.name}</h3>
                  <p className="strategy-description">{strategy.description}</p>
                </div>
              </div>

              <div className="strategy-metrics">
                <div className="metric">
                  <TrendingUp size={16} />
                  <span className="metric-label">Effectiveness</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill"
                      style={{ width: `${strategy.effectiveness}%` }}
                    />
                  </div>
                  <span className="metric-value">{strategy.effectiveness}%</span>
                </div>

                <div className="metric-grid">
                  <div className="metric-item">
                    <Clock size={14} />
                    <span>{strategy.timeRequired} days</span>
                  </div>
                  <div className="metric-item">
                    <DollarSign size={14} />
                    <span>${strategy.cost}B USD</span>
                  </div>
                  <div className="metric-item">
                    <Shield size={14} />
                    <span className={`risk-level risk-${strategy.riskLevel.toLowerCase()}`}>
                      {strategy.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="strategy-details">
                <div className="advantages">
                  <h4>Advantages</h4>
                  <ul>
                    {strategy.advantages.map((advantage, idx) => (
                      <li key={idx}>{advantage}</li>
                    ))}
                  </ul>
                </div>

                <div className="disadvantages">
                  <h4>Disadvantages</h4>
                  <ul>
                    {strategy.disadvantages.map((disadvantage, idx) => (
                      <li key={idx}>{disadvantage}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {isSelected && (
                <motion.div 
                  className="selected-indicator"
                  layoutId="selectedStrategy"
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {state.impactScenario && (
        <StrategyComparison 
          scenario={state.impactScenario}
          strategies={strategies}
          selectedStrategy={state.selectedMitigation}
        />
      )}
    </motion.div>
  );
}

export default MitigationStrategies;