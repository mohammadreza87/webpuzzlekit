'use client';

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  WinningStreakState,
  WinningStreakAction,
  StreakBoosterState,
  CollectibleEventState,
  SuperBoosterState,
} from '@/types';
import {
  winningStreakConfig,
  getBoostersForTier,
  createInitialMilestones,
  getCurrentMilestoneStep,
} from '@/config';

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialStreakBoosterState: StreakBoosterState = {
  currentTier: 0,
  streakCount: 0,
  activeBoosters: [],
  isUnlocked: false,
};

// Default end time: 5 days from now
const defaultEventEndTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

const initialCollectibleEventState: CollectibleEventState = {
  eventId: 'clef-collection-1',
  isActive: true,
  totalCollected: 20, // Default to 20 for demo (20/100)
  sessionCollected: 0,
  currentStep: 2, // Start at step 2 since first milestone is claimed
  endTime: defaultEventEndTime,
  milestones: createInitialMilestones(),
  isUnlocked: true,
};

const initialSuperBoosterState: SuperBoosterState = {
  currentWins: 0,
  isActive: false,
  isUnlocked: false,
};

const initialState: WinningStreakState = {
  streakBooster: initialStreakBoosterState,
  collectibleEvent: initialCollectibleEventState,
  superBooster: initialSuperBoosterState,
};

// =============================================================================
// REDUCER
// =============================================================================

function winningStreakReducer(
  state: WinningStreakState,
  action: WinningStreakAction
): WinningStreakState {
  const { streakBooster: sbConfig, collectibleEvent: ceConfig, superBooster: spConfig } = winningStreakConfig;

  switch (action.type) {
    // =========================================================================
    // MODULE 1: STREAK BOOSTER LADDER ACTIONS
    // =========================================================================

    case 'STREAK_LEVEL_WON': {
      const newStreakCount = state.streakBooster.streakCount + 1;
      const newTier = Math.min(
        sbConfig.maxTier,
        Math.floor(newStreakCount)
      );
      // Cap tier at maxTier
      const cappedTier = Math.min(newTier, sbConfig.maxTier);

      return {
        ...state,
        streakBooster: {
          ...state.streakBooster,
          streakCount: newStreakCount,
          currentTier: cappedTier,
          activeBoosters: getBoostersForTier(cappedTier),
        },
      };
    }

    case 'STREAK_LEVEL_FAILED':
    case 'STREAK_LEVEL_QUIT': {
      // Reset streak on failure/quit
      if (action.type === 'STREAK_LEVEL_QUIT' && !sbConfig.resetOnQuit) {
        return state;
      }
      return {
        ...state,
        streakBooster: {
          ...state.streakBooster,
          streakCount: 0,
          currentTier: 0,
          activeBoosters: [],
        },
      };
    }

    case 'STREAK_APPLY_BOOSTERS': {
      // Boosters are applied at level start, no state change needed
      // This action can be used for analytics tracking
      return state;
    }

    // =========================================================================
    // MODULE 2: COLLECTIBLE MILESTONE EVENT ACTIONS
    // =========================================================================

    case 'COLLECTIBLE_START_EVENT': {
      return {
        ...state,
        collectibleEvent: {
          ...state.collectibleEvent,
          eventId: action.payload.eventId,
          isActive: true,
          endTime: action.payload.endTime,
          totalCollected: 0,
          sessionCollected: 0,
          currentStep: 1,
          milestones: createInitialMilestones(),
        },
      };
    }

    case 'COLLECTIBLE_ADD_SESSION_ITEMS': {
      return {
        ...state,
        collectibleEvent: {
          ...state.collectibleEvent,
          sessionCollected: state.collectibleEvent.sessionCollected + action.payload.count,
        },
      };
    }

    case 'COLLECTIBLE_COMMIT_SESSION_ITEMS': {
      // On level complete, add session items to total
      const newTotal = state.collectibleEvent.totalCollected + state.collectibleEvent.sessionCollected;
      const newStep = getCurrentMilestoneStep(newTotal);

      // Update milestones that have been reached
      const updatedMilestones = state.collectibleEvent.milestones.map((milestone) => ({
        ...milestone,
        reached: newTotal >= milestone.itemsRequired,
      }));

      return {
        ...state,
        collectibleEvent: {
          ...state.collectibleEvent,
          totalCollected: newTotal,
          sessionCollected: 0,
          currentStep: newStep,
          milestones: updatedMilestones,
        },
      };
    }

    case 'COLLECTIBLE_LOSE_SESSION_ITEMS': {
      // On level fail, lose session items
      return {
        ...state,
        collectibleEvent: {
          ...state.collectibleEvent,
          sessionCollected: 0,
        },
      };
    }

    case 'COLLECTIBLE_CLAIM_MILESTONE': {
      const updatedMilestones = state.collectibleEvent.milestones.map((milestone) =>
        milestone.step === action.payload.step
          ? { ...milestone, claimed: true }
          : milestone
      );

      return {
        ...state,
        collectibleEvent: {
          ...state.collectibleEvent,
          milestones: updatedMilestones,
        },
      };
    }

    case 'COLLECTIBLE_END_EVENT': {
      return {
        ...state,
        collectibleEvent: {
          ...initialCollectibleEventState,
          isUnlocked: state.collectibleEvent.isUnlocked,
        },
      };
    }

    // =========================================================================
    // MODULE 3: SUPER BOOSTER UNLOCK ACTIONS
    // =========================================================================

    case 'SUPER_LEVEL_WON': {
      if (state.superBooster.isActive) {
        // Already active, stays active
        return state;
      }

      const newWins = state.superBooster.currentWins + 1;
      const shouldActivate = newWins >= spConfig.winsRequired;

      return {
        ...state,
        superBooster: {
          ...state.superBooster,
          currentWins: shouldActivate ? 0 : newWins,
          isActive: shouldActivate,
        },
      };
    }

    case 'SUPER_LEVEL_FAILED':
    case 'SUPER_LEVEL_QUIT': {
      if (action.type === 'SUPER_LEVEL_QUIT' && !spConfig.resetOnQuit) {
        return state;
      }

      // If active, lose the super booster and reset
      if (state.superBooster.isActive) {
        return {
          ...state,
          superBooster: {
            ...state.superBooster,
            currentWins: 0,
            isActive: false,
          },
        };
      }

      // If not active, losing doesn't reset the win counter
      return state;
    }

    case 'SUPER_APPLY_BOOSTER': {
      // Super booster is applied at level start, no state change needed
      return state;
    }

    // =========================================================================
    // GENERAL ACTIONS
    // =========================================================================

    case 'SET_PLAYER_LEVEL': {
      const { level } = action.payload;
      const collectibleUnlocked = level >= ceConfig.unlockLevel;

      return {
        ...state,
        streakBooster: {
          ...state.streakBooster,
          isUnlocked: level >= sbConfig.unlockLevel,
        },
        collectibleEvent: {
          ...state.collectibleEvent,
          isUnlocked: collectibleUnlocked,
          // Auto-activate when unlocked (for prototype)
          isActive: collectibleUnlocked,
          eventId: collectibleUnlocked ? 'clef-collection-1' : '',
        },
        superBooster: {
          ...state.superBooster,
          isUnlocked: level >= spConfig.unlockLevel,
        },
      };
    }

    case 'RESET_ALL': {
      return {
        ...initialState,
        streakBooster: {
          ...initialStreakBoosterState,
          isUnlocked: state.streakBooster.isUnlocked,
        },
        collectibleEvent: {
          ...initialCollectibleEventState,
          isUnlocked: state.collectibleEvent.isUnlocked,
        },
        superBooster: {
          ...initialSuperBoosterState,
          isUnlocked: state.superBooster.isUnlocked,
        },
      };
    }

    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface WinningStreakContextValue {
  state: WinningStreakState;
  dispatch: React.Dispatch<WinningStreakAction>;
  // Convenience methods
  onLevelWon: () => void;
  onLevelFailed: () => void;
  onLevelQuit: () => void;
  claimMilestone: (step: number) => void;
  addSessionItems: (count: number) => void;
  startEvent: (eventId: string, durationHours?: number) => void;
}

const WinningStreakContext = createContext<WinningStreakContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface WinningStreakProviderProps {
  children: ReactNode;
  playerLevel?: number;
}

export function WinningStreakProvider({ children, playerLevel = 47 }: WinningStreakProviderProps) {
  const [state, dispatch] = useReducer(winningStreakReducer, initialState);

  // Update unlock status when player level changes
  useEffect(() => {
    dispatch({ type: 'SET_PLAYER_LEVEL', payload: { level: playerLevel } });
  }, [playerLevel]);

  // Convenience methods
  const onLevelWon = () => {
    dispatch({ type: 'STREAK_LEVEL_WON' });
    dispatch({ type: 'SUPER_LEVEL_WON' });
    dispatch({ type: 'COLLECTIBLE_COMMIT_SESSION_ITEMS' });
  };

  const onLevelFailed = () => {
    dispatch({ type: 'STREAK_LEVEL_FAILED' });
    dispatch({ type: 'SUPER_LEVEL_FAILED' });
    dispatch({ type: 'COLLECTIBLE_LOSE_SESSION_ITEMS' });
  };

  const onLevelQuit = () => {
    dispatch({ type: 'STREAK_LEVEL_QUIT' });
    dispatch({ type: 'SUPER_LEVEL_QUIT' });
    dispatch({ type: 'COLLECTIBLE_LOSE_SESSION_ITEMS' });
  };

  const claimMilestone = (step: number) => {
    dispatch({ type: 'COLLECTIBLE_CLAIM_MILESTONE', payload: { step } });
  };

  const addSessionItems = (count: number) => {
    dispatch({ type: 'COLLECTIBLE_ADD_SESSION_ITEMS', payload: { count } });
  };

  const startEvent = (eventId: string, durationHours?: number) => {
    const hours = durationHours ?? winningStreakConfig.collectibleEvent.eventDurationHours;
    const endTime = new Date(Date.now() + hours * 60 * 60 * 1000);
    dispatch({ type: 'COLLECTIBLE_START_EVENT', payload: { eventId, endTime } });
  };

  const value: WinningStreakContextValue = {
    state,
    dispatch,
    onLevelWon,
    onLevelFailed,
    onLevelQuit,
    claimMilestone,
    addSessionItems,
    startEvent,
  };

  return (
    <WinningStreakContext.Provider value={value}>
      {children}
    </WinningStreakContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useWinningStreak() {
  const context = useContext(WinningStreakContext);
  if (!context) {
    throw new Error('useWinningStreak must be used within a WinningStreakProvider');
  }
  return context;
}

// =============================================================================
// ACTION CREATORS (for convenience)
// =============================================================================

export const winningStreakActions = {
  // Module 1
  streakLevelWon: (): WinningStreakAction => ({ type: 'STREAK_LEVEL_WON' }),
  streakLevelFailed: (): WinningStreakAction => ({ type: 'STREAK_LEVEL_FAILED' }),
  streakLevelQuit: (): WinningStreakAction => ({ type: 'STREAK_LEVEL_QUIT' }),
  streakApplyBoosters: (): WinningStreakAction => ({ type: 'STREAK_APPLY_BOOSTERS' }),

  // Module 2
  collectibleStartEvent: (eventId: string, endTime: Date): WinningStreakAction => ({
    type: 'COLLECTIBLE_START_EVENT',
    payload: { eventId, endTime },
  }),
  collectibleAddSessionItems: (count: number): WinningStreakAction => ({
    type: 'COLLECTIBLE_ADD_SESSION_ITEMS',
    payload: { count },
  }),
  collectibleCommitSessionItems: (): WinningStreakAction => ({
    type: 'COLLECTIBLE_COMMIT_SESSION_ITEMS',
  }),
  collectibleLoseSessionItems: (): WinningStreakAction => ({
    type: 'COLLECTIBLE_LOSE_SESSION_ITEMS',
  }),
  collectibleClaimMilestone: (step: number): WinningStreakAction => ({
    type: 'COLLECTIBLE_CLAIM_MILESTONE',
    payload: { step },
  }),
  collectibleEndEvent: (): WinningStreakAction => ({ type: 'COLLECTIBLE_END_EVENT' }),

  // Module 3
  superLevelWon: (): WinningStreakAction => ({ type: 'SUPER_LEVEL_WON' }),
  superLevelFailed: (): WinningStreakAction => ({ type: 'SUPER_LEVEL_FAILED' }),
  superLevelQuit: (): WinningStreakAction => ({ type: 'SUPER_LEVEL_QUIT' }),
  superApplyBooster: (): WinningStreakAction => ({ type: 'SUPER_APPLY_BOOSTER' }),

  // General
  setPlayerLevel: (level: number): WinningStreakAction => ({
    type: 'SET_PLAYER_LEVEL',
    payload: { level },
  }),
  resetAll: (): WinningStreakAction => ({ type: 'RESET_ALL' }),
};
