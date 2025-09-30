import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { ImpactScenario } from '../../context/AppContext';

interface Strategy {
  id: string;
  name: string;
  effectiveness: number;
  timeRequired: number;
  cost: number;
  riskLevel: string;
  color: string;
}

interface StrategyComparisonProps {
  scenario: ImpactScenario;
  strategies: Strategy[];
  selectedStrategy: string | null;
}

function StrategyComparison({ scenario, strategies, selectedStrategy }: StrategyComparisonProps) {
  const effectivenessData = strategies.map(strategy => ({
    name: strategy.name.split(' ')[0],
    effectiveness: strategy.effectiveness,
    cost: strategy.cost,
    time: strategy.timeRequired,
    fill: strategy.color
  }));

  const riskData = strategies.map(strategy => ({
    name: strategy.name.split(' ')[0],
    value: strategy.riskLevel === 'Low' ? 1 : strategy.riskLevel === 'Medium' ? 2 : 3,
    fill: strategy.color
  }));

  const calculateLivesSaved = (effectiveness: number) => {
    return Math.floor(scenario.effects.estimatedCasualties * (effectiveness / 100));
  };

  const COLORS = ['#00D4FF', '#FF6B35', '#9B59B6'];

  return (
    <motion.div 
      className="strategy-comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="comparison-header">
        <h3 className="comparison-title">
          <TrendingUp size={20} />
          Strategy Comparison & Analysis
        </h3>
        <p className="comparison-subtitle">
          Comparative analysis based on {scenario.location.name} impact scenario
        </p>
      </div>

      <div className="comparison-grid">
        <div className="chart-section">
          <h4 className="chart-title">Effectiveness vs Cost Analysis</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="effectiveness" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h4 className="chart-title">Implementation Timeline</h4>
          <div className="timeline-chart">
            {strategies.map((strategy, index) => (
              <div 
                key={strategy.id} 
                className="timeline-item"
                style={{ '--strategy-color': strategy.color } as React.CSSProperties}
              >
                <div className="timeline-header">
                  <span className="timeline-name">{strategy.name}</span>
                  <span className="timeline-duration">{strategy.timeRequired} days</span>
                </div>
                <div className="timeline-bar">
                  <motion.div 
                    className="timeline-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(strategy.timeRequired / Math.max(...strategies.map(s => s.timeRequired))) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="metrics-section">
          <h4 className="metrics-title">Impact Reduction Potential</h4>
          <div className="metrics-grid">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                className={`metric-card ${selectedStrategy === strategy.id ? 'selected' : ''}`}
                style={{ '--strategy-color': strategy.color } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="metric-header">
                  <span className="metric-name">{strategy.name}</span>
                  <span className="metric-effectiveness">{strategy.effectiveness}%</span>
                </div>
                
                <div className="metric-stats">
                  <div className="stat-item">
                    <Users size={16} />
                    <div>
                      <span className="stat-value">{calculateLivesSaved(strategy.effectiveness).toLocaleString()}</span>
                      <span className="stat-label">Lives Saved</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <Clock size={16} />
                    <div>
                      <span className="stat-value">{strategy.timeRequired}</span>
                      <span className="stat-label">Days Required</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <DollarSign size={16} />
                    <div>
                      <span className="stat-value">${strategy.cost}B</span>
                      <span className="stat-label">Estimated Cost</span>
                    </div>
                  </div>
                </div>

                <div className="effectiveness-bar">
                  <motion.div 
                    className="effectiveness-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${strategy.effectiveness}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedStrategy && (
          <motion.div 
            className="recommendation-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="recommendation-header">
              <AlertTriangle size={20} />
              <h4>Strategy Recommendation</h4>
            </div>
            
            {(() => {
              const selected = strategies.find(s => s.id === selectedStrategy);
              if (!selected) return null;
              
              return (
                <div className="recommendation-content">
                  <div className="recommendation-summary">
                    <strong>{selected.name}</strong> appears to be {
                      selected.effectiveness > 80 ? 'highly effective' : 
                      selected.effectiveness > 60 ? 'moderately effective' : 'less effective'
                    } for this scenario, with a potential to save{' '}
                    <strong>{calculateLivesSaved(selected.effectiveness).toLocaleString()} lives</strong>.
                  </div>
                  
                  <div className="recommendation-details">
                    <div className="detail-group">
                      <h5>Critical Considerations</h5>
                      <ul>
                        <li>Implementation timeline: {selected.timeRequired} days</li>
                        <li>Financial investment: ${selected.cost} billion USD</li>
                        <li>Risk level: {selected.riskLevel}</li>
                        <li>Success probability: {selected.effectiveness}%</li>
                      </ul>
                    </div>
                    
                    <div className="detail-group">
                      <h5>Next Steps</h5>
                      <ul>
                        <li>Initiate emergency response protocols</li>
                        <li>Coordinate international space agencies</li>
                        <li>Begin resource allocation planning</li>
                        <li>Establish communication networks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default StrategyComparison;