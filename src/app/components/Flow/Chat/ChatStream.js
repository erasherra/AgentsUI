"use client"
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import "./index.css"
import useWebSocket from './WebSocket/useWebSocket';


export default function ChatStream({ processInput }){
    const { messages, sendMessage, msgRef } = useWebSocket('ws://localhost:8000/ws');

    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('JohnDoe');
    
    

    useEffect(() => {
        // Initialize the username (you can ask for input or store it in local storage)
        setUsername('JohnDoe');
    }, []);



    const sendSocketMessage = async (event) => {
        if (event) event.preventDefault(); // Prevent the default behavior of the button
        sendMessage(newMessage);
        setNewMessage('');
    }


    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };
    console.log("ChatStream ",messages)
    return (
        <div className="chat-container">
            <div className="chat-content">
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>

                            
                            {/*<Markdown style={{ backgroundColor: 'lightgray' }}>{message} </Markdown>*/}
                            {message}
                            
                        </li>
                    ))}
                    <li key={"generating"}>
                        <p>{msgRef.current} </p>
                    </li>

                </ul>
            </div>
            <form className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button type="button" onClick={(event) => sendSocketMessage()/*</form>handleSendMessage(event)*/}>Send</button>
            </form>
        </div>
    );
};
