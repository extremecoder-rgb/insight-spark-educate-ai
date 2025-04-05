
const testimonials = [
  {
    quote: "LiveInsight has transformed my virtual classroom. I can now understand when my students are struggling and adjust my teaching accordingly.",
    author: "Dr. Sarah Johnson",
    role: "University Professor",
  },
  {
    quote: "The real-time feedback helps me identify which students need additional support, making my online tutoring sessions much more effective.",
    author: "Michael Chen",
    role: "High School Teacher",
  },
  {
    quote: "As an administrator, the analytics provided by LiveInsight have helped us improve our entire online education program across all departments.",
    author: "Rebecca Martinez",
    role: "School Principal",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Educators Are Saying</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LiveInsight is helping educators transform their virtual classrooms around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background p-8 rounded-lg border border-border relative"
            >
              <div className="mb-6">
                <svg 
                  className="h-10 w-10 text-primary/20" 
                  fill="currentColor" 
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <p className="mb-6 text-lg">{testimonial.quote}</p>
              
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
