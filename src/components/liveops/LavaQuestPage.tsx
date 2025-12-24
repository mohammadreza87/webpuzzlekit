'use client';

import React, { useState, useEffect } from 'react';
import { useNavigation, useAdmin } from '@/store';
import { useTimer } from '@/hooks';
import { GameIcon } from '@/components/base';

// Game states for Stage Showdown
type ShowdownState = 'entry' | 'matching' | 'playing' | 'level-complete' | 'eliminated' | 'victory';

// Survivor counts per level (simulated)
const SURVIVOR_PROGRESSION = [100, 87, 72, 58, 45, 32, 21, 12];

// Stage Showdown data
const stageShowdownData = {
  name: 'Stage Showdown',
  grandPrize: 10000,
  totalLevels: 7,
  playersPerCompetition: 100,
  retryCooldownMinutes: 30,
  endTime: new Date(Date.now() + 23 * 60 * 60 * 1000 + 59 * 52 * 1000), // ~24h
};

export function LavaQuestPage() {
  const { navigate } = useNavigation();
  const { isEventEnabled } = useAdmin();
  const [gameState, setGameState] = useState<ShowdownState>('entry');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [survivors, setSurvivors] = useState(100);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [retryCooldown, setRetryCooldown] = useState(0);
  const timer = useTimer(stageShowdownData.endTime);

  // Check if event is enabled
  if (!isEventEnabled('lava-quest')) {
    return (
      <div className="flex flex-col h-full bg-bg-inverse items-center justify-center">
        <p className="text-text-inverse text-value">Event not available</p>
        <button onClick={() => navigate('main-menu')} className="mt-4 text-brand-primary underline">
          Go Back
        </button>
      </div>
    );
  }

  // Simulate matching animation
  useEffect(() => {
    if (gameState === 'matching' && matchingProgress < 100) {
      const interval = setInterval(() => {
        setMatchingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15 + 5);
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [gameState, matchingProgress]);

  // Retry cooldown timer
  useEffect(() => {
    if (gameState === 'eliminated' && retryCooldown > 0) {
      const interval = setInterval(() => {
        setRetryCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, retryCooldown]);

  // Calculate potential prize share
  const potentialPrize = Math.floor(stageShowdownData.grandPrize / Math.max(1, survivors));

  // Handlers
  const handleTakeTheStage = () => {
    setGameState('matching');
    setMatchingProgress(0);
  };

  const handleStartCompetition = () => {
    setGameState('playing');
    setCurrentLevel(0);
    setSurvivors(100);
  };

  const handlePlayLevel = () => {
    // Simulate playing a level (for prototype, always win)
    const newLevel = currentLevel + 1;
    setCurrentLevel(newLevel);

    // Update survivors based on progression
    const newSurvivors = SURVIVOR_PROGRESSION[newLevel] || 12;
    setSurvivors(newSurvivors);

    if (newLevel >= stageShowdownData.totalLevels) {
      setGameState('victory');
    } else {
      setGameState('level-complete');
    }
  };

  const handleSimulateElimination = () => {
    setGameState('eliminated');
    setRetryCooldown(stageShowdownData.retryCooldownMinutes * 60);
  };

  const handleNextPerformance = () => {
    setGameState('playing');
  };

  const handleRetry = () => {
    setGameState('entry');
    setCurrentLevel(0);
    setSurvivors(100);
  };

  const handleClaim = () => {
    navigate('main-menu');
  };

  // Format cooldown time
  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ========== ENTRY SCREEN ==========
  if (gameState === 'entry') {
    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="relative bg-status-error pt-2 pb-0 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
          {/* Info Button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="absolute top-2 left-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border z-10"
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

          {/* Title */}
          <div className="pt-8 pb-4 px-4">
            <h1 className="text-text-inverse text-h1 text-center font-bold">Stage Showdown</h1>
            <p className="text-text-inverse/80 text-caption text-center mt-1">100 Performers. 7 Levels. 1 Grand Prize.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 mx-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-status-warning flex flex-col items-center justify-center px-6">
          {/* Grand Prize Display */}
          <div className="bg-status-warning rounded-2xl p-6 mb-6 border-2 border-border w-full max-w-[280px]">
            <div className="text-center">
              <span className="text-text-inverse text-caption font-medium">GRAND PRIZE</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-10 h-10 bg-status-warning rounded-full flex items-center justify-center border-2 border-border">
                  <span className="text-h3">🏆</span>
                </div>
                <span className="text-text-inverse text-h1 font-bold">{stageShowdownData.grandPrize.toLocaleString()}</span>
                <GameIcon code="CNS" size={24} />
              </div>
              <p className="text-text-inverse/80 text-mini mt-2">Shared among all winners!</p>
            </div>
          </div>

          {/* 100 Performers Badge */}
          <div className="bg-brand-primary rounded-xl px-6 py-3 mb-6 border-2 border-border">
            <div className="flex items-center gap-3">
              <span className="text-h2">👥</span>
              <div>
                <span className="text-text-inverse text-h3 font-bold">100 Performers</span>
                <p className="text-text-inverse/70 text-mini">Compete for the prize!</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-status-error rounded-full flex items-center justify-center border border-border">
              <span className="text-text-inverse text-mini">⏱</span>
            </div>
            <span className="text-text-primary font-bold text-value">{timer.hours}h {timer.minutes}m remaining</span>
          </div>

          {/* Take the Stage Button */}
          <button
            onClick={handleTakeTheStage}
            className="bg-status-success border-4 border-border rounded-2xl px-12 py-4 shadow-lg"
          >
            <span className="text-text-inverse font-bold text-h2">Take the Stage</span>
          </button>
        </div>

        {/* Info Modal */}
        {showInfoModal && (
          <InfoModal onClose={() => setShowInfoModal(false)} />
        )}
      </div>
    );
  }

  // ========== MATCHING SCREEN ==========
  if (gameState === 'matching') {
    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-status-error py-4 px-4 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
          <h1 className="text-text-inverse text-h1 text-center font-bold">Stage Showdown</h1>
        </div>

        {/* Content */}
        <div className="flex-1 mx-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-status-warning flex flex-col items-center justify-center px-6">
          {/* Grand Prize Chest */}
          <div className="w-32 h-32 bg-status-warning rounded-2xl flex items-center justify-center mb-4 border-4 border-border">
            <span className="text-h1">🏆</span>
          </div>

          <div className="text-center mb-8">
            <span className="text-text-primary text-caption">GRAND PRIZE</span>
            <p className="text-text-primary text-h2 font-bold">{stageShowdownData.grandPrize.toLocaleString()} coins</p>
          </div>

          {/* Finding Players */}
          <div className="bg-bg-card rounded-xl px-8 py-4 mb-6 border-2 border-border w-full max-w-[280px]">
            <p className="text-text-primary text-center font-bold mb-2">Finding performers...</p>
            <div className="h-3 bg-border-strong rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-status-success rounded-full transition-all"
                style={{ width: `${Math.min(100, matchingProgress)}%` }}
              />
            </div>
            <p className="text-text-primary text-center text-h2 font-bold">
              {Math.min(100, matchingProgress)}/100
            </p>
          </div>

          {/* Player Avatars Animation */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 bg-brand-primary rounded-xl border-2 border-border flex items-center justify-center"
                style={{ opacity: matchingProgress >= i * 20 ? 1 : 0.3 }}
              >
                <span className="text-body">🎤</span>
              </div>
            ))}
          </div>

          {/* Start Button (appears when matching complete) */}
          {matchingProgress >= 100 && (
            <button
              onClick={handleStartCompetition}
              className="bg-status-success border-4 border-border rounded-xl px-8 py-3"
            >
              <span className="text-text-inverse font-bold text-h3">Start Competition</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ========== PLAYING SCREEN ==========
  if (gameState === 'playing') {
    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-status-error py-3 px-4 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowInfoModal(true)}
              className="w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border"
            >
              <span className="text-text-inverse text-body font-bold">i</span>
            </button>
            <h1 className="text-text-inverse text-h2 font-bold">Stage Showdown</h1>
            <button
              onClick={() => navigate('main-menu')}
              className="w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border"
            >
              <span className="text-text-inverse font-bold">✕</span>
            </button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="mx-2 bg-bg-muted border-x-2 border-status-warning p-3">
          <div className="flex gap-3">
            {/* Performance Counter */}
            <div className="flex-1 bg-status-warning rounded-xl border-2 border-border py-2 px-3">
              <p className="text-text-inverse text-mini text-center font-medium">Performance</p>
              <p className="text-text-inverse text-h2 text-center font-bold">{currentLevel + 1}/7</p>
            </div>

            {/* Prize */}
            <div className="w-20 bg-status-success rounded-xl border-2 border-border py-2 px-2 flex flex-col items-center justify-center">
              <span className="text-h3">🏆</span>
              <span className="text-text-inverse text-mini font-bold">{potentialPrize}</span>
            </div>

            {/* Survivors */}
            <div className="flex-1 bg-brand-primary rounded-xl border-2 border-border py-2 px-3">
              <p className="text-text-inverse text-mini text-center font-medium">Performers</p>
              <p className="text-text-inverse text-h2 text-center font-bold">{survivors}/100</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-2 bg-status-error rounded-full px-4 py-1 border border-border">
              <span className="text-text-inverse text-mini">⏱</span>
              <span className="text-text-inverse font-bold text-value">{timer.hours}h {timer.minutes}m</span>
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mx-2 bg-bg-muted border-x-2 border-status-warning px-3 pb-3">
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-3 rounded-full border border-border ${
                  i < currentLevel
                    ? 'bg-status-success'
                    : i === currentLevel
                      ? 'bg-status-warning'
                      : 'bg-border-strong'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stage Area */}
        <div className="flex-1 mx-2 bg-bg-card border-x-2 border-status-warning relative overflow-hidden">
          {/* Spotlight Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-status-warning/10 to-transparent" />

          {/* Center Stage */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-32 bg-status-warning/30 rounded-full border-4 border-status-warning flex items-center justify-center">
              <div className="text-center">
                <span className="text-h1">🎤</span>
                <p className="text-text-primary text-caption font-bold mt-1">Your Turn!</p>
              </div>
            </div>
          </div>

          {/* Audience (other performers) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 flex-wrap">
            {Array.from({ length: Math.min(10, survivors - 1) }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-brand-primary rounded-lg border border-border flex items-center justify-center"
                style={{ opacity: 0.5 + (i * 0.05) }}
              >
                <span className="text-mini">👤</span>
              </div>
            ))}
            {survivors > 11 && (
              <div className="w-8 h-8 bg-border-strong rounded-lg border border-border flex items-center justify-center">
                <span className="text-text-muted text-mini">+{survivors - 11}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mx-2 mb-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-status-warning py-4 px-4">
          <button
            onClick={handlePlayLevel}
            className="w-full bg-status-success border-4 border-border rounded-xl py-3 mb-2"
          >
            <span className="text-text-inverse font-bold text-h3">Play Performance {currentLevel + 1}</span>
          </button>
          {/* Debug: Simulate elimination */}
          <button
            onClick={handleSimulateElimination}
            className="w-full py-2 opacity-50"
          >
            <span className="text-text-muted text-caption">[Debug: Simulate Fail]</span>
          </button>
        </div>

        {/* Info Modal */}
        {showInfoModal && (
          <InfoModal onClose={() => setShowInfoModal(false)} />
        )}
      </div>
    );
  }

  // ========== LEVEL COMPLETE (FLAWLESS PERFORMANCE) SCREEN ==========
  if (gameState === 'level-complete') {
    const eliminated = SURVIVOR_PROGRESSION[currentLevel - 1] - survivors;

    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-status-success py-4 px-4 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
          <h1 className="text-text-inverse text-h1 text-center font-bold">Flawless Performance!</h1>
        </div>

        {/* Content */}
        <div className="flex-1 mx-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-status-warning flex flex-col items-center justify-center px-6">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-status-success rounded-full flex items-center justify-center mb-4 border-4 border-border">
            <span className="text-h1">🎵</span>
          </div>

          <p className="text-text-primary text-h3 font-bold mb-2">Performance {currentLevel} Complete!</p>

          {/* Elimination Stats */}
          <div className="bg-status-error/20 rounded-xl px-6 py-3 mb-4 border border-status-error">
            <p className="text-status-error text-center font-bold">
              {eliminated} performers went Offstage
            </p>
          </div>

          {/* Survivors Count */}
          <div className="bg-brand-primary rounded-xl px-8 py-4 mb-4 border-2 border-border">
            <p className="text-text-inverse text-center">
              <span className="text-h2 font-bold">{survivors}</span>
              <span className="text-value"> performers remain</span>
            </p>
          </div>

          {/* Potential Prize */}
          <div className="bg-status-warning rounded-xl px-6 py-3 mb-8 border-2 border-border">
            <p className="text-text-inverse text-center">
              <span className="text-caption">Your potential share:</span>
              <span className="text-h3 font-bold ml-2">{potentialPrize} coins</span>
            </p>
          </div>

          {/* Progress */}
          <div className="w-full max-w-[280px] mb-6">
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-4 rounded-full border border-border ${
                    i < currentLevel ? 'bg-status-success' : 'bg-border-strong'
                  }`}
                />
              ))}
            </div>
            <p className="text-text-muted text-center text-caption mt-2">
              {7 - currentLevel} performances to go!
            </p>
          </div>

          {/* Next Performance Button */}
          <button
            onClick={handleNextPerformance}
            className="bg-status-success border-4 border-border rounded-xl px-8 py-3"
          >
            <span className="text-text-inverse font-bold text-h3">Next Performance</span>
          </button>
        </div>
      </div>
    );
  }

  // ========== ELIMINATED (OFFSTAGE) SCREEN ==========
  if (gameState === 'eliminated') {
    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-status-error py-4 px-4 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-border">
          <h1 className="text-text-inverse text-h1 text-center font-bold">Offstage</h1>
        </div>

        {/* Content */}
        <div className="flex-1 mx-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-border flex flex-col items-center justify-center px-6">
          {/* Sad Icon */}
          <div className="w-24 h-24 bg-status-error/30 rounded-full flex items-center justify-center mb-4 border-4 border-status-error">
            <span className="text-h1">😔</span>
          </div>

          <p className="text-text-primary text-h3 font-bold mb-2">You&apos;ve been eliminated!</p>
          <p className="text-text-secondary text-center mb-6">
            You reached Performance {currentLevel} of 7
          </p>

          {/* Progress Reached */}
          <div className="w-full max-w-[280px] mb-6">
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-4 rounded-full border border-border ${
                    i < currentLevel
                      ? 'bg-status-success'
                      : i === currentLevel
                        ? 'bg-status-error'
                        : 'bg-border-strong'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Retry Cooldown */}
          {retryCooldown > 0 ? (
            <div className="bg-bg-card rounded-xl px-8 py-4 mb-6 border-2 border-border">
              <p className="text-text-primary text-center font-bold mb-1">Encore available in:</p>
              <p className="text-status-warning text-h2 text-center font-bold">
                {formatCooldown(retryCooldown)}
              </p>
            </div>
          ) : (
            <button
              onClick={handleRetry}
              className="bg-status-success border-4 border-border rounded-xl px-8 py-3 mb-4"
            >
              <span className="text-text-inverse font-bold text-h3">Try Again (Encore)</span>
            </button>
          )}

          {/* Back Button */}
          <button
            onClick={() => navigate('main-menu')}
            className="py-3"
          >
            <span className="text-text-muted font-bold text-value">Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  // ========== VICTORY (STANDING OVATION) SCREEN ==========
  if (gameState === 'victory') {
    const finalPrize = Math.floor(stageShowdownData.grandPrize / survivors);

    return (
      <div className="flex flex-col h-full bg-bg-inverse overflow-hidden">
        {/* Header */}
        <div className="bg-status-success py-4 px-4 mx-2 mt-2 rounded-t-2xl border-2 border-b-0 border-status-warning">
          <h1 className="text-text-inverse text-h1 text-center font-bold">Standing Ovation!</h1>
        </div>

        {/* Content */}
        <div className="flex-1 mx-2 bg-bg-muted rounded-b-2xl border-2 border-t-0 border-status-warning flex flex-col items-center justify-center px-6">
          {/* Trophy */}
          <div className="w-28 h-28 bg-status-warning rounded-2xl flex items-center justify-center mb-4 border-4 border-border animate-pulse">
            <span className="text-h1">🏆</span>
          </div>

          <p className="text-text-primary text-h3 font-bold mb-6">Congratulations!</p>

          {/* Prize Won */}
          <div className="bg-status-warning rounded-2xl px-8 py-4 mb-4 border-4 border-border">
            <p className="text-text-inverse text-center text-caption mb-1">You won</p>
            <div className="flex items-center justify-center gap-2">
              <GameIcon code="CNS" size={28} />
              <span className="text-text-inverse text-h1 font-bold">{finalPrize.toLocaleString()}</span>
            </div>
          </div>

          {/* Winner Count */}
          <div className="bg-brand-primary rounded-xl px-6 py-3 mb-6 border-2 border-border">
            <p className="text-text-inverse text-center">
              Sharing the prize with <span className="font-bold">{survivors - 1}</span> other winners!
            </p>
          </div>

          {/* Winner Avatars */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: Math.min(5, survivors) }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-status-success rounded-xl border-2 border-border flex items-center justify-center"
              >
                <span className="text-body">{i === 0 ? '🌟' : '🎤'}</span>
              </div>
            ))}
            {survivors > 5 && (
              <div className="w-12 h-12 bg-border-strong rounded-xl border-2 border-border flex items-center justify-center">
                <span className="text-text-muted text-caption">+{survivors - 5}</span>
              </div>
            )}
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            className="bg-status-success border-4 border-border rounded-xl px-12 py-4"
          >
            <span className="text-text-inverse font-bold text-h2">Claim Prize</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// Info Modal Component
function InfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-[340px] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-status-error rounded-full flex items-center justify-center border-2 border-border z-10"
        >
          <span className="text-text-inverse font-bold text-body">✕</span>
        </button>

        {/* Title */}
        <div className="bg-status-error rounded-t-2xl py-4 px-4 border-2 border-b-0 border-border">
          <h1 className="text-text-inverse text-h2 text-center font-bold">Stage Showdown</h1>
        </div>

        {/* Content */}
        <div className="bg-bg-muted p-5 rounded-b-2xl border-2 border-t-0 border-border">
          {/* Rule 1 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
              <span className="text-h4">👥</span>
            </div>
            <div>
              <p className="text-text-primary text-value font-bold">100 Performers</p>
              <p className="text-text-secondary text-caption">Compete against 99 other players</p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-status-warning rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
              <span className="text-h4">7️⃣</span>
            </div>
            <div>
              <p className="text-text-primary text-value font-bold">7 Performances</p>
              <p className="text-text-secondary text-caption">Complete all 7 levels without failing</p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-status-error rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
              <span className="text-h4">❌</span>
            </div>
            <div>
              <p className="text-text-primary text-value font-bold">One Chance</p>
              <p className="text-text-secondary text-caption">Fail any level and you&apos;re Offstage!</p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-status-success rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
              <span className="text-h4">🏆</span>
            </div>
            <div>
              <p className="text-text-primary text-value font-bold">Share the Prize</p>
              <p className="text-text-secondary text-caption">10,000 coins split among all winners</p>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-muted rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
              <span className="text-h4">🔄</span>
            </div>
            <div>
              <p className="text-text-primary text-value font-bold">Encore</p>
              <p className="text-text-secondary text-caption">Wait 30 min to try again after failing</p>
            </div>
          </div>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-status-success rounded-xl border-2 border-border"
          >
            <span className="text-text-inverse text-h3 font-bold">Got It!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
