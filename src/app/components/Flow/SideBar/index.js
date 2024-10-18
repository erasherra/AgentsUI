
"use client"
import React, { useState } from "react";
import {
    Panel,
} from '@xyflow/react';
import RAG from "../Components/RAG";
import Agent from "../Components/Agent";
export default function SideBar({ onAdd, multiAgentData, setMultiAgentData }) {


    const [selectedType, setSelectedType] = useState(undefined);

    const newNode = {
        id: 'test',
        data: { label: `test` },
        position: {
            x: 500,
            y: 500
        }
    };

    const typeSettings = () => {
        switch (selectedType) {
            case 'RAG':
                return <RAG onAdd={onAdd} setMultiAgentData={setMultiAgentData}/>;
            case  'Agent':
                return  <Agent onAdd={onAdd} setMultiAgentData={setMultiAgentData}/>;
            default:
                return  null;
        }
    }

    return (
        <div className="nav-menu active">
            <div>
                <h2>What kind of agent?</h2>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">Select an option</option>
                    
                    <option value="Agent">Agent</option>
                    <option value="RAG">RAG</option>
                </select>
            </div>
            <br />

            <div>
                {typeSettings()}
            </div>
            

        </div>

    );
}