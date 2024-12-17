"use client"
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 195 };

function InputNode({id, data, isConnectable }) {

  if(!data || !data.assigned){
    return;
  }
  const type = data.assigned.customType;

  
  return (
    <div className="custom-node" style={{backgroundColor: 'lightgrey'}}>

      <div>
        <label htmlFor="text">{type}</label>

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

export default InputNode;