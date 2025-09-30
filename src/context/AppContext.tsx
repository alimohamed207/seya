import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AsteroidData {
  name: string;
  diameter: number; // kilometers
  velocity: number; // km/s
  distance: number; // AU from Earth
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  closeApproachDate: string;
  orbitData: {
    semiMajorAxis: number;
    eccentricity: number;
    inclination: number;
  };
}

interface ImpactScenario {
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  effects: {
    craterDiameter: number;
    blastRadius: number;
    thermalRadius: number;
    seismicMagnitude: number;
    estimatedCasualties: number;
    affectedPopulation: number;
  };
  mitigationOptions: {
    deflection: {
      probability: number;
      timeRequired: number;
      cost: number;
    };
    evacuation: {
      feasible: boolean;
      timeRequired: number;
      livesToSave: number;
    };
  };
}

interface AppState {
  userMode: 'educator' | 'scientist' | 'policymaker';
  currentAsteroid: AsteroidData;
  impactScenario: ImpactScenario | null;
  simulationRunning: boolean;
  dataLoading: boolean;
  selectedMitigation: string | null;
}

type AppAction =
  | { type: 'SET_USER_MODE'; payload: 'educator' | 'scientist' | 'policymaker' }
  | { type: 'SET_IMPACT_SCENARIO'; payload: ImpactScenario }
  | { type: 'SET_SIMULATION_RUNNING'; payload: boolean }
  | { type: 'SET_DATA_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_MITIGATION'; payload: string | null }
  | { type: 'UPDATE_ASTEROID_DATA'; payload: Partial<AsteroidData> };

const initialState: AppState = {
  userMode: 'educator',
  currentAsteroid: {
    name: 'Impactor-2025',
    diameter: 2.5,
    velocity: 18.2,
    distance: 0.05,
    threatLevel: 'high',
    closeApproachDate: '2025-04-13T19:45:00Z',
    orbitData: {
      semiMajorAxis: 1.8,
      eccentricity: 0.6,
      inclination: 12.5
    }
  },
  impactScenario: null,
  simulationRunning: false,
  dataLoading: false,
  selectedMitigation: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_MODE':
      return { ...state, userMode: action.payload };
    case 'SET_IMPACT_SCENARIO':
      return { ...state, impactScenario: action.payload };
    case 'SET_SIMULATION_RUNNING':
      return { ...state, simulationRunning: action.payload };
    case 'SET_DATA_LOADING':
      return { ...state, dataLoading: action.payload };
    case 'SET_SELECTED_MITIGATION':
      return { ...state, selectedMitigation: action.payload };
    case 'UPDATE_ASTEROID_DATA':
      return {
        ...state,
        currentAsteroid: { ...state.currentAsteroid, ...action.payload }
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export type { AsteroidData, ImpactScenario, AppState, AppAction };