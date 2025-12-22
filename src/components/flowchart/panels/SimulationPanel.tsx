'use client';

/**
 * Simulation Panel
 *
 * Controls for adjusting simulation state.
 */

import { useSimulation } from '@/store/SimulationContext';
import { SCENARIOS } from '@/config/scenarios.config';

export function SimulationPanel() {
  const {
    state,
    setPlayerValue,
    setBoosterCount,
    loadScenario,
    reset,
    setEventState,
    setTeamState,
  } = useSimulation();

  return (
    <div className="p-4 space-y-6">
      {/* Current Screen */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Current Screen</h3>
        <div className="bg-bg-card rounded-lg p-3 border border-border">
          <p className="text-text-primary font-medium">{state.currentScreen}</p>
        </div>
      </section>

      {/* Scenario Presets */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Quick Scenarios</h3>
        <div className="grid grid-cols-2 gap-2">
          {SCENARIOS.slice(0, 6).map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => loadScenario(scenario)}
              className="p-2 bg-bg-card rounded-lg border border-border text-left hover:bg-bg-muted transition-colors"
              title={scenario.description}
            >
              <span className="text-lg">{scenario.icon}</span>
              <p className="text-caption text-text-primary truncate">{scenario.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Player State */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Player State</h3>
        <div className="space-y-3">
          <SliderInput
            label="Coins"
            icon="💰"
            value={state.player.coins}
            min={0}
            max={10000}
            step={100}
            onChange={(v) => setPlayerValue('coins', v)}
          />
          <SliderInput
            label="Lives"
            icon="❤️"
            value={state.player.lives}
            min={0}
            max={5}
            step={1}
            onChange={(v) => setPlayerValue('lives', v)}
          />
          <SliderInput
            label="Stars"
            icon="⭐"
            value={state.player.stars}
            min={0}
            max={1000}
            step={10}
            onChange={(v) => setPlayerValue('stars', v)}
          />
          <SliderInput
            label="Level"
            icon="🎯"
            value={state.player.level}
            min={1}
            max={200}
            step={1}
            onChange={(v) => setPlayerValue('level', v)}
          />
        </div>
      </section>

      {/* Boosters */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Boosters</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(state.boosters).map(([id, count]) => (
            <div
              key={id}
              className="flex flex-col items-center gap-1 p-2 bg-bg-card rounded-lg border border-border"
            >
              <span className="text-sm capitalize">{id}</span>
              <input
                type="number"
                min={0}
                max={99}
                value={count}
                onChange={(e) => setBoosterCount(id, Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-bg-muted border border-border rounded px-2 py-1 text-center text-caption"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Events</h3>
        <div className="space-y-2">
          {Object.entries(state.events).map(([eventId, eventState]) => (
            <div
              key={eventId}
              className="flex items-center justify-between p-2 bg-bg-card rounded-lg border border-border"
            >
              <span className="text-caption text-text-primary capitalize">
                {eventId.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <button
                onClick={() =>
                  setEventState(eventId, { active: !eventState.active })
                }
                className={`px-2 py-1 rounded text-mini font-medium transition-colors ${
                  eventState.active
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-bg-muted text-text-muted'
                }`}
              >
                {eventState.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <h3 className="text-label text-text-secondary mb-2">Team</h3>
        <div className="flex items-center justify-between p-3 bg-bg-card rounded-lg border border-border">
          <span className="text-caption text-text-primary">In Team</span>
          <button
            onClick={() => setTeamState({ inTeam: !state.team.inTeam })}
            className={`px-3 py-1 rounded text-caption font-medium transition-colors ${
              state.team.inTeam
                ? 'bg-green-500/20 text-green-400'
                : 'bg-bg-muted text-text-muted'
            }`}
          >
            {state.team.inTeam ? 'Yes' : 'No'}
          </button>
        </div>
      </section>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="w-full py-2 px-4 bg-bg-muted text-text-secondary rounded-lg hover:bg-bg-card hover:text-text-primary transition-colors text-caption font-medium"
      >
        Reset to Default
      </button>
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface SliderInputProps {
  label: string;
  icon: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function SliderInput({ label, icon, value, min, max, step, onChange }: SliderInputProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base">{icon}</span>
      <span className="text-caption text-text-secondary w-12">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="flex-1 accent-brand-primary"
      />
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || min)))}
        className="w-16 bg-bg-card border border-border rounded px-2 py-1 text-right text-caption"
      />
    </div>
  );
}
