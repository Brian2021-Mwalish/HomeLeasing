import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '@/types';
import { Link } from 'react-router-dom';
import { Bed, Bath, Star } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (price: number) => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div style="
        background: hsl(222, 47%, 20%);
        color: white;
        padding: 6px 10px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        font-family: 'DM Sans', sans-serif;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 2px solid hsl(38, 92%, 50%);
        white-space: nowrap;
      ">
        Ksh ${(price / 1000).toFixed(1)}k
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 30],
  });
};

interface MapViewProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  onPropertyClick?: (property: Property) => void;
  selectedPropertyId?: string;
  className?: string;
}

const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapView = ({
  properties,
  center = [40.7128, -74.006],
  zoom = 12,
  selectedPropertyId,
  className = '',
}: MapViewProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full min-h-[400px]"
        scrollWheelZoom={true}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createCustomIcon(property.rent)}
          >
            <Popup className="property-popup">
              <Link to={`/property/${property.id}`} className="block">
                <div className="w-64">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-lg font-bold text-primary mt-1">
                      Ksh {property.rent.toLocaleString()}/mo
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        {property.bathrooms}
                      </span>
                      {property.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                          {property.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
