import { Link } from 'react-router-dom';
import { Property } from '@/types';
import MapView from './MapView';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';

interface MapSectionProps {
  properties: Property[];
}

const MapSection = ({ properties }: MapSectionProps) => {
  return (
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

        <div className="animate-scale-in">
          <MapView 
            properties={properties} 
            className="h-[500px] rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
