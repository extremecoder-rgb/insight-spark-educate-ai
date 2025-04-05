
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
}

export const MetricsCard = ({ title, value, description, icon, trend }: MetricsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <div className="ml-2 text-sm flex items-center">
              <span 
                className={`${
                  trend.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.positive ? "+" : ""}{trend.value}%
              </span>
              <span className="ml-1 text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
