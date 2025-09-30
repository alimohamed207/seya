import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import OrbitVisualization from './components/OrbitVisualization/OrbitVisualization';
import ImpactSimulation from './components/ImpactSimulation/ImpactSimulation';
import MitigationStrategies from './components/MitigationStrategies/MitigationStrategies';
import DataAnalysis from './components/DataAnalysis/DataAnalysis';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.5
  };

  const audioRef = React.useRef<HTMLAudioElement>(null);
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay might be blocked; optionally show a play button
        });
      }
    }
  }, []);

  return (
    <AppProvider>
      <div className="app">
        {/* Space-themed background music */}
        <audio ref={audioRef} src="/assets/music/space-ambient-cinematic-351304.mp3" autoPlay loop style={{ display: 'none' }} />
        
        {/* Animated Space Background */}
        <div className="space-background">
          <div className="stars"></div>
          <div className="shooting-stars"></div>
          <div className="nebula"></div>
        </div>
        
        <Header />
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              {currentView === 'home' && <Home onNavigate={setCurrentView} />}
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'orbit' && <OrbitVisualization />}
              {currentView === 'impact' && <ImpactSimulation />}
              {currentView === 'mitigation' && <MitigationStrategies />}
              {currentView === 'analysis' && <DataAnalysis />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;