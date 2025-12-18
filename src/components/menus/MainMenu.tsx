'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useGame, useNavigation, useAdmin, useWinningStreak } from '@/store';
import { BottomNavigation } from '@/components/shared';
import { LevelRoadmap } from './LevelRoadmap';
import { useTimer } from '@/hooks';
import { EVENT_REGISTRY, isValidEventId, type EventId } from '@/config/registry';
import { getEventEndTime } from '@/config/mockData';
import { winningStreakConfig } from '@/config';
import { isFeatureEnabled, type FeatureFlag } from '@/config/features';

// Map event IDs to feature flags for filtering
const eventToFeature: Record<string, FeatureFlag> = {
  'royal-pass': 'EVENT_ROYAL_PASS',
  'sky-race': 'EVENT_SKY_RACE',
  'kings-cup': 'EVENT_KINGS_CUP',
  'team-chest': 'EVENT_TEAM_CHEST',
  'clef-collection': 'EVENT_CLEF_COLLECTION',
  'lightning-rush': 'EVENT_LIGHTNING_RUSH',
  'lava-quest': 'EVENT_LAVA_QUEST',
  'mission-control': 'EVENT_MISSION_CONTROL',
  'album': 'EVENT_ALBUM',
  'collection': 'EVENT_COLLECTION',
  'winning-streak': 'EVENT_WINNING_STREAK',
};

export function MainMenu() {
  const { state } = useGame();
  const { navigate, openModal } = useNavigation();
  const { config, isEventEnabled } = useAdmin();
  const { state: winningStreakState } = useWinningStreak();
  const { player, areas } = state;
  const t = useTranslations('game');
  const tCommon = useTranslations('common');
  const tAreas = useTranslations('areas');

  const currentArea = areas.find((a) => a.id === player.currentArea);
  const completedTasks = currentArea?.tasks.filter((t) => t.completed).length || 0;
  const totalTasks = currentArea?.tasks.length || 0;

  // Helper to check if event is enabled (both admin toggle AND feature flag)
  const isEventAvailable = (eventId: string): boolean => {
    const featureFlag = eventToFeature[eventId];
    // Event must be enabled in admin AND feature flag must be true
    return isEventEnabled(eventId) && (!featureFlag || isFeatureEnabled(featureFlag));
  };

  // Get events from placement config (exclude clef-collection from side events since it shows as top bar)
  const leftEvents = (config.eventPlacement?.left || [])
    .filter(id => id !== 'clef-collection')
    .filter(id => isEventAvailable(id));
  const rightEvents = (config.eventPlacement?.right || [])
    .filter(id => id !== 'clef-collection')
    .filter(id => isEventAvailable(id));

  // Check if Clef Collection is active (Module 2 - shows as top progress bar)
  const { collectibleEvent } = winningStreakState;
  const { enabledModules } = winningStreakConfig;
  const showClefCollection = enabledModules.collectibleEvent &&
    collectibleEvent.isUnlocked &&
    collectibleEvent.isActive &&
    isEventAvailable('clef-collection');

  return (
    <div className="relative flex flex-col h-full bg-bg-page overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-2 py-2 bg-bg-inverse">
        {/* Profile */}
        <button
          onClick={() => openModal('profile')}
          className="w-12 h-12 bg-bg-inverse rounded-lg border-2 border-brand-muted flex items-center justify-center"
        >
          <span className="text-text-inverse text-caption">{tCommon('pro')}</span>
        </button>

        {/* Resources */}
        <div className="flex items-center gap-2">
          {/* Coins */}
          <button
            onClick={() => navigate('shop')}
            className="flex items-center gap-1 bg-bg-muted/30 rounded-full px-2 py-1 border border-border"
          >
            <div className="w-5 h-5 bg-bg-muted rounded-full flex items-center justify-center border border-border">
              <span className="text-text-primary text-mini font-bold">$</span>
            </div>
            <span className="text-text-inverse text-value">{player.coins.toLocaleString()}</span>
            <div className="w-4 h-4 bg-bg-muted rounded-full flex items-center justify-center">
              <span className="text-text-primary text-mini font-bold">+</span>
            </div>
          </button>

          {/* Lives */}
          <button
            onClick={() => openModal('free-lives')}
            className="flex items-center gap-1 bg-bg-muted/30 rounded-full px-2 py-1 border border-border"
          >
            <div className="w-5 h-5 bg-bg-muted rounded-full flex items-center justify-center border border-border">
              <span className="text-text-primary text-mini font-bold">♥</span>
            </div>
            <span className="text-text-inverse text-value">{player.lives}</span>
          </button>

          {/* Stars */}
          <button
            onClick={() => openModal('star-info')}
            className="flex items-center gap-1 bg-bg-muted/30 rounded-full px-2 py-1 border border-border"
          >
            <div className="w-5 h-5 bg-bg-muted rounded-full flex items-center justify-center border border-border">
              <span className="text-text-primary text-mini font-bold">★</span>
            </div>
            <span className="text-text-inverse text-value">{player.stars}</span>
          </button>
        </div>

        {/* Settings */}
        <button
          onClick={() => navigate('settings')}
          className="w-10 h-10 bg-bg-inverse rounded-full flex items-center justify-center"
        >
          <Image src="/icons/Setting.svg" alt="Settings" width={20} height={20} className="invert opacity-80" />
        </button>
      </div>

      {/* Clef Collection Progress Bar (Module 2) */}
      {showClefCollection && (
        <ClefCollectionBar
          current={collectibleEvent.totalCollected || 20}
          target={100}
          endTime={collectibleEvent.endTime}
          onClick={() => navigate('clef-collection')}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col">
        {config.showAreaButton ? (
          /* Castle View Mode */
          <>
            {/* Castle View - Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-bg-muted rounded-full flex items-center justify-center border-4 border-border-strong">
                <div className="text-center">
                  <div className="text-text-muted text-body-sm">{tAreas('areaImage')}</div>
                  <div className="text-text-secondary text-caption mt-1">{currentArea?.name}</div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons - Level & Area */}
            <div className="absolute bottom-4 left-0 right-0 px-3 flex items-end justify-center gap-8">
              {/* Level Button */}
              <button
                onClick={() => openModal('level-start')}
                className="bg-bg-inverse border-2 border-border rounded-xl w-40 h-20 flex flex-col items-center justify-center"
              >
                <div className="text-text-inverse text-h3">{t('level', { level: player.currentLevel })}</div>
                <div className="text-text-muted text-caption">{t('superHard')}</div>
              </button>

              {/* Area Button */}
              <button
                onClick={() => navigate('area-tasks')}
                className="bg-bg-card border-2 border-border rounded-xl w-40 h-20 flex items-center justify-center gap-3"
              >
                <div>
                  <div className="text-text-primary text-value">{tAreas('areaNumber', { number: player.currentArea })}</div>
                  <div className="text-text-secondary text-caption">{completedTasks}/{totalTasks}</div>
                </div>
                <div className="w-8 h-8 bg-bg-inverse rounded-lg flex items-center justify-center">
                  <span className="text-text-inverse text-caption">CH</span>
                </div>
              </button>
            </div>
          </>
        ) : (
          /* Level Roadmap Mode */
          <LevelRoadmap />
        )}

        {/* Left Side Events */}
        <div className="absolute left-1 top-8 flex flex-col gap-2 z-10">
          {leftEvents.map((eventId) => {
            if (!isValidEventId(eventId)) return null;
            const cfg = EVENT_REGISTRY[eventId as EventId];
            return (
              <EventButton
                key={eventId}
                icon={cfg.shortLabel}
                timer={getEventEndTime()}
                onClick={() => navigate(cfg.page)}
                bgColor="bg-bg-inverse"
              />
            );
          })}
        </div>

        {/* Right Side Events */}
        <div className="absolute right-1 top-8 flex flex-col gap-2 z-10">
          {rightEvents.map((eventId) => {
            if (!isValidEventId(eventId)) return null;
            const cfg = EVENT_REGISTRY[eventId as EventId];
            return (
              <EventButton
                key={eventId}
                icon={cfg.shortLabel}
                timer={getEventEndTime()}
                onClick={() => navigate(cfg.page)}
                bgColor="bg-bg-inverse"
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activePage="home" />
    </div>
  );
}

// Event Button Component
interface EventButtonProps {
  icon: string;
  timer: Date | null;
  onClick: () => void;
  bgColor?: string;
}

function EventButton({ icon, timer, onClick, bgColor = 'bg-bg-inverse' }: EventButtonProps) {
  const timerData = useTimer(timer);

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center"
    >
      <div className={`w-14 h-14 ${bgColor} rounded-full border-2 border-border flex items-center justify-center`}>
        <span className="text-text-inverse text-value-sm font-bold">{icon}</span>
      </div>
      <div className="bg-bg-inverse rounded-full px-2 py-0.5 -mt-2 z-10 border border-border">
        <span className="text-text-inverse text-mini">
          {timerData.days > 0 ? `${timerData.days}d ${timerData.hours}h` : `${timerData.hours}h ${timerData.minutes}m`}
        </span>
      </div>
    </button>
  );
}

// Clef Collection Progress Bar Component (Module 2)
interface ClefCollectionBarProps {
  current: number;
  target: number;
  endTime: Date | null;
  onClick: () => void;
}

function ClefCollectionBar({
  current,
  target,
  endTime,
  onClick,
}: ClefCollectionBarProps) {
  const timerData = useTimer(endTime);
  const progress = Math.min(100, (current / target) * 100);

  return (
    <button
      onClick={onClick}
      className="mx-2 mt-1 bg-bg-muted rounded-lg border border-border overflow-hidden p-2"
    >
      {/* Progress Bar Section */}
      <div className="flex items-center gap-2">
        {/* Clef Icon */}
        <div className="w-8 h-8 bg-bg-inverse rounded-lg flex items-center justify-center border border-border flex-shrink-0">
          <ClefIcon className="w-5 h-5 text-text-inverse" />
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-5 bg-bg-page rounded-full overflow-hidden border border-border relative">
          {progress > 0 && (
            <div
              className="h-full bg-brand-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center text-text-primary text-mini font-bold">
            {current}/{target}
          </span>
        </div>

        {/* Gift Box Icon */}
        <div className="w-8 h-8 bg-bg-inverse rounded-lg flex items-center justify-center border border-border flex-shrink-0">
          <GiftIcon className="w-5 h-5 text-text-inverse" />
        </div>
      </div>

      {/* Timer Section - Centered below */}
      {endTime && (
        <div className="flex justify-center mt-1.5">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3 text-text-muted" />
            <span className="text-text-secondary text-mini">
              {timerData.days}d {timerData.hours}h {timerData.minutes}m
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

// Icons for the progress bar
function ClefIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function GiftIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  );
}

function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}
