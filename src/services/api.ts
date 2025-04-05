
// This file provides a mock API for the application
// In a real application, these functions would call actual REST endpoints

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface Session {
  id: string;
  name: string;
  teacherId: string;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed';
  studentCount: number;
}

export interface StudentSession {
  id: string;
  studentId: string;
  sessionId: string;
  joinTime: string;
  leaveTime?: string;
  focusMetrics: {
    averageScore: number;
    screenTime: number;
    attentionSpans: Array<{
      start: string;
      end: string;
      score: number;
    }>;
  };
}

// Mock data
const mockUsers: User[] = [
  { id: 'teacher1', name: 'Prof. Johnson', email: 'teacher@example.com', role: 'teacher' },
  { id: 'student1', name: 'Emily Parker', email: 'student@example.com', role: 'student' },
];

const mockSessions: Session[] = [
  { 
    id: 'session1', 
    name: 'Web Development Fundamentals', 
    teacherId: 'teacher1', 
    startTime: '2025-04-05T09:00:00Z', 
    status: 'active', 
    studentCount: 24 
  },
  { 
    id: 'session2', 
    name: 'Advanced JavaScript', 
    teacherId: 'teacher1', 
    startTime: '2025-04-04T14:00:00Z', 
    endTime: '2025-04-04T15:30:00Z', 
    status: 'completed', 
    studentCount: 18 
  },
];

// Mock API functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }
    
    return user;
  },
  
  register: async (name: string, email: string, password: string, role: 'teacher' | 'student'): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: `user${mockUsers.length + 1}`,
      name,
      email,
      role
    };
    
    mockUsers.push(newUser);
    return newUser;
  },
  
  // Sessions
  createSession: async (teacherId: string, name: string): Promise<Session> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newSession: Session = {
      id: `session${mockSessions.length + 1}`,
      name,
      teacherId,
      startTime: new Date().toISOString(),
      status: 'active',
      studentCount: 0
    };
    
    mockSessions.push(newSession);
    return newSession;
  },
  
  getSessions: async (teacherId: string): Promise<Session[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockSessions.filter(s => s.teacherId === teacherId);
  },
  
  // Student activity
  recordActivity: async (data: {
    sessionId: string;
    studentId: string;
    focusScore: number;
    activityType: string;
  }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Activity recorded:', data);
    // In a real app, this would store data to your database
  },
  
  // AI Analysis
  getAiInsights: async (sessionId: string): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      overallEngagement: Math.floor(Math.random() * 30) + 70,
      attentionTrends: {
        increasing: Math.random() > 0.5,
        rate: Math.floor(Math.random() * 10) - 5
      },
      recommendations: [
        'Students are responding well to interactive content',
        'Consider a short break in the next 10 minutes',
        'The pace may be too fast for some students'
      ]
    };
  }
};
