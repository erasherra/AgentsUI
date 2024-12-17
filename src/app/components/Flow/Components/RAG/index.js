"use client"
import React, { useState } from "react";
import { formatRAGData } from '@/app/utils/dataFormat';
export default function RAG({ onAdd }) {

    const [inputs, setInputs] = useState([{ source: "", type: "text" }]);
    const [name, setName] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [evaluate, setEvaluated] = useState(false);

    const handleAddInput = () => {
        setInputs([...inputs, { source: "", type: "text" }]);
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

    const handleEvaluationChange = () => {
        setEvaluated(!evaluate);
    };

    const handleRAGCreation = () => {
        const rag = formatRAGData(name, systemPrompt, inputs, evaluate);
        if (rag) {
            setName('');
            setSystemPrompt('');
            setInputs([{ source: "", type: "text" }]);
            setEvaluated(false);
            onAdd(rag);
        }
    }

    return (
        <div className="container">
            <div>
                <form>
                    <label>
                        Evaluate:
                        <br />
                        <input
                            type="checkbox"
                            checked={evaluate}
                            onChange={handleEvaluationChange}
                        />
                    </label>
                    <br />
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
                        <option value="text">Text: text</option>
                        <option value="text_file">Path: text file</option>
                        <option value="pdf_file">URL: PDF</option>
                        <option value="web_page">URL: web page</option>
                    </select>
                    {inputs.length > 1 && (
                        <button className="button" onClick={() => handleDeleteInput(index)}>Delete</button>
                    )}
                    {index === inputs.length - 1 && (
                        <button className="button" onClick={() => handleAddInput()}>Add</button>
                    )}
                </div>
            ))}

            <div className="body"> {/*JSON.stringify(inputs)*/} </div>
            <div>
                <button className="button" onClick={() => handleRAGCreation()}>Add</button>
            </div>
        </div>
    );
}
