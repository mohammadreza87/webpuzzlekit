/**
 * Flowchart types for the visual flow documentation system
 */

import type { Node, Edge } from '@xyflow/react';
import type { PageId, ModalId, EventId } from '@/config/registry';

/**
 * Types of nodes in the flowchart
 */
export type FlowNodeType = 'screen' | 'modal' | 'event' | 'decision';

/**
 * Data associated with each flowchart node
 */
export interface FlowNodeData extends Record<string, unknown> {
  id: string;
  type: FlowNodeType;
  pageId?: PageId;
  modalId?: ModalId;
  eventId?: EventId;
  label: string;
  category: 'main' | 'liveops' | 'modal' | 'decision' | 'action';
  thumbnail?: string;
  isActive?: boolean; // Highlighted in simulation
  isBlocked?: boolean; // Grayed out (condition not met)
  // For detailed feature flows
  nodeType?: 'page' | 'modal' | 'decision' | 'action' | 'state';
  description?: string;
}

/**
 * Data associated with each flowchart edge
 */
export interface FlowEdgeData extends Record<string, unknown> {
  label: string; // Action label ("Win", "Lose", "Click")
  condition?: string; // Condition expression
  isActive?: boolean; // Highlighted path
  isConditionMet?: boolean; // Whether condition is satisfied
  probability?: number; // Expected % of users
}

/**
 * Typed React Flow node
 */
export type FlowNode = Node<FlowNodeData>;

/**
 * Typed React Flow edge
 */
export type FlowEdge = Edge<FlowEdgeData>;

/**
 * Definition for a flow connection in configuration
 */
export interface FlowDefinition {
  id: string;
  from: string; // Source node ID
  to: string; // Target node ID
  action: string; // Edge label
  condition?: string; // Optional condition expression
  probability?: number; // Expected conversion rate
}

/**
 * Node position in the flowchart
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Categories for filtering nodes
 */
export interface NodeCategories {
  core: string[];
  shop: string[];
  social: string[];
  liveops: string[];
  modals: string[];
}

/**
 * Filter state for the flowchart
 */
export interface FlowchartFilter {
  categories: (keyof NodeCategories)[];
  showModals: boolean;
  showEvents: boolean;
  searchQuery: string;
}
