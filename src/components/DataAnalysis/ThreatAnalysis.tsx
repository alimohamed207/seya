import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, AlertTriangle, Globe, Target } from 'lucide-react';

interface ThreatAnalysisProps {
  timeRange: string;
  comparative?: boolean;
}

function ThreatAnalysis({ timeRange, comparative = false }: ThreatAnalysisProps) {
  // Generate sample data based on time range
  const generateThreatData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      threatLevel: Math.max(20, Math.min(95, 65 + Math.sin(i / 10) * 20 + Math.random() * 10)),
      proximity: Math.max(0.01, 0.05 + Math.sin(i / 15) * 0.02),
      detectionConfidence: Math.min(100, 70 + i * 0.5),
      riskScore: Math.max(30, Math.min(100, 60 + Math.cos(i / 8) * 25))
    }));
  };

  // Generate comparative asteroid data
  const generateComparativeData = () => {
    const asteroids = [
      { name: 'Impactor-2025', size: 2.5, threat: 85, proximity: 0.05 },
      { name: 'Apophis', size: 0.37, threat: 45, proximity: 0.1 },
      { name: 'Bennu', size: 0.49, threat: 35, proximity: 0.8 },
      { name: 'Ryugu', size: 0.87, threat: 25, proximity: 1.2 },
      { name: '2022 AP7', size: 1.5, threat: 65, proximity: 0.3 },
      { name: 'Dimorphos', size: 0.16, threat: 15, proximity: 2.1 }
    ];
    
    return asteroids.map(asteroid => ({
      ...asteroid,
      riskIndex: (asteroid.size * asteroid.threat) / asteroid.proximity
    }));
  };

  const getDaysFromRange = (range: string) => {
    switch (range) {
      case '1month': return 30;
      case '3months': return 90;
      case '1year': return 365;
      case '5years': return 1825;
      default: return 365;
    }
  };

  const threatData = generateThreatData(getDaysFromRange(timeRange));
  const comparativeData = generateComparativeData();

  if (comparative) {
    return (
      <div className="threat-analysis-container">
        <motion.div 
          className="analysis-section glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="analysis-title">
            <Globe size={20} />
            Near-Earth Object Threat Comparison
          </h3>
          
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={comparativeData}>
                <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="size" 
                  name="Size (km)"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis 
                  dataKey="threat" 
                  name="Threat Level"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3,3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-tooltip">
                          <h4>{data.name}</h4>
                          <p>Size: {data.size} km</p>
                          <p>Threat Level: {data.threat}%</p>
                          <p>Proximity: {data.proximity} AU</p>
                          <p>Risk Index: {data.riskIndex.toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Asteroids" 
                  data={comparativeData}
                  fill="#FF6B35"
                  r={8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="comparison-insights">
            <h4>Key Insights</h4>
            <div className="insights-grid">
              <div className="insight-card">
                <Target className="insight-icon" />
                <div>
                  <h5>Highest Risk</h5>
                  <p>Impactor-2025 presents the highest combined risk due to its size and proximity</p>
                </div>
              </div>
              <div className="insight-card">
                <AlertTriangle className="insight-icon" />
                <div>
                  <h5>Critical Factors</h5>
                  <p>Size and proximity are the primary determinants of threat level</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="threat-analysis-container">
      <motion.div 
        className="analysis-section glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="analysis-title">
          <TrendingUp size={20} />
          Threat Level Trends ({timeRange})
        </h3>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatData.slice(-30)}>
              <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
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
              <Line 
                type="monotone" 
                dataKey="threatLevel" 
                stroke="#FF4444" 
                strokeWidth={3}
                dot={{ fill: '#FF4444', strokeWidth: 2, r: 4 }}
                name="Threat Level (%)"
              />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#FF6B35" 
                strokeWidth={2}
                dot={{ fill: '#FF6B35', strokeWidth: 2, r: 3 }}
                name="Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="analysis-section glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="analysis-title">Detection Confidence & Proximity</h3>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatData.slice(-30)}>
              <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
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
              <Line 
                type="monotone" 
                dataKey="detectionConfidence" 
                stroke="#00D4FF" 
                strokeWidth={3}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
                name="Detection Confidence (%)"
              />
              <Line 
                type="monotone" 
                dataKey="proximity" 
                stroke="#9B59B6" 
                strokeWidth={2}
                dot={{ fill: '#9B59B6', strokeWidth: 2, r: 3 }}
                name="Proximity (AU × 100)"
                scale="log"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="trends-summary glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="summary-title">Trend Analysis Summary</h4>
        <div className="summary-grid">
          <div className="summary-card threat-increasing">
            <AlertTriangle size={24} />
            <div>
              <h5>Threat Trend</h5>
              <p>Increasing over selected period</p>
              <span className="trend-value">+12.5%</span>
            </div>
          </div>
          <div className="summary-card confidence-high">
            <Target size={24} />
            <div>
              <h5>Detection Accuracy</h5>
              <p>High confidence level maintained</p>
              <span className="trend-value">94.2%</span>
            </div>
          </div>
          <div className="summary-card proximity-decreasing">
            <Globe size={24} />
            <div>
              <h5>Approach Status</h5>
              <p>Distance decreasing steadily</p>
              <span className="trend-value">0.05 AU</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ThreatAnalysis;