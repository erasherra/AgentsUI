"use client"
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import CustomNode from './Nodes/customNode';
import './custom-nodes.css';

const initialNodes = [
  { id: '1', 
    type: 'customNode',
    position: { x: 300, y: 100 }, 
    data: { label: '1' } 
  },

  { id: '2', 
    type:  'customNode',
    position: { x: 400, y: 200 }, 
    data: { label: '2' } 
  },

  { id: '3', 
    type:  'customNode',
    position: { x: 400, y: 300 }, 
    data: { label: '3' } 
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { customNode: CustomNode };
 
const Flow  = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export {Flow};