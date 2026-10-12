export type ReservationStatus = 
  | 'demo_reservation'
  | 'enquiry_submitted'
  | 'pending'
  | 'confirmed'
  | 'cancelled';

export type PaymentStatus = 
  | 'unpaid'
  | 'simulated_paid'
  | 'failed'
  | 'refunded';

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: 'Deluxe' | 'Executive' | 'Suite' | 'Villa';
  description: string;
  longDescription: string;
  basePrice: number; // Demo rate in INR
  occupancy: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  bedConfiguration: string;
  sizeSqFt: number;
  images: string[];
  amenities: string[];
  features: string[];
  availableUnits: number;
  isPopular?: boolean;
}

export interface Reservation {
  id: string;
  referenceNumber: string;
  roomTypeId: string;
  roomName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  pricing: {
    baseRatePerNight: number;
    subtotal: number;
    serviceFee: number;
    taxes: number; // GST 12% or 18%
    total: number;
  };
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    method: string;
    transactionId: string;
    paidAt: string;
  };
  createdAt: string;
  updatedAt: string;
  isDemoRecord: boolean;
}

export interface EventEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: 'Wedding' | 'Reception' | 'Banquet' | 'Family Celebration' | 'Corporate Event' | 'Other';
  preferredDate: string;
  guestCount: number;
  preferredVenue: string;
  budgetRange?: string;
  additionalRequirements?: string;
  status: 'new' | 'contacted' | 'site_visit' | 'confirmed' | 'declined';
  notes?: string;
  createdAt: string;
}

export interface RestaurantEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  guestCount: number;
  seatingArea: 'Indoor Fine Dining' | 'Verandah Courtyard' | 'Poolside Gazebo' | 'Private Dining';
  specialOccasion?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SiteSettings {
  resortName: string;
  location: string;
  phone: string;
  instagram: string;
  email: string;
  demoNoticeEnabled: boolean;
  demoNoticeText: string;
  gstRatePercent: number;
  serviceChargePercent: number;
  currencySymbol: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Resort Manager' | 'Front Desk';
}
