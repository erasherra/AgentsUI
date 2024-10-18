
import React, { useState } from "react";
import "./Navbar.css";
export default function Navbar({ addNodeData}) {



  const [showOptions, setShowOptions] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const newNode = {
    id: 'test',
    data: { label: `test` },
    position: {
      x: 500,
      y: 500
    }
  };

  const onAdd = () => {
    // Use the latest nodes and edges here
    setNodes((nds) => nds.concat(newNode));
    //setEdges(edges); // Update edges as well
  };

  let view;
  if (!showOptions) {
    view = (
      <div className="nav-menu active">
        <div className="nav-menu-items-bottom">
          <button onClick={() => setShowOptions(true)} className="add-agent-button">Add Agent</button>
        </div>
      </div>
    );
  } else if (selectedType === null) {
    view = (
      <div className="nav-menu active">
        <h2>What kind of agent?</h2>
        <ul>
          <li onClick={() => setSelectedType('type1')}>Agent Type 1</li>
          <li onClick={() => setSelectedType('type2')}>Agent Type 2</li>
        </ul>
        <div className="nav-menu-items-bottom">
          <button onClick={() => setShowOptions(false)} className="add-agent-button">Cancel</button>
        </div>
      </div>
    );
  } else {
    view = (
      <div className="nav-menu active">
        <h2>{selectedType}</h2>
        <form>
          <label>
            Name:
            <input type="text" />
          </label>
          <br />
          <label>
            System Prompt:
            <textarea type="text" />
          </label>
          <br />
          <button onClick={onAdd}>Add</button>
          <button onClick={() => setSelectedType(null)}>Cancel</button>
        </form>
      </div>
    );
  }
  return view;
}