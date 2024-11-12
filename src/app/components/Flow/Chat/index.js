"use client"
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import "./index.css"
export default function Chat({ processInput }){
    const [messages, setMessages] = useState([{ text: "asdsad asdasd sad", author: "JohnDoe" },
        { text: "asdsad asdasd sad", author: "robot" }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('JohnDoe');

    useEffect(() => {
        // Initialize the username (you can ask for input or store it in local storage)
        setUsername('JohnDoe');
    }, []);

    const handleSendMessage = async (event) => {
        if (event) event.preventDefault(); // Prevent the default behavior of the button
        setMessages([...messages, { text: newMessage, author: username }]);
        setNewMessage('');
        setMessages([...messages, { text: "Processing...", author: "System" }]);
        let reply = await processInput(newMessage);
        setMessages([...messages, { text: reply.memory, author: "AI" }]);
        
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-content">
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>

                            {username === message.author ? (
                                <Markdown style={{ backgroundColor: 'lightgray' }}>{message.text}</Markdown>
                            ) : (
                                <Markdown>{message.text}</Markdown>
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
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                />
                <button onClick={(event) => handleSendMessage(event)}>Send</button>
            </form>
        </div>
    );
};
