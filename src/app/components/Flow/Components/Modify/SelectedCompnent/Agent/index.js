"use client"
import React, { useState } from "react";

export default function Agent({agent, setModifyData }) {

    const [name, setName] = useState(agent.label);
    const [systemPrompt, setSystemPrompt] = useState(agent.customConfig.system_prompt);
    

    const handleNameChange = (event) => {setModifyData({
            label: event.target.value,
            customName: event.target.value,
            customType: "AGENT",
            customConfig: {system_prompt: systemPrompt}
        });
        setName(event.target.value);
    };

    const handleSystemPromptChange = (event) => {
        setModifyData({
            label: name,
            customName: name,
            customType: "AGENT",
            customConfig: {system_prompt: event.target.value}
        });
        setSystemPrompt(event.target.value);
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

  