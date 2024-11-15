import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(!isUser);

  useEffect(() => {
    if (!isUser) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let i = 0;
        const typingInterval = setInterval(() => {
          setDisplayText(message.slice(0, i));
          i++;
          if (i > message.length) {
            clearInterval(typingInterval);
          }
        }, 30);
        return () => clearInterval(typingInterval);
      }, 1500);
    } else {
      setDisplayText(message);
    }
  }, [message, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${isUser ? 'bg-indigo-600 text-white' : 'bg-white/20 backdrop-blur-md text-white'
          }`}
      >
        {isTyping ? (
          <span className="typing-indicator">•••</span>
        ) : (
          displayText
        )}
      </div>
    </div>
  );
};

const ChatInterface = ({ chatMessages, setChatMessages, inputMessage, setInputMessage }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    // ... rest of the handleSendMessage logic remains the same
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={chatContainerRef} className="flex-1 overflow-auto mb-4 px-4">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="flex items-center px-4 pb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l-lg bg-white/10 border-0 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
