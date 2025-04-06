
import { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from '@/components/websocket/websocket-service';

// Define types for our hooks
interface ActivityData {
  mouseMovements: {
    timestamp: number;
    x: number;
    y: number;
  }[];
  keyPresses: number;
  tabSwitches: number;
  inactiveTime: number;
  activeTabInfo: string;
}

interface UseScreenActivityProps {
  enabled: boolean;
  sampleRate?: number; // How often to sample mouse movement in ms
  inactivityThreshold?: number; // Time in ms to consider user inactive
}

// This implementation uses Fluvio for event streaming of screen monitoring
export const useScreenActivity = ({
  enabled = false,
  sampleRate = 1000,
  inactivityThreshold = 5000,
}: UseScreenActivityProps) => {
  const [activityData, setActivityData] = useState<ActivityData>({
    mouseMovements: [],
    keyPresses: 0,
    tabSwitches: 0,
    inactiveTime: 0,
    activeTabInfo: document.title,
  });
  
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [recording, setRecording] = useState<boolean>(false);
  const { toast } = useToast();
  const { sendMessage, connected, fluvioConnected } = useWebSocket();
  
  // Start/stop monitoring based on enabled prop
  useEffect(() => {
    if (enabled && !recording) {
      setRecording(true);
      toast({
        title: "Screen monitoring started with Fluvio",
        description: "Your activity is now being streamed for educational purposes.",
      });
      
      // Send initial connection message to Fluvio
      if (fluvioConnected) {
        sendMessage({
          type: 'monitoring_started',
          timestamp: new Date().toISOString(),
          data: {
            sessionId: 'current-session', // This would be a real session ID
            browserInfo: {
              userAgent: navigator.userAgent,
              screenSize: `${window.innerWidth}x${window.innerHeight}`,
            }
          }
        });
      }
    } else if (!enabled && recording) {
      setRecording(false);
      toast({
        title: "Fluvio screen monitoring stopped",
        description: "Activity streaming has been disabled.",
      });
      
      // Send monitoring ended message
      if (fluvioConnected) {
        sendMessage({
          type: 'monitoring_ended',
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [enabled, recording, toast, sendMessage, fluvioConnected]);
  
  // Set up mouse movement tracking and send to Fluvio
  useEffect(() => {
    if (!recording || !fluvioConnected) return;
    
    let mouseMovementSampler: ReturnType<typeof setInterval>;
    let inactivityChecker: ReturnType<typeof setInterval>;
    let streamingInterval: ReturnType<typeof setInterval>;
    
    const handleMouseMove = (e: MouseEvent) => {
      setLastActivity(Date.now());
      
      // In a real implementation, we would stream this data via Fluvio
      if (fluvioConnected && Math.random() > 0.9) { // Send 10% of events to reduce volume
        sendMessage({
          type: 'mouse_movement',
          timestamp: Date.now(),
          data: {
            x: e.clientX,
            y: e.clientY,
            movementX: e.movementX,
            movementY: e.movementY
          }
        });
      }
    };
    
    const handleKeyPress = () => {
      setLastActivity(Date.now());
      setActivityData(prev => ({
        ...prev,
        keyPresses: prev.keyPresses + 1
      }));
      
      // Stream keyboard activity via Fluvio
      if (fluvioConnected) {
        sendMessage({
          type: 'keyboard_activity',
          timestamp: Date.now(),
          data: {
            keyPress: true // We don't send the actual keys for privacy
          }
        });
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActivityData(prev => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1
        }));
        
        // Stream tab change via Fluvio
        if (fluvioConnected) {
          sendMessage({
            type: 'tab_change',
            timestamp: Date.now(),
            data: {
              visible: false,
              previousTab: document.title
            }
          });
        }
      } else {
        setActivityData(prev => ({
          ...prev,
          activeTabInfo: document.title
        }));
        
        // Stream tab return via Fluvio
        if (fluvioConnected) {
          sendMessage({
            type: 'tab_change',
            timestamp: Date.now(),
            data: {
              visible: true,
              currentTab: document.title
            }
          });
        }
      }
    };
    
    // Sample mouse position at regular intervals
    mouseMovementSampler = setInterval(() => {
      const mouseX = Math.random() * window.innerWidth; // Mock data
      const mouseY = Math.random() * window.innerHeight; // Mock data
      
      setActivityData(prev => ({
        ...prev,
        mouseMovements: [
          ...prev.mouseMovements.slice(-20), // Keep only last 20 positions
          { timestamp: Date.now(), x: mouseX, y: mouseY }
        ]
      }));
    }, sampleRate);
    
    // Check for inactivity
    inactivityChecker = setInterval(() => {
      const now = Date.now();
      const inactiveFor = now - lastActivity;
      
      if (inactiveFor > inactivityThreshold) {
        setActivityData(prev => ({
          ...prev,
          inactiveTime: prev.inactiveTime + (sampleRate / 1000)
        }));
        
        // Stream inactivity via Fluvio
        if (fluvioConnected && inactiveFor % (inactivityThreshold * 2) < sampleRate) {
          // Only send every other check to reduce spam
          sendMessage({
            type: 'inactivity',
            timestamp: now,
            data: {
              inactiveDuration: inactiveFor
            }
          });
        }
      }
    }, sampleRate);
    
    // Regular streaming of aggregated data
    streamingInterval = setInterval(() => {
      if (fluvioConnected) {
        // Send batched activity data every 5 seconds
        sendMessage({
          type: 'activity_summary',
          timestamp: Date.now(),
          data: {
            ...activityData,
            // Add additional derived metrics
            focusEstimate: calculateFocusScore(),
            sessionDuration: (Date.now() - lastActivity) + activityData.inactiveTime * 1000,
          }
        });
      }
    }, 5000);
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      clearInterval(mouseMovementSampler);
      clearInterval(inactivityChecker);
      clearInterval(streamingInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [recording, sampleRate, inactivityThreshold, lastActivity, fluvioConnected, sendMessage, activityData]);
  
  // Calculate focus score based on activity data
  const calculateFocusScore = (): number => {
    // In a real app, this would use more sophisticated algorithm
    const maxScore = 100;
    const tabSwitchPenalty = Math.min(activityData.tabSwitches * 5, 30);
    const inactivityPenalty = Math.min(activityData.inactiveTime * 2, 40);
    
    const rawScore = maxScore - tabSwitchPenalty - inactivityPenalty;
    return Math.max(0, Math.min(100, rawScore));
  };
  
  return {
    activityData,
    isRecording: recording,
    focusScore: calculateFocusScore(),
    startRecording: () => setRecording(true),
    stopRecording: () => setRecording(false),
    fluvioConnected,
  };
};

// In a real implementation, this component would use Fluvio SDK
// for comprehensive screen monitoring
export const ScreenMonitor = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
