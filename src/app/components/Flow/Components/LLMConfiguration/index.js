
import { useState } from 'react';
export const LLMConfiguration = ({ onSelectLLM, id, llmConfigurations }) => {

    const [selected, setSelected] = useState('Empty');

    const updateLLMConfig = (e) => {
        onSelectLLM(id, e.target.value);
        setSelected(e.target.value);
    }

    return (
        <select value={selected} onChange={(e) => updateLLMConfig(e)}>
            <option key="asd" value="empty">-</option>
            {
                
                llmConfigurations && llmConfigurations.map((llm, index) => {
                    return (
                        <option key={index} value={llm.name}>{llm.name}</option>
                    )
                })
            }
        </select>
    );
};

