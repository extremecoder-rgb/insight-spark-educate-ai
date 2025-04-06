
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ApiKeysProvider } from "@/contexts/api-keys-context";
import { WebSocketProvider } from "@/components/websocket/websocket-service";

// Eagerly loaded pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazily loaded pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const StudentScreen = lazy(() => import("./pages/StudentScreen"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const Settings = lazy(() => import("./pages/Settings"));

// Configure query client with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000, // 30 seconds
    },
  },
});

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-32 w-32 animate-pulse rounded-lg bg-primary/10"></div>
  </div>
);

// App Routes with WebSocket conditionally initialized
const AppRoutes = () => {
  const location = useLocation();
  
  // Only initialize WebSocket on teacher dashboard
  const shouldInitWebSocket = location.pathname.includes('teacher-dashboard');
  
  return (
    <ApiKeysProvider>
      {shouldInitWebSocket ? (
        <WebSocketProvider url="wss://api.example.com/ws">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            } />
            <Route path="/signup" element={
              <Suspense fallback={<PageLoader />}>
                <Signup />
              </Suspense>
            } />
            <Route path="/student-screen" element={
              <Suspense fallback={<PageLoader />}>
                <StudentScreen />
              </Suspense>
            } />
            <Route path="/teacher-dashboard" element={
              <Suspense fallback={<PageLoader />}>
                <TeacherDashboard />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<PageLoader />}>
                <Settings />
              </Suspense>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WebSocketProvider>
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          } />
          <Route path="/signup" element={
            <Suspense fallback={<PageLoader />}>
              <Signup />
            </Suspense>
          } />
          <Route path="/student-screen" element={
            <Suspense fallback={<PageLoader />}>
              <StudentScreen />
            </Suspense>
          } />
          <Route path="/teacher-dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <TeacherDashboard />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<PageLoader />}>
              <Settings />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </ApiKeysProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="liveinsight-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
