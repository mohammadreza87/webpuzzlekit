'use client';

import React from 'react';
import { Card, Button } from '@/components/base';

/**
 * StreakTierItem Component
 *
 * Displays a single tier in the streak booster ladder.
 * Shows the tier number, boosters granted, and claim status.
 *
 * @example
 * <StreakTierItem
 *   tier={2}
 *   boosterIds={['arrow', 'tnt']}
 *   isUnlocked={true}
 *   isClaimed={false}
 *   isCurrent={true}
 *   onClaim={() => handleClaim(2)}
 * />
 */

interface StreakTierItemProps {
  tier: number;
  boosterIds: string[];
  isUnlocked: boolean;
  isClaimed: boolean;
  isCurrent: boolean;
  isLast?: boolean;
  isFirst?: boolean;
  onClaim?: () => void;
  className?: string;
}

export function StreakTierItem({
  tier,
  boosterIds,
  isUnlocked,
  isClaimed,
  isCurrent,
  isLast = false,
  isFirst = false,
  onClaim,
  className = '',
}: StreakTierItemProps) {
  const canClaim = isUnlocked && !isClaimed && onClaim;

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Connection Line & Tier Number */}
      <div className="w-12 flex flex-col items-center">
        {/* Top connector */}
        {!isFirst && (
          <div
            className={`w-0.5 h-3 ${
              isUnlocked ? 'bg-bg-inverse' : 'bg-border'
            }`}
          />
        )}

        {/* Tier Circle */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            font-bold text-value transition-colors
            ${isCurrent
              ? 'bg-bg-inverse text-text-inverse ring-2 ring-offset-2 ring-bg-inverse'
              : isUnlocked
                ? 'bg-bg-inverse text-text-inverse'
                : 'bg-bg-muted text-text-muted border border-border'
            }
          `}
        >
          {isClaimed ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            tier
          )}
        </div>

        {/* Bottom connector */}
        {!isLast && (
          <div
            className={`w-0.5 h-3 ${
              isUnlocked ? 'bg-bg-inverse' : 'bg-border'
            }`}
          />
        )}
      </div>

      {/* Content Card */}
      <Card
        padding="sm"
        className={`
          flex-1 flex items-center justify-between
          ${isCurrent ? 'border-bg-inverse border-2' : ''}
          ${!isUnlocked ? 'opacity-50' : ''}
        `}
      >
        {/* Boosters */}
        <div className="flex items-center gap-2">
          {boosterIds.map((boosterId) => (
            <BoosterIcon
              key={boosterId}
              boosterId={boosterId}
              isUnlocked={isUnlocked}
            />
          ))}
          {boosterIds.length === 0 && (
            <span className="text-caption text-text-muted">No boosters</span>
          )}
        </div>

        {/* Status / Action */}
        {isClaimed ? (
          <span className="text-mini text-text-muted font-medium">Active</span>
        ) : canClaim ? (
          <Button size="sm" onClick={onClaim}>
            Claim
          </Button>
        ) : !isUnlocked ? (
          <LockIcon className="w-5 h-5 text-text-muted" />
        ) : null}
      </Card>
    </div>
  );
}

/**
 * Booster Icon Component
 */
interface BoosterIconProps {
  boosterId: string;
  isUnlocked: boolean;
}

function BoosterIcon({ boosterId, isUnlocked }: BoosterIconProps) {
  const abbreviation = boosterId.slice(0, 3).toUpperCase();

  return (
    <div
      className={`
        w-12 h-12 rounded-lg flex flex-col items-center justify-center
        ${isUnlocked ? 'bg-bg-inverse' : 'bg-bg-muted border border-border'}
      `}
    >
      <span
        className={`
          text-value-sm font-bold
          ${isUnlocked ? 'text-text-inverse' : 'text-text-muted'}
        `}
      >
        {abbreviation}
      </span>
      <span
        className={`
          text-mini capitalize
          ${isUnlocked ? 'text-text-inverse opacity-80' : 'text-text-muted'}
        `}
      >
        x1
      </span>
    </div>
  );
}

/**
 * Check Icon
 */
function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M5 13L9 17L19 7" />
    </svg>
  );
}

/**
 * Lock Icon
 */
function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" />
    </svg>
  );
}

export type { StreakTierItemProps };
