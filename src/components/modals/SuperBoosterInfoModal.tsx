'use client';

import React from 'react';
import { useNavigation, useWinningStreak } from '@/store';
import { Button } from '@/components/base';
import { winningStreakConfig } from '@/config';

interface SuperBoosterInfoModalProps {
  onAnimatedClose?: () => void;
}

/**
 * Super Booster Info Modal
 *
 * Explains Module 3: Super Booster Unlock
 * Shows how cumulative wins (not consecutive) unlock an enhanced booster.
 */
export function SuperBoosterInfoModal({ onAnimatedClose }: SuperBoosterInfoModalProps) {
  const { closeModal } = useNavigation();
  const { state: winningStreakState } = useWinningStreak();
  const { superBooster } = winningStreakState;
  const { winsRequired, superBooster: superBoosterConfig } = winningStreakConfig.superBooster;

  const progress = (superBooster.currentWins / winsRequired) * 100;

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

  return (
    <div className="w-full max-w-[320px] bg-bg-card rounded-2xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse py-3 px-3 flex items-center justify-center relative">
        <h2 className="text-text-inverse text-h3">{superBoosterConfig.name}</h2>
        <button
          onClick={handleClose}
          className="absolute right-2 w-7 h-7 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Step 1: Beat Levels */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-bg-muted rounded-xl flex items-center justify-center border border-border">
            <GridIcon className="w-10 h-10 text-text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-body text-text-primary font-medium">
              Beat {winsRequired} Levels!
            </p>
            <p className="text-mini text-text-muted">
              Wins don&apos;t need to be consecutive
            </p>
          </div>
          <ArrowDownIcon className="w-6 h-6 text-text-muted" />
        </div>

        {/* Progress Bar */}
        <div className="bg-bg-muted rounded-xl p-3 mb-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-3 bg-bg-page rounded-full overflow-hidden">
                <div
                  className="h-full bg-bg-inverse rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-value text-text-primary font-bold">
              {superBooster.currentWins}/{winsRequired}
            </span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              superBooster.isActive ? 'bg-bg-inverse animate-pulse' : 'bg-bg-muted border border-border'
            }`}>
              <BoltIcon className={`w-6 h-6 ${superBooster.isActive ? 'text-text-inverse' : 'text-text-muted'}`} />
            </div>
          </div>
          <p className="text-mini text-text-muted text-center mt-2">
            Activate the {superBoosterConfig.name}!
          </p>
        </div>

        {/* Step 2: Effect Description */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-bg-muted rounded-xl flex items-center justify-center border border-border">
            <BoltIcon className="w-6 h-6 text-text-secondary" />
          </div>
          <ArrowIcon className="w-5 h-5 text-text-muted" />
          <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center">
            <BoltIcon className="w-6 h-6 text-text-inverse" />
          </div>
          <div className="flex-1 ml-2">
            <p className="text-caption text-text-primary font-medium">
              {superBoosterConfig.enhancementDescription}
            </p>
          </div>
        </div>

        {/* Status Card */}
        {superBooster.isActive ? (
          <div className="bg-bg-inverse rounded-xl p-3 mb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <BoltIcon className="w-5 h-5 text-text-inverse" />
              <span className="text-h4 text-text-inverse">ACTIVE</span>
            </div>
            <p className="text-mini text-text-inverse opacity-80">
              Your {superBoosterConfig.name} is ready to use!
            </p>
          </div>
        ) : (
          <div className="bg-bg-muted rounded-xl p-3 mb-4 text-center border border-border">
            <p className="text-caption text-text-primary">
              Win <span className="font-bold">{winsRequired - superBooster.currentWins}</span> more level{winsRequired - superBooster.currentWins !== 1 ? 's' : ''} to unlock
            </p>
          </div>
        )}

        {/* Warning */}
        <div className="bg-bg-muted rounded-lg p-2 mb-4 border border-border">
          <p className="text-mini text-text-muted text-center">
            <span className="font-medium text-text-primary">{superBoosterConfig.name}</span> will be active until your first fail!
          </p>
        </div>

        {/* Continue Button */}
        <Button fullWidth onClick={handleClose}>
          Tap to Continue
        </Button>
      </div>
    </div>
  );
}

// Icons
function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 21H7.5L10.5 14H5.5L13 3H16.5L13.5 10H18.5L11 21Z" />
    </svg>
  );
}

function GridIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
    </svg>
  );
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </svg>
  );
}

function ArrowDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
    </svg>
  );
}
