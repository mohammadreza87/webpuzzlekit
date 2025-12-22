/**
 * Simulation types for the isolated sandbox simulation system
 */

/**
 * Player state in simulation
 */
export interface SimulationPlayerState {
  coins: number;
  lives: number;
  maxLives: number;
  stars: number;
  level: number;
  area: number;
  username: string;
  teamId: string | null;
}

/**
 * Event state in simulation
 */
export interface SimulationEventState {
  active: boolean;
  progress: number;
  maxProgress: number;
  premium: boolean;
  timeLeftMinutes: number;
}

/**
 * Team state in simulation
 */
export interface SimulationTeamState {
  inTeam: boolean;
  role: 'leader' | 'elder' | 'member';
  memberCount: number;
  chestProgress: number;
  chestGoal: number;
}

/**
 * Feature flags state in simulation
 */
export interface SimulationFeaturesState {
  adsEnabled: boolean;
  iapEnabled: boolean;
  dailyAdWatched: number;
  maxDailyAds: number;
}

/**
 * Flow filter options for viewing specific feature flows
 */
export type FlowFilter =
  | 'all'
  | 'core-loop'
  | 'level-flow'
  | 'royal-pass'
  | 'winning-streak'
  | 'team-features'
  | 'shop-monetization'
  | 'social'
  | 'liveops'
  // Detailed feature flows
  | 'clef-collection'
  | 'super-booster';

/**
 * Flowchart display settings
 */
export interface SimulationSettings {
  showThumbnails: boolean;
  flowFilter: FlowFilter;
  showAllFeatures: boolean; // Show all features regardless of admin settings
}

/**
 * Journey step for playback
 */
export interface JourneyStep {
  screen: string;
  action: string;
  stateChanges: Record<string, unknown>;
  timestamp: number;
}

/**
 * Complete simulation state
 */
export interface SimulationState {
  // Player resources
  player: SimulationPlayerState;

  // Inventory
  boosters: Record<string, number>;

  // Events
  events: {
    royalPass: SimulationEventState;
    winningStreak: SimulationEventState;
    teamChest: SimulationEventState;
    skyRace: SimulationEventState;
    kingsCup: SimulationEventState;
  };

  // Social
  team: SimulationTeamState;

  // Features
  features: SimulationFeaturesState;

  // Flowchart settings
  settings: SimulationSettings;

  // Current simulation
  currentScreen: string;
  journey: JourneyStep[];
  journeyIndex: number;
}

/**
 * Scenario preset for quick state loading
 */
export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  state: Partial<SimulationState>;
}

/**
 * Simulation action types
 */
export type SimulationAction =
  | { type: 'SET_PLAYER_VALUE'; key: keyof SimulationPlayerState; value: number | string | null }
  | { type: 'SET_BOOSTER_COUNT'; boosterId: string; count: number }
  | { type: 'SET_EVENT_STATE'; eventId: string; state: Partial<SimulationEventState> }
  | { type: 'SET_TEAM_STATE'; state: Partial<SimulationTeamState> }
  | { type: 'SET_FEATURES_STATE'; state: Partial<SimulationFeaturesState> }
  | { type: 'SET_SETTINGS'; settings: Partial<SimulationSettings> }
  | { type: 'LOAD_SCENARIO'; scenario: Scenario }
  | { type: 'NAVIGATE_TO'; screen: string }
  | { type: 'STEP_FORWARD' }
  | { type: 'STEP_BACKWARD' }
  | { type: 'RESET' }
  | { type: 'SET_FULL_STATE'; state: SimulationState };
