import { useEffect, useRef, useCallback } from 'react';

interface WebSocketConfig {
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

export function useWebSocket(
  url: string, 
  onMessage: (data: any) => void,
  config: WebSocketConfig = {}
) {
  const ws = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const { 
    reconnectAttempts = 3,
    reconnectInterval = 3000
  } = config;

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        reconnectCount.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        if (reconnectCount.current < reconnectAttempts) {
          setTimeout(() => {
            reconnectCount.current += 1;
            connect();
          }, reconnectInterval);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  }, [url, onMessage, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((data: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(data));
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    } else {
      console.warn('WebSocket is not connected');
    }
  }, []);

  return { 
    sendMessage,
    isConnected: ws.current?.readyState === WebSocket.OPEN 
  };
}