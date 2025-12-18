'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useAdmin, useWinningStreak } from '@/store';
import { useTimer } from '@/hooks';
import { Button, Card } from '@/components/base';
import { winningStreakConfig } from '@/config';

/**
 * ClefCollectionPage - Module 2: Collectible Milestone Event
 *
 * A time-limited event where players collect clefs during gameplay
 * to unlock milestone rewards. Vertical ladder layout with milestones
 * starting from bottom (1) going up.
 */
export function ClefCollectionPage() {
  const { navigate, openModal } = useNavigation();
  const { isEventEnabled } = useAdmin();
  const { state: winningStreakState, claimMilestone, startEvent } = useWinningStreak();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { collectibleEvent } = winningStreakState;
  const config = winningStreakConfig.collectibleEvent;

  // Start event if not active (for demo purposes)
  useEffect(() => {
    if (!collectibleEvent.isActive && collectibleEvent.isUnlocked) {
      startEvent('clef-collection-demo');
    }
  }, [collectibleEvent.isActive, collectibleEvent.isUnlocked, startEvent]);

  // Scroll to bottom on mount (so milestone 1 is visible)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const timer = useTimer(collectibleEvent.endTime);

  // Check if feature is enabled
  if (!isEventEnabled('clef-collection')) {
    return (
      <div className="flex flex-col h-full bg-bg-page items-center justify-center p-4">
        <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
          <span className="text-h2 text-text-muted">!</span>
        </div>
        <p className="text-body text-text-primary mb-2">Event Not Available</p>
        <p className="text-caption text-text-secondary text-center mb-4">
          Clef Collection is not currently active
        </p>
        <Button variant="outline" onClick={() => navigate('main-menu')}>
          Go Back
        </Button>
      </div>
    );
  }

  // Check if unlocked
  if (!collectibleEvent.isUnlocked) {
    return (
      <div className="flex flex-col h-full bg-bg-page items-center justify-center p-4">
        <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
          <LockIcon className="w-8 h-8 text-text-muted" />
        </div>
        <p className="text-body text-text-primary mb-2">Event Locked</p>
        <p className="text-caption text-text-secondary text-center mb-4">
          Reach level {config.unlockLevel} to participate
        </p>
        <Button variant="outline" onClick={() => navigate('main-menu')}>
          Go Back
        </Button>
      </div>
    );
  }

  const { totalCollected, milestones } = collectibleEvent;
  const progress = Math.min(100, (totalCollected / 100) * 100);

  // Reverse milestones so 1 is at bottom
  const reversedMilestones = [...milestones].reverse();

  return (
    <div className="flex flex-col h-full bg-bg-page overflow-hidden">
      {/* Header */}
      <div className="bg-bg-inverse pt-2 pb-3 px-3 flex items-center justify-between">
        <button
          onClick={() => setShowInfoModal(true)}
          className="w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border"
        >
          <span className="text-text-primary font-bold text-caption">?</span>
        </button>
        <h1 className="text-text-inverse text-h2">Clef Collection</h1>
        <button
          onClick={() => navigate('main-menu')}
          className="w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border"
        >
          <span className="text-text-primary font-bold">X</span>
        </button>
      </div>

      {/* Timer */}
      <div className="flex justify-center py-3">
        <div className="flex items-center gap-2 bg-bg-card rounded-full px-4 py-1.5 border border-border">
          <ClockIcon className="w-4 h-4 text-text-secondary" />
          <span className="text-text-primary text-value">
            {timer.days}d {timer.hours}h {timer.minutes}m
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2">
          {/* Clef Icon */}
          <div className="w-10 h-10 bg-bg-inverse rounded-lg flex items-center justify-center border border-border flex-shrink-0">
            <ClefIcon className="w-6 h-6 text-text-inverse" />
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-6 bg-bg-muted rounded-full overflow-hidden border border-border relative">
            {progress > 0 && (
              <div
                className="h-full bg-brand-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center text-text-primary text-caption font-bold">
              {totalCollected}/100
            </span>
          </div>

          {/* Gift Icon */}
          <div className="w-10 h-10 bg-bg-inverse rounded-lg flex items-center justify-center border border-border flex-shrink-0">
            <GiftIcon className="w-6 h-6 text-text-inverse" />
          </div>
        </div>
      </div>

      {/* Scrollable Milestone List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border" />

          {/* Milestones - reversed so 1 is at bottom */}
          <div className="space-y-3">
            {reversedMilestones.map((milestone) => {
              const isClaimed = milestone.claimed;
              const isReached = milestone.reached;

              return (
                <div key={milestone.step} className="flex items-center gap-3 relative">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 flex-shrink-0 ${
                      isClaimed
                        ? 'bg-bg-inverse border-bg-inverse'
                        : isReached
                        ? 'bg-brand-primary border-brand-primary'
                        : 'bg-bg-card border-border'
                    }`}
                  >
                    {isClaimed ? (
                      <CheckIcon className="w-5 h-5 text-text-inverse" />
                    ) : (
                      <span
                        className={`text-caption font-bold ${
                          isReached ? 'text-text-inverse' : 'text-text-muted'
                        }`}
                      >
                        {milestone.step}
                      </span>
                    )}
                  </div>

                  {/* Milestone Card */}
                  <Card
                    padding="sm"
                    className={`flex-1 flex items-center justify-between ${
                      isClaimed ? 'bg-bg-muted' : ''
                    }`}
                  >
                    <div>
                      <p className={`text-caption font-medium ${isClaimed ? 'text-text-muted' : 'text-text-primary'}`}>
                        {formatReward(milestone.reward)}
                      </p>
                      <p className="text-mini text-text-muted uppercase">
                        {milestone.itemsRequired} Clefs
                      </p>
                    </div>

                    {/* Status Icon */}
                    {isClaimed ? (
                      <div className="w-6 h-6 bg-bg-inverse rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-text-inverse" />
                      </div>
                    ) : isReached ? (
                      <Button size="sm" onClick={() => claimMilestone(milestone.step)}>
                        Claim
                      </Button>
                    ) : (
                      <LockIcon className="w-5 h-5 text-text-muted" />
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="p-4 border-t border-border bg-bg-card">
        <Button fullWidth size="lg" onClick={() => {
          navigate('main-menu');
          setTimeout(() => openModal('level-start'), 100);
        }}>
          Play Level
        </Button>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal
          onClose={() => setShowInfoModal(false)}
          onPlay={() => {
            setShowInfoModal(false);
            navigate('main-menu');
            setTimeout(() => openModal('level-start'), 100);
          }}
        />
      )}
    </div>
  );
}

/**
 * Info Modal Component
 */
function InfoModal({ onClose, onPlay }: { onClose: () => void; onPlay: () => void }) {
  const config = winningStreakConfig.collectibleEvent;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card padding="none" className="w-full max-w-[320px] overflow-hidden">
        {/* Header */}
        <div className="bg-bg-inverse py-4 px-3 relative">
          <h2 className="text-text-inverse text-h2 text-center">How It Works</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border"
          >
            <span className="text-text-primary font-bold text-caption">X</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center flex-shrink-0">
              <ClefIcon className="w-6 h-6 text-text-inverse" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Collect {config.collectibleName}</p>
              <p className="text-caption text-text-secondary">
                {config.collectibleName} appear during gameplay. Collect them!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-inverse rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-6 h-6 text-text-inverse" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Complete Levels</p>
              <p className="text-caption text-text-secondary">
                {config.collectibleName} only count when you win
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bg-muted rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
              <GiftIcon className="w-6 h-6 text-text-secondary" />
            </div>
            <div>
              <p className="text-h4 text-text-primary">Earn Rewards</p>
              <p className="text-caption text-text-secondary">
                Reach milestones for amazing prizes!
              </p>
            </div>
          </div>

          <div className="bg-bg-muted rounded-xl p-3 mb-4 border border-border">
            <p className="text-caption text-text-secondary text-center">
              <span className="font-bold text-text-primary">Warning:</span>{' '}
              Losing a level means you lose collected {config.collectibleName.toLowerCase()}!
            </p>
          </div>

          <Button fullWidth size="lg" onClick={onPlay}>
            Play
          </Button>
        </div>
      </Card>
    </div>
  );
}

/**
 * Format reward for display
 */
function formatReward(reward: { type: string; amount: number; name?: string }): string {
  if (reward.type === 'coins') {
    return `${reward.amount.toLocaleString()} Coins`;
  }
  if (reward.type === 'lives') {
    return `${reward.amount} Lives`;
  }
  if (reward.type === 'booster') {
    return `${reward.name || 'Booster'} x${reward.amount}`;
  }
  return `${reward.amount} ${reward.type}`;
}

// Icons
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

function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" />
    </svg>
  );
}
