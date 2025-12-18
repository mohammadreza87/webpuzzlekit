'use client';

import React from 'react';
import { Card } from '@/components/base';
import { winningStreakConfig, getBoostersForTier } from '@/config';

/**
 * StreakIndicator Component
 *
 * Displays the current streak tier and active boosters.
 * Used in LevelStartModal and WinningStreakPage.
 *
 * @example
 * <StreakIndicator currentTier={2} streakCount={5} maxTier={3} />
 */

interface StreakIndicatorProps {
  currentTier: number;
  streakCount: number;
  maxTier?: number;
  showBoosters?: boolean;
  compact?: boolean;
  className?: string;
}

export function StreakIndicator({
  currentTier,
  streakCount,
  maxTier = winningStreakConfig.streakBooster.maxTier,
  showBoosters = true,
  compact = false,
  className = '',
}: StreakIndicatorProps) {
  const activeBoosters = getBoostersForTier(currentTier);
  const isMaxTier = currentTier >= maxTier;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1">
          {Array.from({ length: maxTier }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < currentTier ? 'bg-bg-inverse' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span className="text-mini text-text-secondary">
          {streakCount} win{streakCount !== 1 ? 's' : ''}
        </span>
      </div>
    );
  }

  return (
    <Card padding="sm" className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-bg-inverse rounded-lg flex items-center justify-center">
            <FireIcon className="w-5 h-5 text-text-inverse" />
          </div>
          <div>
            <p className="text-caption font-medium text-text-primary">
              {isMaxTier ? 'Max Streak!' : `Tier ${currentTier}`}
            </p>
            <p className="text-mini text-text-muted">
              {streakCount} consecutive win{streakCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {!isMaxTier && (
          <div className="text-right">
            <p className="text-mini text-text-muted">Next tier</p>
            <p className="text-caption font-bold text-text-primary">
              {currentTier + 1 - streakCount} more
            </p>
          </div>
        )}
      </div>

      {/* Tier Progress */}
      <div className="flex items-center gap-2 mb-2">
        {Array.from({ length: maxTier }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index < currentTier ? 'bg-bg-inverse' : 'bg-bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Active Boosters */}
      {showBoosters && activeBoosters.length > 0 && (
        <div className="pt-2 border-t border-border">
          <p className="text-mini text-text-muted mb-1.5">Active Boosters</p>
          <div className="flex gap-2">
            {activeBoosters.map((boosterId) => (
              <BoosterBadge key={boosterId} boosterId={boosterId} />
            ))}
          </div>
        </div>
      )}

      {/* No boosters message */}
      {showBoosters && activeBoosters.length === 0 && (
        <div className="pt-2 border-t border-border">
          <p className="text-mini text-text-muted text-center">
            Win a level to start your streak!
          </p>
        </div>
      )}
    </Card>
  );
}

/**
 * Booster Badge Component
 */
interface BoosterBadgeProps {
  boosterId: string;
  className?: string;
}

function BoosterBadge({ boosterId, className = '' }: BoosterBadgeProps) {
  const abbreviation = boosterId.slice(0, 3).toUpperCase();

  return (
    <div
      className={`
        flex items-center gap-1 px-2 py-1
        bg-bg-muted rounded-lg border border-border
        ${className}
      `}
    >
      <div className="w-5 h-5 bg-bg-inverse rounded flex items-center justify-center">
        <span className="text-mini text-text-inverse font-bold">{abbreviation}</span>
      </div>
      <span className="text-mini text-text-primary capitalize">{boosterId.replace('-', ' ')}</span>
    </div>
  );
}

/**
 * Fire Icon
 */
function FireIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12.88 17.76V18H11.12V17.76C9.55 17.48 8.4 16.19 8.4 14.6H10.15C10.15 15.38 10.76 16 11.55 16C12.34 16 12.95 15.38 12.95 14.6C12.95 13.81 12.34 13.19 11.55 13.19C9.73 13.19 8.2 11.66 8.2 9.84C8.2 8.25 9.35 6.96 10.92 6.68V6H12.68V6.68C14.25 6.96 15.4 8.25 15.4 9.84H13.65C13.65 9.05 13.04 8.44 12.25 8.44C11.46 8.44 10.85 9.05 10.85 9.84C10.85 10.63 11.46 11.25 12.25 11.25C14.07 11.25 15.6 12.78 15.6 14.6C15.6 16.19 14.45 17.48 12.88 17.76Z" />
    </svg>
  );
}

export type { StreakIndicatorProps };
