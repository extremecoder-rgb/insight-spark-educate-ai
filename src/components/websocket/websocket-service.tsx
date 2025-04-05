
import { useEffect, useState, useRef, createContext, useContext } from 'react';

// Define WebSocket context type
interface WebSocketContextType {
  connected: boolean;
  lastMessage: any;
  sendMessage: (message: any) => void;
}

// Create context with default values
const WebSocketContext = createContext<WebSocketContextType>({
  connected: false,
  lastMessage: null,
  sendMessage: () => {},
});

// This is a placeholder for WebSocket implementation
// In a real app, this would connect to your backend WebSocket server
export const WebSocketProvider = ({ url, children }: { url: string; children: React.ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    // In a real app, this would be your actual WebSocket connection
    console.log(`Connecting to WebSocket at ${url}`);
    
    // Simulate a connection
    const connectTimeout = setTimeout(() => {
      console.log('WebSocket connected');
      setConnected(true);
    }, 1000);
    
    // Mock WebSocket interface
    socketRef.current = {
      send: (data: string) => {
        console.log('WebSocket sending:', data);
        
        // Simulate receiving a response after sending a message
        setTimeout(() => {
          const response = {
            type: 'response',
            timestamp: new Date().toISOString(),
            data: { received: true, original: JSON.parse(data) }
          };
          setLastMessage(response);
        }, 300);
      },
      close: () => {
        console.log('WebSocket closed');
        setConnected(false);
      }
    } as unknown as WebSocket;
    
    // Clean up
    return () => {
      clearTimeout(connectTimeout);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);
  
  // Function to send messages over WebSocket
  const sendMessage = (message: any) => {
    if (socketRef.current && connected) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, unable to send message');
    }
  };
  
  return (
    <WebSocketContext.Provider value={{ connected, lastMessage, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook for using the WebSocket context
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
