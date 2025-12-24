'use client';

import React, { useState } from 'react';
import { useNavigation, useAdmin } from '@/store';
import { useTimer } from '@/hooks';
import { GameIcon } from '@/components/base';

// Mission types
interface Mission {
  id: number;
  type: 'level_complete' | 'perfect_clear' | 'hard_level' | 'booster_use' | 'streak_achieve' | 'playtime';
  title: string;
  current: number;
  target: number;
  soundWaveReward: number;
  completed: boolean;
  icon: string;
}

interface Stage {
  id: number;
  name: string;
  missions: Mission[];
  chestColor: 'gold' | 'green' | 'blue' | 'pink';
  unlocked: boolean;
  completed: boolean;
}

// Mock data for Melody Quest (Mission Control)
const melodyQuestData = {
  name: 'Melody Quest',
  endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000), // 1d 17h
  stages: [
    {
      id: 1,
      name: 'Stage 1',
      chestColor: 'gold' as const,
      unlocked: true,
      completed: false,
      missions: [
        { id: 1, type: 'level_complete' as const, title: 'Do 1 Area Task!', current: 0, target: 1, soundWaveReward: 3, completed: false, icon: 'STR' },
        { id: 2, type: 'level_complete' as const, title: 'Complete 8 Steps!', current: 0, target: 8, soundWaveReward: 3, completed: false, icon: 'CRD' },
        { id: 3, type: 'streak_achieve' as const, title: 'Raise 2 Steps!', current: 0, target: 2, soundWaveReward: 2, completed: false, icon: 'BLL' },
        { id: 4, type: 'hard_level' as const, title: 'Win 1 Super Hard Level!', current: 0, target: 1, soundWaveReward: 2, completed: false, icon: 'JST' },
      ],
    },
    {
      id: 2,
      name: 'Stage 2',
      chestColor: 'green' as const,
      unlocked: false,
      completed: false,
      missions: [
        { id: 1, type: 'level_complete' as const, title: 'Complete 10 Levels!', current: 0, target: 10, soundWaveReward: 3, completed: false, icon: 'STR' },
        { id: 2, type: 'perfect_clear' as const, title: 'Get 5 Perfect Scores!', current: 0, target: 5, soundWaveReward: 3, completed: false, icon: 'CRD' },
        { id: 3, type: 'booster_use' as const, title: 'Use 3 Hints!', current: 0, target: 3, soundWaveReward: 2, completed: false, icon: 'BLL' },
        { id: 4, type: 'hard_level' as const, title: 'Win 2 Hard Levels!', current: 0, target: 2, soundWaveReward: 2, completed: false, icon: 'JST' },
      ],
    },
    {
      id: 3,
      name: 'Stage 3',
      chestColor: 'blue' as const,
      unlocked: false,
      completed: false,
      missions: [
        { id: 1, type: 'level_complete' as const, title: 'Complete 15 Levels!', current: 0, target: 15, soundWaveReward: 3, completed: false, icon: 'STR' },
        { id: 2, type: 'streak_achieve' as const, title: 'Win 5 Levels in a Row!', current: 0, target: 5, soundWaveReward: 3, completed: false, icon: 'CRD' },
        { id: 3, type: 'playtime' as const, title: 'Play for 20 Minutes!', current: 0, target: 20, soundWaveReward: 2, completed: false, icon: 'BLL' },
        { id: 4, type: 'hard_level' as const, title: 'Win 3 Super Hard Levels!', current: 0, target: 3, soundWaveReward: 2, completed: false, icon: 'JST' },
      ],
    },
    {
      id: 4,
      name: 'Stage 4',
      chestColor: 'pink' as const,
      unlocked: false,
      completed: false,
      missions: [
        { id: 1, type: 'level_complete' as const, title: 'Complete 20 Levels!', current: 0, target: 20, soundWaveReward: 4, completed: false, icon: 'STR' },
        { id: 2, type: 'perfect_clear' as const, title: 'Get 10 Perfect Scores!', current: 0, target: 10, soundWaveReward: 4, completed: false, icon: 'CRD' },
        { id: 3, type: 'booster_use' as const, title: 'Use 5 Boosters!', current: 0, target: 5, soundWaveReward: 3, completed: false, icon: 'BLL' },
        { id: 4, type: 'hard_level' as const, title: 'Win 5 Super Hard Levels!', current: 0, target: 5, soundWaveReward: 3, completed: false, icon: 'JST' },
      ],
    },
  ] as Stage[],
  grandPrize: {
    claimed: false,
    rewards: [
      { icon: 'TNT', amount: 'x3' },
      { icon: 'CNS', amount: '500' },
      { icon: 'CRD', amount: 'x5' },
      { icon: 'INF', amount: '30m' },
    ],
  },
};

// Chest color styling
const chestColorStyles = {
  gold: {
    bg: 'bg-status-warning',
    border: 'border-status-warning',
    text: 'text-text-inverse',
  },
  green: {
    bg: 'bg-status-success',
    border: 'border-status-success',
    text: 'text-text-inverse',
  },
  blue: {
    bg: 'bg-brand-primary',
    border: 'border-brand-primary',
    text: 'text-text-inverse',
  },
  pink: {
    bg: 'bg-status-error',
    border: 'border-status-error',
    text: 'text-text-inverse',
  },
};

export function MissionControlPage() {
  const { navigate } = useNavigation();
  const { isEventEnabled } = useAdmin();
  const [activeStage, setActiveStage] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const timer = useTimer(melodyQuestData.endTime);

  // Check if event is enabled
  if (!isEventEnabled('mission-control')) {
    return (
      <div className="flex flex-col h-full bg-bg-inverse items-center justify-center">
        <p className="text-text-inverse text-value">Event not available</p>
        <button onClick={() => navigate('main-menu')} className="mt-4 text-brand-primary underline">
          Go Back
        </button>
      </div>
    );
  }

  const currentStage = melodyQuestData.stages.find(s => s.id === activeStage) || melodyQuestData.stages[0];

  return (
    <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
      {/* Header Banner */}
      <div className="relative bg-brand-primary mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
        {/* Info Button */}
        <button
          onClick={() => setShowInfoModal(true)}
          className="absolute top-2 left-2 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center border-2 border-border z-10"
        >
          <span className="text-text-inverse text-body font-bold">i</span>
        </button>

        {/* Close Button */}
        <button
          onClick={() => navigate('main-menu')}
          className="absolute top-2 right-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border z-10"
        >
          <span className="text-text-inverse font-bold text-body">✕</span>
        </button>

        {/* Title Banner */}
        <div className="pt-2 pb-3 px-4">
          <div className="bg-status-warning rounded-xl py-2 px-4 mx-4 border-2 border-border">
            <h1 className="text-text-inverse text-h1 text-center font-bold">Melody Quest</h1>
          </div>
        </div>

        {/* Grand Prize Section */}
        <div className="bg-brand-muted/30 rounded-lg mx-3 mb-3 p-3 border border-border">
          {/* Grand Prize Label */}
          <div className="text-center mb-2">
            <span className="bg-brand-primary text-text-inverse text-caption px-3 py-1 rounded-full border border-border font-medium">
              Grand Prize
            </span>
          </div>

          {/* Grand Prize Chest */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 bg-status-warning rounded-xl flex items-center justify-center border-2 border-border relative">
              <span className="text-h2">👑</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center border border-border">
                <span className="text-text-inverse text-mini">🎁</span>
              </div>
            </div>
          </div>

          {/* Stage Chests Row */}
          <div className="flex justify-center gap-3 mb-3">
            {melodyQuestData.stages.map((stage) => {
              const styles = chestColorStyles[stage.chestColor];
              return (
                <div
                  key={stage.id}
                  className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center border-2 border-border relative ${
                    !stage.unlocked ? 'opacity-50' : ''
                  }`}
                >
                  <span className="text-body">📦</span>
                  {stage.completed && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-status-success rounded-full flex items-center justify-center">
                      <span className="text-text-inverse text-mini">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timer */}
          <div className="flex justify-center">
            <div className="bg-status-error rounded-full px-4 py-1 flex items-center gap-2 border border-border">
              <span className="text-text-inverse text-mini">⏱</span>
              <span className="text-text-inverse text-value font-bold">{timer.days}d {timer.hours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Panel */}
      <div className="flex-1 mx-2 bg-brand-primary rounded-b-2xl border-2 border-t-0 border-status-warning overflow-hidden flex flex-col">
        {/* Missions List */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {currentStage.missions.map((mission) => {
              const progress = (mission.current / mission.target) * 100;
              return (
                <div
                  key={mission.id}
                  className={`rounded-xl p-3 border-2 flex items-center gap-3 ${
                    mission.completed
                      ? 'bg-status-success/20 border-status-success'
                      : 'bg-bg-card border-border'
                  }`}
                >
                  {/* Mission Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-border flex-shrink-0 ${
                    mission.completed ? 'bg-status-success' : 'bg-status-warning'
                  }`}>
                    <GameIcon code={mission.icon} size={24} />
                  </div>

                  {/* Mission Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-value font-bold truncate">{mission.title}</p>
                    <div className="mt-1">
                      <div className="h-5 bg-brand-primary rounded-full overflow-hidden border border-border relative">
                        <div
                          className={`h-full rounded-full transition-all ${
                            mission.completed ? 'bg-status-success' : 'bg-status-warning'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-text-inverse text-caption font-bold">
                          {mission.current}/{mission.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sound Wave Rewards */}
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    {[...Array(Math.min(mission.soundWaveReward, 3))].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-7 h-5 rounded flex items-center justify-center ${
                          mission.completed ? 'bg-status-success' : 'bg-status-warning'
                        }`}
                      >
                        <span className="text-mini">🔊</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Tabs */}
        <div className="bg-brand-muted/50 border-t border-border">
          <div className="flex">
            {melodyQuestData.stages.map((stage) => {
              const styles = chestColorStyles[stage.chestColor];
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  disabled={!stage.unlocked}
                  className={`flex-1 py-3 text-value font-bold transition-all ${
                    isActive
                      ? `${styles.bg} ${styles.text}`
                      : stage.unlocked
                        ? 'bg-bg-muted text-text-primary'
                        : 'bg-bg-muted/50 text-text-muted'
                  } ${stage.id === 1 ? 'rounded-bl-xl' : ''} ${
                    stage.id === melodyQuestData.stages.length ? 'rounded-br-xl' : ''
                  }`}
                >
                  {stage.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-2 bg-bg-inverse" />

      {/* Info Modal - Tutorial Flow */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[340px] mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border z-10"
            >
              <span className="text-text-inverse font-bold text-body">✕</span>
            </button>

            {/* Title */}
            <div className="bg-status-warning rounded-t-2xl py-4 px-4 border-2 border-b-0 border-border">
              <h1 className="text-text-inverse text-h1 text-center font-bold">Melody Quest</h1>
            </div>

            {/* Content */}
            <div className="bg-bg-muted p-6 rounded-b-2xl border-2 border-t-0 border-border">
              {/* Step 1: Complete Missions */}
              <div className="mb-6">
                <div className="bg-bg-card rounded-xl p-3 border border-border mb-2">
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-status-warning rounded-lg flex items-center justify-center border border-border">
                          <GameIcon code="STR" size={16} />
                        </div>
                        <div className="flex-1 h-4 bg-status-success rounded-full border border-border" />
                        <div className="w-6 h-6 bg-status-success rounded flex items-center justify-center">
                          <span className="text-text-inverse text-mini">✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-text-primary text-h3 text-center font-bold">Complete Missions!</p>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-4">
                <div className="text-status-warning text-h1">↓</div>
              </div>

              {/* Step 2: Collect Sound Waves */}
              <div className="mb-6">
                <div className="flex justify-center mb-2">
                  <div className="w-14 h-20 bg-status-warning rounded-xl flex items-center justify-center border-2 border-border">
                    <span className="text-h2">🔊</span>
                  </div>
                </div>
                <p className="text-text-primary text-h3 text-center font-bold">Collect Sound Waves!</p>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-4">
                <div className="text-status-warning text-h1">↓</div>
              </div>

              {/* Step 3: Win Rewards */}
              <div className="mb-6">
                <div className="flex justify-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-status-warning rounded-lg flex items-center justify-center border border-border">
                    <GameIcon code="TNT" size={20} />
                  </div>
                  <div className="w-16 h-16 bg-status-warning rounded-xl flex items-center justify-center border-2 border-border">
                    <span className="text-h1">👑</span>
                  </div>
                  <div className="w-10 h-10 bg-status-warning rounded-lg flex items-center justify-center border border-border">
                    <GameIcon code="CNS" size={20} />
                  </div>
                </div>
                <p className="text-text-primary text-h3 text-center font-bold">Win Rewards!</p>
              </div>

              {/* Tap to Continue Button */}
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-4 bg-status-success rounded-xl border-2 border-border"
              >
                <span className="text-text-inverse text-h3 font-bold">Tap to Continue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
