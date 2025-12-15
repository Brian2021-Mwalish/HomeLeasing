export type UserRole = 'tenant' | 'landlord' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  verified?: boolean;
  createdAt: Date;
}

export interface Property {
  id: string;
  landlordId: string;
  agentId?: string;
  title: string;
  description: string;
  rent: number;
  type: 'apartment' | 'house' | 'condo' | 'studio' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  size: number; // in sqft
  amenities: string[];
  images: string[];
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  available: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  tenantId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'stripe' | 'paypal' | 'mpesa';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  propertyId?: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: Property['type'];
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}
