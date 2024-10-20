
"use client"
import React, { useState } from "react";
import {
    Panel,
} from '@xyflow/react';
import RAG from "../Components/RAG";
import Agent from "../Components/Agent";
import Modify from "../Components/Modify";
export default function SideBar({ onAdd, onDelete, onModify, nodes, modifyFocus }) {


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
        if(modifyFocus){
            return <Modify onDelete={onDelete} onModify={onModify} nodes={nodes} modifyFocus={modifyFocus}/>
        }
        switch (selectedType) {
            case 'RAG':
                return <RAG onAdd={onAdd}/>;
            case  'Agent':
                return  <Agent onAdd={onAdd}/>;
            default:
                return  null;
        }
    }

    return (
        <div className="nav-menu active">
            { modifyFocus == undefined ? (
            <div>
                <h2>What kind of agent?</h2>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">Select an option</option>
                    
                    <option value="Agent">Agent</option>
                    <option value="RAG">RAG</option>
                </select>
            </div>
            ): null}
            <br />

            <div>
                {typeSettings()}
            </div>
            

        </div>

    );
}