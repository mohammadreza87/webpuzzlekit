'use client';

/**
 * Screen Info Panel
 *
 * Displays detailed metadata about a selected screen in the flowchart.
 * Shows logic, conditions, inputs/outputs, metrics, and edge cases.
 */

import { getScreenMetadata } from '@/config/screen-metadata.config';
import type { ScreenMetadata, ScreenCategory } from '@/types/screen-metadata';

interface ScreenInfoPanelProps {
  screenId: string | null;
  onNavigateToScreen?: (screenId: string) => void;
}

export function ScreenInfoPanel({ screenId, onNavigateToScreen }: ScreenInfoPanelProps) {
  if (!screenId) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full text-center">
        <div className="text-4xl mb-3">i</div>
        <p className="text-text-secondary text-caption">
          Click the info button on any screen node to view its documentation.
        </p>
      </div>
    );
  }

  const metadata = getScreenMetadata(screenId);

  if (!metadata) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full text-center">
        <div className="text-4xl mb-3">?</div>
        <p className="text-text-primary font-medium mb-2">{screenId}</p>
        <p className="text-text-secondary text-caption">
          No metadata available for this screen yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      {/* Header */}
      <ScreenHeader metadata={metadata} />

      {/* Description */}
      <Section title="Description">
        <p className="text-caption text-text-primary">{metadata.description}</p>
      </Section>

      {/* Logic */}
      {metadata.logic.length > 0 && (
        <Section title="Logic">
          <BulletList items={metadata.logic} />
        </Section>
      )}

      {/* Conditions */}
      {metadata.conditions.length > 0 && (
        <Section title="Conditions">
          <BulletList items={metadata.conditions} />
        </Section>
      )}

      {/* Inputs */}
      {metadata.inputs.length > 0 && (
        <Section title="Inputs">
          <InputsTable inputs={metadata.inputs} />
        </Section>
      )}

      {/* Outputs */}
      {metadata.outputs.length > 0 && (
        <Section title="Outputs">
          <OutputsTable outputs={metadata.outputs} />
        </Section>
      )}

      {/* Metrics */}
      {metadata.metrics.length > 0 && (
        <Section title="Metrics">
          <BulletList items={metadata.metrics} />
        </Section>
      )}

      {/* Edge Cases */}
      {metadata.edgeCases.length > 0 && (
        <Section title="Edge Cases">
          <BulletList items={metadata.edgeCases} />
        </Section>
      )}

      {/* Related Screens */}
      {metadata.relatedScreens && metadata.relatedScreens.length > 0 && (
        <Section title="Related Screens">
          <RelatedScreens
            screens={metadata.relatedScreens}
            onNavigate={onNavigateToScreen}
          />
        </Section>
      )}
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function ScreenHeader({ metadata }: { metadata: ScreenMetadata }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-body font-semibold text-text-primary">{metadata.name}</h2>
        <p className="text-mini text-text-muted">{metadata.id}</p>
      </div>
      <div className="flex items-center gap-2">
        <CategoryBadge category={metadata.category} />
        {metadata.unlockLevel && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-mini font-medium">
            Lvl {metadata.unlockLevel}+
          </span>
        )}
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: ScreenCategory }) {
  const styles: Record<ScreenCategory, string> = {
    main: 'bg-blue-500/20 text-blue-400',
    liveops: 'bg-purple-500/20 text-purple-400',
    modal: 'bg-orange-500/20 text-orange-400',
    social: 'bg-green-500/20 text-green-400',
    monetization: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-mini font-medium capitalize ${styles[category]}`}>
      {category}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-label text-text-secondary mb-2">{title}</h3>
      <div className="bg-bg-card rounded-lg p-3 border border-border">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-caption text-text-primary">
          <span className="text-text-muted mt-1">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InputsTable({ inputs }: { inputs: ScreenMetadata['inputs'] }) {
  return (
    <div className="space-y-2">
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <code className="text-mini text-brand-primary font-mono">{input.name}</code>
            <span className="text-mini text-text-muted">: {input.type}</span>
            {input.required && (
              <span className="text-mini text-red-400">*</span>
            )}
          </div>
          <p className="text-mini text-text-muted pl-2">{input.description}</p>
        </div>
      ))}
    </div>
  );
}

function OutputsTable({ outputs }: { outputs: ScreenMetadata['outputs'] }) {
  return (
    <div className="space-y-2">
      {outputs.map((output, index) => (
        <div key={index} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-caption text-text-primary font-medium">{output.action}</span>
            {output.condition && (
              <span className="text-mini text-amber-400">({output.condition})</span>
            )}
          </div>
          <p className="text-mini text-text-muted pl-2">
            <code className="text-brand-primary font-mono">{output.effect}</code>
          </p>
        </div>
      ))}
    </div>
  );
}

function RelatedScreens({
  screens,
  onNavigate,
}: {
  screens: string[];
  onNavigate?: (screenId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {screens.map((screenId) => (
        <button
          key={screenId}
          onClick={() => onNavigate?.(screenId)}
          className="px-2 py-1 rounded-md bg-bg-muted text-caption text-text-secondary hover:text-text-primary hover:bg-bg-card border border-border transition-colors"
        >
          {screenId}
        </button>
      ))}
    </div>
  );
}
