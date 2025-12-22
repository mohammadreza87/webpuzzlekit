'use client';

/**
 * Labeled Edge Component
 *
 * Renders an edge with an action label between nodes.
 */

import { memo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';

interface LabeledEdgeData {
  label?: string;
  condition?: string;
  isActive?: boolean;
  isConditionMet?: boolean;
  probability?: number;
}

type LabeledEdgeProps = EdgeProps & { data?: LabeledEdgeData };

export const LabeledEdge = memo(function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
  markerEnd,
}: LabeledEdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Determine edge colors based on state
  const isActive = data?.isActive;
  const isConditionMet = data?.isConditionMet !== false; // Default to true if not set
  const isBlocked = !isConditionMet && data?.condition;

  // Color: green if active, red if blocked, gray otherwise
  const strokeColor = isActive
    ? '#22c55e'
    : isBlocked
      ? '#ef4444'
      : style?.stroke || '#6b7280';
  const strokeWidth = isActive ? 3 : (style?.strokeWidth as number) || 2;
  const strokeOpacity = isBlocked ? 0.5 : 1;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth,
          opacity: strokeOpacity,
          strokeDasharray: isBlocked ? '5,5' : undefined,
        }}
        markerEnd={markerEnd}
      />

      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
            className={`
              px-2 py-1 rounded-md text-mini font-medium
              border shadow-sm
              ${isActive
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : isBlocked
                  ? 'bg-red-500/10 text-red-400 border-red-500/30 opacity-70'
                  : 'bg-bg-card text-text-primary border-border'
              }
            `}
          >
            <span>{data.label}</span>
            {data.probability !== undefined && (
              <span className="text-text-muted ml-1">({data.probability}%)</span>
            )}
            {data.condition && (
              <span
                className={`ml-1 ${isBlocked ? 'text-red-400' : 'text-text-muted'}`}
                title={`Condition: ${data.condition}${isBlocked ? ' (NOT MET)' : ' (met)'}`}
              >
                {isBlocked ? '✗' : '✓'}
              </span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
});
