'use client';

import React, { useEffect, useRef } from 'react';
import { useNavigation, useGame, useWinningStreak, useAdmin } from '@/store';
import { Button } from '@/components/base';
import { winningStreakConfig } from '@/config';

interface LevelFailedModalProps {
  onAnimatedClose?: () => void;
}

/**
 * Level Failed Modal
 *
 * Shows when player loses a level.
 * Warns about losing Harmonic Blessing streak and Book of Treasure items.
 * Offers options to continue with coins or quit.
 */
export function LevelFailedModal({ onAnimatedClose }: LevelFailedModalProps) {
  const { closeModal, navigate } = useNavigation();
  const { state, dispatch: gameDispatch } = useGame();
  const { state: winningStreakState, onLevelFailed } = useWinningStreak();
  const { config } = useAdmin();
  const { player } = state;
  const hasProcessedRef = useRef(false);

  const { streakBooster, superBooster, collectibleEvent } = winningStreakState;
  const { enabledModules } = winningStreakConfig;

  // Process level failure (once)
  useEffect(() => {
    if (!hasProcessedRef.current) {
      hasProcessedRef.current = true;
      onLevelFailed();
      gameDispatch({ type: 'UPDATE_LIVES', payload: -1 });
    }
  }, [onLevelFailed, gameDispatch]);

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

  const handleQuit = () => {
    handleClose();
    setTimeout(() => navigate('main-menu'), 200);
  };

  const handlePlayOn = () => {
    // Would deduct coins and continue - for prototype just close
    handleClose();
    setTimeout(() => navigate('gameplay'), 200);
  };

  const handleRetry = () => {
    handleClose();
    setTimeout(() => navigate('gameplay'), 200);
  };

  // Determine what the player will lose (check state BEFORE the failure was processed)
  // Note: We show what WAS lost since onLevelFailed already ran
  // Also respect admin settings
  const hadStreak = enabledModules.streakBooster && streakBooster.isUnlocked;
  const hadSuperBooster = config.showSuperBooster && enabledModules.superBooster && superBooster.isUnlocked;
  const hadBooks = config.showClefCollection && enabledModules.collectibleEvent && collectibleEvent.isUnlocked && collectibleEvent.isActive;

  // Build loss messages
  const losses: string[] = [];
  if (hadStreak) losses.push("Harmonic Blessing");
  if (hadSuperBooster && !superBooster.isActive) losses.push("Super Booster progress");
  if (hadBooks) losses.push("Clefs");

  const hasLosses = losses.length > 0;

  return (
    <div className="w-full max-w-[320px] bg-bg-card rounded-2xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse py-3 px-3 flex items-center justify-center relative">
        <h2 className="text-text-inverse text-h3">Continue?</h2>
        <button
          onClick={handleQuit}
          className="absolute right-2 w-7 h-7 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Warning Card - What you'll lose */}
        {hasLosses && (
          <div className="bg-bg-muted rounded-xl p-4 mb-4 border border-border">
            <div className="flex items-start gap-3">
              {/* Butler character placeholder */}
              <div className="w-14 h-16 bg-bg-page rounded-lg flex items-center justify-center border border-border flex-shrink-0">
                <CharacterIcon className="w-8 h-8 text-text-muted" />
              </div>

              {/* Warning message */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {hadStreak && (
                    <div className="flex items-center gap-1 bg-bg-page rounded-lg px-2 py-1 border border-border">
                      <GiftIcon className="w-4 h-4 text-text-secondary" />
                      <XMarkIcon className="w-3 h-3 text-status-error" />
                    </div>
                  )}
                  {hadBooks && (
                    <div className="flex items-center gap-1 bg-bg-page rounded-lg px-2 py-1 border border-border">
                      <BookIcon className="w-4 h-4 text-text-secondary" />
                      <span className="text-mini text-text-primary font-medium">
                        {collectibleEvent.sessionCollected || 0}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-body-sm text-text-primary">
                  You will lose your{' '}
                  <span className="font-bold">{losses.join(' and ')}</span>!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No losses - simple message */}
        {!hasLosses && (
          <div className="bg-bg-muted rounded-xl p-4 mb-4 border border-border text-center">
            <div className="w-12 h-12 bg-bg-page rounded-full mx-auto mb-2 flex items-center justify-center border border-border">
              <XIcon className="w-6 h-6 text-text-muted" />
            </div>
            <p className="text-body text-text-primary">Out of moves!</p>
            <p className="text-caption text-text-muted mt-1">
              Would you like to continue?
            </p>
          </div>
        )}

        {/* Lives Display */}
        <div className="bg-bg-muted rounded-lg border border-border p-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-mini text-text-secondary">Lives</span>
            <div className="flex gap-1">
              {Array.from({ length: player.maxLives }).map((_, i) => (
                <HeartIcon key={i} filled={i < player.lives} />
              ))}
            </div>
          </div>
        </div>

        {/* Play On Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePlayOn}
          className="mb-2"
        >
          <span className="flex items-center justify-center gap-2">
            Play On
            <span className="flex items-center gap-1 bg-bg-card rounded-full px-2 py-0.5 bg-opacity-20">
              <CoinIcon className="w-4 h-4" />
              <span className="text-value">900</span>
            </span>
          </span>
        </Button>

        {/* Retry/Quit Buttons */}
        <div className="flex gap-2">
          <Button
            fullWidth
            variant="outline"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={handleRetry}
            disabled={player.lives <= 0}
          >
            Retry
          </Button>
        </div>

        {/* Streak Lost Info */}
        {hadStreak && streakBooster.streakCount === 0 && (
          <p className="text-mini text-text-muted text-center mt-3">
            Your streak has been reset to 0
          </p>
        )}
      </div>
    </div>
  );
}

// Icons
function GiftIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  );
}

function BookIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z" />
    </svg>
  );
}

function XMarkIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CharacterIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function CoinIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? 'text-text-primary' : 'text-bg-page'}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
    </svg>
  );
}
