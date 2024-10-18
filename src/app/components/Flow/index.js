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
  Panel,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from './Nodes/customNode';
import SideBar from './SideBar';
import './custom-nodes.css';



// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 300, y: 100 },
    data: {assigned: { label: '1', customType: 'INPUT' }}
  },

  {
    id: '2',
    type: 'customNode',
    position: { x: 400, y: 200 },
    data: {assigned: { label: '2', customType: 'AGENT', customName: 'something', customConfig: { system_prompt: "You are a..." } }}
  },

  {
    id: '3',
    type: 'customNode',
    position: { x: 400, y: 300 },
    data: {assigned: { label: '3', customType: 'RAG' }}
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Flow = () => {

  const [multiAgentData, setMultiAgentData ] = React.useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onModify = useCallback((id, data) => {
    if (!id || !data) {
      return;
    }
    const index = nodes.findIndex((node) => node.id === id);
    if (index >= 0) {
      setNodes((nds) =>
        nds.map((node, i) => (i === index ? { ...node, data: { assigned: data } } : node))
      );
    }
  }, [nodes, setNodes]);
  
  const onDelete = useCallback((id) => {
    console.log("onDelete",id);
    if (!id) {
      return;
    }
    console.log("debug ", nodes )
    const nodeToRemove  = nodes.find((node) =>{console.log(node.id, id); return node.id === id});
    console.log("debug2 ", nodes )
    console.log("debug3 ",nodeToRemove )
    if (nodeToRemove) {
      
      setNodes((nds) => nds.filter((_, i) => i !== nodeToRemove ));
    }
  }, [nodes, setNodes]);

  const test = (d) => {
    console.log("THIS IS A TEST", d)
  }

  const onAdd = useCallback((data) => {
    if (!data) {
      return;
    }
    const id = '' + (nodes.length + 1);
    const newNode = {
      id: id,
      type: 'customNode',
      data: {assigned: data, 
        functions: 
        { test: test,
          delete: onDelete}},
      position: {
        x: 500,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  console.log("ASD", nodes);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SideBar onAdd={onAdd} multiAgentData={multiAgentData} setMultiAgentData={setMultiAgentData} />
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

export { Flow };