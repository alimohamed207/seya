import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Download,
  Filter
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import AsteroidChart from './AsteroidChart';
import ImpactMetrics from './ImpactMetrics';
import ThreatAnalysis from './ThreatAnalysis';
import './DataAnalysis.css';

function DataAnalysis() {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('1year');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'impact', label: 'Impact Analysis', icon: Activity },
    { id: 'comparison', label: 'Threat Comparison', icon: PieChart }
  ];

  const exportData = () => {
    const data = {
      asteroid: state.currentAsteroid,
      impactScenario: state.impactScenario,
      analysis: {
        timestamp: new Date().toISOString(),
        userMode: state.userMode
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meteor-madness-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="data-analysis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="analysis-header">
        <div className="header-content">
          <h2 className="analysis-title">Data Analysis & Insights</h2>
          <p className="analysis-subtitle">
            Comprehensive data visualization and trend analysis for {state.currentAsteroid.name}
          </p>
        </div>
        
        <div className="header-controls">
          <div className="time-selector">
            <Filter size={16} />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="1month">1 Month</option>
              <option value="3months">3 Months</option>
              <option value="1year">1 Year</option>
              <option value="5years">5 Years</option>
            </select>
          </div>
          
          <button className="export-btn" onClick={exportData}>
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      <div className="analysis-tabs">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="analysis-content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="tab-content"
        >
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-grid">
                <AsteroidChart asteroid={state.currentAsteroid} />
                <ImpactMetrics scenario={state.impactScenario} />
              </div>
            </div>
          )}
          
          {activeTab === 'trends' && (
            <div className="trends-content">
              <ThreatAnalysis timeRange={timeRange} />
            </div>
          )}
          
          {activeTab === 'impact' && (
            <div className="impact-content">
              <ImpactMetrics scenario={state.impactScenario} detailed={true} />
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className="comparison-content">
              <ThreatAnalysis timeRange={timeRange} comparative={true} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DataAnalysis;