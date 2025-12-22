/**
 * Feature-Specific Flow Configurations
 *
 * Detailed flowcharts for specific features showing the complete user journey
 * with all screens, modals, decisions, and outcomes.
 */

import type { FlowFilter } from '@/types/simulation';

// Node type for feature flows
export interface FeatureFlowNode {
  id: string;
  label: string;
  type: 'page' | 'modal' | 'decision' | 'action' | 'state';
  category: 'main' | 'liveops' | 'modal' | 'decision' | 'action';
  description?: string;
  position: { x: number; y: number };
}

// Edge type for feature flows
export interface FeatureFlowEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  condition?: string;
  probability?: number;
  style?: 'solid' | 'dashed';
}

// Complete feature flow definition
export interface FeatureFlowDefinition {
  id: FlowFilter;
  name: string;
  description: string;
  nodes: FeatureFlowNode[];
  edges: FeatureFlowEdge[];
}

// =============================================================================
// CLEF COLLECTION FLOW
// =============================================================================

export const CLEF_COLLECTION_FLOW: FeatureFlowDefinition = {
  id: 'clef-collection' as FlowFilter,
  name: 'Clef Collection',
  description: 'Complete flow for the Clef Collection event',
  nodes: [
    // Entry points
    { id: 'main-menu', label: 'Main Menu', type: 'page', category: 'main', position: { x: 400, y: 0 } },

    // Clef Collection screens
    { id: 'clef-icon', label: 'Clef Icon\n(on Main Menu)', type: 'action', category: 'action', position: { x: 400, y: 100 } },
    { id: 'clef-page', label: 'Clef Collection\nProgress Page', type: 'page', category: 'liveops', position: { x: 400, y: 200 } },
    { id: 'clef-info', label: 'How It Works\nInfo Modal', type: 'modal', category: 'modal', position: { x: 200, y: 200 } },

    // Decision: Has milestones to claim?
    { id: 'check-milestone', label: 'Milestone\nReached?', type: 'decision', category: 'decision', position: { x: 200, y: 300 } },
    { id: 'claim-milestone', label: 'Claim\nReward', type: 'action', category: 'action', position: { x: 50, y: 300 } },

    // Level flow
    { id: 'play-button', label: 'Play Level\nButton', type: 'action', category: 'action', position: { x: 400, y: 350 } },
    { id: 'level-start', label: 'Level Start\nModal', type: 'modal', category: 'modal', position: { x: 400, y: 450 } },
    { id: 'booster-select', label: 'Booster\nSelect', type: 'modal', category: 'modal', position: { x: 400, y: 550 } },
    { id: 'gameplay', label: 'Gameplay\n(Collecting Clefs)', type: 'page', category: 'main', position: { x: 400, y: 650 } },

    // Outcomes
    { id: 'win-decision', label: 'Level\nResult?', type: 'decision', category: 'decision', position: { x: 400, y: 750 } },
    { id: 'level-complete', label: 'Level Complete\n+ Clefs Added', type: 'modal', category: 'modal', position: { x: 250, y: 850 } },
    { id: 'level-failed', label: 'Level Failed\n(Clefs Lost!)', type: 'modal', category: 'modal', position: { x: 550, y: 850 } },

    // Post-level
    { id: 'update-progress', label: 'Update Clef\nProgress', type: 'state', category: 'action', position: { x: 250, y: 950 } },
    { id: 'reset-clefs', label: 'Clefs Reset\nto 0', type: 'state', category: 'action', position: { x: 550, y: 950 } },

    // Final actions
    { id: 'retry-decision', label: 'Player\nChoice?', type: 'decision', category: 'decision', position: { x: 550, y: 1050 } },
  ],
  edges: [
    // Entry
    { id: 'e1', from: 'main-menu', to: 'clef-icon', label: 'Click Clef Icon' },
    { id: 'e2', from: 'clef-icon', to: 'clef-page', label: 'Open' },

    // Info modal
    { id: 'e3', from: 'clef-page', to: 'clef-info', label: 'Click ?' },
    { id: 'e4', from: 'clef-info', to: 'clef-page', label: 'Close' },

    // Check milestones
    { id: 'e5', from: 'clef-page', to: 'check-milestone', label: 'Check' },
    { id: 'e6', from: 'check-milestone', to: 'claim-milestone', label: 'Yes', condition: 'milestone.reached' },
    { id: 'e7', from: 'claim-milestone', to: 'clef-page', label: 'Claimed' },

    // Play flow
    { id: 'e8', from: 'clef-page', to: 'play-button', label: 'Play' },
    { id: 'e9', from: 'play-button', to: 'level-start', label: 'Open Modal' },
    { id: 'e10', from: 'level-start', to: 'booster-select', label: 'Continue' },
    { id: 'e11', from: 'booster-select', to: 'gameplay', label: 'Start Level' },

    // Win/Lose
    { id: 'e12', from: 'gameplay', to: 'win-decision', label: 'Level End' },
    { id: 'e13', from: 'win-decision', to: 'level-complete', label: 'WIN', probability: 65 },
    { id: 'e14', from: 'win-decision', to: 'level-failed', label: 'LOSE', probability: 35 },

    // Post-win
    { id: 'e15', from: 'level-complete', to: 'update-progress', label: 'Add Clefs' },
    { id: 'e16', from: 'update-progress', to: 'clef-page', label: 'Continue' },

    // Post-lose
    { id: 'e17', from: 'level-failed', to: 'reset-clefs', label: 'Reset!' },
    { id: 'e18', from: 'reset-clefs', to: 'retry-decision', label: '' },
    { id: 'e19', from: 'retry-decision', to: 'level-start', label: 'Retry' },
    { id: 'e20', from: 'retry-decision', to: 'clef-page', label: 'Give Up' },

    // Back to main
    { id: 'e21', from: 'clef-page', to: 'main-menu', label: 'Close (X)' },
  ],
};

// =============================================================================
// WINNING STREAK (BOOSTER STREAK) FLOW
// =============================================================================

export const WINNING_STREAK_FLOW: FeatureFlowDefinition = {
  id: 'winning-streak' as FlowFilter,
  name: 'Winning Streak',
  description: 'Booster Streak ladder progression system',
  nodes: [
    // Entry
    { id: 'main-menu', label: 'Main Menu', type: 'page', category: 'main', position: { x: 400, y: 0 } },

    // Streak screens
    { id: 'streak-icon', label: 'Streak Icon\n(on Main Menu)', type: 'action', category: 'action', position: { x: 400, y: 100 } },
    { id: 'streak-intro', label: 'Winning Streak\nIntro Screen', type: 'page', category: 'liveops', position: { x: 400, y: 200 } },
    { id: 'streak-ladder', label: 'Streak Ladder\n(Tier Progress)', type: 'page', category: 'liveops', position: { x: 400, y: 300 } },
    { id: 'streak-info', label: 'How It Works\nInfo Modal', type: 'modal', category: 'modal', position: { x: 200, y: 300 } },

    // Grand prize check
    { id: 'grand-prize-check', label: 'Max Tier\nReached?', type: 'decision', category: 'decision', position: { x: 200, y: 400 } },
    { id: 'claim-grand-prize', label: 'Claim Grand\nPrize', type: 'action', category: 'action', position: { x: 50, y: 400 } },

    // Level flow
    { id: 'play-button', label: 'Play Level\nButton', type: 'action', category: 'action', position: { x: 400, y: 450 } },
    { id: 'level-start', label: 'Level Start\n(Shows Streak Tier)', type: 'modal', category: 'modal', position: { x: 400, y: 550 } },
    { id: 'booster-select', label: 'Booster Select\n+ Streak Boosters', type: 'modal', category: 'modal', position: { x: 400, y: 650 } },
    { id: 'gameplay', label: 'Gameplay\n(with Boosters)', type: 'page', category: 'main', position: { x: 400, y: 750 } },

    // Outcomes
    { id: 'win-decision', label: 'Level\nResult?', type: 'decision', category: 'decision', position: { x: 400, y: 850 } },
    { id: 'level-complete', label: 'Level Complete\n+ Tier Up', type: 'modal', category: 'modal', position: { x: 250, y: 950 } },
    { id: 'level-failed', label: 'Level Failed\n(Streak Reset!)', type: 'modal', category: 'modal', position: { x: 550, y: 950 } },

    // State changes
    { id: 'tier-up', label: 'Increase\nStreak Tier', type: 'state', category: 'action', position: { x: 250, y: 1050 } },
    { id: 'streak-reset', label: 'Reset to\nTier 0', type: 'state', category: 'action', position: { x: 550, y: 1050 } },

    // Retry decision
    { id: 'retry-decision', label: 'Player\nChoice?', type: 'decision', category: 'decision', position: { x: 550, y: 1150 } },
  ],
  edges: [
    // Entry
    { id: 'e1', from: 'main-menu', to: 'streak-icon', label: 'Click Streak' },
    { id: 'e2', from: 'streak-icon', to: 'streak-intro', label: 'Open' },
    { id: 'e3', from: 'streak-intro', to: 'streak-ladder', label: 'View Progress' },

    // Info modal
    { id: 'e4', from: 'streak-ladder', to: 'streak-info', label: 'Click ?' },
    { id: 'e5', from: 'streak-info', to: 'streak-ladder', label: 'Got It!' },

    // Grand prize
    { id: 'e6', from: 'streak-ladder', to: 'grand-prize-check', label: 'Check' },
    { id: 'e7', from: 'grand-prize-check', to: 'claim-grand-prize', label: 'Yes (Max Tier)', condition: 'tier >= maxTier' },
    { id: 'e8', from: 'claim-grand-prize', to: 'streak-ladder', label: 'Claimed' },

    // Play flow
    { id: 'e9', from: 'streak-ladder', to: 'play-button', label: 'Play' },
    { id: 'e10', from: 'play-button', to: 'level-start', label: 'Open Modal' },
    { id: 'e11', from: 'level-start', to: 'booster-select', label: 'Continue' },
    { id: 'e12', from: 'booster-select', to: 'gameplay', label: 'Start Level' },

    // Win/Lose
    { id: 'e13', from: 'gameplay', to: 'win-decision', label: 'Level End' },
    { id: 'e14', from: 'win-decision', to: 'level-complete', label: 'WIN', probability: 65 },
    { id: 'e15', from: 'win-decision', to: 'level-failed', label: 'LOSE', probability: 35 },

    // Post-win
    { id: 'e16', from: 'level-complete', to: 'tier-up', label: 'Tier +1' },
    { id: 'e17', from: 'tier-up', to: 'main-menu', label: 'Continue' },

    // Post-lose
    { id: 'e18', from: 'level-failed', to: 'streak-reset', label: 'Reset!' },
    { id: 'e19', from: 'streak-reset', to: 'retry-decision', label: '' },
    { id: 'e20', from: 'retry-decision', to: 'level-start', label: 'Retry' },
    { id: 'e21', from: 'retry-decision', to: 'main-menu', label: 'Give Up' },

    // Back navigation
    { id: 'e22', from: 'streak-ladder', to: 'main-menu', label: 'Close (X)' },
    { id: 'e23', from: 'streak-intro', to: 'main-menu', label: 'Close (X)' },
  ],
};

// =============================================================================
// SUPER BOOSTER FLOW (Harmonic Blessing)
// =============================================================================

export const SUPER_BOOSTER_FLOW: FeatureFlowDefinition = {
  id: 'super-booster' as FlowFilter,
  name: 'Super Booster',
  description: 'Special booster earned at max streak tier',
  nodes: [
    // Entry
    { id: 'main-menu', label: 'Main Menu', type: 'page', category: 'main', position: { x: 400, y: 0 } },

    // Streak progression to super booster
    { id: 'streak-tier', label: 'Current Streak\nTier', type: 'state', category: 'action', position: { x: 400, y: 100 } },
    { id: 'tier-check', label: 'Tier 4\n(Max)?', type: 'decision', category: 'decision', position: { x: 400, y: 200 } },

    // Super booster unlock
    { id: 'super-booster-unlock', label: 'Super Booster\nUnlocked!', type: 'modal', category: 'modal', position: { x: 250, y: 300 } },
    { id: 'super-booster-info', label: 'Super Booster\nInfo Modal', type: 'modal', category: 'modal', position: { x: 100, y: 400 } },

    // Level with super booster
    { id: 'level-start', label: 'Level Start\n(Super Booster Shown)', type: 'modal', category: 'modal', position: { x: 400, y: 400 } },
    { id: 'booster-select', label: 'Booster Select\n+ SUPER BOOSTER', type: 'modal', category: 'modal', position: { x: 400, y: 500 } },
    { id: 'super-active', label: 'Super Booster\nActive', type: 'state', category: 'action', position: { x: 250, y: 550 } },
    { id: 'gameplay', label: 'Gameplay\n(Super Power Active)', type: 'page', category: 'main', position: { x: 400, y: 650 } },

    // Outcomes
    { id: 'win-decision', label: 'Level\nResult?', type: 'decision', category: 'decision', position: { x: 400, y: 750 } },
    { id: 'level-complete', label: 'Level Complete\n(Keep Super Booster)', type: 'modal', category: 'modal', position: { x: 250, y: 850 } },
    { id: 'level-failed', label: 'Level Failed\n(Lose Super Booster)', type: 'modal', category: 'modal', position: { x: 550, y: 850 } },

    // States
    { id: 'keep-super', label: 'Super Booster\nMaintained', type: 'state', category: 'action', position: { x: 250, y: 950 } },
    { id: 'lose-super', label: 'Super Booster\nLost + Streak Reset', type: 'state', category: 'action', position: { x: 550, y: 950 } },
  ],
  edges: [
    // Entry and tier check
    { id: 'e1', from: 'main-menu', to: 'streak-tier', label: 'Check Streak' },
    { id: 'e2', from: 'streak-tier', to: 'tier-check', label: '' },
    { id: 'e3', from: 'tier-check', to: 'super-booster-unlock', label: 'Yes (Tier 4)', condition: 'tier === 4' },
    { id: 'e4', from: 'tier-check', to: 'level-start', label: 'No (Tier < 4)' },

    // Super booster flow
    { id: 'e5', from: 'super-booster-unlock', to: 'super-booster-info', label: 'Info ?' },
    { id: 'e6', from: 'super-booster-info', to: 'super-booster-unlock', label: 'Close' },
    { id: 'e7', from: 'super-booster-unlock', to: 'level-start', label: 'Continue' },

    // Level with super booster
    { id: 'e8', from: 'level-start', to: 'booster-select', label: 'Continue' },
    { id: 'e9', from: 'booster-select', to: 'super-active', label: 'Super Selected' },
    { id: 'e10', from: 'super-active', to: 'gameplay', label: 'Start' },

    // Win/Lose with super booster
    { id: 'e11', from: 'gameplay', to: 'win-decision', label: 'Level End' },
    { id: 'e12', from: 'win-decision', to: 'level-complete', label: 'WIN', probability: 75 },
    { id: 'e13', from: 'win-decision', to: 'level-failed', label: 'LOSE', probability: 25 },

    // Outcomes
    { id: 'e14', from: 'level-complete', to: 'keep-super', label: 'Keep Streak' },
    { id: 'e15', from: 'keep-super', to: 'main-menu', label: 'Continue' },
    { id: 'e16', from: 'level-failed', to: 'lose-super', label: 'Reset All!' },
    { id: 'e17', from: 'lose-super', to: 'main-menu', label: 'Back to Start' },
  ],
};

// =============================================================================
// EXPORTS
// =============================================================================

export const FEATURE_FLOWS: Record<string, FeatureFlowDefinition> = {
  'clef-collection': CLEF_COLLECTION_FLOW,
  'winning-streak': WINNING_STREAK_FLOW,
  'super-booster': SUPER_BOOSTER_FLOW,
};

export function getFeatureFlow(flowId: string): FeatureFlowDefinition | undefined {
  return FEATURE_FLOWS[flowId];
}

export function getAvailableFeatureFlows(): { id: string; name: string; description: string }[] {
  return Object.values(FEATURE_FLOWS).map(flow => ({
    id: flow.id,
    name: flow.name,
    description: flow.description,
  }));
}
