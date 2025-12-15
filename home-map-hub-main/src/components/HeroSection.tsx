import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Home, Shield } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?location=${encodeURIComponent(searchQuery)}`);
  };

  const stats = [
    { icon: Home, value: '10K+', label: 'Properties' },
    { icon: MapPin, value: '50+', label: 'Cities' },
    { icon: Shield, value: '99%', label: 'Satisfaction' },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      
      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in">
            Find Your Perfect
            <span className="block text-secondary">Home Today</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover thousands of rental properties across the city. Connect directly with landlords and agents for a seamless leasing experience.
          </p>

          {/* Search Bar */}
          <div 
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter city, neighborhood, or address"
                className="pl-12 h-14 text-base bg-card border-0 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              variant="hero" 
              size="xl"
              className="h-14"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Quick Links */}
          <div 
            className="mt-6 flex flex-wrap gap-2 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-primary-foreground/60 text-sm">Popular:</span>
            {['New York', 'Brooklyn', 'Manhattan', 'Queens'].map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSearchQuery(city);
                  navigate(`/properties?location=${encodeURIComponent(city)}`);
                }}
                className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors underline-offset-2 hover:underline"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div 
            className="mt-12 grid grid-cols-3 gap-8 max-w-md animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto text-secondary mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
