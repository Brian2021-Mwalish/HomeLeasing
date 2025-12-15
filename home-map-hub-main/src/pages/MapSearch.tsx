import { useState, useMemo } from 'react';
import { mockProperties } from '@/data/mockData';
import { SearchFilters as SearchFiltersType } from '@/types';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin } from 'lucide-react';

const MapSearch = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({});

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      if (filters.location) {
        const search = filters.location.toLowerCase();
        const matchesLocation =
          property.city.toLowerCase().includes(search) ||
          property.address.toLowerCase().includes(search);
        if (!matchesLocation) return false;
      }
      if (filters.type && property.type !== filters.type) return false;
      if (filters.minPrice && property.rent < filters.minPrice) return false;
      if (filters.maxPrice && property.rent > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-[420px] border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
              Map Search
            </h1>
            <SearchFilters onFilter={setFilters} compact />
          </div>
          
          <div className="p-4 border-b border-border bg-muted">
            <p className="text-sm text-muted-foreground">
              {filteredProperties.length} properties found
            </p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Map Placeholder */}
        <div className="flex-1 min-h-[400px] lg:min-h-0 bg-muted flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h2>
            <p className="text-muted-foreground max-w-md">
              The interactive map displays all {filteredProperties.length} properties. 
              Click on markers to view property details and explore different neighborhoods.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapSearch;
