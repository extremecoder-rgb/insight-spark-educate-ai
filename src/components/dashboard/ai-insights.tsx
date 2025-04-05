
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Zap } from 'lucide-react';

type Insight = {
  id: string;
  type: 'tip' | 'alert' | 'insight';
  content: string;
  timestamp: Date;
};

// Mock API call to get AI insights
const fetchInsights = async (): Promise<Insight[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'alert',
          content: '5 students showing signs of distraction in the last 10 minutes.',
          timestamp: new Date(),
        },
        {
          id: '2',
          type: 'tip',
          content: 'Consider a short interactive activity to re-engage the class.',
          timestamp: new Date(),
        },
        {
          id: '3',
          type: 'insight',
          content: 'Students engage more with visual content than text-based slides.',
          timestamp: new Date(),
        },
        {
          id: '4',
          type: 'tip',
          content: 'Emily and Michael have been focused for 30+ minutes, consider giving them more advanced material.',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  });
};

export const AiInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInsights = async () => {
      try {
        const data = await fetchInsights();
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setLoading(false);
      }
    };

    getInsights();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'insight':
        return <Zap className="h-5 w-5 text-blue-500" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>Real-time teaching recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-blue-400 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 bg-blue-400 rounded"></div>
                  <div className="h-2 bg-blue-400 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            insights.map((insight) => (
              <div key={insight.id} className="flex items-start space-x-3 p-3 rounded-md bg-secondary/50">
                <div className="mt-0.5">{getIcon(insight.type)}</div>
                <div className="flex-1">
                  <p className="text-sm">{insight.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(insight.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
