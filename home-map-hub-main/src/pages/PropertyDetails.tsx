import { useParams, Link } from 'react-router-dom';
import { mockProperties, amenityIcons } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Heart,
  Share2,
  Calendar,
  MessageSquare,
  ChevronLeft,
  Check,
} from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">Property Not Found</h1>
          <p className="mt-2 text-muted-foreground">The property you're looking for doesn't exist.</p>
          <Link to="/properties">
            <Button className="mt-6">Browse Properties</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Back Button */}
        <div className="container pt-6">
          <Link to="/properties">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="capitalize">
                        {property.type}
                      </Badge>
                      {property.featured && (
                        <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                      )}
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}, {property.city}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="font-medium">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span className="font-medium">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-primary" />
                    <span className="font-medium">{property.size.toLocaleString()} sqft</span>
                  </div>
                  {property.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  About This Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                    >
                      <span className="text-xl">{amenityIcons[amenity] || '✨'}</span>
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Location */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Location
                </h2>
                <div className="h-[300px] rounded-xl bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">{property.address}</p>
                    <p className="text-muted-foreground">{property.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-foreground font-serif">
                      ${property.rent.toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">/month</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Tour
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Landlord
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>Available Now</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>Verified Listing</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>Secure Payment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
