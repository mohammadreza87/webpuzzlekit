'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Icon code to SVG file mapping
 * Maps game item abbreviations to actual icon files
 */
const iconMap: Record<string, string> = {
  // Boosters
  ARW: '/icons/Arrow-Right.svg',     // Arrow booster
  TNT: '/icons/Fire.svg',            // TNT/Dynamite booster
  HAM: '/icons/Archive.svg',         // Hammer booster
  GLV: '/icons/3D Hand.svg',         // Glove booster
  BST: '/icons/Star-Filled.svg',     // Generic booster
  BLL: '/icons/Badge.svg',           // Ball/Balloon booster
  RKT: '/icons/Send.svg',            // Rocket booster

  // Resources
  HRT: '/icons/Heart-Filled.svg',    // Heart/Life
  INF: '/icons/Clock.svg',           // Infinite time
  GFT: '/icons/Shipping.svg',        // Gift
  GIFT: '/icons/Shipping.svg',       // Gift (alternative)
  COIN: '/icons/Medal.svg',          // Coin
  CNS: '/icons/Medal.svg',           // Coins
  KEY: '/icons/Lock.svg',            // Key

  // Cards & Collections
  CRD: '/icons/Category.svg',        // Card
  CHT: '/icons/Archive.svg',         // Chest
  CHT1: '/icons/Archive.svg',        // Chest 1
  CHT2: '/icons/Archive.svg',        // Chest 2
  TRP: '/icons/Badge.svg',           // Trophy
  CAT: '/icons/Category.svg',        // Category
  STAR: '/icons/Star-Filled.svg',    // Star
  ITM: '/icons/Category.svg',        // Item
  PWR: '/icons/Fire.svg',            // Power-up

  // Actions
  PRO: '/icons/Profile-Filled.svg',  // Profile
};

interface GameIconProps {
  code: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * GameIcon Component
 * Renders SVG icons based on game item codes
 * Falls back to displaying the code as text if no icon mapping exists
 */
export function GameIcon({ code, size = 16, className = '', alt }: GameIconProps) {
  const iconPath = iconMap[code.toUpperCase()];

  if (!iconPath) {
    // Fallback to text if no icon mapping
    return (
      <span className={`text-text-secondary font-bold ${className}`} style={{ fontSize: size * 0.75 }}>
        {code}
      </span>
    );
  }

  return (
    <Image
      src={iconPath}
      alt={alt || code}
      width={size}
      height={size}
      className={className}
    />
  );
}

/**
 * Get icon path by code
 * Utility function for components that need direct path access
 */
export function getGameIconPath(code: string): string | null {
  return iconMap[code.toUpperCase()] || null;
}

/**
 * Check if an icon code has a mapped icon
 */
export function hasGameIcon(code: string): boolean {
  return code.toUpperCase() in iconMap;
}
