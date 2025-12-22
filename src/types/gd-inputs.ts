/**
 * GD (Game Design) input types for configuration forms
 *
 * These types power the game design tools that allow designers
 * to configure LiveOps events, economy parameters, and game features.
 */

/**
 * Types of input fields available in GD forms
 */
export type InputFieldType =
  | 'number'
  | 'text'
  | 'select'
  | 'toggle'
  | 'reward'
  | 'array'
  | 'slider'
  | 'duration'
  | 'percentage';

/**
 * Reward type for reward input fields
 */
export interface RewardValue {
  type: 'coins' | 'gems' | 'stars' | 'lives' | 'booster';
  amount: number;
  boosterId?: string;
}

/**
 * Select option for dropdown fields
 */
export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

/**
 * Input field definition
 */
export interface InputField {
  key: string;
  label: string;
  type: InputFieldType;
  defaultValue: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: SelectOption[];
  description?: string;
  required?: boolean;
  placeholder?: string;
  unit?: string; // e.g., "minutes", "$", "%", "days"
  group?: string; // Group related fields together
}

/**
 * Tier schema for tiered reward systems
 */
export interface TierSchema {
  fields: InputField[];
  defaultTiers: number;
  maxTiers: number;
  minTiers?: number;
}

/**
 * GD Schema for a game module
 */
export interface GDSchema {
  moduleId: string;
  moduleName: string;
  description: string;
  icon?: string;
  category: 'liveops' | 'economy' | 'progression' | 'social' | 'monetization';
  fields: InputField[];
  tiers?: TierSchema;
  presets?: GDPreset[];
}

/**
 * Preset configuration for quick setup
 */
export interface GDPreset {
  id: string;
  name: string;
  description: string;
  values: Record<string, unknown>;
  tiers?: TierData[];
}

/**
 * Tier data for tiered reward systems
 */
export interface TierData {
  [key: string]: unknown;
}

/**
 * GD form values
 */
export interface GDFormValues {
  moduleId: string;
  [key: string]: unknown;
  tiers?: TierData[];
}
