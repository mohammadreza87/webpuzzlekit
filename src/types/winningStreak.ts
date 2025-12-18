/**
 * Winning Streak System Types
 *
 * Types for the three-module Winning Streak System:
 * - Module 1: Streak Booster Ladder (progressive boosters for consecutive wins)
 * - Module 2: Collectible Milestone Event (time-limited item collection)
 * - Module 3: Super Booster Unlock (enhanced booster from cumulative wins)
 */

import type { Reward } from './game';

// =============================================================================
// MODULE 1: STREAK BOOSTER LADDER
// =============================================================================

/**
 * Streak tier configuration
 * Maps tier number to boosters granted at that tier
 */
export interface StreakTier {
  tier: number;
  consecutiveWins: number;
  boosterIds: string[];
}

/**
 * Module 1 state: Streak Booster Ladder
 */
export interface StreakBoosterState {
  /** Current streak tier (0 = no boosters, max_tier = maximum) */
  currentTier: number;
  /** Number of consecutive wins */
  streakCount: number;
  /** Boosters to apply at next level start */
  activeBoosters: string[];
  /** Whether the feature is unlocked (based on player level) */
  isUnlocked: boolean;
}

/**
 * Module 1 configuration
 */
export interface StreakBoosterConfig {
  /** Maximum tier achievable */
  maxTier: number;
  /** Mapping of tier to booster IDs granted */
  tierBoosters: Record<number, string[]>;
  /** Level at which feature unlocks */
  unlockLevel: number;
  /** Whether to reset on quit (default: true) */
  resetOnQuit: boolean;
  /** Whether to show preview of next tier boosters */
  showPreview: boolean;
}

// =============================================================================
// MODULE 2: COLLECTIBLE MILESTONE EVENT
// =============================================================================

/**
 * Single milestone step in the event
 */
export interface MilestoneStep {
  step: number;
  /** Cumulative items required to reach this milestone */
  itemsRequired: number;
  /** Reward for completing this milestone */
  reward: Reward;
  /** Whether this milestone has been reached */
  reached: boolean;
  /** Whether the reward has been claimed */
  claimed: boolean;
}

/**
 * Module 2 state: Collectible Milestone Event
 */
export interface CollectibleEventState {
  /** Unique event ID */
  eventId: string;
  /** Whether an event is currently active */
  isActive: boolean;
  /** Total items collected this event */
  totalCollected: number;
  /** Items collected in current level (pending until level complete) */
  sessionCollected: number;
  /** Current milestone step (1-25) */
  currentStep: number;
  /** Event end time */
  endTime: Date | null;
  /** All milestone steps with their status */
  milestones: MilestoneStep[];
  /** Whether the feature is unlocked */
  isUnlocked: boolean;
}

/**
 * Module 2 configuration
 */
export interface CollectibleEventConfig {
  /** Event duration in hours (default: 96 = 4 days) */
  eventDurationHours: number;
  /** Number of milestones (default: 25) */
  milestoneCount: number;
  /** Array of cumulative item thresholds for each milestone */
  milestoneThresholds: number[];
  /** Array of rewards for each milestone */
  milestoneRewards: Reward[];
  /** Grand prize for completing all milestones */
  grandPrize: Reward;
  /** Multiplier for hard levels (default: 1.5) */
  hardLevelMultiplier: number;
  /** Multiplier for super hard levels (default: 2.0) */
  superHardMultiplier: number;
  /** Level at which feature unlocks */
  unlockLevel: number;
  /** Collectible item display name */
  collectibleName: string;
  /** Collectible item icon identifier */
  collectibleIcon: string;
}

// =============================================================================
// MODULE 3: SUPER BOOSTER UNLOCK
// =============================================================================

/**
 * Super booster definition
 */
export interface SuperBoosterDef {
  /** Base booster ID this enhances */
  baseBoosterId: string;
  /** Name of the super booster */
  name: string;
  /** Description of enhanced effect */
  enhancementDescription: string;
  /** Type of enhancement */
  enhancementType: 'double-effect' | 'extended-range' | 'multi-target' | 'custom';
}

/**
 * Module 3 state: Super Booster Unlock
 */
export interface SuperBoosterState {
  /** Current wins toward unlock (0 to winsRequired) */
  currentWins: number;
  /** Whether super booster is currently active */
  isActive: boolean;
  /** Whether the feature is unlocked */
  isUnlocked: boolean;
}

/**
 * Module 3 configuration
 */
export interface SuperBoosterConfig {
  /** Number of wins required to unlock (default: 10) */
  winsRequired: number;
  /** Super booster definition */
  superBooster: SuperBoosterDef;
  /** Level at which feature unlocks */
  unlockLevel: number;
  /** Whether to reset on quit (default: true) */
  resetOnQuit: boolean;
}

// =============================================================================
// COMBINED STATE & CONFIG
// =============================================================================

/**
 * Combined Winning Streak System state
 */
export interface WinningStreakState {
  /** Module 1: Streak Booster Ladder */
  streakBooster: StreakBoosterState;
  /** Module 2: Collectible Milestone Event */
  collectibleEvent: CollectibleEventState;
  /** Module 3: Super Booster Unlock */
  superBooster: SuperBoosterState;
}

/**
 * Combined Winning Streak System configuration
 */
export interface WinningStreakConfig {
  /** Module 1 configuration */
  streakBooster: StreakBoosterConfig;
  /** Module 2 configuration */
  collectibleEvent: CollectibleEventConfig;
  /** Module 3 configuration */
  superBooster: SuperBoosterConfig;
  /** Which modules are enabled */
  enabledModules: {
    streakBooster: boolean;
    collectibleEvent: boolean;
    superBooster: boolean;
  };
}

// =============================================================================
// ANALYTICS EVENT TYPES
// =============================================================================

/**
 * Module 1 analytics events
 */
export type StreakBoosterAnalyticsEvent =
  | { type: 'streak_tier_up'; tier: number; streakCount: number; level: number }
  | { type: 'streak_reset'; previousTier: number; level: number; failReason: 'fail' | 'quit' }
  | { type: 'streak_booster_applied'; tier: number; boosters: string[]; level: number }
  | { type: 'streak_max_reached'; streakCount: number; level: number };

/**
 * Module 2 analytics events
 */
export type CollectibleEventAnalyticsEvent =
  | { type: 'event_started'; eventId: string }
  | { type: 'items_collected'; itemsCount: number; total: number; level: number }
  | { type: 'items_lost'; itemsLost: number; level: number }
  | { type: 'milestone_reached'; step: number; rewardType: string }
  | { type: 'milestone_claimed'; step: number; rewardValue: number }
  | { type: 'event_completed'; totalItems: number; timeSpent: number };

/**
 * Module 3 analytics events
 */
export type SuperBoosterAnalyticsEvent =
  | { type: 'super_progress'; currentWins: number; level: number }
  | { type: 'super_unlocked'; level: number; timeToUnlock: number }
  | { type: 'super_applied'; level: number; activeSessions: number }
  | { type: 'super_lost'; level: number; sessionsActive: number };

/**
 * All analytics events
 */
export type WinningStreakAnalyticsEvent =
  | StreakBoosterAnalyticsEvent
  | CollectibleEventAnalyticsEvent
  | SuperBoosterAnalyticsEvent;

// =============================================================================
// ACTION TYPES
// =============================================================================

/**
 * Actions for Winning Streak state management
 */
export type WinningStreakAction =
  // Module 1 actions
  | { type: 'STREAK_LEVEL_WON' }
  | { type: 'STREAK_LEVEL_FAILED' }
  | { type: 'STREAK_LEVEL_QUIT' }
  | { type: 'STREAK_APPLY_BOOSTERS' }
  // Module 2 actions
  | { type: 'COLLECTIBLE_START_EVENT'; payload: { eventId: string; endTime: Date } }
  | { type: 'COLLECTIBLE_ADD_SESSION_ITEMS'; payload: { count: number } }
  | { type: 'COLLECTIBLE_COMMIT_SESSION_ITEMS' }
  | { type: 'COLLECTIBLE_LOSE_SESSION_ITEMS' }
  | { type: 'COLLECTIBLE_CLAIM_MILESTONE'; payload: { step: number } }
  | { type: 'COLLECTIBLE_END_EVENT' }
  | { type: 'COLLECTIBLE_INIT_END_TIME'; payload: { endTime: Date } }
  // Module 3 actions
  | { type: 'SUPER_LEVEL_WON' }
  | { type: 'SUPER_LEVEL_FAILED' }
  | { type: 'SUPER_LEVEL_QUIT' }
  | { type: 'SUPER_APPLY_BOOSTER' }
  // General actions
  | { type: 'SET_PLAYER_LEVEL'; payload: { level: number } }
  | { type: 'RESET_ALL' };
