"use client"
import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 195 };

function CustomNode({ data, isConnectable }) {

  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data.label }</label>
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