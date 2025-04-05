
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small classes or individual tutors.",
    features: [
      "Up to 25 students",
      "Basic screen monitoring",
      "Simple engagement metrics",
      "7-day data history",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for medium-sized classes with advanced needs.",
    features: [
      "Up to 100 students",
      "Advanced screen monitoring",
      "Full engagement analytics",
      "AI-powered insights",
      "30-day data history",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For educational institutions with large-scale requirements.",
    features: [
      "Unlimited students",
      "Custom integrations",
      "Advanced AI analytics",
      "90-day data history",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom reporting",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-16 md:py-24" id="pricing">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your educational needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-lg border ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg relative' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 mr-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                <Button 
                  className={`w-full ${
                    plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
