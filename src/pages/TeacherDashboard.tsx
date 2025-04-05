
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, BarChartBig, Clock, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StudentCard, StudentData } from '@/components/dashboard/student-card';
import { MetricsCard } from '@/components/dashboard/metrics-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { AiInsights } from '@/components/dashboard/ai-insights';
import { StudentDetailsDialog } from '@/components/dashboard/student-details-dialog';

// Sample student data - would be replaced with real API data
const mockStudents: StudentData[] = [
  {
    id: "s1",
    name: "Emily Johnson",
    avatar: "",
    focusScore: 92,
    activeTime: 1845,
    status: "focused",
    insight: "Highly engaged, showing consistent focus patterns."
  },
  {
    id: "s2",
    name: "Michael Chen",
    avatar: "",
    focusScore: 78,
    activeTime: 1720,
    status: "focused",
    insight: "Good engagement, occasional tab switching."
  },
  {
    id: "s3",
    name: "Sarah Williams",
    avatar: "",
    focusScore: 45,
    activeTime: 1100,
    status: "distracted",
    insight: "Frequent tab switching, possible difficulty with material."
  },
  {
    id: "s4",
    name: "David Kim",
    avatar: "",
    focusScore: 88,
    activeTime: 1800,
    status: "focused",
    insight: "Strong focus on coding exercises, good progress."
  },
  {
    id: "s5",
    name: "Jessica Martinez",
    avatar: "",
    focusScore: 52,
    activeTime: 1250,
    status: "distracted",
    insight: "Several inactive periods detected, may need assistance."
  },
  {
    id: "s6",
    name: "Ryan Thompson",
    avatar: "",
    focusScore: 71,
    activeTime: 1650,
    status: "focused",
    insight: "Average focus level, shows improvement in last 15 minutes."
  },
  {
    id: "s7",
    name: "Sophia Garcia",
    avatar: "",
    focusScore: 63,
    activeTime: 1375,
    status: "distracted",
    insight: "Split attention between lecture and external websites."
  },
  {
    id: "s8",
    name: "Alex Wilson",
    avatar: "",
    focusScore: 85,
    activeTime: 1760,
    status: "focused",
    insight: "Taking detailed notes, high engagement with materials."
  },
];

const TeacherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Filter students based on search query
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const viewStudentDetails = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setDetailsOpen(true);
    }
  };
  
  // Calculate class metrics
  const averageFocusScore = Math.round(
    mockStudents.reduce((sum, student) => sum + student.focusScore, 0) / mockStudents.length
  );
  
  const focusedStudentsCount = mockStudents.filter(s => s.status === 'focused').length;
  const focusedPercentage = Math.round((focusedStudentsCount / mockStudents.length) * 100);
  
  const classSessionTime = 45; // in minutes

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Monitor student engagement in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 w-[200px] md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>End Session</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Class Size"
            value={mockStudents.length}
            description="Total students in session"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricsCard
            title="Average Focus"
            value={`${averageFocusScore}%`}
            description="Class attention level"
            icon={<BarChartBig className="h-5 w-5" />}
            trend={{ value: 5, label: "vs last week", positive: true }}
          />
          <MetricsCard
            title="Session Duration"
            value={`${classSessionTime} min`}
            description="Current class session"
            icon={<Clock className="h-5 w-5" />}
          />
          <MetricsCard
            title="Focused Students"
            value={`${focusedPercentage}%`}
            description={`${focusedStudentsCount} of ${mockStudents.length} students`}
            icon={<Zap className="h-5 w-5" />}
          />
        </div>
        
        <Tabs defaultValue="students" className="mb-8">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="insights">Class Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStudents.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={viewStudentDetails}
                />
              ))}
              {filteredStudents.length === 0 && (
                <div className="col-span-full p-8 text-center">
                  <p className="text-muted-foreground">No students found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="insights" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ActivityChart />
              <AiInsights />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      
      <StudentDetailsDialog
        student={selectedStudent}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
};

export default TeacherDashboard;
