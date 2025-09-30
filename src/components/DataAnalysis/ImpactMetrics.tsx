import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Users, Zap, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { ImpactScenario } from '../../context/AppContext';

interface ImpactMetricsProps {
  scenario: ImpactScenario | null;
  detailed?: boolean;
}

function ImpactMetrics({ scenario, detailed = false }: ImpactMetricsProps) {
  if (!scenario) {
    return (
      <div className="impact-metrics-container">
        <div className="no-scenario glass-panel">
          <AlertTriangle size={48} className="no-scenario-icon" />
          <h3>No Impact Scenario Selected</h3>
          <p>Select an impact location to view detailed metrics and analysis.</p>
        </div>
      </div>
    );
  }

  const effectsData = [
    { name: 'Immediate Deaths', value: Math.floor(scenario.effects.estimatedCasualties * 0.6), color: '#FF4444' },
    { name: 'Injuries', value: Math.floor(scenario.effects.estimatedCasualties * 0.3), color: '#FF6B35' },
    { name: 'Missing', value: Math.floor(scenario.effects.estimatedCasualties * 0.1), color: '#FFB84D' }
  ];

  const zoneData = [
    { zone: 'Crater', radius: scenario.effects.craterDiameter, severity: 100 },
    { zone: 'Blast', radius: scenario.effects.blastRadius, severity: 85 },
    { zone: 'Thermal', radius: scenario.effects.thermalRadius, severity: 60 },
    { zone: 'Seismic', radius: scenario.effects.thermalRadius * 1.5, severity: 30 }
  ];

  const COLORS = ['#FF4444', '#FF6B35', '#FFB84D'];

  return (
    <div className="impact-metrics-container">
      <motion.div 
        className="metrics-overview glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="metrics-title">
          <TrendingUp size={20} />
          Impact Metrics - {scenario.location.name}
        </h3>

        <div className="metrics-grid">
          <div className="metric-card">
            <Target className="metric-icon crater" />
            <div className="metric-content">
              <span className="metric-value">{scenario.effects.craterDiameter} km</span>
              <span className="metric-label">Crater Diameter</span>
            </div>
          </div>

          <div className="metric-card">
            <Zap className="metric-icon blast" />
            <div className="metric-content">
              <span className="metric-value">{scenario.effects.blastRadius} km</span>
              <span className="metric-label">Blast Radius</span>
            </div>
          </div>

          <div className="metric-card">
            <Activity className="metric-icon seismic" />
            <div className="metric-content">
              <span className="metric-value">{scenario.effects.seismicMagnitude.toFixed(1)}</span>
              <span className="metric-label">Seismic Magnitude</span>
            </div>
          </div>

          <div className="metric-card">
            <Users className="metric-icon population" />
            <div className="metric-content">
              <span className="metric-value">{scenario.effects.affectedPopulation.toLocaleString()}</span>
              <span className="metric-label">Affected Population</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="charts-grid">
        <motion.div 
          className="chart-section glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="chart-title">Casualty Breakdown</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={effectsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {effectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="legend">
            {effectsData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ background: item.color }}></div>
                <span>{item.name}: {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="chart-section glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="chart-title">Impact Zones Analysis</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={zoneData} layout="horizontal">
                <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="zone"
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
                <Bar dataKey="radius" fill="#FF6B35" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {detailed && (
        <motion.div 
          className="detailed-analysis glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4 className="section-title">Detailed Impact Analysis</h4>
          
          <div className="analysis-sections">
            <div className="analysis-section">
              <h5>Environmental Effects</h5>
              <ul className="effects-list">
                <li>Immediate ejecta cloud covering {(scenario.effects.blastRadius * 2).toFixed(1)} km radius</li>
                <li>Dust cloud potentially affecting regional climate for weeks</li>
                <li>Secondary fires from thermal radiation in {scenario.effects.thermalRadius} km zone</li>
                <li>Seismic activity may trigger landslides and structural damage</li>
              </ul>
            </div>
            
            <div className="analysis-section">
              <h5>Infrastructure Impact</h5>
              <ul className="effects-list">
                <li>Complete destruction within {scenario.effects.craterDiameter} km crater zone</li>
                <li>Severe damage to buildings and infrastructure in blast zone</li>
                <li>Transportation networks disrupted across affected region</li>
                <li>Utilities (power, water, communications) severely impacted</li>
              </ul>
            </div>
            
            <div className="analysis-section">
              <h5>Economic Consequences</h5>
              <ul className="effects-list">
                <li>Estimated direct damage: ${(scenario.effects.affectedPopulation * 0.0001).toFixed(1)}B USD</li>
                <li>Long-term economic impact from displaced population</li>
                <li>Agricultural losses from dust and debris contamination</li>
                <li>Tourism and business disruption for extended period</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ImpactMetrics;