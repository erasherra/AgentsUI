"use client"
import { Handle, Position } from '@xyflow/react';



function OutputNode({id, data, isConnectable }) {

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
        type="target"
        position={Position.Left}
        //id="a"
        isConnectable={isConnectable}
      />

    </div>
  );
}

export default OutputNode;