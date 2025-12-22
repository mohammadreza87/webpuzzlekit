'use client';

/**
 * Flowchart Toolbar
 *
 * Toolbar with zoom controls, filters, flow selector, and export options.
 */

import { useCallback, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useSimulation } from '@/store/SimulationContext';
import { useFlowchartData } from '../hooks/useFlowchartData';
import { SCREEN_METADATA } from '@/config/screen-metadata.config';
import type { FlowFilter } from '@/types/simulation';

// Flow filter options - grouped by type
const FLOW_FILTER_OPTIONS: { value: FlowFilter; label: string; description: string; isDetailed?: boolean; separator?: boolean }[] = [
  // Overview filters
  { value: 'all', label: 'All Flows', description: 'Show all screens and connections' },
  { value: 'core-loop', label: 'Core Loop', description: 'Main menu, gameplay, level flow' },
  { value: 'level-flow', label: 'Level Flow', description: 'Level start, gameplay, complete/failed' },
  { value: 'team-features', label: 'Team Features', description: 'Team, team chest, social features' },
  { value: 'shop-monetization', label: 'Shop & Monetization', description: 'Shop, IAP, out of lives' },
  { value: 'social', label: 'Social', description: 'Friends, leaderboard, profile' },
  { value: 'liveops', label: 'All LiveOps', description: 'All live operations events' },
  // Detailed feature flows (complete user journeys)
  { value: 'clef-collection', label: 'Clef Collection', description: 'Complete flow with decisions & outcomes', isDetailed: true, separator: true },
  { value: 'winning-streak', label: 'Booster Streak', description: 'Streak ladder with win/lose branches', isDetailed: true },
  { value: 'super-booster', label: 'Super Booster', description: 'Max tier super booster flow', isDetailed: true },
];

export function FlowchartToolbar() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { state, setSettings } = useSimulation();
  const { nodes, edges } = useFlowchartData();
  const [isExporting, setIsExporting] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 300 });
  }, [fitView]);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleToggleThumbnails = useCallback(() => {
    setSettings({ showThumbnails: !state.settings.showThumbnails });
  }, [state.settings.showThumbnails, setSettings]);

  const handleToggleShowAll = useCallback(() => {
    setSettings({ showAllFeatures: !state.settings.showAllFeatures });
  }, [state.settings.showAllFeatures, setSettings]);

  const handleFilterChange = useCallback((filter: FlowFilter) => {
    setSettings({ flowFilter: filter });
    setShowFilterDropdown(false);
  }, [setSettings]);

  const handleExportPNG = useCallback(async () => {
    setIsExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const { saveAs } = await import('file-saver');

      const flowElement = document.querySelector('.react-flow') as HTMLElement;
      if (!flowElement) return;

      const dataUrl = await toPng(flowElement, {
        backgroundColor: '#0a0a0a',
        pixelRatio: 2,
      });

      saveAs(dataUrl, `flowchart-${Date.now()}.png`);
    } catch (error) {
      console.error('Failed to export PNG:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleExportSVG = useCallback(async () => {
    setIsExporting(true);
    try {
      const { toSvg } = await import('html-to-image');
      const { saveAs } = await import('file-saver');

      const flowElement = document.querySelector('.react-flow') as HTMLElement;
      if (!flowElement) return;

      const dataUrl = await toSvg(flowElement);
      saveAs(dataUrl, `flowchart-${Date.now()}.svg`);
      showExportSuccess('SVG');
    } catch (error) {
      console.error('Failed to export SVG:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleExportJSON = useCallback(async () => {
    setIsExporting(true);
    try {
      const { saveAs } = await import('file-saver');

      // Build export data with nodes, edges, metadata, and simulation state
      const exportData = {
        exportedAt: new Date().toISOString(),
        filter: state.settings.flowFilter,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: {
            id: node.data.id,
            label: node.data.label,
            category: node.data.category,
            type: node.data.type,
            pageId: node.data.pageId,
            modalId: node.data.modalId,
          },
          metadata: SCREEN_METADATA[node.id] || null,
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          data: edge.data,
        })),
        simulationState: {
          player: state.player,
          boosters: state.boosters,
          events: state.events,
          team: state.team,
          features: state.features,
        },
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
      saveAs(blob, `flowchart-${state.settings.flowFilter}-${Date.now()}.json`);
      showExportSuccess('JSON');
    } catch (error) {
      console.error('Failed to export JSON:', error);
    } finally {
      setIsExporting(false);
    }
  }, [nodes, edges, state]);

  // Show success toast
  const showExportSuccess = useCallback((format: string) => {
    setExportSuccess(format);
    setTimeout(() => setExportSuccess(null), 2000);
  }, []);

  // Update PNG export to show success
  const handleExportPNGWithToast = useCallback(async () => {
    await handleExportPNG();
    showExportSuccess('PNG');
  }, [handleExportPNG, showExportSuccess]);

  const currentFilter = FLOW_FILTER_OPTIONS.find(f => f.value === state.settings.flowFilter) || FLOW_FILTER_OPTIONS[0];

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 flex-wrap">
      {/* Flow Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="flex items-center gap-2 bg-bg-card rounded-lg border border-border shadow-lg px-3 py-2 text-text-primary hover:bg-bg-muted transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-caption font-medium">{currentFilter.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showFilterDropdown && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowFilterDropdown(false)} />
            <div className="absolute top-full left-0 mt-1 z-20 w-72 bg-bg-card rounded-lg border border-border shadow-xl overflow-hidden max-h-[400px] overflow-y-auto">
              {FLOW_FILTER_OPTIONS.map((option, index) => (
                <div key={option.value + (option.isDetailed ? '-detailed' : '')}>
                  {option.separator && (
                    <div className="px-3 py-2 bg-bg-muted border-t border-border">
                      <span className="text-mini font-semibold text-brand-primary uppercase tracking-wide">
                        Detailed Feature Flows
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => handleFilterChange(option.value)}
                    className={`w-full px-3 py-2.5 text-left hover:bg-bg-muted transition-colors ${
                      state.settings.flowFilter === option.value ? 'bg-brand-muted' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {option.isDetailed && <span className="text-mini">🔍</span>}
                      <span className="text-caption font-medium text-text-primary">{option.label}</span>
                    </div>
                    <div className="text-mini text-text-muted">{option.description}</div>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Toggle */}
      <button
        onClick={handleToggleThumbnails}
        className={`flex items-center gap-2 rounded-lg border shadow-lg px-3 py-2 transition-colors ${
          state.settings.showThumbnails
            ? 'bg-brand-primary border-brand-primary text-white'
            : 'bg-bg-card border-border text-text-secondary hover:text-text-primary'
        }`}
        title={state.settings.showThumbnails ? 'Hide screen thumbnails' : 'Show screen thumbnails'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-caption font-medium">Thumbnails</span>
      </button>

      {/* Show All Features Toggle */}
      <button
        onClick={handleToggleShowAll}
        className={`flex items-center gap-2 rounded-lg border shadow-lg px-3 py-2 transition-colors ${
          state.settings.showAllFeatures
            ? 'bg-brand-primary border-brand-primary text-white'
            : 'bg-bg-card border-border text-text-secondary hover:text-text-primary'
        }`}
        title={state.settings.showAllFeatures ? 'Show only enabled features' : 'Show all features'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-caption font-medium">Show All</span>
      </button>

      {/* Zoom Controls */}
      <div className="flex items-center bg-bg-card rounded-lg border border-border shadow-lg overflow-hidden">
        <ToolbarButton onClick={handleZoomOut} title="Zoom Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
        </ToolbarButton>
        <div className="w-px h-6 bg-border" />
        <ToolbarButton onClick={handleZoomIn} title="Zoom In">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
          </svg>
        </ToolbarButton>
        <div className="w-px h-6 bg-border" />
        <ToolbarButton onClick={handleFitView} title="Fit View">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 00-2 2v3" />
            <path d="M21 8V5a2 2 0 00-2-2h-3" />
            <path d="M3 16v3a2 2 0 002 2h3" />
            <path d="M16 21h3a2 2 0 002-2v-3" />
          </svg>
        </ToolbarButton>
      </div>

      {/* Export Controls */}
      <div className="flex items-center bg-bg-card rounded-lg border border-border shadow-lg overflow-hidden">
        <ToolbarButton onClick={handleExportPNGWithToast} title="Export as PNG" disabled={isExporting}>
          {isExporting ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="ml-1 text-mini">PNG</span>
            </>
          )}
        </ToolbarButton>
        <div className="w-px h-6 bg-border" />
        <ToolbarButton onClick={handleExportSVG} title="Export as SVG" disabled={isExporting}>
          {isExporting ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="ml-1 text-mini">SVG</span>
            </>
          )}
        </ToolbarButton>
        <div className="w-px h-6 bg-border" />
        <ToolbarButton onClick={handleExportJSON} title="Export as JSON (data)" disabled={isExporting}>
          {isExporting ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="ml-1 text-mini">JSON</span>
            </>
          )}
        </ToolbarButton>
      </div>

      {/* Export Success Toast */}
      {exportSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-caption font-medium">{exportSuccess} exported successfully!</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 bg-bg-card rounded-lg border border-border shadow-lg px-3 py-2">
        <LegendItem color="bg-blue-500" label="Main" />
        <LegendItem color="bg-purple-500" label="LiveOps" />
        <LegendItem color="bg-orange-500" label="Modal" />
        <LegendItem color="bg-green-500" label="Active" />
      </div>
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, title, disabled, children }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

interface LegendItemProps {
  color: string;
  label: string;
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-mini text-text-muted">{label}</span>
    </div>
  );
}
