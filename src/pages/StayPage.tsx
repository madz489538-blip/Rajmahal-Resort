import React, { useState } from 'react';
import { BackendService } from '../services/backend';
import { RoomCard } from '../components/stay/RoomCard';
import { BookingSearchBar } from '../components/booking/BookingSearchBar';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ShieldCheck, Sparkles, Filter } from 'lucide-react';

export function StayPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const allRooms = BackendService.getRooms();

  const categories = ['All', 'Deluxe', 'Executive', 'Suite', 'Villa'];

  const filteredRooms = selectedCategory === 'All'
    ? allRooms
    : allRooms.filter((r) => r.category === selectedCategory);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              Accommodations &amp; Suites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              Refined Living in Nagaon, Assam
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              Choose from serene garden retreats, poolside guestrooms, and expansive heritage suites tailored for holidaymakers, wedding entourages, and business travelers.
            </p>
          </div>
        </ScrollReveal>

        {/* Search bar */}
        <ScrollReveal direction="up" delayMs={100} className="mb-12">
          <BookingSearchBar />
        </ScrollReveal>

        {/* Category Filter Controls */}
        <ScrollReveal direction="up" delayMs={150}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-[#E6DDCF] dark:border-[#25362E]">
            <div className="flex items-center gap-1.5 p-1 bg-[#F4EFE6] dark:bg-[#121C17] rounded-lg border border-[#E6DDCF] dark:border-[#25362E]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white dark:bg-[#1C2C24] text-[#17382B] dark:text-[#C59F67] shadow-sm font-semibold'
                      : 'text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-[#5E6963] dark:text-[#95A39B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B88E52]" />
              <span>Showing {filteredRooms.length} room option{filteredRooms.length > 1 ? 's' : ''} (Demo Data)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room, idx) => (
            <ScrollReveal key={room.id} direction="up" delayMs={(idx % 2) * 150}>
              <RoomCard room={room} />
            </ScrollReveal>
          ))}
        </div>

        {/* Demo Data Disclaimer */}
        <div className="mt-16 p-6 rounded-xl bg-[#F4EFE6] dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] text-xs text-[#5E6963] dark:text-[#95A39B] space-y-2">
          <div className="flex items-center gap-2 text-[#17382B] dark:text-[#C59F67] font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#B88E52]" />
            <span>Concept Accommodation Notice</span>
          </div>
          <p>
            Room names, nightly tariff rates, square footage, and amenities displayed on this website are part of an independent portfolio concept demo. To enquire about verified room inventory, please contact the resort directly at +91 96782 75255.
          </p>
        </div>
      </div>
    </div>
  );
}
