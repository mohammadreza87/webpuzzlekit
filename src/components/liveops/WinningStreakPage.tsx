'use client';

import React, { useState } from 'react';
import { useNavigation, useAdmin, useWinningStreak } from '@/store';
import { useTimer } from '@/hooks';
import { Button, Card, ProgressBar } from '@/components/base';
import { StreakIndicator, StreakTierItem } from '@/components/composed';
import { winningStreakConfig, streakTiers } from '@/config';

type ViewState = 'intro' | 'ladder';

/**
 * WinningStreakPage - Module 1: Streak Booster Ladder
 *
 * A permanent progression system that rewards players with pre-level boosters
 * for consecutive level completions. Boosters accumulate up to a maximum tier
 * and reset completely upon level failure.
 *
 * Based on Royal Match's Harmonic Blessing feature.
 */
export function WinningStreakPage() {
  const { navigate } = useNavigation();
  const { isEventEnabled } = useAdmin();
  const { state: winningStreakState } = useWinningStreak();
  const [viewState, setViewState] = useState<ViewState>('intro');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { streakBooster } = winningStreakState;
  const { maxTier } = winningStreakConfig.streakBooster;

  // Mock event end time for demo (in real app, this would come from server)
  const [eventEndTime] = useState(() => new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));
  const timer = useTimer(eventEndTime);

  // Check if feature is enabled
  if (!isEventEnabled('winning-streak')) {
    return (
      <div className="flex flex-col h-full bg-bg-page items-center justify-center p-4">
        <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
          <span className="text-h2 text-text-muted">!</span>
        </div>
        <p className="text-body text-text-primary mb-2">Feature Not Available</p>
        <p className="text-caption text-text-secondary text-center mb-4">
          Winning Streak unlocks at level {winningStreakConfig.streakBooster.unlockLevel}
        </p>
        <Button variant="outline" onClick={() => navigate('main-menu')}>
          Go Back
        </Button>
      </div>
    );
  }

  // Check if unlocked
  if (!streakBooster.isUnlocked) {
    return (
      <div className="flex flex-col h-full bg-bg-page items-center justify-center p-4">
        <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
          <LockIcon className="w-8 h-8 text-text-muted" />
        </div>
        <p className="text-body text-text-primary mb-2">Feature Locked</p>
        <p className="text-caption text-text-secondary text-center mb-4">
          Reach level {winningStreakConfig.streakBooster.unlockLevel} to unlock Winning Streak
        </p>
        <Button variant="outline" onClick={() => navigate('main-menu')}>
          Go Back
        </Button>
      </div>
    );
  }

  const grandPrize = { coins: 10000 }; // Would come from config

  // Intro Screen
  if (viewState === 'intro') {
    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-bg-inverse pt-2 pb-3 px-3 flex items-center justify-between">
          <div className="w-8" />
          <h1 className="text-text-inverse text-h1">Winning Streak</h1>
          <button
            onClick={() => navigate('main-menu')}
            className="w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
          >
            <span className="text-text-primary font-bold">X</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Grand Prize Preview */}
          <Card padding="md" className="w-64 mb-4 text-center">
            <p className="text-mini text-text-muted mb-2">Grand Prize</p>
            <div className="w-20 h-20 bg-bg-muted rounded-xl mx-auto mb-2 flex items-center justify-center border border-border">
              <TrophyIcon className="w-10 h-10 text-text-secondary" />
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="w-5 h-5 bg-bg-inverse rounded-full flex items-center justify-center">
                <span className="text-text-inverse text-mini">$</span>
              </div>
              <span className="text-value-lg text-text-primary">
                {grandPrize.coins.toLocaleString()}
              </span>
            </div>
          </Card>

          {/* Current Progress */}
          <div className="w-full max-w-[280px] mb-4">
            <div className="flex items-center gap-2 mb-1">
              <ProgressBar current={streakBooster.currentTier} max={maxTier} size="lg" className="flex-1" />
              <div className="w-10 h-10 bg-bg-inverse rounded-lg flex items-center justify-center border border-border">
                <FireIcon className="w-5 h-5 text-text-inverse" />
              </div>
            </div>
            <p className="text-text-inverse text-value text-center">
              Tier {streakBooster.currentTier}/{maxTier}
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 bg-bg-card rounded-full px-4 py-1.5 mb-4 border border-border">
            <div className="w-5 h-5 bg-bg-inverse rounded-full flex items-center justify-center">
              <span className="text-text-inverse text-mini">T</span>
            </div>
            <span className="text-text-primary text-value">
              {timer.days}d {timer.hours}h
            </span>
          </div>

          {/* Description */}
          <p className="text-text-inverse text-center text-body mb-2">
            Win levels to earn boosters!
          </p>
          <p className="text-text-muted text-center text-caption mb-6">
            Each consecutive win unlocks more boosters for your next level.
          </p>

          {/* CTA Button */}
          <Button
            fullWidth
            size="lg"
            onClick={() => setViewState('ladder')}
            className="max-w-[280px]"
          >
            View Progress
          </Button>
        </div>
      </div>
    );
  }

  // Ladder View
  return (
    <div className="flex flex-col h-full bg-bg-page overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse pt-2 pb-3 px-3 flex items-center justify-between">
        <button
          onClick={() => setShowInfoModal(true)}
          className="w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value-sm font-bold">?</span>
        </button>
        <h1 className="text-text-inverse text-h1">Winning Streak</h1>
        <button
          onClick={() => navigate('main-menu')}
          className="w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary font-bold">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Timer */}
        <div className="flex justify-center py-3">
          <div className="flex items-center gap-2 bg-bg-card rounded-full px-4 py-1.5 border border-border">
            <div className="w-5 h-5 bg-bg-inverse rounded-full flex items-center justify-center">
              <span className="text-text-inverse text-mini">T</span>
            </div>
            <span className="text-text-primary text-value">
              {timer.days}d {timer.hours}h {timer.minutes}m
            </span>
          </div>
        </div>

        {/* Current Streak Indicator */}
        <div className="px-4 mb-4">
          <StreakIndicator
            currentTier={streakBooster.currentTier}
            streakCount={streakBooster.streakCount}
            maxTier={maxTier}
            showBoosters={true}
          />
        </div>

        {/* Grand Prize */}
        <div className="px-4 mb-4">
          <Card padding="md" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-text-inverse" />
              </div>
              <div>
                <p className="text-value text-text-primary">Grand Prize</p>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-bg-inverse rounded-full flex items-center justify-center">
                    <span className="text-text-inverse text-mini">$</span>
                  </div>
                  <span className="text-value-sm text-text-secondary">
                    {grandPrize.coins.toLocaleString()} Coins
                  </span>
                </div>
              </div>
            </div>
            {streakBooster.currentTier >= maxTier ? (
              <Button size="sm">Claim</Button>
            ) : (
              <LockIcon className="w-6 h-6 text-text-muted" />
            )}
          </Card>
        </div>

        {/* Tier Ladder */}
        <div className="px-4 pb-4">
          <p className="text-label text-text-secondary mb-3">Streak Tiers</p>
          {[...streakTiers].reverse().slice(0, -1).map((tier, index) => {
            const reversedTiers = [...streakTiers].reverse().slice(0, -1);
            const isFirst = index === 0;
            const isLast = index === reversedTiers.length - 1;

            return (
              <StreakTierItem
                key={tier.tier}
                tier={tier.tier}
                boosterIds={tier.boosterIds}
                isUnlocked={streakBooster.currentTier >= tier.tier}
                isClaimed={streakBooster.currentTier >= tier.tier}
                isCurrent={streakBooster.currentTier === tier.tier}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          })}
        </div>

        {/* Helper Text */}
        {streakBooster.currentTier < maxTier && (
          <div className="px-4 pb-4">
            <Card padding="sm" className="text-center">
              <p className="text-caption text-text-secondary">
                Win {maxTier - streakBooster.currentTier} more level{maxTier - streakBooster.currentTier !== 1 ? 's' : ''} to reach Max Tier!
              </p>
            </Card>
          </div>
        )}

        {/* Warning */}
        <div className="px-4 pb-6">
          <div className="bg-bg-muted rounded-lg p-3 border border-border">
            <p className="text-caption text-text-secondary text-center">
              <span className="font-bold text-text-primary">Warning:</span> Losing or quitting a level resets your streak!
            </p>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="p-4 border-t border-border bg-bg-card">
        <Button
          fullWidth
          size="lg"
          onClick={() => {
            navigate('main-menu');
            // In real app, would open level-start modal
          }}
        >
          Play Level
        </Button>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}
    </div>
  );
}

/**
 * Info Modal Component
 */
function InfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card padding="none" className="w-full max-w-[320px] overflow-hidden">
        {/* Header */}
        <div className="bg-bg-inverse py-4 px-3 relative">
          <h2 className="text-text-inverse text-h2 text-center">How It Works</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
          >
            <span className="text-text-primary font-bold text-caption">X</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-6 h-6 text-text-inverse" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Win Levels</p>
              <p className="text-caption text-text-secondary">
                Each consecutive win increases your streak tier
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center flex-shrink-0">
              <FireIcon className="w-6 h-6 text-text-inverse" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Unlock Boosters</p>
              <p className="text-caption text-text-secondary">
                Higher tiers grant more pre-level boosters
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-muted rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
              <TrophyIcon className="w-6 h-6 text-text-secondary" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Claim Rewards</p>
              <p className="text-caption text-text-secondary">
                Reach max tier for the Grand Prize!
              </p>
            </div>
          </div>

          <div className="bg-bg-muted rounded-xl p-3 mb-4 border border-border">
            <p className="text-caption text-text-secondary text-center">
              <span className="font-bold text-text-primary">Warning:</span>{' '}
              Losing or quitting resets your streak to Tier 0!
            </p>
          </div>

          <Button fullWidth onClick={onClose}>
            Got It!
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Icons
function FireIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
    </svg>
  );
}

function TrophyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.63 7.39 12.94C8.02 14.44 9.37 15.57 11 15.9V19H8V21H16V19H13V15.9C14.63 15.57 15.98 14.44 16.61 12.94C19.08 12.63 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z" />
    </svg>
  );
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13L9 17L19 7" />
    </svg>
  );
}
