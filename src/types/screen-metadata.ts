/**
 * Screen Metadata Types
 *
 * Types for the screen documentation system that shows detailed metadata
 * when clicking the info button on flowchart nodes.
 */

/**
 * Input data that a screen receives
 */
export interface ScreenInput {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

/**
 * Output action/effect from a screen
 */
export interface ScreenOutput {
  action: string;
  effect: string;
  condition?: string;
}

/**
 * Screen category for visual distinction
 */
export type ScreenCategory = 'main' | 'liveops' | 'modal' | 'social' | 'monetization';

/**
 * Complete screen metadata for documentation
 */
export interface ScreenMetadata {
  id: string;
  name: string;
  category: ScreenCategory;
  description: string;
  logic: string[];           // What happens on this screen
  conditions: string[];      // When user sees this
  inputs: ScreenInput[];     // Data this screen receives
  outputs: ScreenOutput[];   // Actions/effects from this screen
  metrics: string[];         // Analytics to track
  edgeCases: string[];       // Special cases to handle
  relatedScreens?: string[]; // Connected screens
  unlockLevel?: number;      // Level required to access
  prdLink?: string;          // Link to PRD/Confluence
}

/**
 * Registry of all screen metadata
 */
export type ScreenMetadataRegistry = Record<string, ScreenMetadata>;
