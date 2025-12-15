import { mockProperties } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const MapTeaser = () => (
  <section className="py-20 bg-muted">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">
              Interactive Map
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Explore Properties by Location
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Use our interactive map to find properties in your preferred neighborhood. Click on markers for details.
          </p>
        </div>
        <Link to="/map">
          <Button variant="default" className="group">
            Open Full Map
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="h-[400px] rounded-xl bg-card border border-border flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="h-16 w-16 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map View</h3>
          <p className="text-muted-foreground max-w-md mb-4">
            Explore all {mockProperties.length} properties on our interactive map with custom markers and popups.
          </p>
          <Link to="/map">
            <Button variant="hero">
              <MapPin className="h-4 w-4 mr-2" />
              Launch Map Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProperties properties={mockProperties} />
        <MapTeaser />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
