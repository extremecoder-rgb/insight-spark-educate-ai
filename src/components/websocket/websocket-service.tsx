
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApiKeys } from '@/contexts/api-keys-context';
import { useToast } from '@/hooks/use-toast';

// Types for WebSocket messages
interface WebSocketMessage {
  type: string;
  payload: any;
}

interface WebSocketContextType {
  isConnected: boolean;
  fluvioConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({
  children,
  url
}: {
  children: ReactNode;
  url: string;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [fluvioConnected, setFluvioConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const { apiKeys } = useApiKeys();
  const { toast } = useToast();

  // Don't try to connect more than 2 times to avoid blocking the UI
  const MAX_RECONNECT_ATTEMPTS = 2;

  useEffect(() => {
    // Skip WebSocket connection if we've reached max attempts
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.log('Max WebSocket reconnection attempts reached. Skipping connection.');
      return;
    }
    
    // Only try to connect if Fluvio API key exists
    if (!apiKeys.fluvioApiKey) {
      console.log('No Fluvio API key found. WebSocket connection skipped.');
      return;
    }

    let ws: WebSocket | null = null;
    
    const connectWebSocket = () => {
      // For testing/development, create a dummy WebSocket or simulate behavior
      // In a real implementation, this would connect to the actual Fluvio service
      console.log('Attempting WebSocket connection...');
      
      try {
        // In a real implementation, the API key would be sent in headers or as part of auth
        // For now, we'll simulate success/failure based on dummy implementation
        if (apiKeys.fluvioApiKey === 'demo' || apiKeys.fluvioApiKey.length > 5) {
          // Simulate successful connection
          setIsConnected(true);
          setFluvioConnected(true);
          
          // Simulate receiving a message
          setTimeout(() => {
            setLastMessage({
              type: 'connection_established',
              payload: { status: 'connected', timestamp: new Date().toISOString() }
            });
          }, 500);
          
          // Simulate stream data
          const streamInterval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance of getting data
              setLastMessage({
                type: 'stream_data',
                payload: {
                  studentId: `student_${Math.floor(Math.random() * 10) + 1}`,
                  activityType: ['focus', 'distraction', 'question'][Math.floor(Math.random() * 3)],
                  timestamp: new Date().toISOString()
                }
              });
            }
          }, 5000); // Every 5 seconds
          
          return () => clearInterval(streamInterval);
        } else {
          // Simulate connection failure
          setIsConnected(false);
          setFluvioConnected(false);
          setReconnectAttempts(prev => prev + 1);
          toast({
            title: "Connection Failed",
            description: "Could not connect to Fluvio streaming service. Check your API key.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('WebSocket connection error:', error);
        setIsConnected(false);
        setFluvioConnected(false);
        setReconnectAttempts(prev => prev + 1);
      }
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url, apiKeys.fluvioApiKey, reconnectAttempts, toast]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Message not sent:', message);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        fluvioConnected,
        lastMessage,
        sendMessage
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
