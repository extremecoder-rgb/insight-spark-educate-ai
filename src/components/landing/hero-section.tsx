
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 md:pr-8 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Transform Online Teaching with <span className="gradient-text">Real-Time Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:w-[90%]">
              AI-powered student engagement analytics that help educators create more effective learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 animate-scale-in">
            <div className="relative mx-auto h-[400px] w-[90%] md:w-full">
              <div className="relative z-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg h-full shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="LiveInsight Dashboard"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">LiveInsight Dashboard</h3>
                    <p className="max-w-md mx-auto">Real-time student engagement analysis</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-[250px] w-[250px] rounded-full bg-blue-500/20 blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 h-[250px] w-[250px] rounded-full bg-indigo-500/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
