/**
 * WINNING STREAK SYSTEM CONFIGURATION
 *
 * This configuration file defines the behavior of the three-module Winning Streak System.
 * Edit these values to customize the system without touching code.
 *
 * Modules:
 * - Module 1: Streak Booster Ladder (progressive boosters for consecutive wins)
 * - Module 2: Collectible Milestone Event (time-limited item collection)
 * - Module 3: Super Booster Unlock (enhanced booster from cumulative wins)
 *
 * Reference: Royal Match (Butler's Gift, Book of Treasure, Super Light Ball)
 */

import type {
  StreakBoosterConfig,
  CollectibleEventConfig,
  SuperBoosterConfig,
  WinningStreakConfig,
  StreakTier,
  MilestoneStep,
} from '@/types';

// =============================================================================
// MODULE 1: STREAK BOOSTER LADDER CONFIGURATION
// =============================================================================

/**
 * Streak tier definitions (Royal Match Butler's Gift reference)
 * Each tier adds more boosters to the player's starting inventory
 *
 * Tier 0: No boosters (starting state)
 * Tier 1: Arrow only
 * Tier 2: Arrow + TNT
 * Tier 3: Arrow + TNT + Light Ball (max)
 */
export const streakTiers: StreakTier[] = [
  { tier: 0, consecutiveWins: 0, boosterIds: [] },
  { tier: 1, consecutiveWins: 1, boosterIds: ['arrow'] },
  { tier: 2, consecutiveWins: 2, boosterIds: ['arrow', 'tnt'] },
  { tier: 3, consecutiveWins: 3, boosterIds: ['arrow', 'tnt', 'light-ball'] },
];

/**
 * Module 1 configuration: Streak Booster Ladder
 */
export const streakBoosterConfig: StreakBoosterConfig = {
  /** Maximum tier achievable (Royal Match: 4, we use 3) */
  maxTier: 3,

  /** Mapping of tier to booster IDs */
  tierBoosters: {
    0: [],
    1: ['arrow'],
    2: ['arrow', 'tnt'],
    3: ['arrow', 'tnt', 'light-ball'],
  },

  /** Level at which feature unlocks (Royal Match: 32) */
  unlockLevel: 30,

  /** Reset streak on level quit */
  resetOnQuit: true,

  /** Show preview of next tier's boosters */
  showPreview: true,
};

// =============================================================================
// MODULE 2: COLLECTIBLE MILESTONE EVENT CONFIGURATION
// =============================================================================

/**
 * Milestone thresholds (Royal Match Book of Treasure reference)
 * 25 steps with cumulative item requirements
 */
export const milestoneThresholds: number[] = [
  50,     // Step 1
  100,    // Step 2
  200,    // Step 3
  300,    // Step 4
  500,    // Step 5
  600,    // Step 6
  800,    // Step 7
  1000,   // Step 8
  1500,   // Step 9
  2000,   // Step 10
  2500,   // Step 11
  3000,   // Step 12
  3500,   // Step 13
  4000,   // Step 14
  5000,   // Step 15
  6000,   // Step 16
  8000,   // Step 17
  10000,  // Step 18
  12000,  // Step 19
  15000,  // Step 20
  18000,  // Step 21
  22000,  // Step 22
  28000,  // Step 23
  35000,  // Step 24
  40000,  // Step 25 (Grand Prize)
];

/**
 * Milestone rewards (Royal Match Book of Treasure reference)
 */
export const milestoneRewards = [
  { type: 'booster' as const, amount: 1, name: 'TNT' },           // Step 1
  { type: 'coins' as const, amount: 100 },                         // Step 2
  { type: 'booster' as const, amount: 1, name: 'Arrow' },         // Step 3
  { type: 'coins' as const, amount: 150 },                         // Step 4
  { type: 'lives' as const, amount: 3 },                           // Step 5
  { type: 'booster' as const, amount: 1, name: 'Light Ball' },    // Step 6
  { type: 'coins' as const, amount: 200 },                         // Step 7
  { type: 'booster' as const, amount: 2, name: 'Arrow' },         // Step 8
  { type: 'booster' as const, amount: 1, name: 'Cannon' },        // Step 9
  { type: 'coins' as const, amount: 400 },                         // Step 10
  { type: 'booster' as const, amount: 2, name: 'TNT' },           // Step 11
  { type: 'coins' as const, amount: 500 },                         // Step 12
  { type: 'booster' as const, amount: 2, name: 'Arrow' },         // Step 13
  { type: 'booster' as const, amount: 3, name: 'Royal Hammer' },  // Step 14
  { type: 'lives' as const, amount: 5 },                           // Step 15
  { type: 'coins' as const, amount: 800 },                         // Step 16
  { type: 'booster' as const, amount: 3, name: 'TNT' },           // Step 17
  { type: 'booster' as const, amount: 5, name: 'Royal Hammer' },  // Step 18
  { type: 'coins' as const, amount: 2000 },                        // Step 19
  { type: 'booster' as const, amount: 2, name: 'Light Ball' },    // Step 20
  { type: 'booster' as const, amount: 5, name: 'Arrow' },         // Step 21
  { type: 'coins' as const, amount: 3000 },                        // Step 22
  { type: 'booster' as const, amount: 3, name: 'Light Ball' },    // Step 23
  { type: 'booster' as const, amount: 5, name: 'TNT' },           // Step 24
  { type: 'coins' as const, amount: 10000 },                       // Step 25 (Grand Prize)
];

/**
 * Module 2 configuration: Collectible Milestone Event
 */
export const collectibleEventConfig: CollectibleEventConfig = {
  /** Event duration in hours (4 days = 96 hours) */
  eventDurationHours: 96,

  /** Number of milestones */
  milestoneCount: 25,

  /** Cumulative item thresholds for each milestone */
  milestoneThresholds,

  /** Rewards for each milestone */
  milestoneRewards,

  /** Grand prize for completing all 25 steps */
  grandPrize: { type: 'coins', amount: 10000 },

  /** Multiplier for hard levels */
  hardLevelMultiplier: 1.5,

  /** Multiplier for super hard levels */
  superHardMultiplier: 2.0,

  /** Level at which feature unlocks */
  unlockLevel: 28,

  /** Display name for collectible items */
  collectibleName: 'Clefs',

  /** Icon identifier for collectibles */
  collectibleIcon: 'clef',
};

// =============================================================================
// MODULE 3: SUPER BOOSTER UNLOCK CONFIGURATION
// =============================================================================

/**
 * Module 3 configuration: Super Booster Unlock
 * Reference: Royal Match Super Light Ball (unlocks at 292, requires 10 wins)
 */
export const superBoosterConfig: SuperBoosterConfig = {
  /** Number of wins required to unlock */
  winsRequired: 10,

  /** Super booster definition */
  superBooster: {
    baseBoosterId: 'light-ball',
    name: 'Super Light Ball',
    enhancementDescription: 'Clears 2 colors instead of 1',
    enhancementType: 'double-effect',
  },

  /** Level at which feature unlocks (Royal Match: 292, we use 30 for testing) */
  unlockLevel: 30,

  /** Reset on quit */
  resetOnQuit: true,
};

// =============================================================================
// COMBINED CONFIGURATION
// =============================================================================

/**
 * Complete Winning Streak System configuration
 * Toggle modules on/off as needed per game
 */
export const winningStreakConfig: WinningStreakConfig = {
  streakBooster: streakBoosterConfig,
  collectibleEvent: collectibleEventConfig,
  superBooster: superBoosterConfig,
  enabledModules: {
    streakBooster: true,
    collectibleEvent: true,
    superBooster: true,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the tier for a given streak count
 */
export function getTierForStreakCount(streakCount: number): number {
  const tier = streakTiers.find(
    (t, index) =>
      streakCount >= t.consecutiveWins &&
      (index === streakTiers.length - 1 || streakCount < streakTiers[index + 1].consecutiveWins)
  );
  return tier?.tier ?? 0;
}

/**
 * Get boosters for a given tier
 */
export function getBoostersForTier(tier: number): string[] {
  return streakBoosterConfig.tierBoosters[tier] ?? [];
}

/**
 * Create initial milestone steps from config
 * First milestone is marked as reached and claimed by default for demo
 */
export function createInitialMilestones(): MilestoneStep[] {
  return milestoneThresholds.map((threshold, index) => ({
    step: index + 1,
    itemsRequired: threshold,
    reward: milestoneRewards[index],
    reached: index === 0, // First milestone reached by default
    claimed: index === 0, // First milestone claimed by default
  }));
}

/**
 * Calculate current milestone step based on total collected
 */
export function getCurrentMilestoneStep(totalCollected: number): number {
  for (let i = milestoneThresholds.length - 1; i >= 0; i--) {
    if (totalCollected >= milestoneThresholds[i]) {
      return i + 2; // Return next step (1-indexed)
    }
  }
  return 1;
}

/**
 * Get items needed for next milestone
 */
export function getItemsForNextMilestone(currentStep: number): number {
  if (currentStep > milestoneThresholds.length) {
    return 0; // All milestones complete
  }
  return milestoneThresholds[currentStep - 1];
}

/**
 * Calculate progress percentage toward next milestone
 */
export function getMilestoneProgress(totalCollected: number, currentStep: number): number {
  if (currentStep > milestoneThresholds.length) return 100;

  const currentThreshold = milestoneThresholds[currentStep - 1];
  const previousThreshold = currentStep > 1 ? milestoneThresholds[currentStep - 2] : 0;
  const stepRange = currentThreshold - previousThreshold;
  const progress = totalCollected - previousThreshold;

  return Math.min(100, Math.max(0, (progress / stepRange) * 100));
}

export default winningStreakConfig;
