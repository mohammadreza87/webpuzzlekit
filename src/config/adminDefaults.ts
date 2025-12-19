import type { PageId } from '@/types';
import { EVENT_REGISTRY, getAllEventIds } from '@/config/registry';

// Device preset interface
export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  category: 'iphone' | 'ipad' | 'android';
}

// Available device presets
export const devicePresets: DevicePreset[] = [
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', width: 393, height: 852, category: 'iphone' },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', width: 430, height: 932, category: 'iphone' },
  { id: 'iphone-se', name: 'iPhone SE', width: 375, height: 667, category: 'iphone' },
  { id: 'iphone-14', name: 'iPhone 14', width: 390, height: 844, category: 'iphone' },
  { id: 'ipad-mini', name: 'iPad Mini', width: 744, height: 1133, category: 'ipad' },
  { id: 'ipad-pro-11', name: 'iPad Pro 11"', width: 834, height: 1194, category: 'ipad' },
  { id: 'pixel-7', name: 'Pixel 7', width: 412, height: 915, category: 'android' },
  { id: 'galaxy-s23', name: 'Galaxy S23', width: 360, height: 780, category: 'android' },
];

// Default device
export const defaultDeviceId = 'iphone-15-pro-max';

// Tab configuration interface
export interface TabConfig {
  id: string;
  icon: string;
  label: string;
  page: PageId;
  enabled: boolean;
}

// Event placement configuration
// Uses string[] for backward compatibility with localStorage
export interface EventPlacement {
  left: string[];
  right: string[];
}

// Admin configuration interface
export interface AdminConfig {
  tabs: TabConfig[];
  enabledEvents: string[]; // Uses string[] for backward compatibility with localStorage
  eventPlacement: EventPlacement;
  theme: ThemeConfig;
  showAreaButton: boolean;
  deviceId: string; // Selected device preset ID
}

// Theme configuration
export interface ThemeConfig {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  surface: string;
  surfaceLight: string;
  surfaceDark: string;
  gold: string;
  goldLight: string;
  goldDark: string;
}

// Default tabs (current configuration)
export const defaultTabs: TabConfig[] = [
  { id: 'areas', icon: '/icons/Star-Filled.svg', label: 'Areas', page: 'area-tasks', enabled: false },
  { id: 'leaderboard', icon: '/icons/Medal.svg', label: 'Leaderboard', page: 'leaderboard', enabled: false },
  { id: 'home', icon: '/icons/Home.svg', label: 'Home', page: 'main-menu', enabled: true },
  { id: 'team', icon: '/icons/2User.svg', label: 'Team', page: 'team', enabled: false },
  { id: 'collection', icon: '/icons/Category.svg', label: 'Collection', page: 'collection', enabled: false },
];

// All available tabs that can be added
export const allAvailableTabs: TabConfig[] = [
  { id: 'areas', icon: '/icons/Star-Filled.svg', label: 'Areas', page: 'area-tasks', enabled: true },
  { id: 'leaderboard', icon: '/icons/Medal.svg', label: 'Leaderboard', page: 'leaderboard', enabled: true },
  { id: 'home', icon: '/icons/Home.svg', label: 'Home', page: 'main-menu', enabled: true },
  { id: 'team', icon: '/icons/2User.svg', label: 'Team', page: 'team', enabled: true },
  { id: 'collection', icon: '/icons/Category.svg', label: 'Collection', page: 'collection', enabled: true },
  { id: 'shop', icon: '/icons/Shopping-2.svg', label: 'Shop', page: 'shop', enabled: false },
  { id: 'inbox', icon: '/icons/Mail.svg', label: 'Inbox', page: 'inbox', enabled: false },
  { id: 'profile', icon: '/icons/Profile.svg', label: 'Profile', page: 'profile', enabled: false },
  { id: 'boosters', icon: '/icons/Fire.svg', label: 'Boosters', page: 'boosters', enabled: false },
  { id: 'daily-rewards', icon: '/icons/Star.svg', label: 'Rewards', page: 'daily-rewards', enabled: false },
  { id: 'friends', icon: '/icons/Heart.svg', label: 'Friends', page: 'friends', enabled: false },
];

/**
 * All LiveOps events - derived from registry
 * Use this for UI that needs to list all available events
 */
export const allEvents = getAllEventIds().map(id => ({
  id,
  name: EVENT_REGISTRY[id].name,
  icon: EVENT_REGISTRY[id].icon,
}));

// Default enabled events (only clef-collection for progress bar)
export const defaultEnabledEvents: string[] = ['clef-collection'];

// Default event placement (empty - no side buttons, only clef-collection progress bar at top)
export const defaultEventPlacement: EventPlacement = {
  left: [],
  right: [],
};

// Default wireframe theme (Pure Grayscale)
export const defaultTheme: ThemeConfig = {
  primary: '#333333',      // Dark gray
  primaryLight: '#4D4D4D', // Medium-dark gray
  primaryDark: '#1A1A1A',  // Near black
  secondary: '#666666',    // Medium gray
  secondaryLight: '#808080', // Gray
  secondaryDark: '#4D4D4D',  // Medium-dark gray
  accent: '#4D4D4D',       // Dark gray (no colors in wireframes)
  accentLight: '#E5E5E5',  // Light gray
  accentDark: '#333333',   // Dark gray
  surface: '#F5F5F5',      // Light gray
  surfaceLight: '#FFFFFF', // White
  surfaceDark: '#CCCCCC',  // Medium-light gray
  gold: '#808080',         // Gray (no gold in wireframes)
  goldLight: '#B3B3B3',    // Light gray
  goldDark: '#666666',     // Medium gray
};

// Default admin configuration
export const defaultAdminConfig: AdminConfig = {
  tabs: defaultTabs,
  enabledEvents: defaultEnabledEvents,
  eventPlacement: defaultEventPlacement,
  theme: defaultTheme,
  showAreaButton: true,
  deviceId: defaultDeviceId,
};

// LocalStorage key
export const ADMIN_CONFIG_KEY = 'puzzle-kit-admin-config';
