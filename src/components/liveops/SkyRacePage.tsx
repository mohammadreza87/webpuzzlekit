'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { useGame, useNavigation } from '@/store';
import { useTimer } from '@/hooks';

// Beat Blitz state types
type BlitzState = 'entry' | 'matching' | 'competing' | 'stage-complete';
type StageResult = 'won' | 'lost' | null;

// Stage definitions
const STAGES = [
  { id: 1, name: 'Opener', description: 'Warm up the crowd!' },
  { id: 2, name: 'Headliner', description: 'Take center stage!' },
];

// Mock competitors for the leaderboard
const generateCompetitors = (playerApplause: number) => [
  { id: '1', username: 'MelodyMaster', applause: Math.max(playerApplause + 45, 180), avatar: 'M1' },
  { id: '2', username: 'Player', applause: playerApplause, avatar: 'You', isPlayer: true },
  { id: '3', username: 'BeatDropper', applause: Math.max(playerApplause - 20, 95), avatar: 'B1' },
  { id: '4', username: 'RhythmKing', applause: Math.max(playerApplause - 55, 60), avatar: 'R1' },
  { id: '5', username: 'SoundWave', applause: Math.max(playerApplause - 80, 25), avatar: 'S1' },
].sort((a, b) => b.applause - a.applause).map((p, i) => ({ ...p, rank: i + 1 }));

// Reward definitions per stage and position
const REWARDS = {
  opener: {
    1: { boosters: 3, coins: 0, advance: true },
    2: { boosters: 2, coins: 0, advance: false },
    3: { boosters: 1, coins: 0, advance: false },
    4: { boosters: 0, coins: 50, advance: false },
    5: { boosters: 0, coins: 50, advance: false },
  },
  headliner: {
    1: { boosters: 5, coins: 500, badge: true, advance: false },
    2: { boosters: 3, coins: 200, advance: false },
    3: { boosters: 2, coins: 100, advance: false },
    4: { boosters: 1, coins: 0, advance: false },
    5: { boosters: 1, coins: 0, advance: false },
  },
};

// Beat Blitz event data
const beatBlitzData = {
  name: 'Beat Blitz',
  durationMinutes: 30,
  playersPerMatch: 5,
  unlockLevel: 50,
  stages: STAGES,
};

export function SkyRacePage() {
  const { state } = useGame();
  const { navigate, openModal } = useNavigation();
  const event = state.events.find((e) => e.type === 'sky-race');

  // Local state
  const [blitzState, setBlitzState] = useState<BlitzState>('entry');
  const [currentStage, setCurrentStage] = useState(1);
  const [playerApplause, setPlayerApplause] = useState(135);
  const [stageResult, setStageResult] = useState<StageResult>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Competition timer (30 minutes from now for demo)
  const competitionEndTime = new Date(Date.now() + 18 * 60 * 1000); // 18 min left for demo
  const timer = useTimer(blitzState === 'competing' ? competitionEndTime : null);

  // Event availability timer
  const eventTimer = useTimer(event?.endTime || null);

  // Generate competitors based on player's applause
  const competitors = generateCompetitors(playerApplause);
  const playerRank = competitors.find(c => c.isPlayer)?.rank || 2;

  // Simulate applause earning
  const handleEarnApplause = (amount: number) => {
    setPlayerApplause(prev => prev + amount);
  };

  // Join competition
  const handleJoinCompetition = () => {
    setBlitzState('matching');
    // Simulate matching delay
    setTimeout(() => {
      setBlitzState('competing');
    }, 2000);
  };

  // End stage (for demo)
  const handleEndStage = () => {
    const result: StageResult = playerRank === 1 ? 'won' : 'lost';
    setStageResult(result);
    setBlitzState('stage-complete');
  };

  // Advance to next stage
  const handleAdvance = () => {
    if (currentStage < 2) {
      setCurrentStage(2);
      setPlayerApplause(0);
      setStageResult(null);
      setBlitzState('entry');
    }
  };

  // Close and go back
  const handleClose = () => {
    navigate('main-menu');
  };

  if (!event) return null;

  const currentStageData = STAGES[currentStage - 1];
  const stageKey = currentStage === 1 ? 'opener' : 'headliner';

  return (
    <PageLayout
      title="Beat Blitz"
      showBack={blitzState !== 'competing'}
      headerActions={
        <button
          onClick={() => setShowInfo(true)}
          className="w-8 h-8 rounded-full bg-bg-muted flex items-center justify-center border border-border"
        >
          <span className="text-text-primary font-bold text-sm">?</span>
        </button>
      }
    >
      <div className="p-4 space-y-4">
        {/* Entry State */}
        {blitzState === 'entry' && (
          <>
            {/* Event Banner */}
            <div className="bg-bg-page rounded-xl border-2 border-border overflow-hidden">
              {/* Banner Header */}
              <div className="bg-bg-muted px-4 py-6 text-center relative">
                <div className="absolute top-2 right-2 bg-bg-page rounded-full px-2 py-0.5 border border-border">
                  <span className="text-text-secondary text-mini">{eventTimer.formatted}</span>
                </div>

                {/* Stage Icon */}
                <div className="w-16 h-16 bg-bg-page rounded-2xl border-2 border-border mx-auto mb-3 flex items-center justify-center">
                  <Image src="/icons/Lightning.svg" alt="Beat Blitz" width={32} height={32} className="opacity-70" />
                </div>

                <h2 className="text-text-primary text-h2 mb-1">Beat Blitz</h2>
                <p className="text-text-secondary text-body-sm">
                  Race against 5 players to collect the most Applause!
                </p>
              </div>

              {/* Stage Indicator */}
              <div className="px-4 py-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary text-body-sm">Current Stage</span>
                  <span className="text-text-primary font-bold">{currentStageData.name}</span>
                </div>

                {/* Stage Progress Dots */}
                <div className="flex items-center justify-center gap-2">
                  {STAGES.map((stage, idx) => (
                    <div key={stage.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        idx + 1 < currentStage
                          ? 'bg-text-primary border-text-primary'
                          : idx + 1 === currentStage
                          ? 'bg-bg-muted border-text-primary'
                          : 'bg-bg-page border-border'
                      }`}>
                        {idx + 1 < currentStage ? (
                          <svg className="w-4 h-4 text-bg-page" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className={`text-sm font-bold ${idx + 1 === currentStage ? 'text-text-primary' : 'text-text-muted'}`}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      {idx < STAGES.length - 1 && (
                        <div className={`w-8 h-0.5 ${idx + 1 < currentStage ? 'bg-text-primary' : 'bg-border'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 px-1">
                  <span className="text-text-muted text-mini">Opener</span>
                  <span className="text-text-muted text-mini">Headliner</span>
                </div>
              </div>
            </div>

            {/* Unlimited Lives Badge */}
            <div className="bg-bg-page rounded-xl border-2 border-border p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-bg-muted rounded-lg flex items-center justify-center border border-border">
                <Image src="/icons/Heart-Filled.svg" alt="Lives" width={20} height={20} className="opacity-70" />
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-bold text-body-sm">Unlimited Lives</p>
                <p className="text-text-muted text-caption">Play as much as you want during the competition!</p>
              </div>
              <div className="bg-bg-muted rounded-full px-2 py-0.5 border border-border">
                <span className="text-text-secondary text-mini font-bold">∞</span>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-bg-page rounded-xl border-2 border-border p-4">
              <h3 className="text-text-primary font-bold mb-3">How It Works</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bg-muted rounded-full flex items-center justify-center border border-border flex-shrink-0">
                    <span className="text-text-secondary text-mini font-bold">1</span>
                  </div>
                  <p className="text-text-secondary text-body-sm">Activate power-ups during gameplay to earn Applause</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bg-muted rounded-full flex items-center justify-center border border-border flex-shrink-0">
                    <span className="text-text-secondary text-mini font-bold">2</span>
                  </div>
                  <p className="text-text-secondary text-body-sm">Compete against 4 other players for 30 minutes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bg-muted rounded-full flex items-center justify-center border border-border flex-shrink-0">
                    <span className="text-text-secondary text-mini font-bold">3</span>
                  </div>
                  <p className="text-text-secondary text-body-sm">Finish 1st to advance to Headliner stage!</p>
                </div>
              </div>
            </div>

            {/* Rewards Preview */}
            <div className="bg-bg-page rounded-xl border-2 border-border p-4">
              <h3 className="text-text-primary font-bold mb-3">{currentStageData.name} Rewards</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((pos) => {
                  const reward = REWARDS[stageKey][pos as keyof typeof REWARDS.opener];
                  return (
                    <div key={pos} className={`flex items-center justify-between p-2 rounded-lg ${
                      pos === 1 ? 'bg-bg-muted border border-border' : ''
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          pos === 1 ? 'bg-text-primary' : 'bg-bg-muted border border-border'
                        }`}>
                          <span className={`text-mini font-bold ${pos === 1 ? 'text-bg-page' : 'text-text-secondary'}`}>
                            {pos}
                          </span>
                        </div>
                        <span className={`text-body-sm ${pos === 1 ? 'text-text-primary font-bold' : 'text-text-secondary'}`}>
                          {pos === 1 ? '1st Place' : pos === 2 ? '2nd Place' : '3rd Place'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {reward.boosters > 0 && (
                          <span className="text-text-secondary text-body-sm">{reward.boosters}x Boosters</span>
                        )}
                        {reward.coins > 0 && (
                          <span className="text-text-secondary text-body-sm">+{reward.coins} Coins</span>
                        )}
                        {reward.advance && (
                          <span className="text-text-primary text-body-sm font-bold">+ Advance!</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinCompetition}
              className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-4 border-2 border-border transition-colors"
            >
              <span className="text-text-primary text-h3">Join Competition</span>
            </button>
          </>
        )}

        {/* Matching State */}
        {blitzState === 'matching' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-bg-muted rounded-2xl border-2 border-border flex items-center justify-center mb-4 animate-pulse">
              <Image src="/icons/2User.svg" alt="Matching" width={40} height={40} className="opacity-70" />
            </div>
            <h2 className="text-text-primary text-h2 mb-2">Finding Opponents...</h2>
            <p className="text-text-secondary text-body-sm text-center">
              Matching you with 4 other players
            </p>
            <div className="flex gap-1 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Competing State */}
        {blitzState === 'competing' && (
          <>
            {/* Timer and Stage Header */}
            <div className="bg-bg-page rounded-xl border-2 border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-text-muted text-caption">Stage</p>
                  <p className="text-text-primary font-bold">{currentStageData.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-text-muted text-caption">Time Remaining</p>
                  <p className="text-text-primary font-bold text-h3">{timer.formatted}</p>
                </div>
              </div>

              {/* Progress Bar for Time */}
              <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-text-primary rounded-full transition-all duration-1000"
                  style={{ width: `${(timer.total / (30 * 60 * 1000)) * 100}%` }}
                />
              </div>
            </div>

            {/* Player's Applause Counter */}
            <div className="bg-bg-page rounded-xl border-2 border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-bg-muted rounded-xl border-2 border-border flex items-center justify-center">
                    <span className="text-text-primary font-bold">👏</span>
                  </div>
                  <div>
                    <p className="text-text-muted text-caption">Your Applause</p>
                    <p className="text-text-primary text-h2">{playerApplause}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full border ${
                  playerRank === 1 ? 'bg-text-primary border-text-primary' : 'bg-bg-muted border-border'
                }`}>
                  <span className={`font-bold ${playerRank === 1 ? 'text-bg-page' : 'text-text-primary'}`}>
                    #{playerRank}
                  </span>
                </div>
              </div>

              {/* Quick earn buttons for demo */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEarnApplause(10)}
                  className="flex-1 bg-bg-muted rounded-lg py-2 border border-border hover:opacity-80"
                >
                  <span className="text-text-secondary text-caption">+10 (Power-up)</span>
                </button>
                <button
                  onClick={() => handleEarnApplause(25)}
                  className="flex-1 bg-bg-muted rounded-lg py-2 border border-border hover:opacity-80"
                >
                  <span className="text-text-secondary text-caption">+25 (Combo)</span>
                </button>
                <button
                  onClick={() => handleEarnApplause(50)}
                  className="flex-1 bg-bg-muted rounded-lg py-2 border border-border hover:opacity-80"
                >
                  <span className="text-text-secondary text-caption">+50 (Chain)</span>
                </button>
              </div>
            </div>

            {/* Live Leaderboard */}
            <div className="bg-bg-page rounded-xl border-2 border-border overflow-hidden">
              <div className="px-4 py-2 bg-bg-muted border-b border-border">
                <h3 className="text-text-primary font-bold">Live Leaderboard</h3>
              </div>
              <div className="divide-y divide-border">
                {competitors.map((competitor) => (
                  <div
                    key={competitor.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      competitor.isPlayer ? 'bg-bg-muted' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      competitor.rank === 1
                        ? 'bg-text-primary'
                        : 'bg-bg-page border-2 border-border'
                    }`}>
                      <span className={`font-bold text-sm ${
                        competitor.rank === 1 ? 'text-bg-page' : 'text-text-secondary'
                      }`}>
                        {competitor.rank}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 bg-bg-muted rounded-lg border border-border flex items-center justify-center">
                      <span className="text-text-secondary text-sm font-bold">{competitor.avatar}</span>
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <p className={`font-bold ${competitor.isPlayer ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {competitor.username}
                        {competitor.isPlayer && <span className="text-text-muted ml-1">(You)</span>}
                      </p>
                    </div>

                    {/* Applause */}
                    <div className="flex items-center gap-1">
                      <span className="text-text-primary font-bold">{competitor.applause}</span>
                      <span className="text-text-muted">👏</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* End Stage Button (for demo) */}
            <button
              onClick={handleEndStage}
              className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-3 border border-border transition-colors"
            >
              <span className="text-text-secondary text-body-sm">End Stage (Demo)</span>
            </button>
          </>
        )}

        {/* Stage Complete State */}
        {blitzState === 'stage-complete' && stageResult && (
          <div className="flex flex-col items-center py-6">
            {/* Result Icon */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
              stageResult === 'won' ? 'bg-text-primary' : 'bg-bg-muted border-2 border-border'
            }`}>
              {stageResult === 'won' ? (
                <span className="text-4xl">🏆</span>
              ) : (
                <span className="text-4xl">👏</span>
              )}
            </div>

            {/* Result Title */}
            <h2 className="text-text-primary text-h1 mb-2">
              {stageResult === 'won' ? 'You Won!' : 'Stage Complete'}
            </h2>
            <p className="text-text-secondary text-body mb-6">
              {stageResult === 'won'
                ? currentStage === 1
                  ? 'You\'re advancing to Headliner!'
                  : 'You\'ve conquered Beat Blitz!'
                : `You finished #${playerRank} - Great effort!`}
            </p>

            {/* Final Standings */}
            <div className="w-full bg-bg-page rounded-xl border-2 border-border overflow-hidden mb-4">
              <div className="px-4 py-2 bg-bg-muted border-b border-border">
                <h3 className="text-text-primary font-bold text-center">Final Standings</h3>
              </div>
              <div className="divide-y divide-border">
                {competitors.slice(0, 3).map((competitor) => (
                  <div
                    key={competitor.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      competitor.isPlayer ? 'bg-bg-muted' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      competitor.rank === 1
                        ? 'bg-text-primary'
                        : 'bg-bg-page border-2 border-border'
                    }`}>
                      <span className={`font-bold text-sm ${
                        competitor.rank === 1 ? 'text-bg-page' : 'text-text-secondary'
                      }`}>
                        {competitor.rank}
                      </span>
                    </div>
                    <p className={`flex-1 font-bold ${competitor.isPlayer ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {competitor.username}
                    </p>
                    <span className="text-text-primary font-bold">{competitor.applause} 👏</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div className="w-full bg-bg-page rounded-xl border-2 border-border p-4 mb-4">
              <h3 className="text-text-primary font-bold text-center mb-3">Your Rewards</h3>
              <div className="flex justify-center gap-4">
                {REWARDS[stageKey][playerRank as keyof typeof REWARDS.opener].boosters > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-bg-muted rounded-lg border border-border flex items-center justify-center mb-1">
                      <Image src="/icons/Fire.svg" alt="Booster" width={24} height={24} className="opacity-70" />
                    </div>
                    <span className="text-text-primary font-bold">
                      x{REWARDS[stageKey][playerRank as keyof typeof REWARDS.opener].boosters}
                    </span>
                    <span className="text-text-muted text-caption">Boosters</span>
                  </div>
                )}
                {REWARDS[stageKey][playerRank as keyof typeof REWARDS.opener].coins > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-bg-muted rounded-lg border border-border flex items-center justify-center mb-1">
                      <Image src="/icons/Star.svg" alt="Coins" width={24} height={24} className="opacity-70" />
                    </div>
                    <span className="text-text-primary font-bold">
                      {REWARDS[stageKey][playerRank as keyof typeof REWARDS.opener].coins}
                    </span>
                    <span className="text-text-muted text-caption">Coins</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            {stageResult === 'won' && currentStage < 2 ? (
              <button
                onClick={handleAdvance}
                className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-4 border-2 border-border transition-colors"
              >
                <span className="text-text-primary text-h3">Advance to Headliner</span>
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-4 border-2 border-border transition-colors"
              >
                <span className="text-text-primary text-h3">
                  {stageResult === 'won' ? 'Claim Rewards' : 'Try Again Tomorrow'}
                </span>
              </button>
            )}

            {/* Retry Timer (if lost) */}
            {stageResult === 'lost' && (
              <p className="text-text-muted text-caption mt-2">
                Next competition available in 23:45:00
              </p>
            )}
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-card rounded-2xl border-2 border-border w-full max-w-[320px] overflow-hidden">
            {/* Header */}
            <div className="bg-bg-inverse py-3 px-4 flex items-center justify-center relative">
              <h2 className="text-text-inverse text-h2">How to Play</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="absolute right-2 w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border"
              >
                <span className="text-text-primary font-bold">X</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Step 1 */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-bg-muted rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-text-primary font-bold">1</span>
                </div>
                <div>
                  <p className="text-text-primary font-bold mb-1">Join the Competition</p>
                  <p className="text-text-secondary text-body-sm">
                    Enter a 30-minute race against 4 other players.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-bg-muted rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-text-primary font-bold">2</span>
                </div>
                <div>
                  <p className="text-text-primary font-bold mb-1">Earn Applause</p>
                  <p className="text-text-secondary text-body-sm">
                    Activate power-ups during gameplay to collect Applause points.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-bg-muted rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-text-primary font-bold">3</span>
                </div>
                <div>
                  <p className="text-text-primary font-bold mb-1">Win and Advance</p>
                  <p className="text-text-secondary text-body-sm">
                    Finish 1st to advance from Opener to Headliner stage!
                  </p>
                </div>
              </div>

              {/* Scoring Table */}
              <div className="bg-bg-muted rounded-lg p-3 border border-border">
                <p className="text-text-primary font-bold text-sm mb-2">Applause Scoring</p>
                <div className="space-y-1 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Power-up</span>
                    <span className="text-text-primary font-bold">+10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Combo (2 power-ups)</span>
                    <span className="text-text-primary font-bold">+25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Chain (3+ power-ups)</span>
                    <span className="text-text-primary font-bold">+50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Perfect clear</span>
                    <span className="text-text-primary font-bold">+100</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowInfo(false)}
                className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-3 border border-border"
              >
                <span className="text-text-primary font-bold">Got It!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
