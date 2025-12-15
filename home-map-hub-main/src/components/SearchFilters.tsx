import { useState } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFiltersProps {
  onFilter: (filters: SearchFiltersType) => void;
  compact?: boolean;
}

const SearchFilters = ({ onFilter, compact = false }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location..."
            className="pl-10 bg-card"
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} variant="default">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">Location</Label>
          <div className="relative mt-1.5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, neighborhood, or address"
              className="pl-10"
              value={filters.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="w-full lg:w-40">
          <Label htmlFor="type" className="text-sm font-medium text-foreground">Property Type</Label>
          <Select
            value={filters.type || ''}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full lg:w-32">
          <Label htmlFor="minPrice" className="text-sm font-medium text-foreground">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="$0"
            className="mt-1.5"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <div className="w-full lg:w-32">
          <Label htmlFor="maxPrice" className="text-sm font-medium text-foreground">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Any"
            className="mt-1.5"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <div className="flex items-end gap-2">
          <Button onClick={handleSearch} variant="hero" size="lg" className="flex-1 lg:flex-none">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          <div className="flex flex-wrap gap-4">
            <div className="w-32">
              <Label htmlFor="bedrooms" className="text-sm font-medium text-foreground">Bedrooms</Label>
              <Select
                value={filters.bedrooms?.toString() || ''}
                onValueChange={(value) => handleChange('bedrooms', value ? Number(value) : undefined)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-32">
              <Label htmlFor="bathrooms" className="text-sm font-medium text-foreground">Bathrooms</Label>
              <Select
                value={filters.bathrooms?.toString() || ''}
                onValueChange={(value) => handleChange('bathrooms', value ? Number(value) : undefined)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
