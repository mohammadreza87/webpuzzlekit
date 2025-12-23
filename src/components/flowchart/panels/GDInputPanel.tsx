'use client';

/**
 * GD Input Panel
 *
 * Game Design configuration forms for tuning LiveOps events,
 * economy parameters, and game features.
 */

import { useState, useMemo, useCallback } from 'react';
import { GD_SCHEMAS, getDefaultValues, getDefaultTiers, getSchemasByCategory } from '@/config/gd-schemas.config';
import type { GDSchema, InputField, TierData, RewardValue } from '@/types/gd-inputs';

export function GDInputPanel() {
  const [selectedModule, setSelectedModule] = useState<string>('royal-pass');
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    getDefaultValues(GD_SCHEMAS['royal-pass'])
  );
  const [tiers, setTiers] = useState<TierData[]>(() =>
    getDefaultTiers(GD_SCHEMAS['royal-pass']) as TierData[]
  );
  const [copied, setCopied] = useState(false);
  const [showTiers, setShowTiers] = useState(false);

  const schema = GD_SCHEMAS[selectedModule];
  const schemasByCategory = useMemo(() => getSchemasByCategory(), []);

  // Handle module change
  const handleModuleChange = useCallback((moduleId: string) => {
    setSelectedModule(moduleId);
    const newSchema = GD_SCHEMAS[moduleId];
    setValues(getDefaultValues(newSchema));
    setTiers(getDefaultTiers(newSchema) as TierData[]);
    setShowTiers(false);
  }, []);

  // Handle field value change
  const handleValueChange = useCallback((key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Handle tier value change
  const handleTierChange = useCallback((tierIndex: number, key: string, value: unknown) => {
    setTiers((prev) => {
      const newTiers = [...prev];
      newTiers[tierIndex] = { ...newTiers[tierIndex], [key]: value };
      return newTiers;
    });
  }, []);

  // Add a new tier
  const addTier = useCallback(() => {
    if (!schema.tiers) return;
    const newTier: TierData = {};
    schema.tiers.fields.forEach((field) => {
      if (field.key === 'tier') {
        newTier[field.key] = tiers.length;
      } else if (field.key === 'threshold') {
        const lastThreshold = (tiers[tiers.length - 1]?.threshold as number) || 0;
        newTier[field.key] = lastThreshold + 100;
      } else {
        newTier[field.key] = field.defaultValue;
      }
    });
    setTiers((prev) => [...prev, newTier]);
  }, [schema.tiers, tiers]);

  // Remove last tier
  const removeTier = useCallback(() => {
    if (tiers.length > (schema.tiers?.minTiers || 1)) {
      setTiers((prev) => prev.slice(0, -1));
    }
  }, [tiers.length, schema.tiers?.minTiers]);

  // Copy as JSON
  const copyAsJSON = useCallback(() => {
    const output = {
      moduleId: selectedModule,
      ...values,
      ...(schema.tiers ? { tiers } : {}),
    };
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selectedModule, values, tiers, schema.tiers]);

  // Apply preset
  const applyPreset = useCallback((presetId: string) => {
    const preset = schema.presets?.find((p) => p.id === presetId);
    if (preset) {
      setValues((prev) => ({ ...prev, ...preset.values }));
      if (preset.tiers) {
        setTiers(preset.tiers);
      }
    }
  }, [schema.presets]);

  // Group fields by group property
  const groupedFields = useMemo(() => {
    const groups: Record<string, InputField[]> = {};
    schema.fields.forEach((field) => {
      const group = field.group || 'general';
      if (!groups[group]) groups[group] = [];
      groups[group].push(field);
    });
    return groups;
  }, [schema.fields]);

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h4 text-text-primary flex items-center gap-2">
          <span>🎮</span>
          GD Inputs
        </h2>
        <button
          onClick={copyAsJSON}
          className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-colors ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy JSON'}
        </button>
      </div>

      {/* Module Selector */}
      <section>
        <label className="text-label text-text-secondary block mb-2">Select Module</label>
        <select
          value={selectedModule}
          onChange={(e) => handleModuleChange(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text-primary text-caption focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        >
          {Object.entries(schemasByCategory).map(([category, schemas]) => (
            <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
              {schemas.map((s) => (
                <option key={s.moduleId} value={s.moduleId}>
                  {s.icon} {s.moduleName}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </section>

      {/* Module Info */}
      <div className="bg-bg-card rounded-lg p-3 border border-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{schema.icon}</span>
          <h3 className="text-body font-medium text-text-primary">{schema.moduleName}</h3>
        </div>
        <p className="text-caption text-text-muted">{schema.description}</p>
      </div>

      {/* Presets */}
      {schema.presets && schema.presets.length > 0 && (
        <section>
          <h3 className="text-label text-text-secondary mb-2">Quick Presets</h3>
          <div className="flex flex-wrap gap-2">
            {schema.presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="px-3 py-1.5 bg-bg-card border border-border rounded-lg text-caption text-text-secondary hover:text-text-primary hover:bg-bg-muted transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Field Groups */}
      {Object.entries(groupedFields).map(([groupName, fields]) => (
        <section key={groupName}>
          <h3 className="text-label text-text-secondary mb-3 capitalize">
            {groupName.replace(/-/g, ' ')}
          </h3>
          <div className="space-y-3">
            {fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(v) => handleValueChange(field.key, v)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Tier Configuration */}
      {schema.tiers && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-label text-text-secondary">
              Tiers ({tiers.length})
            </h3>
            <button
              onClick={() => setShowTiers(!showTiers)}
              className="text-caption text-brand-primary hover:underline"
            >
              {showTiers ? 'Hide' : 'Show'} Tiers
            </button>
          </div>

          {showTiers && (
            <div className="space-y-3">
              {/* Tier Controls */}
              <div className="flex gap-2">
                <button
                  onClick={addTier}
                  disabled={tiers.length >= (schema.tiers?.maxTiers || 50)}
                  className="flex-1 py-1.5 bg-bg-card border border-border rounded-lg text-caption text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  + Add Tier
                </button>
                <button
                  onClick={removeTier}
                  disabled={tiers.length <= (schema.tiers?.minTiers || 1)}
                  className="flex-1 py-1.5 bg-bg-card border border-border rounded-lg text-caption text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  - Remove Tier
                </button>
              </div>

              {/* Tier List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {tiers.map((tier, index) => (
                  <TierRow
                    key={index}
                    index={index}
                    tier={tier}
                    fields={schema.tiers!.fields}
                    onChange={(key, value) => handleTierChange(index, key, value)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* JSON Preview */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-label text-text-secondary">JSON Output</h3>
          <button
            onClick={copyAsJSON}
            className="text-caption text-brand-primary hover:underline"
          >
            Copy
          </button>
        </div>
        <pre className="bg-bg-muted rounded-lg p-3 text-mini text-text-muted overflow-x-auto max-h-[200px] overflow-y-auto">
          {JSON.stringify(
            {
              moduleId: selectedModule,
              ...values,
              ...(schema.tiers ? { tiers } : {}),
            },
            null,
            2
          )}
        </pre>
      </section>
    </div>
  );
}

// =============================================================================
// FIELD INPUT COMPONENTS
// =============================================================================

interface FieldInputProps {
  field: InputField;
  value: unknown;
  onChange: (value: unknown) => void;
}

function FieldInput({ field, value, onChange }: FieldInputProps) {
  switch (field.type) {
    case 'number':
    case 'slider':
    case 'percentage':
    case 'duration':
      return (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-caption text-text-secondary">{field.label}</label>
            {field.description && (
              <span className="text-mini text-text-muted" title={field.description}>i</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={field.min ?? 0}
              max={field.max ?? 100}
              step={field.step ?? 1}
              value={value as number}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="flex-1 accent-brand-primary"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={value as number}
                onChange={(e) => onChange(parseFloat(e.target.value) || field.min || 0)}
                className="w-20 bg-bg-card border border-border rounded px-2 py-1 text-right text-caption"
              />
              {field.unit && (
                <span className="text-mini text-text-muted w-12">{field.unit}</span>
              )}
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-1">
          <label className="text-caption text-text-secondary block">{field.label}</label>
          <input
            type="text"
            value={(value as string) || ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-caption text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
          {field.description && (
            <p className="text-mini text-text-muted">{field.description}</p>
          )}
        </div>
      );

    case 'select':
      return (
        <div className="space-y-1">
          <label className="text-caption text-text-secondary block">{field.label}</label>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-caption text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.icon} {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'toggle':
      return (
        <div className="flex items-center justify-between py-1">
          <div>
            <label className="text-caption text-text-primary">{field.label}</label>
            {field.description && (
              <p className="text-mini text-text-muted uppercase tracking-wide">{field.description}</p>
            )}
          </div>
          <button
            onClick={() => onChange(!value)}
            role="switch"
            aria-checked={Boolean(value)}
            className={`relative w-12 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
              value ? 'bg-bg-inverse' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-bg-card rounded-full shadow-md transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      );

    case 'reward':
      return <RewardInput field={field} value={value as RewardValue} onChange={onChange} />;

    default:
      return null;
  }
}

// =============================================================================
// REWARD INPUT COMPONENT
// =============================================================================

interface RewardInputProps {
  field: InputField;
  value: RewardValue;
  onChange: (value: RewardValue) => void;
}

function RewardInput({ field, value, onChange }: RewardInputProps) {
  const rewardValue = value || { type: 'coins', amount: 100 };

  return (
    <div className="space-y-1">
      <label className="text-caption text-text-secondary block">{field.label}</label>
      <div className="flex gap-2">
        <select
          value={rewardValue.type}
          onChange={(e) => onChange({ ...rewardValue, type: e.target.value as RewardValue['type'] })}
          className="flex-1 bg-bg-card border border-border rounded-lg px-2 py-1.5 text-caption text-text-primary"
        >
          <option value="coins">Coins</option>
          <option value="gems">Gems</option>
          <option value="lives">Lives</option>
          <option value="booster">Booster</option>
          <option value="stars">Stars</option>
        </select>
        <input
          type="number"
          min={1}
          value={rewardValue.amount}
          onChange={(e) => onChange({ ...rewardValue, amount: parseInt(e.target.value) || 1 })}
          className="w-20 bg-bg-card border border-border rounded-lg px-2 py-1.5 text-caption text-right"
        />
      </div>
    </div>
  );
}

// =============================================================================
// TIER ROW COMPONENT
// =============================================================================

interface TierRowProps {
  index: number;
  tier: TierData;
  fields: InputField[];
  onChange: (key: string, value: unknown) => void;
}

function TierRow({ index, tier, fields, onChange }: TierRowProps) {
  return (
    <div className="bg-bg-card rounded-lg p-3 border border-border">
      <div className="text-mini text-text-muted mb-2">Tier {index + 1}</div>
      <div className="grid grid-cols-2 gap-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-mini text-text-muted block mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                value={String(tier[field.key] ?? field.defaultValue ?? '')}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="w-full bg-bg-muted border border-border rounded px-2 py-1 text-mini"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'reward' ? (
              <div className="flex gap-1">
                <select
                  value={(tier[field.key] as RewardValue)?.type || 'coins'}
                  onChange={(e) =>
                    onChange(field.key, {
                      ...(tier[field.key] as RewardValue),
                      type: e.target.value,
                    })
                  }
                  className="flex-1 bg-bg-muted border border-border rounded px-1 py-1 text-mini"
                >
                  <option value="coins">Coins</option>
                  <option value="gems">Gems</option>
                  <option value="lives">Lives</option>
                  <option value="booster">Booster</option>
                </select>
                <input
                  type="number"
                  min={1}
                  value={(tier[field.key] as RewardValue)?.amount || 100}
                  onChange={(e) =>
                    onChange(field.key, {
                      ...(tier[field.key] as RewardValue),
                      amount: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-14 bg-bg-muted border border-border rounded px-1 py-1 text-mini text-right"
                />
              </div>
            ) : (
              <input
                type="number"
                min={field.min}
                max={field.max}
                value={(tier[field.key] as number) ?? field.defaultValue}
                onChange={(e) => onChange(field.key, parseFloat(e.target.value) || 0)}
                className="w-full bg-bg-muted border border-border rounded px-2 py-1 text-mini"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
