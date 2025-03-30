import React, { createContext, useContext, useState } from 'react';
import { Message, Room } from '../types/chat';

interface ChatContextType {
  currentRoom: Room | null;
  messages: Message[];
  setCurrentRoom: (room: Room | null) => void;
  addMessage: (message: Message) => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  currentRoom: null,
  messages: [],
  setCurrentRoom: () => {},
  addMessage: () => {},
  sendMessage: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = (content: string) => {
    if (!currentRoom) return;

    const message: Message = {
      id: Date.now().toString(),
      content,
      sender: 'currentUser', // This will be replaced with actual user from AuthContext
      timestamp: new Date(),
      roomId: currentRoom.id,
    };

    addMessage(message);
  };

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        messages,
        setCurrentRoom,
        addMessage,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}; 