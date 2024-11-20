"use client"
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import "./index.css"
import useWebSocket from './WebSocket/useWebSocket';

//import io from 'socket.io-client';

//const socket = io('ws://localhost:8000/ws');
//const ws = new WebSocket("ws://localhost:8000/ws");

export default function ChatStream({ processInput }){
    const { messages, sendMessage } = useWebSocket('ws://localhost:8000/ws');
    //const [messages, setMessages] = useState([{ text: "asdsad asdasd sad", author: "JohnDoe" },
    //    { text: "asdsad asdasd sad", author: "robot" }
    //]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('JohnDoe');
    
    

    useEffect(() => {
        // Initialize the username (you can ask for input or store it in local storage)
        setUsername('JohnDoe');
    }, []);

    //useEffect(() => {
    //    // Listen for incoming messages
    //    socket.on('chat message', (message) => {
    //      setMessages((prevMessages) => [...prevMessages, message]);
    //    });
    //  }, []);
    //
    //  const sendSocketMessage = () => {
    //    socket.emit('chat message', newMessage);
    //    setNewMessage('');
    //};

    //useEffect(() => {
    //    // Listen for incoming messages
    //    ws.onmessage = function (event) {
    //      setMessages((prevMessages) => [...prevMessages, message]);
    //    };
    //  }, []);
    //
    //const sendSocketMessage = () => {
    //    socket.emit(newMessage);
    //    ws.send(JSON.stringify(newMessage));
    //    setNewMessage('');
    //};

    const sendSocketMessage = async (event) => {
        if (event) event.preventDefault(); // Prevent the default behavior of the button
        sendMessage(newMessage);
    }

    //const handleSendMessage = async (event) => {
    //    if (event) event.preventDefault(); // Prevent the default behavior of the button
    //    setMessages([...messages, { text: newMessage, author: username }]);
    //    setNewMessage('');
    //    setMessages([...messages, { text: "Processing...", author: "System" }]);
    //    let reply = await processInput(newMessage);
    //    setMessages([...messages, { text: reply.memory, author: "AI" }]);
    //    
    //};

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="chat-container">
            <div className="chat-content">
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>

                            {username === message.author ? (
                                <Markdown >{message.text}</Markdown>
                            ) : (
                                <Markdown style={{ backgroundColor: 'lightgray' }}>{message.text}</Markdown>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <form className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button onClick={(event) => sendSocketMessage()/*</form>handleSendMessage(event)*/}>Send</button>
            </form>
        </div>
    );
};
