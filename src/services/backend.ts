import { 
  RoomType, 
  Reservation, 
  EventEnquiry, 
  RestaurantEnquiry, 
  ContactEnquiry, 
  SiteSettings, 
  AdminUser,
  ReservationStatus 
} from '../types';
import { INITIAL_ROOMS, INITIAL_SITE_SETTINGS } from '../data/mockData';

const DB_KEY = 'rajmahal_resort_db_v1';

interface DatabaseSchema {
  rooms: RoomType[];
  reservations: Reservation[];
  eventEnquiries: EventEnquiry[];
  restaurantEnquiries: RestaurantEnquiry[];
  contactEnquiries: ContactEnquiry[];
  settings: SiteSettings;
  adminUsers: AdminUser[];
}

const SEED_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    referenceNumber: 'RRB-2026-8812',
    roomTypeId: 'room-executive-poolside',
    roomName: 'Executive Poolside Room',
    checkIn: '2026-10-18',
    checkOut: '2026-10-21',
    nights: 3,
    adults: 2,
    children: 1,
    roomsCount: 1,
    guest: {
      fullName: 'Pranjal Barua',
      email: 'pbarua.assam@example.com',
      phone: '+91 98640 12345',
      specialRequests: 'Late evening check-in around 8 PM. Ground floor preference.',
    },
    pricing: {
      baseRatePerNight: 5400,
      subtotal: 16200,
      serviceFee: 810,
      taxes: 1944,
      total: 18954,
    },
    status: 'confirmed',
    paymentStatus: 'simulated_paid',
    paymentDetails: {
      method: 'Razorpay UPI (Demo)',
      transactionId: 'pay_sim_982187391',
      paidAt: '2026-10-10T14:32:00Z',
    },
    createdAt: '2026-10-10T14:30:00Z',
    updatedAt: '2026-10-10T14:32:00Z',
    isDemoRecord: true,
  },
  {
    id: 'res-102',
    referenceNumber: 'RRB-2026-6421',
    roomTypeId: 'room-royal-suite',
    roomName: 'Royal Heritage Suite',
    checkIn: '2026-10-24',
    checkOut: '2026-10-27',
    nights: 3,
    adults: 2,
    children: 0,
    roomsCount: 1,
    guest: {
      fullName: 'Rituparna Dutta',
      email: 'r.dutta@example.com',
      phone: '+91 94350 98765',
      specialRequests: 'Anniversary celebration setup with seasonal flower bouquet in room.',
    },
    pricing: {
      baseRatePerNight: 8900,
      subtotal: 26700,
      serviceFee: 1335,
      taxes: 3204,
      total: 31239,
    },
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: '2026-10-11T09:15:00Z',
    updatedAt: '2026-10-11T09:15:00Z',
    isDemoRecord: true,
  },
  {
    id: 'res-103',
    referenceNumber: 'RRB-2026-3190',
    roomTypeId: 'room-deluxe-garden',
    roomName: 'Deluxe Garden Room',
    checkIn: '2026-10-14',
    checkOut: '2026-10-16',
    nights: 2,
    adults: 2,
    children: 1,
    roomsCount: 1,
    guest: {
      fullName: 'Kalyan Sarma',
      email: 'ksarma@example.com',
      phone: '+91 97060 45678',
      specialRequests: 'Baby cot required.',
    },
    pricing: {
      baseRatePerNight: 3800,
      subtotal: 7600,
      serviceFee: 380,
      taxes: 912,
      total: 8892,
    },
    status: 'demo_reservation',
    paymentStatus: 'unpaid',
    createdAt: '2026-10-11T16:20:00Z',
    updatedAt: '2026-10-11T16:20:00Z',
    isDemoRecord: true,
  },
];

const SEED_EVENTS: EventEnquiry[] = [
  {
    id: 'eve-201',
    referenceNumber: 'EVE-2026-9042',
    fullName: 'Anuradha Goswami & Partha Sen',
    phone: '+91 98540 22331',
    email: 'anuradha.wedding@example.com',
    eventType: 'Wedding',
    preferredDate: '2026-11-20',
    guestCount: 650,
    preferredVenue: 'Mahal Grand Banquet Hall + Royal Garden Lawn',
    budgetRange: '₹8,00,000 - ₹12,00,000',
    additionalRequirements: 'Require both banquet ballroom for reception and garden lawn for mandap ceremony. Catering for 650 guests with regional sweets counter.',
    status: 'site_visit',
    notes: 'Site visit scheduled for Oct 16. Spoke to bride’s father.',
    createdAt: '2026-10-09T11:00:00Z',
  },
  {
    id: 'eve-202',
    referenceNumber: 'EVE-2026-5120',
    fullName: 'Dr. Manas Bora (Assam Medical Association)',
    phone: '+91 94351 77889',
    email: 'dr.bora@ama-assam.org',
    eventType: 'Corporate Event',
    preferredDate: '2026-11-05',
    guestCount: 120,
    preferredVenue: 'Mahal Grand Banquet Hall',
    budgetRange: '₹1,50,000 - ₹2,50,000',
    additionalRequirements: 'Annual continuing medical conference with projector stage, hi-tea, and buffet lunch.',
    status: 'new',
    notes: 'Awaiting front desk quotation review.',
    createdAt: '2026-10-12T05:30:00Z',
  },
];

const SEED_DINING: RestaurantEnquiry[] = [
  {
    id: 'din-301',
    referenceNumber: 'DIN-2026-1102',
    fullName: 'Bikash Kalita',
    phone: '+91 96780 44556',
    email: 'bkalita@example.com',
    preferredDate: '2026-10-15',
    preferredTime: '8:00 PM',
    guestCount: 6,
    seatingArea: 'Indoor Fine Dining',
    specialOccasion: 'Family Birthday Dinner',
    status: 'confirmed',
    createdAt: '2026-10-11T10:00:00Z',
  },
];

function getDB(): DatabaseSchema {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading DB from localStorage', e);
  }

  // Initialize DB
  const initial: DatabaseSchema = {
    rooms: INITIAL_ROOMS,
    reservations: SEED_RESERVATIONS,
    eventEnquiries: SEED_EVENTS,
    restaurantEnquiries: SEED_DINING,
    contactEnquiries: [],
    settings: INITIAL_SITE_SETTINGS,
    adminUsers: [
      {
        id: 'admin-01',
        name: 'Resort Administrator',
        email: 'admin@rajmahalresort.com',
        role: 'Super Admin',
      },
    ],
  };

  saveDB(initial);
  return initial;
}

function saveDB(db: DatabaseSchema) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Failed saving DB to localStorage', e);
  }
}

export const BackendService = {
  // Rooms
  getRooms(): RoomType[] {
    return getDB().rooms;
  },

  getRoomByIdOrSlug(idOrSlug: string): RoomType | undefined {
    const rooms = getDB().rooms;
    return rooms.find((r) => r.id === idOrSlug || r.slug === idOrSlug);
  },

  updateRoom(roomId: string, updates: Partial<RoomType>): RoomType {
    const db = getDB();
    const index = db.rooms.findIndex((r) => r.id === roomId);
    if (index === -1) throw new Error('Room not found');
    db.rooms[index] = { ...db.rooms[index], ...updates };
    saveDB(db);
    return db.rooms[index];
  },

  // Check Availability
  checkRoomAvailability(roomTypeId: string, checkIn: string, checkOut: string, roomsNeeded: number = 1): {
    isAvailable: boolean;
    availableCount: number;
    error?: string;
  } {
    const db = getDB();
    const room = db.rooms.find((r) => r.id === roomTypeId);
    if (!room) return { isAvailable: false, availableCount: 0, error: 'Room category not found' };

    const inDate = new Date(checkIn).getTime();
    const outDate = new Date(checkOut).getTime();

    if (isNaN(inDate) || isNaN(outDate) || outDate <= inDate) {
      return { isAvailable: false, availableCount: 0, error: 'Check-out date must be after check-in date' };
    }

    // Check overlap with active reservations
    const overlapping = db.reservations.filter((res) => {
      if (res.roomTypeId !== roomTypeId) return false;
      if (res.status === 'cancelled') return false;

      const resIn = new Date(res.checkIn).getTime();
      const resOut = new Date(res.checkOut).getTime();

      // Overlap condition: (StartA < EndB) and (EndA > StartB)
      return inDate < resOut && outDate > resIn;
    });

    const bookedUnits = overlapping.reduce((sum, res) => sum + (res.roomsCount || 1), 0);
    const availableCount = Math.max(0, room.availableUnits - bookedUnits);

    return {
      isAvailable: availableCount >= roomsNeeded,
      availableCount,
    };
  },

  // Calculate pricing breakdown on server-side logic
  calculatePrice(roomTypeId: string, checkIn: string, checkOut: string, roomsCount: number = 1) {
    const db = getDB();
    const room = db.rooms.find((r) => r.id === roomTypeId);
    if (!room) throw new Error('Invalid room category');

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

    const baseRatePerNight = room.basePrice;
    const subtotal = baseRatePerNight * nights * roomsCount;
    const serviceFee = Math.round(subtotal * (db.settings.serviceChargePercent / 100));
    const taxes = Math.round(subtotal * (db.settings.gstRatePercent / 100));
    const total = subtotal + serviceFee + taxes;

    return {
      nights,
      roomsCount,
      baseRatePerNight,
      subtotal,
      serviceFee,
      taxes,
      total,
    };
  },

  // Create Reservation
  createReservation(params: {
    roomTypeId: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomsCount: number;
    guest: {
      fullName: string;
      email: string;
      phone: string;
      specialRequests?: string;
    };
    isDemoOnly?: boolean;
  }): Reservation {
    const db = getDB();
    const room = db.rooms.find((r) => r.id === params.roomTypeId);
    if (!room) throw new Error('Selected room is invalid');

    // Concurrency / availability verification
    const avail = this.checkRoomAvailability(params.roomTypeId, params.checkIn, params.checkOut, params.roomsCount);
    if (!avail.isAvailable) {
      throw new Error(`Insufficient rooms available for selected dates (Available: ${avail.availableCount})`);
    }

    const pricing = this.calculatePrice(params.roomTypeId, params.checkIn, params.checkOut, params.roomsCount);
    const refNum = `RRB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      referenceNumber: refNum,
      roomTypeId: room.id,
      roomName: room.name,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      nights: pricing.nights,
      adults: params.adults,
      children: params.children,
      roomsCount: params.roomsCount,
      guest: params.guest,
      pricing,
      status: 'pending', // Starts pending until payment or staff confirmation
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoRecord: true,
    };

    db.reservations.unshift(newReservation);
    saveDB(db);
    return newReservation;
  },

  // Process Simulated Payment
  simulatePayment(reservationId: string, outcome: 'success' | 'failure'): { success: boolean; reservation: Reservation } {
    const db = getDB();
    const index = db.reservations.findIndex((r) => r.id === reservationId);
    if (index === -1) throw new Error('Reservation record not found');

    const res = db.reservations[index];

    if (outcome === 'success') {
      res.paymentStatus = 'simulated_paid';
      res.status = 'confirmed'; // Confirmed upon payment completion
      res.paymentDetails = {
        method: 'Razorpay UPI (Demo Simulation)',
        transactionId: `pay_sim_${Date.now()}`,
        paidAt: new Date().toISOString(),
      };
      res.updatedAt = new Date().toISOString();
    } else {
      res.paymentStatus = 'failed';
      res.updatedAt = new Date().toISOString();
    }

    db.reservations[index] = res;
    saveDB(db);
    return { success: outcome === 'success', reservation: res };
  },

  // Fetch reservation by Reference Number or ID
  getReservationByReference(ref: string): Reservation | undefined {
    const db = getDB();
    const cleanRef = ref.trim().toUpperCase();
    return db.reservations.find(
      (r) => r.referenceNumber.toUpperCase() === cleanRef || r.id === ref
    );
  },

  // Update reservation status (Admin)
  updateReservationStatus(reservationId: string, newStatus: ReservationStatus): Reservation {
    const db = getDB();
    const index = db.reservations.findIndex((r) => r.id === reservationId);
    if (index === -1) throw new Error('Reservation not found');
    db.reservations[index].status = newStatus;
    db.reservations[index].updatedAt = new Date().toISOString();
    saveDB(db);
    return db.reservations[index];
  },

  // Cancel reservation
  cancelReservation(reservationId: string, reason?: string): Reservation {
    const db = getDB();
    const index = db.reservations.findIndex((r) => r.id === reservationId);
    if (index === -1) throw new Error('Reservation not found');
    db.reservations[index].status = 'cancelled';
    if (reason) {
      db.reservations[index].guest.specialRequests = (db.reservations[index].guest.specialRequests || '') + ` [Cancellation Note: ${reason}]`;
    }
    db.reservations[index].updatedAt = new Date().toISOString();
    saveDB(db);
    return db.reservations[index];
  },

  getReservations(): Reservation[] {
    return getDB().reservations;
  },

  // Events & Banquet Enquiries
  createEventEnquiry(data: Omit<EventEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): EventEnquiry {
    const db = getDB();
    const refNum = `EVE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: EventEnquiry = {
      ...data,
      id: `eve-${Date.now()}`,
      referenceNumber: refNum,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    db.eventEnquiries.unshift(newEnquiry);
    saveDB(db);
    return newEnquiry;
  },

  getEventEnquiries(): EventEnquiry[] {
    return getDB().eventEnquiries;
  },

  updateEventEnquiryStatus(id: string, status: EventEnquiry['status'], notes?: string): EventEnquiry {
    const db = getDB();
    const index = db.eventEnquiries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enquiry not found');
    db.eventEnquiries[index].status = status;
    if (notes !== undefined) {
      db.eventEnquiries[index].notes = notes;
    }
    saveDB(db);
    return db.eventEnquiries[index];
  },

  // Restaurant Enquiries
  createRestaurantEnquiry(data: Omit<RestaurantEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): RestaurantEnquiry {
    const db = getDB();
    const refNum = `DIN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: RestaurantEnquiry = {
      ...data,
      id: `din-${Date.now()}`,
      referenceNumber: refNum,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    db.restaurantEnquiries.unshift(newEnquiry);
    saveDB(db);
    return newEnquiry;
  },

  getRestaurantEnquiries(): RestaurantEnquiry[] {
    return getDB().restaurantEnquiries;
  },

  updateRestaurantEnquiryStatus(id: string, status: RestaurantEnquiry['status']): RestaurantEnquiry {
    const db = getDB();
    const index = db.restaurantEnquiries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enquiry not found');
    db.restaurantEnquiries[index].status = status;
    saveDB(db);
    return db.restaurantEnquiries[index];
  },

  // Contact Messages
  createContactEnquiry(data: Omit<ContactEnquiry, 'id' | 'createdAt'>): ContactEnquiry {
    const db = getDB();
    const newContact: ContactEnquiry = {
      ...data,
      id: `con-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.contactEnquiries.unshift(newContact);
    saveDB(db);
    return newContact;
  },

  // Site Settings
  getSiteSettings(): SiteSettings {
    return getDB().settings;
  },

  updateSiteSettings(newSettings: Partial<SiteSettings>): SiteSettings {
    const db = getDB();
    db.settings = { ...db.settings, ...newSettings };
    saveDB(db);
    return db.settings;
  },

  // Admin Dashboard Statistics
  getAdminStats() {
    const db = getDB();
    const todayStr = new Date().toISOString().split('T')[0];

    const totalReservations = db.reservations.length;
    const pendingReservations = db.reservations.filter((r) => r.status === 'pending').length;
    const confirmedReservations = db.reservations.filter((r) => r.status === 'confirmed').length;
    const demoReservations = db.reservations.filter((r) => r.status === 'demo_reservation').length;

    const upcomingCheckIns = db.reservations.filter(
      (r) => r.status === 'confirmed' && r.checkIn >= todayStr
    ).length;

    const upcomingCheckOuts = db.reservations.filter(
      (r) => r.status === 'confirmed' && r.checkOut >= todayStr
    ).length;

    const eventEnquiriesCount = db.eventEnquiries.length;
    const restaurantEnquiriesCount = db.restaurantEnquiries.length;

    // Revenue only from verified simulated payments
    const verifiedRevenue = db.reservations
      .filter((r) => r.paymentStatus === 'simulated_paid')
      .reduce((sum, r) => sum + r.pricing.total, 0);

    return {
      totalReservations,
      pendingReservations,
      confirmedReservations,
      demoReservations,
      upcomingCheckIns,
      upcomingCheckOuts,
      eventEnquiriesCount,
      restaurantEnquiriesCount,
      verifiedRevenue,
    };
  },
};
