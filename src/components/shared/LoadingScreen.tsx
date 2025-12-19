'use client';

import React from 'react';

export interface LoadingScreenProps {
  /** Loading progress (0-100) */
  progress?: number;
  /** Whether to show progress bar */
  showProgress?: boolean;
}

/**
 * LoadingScreen - Simple loading spinner displayed while assets load
 *
 * Shows a centered spinner with optional progress bar.
 * Uses CSS animations for smooth performance.
 */
export function LoadingScreen({ progress = 0, showProgress = true }: LoadingScreenProps) {
  return (
    <div
      className="fixed inset-0 bg-bg-page flex flex-col items-center justify-center z-50"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading application"
    >
      {/* Spinner */}
      <div className="relative w-12 h-12 mb-6">
        <div
          className="absolute inset-0 border-4 border-border rounded-full"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 border-4 border-transparent border-t-text-primary rounded-full animate-spin"
          aria-hidden="true"
        />
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-48 h-1.5 bg-bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-text-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
