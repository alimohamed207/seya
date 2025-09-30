import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Settings, Play, Trash2 } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface ImpactControlsProps {
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

function ImpactControls({ selectedLocation, onLocationSelect }: ImpactControlsProps) {
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');

  const predefinedLocations = [
    { lat: 40.7128, lng: -74.0060, name: 'New York City' },
    { lat: 51.5074, lng: -0.1278, name: 'London' },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    { lat: 48.8566, lng: 2.3522, name: 'Paris' },
    { lat: 55.7558, lng: 37.6176, name: 'Moscow' }
  ];

  const handleManualLocation = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      onLocationSelect({ 
        lat, 
        lng, 
        name: `Custom Location (${lat.toFixed(2)}, ${lng.toFixed(2)})` 
      });
      setManualLat('');
      setManualLng('');
    } else {
      alert('Please enter valid coordinates (Lat: -90 to 90, Lng: -180 to 180)');
    }
  };

  return (
    <motion.div 
      className="impact-controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="controls-title">
        <Settings size={20} />
        Impact Location Controls
      </h3>

      {selectedLocation && (
        <div className="selected-location">
          <div className="location-info">
            <MapPin size={16} className="location-icon" />
            <div>
              <div className="location-name">{selectedLocation.name}</div>
              <div className="location-coords">
                {selectedLocation.lat.toFixed(4)}°, {selectedLocation.lng.toFixed(4)}°
              </div>
            </div>
          </div>
          <button 
            className="clear-btn"
            onClick={() => onLocationSelect(null as any)}
            title="Clear selection"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="control-section">
        <h4 className="section-title">Quick Locations</h4>
        <div className="location-buttons">
          {predefinedLocations.map((location, index) => (
            <button
              key={index}
              className="location-btn"
              onClick={() => onLocationSelect(location)}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h4 className="section-title">Manual Coordinates</h4>
        <div className="coordinate-inputs">
          <div className="input-group">
            <label>Latitude</label>
            <input
              type="number"
              step="0.0001"
              min="-90"
              max="90"
              placeholder="e.g., 40.7128"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              className="coord-input"
            />
          </div>
          <div className="input-group">
            <label>Longitude</label>
            <input
              type="number"
              step="0.0001"
              min="-180"
              max="180"
              placeholder="e.g., -74.0060"
              value={manualLng}
              onChange={(e) => setManualLng(e.target.value)}
              className="coord-input"
            />
          </div>
        </div>
        <button 
          className="btn-primary"
          onClick={handleManualLocation}
          disabled={!manualLat || !manualLng}
        >
          <Play size={16} />
          Set Location
        </button>
      </div>

      <div className="info-box">
        <h4>Instructions</h4>
        <ul>
          <li>Click anywhere on the map to select an impact location</li>
          <li>Use predefined locations for major cities</li>
          <li>Enter custom coordinates for precise positioning</li>
          <li>View impact zones and damage estimates in real-time</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default ImpactControls;