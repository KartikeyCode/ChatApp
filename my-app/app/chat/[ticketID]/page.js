'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Chat({ params }) {
  const { ticketID } = params;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (ticketID) {
      const newSocket = io('https://socketserverbarclays.onrender.com/');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('join', ticketID);
      });

      newSocket.on('chat message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('chat history', (history) => {
        setMessages(history);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [ticketID]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', { room: ticketID, message: messageInput });
      setMessageInput('');
    }
  };

  const handleFileUpload = () => {
    if (socket && selectedFile) {
      socket.emit('upload', selectedFile, (status) => {
        console.log(status);
      });
      setSelectedFile(null); // Reset selected file after sending
    }
  };

  return (
    <div>
      <h1>Chat Room: {ticketID}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {/* File upload */}
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
}

