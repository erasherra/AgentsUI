"use client"
import React, { useState } from "react";
import { formatRAGData } from '@/app/utils/dataFormat';
export default function RAG({ RAG, setModifyData  }) {

    const [inputs, setInputs] = useState([{ source: "", type: "TXT" }]);
    const [name, setName] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');

    const handleAddInput = () => {
        setInputs([...inputs, { source: "", type: "TXT" }]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSystemPromptChange = (event) => {
        setSystemPrompt(event.target.value);
    };

    const handleModification = () => {
        setModifyData({
            label: name,
            customName: name,
            customType: "AGENT",
            customConfig: {system_prompt: systemPrompt}
        });
    };

    return (
        <div className="container">
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
            </div>
            {inputs.map((item, index) => (
                <div className="input_container" key={index}>
                    <input
                        name="source"
                        type="text"
                        placeholder="Source"
                        value={item.source}
                        onChange={(event) => handleChange(event, index)}
                    />
                    <select
                        name="type"
                        value={item.type}
                        onChange={(event) => handleChange(event, index)}>
                        <option value="TXT">TXT</option>
                        <option value="PDF">PDF</option>
                        <option value="URL">URL</option>
                    </select>
                    {inputs.length > 1 && (
                        <button onClick={() => handleDeleteInput(index)}>Delete</button>
                    )}
                    {index === inputs.length - 1 && (
                        <button onClick={() => handleAddInput()}>Add</button>
                    )}
                </div>
            ))}

            <div className="body"> {JSON.stringify(inputs)} </div>

        </div>
    );
}