'use client';

import React from 'react';
import { Card } from '@/components/base';
import { winningStreakConfig } from '@/config';

/**
 * SuperBoosterIndicator Component
 *
 * Displays the Super Booster unlock progress.
 * Shows either the progress toward unlocking or the active state.
 *
 * Module 3: Super Booster Unlock
 * Unlike Module 1, wins do not need to be consecutive - they accumulate over time.
 * Once unlocked, the Super Booster remains active until the player fails a level.
 *
 * @example
 * <SuperBoosterIndicator currentWins={5} isActive={false} winsRequired={10} />
 */

interface SuperBoosterIndicatorProps {
  currentWins: number;
  isActive: boolean;
  winsRequired?: number;
  compact?: boolean;
  className?: string;
}

export function SuperBoosterIndicator({
  currentWins,
  isActive,
  winsRequired = winningStreakConfig.superBooster.winsRequired,
  compact = false,
  className = '',
}: SuperBoosterIndicatorProps) {
  const { superBooster } = winningStreakConfig.superBooster;
  const progress = (currentWins / winsRequired) * 100;

  if (compact) {
    if (isActive) {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <div className="w-6 h-6 bg-bg-inverse rounded-lg flex items-center justify-center animate-pulse">
            <BoltIcon className="w-4 h-4 text-text-inverse" />
          </div>
          <span className="text-mini text-text-primary font-bold">Super Active!</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 bg-bg-muted rounded-lg flex items-center justify-center border border-border">
          <BoltIcon className="w-4 h-4 text-text-muted" />
        </div>
        <span className="text-mini text-text-secondary">
          {currentWins}/{winsRequired}
        </span>
      </div>
    );
  }

  // Active State
  if (isActive) {
    return (
      <Card padding="md" className={`border-2 border-bg-inverse ${className}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center animate-pulse">
            <BoltIcon className="w-6 h-6 text-text-inverse" />
          </div>
          <div className="flex-1">
            <p className="text-value text-text-primary">{superBooster.name}</p>
            <p className="text-caption text-text-secondary">Active!</p>
          </div>
          <div className="bg-bg-inverse text-text-inverse px-3 py-1 rounded-full">
            <span className="text-mini font-bold">SUPER</span>
          </div>
        </div>

        <div className="bg-bg-muted rounded-lg p-2 border border-border">
          <p className="text-mini text-text-secondary text-center">
            <span className="font-bold text-text-primary">{superBooster.enhancementDescription}</span>
          </p>
        </div>

        <p className="text-mini text-text-muted text-center mt-2">
          Losing a level will deactivate the Super Booster
        </p>
      </Card>
    );
  }

  // Progress State
  return (
    <Card padding="md" className={className}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-bg-muted rounded-xl flex items-center justify-center border border-border">
          <BoltIcon className="w-6 h-6 text-text-muted" />
        </div>
        <div className="flex-1">
          <p className="text-value text-text-primary">{superBooster.name}</p>
          <p className="text-caption text-text-secondary">
            {currentWins}/{winsRequired} wins to unlock
          </p>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center gap-4 mb-3">
        <CircularProgress progress={progress} size={64} />
        <div className="flex-1">
          <p className="text-body-sm text-text-primary mb-1">
            Win {winsRequired - currentWins} more level{winsRequired - currentWins !== 1 ? 's' : ''}
          </p>
          <p className="text-mini text-text-muted">
            Wins don&apos;t need to be consecutive
          </p>
        </div>
      </div>

      <div className="bg-bg-muted rounded-lg p-2 border border-border">
        <p className="text-mini text-text-secondary text-center">
          <span className="font-bold text-text-primary">Effect:</span> {superBooster.enhancementDescription}
        </p>
      </div>
    </Card>
  );
}

/**
 * Circular Progress Component
 */
interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

function CircularProgress({
  progress,
  size = 64,
  strokeWidth = 6,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-bg-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-bg-inverse transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-value text-text-primary">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

/**
 * Bolt Icon
 */
function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 21H7.5L10.5 14H5.5L13 3H16.5L13.5 10H18.5L11 21Z" />
    </svg>
  );
}

export type { SuperBoosterIndicatorProps };
