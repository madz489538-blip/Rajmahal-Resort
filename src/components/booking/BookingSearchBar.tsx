import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { Calendar, Users, Home, Search, ArrowRight } from 'lucide-react';

interface BookingSearchBarProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
  onSearch?: (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
  className?: string;
}

export function BookingSearchBar({
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
  onSearch,
  className = '',
}: BookingSearchBarProps) {
  const { navigate } = useRouter();

  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getTomorrowStr = (baseDate?: string) => {
    const d = baseDate ? new Date(baseDate) : new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(initialCheckIn || getTodayStr());
  const [checkOut, setCheckOut] = useState(initialCheckOut || getTomorrowStr());
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [rooms, setRooms] = useState(initialRooms);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Recalculate nights
  const calculateNights = (inStr: string, outStr: string) => {
    const d1 = new Date(inStr);
    const d2 = new Date(outStr);
    const diff = d2.getTime() - d1.getTime();
    return Math.max(1, Math.round(diff / (1000 * 3600 * 24)));
  };

  const handleCheckInChange = (newIn: string) => {
    setCheckIn(newIn);
    setValidationError(null);
    if (new Date(checkOut) <= new Date(newIn)) {
      setCheckOut(getTomorrowStr(newIn));
    }
  };

  const handleCheckOutChange = (newOut: string) => {
    if (new Date(newOut) <= new Date(checkIn)) {
      setValidationError('Check-out date must be after check-in date');
      return;
    }
    setValidationError(null);
    setCheckOut(newOut);
  };

  const nights = calculateNights(checkIn, checkOut);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setValidationError('Check-out must be after check-in');
      return;
    }

    if (onSearch) {
      onSearch({ checkIn, checkOut, adults, children, rooms });
    } else {
      navigate('/booking', {
        checkIn,
        checkOut,
        adults: adults.toString(),
        children: children.toString(),
        rooms: rooms.toString(),
      });
    }
  };

  return (
    <div
      className={`bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-xl shadow-lg p-3.5 sm:p-6 transition-all ${className}`}
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-end">
          {/* Check-In */}
          <div className="min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B88E52]" />
              Check-In Date
            </label>
            <input
              type="date"
              min={getTodayStr()}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full min-w-0 px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8] focus:outline-none focus:ring-1 focus:ring-[#B88E52]"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B88E52]" />
              Check-Out Date
            </label>
            <input
              type="date"
              min={getTomorrowStr(checkIn)}
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="w-full min-w-0 px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8] focus:outline-none focus:ring-1 focus:ring-[#B88E52]"
              required
            />
          </div>

          {/* Guests */}
          <div className="min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B88E52]" />
              Guests
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full min-w-0 px-2 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8] focus:outline-none focus:ring-1 focus:ring-[#B88E52]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Adult{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>

              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full min-w-0 px-2 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8] focus:outline-none focus:ring-1 focus:ring-[#B88E52]"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} Child{num === 1 ? '' : 'ren'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rooms */}
          <div className="min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#B88E52]" />
              Rooms
            </label>
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full min-w-0 px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8] focus:outline-none focus:ring-1 focus:ring-[#B88E52]"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} Room{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 bg-[#17382B] text-[#FAF7F2] hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] shadow-sm"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Check Rates</span>
            </button>
          </div>
        </div>

        {/* Info strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#5E6963] dark:text-[#95A39B] pt-2 border-t border-[#E6DDCF]/50 dark:border-[#25362E]/50">
          <span>
            Duration: <strong className="text-[#18201C] dark:text-[#F4EFE8] font-medium">{nights} Night{nights > 1 ? 's' : ''}</strong>
          </span>
          <span className="text-[11px] text-[#B88E52] dark:text-[#C59F67]">
            Demo Availability Engine • Best Rate Guarantee
          </span>
        </div>

        {validationError && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            {validationError}
          </p>
        )}
      </form>
    </div>
  );
}
