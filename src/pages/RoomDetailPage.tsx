import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { BackendService } from '../services/backend';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { 
  Users, 
  Bed, 
  Maximize2, 
  Check, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export function RoomDetailPage() {
  const { routeParams, navigate } = useRouter();
  const roomId = routeParams.roomId;
  const room = BackendService.getRoomByIdOrSlug(roomId || '');

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = (base?: string) => {
    const d = base ? new Date(base) : new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(getTodayStr());
  const [checkOut, setCheckOut] = useState(getTomorrowStr());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);

  const [availabilityResult, setAvailabilityResult] = useState<{
    checked: boolean;
    isAvailable: boolean;
    availableCount: number;
    error?: string;
  }>({ checked: false, isAvailable: true, availableCount: 0 });

  if (!room) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl text-[#17382B] dark:text-[#F4EFE8] mb-3">
          Room Category Not Found
        </h2>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mb-6">
          The requested accommodation page could not be located in our demo catalog.
        </p>
        <button
          onClick={() => navigate('/stay')}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white"
        >
          Return to Accommodations
        </button>
      </div>
    );
  }

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const res = BackendService.checkRoomAvailability(room.id, checkIn, checkOut, roomsCount);
    setAvailabilityResult({
      checked: true,
      isAvailable: res.isAvailable,
      availableCount: res.availableCount,
      error: res.error,
    });
  };

  const handleProceedToBooking = () => {
    navigate('/booking', {
      roomId: room.id,
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: roomsCount.toString(),
    });
  };

  const pricing = BackendService.calculatePrice(room.id, checkIn, checkOut, roomsCount);

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/stay')}
          className="inline-flex items-center gap-1.5 text-xs text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Rooms</span>
        </button>

        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E6DDCF] dark:border-[#25362E]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67]">
                {room.category} Category
              </span>
              <span className="text-xs text-[#A8B6AE]">·</span>
              <span className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                {room.bedConfiguration}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#17382B] dark:text-[#F4EFE8]">
              {room.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] mt-1">
              {room.subtitle}
            </p>
          </div>

          <div className="text-left lg:text-right">
            <span className="font-serif text-3xl font-bold text-[#17382B] dark:text-[#C59F67]">
              ₹{room.basePrice.toLocaleString()}
            </span>
            <span className="text-xs text-[#5E6963] dark:text-[#95A39B] block">
              per night (Concept Demo Tariff)
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-4 mb-12">
          {/* Main Large Image */}
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
            <ImageWithFallback
              src={room.images[activeImageIndex] || room.images[0]}
              alt={room.name}
              fallbackTitle={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnails */}
          {room.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#B88E52] scale-102 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${room.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Layout: Details + Availability Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Room Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#F4EFE6] dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] text-center">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
                  Max Guests
                </span>
                <span className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                  {room.occupancy.maxGuests} Persons
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
                  Bed Setup
                </span>
                <span className="font-serif text-base font-semibold text-[#18201C] dark:text-[#F4EFE8] truncate block px-1">
                  {room.bedConfiguration}
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
                  Room Dimensions
                </span>
                <span className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                  {room.sizeSqFt} sq.ft.
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8] font-semibold">
                About This Room
              </h2>
              <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                {room.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="font-serif text-lg text-[#17382B] dark:text-[#F4EFE8] font-semibold">
                Signature Room Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#4A5550] dark:text-[#A7B5AD]">
                    <Sparkles className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Amenities */}
            <div className="space-y-4">
              <h2 className="font-serif text-lg text-[#17382B] dark:text-[#F4EFE8] font-semibold">
                Room Amenities &amp; Inclusions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 p-5 rounded-xl border border-[#E6DDCF] dark:border-[#25362E] bg-white dark:bg-[#121C17]">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#5E6963] dark:text-[#95A39B]">
                    <Check className="w-3.5 h-3.5 text-[#B88E52] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Booking & Availability Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-7 shadow-md space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#17382B] dark:text-[#F4EFE8] mb-1">
                  Reserve This Room
                </h3>
                <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                  Simulate availability check and reservation workflow.
                </p>
              </div>

              <form onSubmit={handleCheckAvailability} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      min={getTodayStr()}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        setAvailabilityResult({ checked: false, isAvailable: true, availableCount: 0 });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      min={getTomorrowStr(checkIn)}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setAvailabilityResult({ checked: false, isAvailable: true, availableCount: 0 });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Children
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Rooms
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    >
                      {[1, 2, 3].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#B88E52] text-[#17382B] dark:text-[#C59F67] hover:bg-[#F4EFE6] dark:hover:bg-[#182620] transition-colors"
                >
                  Verify Inventory for Dates
                </button>
              </form>

              {/* Availability check banner */}
              {availabilityResult.checked && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                    availabilityResult.isAvailable
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50'
                      : 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/50'
                  }`}
                >
                  {availabilityResult.isAvailable ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold block">
                      {availabilityResult.isAvailable
                        ? `Available: ${availabilityResult.availableCount} room(s) open`
                        : 'Selected category fully booked for these dates'}
                    </span>
                    <span className="text-[11px] opacity-80">
                      {availabilityResult.isAvailable
                        ? 'You can proceed to review the demo total and finalize reservation.'
                        : 'Please adjust dates or explore another room category.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="pt-3 border-t border-[#E6DDCF] dark:border-[#25362E] space-y-2 text-xs">
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>
                    ₹{room.basePrice.toLocaleString()} × {pricing.nights} night(s) × {pricing.roomsCount} room
                  </span>
                  <span>₹{pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Service Fee (5%)</span>
                  <span>₹{pricing.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>GST Taxes (12%)</span>
                  <span>₹{pricing.taxes.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#E6DDCF]/60 dark:border-[#25362E]/60 flex justify-between items-baseline font-semibold text-sm text-[#18201C] dark:text-[#F4EFE8]">
                  <span>Total Estimated Amount</span>
                  <span className="font-serif text-lg text-[#17382B] dark:text-[#C59F67]">
                    ₹{pricing.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] shadow-md transition-colors"
              >
                Proceed to Reservation Form
              </button>

              <div className="text-[11px] text-[#A8B6AE] text-center">
                Demo Booking System · No real payment collected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
