import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface WorldMapProps {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
  impactScenario: any;
}

function WorldMap({ onLocationSelect, selectedLocation, impactScenario }: WorldMapProps) {
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.world-map-container');
      if (container) {
        setMapDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMapClick = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified projection)
    const lng = ((x / rect.width) * 360) - 180;
    const lat = 90 - ((y / rect.height) * 180);
    
    // Get location name (simplified)
    const locationName = getLocationName(lat, lng);
    
    onLocationSelect({ lat, lng, name: locationName });
  };

  const getLocationName = (lat: number, lng: number): string => {
    // Simplified location naming based on coordinates
    if (lat > 60) return 'Arctic Region';
    if (lat < -60) return 'Antarctic Region';
    if (lng > -30 && lng < 50 && lat > 30 && lat < 70) return 'Europe';
    if (lng > 50 && lng < 150 && lat > 0 && lat < 70) return 'Asia';
    if (lng > -170 && lng < -30 && lat > 30 && lat < 70) return 'North America';
    if (lng > -90 && lng < -30 && lat > -60 && lat < 15) return 'South America';
    if (lng > 10 && lng < 55 && lat > -40 && lat < 40) return 'Africa';
    if (lng > 110 && lng < 180 && lat > -50 && lat < -10) return 'Australia';
    return 'Ocean';
  };

  const convertToPixel = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * mapDimensions.width;
    const y = ((90 - lat) / 180) * mapDimensions.height;
    return { x, y };
  };

  return (
    <div className="world-map-container">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 400"
        className="world-map-svg"
        onClick={handleMapClick}
      >
        {/* World map outline (simplified) */}
        <rect x="0" y="0" width="800" height="400" fill="#1a1f2e" />
        
        {/* Continents (simplified shapes) */}
        <g className="continents">
          {/* North America */}
          <path d="M50 80 L200 70 L250 120 L200 180 L80 170 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
          {/* South America */}
          <path d="M150 200 L200 190 L220 280 L190 350 L160 330 L140 280 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
          {/* Europe */}
          <path d="M350 60 L420 50 L450 100 L380 120 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
          {/* Africa */}
          <path d="M380 140 L450 130 L470 250 L420 280 L390 260 L370 200 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
          {/* Asia */}
          <path d="M450 40 L700 50 L750 150 L680 180 L500 120 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
          {/* Australia */}
          <path d="M600 280 L720 270 L750 320 L680 340 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="1"/>
        </g>

        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Selected location marker */}
        {selectedLocation && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {(() => {
              const pixelPos = convertToPixel(selectedLocation.lat, selectedLocation.lng);
              return (
                <>
                  <circle
                    cx={pixelPos.x * (800 / mapDimensions.width)}
                    cy={pixelPos.y * (400 / mapDimensions.height)}
                    r="8"
                    fill="#FF4444"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={pixelPos.x * (800 / mapDimensions.width)}
                    cy={pixelPos.y * (400 / mapDimensions.height)}
                    r="15"
                    fill="none"
                    stroke="#FF4444"
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="15;25;15"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0.1;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              );
            })()}
          </motion.g>
        )}

        {/* Impact zones */}
        {impactScenario && selectedLocation && (
          <g className="impact-zones">
            {(() => {
              const pixelPos = convertToPixel(selectedLocation.lat, selectedLocation.lng);
              const centerX = pixelPos.x * (800 / mapDimensions.width);
              const centerY = pixelPos.y * (400 / mapDimensions.height);
              
              return (
                <>
                  {/* Thermal radiation zone */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={impactScenario.effects.thermalRadius * 0.5}
                    fill="rgba(255, 107, 53, 0.2)"
                    stroke="#FF6B35"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  {/* Blast zone */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={impactScenario.effects.blastRadius * 0.5}
                    fill="rgba(255, 68, 68, 0.3)"
                    stroke="#FF4444"
                    strokeWidth="2"
                  />
                  {/* Crater */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={impactScenario.effects.craterDiameter * 2}
                    fill="#8B0000"
                    stroke="#FF0000"
                    strokeWidth="1"
                  />
                </>
              );
            })()}
          </g>
        )}
      </svg>

      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#FF4444' }}></div>
          <span>Blast Zone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#FF6B35' }}></div>
          <span>Thermal Zone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#8B0000' }}></div>
          <span>Crater</span>
        </div>
      </div>
    </div>
  );
}

export default WorldMap;