import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { getChatResponse } from '../lib/gemini';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Message } from '../types/chat';

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Hello! I'm here to help answer your questions about women's rights and respect. How can I assist you today?",
  isUser: false,
  timestamp: new Date()
};

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChatResponse(userMessage.text);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('AI Response Error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-4 bg-orange-600 text-white flex items-center space-x-4">
          <Bot className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-semibold">AI Assistant</h2>
            <p className="text-sm text-orange-100">Ask questions about women's rights and respect</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {error && <ErrorMessage message={error} />}
          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Assistant;