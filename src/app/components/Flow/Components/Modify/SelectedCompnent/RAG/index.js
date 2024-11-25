"use client"
import React, { useState } from "react";
import { formatRAGData } from '@/app/utils/dataFormat';
export default function RAG({ RAG, setModifyData  }) {

    const [inputs, setInputs] = useState(RAG.customConfig.sources);
    const [lable, setLable] = useState(RAG.label);
    const [systemPrompt, setSystemPrompt] = useState(RAG.customConfig.system_prompt);
    console.log("RAG", RAG);
    const handleAddInput = () => {
        setInputs([...inputs, { source: "", type: "TXT" }]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setModifyData({
            label: lable,
            customName: lable,
            customType: "RAG",
            customConfig: {system_prompt: systemPrompt, sources: onChangeValue}
        });
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    const handleNameChange = (event) => {
        setModifyData({
            label: event.target.value,
            customName: event.target.value,
            customType: "RAG",
            customConfig: {system_prompt: systemPrompt, sources: inputs}
        });
        setLable(event.target.value);
    };

    const handleSystemPromptChange = (event) => {
        setModifyData({
            label: lable,
            customName: lable,
            customType: "RAG",
            customConfig: {system_prompt: event.target.value, sources: inputs}
        });
        setSystemPrompt(event.target.value);
    };


    return (
        <div className="container">
            <div>
                <form>
                    <label>
                        Name:
                        <br />
                        <input type="text" value={lable} onChange={handleNameChange} />
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

            <div className="body"> {/*JSON.stringify(inputs)*/} </div>

        </div>
    );
}
