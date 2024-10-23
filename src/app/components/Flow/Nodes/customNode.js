"use client"
import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 195 };

function CustomNode({id, data, isConnectable }) {

  if(!data || !data.assigned){
    return;
  }
  const type = data.assigned.customType;
  
  let modify = undefined;
  let remove = undefined;
  let test = undefined;

  let selectLLM = undefined;
  let llmTarget = undefined;

  if(data.functions){
    modify = data.functions.modify ? (<button onClick={() => data.functions.modify(data)}>Modify</button>) : undefined;
    remove = data.functions.delete ? (<button onClick={() => data.functions.delete(id)}>Delete</button>) : undefined;
    test = data.functions.test ? (<button onClick={() => data.functions.test(data)}>Test</button>) : undefined;
    
  }

  if(data.llm){
    llmTarget = data.llm.selected ? data.llm.selected : 'not selected'
    selectLLM = data.functions.selectLLM ? (<button onClick={() => data.functions.selectLLM()}>{llmTarget}</button>) : undefined;
  }
  
  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{type} : {data.assigned.label }</label>
        {modify}
        {selectLLM}
        {test}
        <div>
          

        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        //id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;