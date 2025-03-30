import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWebSocket } from '../hooks/useWebSocket';

interface Language {
  code: string;
  name: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  language: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  ip: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' }
];

const WEBSOCKET_URL = process.env.NODE_ENV === 'production'
  ? `wss://${window.location.host}/ws`
  : `ws://${window.location.hostname}:5500/ws`;

const Chatroom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (data: any) => {
    if (data.type === 'userList') {
      setConnectedUsers(data.users);
    } else if (data.type === 'message') {
      setMessages(prev => [...prev, { ...data.message, timestamp: new Date(data.message.timestamp) }]);
    }
  };

  const { sendMessage, isConnected } = useWebSocket(
    WEBSOCKET_URL,
    handleNewMessage,
    {
      reconnectAttempts: 5,
      reconnectInterval: 2000
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
      // Send user join message
      sendMessage({
        type: 'join',
        user: {
          id: Date.now().toString(),
          name: username,
          ip: window.location.hostname
        }
      });
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    const message = {
      type: 'message',
      message: {
        id: Date.now(),
        text: newMessage,
        sender: username,
        language: selectedLanguage,
        timestamp: new Date()
      }
    };

    sendMessage(message);
    setNewMessage('');
  };

  if (!isUsernameSet) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Join Chatroom</h2>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-orange-600 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Community Chat</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">Chatting as: {username}</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-orange-700 text-white rounded px-3 py-1 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === username 
                    ? 'bg-orange-100 text-orange-900' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm font-medium mb-1">{message.sender}</p>
                  <p>{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Connected Users Sidebar */}
          <div className="w-64 bg-gray-50 border-l p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-700">Connected Users</h3>
            </div>
            <div className="space-y-2">
              {connectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.ip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleMessageSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={!isConnected}
              className="bg-orange-600 text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;