/**
 * Simulation Scenarios Configuration
 *
 * Predefined scenarios for quick testing of different user states.
 */

import type { SimulationState, Scenario } from '@/types/simulation';

// =============================================================================
// DEFAULT STATE
// =============================================================================

/**
 * Default simulation state - represents a typical mid-game player.
 */
export const DEFAULT_SIMULATION_STATE: SimulationState = {
  player: {
    coins: 500,
    lives: 3,
    maxLives: 5,
    stars: 234,
    level: 47,
    area: 3,
    username: 'Player',
    teamId: 'team-1',
  },
  boosters: {
    bomb: 2,
    rainbow: 1,
    hammer: 0,
    rocket: 3,
    lightning: 0,
    arrow: 1,
  },
  events: {
    royalPass: {
      active: true,
      progress: 680,
      maxProgress: 1000,
      premium: false,
      timeLeftMinutes: 6 * 24 * 60, // 6 days
    },
    winningStreak: {
      active: true,
      progress: 5,
      maxProgress: 10,
      premium: false,
      timeLeftMinutes: 7 * 24 * 60,
    },
    teamChest: {
      active: true,
      progress: 1250,
      maxProgress: 2000,
      premium: false,
      timeLeftMinutes: 3 * 24 * 60,
    },
    skyRace: {
      active: true,
      progress: 15,
      maxProgress: 50,
      premium: false,
      timeLeftMinutes: 2 * 24 * 60,
    },
    kingsCup: {
      active: false,
      progress: 0,
      maxProgress: 100,
      premium: false,
      timeLeftMinutes: 0,
    },
  },
  team: {
    inTeam: true,
    role: 'member',
    memberCount: 24,
    chestProgress: 1250,
    chestGoal: 2000,
  },
  features: {
    adsEnabled: true,
    iapEnabled: true,
    dailyAdWatched: 0,
    maxDailyAds: 3,
  },
  settings: {
    showThumbnails: true,
    flowFilter: 'all',
    showAllFeatures: true, // Show all features in flowchart by default
  },
  currentScreen: 'main-menu',
  journey: [],
  journeyIndex: 0,
};

// =============================================================================
// SCENARIO PRESETS
// =============================================================================

/**
 * Predefined scenarios for testing different user states.
 */
export const SCENARIOS: Scenario[] = [
  {
    id: 'new-player',
    name: 'New Player',
    description: 'Fresh install, level 1, no boosters',
    icon: '🆕',
    state: {
      player: {
        coins: 100,
        lives: 5,
        maxLives: 5,
        stars: 0,
        level: 1,
        area: 1,
        username: 'NewPlayer',
        teamId: null,
      },
      boosters: {
        bomb: 0,
        rainbow: 0,
        hammer: 0,
        rocket: 0,
        lightning: 0,
        arrow: 0,
      },
      events: {
        royalPass: { active: false, progress: 0, maxProgress: 1000, premium: false, timeLeftMinutes: 0 },
        winningStreak: { active: false, progress: 0, maxProgress: 10, premium: false, timeLeftMinutes: 0 },
        teamChest: { active: false, progress: 0, maxProgress: 2000, premium: false, timeLeftMinutes: 0 },
        skyRace: { active: false, progress: 0, maxProgress: 50, premium: false, timeLeftMinutes: 0 },
        kingsCup: { active: false, progress: 0, maxProgress: 100, premium: false, timeLeftMinutes: 0 },
      },
      team: { inTeam: false, role: 'member', memberCount: 0, chestProgress: 0, chestGoal: 0 },
    },
  },
  {
    id: 'whale-player',
    name: 'Whale Player',
    description: 'High spender with all premium features',
    icon: '🐋',
    state: {
      player: {
        coins: 50000,
        lives: 5,
        maxLives: 5,
        stars: 2500,
        level: 150,
        area: 8,
        username: 'WhaleKing',
        teamId: 'team-elite',
      },
      boosters: {
        bomb: 50,
        rainbow: 50,
        hammer: 50,
        rocket: 50,
        lightning: 50,
        arrow: 50,
      },
      events: {
        royalPass: { active: true, progress: 980, maxProgress: 1000, premium: true, timeLeftMinutes: 6 * 24 * 60 },
        winningStreak: { active: true, progress: 10, maxProgress: 10, premium: true, timeLeftMinutes: 7 * 24 * 60 },
        teamChest: { active: true, progress: 1800, maxProgress: 2000, premium: true, timeLeftMinutes: 3 * 24 * 60 },
        skyRace: { active: true, progress: 48, maxProgress: 50, premium: true, timeLeftMinutes: 2 * 24 * 60 },
        kingsCup: { active: true, progress: 95, maxProgress: 100, premium: true, timeLeftMinutes: 1 * 24 * 60 },
      },
      team: { inTeam: true, role: 'leader', memberCount: 50, chestProgress: 1800, chestGoal: 2000 },
    },
  },
  {
    id: 'stuck-player',
    name: 'Stuck Player',
    description: 'No lives, no coins, frustrated',
    icon: '😢',
    state: {
      player: {
        coins: 0,
        lives: 0,
        maxLives: 5,
        stars: 234,
        level: 47,
        area: 3,
        username: 'StuckPlayer',
        teamId: 'team-1',
      },
      boosters: {
        bomb: 0,
        rainbow: 0,
        hammer: 0,
        rocket: 0,
        lightning: 0,
        arrow: 0,
      },
      features: {
        adsEnabled: true,
        iapEnabled: true,
        dailyAdWatched: 3, // Already watched max ads
        maxDailyAds: 3,
      },
    },
  },
  {
    id: 'event-ending',
    name: 'Event Ending Soon',
    description: 'Royal Pass ending in 1 hour, not claimed',
    icon: '⏰',
    state: {
      events: {
        royalPass: { active: true, progress: 950, maxProgress: 1000, premium: false, timeLeftMinutes: 60 },
        winningStreak: { active: true, progress: 5, maxProgress: 10, premium: false, timeLeftMinutes: 7 * 24 * 60 },
        teamChest: { active: true, progress: 1250, maxProgress: 2000, premium: false, timeLeftMinutes: 3 * 24 * 60 },
        skyRace: { active: true, progress: 15, maxProgress: 50, premium: false, timeLeftMinutes: 2 * 24 * 60 },
        kingsCup: { active: false, progress: 0, maxProgress: 100, premium: false, timeLeftMinutes: 0 },
      },
    },
  },
  {
    id: 'mid-game',
    name: 'Mid-Game Player',
    description: 'Level 75, moderate resources',
    icon: '🎮',
    state: {
      player: {
        coins: 2000,
        lives: 4,
        maxLives: 5,
        stars: 500,
        level: 75,
        area: 5,
        username: 'MidGamer',
        teamId: 'team-2',
      },
      boosters: {
        bomb: 5,
        rainbow: 3,
        hammer: 2,
        rocket: 4,
        lightning: 1,
        arrow: 3,
      },
    },
  },
  {
    id: 'power-user',
    name: 'Power User',
    description: 'Winning streak active, full boosters',
    icon: '🔥',
    state: {
      player: {
        coins: 5000,
        lives: 5,
        maxLives: 5,
        stars: 800,
        level: 100,
        area: 6,
        username: 'PowerUser',
        teamId: 'team-pro',
      },
      boosters: {
        bomb: 20,
        rainbow: 15,
        hammer: 10,
        rocket: 20,
        lightning: 5,
        arrow: 15,
      },
      events: {
        royalPass: { active: true, progress: 800, maxProgress: 1000, premium: true, timeLeftMinutes: 5 * 24 * 60 },
        winningStreak: { active: true, progress: 8, maxProgress: 10, premium: false, timeLeftMinutes: 7 * 24 * 60 },
        teamChest: { active: true, progress: 1500, maxProgress: 2000, premium: false, timeLeftMinutes: 3 * 24 * 60 },
        skyRace: { active: true, progress: 35, maxProgress: 50, premium: false, timeLeftMinutes: 2 * 24 * 60 },
        kingsCup: { active: true, progress: 60, maxProgress: 100, premium: false, timeLeftMinutes: 1 * 24 * 60 },
      },
    },
  },
  {
    id: 'no-team',
    name: 'Solo Player',
    description: 'Not in a team, missing team features',
    icon: '🚶',
    state: {
      team: {
        inTeam: false,
        role: 'member',
        memberCount: 0,
        chestProgress: 0,
        chestGoal: 0,
      },
      events: {
        royalPass: { active: true, progress: 400, maxProgress: 1000, premium: false, timeLeftMinutes: 6 * 24 * 60 },
        winningStreak: { active: true, progress: 3, maxProgress: 10, premium: false, timeLeftMinutes: 7 * 24 * 60 },
        teamChest: { active: false, progress: 0, maxProgress: 0, premium: false, timeLeftMinutes: 0 },
        skyRace: { active: true, progress: 10, maxProgress: 50, premium: false, timeLeftMinutes: 2 * 24 * 60 },
        kingsCup: { active: false, progress: 0, maxProgress: 100, premium: false, timeLeftMinutes: 0 },
      },
    },
  },
  {
    id: 'ads-exhausted',
    name: 'Ads Exhausted',
    description: 'Watched all daily ads, low on resources',
    icon: '📺',
    state: {
      player: {
        coins: 50,
        lives: 1,
        maxLives: 5,
        stars: 200,
        level: 40,
        area: 3,
        username: 'AdWatcher',
        teamId: 'team-1',
      },
      features: {
        adsEnabled: true,
        iapEnabled: true,
        dailyAdWatched: 3,
        maxDailyAds: 3,
      },
    },
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a scenario by ID.
 */
export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

/**
 * Merge partial state with default state.
 */
export function mergeWithDefaults(partial: Partial<SimulationState>): SimulationState {
  return {
    ...DEFAULT_SIMULATION_STATE,
    ...partial,
    player: {
      ...DEFAULT_SIMULATION_STATE.player,
      ...(partial.player || {}),
    },
    boosters: {
      ...DEFAULT_SIMULATION_STATE.boosters,
      ...(partial.boosters || {}),
    },
    events: {
      ...DEFAULT_SIMULATION_STATE.events,
      ...(partial.events || {}),
    },
    team: {
      ...DEFAULT_SIMULATION_STATE.team,
      ...(partial.team || {}),
    },
    features: {
      ...DEFAULT_SIMULATION_STATE.features,
      ...(partial.features || {}),
    },
    settings: {
      ...DEFAULT_SIMULATION_STATE.settings,
      ...(partial.settings || {}),
    },
  };
}
