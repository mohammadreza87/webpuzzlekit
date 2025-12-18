'use client';

import React, { useEffect, useRef } from 'react';
import { useNavigation, useGame, useWinningStreak } from '@/store';
import { Button, Card } from '@/components/base';
import { winningStreakConfig } from '@/config';

interface LevelCompleteModalProps {
  onAnimatedClose?: () => void;
}

export function LevelCompleteModal({ onAnimatedClose }: LevelCompleteModalProps) {
  const { closeModal, navigate } = useNavigation();
  const { dispatch: gameDispatch } = useGame();
  const { state: winningStreakState, onLevelWon } = useWinningStreak();
  const hasProcessedRef = useRef(false);

  const { streakBooster, superBooster, collectibleEvent } = winningStreakState;
  const { enabledModules } = winningStreakConfig;

  // Capture session collected before it gets committed (reset to 0)
  // Use useState with initializer to capture the value only once on mount
  const [sessionClefsEarned] = React.useState(() => collectibleEvent.sessionCollected);

  // Process level completion (once)
  useEffect(() => {
    if (!hasProcessedRef.current) {
      hasProcessedRef.current = true;
      // Update winning streak state
      onLevelWon();
      // Update game state
      gameDispatch({ type: 'COMPLETE_LEVEL' });
    }
  }, [onLevelWon, gameDispatch]);

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

  const handleContinue = () => {
    handleClose();
    setTimeout(() => navigate('main-menu'), 200);
  };

  // Check if any winning streak features are unlocked
  const hasStreakFeatures =
    (enabledModules.streakBooster && streakBooster.isUnlocked) ||
    (enabledModules.superBooster && superBooster.isUnlocked) ||
    (enabledModules.collectibleEvent && collectibleEvent.isUnlocked && collectibleEvent.isActive);

  // Determine if tier increased
  const tierIncreased = streakBooster.currentTier > 0 && streakBooster.streakCount === streakBooster.currentTier;

  // Check if super booster just activated
  const superJustActivated = superBooster.isActive && superBooster.currentWins === 0;

  return (
    <div className="w-full max-w-[320px] bg-bg-card rounded-2xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse py-2.5 px-3 flex items-center justify-center relative">
        <h2 className="text-text-inverse text-h4">Level Complete!</h2>
        <button
          onClick={handleClose}
          className="absolute right-2 w-7 h-7 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-bg-muted rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-border">
          <StarIcon />
        </div>

        <p className="text-caption text-text-secondary mb-3">You earned 1 star</p>

        {/* Stars Display */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className={`w-10 h-10 rounded-full flex items-center justify-center border border-border ${
                star <= 3 ? 'bg-bg-muted' : 'bg-bg-page'
              }`}
            >
              <StarIcon className={star <= 3 ? 'text-text-primary' : 'text-text-muted'} />
            </div>
          ))}
        </div>

        {/* Rewards */}
        <div className="bg-bg-muted rounded-lg border border-border p-3 mb-4">
          <p className="text-caption text-text-secondary mb-2">Rewards</p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-bg-card rounded mx-auto mb-1 border border-border flex items-center justify-center">
                <span className="text-text-secondary text-mini">$</span>
              </div>
              <span className="text-value text-text-primary">+50</span>
              <p className="text-mini text-text-secondary">Coins</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-bg-card rounded mx-auto mb-1 border border-border flex items-center justify-center">
                <span className="text-text-secondary text-mini">★</span>
              </div>
              <span className="text-value text-text-primary">+1</span>
              <p className="text-mini text-text-secondary">Star</p>
            </div>
          </div>
        </div>

        {/* Winning Streak Progress */}
        {hasStreakFeatures && (
          <div className="space-y-2 mb-4">
            {/* Streak Tier Up (Module 1) */}
            {enabledModules.streakBooster && streakBooster.isUnlocked && tierIncreased && (
              <Card padding="sm" className="border-bg-inverse border-2 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-bg-inverse rounded-lg flex items-center justify-center">
                    <FireIcon className="w-5 h-5 text-text-inverse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-caption font-bold text-text-primary">Tier Up!</p>
                    <p className="text-mini text-text-muted">
                      Now at Tier {streakBooster.currentTier} - {streakBooster.activeBoosters.length} booster{streakBooster.activeBoosters.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-h3 text-text-primary">{streakBooster.currentTier}</div>
                </div>
              </Card>
            )}

            {/* Streak Progress (Module 1) */}
            {enabledModules.streakBooster && streakBooster.isUnlocked && !tierIncreased && (
              <Card padding="sm" className="text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-bg-muted rounded-lg flex items-center justify-center border border-border">
                    <FireIcon className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-caption text-text-secondary">Streak Progress</p>
                    <p className="text-mini text-text-muted">
                      {streakBooster.streakCount} win{streakBooster.streakCount !== 1 ? 's' : ''} - Tier {streakBooster.currentTier}
                    </p>
                  </div>
                  {streakBooster.currentTier < winningStreakConfig.streakBooster.maxTier && (
                    <span className="text-mini text-text-muted">
                      {streakBooster.currentTier + 1 - streakBooster.streakCount} to next
                    </span>
                  )}
                </div>
              </Card>
            )}

            {/* Super Booster Activated (Module 3) */}
            {enabledModules.superBooster && superBooster.isUnlocked && superJustActivated && (
              <Card padding="sm" className="border-bg-inverse border-2 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-bg-inverse rounded-lg flex items-center justify-center animate-pulse">
                    <BoltIcon className="w-5 h-5 text-text-inverse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-caption font-bold text-text-primary">Super Booster Unlocked!</p>
                    <p className="text-mini text-text-muted">
                      {winningStreakConfig.superBooster.superBooster.enhancementDescription}
                    </p>
                  </div>
                  <span className="text-mini bg-bg-inverse text-text-inverse px-2 py-0.5 rounded-full font-bold">
                    SUPER
                  </span>
                </div>
              </Card>
            )}

            {/* Super Booster Progress (Module 3) */}
            {enabledModules.superBooster && superBooster.isUnlocked && !superBooster.isActive && (
              <Card padding="sm" className="text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-bg-muted rounded-lg flex items-center justify-center border border-border">
                    <BoltIcon className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="flex-1">
                    <p className="text-caption text-text-secondary">Super Booster</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-bg-inverse rounded-full transition-all"
                          style={{
                            width: `${(superBooster.currentWins / winningStreakConfig.superBooster.winsRequired) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-mini text-text-muted">
                        {superBooster.currentWins}/{winningStreakConfig.superBooster.winsRequired}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Collectible Event Progress (Module 2) */}
            {enabledModules.collectibleEvent && collectibleEvent.isUnlocked && collectibleEvent.isActive && (
              <Card padding="sm" className="text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-bg-inverse rounded-lg flex items-center justify-center">
                    <ClefIcon className="w-4 h-4 text-text-inverse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-caption text-text-secondary">Clef Collection</p>
                    <p className="text-mini text-text-primary">
                      +{sessionClefsEarned} {winningStreakConfig.collectibleEvent.collectibleName}
                    </p>
                  </div>
                  <span className="text-mini text-text-muted">
                    Total: {collectibleEvent.totalCollected.toLocaleString()}
                  </span>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button fullWidth size="lg" onClick={handleContinue}>
            Continue
          </Button>
          <Button fullWidth variant="outline" onClick={handleContinue}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarIcon({ className = 'text-text-primary' }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  );
}

function FireIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
    </svg>
  );
}

function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 21H7.5L10.5 14H5.5L13 3H16.5L13.5 10H18.5L11 21Z" />
    </svg>
  );
}

function ClefIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}
