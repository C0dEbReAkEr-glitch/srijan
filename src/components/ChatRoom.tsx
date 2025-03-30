import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useWebSocket } from '../contexts/WebSocketContext';
import { Message } from '../types/chat';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Loader2 } from 'lucide-react';

interface ChatRoomProps {
  roomId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { user } = useAuth();
  const { currentRoom, messages, sendMessage, addMessage } = useChat();
  const { socket, isConnected } = useWebSocket();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!currentRoom) {
      navigate('/rooms');
      return;
    }

    if (socket && isConnected) {
      // Join the chat room
      socket.send(JSON.stringify({
        type: 'join',
        username: user.username
      }));

      // Handle incoming messages
      socket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'message':
              addMessage({
                id: Date.now().toString(),
                content: data.content,
                sender: data.username,
                timestamp: new Date(data.timestamp),
                roomId
              });
              break;
              
            case 'system':
              addMessage({
                id: Date.now().toString(),
                content: data.message,
                sender: 'System',
                timestamp: new Date(data.timestamp),
                roomId,
                isSystem: true
              });
              break;
              
            case 'userList':
              setConnectedUsers(data.users);
              break;
              
            case 'typing':
              // Handle typing indicators if needed
              break;
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      setIsLoading(false);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user, currentRoom, socket, isConnected, roomId, navigate, addMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !isConnected || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: user.username,
      timestamp: new Date(),
      roomId
    };

    socket.send(JSON.stringify({
      type: 'message',
      content: newMessage
    }));

    addMessage(message);
    setNewMessage('');
  };

  const handleTyping = () => {
    if (!socket || !isConnected) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.send(JSON.stringify({
        type: 'typing',
        isTyping: true
      }));
    }

    // Clear typing indicator after 2 seconds
    setTimeout(() => {
      setIsTyping(false);
      socket.send(JSON.stringify({
        type: 'typing',
        isTyping: false
      }));
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{currentRoom?.name}</h2>
          <p className="text-sm text-gray-500">
            {isConnected ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span className="text-red-500">Disconnected</span>
            )}
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages
              .filter((msg) => msg.roomId === roomId)
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === user?.username ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isSystem
                        ? 'bg-gray-100 text-gray-600 text-sm'
                        : message.sender === user?.username
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {!message.isSystem && (
                      <div className="text-xs mb-1">
                        {message.sender}
                      </div>
                    )}
                    <div>{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              disabled={!isConnected}
            />
            <Button type="submit" disabled={!isConnected}>
              Send
            </Button>
          </div>
        </form>
      </div>

      {/* Connected Users Sidebar */}
      <div className="w-64 border-l p-4">
        <h3 className="font-semibold mb-4">Connected Users</h3>
        <div className="space-y-2">
          {connectedUsers.map((username) => (
            <div key={username} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{username}</span>
              <Badge variant="secondary" className="ml-auto">
                Online
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom; 