
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StudentData } from './student-card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/components/theme-provider';

// Sample focus data - would be replaced with real API data
const focusData = [
  { time: '9:00', focus: 80 },
  { time: '9:05', focus: 85 },
  { time: '9:10', focus: 90 },
  { time: '9:15', focus: 75 },
  { time: '9:20', focus: 60 },
  { time: '9:25', focus: 65 },
  { time: '9:30', focus: 85 },
  { time: '9:35', focus: 90 },
  { time: '9:40', focus: 85 },
];

// Sample activity log
const activityLog = [
  { time: '9:32:15', event: 'Viewing lecture slides', type: 'focused' },
  { time: '9:27:42', event: 'Taking notes', type: 'focused' },
  { time: '9:25:18', event: 'Switched to different tab', type: 'distracted' },
  { time: '9:22:05', event: 'Returned to lecture', type: 'focused' },
  { time: '9:18:33', event: 'Inactive for 2 minutes', type: 'distracted' },
  { time: '9:15:12', event: 'Viewing lecture slides', type: 'focused' },
];

interface StudentDetailsDialogProps {
  student: StudentData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailsDialog = ({ student, isOpen, onClose }: StudentDetailsDialogProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            Detailed analytics for {student.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="font-medium text-lg">{student.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-sm text-muted-foreground">Session ID: {student.id}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm text-white ${
              student.status === 'focused' 
                ? 'bg-green-500' 
                : student.status === 'distracted' 
                  ? 'bg-yellow-500' 
                  : 'bg-gray-300'
            }`}>
              <span className="capitalize">{student.status}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Focus Score</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{student.focusScore}%</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {student.focusScore > 75 ? 'Excellent' : student.focusScore > 50 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
              <Progress value={student.focusScore} className="h-2" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">AI Insight</p>
              <p className="text-sm">{student.insight}</p>
            </div>
          </div>
          
          <Tabs defaultValue="focus" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="focus">Focus Timeline</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="focus" className="pt-4">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={focusData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="time" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                    <YAxis
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="focus"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="pt-4">
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                {activityLog.map((log, index) => (
                  <div
                    key={index}
                    className="text-sm p-2 border-l-2 rounded-r-sm bg-secondary/30"
                    style={{
                      borderLeftColor:
                        log.type === 'focused' ? '#22c55e' : log.type === 'distracted' ? '#eab308' : '#6b7280',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{log.event}</span>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
