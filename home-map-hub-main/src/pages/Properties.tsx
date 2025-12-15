import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProperties } from '@/data/mockData';
import { SearchFilters as SearchFiltersType, Property } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: initialLocation,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      if (filters.location) {
        const search = filters.location.toLowerCase();
        const matchesLocation =
          property.city.toLowerCase().includes(search) ||
          property.address.toLowerCase().includes(search) ||
          property.title.toLowerCase().includes(search);
        if (!matchesLocation) return false;
      }
      if (filters.type && property.type !== filters.type) return false;
      if (filters.minPrice && property.rent < filters.minPrice) return false;
      if (filters.maxPrice && property.rent > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Browse Properties
          </h1>
          <p className="text-muted-foreground">
            {filteredProperties.length} properties available
          </p>
        </div>

        <SearchFilters onFilter={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProperties.length} results
          </p>
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={`mt-6 grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No properties found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilters({})}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
