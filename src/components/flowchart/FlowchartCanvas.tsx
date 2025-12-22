'use client';

/**
 * Flowchart Canvas
 *
 * The main React Flow canvas that displays the flowchart.
 */

import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ScreenNode } from './nodes/ScreenNode';
import { LabeledEdge } from './edges/LabeledEdge';
import { useFlowchartData } from './hooks/useFlowchartData';

// Define node types - use 'as const' to satisfy TypeScript
const nodeTypes = {
  screen: ScreenNode,
} as const;

// Define edge types
const edgeTypes = {
  labeled: LabeledEdge,
} as const;

interface FlowchartCanvasProps {
  onShowInfo?: (screenId: string) => void;
}

export function FlowchartCanvas({ onShowInfo }: FlowchartCanvasProps) {
  const { nodes: initialNodes, edges: initialEdges } = useFlowchartData();
  const { fitView } = useReactFlow();

  // Inject onShowInfo callback into each node's data
  const nodesWithCallback = useMemo(() => {
    return initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onShowInfo,
      },
    }));
  }, [initialNodes, onShowInfo]);

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithCallback);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync nodes and edges when filter changes or callback changes
  useEffect(() => {
    setNodes(nodesWithCallback);
    setEdges(initialEdges);
    // Fit view after nodes change
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
  }, [nodesWithCallback, initialEdges, setNodes, setEdges, fitView]);

  // Custom minimap node color
  const minimapNodeColor = useCallback((node: { data?: { category?: string; isActive?: boolean } }) => {
    if (node.data?.isActive) return '#22c55e';
    switch (node.data?.category) {
      case 'main':
        return '#3b82f6';
      case 'liveops':
        return '#a855f7';
      case 'modal':
        return '#f97316';
      default:
        return '#6b7280';
    }
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          maxZoom: 1,
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'labeled',
          animated: false,
        }}
        proOptions={{
          hideAttribution: true,
        }}
        className="bg-bg-page"
      >
        {/* Background grid */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#374151"
        />

        {/* Controls */}
        <Controls
          className="!bg-bg-card !border-border !rounded-lg !shadow-lg"
          showInteractive={false}
        />

        {/* MiniMap */}
        <MiniMap
          nodeColor={minimapNodeColor}
          maskColor="rgba(0, 0, 0, 0.7)"
          className="!bg-bg-card !border-border !rounded-lg"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
