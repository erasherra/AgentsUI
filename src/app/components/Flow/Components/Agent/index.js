"use client"
import React, { useState } from "react";

import { formatAgentData } from '@/app/utils/dataFormat';
export default function Agent({onAdd}) {

    const [name, setName] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
  
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSystemPromptChange = (event) => {
        setSystemPrompt(event.target.value);
    };

    const handleAgentCreation = () => {
        const agent = formatAgentData(name, systemPrompt);
        if(agent){
            setName('');
            setSystemPrompt('');
            onAdd(agent);
        }
    }

    return (
      <>
       <h2>Create Agent</h2>
            <div>
            <form>
                    <label>
                        <p>Name:</p>
                        <br />
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <br />
                    <label>
                    <p>System Prompt:</p>
                        <br />
                        <textarea type="text" value={systemPrompt} onChange={handleSystemPromptChange} />
                    </label>
                    <br />
                </form>
                <div>
                <button className="button" onClick={() => handleAgentCreation()}>Add</button>
            </div>
            </div>
      </>
  
    );
  }

  