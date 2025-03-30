import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
  >
    <div 
      className={`max-w-[80%] rounded-lg p-4 ${
        message.isUser 
          ? 'bg-orange-100 text-orange-900' 
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
                {children}
              </a>
            ),
            ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
            code: ({ children }) => (
              <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">{children}</code>
            ),
          }}
        >
          {message.text}
        </ReactMarkdown>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {message.timestamp.toLocaleTimeString()}
      </p>
    </div>
  </motion.div>
);