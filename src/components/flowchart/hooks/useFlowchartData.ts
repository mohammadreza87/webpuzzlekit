'use client';

/**
 * useFlowchartData Hook
 *
 * Generates React Flow nodes and edges from the flowchart configuration.
 * Supports filtering by flow type (e.g., level-flow, royal-pass, etc.)
 * Also supports detailed feature flows (clef-collection, winning-streak, super-booster)
 */

import { useMemo, useCallback } from 'react';
import type { FlowNode, FlowEdge, FlowNodeData, FlowEdgeData } from '@/types/flowchart';
import type { FlowFilter } from '@/types/simulation';
import { PAGE_REGISTRY, MODAL_REGISTRY } from '@/config/registry';
import {
  FLOW_DEFINITIONS,
  getNodePosition,
} from '@/config/flowchart.config';
import { FEATURE_FLOWS } from '@/config/feature-flows.config';
import { useSimulation } from '@/store/SimulationContext';
import { useAdmin } from '@/store';

// Mapping of liveops page IDs to their event IDs
const LIVEOPS_PAGE_TO_EVENT: Record<string, string> = {
  'royal-pass': 'royal-pass',
  'sky-race': 'sky-race',
  'kings-cup': 'kings-cup',
  'team-chest': 'team-chest',
  'clef-collection': 'clef-collection',
  'lightning-rush': 'lightning-rush',
  'lava-quest': 'lava-quest',
  'mission-control': 'mission-control',
  'winning-streak': 'winning-streak',
  'album': 'album',
  'collection': 'collection',
};

interface UseFlowchartDataReturn {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// Define which nodes belong to each filter
const FILTER_NODE_SETS: Record<FlowFilter, string[]> = {
  'all': [], // Empty means all nodes
  'core-loop': [
    'main-menu', 'gameplay', 'level-start', 'level-complete', 'level-failed',
    'booster-select', 'out-of-lives', 'loading'
  ],
  'level-flow': [
    'main-menu', 'level-start', 'booster-select', 'gameplay',
    'level-complete', 'level-failed', 'out-of-lives', 'free-lives', 'reward-claim'
  ],
  'royal-pass': [
    'main-menu', 'royal-pass', 'reward-claim', 'shop'
  ],
  'winning-streak': [], // Uses detailed FEATURE_FLOWS instead
  'team-features': [
    'main-menu', 'team', 'team-chest', 'friends', 'leaderboard'
  ],
  'shop-monetization': [
    'main-menu', 'shop', 'out-of-lives', 'boosters', 'reward-claim'
  ],
  'social': [
    'main-menu', 'friends', 'leaderboard', 'profile', 'team', 'inbox'
  ],
  'liveops': [
    'main-menu', 'royal-pass', 'winning-streak', 'sky-race', 'kings-cup',
    'team-chest', 'lightning-rush', 'lava-quest', 'mission-control',
    'album', 'collection', 'clef-collection'
  ],
  // Detailed feature flows - use FEATURE_FLOWS config instead
  'clef-collection': [], // Uses FEATURE_FLOWS
  'super-booster': [], // Uses FEATURE_FLOWS
};

// Detailed feature flow IDs
const DETAILED_FEATURE_FLOWS = ['clef-collection', 'winning-streak', 'super-booster'];

export function useFlowchartData(): UseFlowchartDataReturn {
  const { state, evaluateCondition } = useSimulation();
  const { isEventEnabled } = useAdmin();
  const flowFilter = state.settings?.flowFilter || 'all';

  // Check if this is a detailed feature flow
  const isDetailedFeatureFlow = DETAILED_FEATURE_FLOWS.includes(flowFilter);

  // Check if we should show all features
  const showAllFeatures = state.settings?.showAllFeatures ?? true;

  // Helper to check if a page is available (either not a liveops page or event is enabled)
  const isPageAvailable = useCallback((pageId: string): boolean => {
    // If showAllFeatures is on, show everything
    if (showAllFeatures) return true;
    const eventId = LIVEOPS_PAGE_TO_EVENT[pageId];
    if (!eventId) return true; // Not a liveops page, always available
    return isEventEnabled(eventId);
  }, [isEventEnabled, showAllFeatures]);

  // Create a stable reference for simulation values that affect conditions
  // This ensures useMemo recalculates when these values change
  const simulationValues = {
    player: state.player,
    boosters: state.boosters,
    events: state.events,
    team: state.team,
    features: state.features,
  };

  // Get the set of allowed nodes for the current filter (for non-detailed flows)
  const allowedNodes = useMemo(() => {
    if (isDetailedFeatureFlow) return null;
    const filterSet = FILTER_NODE_SETS[flowFilter];
    if (filterSet.length === 0) return null; // null means all nodes are allowed
    return new Set(filterSet);
  }, [flowFilter, isDetailedFeatureFlow]);

  const nodes = useMemo<FlowNode[]>(() => {
    // Handle detailed feature flows
    if (isDetailedFeatureFlow && FEATURE_FLOWS[flowFilter]) {
      const featureFlow = FEATURE_FLOWS[flowFilter];
      return featureFlow.nodes.map((node) => ({
        id: node.id,
        type: 'screen',
        position: node.position,
        data: {
          id: node.id,
          type: node.type === 'page' ? 'screen' : node.type === 'modal' ? 'modal' : 'screen',
          label: node.label.replace(/\n/g, ' '),
          category: node.category,
          isActive: state.currentScreen === node.id,
          isBlocked: false,
          nodeType: node.type, // decision, action, state, page, modal
          description: node.description,
        } as FlowNodeData,
      }));
    }

    const result: FlowNode[] = [];

    // Helper to check if node should be included
    const shouldIncludeNode = (id: string) => {
      // First check if it's a liveops page that's disabled
      if (!isPageAvailable(id)) return false;
      // Then check the filter
      if (!allowedNodes) return true;
      return allowedNodes.has(id);
    };

    // Add loading node
    if (shouldIncludeNode('loading')) {
      result.push({
        id: 'loading',
        type: 'screen',
        position: getNodePosition('loading'),
        data: {
          id: 'loading',
          type: 'screen',
          label: 'Loading',
          category: 'main',
          isActive: state.currentScreen === 'loading',
          isBlocked: false,
        },
      });
    }

    // Add page nodes
    Object.entries(PAGE_REGISTRY).forEach(([id, config]) => {
      if (!shouldIncludeNode(id)) return;

      const position = getNodePosition(id);

      const nodeData: FlowNodeData = {
        id,
        type: 'screen',
        pageId: id as keyof typeof PAGE_REGISTRY,
        label: config.name,
        category: config.category === 'liveops' ? 'liveops' : 'main',
        isActive: state.currentScreen === id,
        isBlocked: false,
      };

      result.push({
        id,
        type: 'screen',
        position,
        data: nodeData,
      });
    });

    // Add modal nodes (subset for key modals that exist)
    const keyModals = [
      'level-start',
      'level-complete',
      'level-failed',
      'out-of-lives',
      'booster-select',
      'reward-claim',
      'free-lives',
    ];

    keyModals.forEach((modalId) => {
      if (!shouldIncludeNode(modalId)) return;

      const config = MODAL_REGISTRY[modalId as keyof typeof MODAL_REGISTRY];
      if (!config) return;

      const position = getNodePosition(modalId);

      const nodeData: FlowNodeData = {
        id: modalId,
        type: 'modal',
        modalId: modalId as keyof typeof MODAL_REGISTRY,
        label: config.name,
        category: 'modal',
        isActive: state.currentScreen === modalId,
        isBlocked: false,
      };

      result.push({
        id: modalId,
        type: 'screen',
        position,
        data: nodeData,
      });
    });

    return result;
  }, [state.currentScreen, allowedNodes, isDetailedFeatureFlow, flowFilter, isPageAvailable]);

  const edges = useMemo<FlowEdge[]>(() => {
    // Handle detailed feature flows
    if (isDetailedFeatureFlow && FEATURE_FLOWS[flowFilter]) {
      const featureFlow = FEATURE_FLOWS[flowFilter];
      return featureFlow.edges.map((edge) => {
        const isConditionMet = edge.condition ? evaluateCondition(edge.condition) : true;

        const edgeData: FlowEdgeData = {
          label: edge.label,
          condition: edge.condition,
          probability: edge.probability,
          isActive: isConditionMet && state.currentScreen === edge.from,
          isConditionMet,
        };

        return {
          id: edge.id,
          source: edge.from,
          target: edge.to,
          type: 'labeled',
          data: edgeData,
          animated: edgeData.isActive,
          style: {
            stroke: isConditionMet ? '#6b7280' : '#374151',
            strokeWidth: edgeData.isActive ? 3 : 2,
            opacity: isConditionMet ? 1 : 0.4,
            strokeDasharray: edge.style === 'dashed' ? '5,5' : undefined,
          },
        };
      });
    }

    // Get set of node IDs currently visible
    const visibleNodeIds = new Set(nodes.map(n => n.id));

    return FLOW_DEFINITIONS
      .filter((flow) => {
        // Only include edges where both source and target are visible
        return visibleNodeIds.has(flow.from) && visibleNodeIds.has(flow.to);
      })
      .map((flow) => {
        const isConditionMet = flow.condition ? evaluateCondition(flow.condition) : true;

        const edgeData: FlowEdgeData = {
          label: flow.action,
          condition: flow.condition,
          probability: flow.probability,
          isActive: isConditionMet && state.currentScreen === flow.from,
          isConditionMet,
        };

        return {
          id: flow.id,
          source: flow.from,
          target: flow.to,
          type: 'labeled',
          data: edgeData,
          animated: edgeData.isActive,
          style: {
            stroke: isConditionMet ? '#6b7280' : '#374151',
            strokeWidth: edgeData.isActive ? 3 : 2,
            opacity: isConditionMet ? 1 : 0.4,
          },
        };
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, state.currentScreen, evaluateCondition, isDetailedFeatureFlow, flowFilter,
      // Include simulation values so edges update when player state changes
      simulationValues.player.coins,
      simulationValues.player.lives,
      simulationValues.player.level,
      simulationValues.team.inTeam,
      simulationValues.events.royalPass.active,
      simulationValues.events.winningStreak.active,
  ]);

  return { nodes, edges };
}
