'use client';

/**
 * Flowchart Overlay
 *
 * Full-screen overlay containing the flowchart canvas and control panels.
 */

import { useCallback, useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { SimulationProvider } from '@/store/SimulationContext';
import { FlowchartCanvas } from './FlowchartCanvas';
import { SimulationPanel } from './panels/SimulationPanel';
import { GDInputPanel } from './panels/GDInputPanel';
import { ScreenInfoPanel } from './panels/ScreenInfoPanel';
import { FlowchartToolbar } from './controls/FlowchartToolbar';

interface FlowchartOverlayProps {
  onClose: () => void;
}

type PanelTab = 'simulation' | 'gd-inputs' | 'info';

// Breakpoint for responsive panel
const MOBILE_BREAKPOINT = 768;

export function FlowchartOverlay({ onClose }: FlowchartOverlayProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('simulation');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and auto-collapse panel on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // Auto-collapse on mobile on initial load
      if (mobile && !isPanelCollapsed) {
        setIsPanelCollapsed(true);
      }
    };

    // Check on mount
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle info button click on a screen node
  const handleShowInfo = useCallback((screenId: string) => {
    setSelectedScreenId(screenId);
    setActiveTab('info');
    setIsPanelCollapsed(false); // Ensure panel is visible
  }, []);

  // Handle navigation from related screens in info panel
  const handleNavigateToScreen = useCallback((screenId: string) => {
    setSelectedScreenId(screenId);
  }, []);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Close shortcuts help first if open
      if (showShortcutsHelp && e.key === 'Escape') {
        setShowShortcutsHelp(false);
        return;
      }

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '?':
          setShowShortcutsHelp(prev => !prev);
          break;
        case '1':
          setActiveTab('simulation');
          setIsPanelCollapsed(false);
          break;
        case '2':
          setActiveTab('gd-inputs');
          setIsPanelCollapsed(false);
          break;
        case '3':
          setActiveTab('info');
          setIsPanelCollapsed(false);
          break;
        case 'p':
        case 'P':
          setIsPanelCollapsed(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showShortcutsHelp]);

  return (
    <div
      className="fixed inset-0 z-50 bg-bg-page flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Flowchart and Simulation Overlay"
    >
      <SimulationProvider>
        <ReactFlowProvider>
          {/* Header */}
          <header className="h-14 bg-bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <h1 className="text-h3 text-text-primary flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-primary"
                >
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="15" y="3" width="6" height="6" rx="1" />
                  <rect x="9" y="15" width="6" height="6" rx="1" />
                  <path d="M6 9v3a1 1 0 001 1h4" />
                  <path d="M18 9v3a1 1 0 01-1 1h-4" />
                  <path d="M12 13v2" />
                </svg>
                Flowchart & Simulation
              </h1>
              <span className="text-caption text-text-muted hidden sm:inline">
                Interactive user flow visualization
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Keyboard shortcuts button */}
              <button
                onClick={() => setShowShortcutsHelp(true)}
                className="w-9 h-9 rounded-lg bg-bg-muted flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                title="Keyboard Shortcuts (?)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01" />
                  <path d="M10 8h.01" />
                  <path d="M14 8h.01" />
                  <path d="M18 8h.01" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                  <path d="M7 16h10" />
                </svg>
              </button>

              {/* Panel toggle button */}
              <button
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                className="w-9 h-9 rounded-lg bg-bg-muted flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                title={isPanelCollapsed ? 'Show Panel (P)' : 'Hide Panel (P)'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${isPanelCollapsed ? 'rotate-180' : ''}`}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-bg-muted flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-status-error/10 transition-colors"
                title="Close (Esc)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Mobile Backdrop */}
            {isMobile && !isPanelCollapsed && (
              <div
                className="absolute inset-0 bg-black/50 z-20 md:hidden"
                onClick={() => setIsPanelCollapsed(true)}
              />
            )}

            {/* Left Panel - Responsive drawer on mobile */}
            <aside
              className={`
                ${isMobile ? 'absolute left-0 top-0 bottom-0 z-30' : 'relative'}
                ${isPanelCollapsed ? (isMobile ? '-translate-x-full' : 'hidden') : 'translate-x-0'}
                w-80 max-w-[85vw] border-r border-border flex flex-col bg-bg-page shrink-0
                transition-transform duration-300 ease-in-out
              `}
              aria-label="Control Panel"
            >
              {/* Panel Header with Close button on mobile */}
              {isMobile && (
                <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-bg-card">
                  <span className="text-caption font-medium text-text-primary">Control Panel</span>
                  <button
                    onClick={() => setIsPanelCollapsed(true)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-muted transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Tab Buttons */}
              <div className="flex border-b border-border shrink-0" role="tablist" aria-label="Panel tabs">
                <TabButton
                  active={activeTab === 'simulation'}
                  onClick={() => setActiveTab('simulation')}
                  shortcut="1"
                >
                  Simulation
                </TabButton>
                <TabButton
                  active={activeTab === 'gd-inputs'}
                  onClick={() => setActiveTab('gd-inputs')}
                  shortcut="2"
                >
                  GD Inputs
                </TabButton>
                <TabButton
                  active={activeTab === 'info'}
                  onClick={() => setActiveTab('info')}
                  shortcut="3"
                >
                  Info
                </TabButton>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'simulation' && <SimulationPanel />}
                {activeTab === 'gd-inputs' && <GDInputPanel />}
                {activeTab === 'info' && (
                  <ScreenInfoPanel
                    screenId={selectedScreenId}
                    onNavigateToScreen={handleNavigateToScreen}
                  />
                )}
              </div>
            </aside>

            {/* Flowchart Canvas */}
            <main className="flex-1 relative">
              <FlowchartToolbar />
              <FlowchartCanvas onShowInfo={handleShowInfo} />
            </main>
          </div>
        </ReactFlowProvider>
      </SimulationProvider>

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsHelp && (
        <KeyboardShortcutsModal onClose={() => setShowShortcutsHelp(false)} />
      )}
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  shortcut?: string;
}

function TabButton({ active, onClick, children, shortcut }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      title={shortcut ? `${children} (${shortcut})` : undefined}
      className={`flex-1 py-2.5 text-caption font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-inset ${
        active
          ? 'text-brand-primary border-b-2 border-brand-primary bg-brand-muted/30'
          : 'text-text-secondary hover:text-text-primary hover:bg-bg-muted'
      }`}
    >
      {children}
    </button>
  );
}

interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

function KeyboardShortcutsModal({ onClose }: KeyboardShortcutsModalProps) {
  const shortcuts = [
    { key: 'Esc', description: 'Close flowchart overlay' },
    { key: '?', description: 'Toggle keyboard shortcuts help' },
    { key: '1', description: 'Switch to Simulation tab' },
    { key: '2', description: 'Switch to GD Inputs tab' },
    { key: '3', description: 'Switch to Info tab' },
    { key: 'P', description: 'Toggle side panel visibility' },
    { key: 'Scroll', description: 'Zoom in/out on canvas' },
    { key: 'Drag', description: 'Pan around the flowchart' },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
    >
      <div
        className="bg-bg-card rounded-xl border border-border shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="shortcuts-modal-title" className="text-body font-semibold text-text-primary flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-primary"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M6 8h.01" />
              <path d="M10 8h.01" />
              <path d="M14 8h.01" />
              <path d="M18 8h.01" />
              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
              <path d="M7 16h10" />
            </svg>
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-4 space-y-2">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between py-1.5"
            >
              <span className="text-caption text-text-secondary">{shortcut.description}</span>
              <kbd className="px-2 py-1 rounded bg-bg-muted border border-border text-mini font-mono text-text-primary">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border bg-bg-muted/50">
          <p className="text-mini text-text-muted text-center">
            Press <kbd className="px-1.5 py-0.5 mx-1 rounded bg-bg-card border border-border font-mono">?</kbd> anytime to toggle this help
          </p>
        </div>
      </div>
    </div>
  );
}
