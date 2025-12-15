import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { amenityIcons } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden card-hover border-border bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {property.featured && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
              Featured
            </Badge>
          )}
          
          <div className="absolute bottom-3 left-3 right-3">
            <p className="font-serif text-2xl font-bold text-primary-foreground">
              Ksh {property.rent.toLocaleString()}<span className="text-sm font-sans font-normal">/mo</span>
            </p>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{property.address}, {property.city}</span>
          </div>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span>{property.size.toLocaleString()} sqft</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex gap-1">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-sm"
                  title={amenity}
                >
                  {amenityIcons[amenity] || '✨'}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
            
            {property.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviewCount})</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
