import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorldMap from './WorldMap';
import ImpactControls from './ImpactControls';
import ImpactResults from './ImpactResults';
import { useAppContext } from '../../context/AppContext';
import './ImpactSimulation.css';

function ImpactSimulation() {
  const { state, dispatch } = useAppContext();
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, name: string} | null>(null);

  const handleLocationSelect = (location: {lat: number, lng: number, name: string}) => {
    setSelectedLocation(location);
    
    // Calculate impact effects based on asteroid properties and location
    const effects = calculateImpactEffects(state.currentAsteroid, location);
    
    const impactScenario = {
      location,
      effects,
      mitigationOptions: {
        deflection: {
          probability: 0.75,
          timeRequired: 180, // days
          cost: 2.5 // billion USD
        },
        evacuation: {
          feasible: effects.affectedPopulation < 10000000,
          timeRequired: 30, // days
          livesToSave: Math.floor(effects.estimatedCasualties * 0.8)
        }
      }
    };
    
    dispatch({ type: 'SET_IMPACT_SCENARIO', payload: impactScenario });
  };

  const calculateImpactEffects = (asteroid: any, location: {lat: number, lng: number}) => {
    // Simplified impact calculations based on asteroid properties
    const diameter = asteroid.diameter; // km
    const velocity = asteroid.velocity; // km/s
    
    // Basic impact formulas (simplified for demonstration)
    const kineticEnergy = 0.5 * Math.pow(diameter, 3) * Math.pow(velocity, 2) * 1000; // simplified
    const craterDiameter = Math.pow(kineticEnergy, 0.25) * 2;
    const blastRadius = craterDiameter * 10;
    const thermalRadius = blastRadius * 1.5;
    
    // Population density estimation (simplified)
    const populationDensity = Math.random() * 1000 + 100; // people per km²
    const affectedArea = Math.PI * Math.pow(blastRadius, 2);
    const affectedPopulation = Math.floor(affectedArea * populationDensity);
    const estimatedCasualties = Math.floor(affectedPopulation * 0.3);
    
    return {
      craterDiameter: Math.round(craterDiameter * 100) / 100,
      blastRadius: Math.round(blastRadius * 100) / 100,
      thermalRadius: Math.round(thermalRadius * 100) / 100,
      seismicMagnitude: Math.min(9.5, 5 + Math.log10(kineticEnergy)),
      estimatedCasualties,
      affectedPopulation
    };
  };

  return (
    <motion.div 
      className="impact-simulation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="simulation-header">
        <h2 className="simulation-title">Impact Scenario Simulation</h2>
        <p className="simulation-subtitle">
          Click on the map to select an impact location and analyze potential consequences
        </p>
      </div>

      <div className="simulation-grid">
        <div className="map-section">
          <WorldMap 
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            impactScenario={state.impactScenario}
          />
        </div>
        
        <div className="controls-section">
          <ImpactControls 
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        
        {state.impactScenario && (
          <div className="results-section">
            <ImpactResults scenario={state.impactScenario} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ImpactSimulation;