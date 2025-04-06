import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Zap, Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { useWebSocket } from '@/components/websocket/websocket-service';
import { useApiKeys } from '@/contexts/api-keys-context';

type InsightType = 'tip' | 'alert' | 'insight' | 'prediction' | 'trend';

type Insight = {
  id: string;
  type: InsightType;
  content: string;
  timestamp: Date;
  confidence?: number;
  source?: 'grok' | 'system';
  category?: string;
};

// Mock insights - moved outside component to prevent recreation
const INITIAL_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'alert',
    content: '5 students showing signs of distraction in the last 10 minutes.',
    timestamp: new Date(),
    confidence: 0.89,
    source: 'grok',
    category: 'attention'
  },
  {
    id: '2',
    type: 'tip',
    content: 'Consider a short interactive activity to re-engage the class.',
    timestamp: new Date(),
    confidence: 0.92,
    source: 'grok',
    category: 'engagement'
  },
  {
    id: '3',
    type: 'insight',
    content: 'Students engage more with visual content than text-based slides.',
    timestamp: new Date(),
    confidence: 0.78,
    source: 'grok',
    category: 'content'
  }
];

// Optimized mock API call
const fetchInsights = async (apiKey: string): Promise<Insight[]> => {
  // Immediately return mock data for demo or empty API key
  if (!apiKey || apiKey === 'demo') {
    return INITIAL_INSIGHTS;
  }
  
  // In a real app, this would call the Grok AI service API
  return new Promise((resolve) => {
    // Reduced timeout for faster initial loading
    setTimeout(() => {
      resolve([
        ...INITIAL_INSIGHTS,
        {
          id: '4',
          type: 'prediction',
          content: 'Class attention likely to drop in next 15 minutes based on cognitive load patterns.',
          timestamp: new Date(),
          confidence: 0.76,
          source: 'grok',
          category: 'prediction'
        },
        {
          id: '5',
          type: 'trend',
          content: 'Students in the back row consistently show lower engagement scores.',
          timestamp: new Date(),
          confidence: 0.83,
          source: 'grok',
          category: 'spatial'
        },
      ]);
    }, 300); // Reduced from 800ms to 300ms
  });
};

export const AiInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const { lastMessage, fluvioConnected } = useWebSocket();
  const { apiKeys } = useApiKeys();

  useEffect(() => {
    const getInsights = async () => {
      try {
        // Display initial insights immediately
        setInsights(INITIAL_INSIGHTS);
        setLoading(false);
        
        // Then fetch complete insights
        const data = await fetchInsights(apiKeys.grokApiKey);
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch Grok insights:', error);
        setLoading(false);
      }
    };

    getInsights();
  }, [apiKeys.grokApiKey]);

  // Process real-time insights - keep this functionality
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'stream_data' && fluvioConnected) {
      // In a real app, we would process incoming student activity data
      // and generate new AI insights based on that data
      
      // Simulate new insight from streaming data (randomly)
      if (Math.random() > 0.7 && insights.length < 10) { // 30% chance of new insight, cap at 10
        const newInsightTypes: InsightType[] = ['tip', 'alert', 'insight', 'prediction', 'trend'];
        const newInsightType = newInsightTypes[Math.floor(Math.random() * newInsightTypes.length)];
        
        const newInsightContent = [
          'Several students are showing improved focus after the last explanation.',
          'Student participation has increased in the last 5 minutes.',
          'The current topic appears to be challenging for most students.',
          'Students who answered the last question showed higher engagement.',
          'Consider providing additional examples for the current concept.',
          'Two students appear to be collaborating effectively via chat.',
          'Content pace may be too fast based on student reaction time.',
        ];
        
        const newInsight: Insight = {
          id: `rt-${Date.now()}`,
          type: newInsightType,
          content: newInsightContent[Math.floor(Math.random() * newInsightContent.length)],
          timestamp: new Date(),
          confidence: Math.round(Math.random() * 25 + 75) / 100,
          source: 'grok',
          category: ['attention', 'engagement', 'content', 'prediction'][Math.floor(Math.random() * 4)]
        };
        
        setInsights(prev => [newInsight, ...prev.slice(0, 8)]); // Keep latest 9 insights
      }
    }
  }, [lastMessage, fluvioConnected, insights.length]);

  const getIcon = (type: InsightType) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'insight':
        return <Zap className="h-5 w-5 text-blue-500" />;
      case 'prediction':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" /> Grok AI Insights
          {fluvioConnected && (
            <span className="ml-2 text-xs bg-green-500/10 text-green-500 py-0.5 px-2 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </span>
          )}
        </CardTitle>
        <CardDescription>Real-time teaching recommendations from Grok AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-blue-400 dark:bg-blue-700 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 bg-blue-400 dark:bg-blue-700 rounded"></div>
                  <div className="h-2 bg-blue-400 dark:bg-blue-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            insights.map((insight) => (
              <div 
                key={insight.id} 
                className={`flex items-start space-x-3 p-3 rounded-md 
                  ${insight.source === 'grok' ? 'bg-blue-500/10 dark:bg-blue-900/30' : 'bg-secondary/50'}`}
              >
                <div className="mt-0.5">{getIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{insight.content}</p>
                    {insight.confidence && (
                      <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatTime(insight.timestamp)}
                      {insight.category && (
                        <span className="ml-2 px-1.5 py-0.5 bg-secondary/80 rounded text-xs">
                          {insight.category}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {!loading && insights.length === 0 && (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No insights available yet</p>
              <p className="text-xs text-muted-foreground mt-1">Grok AI is analyzing student data</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
