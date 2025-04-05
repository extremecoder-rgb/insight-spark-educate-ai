import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Info, Activity, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const StudentScreen = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [focusScore, setFocusScore] = useState(0);
  const { toast } = useToast();
  
  // Simulated tab focus/blur events
  useEffect(() => {
    if (!isTracking) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Tab not in focus');
        toast({
          title: "Tab Focus Lost",
          description: "Your teacher has been notified that you switched tabs.",
          variant: "destructive",
        });
      } else {
        console.log('Tab in focus');
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isTracking, toast]);
  
  // Simulated mouse activity monitoring
  useEffect(() => {
    if (!isTracking) return;
    
    const mouseMoveEvents = [];
    let lastUpdate = Date.now();
    
    const handleMouseMove = (e) => {
      const now = Date.now();
      
      mouseMoveEvents.push({
        x: e.clientX,
        y: e.clientY,
        time: now
      });
      
      // Only update focus score every 5 seconds
      if (now - lastUpdate > 5000) {
        // Simulate focus score calculation
        const newFocusScore = Math.min(100, Math.max(0, focusScore + Math.random() * 20 - 5));
        setFocusScore(newFocusScore);
        lastUpdate = now;
      }
      
      // Keep only last 100 events
      if (mouseMoveEvents.length > 100) {
        mouseMoveEvents.shift();
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTracking, focusScore]);
  
  // Session timer
  useEffect(() => {
    if (!isTracking) return;
    
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isTracking]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startTracking = () => {
    setIsTracking(true);
    setSessionTime(0);
    setFocusScore(75); // Start with a default focus score
    
    toast({
      title: "Monitoring Started",
      description: "Your screen activity is now being monitored for this session.",
    });
  };
  
  const stopTracking = () => {
    setIsTracking(false);
    
    toast({
      title: "Monitoring Stopped",
      description: "Screen activity monitoring has been stopped.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Student Activity Monitoring</h1>
        
        {!isTracking ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start Monitoring Session</CardTitle>
              <CardDescription>
                Your screen activity will be monitored to help your teacher understand your engagement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Privacy Notice</AlertTitle>
                  <AlertDescription>
                    Only your activity patterns will be recorded, not the actual content on your screen. 
                    This data is used only for educational purposes.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startTracking}>Start Session</Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-8">
            <Alert className="bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400">
              <Activity className="h-4 w-4" />
              <AlertTitle>Active Monitoring</AlertTitle>
              <AlertDescription>
                Your screen activity is currently being monitored for this learning session.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Session Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-2xl font-bold">{formatTime(sessionTime)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Focus Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Low</span>
                      <span className="font-medium">{Math.round(focusScore)}%</span>
                      <span className="text-muted-foreground">High</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          focusScore > 70 
                            ? 'bg-green-500' 
                            : focusScore > 40 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${focusScore}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">No alerts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" onClick={stopTracking} className="px-8">
                End Session
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudentScreen;
