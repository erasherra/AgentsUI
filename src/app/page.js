"use client"
import React, { useCallback } from 'react';
import styles from "./page.module.css";
import  {Flow}  from "./components/Flow";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges ,
} from '@xyflow/react';

import Navbar from "./components/Navbar";


const initialNodes = [
  { id: '1', 
    type: 'customNode',
    position: { x: 300, y: 100 }, 
    data: { label: '1', customType: 'INPUT' } 
  },

  { id: '2', 
    type:  'customNode',
    position: { x: 400, y: 200 }, 
    data: { label: '2', customType: 'AGENT', customName: 'something', customConfig: { system_prompt:"You are a..."} } 
  },

  { id: '3', 
    type:  'customNode',
    position: { x: 400, y: 300 }, 
    data: { label: '3', customType: 'RAG' } 
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onAdd = useCallback(() => {
    const newNode = {
      id: '' + nodes.length + 1,
      data: { label: `test` },
      position: {
        x: 500,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);
  
  return (
    <>
      <Navbar/>
      <button style={{position: 'absolute', top: 10, right: 10, zIndex:2  }} onClick={onAdd}>add node</button>
      <Flow 
      onNodesChange={onNodesChange} 
      onEdgesChange={onEdgesChange} 
      setEdges={setEdges}
      nodes={nodes}
      edges={edges}/>
    </>

  );
}
