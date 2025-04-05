
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare, AlertTriangle } from 'lucide-react';

export interface StudentData {
  id: string;
  name: string;
  avatar: string;
  focusScore: number;
  activeTime: number;
  status: 'focused' | 'distracted' | 'inactive';
  insight: string;
}

interface StudentCardProps {
  student: StudentData;
  onViewDetails: (studentId: string) => void;
}

export const StudentCard = ({ student, onViewDetails }: StudentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'focused':
        return 'bg-green-500';
      case 'distracted':
        return 'bg-yellow-500';
      case 'inactive':
        return 'bg-gray-300';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'focused':
        return <Eye className="h-4 w-4" />;
      case 'distracted':
        return <AlertTriangle className="h-4 w-4" />;
      case 'inactive':
        return null;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              {student.avatar ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="font-medium">{student.name.charAt(0)}</span>
              )}
            </div>
            <CardTitle className="text-lg">{student.name}</CardTitle>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs text-white flex items-center space-x-1 ${getStatusColor(student.status)}`}>
            {getStatusIcon(student.status)}
            <span className="capitalize">{student.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Focus Score</span>
              <span className="font-medium">{student.focusScore}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  student.focusScore > 70 
                    ? 'bg-green-500' 
                    : student.focusScore > 40 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${student.focusScore}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Time</span>
            <span>{formatTime(student.activeTime)}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex items-start space-x-2">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded text-blue-600 dark:text-blue-400 mt-0.5">
                <MessageSquare className="h-3.5 w-3.5" />
              </div>
              <p className="text-sm text-muted-foreground">{student.insight}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onViewDetails(student.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
