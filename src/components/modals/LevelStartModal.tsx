'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useNavigation, useGame, useWinningStreak } from '@/store';
import { Button } from '@/components/base';
import { winningStreakConfig } from '@/config';

interface LevelStartModalProps {
  onAnimatedClose?: () => void;
}

export function LevelStartModal({ onAnimatedClose }: LevelStartModalProps) {
  const { closeModal, navigate, openModal } = useNavigation();
  const { state } = useGame();
  const { state: winningStreakState } = useWinningStreak();
  const { player, boosters } = state;
  const t = useTranslations('game');
  const tCommon = useTranslations('common');

  const { streakBooster, superBooster } = winningStreakState;
  const { enabledModules } = winningStreakConfig;

  const preGameBoosters = boosters.filter((b) => b.type === 'pre-game');
  const [selectedBoosters, setSelectedBoosters] = useState<string[]>([]);

  const toggleBooster = (id: string) => {
    setSelectedBoosters((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

  const handlePlay = () => {
    handleClose();
    setTimeout(() => navigate('gameplay'), 200);
  };

  const handleStreakGiftInfo = () => {
    openModal('butlers-gift-info');
  };

  const handleSuperBoosterInfo = () => {
    openModal('super-booster-info');
  };

  // Module visibility checks
  const showStreakGift = enabledModules.streakBooster && streakBooster.isUnlocked;
  const showSuperBooster = enabledModules.superBooster && superBooster.isUnlocked;
  const { maxTier } = winningStreakConfig.streakBooster;
  const { winsRequired } = winningStreakConfig.superBooster;

  return (
    <div className="w-full max-w-[340px] bg-bg-card rounded-2xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse py-2.5 px-4 flex items-center justify-center relative">
        <h2 className="text-text-inverse text-h4">{t('level', { level: player.currentLevel })}</h2>
        <button
          onClick={handleClose}
          className="absolute right-3 w-7 h-7 bg-bg-muted rounded-full flex items-center justify-center border border-border hover:opacity-80 transition-colors"
        >
          <span className="text-text-primary text-value">X</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-border" />

      {/* Content */}
      <div className="px-5 py-4 bg-bg-card">
        {/* Difficulty Badge */}
        <div className="flex justify-center mb-3">
          <div className="bg-bg-muted rounded-full px-4 py-1 border border-border">
            <span className="text-text-secondary text-value-sm">{t('superHard')}</span>
          </div>
        </div>

        {/* Streak Features Row - Streak Gift (left) & Super Booster (right as separate button) */}
        {(showStreakGift || showSuperBooster) && (
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* Streak Gift - Module 1 */}
            {showStreakGift && (
              <button
                onClick={handleStreakGiftInfo}
                className="flex-1 flex items-center gap-2.5 bg-bg-muted rounded-xl px-3 py-2 border border-border hover:bg-bg-page transition-colors"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center">
                    <FireIcon className="w-6 h-6 text-text-inverse" />
                  </div>
                  {/* Info badge */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-bg-card rounded-full flex items-center justify-center border border-border">
                    <span className="text-text-secondary text-[10px] font-bold">i</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-caption text-text-primary font-medium">Streak Gift</p>
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-14 h-2 bg-bg-page rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full bg-bg-inverse rounded-full transition-all"
                        style={{ width: `${(streakBooster.streakCount / maxTier) * 100}%` }}
                      />
                    </div>
                    <span className="text-mini text-text-muted font-medium">
                      {streakBooster.streakCount}/{maxTier}
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* Super Booster - Module 3 (Separate circular button) */}
            {showSuperBooster && (
              <button
                onClick={handleSuperBoosterInfo}
                className="relative flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                  superBooster.isActive
                    ? 'bg-bg-inverse border-bg-inverse animate-pulse'
                    : 'bg-bg-muted border-border'
                }`}>
                  <BoltIcon className={`w-7 h-7 ${superBooster.isActive ? 'text-text-inverse' : 'text-text-secondary'}`} />
                </div>
                {/* Progress badge */}
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                  superBooster.isActive
                    ? 'bg-bg-inverse text-text-inverse'
                    : 'bg-bg-card border border-border text-text-primary'
                }`}>
                  {superBooster.isActive ? 'ON' : `${superBooster.currentWins}/${winsRequired}`}
                </div>
              </button>
            )}
          </div>
        )}

        {/* Goals Panel */}
        <div className="bg-bg-muted rounded-xl border border-border p-3 mb-4">
          <p className="text-text-muted text-mini text-center mb-2">{t('goals')}</p>
          <div className="flex justify-center gap-4">
            <GoalItem icon="BLU" count={30} />
            <GoalItem icon="RED" count={25} />
            <GoalItem icon="GRN" count={20} />
          </div>
        </div>

        {/* Moves */}
        <div className="flex justify-center mb-4">
          <div className="bg-bg-muted rounded-xl border border-border px-6 py-2 text-center">
            <p className="text-text-secondary text-mini">{t('moves', { count: 25 })}</p>
            <p className="text-text-primary text-h3">25</p>
          </div>
        </div>

        {/* Boosters Section */}
        <p className="text-text-muted text-mini text-center mb-2">{t('selectBoosters')}</p>
        <div className="flex justify-center gap-3 mb-4">
          {preGameBoosters.map((booster) => (
            <BoosterSelect
              key={booster.id}
              name={booster.name}
              count={booster.count}
              selected={selectedBoosters.includes(booster.id)}
              onToggle={() => toggleBooster(booster.id)}
              disabled={booster.count === 0}
              isStreakBooster={streakBooster.activeBoosters.includes(booster.id)}
            />
          ))}
        </div>

        {/* Active Streak Boosters Info */}
        {showStreakGift && streakBooster.activeBoosters.length > 0 && (
          <div className="bg-bg-muted rounded-lg px-3 py-2 mb-4 border border-border">
            <p className="text-mini text-text-muted text-center">
              <span className="text-text-primary font-medium">
                +{streakBooster.activeBoosters.length} bonus booster{streakBooster.activeBoosters.length !== 1 ? 's' : ''}
              </span>
              {' '}from streak
            </p>
          </div>
        )}

        {/* Play Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePlay}
        >
          {tCommon('play')}
        </Button>
      </div>
    </div>
  );
}

// Goal Item Component
function GoalItem({ icon, count }: { icon: string; count: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-bg-page rounded-lg border border-border flex items-center justify-center mb-1">
        <span className="text-text-secondary text-mini font-bold">{icon}</span>
      </div>
      <span className="text-text-primary text-value">{count}</span>
    </div>
  );
}

// Booster Select Component
interface BoosterSelectProps {
  name: string;
  count: number;
  selected: boolean;
  onToggle: () => void;
  disabled: boolean;
  isStreakBooster?: boolean;
}

function BoosterSelect({
  name,
  count,
  selected,
  onToggle,
  disabled,
  isStreakBooster = false,
}: BoosterSelectProps) {
  const abbreviation = name.slice(0, 3).toUpperCase();

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative flex flex-col items-center p-2 rounded-xl border transition-colors ${
        disabled
          ? 'opacity-50 cursor-not-allowed border-border'
          : selected
          ? 'bg-bg-muted border-border'
          : isStreakBooster
          ? 'bg-bg-muted border-bg-inverse border-2'
          : 'bg-bg-page border-border hover:bg-bg-muted'
      }`}
    >
      {/* Checkbox */}
      <div
        className={`absolute -top-1 -right-1 w-4 h-4 rounded border flex items-center justify-center ${
          selected ? 'bg-bg-inverse border-bg-inverse' : 'bg-bg-card border-border'
        }`}
      >
        {selected && <span className="text-text-inverse text-mini font-bold">✓</span>}
      </div>

      {/* Streak Badge */}
      {isStreakBooster && (
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-bg-inverse rounded-full flex items-center justify-center">
          <FireIcon className="w-2.5 h-2.5 text-text-inverse" />
        </div>
      )}

      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-1 ${
        isStreakBooster ? 'bg-bg-inverse border-bg-inverse' : 'bg-bg-page border-border'
      }`}>
        <span className={`text-caption font-bold ${isStreakBooster ? 'text-text-inverse' : 'text-text-secondary'}`}>
          {abbreviation}
        </span>
      </div>

      {/* Count */}
      <span className="text-text-primary text-value font-bold">
        {isStreakBooster ? '+1' : count}
      </span>
    </button>
  );
}

// Icons
function FireIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 15h-4v-1h4v1zm0-2h-4v-1h4v1zm-1-3.42l-.5.5V14h-1v-1.92l-.5-.5C9.37 10.45 9 9.28 9 9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .38-.07.75-.22 1.08-.23.51-.58.93-1 1.27l-.78.65V13h-.01z" />
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
