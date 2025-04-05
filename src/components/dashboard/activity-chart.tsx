
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { useTheme } from '@/components/theme-provider';

// Sample data - would be replaced with real API data
const activityData = [
  { time: '9:00', avgFocus: 85, avgEngagement: 70 },
  { time: '9:15', avgFocus: 75, avgEngagement: 65 },
  { time: '9:30', avgFocus: 90, avgEngagement: 85 },
  { time: '9:45', avgFocus: 65, avgEngagement: 60 },
  { time: '10:00', avgFocus: 70, avgEngagement: 75 },
  { time: '10:15', avgFocus: 80, avgEngagement: 78 },
  { time: '10:30', avgFocus: 75, avgEngagement: 70 },
  { time: '10:45', avgFocus: 60, avgEngagement: 55 },
  { time: '11:00', avgFocus: 85, avgEngagement: 80 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-md shadow-md">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-sm text-blue-500">{`Focus: ${payload[0].value}%`}</p>
        <p className="text-sm text-purple-500">{`Engagement: ${payload[1].value}%`}</p>
      </div>
    );
  }

  return null;
};

export const ActivityChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Class Activity Overview</CardTitle>
        <CardDescription>Average focus and engagement levels during the session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activityData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="time" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
              />
              <YAxis 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="avgFocus"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avgEngagement"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
