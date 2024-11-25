"use client"
import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [msg, setMsg] = useState("");
    const msgRef = useRef("");
    useEffect(() => {
            
          
        const socket = new WebSocket(url);
        setWs(socket);
            
        socket.onmessage = (event) => {
            
            let chunk = event.data;
            console.log(chunk)
            if(chunk == "$$END$$"){
                console.log("MSG END:",msgRef.current);
                const val = msgRef.current;
                setMessages((prevMessages) => [...prevMessages, val]);
                msgRef.current = "";
            }else{
                console.log("MSG:", msgRef.current);
                msgRef.current += chunk;
            }
            
        };

        return () => {
            socket.close();
        };
    
    }, [url]);

    const sendMessage = (message) => {

        if (ws) {
           ws.send(message);
        }
    };

    return { messages, sendMessage, msgRef };
};

export default useWebSocket;