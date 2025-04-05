
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Virtual Classroom?
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Join thousands of educators who are using LiveInsight to improve student engagement and learning outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="group">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
