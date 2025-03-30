import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  input, 
  setInput, 
  isLoading, 
  onSubmit 
}) => (
  <form onSubmit={onSubmit} className="p-4 border-t">
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about women's rights and respect..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="bg-orange-600 text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send</span>
          </>
        )}
      </button>
    </div>
  </form>
);