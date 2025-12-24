'use client';

import React, { useState } from 'react';
import { useNavigation, useAdmin } from '@/store';
import { useTimer } from '@/hooks';
import { GameIcon } from '@/components/base';

// Rhythm Pass reward types
interface Reward {
  type: string;
  amount: string;
  icon: string;
}

interface PassStage {
  stage: number;
  freeReward: Reward;
  premiumReward: Reward;
  freeClaimed: boolean;
  premiumClaimed: boolean;
  unlocked: boolean;
}

// Mock data for Rhythm Pass (inspired by Winter Pass)
const passData = {
  currentStars: 10,
  maxStars: 25,
  currentStage: 12,
  isActivated: false,
  price: '$9.99',
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000),
  stages: [
    { stage: 0, freeReward: { type: 'booster', amount: 'x1', icon: 'TNT' }, premiumReward: { type: 'chest', amount: '', icon: 'CHT' }, freeClaimed: true, premiumClaimed: false, unlocked: true },
    { stage: 1, freeReward: { type: 'booster', amount: 'x1', icon: 'BLL' }, premiumReward: { type: 'lives', amount: '∞ 15m', icon: 'INF' }, freeClaimed: true, premiumClaimed: false, unlocked: true },
    { stage: 2, freeReward: { type: 'booster', amount: 'x1', icon: 'RKT' }, premiumReward: { type: 'gift', amount: 'x1', icon: 'GFT' }, freeClaimed: true, premiumClaimed: false, unlocked: true },
    { stage: 3, freeReward: { type: 'coins', amount: '100', icon: 'CNS' }, premiumReward: { type: 'booster', amount: 'x2', icon: 'JST' }, freeClaimed: false, premiumClaimed: false, unlocked: false },
    { stage: 4, freeReward: { type: 'card', amount: 'x1', icon: 'CRD' }, premiumReward: { type: 'chest', amount: 'x1', icon: 'CHT' }, freeClaimed: false, premiumClaimed: false, unlocked: false },
    { stage: 5, freeReward: { type: 'booster', amount: 'x1', icon: 'ARW' }, premiumReward: { type: 'lives', amount: '∞ 30m', icon: 'INF' }, freeClaimed: false, premiumClaimed: false, unlocked: false },
    { stage: 6, freeReward: { type: 'coins', amount: '150', icon: 'CNS' }, premiumReward: { type: 'booster', amount: 'x3', icon: 'TNT' }, freeClaimed: false, premiumClaimed: false, unlocked: false },
    { stage: 7, freeReward: { type: 'booster', amount: 'x1', icon: 'HAM' }, premiumReward: { type: 'gift', amount: 'x1', icon: 'GFT' }, freeClaimed: false, premiumClaimed: false, unlocked: false },
  ] as PassStage[],
  bonusBank: {
    unlocked: false,
  },
};

export function RoyalPassPage() {
  const { navigate } = useNavigation();
  const { isEventEnabled } = useAdmin();
  const [isActivated, setIsActivated] = useState(passData.isActivated);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showUnlockTooltip, setShowUnlockTooltip] = useState<number | null>(null);
  const timer = useTimer(passData.endTime);

  if (!isEventEnabled('royal-pass')) {
    return (
      <div className="flex flex-col h-full bg-bg-inverse items-center justify-center">
        <p className="text-text-inverse text-value">Event not available</p>
        <button onClick={() => navigate('main-menu')} className="mt-4 text-brand-primary underline">
          Go Back
        </button>
      </div>
    );
  }

  const progress = (passData.currentStars / passData.maxStars) * 100;

  return (
    <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
      {/* Header Banner Area - mimics the decorative top section */}
      <div className="relative bg-bg-inverse pt-2 pb-0">
        {/* Info and Close buttons */}
        <div className="absolute top-2 left-3 z-10">
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-8 h-8 bg-border-strong/80 rounded-full flex items-center justify-center border border-border"
          >
            <span className="text-text-primary text-body font-semibold">i</span>
          </button>
        </div>
        <div className="absolute top-2 right-3 z-10">
          <button
            onClick={() => navigate('main-menu')}
            className="w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border"
          >
            <span className="text-text-inverse font-bold text-body">✕</span>
          </button>
        </div>

        {/* Decorative Header Area (placeholder for themed graphics) */}
        <div className="h-24 bg-bg-muted mx-2 rounded-t-2xl border border-b-0 border-border flex items-center justify-center">
          <div className="text-text-muted text-caption">[Decorative Banner]</div>
        </div>
      </div>

      {/* Title Banner - Red ribbon style like Winter Pass */}
      <div className="mx-2 bg-bg-inverse border-x border-border">
        <div className="bg-status-error py-3 px-4 flex flex-col items-center">
          <h1 className="text-text-inverse text-h1 font-bold tracking-wide">Rhythm Pass</h1>
          {/* Timer */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-4 h-4 bg-bg-card/30 rounded flex items-center justify-center">
              <span className="text-text-inverse text-mini">⏱</span>
            </div>
            <span className="text-text-inverse text-caption font-medium">{timer.days}d {timer.hours}h</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mx-2 bg-bg-inverse border-x border-border px-3 py-3">
        <div className="flex items-center gap-2">
          {/* Star Icon */}
          <div className="w-9 h-9 bg-status-warning rounded-lg flex items-center justify-center border-2 border-border rotate-12">
            <GameIcon code="STR" size={18} />
          </div>
          {/* Progress Bar */}
          <div className="flex-1 relative">
            <div className="h-5 bg-border-strong rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-status-warning rounded-full transition-all relative"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Progress Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-text-primary text-caption font-bold">{passData.currentStars}/{passData.maxStars}</span>
            </div>
          </div>
          {/* Current Stage Badge */}
          <div className="w-9 h-9 bg-status-success rounded-lg flex items-center justify-center border-2 border-border rotate-45">
            <span className="text-text-inverse text-value font-bold -rotate-45">{passData.currentStage}</span>
          </div>
          {/* Activate Button */}
          <button
            onClick={() => !isActivated && setShowActivateModal(true)}
            className={`px-4 py-2 rounded-full font-bold text-value ${
              isActivated
                ? 'bg-border-strong text-text-muted'
                : 'bg-status-success text-text-inverse border-2 border-border'
            }`}
          >
            {isActivated ? '✓' : 'Activate'}
          </button>
        </div>
      </div>

      {/* Main Panel with rewards */}
      <div className="flex-1 mx-2 mb-2 bg-bg-muted rounded-b-2xl border border-t-0 border-border overflow-hidden flex flex-col">
        {/* Track Header */}
        <div className="flex px-3 py-2 border-b border-border">
          <div className="flex-1 text-center">
            <span className="text-text-secondary text-caption font-medium">Free</span>
          </div>
          <div className="w-12" />
          <div className="flex-1 text-center">
            <span className="text-status-warning text-caption font-bold">Rhythm Pass</span>
          </div>
        </div>

        {/* Reward Track */}
        <div className="flex-1 overflow-y-auto">
          {passData.stages.map((stage, index) => (
            <div key={stage.stage} className="relative flex items-center px-3 py-1.5">
              {/* Vertical Line (behind everything) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-status-success -translate-x-1/2 z-0" />

              {/* Free Reward Card */}
              <div
                className={`flex-1 rounded-xl p-1.5 border-2 relative z-10 ${
                  stage.freeClaimed
                    ? 'bg-bg-card border-status-success'
                    : stage.unlocked
                      ? 'bg-bg-card border-border'
                      : 'bg-bg-muted border-border'
                }`}
              >
                <div className="h-14 rounded-lg bg-border-strong flex flex-col items-center justify-center relative">
                  <GameIcon code={stage.freeReward.icon} size={24} />
                  {stage.freeReward.amount && (
                    <span className="text-text-secondary text-mini font-medium">{stage.freeReward.amount}</span>
                  )}
                </div>
                {/* Claimed checkmark */}
                {stage.freeClaimed && (
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-status-success rounded-full flex items-center justify-center border border-border">
                    <span className="text-text-inverse text-mini">✓</span>
                  </div>
                )}
              </div>

              {/* Stage Number Diamond */}
              <div className="w-12 flex justify-center z-10">
                <div
                  className={`w-8 h-8 rotate-45 flex items-center justify-center border-2 ${
                    stage.unlocked
                      ? 'bg-status-success border-border'
                      : 'bg-border-strong border-border'
                  }`}
                  onClick={() => !stage.unlocked && setShowUnlockTooltip(showUnlockTooltip === stage.stage ? null : stage.stage)}
                >
                  <span className={`-rotate-45 text-value font-bold ${
                    stage.unlocked ? 'text-text-inverse' : 'text-text-muted'
                  }`}>
                    {stage.stage}
                  </span>
                </div>
              </div>

              {/* Premium Reward Card */}
              <div
                className={`flex-1 rounded-xl p-1.5 border-2 relative z-10 ${
                  isActivated && stage.premiumClaimed
                    ? 'bg-status-warning/20 border-status-warning'
                    : isActivated && stage.unlocked
                      ? 'bg-bg-card border-status-warning'
                      : 'bg-bg-muted border-border'
                }`}
              >
                <div className={`h-14 rounded-lg flex flex-col items-center justify-center relative ${
                  isActivated ? 'bg-status-warning/20' : 'bg-border-strong'
                }`}>
                  <GameIcon
                    code={stage.premiumReward.icon}
                    size={24}
                    className={!isActivated && !stage.unlocked ? 'opacity-50' : ''}
                  />
                  {stage.premiumReward.amount && (
                    <span className={`text-mini font-medium ${
                      isActivated ? 'text-text-primary' : 'text-text-muted'
                    }`}>
                      {stage.premiumReward.amount}
                    </span>
                  )}
                </div>
                {/* Lock icon for premium */}
                {!isActivated && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-status-warning rounded flex items-center justify-center border border-border">
                    <span className="text-text-inverse text-mini">🔒</span>
                  </div>
                )}
                {/* Claimed checkmark */}
                {isActivated && stage.premiumClaimed && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-status-success rounded-full flex items-center justify-center border border-border">
                    <span className="text-text-inverse text-mini">✓</span>
                  </div>
                )}
              </div>

              {/* Unlock Tooltip */}
              {showUnlockTooltip === stage.stage && !stage.unlocked && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 w-48">
                  <div className="bg-bg-card rounded-lg p-2 border border-border shadow-lg">
                    <p className="text-text-primary text-mini text-center">
                      Unlock this stage and activate the <span className="text-status-warning font-bold">Rhythm Pass</span> to get this reward!
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Bonus Bank Section */}
          <div className="px-3 py-3 border-t border-border mt-2">
            <div className="text-center mb-2">
              <h3 className="text-text-primary text-h4 font-bold">Bonus Bank</h3>
            </div>
            <div className={`rounded-xl p-3 border-2 ${
              passData.bonusBank.unlocked
                ? 'bg-status-success/20 border-status-success'
                : 'bg-bg-muted border-border'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-status-error/20 rounded-xl flex items-center justify-center border-2 border-status-error">
                  <span className="text-h2">💰</span>
                </div>
                <div className="flex-1">
                  <p className="text-text-secondary text-caption">
                    Activate the <span className="text-status-warning font-bold">Rhythm Pass</span> to unlock the Bonus Bank at the end of the stages!
                  </p>
                </div>
                {!passData.bonusBank.unlocked && (
                  <div className="w-8 h-8 bg-status-warning rounded flex items-center justify-center">
                    <span className="text-text-inverse">🔒</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activate Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[320px] mx-4 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowActivateModal(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center z-10 border-2 border-border"
            >
              <span className="text-text-inverse font-bold text-body">✕</span>
            </button>

            <div className="bg-status-error py-4 px-3">
              <h2 className="text-text-inverse text-h2 text-center font-bold">Activate Rhythm Pass</h2>
            </div>

            <div className="bg-bg-muted p-4">
              <p className="text-text-primary text-center text-value mb-4">
                Unlock premium rewards and exclusive bonuses!
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 bg-bg-card rounded-xl p-3 border border-border">
                  <div className="w-12 h-12 bg-status-error rounded-xl flex items-center justify-center border-2 border-border">
                    <span className="text-text-inverse text-h3">8</span>
                  </div>
                  <span className="text-text-primary text-body">8 lives instead of 5</span>
                </div>
                <div className="flex items-center gap-3 bg-bg-card rounded-xl p-3 border border-border">
                  <div className="w-12 h-12 bg-status-warning rounded-xl flex items-center justify-center border-2 border-border">
                    <span className="text-text-inverse text-value-sm">VIP</span>
                  </div>
                  <span className="text-text-primary text-body">Exclusive profile frame</span>
                </div>
                <div className="flex items-center gap-3 bg-bg-card rounded-xl p-3 border border-border">
                  <div className="w-12 h-12 bg-status-success rounded-xl flex items-center justify-center border-2 border-border">
                    <GameIcon code="GFT" size={24} />
                  </div>
                  <span className="text-text-primary text-body">Gift for teammates</span>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="bg-bg-card rounded-full px-4 py-1.5 border border-border">
                  <span className="text-text-primary text-caption">Ends in {timer.days}d {timer.hours}h</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsActivated(true);
                  setShowActivateModal(false);
                }}
                className="w-full py-4 bg-status-success rounded-xl border-2 border-border"
              >
                <span className="text-text-inverse text-h3 font-bold">{passData.price}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal - Royal Match Style */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[320px] mx-4 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center z-10 border-2 border-border"
            >
              <span className="text-text-inverse font-bold text-body">✕</span>
            </button>

            {/* Header */}
            <div className="bg-status-error py-4 px-3">
              <h1 className="text-text-inverse text-h2 text-center font-bold">Rhythm Pass</h1>
            </div>

            <div className="bg-bg-muted p-4">
              {/* Step 1: Beat Levels */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-status-success rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
                  <span className="text-text-inverse text-h3">✓</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-text-primary text-body">
                    Beat levels to fill the <span className="text-status-warning font-bold">Rhythm Pass</span> progress bar.
                  </p>
                </div>
              </div>

              {/* Step 2: Fill Progress */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-status-warning rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border rotate-12">
                  <GameIcon code="STR" size={24} />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-text-primary text-body">
                    Fill the progress bar to unlock stages and claim rewards.
                  </p>
                </div>
              </div>

              {/* Step 3: Premium Rewards */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-status-error rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
                  <GameIcon code="GFT" size={24} />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-text-primary text-body">
                    Activate the <span className="text-status-warning font-bold">Rhythm Pass</span> to claim <span className="font-bold">premium rewards</span> too!
                  </p>
                </div>
              </div>

              {/* Step 4: Bonus Bank */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-status-error/80 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
                  <span className="text-h3">💰</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-text-primary text-body">
                    Unlock the <span className="font-bold">Bonus Bank</span> at the end of all stages!
                  </p>
                </div>
              </div>

              {/* OK Button */}
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-3 bg-status-success rounded-xl border-2 border-border mt-2"
              >
                <span className="text-text-inverse text-h3 font-bold">OK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
