'use client';

/**
 * Simulation Context
 *
 * Provides isolated sandbox state for the flowchart simulation system.
 * This state is completely separate from the actual game state.
 */

import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type {
  SimulationState,
  SimulationAction,
  SimulationPlayerState,
  SimulationEventState,
  SimulationTeamState,
  SimulationFeaturesState,
  SimulationSettings,
  Scenario,
  JourneyStep,
} from '@/types/simulation';
import { DEFAULT_SIMULATION_STATE, mergeWithDefaults } from '@/config/scenarios.config';
import { FLOW_DEFINITIONS } from '@/config/flowchart.config';
import type { FlowDefinition } from '@/types/flowchart';

// =============================================================================
// REDUCER
// =============================================================================

function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case 'SET_PLAYER_VALUE':
      return {
        ...state,
        player: {
          ...state.player,
          [action.key]: action.value,
        },
      };

    case 'SET_BOOSTER_COUNT':
      return {
        ...state,
        boosters: {
          ...state.boosters,
          [action.boosterId]: action.count,
        },
      };

    case 'SET_EVENT_STATE':
      return {
        ...state,
        events: {
          ...state.events,
          [action.eventId]: {
            ...state.events[action.eventId as keyof typeof state.events],
            ...action.state,
          },
        },
      };

    case 'SET_TEAM_STATE':
      return {
        ...state,
        team: {
          ...state.team,
          ...action.state,
        },
      };

    case 'SET_FEATURES_STATE':
      return {
        ...state,
        features: {
          ...state.features,
          ...action.state,
        },
      };

    case 'SET_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };

    case 'LOAD_SCENARIO':
      return mergeWithDefaults(action.scenario.state);

    case 'NAVIGATE_TO': {
      const step: JourneyStep = {
        screen: action.screen,
        action: 'navigate',
        stateChanges: {},
        timestamp: Date.now(),
      };
      return {
        ...state,
        currentScreen: action.screen,
        journey: [...state.journey, step],
        journeyIndex: state.journey.length,
      };
    }

    case 'STEP_FORWARD':
      if (state.journeyIndex < state.journey.length - 1) {
        const nextStep = state.journey[state.journeyIndex + 1];
        return {
          ...state,
          currentScreen: nextStep.screen,
          journeyIndex: state.journeyIndex + 1,
        };
      }
      return state;

    case 'STEP_BACKWARD':
      if (state.journeyIndex > 0) {
        const prevStep = state.journey[state.journeyIndex - 1];
        return {
          ...state,
          currentScreen: prevStep.screen,
          journeyIndex: state.journeyIndex - 1,
        };
      }
      return state;

    case 'RESET':
      return DEFAULT_SIMULATION_STATE;

    case 'SET_FULL_STATE':
      return action.state;

    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface SimulationContextValue {
  state: SimulationState;
  dispatch: React.Dispatch<SimulationAction>;

  // Convenience methods
  setPlayerValue: <K extends keyof SimulationPlayerState>(
    key: K,
    value: SimulationPlayerState[K]
  ) => void;
  setBoosterCount: (boosterId: string, count: number) => void;
  setEventState: (eventId: string, eventState: Partial<SimulationEventState>) => void;
  setTeamState: (teamState: Partial<SimulationTeamState>) => void;
  setFeaturesState: (featuresState: Partial<SimulationFeaturesState>) => void;
  setSettings: (settings: Partial<SimulationSettings>) => void;
  loadScenario: (scenario: Scenario) => void;
  navigateTo: (screen: string) => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;

  // Condition evaluation
  evaluateCondition: (condition: string) => boolean;
  getActivePaths: (screenId: string) => FlowDefinition[];
  getBlockedPaths: (screenId: string) => FlowDefinition[];
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface SimulationProviderProps {
  children: ReactNode;
}

export function SimulationProvider({ children }: SimulationProviderProps) {
  const [state, dispatch] = useReducer(simulationReducer, DEFAULT_SIMULATION_STATE);

  // Convenience methods
  const setPlayerValue = useCallback(
    <K extends keyof SimulationPlayerState>(key: K, value: SimulationPlayerState[K]) => {
      dispatch({ type: 'SET_PLAYER_VALUE', key, value });
    },
    []
  );

  const setBoosterCount = useCallback((boosterId: string, count: number) => {
    dispatch({ type: 'SET_BOOSTER_COUNT', boosterId, count });
  }, []);

  const setEventState = useCallback((eventId: string, eventState: Partial<SimulationEventState>) => {
    dispatch({ type: 'SET_EVENT_STATE', eventId, state: eventState });
  }, []);

  const setTeamState = useCallback((teamState: Partial<SimulationTeamState>) => {
    dispatch({ type: 'SET_TEAM_STATE', state: teamState });
  }, []);

  const setFeaturesState = useCallback((featuresState: Partial<SimulationFeaturesState>) => {
    dispatch({ type: 'SET_FEATURES_STATE', state: featuresState });
  }, []);

  const setSettings = useCallback((settings: Partial<SimulationSettings>) => {
    dispatch({ type: 'SET_SETTINGS', settings });
  }, []);

  const loadScenario = useCallback((scenario: Scenario) => {
    dispatch({ type: 'LOAD_SCENARIO', scenario });
  }, []);

  const navigateTo = useCallback((screen: string) => {
    dispatch({ type: 'NAVIGATE_TO', screen });
  }, []);

  const stepForward = useCallback(() => {
    dispatch({ type: 'STEP_FORWARD' });
  }, []);

  const stepBackward = useCallback(() => {
    dispatch({ type: 'STEP_BACKWARD' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Evaluate a condition expression against current state
  const evaluateCondition = useCallback(
    (condition: string): boolean => {
      if (!condition) return true;

      try {
        // Create a safe evaluation context
        const context = {
          player: state.player,
          events: state.events,
          boosters: state.boosters,
          team: state.team,
          features: state.features,
        };

        // Simple expression evaluation (for demo purposes)
        // In production, use a proper expression parser
        const fn = new Function(
          'player',
          'events',
          'boosters',
          'team',
          'features',
          `try { return ${condition}; } catch { return false; }`
        );

        return fn(
          context.player,
          context.events,
          context.boosters,
          context.team,
          context.features
        );
      } catch {
        console.warn(`Failed to evaluate condition: ${condition}`);
        return false;
      }
    },
    [state]
  );

  // Get all active paths from a screen (conditions met)
  const getActivePaths = useCallback(
    (screenId: string): FlowDefinition[] => {
      return FLOW_DEFINITIONS.filter((flow) => {
        if (flow.from !== screenId) return false;
        if (!flow.condition) return true;
        return evaluateCondition(flow.condition);
      });
    },
    [evaluateCondition]
  );

  // Get all blocked paths from a screen (conditions not met)
  const getBlockedPaths = useCallback(
    (screenId: string): FlowDefinition[] => {
      return FLOW_DEFINITIONS.filter((flow) => {
        if (flow.from !== screenId) return false;
        if (!flow.condition) return false;
        return !evaluateCondition(flow.condition);
      });
    },
    [evaluateCondition]
  );

  const value: SimulationContextValue = {
    state,
    dispatch,
    setPlayerValue,
    setBoosterCount,
    setEventState,
    setTeamState,
    setFeaturesState,
    setSettings,
    loadScenario,
    navigateTo,
    stepForward,
    stepBackward,
    reset,
    evaluateCondition,
    getActivePaths,
    getBlockedPaths,
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

// =============================================================================
// HOOK
// =============================================================================

export function useSimulation(): SimulationContextValue {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
