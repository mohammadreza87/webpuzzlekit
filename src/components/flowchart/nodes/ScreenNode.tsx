'use client';

/**
 * Screen Node Component
 *
 * Renders a screen/page as a node in the flowchart.
 * Shows actual page/modal thumbnails when showThumbnails is enabled.
 * Supports different node types: page, modal, decision, action, state
 */

import { memo, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useSimulation } from '@/store/SimulationContext';
import { MiniScreenRenderer } from './MiniScreenRenderer';
import type { PageId, ModalId } from '@/types';

interface ScreenNodeData {
  id: string;
  type?: string;
  pageId?: string;
  modalId?: string;
  label: string;
  category: string;
  isActive?: boolean;
  isBlocked?: boolean;
  nodeType?: 'page' | 'modal' | 'decision' | 'action' | 'state';
  description?: string;
  onShowInfo?: (screenId: string) => void;
}

interface ScreenNodeProps {
  data: ScreenNodeData;
  selected?: boolean;
}

export const ScreenNode = memo(function ScreenNode({ data, selected }: ScreenNodeProps) {
  const { navigateTo, state } = useSimulation();
  const showThumbnails = state.settings?.showThumbnails ?? true;
  const nodeType = data.nodeType || 'page';

  const handleClick = useCallback(() => {
    if (data.pageId || data.modalId) {
      navigateTo(data.id);
    }
  }, [data.id, data.pageId, data.modalId, navigateTo]);

  // Node type specific styling
  const nodeTypeConfig: Record<string, { icon: string; bgColor: string; borderColor: string; shape: string }> = {
    page: { icon: '📱', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/50', shape: 'rounded-xl' },
    modal: { icon: '💬', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/50', shape: 'rounded-xl' },
    decision: { icon: '❓', bgColor: 'bg-yellow-500/15', borderColor: 'border-yellow-500', shape: 'rounded-xl rotate-45' },
    action: { icon: '⚡', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/50', shape: 'rounded-lg' },
    state: { icon: '🔄', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/50', shape: 'rounded-full' },
  };

  const config = nodeTypeConfig[nodeType] || nodeTypeConfig.page;

  // Override for active/blocked states
  const borderColor = data.isActive
    ? 'border-green-500 ring-2 ring-green-500/30'
    : data.isBlocked
      ? 'border-gray-600'
      : selected
        ? 'border-brand-primary ring-2 ring-brand-primary/30'
        : config.borderColor;

  const bgColor = data.isActive
    ? 'bg-green-500/10'
    : data.isBlocked
      ? 'bg-gray-800/50'
      : config.bgColor;

  const categoryColors: Record<string, string> = {
    main: 'bg-blue-500/20 text-blue-400',
    liveops: 'bg-purple-500/20 text-purple-400',
    modal: 'bg-orange-500/20 text-orange-400',
    decision: 'bg-yellow-500/20 text-yellow-400',
    action: 'bg-cyan-500/20 text-cyan-400',
  };

  // Check if we have a valid page or modal to render
  const canRenderThumbnail = (data.pageId || data.modalId) && (nodeType === 'page' || nodeType === 'modal');

  // Render different styles based on node type
  if (nodeType === 'decision') {
    // Diamond-shaped decision node
    return (
      <div className="relative" style={{ width: 120, height: 120 }}>
        {/* Input handle */}
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-yellow-500 !w-3 !h-3 !border-2 !border-bg-card"
          style={{ top: -6 }}
        />

        {/* Diamond container */}
        <div
          className={`
            absolute inset-0 ${bgColor} border-2 ${borderColor}
            transition-all duration-200 cursor-pointer
            hover:shadow-lg hover:scale-105
            flex items-center justify-center
          `}
          style={{
            transform: 'rotate(45deg)',
            borderRadius: '8px',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
          }}
          onClick={handleClick}
        />

        {/* Content (not rotated) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl mb-1">{config.icon}</span>
          <p className="text-text-primary text-mini font-medium text-center px-2 leading-tight">
            {data.label}
          </p>
        </div>

        {/* Output handle */}
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-yellow-500 !w-3 !h-3 !border-2 !border-bg-card"
          style={{ bottom: -6 }}
        />
      </div>
    );
  }

  if (nodeType === 'action') {
    // Compact action node
    return (
      <div
        className={`
          ${bgColor} rounded-lg border-2 border-dashed ${borderColor} px-3 py-2
          ${data.isBlocked ? 'opacity-50' : ''}
          transition-all duration-200 cursor-pointer relative
          hover:shadow-lg hover:scale-[1.02]
          min-w-[100px] max-w-[130px]
        `}
        onClick={handleClick}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-bg-card"
        />

        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <p className="text-text-primary text-caption font-medium leading-tight">
            {data.label}
          </p>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-bg-card"
        />
      </div>
    );
  }

  if (nodeType === 'state') {
    // Pill-shaped state node
    return (
      <div
        className={`
          ${bgColor} rounded-full border-2 ${borderColor} px-4 py-2
          ${data.isBlocked ? 'opacity-50' : ''}
          transition-all duration-200 cursor-pointer relative
          hover:shadow-lg hover:scale-[1.02]
          min-w-[100px]
        `}
        onClick={handleClick}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-green-500 !w-3 !h-3 !border-2 !border-bg-card"
        />

        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <p className="text-text-primary text-caption font-medium text-center leading-tight">
            {data.label}
          </p>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-green-500 !w-3 !h-3 !border-2 !border-bg-card"
        />
      </div>
    );
  }

  // Default page/modal node
  return (
    <div
      className={`
        ${bgColor} rounded-xl border-2 ${borderColor} p-2 min-w-[130px] max-w-[150px]
        ${data.isBlocked ? 'opacity-50' : ''}
        transition-all duration-200 cursor-pointer relative
        hover:shadow-lg hover:scale-[1.02]
      `}
      onClick={handleClick}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-text-muted !w-3 !h-3 !border-2 !border-bg-card"
      />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-mini px-1.5 py-0.5 rounded ${categoryColors[data.category] || 'bg-bg-muted text-text-muted'}`}
        >
          {nodeType === 'modal' ? 'modal' : data.category}
        </span>
        {data.isActive && (
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        )}
      </div>

      {/* Thumbnail - either real screen or placeholder */}
      <div className="w-full rounded-lg mb-1.5 flex items-center justify-center overflow-hidden">
        {showThumbnails && canRenderThumbnail ? (
          <MiniScreenRenderer
            pageId={data.pageId as PageId}
            modalId={data.modalId as ModalId}
            width={126}
            height={200}
          />
        ) : (
          <div className="w-full h-[80px] bg-bg-muted rounded-lg flex items-center justify-center">
            <span className="text-2xl">{config.icon}</span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-text-primary text-caption font-medium leading-tight" title={data.label}>
          {data.label}
        </p>
      </div>

      {/* Info button */}
      <button
        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-bg-muted/80 text-text-secondary hover:text-text-primary hover:bg-bg-muted flex items-center justify-center transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          data.onShowInfo?.(data.id);
        }}
        title="View screen info"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-text-muted !w-3 !h-3 !border-2 !border-bg-card"
      />
    </div>
  );
});
