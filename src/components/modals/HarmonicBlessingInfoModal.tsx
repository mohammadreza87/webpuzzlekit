'use client';

import React from 'react';
import { useNavigation, useWinningStreak } from '@/store';
import { Button } from '@/components/base';
import { winningStreakConfig, streakTiers } from '@/config';

interface HarmonicBlessingInfoModalProps {
  onAnimatedClose?: () => void;
}

/**
 * Harmonic Blessing Info Modal
 *
 * Explains Module 1: Streak Booster Ladder
 * Shows how consecutive wins earn bonus boosters at the start of each level.
 */
export function HarmonicBlessingInfoModal({ onAnimatedClose }: HarmonicBlessingInfoModalProps) {
  const { closeModal } = useNavigation();
  const { state: winningStreakState } = useWinningStreak();
  const { streakBooster } = winningStreakState;
  const { maxTier } = winningStreakConfig.streakBooster;

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

  return (
    <div className="w-full max-w-[320px] bg-bg-card rounded-2xl border-2 border-border overflow-hidden">
      {/* Progress bar at top */}
      <div className="bg-bg-muted h-2">
        <div
          className="h-full bg-bg-inverse transition-all"
          style={{ width: `${(streakBooster.streakCount / maxTier) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="bg-bg-inverse py-3 px-3 flex items-center justify-center relative">
        <h2 className="text-text-inverse text-h3">Harmonic Blessing</h2>
        <button
          onClick={handleClose}
          className="absolute right-2 w-7 h-7 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Illustration */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {/* Small reward jar */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-bg-muted rounded-xl flex items-center justify-center border border-border mb-1">
              <GiftIcon className="w-8 h-8 text-text-secondary" />
            </div>
            <div className="w-5 h-5 bg-bg-inverse rounded-full flex items-center justify-center">
              <CheckIcon className="w-3 h-3 text-text-inverse" />
            </div>
          </div>

          {/* Arrow */}
          <ArrowIcon className="w-6 h-6 text-text-muted" />

          {/* Large reward jar */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-bg-inverse rounded-xl flex items-center justify-center mb-1">
              <GiftIcon className="w-10 h-10 text-text-inverse" />
            </div>
            <span className="text-mini text-text-muted">Max Tier</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-bg-muted rounded-lg p-3 mb-4 border border-border">
          <p className="text-body-sm text-text-primary text-center">
            Beat levels on your first try to start the next level with{' '}
            <span className="font-bold">power-ups!</span>
          </p>
        </div>

        {/* Tier Progress */}
        <div className="space-y-2 mb-4">
          {streakTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`flex items-center gap-3 p-2 rounded-lg border ${
                streakBooster.currentTier >= tier.tier
                  ? 'bg-bg-inverse border-bg-inverse'
                  : streakBooster.streakCount >= tier.tier
                  ? 'bg-bg-muted border-border'
                  : 'bg-bg-page border-border opacity-60'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                streakBooster.currentTier >= tier.tier
                  ? 'bg-bg-card'
                  : 'bg-bg-muted border border-border'
              }`}>
                <span className={`text-value font-bold ${
                  streakBooster.currentTier >= tier.tier ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {tier.tier}
                </span>
              </div>
              <div className="flex-1">
                <p className={`text-caption font-medium ${
                  streakBooster.currentTier >= tier.tier ? 'text-text-inverse' : 'text-text-primary'
                }`}>
                  {tier.boosterIds.length} Booster{tier.boosterIds.length !== 1 ? 's' : ''}
                </p>
                <p className={`text-mini ${
                  streakBooster.currentTier >= tier.tier ? 'text-text-inverse opacity-70' : 'text-text-muted'
                }`}>
                  Win {tier.tier} in a row
                </p>
              </div>
              {streakBooster.currentTier >= tier.tier && (
                <div className="w-6 h-6 bg-bg-card rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div className="bg-bg-muted rounded-lg p-3 mb-4 border border-border text-center">
          <p className="text-mini text-text-muted mb-1">Current Progress</p>
          <p className="text-h4 text-text-primary">
            {streakBooster.streakCount} / {maxTier}
          </p>
          {streakBooster.currentTier > 0 && (
            <p className="text-mini text-text-secondary mt-1">
              Tier {streakBooster.currentTier} active - {streakBooster.activeBoosters.length} bonus booster{streakBooster.activeBoosters.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Warning */}
        <p className="text-mini text-text-muted text-center mb-4">
          Losing a level will reset your streak to 0
        </p>

        {/* Continue Button */}
        <Button fullWidth onClick={handleClose}>
          Got it!
        </Button>
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

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
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
