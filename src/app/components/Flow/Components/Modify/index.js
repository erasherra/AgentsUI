"use client"
import React, { useState } from "react";

import { formatAgentData } from '@/app/utils/dataFormat';
import Agent from './SelectedCompnent/Agent';
import RAG from './SelectedCompnent/RAG';
export default function Modify({ id, nodes, onDelete, onModify, modifyFocus }) {


    const modifiedNode = nodes.find((node) => { return node.id === modifyFocus });
    const [modifyData, setModifyData] = useState(modifiedNode ? modifiedNode.data.assigned : undefined);


    const handleAgentModification = () => {
       onModify(modifyFocus, modifyData)
    }

    const handleDelete = () => {
        onDelete(modifyFocus)
    }

    const showTargetData = () => {
        
        switch (modifyData.customType) {
            case 'RAG':
                return <RAG RAG={modifyData} setModifyData={setModifyData} />;
            case 'AGENT':
                return <Agent agent={modifyData} setModifyData={setModifyData} />;
            default:
                return null;
        }
    }

    return (
        <>
            <div>
                <h2>Modify {modifyData.customType}</h2>
                <div>
                    {showTargetData()}
                </div>

                <div>
                    <button className="button" onClick={() => handleAgentModification()}>Save</button>
                    <button className="button" onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
        </>

    );
}

