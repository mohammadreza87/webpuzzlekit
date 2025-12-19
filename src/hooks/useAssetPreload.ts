'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Critical assets to preload before showing the app
 * These are assets used in the initial view (main menu header, bottom nav)
 */
const CRITICAL_ICONS = [
  '/icons/Home.svg',
  '/icons/Shopping-2.svg',
  '/icons/Medal.svg',
  '/icons/Setting.svg',
  '/icons/Star-Filled.svg',
  '/icons/2User.svg',
  '/icons/Category.svg',
];

export interface AssetPreloadState {
  /** Whether all assets are loaded */
  isReady: boolean;
  /** Loading progress (0-100) */
  progress: number;
  /** Any errors encountered during loading */
  error: Error | null;
}

const INITIAL_STATE: AssetPreloadState = {
  isReady: false,
  progress: 0,
  error: null,
};

/**
 * Preload a single image and return a promise
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

/**
 * Wait for all fonts to be loaded
 */
function waitForFonts(): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined);
}

/**
 * Hook to preload critical assets before showing the app
 *
 * @param minLoadTimeMs - Minimum time to show loading screen (prevents flash)
 * @returns AssetPreloadState with loading progress and ready status
 *
 * @example
 * const { isReady, progress } = useAssetPreload();
 * if (!isReady) return <LoadingScreen progress={progress} />;
 */
export function useAssetPreload(minLoadTimeMs = 500): AssetPreloadState {
  const [state, setState] = useState<AssetPreloadState>(INITIAL_STATE);

  const loadAssets = useCallback(async () => {
    const startTime = Date.now();
    const totalAssets = CRITICAL_ICONS.length + 1; // +1 for fonts
    let loaded = 0;

    const updateProgress = () => {
      loaded++;
      const progress = Math.round((loaded / totalAssets) * 100);
      setState(prev => ({ ...prev, progress }));
    };

    try {
      // Load fonts first
      await waitForFonts();
      updateProgress();

      // Load critical icons in parallel
      await Promise.all(
        CRITICAL_ICONS.map(async (src) => {
          await preloadImage(src);
          updateProgress();
        })
      );

      // Ensure minimum load time to prevent flash
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadTimeMs) {
        await new Promise(resolve => setTimeout(resolve, minLoadTimeMs - elapsed));
      }

      setState({ isReady: true, progress: 100, error: null });
    } catch (error) {
      // Even on error, mark as ready to not block the app
      console.warn('Asset preload warning:', error);
      setState({ isReady: true, progress: 100, error: error as Error });
    }
  }, [minLoadTimeMs]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return state;
}
