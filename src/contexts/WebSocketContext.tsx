import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface WebSocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  reconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  reconnect: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds

  const connect = useCallback(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5500';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setReconnectAttempt(0);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      
      // Attempt to reconnect if we haven't exceeded max attempts
      if (reconnectAttempt < maxReconnectAttempts) {
        setTimeout(() => {
          setReconnectAttempt(prev => prev + 1);
        }, reconnectDelay);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [reconnectAttempt]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  const reconnect = useCallback(() => {
    if (socket) {
      socket.close();
    }
    setReconnectAttempt(0);
    connect();
  }, [socket, connect]);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, reconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
}; 