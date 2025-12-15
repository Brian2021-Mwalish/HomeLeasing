import { Search, Calendar, Key, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Properties',
    description: 'Browse thousands of verified listings with detailed filters and map search.',
  },
  {
    icon: MessageSquare,
    title: 'Connect Directly',
    description: 'Message landlords or agents instantly through our secure platform.',
  },
  {
    icon: Calendar,
    title: 'Schedule Viewings',
    description: 'Book property tours at your convenience with real-time availability.',
  },
  {
    icon: Key,
    title: 'Move In',
    description: 'Complete your lease digitally and get your keys. Welcome home!',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Finding your next home has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg">
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
