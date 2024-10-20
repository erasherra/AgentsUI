"use client"
import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 195 };

function CustomNode({id, data, isConnectable }) {
  if(!data || !data.assigned){
    return;
  }

  let modify = null;
  let remove = null;
  let test = null;
  if(data.functions){
    modify = data.functions.modify ? (<button onClick={() => data.functions.modify(data)}>Modify</button>) : null;
    remove = data.functions.delete ? (<button onClick={() => data.functions.delete(id)}>Delete</button>) : null;
    test = data.functions.test ? (<button onClick={() => data.functions.test(data)}>Test</button>) : null;
  }
  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data.assigned.label }</label>
        {modify}
        {test}
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