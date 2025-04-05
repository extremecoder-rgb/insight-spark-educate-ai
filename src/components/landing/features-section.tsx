
import { Activity, Lightbulb, Monitor, BrainCircuit, Eye, TrendingUp } from 'lucide-react';

const features = [
  {
    title: "Screen Monitoring",
    description: "Track student screen activity in real-time with privacy controls and secure data handling.",
    icon: Monitor,
  },
  {
    title: "Real-time Insights",
    description: "Get immediate feedback on student focus, engagement levels, and learning patterns.",
    icon: Activity,
  },
  {
    title: "AI Analysis",
    description: "Advanced machine learning models identify attention patterns and provide actionable insights.",
    icon: BrainCircuit,
  },
  {
    title: "Focus Detection",
    description: "Track when students are engaged with learning materials versus being distracted.",
    icon: Eye,
  },
  {
    title: "Engagement Metrics",
    description: "Measure participation, time on task, and interaction frequency with learning content.",
    icon: TrendingUp,
  },
  {
    title: "Smart Recommendations",
    description: "Receive AI-generated suggestions to improve student engagement and teaching methods.",
    icon: Lightbulb,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50" id="features">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Educators</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and improve student engagement in virtual classrooms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-background"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
