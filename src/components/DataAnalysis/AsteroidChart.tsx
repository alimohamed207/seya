import React from 'react';
import { motion } from 'framer-motion';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { AsteroidData } from '../../context/AppContext';

interface AsteroidChartProps {
  asteroid: AsteroidData;
}

function AsteroidChart({ asteroid }: AsteroidChartProps) {
  // Radar chart data for asteroid characteristics
  const radarData = [
    { subject: 'Size', A: (asteroid.diameter / 10) * 100, fullMark: 100 },
    { subject: 'Speed', A: (asteroid.velocity / 30) * 100, fullMark: 100 },
    { subject: 'Proximity', A: (1 - asteroid.distance) * 100, fullMark: 100 },
    { subject: 'Threat Level', A: asteroid.threatLevel === 'critical' ? 100 : asteroid.threatLevel === 'high' ? 75 : asteroid.threatLevel === 'medium' ? 50 : 25, fullMark: 100 },
    { subject: 'Orbital Eccentricity', A: asteroid.orbitData.eccentricity * 100, fullMark: 100 },
    { subject: 'Inclination', A: (asteroid.orbitData.inclination / 90) * 100, fullMark: 100 }
  ];

  // Sample trajectory data over time
  const trajectoryData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    distance: asteroid.distance + Math.sin(i / 5) * 0.01,
    velocity: asteroid.velocity + Math.cos(i / 3) * 0.5,
    threatLevel: Math.max(20, Math.min(100, 75 + Math.sin(i / 4) * 15))
  }));

  return (
    <div className="asteroid-chart-container">
      <motion.div 
        className="chart-section glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="chart-title">Asteroid Characteristics</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              />
              <Radar 
                name={asteroid.name} 
                dataKey="A" 
                stroke="#FF6B35" 
                fill="#FF6B35" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="chart-section glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="chart-title">Trajectory Analysis (30-Day Forecast)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trajectoryData}>
              <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
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
              <Area 
                type="monotone" 
                dataKey="threatLevel" 
                stroke="#FF4444" 
                fill="#FF4444"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="chart-section glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="chart-title">Distance & Velocity Trends</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trajectoryData}>
              <CartesianGrid strokeDasharray="3,3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
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
                dataKey="distance" 
                stroke="#00D4FF" 
                strokeWidth={3}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
                name="Distance (AU)"
              />
              <Line 
                type="monotone" 
                dataKey="velocity" 
                stroke="#9B59B6" 
                strokeWidth={3}
                dot={{ fill: '#9B59B6', strokeWidth: 2, r: 4 }}
                name="Velocity (km/s)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

export default AsteroidChart;