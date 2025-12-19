'use client';

import { useEffect, useRef } from 'react';

/**
 * Lazy-loaded page modules to preload in background
 * These will be loaded after initial render to improve subsequent navigation
 */
const LAZY_PAGE_MODULES = [
  // Menu pages
  () => import('@/components/menus/TeamPage'),
  () => import('@/components/menus/InboxPage'),
  () => import('@/components/menus/DailyRewardsPage'),
  () => import('@/components/menus/ProfilePage'),
  () => import('@/components/menus/FriendsPage'),
  () => import('@/components/menus/BoostersPage'),
  () => import('@/components/menus/AreaTasksPage'),
  () => import('@/components/admin'),
  // LiveOps pages
  () => import('@/components/liveops/RoyalPassPage'),
  () => import('@/components/liveops/SkyRacePage'),
  () => import('@/components/liveops/KingsCupPage'),
  () => import('@/components/liveops/TeamChestPage'),
  () => import('@/components/liveops/LightningRushPage'),
  () => import('@/components/liveops/LavaQuestPage'),
  () => import('@/components/liveops/MissionControlPage'),
  () => import('@/components/liveops/WinningStreakPage'),
  () => import('@/components/liveops/AlbumPage'),
  () => import('@/components/liveops/CollectionPage'),
];

/**
 * Hook to preload lazy-loaded pages in background after initial load
 *
 * This improves subsequent navigation by loading page chunks ahead of time
 * without blocking the initial render.
 *
 * @param shouldStart - Whether to start preloading (pass true when app is ready)
 * @param delayMs - Delay after shouldStart becomes true before starting preload
 */
export function useBackgroundPreload(shouldStart: boolean, delayMs = 1000): void {
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return;
    hasStarted.current = true;

    // Wait for initial content to settle, then start preloading
    const timer = setTimeout(() => {
      // Use requestIdleCallback if available, otherwise fallback to setTimeout
      const schedulePreload = (fn: () => void) => {
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => void })
            .requestIdleCallback(fn);
        } else {
          setTimeout(fn, 50);
        }
      };

      // Preload each module with small delays to avoid blocking
      LAZY_PAGE_MODULES.forEach((loadModule, index) => {
        schedulePreload(() => {
          setTimeout(() => {
            loadModule().catch(() => {
              // Silently ignore errors - these will be caught when actually navigating
            });
          }, index * 100); // Stagger loads by 100ms each
        });
      });
    }, delayMs);

    return () => clearTimeout(timer);
  }, [shouldStart, delayMs]);
}
