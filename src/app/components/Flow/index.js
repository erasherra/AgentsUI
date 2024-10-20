"use client"
import React, { useCallback, useState } from 'react';
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
    id: 'asd',
    type: 'customNode',
    position: { x: 300, y: 100 },
    data: {assigned: { label: '1', customType: 'INPUT' }}
  },

  {
    id: 'asd2',
    type: 'customNode',
    position: { x: 400, y: 200 },
    data: {assigned: { label: '2', customType: 'AGENT', customName: 'something', customConfig: { system_prompt: "You are a..." } }}
  },

  {
    id: 'asd3',
    type: 'customNode',
    position: { x: 400, y: 300 },
    data: {assigned: { label: '3', customType: 'RAG' }}
  },
];
const initialEdges = [{ id: 'easd-asd2', source: 'asd', target: 'asd2' }];

const Flow = () => {

  const [uniqueID, setUniqueID] = useState(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [modifyFocus, setModifyFocus] = useState(undefined);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onModify = useCallback((id, data) => {
    if (!id || !data) {
      return;
    }
    const nodeToRemove  = nodes.find((node) =>{console.log('onDelete: ',node.id, id); return node.id === id});
    if (nodeToRemove) {
      setNodes((nds) =>
        
      nds.map((node) => (node.id === nodeToRemove.id ? { ...node, data: { assigned: data } } : node))
      );
    }
  }, [nodes, setNodes]);
  
  const onDelete = useCallback((id) => {
    console.log("onDelete",id);
    if (!id) {
      return;
    }
    console.log("debug ", nodes )
    const nodeToRemove  = nodes.find((node) =>{console.log('onDelete: ',node.id, id); return node.id === id});
    
    console.log("debug3 ",nodeToRemove )
    if (nodeToRemove) {
      
      setNodes((nds) => nds.filter(item => item.id !== nodeToRemove.id ));
    }
    console.log("debugx ", nodes )
    setModifyFocus(undefined)
  }, [nodes, setNodes]);

  const test = (d) => {
    console.log("THIS IS A TEST", d)
  }

  const onAdd = useCallback((data) => {
    if (!data) {
      return;
    }
    const uid = uniqueID + 1;
    const id = '' + uid;
    const newNode = {
      id: id,
      type: 'customNode',
      data: {assigned: data, 
        functions: 
        { test: test,
          modify: () => {setModifyFocus(id)}}},
      position: {
        x: 500,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
    setUniqueID(uid);
  }, [nodes, setNodes]);

  //console.log("ASD", nodes);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SideBar onAdd={onAdd} 
      onDelete={onDelete} 
      onModify={onModify} 
      modifyFocus={modifyFocus} 
      nodes={nodes}  />
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