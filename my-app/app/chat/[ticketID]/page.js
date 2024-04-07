'use client'
import NavbarDash from '@/app/components/navbardash';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Chat({ params }) {
  const { ticketID } = params;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

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

  return (
    <div  className='flex flex-col min-h-screen items-center'>
      <NavbarDash/>
      <div className='mt-24 flex flex-col gap-10'>
      <h1 className='text-2xl xl:text-5xl mb-10'>Chat for ticketID: {ticketID}</h1>
      <div className=' text-lg xl:text-2xl'>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className='flex items-center justify-center gap-10'>
      <input
      className='border-2 px-4'
        placeholder='Enter your message here...'
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        />
      <button className='bg-[#406AFF] text-white p-2 px-4 rounded-3xl' onClick={sendMessage}>Send</button>
        </div>
        </div>
    </div>
  );
}