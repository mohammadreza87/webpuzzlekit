/**
 * GD (Game Design) Schemas Configuration
 *
 * Defines input schemas for all configurable game modules.
 * These schemas power the GD Input Panel in the flowchart tool.
 *
 * Priority: LiveOps events first, then economy, then progression.
 */

import type { GDSchema } from '@/types/gd-inputs';

// =============================================================================
// LIVEOPS EVENT SCHEMAS
// =============================================================================

/**
 * Rhythm Pass (Battle Pass) Schema
 */
const royalPassSchema: GDSchema = {
  moduleId: 'royal-pass',
  moduleName: 'Rhythm Pass',
  description: 'Battle pass with free and premium reward tracks',
  icon: '👑',
  category: 'liveops',
  fields: [
    {
      key: 'eventDuration',
      label: 'Event Duration',
      type: 'number',
      defaultValue: 7,
      min: 1,
      max: 30,
      unit: 'days',
      description: 'How long the event runs',
      group: 'timing',
    },
    {
      key: 'unlockLevel',
      label: 'Unlock Level',
      type: 'number',
      defaultValue: 15,
      min: 1,
      max: 200,
      description: 'Player level required to access',
      group: 'requirements',
    },
    {
      key: 'premiumPrice',
      label: 'Premium Price',
      type: 'number',
      defaultValue: 4.99,
      min: 0.99,
      max: 99.99,
      step: 0.01,
      unit: '$',
      description: 'Cost to unlock premium track',
      group: 'monetization',
    },
    {
      key: 'progressCurrency',
      label: 'Progress Currency',
      type: 'select',
      defaultValue: 'keys',
      options: [
        { label: 'Keys', value: 'keys', icon: '🔑' },
        { label: 'Stars', value: 'stars', icon: '⭐' },
        { label: 'Crowns', value: 'crowns', icon: '👑' },
      ],
      description: 'Currency used to advance tiers',
      group: 'mechanics',
    },
    {
      key: 'keysPerWin',
      label: 'Keys Per Win',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 50,
      description: 'Progress earned per level completion',
      group: 'mechanics',
    },
    {
      key: 'showCountdown',
      label: 'Show Countdown',
      type: 'toggle',
      defaultValue: true,
      description: 'Display remaining time on main menu',
      group: 'display',
    },
  ],
  tiers: {
    fields: [
      { key: 'threshold', label: 'Keys Required', type: 'number', defaultValue: 100, min: 10 },
      { key: 'freeReward', label: 'Free Reward', type: 'reward', defaultValue: { type: 'coins', amount: 100 } },
      { key: 'premiumReward', label: 'Premium Reward', type: 'reward', defaultValue: { type: 'gems', amount: 50 } },
    ],
    defaultTiers: 10,
    maxTiers: 30,
    minTiers: 5,
  },
  presets: [
    {
      id: 'standard-7day',
      name: 'Standard (7 Days)',
      description: 'Default 7-day event with 10 tiers',
      values: { eventDuration: 7, premiumPrice: 4.99, keysPerWin: 10 },
    },
    {
      id: 'extended-14day',
      name: 'Extended (14 Days)',
      description: 'Longer event with more tiers',
      values: { eventDuration: 14, premiumPrice: 9.99, keysPerWin: 8 },
    },
  ],
};

/**
 * Winning Streak (Booster Streak) Schema
 */
const winningStreakSchema: GDSchema = {
  moduleId: 'winning-streak',
  moduleName: 'Winning Streak',
  description: 'Consecutive win bonuses with tier progression',
  icon: '🔥',
  category: 'liveops',
  fields: [
    {
      key: 'unlockLevel',
      label: 'Unlock Level',
      type: 'number',
      defaultValue: 30,
      min: 1,
      max: 200,
      description: 'Player level required to access',
      group: 'requirements',
    },
    {
      key: 'maxTier',
      label: 'Max Tier',
      type: 'number',
      defaultValue: 3,
      min: 2,
      max: 10,
      description: 'Maximum streak tier achievable',
      group: 'progression',
    },
    {
      key: 'winsToAdvance',
      label: 'Wins to Advance',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 5,
      description: 'Consecutive wins needed to advance tier',
      group: 'progression',
    },
    {
      key: 'resetOnLoss',
      label: 'Reset on Loss',
      type: 'toggle',
      defaultValue: true,
      description: 'Reset streak to tier 0 when player loses',
      group: 'mechanics',
    },
    {
      key: 'resetOnQuit',
      label: 'Reset on Quit',
      type: 'toggle',
      defaultValue: true,
      description: 'Reset streak when player quits level',
      group: 'mechanics',
    },
    {
      key: 'showPreview',
      label: 'Show Next Tier Preview',
      type: 'toggle',
      defaultValue: true,
      description: 'Show what boosters player gets at next tier',
      group: 'display',
    },
  ],
  tiers: {
    fields: [
      { key: 'tier', label: 'Tier', type: 'number', defaultValue: 1, min: 0 },
      {
        key: 'booster',
        label: 'Booster Reward',
        type: 'select',
        defaultValue: 'arrow',
        options: [
          { label: 'Arrow', value: 'arrow', icon: '➡️' },
          { label: 'TNT', value: 'tnt', icon: '💣' },
          { label: 'Light Ball', value: 'light-ball', icon: '💡' },
          { label: 'Rocket', value: 'rocket', icon: '🚀' },
        ],
      },
      { key: 'boosterCount', label: 'Count', type: 'number', defaultValue: 1, min: 1, max: 5 },
    ],
    defaultTiers: 4,
    maxTiers: 10,
    minTiers: 2,
  },
};

/**
 * Clef Collection (Collectible Event) Schema
 */
const clefCollectionSchema: GDSchema = {
  moduleId: 'clef-collection',
  moduleName: 'Clef Collection',
  description: 'Time-limited collectible item event with milestone rewards',
  icon: '🎵',
  category: 'liveops',
  fields: [
    {
      key: 'eventDuration',
      label: 'Event Duration',
      type: 'number',
      defaultValue: 96,
      min: 24,
      max: 336,
      unit: 'hours',
      description: 'Total event duration',
      group: 'timing',
    },
    {
      key: 'unlockLevel',
      label: 'Unlock Level',
      type: 'number',
      defaultValue: 28,
      min: 1,
      max: 200,
      description: 'Player level required to access',
      group: 'requirements',
    },
    {
      key: 'collectibleName',
      label: 'Collectible Name',
      type: 'text',
      defaultValue: 'Clefs',
      placeholder: 'e.g., Clefs, Notes, Stars',
      description: 'Display name for the collectible items',
      group: 'display',
    },
    {
      key: 'baseDropRate',
      label: 'Base Drop Rate',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 100,
      description: 'Items dropped per normal level win',
      group: 'mechanics',
    },
    {
      key: 'hardLevelMultiplier',
      label: 'Hard Level Multiplier',
      type: 'number',
      defaultValue: 1.5,
      min: 1,
      max: 3,
      step: 0.1,
      description: 'Drop rate multiplier for hard levels',
      group: 'mechanics',
    },
    {
      key: 'resetOnLoss',
      label: 'Reset on Loss',
      type: 'toggle',
      defaultValue: true,
      description: 'Lose collected items when failing a level',
      group: 'mechanics',
    },
    {
      key: 'milestoneCount',
      label: 'Total Milestones',
      type: 'number',
      defaultValue: 25,
      min: 5,
      max: 50,
      description: 'Number of milestone rewards',
      group: 'progression',
    },
  ],
  tiers: {
    fields: [
      { key: 'threshold', label: 'Items Required', type: 'number', defaultValue: 100, min: 10 },
      { key: 'reward', label: 'Reward', type: 'reward', defaultValue: { type: 'coins', amount: 100 } },
    ],
    defaultTiers: 25,
    maxTiers: 50,
    minTiers: 5,
  },
};

/**
 * Sky Race Schema
 */
const skyRaceSchema: GDSchema = {
  moduleId: 'sky-race',
  moduleName: 'Sky Race',
  description: 'Competitive race event against other players',
  icon: '🏃',
  category: 'liveops',
  fields: [
    {
      key: 'eventDuration',
      label: 'Event Duration',
      type: 'number',
      defaultValue: 72,
      min: 24,
      max: 168,
      unit: 'hours',
      group: 'timing',
    },
    {
      key: 'unlockLevel',
      label: 'Unlock Level',
      type: 'number',
      defaultValue: 25,
      min: 1,
      max: 200,
      group: 'requirements',
    },
    {
      key: 'playersPerRace',
      label: 'Players Per Race',
      type: 'number',
      defaultValue: 15,
      min: 5,
      max: 50,
      description: 'Number of players competing in each race',
      group: 'mechanics',
    },
    {
      key: 'pointsPerWin',
      label: 'Points Per Win',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 50,
      group: 'mechanics',
    },
    {
      key: 'bonusPerStar',
      label: 'Bonus Per Star',
      type: 'number',
      defaultValue: 2,
      min: 0,
      max: 10,
      description: 'Extra points per star earned',
      group: 'mechanics',
    },
    {
      key: 'topPlayersRewarded',
      label: 'Top Players Rewarded',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 10,
      description: 'Number of players receiving rewards',
      group: 'rewards',
    },
  ],
};

/**
 * Kings Cup Schema
 */
const kingsCupSchema: GDSchema = {
  moduleId: 'kings-cup',
  moduleName: "King's Cup",
  description: 'Tournament-style elimination event',
  icon: '🏆',
  category: 'liveops',
  fields: [
    {
      key: 'eventDuration',
      label: 'Event Duration',
      type: 'number',
      defaultValue: 48,
      min: 24,
      max: 168,
      unit: 'hours',
      group: 'timing',
    },
    {
      key: 'unlockLevel',
      label: 'Unlock Level',
      type: 'number',
      defaultValue: 35,
      min: 1,
      max: 200,
      group: 'requirements',
    },
    {
      key: 'rounds',
      label: 'Number of Rounds',
      type: 'number',
      defaultValue: 3,
      min: 2,
      max: 5,
      group: 'mechanics',
    },
    {
      key: 'playersPerGroup',
      label: 'Players Per Group',
      type: 'number',
      defaultValue: 10,
      min: 5,
      max: 20,
      group: 'mechanics',
    },
    {
      key: 'advancingPlayers',
      label: 'Advancing Players',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 10,
      description: 'Players advancing from each round',
      group: 'mechanics',
    },
  ],
};

/**
 * Team Chest Schema
 */
const teamChestSchema: GDSchema = {
  moduleId: 'team-chest',
  moduleName: 'Team Chest',
  description: 'Cooperative team goal for shared rewards',
  icon: '📦',
  category: 'liveops',
  fields: [
    {
      key: 'eventDuration',
      label: 'Event Duration',
      type: 'number',
      defaultValue: 72,
      min: 24,
      max: 168,
      unit: 'hours',
      group: 'timing',
    },
    {
      key: 'goalPoints',
      label: 'Goal Points',
      type: 'number',
      defaultValue: 2000,
      min: 500,
      max: 10000,
      step: 100,
      description: 'Total points needed to unlock chest',
      group: 'mechanics',
    },
    {
      key: 'pointsPerWin',
      label: 'Points Per Win',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 50,
      group: 'mechanics',
    },
    {
      key: 'bonusPerStar',
      label: 'Bonus Per Star',
      type: 'number',
      defaultValue: 5,
      min: 0,
      max: 20,
      group: 'mechanics',
    },
    {
      key: 'minTeamSize',
      label: 'Min Team Size',
      type: 'number',
      defaultValue: 5,
      min: 2,
      max: 20,
      description: 'Minimum team members to participate',
      group: 'requirements',
    },
  ],
};

// =============================================================================
// ECONOMY SCHEMAS
// =============================================================================

/**
 * Level Economy Schema
 */
const levelEconomySchema: GDSchema = {
  moduleId: 'level-economy',
  moduleName: 'Level Economy',
  description: 'Coins, lives, and level progression tuning',
  icon: '💰',
  category: 'economy',
  fields: [
    {
      key: 'startingCoins',
      label: 'Starting Coins',
      type: 'number',
      defaultValue: 2500,
      min: 0,
      max: 10000,
      description: 'Coins new players start with',
      group: 'initial',
    },
    {
      key: 'startingLives',
      label: 'Starting Lives',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      group: 'initial',
    },
    {
      key: 'maxLives',
      label: 'Max Lives',
      type: 'number',
      defaultValue: 5,
      min: 3,
      max: 10,
      group: 'limits',
    },
    {
      key: 'lifeRegenMinutes',
      label: 'Life Regen Time',
      type: 'number',
      defaultValue: 30,
      min: 5,
      max: 120,
      unit: 'minutes',
      description: 'Time to regenerate one life',
      group: 'regeneration',
    },
    {
      key: 'continueCoins',
      label: 'Continue Cost',
      type: 'number',
      defaultValue: 900,
      min: 100,
      max: 5000,
      unit: 'coins',
      description: 'Cost to continue a failed level',
      group: 'costs',
    },
    {
      key: 'levelCompleteCoins',
      label: 'Level Complete Reward',
      type: 'number',
      defaultValue: 100,
      min: 0,
      max: 500,
      unit: 'coins',
      group: 'rewards',
    },
    {
      key: 'coinsPerStar',
      label: 'Coins Per Star',
      type: 'number',
      defaultValue: 10,
      min: 0,
      max: 100,
      description: 'Bonus coins per star earned',
      group: 'rewards',
    },
  ],
};

/**
 * Booster Economy Schema
 */
const boosterEconomySchema: GDSchema = {
  moduleId: 'booster-economy',
  moduleName: 'Booster Economy',
  description: 'Booster costs and availability',
  icon: '🚀',
  category: 'economy',
  fields: [
    {
      key: 'arrowCost',
      label: 'Arrow Cost',
      type: 'number',
      defaultValue: 200,
      min: 50,
      max: 1000,
      unit: 'coins',
      group: 'pre-game',
    },
    {
      key: 'tntCost',
      label: 'TNT Cost',
      type: 'number',
      defaultValue: 300,
      min: 50,
      max: 1000,
      unit: 'coins',
      group: 'pre-game',
    },
    {
      key: 'lightBallCost',
      label: 'Light Ball Cost',
      type: 'number',
      defaultValue: 400,
      min: 50,
      max: 1000,
      unit: 'coins',
      group: 'pre-game',
    },
    {
      key: 'hammerCost',
      label: 'Hammer Cost',
      type: 'number',
      defaultValue: 150,
      min: 50,
      max: 500,
      unit: 'coins',
      group: 'in-game',
    },
    {
      key: 'cannonCost',
      label: 'Cannon Cost',
      type: 'number',
      defaultValue: 200,
      min: 50,
      max: 500,
      unit: 'coins',
      group: 'in-game',
    },
    {
      key: 'jigsawCost',
      label: 'Jigsaw Cost',
      type: 'number',
      defaultValue: 250,
      min: 50,
      max: 500,
      unit: 'coins',
      group: 'in-game',
    },
  ],
};

/**
 * IAP Pricing Schema
 */
const iapPricingSchema: GDSchema = {
  moduleId: 'iap-pricing',
  moduleName: 'IAP Pricing',
  description: 'In-app purchase price points',
  icon: '💳',
  category: 'monetization',
  fields: [
    {
      key: 'starterPack',
      label: 'Starter Pack',
      type: 'number',
      defaultValue: 0.99,
      min: 0.99,
      max: 9.99,
      step: 0.01,
      unit: '$',
      group: 'packs',
    },
    {
      key: 'coinPackSmall',
      label: 'Small Coin Pack',
      type: 'number',
      defaultValue: 1.99,
      min: 0.99,
      max: 9.99,
      step: 0.01,
      unit: '$',
      group: 'coins',
    },
    {
      key: 'coinPackMedium',
      label: 'Medium Coin Pack',
      type: 'number',
      defaultValue: 4.99,
      min: 2.99,
      max: 19.99,
      step: 0.01,
      unit: '$',
      group: 'coins',
    },
    {
      key: 'coinPackLarge',
      label: 'Large Coin Pack',
      type: 'number',
      defaultValue: 9.99,
      min: 4.99,
      max: 49.99,
      step: 0.01,
      unit: '$',
      group: 'coins',
    },
    {
      key: 'livesPackSmall',
      label: 'Small Lives Pack',
      type: 'number',
      defaultValue: 1.99,
      min: 0.99,
      max: 9.99,
      step: 0.01,
      unit: '$',
      group: 'lives',
    },
    {
      key: 'unlimitedLives',
      label: 'Unlimited Lives (2hr)',
      type: 'number',
      defaultValue: 2.99,
      min: 0.99,
      max: 9.99,
      step: 0.01,
      unit: '$',
      group: 'lives',
    },
  ],
};

// =============================================================================
// EXPORT ALL SCHEMAS
// =============================================================================

export const GD_SCHEMAS: Record<string, GDSchema> = {
  // LiveOps
  'royal-pass': royalPassSchema,
  'winning-streak': winningStreakSchema,
  'clef-collection': clefCollectionSchema,
  'sky-race': skyRaceSchema,
  'kings-cup': kingsCupSchema,
  'team-chest': teamChestSchema,
  // Economy
  'level-economy': levelEconomySchema,
  'booster-economy': boosterEconomySchema,
  'iap-pricing': iapPricingSchema,
};

/**
 * Get all schemas grouped by category
 */
export function getSchemasByCategory(): Record<string, GDSchema[]> {
  const grouped: Record<string, GDSchema[]> = {};

  Object.values(GD_SCHEMAS).forEach((schema) => {
    if (!grouped[schema.category]) {
      grouped[schema.category] = [];
    }
    grouped[schema.category].push(schema);
  });

  return grouped;
}

/**
 * Get schema by module ID
 */
export function getSchema(moduleId: string): GDSchema | undefined {
  return GD_SCHEMAS[moduleId];
}

/**
 * Get default values for a schema
 */
export function getDefaultValues(schema: GDSchema): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  schema.fields.forEach((field) => {
    values[field.key] = field.defaultValue;
  });

  return values;
}

/**
 * Get default tier data for a schema
 */
export function getDefaultTiers(schema: GDSchema): Record<string, unknown>[] {
  if (!schema.tiers) return [];

  const tiers: Record<string, unknown>[] = [];
  for (let i = 0; i < schema.tiers.defaultTiers; i++) {
    const tier: Record<string, unknown> = {};
    schema.tiers.fields.forEach((field) => {
      if (field.key === 'tier') {
        tier[field.key] = i;
      } else if (field.key === 'threshold') {
        tier[field.key] = (i + 1) * 100; // Incremental thresholds
      } else {
        tier[field.key] = field.defaultValue;
      }
    });
    tiers.push(tier);
  }

  return tiers;
}
