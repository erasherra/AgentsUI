"use client"
import React, { useState } from "react";

import { formatAgentData } from '@/app/utils/dataFormat';
export default function Agent({agent, setModifyData }) {

    console.log('TEST',agent)
    const [name, setName] = useState(agent.label);
    const [systemPrompt, setSystemPrompt] = useState(agent.customConfig.system_prompt);
    
    const handleModification = () => {
        setModifyData({
            label: name,
            customName: name,
            customType: "AGENT",
            customConfig: {system_prompt: systemPrompt}
        });
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
        handleModification();
    };

    const handleSystemPromptChange = (event) => {
        setSystemPrompt(event.target.value);
        handleModification();
    };

    return (
      <>
       <h2>Modify Agent {agent.id}</h2>
            <div>
            <form>
                    <label>
                        Name:
                        <br />
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <br />
                    <label>
                        System Prompt:
                        <br />
                        <textarea type="text" value={systemPrompt} onChange={handleSystemPromptChange} />
                    </label>
                    <br />
                </form>
                <div>
            </div>
            </div>
      </>
  
    );
  }

  