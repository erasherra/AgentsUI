function formatRAGData(name, system_prompt, content, evaluate) {

    if (!name || !system_prompt || !content || evaluate == undefined) {
        throw new Error("Please provide all required inputs.");
    }

    let formattedData = {
        label: name,
        customName: name,
        customType: 'RAG',
        customConfig: { system_prompt: system_prompt, sources: [], evaluate: evaluate },
    };
    if (content.length > 0) {
        formattedData.customConfig.sources = content.map((c) => ({ source: c.source, type: c.type }));
    }
    return formattedData;

}
function formatAgentData(name, system_prompt) {

    if (!name || !system_prompt) {
        throw new Error("Please provide all required inputs.");
        return undefined;
    }

    let formattedData = {
        label: name,
        customName: name,
        customType: 'AGENT',
        customConfig: { system_prompt: system_prompt },
    };
    return formattedData;

}

function formatEdges(edges) {
    const edgeDict = {};
    const formattedEdges = [];
    edges.forEach((edge) => {
      if (!edgeDict[edge.source]) {
        edgeDict[edge.source] = [];
      }
      edgeDict[edge.source].push(edge.target);
      
      const formattedEdge = {
        source: edge.source,
        target: edgeDict[edge.source],
        id: `xy-edge__${edge.source}-` + edgeDict[edge.source].join('-'),
      };
      formattedEdges.push(formattedEdge);
    });
    console.log("formatEdges: ", formattedEdges)
    return formattedEdges;
  }

  function formatNodes(nodes) {
    return nodes.map((node) => ({
      id: node.id,
      assigned: {
        label: node.data.assigned.label || '',
        customName: node.data.assigned.customName,
        customType: node.data.assigned.customType,
        customConfig: node.data.assigned.customConfig
          ? node.data.assigned.customConfig
          : {}
      },
      llm: { selected: node.data.llm.selected }
    }));
  }

function formatProcessJson(nodes, edges, name) {    
    if (!name || !nodes.length ) {
        throw new Error("Please provide all required inputs.");
    }
    const newEdges = edges != undefined ? formatEdges(edges): [];
    const newNodes = formatNodes(nodes);
    console.log("asd ",newNodes);
    const formattedProcessJson = {
        name: name,
        nodes: newNodes,
        edges: newEdges,
    };
    console.log("formatProcessJson: ", formattedProcessJson)
    return formattedProcessJson;
}

function formatProcessJsonForUI(nodes, edges, name) {    
  if (!name || !nodes.length ) {
      throw new Error("Please provide all required inputs.");
  }

  const formattedProcessJson = {
      name: name,
      nodes: nodes,
      edges: edges,
  };
  console.log("formatProcessJsonForUI: ", formattedProcessJson)
  return formattedProcessJson;
}


export { formatRAGData, formatAgentData, formatProcessJson, formatProcessJsonForUI}
