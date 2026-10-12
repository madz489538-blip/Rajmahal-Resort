import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { BackendService } from '../services/backend';
import { RoomType, Reservation } from '../types';
import { 
  Calendar, 
  Users, 
  Home, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Sparkles, 
  Lock 
} from 'lucide-react';

export function BookingPage() {
  const { searchParams, navigate } = useRouter();

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = (base?: string) => {
    const d = base ? new Date(base) : new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // URL search query initial states
  const initialCheckIn = searchParams.get('checkIn') || getTodayStr();
  const initialCheckOut = searchParams.get('checkOut') || getTomorrowStr(initialCheckIn);
  const initialAdults = Number(searchParams.get('adults')) || 2;
  const initialChildren = Number(searchParams.get('children')) || 0;
  const initialRooms = Number(searchParams.get('rooms')) || 1;
  const preselectedRoomId = searchParams.get('roomId') || '';

  // Multi-step booking state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(preselectedRoomId ? 2 : 1);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [roomsCount, setRoomsCount] = useState(initialRooms);

  const [availableRooms, setAvailableRooms] = useState<{ room: RoomType; availableCount: number }[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(preselectedRoomId);

  // Guest details form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load available rooms whenever dates or rooms count changes
  useEffect(() => {
    const all = BackendService.getRooms();
    const evaluated = all
      .map((r) => {
        const avail = BackendService.checkRoomAvailability(r.id, checkIn, checkOut, roomsCount);
        return {
          room: r,
          availableCount: avail.availableCount,
        };
      })
      .filter((item) => item.availableCount >= roomsCount);

    setAvailableRooms(evaluated);

    // If previously selected room is no longer valid, fallback
    if (selectedRoomId && !evaluated.some((item) => item.room.id === selectedRoomId)) {
      setSelectedRoomId('');
    } else if (!selectedRoomId && evaluated.length > 0) {
      setSelectedRoomId(evaluated[0].room.id);
    }
  }, [checkIn, checkOut, roomsCount]);

  const selectedRoom = availableRooms.find((r) => r.room.id === selectedRoomId)?.room
    || BackendService.getRooms().find((r) => r.id === selectedRoomId);

  // Calculate nights
  const nights = Math.max(1, Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  ));

  // Server-side recalculation of price breakdown
  const priceSummary = selectedRoom
    ? BackendService.calculatePrice(selectedRoom.id, checkIn, checkOut, roomsCount)
    : null;

  // Validation step 1
  const handleValidateDates = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setFormError('Check-out date must be strictly after check-in date');
      return;
    }
    setFormError(null);
    setCurrentStep(2);
  };

  // Validation step 2
  const handleValidateRoomSelection = () => {
    if (!selectedRoomId) {
      setFormError('Please select a room category to continue');
      return;
    }
    setFormError(null);
    setCurrentStep(3);
  };

  // Submission step 3
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please complete all required guest contact fields.');
      return;
    }

    if (!selectedRoom) {
      setFormError('Please select an available room.');
      return;
    }

    // Validate occupancy limits
    if (adults + children > selectedRoom.occupancy.maxGuests * roomsCount) {
      setFormError(`Selected room configuration allows maximum ${selectedRoom.occupancy.maxGuests * roomsCount} guests.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create reservation on backend service
      const reservation = BackendService.createReservation({
        roomTypeId: selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children,
        roomsCount,
        guest: {
          fullName,
          email,
          phone,
          specialRequests,
        },
      });

      // Navigate to confirmation page
      navigate(`/booking/${reservation.referenceNumber}`);
    } catch (err: any) {
      setIsSubmitting(false);
      setFormError(err.message || 'Failed to submit reservation. Please try again.');
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
            Reservation System
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#17382B] dark:text-[#F4EFE8]">
            Book Your Stay at Rajmahal Resort
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] mt-2">
            Step-by-step reservation journey with server-verified availability and simulated payments.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8 sm:mb-10 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-6 text-xs font-medium min-w-0">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 border-b-2 transition-colors ${
                currentStep >= 1
                  ? 'border-[#B88E52] text-[#17382B] dark:text-[#C59F67] font-semibold'
                  : 'border-transparent text-[#A8B6AE]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#17382B] dark:bg-[#C59F67] text-white dark:text-[#0D1612] text-[11px] flex items-center justify-center shrink-0">
                1
              </span>
              <span className="hidden sm:inline">Dates &amp; Guests</span>
              <span className="sm:hidden text-[11px]">Dates</span>
            </button>

            <span className="text-[#A8B6AE] text-[11px]">/</span>

            <button
              onClick={() => {
                if (currentStep > 2) setCurrentStep(2);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 border-b-2 transition-colors ${
                currentStep >= 2
                  ? 'border-[#B88E52] text-[#17382B] dark:text-[#C59F67] font-semibold'
                  : 'border-transparent text-[#A8B6AE]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#17382B] dark:bg-[#C59F67] text-white dark:text-[#0D1612] text-[11px] flex items-center justify-center shrink-0">
                2
              </span>
              <span className="hidden sm:inline">Select Room</span>
              <span className="sm:hidden text-[11px]">Room</span>
            </button>

            <span className="text-[#A8B6AE] text-[11px]">/</span>

            <span
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 border-b-2 ${
                currentStep === 3
                  ? 'border-[#B88E52] text-[#17382B] dark:text-[#C59F67] font-semibold'
                  : 'border-transparent text-[#A8B6AE]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#17382B] dark:bg-[#C59F67] text-white dark:text-[#0D1612] text-[11px] flex items-center justify-center shrink-0">
                3
              </span>
              <span className="hidden sm:inline">Guest Details</span>
              <span className="sm:hidden text-[11px]">Details</span>
            </span>
          </div>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP 1: Dates & Guests */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8] mb-6">
              1. Choose Dates of Stay
            </h2>
            <form onSubmit={handleValidateDates} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    min={getTodayStr()}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    min={getTomorrowStr(checkIn)}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                    Adults (12+ yrs)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                    Children (Under 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} Child{n === 1 ? '' : 'ren'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                    Number of Rooms
                  </label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E6DDCF] dark:border-[#25362E]">
                <span className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                  Calculated Stay Duration: <strong className="text-[#18201C] dark:text-[#F4EFE8]">{nights} Night(s)</strong>
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] transition-colors flex items-center gap-2"
                >
                  <span>Find Available Rooms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Room Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-[#F4EFE6] dark:bg-[#15231C] p-4 rounded-xl border border-[#E6DDCF] dark:border-[#25362E] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-[#17382B] dark:text-[#C59F67]">Stay Dates:</strong> {checkIn} to {checkOut} ({nights} nights) · {adults} Adults, {children} Children · {roomsCount} Room(s)
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-[#B88E52] dark:text-[#C59F67] underline hover:opacity-80"
              >
                Change Dates
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8]">
                2. Select Available Accommodation
              </h2>

              {availableRooms.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-[#121C17] rounded-xl border border-[#E6DDCF] dark:border-[#25362E]">
                  <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mb-4">
                    No rooms currently match the requested occupancy or dates.
                  </p>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold uppercase bg-[#17382B] text-white"
                  >
                    Adjust Dates or Room Count
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableRooms.map(({ room, availableCount }) => {
                    const isSelected = selectedRoomId === room.id;
                    const rPricing = BackendService.calculatePrice(room.id, checkIn, checkOut, roomsCount);

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-5 rounded-xl border-2 transition-all cursor-pointer bg-white dark:bg-[#121C17] flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#B88E52] ring-1 ring-[#B88E52] shadow-md'
                            : 'border-[#E6DDCF] dark:border-[#25362E] hover:border-[#B88E52]/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-[11px] font-medium uppercase text-[#B88E52] dark:text-[#C59F67] block">
                                {room.category}
                              </span>
                              <h3 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                                {room.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <span className="font-serif text-lg font-bold text-[#17382B] dark:text-[#C59F67]">
                                ₹{rPricing.total.toLocaleString()}
                              </span>
                              <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B] block">
                                total ({nights}n)
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] line-clamp-2 mb-3">
                            {room.description}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-[#4A5550] dark:text-[#A7B5AD] mb-3">
                            <span>Max {room.occupancy.maxGuests} guests</span>
                            <span>·</span>
                            <span>{room.bedConfiguration}</span>
                            <span>·</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                              {availableCount} units open
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#E6DDCF]/50 dark:border-[#25362E]/50 flex items-center justify-between">
                          <span className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                            ₹{room.basePrice.toLocaleString()} / night
                          </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded ${
                              isSelected
                                ? 'bg-[#17382B] text-white dark:bg-[#C59F67] dark:text-[#0D1612]'
                                : 'text-[#17382B] dark:text-[#C59F67]'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-lg text-xs font-medium border border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dates</span>
              </button>
              <button
                onClick={handleValidateRoomSelection}
                disabled={!selectedRoomId}
                className="px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Guest Details & Confirmation */}
        {currentStep === 3 && selectedRoom && priceSummary && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8] mb-6">
                3. Primary Guest Information
              </h2>

              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhaskar Jyoti Das"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Arrival time, extra bed request, dietary preferences, or occasion celebration note."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-sm"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FFF9EE] dark:bg-[#1A261E] border border-[#E6DDCF] dark:border-[#25362E] text-xs text-[#8A6724] dark:text-[#E2C17D]">
                  <p className="leading-relaxed">
                    <strong>Demo Submission:</strong> Submitting will record a pending reservation in the local system and generate a booking reference code. No real payments are processed.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-lg text-xs font-medium border border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]"
                  >
                    Change Room
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Creating Reservation...' : 'Confirm Demo Reservation'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Price Summary Card */}
            <div className="lg:col-span-5 bg-[#F4EFE6] dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-7 shadow-sm space-y-6 h-fit">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8] mb-1">
                  Reservation Summary
                </h3>
                <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                  {selectedRoom.name}
                </p>
              </div>

              <div className="space-y-2 text-xs border-y border-[#E6DDCF] dark:border-[#25362E] py-4">
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Check-In:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">{checkIn}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Check-Out:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">{checkOut}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Duration:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">{nights} Night(s)</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Guests:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">
                    {adults} Adults, {children} Children ({roomsCount} room)
                  </span>
                </div>
              </div>

              {/* Verified Pricing Math */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Room Tariff:</span>
                  <span>₹{priceSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Service Charge (5%):</span>
                  <span>₹{priceSummary.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>GST Taxes (12%):</span>
                  <span>₹{priceSummary.taxes.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-[#E6DDCF] dark:border-[#25362E] flex justify-between items-baseline font-bold text-base text-[#18201C] dark:text-[#F4EFE8]">
                  <span>Grand Total:</span>
                  <span className="font-serif text-xl text-[#17382B] dark:text-[#C59F67]">
                    ₹{priceSummary.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
