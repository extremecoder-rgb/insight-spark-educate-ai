
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Simple Setup",
    description: "Install our lightweight monitoring agent or use our browser extension for quick classroom setup.",
  },
  {
    number: "02",
    title: "Monitor Activity",
    description: "Get real-time insights into student screen activity with privacy-first monitoring tools.",
  },
  {
    number: "03",
    title: "AI Analysis",
    description: "Our AI analyzes patterns to identify engagement levels and provide actionable feedback.",
  },
  {
    number: "04",
    title: "Improve Teaching",
    description: "Use insights to adapt your teaching methods and boost student engagement and outcomes.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How LiveInsight Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our simple four-step process creates a seamless experience for educators and students alike.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-lg border border-border"
            >
              <span className="block text-4xl font-bold mb-4 text-primary/20">{step.number}</span>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/demo">
            <Button size="lg" variant="outline">
              See It In Action
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
