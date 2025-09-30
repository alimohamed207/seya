import { motion } from 'framer-motion';
import { 
  Home, 
  Globe, 
  Target, 
  Shield, 
  BarChart3,
  ChevronRight,
  Gauge
} from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, description: 'Space exploration & quiz' },
    { id: 'dashboard', label: 'Dashboard', icon: Gauge, description: 'Overview and alerts' },
    { id: 'orbit', label: 'Orbit View', icon: Globe, description: ' 3D visualization' },
    { id: 'impact', label: 'Impact Sim', icon: Target, description: 'Scenario modeling' },
    { id: 'mitigation', label: 'Mitigation', icon: Shield, description: 'Response strategies' },
    { id: 'analysis', label: 'Data Analysis', icon: BarChart3, description: 'Charts and insights' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <motion.button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="nav-item-content">
                <IconComponent className="nav-icon" size={20} />
                <div className="nav-text">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
                {isActive && (
                  <motion.div
                    className="nav-active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <ChevronRight className="nav-arrow" size={16} />
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;