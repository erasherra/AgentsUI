function formatRAGData(name, system_prompt, content) {

    if (!name || !system_prompt || !content) {
        throw new Error("Please provide all required inputs.");
        return undefined;
    }

    let formattedData = {
        label: name,
        customName: name,
        customType: 'RAG',
        customConfig: { system_prompt: system_prompt, sources: [] },
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


export { formatRAGData, formatAgentData}
