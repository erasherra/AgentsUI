const baseUrl = 'http://localhost:8000';

// Get root endpoint
async function getRoot() {
    try {
      const response = await fetch(baseUrl + '/'); // Replace '/' with your base URL
      const data = await response.json();
      console.log(data); // Output: {"Hello": "World123"}
    } catch (error) {
      console.error(error);
    }
  }
  
  // Get item endpoint
  async function getItem(itemId) {
    try {
      const response = await fetch(`${baseUrl}/items/${itemId}`); // Replace '/' with your base URL
      const data = await response.json();
      console.log(data); // Output: {"item_id": itemId, "q": q}
    } catch (error) {
      console.error(error);
    }
  }
  
  // Post local_init endpoint
  async function initMultiAgentSystem() {
    try {
      const response = await fetch(baseUrl + '/local_init', { method: 'POST' }); // Replace '/' with your base URL
      const data = await response.json();
      console.log(data); // Output: {"message": "Multi-agent system initialized successfully"}
    } catch (error) {
      console.error(error);
    }
  }
  
  // Post init endpoint
  export async function initializeSystem(jsonData) {
    const myHeaders = new Headers();
    const body = JSON.stringify(jsonData);
    myHeaders.append("Content-Type", "application/json");
    console.log("initializeSystem v2: ", body);
    try {
        let reply = undefined
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
        };
        
        fetch("http://localhost:8000/init", requestOptions)
          .then((response) => response.text())
          .then((result) => {console.log(result); reply = result})
          .catch((error) => {console.error(error); reply = error});
      // Output: {"message": "Multi-agent system initialized successfully"}
      return reply;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Post process endpoint
  export async function processInput(inputData) {
    try {
      const response = await fetch(baseUrl + '/process', { method: 'POST', body: JSON.stringify({"query": inputData}), headers: { 'Content-Type': 'application/json' } }); // Replace '/' with your base URL
      const data = await response.json();
      console.log(data); // Output: {"input_data": inputData, "memory": memory}
      return data
    } catch (error) {
      console.error(error);
    }
  }
  
  // Put modify endpoint
  async function modifyAgent(nodeId, nodeData) {
    try {
      const response = await fetch(`${baseUrl}/modify/${nodeId}`, { method: 'PUT', body: JSON.stringify(nodeData), headers: { 'Content-Type': 'application/json' } }); // Replace '/' with your base URL
      const data = await response.json();
      console.log(data); // Output: {"message": "Agent modified successfully"}
    } catch (error) {
      console.error(error);
    }
  }
  
  // Get models endpoint
  export async function getModels() {
    try {
      const response = await fetch(baseUrl + '/models'); // Replace '/' with your base URL
      const data = await response.json();
      console.log("getModels", data); // Output: {"Hello": "TODO"}
      if(data && data.models && data.models.length > 0){
        return data.models;
      }else{
        return [];
      }
      
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  
  // WebSocket endpoint
  export async function establishWebSocket() {
    try {
      const socket = new WebSocket(`ws://${baseUrl}/ws`); // Replace 'ws://localhost:8000/ws' with your WebSocket URL
  
      // Listen for incoming messages
      socket.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
      };
  
      // Send a message to the server
      const inputData = 'Hello, server!';
      socket.send(inputData);
  
    } catch (error) {
      console.error(error);
    }
  }