import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatInterface from './components/ChatInterface';

const db = {
  saveMessage: (message) => {
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chatMessages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  },
  getMessages: () => {
    return JSON.parse(localStorage.getItem('chatMessages')) || [];
  },
};

const MentalHealthChatbot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages(db.getMessages());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <header className="bg-white/10 backdrop-blur-md p-6 rounded-b-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-white h-8 w-8" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              MindMate
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-hidden rounded-2xl my-4">
          <div className="bg-white/10 backdrop-blur-md h-full rounded-2xl shadow-xl">
            <ChatInterface
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
