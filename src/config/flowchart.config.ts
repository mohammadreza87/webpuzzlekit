/**
 * Flowchart Configuration
 *
 * Defines all screen connections, positions, and categories for the flowchart view.
 */

import type { FlowDefinition, NodePosition, NodeCategories } from '@/types/flowchart';

// =============================================================================
// NODE POSITIONS
// =============================================================================

/**
 * Predefined positions for each node in the flowchart.
 * Positions are in pixels (x, y) relative to the canvas origin.
 */
export const NODE_POSITIONS: Record<string, NodePosition> = {
  // Core gameplay flow (center column)
  'loading': { x: 500, y: 0 },
  'main-menu': { x: 500, y: 150 },
  'level-start': { x: 500, y: 350 },
  'gameplay': { x: 500, y: 550 },
  'level-complete': { x: 350, y: 750 },
  'level-failed': { x: 650, y: 750 },
  'out-of-lives': { x: 800, y: 900 },

  // Shop and monetization (left side)
  'shop': { x: 100, y: 150 },
  'free-lives': { x: 100, y: 350 },
  'boosters': { x: 100, y: 550 },

  // Profile and social (right side)
  'profile': { x: 900, y: 150 },
  'settings': { x: 900, y: 350 },
  'team': { x: 900, y: 550 },
  'leaderboard': { x: 900, y: 750 },
  'friends': { x: 1050, y: 550 },

  // LiveOps events (far left)
  'royal-pass': { x: -150, y: 150 },
  'winning-streak': { x: -150, y: 350 },
  'team-chest': { x: -150, y: 550 },
  'sky-race': { x: -150, y: 750 },
  'kings-cup': { x: -300, y: 350 },
  'clef-collection': { x: -300, y: 550 },
  'lightning-rush': { x: -300, y: 750 },
  'lava-quest': { x: -450, y: 350 },
  'mission-control': { x: -450, y: 550 },
  'album': { x: -450, y: 750 },
  'collection': { x: -600, y: 550 },

  // Other pages
  'daily-rewards': { x: 250, y: 150 },
  'inbox': { x: 750, y: 150 },
  'area-tasks': { x: 250, y: 350 },
  'admin': { x: 1050, y: 150 },

  // Modals (positioned near their parent screens)
  'booster-select': { x: 350, y: 450 },
  'reward-claim': { x: 200, y: 850 },
  'area-complete': { x: 200, y: 950 },
  'profile-picture': { x: 1050, y: 250 },
  'edit-avatar': { x: 1050, y: 350 },
  'sign-in': { x: 1050, y: 450 },
  'settings-modal': { x: 1050, y: 550 },
  'team-info': { x: 1050, y: 750 },
  'member-profile': { x: 1200, y: 750 },
  'event-info': { x: -50, y: 250 },
  'card-detail': { x: -550, y: 850 },
  'collection-set-detail': { x: -700, y: 650 },
};

// =============================================================================
// FLOW DEFINITIONS
// =============================================================================

/**
 * All flow connections between screens.
 * Each definition includes source, target, action label, and optional condition.
 */
export const FLOW_DEFINITIONS: FlowDefinition[] = [
  // === App Launch ===
  {
    id: 'loading-to-main',
    from: 'loading',
    to: 'main-menu',
    action: 'Assets Loaded',
  },

  // === Main Menu Navigation ===
  {
    id: 'main-to-shop',
    from: 'main-menu',
    to: 'shop',
    action: 'Click Shop',
  },
  {
    id: 'main-to-profile',
    from: 'main-menu',
    to: 'profile',
    action: 'Click Avatar',
  },
  {
    id: 'main-to-leaderboard',
    from: 'main-menu',
    to: 'leaderboard',
    action: 'Click Leaderboard',
  },
  {
    id: 'main-to-team',
    from: 'main-menu',
    to: 'team',
    action: 'Click Team',
  },
  {
    id: 'main-to-inbox',
    from: 'main-menu',
    to: 'inbox',
    action: 'Click Inbox',
  },
  {
    id: 'main-to-daily-rewards',
    from: 'main-menu',
    to: 'daily-rewards',
    action: 'Click Daily Rewards',
  },
  {
    id: 'main-to-settings',
    from: 'main-menu',
    to: 'settings',
    action: 'Click Settings',
  },
  {
    id: 'main-to-area-tasks',
    from: 'main-menu',
    to: 'area-tasks',
    action: 'Click Area',
  },

  // === Gameplay Flow ===
  {
    id: 'main-to-level-start',
    from: 'main-menu',
    to: 'level-start',
    action: 'Play Level',
    condition: 'player.lives > 0',
  },
  {
    id: 'level-start-to-booster-select',
    from: 'level-start',
    to: 'booster-select',
    action: 'Select Boosters',
  },
  {
    id: 'level-start-to-gameplay',
    from: 'level-start',
    to: 'gameplay',
    action: 'Play',
    condition: 'player.lives > 0',
  },
  {
    id: 'booster-select-to-gameplay',
    from: 'booster-select',
    to: 'gameplay',
    action: 'Start with Boosters',
  },
  {
    id: 'gameplay-to-complete',
    from: 'gameplay',
    to: 'level-complete',
    action: 'Win',
    probability: 65,
  },
  {
    id: 'gameplay-to-failed',
    from: 'gameplay',
    to: 'level-failed',
    action: 'Lose',
    probability: 35,
  },
  {
    id: 'level-complete-to-main',
    from: 'level-complete',
    to: 'main-menu',
    action: 'Continue',
  },
  {
    id: 'level-complete-to-area-complete',
    from: 'level-complete',
    to: 'area-complete',
    action: 'Area Complete',
    condition: 'isLastLevelInArea',
  },
  {
    id: 'level-failed-to-main',
    from: 'level-failed',
    to: 'main-menu',
    action: 'Give Up',
    probability: 40,
  },
  {
    id: 'level-failed-continue',
    from: 'level-failed',
    to: 'gameplay',
    action: 'Continue (-5 coins)',
    condition: 'player.coins >= 5',
    probability: 45,
  },
  {
    id: 'level-failed-to-out-of-lives',
    from: 'level-failed',
    to: 'out-of-lives',
    action: 'No Lives',
    condition: 'player.lives === 0',
    probability: 15,
  },

  // === Out of Lives Flow ===
  {
    id: 'out-of-lives-to-shop',
    from: 'out-of-lives',
    to: 'shop',
    action: 'Buy Lives',
    probability: 10,
  },
  {
    id: 'out-of-lives-to-main',
    from: 'out-of-lives',
    to: 'main-menu',
    action: 'Wait/Close',
    probability: 70,
  },
  {
    id: 'out-of-lives-watch-ad',
    from: 'out-of-lives',
    to: 'gameplay',
    action: 'Watch Ad',
    condition: 'features.adsEnabled && features.dailyAdWatched < features.maxDailyAds',
    probability: 20,
  },

  // === Shop Flow ===
  {
    id: 'shop-to-main',
    from: 'shop',
    to: 'main-menu',
    action: 'Close',
  },
  {
    id: 'shop-purchase',
    from: 'shop',
    to: 'reward-claim',
    action: 'Purchase',
    condition: 'features.iapEnabled',
  },

  // === Profile Flow ===
  {
    id: 'profile-to-main',
    from: 'profile',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'profile-to-avatar',
    from: 'profile',
    to: 'profile-picture',
    action: 'Edit Avatar',
  },
  {
    id: 'profile-picture-to-edit',
    from: 'profile-picture',
    to: 'edit-avatar',
    action: 'Customize',
  },
  {
    id: 'profile-to-settings',
    from: 'profile',
    to: 'settings',
    action: 'Settings',
  },

  // === Team Flow ===
  {
    id: 'team-to-main',
    from: 'team',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'team-to-team-info',
    from: 'team',
    to: 'team-info',
    action: 'View Team',
  },
  {
    id: 'team-info-to-member',
    from: 'team-info',
    to: 'member-profile',
    action: 'View Member',
  },

  // === Leaderboard Flow ===
  {
    id: 'leaderboard-to-main',
    from: 'leaderboard',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'leaderboard-to-profile',
    from: 'leaderboard',
    to: 'member-profile',
    action: 'View Player',
  },

  // === LiveOps Events ===
  {
    id: 'main-to-royal-pass',
    from: 'main-menu',
    to: 'royal-pass',
    action: 'Click Event',
    condition: 'events.royalPass.active',
  },
  {
    id: 'royal-pass-to-main',
    from: 'royal-pass',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'royal-pass-claim',
    from: 'royal-pass',
    to: 'reward-claim',
    action: 'Claim Reward',
  },
  {
    id: 'main-to-winning-streak',
    from: 'main-menu',
    to: 'winning-streak',
    action: 'Click Event',
    condition: 'events.winningStreak.active',
  },
  {
    id: 'winning-streak-to-main',
    from: 'winning-streak',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'main-to-team-chest',
    from: 'main-menu',
    to: 'team-chest',
    action: 'Click Event',
    condition: 'events.teamChest.active && team.inTeam',
  },
  {
    id: 'team-chest-to-main',
    from: 'team-chest',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'main-to-sky-race',
    from: 'main-menu',
    to: 'sky-race',
    action: 'Click Event',
    condition: 'events.skyRace.active',
  },
  {
    id: 'sky-race-to-main',
    from: 'sky-race',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'main-to-kings-cup',
    from: 'main-menu',
    to: 'kings-cup',
    action: 'Click Event',
    condition: 'events.kingsCup.active',
  },
  {
    id: 'kings-cup-to-main',
    from: 'kings-cup',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'main-to-clef-collection',
    from: 'main-menu',
    to: 'clef-collection',
    action: 'Click Progress Bar',
  },
  {
    id: 'clef-collection-to-main',
    from: 'clef-collection',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'main-to-lightning-rush',
    from: 'main-menu',
    to: 'lightning-rush',
    action: 'Click Event',
  },
  {
    id: 'main-to-lava-quest',
    from: 'main-menu',
    to: 'lava-quest',
    action: 'Click Event',
  },
  {
    id: 'main-to-mission-control',
    from: 'main-menu',
    to: 'mission-control',
    action: 'Click Missions',
  },
  {
    id: 'main-to-album',
    from: 'main-menu',
    to: 'album',
    action: 'Click Album',
  },
  {
    id: 'main-to-collection',
    from: 'main-menu',
    to: 'collection',
    action: 'Click Collection',
  },
  {
    id: 'album-to-card-detail',
    from: 'album',
    to: 'card-detail',
    action: 'View Card',
  },
  {
    id: 'collection-to-set-detail',
    from: 'collection',
    to: 'collection-set-detail',
    action: 'View Set',
  },

  // === Daily Rewards Flow ===
  {
    id: 'daily-rewards-to-main',
    from: 'daily-rewards',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'daily-rewards-claim',
    from: 'daily-rewards',
    to: 'reward-claim',
    action: 'Claim',
  },

  // === Reward Claim Flow ===
  {
    id: 'reward-claim-to-main',
    from: 'reward-claim',
    to: 'main-menu',
    action: 'Continue',
  },

  // === Area Tasks Flow ===
  {
    id: 'area-tasks-to-main',
    from: 'area-tasks',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'area-tasks-complete',
    from: 'area-tasks',
    to: 'area-complete',
    action: 'Complete Area',
    condition: 'allTasksComplete',
  },

  // === Area Complete Flow ===
  {
    id: 'area-complete-to-main',
    from: 'area-complete',
    to: 'main-menu',
    action: 'Continue',
  },

  // === Friends Flow ===
  {
    id: 'friends-to-main',
    from: 'friends',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'profile-to-friends',
    from: 'profile',
    to: 'friends',
    action: 'View Friends',
  },

  // === Inbox Flow ===
  {
    id: 'inbox-to-main',
    from: 'inbox',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'inbox-to-reward',
    from: 'inbox',
    to: 'reward-claim',
    action: 'Claim Reward',
  },

  // === Boosters Flow ===
  {
    id: 'boosters-to-main',
    from: 'boosters',
    to: 'main-menu',
    action: 'Back',
  },
  {
    id: 'boosters-to-shop',
    from: 'boosters',
    to: 'shop',
    action: 'Buy Boosters',
  },
];

// =============================================================================
// NODE CATEGORIES
// =============================================================================

/**
 * Categories for filtering nodes in the flowchart.
 */
export const NODE_CATEGORIES: NodeCategories = {
  core: [
    'loading',
    'main-menu',
    'level-start',
    'gameplay',
    'level-complete',
    'level-failed',
    'out-of-lives',
  ],
  shop: ['shop', 'boosters', 'free-lives'],
  social: ['team', 'leaderboard', 'friends', 'profile', 'inbox'],
  liveops: [
    'royal-pass',
    'winning-streak',
    'team-chest',
    'sky-race',
    'kings-cup',
    'clef-collection',
    'lightning-rush',
    'lava-quest',
    'mission-control',
    'album',
    'collection',
  ],
  modals: [
    'booster-select',
    'reward-claim',
    'area-complete',
    'profile-picture',
    'edit-avatar',
    'settings-modal',
    'team-info',
    'member-profile',
    'event-info',
    'card-detail',
    'collection-set-detail',
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get default node position for a node ID.
 * Returns a calculated position if not found.
 */
export function getNodePosition(nodeId: string): NodePosition {
  if (NODE_POSITIONS[nodeId]) {
    return NODE_POSITIONS[nodeId];
  }
  // Generate a random position for unknown nodes
  const hash = nodeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    x: (hash % 10) * 150,
    y: Math.floor(hash / 10) * 150,
  };
}

/**
 * Get all flow definitions from a specific node.
 */
export function getFlowsFromNode(nodeId: string): FlowDefinition[] {
  return FLOW_DEFINITIONS.filter((flow) => flow.from === nodeId);
}

/**
 * Get all flow definitions to a specific node.
 */
export function getFlowsToNode(nodeId: string): FlowDefinition[] {
  return FLOW_DEFINITIONS.filter((flow) => flow.to === nodeId);
}

/**
 * Get category for a node ID.
 */
export function getNodeCategory(nodeId: string): keyof NodeCategories | null {
  for (const [category, nodes] of Object.entries(NODE_CATEGORIES)) {
    if (nodes.includes(nodeId)) {
      return category as keyof NodeCategories;
    }
  }
  return null;
}
